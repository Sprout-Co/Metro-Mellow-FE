"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationBadge } from "../NotificationBadge/NotificationBadge";
import { NotificationList } from "../NotificationList/NotificationList";
import { NotificationPayload } from "@/lib/services/socket-notification";
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
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  onNotificationClick,
  onViewAllClick,
  maxHeight = "400px",
  position = "right",
  customTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { unreadCount, connectionStatus, isConnected } = useNotifications();

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
    console.log("Notification dropdown toggled:", !isOpen);
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: NotificationPayload) => {
    onNotificationClick?.(notification);
    setIsOpen(false);
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return "🟢";
      case "connecting":
        return "🟡";
      case "disconnected":
        return "🔴";
      default:
        return "⚫";
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Trigger Button */}
      {customTrigger ? (
        <div onClick={handleToggle} role="button" tabIndex={0}>
          {customTrigger}
        </div>
      ) : (
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Bell icon clicked!");
            handleToggle();
          }}
          className={`${styles.trigger} ${buttonClassName}`}
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          <div className={styles.iconContainer}>
            {/* Bell Icon */}
            <svg
              className={styles.bellIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Notification Badge */}
            <NotificationBadge
              className={styles.badge}
              size="sm"
              variant="danger"
            />
          </div>

          {/* Connection Status Indicator */}
          {process.env.NODE_ENV === "development" && (
            <div
              className={styles.connectionStatus}
              title={`WebSocket: ${connectionStatus}`}
            >
              {getConnectionStatusIcon()}
            </div>
          )}
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
          role="region"
          aria-label="Notifications panel"
        >
          {/* Connection Status Banner */}
          {!isConnected && (
            <div className={styles.connectionBanner}>
              <span className={styles.connectionIcon}>⚠️</span>
              <span className={styles.connectionText}>
                {connectionStatus === "connecting"
                  ? "Connecting to real-time notifications..."
                  : "Real-time notifications disconnected"}
              </span>
            </div>
          )}

          {/* Notification List */}
          <NotificationList
            maxHeight={maxHeight}
            onNotificationClick={handleNotificationClick}
            showFilters={false}
            showMarkAllAsRead={true}
            emptyMessage="No notifications yet"
            className={styles.notificationList}
          />

          {/* Footer */}
          <div className={styles.footer}>
            <button
              className={styles.viewAllButton}
              onClick={() => {
                setIsOpen(false);
                onViewAllClick?.();
              }}
              type="button"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
