'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NotificationPayload } from '@/lib/services/socket-notification';
import { NotificationType, NotificationPriority } from '@/graphql/api';
import styles from './NotificationToast.module.scss';

interface NotificationToastProps {
  notification: NotificationPayload;
  onClose: () => void;
  onAction?: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const PRIORITY_COLORS = {
  [NotificationPriority.Low]: 'info',
  [NotificationPriority.Medium]: 'warning', 
  [NotificationPriority.High]: 'danger',
  [NotificationPriority.Urgent]: 'urgent'
} as const;

const NOTIFICATION_ICONS = {
  [NotificationType.BookingConfirmation]: '✓',
  [NotificationType.BookingReminder]: '🔔',
  [NotificationType.BookingCancellation]: '❌',
  [NotificationType.PaymentSuccess]: '💳',
  [NotificationType.PaymentFailed]: '⚠️',
  [NotificationType.SubscriptionRenewal]: '🔄',
  [NotificationType.SubscriptionCancellation]: '❌',
  [NotificationType.SystemAlert]: '⚠️',
  [NotificationType.ServiceUpdate]: '🔧',
  [NotificationType.StaffAssignment]: '👥',
  [NotificationType.UserMessage]: '💬',
  [NotificationType.RewardEarned]: '🏆',
  [NotificationType.RewardRedeemed]: '🎁'
} as const;

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onAction,
  duration = 5000,
  position = 'top-right'
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

  const priorityClass = PRIORITY_COLORS[notification.priority];
  const icon = NOTIFICATION_ICONS[notification.type] || '🔔';

  const toastContent = (
    <div
      className={`
        ${styles.toast}
        ${styles[position]}
        ${styles[priorityClass]}
        ${isVisible ? styles.visible : ''}
        ${isExiting ? styles.exiting : ''}
      `.trim()}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          {icon}
        </div>
        
        <div className={styles.text}>
          <div className={styles.title}>
            {notification.title}
          </div>
          <div className={styles.message}>
            {notification.message}
          </div>
        </div>
        
        <div className={styles.actions}>
          {onAction && (
            <button
              className={styles.actionButton}
              onClick={handleActionClick}
              type="button"
            >
              View
            </button>
          )}
          
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
      
      <div 
        className={styles.progressBar}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );

  // Render toast in portal to body
  return typeof window !== 'undefined' 
    ? createPortal(toastContent, document.body)
    : null;
};

// Toast container for managing multiple toasts
interface NotificationToastContainerProps {
  notifications: NotificationPayload[];
  onRemove: (id: string) => void;
  onAction?: (notification: NotificationPayload) => void;
  maxToasts?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const NotificationToastContainer: React.FC<NotificationToastContainerProps> = ({
  notifications,
  onRemove,
  onAction,
  maxToasts = 5,
  position = 'top-right'
}) => {
  // Show only the most recent toasts
  const visibleNotifications = notifications.slice(0, maxToasts);

  return (
    <>
      {visibleNotifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => onRemove(notification.id)}
          onAction={onAction ? () => onAction(notification) : undefined}
          position={position}
        />
      ))}
    </>
  );
};

export default NotificationToast;