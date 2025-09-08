"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationBadge } from "../NotificationBadge/NotificationBadge";
import { NotificationList } from "../NotificationList/NotificationList";
import { NotificationPayload } from "@/lib/services/socket-notification";
import { Bell } from "lucide-react";
import styles from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
  buttonClassName?: string;
  onNotificationClick?: (notification: NotificationPayload) => void;
  onViewAllClick?: () => void;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  className = "",
  buttonClassName = "",
  onNotificationClick,
  onViewAllClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { notifications, unreadCount, isLoading, error, markAllAsRead } =
    useNotifications();

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

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Bell Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`${styles.button} ${buttonClassName}`}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <div className={styles.iconContainer}>
          <Bell
            className={`${styles.icon} ${isOpen ? styles.active : ""}`}
            aria-hidden="true"
          />

          {/* Notification Badge */}
          <NotificationBadge
            className={styles.badge}
            size="sm"
            variant="danger"
            showCount={unreadCount > 9}
          />
        </div>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
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
                Mark all read
              </button>
            )}
          </div>

          {/* Content */}
          {error ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⚠️</div>
              <p className={styles.emptyText}>{error}</p>
            </div>
          ) : isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Loading notifications...</p>
            </div>
          ) : (
            <div className={styles.list}>
              <NotificationList
                onNotificationClick={handleNotificationClick}
                showFilters={false}
                showMarkAllAsRead={false}
                emptyMessage="No notifications yet"
                showPagination={false}
                compact={true}
                maxItems={5}
              />
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && onViewAllClick && (
            <div className={styles.footer}>
              <button
                onClick={() => {
                  onViewAllClick();
                  setIsOpen(false);
                }}
                className={styles.viewAllButton}
                type="button"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
