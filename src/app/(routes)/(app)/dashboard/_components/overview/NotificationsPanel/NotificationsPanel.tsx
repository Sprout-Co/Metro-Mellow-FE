// src/app/(routes)/(app)/dashboard/_components/overview/NotificationsPanel/NotificationsPanel.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NotificationsPanel.module.scss";

// Mock notifications data
const notifications = [
  {
    id: "1",
    type: "reminder",
    title: "Cleaning Service Tomorrow",
    message:
      "Your home cleaning service is scheduled for tomorrow at 10:00 AM.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "update",
    title: "New Provider Assigned",
    message: "Miguel R. has been assigned to your upcoming cleaning service.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "3",
    type: "promotion",
    title: "Special Discount for August",
    message:
      "Get 15% off on all cooking services this month. Use code AUGUSTCOOK.",
    time: "2 days ago",
    read: true,
  },
];

const NotificationsPanel: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        );
      case "update":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "promotion":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "reminder":
        return styles["notificationsPanel__icon--reminder"];
      case "update":
        return styles["notificationsPanel__icon--update"];
      case "promotion":
        return styles["notificationsPanel__icon--promotion"];
      default:
        return "";
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.notificationsPanel}>
      <div className={styles.notificationsPanel__header}>
        <h2 className={styles.notificationsPanel__title}>Notifications</h2>
        <span className={styles.notificationsPanel__count}>
          {notifications.filter((n) => !n.read).length} new
        </span>
      </div>

      <div className={styles.notificationsPanel__list}>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className={`${styles.notificationsPanel__item} ${!notification.read ? styles["notificationsPanel__item--unread"] : ""}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
            onClick={() => toggleExpand(notification.id)}
          >
            <div className={styles.notificationsPanel__itemHeader}>
              <div
                className={`${styles.notificationsPanel__icon} ${getNotificationColor(notification.type)}`}
              >
                {getNotificationIcon(notification.type)}
              </div>

              <div className={styles.notificationsPanel__content}>
                <h3 className={styles.notificationsPanel__itemTitle}>
                  {notification.title}
                </h3>
                <AnimatePresence>
                  {expandedId === notification.id && (
                    <motion.p
                      className={styles.notificationsPanel__message}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {notification.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <span className={styles.notificationsPanel__time}>
                  {notification.time}
                </span>
              </div>

              {!notification.read && (
                <span className={styles.notificationsPanel__unreadDot}></span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.notificationsPanel__footer}>
        <motion.button
          className={styles.notificationsPanel__viewAllBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Notifications
        </motion.button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
