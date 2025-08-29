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
  PlayCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import styles from "./SubscriptionConfirmActionModal.module.scss";
import { SubscriptionStatus, GetCustomerSubscriptionsQuery } from "@/graphql/api";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import Modal from "@/components/ui/Modal/Modal";

// Type for GraphQL subscription data
type Subscription = GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

export type SubscriptionActionType =
  | "pause"
  | "cancel"
  | "resume"
  | "reactivate"
  | null;

interface SubscriptionConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
  actionType: SubscriptionActionType;
  onConfirm?: (reason?: string) => void;
}

interface ReasonOption {
  id: string;
  label: string;
  description?: string;
}

const SubscriptionConfirmActionModal: React.FC<SubscriptionConfirmActionModalProps> = ({
  isOpen,
  onClose,
  subscription,
  actionType,
  onConfirm,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    handleCancelSubscription,
    handlePauseSubscription,
    handleResumeSubscription,
    handleReactivateSubscription,
  } = useSubscriptionOperations();

  if (!subscription) return null;

  // Reason options based on action type
  const getReasonOptions = (): ReasonOption[] => {
    switch (actionType) {
      case "cancel":
        return [
          {
            id: "no_longer_needed",
            label: "No Longer Needed",
            description: "I don't need these services anymore",
          },
          {
            id: "moving",
            label: "Moving/Relocating",
            description: "I'm moving to a different location",
          },
          {
            id: "price_concern",
            label: "Price Concern",
            description: "Services are too expensive",
          },
          {
            id: "service_quality",
            label: "Service Quality Issues",
            description: "Not satisfied with service quality",
          },
          {
            id: "other",
            label: "Other",
            description: "Other reason not listed",
          },
        ];
      case "pause":
        return [
          {
            id: "vacation",
            label: "Going on Vacation",
            description: "Will be away temporarily",
          },
          {
            id: "financial",
            label: "Financial Reasons",
            description: "Need to pause temporarily due to budget",
          },
          {
            id: "construction",
            label: "Home Renovation",
            description: "Construction/renovation in progress",
          },
          {
            id: "temporary_move",
            label: "Temporary Relocation",
            description: "Temporarily staying elsewhere",
          },
          {
            id: "other",
            label: "Other",
            description: "Other reason not listed",
          },
        ];
      case "resume":
        return [
          {
            id: "ready_to_resume",
            label: "Ready to Resume",
            description: "I'm ready to continue with services",
          },
          {
            id: "back_from_vacation",
            label: "Back from Vacation",
            description: "I've returned and need services again",
          },
          {
            id: "other",
            label: "Other",
            description: "Other reason not listed",
          },
        ];
      case "reactivate":
        return [
          {
            id: "need_services_again",
            label: "Need Services Again",
            description: "I need these services back",
          },
          {
            id: "moved_back",
            label: "Moved Back",
            description: "I've moved back and need services",
          },
          {
            id: "other",
            label: "Other",
            description: "Other reason not listed",
          },
        ];
      default:
        return [];
    }
  };

  const reasonOptions = getReasonOptions();

  // Handle confirmation
  const handleConfirm = async () => {
    const finalReason =
      selectedReason === "other" ? customReason : selectedReason;

    setIsProcessing(true);
    setError(null);

    try {
      switch (actionType) {
        case "cancel":
          await handleCancelSubscription(subscription.id);
          break;
        case "pause":
          await handlePauseSubscription(subscription.id);
          break;
        case "resume":
          await handleResumeSubscription(subscription.id);
          break;
        case "reactivate":
          await handleReactivateSubscription(subscription.id);
          break;
        default:
          break;
      }

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
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process request"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Get action details
  const getActionDetails = () => {
    switch (actionType) {
      case "cancel":
        return {
          icon: <XCircle />,
          iconColor: styles["modal--cancel"],
          title: "Cancel Subscription",
          subtitle: "Are you sure you want to cancel this subscription?",
          warningTitle: "Important Information",
          warnings: [
            "This action cannot be undone",
            "All future scheduled services will be cancelled",
            "You'll lose any remaining service credits",
            "Your service providers will be notified immediately",
            "Final billing will be processed within 24 hours",
          ],
          buttonText: "Cancel Subscription",
          successTitle: "Subscription Cancelled",
          successMessage: "Your subscription has been cancelled successfully.",
          reasonText: "for cancellation",
          secondaryButtonText: "Keep Subscription",
        };
      case "pause":
        return {
          icon: <PauseCircle />,
          iconColor: styles["modal--pause"],
          title: "Pause Subscription",
          subtitle: "Temporarily pause all services in this subscription",
          warningTitle: "What happens when you pause",
          warnings: [
            "All services will be temporarily suspended",
            "No charges during the pause period",
            "You can resume anytime from your dashboard",
            "Your service slots will be held for up to 60 days",
            "Service providers will be notified of the pause",
          ],
          buttonText: "Pause Subscription",
          successTitle: "Subscription Paused",
          successMessage:
            "Your subscription has been paused. You can resume it anytime.",
          reasonText: "for pausing",
          secondaryButtonText: "Keep Active",
        };
      case "resume":
        return {
          icon: <PlayCircle />,
          iconColor: styles["modal--resume"],
          title: "Resume Subscription",
          subtitle: "Resume your paused subscription services",
          warningTitle: "What happens when you resume",
          warnings: [
            "All services will be reactivated immediately",
            "Regular billing schedule will resume",
            "Service providers will be notified",
            "Next services will be scheduled based on your preferences",
            "You'll be charged for the current billing period",
          ],
          buttonText: "Resume Subscription",
          successTitle: "Subscription Resumed",
          successMessage:
            "Your subscription has been resumed successfully. Services will continue as scheduled.",
          reasonText: "for resuming",
          secondaryButtonText: "Keep Paused",
        };
      case "reactivate":
        return {
          icon: <RefreshCw />,
          iconColor: styles["modal--reactivate"],
          title: "Reactivate Subscription",
          subtitle: "Reactivate your cancelled subscription",
          warningTitle: "What happens when you reactivate",
          warnings: [
            "Subscription will be restored to active status",
            "Services will be rescheduled based on availability",
            "Billing will resume with the next cycle",
            "Previous service preferences will be restored",
            "Service providers will be notified of reactivation",
          ],
          buttonText: "Reactivate Subscription",
          successTitle: "Subscription Reactivated",
          successMessage:
            "Your subscription has been reactivated successfully. Services will be scheduled soon.",
          reasonText: "for reactivation",
          secondaryButtonText: "Cancel",
        };
      default:
        return {
          icon: <Info />,
          iconColor: styles["modal--default"],
          title: "Confirm Action",
          subtitle: "Please confirm this action",
          warningTitle: "Important Information",
          warnings: ["Please review the action details"],
          buttonText: "Confirm",
          successTitle: "Action Completed",
          successMessage: "Action has been completed successfully.",
          reasonText: "",
          secondaryButtonText: "Cancel",
        };
    }
  };

  const actionDetails = getActionDetails();

  // Get subscription display name
  const subscriptionName = 
    subscription.subscriptionServices.length > 1
      ? `${subscription.subscriptionServices.length} Services Package`
      : subscription.subscriptionServices[0]?.service.name || "Subscription";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div className={`${styles.modal} ${actionDetails.iconColor}`}>
        {/* Header */}
        <div className={styles.modal__header}>
          <div className={styles.modal__iconWrapper}>{actionDetails.icon}</div>
          <button className={styles.modal__closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className={styles.modal__titleSection}>
          <h2 className={styles.modal__title}>{actionDetails.title}</h2>
          <p className={styles.modal__subtitle}>{actionDetails.subtitle}</p>
        </div>

        {/* Subscription Info */}
        <div className={styles.modal__subscriptionInfo}>
          <div className={styles.modal__subscriptionDetails}>
            <h3 className={styles.modal__subscriptionName}>{subscriptionName}</h3>
            <div className={styles.modal__subscriptionMeta}>
              <span className={styles.modal__subscriptionPrice}>
                ₦{subscription.totalPrice.toLocaleString()} per {subscription.billingCycle.toLowerCase()}
              </span>
              <span className={styles.modal__subscriptionServices}>
                {subscription.subscriptionServices.length} service{subscription.subscriptionServices.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Reason Selection */}
        <div className={styles.modal__reasonSection}>
          {reasonOptions.length > 0 && (
            <>
              <h3 className={styles.modal__sectionTitle}>
                Please select a reason {actionDetails.reasonText}
              </h3>
              <div className={styles.modal__reasons}>
                {reasonOptions.map((option) => (
                  <motion.label
                    key={option.id}
                    className={`${styles.modal__reasonOption} ${
                      selectedReason === option.description
                        ? styles["modal__reasonOption--selected"]
                        : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={option.description}
                      checked={selectedReason === option.description}
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
                    <ChevronRight size={16} className={styles.modal__reasonArrow} />
                  </motion.label>
                ))}
              </div>

              {/* Custom Reason Input */}
              {selectedReason === "Other reason not listed" && (
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
            </>
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

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.modal__error}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AlertTriangle size={16} />
              <div>
                <strong>Error:</strong>
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            {actionDetails.secondaryButtonText}
          </motion.button>
          <motion.button
            className={`${styles.modal__button} ${styles["modal__button--danger"]}`}
            onClick={handleConfirm}
            disabled={
              isProcessing ||
              (reasonOptions.length > 0 && 
                (!selectedReason || (selectedReason === "Other reason not listed" && !customReason.trim())))
            }
            whileHover={
              !isProcessing && 
              (reasonOptions.length === 0 || selectedReason) && 
              (selectedReason !== "Other reason not listed" || customReason.trim())
                ? { scale: 1.02 }
                : {}
            }
            whileTap={
              !isProcessing && 
              (reasonOptions.length === 0 || selectedReason) && 
              (selectedReason !== "Other reason not listed" || customReason.trim())
                ? { scale: 0.98 }
                : {}
            }
          >
            {isProcessing ? "Processing..." : actionDetails.buttonText}
          </motion.button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default SubscriptionConfirmActionModal;