import React, { useState, useRef, useEffect } from "react";
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
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const infoIconRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        infoIconRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !infoIconRef.current.contains(event.target as Node)
      ) {
        setShowInfoPopup(false);
        setIsClicked(false);
      }
    };

    if (showInfoPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInfoPopup]);

  const InfoIcon = () => (
    <div className={styles.checkoutModal__infoIconWrapper}>
      <button
        ref={infoIconRef}
        type="button"
        className={styles.checkoutModal__infoIcon}
        onMouseEnter={() => {
          if (!isClicked) {
            setShowInfoPopup(true);
          }
        }}
        onMouseLeave={() => {
          if (!isClicked) {
            setShowInfoPopup(false);
          }
        }}
        onClick={() => {
          setIsClicked(!isClicked);
          setShowInfoPopup(!showInfoPopup);
        }}
        aria-label="Time slot information"
        aria-expanded={showInfoPopup}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M8 11V8M8 5H8.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {showInfoPopup && (
        <div
          ref={popupRef}
          className={styles.checkoutModal__infoPopup}
          onMouseEnter={() => setShowInfoPopup(true)}
          onMouseLeave={() => {
            if (!isClicked) {
              setShowInfoPopup(false);
            }
          }}
        >
          <div className={styles.checkoutModal__infoPopupContent}>
            <p className={styles.checkoutModal__infoPopupTitle}>
              Preferred Time Selection
            </p>
            <p className={styles.checkoutModal__infoPopupText}>
              {" "}
              Available slots are shown based on your selected date. If no
              specific slots are available, you can choose a general time
              period. P.S: this is not the booking duration
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {requiresAvailability ? (
        <div className={styles.checkoutModal__field}>
          <div className={styles.checkoutModal__labelWrapper}>
            <label className={styles.checkoutModal__label}>
              Preferred Time
            </label>
            <InfoIcon />
          </div>

          {loadingSlots ? (
            <div className={styles.checkoutModal__loadingContainer}>
              <div className={styles.checkoutModal__loadingSkeleton} />
              <p className={styles.checkoutModal__loadingText}>
                Checking availability...
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
          <div className={styles.checkoutModal__labelWrapper}>
            <label className={styles.checkoutModal__label}>
              Preferred Time
            </label>
            <InfoIcon />
          </div>
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
