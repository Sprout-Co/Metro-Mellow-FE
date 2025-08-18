"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Eye,
  Globe,
  Palette,
  HelpCircle,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Check,
  X,
  Camera,
  Edit3,
} from "lucide-react";
import styles from "./SettingsMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import DashboardHeader from "../../_components/DashboardHeader/DashboardHeader";

type TabType =
  | "profile"
  | "account"
  | "notifications"
  | "security"
  | "billing"
  | "preferences";

const SettingsMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPromotions: false,
    emailReminders: true,
    smsBookings: true,
    smsReminders: true,
    pushBookings: true,
    pushReminders: true,
    pushPromotions: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [autoRenewal, setAutoRenewal] = useState(true);

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "account" as const, label: "Account", icon: Settings },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
    { id: "preferences" as const, label: "Preferences", icon: Palette },
  ];

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Profile Tab Content
  const ProfileContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.settings__section}
    >
      <div className={styles.settings__profileHeader}>
        <div className={styles.settings__avatarContainer}>
          <div className={styles.settings__avatar}>
            <span>SW</span>
          </div>
          <button className={styles.settings__avatarEdit}>
            <Camera size={18} />
          </button>
        </div>
        <div className={styles.settings__profileInfo}>
          <h3 className={styles.settings__profileName}>Sarah Williams</h3>
          <p className={styles.settings__profileEmail}>
            sarah.williams@example.com
          </p>
          <p className={styles.settings__profileJoined}>
            Member since August 2023
          </p>
        </div>
      </div>

      <div className={styles.settings__form}>
        <div className={styles.settings__formRow}>
          <div className={styles.settings__formGroup}>
            <label className={styles.settings__label}>First Name</label>
            <input
              type="text"
              className={styles.settings__input}
              defaultValue="Sarah"
            />
          </div>
          <div className={styles.settings__formGroup}>
            <label className={styles.settings__label}>Last Name</label>
            <input
              type="text"
              className={styles.settings__input}
              defaultValue="Williams"
            />
          </div>
        </div>

        <div className={styles.settings__formGroup}>
          <label className={styles.settings__label}>Email Address</label>
          <input
            type="email"
            className={styles.settings__input}
            defaultValue="sarah.williams@example.com"
          />
        </div>

        <div className={styles.settings__formGroup}>
          <label className={styles.settings__label}>Phone Number</label>
          <input
            type="tel"
            className={styles.settings__input}
            defaultValue="+234 801 234 5678"
          />
        </div>

        <div className={styles.settings__formGroup}>
          <label className={styles.settings__label}>Date of Birth</label>
          <input
            type="date"
            className={styles.settings__input}
            defaultValue="1990-05-15"
          />
        </div>

        <div className={styles.settings__formActions}>
          <FnButton variant="primary" size="md">
            Save Changes
          </FnButton>
          <FnButton variant="ghost" size="md">
            Cancel
          </FnButton>
        </div>
      </div>
    </motion.div>
  );

  // Account Tab Content
  const AccountContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.settings__section}
    >
      <div className={styles.settings__subsection}>
        <h3 className={styles.settings__subsectionTitle}>
          Account Information
        </h3>

        <div className={styles.settings__infoCards}>
          <div className={styles.settings__infoCard}>
            <div className={styles.settings__infoCardIcon}>
              <Mail />
            </div>
            <div className={styles.settings__infoCardContent}>
              <span className={styles.settings__infoCardLabel}>Email</span>
              <span className={styles.settings__infoCardValue}>
                sarah.williams@example.com
              </span>
            </div>
            <button className={styles.settings__infoCardAction}>
              <Edit3 size={16} />
            </button>
          </div>

          <div className={styles.settings__infoCard}>
            <div className={styles.settings__infoCardIcon}>
              <Phone />
            </div>
            <div className={styles.settings__infoCardContent}>
              <span className={styles.settings__infoCardLabel}>Phone</span>
              <span className={styles.settings__infoCardValue}>
                +234 801 234 5678
              </span>
            </div>
            <button className={styles.settings__infoCardAction}>
              <Edit3 size={16} />
            </button>
          </div>

          <div className={styles.settings__infoCard}>
            <div className={styles.settings__infoCardIcon}>
              <MapPin />
            </div>
            <div className={styles.settings__infoCardContent}>
              <span className={styles.settings__infoCardLabel}>
                Default Address
              </span>
              <span className={styles.settings__infoCardValue}>
                24 Emmanuel Osakwe Street, Lagos
              </span>
            </div>
            <button className={styles.settings__infoCardAction}>
              <Edit3 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.settings__subsection}>
        <h3 className={styles.settings__subsectionTitle}>Account Actions</h3>

        <div className={styles.settings__dangerZone}>
          <div className={styles.settings__dangerItem}>
            <div>
              <h4 className={styles.settings__dangerTitle}>
                Deactivate Account
              </h4>
              <p className={styles.settings__dangerDescription}>
                Temporarily disable your account. You can reactivate it anytime.
              </p>
            </div>
            <FnButton variant="secondary" size="sm">
              Deactivate
            </FnButton>
          </div>

          <div className={styles.settings__dangerItem}>
            <div>
              <h4 className={styles.settings__dangerTitle}>Delete Account</h4>
              <p className={styles.settings__dangerDescription}>
                Permanently delete your account and all associated data.
              </p>
            </div>
            <button className={styles.settings__dangerButton}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Notifications Tab Content
  const NotificationsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.settings__section}
    >
      <div className={styles.settings__notificationGroups}>
        <div className={styles.settings__notificationGroup}>
          <h3 className={styles.settings__notificationGroupTitle}>
            <Mail size={18} />
            Email Notifications
          </h3>

          <div className={styles.settings__toggleList}>
            <div className={styles.settings__toggleItem}>
              <div>
                <h4 className={styles.settings__toggleTitle}>
                  Booking Confirmations
                </h4>
                <p className={styles.settings__toggleDescription}>
                  Receive email confirmations for new bookings
                </p>
              </div>
              <button
                className={`${styles.settings__toggle} ${
                  notifications.emailBookings
                    ? styles["settings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleNotificationToggle("emailBookings")}
              >
                <span className={styles.settings__toggleSlider} />
              </button>
            </div>

            <div className={styles.settings__toggleItem}>
              <div>
                <h4 className={styles.settings__toggleTitle}>
                  Service Reminders
                </h4>
                <p className={styles.settings__toggleDescription}>
                  Get reminded about upcoming services
                </p>
              </div>
              <button
                className={`${styles.settings__toggle} ${
                  notifications.emailReminders
                    ? styles["settings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleNotificationToggle("emailReminders")}
              >
                <span className={styles.settings__toggleSlider} />
              </button>
            </div>

            <div className={styles.settings__toggleItem}>
              <div>
                <h4 className={styles.settings__toggleTitle}>
                  Promotions & Offers
                </h4>
                <p className={styles.settings__toggleDescription}>
                  Receive special offers and discounts
                </p>
              </div>
              <button
                className={`${styles.settings__toggle} ${
                  notifications.emailPromotions
                    ? styles["settings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleNotificationToggle("emailPromotions")}
              >
                <span className={styles.settings__toggleSlider} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.settings__notificationGroup}>
          <h3 className={styles.settings__notificationGroupTitle}>
            <Smartphone size={18} />
            SMS Notifications
          </h3>

          <div className={styles.settings__toggleList}>
            <div className={styles.settings__toggleItem}>
              <div>
                <h4 className={styles.settings__toggleTitle}>
                  Booking Updates
                </h4>
                <p className={styles.settings__toggleDescription}>
                  SMS updates for booking changes
                </p>
              </div>
              <button
                className={`${styles.settings__toggle} ${
                  notifications.smsBookings
                    ? styles["settings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleNotificationToggle("smsBookings")}
              >
                <span className={styles.settings__toggleSlider} />
              </button>
            </div>

            <div className={styles.settings__toggleItem}>
              <div>
                <h4 className={styles.settings__toggleTitle}>
                  Service Reminders
                </h4>
                <p className={styles.settings__toggleDescription}>
                  SMS reminders for upcoming services
                </p>
              </div>
              <button
                className={`${styles.settings__toggle} ${
                  notifications.smsReminders
                    ? styles["settings__toggle--active"]
                    : ""
                }`}
                onClick={() => handleNotificationToggle("smsReminders")}
              >
                <span className={styles.settings__toggleSlider} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Security Tab Content
  const SecurityContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.settings__section}
    >
      <div className={styles.settings__securityCard}>
        <div className={styles.settings__securityCardHeader}>
          <Lock size={20} />
          <h3 className={styles.settings__securityCardTitle}>Password</h3>
        </div>
        <p className={styles.settings__securityCardDescription}>
          Last changed 3 months ago
        </p>
        <FnButton variant="primary" size="sm">
          Change Password
        </FnButton>
      </div>

      <div className={styles.settings__securityCard}>
        <div className={styles.settings__securityCardHeader}>
          <Shield size={20} />
          <h3 className={styles.settings__securityCardTitle}>
            Two-Factor Authentication
          </h3>
        </div>
        <p className={styles.settings__securityCardDescription}>
          Add an extra layer of security to your account
        </p>
        <FnButton variant="primary" size="sm">
          Enable 2FA
        </FnButton>
      </div>

      <div className={styles.settings__subsection}>
        <h3 className={styles.settings__subsectionTitle}>Active Sessions</h3>
        <div className={styles.settings__sessionsList}>
          <div className={styles.settings__sessionItem}>
            <div className={styles.settings__sessionIcon}>
              <Monitor />
            </div>
            <div className={styles.settings__sessionInfo}>
              <h4 className={styles.settings__sessionDevice}>
                Chrome on Windows
              </h4>
              <p className={styles.settings__sessionLocation}>
                Lagos, Nigeria • Current session
              </p>
            </div>
            <span className={styles.settings__sessionBadge}>Active</span>
          </div>

          <div className={styles.settings__sessionItem}>
            <div className={styles.settings__sessionIcon}>
              <Smartphone />
            </div>
            <div className={styles.settings__sessionInfo}>
              <h4 className={styles.settings__sessionDevice}>
                Metro Mellow iOS App
              </h4>
              <p className={styles.settings__sessionLocation}>
                Lagos, Nigeria • 2 hours ago
              </p>
            </div>
            <button className={styles.settings__sessionRevoke}>Revoke</button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Billing Tab Content
  const BillingContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.settings__section}
    >
      <div className={styles.settings__paymentMethods}>
        <h3 className={styles.settings__subsectionTitle}>Payment Methods</h3>

        <div className={styles.settings__paymentCards}>
          <div className={styles.settings__paymentCard}>
            <div className={styles.settings__paymentCardIcon}>
              <CreditCard />
            </div>
            <div className={styles.settings__paymentCardInfo}>
              <h4 className={styles.settings__paymentCardName}>
                •••• •••• •••• 4242
              </h4>
              <p className={styles.settings__paymentCardExpiry}>
                Expires 12/25
              </p>
            </div>
            <span className={styles.settings__paymentCardBadge}>Default</span>
          </div>

          <button className={styles.settings__addPaymentCard}>
            <span>+</span>
            Add Payment Method
          </button>
        </div>
      </div>

      <div className={styles.settings__subsection}>
        <h3 className={styles.settings__subsectionTitle}>
          Billing Preferences
        </h3>

        <div className={styles.settings__toggleList}>
          <div className={styles.settings__toggleItem}>
            <div>
              <h4 className={styles.settings__toggleTitle}>Auto-Renewal</h4>
              <p className={styles.settings__toggleDescription}>
                Automatically renew subscriptions when they expire
              </p>
            </div>
            <button
              className={`${styles.settings__toggle} ${
                autoRenewal ? styles["settings__toggle--active"] : ""
              }`}
              onClick={() => setAutoRenewal(!autoRenewal)}
            >
              <span className={styles.settings__toggleSlider} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Preferences Tab Content
  const PreferencesContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.settings__section}
    >
      <div className={styles.settings__subsection}>
        <h3 className={styles.settings__subsectionTitle}>Appearance</h3>

        <div className={styles.settings__themeSelector}>
          <button
            className={`${styles.settings__themeOption} ${
              !darkMode ? styles["settings__themeOption--active"] : ""
            }`}
            onClick={() => setDarkMode(false)}
          >
            <Sun size={24} />
            <span>Light</span>
          </button>
          <button
            className={`${styles.settings__themeOption} ${
              darkMode ? styles["settings__themeOption--active"] : ""
            }`}
            onClick={() => setDarkMode(true)}
          >
            <Moon size={24} />
            <span>Dark</span>
          </button>
        </div>
      </div>

      <div className={styles.settings__subsection}>
        <h3 className={styles.settings__subsectionTitle}>Language & Region</h3>

        <div className={styles.settings__form}>
          <div className={styles.settings__formGroup}>
            <label className={styles.settings__label}>Language</label>
            <select className={styles.settings__select}>
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <div className={styles.settings__formGroup}>
            <label className={styles.settings__label}>Time Zone</label>
            <select className={styles.settings__select}>
              <option>West Africa Time (GMT+1)</option>
              <option>Central European Time (GMT+1)</option>
              <option>Eastern Standard Time (GMT-5)</option>
            </select>
          </div>

          <div className={styles.settings__formGroup}>
            <label className={styles.settings__label}>Currency</label>
            <select className={styles.settings__select}>
              <option>Nigerian Naira (₦)</option>
              <option>US Dollar ($)</option>
              <option>Euro (€)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const contentMap = {
    profile: <ProfileContent />,
    account: <AccountContent />,
    notifications: <NotificationsContent />,
    security: <SecurityContent />,
    billing: <BillingContent />,
    preferences: <PreferencesContent />,
  };

  return (
    <div className={styles.settings}>
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account settings and preferences"
      />

      <div className={styles.settings__container}>
        {/* Sidebar Navigation */}
        <div className={styles.settings__sidebar}>
          <nav className={styles.settings__nav}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`${styles.settings__navItem} ${
                    activeTab === tab.id
                      ? styles["settings__navItem--active"]
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  <ChevronRight
                    size={16}
                    className={styles.settings__navArrow}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className={styles.settings__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {contentMap[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Add Settings import
import { Settings } from "lucide-react";

export default SettingsMain;
