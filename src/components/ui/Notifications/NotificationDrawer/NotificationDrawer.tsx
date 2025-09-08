"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/components/providers/NotificationProvider";
import { NotificationList } from "@/components/ui/Notifications/NotificationList/NotificationList";
import { NotificationPayload } from "@/lib/services/socket-notification";
import {
  X,
  CheckCheck,
  Settings,
  RefreshCw,
  WifiOff,
  Wifi,
} from "lucide-react";
import styles from "./NotificationDrawer.module.scss";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: NotificationPayload) => void;
  onSettingsClick?: () => void;
  position?: "left" | "right";
  showSettings?: boolean;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNotificationClick,
  onSettingsClick,
  position = "right",
  showSettings = true,
}) => {
  const {
    notifications,
    unreadCount,
    isConnected,
    connectionStatus,
    markAllAsRead,
    connectSocket,
    isLoading,
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
        return "Connecting to notification service...";
      case "disconnected":
        return "Real-time notification service is disconnected";
      default:
        return "Unknown connection status";
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi size={18} />;
      case "connecting":
        return <RefreshCw size={18} className="animate-spin" />;
      case "disconnected":
      default:
        return <WifiOff size={18} />;
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
              damping: 30,
              stiffness: 300,
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
                <X size={18} />
              </button>
            </div>

            {/* Connection Status Banner */}
            {connectionStatus !== "connected" && (
              <div
                className={styles.connectionBanner}
                data-status={connectionStatus}
              >
                <div className={styles.bannerContent}>
                  <div
                    className={styles.bannerIconContainer}
                    data-status={connectionStatus}
                  >
                    {getConnectionIcon()}
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
                      <RefreshCw size={14} />
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
                  disabled={unreadCount === 0}
                >
                  <CheckCheck size={18} />
                  Mark all as read ({unreadCount})
                </button>
              </div>
            )}

            {/* Notification List */}
            <div className={styles.content}>
              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.loadingSpinner}></div>
                  <p className={styles.loadingText}>Loading notifications...</p>
                </div>
              ) : (
                <NotificationList
                  onNotificationClick={handleNotificationClick}
                  showFilters={true}
                  showMarkAllAsRead={false}
                  emptyMessage="No notifications yet"
                  className={styles.notificationList}
                  maxHeight="none"
                />
              )}
            </div>

            {/* Footer with settings */}
            {showSettings && onSettingsClick && (
              <div className={styles.footer}>
                <button
                  onClick={onSettingsClick}
                  className={styles.settingsButton}
                  type="button"
                >
                  <Settings size={16} />
                  Notification settings
                </button>
              </div>
            )}
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
