import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { TimeSlot } from "@/graphql/api";
import styles from "./ScheduleSection.module.scss";

interface ScheduleSectionProps {
  selectedDate: string;
  selectedTime: TimeSlot | "";
  notes: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: TimeSlot) => void;
  onNotesChange: (notes: string) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  selectedDate,
  selectedTime,
  notes,
  onDateChange,
  onTimeChange,
  onNotesChange,
}) => {
  return (
    <Card className={styles.schedule}>
      <h3 className={styles.schedule__title}>
        <Icon name="calendar" />
        Schedule
      </h3>

      <div className={styles.schedule__form_row}>
        <div className={styles.schedule__field}>
          <label className={styles.schedule__label}>Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={styles.schedule__input}
            required
          />
        </div>

        <div className={styles.schedule__field}>
          <label className={styles.schedule__label}>Time Slot</label>
          <select
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value as TimeSlot)}
            className={styles.schedule__select}
            required
          >
            <option value="">Select time slot</option>
            <option value={TimeSlot.Morning}>Morning (8AM-12PM)</option>
            <option value={TimeSlot.Afternoon}>Afternoon (12PM-4PM)</option>
            <option value={TimeSlot.Evening}>Evening (4PM-8PM)</option>
          </select>
        </div>
      </div>

      <div className={styles.schedule__field}>
        <label className={styles.schedule__label}>Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add any special instructions or notes..."
          className={styles.schedule__textarea}
          rows={3}
        />
      </div>
    </Card>
  );
};

export default ScheduleSection;
