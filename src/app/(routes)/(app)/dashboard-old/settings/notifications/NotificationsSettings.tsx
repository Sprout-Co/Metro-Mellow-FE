"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./NotificationsSettings.module.scss";

interface NotificationSetting {
  id: string;
  category: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export default function NotificationsSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "booking-confirmation",
      category: "bookings",
      title: "Booking Confirmation",
      description: "Receive notifications when your bookings are confirmed",
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "booking-reminder",
      category: "bookings",
      title: "Booking Reminder",
      description: "Get reminders 24 hours before your scheduled service",
      email: true,
      push: true,
      sms: true,
    },
    {
      id: "booking-changes",
      category: "bookings",
      title: "Booking Changes",
      description: "Receive updates when your bookings are modified",
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "provider-arrival",
      category: "service",
      title: "Service Provider Arrival",
      description: "Get notified when service provider is on their way",
      email: false,
      push: true,
      sms: true,
    },
    {
      id: "service-completion",
      category: "service",
      title: "Service Completion",
      description: "Receive confirmation when your service is completed",
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "review-request",
      category: "service",
      title: "Review Request",
      description: "Get prompted to review completed services",
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "payment-confirmation",
      category: "billing",
      title: "Payment Confirmation",
      description: "Receive receipts for your payments",
      email: true,
      push: false,
      sms: false,
    },
    {
      id: "subscription-renewal",
      category: "billing",
      title: "Subscription Renewal",
      description: "Get notified before your subscription renews",
      email: true,
      push: true,
      sms: false,
    },
    {
      id: "special-offers",
      category: "marketing",
      title: "Special Offers",
      description: "Receive discounts and special promotions",
      email: true,
      push: false,
      sms: false,
    },
    {
      id: "news-updates",
      category: "marketing",
      title: "News & Updates",
      description: "Stay updated with news and improvements",
      email: true,
      push: false,
      sms: false,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [saveIndicator, setSaveIndicator] = useState<boolean>(false);

  const categories = [
    { id: "all", name: "All Notifications" },
    { id: "bookings", name: "Bookings" },
    { id: "service", name: "Service Updates" },
    { id: "billing", name: "Billing & Payments" },
    { id: "marketing", name: "Marketing" },
  ];

  const filteredSettings = settings.filter(
    (setting) => activeCategory === "all" || setting.category === activeCategory
  );

  const toggleNotification = (
    settingId: string,
    channel: "email" | "push" | "sms"
  ) => {
    const updatedSettings = settings.map((setting) => {
      if (setting.id === settingId) {
        return {
          ...setting,
          [channel]: !setting[channel],
        };
      }
      return setting;
    });
    setSettings(updatedSettings);

    // Show save indicator
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 3000);
  };

  const toggleAllInCategory = (
    category: string,
    channel: "email" | "push" | "sms",
    value: boolean
  ) => {
    const updatedSettings = settings.map((setting) => {
      if (category === "all" || setting.category === category) {
        return {
          ...setting,
          [channel]: value,
        };
      }
      return setting;
    });
    setSettings(updatedSettings);

    // Show save indicator
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 3000);
  };

  // Check if all notifications in the current category are enabled for a channel
  const areAllEnabled = (channel: "email" | "push" | "sms") => {
    return filteredSettings.every((setting) => setting[channel]);
  };

  // Container and item variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className={styles.notificationsSettings}>
      <div className={styles.notificationsSettings__header}>
        <h1 className={styles.notificationsSettings__title}>
          Notification Settings
        </h1>
        <p className={styles.notificationsSettings__subtitle}>
          Customize how and when you receive notifications from Metromellow
        </p>
      </div>

      <div className={styles.notificationsSettings__content}>
        <div className={styles.notificationsSettings__categorySelector}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.notificationsSettings__categoryButton} ${
                activeCategory === category.id
                  ? styles.notificationsSettings__categoryButtonActive
                  : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.notificationsSettings__tableContainer}>
          <table className={styles.notificationsSettings__table}>
            <thead>
              <tr>
                <th
                  className={styles.notificationsSettings__notificationColumn}
                >
                  Notification
                </th>
                <th className={styles.notificationsSettings__channelColumn}>
                  <div className={styles.notificationsSettings__channelHeader}>
                    <span>Email</span>
                    <label
                      className={styles.notificationsSettings__toggleAllLabel}
                    >
                      <input
                        type="checkbox"
                        checked={areAllEnabled("email")}
                        onChange={(e) =>
                          toggleAllInCategory(
                            activeCategory,
                            "email",
                            e.target.checked
                          )
                        }
                      />
                      <span
                        className={styles.notificationsSettings__toggleAllText}
                      >
                        All
                      </span>
                    </label>
                  </div>
                </th>
                <th className={styles.notificationsSettings__channelColumn}>
                  <div className={styles.notificationsSettings__channelHeader}>
                    <span>Push</span>
                    <label
                      className={styles.notificationsSettings__toggleAllLabel}
                    >
                      <input
                        type="checkbox"
                        checked={areAllEnabled("push")}
                        onChange={(e) =>
                          toggleAllInCategory(
                            activeCategory,
                            "push",
                            e.target.checked
                          )
                        }
                      />
                      <span
                        className={styles.notificationsSettings__toggleAllText}
                      >
                        All
                      </span>
                    </label>
                  </div>
                </th>
                <th className={styles.notificationsSettings__channelColumn}>
                  <div className={styles.notificationsSettings__channelHeader}>
                    <span>SMS</span>
                    <label
                      className={styles.notificationsSettings__toggleAllLabel}
                    >
                      <input
                        type="checkbox"
                        checked={areAllEnabled("sms")}
                        onChange={(e) =>
                          toggleAllInCategory(
                            activeCategory,
                            "sms",
                            e.target.checked
                          )
                        }
                      />
                      <span
                        className={styles.notificationsSettings__toggleAllText}
                      >
                        All
                      </span>
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredSettings.map((setting) => (
                <motion.tr
                  key={setting.id}
                  variants={itemVariants}
                  className={styles.notificationsSettings__row}
                >
                  <td
                    className={styles.notificationsSettings__notificationInfo}
                  >
                    <h3
                      className={
                        styles.notificationsSettings__notificationTitle
                      }
                    >
                      {setting.title}
                    </h3>
                    <p
                      className={
                        styles.notificationsSettings__notificationDescription
                      }
                    >
                      {setting.description}
                    </p>
                  </td>
                  <td className={styles.notificationsSettings__channelToggle}>
                    <label className={styles.notificationsSettings__switch}>
                      <input
                        type="checkbox"
                        checked={setting.email}
                        onChange={() => toggleNotification(setting.id, "email")}
                      />
                      <span
                        className={styles.notificationsSettings__slider}
                      ></span>
                    </label>
                  </td>
                  <td className={styles.notificationsSettings__channelToggle}>
                    <label className={styles.notificationsSettings__switch}>
                      <input
                        type="checkbox"
                        checked={setting.push}
                        onChange={() => toggleNotification(setting.id, "push")}
                      />
                      <span
                        className={styles.notificationsSettings__slider}
                      ></span>
                    </label>
                  </td>
                  <td className={styles.notificationsSettings__channelToggle}>
                    <label className={styles.notificationsSettings__switch}>
                      <input
                        type="checkbox"
                        checked={setting.sms}
                        onChange={() => toggleNotification(setting.id, "sms")}
                      />
                      <span
                        className={styles.notificationsSettings__slider}
                      ></span>
                    </label>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        <div className={styles.notificationsSettings__footer}>
          <motion.div
            className={`${styles.notificationsSettings__saveIndicator} ${
              saveIndicator
                ? styles.notificationsSettings__saveIndicatorVisible
                : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={
              saveIndicator ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Settings saved successfully</span>
          </motion.div>

          <div className={styles.notificationsSettings__note}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.notificationsSettings__noteIcon}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>
              You can update your contact information in the{" "}
              <a href="/dashboard/settings/profile">Profile Settings</a>. SMS
              charges may apply according to your carrier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
