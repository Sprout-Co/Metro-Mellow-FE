"use client";
import React, { useState, useMemo } from "react";
import { DateAvailability } from "@/graphql/api";
import {
  getCalendarDates,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isPastDate,
  isToday,
  getTomorrowDate,
  getMaxDate,
  isDateAvailable,
  getSlotAvailabilityForDate,
} from "@/utils/slotHelpers";
import styles from "./DateSlotPicker.module.scss";

export interface DateSlotPickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availableSlots: DateAvailability[];
  minDate?: Date;
  maxDate?: Date;
  serviceCategory?: string;
  disabled?: boolean;
  requiresAvailability?: boolean;
}

const DateSlotPicker: React.FC<DateSlotPickerProps> = ({
  selectedDate,
  onDateSelect,
  availableSlots,
  minDate = getTomorrowDate(),
  maxDate = getMaxDate(),
  disabled = false,
  requiresAvailability = true,
}) => {
  console.log("availableSlots", availableSlots);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Weekday labels
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month names
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

  // Calculate this coming Friday
  const thisComingFriday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday

    // Calculate days until Friday
    let daysUntilFriday;
    if (dayOfWeek <= 5) {
      // Sunday (0) through Friday (5) - get this week's Friday
      daysUntilFriday = 5 - dayOfWeek;
    } else {
      // Saturday (6) - get next week's Friday
      daysUntilFriday = 6;
    }

    const comingFriday = new Date(today);
    comingFriday.setDate(today.getDate() + daysUntilFriday);
    return comingFriday;
  }, []);

  // Get calendar dates for current month view
  const calendarDates = useMemo(() => {
    return getCalendarDates(currentMonth);
  }, [currentMonth]);

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() - 1);
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + 1);
      return newMonth;
    });
  };

  // Check if date is selectable
  const isDateSelectable = (date: Date): boolean => {
    if (disabled) return false;
    if (isPastDate(date)) return false;
    if (date < minDate || date > maxDate) return false;
    if (date.getDay() === 0) return false; // Disable Sundays
    // Disable all dates before this coming Friday
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    if (dateOnly < thisComingFriday) return false;
    return isDateAvailable(date, availableSlots);
  };

  // Get date cell class names
  const getDateCellClassName = (date: Date): string => {
    const classes = [styles.dateSlotPicker__dateCell];

    if (isToday(date)) {
      classes.push(styles.dateSlotPicker__dateCell__today);
    }

    if (date.toDateString() === selectedDate.toDateString()) {
      classes.push(styles.dateSlotPicker__dateCell__selected);
    }

    if (!isDateSelectable(date)) {
      classes.push(styles.dateSlotPicker__dateCell__disabled);
    } else {
      classes.push(styles.dateSlotPicker__dateCell__available);
    }

    // Check if date is from different month
    if (date.getMonth() !== currentMonth.getMonth()) {
      classes.push(styles.dateSlotPicker__dateCell__otherMonth);
    }

    return classes.join(" ");
  };

  // Get availability indicator for a date
  const getAvailabilityIndicator = (date: Date): string | null => {
    if (!isDateSelectable(date)) return null;

    const slots = getSlotAvailabilityForDate(date, availableSlots);
    console.log("slots", slots);
    const availableSlotsCount = slots.filter((slot) => slot.isAvailable).length;
    console.log("availableSlotsCount", availableSlotsCount, date);
    if (availableSlotsCount >= 2) return "available";
    if (availableSlotsCount === 1) return "limited";
    return null;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isDateSelectable(date)) {
      onDateSelect(date);
    }
  };

  return (
    <div className={styles.dateSlotPicker}>
      {/* Header with month/year and navigation */}
      <div className={styles.dateSlotPicker__header}>
        <button
          type="button"
          className={styles.dateSlotPicker__navButton}
          onClick={goToPreviousMonth}
          disabled={disabled}
          aria-label="Previous month"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h3 className={styles.dateSlotPicker__monthYear}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          type="button"
          className={styles.dateSlotPicker__navButton}
          onClick={goToNextMonth}
          disabled={disabled}
          aria-label="Next month"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className={styles.dateSlotPicker__weekdays}>
        {weekDays.map((day) => (
          <div key={day} className={styles.dateSlotPicker__weekday}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={styles.dateSlotPicker__grid}>
        {calendarDates.map((date, index) => {
          const availabilityIndicator = getAvailabilityIndicator(date);
          const daySlots = getSlotAvailabilityForDate(date, availableSlots);
          const availableCount = daySlots.filter((s) => s.isAvailable).length;
          const tooltipText = requiresAvailability
            ? isDateSelectable(date)
              ? availableCount === 0
                ? "No slots available"
                : `${availableCount} slot${availableCount > 1 ? "s" : ""} available`
              : "Unavailable"
            : "Available";
          const selectable = isDateSelectable(date);

          return (
            <button
              key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${index}`}
              type="button"
              className={getDateCellClassName(date)}
              onClick={() => handleDateClick(date)}
              aria-disabled={!selectable}
              data-tooltip={tooltipText}
              aria-label={`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} — ${tooltipText}`}
            >
              <span className={styles.dateSlotPicker__dateNumber}>
                {date.getDate()}
              </span>
              {availabilityIndicator && (
                <div
                  className={`${styles.dateSlotPicker__availabilityDot} ${styles[`dateSlotPicker__availabilityDot__${availabilityIndicator}`]}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {requiresAvailability && (
        <div className={styles.dateSlotPicker__legend}>
          <div className={styles.dateSlotPicker__legendItem}>
            <div
              className={`${styles.dateSlotPicker__legendDot} ${styles.dateSlotPicker__legendDot__available}`}
            />
            <span>Available</span>
          </div>
          <div className={styles.dateSlotPicker__legendItem}>
            <div
              className={`${styles.dateSlotPicker__legendDot} ${styles.dateSlotPicker__legendDot__limited}`}
            />
            <span>Limited</span>
          </div>
          <div className={styles.dateSlotPicker__legendItem}>
            <div
              className={`${styles.dateSlotPicker__legendDot} ${styles.dateSlotPicker__legendDot__unavailable}`}
            />
            <span>Unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSlotPicker;
