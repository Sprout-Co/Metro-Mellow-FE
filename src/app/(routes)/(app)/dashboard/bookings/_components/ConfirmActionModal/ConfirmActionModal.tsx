// src/app/(routes)/(app)/dashboard/bookings/_components/ConfirmActionModal/ConfirmActionModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  PauseCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  Info,
  ChevronRight,
  CheckCircle,
  X,
} from "lucide-react";
import styles from "./ConfirmActionModal.module.scss";
import { Booking } from "@/graphql/api";
import Portal from "@/components/ui/Portal/Portal";

type ActionType = "pause" | "cancel" | "resume" | "reschedule" | null;

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  actionType: ActionType;
  onConfirm?: (reason?: string) => void;
}

interface ReasonOption {
  id: string;
  label: string;
  description?: string;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  booking,
  actionType,
  onConfirm,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!booking) return null;

  // Reason options based on action type
  const reasonOptions: ReasonOption[] =
    actionType === "cancel"
      ? [
          {
            id: "schedule_conflict",
            label: "Schedule Conflict",
            description: "I'm not available at this time",
          },
          {
            id: "no_longer_needed",
            label: "No Longer Needed",
            description: "I don't need this service anymore",
          },
          {
            id: "price_concern",
            label: "Price Concern",
            description: "Service is too expensive",
          },
          {
            id: "other",
            label: "Other",
            description: "Other reason not listed",
          },
        ]
      : [
          {
            id: "vacation",
            label: "Going on Vacation",
            description: "Will be away temporarily",
          },

          {
            id: "financial",
            label: "Financial Reasons",
            description: "Need to pause temporarily",
          },
          {
            id: "other",
            label: "Other",
            description: "Other reason not listed",
          },
        ];

  // Handle confirmation
  const handleConfirm = async () => {
    const finalReason =
      selectedReason === "other" ? customReason : selectedReason;

    if (!finalReason) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      if (onConfirm) {
        onConfirm(finalReason);
      }

      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setSelectedReason("");
        setCustomReason("");
      }, 2000);
    }, 1500);
  };

  // Get action details
  const getActionDetails = () => {
    if (actionType === "cancel") {
      return {
        icon: <XCircle />,
        iconColor: styles["modal--cancel"],
        title: "Cancel Booking",
        subtitle: "Are you sure you want to cancel this booking?",
        warningTitle: "Important Information",
        warnings: [
          "This action cannot be undone",
          "Cancellation fees may apply if less than 24 hours notice",
          "You'll need to create a new booking if you change your mind",
          "Your service provider will be notified immediately",
        ],
        buttonText: "Cancel Booking",
        successTitle: "Booking Cancelled",
        successMessage: "Your booking has been cancelled successfully.",
      };
    } else {
      return {
        icon: <PauseCircle />,
        iconColor: styles["modal--pause"],
        title: "Pause Booking",
        subtitle: "Temporarily pause this recurring service",
        warningTitle: "What happens when you pause",
        warnings: [
          "Service will be temporarily suspended",
          "No charges during the pause period",
          "You can resume anytime from your dashboard",
          "Your time slot will be held for up to 30 days",
        ],
        buttonText: "Pause Booking",
        successTitle: "Booking Paused",
        successMessage:
          "Your booking has been paused. You can resume it anytime.",
      };
    }
  };

  const actionDetails = getActionDetails();

  return (
    <Portal>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.modal} ${actionDetails.iconColor}`}
            // initial={{ opacity: 0, scale: 0.9, y: 20 }}
            // animate={{ opacity: 1, scale: 1, y: 0 }}
            // exit={{ opacity: 0, scale: 0.9, y: 20 }}
            // transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className={styles.modal__header}>
              <div className={styles.modal__iconWrapper}>
                {actionDetails.icon}
              </div>
              <button className={styles.modal__closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Title */}
            <div className={styles.modal__titleSection}>
              <h2 className={styles.modal__title}>{actionDetails.title}</h2>
              <p className={styles.modal__subtitle}>{actionDetails.subtitle}</p>
            </div>

            {/* Reason Selection */}
            <div className={styles.modal__reasonSection}>
              <h3 className={styles.modal__sectionTitle}>
                Please select a reason{" "}
                {actionType === "cancel" ? "for cancellation" : "for pausing"}
              </h3>
              <div className={styles.modal__reasons}>
                {reasonOptions.map((option) => (
                  <motion.label
                    key={option.id}
                    className={`${styles.modal__reasonOption} ${
                      selectedReason === option.id
                        ? styles["modal__reasonOption--selected"]
                        : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={option.id}
                      checked={selectedReason === option.id}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className={styles.modal__reasonRadio}
                    />
                    <div className={styles.modal__reasonContent}>
                      <span className={styles.modal__reasonLabel}>
                        {option.label}
                      </span>
                      {option.description && (
                        <span className={styles.modal__reasonDescription}>
                          {option.description}
                        </span>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      className={styles.modal__reasonArrow}
                    />
                  </motion.label>
                ))}
              </div>

              {/* Custom Reason Input */}
              {selectedReason === "other" && (
                <motion.div
                  className={styles.modal__customReason}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <textarea
                    placeholder="Please provide more details..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className={styles.modal__textarea}
                    rows={3}
                  />
                </motion.div>
              )}
            </div>

            {/* Warning Box */}
            <div className={styles.modal__warning}>
              <div className={styles.modal__warningHeader}>
                <AlertTriangle size={16} />
                <span>{actionDetails.warningTitle}</span>
              </div>
              <ul className={styles.modal__warningList}>
                {actionDetails.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className={styles.modal__success}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CheckCircle size={24} />
                  <div>
                    <h4>{actionDetails.successTitle}</h4>
                    <p>{actionDetails.successMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className={styles.modal__footer}>
              <motion.button
                className={`${styles.modal__button} ${styles["modal__button--secondary"]}`}
                onClick={onClose}
                disabled={isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Keep Booking
              </motion.button>
              <motion.button
                className={`${styles.modal__button} ${styles["modal__button--danger"]}`}
                onClick={handleConfirm}
                disabled={
                  !selectedReason ||
                  (selectedReason === "other" && !customReason) ||
                  isProcessing
                }
                whileHover={
                  selectedReason && (selectedReason !== "other" || customReason)
                    ? { scale: 1.02 }
                    : {}
                }
                whileTap={
                  selectedReason && (selectedReason !== "other" || customReason)
                    ? { scale: 0.98 }
                    : {}
                }
              >
                {isProcessing ? "Processing..." : actionDetails.buttonText}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ConfirmActionModal;
