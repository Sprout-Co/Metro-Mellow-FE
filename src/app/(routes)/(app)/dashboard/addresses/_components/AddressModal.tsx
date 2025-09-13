"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import styles from "./AddressModal.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import { Address } from "@/graphql/api";
import ModalDrawerHeader from "@/components/ui/ModalDrawer/ModalDrawerHeader/ModalDrawerHeader";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!address;

  // Reset form when modal opens
  useEffect(() => {
    if (address) {
      console.log("Editing address:", address); // Debug log
      setFormData({
        label: address.label || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "Lagos",
        zipCode: address.zipCode || "",
        country: address.country || "Nigeria",
        isDefault: address.isDefault || false,
      });
    } else {
      console.log("Adding new address"); // Debug log
      setFormData({
        label: "",
        street: "",
        city: "",
        state: "Lagos",
        zipCode: "",
        country: "Nigeria",
        isDefault: false,
      });
    }
    setErrors({});
  }, [address, isOpen]);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSave(formData);
      } catch (error) {
        console.error("Error saving address:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle input change
  const handleChange = (field: keyof Address, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      width="md"
      title={isEditing ? "Edit Address" : "Add New Address"}
      description={
        isEditing
          ? "Update your address information"
          : "Enter your address details"
      }
    >
      <div className={styles.modal}>
        {/* <ModalDrawerHeader
          title={isEditing ? "Edit Address" : "Add New Address"}
          description={
            isEditing
              ? "Update your address information"
              : "Enter your address details"
          }
          onClose={onClose}
        /> */}

        {/* Form Content */}
        <div className={styles.content}>
          <motion.div
            key={address?.id || "new"}
            className={styles.form}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Address Label */}
            <motion.div className={styles.field} variants={fadeInUp}>
              <label className={styles.field__label}>Address Label</label>
              <Input
                placeholder="e.g., Home, Office, Mom's House"
                value={formData.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                error={errors.label}
                className={styles.field__input}
                key={`label-${address?.id || "new"}`}
              />
            </motion.div>

            {/* Street Address */}
            <motion.div className={styles.field} variants={fadeInUp}>
              <label className={styles.field__label}>
                Street Address
                <span className={styles.field__required}>*</span>
              </label>
              <Input
                placeholder="House number and street name"
                value={formData.street || ""}
                onChange={(e) => handleChange("street", e.target.value)}
                error={errors.street}
                className={styles.field__input}
                key={`street-${address?.id || "new"}`}
              />
            </motion.div>

            {/* City and State Row */}
            <motion.div className={styles.field__row} variants={fadeInUp}>
              <div className={styles.field}>
                <label className={styles.field__label}>
                  City
                  <span className={styles.field__required}>*</span>
                </label>
                <Input
                  placeholder="e.g., Lekki"
                  value={formData.city || ""}
                  onChange={(e) => handleChange("city", e.target.value)}
                  error={errors.city}
                  className={styles.field__input}
                  key={`city-${address?.id || "new"}`}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.field__label}>State</label>
                <Input
                  placeholder="Lagos"
                  value={formData.state || "Lagos"}
                  disabled
                  className={styles.field__input}
                  key={`state-${address?.id || "new"}`}
                />
              </div>
            </motion.div>

            {/* Postal Code and Country Row */}
            <motion.div className={styles.field__row} variants={fadeInUp}>
              <div className={styles.field}>
                <label className={styles.field__label}>Postal Code</label>
                <Input
                  placeholder="e.g., 101233"
                  value={formData.zipCode || ""}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  className={styles.field__input}
                  key={`zipCode-${address?.id || "new"}`}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.field__label}>Country</label>
                <Input
                  placeholder="Nigeria"
                  value={formData.country || "Nigeria"}
                  disabled
                  className={styles.field__input}
                  key={`country-${address?.id || "new"}`}
                />
              </div>
            </motion.div>

            {/* Default Address Checkbox */}
            <motion.div className={styles.checkbox} variants={fadeInUp}>
              <label className={styles.checkbox__label}>
                <input
                  type="checkbox"
                  className={styles.checkbox__input}
                  checked={formData.isDefault || false}
                  onChange={(e) => handleChange("isDefault", e.target.checked)}
                  key={`isDefault-${address?.id || "new"}`}
                />
                <div className={styles.checkbox__content}>
                  <div className={styles.checkbox__title}>
                    Set as default address
                  </div>
                  <div className={styles.checkbox__description}>
                    This address will be automatically selected for all new
                    orders
                  </div>
                </div>
              </label>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className={styles.footer}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className={styles.footer__actions}>
            <FnButton
              variant="ghost"
              onClick={onClose}
              className={styles.footer__button}
              disabled={isSubmitting}
            >
              Cancel
            </FnButton>
            <FnButton
              variant="primary"
              onClick={handleSubmit}
              className={styles.footer__button}
              disabled={isSubmitting}
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
        </motion.div>

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
