import React from "react";
import { DateAvailability } from "@/graphql/api";
import DateSlotPicker from "../../../DateSlotPicker/DateSlotPicker";
import styles from "../CheckoutModal.module.scss";

interface DateSelectionProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availableSlots: DateAvailability[];
  requiresAvailability: boolean;
  loadingSlots: boolean;
}

export const DateSelection: React.FC<DateSelectionProps> = ({
  selectedDate,
  onDateSelect,
  availableSlots,
  requiresAvailability,
  loadingSlots,
}) => {
  return (
    <div className={styles.checkoutModal__field}>
      <label className={styles.checkoutModal__label}>Choose Date</label>

      {requiresAvailability && loadingSlots ? (
        <div className={styles.checkoutModal__loadingContainer}>
          <div className={styles.checkoutModal__loadingSkeleton} />
          <p className={styles.checkoutModal__loadingText}>
            Checking availability...
          </p>
        </div>
      ) : (
        <DateSlotPicker
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          availableSlots={availableSlots}
          disabled={loadingSlots}
          requiresAvailability={requiresAvailability}
        />
      )}
    </div>
  );
};
