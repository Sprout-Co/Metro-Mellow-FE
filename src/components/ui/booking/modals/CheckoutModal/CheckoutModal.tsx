"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../../../Portal/Portal";
import Button from "../../../Button/Button";
import styles from "./CheckoutModal.module.scss";
import { useAppSelector } from "@/lib/redux/hooks";
import { AddressInput, TimeSlot } from "@/graphql/api";
import { usePaystackPayment } from "react-paystack";
import { Routes } from "@/constants/routes";
import axios from "axios";
import router from "next/router";

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (
    formData: CheckoutFormData,
    onContinuePayment: (bookingResponse: string) => void
  ) => void;
  service_category?: string;
  submitting?: boolean;
  error?: string | null;
  onClearError?: () => void;
  bookingId?: string;
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
  onCheckout,
  service_category = "Cleaning",
  submitting = false,
  error = null,
  onClearError,
  bookingId,
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

  // Paystack payment hook - moved to component top level
  // const initializePaystackPayment = usePaystackPayment({
  //   publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  //   email: user?.email || "",
  //   amount: 10000, // Amount in kobo
  // });

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
      if (onClearError) onClearError();
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

  // Define the onSuccess and onClose callbacks for the payment hook

  const onSuccess = async (response: any) => {
    try {
      console.log("Payment successful. Reference:", response.reference);
      router.push(`${Routes.PAYMENT_CALLBACK}?reference=${response.reference}`);

      // Show loading state while verifying
      // You might want to add a loading state here

      // Verify payment on backend - NEVER trust frontend payment success alone
      // const verifyResponse = await axios.get(
      //   `http://localhost:4000/api/paystack/verify-payment/${response.reference}`
      //   // {
      //   //   reference: response.reference,
      //   // }
      // );
      // console.log("verifyResponse", verifyResponse);

      // if (verifyResponse.data.status === "success") {
      //   // Payment verified successfully on backend
      //   console.log("Payment verified successfully:", verifyResponse.data);

      //   // Close the modal
      //   onClose();

      //   // Show success message (replace alert with proper notification component)
      //   alert(`Payment successful! Reference: ${response.reference}`);

      //   // TODO: Create booking record (if not already done in onCheckout)
      //   // await createBooking(formData, response.reference);

      //   // TODO: Redirect to confirmation page
      //   // router.push(`/booking/confirmation/${response.reference}`);
      // } else {
      //   throw new Error("Payment verification failed");
      // }
    } catch (error) {
      console.error("Error handling successful payment:", error);

      // Show error message to user
      alert(
        "Payment verification failed. Please contact support with reference: " +
          response.reference
      );

      // Don't close the modal on verification failure
      // Let user try again or contact support
    }
  };

  const onClosePaystack = () => {
    // This function is called when the user closes the payment popup
    console.log("Payment modal closed.");
    // Don't show alert for user cancellation - it's expected behavior
    // Just log it for debugging purposes
  };

  const initializePayment = async (bookingId: string) => {
    // setLoading(true);
    // setError(null);
    let amount = 10000;
    try {
      const response = await axios.post(
        "http://localhost:4000/api/paystack/initialize-payment",
        {
          email: user?.email,
          amount: 10000, // Convert to kobo (e.g., 100 Naira = 10000 kobo)
          bookingId, // TODO: Replace with actual booking ID
          currency: "NGN",
        }
      );

      const { data } = response.data;

      console.log("Payment initialization response:", data);

      if (data && data.authorizationUrl) {
        // 2. Redirect the user to the Paystack page to complete payment
        console.log("Redirecting to Paystack:", data.authorizationUrl);
        window.open(data.authorizationUrl, "_blank");
      } else {
        throw new Error("Could not retrieve payment URL.");
      }

      // Use the hook that's now at component top level
      // initializePaystackPayment({
      //   onSuccess,
      //   onClose: onClosePaystack,
      //   config: {
      //     email: user?.email || "",
      //     amount: amount * 100,
      //     reference: data.reference, // Use the reference from the backend
      //   },
      // });
    } catch (err) {
      console.error("Error initializing payment:", err);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout(formData, (bookingResponse: string) =>
      initializePayment(bookingResponse)
    );
    // initializePayment();
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
                onClick={() => {
                  if (onClearError) onClearError();
                  onClose();
                }}
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

                {/* Error Display */}
                {error && (
                  <div className={styles.checkoutModal__errorMessage}>
                    <p>{error}</p>
                  </div>
                )}

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
