"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon, { IconName } from "../common/Icon";
import Modal from "@/components/ui/Modal/Modal";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { TimeSlot, Booking, BookingStatus } from "@/graphql/api";
import styles from "./RescheduleServiceModal.module.scss";

interface RescheduleServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string; // Optional: pre-selected booking ID
}

const RescheduleServiceModal = ({
  isOpen,
  onClose,
  bookingId,
}: RescheduleServiceModalProps) => {
  const {
    handleRescheduleBooking,
    handleGetCustomerBookings,
    currentCustomerBookings,
  } = useBookingOperations();

  // State for selected booking and new schedule
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookingId || ""
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<TimeSlot>(TimeSlot.Morning);
  const [isLoading, setIsLoading] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const [customerBookingsData, setCustomerBookingsData] = useState<Booking[]>(
    []
  );

  // Load customer bookings when modal opens
  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }

    // Set the bookingId if provided as prop
    if (bookingId) {
      setSelectedBookingId(bookingId);
    }
  }, [isOpen, bookingId]);

  // Set default date when booking is selected
  useEffect(() => {
    if (selectedBookingId) {
      const selectedBooking = customerBookingsData.find(
        (booking) => booking.id === selectedBookingId
      );
      if (selectedBooking) {
        const bookingDate = new Date(selectedBooking.date);
        const nextDay = new Date(bookingDate);
        nextDay.setDate(bookingDate.getDate() + 1);
        setSelectedDate(nextDay.toISOString().split("T")[0]);
      }
    }
  }, [selectedBookingId, customerBookingsData]);

  // Load customer bookings
  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const bookings = await handleGetCustomerBookings();
      // Filter for pending bookings and sort by date
      const pendingBookings = (bookings || [])
        .filter((booking) => booking.status === BookingStatus.Pending)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      console.log("pendingBookings", pendingBookings);
      console.log("bookings", bookings);
      setCustomerBookingsData(pendingBookings as Booking[]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setIsLoading(false);
    }
  };

  // Handle reschedule submission
  const handleSubmit = async () => {
    if (!selectedBookingId || !selectedDate || !selectedTime) return;

    try {
      setIsRescheduling(true);
      await handleRescheduleBooking(
        selectedBookingId,
        selectedDate,
        selectedTime
      );
      setRescheduleSuccess(true);
      setIsRescheduling(false);

      // Reset form after success
      setTimeout(() => {
        onClose();
        setRescheduleSuccess(false);
        setSelectedBookingId(bookingId || "");
        setSelectedDate("");
        setSelectedTime(TimeSlot.Morning);
      }, 2000);
    } catch (error) {
      console.error("Error rescheduling booking:", error);
      setIsRescheduling(false);
    }
  };

  // Don't render if modal is closed
  // if (!isOpen) return null;

  // Show loading state
  if (isLoading) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Reschedule Service"
        maxWidth="600px"
      >
        <div className={styles.modal__content}>
          <p>Loading your bookings...</p>
        </div>
      </Modal>
    );
  }

  // Show success message
  if (rescheduleSuccess) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Reschedule Service"
        maxWidth="600px"
      >
        <div className={styles.modal__content}>
          <div className={styles.modal__success}>
            <div className={styles.modal__successIcon}>
              <Icon name="check-circle" />
            </div>
            <h3 className={styles.modal__successTitle}>Service Rescheduled!</h3>
            <p className={styles.modal__successMessage}>
              Your service has been successfully rescheduled. You'll receive a
              confirmation email shortly.
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  // Show empty state if no bookings
  if (customerBookingsData.length === 0) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Reschedule Service"
        maxWidth="600px"
      >
        <div className={styles.modal__content}>
          <div className={styles.modal__empty}>
            <div className={styles.modal__emptyIcon}>
              <Icon name="calendar-x" />
            </div>
            <h3 className={styles.modal__emptyTitle}>No Active Bookings</h3>
            <p className={styles.modal__emptyMessage}>
              You don't have any active bookings to reschedule. Book a service
              first.
            </p>
            <button
              className={`${styles.modal__button} ${styles.modal__buttonPrimary}`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Main modal content
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reschedule Service"
      maxWidth="600px"
    >
      <div className={styles.modal__content}>
        <h2 className={styles.modal__contentTitle}>
          <Icon name="calendar" />
          Reschedule Your Service
        </h2>
        <p className={styles.modal__contentSubtitle}>
          Select a booking and choose a new date and time
        </p>

        {/* Booking selection */}
        <div className={styles.modal__formGroup}>
          <label htmlFor="booking">
            <Icon name="list" />
            Select Booking
          </label>
          <select
            id="booking"
            className={styles.modal__select}
            value={selectedBookingId}
            onChange={(e) => setSelectedBookingId(e.target.value)}
          >
            <option value="">Select a booking to reschedule</option>
            {customerBookingsData.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.service?.name || "Unknown Service"} -{" "}
                {new Date(booking.date).toDateString()} -{" "}
                {booking.timeSlot.toLowerCase()} - {booking.status}
              </option>
            ))}
          </select>
          <p className={styles.modal__helper}>
            Choose which of your active bookings you want to reschedule
          </p>
        </div>

        {/* New schedule selection */}
        {selectedBookingId && (
          <div className={styles.modal__formGroup}>
            <label>
              <Icon name="calendar" />
              New Schedule
            </label>
            <div className={styles.modal__formRow}>
              <div className={styles.modal__formGroup}>
                <label htmlFor="date">New Date</label>
                <input
                  id="date"
                  type="date"
                  className={styles.modal__input}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className={styles.modal__formGroup}>
                <label htmlFor="time">New Time</label>
                <select
                  id="time"
                  className={styles.modal__select}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value as TimeSlot)}
                >
                  <option value="">Select a time slot</option>
                  <option value={TimeSlot.Morning}>
                    Morning (8:00 AM - 12:00 PM)
                  </option>
                  <option value={TimeSlot.Afternoon}>
                    Afternoon (12:00 PM - 4:00 PM)
                  </option>
                  <option value={TimeSlot.Evening}>
                    Evening (4:00 PM - 8:00 PM)
                  </option>
                </select>
              </div>
            </div>
            <p className={styles.modal__helper}>
              Our service hours are 9:00 AM to 5:00 PM, Monday through Saturday
            </p>
          </div>
        )}

        {/* Submit button */}
        <div className={styles.modal__footer}>
          <button
            className={`${styles.modal__button} ${styles.modal__buttonBack}`}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`${styles.modal__button} ${styles.modal__buttonPrimary}`}
            onClick={handleSubmit}
            disabled={
              !selectedBookingId ||
              !selectedDate ||
              !selectedTime ||
              isRescheduling
            }
          >
            {isRescheduling ? "Rescheduling..." : "Reschedule Service"}
            {!isRescheduling && <Icon name="arrow-right" />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RescheduleServiceModal;
