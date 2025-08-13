// src/app/(routes)/(app)/dashboard/bookings/_components/CalendarView/CalendarView.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Calendar,
  Grid3x3,
  List,
  Plus,
  Filter,
  Eye,
  Phone,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import styles from "./CalendarView.module.scss";
import { ServiceCategory, BookingStatus } from "../../types/booking";
import BookingDetailModal from "../BookingDetailModal/BookingDetailModal";
import FnButton from "@/components/ui/Button/FnButton";

interface Booking {
  id: string;
  serviceName: string;
  serviceType: ServiceCategory;
  date: Date;
  endTime: Date;
  status: BookingStatus;
  provider: string;
  address: string;
  price: number;
  notes?: string;
  recurring: boolean;
  frequency?: string;
}

interface CalendarViewProps {
  bookings: Booking[];
}

type ViewType = "month" | "week" | "day";

const CalendarView: React.FC<CalendarViewProps> = ({ bookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("month");
  const [showMiniCalendar, setShowMiniCalendar] = useState(true);

  // Calendar navigation
  const navigateCalendar = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);

    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    } else if (viewType === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    }

    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Get calendar days for month view
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
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

  // Get week days
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date: Date | null) => {
    if (!date) return [];
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Service colors
  const getServiceColor = (serviceType: ServiceCategory) => {
    const colors = {
      [ServiceCategory.Cleaning]: "#075056",
      [ServiceCategory.Laundry]: "#6366f1",
      [ServiceCategory.Cooking]: "#fe5b04",
      [ServiceCategory.Errands]: "#10b981",
      [ServiceCategory.PestControl]: "#ec4899",
    };
    return colors[serviceType] || "#6b7280";
  };

  // Check if date is today
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format header based on view type
  const formatHeader = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (viewType === "month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewType === "week") {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Get days to display based on view type
  const daysToDisplay = useMemo(() => {
    if (viewType === "month") {
      return getMonthDays(currentDate);
    } else if (viewType === "week") {
      return getWeekDays(currentDate);
    } else {
      return [currentDate];
    }
  }, [currentDate, viewType]);

  // Get selected date's bookings
  const selectedDateBookings = selectedDate
    ? getBookingsForDate(selectedDate)
    : [];

  // Handle booking click
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className={styles.calendarView}>
        <div className={styles.calendarView__container}>
          {/* Main Calendar */}
          <div className={styles.calendarView__main}>
            {/* Calendar Header */}
            <div className={styles.calendarView__header}>
              <div className={styles.calendarView__nav}>
                <motion.button
                  className={styles.calendarView__navBtn}
                  onClick={() => navigateCalendar("prev")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft />
                </motion.button>

                <h2 className={styles.calendarView__currentMonth}>
                  {formatHeader()}
                </h2>

                <motion.button
                  className={styles.calendarView__navBtn}
                  onClick={() => navigateCalendar("next")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight />
                </motion.button>
              </div>

              <div className={styles.calendarView__controls}>
                <div className={styles.calendarView__viewToggle}>
                  <button
                    className={`${styles.calendarView__viewBtn} ${
                      viewType === "month"
                        ? styles["calendarView__viewBtn--active"]
                        : ""
                    }`}
                    onClick={() => setViewType("month")}
                  >
                    <Grid3x3 size={16} />
                    Month
                  </button>
                  <button
                    className={`${styles.calendarView__viewBtn} ${
                      viewType === "week"
                        ? styles["calendarView__viewBtn--active"]
                        : ""
                    }`}
                    onClick={() => setViewType("week")}
                  >
                    <List size={16} />
                    Week
                  </button>
                  <button
                    className={`${styles.calendarView__viewBtn} ${
                      viewType === "day"
                        ? styles["calendarView__viewBtn--active"]
                        : ""
                    }`}
                    onClick={() => setViewType("day")}
                  >
                    <Calendar size={16} />
                    Day
                  </button>
                </div>

                <FnButton variant="primary" size="sm" onClick={goToToday}>
                  Today
                </FnButton>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className={styles.calendarView__calendar}>
              {viewType === "month" && (
                <>
                  <div className={styles.calendarView__weekDays}>
                    {weekDays.map((day) => (
                      <div key={day} className={styles.calendarView__weekDay}>
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className={styles.calendarView__days}>
                    {daysToDisplay.map((date, index) => {
                      const dayBookings = getBookingsForDate(date as Date);
                      const hasBookings = dayBookings.length > 0;

                      return (
                        <motion.div
                          key={index}
                          className={`${styles.calendarView__day} ${
                            !date ? styles["calendarView__day--empty"] : ""
                          } ${isToday(date) ? styles["calendarView__day--today"] : ""} ${
                            isSelected(date)
                              ? styles["calendarView__day--selected"]
                              : ""
                          } ${hasBookings ? styles["calendarView__day--hasBookings"] : ""}`}
                          onClick={() => date && setSelectedDate(date)}
                          whileHover={date ? { scale: 1.05 } : {}}
                          whileTap={date ? { scale: 0.95 } : {}}
                        >
                          {date && (
                            <>
                              <span className={styles.calendarView__dayNumber}>
                                {date.getDate()}
                              </span>
                              {hasBookings && (
                                <div
                                  className={styles.calendarView__bookingDots}
                                >
                                  {dayBookings.slice(0, 3).map((booking, i) => (
                                    <div
                                      key={i}
                                      className={styles.calendarView__dot}
                                      style={{
                                        backgroundColor: getServiceColor(
                                          booking.serviceType
                                        ),
                                      }}
                                    />
                                  ))}
                                  {dayBookings.length > 3 && (
                                    <span
                                      className={styles.calendarView__moreCount}
                                    >
                                      +{dayBookings.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}

              {viewType === "week" && (
                <div className={styles.calendarView__weekView}>
                  {/* Week view implementation would go here */}
                  <div className={styles.calendarView__weekGrid}>
                    {daysToDisplay.map((date, index) => (
                      <div
                        key={index}
                        className={styles.calendarView__weekColumn}
                      >
                        <div className={styles.calendarView__weekHeader}>
                          <span className={styles.calendarView__weekDayName}>
                            {weekDays[index]}
                          </span>
                          <span
                            className={`${styles.calendarView__weekDayNumber} ${
                              isToday(date as Date)
                                ? styles["calendarView__weekDayNumber--today"]
                                : ""
                            }`}
                          >
                            {(date as Date).getDate()}
                          </span>
                        </div>
                        <div className={styles.calendarView__weekBookings}>
                          {getBookingsForDate(date as Date).map((booking) => (
                            <motion.div
                              key={booking.id}
                              className={styles.calendarView__weekBooking}
                              style={{
                                backgroundColor: `${getServiceColor(booking.serviceType)}15`,
                              }}
                              onClick={() => handleBookingClick(booking)}
                              whileHover={{ scale: 1.02 }}
                            >
                              <span
                                className={styles.calendarView__weekBookingTime}
                              >
                                {formatTime(booking.date)}
                              </span>
                              <span
                                className={styles.calendarView__weekBookingName}
                              >
                                {booking.serviceName}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with selected date details */}
          <div className={styles.calendarView__sidebar}>
            <div className={styles.calendarView__sidebarHeader}>
              <h3>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a date"}
              </h3>
              {selectedDateBookings.length > 0 && (
                <span className={styles.calendarView__bookingCount}>
                  {selectedDateBookings.length} booking
                  {selectedDateBookings.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className={styles.calendarView__sidebarContent}>
              {selectedDateBookings.length > 0 ? (
                <div className={styles.calendarView__bookingsList}>
                  {selectedDateBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      className={styles.calendarView__bookingCard}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: -4 }}
                      onClick={() => handleBookingClick(booking)}
                    >
                      <div
                        className={styles.calendarView__bookingIndicator}
                        style={{
                          backgroundColor: getServiceColor(booking.serviceType),
                        }}
                      />

                      <div className={styles.calendarView__bookingContent}>
                        <div className={styles.calendarView__bookingHeader}>
                          <h4>{booking.serviceName}</h4>
                          <span className={styles.calendarView__bookingStatus}>
                            {booking.status}
                          </span>
                        </div>

                        <div className={styles.calendarView__bookingDetails}>
                          <div className={styles.calendarView__bookingDetail}>
                            <Clock size={14} />
                            <span>
                              {formatTime(booking.date)} -{" "}
                              {formatTime(booking.endTime)}
                            </span>
                          </div>
                          <div className={styles.calendarView__bookingDetail}>
                            <User size={14} />
                            <span>{booking.provider}</span>
                          </div>
                          <div className={styles.calendarView__bookingDetail}>
                            <MapPin size={14} />
                            <span>{booking.address}</span>
                          </div>
                        </div>

                        <div className={styles.calendarView__bookingActions}>
                          <motion.button
                            className={styles.calendarView__actionBtn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("View details");
                            }}
                          >
                            <Eye size={14} />
                            View
                          </motion.button>
                          <motion.button
                            className={styles.calendarView__actionBtn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Reschedule");
                            }}
                          >
                            <RefreshCw size={14} />
                            Reschedule
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className={styles.calendarView__emptyDay}>
                  <Calendar className={styles.calendarView__emptyIcon} />
                  <p>No bookings scheduled</p>
                  <FnButton variant="primary" size="sm">
                    <Plus size={16} />
                    Book Service
                  </FnButton>
                </div>
              ) : (
                <div className={styles.calendarView__placeholder}>
                  <p>Select a date to view bookings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
    </>
  );
};

export default CalendarView;
