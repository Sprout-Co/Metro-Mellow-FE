// src/app/(routes)/(app)/dashboard/bookings/_components/RescheduleModal/RescheduleModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  User,
  MapPin,
} from "lucide-react";
import styles from "./RescheduleModal.module.scss";
import { Booking, TimeSlot } from "@/graphql/api";

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
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !booking) return null;

  // Calendar navigation
  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty days for the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Add empty days to complete the last week
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 0; i < remainingDays; i++) {
      days.push(null);
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  const timeSlots = Object.values(TimeSlot);

  // Get weekday names
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if date is weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date);
      setSelectedTime(null); // Reset time when date changes
    }
  };

  // Handle time selection
  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot) {
      setSelectedTime(slot);
    }
  };

  // Handle reschedule confirmation
  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsConfirming(true);

    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      setShowSuccess(true);

      if (onConfirm) {
        onConfirm(selectedDate.toISOString(), selectedTime);
      }

      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setSelectedDate(null);
        setSelectedTime(null);
      }, 2000);
    }, 1500);
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

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className={styles.modal}>
              <div className={styles.modal__header}>
                <div className={styles.modal__headerContent}>
                  <h2 className={styles.modal__title}>Reschedule Booking</h2>
                  <p className={styles.modal__subtitle}>
                    Select a new date and time for your service
                  </p>
                </div>
                <button className={styles.modal__closeBtn} onClick={onClose}>
                  <X size={20} />
                </button>
              </div>

              <div className={styles.modal__body}>
                {/* Current Booking Info */}
                <div className={styles.modal__currentBooking}>
                  <div className={styles.modal__sectionTitle}>
                    Current Booking
                  </div>
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
                          {booking.timeSlot}
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
                  <div className={styles.modal__sectionTitle}>
                    Select New Date
                  </div>

                  {/* Calendar Header */}
                  <div className={styles.modal__calendarHeader}>
                    <button
                      className={styles.modal__calendarNavBtn}
                      onClick={() => navigateMonth("prev")}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className={styles.modal__calendarTitle}>
                      {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <button
                      className={styles.modal__calendarNavBtn}
                      onClick={() => navigateMonth("next")}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Today Button */}
                  <div className={styles.modal__todayContainer}>
                    <button
                      className={styles.modal__todayBtn}
                      onClick={goToToday}
                    >
                      Today
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className={styles.modal__calendar}>
                    {/* Week Days Header */}
                    <div className={styles.modal__weekDays}>
                      {weekDays.map((day) => (
                        <div key={day} className={styles.modal__weekDay}>
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className={styles.modal__calendarDays}>
                      {calendarDays.map((date, index) => {
                        if (!date) {
                          return (
                            <div
                              key={`empty-${index}`}
                              className={styles.modal__calendarDayEmpty}
                            />
                          );
                        }

                        const isSelected =
                          selectedDate?.toDateString() === date.toDateString();
                        const isPast = isPastDate(date);
                        const weekend = isWeekend(date);
                        const today = isToday(date);

                        return (
                          <motion.button
                            key={date.toISOString()}
                            className={`${styles.modal__calendarDay} ${
                              isSelected
                                ? styles["modal__calendarDay--selected"]
                                : ""
                            } ${
                              isPast
                                ? styles["modal__calendarDay--disabled"]
                                : ""
                            } ${
                              weekend
                                ? styles["modal__calendarDay--weekend"]
                                : ""
                            } ${
                              today ? styles["modal__calendarDay--today"] : ""
                            }`}
                            onClick={() => handleDateSelect(date)}
                            disabled={isPast}
                            whileHover={!isPast ? { scale: 1.05 } : {}}
                            whileTap={!isPast ? { scale: 0.95 } : {}}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.01 }}
                          >
                            {date.getDate()}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
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
                      Available Time Slots for {formatDate(selectedDate)}
                    </div>
                    <div className={styles.modal__timeGrid}>
                      {Object.values(TimeSlot).map((slot, index) => {
                        const isSelected = selectedTime === slot;

                        return (
                          <motion.button
                            key={index}
                            className={`${styles.modal__timeSlot} ${
                              isSelected
                                ? styles["modal__timeSlot--selected"]
                                : ""
                            } ${!slot ? styles["modal__timeSlot--unavailable"] : ""}`}
                            onClick={() => handleTimeSelect(slot)}
                            disabled={!slot}
                            whileHover={slot ? { scale: 1.05 } : {}}
                            whileTap={slot ? { scale: 0.95 } : {}}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                          >
                            <span>{slot}</span>
                          </motion.button>
                        );
                      })}
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
                        Rescheduling is free up to 24 hours before your
                        appointment
                      </li>
                      <li>
                        Your service provider will be notified of the change
                      </li>
                      <li>
                        You'll receive a confirmation email once rescheduled
                      </li>
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
                  disabled={!selectedDate || !selectedTime || isConfirming}
                  whileHover={
                    !isConfirming && selectedDate && selectedTime
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    !isConfirming && selectedDate && selectedTime
                      ? { scale: 0.98 }
                      : {}
                  }
                >
                  {isConfirming ? "Rescheduling..." : "Confirm Reschedule"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RescheduleModal;
