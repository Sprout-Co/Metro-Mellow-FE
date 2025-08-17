// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/RescheduleDrawer/RescheduleDrawer.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  ChevronRight,
  AlertCircle,
  Check,
} from "lucide-react";
import styles from "./RescheduleDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";

interface ServiceDetails {
  id: string;
  name: string;
  currentDate: Date;
  currentTime: string;
  provider: string;
  address: string;
}

interface RescheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceDetails | null;
  onReschedule?: (serviceId: string, newDate: Date, newTime: string) => void;
}

const RescheduleDrawer: React.FC<RescheduleDrawerProps> = ({
  isOpen,
  onClose,
  service,
  onReschedule,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [confirmationStep, setConfirmationStep] = useState(false);

  // Mock available time slots
  const timeSlots = [
    { value: "09:00", label: "9:00 AM", available: true },
    { value: "10:00", label: "10:00 AM", available: true },
    { value: "11:00", label: "11:00 AM", available: false },
    { value: "14:00", label: "2:00 PM", available: true },
    { value: "15:00", label: "3:00 PM", available: true },
    { value: "16:00", label: "4:00 PM", available: true },
    { value: "17:00", label: "5:00 PM", available: false },
    { value: "18:00", label: "6:00 PM", available: true },
  ];

  // Get next 7 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString());
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!confirmationStep) {
      setConfirmationStep(true);
    } else {
      if (service && selectedDate && selectedTime && onReschedule) {
        onReschedule(service.id, new Date(selectedDate), selectedTime);
        onClose();
        // Reset state
        setSelectedDate("");
        setSelectedTime("");
        setConfirmationStep(false);
      }
    }
  };

  const handleCancel = () => {
    if (confirmationStep) {
      setConfirmationStep(false);
    } else {
      onClose();
      // Reset state
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  const availableDates = getAvailableDates();

  return (
    <ModalDrawer isOpen={isOpen} onClose={handleCancel} width="sm">
      <div className={styles.rescheduleDrawer}>
        {/* Header */}
        <div className={styles.rescheduleDrawer__header}>
          <h2 className={styles.rescheduleDrawer__title}>Reschedule Service</h2>
          <p className={styles.rescheduleDrawer__subtitle}>
            Select a new date and time for your service
          </p>
        </div>

        {/* Current Service Details */}
        {service && (
          <div className={styles.rescheduleDrawer__currentService}>
            <h3 className={styles.rescheduleDrawer__sectionTitle}>
              Current Booking
            </h3>
            <div className={styles.rescheduleDrawer__serviceCard}>
              <div className={styles.rescheduleDrawer__serviceItem}>
                <Calendar className={styles.rescheduleDrawer__serviceIcon} />
                <div>
                  <span className={styles.rescheduleDrawer__label}>
                    Service
                  </span>
                  <span className={styles.rescheduleDrawer__value}>
                    {service.name}
                  </span>
                </div>
              </div>
              <div className={styles.rescheduleDrawer__serviceItem}>
                <Clock className={styles.rescheduleDrawer__serviceIcon} />
                <div>
                  <span className={styles.rescheduleDrawer__label}>
                    Current Time
                  </span>
                  <span className={styles.rescheduleDrawer__value}>
                    {formatDate(service.currentDate)} at {service.currentTime}
                  </span>
                </div>
              </div>
              <div className={styles.rescheduleDrawer__serviceItem}>
                <User className={styles.rescheduleDrawer__serviceIcon} />
                <div>
                  <span className={styles.rescheduleDrawer__label}>
                    Provider
                  </span>
                  <span className={styles.rescheduleDrawer__value}>
                    {service.provider}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!confirmationStep ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Date Selection */}
              <div className={styles.rescheduleDrawer__dateSection}>
                <h3 className={styles.rescheduleDrawer__sectionTitle}>
                  Select New Date
                </h3>
                <div className={styles.rescheduleDrawer__dateGrid}>
                  {availableDates.map((date) => {
                    const dateStr = date.toISOString();
                    const isSelected = selectedDate === dateStr;
                    return (
                      <motion.button
                        key={dateStr}
                        className={`${styles.rescheduleDrawer__dateCard} ${
                          isSelected
                            ? styles["rescheduleDrawer__dateCard--selected"]
                            : ""
                        }`}
                        onClick={() => handleDateSelect(date)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={styles.rescheduleDrawer__dateDay}>
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <span className={styles.rescheduleDrawer__dateNumber}>
                          {date.getDate()}
                        </span>
                        <span className={styles.rescheduleDrawer__dateMonth}>
                          {date.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  className={styles.rescheduleDrawer__timeSection}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={styles.rescheduleDrawer__sectionTitle}>
                    Select Time Slot
                  </h3>
                  <div className={styles.rescheduleDrawer__timeGrid}>
                    {timeSlots.map((slot) => (
                      <motion.button
                        key={slot.value}
                        className={`${styles.rescheduleDrawer__timeSlot} ${
                          !slot.available
                            ? styles["rescheduleDrawer__timeSlot--unavailable"]
                            : ""
                        } ${
                          selectedTime === slot.value
                            ? styles["rescheduleDrawer__timeSlot--selected"]
                            : ""
                        }`}
                        onClick={() =>
                          slot.available && handleTimeSelect(slot.value)
                        }
                        disabled={!slot.available}
                        whileHover={slot.available ? { scale: 1.05 } : {}}
                        whileTap={slot.available ? { scale: 0.95 } : {}}
                      >
                        <Clock
                          size={14}
                          className={styles.rescheduleDrawer__timeIcon}
                        />
                        <span>{slot.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={styles.rescheduleDrawer__confirmation}
            >
              <div className={styles.rescheduleDrawer__confirmationCard}>
                <div className={styles.rescheduleDrawer__confirmationIcon}>
                  <AlertCircle size={48} />
                </div>
                <h3 className={styles.rescheduleDrawer__confirmationTitle}>
                  Confirm Reschedule
                </h3>
                <p className={styles.rescheduleDrawer__confirmationText}>
                  Are you sure you want to reschedule your {service?.name} from{" "}
                  <strong>
                    {service && formatDate(service.currentDate)} at{" "}
                    {service?.currentTime}
                  </strong>{" "}
                  to{" "}
                  <strong>
                    {selectedDate && formatDate(new Date(selectedDate))} at{" "}
                    {timeSlots.find((t) => t.value === selectedTime)?.label}
                  </strong>
                  ?
                </p>
                <div className={styles.rescheduleDrawer__confirmationNote}>
                  <AlertCircle size={16} />
                  <span>
                    You can reschedule up to 24 hours before the service
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className={styles.rescheduleDrawer__footer}>
          <FnButton variant="ghost" onClick={handleCancel} fullWidth>
            {confirmationStep ? "Back" : "Cancel"}
          </FnButton>
          <FnButton
            variant="primary"
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            fullWidth
          >
            {confirmationStep ? (
              <>
                <Check size={18} />
                Confirm Reschedule
              </>
            ) : (
              <>
                Continue
                <ChevronRight size={18} />
              </>
            )}
          </FnButton>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default RescheduleDrawer;
