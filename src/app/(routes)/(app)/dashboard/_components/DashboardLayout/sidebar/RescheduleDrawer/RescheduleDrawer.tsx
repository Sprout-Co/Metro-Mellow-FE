// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/RescheduleDrawer/RescheduleDrawer.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import styles from "./RescheduleDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";
import {
  useGetCustomerBookingsQuery,
  useRescheduleBookingMutation,
  Booking,
  ServiceCategory,
  TimeSlot,
} from "@/graphql/api";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";

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
  const [selectedService, setSelectedService] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isRescheduling, setIsRescheduling] = useState(false);

  // GraphQL hooks
  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
    refetch,
  } = useGetCustomerBookingsQuery();
  const { handleRescheduleBooking } = useBookingOperations();

  // Enhanced time slots with popularity indicators
  const timeSlots = [
    {
      value: TimeSlot.Morning,
      label: "9:00 AM - 12:00 PM",
    },
    {
      value: TimeSlot.Afternoon,
      label: "12:00 PM - 5:00 PM",
    },
    {
      value: TimeSlot.Evening,
      label: "5:00 PM - 8:00 PM",
    },
  ];

  // Helper function to get service icon
  const getServiceIcon = (category: ServiceCategory) => {
    switch (category) {
      case ServiceCategory.Cleaning:
        return <Home />;
      case ServiceCategory.Laundry:
        return <Droplets />;
      case ServiceCategory.Cooking:
        return <Utensils />;
      case ServiceCategory.PestControl:
        return <Bug />;
      default:
        return <Package />;
    }
  };

  // Helper function to get service color
  const getServiceColor = (category: ServiceCategory) => {
    switch (category) {
      case ServiceCategory.Cleaning:
        return "#075056";
      case ServiceCategory.Laundry:
        return "#6366f1";
      case ServiceCategory.Cooking:
        return "#fe5b04";
      case ServiceCategory.PestControl:
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  // Helper function to get service duration
  const getServiceDuration = (category: ServiceCategory) => {
    switch (category) {
      case ServiceCategory.Cleaning:
        return "2-3 hours";
      case ServiceCategory.Laundry:
        return "1-2 hours";
      case ServiceCategory.Cooking:
        return "2-4 hours";
      case ServiceCategory.PestControl:
        return "1-2 hours";
      default:
        return "1-2 hours";
    }
  };

  // Filter bookings based on search and filter
  const filteredBookings = useMemo(() => {
    if (!bookingsData?.customerBookings) return [];

    let filtered = [...bookingsData.customerBookings];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (booking) =>
          booking.service.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          booking.staff?.firstName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          booking.staff?.lastName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          booking.service_category
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (activeFilter) {
      case "thisWeek":
        filtered = filtered.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate <= nextWeek && bookingDate >= today;
        });
        break;
      case "urgent":
        // Consider bookings within 24 hours as urgent
        filtered = filtered.filter((booking) => {
          const bookingDate = new Date(booking.date);
          const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          return bookingDate <= tomorrow && bookingDate >= today;
        });
        break;
      case "recurring":
        // Filter for recurring bookings (you might need to add this field to your schema)
        filtered = filtered.filter((booking) => booking.recurring === true);
        break;
    }

    return filtered;
  }, [bookingsData?.customerBookings, searchQuery, activeFilter]);

  // Get filter counts
  const filterCounts = useMemo(() => {
    if (!bookingsData?.customerBookings) {
      return { all: 0, thisWeek: 0, urgent: 0, recurring: 0 };
    }

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    return {
      all: bookingsData.customerBookings.length,
      thisWeek: bookingsData.customerBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate <= nextWeek && bookingDate >= today;
      }).length,
      urgent: bookingsData.customerBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate <= tomorrow && bookingDate >= today;
      }).length,
      recurring: bookingsData.customerBookings.filter(
        (booking) => booking.recurring === true
      ).length,
    };
  }, [bookingsData?.customerBookings]);

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
    if (!bookingsData?.customerBookings) return false;
    return bookingsData.customerBookings.some((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    });
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

  const handleServiceSelect = (booking: Booking) => {
    setSelectedService(booking);
    setStep("select-datetime");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: TimeSlot) => {
    setSelectedTime(time);
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("select-datetime");
    } else if (step === "select-datetime") {
      setStep("select-service");
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      onClose();
    }
  };

  const handleContinue = () => {
    if (step === "select-datetime" && selectedDate && selectedTime) {
      setStep("confirm");
    }
  };

  const handleConfirm = async () => {
    if (selectedService && selectedDate && selectedTime) {
      setIsRescheduling(true);
      try {
        await handleRescheduleBooking(
          selectedService.id,
          selectedDate.toISOString(),
          selectedTime
        );

        // Refetch bookings to update the UI
        await refetch();

        if (onReschedule) {
          onReschedule(selectedService.id, selectedDate, selectedTime);
        }

        onClose();
        // Reset state
        setStep("select-service");
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setSearchQuery("");
        setActiveFilter("all");
      } catch (error) {
        console.error("Failed to reschedule booking:", error);
        // You might want to show an error toast here
      } finally {
        setIsRescheduling(false);
      }
    }
  };

  const resetAndClose = () => {
    setStep("select-service");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSearchQuery("");
    setActiveFilter("all");
    onClose();
  };

  const calendarDays = getDaysInMonth(currentMonth);

  // Show loading state
  if (bookingsLoading) {
    return (
      <ModalDrawer isOpen={isOpen} onClose={resetAndClose} width="lg">
        <div className={styles.drawer}>
          <div className={styles.drawer__header}>
            <h2 className={styles.drawer__title}>Reschedule Service</h2>
          </div>
          <div className={styles.drawer__content}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Loader2 size={32} className="animate-spin" />
              <span style={{ marginLeft: "12px" }}>
                Loading your bookings...
              </span>
            </div>
          </div>
        </div>
      </ModalDrawer>
    );
  }

  // Show error state
  if (bookingsError) {
    return (
      <ModalDrawer isOpen={isOpen} onClose={resetAndClose} width="lg">
        <div className={styles.drawer}>
          <div className={styles.drawer__header}>
            <h2 className={styles.drawer__title}>Reschedule Service</h2>
          </div>
          <div className={styles.drawer__content}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                flexDirection: "column",
              }}
            >
              <AlertCircle size={32} color="#ef4444" />
              <span style={{ marginTop: "12px", color: "#ef4444" }}>
                Failed to load bookings. Please try again.
              </span>
              <FnButton
                variant="primary"
                onClick={() => refetch()}
                style={{ marginTop: "16px" }}
              >
                Retry
              </FnButton>
            </div>
          </div>
        </div>
      </ModalDrawer>
    );
  }

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
                `${filteredBookings.length} services available to reschedule`}
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
                  {filteredBookings.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px 20px",
                        color: "#6b7280",
                      }}
                    >
                      <Package
                        size={48}
                        style={{ marginBottom: "16px", opacity: 0.5 }}
                      />
                      <p>No bookings found</p>
                      <p style={{ fontSize: "14px", marginTop: "8px" }}>
                        {searchQuery
                          ? "Try adjusting your search terms"
                          : "You don't have any upcoming bookings to reschedule"}
                      </p>
                    </div>
                  ) : (
                    filteredBookings.map((booking) => {
                      const serviceColor = getServiceColor(
                        booking.service_category as ServiceCategory
                      );
                      const serviceIcon = getServiceIcon(
                        booking.service_category as ServiceCategory
                      );
                      const serviceDuration = getServiceDuration(
                        booking.service_category as ServiceCategory
                      );
                      const isUrgent =
                        new Date(booking.date) <=
                        new Date(Date.now() + 24 * 60 * 60 * 1000);

                      return (
                        <motion.div
                          key={booking.id}
                          className={styles.drawer__serviceCard}
                          onClick={() => handleServiceSelect(booking)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={styles.drawer__serviceCardHeader}>
                            <div
                              className={styles.drawer__serviceIcon}
                              style={{
                                backgroundColor: `${serviceColor}15`,
                                color: serviceColor,
                              }}
                            >
                              {serviceIcon}
                            </div>
                            <div className={styles.drawer__serviceInfo}>
                              <div className={styles.drawer__serviceName}>
                                {booking.service.name}
                                {isUrgent && (
                                  <span
                                    className={styles.drawer__serviceUrgent}
                                  >
                                    <AlertCircle size={12} />
                                    Urgent
                                  </span>
                                )}
                              </div>
                              <div className={styles.drawer__serviceMeta}>
                                <span>
                                  <Calendar size={14} />
                                  {formatDate(new Date(booking.date))}
                                </span>
                                <span>
                                  <Clock size={14} />
                                  {formatTimeSlot(booking.timeSlot)}
                                </span>
                                <span>
                                  <Clock size={14} />
                                  {serviceDuration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
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
                      {formatDate(new Date(selectedService.date))} at{" "}
                      {formatTimeSlot(selectedService.timeSlot)}
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
                            selectedTime === slot.value
                              ? styles["drawer__timeSlot--selected"]
                              : ""
                          }`}
                          onClick={() => handleTimeSelect(slot.value)}
                        >
                          {slot.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Enhanced Confirmation */}
            {step === "confirm" &&
              selectedService &&
              selectedDate &&
              selectedTime && (
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
                            {selectedService.service.name}
                          </span>
                        </div>
                        <div className={styles.drawer__confirmItem}>
                          <span className={styles.drawer__confirmLabel}>
                            Provider
                          </span>
                          <span className={styles.drawer__confirmValue}>
                            {selectedService.staff
                              ? `${selectedService.staff.firstName} ${selectedService.staff.lastName}`
                              : "Staff to be assigned"}
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
                            {formatDate(new Date(selectedService.date))} at{" "}
                            {formatTimeSlot(selectedService.timeSlot)}
                          </span>
                        </div>
                        <div className={styles.drawer__confirmItem}>
                          <span className={styles.drawer__confirmLabel}>
                            To
                          </span>
                          <span
                            className={`${styles.drawer__confirmValue} ${styles["drawer__confirmValue--new"]}`}
                          >
                            {formatDate(selectedDate)} at{" "}
                            {formatTimeSlot(selectedTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={styles.drawer__confirmNote}>
                      <AlertCircle size={14} />
                      You'll receive a confirmation email and SMS once the
                      change is processed. Your provider will be notified
                      automatically.
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
              <FnButton
                variant="primary"
                onClick={handleConfirm}
                fullWidth
                disabled={isRescheduling}
              >
                {isRescheduling ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Rescheduling...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Confirm Changes
                  </>
                )}
              </FnButton>
            </>
          )}
        </div>
      </div>
    </ModalDrawer>
  );
};

export default RescheduleDrawer;
