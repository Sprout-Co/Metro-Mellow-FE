'use client';

import React, { useState, useEffect } from 'react';
import { useNotifications } from '@/components/providers/NotificationProvider';
import { NotificationType, NotificationPriority } from '@/graphql/api';
import styles from './NotificationSettings.module.scss';

interface NotificationPreferences {
  enableRealTime: boolean;
  enableToasts: boolean;
  toastDuration: number;
  enabledTypes: Record<NotificationType, boolean>;
  minimumPriority: NotificationPriority;
  maxToastsShown: number;
}

interface NotificationSettingsProps {
  className?: string;
  onPreferencesChange?: (preferences: NotificationPreferences) => void;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enableRealTime: true,
  enableToasts: true,
  toastDuration: 5000,
  enabledTypes: {
    [NotificationType.BookingConfirmation]: true,
    [NotificationType.BookingReminder]: true,
    [NotificationType.BookingCancellation]: true,
    [NotificationType.PaymentSuccess]: true,
    [NotificationType.PaymentFailed]: true,
    [NotificationType.SubscriptionRenewal]: true,
    [NotificationType.SubscriptionCancellation]: true,
    [NotificationType.SystemAlert]: true,
    [NotificationType.ServiceUpdate]: true,
    [NotificationType.StaffAssignment]: true,
    [NotificationType.UserMessage]: true,
    [NotificationType.RewardEarned]: true,
    [NotificationType.RewardRedeemed]: true
  },
  minimumPriority: NotificationPriority.Low,
  maxToastsShown: 5
};

const NOTIFICATION_TYPE_LABELS = {
  [NotificationType.BookingConfirmation]: 'Booking Confirmations',
  [NotificationType.BookingReminder]: 'Booking Reminders',
  [NotificationType.BookingCancellation]: 'Booking Cancellations',
  [NotificationType.PaymentSuccess]: 'Payment Success',
  [NotificationType.PaymentFailed]: 'Payment Failures',
  [NotificationType.SubscriptionRenewal]: 'Subscription Renewals',
  [NotificationType.SubscriptionCancellation]: 'Subscription Cancellations',
  [NotificationType.SystemAlert]: 'System Alerts',
  [NotificationType.ServiceUpdate]: 'Service Updates',
  [NotificationType.StaffAssignment]: 'Staff Assignments',
  [NotificationType.UserMessage]: 'User Messages',
  [NotificationType.RewardEarned]: 'Rewards Earned',
  [NotificationType.RewardRedeemed]: 'Rewards Redeemed'
};

