"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationList } from "@/components/ui/NotificationList/NotificationList";
import { NotificationPayload } from "@/lib/services/socket-notification";
import { X } from "lucide-react";
import styles from "./NotificationDrawer.module.scss";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: NotificationPayload) => void;
  position?: "left" | "right";
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNotificationClick,
  position = "right",
}) => {
  const {
    notifications,
    unreadCount,
    isConnected,
    connectionStatus,
    markAllAsRead,
    connectSocket,
  } = useNotifications();

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNotificationClick = (notification: NotificationPayload) => {
    onNotificationClick?.(notification);
    // Don't close drawer automatically - let user decide
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleReconnect = () => {
    connectSocket().catch(console.error);
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected to real-time notifications";
      case "connecting":
        return "Connecting to notifications...";
      case "disconnected":
        return "Notifications disconnected";
      default:
        return "Unknown connection status";
    }
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer */}
          <motion.div
            className={`${styles.drawer} ${styles[position]}`}
            initial={{ x: position === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: position === "right" ? "100%" : "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <h2 className={styles.title}>Notifications</h2>
                {unreadCount > 0 && (
                  <div className={styles.unreadBadge}>{unreadCount}</div>
                )}
              </div>

              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close notifications"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            {/* Connection Status Banner */}
            {!isConnected && (
              <div className={styles.connectionBanner}>
                <div className={styles.bannerContent}>
                  <div className={styles.bannerIcon}>
                    {connectionStatus === "connecting" ? "🟡" : "🔴"}
                  </div>
                  <div className={styles.bannerText}>
                    <p className={styles.bannerTitle}>
                      {connectionStatus === "connecting"
                        ? "Connecting..."
                        : "Connection Lost"}
                    </p>
                    <p className={styles.bannerDescription}>
                      {getConnectionStatusText()}
                    </p>
                  </div>
                  {connectionStatus === "disconnected" && (
                    <button
                      onClick={handleReconnect}
                      className={styles.reconnectButton}
                      type="button"
                    >
                      Reconnect
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            {unreadCount > 0 && (
              <div className={styles.actions}>
                <button
                  onClick={handleMarkAllAsRead}
                  className={styles.markAllButton}
                  type="button"
                >
                  Mark all as read ({unreadCount})
                </button>
              </div>
            )}

            {/* Notification List */}
            <div className={styles.content}>
              <NotificationList
                onNotificationClick={handleNotificationClick}
                showFilters={true}
                showMarkAllAsRead={false}
                emptyMessage="No notifications yet"
                className={styles.notificationList}
                maxHeight="none"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Render drawer in portal to body
  return typeof window !== "undefined"
    ? createPortal(drawerContent, document.body)
    : null;
};

export default NotificationDrawer;
