"use client";

import React, { useState } from "react";
import Modal from "../../../Modal/Modal";
import Button from "../../../Button/Button";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import styles from "./ShippingDetailsModal.module.scss";

interface ShippingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (shippingDetails: ShippingDetails) => void;
}

export interface ShippingDetails {
  fullname: string;
  state: string;
  address: string;
  email: string;
  phone: string;
  isSavedAddress: boolean;
}

// Sample saved address data
const savedAddressData = {
  address: "234, Alvan Ikoku Street, Lagos Island, Lagos.",
  phone: "+2349087653423",
  email: "team@metromellow.com",
};

const ShippingDetailsModal: React.FC<ShippingDetailsModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  const [formData, setFormData] = useState<ShippingDetails>({
    fullname: "",
    state: "lagos",
    address: "",
    email: "",
    phone: "",
    isSavedAddress: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (isSaved: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isSavedAddress: isSaved,
      // Pre-fill data when selecting saved address
      ...(isSaved
        ? {
            address: savedAddressData.address,
            phone: savedAddressData.phone,
            email: savedAddressData.email,
          }
        : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout(formData);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleEditSavedAddress = () => {
    // In a real app, this would open an edit form for the saved address
    console.log("Edit saved address");
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showSuccessModal}
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
                  <span className={styles.shipping__radioText}>
                    Saved Address
                  </span>
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
                  <span className={styles.shipping__radioText}>
                    New Address
                  </span>
                </label>
              </div>
            </div>

            {formData.isSavedAddress ? (
              <div className={styles.shipping__savedAddress}>
                <div className={styles.shipping__savedAddressCard}>
                  <button
                    type="button"
                    onClick={handleEditSavedAddress}
                    className={styles.shipping__editButton}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit
                  </button>

                  <div className={styles.shipping__savedAddressItem}>
                    <svg
                      className={styles.shipping__savedAddressIcon}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{savedAddressData.address}</span>
                  </div>

                  <div className={styles.shipping__savedAddressItem}>
                    <svg
                      className={styles.shipping__savedAddressIcon}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92V19.92C22 20.4887 21.8036 21.0372 21.4444 21.4712C21.0852 21.9052 20.5906 22.1921 20.03 22.29C19.58 22.37 19.12 22.43 18.64 22.47C17.0304 22.6238 15.4025 22.4976 13.82 22.1C10.6184 21.274 7.72091 19.5652 5.53 17.18C3.33772 14.77 1.88743 11.8358 1.35 8.64C1.17035 7.72422 1.0454 6.79486 0.98 5.86C0.880778 5.29996 0.993627 4.72552 1.29 4.23C1.59957 3.72817 2.06594 3.33794 2.62 3.12C2.79 3.07 2.97 3.03 3.16 3H6.16C6.83958 2.99449 7.49492 3.25945 7.98944 3.73762C8.48397 4.21579 8.78556 4.8699 8.83 5.55C8.87 6.18 8.94 6.8 9.05 7.4C9.15627 8.0214 9.06955 8.66157 8.80275 9.22047C8.53595 9.77937 8.10431 10.2281 7.57 10.49L6.3 11.26C7.21707 13.0826 8.5484 14.6763 10.18 15.93L10.95 14.66C11.2119 14.1257 11.6606 13.6941 12.2195 13.4273C12.7784 13.1605 13.4186 13.0738 14.04 13.18C14.64 13.29 15.26 13.36 15.89 13.4C16.5711 13.4449 17.2262 13.7472 17.7042 14.2427C18.1822 14.7381 18.4454 15.3948 18.44 16.08V16.92"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{savedAddressData.phone}</span>
                  </div>

                  <div className={styles.shipping__savedAddressItem}>
                    <svg
                      className={styles.shipping__savedAddressIcon}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{savedAddressData.email}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
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
                  <label className={styles.shipping__label}>
                    Email Address
                  </label>
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
              </>
            )}

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

      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};

export default ShippingDetailsModal;
