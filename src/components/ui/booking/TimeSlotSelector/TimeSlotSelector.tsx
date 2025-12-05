"use client";
import React from "react";
import { TimeSlot, SlotAvailability } from "@/graphql/api";
import styles from "./TimeSlotSelector.module.scss";

export interface TimeSlotSelectorProps {
  selectedTimeSlot: TimeSlot;
  onTimeSlotSelect: (timeSlot: TimeSlot) => void;
  slotAvailability: SlotAvailability[];
  disabled?: boolean;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedTimeSlot,
  onTimeSlotSelect,
  slotAvailability,
  disabled = false,
}) => {
  // Time slot options with display labels
  const timeSlotOptions = [
    {
      value: TimeSlot.Morning,
      label: "Morning",
      timeRange: "9:00 AM - 12:00 PM",
    },
    {
      value: TimeSlot.Afternoon,
      label: "Afternoon",
      timeRange: "12:00 PM - 5:00 PM",
    },
    // {
    //   value: TimeSlot.Evening,
    //   label: "Evening",
    //   timeRange: "5:00 PM - 8:00 PM",
    // },
  ];

  // Get availability for a specific time slot
  const getSlotAvailability = (timeSlot: TimeSlot): SlotAvailability | null => {
    return slotAvailability.find((slot) => slot.timeSlot === timeSlot) || null;
  };

  // Get availability label for a time slot
  const getAvailabilityStatus = (timeSlot: TimeSlot): string => {
    const slot = getSlotAvailability(timeSlot);
    if (!slot || !slot.isAvailable) {
      return "Unavailable";
    }

    const availabilityRatio = slot.availableCapacity / slot.maxCapacity;

    if (availabilityRatio > 0.5) {
      return "Available";
    } else if (availabilityRatio > 0.2) {
      return "Limited";
    } else {
      return "Full";
    }
  };

  // Check if a time slot is selectable
  const isTimeSlotSelectable = (timeSlot: TimeSlot): boolean => {
    if (disabled) return false;
    const slot = getSlotAvailability(timeSlot);
    return slot ? slot.isAvailable : false;
  };

  // Handle time slot selection
  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlot = e.target.value as TimeSlot;
    if (isTimeSlotSelectable(selectedSlot)) {
      onTimeSlotSelect(selectedSlot);
    } else {
      // If user tries to select an unavailable slot, revert to current selection
      e.target.value = selectedTimeSlot;
    }
  };

  // Auto-select first available slot if current selection becomes unavailable
  React.useEffect(() => {
    if (!isTimeSlotSelectable(selectedTimeSlot)) {
      const firstAvailableSlot = timeSlotOptions.find((option) =>
        isTimeSlotSelectable(option.value)
      );
      if (firstAvailableSlot) {
        onTimeSlotSelect(firstAvailableSlot.value);
      }
    }
  }, [selectedTimeSlot, slotAvailability, onTimeSlotSelect]);

  return (
    <div className={styles.timeSlotSelector}>
      <select
        value={selectedTimeSlot}
        onChange={handleTimeSlotChange}
        disabled={disabled}
        className={styles.timeSlotSelector__select}
      >
        {timeSlotOptions.map((option) => {
          const availabilityStatus = getAvailabilityStatus(option.value);
          const slot = getSlotAvailability(option.value);
          const isSelectable = isTimeSlotSelectable(option.value);

          return (
            <option
              key={option.value}
              value={option.value}
              disabled={!isSelectable}
              className={`${styles.timeSlotSelector__option} ${
                !isSelectable ? styles.timeSlotSelector__option__disabled : ""
              }`}
            >
              {option.label} ({option.timeRange}) - {availabilityStatus}
              {slot &&
                slot.isAvailable &&
                ` (${slot.availableCapacity}/${slot.maxCapacity})`}
              {!isSelectable && " - UNAVAILABLE"}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TimeSlotSelector;
