"use client";

import React from "react";
import { useNotifications } from "@/components/providers/NotificationProvider";
import styles from "./NotificationBadge.module.scss";

interface NotificationBadgeProps {
  className?: string;
  showCount?: boolean;
  maxCount?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger";
  /**
   * Show badge even when unread count is zero
   */
  alwaysShow?: boolean;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  className = "",
  showCount = true,
  maxCount = 99,
  size = "md",
  variant = "primary",
  alwaysShow = false,
}) => {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0 && !alwaysShow) {
    return null;
  }

  const displayCount =
    unreadCount > maxCount ? `${maxCount}+` : unreadCount.toString();

  const isEmpty = unreadCount === 0 || !showCount;

  return (
    <span
      className={`
        ${styles.badge} 
        ${styles[size]} 
        ${styles[variant]} 
        ${isEmpty ? styles.empty : ""}
        ${className}
      `.trim()}
      aria-label={`${unreadCount} unread notifications`}
      role="status"
      data-count={unreadCount}
    >
      {showCount && unreadCount > 0 ? displayCount : ""}
    </span>
  );
};

export default NotificationBadge;
