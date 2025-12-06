// src/app/(routes)/(app)/dashboard/bookings/_components/RescheduleModal/RescheduleModal.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, AlertCircle, CheckCircle, User } from "lucide-react";
import styles from "./RescheduleModal.module.scss";
import {
  Booking,
  TimeSlot,
  DateAvailability,
  SlotAvailability,
  ServiceCategory,
} from "@/graphql/api";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import DateSlotPicker from "@/components/ui/booking/DateSlotPicker/DateSlotPicker";
import TimeSlotSelector from "@/components/ui/booking/TimeSlotSelector/TimeSlotSelector";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  mapServiceCategoryToEnum,
  formatDateForAPI,
  getSlotAvailabilityForDate,
  getTomorrowDate,
  getMaxDate,
  formatDateToLocalString,
} from "@/utils/slotHelpers";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onConfirm?: (date: string, time: string) => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  booking,
  onConfirm,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Slot availability state
  const [availableSlots, setAvailableSlots] = useState<DateAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [validatingSlot, setValidatingSlot] = useState(false);

  const {
    handleRescheduleBooking,
    handleGetAvailableSlots,
    handleCheckSlotAvailability,
  } = useBookingOperations();

  // Determine if availability-based date/time is required
  const serviceCategoryEnum = useMemo(
    () => booking?.service_category || ServiceCategory.Cleaning,
    [booking?.service_category]
  );
  const requiresAvailability = useMemo(
    () =>
      ![ServiceCategory.Cooking, ServiceCategory.Laundry].includes(
        serviceCategoryEnum
      ),
    [serviceCategoryEnum]
  );

  // Fetch available slots when modal opens
  const fetchAvailableSlots = useCallback(async () => {
    if (!isOpen || !booking || !requiresAvailability) return;

    setLoadingSlots(true);
    setSlotError(null);

    try {
      const startDate = getTomorrowDate();
      const endDate = getMaxDate();
      const serviceCategory = serviceCategoryEnum;

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
  }, [
    isOpen,
    booking,
    requiresAvailability,
    serviceCategoryEnum,
    handleGetAvailableSlots,
  ]);

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

  if (!isOpen || !booking) return null;

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle date selection from calendar
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTime(timeSlot);
  };

  // Get slot availability for selected date
  const getSelectedDateSlots = (): SlotAvailability[] => {
    if (!selectedDate) return [];
    return getSlotAvailabilityForDate(selectedDate, availableSlots);
  };

  // Validate selected slot availability
  const validateSlotAvailability = async (): Promise<boolean> => {
    if (!selectedDate || !selectedTime || !requiresAvailability) return true;

    setValidatingSlot(true);
    setError(null);

    try {
      const serviceCategory = serviceCategoryEnum;

      const slotCheck = await handleCheckSlotAvailability({
        date: formatDateForAPI(selectedDate),
        timeSlot: selectedTime,
        serviceCategory,
      });

      if (!slotCheck?.isAvailable) {
        setError(
          `The ${selectedTime.toLowerCase()} slot is no longer available. Please select a different time slot.`
        );

        // Refresh availability data
        await fetchAvailableSlots();

        return false;
      }

      return true;
    } catch (err) {
      console.error("Slot validation error:", err);
      setError("Unable to verify slot availability. Please try again.");
      return false;
    } finally {
      setValidatingSlot(false);
    }
  };

  // Format time slot for display
  const formatTimeSlot = (timeSlot: TimeSlot) => {
    switch (timeSlot) {
      case TimeSlot.Morning:
        return "9:00 AM - 12:00 PM";
      case TimeSlot.Afternoon:
        return "12:00 PM - 5:00 PM";
      case TimeSlot.Evening:
        return "5:00 PM - 8:00 PM";
      default:
        return timeSlot;
    }
  };

  // Handle reschedule confirmation
  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !booking) return;

    setIsConfirming(true);
    setError(null);

    try {
      // Validate slot availability before proceeding (only if required)
      if (requiresAvailability) {
        const isSlotAvailable = await validateSlotAvailability();
        if (!isSlotAvailable) {
          // Slot validation failed, error message is already set
          setIsConfirming(false);
          return;
        }
      }

      await handleRescheduleBooking(
        booking.id,
        formatDateForAPI(selectedDate),
        selectedTime
      );

      setShowSuccess(true);

      if (onConfirm) {
        onConfirm(formatDateForAPI(selectedDate), selectedTime);
      }

      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setSelectedDate(null);
        setSelectedTime(null);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to reschedule booking"
      );
    } finally {
      setIsConfirming(false);
    }
  };

  // Get service icon
  const getServiceIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      CLEANING: "🧹",
      LAUNDRY: "👕",
      COOKING: "🍳",
      ERRANDS: "📦",
      PEST_CONTROL: "🐛",
    };
    return icons[category] || "🏠";
  };

  const footerContent = (
    <div className={styles.modal__footer}>
      <motion.button
        className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
        onClick={onClose}
        disabled={isConfirming}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Cancel
      </motion.button>
      <motion.button
        className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
        onClick={handleConfirm}
        disabled={
          !selectedDate || !selectedTime || isConfirming || validatingSlot
        }
        whileHover={
          !isConfirming && !validatingSlot && selectedDate && selectedTime
            ? { scale: 1.02 }
            : {}
        }
        whileTap={
          !isConfirming && !validatingSlot && selectedDate && selectedTime
            ? { scale: 0.98 }
            : {}
        }
      >
        {validatingSlot
          ? "Checking availability..."
          : isConfirming
            ? "Rescheduling..."
            : "Confirm Reschedule"}
      </motion.button>
    </div>
  );

  return (
    <>
      <ModalDrawer
        isOpen={isOpen}
        onClose={onClose}
        width="lg"
        title="Reschedule Booking"
        description="Select a new date and time for your service"
        showFooter={true}
        footer={footerContent}
      >
        <div className={styles.modal}>
          <div className={styles.modal__body}>
            {/* Current Booking Info */}
            <div className={styles.modal__currentBooking}>
              <div className={styles.modal__sectionTitle}>Current Booking</div>
              <div className={styles.modal__bookingCard}>
                <div className={styles.modal__bookingIcon}>
                  {getServiceIcon(booking.service_category)}
                </div>
                <div className={styles.modal__bookingInfo}>
                  <h4>{booking.service.name}</h4>
                  <div className={styles.modal__bookingDetails}>
                    <span>
                      <Calendar size={14} />
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      <Clock size={14} />
                      {formatTimeSlot(booking.timeSlot)}
                    </span>
                    <span>
                      <User size={14} />
                      {booking.staff?.firstName} {booking.staff?.lastName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Date Selection */}
            <div className={styles.modal__section}>
              <div className={styles.modal__sectionTitle}>Select New Date</div>

              {requiresAvailability ? (
                loadingSlots ? (
                  <div className={styles.modal__loading}>
                    <p>Loading available dates...</p>
                  </div>
                ) : (
                  <DateSlotPicker
                    selectedDate={selectedDate || getTomorrowDate()}
                    onDateSelect={handleDateSelect}
                    availableSlots={availableSlots}
                    disabled={loadingSlots}
                  />
                )
              ) : (
                <div className={styles.modal__dateInput}>
                  <input
                    type="date"
                    value={
                      selectedDate ? formatDateToLocalString(selectedDate) : ""
                    }
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      if (!isNaN(newDate.getTime())) {
                        handleDateSelect(newDate);
                      }
                    }}
                    min={getTomorrowDate().toISOString().split("T")[0]}
                    className={styles.modal__dateInputField}
                  />
                </div>
              )}

              {slotError && (
                <div className={styles.modal__error}>
                  <AlertCircle size={16} />
                  <p>{slotError}</p>
                </div>
              )}
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <motion.div
                className={styles.modal__section}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modal__sectionTitle}>
                  {requiresAvailability
                    ? `Available Time Slots for ${formatDate(selectedDate)}`
                    : `Select Time for ${formatDate(selectedDate)}`}
                </div>

                {requiresAvailability ? (
                  loadingSlots ? (
                    <div className={styles.modal__loading}>
                      <p>Loading time slots...</p>
                    </div>
                  ) : (
                    <TimeSlotSelector
                      selectedTimeSlot={selectedTime || TimeSlot.Morning}
                      onTimeSlotSelect={handleTimeSlotSelect}
                      slotAvailability={getSelectedDateSlots()}
                      disabled={loadingSlots}
                    />
                  )
                ) : (
                  <div className={styles.modal__timeSelect}>
                    <select
                      value={selectedTime || ""}
                      onChange={(e) =>
                        handleTimeSlotSelect(e.target.value as TimeSlot)
                      }
                      className={styles.modal__timeSelectField}
                    >
                      <option value="">Select Time</option>
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
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                className={styles.modal__error}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AlertCircle size={16} />
                <div>
                  <strong>Error:</strong>
                  <p>{error}</p>
                </div>
              </motion.div>
            )}

            {/* Important Notes */}
            <div className={styles.modal__notes}>
              <AlertCircle size={16} />
              <div>
                <strong>Important:</strong>
                <ul>
                  <li>
                    Rescheduling is free up to 24 hours before your appointment
                  </li>
                  <li>Your service provider will be notified of the change</li>
                  <li>You'll receive a confirmation email once rescheduled</li>
                </ul>
              </div>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className={styles.modal__success}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CheckCircle size={24} />
                  <div>
                    <h4>Booking Rescheduled Successfully!</h4>
                    <p>You'll receive a confirmation email shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ModalDrawer>
    </>
  );
};

export default RescheduleModal;
