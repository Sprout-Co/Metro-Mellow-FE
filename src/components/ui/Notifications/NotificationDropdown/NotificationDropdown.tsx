"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationBadge } from "../NotificationBadge/NotificationBadge";
import { NotificationList } from "../NotificationList/NotificationList";
import { NotificationPayload } from "@/lib/services/socket-notification";
import {
  Bell,
  CheckCheck,
  AlertCircle,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import styles from "./NotificationDropdown.module.scss";

interface NotificationDropdownProps {
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  onNotificationClick?: (notification: NotificationPayload) => void;
  onViewAllClick?: () => void;
  maxHeight?: string;
  position?: "left" | "right";
  customTrigger?: React.ReactNode;
  showConnectionStatus?: boolean;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  onNotificationClick,
  onViewAllClick,
  maxHeight = "360px",
  position = "right",
  customTrigger,
  showConnectionStatus = process.env.NODE_ENV === "development",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    unreadCount,
    connectionStatus,
    isConnected,
    markAllAsRead,
    isLoading,
    connectSocket,
  } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: NotificationPayload) => {
    onNotificationClick?.(notification);
    setIsOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleReconnect = () => {
    connectSocket().catch(console.error);
  };

  const getConnectionStatus = () => {
    if (!showConnectionStatus) return null;

    return (
      <div
        className={`${styles.connectionStatus} ${styles[connectionStatus]}`}
        aria-label={`Connection status: ${connectionStatus}`}
      />
    );
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Trigger Button */}
      {customTrigger ? (
        <div
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          aria-label="Toggle notifications"
        >
          {customTrigger}
        </div>
      ) : (
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className={`${styles.trigger} ${buttonClassName}`}
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          <div className={styles.iconContainer}>
            {/* Bell Icon */}
            <Bell
              className={`${styles.bellIcon} ${isOpen ? styles.active : ""}`}
              aria-hidden="true"
            />

            {/* Notification Badge */}
            <NotificationBadge
              className={styles.badge}
              size="sm"
              variant="danger"
              showCount={unreadCount > 9}
            />

            {/* Connection Status Indicator */}
            {getConnectionStatus()}
          </div>
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`
            ${styles.dropdown}
            ${styles[position]}
            ${dropdownClassName}
          `.trim()}
          role="dialog"
          aria-label="Notifications panel"
        >
          {/* Header */}
          <div className={styles.header}>
            <h3 className={styles.title}>Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className={styles.markAllButton}
                type="button"
                disabled={unreadCount === 0}
              >
                <CheckCheck size={16} />
                Mark all read
              </button>
            )}
          </div>

          {/* Connection Status Banner */}
          {!isConnected && (
            <div
              className={styles.connectionBanner}
              data-status={connectionStatus}
            >
              <div
                className={styles.connectionIconContainer}
                data-status={connectionStatus}
              >
                {connectionStatus === "connecting" ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <AlertCircle size={16} />
                )}
              </div>
              <div className={styles.connectionContent}>
                <h4 className={styles.connectionTitle}>
                  {connectionStatus === "connecting"
                    ? "Connecting..."
                    : "Connection Lost"}
                </h4>
                <p className={styles.connectionText}>
                  {connectionStatus === "connecting"
                    ? "Connecting to notification service..."
                    : "Real-time notifications unavailable"}
                </p>
              </div>
              {connectionStatus === "disconnected" && (
                <button
                  onClick={handleReconnect}
                  className={styles.reconnectButton}
                  type="button"
                >
                  <RefreshCw size={12} />
                  Reconnect
                </button>
              )}
            </div>
          )}

          {/* Notification List */}
          <div className={styles.listWrapper}>
            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.loadingSpinner} />
                <p>Loading notifications...</p>
              </div>
            ) : (
              <NotificationList
                maxHeight={maxHeight}
                onNotificationClick={handleNotificationClick}
                showFilters={false}
                showMarkAllAsRead={false}
                showPagination={false}
                emptyMessage="No notifications yet"
                className={styles.notificationList}
                compact={true}
                maxItems={5}
              />
            )}
          </div>

          {/* Footer */}
          {onViewAllClick && (
            <div className={styles.footer}>
              <button
                className={styles.viewAllButton}
                onClick={() => {
                  setIsOpen(false);
                  onViewAllClick?.();
                }}
                type="button"
              >
                <ArrowUpRight size={16} />
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
