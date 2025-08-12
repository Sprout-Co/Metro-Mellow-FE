// src/app/(routes)/(app)/dashboard/bookings/_components/CalendarView/CalendarView.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react";
import styles from "./CalendarView.module.scss";
import { ServiceCategory, BookingStatus } from "../../types/booking";
import BookingDetailModal from "../BookingDetailModal/BookingDetailModal";

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

const CalendarView: React.FC<CalendarViewProps> = ({ bookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get calendar days for current month
  const getDaysInMonth = (date: Date) => {
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

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
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

  // Get service color
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

  // Get status badge color
  const getStatusColor = (status: BookingStatus) => {
    const colors = {
      [BookingStatus.Upcoming]: "#f2994a",
      [BookingStatus.Confirmed]: "#059669",
      [BookingStatus.Pending]: "#d97706",
      [BookingStatus.InProgress]: "#2293fb",
      [BookingStatus.Completed]: "#6b7280",
      [BookingStatus.Cancelled]: "#fb2222",
    };
    return colors[status] || "#6b7280";
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

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get selected date's bookings
  const selectedDateBookings = selectedDate
    ? getBookingsForDate(selectedDate)
    : [];

  // Handle booking click
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.calendarView}>
        <div className={styles.calendarView__container}>
          {/* Calendar Grid */}
          <div className={styles.calendarView__calendar}>
            <div className={styles.calendarView__header}>
              <motion.button
                className={styles.calendarView__navBtn}
                onClick={goToPreviousMonth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} />
              </motion.button>

              <div className={styles.calendarView__currentMonth}>
                <h2>
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>
                <motion.button
                  className={styles.calendarView__todayBtn}
                  onClick={goToToday}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Today
                </motion.button>
              </div>

              <motion.button
                className={styles.calendarView__navBtn}
                onClick={goToNextMonth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>

            <div className={styles.calendarView__weekDays}>
              {weekDays.map((day) => (
                <div key={day} className={styles.calendarView__weekDay}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.calendarView__days}>
              {days.map((date, index) => {
                const dayBookings = getBookingsForDate(date);
                const hasBookings = dayBookings.length > 0;
                const isSelected =
                  selectedDate &&
                  date &&
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear();

                return (
                  <motion.div
                    key={index}
                    className={`${styles.calendarView__day} ${
                      !date ? styles["calendarView__day--empty"] : ""
                    } ${isToday(date) ? styles["calendarView__day--today"] : ""} ${
                      isSelected ? styles["calendarView__day--selected"] : ""
                    }`}
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
                          <div className={styles.calendarView__indicators}>
                            {dayBookings.slice(0, 3).map((booking, i) => (
                              <div
                                key={i}
                                className={styles.calendarView__indicator}
                                style={{
                                  backgroundColor: getServiceColor(
                                    booking.serviceType
                                  ),
                                }}
                              />
                            ))}
                            {dayBookings.length > 3 && (
                              <span className={styles.calendarView__moreCount}>
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
          </div>

          {/* Selected Date Details */}
          <div className={styles.calendarView__details}>
            <div className={styles.calendarView__detailsHeader}>
              <h3>
                {selectedDate
                  ? `${selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}`
                  : "Select a date to view bookings"}
              </h3>
              {selectedDateBookings.length > 0 && (
                <span className={styles.calendarView__bookingCount}>
                  {selectedDateBookings.length} booking
                  {selectedDateBookings.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className={styles.calendarView__bookingsList}>
              {selectedDateBookings.length > 0 ? (
                selectedDateBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    className={styles.calendarView__booking}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 5 }}
                    style={{
                      borderLeftColor: getServiceColor(booking.serviceType),
                    }}
                    onClick={() => handleBookingClick(booking)}
                  >
                    <div className={styles.calendarView__bookingHeader}>
                      <h4>{booking.serviceName}</h4>
                      <span
                        className={styles.calendarView__status}
                        style={{
                          backgroundColor: `${getStatusColor(booking.status)}15`,
                          color: getStatusColor(booking.status),
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className={styles.calendarView__bookingDetails}>
                      <div className={styles.calendarView__bookingDetail}>
                        <Clock size={12} />
                        <span>
                          {formatTime(booking.date)} -{" "}
                          {formatTime(booking.endTime)}
                        </span>
                      </div>
                      <div className={styles.calendarView__bookingDetail}>
                        <User size={12} />
                        <span>{booking.provider}</span>
                      </div>
                      <div className={styles.calendarView__bookingDetail}>
                        <MapPin size={12} />
                        <span>{booking.address}</span>
                      </div>
                    </div>

                    <div className={styles.calendarView__bookingActions}>
                      <motion.button
                        className={styles.calendarView__actionBtn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        className={`${styles.calendarView__actionBtn} ${styles["calendarView__actionBtn--secondary"]}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reschedule
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : selectedDate ? (
                <div className={styles.calendarView__emptyDay}>
                  <p>No bookings scheduled for this date</p>
                  <motion.button
                    className={styles.calendarView__addBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule a Service
                  </motion.button>
                </div>
              ) : (
                <div className={styles.calendarView__placeholder}>
                  <p>Select a date to view or add bookings</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className={styles.calendarView__legend}>
          <h4>Service Types:</h4>
          <div className={styles.calendarView__legendItems}>
            {Object.values(ServiceCategory).map((category) => (
              <div key={category} className={styles.calendarView__legendItem}>
                <div
                  className={styles.calendarView__legendColor}
                  style={{ backgroundColor: getServiceColor(category) }}
                />
                <span>{category}</span>
              </div>
            ))}
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
