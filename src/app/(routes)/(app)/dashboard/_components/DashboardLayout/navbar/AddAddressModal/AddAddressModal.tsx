import Modal from "@/components/ui/Modal/Modal";
import React, { useState, useRef, useEffect } from "react";
import styles from "./AddAddressModal.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { PlacesAutocomplete } from "@/components/ui/PlacesAutocomplete/PlacesAutocomplete";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import {
  useActiveServiceAreasQuery,
  useGetCurrentUserQuery,
  ServiceArea,
} from "@/graphql/api";
import { MapPin, ChevronDown, X } from "lucide-react";

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

  const { handleAddAddress } = useAuthOperations();
  const { data: serviceAreasData } = useActiveServiceAreasQuery();
  const { refetch: refetchUser } = useGetCurrentUserQuery({ skip: true });

  // Close dropdown on outside click
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

      await refetchUser();
      onAddressSelect?.(address);

      // Reset & close
      setSelectedArea(null);
      setAddress("");
      onClose();
    } catch (error) {
      console.error("Failed to add address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedArea(null);
    setAddress("");
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Address"
      maxWidth="450px"
    >
      <div className={styles.modal}>
        {/* Service Area Dropdown */}
        <div className={styles.field}>
          <label className={styles.label}>Service Area</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdown__trigger}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MapPin size={18} className={styles.dropdown__icon} />
              <span
                className={
                  selectedArea
                    ? styles.dropdown__value
                    : styles.dropdown__placeholder
                }
              >
                {selectedArea?.name || "Select service area"}
              </span>
              {selectedArea ? (
                <X
                  size={16}
                  className={styles.dropdown__clear}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArea(null);
                    setAddress("");
                  }}
                />
              ) : (
                <ChevronDown size={18} className={styles.dropdown__chevron} />
              )}
            </button>

            {isDropdownOpen && (
              <ul className={styles.dropdown__list}>
                {serviceAreasData?.activeServiceAreas.map((area) => (
                  <li
                    key={area.id}
                    className={styles.dropdown__item}
                    onClick={() => handleAreaSelect(area)}
                  >
                    <MapPin size={16} />
                    <span>{area.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Address Input - only show after area is selected */}
        {selectedArea && (
          <div className={styles.field}>
            <label className={styles.label}>Address</label>
            <PlacesAutocomplete
              onSelect={handleAddressSelect}
              placeholder={`Enter address in ${selectedArea.name}`}
            />
          </div>
        )}

        {/* Confirm Button */}
        {address && selectedArea && (
          <Button
            variant="primary"
            onClick={handleConfirm}
            fullWidth
            className={styles.confirmBtn}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Confirm Address"}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default AddAddressModal;
