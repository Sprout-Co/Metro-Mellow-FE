"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, MapPin, ChevronDown, Loader2, Search } from "lucide-react";
import styles from "./AddressModal.module.scss";
import Modal from "@/components/ui/Modal/Modal";
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
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!address;

  const { handleGetActiveServiceAreas, currentActiveServiceAreas } =
    useServiceAreaOperations();

  useEffect(() => {
    handleGetActiveServiceAreas();
  }, [handleGetActiveServiceAreas]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isOpen) {
      if (address) {
        setLabel(address.label || "");
        setStreetAddress(address.street || "");
        setIsDefault(address.isDefault || false);
        if (address.serviceArea) {
          setSelectedArea(address.serviceArea as ServiceArea);
        }
      } else {
        resetForm();
      }
    }
  }, [address, isOpen]);

  const resetForm = () => {
    setLabel("");
    setStreetAddress("");
    setIsDefault(false);
    setSelectedArea(null);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleAreaSelect = (area: ServiceArea) => {
    setSelectedArea(area);
    setIsDropdownOpen(false);
    setSearchQuery("");
    if (!isEditing) setStreetAddress("");
  };

  // Filter service areas based on search query
  const filteredServiceAreas = currentActiveServiceAreas?.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddressSelect = (selected: string) => {
    setStreetAddress(selected);
  };

  const handleSubmit = async () => {
    if (!selectedArea || !streetAddress.trim()) return;

    setIsSubmitting(true);
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
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error saving address:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const canSubmit = selectedArea && streetAddress.trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Address" : "Add Address"}
      maxWidth="440px"
      contentOverflow="visible"
    >
      <div className={styles.container}>
        {/* Step indicator */}
        <div className={styles.steps}>
          <div className={`${styles.step} ${styles["step--active"]}`}>
            <span className={styles.step__number}>1</span>
            <span className={styles.step__text}>Area</span>
          </div>
          <div className={styles.step__divider} />
          <div
            className={`${styles.step} ${selectedArea ? styles["step--active"] : ""}`}
          >
            <span className={styles.step__number}>2</span>
            <span className={styles.step__text}>Address</span>
          </div>
          <div className={styles.step__divider} />
          <div
            className={`${styles.step} ${streetAddress ? styles["step--active"] : ""}`}
          >
            <span className={styles.step__number}>3</span>
            <span className={styles.step__text}>Details</span>
          </div>
        </div>

        {/* Service Area */}
        <div className={styles.field}>
          <label className={styles.field__label}>Service Area</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            {isDropdownOpen ? (
              <div className={styles.dropdown__inputWrapper}>
                <Search size={18} className={styles.dropdown__searchIcon} />
                <input
                  ref={searchInputRef}
                  type="text"
                  className={`${styles.dropdown__input} ${selectedArea ? styles["dropdown__input--selected"] : ""}`}
                  placeholder="Search areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsDropdownOpen(false);
                      setSearchQuery("");
                    }
                  }}
                />
                <ChevronDown
                  size={16}
                  className={styles["dropdown__icon--open"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                    setSearchQuery("");
                  }}
                />
              </div>
            ) : (
              <button
                type="button"
                className={`${styles.dropdown__btn} ${selectedArea ? styles["dropdown__btn--selected"] : ""}`}
                onClick={() => setIsDropdownOpen(true)}
              >
                <MapPin size={18} />
                <span>{selectedArea?.name || "Select area"}</span>
                <ChevronDown size={16} />
              </button>
            )}

            {isDropdownOpen && (
              <ul className={styles.dropdown__menu}>
                {/* Filtered Service Areas */}
                {filteredServiceAreas && filteredServiceAreas.length > 0 ? (
                  filteredServiceAreas.map((area) => (
                    <li
                      key={area.id}
                      className={`${styles.dropdown__item} ${selectedArea?.id === area.id ? styles["dropdown__item--selected"] : ""}`}
                      onClick={() => handleAreaSelect(area)}
                    >
                      <MapPin size={16} />
                      <span>{area.name}</span>
                      {selectedArea?.id === area.id && <Check size={16} />}
                    </li>
                  ))
                ) : (
                  <li className={styles.dropdown__noResults}>
                    <span>No areas found</span>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Address */}
        {selectedArea && (
          <div className={styles.field}>
            <label className={styles.field__label}>Street Address</label>
            <PlacesAutocomplete
              onSelect={handleAddressSelect}
              placeholder={`Search in ${selectedArea.name}...`}
            />
            {streetAddress && (
              <div className={styles.field__preview}>
                <Check size={14} />
                <span>{streetAddress}</span>
              </div>
            )}
          </div>
        )}

        {/* Label & Default */}
        {streetAddress && (
          <>
            <div className={styles.field}>
              <label className={styles.field__label}>Label (optional)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., Home, Office"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>

            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <div className={styles.toggle__track}>
                <div className={styles.toggle__thumb} />
              </div>
              <span className={styles.toggle__label}>Set as default</span>
            </label>
          </>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
                Saving...
              </>
            ) : (
              <>
                <Check size={16} />
                {isEditing ? "Update" : "Save"} Address
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
