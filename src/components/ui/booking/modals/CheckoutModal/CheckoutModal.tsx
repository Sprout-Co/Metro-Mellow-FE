"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../../../Portal/Portal";
import Button from "../../../Button/Button";
import DateSlotPicker from "../../DateSlotPicker/DateSlotPicker";
import TimeSlotSelector from "../../TimeSlotSelector/TimeSlotSelector";
import styles from "./CheckoutModal.module.scss";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  AddressInput,
  TimeSlot,
  DateAvailability,
  SlotAvailability,
  ServiceCategory,
} from "@/graphql/api";
import { usePayment } from "@/hooks/usePayment";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  mapServiceCategoryToEnum,
  formatDateForAPI,
  getSlotAvailabilityForDate,
  getTomorrowDate,
  getMaxDate,
  formatDateToLocalString,
} from "@/utils/slotHelpers";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";

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
  // Form state management
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    initializePayment,
    loading: paymentLoading,
    error: paymentError,
    paymentSuccess,
    paymentReference,
  } = usePayment();

  // Booking operations hook
  const { handleGetAvailableSlots, handleCheckSlotAvailability } =
    useBookingOperations();

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

  // Slot availability state
  const [availableSlots, setAvailableSlots] = useState<DateAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [validatingSlot, setValidatingSlot] = useState(false);
  const [slotValidationError, setSlotValidationError] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState<CheckoutFormData>({
    date: formatDateToLocalString(getTomorrowDate()),
    timeSlot: TimeSlot.Morning,
    city: user?.defaultAddress?.city || "",
    street: user?.defaultAddress?.street || "",
    addressId: user?.defaultAddress?.id,
  });

  const [isNewAddress, setIsNewAddress] = useState(!user?.addresses?.length);

  // Ref for error container to scroll to
  const errorContainerRef = React.useRef<HTMLDivElement>(null);

  // Fetch available slots when modal opens
  const fetchAvailableSlots = useCallback(async () => {
    if (!isOpen || !requiresAvailability) return;

    setLoadingSlots(true);
    setSlotError(null);

    try {
      const startDate = getTomorrowDate();
      const endDate = getMaxDate();
      const serviceCategory = mapServiceCategoryToEnum(service_category);

      const slots = await handleGetAvailableSlots(
        formatDateForAPI(startDate),
        formatDateForAPI(endDate),
        serviceCategory
      );

      setAvailableSlots(slots || []);
    } catch (err) {
      console.error("Failed to fetch available slots:", err);
      setSlotError("Unable to load available time slots. Please try again.");
    } finally {
      setLoadingSlots(false);
    }
  }, [isOpen, requiresAvailability, service_category, handleGetAvailableSlots]);

  // Fetch slots when modal opens
  useEffect(() => {
    if (isOpen && requiresAvailability) {
      fetchAvailableSlots();
    }
    if (isOpen && !requiresAvailability) {
      // Clear any previous slot-related errors/data when not required
      setAvailableSlots([]);
      setSlotError(null);
    }
  }, [isOpen, requiresAvailability, fetchAvailableSlots]);

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

  // Reset date to tomorrow when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        date: formatDateToLocalString(getTomorrowDate()),
      }));
    }
  }, [isOpen]);

  // Scroll to error when any error appears
  React.useEffect(() => {
    if (
      (error || slotError || slotValidationError) &&
      errorContainerRef.current
    ) {
      setTimeout(() => {
        errorContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [error, slotError, slotValidationError]);

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

  // Handle date selection from calendar
  const handleDateSelect = (date: Date) => {
    // Use local date formatting to avoid timezone issues
    const dateString = formatDateToLocalString(date);

    setFormData((prev) => ({
      ...prev,
      date: dateString,
    }));
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot,
    }));
  };

  // Get slot availability for selected date
  const getSelectedDateSlots = (): SlotAvailability[] => {
    const selectedDate = new Date(formData.date);
    return getSlotAvailabilityForDate(selectedDate, availableSlots);
  };

  // Generate fake availability data for all dates when not required
  const getAvailableSlotsForPicker = (): DateAvailability[] => {
    if (requiresAvailability) {
      return availableSlots;
    }

    // For services that don't require availability, generate fake data
    // so all dates appear available in the picker
    const fakeSlots: DateAvailability[] = [];
    const startDate = getTomorrowDate();
    const endDate = getMaxDate();

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      fakeSlots.push({
        date: currentDate.toISOString().split("T")[0],
        hasAvailableSlots: true,
        slots: [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return fakeSlots;
  };

  // Validate selected slot availability
  const validateSlotAvailability = async (): Promise<boolean> => {
    setValidatingSlot(true);
    setSlotValidationError(null);

    try {
      const selectedDate = new Date(formData.date);
      const serviceCategory = mapServiceCategoryToEnum(service_category);

      const slotCheck = await handleCheckSlotAvailability({
        date: formatDateForAPI(selectedDate),
        timeSlot: formData.timeSlot,
        serviceCategory,
      });

      if (!slotCheck?.isAvailable) {
        setSlotValidationError(
          `The ${formData.timeSlot.toLowerCase()} slot is no longer available. Please select a different time slot.`
        );

        // Refresh availability data
        await fetchAvailableSlots();

        return false;
      }

      return true;
    } catch (err) {
      console.error("Slot validation error:", err);
      setSlotValidationError(
        "Unable to verify slot availability. Please try again."
      );
      return false;
    } finally {
      setValidatingSlot(false);
    }
  };

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
    setSlotValidationError(null);

    // Validate slot availability before proceeding (only if required)
    if (requiresAvailability) {
      const isSlotAvailable = await validateSlotAvailability();
      if (!isSlotAvailable) {
        // Slot validation failed, error message is already set
        return;
      }
    }

    // Proceed with booking if slot is available
    console.log("formData", formData);
    onCheckout(formData, (bookingResponse: string) => {
      console.log("bookingResponse", bookingResponse);
      handlePayment(bookingResponse);
    });
  };

  const deliveryCost = useMemo(() => {
    // If an address is selected, get delivery cost from that address's service area
    if (formData.addressId && user?.addresses) {
      const selectedAddress = user.addresses.find(
        (addr) => addr?.id === formData.addressId
      );
      return selectedAddress?.serviceArea?.deliveryCost || 0;
    }

    // Fallback to default address if no specific address is selected
    return user?.defaultAddress?.serviceArea?.deliveryCost || 0;
  }, [
    formData.addressId,
    user?.addresses,
    user?.defaultAddress?.serviceArea?.deliveryCost,
  ]);

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
                <div ref={errorContainerRef}>
                  {error && (
                    <div className={styles.checkoutModal__errorMessage}>
                      <p>{error}</p>
                    </div>
                  )}

                  {/* Slot Error Display */}
                  {slotError && (
                    <div className={styles.checkoutModal__errorMessage}>
                      <p>{slotError}</p>
                    </div>
                  )}

                  {/* Slot Validation Error Display */}
                  {slotValidationError && (
                    <div className={styles.checkoutModal__errorMessage}>
                      <p>{slotValidationError}</p>
                    </div>
                  )}
                </div>
                <div className={styles.checkoutModal__mainContent}>
                  <div className={styles.checkoutModal__leftColumn}>
                    {/* Date Selection */}
                    <div className={styles.checkoutModal__field}>
                      <label className={styles.checkoutModal__label}>
                        Select Date
                      </label>

                      {requiresAvailability && loadingSlots ? (
                        <div className={styles.checkoutModal__loadingContainer}>
                          <div
                            className={styles.checkoutModal__loadingSkeleton}
                          />
                          <p className={styles.checkoutModal__loadingText}>
                            Loading available dates...
                          </p>
                        </div>
                      ) : (
                        <DateSlotPicker
                          selectedDate={(() => {
                            const [year, month, day] = formData.date
                              .split("-")
                              .map(Number);
                            return new Date(year, month - 1, day);
                          })()}
                          onDateSelect={handleDateSelect}
                          availableSlots={getAvailableSlotsForPicker()}
                          disabled={loadingSlots}
                          requiresAvailability={requiresAvailability}
                        />
                      )}
                    </div>

                    {/* Time Slot Selection */}
                    {/* MOVED TO RIGHT COLUMN */}
                  </div>
                  <div className={styles.checkoutModal__rightColumn}>
                    {/* Time Slot Selection */}
                    {requiresAvailability ? (
                      <div className={styles.checkoutModal__field}>
                        <label className={styles.checkoutModal__label}>
                          Select Time Slot
                        </label>

                        {loadingSlots ? (
                          <div
                            className={styles.checkoutModal__loadingContainer}
                          >
                            <div
                              className={styles.checkoutModal__loadingSkeleton}
                            />
                            <p className={styles.checkoutModal__loadingText}>
                              Loading time slots...
                            </p>
                          </div>
                        ) : (
                          <TimeSlotSelector
                            selectedTimeSlot={formData.timeSlot}
                            onTimeSlotSelect={handleTimeSlotSelect}
                            slotAvailability={getSelectedDateSlots()}
                            disabled={loadingSlots}
                          />
                        )}
                      </div>
                    ) : (
                      <div className={styles.checkoutModal__field}>
                        <label className={styles.checkoutModal__label}>
                          Select Time
                        </label>
                        <select
                          id="timeSlot"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className={styles.checkoutModal__select}
                          required
                        >
                          <option value={TimeSlot.Morning}>
                            Morning (9:00 AM - 12:00 PM)
                          </option>
                          <option value={TimeSlot.Afternoon}>
                            Afternoon (12:00 PM - 4:00 PM)
                          </option>
                          <option value={TimeSlot.Evening}>
                            Evening (4:00 PM - 8:00 PM)
                          </option>
                        </select>
                      </div>
                    )}
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

                            <option value="victoria-island">
                              Victoria Island
                            </option>

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
                            <h4 className={styles.checkoutModal__label}>
                              Select an address
                            </h4>

                            {user.addresses.map(
                              (address) =>
                                address && (
                                  <div
                                    key={address.id}
                                    className={`${
                                      styles.checkoutModal__addressCard
                                    } ${
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
                                        checked={
                                          formData.addressId === address.id
                                        }
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
                  </div>
                </div>

                {/* Booking Summary */}
                <div className={styles.checkoutModal__summary}>
                  <div className={styles.checkoutModal__summaryItem}>
                    <span>Subtotal</span>
                    <span>₦{totalPrice}</span>
                  </div>
                  <div className={styles.checkoutModal__summaryItem}>
                    <span>Delivery Fee</span>
                    <span>₦{deliveryCost}</span>
                  </div>
                  <div className={styles.checkoutModal__summaryItem}>
                    <span>Discount</span>
                    <span>₦0</span>
                  </div>
                  <div className={styles.checkoutModal__summaryItem}>
                    <span>Total</span>
                    <span>₦{totalPrice + deliveryCost}</span>
                  </div>
                </div>

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
          // Reset payment success state and close modal
          // You might want to add a reset function to usePayment hook
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
