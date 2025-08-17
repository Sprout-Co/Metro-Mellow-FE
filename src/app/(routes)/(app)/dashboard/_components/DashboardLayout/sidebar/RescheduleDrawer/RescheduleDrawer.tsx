// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/RescheduleDrawer/RescheduleDrawer.tsx
"use client";

import React, { useState, useMemo } from "react";
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
  Search,
  Filter,
  ChevronLeft,
  AlertCircle,
  Star,
  TrendingUp,
  Sparkles,
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
  providerRating?: number;
  address: string;
  icon: React.ReactNode;
  color: string;
  duration: string;
  isUrgent?: boolean;
  isRecurring?: boolean;
}

interface RescheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule?: (serviceId: string, newDate: Date, newTime: string) => void;
}

type FilterType = "all" | "thisWeek" | "urgent" | "recurring";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Extended mock services with more details
  const upcomingServices: UpcomingService[] = [
    {
      id: "1",
      name: "Deep Home Cleaning",
      type: "Cleaning",
      date: new Date(2024, 7, 20),
      time: "10:00 AM",
      provider: "Maria Rodriguez",
      providerRating: 4.9,
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Home />,
      color: "#075056",
      duration: "2 hours",
      isUrgent: true,
      isRecurring: true,
    },
    {
      id: "2",
      name: "Laundry Service",
      type: "Laundry",
      date: new Date(2024, 7, 22),
      time: "2:00 PM",
      provider: "QuickWash Team",
      providerRating: 4.8,
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Droplets />,
      color: "#6366f1",
      duration: "1 hour",
      isRecurring: true,
    },
    {
      id: "3",
      name: "Meal Preparation",
      type: "Cooking",
      date: new Date(2024, 7, 24),
      time: "5:00 PM",
      provider: "Chef Kemi",
      providerRating: 5.0,
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Utensils />,
      color: "#fe5b04",
      duration: "3 hours",
      isRecurring: true,
    },
    {
      id: "4",
      name: "Pest Control Service",
      type: "Pest Control",
      date: new Date(2024, 7, 26),
      time: "11:00 AM",
      provider: "PestPro Team",
      providerRating: 4.7,
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Bug />,
      color: "#10b981",
      duration: "1.5 hours",
      isRecurring: false,
    },
    {
      id: "5",
      name: "Grocery Shopping",
      type: "Errands",
      date: new Date(2024, 7, 25),
      time: "3:00 PM",
      provider: "Express Runners",
      providerRating: 4.6,
      address: "24 Emmanuel Osakwe Street, Lagos",
      icon: <Package />,
      color: "#ec4899",
      duration: "1 hour",
      isRecurring: true,
    },
  ];

  // Enhanced time slots with popularity indicators
  const timeSlots = [
    { value: "09:00", label: "9:00 AM", available: true, isPopular: false },
    { value: "10:00", label: "10:00 AM", available: true, isPopular: true },
    { value: "11:00", label: "11:00 AM", available: false, isPopular: false },
    { value: "12:00", label: "12:00 PM", available: true, isPopular: false },
    { value: "14:00", label: "2:00 PM", available: true, isPopular: true },
    { value: "15:00", label: "3:00 PM", available: true, isPopular: false },
    { value: "16:00", label: "4:00 PM", available: false, isPopular: false },
    { value: "17:00", label: "5:00 PM", available: true, isPopular: true },
    { value: "18:00", label: "6:00 PM", available: true, isPopular: false },
  ];

  // Filter services based on search and filter
  const filteredServices = useMemo(() => {
    let filtered = [...upcomingServices];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (activeFilter) {
      case "thisWeek":
        filtered = filtered.filter(
          (service) => service.date <= nextWeek && service.date >= today
        );
        break;
      case "urgent":
        filtered = filtered.filter((service) => service.isUrgent);
        break;
      case "recurring":
        filtered = filtered.filter((service) => service.isRecurring);
        break;
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  // Get filter counts
  const filterCounts = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
      all: upcomingServices.length,
      thisWeek: upcomingServices.filter(
        (s) => s.date <= nextWeek && s.date >= today
      ).length,
      urgent: upcomingServices.filter((s) => s.isUrgent).length,
      recurring: upcomingServices.filter((s) => s.isRecurring).length,
    };
  }, []);

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const hasExistingBooking = (date: Date) => {
    return upcomingServices.some(
      (service) =>
        service.date.getDate() === date.getDate() &&
        service.date.getMonth() === date.getMonth() &&
        service.date.getFullYear() === date.getFullYear()
    );
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleServiceSelect = (service: UpcomingService) => {
    setSelectedService(service);
    setStep("select-datetime");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("select-datetime");
    } else if (step === "select-datetime") {
      setStep("select-service");
      setSelectedDate(null);
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
      onReschedule(selectedService.id, selectedDate, selectedTime);
      onClose();
      // Reset state
      setStep("select-service");
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime("");
      setSearchQuery("");
      setActiveFilter("all");
    }
  };

  const resetAndClose = () => {
    setStep("select-service");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime("");
    setSearchQuery("");
    setActiveFilter("all");
    onClose();
  };

  const calendarDays = getDaysInMonth(currentMonth);

  return (
    <ModalDrawer isOpen={isOpen} onClose={resetAndClose} width="lg">
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawer__header}>
          <button className={styles.drawer__backBtn} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.drawer__headerText}>
            <h2 className={styles.drawer__title}>
              {step === "select-service" && "Reschedule Service"}
              {step === "select-datetime" && "Choose New Time"}
              {step === "confirm" && "Confirm Changes"}
            </h2>
            <p className={styles.drawer__subtitle}>
              {step === "select-service" &&
                `${filteredServices.length} services available to reschedule`}
              {step === "select-datetime" && "Select a date and time slot"}
              {step === "confirm" && "Review your changes"}
            </p>
          </div>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className={styles.drawer__progress}>
          <div
            className={`${styles.drawer__progressStep} ${
              step !== "select-service"
                ? styles["drawer__progressStep--completed"]
                : styles["drawer__progressStep--active"]
            }`}
          >
            <span className={styles.drawer__progressNumber}>
              {step !== "select-service" ? <Check size={14} /> : "1"}
            </span>
            <span className={styles.drawer__progressLabel}>Service</span>
          </div>
          <div
            className={`${styles.drawer__progressLine} ${
              step !== "select-service"
                ? styles["drawer__progressLine--active"]
                : ""
            }`}
          />
          <div
            className={`${styles.drawer__progressStep} ${
              step === "confirm"
                ? styles["drawer__progressStep--completed"]
                : step === "select-datetime"
                  ? styles["drawer__progressStep--active"]
                  : ""
            }`}
          >
            <span className={styles.drawer__progressNumber}>
              {step === "confirm" ? <Check size={14} /> : "2"}
            </span>
            <span className={styles.drawer__progressLabel}>Schedule</span>
          </div>
          <div
            className={`${styles.drawer__progressLine} ${
              step === "confirm" ? styles["drawer__progressLine--active"] : ""
            }`}
          />
          <div
            className={`${styles.drawer__progressStep} ${
              step === "confirm" ? styles["drawer__progressStep--active"] : ""
            }`}
          >
            <span className={styles.drawer__progressNumber}>3</span>
            <span className={styles.drawer__progressLabel}>Confirm</span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.drawer__content}>
          <AnimatePresence mode="wait">
            {/* Step 1: Enhanced Service Selection */}
            {step === "select-service" && (
              <motion.div
                key="select-service"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__services}
              >
                {/* Search and Filter Bar */}
                <div className={styles.drawer__searchFilter}>
                  <div className={styles.drawer__searchInput}>
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    className={`${styles.drawer__filterBtn} ${
                      activeFilter !== "all"
                        ? styles["drawer__filterBtn--active"]
                        : ""
                    }`}
                  >
                    <Filter size={16} />
                    Filter
                  </button>
                </div>

                {/* Service Tabs */}
                <div className={styles.drawer__serviceTabs}>
                  <button
                    className={`${styles.drawer__serviceTab} ${
                      activeFilter === "all"
                        ? styles["drawer__serviceTab--active"]
                        : ""
                    }`}
                    onClick={() => setActiveFilter("all")}
                  >
                    All Services
                    <span className={styles.drawer__serviceTabCount}>
                      {filterCounts.all}
                    </span>
                  </button>
                  <button
                    className={`${styles.drawer__serviceTab} ${
                      activeFilter === "thisWeek"
                        ? styles["drawer__serviceTab--active"]
                        : ""
                    }`}
                    onClick={() => setActiveFilter("thisWeek")}
                  >
                    This Week
                    <span className={styles.drawer__serviceTabCount}>
                      {filterCounts.thisWeek}
                    </span>
                  </button>
                  <button
                    className={`${styles.drawer__serviceTab} ${
                      activeFilter === "urgent"
                        ? styles["drawer__serviceTab--active"]
                        : ""
                    }`}
                    onClick={() => setActiveFilter("urgent")}
                  >
                    Urgent
                    <span className={styles.drawer__serviceTabCount}>
                      {filterCounts.urgent}
                    </span>
                  </button>
                  <button
                    className={`${styles.drawer__serviceTab} ${
                      activeFilter === "recurring"
                        ? styles["drawer__serviceTab--active"]
                        : ""
                    }`}
                    onClick={() => setActiveFilter("recurring")}
                  >
                    Recurring
                    <span className={styles.drawer__serviceTabCount}>
                      {filterCounts.recurring}
                    </span>
                  </button>
                </div>

                {/* Enhanced Services List */}
                <div className={styles.drawer__servicesList}>
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      className={styles.drawer__serviceCard}
                      onClick={() => handleServiceSelect(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={styles.drawer__serviceCardHeader}>
                        <div
                          className={styles.drawer__serviceIcon}
                          style={{
                            backgroundColor: `${service.color}15`,
                            color: service.color,
                          }}
                        >
                          {service.icon}
                        </div>
                        <div className={styles.drawer__serviceInfo}>
                          <div className={styles.drawer__serviceName}>
                            {service.name}
                            {service.isUrgent && (
                              <span className={styles.drawer__serviceUrgent}>
                                <AlertCircle size={12} />
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className={styles.drawer__serviceMeta}>
                            <span>
                              <Calendar size={14} />
                              {formatDate(service.date)}
                            </span>
                            <span>
                              <Clock size={14} />
                              {service.time}
                            </span>
                            <span>
                              <Clock size={14} />
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.drawer__serviceProvider}>
                        <div className={styles.drawer__providerAvatar}>
                          {service.provider
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className={styles.drawer__providerName}>
                          {service.provider}
                        </span>
                        {service.providerRating && (
                          <span className={styles.drawer__providerRating}>
                            <Star size={14} />
                            {service.providerRating}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Enhanced Date & Time Selection with Calendar */}
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

                {/* Enhanced Calendar Component */}
                <div className={styles.drawer__calendar}>
                  <div className={styles.drawer__calendarHeader}>
                    <h3 className={styles.drawer__calendarMonth}>
                      {formatMonthYear(currentMonth)}
                    </h3>
                    <div className={styles.drawer__calendarNav}>
                      <button
                        className={styles.drawer__calendarNavBtn}
                        onClick={() => navigateMonth("prev")}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className={styles.drawer__calendarNavBtn}
                        onClick={() => navigateMonth("next")}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.drawer__calendarWeekdays}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className={styles.drawer__calendarWeekday}
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  <div className={styles.drawer__calendarDays}>
                    {calendarDays.map((date, index) => {
                      if (!date) {
                        return (
                          <div
                            key={`empty-${index}`}
                            className={styles.drawer__calendarDayEmpty}
                          />
                        );
                      }

                      const isSelected =
                        selectedDate?.toDateString() === date.toDateString();
                      const isPast = isPastDate(date);
                      const hasBooking = hasExistingBooking(date);
                      const today = isToday(date);

                      return (
                        <motion.button
                          key={date.toISOString()}
                          className={`${styles.drawer__calendarDay} ${
                            isSelected
                              ? styles["drawer__calendarDay--selected"]
                              : ""
                          } ${
                            isPast
                              ? styles["drawer__calendarDay--disabled"]
                              : ""
                          } ${
                            today ? styles["drawer__calendarDay--today"] : ""
                          } ${
                            hasBooking
                              ? styles["drawer__calendarDay--hasBooking"]
                              : ""
                          }`}
                          onClick={() => !isPast && handleDateSelect(date)}
                          disabled={isPast}
                          whileHover={!isPast ? { scale: 1.05 } : {}}
                          whileTap={!isPast ? { scale: 0.95 } : {}}
                        >
                          {date.getDate()}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Enhanced Time Selection */}
                {selectedDate && (
                  <motion.div
                    className={styles.drawer__timeSection}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className={styles.drawer__timeSectionTitle}>
                      <Clock size={18} />
                      Available Time Slots
                    </h3>
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
                          } ${
                            slot.isPopular
                              ? styles["drawer__timeSlot--popular"]
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
                          {slot.isPopular && (
                            <TrendingUp
                              size={12}
                              className={styles.drawer__popularIcon}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Enhanced Confirmation */}
            {step === "confirm" && selectedService && selectedDate && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__confirm}
              >
                <div className={styles.drawer__confirmCard}>
                  <motion.div
                    className={styles.drawer__confirmIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <Sparkles size={28} />
                  </motion.div>
                  <h3 className={styles.drawer__confirmTitle}>
                    Ready to Reschedule?
                  </h3>

                  <div className={styles.drawer__confirmDetails}>
                    <div className={styles.drawer__confirmSection}>
                      <h4 className={styles.drawer__confirmSectionTitle}>
                        Service Details
                      </h4>
                      <div className={styles.drawer__confirmItem}>
                        <span className={styles.drawer__confirmLabel}>
                          Service
                        </span>
                        <span className={styles.drawer__confirmValue}>
                          {selectedService.name}
                        </span>
                      </div>
                      <div className={styles.drawer__confirmItem}>
                        <span className={styles.drawer__confirmLabel}>
                          Provider
                        </span>
                        <span className={styles.drawer__confirmValue}>
                          {selectedService.provider}
                        </span>
                      </div>
                    </div>

                    <div className={styles.drawer__confirmDivider} />

                    <div className={styles.drawer__confirmSection}>
                      <h4 className={styles.drawer__confirmSectionTitle}>
                        Schedule Changes
                      </h4>
                      <div className={styles.drawer__confirmItem}>
                        <span className={styles.drawer__confirmLabel}>
                          From
                        </span>
                        <span
                          className={`${styles.drawer__confirmValue} ${styles["drawer__confirmValue--old"]}`}
                        >
                          {formatDate(selectedService.date)} at{" "}
                          {selectedService.time}
                        </span>
                      </div>
                      <div className={styles.drawer__confirmItem}>
                        <span className={styles.drawer__confirmLabel}>To</span>
                        <span
                          className={`${styles.drawer__confirmValue} ${styles["drawer__confirmValue--new"]}`}
                        >
                          {formatDate(selectedDate)} at{" "}
                          {
                            timeSlots.find((t) => t.value === selectedTime)
                              ?.label
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={styles.drawer__confirmNote}>
                    <AlertCircle size={14} />
                    You'll receive a confirmation email and SMS once the change
                    is processed. Your provider will be notified automatically.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Footer Actions */}
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
                <ChevronRight size={16} />
              </FnButton>
            </>
          )}

          {step === "confirm" && (
            <>
              <FnButton variant="ghost" onClick={handleBack} fullWidth>
                Back
              </FnButton>
              <FnButton variant="primary" onClick={handleConfirm} fullWidth>
                <Check size={16} />
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
