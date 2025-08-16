"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle,
  Check,
} from "lucide-react";
import styles from "./NotificationSettings.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  email: boolean;
  sms: boolean;
  push: boolean;
}

const NotificationSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "bookings",
      title: "Booking Updates",
      description: "Confirmations, reminders, and changes to your bookings",
      icon: <Calendar size={20} />,
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "subscriptions",
      title: "Subscription Notifications",
      description: "Renewal reminders, service updates, and billing notices",
      icon: <Package size={20} />,
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "promotions",
      title: "Promotions & Offers",
      description: "Special deals, discounts, and exclusive offers",
      icon: <TrendingUp size={20} />,
      email: true,
      sms: false,
      push: false,
    },
    {
      id: "payments",
      title: "Payment Notifications",
      description: "Payment confirmations, failed payments, and receipts",
      icon: <DollarSign size={20} />,
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "feedback",
      title: "Service Feedback",
      description: "Requests to rate and review completed services",
      icon: <MessageSquare size={20} />,
      email: true,
      sms: false,
      push: false,
    },
    {
      id: "system",
      title: "System Updates",
      description: "Important system updates and maintenance notices",
      icon: <AlertCircle size={20} />,
      email: true,
      sms: false,
      push: true,
    },
  ]);

  const handleToggle = (
    settingId: string,
    channel: "email" | "sms" | "push"
  ) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, [channel]: !setting[channel] }
          : setting
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleToggleAll = (channel: "email" | "sms" | "push") => {
    const allEnabled = settings.every((s) => s[channel]);
    setSettings((prev) =>
      prev.map((setting) => ({ ...setting, [channel]: !allEnabled }))
    );
  };

  return (
    <div className={styles.notificationSettings}>
      {/* Header */}
      <div className={styles.notificationSettings__header}>
        <div>
          <h2 className={styles.notificationSettings__title}>
            Notification Preferences
          </h2>
          <p className={styles.notificationSettings__subtitle}>
            Choose how you want to receive notifications from Metro Mellow
          </p>
        </div>
        <FnButton
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className={styles.notificationSettings__spinner} />
            </motion.div>
          ) : (
            <>
              <Check size={16} />
              Save Changes
            </>
          )}
        </FnButton>
      </div>

      {/* Channel Headers */}
      <div className={styles.notificationSettings__channels}>
        <div className={styles.notificationSettings__channelHeaders}>
          <div className={styles.notificationSettings__channelLabel}>
            Notification Type
          </div>
          <div className={styles.notificationSettings__channelOptions}>
            <button
              className={styles.notificationSettings__channelToggle}
              onClick={() => handleToggleAll("email")}
            >
              <Mail size={16} />
              Email
            </button>
            <button
              className={styles.notificationSettings__channelToggle}
              onClick={() => handleToggleAll("sms")}
            >
              <MessageSquare size={16} />
              SMS
            </button>
            <button
              className={styles.notificationSettings__channelToggle}
              onClick={() => handleToggleAll("push")}
            >
              <Bell size={16} />
              Push
            </button>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className={styles.notificationSettings__list}>
        {settings.map((setting, index) => (
          <motion.div
            key={setting.id}
            className={styles.notificationSettings__item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={styles.notificationSettings__itemInfo}>
              <div className={styles.notificationSettings__itemIcon}>
                {setting.icon}
              </div>
              <div className={styles.notificationSettings__itemContent}>
                <h3 className={styles.notificationSettings__itemTitle}>
                  {setting.title}
                </h3>
                <p className={styles.notificationSettings__itemDescription}>
                  {setting.description}
                </p>
              </div>
            </div>

            <div className={styles.notificationSettings__itemToggles}>
              <motion.button
                className={`${styles.notificationSettings__toggle} ${
                  setting.email
                    ? styles["notificationSettings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleToggle(setting.id, "email")}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={14} />
              </motion.button>

              <motion.button
                className={`${styles.notificationSettings__toggle} ${
                  setting.sms
                    ? styles["notificationSettings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleToggle(setting.id, "sms")}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={14} />
              </motion.button>

              <motion.button
                className={`${styles.notificationSettings__toggle} ${
                  setting.push
                    ? styles["notificationSettings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleToggle(setting.id, "push")}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={14} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Note */}
      <div className={styles.notificationSettings__info}>
        <AlertCircle size={16} />
        <p>
          You can unsubscribe from all marketing communications at any time.
          Service-related notifications cannot be disabled as they contain
          important information about your bookings.
        </p>
      </div>
    </div>
  );
};

export default NotificationSettings;
