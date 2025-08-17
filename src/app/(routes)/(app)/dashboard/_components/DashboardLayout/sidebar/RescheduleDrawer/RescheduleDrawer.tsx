// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/RescheduleDrawer/RescheduleDrawer.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  ChevronRight,
  Check,
  Home,
  Droplets,
  Utensils,
  Bug,
  Package,
} from "lucide-react";
import styles from "./RescheduleDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";

interface UpcomingService {
  id: string;
  name: string;
  type: string;
  date: Date;
  time: string;
  provider: string;
  address: string;
  icon: React.ReactNode;
  color: string;
}

interface RescheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule?: (serviceId: string, newDate: Date, newTime: string) => void;
}

const RescheduleDrawer: React.FC<RescheduleDrawerProps> = ({
  isOpen,
  onClose,
  onReschedule,
}) => {
  const [step, setStep] = useState<
    "select-service" | "select-datetime" | "confirm"
  >("select-service");
  const [selectedService, setSelectedService] =
    useState<UpcomingService | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Mock upcoming services
  const upcomingServices: UpcomingService[] = [
    {
      id: "1",
      name: "Deep Home Cleaning",
      type: "Cleaning",
      date: new Date(2024, 7, 20),
      time: "10:00 AM",
      provider: "Maria Rodriguez",
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Home />,
      color: "#075056",
    },
    {
      id: "2",
      name: "Laundry Service",
      type: "Laundry",
      date: new Date(2024, 7, 22),
      time: "2:00 PM",
      provider: "QuickWash Team",
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Droplets />,
      color: "#6366f1",
    },
    {
      id: "3",
      name: "Meal Preparation",
      type: "Cooking",
      date: new Date(2024, 7, 24),
      time: "5:00 PM",
      provider: "Chef Kemi",
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Utensils />,
      color: "#fe5b04",
    },
  ];

  // Time slots
  const timeSlots = [
    { value: "09:00", label: "9:00 AM", available: true },
    { value: "10:00", label: "10:00 AM", available: true },
    { value: "11:00", label: "11:00 AM", available: false },
    { value: "12:00", label: "12:00 PM", available: true },
    { value: "14:00", label: "2:00 PM", available: true },
    { value: "15:00", label: "3:00 PM", available: true },
    { value: "16:00", label: "4:00 PM", available: false },
    { value: "17:00", label: "5:00 PM", available: true },
    { value: "18:00", label: "6:00 PM", available: true },
  ];

  // Get next 14 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
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

  const handleServiceSelect = (service: UpcomingService) => {
    setSelectedService(service);
    setStep("select-datetime");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString());
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("select-datetime");
    } else if (step === "select-datetime") {
      setStep("select-service");
      setSelectedDate("");
      setSelectedTime("");
    } else {
      onClose();
    }
  };

  const handleContinue = () => {
    if (step === "select-datetime" && selectedDate && selectedTime) {
      setStep("confirm");
    }
  };

  const handleConfirm = () => {
    if (selectedService && selectedDate && selectedTime && onReschedule) {
      onReschedule(selectedService.id, new Date(selectedDate), selectedTime);
      onClose();
      // Reset state
      setStep("select-service");
      setSelectedService(null);
      setSelectedDate("");
      setSelectedTime("");
    }
  };

  const resetAndClose = () => {
    setStep("select-service");
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    onClose();
  };

  const availableDates = getAvailableDates();
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={resetAndClose} width="sm">
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawer__header}>
          <button className={styles.drawer__backBtn} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.drawer__headerText}>
            <h2 className={styles.drawer__title}>
              {step === "select-service" && "Select Service"}
              {step === "select-datetime" && "Choose New Time"}
              {step === "confirm" && "Confirm Changes"}
            </h2>
            <p className={styles.drawer__subtitle}>
              {step === "select-service" &&
                "Choose which service to reschedule"}
              {step === "select-datetime" && "Pick a new date and time"}
              {step === "confirm" && "Review and confirm your changes"}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className={styles.drawer__progress}>
          <div
            className={`${styles.drawer__progressStep} ${styles["drawer__progressStep--active"]}`}
          >
            <span className={styles.drawer__progressNumber}>1</span>
            <span className={styles.drawer__progressLabel}>Service</span>
          </div>
          <div
            className={`${styles.drawer__progressLine} ${step !== "select-service" ? styles["drawer__progressLine--active"] : ""}`}
          />
          <div
            className={`${styles.drawer__progressStep} ${step !== "select-service" ? styles["drawer__progressStep--active"] : ""}`}
          >
            <span className={styles.drawer__progressNumber}>2</span>
            <span className={styles.drawer__progressLabel}>Schedule</span>
          </div>
          <div
            className={`${styles.drawer__progressLine} ${step === "confirm" ? styles["drawer__progressLine--active"] : ""}`}
          />
          <div
            className={`${styles.drawer__progressStep} ${step === "confirm" ? styles["drawer__progressStep--active"] : ""}`}
          >
            <span className={styles.drawer__progressNumber}>3</span>
            <span className={styles.drawer__progressLabel}>Confirm</span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.drawer__content}>
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === "select-service" && (
              <motion.div
                key="select-service"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__services}
              >
                <h3 className={styles.drawer__sectionTitle}>
                  Your Upcoming Services
                </h3>
                <div className={styles.drawer__servicesList}>
                  {upcomingServices.map((service) => (
                    <motion.div
                      key={service.id}
                      className={styles.drawer__serviceCard}
                      onClick={() => handleServiceSelect(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={styles.drawer__serviceIcon}
                        style={{ backgroundColor: `${service.color}15` }}
                      >
                        <span style={{ color: service.color }}>
                          {service.icon}
                        </span>
                      </div>
                      <div className={styles.drawer__serviceInfo}>
                        <h4 className={styles.drawer__serviceName}>
                          {service.name}
                        </h4>
                        <div className={styles.drawer__serviceMeta}>
                          <span>
                            <Calendar size={14} />
                            {formatDate(service.date)}
                          </span>
                          <span>
                            <Clock size={14} />
                            {service.time}
                          </span>
                        </div>
                        <p className={styles.drawer__serviceProvider}>
                          <User size={14} />
                          {service.provider}
                        </p>
                      </div>
                      <ChevronRight className={styles.drawer__serviceArrow} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === "select-datetime" && selectedService && (
              <motion.div
                key="select-datetime"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__datetime}
              >
                {/* Current Schedule Info */}
                <div className={styles.drawer__currentInfo}>
                  <div className={styles.drawer__currentInfoIcon}>
                    <Calendar size={16} />
                  </div>
                  <div className={styles.drawer__currentInfoText}>
                    <span className={styles.drawer__currentInfoLabel}>
                      Current Schedule
                    </span>
                    <span className={styles.drawer__currentInfoValue}>
                      {formatDate(selectedService.date)} at{" "}
                      {selectedService.time}
                    </span>
                  </div>
                </div>

                {/* Date Selection */}
                <div className={styles.drawer__dateSection}>
                  <h3 className={styles.drawer__sectionTitle}>Select Date</h3>
                  <div className={styles.drawer__dateGrid}>
                    {availableDates.map((date) => {
                      const dateStr = date.toISOString();
                      const isSelected = selectedDate === dateStr;
                      return (
                        <motion.button
                          key={dateStr}
                          className={`${styles.drawer__dateCard} ${
                            isSelected
                              ? styles["drawer__dateCard--selected"]
                              : ""
                          }`}
                          onClick={() => handleDateSelect(date)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={styles.drawer__dateWeekday}>
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </span>
                          <span className={styles.drawer__dateDay}>
                            {date.getDate()}
                          </span>
                          {isTomorrow(date) && (
                            <span className={styles.drawer__dateLabel}>
                              Tomorrow
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    className={styles.drawer__timeSection}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className={styles.drawer__sectionTitle}>Select Time</h3>
                    <div className={styles.drawer__timeGrid}>
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot.value}
                          className={`${styles.drawer__timeSlot} ${
                            !slot.available
                              ? styles["drawer__timeSlot--unavailable"]
                              : ""
                          } ${
                            selectedTime === slot.value
                              ? styles["drawer__timeSlot--selected"]
                              : ""
                          }`}
                          onClick={() =>
                            slot.available && handleTimeSelect(slot.value)
                          }
                          disabled={!slot.available}
                          whileHover={slot.available ? { scale: 1.05 } : {}}
                          whileTap={slot.available ? { scale: 0.95 } : {}}
                        >
                          {slot.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Confirm */}
            {step === "confirm" && selectedService && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__confirm}
              >
                <div className={styles.drawer__confirmCard}>
                  <div className={styles.drawer__confirmIcon}>
                    <Check size={24} />
                  </div>
                  <h3 className={styles.drawer__confirmTitle}>
                    Ready to Reschedule?
                  </h3>

                  <div className={styles.drawer__confirmDetails}>
                    <div className={styles.drawer__confirmItem}>
                      <span className={styles.drawer__confirmLabel}>
                        Service
                      </span>
                      <span className={styles.drawer__confirmValue}>
                        {selectedService.name}
                      </span>
                    </div>
                    <div className={styles.drawer__confirmDivider} />
                    <div className={styles.drawer__confirmItem}>
                      <span className={styles.drawer__confirmLabel}>From</span>
                      <span className={styles.drawer__confirmValue}>
                        {formatDate(selectedService.date)} at{" "}
                        {selectedService.time}
                      </span>
                    </div>
                    <div className={styles.drawer__confirmDivider} />
                    <div className={styles.drawer__confirmItem}>
                      <span className={styles.drawer__confirmLabel}>To</span>
                      <span className={styles.drawer__confirmValue}>
                        {selectedDate && formatDate(new Date(selectedDate))} at{" "}
                        {timeSlots.find((t) => t.value === selectedTime)?.label}
                      </span>
                    </div>
                  </div>

                  <p className={styles.drawer__confirmNote}>
                    You'll receive a confirmation email once the change is
                    processed.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className={styles.drawer__footer}>
          {step === "select-service" && (
            <FnButton variant="ghost" onClick={onClose} fullWidth>
              Cancel
            </FnButton>
          )}

          {step === "select-datetime" && (
            <>
              <FnButton variant="ghost" onClick={handleBack} fullWidth>
                Back
              </FnButton>
              <FnButton
                variant="primary"
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                fullWidth
              >
                Continue
              </FnButton>
            </>
          )}

          {step === "confirm" && (
            <>
              <FnButton variant="ghost" onClick={handleBack} fullWidth>
                Back
              </FnButton>
              <FnButton variant="primary" onClick={handleConfirm} fullWidth>
                Confirm Changes
              </FnButton>
            </>
          )}
        </div>
      </div>
    </ModalDrawer>
  );
};

export default RescheduleDrawer;
