"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NotificationPayload } from "@/lib/services/socket-notification";
import { NotificationType, NotificationPriority } from "@/graphql/api";
import { X, Eye, Clock, ExternalLink } from "lucide-react";
import styles from "./NotificationToast.module.scss";

interface NotificationToastProps {
  notification: NotificationPayload;
  onClose: () => void;
  onAction?: () => void;
  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  showCloseButton?: boolean;
  duration?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const PRIORITY_COLORS = {
  [NotificationPriority.Low]: "info",
  [NotificationPriority.Medium]: "warning",
  [NotificationPriority.High]: "danger",
  [NotificationPriority.Urgent]: "urgent",
} as const;

const NOTIFICATION_ICONS = {
  [NotificationType.BookingConfirmation]: "✓",
  [NotificationType.BookingReminder]: "🔔",
  [NotificationType.BookingCancellation]: "❌",
  [NotificationType.PaymentSuccess]: "💳",
  [NotificationType.PaymentFailed]: "⚠️",
  [NotificationType.SubscriptionRenewal]: "🔄",
  [NotificationType.SubscriptionCancellation]: "❌",
  [NotificationType.SystemAlert]: "⚠️",
  [NotificationType.ServiceUpdate]: "🔧",
  [NotificationType.StaffAssignment]: "👥",
  [NotificationType.UserMessage]: "💬",
  [NotificationType.RewardEarned]: "🏆",
  [NotificationType.RewardRedeemed]: "🎁",
} as const;

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onAction,
  actionLabel = "View",
  secondaryAction,
  secondaryActionLabel = "Dismiss",
  showCloseButton = true,
  duration = 5000,
  position = "top-right",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Auto-dismiss toast
    const dismissTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match CSS transition duration
  };

  const handleActionClick = () => {
    onAction?.();
    handleClose();
  };

  const handleSecondaryActionClick = () => {
    secondaryAction?.();
    handleClose();
  };

  const priorityClass = PRIORITY_COLORS[notification.priority];
  const icon = NOTIFICATION_ICONS[notification.type] || "🔔";

  const hasActions = onAction || secondaryAction;

  const toastContent = (
    <div
      className={`
        ${styles.toast}
        ${styles[position]}
        ${styles[priorityClass]}
        ${isVisible ? styles.visible : ""}
        ${isExiting ? styles.exiting : ""}
      `.trim()}
      role="alert"
      aria-live="polite"
    >
      {/* Header with close button */}
      {showCloseButton && (
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        <div className={`${styles.iconContainer} ${styles[priorityClass]}`}>
          <span className={styles.icon}>{icon}</span>
        </div>

        <div className={styles.text}>
          <div className={styles.title}>{notification.title}</div>
          <div className={styles.message}>{notification.message}</div>

          <div className={styles.timeInfo}>
            <Clock size={12} />
            {formatTimeAgo(notification.createdAt)}
          </div>
        </div>
      </div>

      {/* Actions */}
      {hasActions && (
        <div className={styles.actions}>
          <div className={styles.actionButtonsContainer}>
            {onAction && (
              <button
                className={styles.actionButton}
                onClick={handleActionClick}
                type="button"
              >
                {actionLabel === "View" ? (
                  <Eye size={16} />
                ) : (
                  <ExternalLink size={16} />
                )}
                {actionLabel}
              </button>
            )}

            {secondaryAction && (
              <button
                className={`${styles.actionButton} ${styles.secondary}`}
                onClick={handleSecondaryActionClick}
                type="button"
              >
                {secondaryActionLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div
        className={styles.progressBar}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );

  // Render toast in portal to body
  return typeof window !== "undefined"
    ? createPortal(toastContent, document.body)
    : null;
};

// Toast container for managing multiple toasts
interface NotificationToastContainerProps {
  notifications: NotificationPayload[];
  onRemove: (id: string) => void;
  onAction?: (notification: NotificationPayload) => void;
  maxToasts?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  actionLabel?: string;
  showCloseButton?: boolean;
}

export const NotificationToastContainer: React.FC<
  NotificationToastContainerProps
> = ({
  notifications,
  onRemove,
  onAction,
  maxToasts = 5,
  position = "top-right",
  actionLabel = "View",
  showCloseButton = true,
}) => {
  // Show only the most recent toasts
  const visibleNotifications = notifications.slice(0, maxToasts);

  return (
    <>
      {visibleNotifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => onRemove(notification.id)}
          onAction={onAction ? () => onAction(notification) : undefined}
          actionLabel={actionLabel}
          showCloseButton={showCloseButton}
          position={position}
        />
      ))}
    </>
  );
};

export default NotificationToast;
