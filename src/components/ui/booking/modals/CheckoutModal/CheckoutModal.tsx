"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../../../Portal/Portal";
import Button from "../../../Button/Button";
import styles from "./CheckoutModal.module.scss";
import { useAppSelector } from "@/lib/redux/hooks";
import { TimeSlot, ServiceCategory } from "@/graphql/api";
import { usePayment } from "@/hooks/usePayment";
import { useCheckoutForm } from "@/hooks/useCheckoutForm";
import { useSlotAvailability } from "@/hooks/useSlotAvailability";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { useErrorScroll } from "@/hooks/useErrorScroll";
import { mapServiceCategoryToEnum } from "@/utils/slotHelpers";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import { CheckoutModalHeader } from "./components/CheckoutModalHeader";
import { CheckoutModalErrors } from "./components/CheckoutModalErrors";
import { DateSelection } from "./components/DateSelection";
import { TimeSlotSelection } from "./components/TimeSlotSelection";
import { AddressSection } from "./components/AddressSection";
import { CheckoutSummary } from "./components/CheckoutSummary";

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
  totalPrice: number;
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
  totalPrice = 0,
}) => {
  // Redux state
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Payment hook
  const {
    initializePayment,
    loading: paymentLoading,
    paymentSuccess,
    paymentReference,
  } = usePayment();

  // Determine if availability-based date/time is required
  const serviceCategoryEnum = useMemo(
    () => mapServiceCategoryToEnum(service_category),
    [service_category]
  );
  const requiresAvailability = useMemo(
    () =>
      ![ServiceCategory.Cooking, ServiceCategory.Laundry].includes(
        serviceCategoryEnum
      ),
    [serviceCategoryEnum]
  );

  // Custom hooks for form management
  const {
    formData,
    isNewAddress,
    deliveryCost,
    setIsNewAddress,
    handleInputChange,
    handleDateSelect,
    handleTimeSlotSelect,
    handleAddressSelect,
  } = useCheckoutForm({ user: user as any, isOpen });

  // Custom hook for slot availability
  const {
    loadingSlots,
    slotError,
    validatingSlot,
    slotValidationError,
    validateSlotAvailability,
    getSelectedDateSlots,
    getAvailableSlotsForPicker,
    clearSlotValidationError,
  } = useSlotAvailability({
    isOpen,
    requiresAvailability,
    serviceCategory: service_category,
  });

  // Custom hook for modal behavior
  const { handleBackdropClick } = useModalBehavior({
    isOpen,
    onClose,
    onClearError,
  });

  // Custom hook for error scrolling
  const { errorContainerRef } = useErrorScroll(
    error,
    slotError,
    slotValidationError
  );

  // Handle payment initialization
  const handlePayment = async (bookingId: string) => {
    try {
      await initializePayment(
        bookingId,
        totalPrice + deliveryCost,
        user?.email || ""
      );
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous validation errors
    clearSlotValidationError();

    // Validate slot availability before proceeding (only if required)
    if (requiresAvailability) {
      const isSlotAvailable = await validateSlotAvailability(
        formData.date,
        formData.timeSlot
      );
      if (!isSlotAvailable) {
        return;
      }
    }

    // Proceed with booking
    onCheckout(formData, (bookingResponse: string) => {
      handlePayment(bookingResponse);
    });
  };

  // Handle modal close
  const handleClose = () => {
    if (onClearError) onClearError();
    onClose();
  };

  // Parse selected date for DateSlotPicker
  const selectedDate = useMemo(() => {
    const [year, month, day] = formData.date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [formData.date]);

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
            <CheckoutModalHeader onClose={handleClose} />

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
                <CheckoutModalErrors
                  error={error}
                  slotError={slotError}
                  slotValidationError={slotValidationError}
                  errorRef={errorContainerRef}
                />

                {/* Main Content - Date, Time, and Address */}
                <div className={styles.checkoutModal__mainContent}>
                  {/* Left Column - Date Selection */}
                  <div className={styles.checkoutModal__leftColumn}>
                    <DateSelection
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                      availableSlots={getAvailableSlotsForPicker()}
                      requiresAvailability={requiresAvailability}
                      loadingSlots={loadingSlots}
                    />
                  </div>

                  {/* Right Column - Time and Address */}
                  <div className={styles.checkoutModal__rightColumn}>
                    <TimeSlotSelection
                      selectedTimeSlot={formData.timeSlot}
                      onTimeSlotSelect={handleTimeSlotSelect}
                      slotAvailability={getSelectedDateSlots(formData.date)}
                      requiresAvailability={requiresAvailability}
                      loadingSlots={loadingSlots}
                      onInputChange={handleInputChange}
                    />

                    <AddressSection
                      user={user as any}
                      isAuthenticated={isAuthenticated}
                      isNewAddress={isNewAddress}
                      setIsNewAddress={setIsNewAddress}
                      formData={formData}
                      onInputChange={handleInputChange}
                      onAddressSelect={handleAddressSelect}
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <CheckoutSummary
                  totalPrice={totalPrice}
                  deliveryCost={deliveryCost}
                />

                {/* Submit Button */}
                <div className={styles.checkoutModal__buttonWrapper}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className={styles.checkoutModal__continueButton}
                    disabled={paymentLoading || submitting || validatingSlot}
                  >
                    {validatingSlot
                      ? "Checking availability..."
                      : submitting || paymentLoading
                        ? "Hang on..."
                        : "CONTINUE"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={paymentSuccess}
        onClose={() => {
          onClose();
          window.location.reload();
        }}
        title="Payment Successful!"
        message={`Your payment has been verified and your booking is confirmed. Payment reference: ${paymentReference}`}
      />
    </Portal>
  );
};

export default CheckoutModal;
