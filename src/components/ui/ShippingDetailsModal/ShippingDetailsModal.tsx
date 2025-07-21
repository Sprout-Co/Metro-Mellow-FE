"use client";

import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./ShippingDetailsModal.module.scss";

interface ShippingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (shippingDetails: ShippingDetails) => void;
}

export interface ShippingDetails {
  fullname: string;
  state: string;
  address: string;
  email: string;
  phone: string;
  isSavedAddress: boolean;
}

const ShippingDetailsModal: React.FC<ShippingDetailsModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [formData, setFormData] = useState<ShippingDetails>({
    fullname: "",
    state: "lagos",
    address: "",
    email: "",
    phone: "",
    isSavedAddress: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (isSaved: boolean) => {
    setFormData((prev) => ({ ...prev, isSavedAddress: isSaved }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Checkout"
      maxWidth="580px"
      showCloseButton={true}
    >
      <div className={styles.shipping}>
        <h2 className={styles.shipping__title}>Shipping Details</h2>
        
        <form onSubmit={handleSubmit} className={styles.shipping__form}>
          <div className={styles.shipping__addressType}>
            <div className={styles.shipping__radioGroup}>
              <label className={styles.shipping__radioLabel}>
                <input
                  type="radio"
                  name="addressType"
                  className={styles.shipping__radioInput}
                  checked={formData.isSavedAddress}
                  onChange={() => handleRadioChange(true)}
                />
                <span className={styles.shipping__radioButton}></span>
                <span className={styles.shipping__radioText}>Saved Address</span>
              </label>
              
              <label className={styles.shipping__radioLabel}>
                <input
                  type="radio"
                  name="addressType"
                  className={styles.shipping__radioInput}
                  checked={!formData.isSavedAddress}
                  onChange={() => handleRadioChange(false)}
                />
                <span className={styles.shipping__radioButton}></span>
                <span className={styles.shipping__radioText}>New Address</span>
              </label>
            </div>
          </div>

          <div className={styles.shipping__formGroup}>
            <label className={styles.shipping__label}>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={styles.shipping__input}
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.shipping__formGroup}>
            <label className={styles.shipping__label}>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={styles.shipping__select}
            >
              <option value="">Select State</option>
              <option value="lagos">Lagos</option>
            </select>
          </div>

          <div className={styles.shipping__formGroup}>
            <label className={styles.shipping__label}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.shipping__input}
              placeholder="Enter your address"
            />
          </div>

          <div className={styles.shipping__formGroup}>
            <label className={styles.shipping__label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.shipping__input}
              placeholder="Enter your email address"
            />
          </div>

          <div className={styles.shipping__formGroup}>
            <label className={styles.shipping__label}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.shipping__input}
              placeholder="Enter your phone number"
            />
          </div>

          <div className={styles.shipping__buttonContainer}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className={styles.shipping__button}
            >
              CONTINUE
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ShippingDetailsModal; 