"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../../../Portal/Portal";
import Button from "../../../Button/Button";
import styles from "./CheckoutModal.module.scss";
import { useAppSelector } from "@/lib/redux/hooks";
import { AddressInput, TimeSlot } from "@/graphql/api";

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: (formData: CheckoutFormData) => void;
  service_category?: string;
  submitting?: boolean;
}

export interface CheckoutFormData {
  date: string;
  timeSlot: TimeSlot;
  city: string;
  street: string;
  addressId?: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  service_category = "Cleaning",
  submitting = false,
}) => {
  // Form state management
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<CheckoutFormData>({
    date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    timeSlot: TimeSlot.Morning,
    city: user?.defaultAddress?.city || "",
    street: user?.defaultAddress?.street || "",
    addressId: user?.defaultAddress?.id,
  });

  const [address, setAddress] = useState<AddressInput>({
    city: "",
    street: "",
    state: "Lagos",
  });
  const [isNewAddress, setIsNewAddress] = useState(!user?.addresses?.length);

  // Set default address when component mounts or user changes
  React.useEffect(() => {
    if (user?.defaultAddress) {
      setFormData((prev) => ({
        ...prev,
        addressId: user.defaultAddress?.id,
        city: user.defaultAddress?.city || "",
        street: user.defaultAddress?.street || "",
      }));
    }
  }, [user]);

  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue?.(formData);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.checkoutModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className={styles.checkoutModal__backdrop}
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal Content */}
          <motion.div
            className={styles.checkoutModal__container}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Header */}
            <div className={styles.checkoutModal__header}>
              <h2 className={styles.checkoutModal__title}>Checkout</h2>
              <button
                className={styles.checkoutModal__close}
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className={styles.checkoutModal__content}>
              <form
                onSubmit={handleSubmit}
                className={styles.checkoutModal__form}
              >
                {/* Section Title */}
                <h3 className={styles.checkoutModal__sectionTitle}>
                  {service_category} Details
                </h3>

                {/* Date Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="date" className={styles.checkoutModal__label}>
                    Date
                  </label>
                  <div className={styles.checkoutModal__inputWrapper}>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={styles.checkoutModal__input}
                      required
                    />
                    <svg
                      className={styles.checkoutModal__inputIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.667 1.667v1.666M13.333 1.667v1.666M2.5 8.333h15M4.167 3.333h11.666c.917 0 1.667.75 1.667 1.667v11.667c0 .916-.75 1.666-1.667 1.666H4.167c-.917 0-1.667-.75-1.667-1.666V5c0-.917.75-1.667 1.667-1.667z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Time Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="time" className={styles.checkoutModal__label}>
                    Time
                  </label>
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__select}
                    required
                  >
                    <option value={TimeSlot.Morning}>Morning</option>
                    <option value={TimeSlot.Afternoon}>Afternoon</option>
                    <option value={TimeSlot.Evening}>Evening</option>
                  </select>
                </div>

                {/* Address Type Radio Buttons */}
                {user && isAuthenticated ? (
                  <div className={styles.checkoutModal__field}>
                    <div className={styles.checkoutModal__radioGroup}>
                      <label className={styles.checkoutModal__radioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="saved"
                          // checked={formData.addressType === "saved"}
                          checked={!isNewAddress}
                          onChange={() => setIsNewAddress(false)}
                          className={styles.checkoutModal__radio}
                        />
                        <span className={styles.checkoutModal__radioText}>
                          Saved Address
                        </span>
                      </label>
                      <label className={styles.checkoutModal__radioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="new"
                          // checked={formData.addressType === "new"}
                          checked={isNewAddress}
                          onChange={() => setIsNewAddress(true)}
                          className={styles.checkoutModal__radio}
                        />
                        <span className={styles.checkoutModal__radioText}>
                          New Address
                        </span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className={styles.checkoutModal__field}>
                    <p>Please login to continue</p>
                  </div>
                )}

                {isNewAddress ? (
                  <>
                    {/* City Field */}
                    <div className={styles.checkoutModal__field}>
                      <label
                        htmlFor="city"
                        className={styles.checkoutModal__label}
                      >
                        City
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={styles.checkoutModal__select}
                        required
                      >
                        <option value="">Select City</option>
                        <option value="ikeja">Ikeja</option>
                        <option value="victoria-island">Victoria Island</option>
                        <option value="lekki">Lekki</option>
                        <option value="surulere">Surulere</option>
                      </select>
                    </div>
                    {/* Address Field */}
                    <div className={styles.checkoutModal__field}>
                      <label
                        htmlFor="street"
                        className={styles.checkoutModal__label}
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className={styles.checkoutModal__input}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {user?.addresses && user.addresses.length > 0 ? (
                      <div className={styles.checkoutModal__addressList}>
                        <h4 className={styles.checkoutModal__addressListTitle}>
                          Select an address
                        </h4>
                        {user.addresses.map(
                          (address) =>
                            address && (
                              <div
                                key={address.id}
                                className={`${styles.checkoutModal__addressCard} ${
                                  formData.addressId === address.id
                                    ? styles.checkoutModal__addressCard__selected
                                    : ""
                                }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    addressId: address.id,
                                    city: address.city || "",
                                    street: address.street || "",
                                  }))
                                }
                              >
                                <div
                                  className={
                                    styles.checkoutModal__addressCardContent
                                  }
                                >
                                  <div
                                    className={
                                      styles.checkoutModal__addressCardHeader
                                    }
                                  >
                                    <span
                                      className={
                                        styles.checkoutModal__addressCardLabel
                                      }
                                    >
                                      {address.label}
                                    </span>
                                    {address.isDefault && (
                                      <span
                                        className={
                                          styles.checkoutModal__addressCardDefault
                                        }
                                      >
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className={
                                      styles.checkoutModal__addressCardText
                                    }
                                  >
                                    {address.street}
                                  </p>
                                  <p
                                    className={
                                      styles.checkoutModal__addressCardText
                                    }
                                  >
                                    {address.city}, {address.state}{" "}
                                    {address.zipCode}
                                  </p>
                                </div>
                                <div
                                  className={
                                    styles.checkoutModal__addressCardRadio
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="addressId"
                                    value={address.id}
                                    checked={formData.addressId === address.id}
                                    onChange={() => {}}
                                    className={styles.checkoutModal__radio}
                                  />
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    ) : (
                      <div className={styles.checkoutModal__noAddress}>
                        <p>You don't have any saved addresses.</p>
                        <p>Please add a new address.</p>
                      </div>
                    )}
                  </>
                )}

                {/* Submit Button */}
                <div className={styles.checkoutModal__buttonWrapper}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className={styles.checkoutModal__continueButton}
                  >
                    {submitting ? "Hang on..." : "CONTINUE"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default CheckoutModal;
