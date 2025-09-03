// src/app/(routes)/(app)/dashboard/account/addresses/_components/AddressModal/AddressModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Home,
  Briefcase,
  Heart,
  Navigation,
  Phone,
  FileText,
  Search,
  Check,
} from "lucide-react";
import styles from "./AddressModal.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import { Address } from "@/graphql/api";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Partial<Address>) => Promise<void>;
  address?: Address | null;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  address,
}) => {
  const [formData, setFormData] = useState<Partial<Address>>({
    label: "",
    street: "",
    city: "",
    state: "Lagos",
    zipCode: "",
    country: "Nigeria",
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  // Reset form when modal opens with address data
  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        label: "",
        street: "",
        city: "",
        state: "Lagos",
        country: "Nigeria",
        isDefault: false,
      });
    }
    setErrors({});
  }, [address, isOpen]);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.label?.trim()) {
      newErrors.label = "Address label is required";
    }
    if (!formData.street?.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!formData.city?.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state?.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("AddressModal: handleSubmit called");
    console.log("AddressModal: formData", formData);

    if (validateForm()) {
      console.log("AddressModal: Validation passed, calling onSave");
      await onSave(formData);
      console.log("AddressModal: onSave completed");
      // Don't close here - let the parent handle it after async operation
    } else {
      console.log("AddressModal: Validation failed", errors);
    }
  };

  // Handle input change
  const handleChange = (field: keyof Address, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    setIsSearchingLocation(true);
    // Simulate getting location
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        street: "24 Emmanuel Osakwe Street",
        area: "Chevron Drive",
        city: "Lekki",
        state: "Lagos",
        postalCode: "101233",
      }));
      setIsSearchingLocation(false);
    }, 1500);
  };

  // if (!isOpen) return null;

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      {/* Header */}
      <div className={styles.modal__header}>
        <h2 className={styles.modal__title}>
          {address ? "Edit Address" : "Add New Address"}
        </h2>
        <button className={styles.modal__closeBtn} onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Body */}
      <div className={styles.modal__body}>
        {/* Address Label */}
        <div className={styles.modal__section}>
          <label className={styles.modal__label}>
            Address Label <span className={styles.modal__required}>*</span>
          </label>
          <Input
            placeholder="e.g., Home, Office, Mom's House"
            value={formData.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            error={errors.label}
          />
        </div>

        {/* Location Search */}
        <div className={styles.modal__section}>
          <label className={styles.modal__label}>Search Location</label>
          <div className={styles.modal__searchContainer}>
            <Input
              placeholder="Search for your address"
              leftIcon={<Search size={18} />}
            />
            <FnButton
              variant="secondary"
              onClick={handleGetCurrentLocation}
              disabled={isSearchingLocation}
            >
              <Navigation size={16} />
              {isSearchingLocation
                ? "Getting Location..."
                : "Use Current Location"}
            </FnButton>
          </div>
        </div>

        {/* Address Fields */}
        <div className={styles.modal__section}>
          <label className={styles.modal__label}>
            Street Address <span className={styles.modal__required}>*</span>
          </label>
          <Input
            placeholder="House number and street name"
            value={formData.street || ""}
            onChange={(e) => handleChange("street", e.target.value)}
            error={errors.street}
          />
        </div>

        <div className={styles.modal__row}>
          <div className={styles.modal__section}>
            <label className={styles.modal__label}>
              City <span className={styles.modal__required}>*</span>
            </label>
            <Input
              placeholder="e.g., Lekki"
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              error={errors.city}
            />
          </div>
          <div className={styles.modal__section}>
            <label className={styles.modal__label}>
              State <span className={styles.modal__required}>*</span>
            </label>
            <Input placeholder="e.g., Lagos" value="Lagos" disabled />
          </div>
        </div>

        <div className={styles.modal__row}>
          <div className={styles.modal__section}>
            <label className={styles.modal__label}>Postal Code</label>
            <Input
              placeholder="e.g., 101233"
              value={formData.zipCode || ""}
              onChange={(e) => handleChange("zipCode", e.target.value)}
            />
          </div>
        </div>
        {/* Additional Details */}

        {/* <div className={styles.modal__section}>
          <label className={styles.modal__label}>Delivery Instructions</label>
          <textarea
            className={styles.modal__textarea}
            placeholder="Any specific instructions for service providers..."
            value={formData.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            rows={3}
          />
        </div> */}

        {/* Set as Default */}
        <div className={styles.modal__checkbox}>
          <input
            type="checkbox"
            id="setDefault"
            checked={formData.isDefault || false}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
          />
          <label htmlFor="setDefault">Set as default address</label>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.modal__footer}>
        <FnButton variant="ghost" onClick={onClose}>
          Cancel
        </FnButton>
        <FnButton variant="primary" onClick={handleSubmit}>
          <Check size={18} />
          {address ? "Update Address" : "Save Address"}
        </FnButton>
      </div>
    </ModalDrawer>
  );
};

export default AddressModal;
