"use client";

import React, { useState, useEffect } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationType, NotificationPriority } from "@/graphql/api";
import {
  Bell,
  MessageSquare,
  Clock,
  Shield,
  Bell as BellIcon,
  RefreshCw,
  Check,
  RotateCcw,
  Send,
} from "lucide-react";
import styles from "./NotificationSettings.module.scss";

interface NotificationPreferences {
  enableRealTime: boolean;
  enableToasts: boolean;
  toastDuration: number;
  enabledTypes: Record<NotificationType, boolean>;
  minimumPriority: NotificationPriority;
  maxToastsShown: number;
  enableSoundEffects?: boolean;
  pushNotificationsEnabled?: boolean;
  showOnLockScreen?: boolean;
}

interface NotificationSettingsProps {
  className?: string;
  onPreferencesChange?: (preferences: NotificationPreferences) => void;
  onClose?: () => void;
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
    [NotificationType.RewardRedeemed]: true,
  },
  minimumPriority: NotificationPriority.Low,
  maxToastsShown: 5,
  enableSoundEffects: true,
  pushNotificationsEnabled: false,
  showOnLockScreen: false,
};

const NOTIFICATION_TYPE_LABELS = {
  [NotificationType.BookingConfirmation]: "Booking Confirmations",
  [NotificationType.BookingReminder]: "Booking Reminders",
  [NotificationType.BookingCancellation]: "Booking Cancellations",
  [NotificationType.PaymentSuccess]: "Payment Success",
  [NotificationType.PaymentFailed]: "Payment Failures",
  [NotificationType.SubscriptionRenewal]: "Subscription Renewals",
  [NotificationType.SubscriptionCancellation]: "Subscription Cancellations",
  [NotificationType.SystemAlert]: "System Alerts",
  [NotificationType.ServiceUpdate]: "Service Updates",
  [NotificationType.StaffAssignment]: "Staff Assignments",
  [NotificationType.UserMessage]: "User Messages",
  [NotificationType.RewardEarned]: "Rewards Earned",
  [NotificationType.RewardRedeemed]: "Rewards Redeemed",
};

const NOTIFICATION_TYPE_ICONS = {
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
};

