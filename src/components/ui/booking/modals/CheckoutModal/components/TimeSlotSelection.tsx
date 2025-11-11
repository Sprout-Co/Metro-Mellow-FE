import React from "react";
import { TimeSlot, SlotAvailability } from "@/graphql/api";
import TimeSlotSelector from "../../../TimeSlotSelector/TimeSlotSelector";
import styles from "../CheckoutModal.module.scss";

interface TimeSlotSelectionProps {
  selectedTimeSlot: TimeSlot;
  onTimeSlotSelect: (timeSlot: TimeSlot) => void;
  slotAvailability: SlotAvailability[];
  requiresAvailability: boolean;
  loadingSlots: boolean;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({
  selectedTimeSlot,
  onTimeSlotSelect,
  slotAvailability,
  requiresAvailability,
  loadingSlots,
  onInputChange,
}) => {
  return (
    <>
      {requiresAvailability ? (
        <div className={styles.checkoutModal__field}>
          <label className={styles.checkoutModal__label}>
            Select Time Slot
          </label>

          {loadingSlots ? (
            <div className={styles.checkoutModal__loadingContainer}>
              <div className={styles.checkoutModal__loadingSkeleton} />
              <p className={styles.checkoutModal__loadingText}>
                Loading time slots...
              </p>
            </div>
          ) : (
            <TimeSlotSelector
              selectedTimeSlot={selectedTimeSlot}
              onTimeSlotSelect={onTimeSlotSelect}
              slotAvailability={slotAvailability}
              disabled={loadingSlots}
            />
          )}
        </div>
      ) : (
        <div className={styles.checkoutModal__field}>
          <label className={styles.checkoutModal__label}>Select Time</label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={selectedTimeSlot}
            onChange={onInputChange}
            className={styles.checkoutModal__select}
            required
          >
            <option value={TimeSlot.Morning}>
              Morning (9:00 AM - 12:00 PM)
            </option>
            <option value={TimeSlot.Afternoon}>
              Afternoon (12:00 PM - 4:00 PM)
            </option>
            <option value={TimeSlot.Evening}>
              Evening (4:00 PM - 8:00 PM)
            </option>
          </select>
        </div>
      )}
    </>
  );
};

