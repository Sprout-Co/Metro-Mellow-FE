'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useNotifications } from './NotificationProvider';
import { NotificationToastContainer } from '@/components/ui/NotificationToast/NotificationToast';
import { NotificationPayload } from '@/lib/services/socket-notification';

interface ToastManagerProps {
  maxToasts?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  defaultDuration?: number;
  enableToasts?: boolean;
}

export const NotificationToastManager: React.FC<ToastManagerProps> = ({
  maxToasts = 5,
  position = 'top-right',
  defaultDuration = 5000,
  enableToasts = true
}) => {
  const { notifications } = useNotifications();
  const [activeToasts, setActiveToasts] = useState<NotificationPayload[]>([]);
  const [shownNotifications, setShownNotifications] = useState<Set<string>>(new Set());

  // Add new notifications as toasts
  useEffect(() => {
    if (!enableToasts) return;

    const newNotifications = notifications.filter(
      notification => 
        !shownNotifications.has(notification.id) && 
        !(notification as any).isRead
    );

    if (newNotifications.length > 0) {
      newNotifications.forEach(notification => {
        setActiveToasts(prev => {
          // Don't add if already in active toasts
          if (prev.some(toast => toast.id === notification.id)) {
            return prev;
          }
          
          // Add to active toasts (newest first)
          const updated = [notification, ...prev].slice(0, maxToasts);
          return updated;
        });
        
        setShownNotifications(prev => new Set([...prev, notification.id]));
      });
    }
  }, [notifications, shownNotifications, maxToasts, enableToasts]);

  const removeToast = useCallback((notificationId: string) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== notificationId));
  }, []);

  const handleToastAction = useCallback((notification: NotificationPayload) => {
    // Handle toast action - could navigate to a specific page
    // or trigger an action based on notification type
    console.log('Toast action triggered for:', notification);
    
    // Remove the toast after action
    removeToast(notification.id);
  }, [removeToast]);

  if (!enableToasts || activeToasts.length === 0) {
    return null;
  }

  return (
    <NotificationToastContainer
      notifications={activeToasts}
      onRemove={removeToast}
      onAction={handleToastAction}
      maxToasts={maxToasts}
      position={position}
    />
  );
};

export default NotificationToastManager;