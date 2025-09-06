"use client";

import React, { useState, useMemo } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationPayload } from "@/lib/services/socket-notification";
import { NotificationType, NotificationPriority } from "@/graphql/api";
import styles from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
  maxHeight?: string;
  showFilters?: boolean;
  showMarkAllAsRead?: boolean;
  onNotificationClick?: (notification: NotificationPayload) => void;
  emptyMessage?: string;
  itemsPerPage?: number;
}

const PRIORITY_COLORS = {
  [NotificationPriority.Low]: "low",
  [NotificationPriority.Medium]: "medium",
  [NotificationPriority.High]: "high",
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

export const NotificationList: React.FC<NotificationListProps> = ({
  className = "",
  maxHeight = "400px",
  showFilters = true,
  showMarkAllAsRead = true,
  onNotificationClick,
  emptyMessage = "No notifications",
  itemsPerPage = 10,
}) => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadNotifications,
  } = useNotifications();

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter notifications based on current filters
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by read status
    if (filter === "unread") {
      filtered = getUnreadNotifications();
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((n) => n.type === typeFilter);
    }

    return filtered;
  }, [notifications, filter, typeFilter, getUnreadNotifications]);

  // Paginate notifications
  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNotifications, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const unreadCount = getUnreadNotifications().length;

  const handleNotificationClick = async (notification: NotificationPayload) => {
    // Mark as read if unread
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    onNotificationClick?.(notification);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDeleteNotification = async (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.stopPropagation();
    await deleteNotification(notificationId);
  };

  const formatRelativeTime = (dateString: string) => {
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

  // Get unique notification types for filter dropdown
  const notificationTypes = useMemo(() => {
    const types = new Set(notifications.map((n) => n.type));
    return Array.from(types);
  }, [notifications]);

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Header with filters and actions */}
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as "all" | "unread");
                setCurrentPage(1);
              }}
              className={styles.filterSelect}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
            </select>

            {notificationTypes.length > 1 && (
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as NotificationType | "all");
                  setCurrentPage(1);
                }}
                className={styles.filterSelect}
              >
                <option value="all">All Types</option>
                {notificationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/([A-Z])/g, " $1").trim()}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {showMarkAllAsRead && unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className={styles.markAllButton}
            type="button"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className={styles.listContainer} style={{ maxHeight }}>
        {paginatedNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔔</div>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className={styles.list}>
            {paginatedNotifications.map((notification) => {
              const priorityClass = PRIORITY_COLORS[notification.priority];
              const icon = NOTIFICATION_ICONS[notification.type] || "🔔";

              return (
                <div
                  key={notification.id}
                  className={`
                    ${styles.item} 
                    ${styles[priorityClass]}
                    ${!notification.isRead ? styles.unread : ""}
                  `.trim()}
                  onClick={() => handleNotificationClick(notification)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNotificationClick(notification);
                    }
                  }}
                >
                  <div className={styles.icon}>{icon}</div>

                  <div className={styles.content}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemTitle}>{notification.title}</h4>
                      <div className={styles.itemMeta}>
                        <span className={styles.time}>
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                        {!notification.isRead && (
                          <span className={styles.unreadDot} />
                        )}
                      </div>
                    </div>

                    <p className={styles.message}>{notification.message}</p>
                  </div>

                  <button
                    onClick={(e) =>
                      handleDeleteNotification(e, notification.id)
                    }
                    className={styles.deleteButton}
                    aria-label="Delete notification"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
            type="button"
          >
            Previous
          </button>

          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
            type="button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