const PRIORITY_LABELS = {
  [NotificationPriority.Low]: 'Low and above',
  [NotificationPriority.Medium]: 'Medium and above',
  [NotificationPriority.High]: 'High and above',
  [NotificationPriority.Urgent]: 'Urgent only'
};

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  className = '',
  onPreferencesChange
}) => {
  const { isConnected, connectionStatus, connectSocket, disconnectSocket } = useNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notification-preferences');
      if (saved) {
        try {
          return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
        } catch (error) {
          console.error('Failed to parse saved notification preferences:', error);
        }
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notification-preferences', JSON.stringify(preferences));
    }
    onPreferencesChange?.(preferences);
  }, [preferences, onPreferencesChange]);

  // Handle real-time connection toggle
  useEffect(() => {
    if (preferences.enableRealTime && !isConnected) {
      connectSocket().catch(console.error);
    } else if (!preferences.enableRealTime && isConnected) {
      disconnectSocket();
    }
  }, [preferences.enableRealTime, isConnected, connectSocket, disconnectSocket]);

  const updatePreference = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const updateNotificationType = (type: NotificationType, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      enabledTypes: { ...prev.enabledTypes, [type]: enabled }
    }));
  };

  const handleTestNotification = () => {
    if (isConnected) {
      // This would typically trigger a test notification from the backend
      console.log('Test notification would be sent here');
    }
  };

  const resetToDefaults = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3>Notification Settings</h3>
        <p>Manage how you receive notifications from Metro Mellow</p>
      </div>

      {/* Real-time Connection Settings */}
      <div className={styles.section}>
        <h4>Real-time Notifications</h4>
        
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <label className={styles.settingLabel}>Enable Real-time Notifications</label>
            <p className={styles.settingDescription}>
              Receive notifications instantly as they happen
            </p>
          </div>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={preferences.enableRealTime}
              onChange={(e) => updatePreference('enableRealTime', e.target.checked)}
            />
            <span className={styles.toggleSlider} />
          </label>
        </div>

        {/* Connection Status */}
        <div className={styles.connectionStatus}>
          <div className={styles.statusIndicator}>
            <span className={`${styles.statusDot} ${styles[connectionStatus]}`} />
            <span className={styles.statusText}>
              {connectionStatus === 'connected' && 'Connected to real-time notifications'}
              {connectionStatus === 'connecting' && 'Connecting to notifications...'}
              {connectionStatus === 'disconnected' && 'Notifications disconnected'}
            </span>
          </div>
          
          {preferences.enableRealTime && !isConnected && (
            <button
              onClick={connectSocket}
              className={styles.reconnectButton}
              type="button"
            >
              Reconnect
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification Settings */}
      <div className={styles.section}>
        <h4>Toast Notifications</h4>
        
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <label className={styles.settingLabel}>Show Toast Notifications</label>
            <p className={styles.settingDescription}>
              Display popup notifications for new alerts
            </p>
          </div>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={preferences.enableToasts}
              onChange={(e) => updatePreference('enableToasts', e.target.checked)}
            />
            <span className={styles.toggleSlider} />
          </label>
        </div>

        {preferences.enableToasts && (
          <>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label className={styles.settingLabel}>
                  Toast Duration: {preferences.toastDuration / 1000}s
                </label>
                <p className={styles.settingDescription}>
                  How long toasts stay visible
                </p>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="1000"
                value={preferences.toastDuration}
                onChange={(e) => updatePreference('toastDuration', parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label className={styles.settingLabel}>
                  Max Toasts: {preferences.maxToastsShown}
                </label>
                <p className={styles.settingDescription}>
                  Maximum number of toasts shown at once
                </p>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={preferences.maxToastsShown}
                onChange={(e) => updatePreference('maxToastsShown', parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          </>
        )}
      </div>

      {/* Priority Filter */}
      <div className={styles.section}>
        <h4>Priority Filter</h4>
        
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <label className={styles.settingLabel}>Minimum Priority</label>
            <p className={styles.settingDescription}>
              Only show notifications at or above this priority level
            </p>
          </div>
          <select
            value={preferences.minimumPriority}
            onChange={(e) => updatePreference('minimumPriority', e.target.value as NotificationPriority)}
            className={styles.select}
          >
            {Object.entries(PRIORITY_LABELS).map(([priority, label]) => (
              <option key={priority} value={priority}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notification Types */}
      <div className={styles.section}>
        <h4>Notification Types</h4>
        <p className={styles.sectionDescription}>
          Choose which types of notifications you want to receive
        </p>
        
        <div className={styles.typesList}>
          {Object.entries(NOTIFICATION_TYPE_LABELS).map(([type, label]) => {
            const notificationType = type as NotificationType;
            return (
              <div key={type} className={styles.typeSetting}>
                <label className={styles.typeLabel}>
                  <input
                    type="checkbox"
                    checked={preferences.enabledTypes[notificationType]}
                    onChange={(e) => updateNotificationType(notificationType, e.target.checked)}
                    className={styles.typeCheckbox}
                  />
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          onClick={handleTestNotification}
          className={styles.testButton}
          disabled={!isConnected}
          type="button"
        >
          Test Notification
        </button>
        
        <button
          onClick={resetToDefaults}
          className={styles.resetButton}
          type="button"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;