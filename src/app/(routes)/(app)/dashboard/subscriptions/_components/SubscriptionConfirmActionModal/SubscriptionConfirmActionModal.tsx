"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  PauseCircle,
  XCircle,
  Info,
  ChevronRight,
  CheckCircle,
  X,
  PlayCircle,
  RefreshCw,
} from "lucide-react";
import styles from "./SubscriptionConfirmActionModal.module.scss";
import { Subscription, GetCustomerSubscriptionsQuery } from "@/graphql/api";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import Modal from "@/components/ui/Modal/Modal";

// Type for GraphQL subscription data that matches the one from the list view
type SubscriptionType =
  GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

export type SubscriptionActionType =
  | "pause"
  | "cancel"
  | "resume"
  | "reactivate"
  | null;

interface SubscriptionConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: SubscriptionType | null;
  actionType: SubscriptionActionType;
  onConfirm?: (reason?: string) => void;
}

interface ReasonOption {
  id: string;
  label: string;
  description?: string;
}

const SubscriptionConfirmActionModal: React.FC<
  SubscriptionConfirmActionModalProps
> = ({ isOpen, onClose, subscription, actionType, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [cancellationReason, setCancellationReason] = useState<string>("");
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

  // Handle confirmation
  const handleConfirm = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      let result;
      switch (actionType) {
        case "cancel":
          result = await handleCancelSubscription(subscription.id);
          break;
        case "pause":
          result = await handlePauseSubscription(subscription.id);
          break;
        case "resume":
          result = await handleResumeSubscription(subscription.id);
          break;
        case "reactivate":
          result = await handleReactivateSubscription(subscription.id);
          break;
        default:
          break;
      }

      setShowSuccess(true);

      // Immediately call onConfirm to trigger subscription list refresh
      if (onConfirm) {
        onConfirm(cancellationReason);
      }

      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setSelectedReason("");
        setCancellationReason("");
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
        </div>

        {/* Title */}
        <div className={styles.modal__titleSection}>
          <h2 className={styles.modal__title}>{actionDetails.title}</h2>
          <p className={styles.modal__subtitle}>{actionDetails.subtitle}</p>
        </div>

        {/* Subscription Info */}
        <div className={styles.modal__subscriptionInfo}>
          <div className={styles.modal__subscriptionDetails}>
            <h3 className={styles.modal__subscriptionName}>
              {subscriptionName}
            </h3>
            <div className={styles.modal__subscriptionMeta}>
              <span className={styles.modal__subscriptionPrice}>
                ₦{subscription.totalPrice.toLocaleString()} per{" "}
                {subscription.billingCycle.toLowerCase()}
              </span>
              <span className={styles.modal__subscriptionServices}>
                {subscription.subscriptionServices.length} service
                {subscription.subscriptionServices.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Reason Selection */}
        <div className={styles.modal__reasonSection}>
          <h3 className={styles.modal__sectionTitle}>
            Please provide a reason for {actionDetails.reasonText} (optional)
          </h3>
          <motion.div
            className={styles.modal__customReason}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              placeholder="Please provide more details..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              className={styles.modal__textarea}
              rows={3}
            />
          </motion.div>
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
            whileHover={!isProcessing ? { scale: 1.02 } : {}}
            whileTap={!isProcessing ? { scale: 0.98 } : {}}
          >
            {isProcessing ? "Processing..." : actionDetails.buttonText}
          </motion.button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default SubscriptionConfirmActionModal;
