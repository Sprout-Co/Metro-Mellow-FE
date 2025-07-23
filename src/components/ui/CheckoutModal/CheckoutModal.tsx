"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../Portal/Portal";
import Button from "../Button/Button";
import styles from "./CheckoutModal.module.scss";

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: (formData: CheckoutFormData) => void;
  serviceType?: string;
}

export interface CheckoutFormData {
  date: string;
  time: string;
  addressType: "saved" | "new";
  fullname: string;
  state: string;
  lga: string;
  address: string;
  email: string;
  phone: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  serviceType = "Cleaning",
}) => {
  // Form state management
  const [formData, setFormData] = useState<CheckoutFormData>({
    date: "",
    time: "",
    addressType: "new",
    fullname: "Dele Ja",
    state: "",
    lga: "",
    address: "",
    email: "",
    phone: "",
  });

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

  // Handle radio button changes
  const handleRadioChange = (value: "saved" | "new") => {
    setFormData((prev) => ({
      ...prev,
      addressType: value,
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
              ease: "easeOut"
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
              <form onSubmit={handleSubmit} className={styles.checkoutModal__form}>
                {/* Section Title */}
                <h3 className={styles.checkoutModal__sectionTitle}>
                  {serviceType} Details
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
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__select}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>

                {/* Address Type Radio Buttons */}
                <div className={styles.checkoutModal__field}>
                  <div className={styles.checkoutModal__radioGroup}>
                    <label className={styles.checkoutModal__radioLabel}>
                      <input
                        type="radio"
                        name="addressType"
                        value="saved"
                        checked={formData.addressType === "saved"}
                        onChange={() => handleRadioChange("saved")}
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
                        checked={formData.addressType === "new"}
                        onChange={() => handleRadioChange("new")}
                        className={styles.checkoutModal__radio}
                      />
                      <span className={styles.checkoutModal__radioText}>
                        New Address
                      </span>
                    </label>
                  </div>
                </div>

                {/* Fullname Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="fullname" className={styles.checkoutModal__label}>
                    Fullname
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__input}
                    required
                  />
                </div>

                {/* State Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="state" className={styles.checkoutModal__label}>
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__select}
                    required
                  >
                    <option value="">Select state</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                    <option value="rivers">Rivers</option>
                    <option value="ogun">Ogun</option>
                  </select>
                </div>

                {/* LGA Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="lga" className={styles.checkoutModal__label}>
                    LGA
                  </label>
                  <select
                    id="lga"
                    name="lga"
                    value={formData.lga}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__select}
                    required
                  >
                    <option value="">Select LGA</option>
                    <option value="ikeja">Ikeja</option>
                    <option value="victoria-island">Victoria Island</option>
                    <option value="lekki">Lekki</option>
                    <option value="surulere">Surulere</option>
                  </select>
                </div>

                {/* Address Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="address" className={styles.checkoutModal__label}>
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__input}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="email" className={styles.checkoutModal__label}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__input}
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className={styles.checkoutModal__field}>
                  <label htmlFor="phone" className={styles.checkoutModal__label}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.checkoutModal__input}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className={styles.checkoutModal__buttonWrapper}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className={styles.checkoutModal__continueButton}
                  >
                    CONTINUE
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