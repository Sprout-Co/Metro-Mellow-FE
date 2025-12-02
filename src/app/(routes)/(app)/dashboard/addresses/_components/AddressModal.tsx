"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, ChevronDown, X } from "lucide-react";
import styles from "./AddressModal.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import { Address, ServiceArea } from "@/graphql/api";
import { PlacesAutocomplete } from "@/components/ui/PlacesAutocomplete/PlacesAutocomplete";
import { useServiceAreaOperations } from "@/graphql/hooks/serviceArea/useServiceAreaOperations";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Partial<Address>, serviceAreaId?: string) => Promise<void>;
  address?: Address | null;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  address,
}) => {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [label, setLabel] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEditing = !!address;

  const { handleGetActiveServiceAreas, currentActiveServiceAreas } =
    useServiceAreaOperations();

  // Fetch service areas on mount
  useEffect(() => {
    handleGetActiveServiceAreas();
  }, [handleGetActiveServiceAreas]);

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

  // Reset form when modal opens or address changes
  useEffect(() => {
    if (isOpen) {
      if (address) {
        setLabel(address.label || "");
        setStreetAddress(address.street || "");
        setIsDefault(address.isDefault || false);
        // Set the service area from the existing address
        if (address.serviceArea) {
          setSelectedArea(address.serviceArea as ServiceArea);
        }
      } else {
        setLabel("");
        setStreetAddress("");
        setIsDefault(false);
        setSelectedArea(null);
      }
      setError(null);
    }
  }, [address, isOpen]);

  const handleAreaSelect = (area: ServiceArea) => {
    setSelectedArea(area);
    setIsDropdownOpen(false);
    setStreetAddress(""); // Reset address when area changes
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setStreetAddress(selectedAddress);
  };

  const handleSubmit = async () => {
    if (!selectedArea) {
      setError("Please select a service area");
      return;
    }
    if (!streetAddress.trim()) {
      setError("Please enter an address");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(
        {
          label: label || "Home",
          street: streetAddress,
          city: selectedArea.city,
          isDefault,
        },
        selectedArea.id
      );
      onClose();
    } catch (err) {
      console.error("Error saving address:", err);
      setError("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedArea(null);
    setStreetAddress("");
    setLabel("");
    setIsDefault(false);
    setError(null);
    setIsDropdownOpen(false);
    onClose();
  };

  const footerContent = (
    <div className={styles.footer__actions}>
      <FnButton
        variant="ghost"
        onClick={handleClose}
        className={styles.footer__button}
        disabled={isSubmitting}
      >
        Cancel
      </FnButton>
      <FnButton
        variant="primary"
        onClick={handleSubmit}
        className={styles.footer__button}
        disabled={isSubmitting || !selectedArea || !streetAddress}
      >
        {isSubmitting ? (
          "Saving..."
        ) : (
          <>
            <Check size={18} />
            {isEditing ? "Update Address" : "Save Address"}
          </>
        )}
      </FnButton>
    </div>
  );

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={handleClose}
      width="md"
      title={isEditing ? "Edit Address" : "Add New Address"}
      description={
        isEditing
          ? "Update your address information"
          : "Select your service area and enter address"
      }
      showFooter={true}
      footer={footerContent}
    >
      <div className={styles.modal}>
        <div className={styles.content}>
          {/* Error Message */}
          {error && <div className={styles.error}>{error}</div>}

          {/* Service Area Dropdown */}
          <div className={styles.field}>
            <label className={styles.field__label}>
              Service Area
              <span className={styles.field__required}>*</span>
            </label>
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
                      setStreetAddress("");
                    }}
                  />
                ) : (
                  <ChevronDown size={18} className={styles.dropdown__chevron} />
                )}
              </button>

              {isDropdownOpen && (
                <ul className={styles.dropdown__list}>
                  {currentActiveServiceAreas?.map((area) => (
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
              <label className={styles.field__label}>
                Address
                <span className={styles.field__required}>*</span>
              </label>
              <PlacesAutocomplete
                onSelect={handleAddressSelect}
                placeholder={`Enter address in ${selectedArea.name}`}
              />
              {streetAddress && (
                <div className={styles.field__selected}>
                  <MapPin size={14} />
                  <span>{streetAddress}</span>
                </div>
              )}
            </div>
          )}

          {/* Label Input - only show after address is selected */}
          {streetAddress && (
            <>
              <div className={styles.field}>
                <label className={styles.field__label}>Address Label</label>
                <Input
                  placeholder="e.g., Home, Office, Mom's House"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className={styles.field__input}
                />
              </div>

              {/* Default Address Checkbox */}
              <div className={styles.checkbox}>
                <label className={styles.checkbox__label}>
                  <input
                    type="checkbox"
                    className={styles.checkbox__input}
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                  />
                  <div className={styles.checkbox__content}>
                    <div className={styles.checkbox__title}>
                      Set as default address
                    </div>
                    <div className={styles.checkbox__description}>
                      This address will be automatically selected for new orders
                    </div>
                  </div>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              className={styles.loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.loading__spinner} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModalDrawer>
  );
};

export default AddressModal;