const PRIORITY_LABELS = {
  [NotificationPriority.Low]: "Low and above",
  [NotificationPriority.Medium]: "Medium and above",
  [NotificationPriority.High]: "High and above",
  [NotificationPriority.Urgent]: "Urgent only",
};

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  className = "",
  onPreferencesChange,
  onClose,
}) => {
  const { isConnected, connectionStatus, connectSocket, disconnectSocket } =
    useNotifications();
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    () => {
      // Load from localStorage if available
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("notification-preferences");
        if (saved) {
          try {
            return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
          } catch (error) {
            console.error(
              "Failed to parse saved notification preferences:",
              error
            );
          }
        }
      }
      return DEFAULT_PREFERENCES;
    }
  );

  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "notification-preferences",
        JSON.stringify(preferences)
      );
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
  }, [
    preferences.enableRealTime,
    isConnected,
    connectSocket,
    disconnectSocket,
  ]);

  const updatePreference = <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const updateNotificationType = (type: NotificationType, enabled: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      enabledTypes: { ...prev.enabledTypes, [type]: enabled },
    }));
  };

  const handleTestNotification = () => {
    if (isConnected) {
      // This would typically trigger a test notification from the backend
      console.log("Test notification would be sent here");
    }
  };

  const resetToDefaults = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3>Notification Settings</h3>
        <p>Configure how you receive notifications from Metro Mellow</p>
      </div>

      {/* Real-time Connection Settings */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Bell size={20} />
          </div>
          <h4 className={styles.sectionTitle}>Real-time Notifications</h4>
        </div>

        <p className={styles.sectionDescription}>
          Control real-time notification delivery and connection settings
        </p>

        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <label className={styles.settingLabel}>
              Enable Real-time Notifications
            </label>
            <p className={styles.settingDescription}>
              Receive notifications instantly as they happen
            </p>
          </div>
          <div className={styles.settingControl}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={preferences.enableRealTime}
                onChange={(e) =>
                  updatePreference("enableRealTime", e.target.checked)
                }
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        {/* Connection Status */}
        <div className={styles.connectionStatus} data-status={connectionStatus}>
          <div
            className={styles.statusIconContainer}
            data-status={connectionStatus}
          >
            {connectionStatus === "connected" ? (
              <Check size={20} />
            ) : connectionStatus === "connecting" ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <Bell size={20} />
            )}
          </div>

          <div className={styles.statusContent}>
            <h5 className={styles.statusTitle}>
              {connectionStatus === "connected"
                ? "Connected"
                : connectionStatus === "connecting"
                  ? "Connecting..."
                  : "Disconnected"}
            </h5>
            <p className={styles.statusText}>
              {connectionStatus === "connected"
                ? "Real-time notification service is active"
                : connectionStatus === "connecting"
                  ? "Establishing connection to notification service..."
                  : "Real-time notification service is unavailable"}
            </p>
          </div>

          {preferences.enableRealTime && !isConnected && (
            <button
              onClick={connectSocket}
              className={styles.reconnectButton}
              type="button"
            >
              <RefreshCw size={16} />
              Reconnect
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification Settings */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <MessageSquare size={20} />
          </div>
          <h4 className={styles.sectionTitle}>Toast Notifications</h4>
        </div>

        <p className={styles.sectionDescription}>
          Configure pop-up notification appearance and behavior
        </p>

        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <label className={styles.settingLabel}>
              Show Toast Notifications
            </label>
            <p className={styles.settingDescription}>
              Display popup notifications for new alerts
            </p>
          </div>
          <div className={styles.settingControl}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={preferences.enableToasts}
                onChange={(e) =>
                  updatePreference("enableToasts", e.target.checked)
                }
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        {preferences.enableToasts && (
          <>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label className={styles.settingLabel}>Toast Duration</label>
                <p className={styles.settingDescription}>
                  How long toasts stay visible on screen
                </p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.sliderContainer}>
                  <div className={styles.sliderValue}>
                    <span>Duration:</span>
                    <span className={styles.value}>
                      {preferences.toastDuration / 1000}s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="10000"
                    step="1000"
                    value={preferences.toastDuration}
                    onChange={(e) =>
                      updatePreference(
                        "toastDuration",
                        parseInt(e.target.value)
                      )
                    }
                    className={styles.slider}
                  />
                </div>
              </div>
            </div>

            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label className={styles.settingLabel}>
                  Maximum Number of Toasts
                </label>
                <p className={styles.settingDescription}>
                  Limit how many toast notifications can appear at once
                </p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.sliderContainer}>
                  <div className={styles.sliderValue}>
                    <span>Max toasts:</span>
                    <span className={styles.value}>
                      {preferences.maxToastsShown}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={preferences.maxToastsShown}
                    onChange={(e) =>
                      updatePreference(
                        "maxToastsShown",
                        parseInt(e.target.value)
                      )
                    }
                    className={styles.slider}
                  />
                </div>
              </div>
            </div>

            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label className={styles.settingLabel}>
                  Enable Sound Effects
                </label>
                <p className={styles.settingDescription}>
                  Play a sound when new notifications arrive
                </p>
              </div>
              <div className={styles.settingControl}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={preferences.enableSoundEffects}
                    onChange={(e) =>
                      updatePreference("enableSoundEffects", e.target.checked)
                    }
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Priority Filter */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Shield size={20} />
          </div>
          <h4 className={styles.sectionTitle}>Priority Settings</h4>
        </div>

        <p className={styles.sectionDescription}>
          Set which notification priority levels you want to receive
        </p>

        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <label className={styles.settingLabel}>
              Minimum Priority Level
            </label>
            <p className={styles.settingDescription}>
              Only show notifications at or above this priority level
            </p>
          </div>
          <div className={styles.settingControl}>
            <select
              value={preferences.minimumPriority}
              onChange={(e) =>
                updatePreference(
                  "minimumPriority",
                  e.target.value as NotificationPriority
                )
              }
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
      </div>

      {/* Notification Types */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Clock size={20} />
          </div>
          <h4 className={styles.sectionTitle}>Notification Categories</h4>
        </div>

        <p className={styles.sectionDescription}>
          Choose which types of notifications you want to receive
        </p>

        <div className={styles.typesList}>
          {Object.entries(NOTIFICATION_TYPE_LABELS).map(([type, label]) => {
            const notificationType = type as NotificationType;
            const icon = NOTIFICATION_TYPE_ICONS[notificationType];

            return (
              <div key={type} className={styles.typeItem}>
                <input
                  id={`type-${type}`}
                  type="checkbox"
                  checked={preferences.enabledTypes[notificationType]}
                  onChange={(e) =>
                    updateNotificationType(notificationType, e.target.checked)
                  }
                  className={styles.typeCheckbox}
                />
                <label htmlFor={`type-${type}`} className={styles.typeLabel}>
                  <span className={styles.typeIcon}>{icon}</span>
                  <span className={styles.typeName}>{label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          onClick={resetToDefaults}
          className={styles.resetButton}
          type="button"
        >
          <RotateCcw size={18} />
          Reset to Defaults
        </button>

        <button
          onClick={handleTestNotification}
          className={styles.testButton}
          disabled={!isConnected}
          type="button"
        >
          <Send size={18} />
          Send Test Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
