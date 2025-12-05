import Modal from "@/components/ui/Modal/Modal";
import React, { useState, useRef, useEffect } from "react";
import styles from "./AddAddressModal.module.scss";
import { PlacesAutocomplete } from "@/components/ui/PlacesAutocomplete/PlacesAutocomplete";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useServiceAreaOperations } from "@/graphql/hooks/serviceArea/useServiceAreaOperations";
import { ServiceArea } from "@/graphql/api";
import { MapPin, ChevronDown, Check, Loader2 } from "lucide-react";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect?: (address: string) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { handleAddAddress, handleGetCurrentUser } = useAuthOperations();
  const { handleGetActiveServiceAreas, currentActiveServiceAreas } =
    useServiceAreaOperations();

  useEffect(() => {
    handleGetActiveServiceAreas();
  }, [handleGetActiveServiceAreas]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAreaSelect = (area: ServiceArea) => {
    setSelectedArea(area);
    setIsDropdownOpen(false);
    setAddress("");
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  const handleConfirm = async () => {
    if (!address || !selectedArea) return;

    setIsLoading(true);
    try {
      await handleAddAddress({
        street: address,
        city: selectedArea.city,
        serviceArea: selectedArea.id,
        isDefault: true,
      });

      await handleGetCurrentUser();
      onAddressSelect?.(address);
      resetAndClose();
    } catch (error) {
      console.error("Failed to add address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setSelectedArea(null);
    setAddress("");
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Add Address"
      maxWidth="420px"
      contentOverflow="visible"
    >
      <div className={styles.container}>
        {/* Step indicator */}
        <div className={styles.steps}>
          <div className={`${styles.step} ${styles["step--active"]}`}>
            <span className={styles.step__number}>1</span>
            <span className={styles.step__label}>Area</span>
          </div>
          <div className={styles.step__line} />
          <div
            className={`${styles.step} ${selectedArea ? styles["step--active"] : ""}`}
          >
            <span className={styles.step__number}>2</span>
            <span className={styles.step__label}>Address</span>
          </div>
        </div>

        {/* Service Area Selection */}
        <div className={styles.section}>
          <label className={styles.label}>Select your service area</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              type="button"
              className={`${styles.dropdown__btn} ${selectedArea ? styles["dropdown__btn--selected"] : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MapPin size={18} />
              <span>{selectedArea?.name || "Choose area"}</span>
              <ChevronDown
                size={16}
                className={
                  isDropdownOpen ? styles["dropdown__chevron--open"] : ""
                }
              />
            </button>

            {isDropdownOpen && (
              <ul className={styles.dropdown__menu}>
                {currentActiveServiceAreas?.map((area) => (
                  <li
                    key={area.id}
                    className={`${styles.dropdown__option} ${selectedArea?.id === area.id ? styles["dropdown__option--selected"] : ""}`}
                    onClick={() => handleAreaSelect(area)}
                  >
                    <MapPin size={16} />
                    <span>{area.name}</span>
                    {selectedArea?.id === area.id && <Check size={16} />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Address Input */}
        {selectedArea && (
          <div className={styles.section}>
            <label className={styles.label}>Enter your address</label>
            <PlacesAutocomplete
              onSelect={handleAddressSelect}
              placeholder={`Search in ${selectedArea.name}...`}
            />
            {address && (
              <div className={styles.selected}>
                <Check size={14} />
                <span>{address}</span>
              </div>
            )}
          </div>
        )}

        {/* Confirm Button */}
        <button
          className={styles.confirmBtn}
          onClick={handleConfirm}
          disabled={!address || !selectedArea || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              Adding...
            </>
          ) : (
            <>
              <Check size={18} />
              Confirm Address
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
