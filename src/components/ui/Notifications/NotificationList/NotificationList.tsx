"use client";

import React, { useState, useMemo } from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationPayload } from "@/lib/services/socket-notification";
import { NotificationType, NotificationPriority } from "@/graphql/api";
import {
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MessageSquare,
} from "lucide-react";
import styles from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
  maxHeight?: string;
  showFilters?: boolean;
  showMarkAllAsRead?: boolean;
  showPagination?: boolean;
  compact?: boolean;
  onNotificationClick?: (notification: NotificationPayload) => void;
  emptyMessage?: string;
  itemsPerPage?: number;
  maxItems?: number;
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
  showPagination = true,
  compact = false,
  onNotificationClick,
  emptyMessage = "No notifications",
  itemsPerPage = 10,
  maxItems,
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

    // Limit items if maxItems is specified
    if (maxItems && filtered.length > maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [notifications, filter, typeFilter, getUnreadNotifications, maxItems]);

  // Paginate notifications
  const paginatedNotifications = useMemo(() => {
    if (!showPagination) return filteredNotifications;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNotifications, currentPage, itemsPerPage, showPagination]);

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
      {(showFilters || showMarkAllAsRead) && (
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>Notifications</h3>
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount}</span>
            )}
          </div>

          {showFilters && (
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Status:</span>
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
              </div>

              {notificationTypes.length > 1 && (
                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>Type:</span>
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
                </div>
              )}
            </div>
          )}

          {showMarkAllAsRead && unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className={styles.markAllButton}
              type="button"
              disabled={unreadCount === 0}
              aria-label="Mark all notifications as read"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>
      )}

      {/* Notification list */}
      <div className={styles.listContainer} style={{ maxHeight }}>
        {paginatedNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔔</div>
            <p className={styles.emptyText}>{emptyMessage}</p>
          </div>
        ) : (
          <div className={styles.list}>
            {paginatedNotifications.map((notification) => {
              const priorityClass =
                PRIORITY_COLORS[
                  notification.priority as NotificationPriority
                ] || "low";
              const icon =
                NOTIFICATION_ICONS[notification.type as NotificationType] ||
                "🔔";

              return (
                <div
                  key={notification.id}
                  className={`
                    ${styles.item} 
                    ${styles[priorityClass]}
                    ${!notification.isRead ? styles.unread : ""}
                    ${compact ? styles.compact : ""}
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
                  data-testid={`notification-item-${notification.id}`}
                  aria-label={notification.title}
                >
                  <div
                    className={`${styles.iconWrapper} ${styles[priorityClass]}`}
                  >
                    <span className={styles.icon}>{icon}</span>
                  </div>

                  <div className={styles.content}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemTitle}>{notification.title}</h4>
                      <div className={styles.itemMeta}>
                        <span className={styles.time}>
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                        {!notification.isRead && (
                          <span
                            className={styles.unreadDot}
                            aria-label="Unread notification"
                          />
                        )}
                      </div>
                    </div>

                    <p className={styles.message}>{notification.message}</p>

                    {!compact && (
                      <div className={styles.actionsContainer}>
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationClick(notification);
                          }}
                          aria-label="View notification details"
                          type="button"
                        >
                          <MessageSquare size={14} />
                          View
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) =>
                      handleDeleteNotification(e, notification.id)
                    }
                    className={styles.deleteButton}
                    aria-label="Delete notification"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <div className={styles.paginationControls}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={styles.paginationButton}
              type="button"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
              type="button"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
