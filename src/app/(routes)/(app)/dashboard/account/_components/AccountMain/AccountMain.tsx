"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  CreditCard,
  Settings,
  Camera,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
  Calendar,
  Lock,
  Smartphone,
  Globe,
  Save,
  AlertCircle,
} from "lucide-react";
import styles from "./AccountMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import ProfileSection from "../ProfileSection/ProfileSection";
import SecuritySection from "../SecuritySection/SecuritySection";
import NotificationSettings from "../NotificationSettings/NotificationSettings";
import AccountStats from "../AccountStats/AccountStats";

export type TabType = "profile" | "security" | "notifications";

const AccountMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "security" as TabType, label: "Security", icon: Shield },
    { id: "notifications" as TabType, label: "Notifications", icon: Bell },
  ];

  // Mock user data
  const userData = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+234 801 234 5678",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    address: "24 Emmanuel Osakwe Street, Lagos",
    profileImage: null,
    joinDate: "January 2024",
    totalBookings: 48,
    activeSubscriptions: 3,
    loyaltyPoints: 320,
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  return (
    <div className={styles.accountMain}>
      {/* Header Section */}
      <div className={styles.accountMain__header}>
        <div className={styles.accountMain__headerContent}>
          <h1 className={styles.accountMain__title}>My Account</h1>
          <p className={styles.accountMain__subtitle}>
            Manage your profile, security settings, and preferences
          </p>
        </div>
      </div>

      {/* Account Stats */}
      <AccountStats userData={userData} />

      {/* Main Content */}
      <div className={styles.accountMain__container}>
        {/* Sidebar Navigation */}
        <div className={styles.accountMain__sidebar}>
          <nav className={styles.accountMain__nav}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  className={`${styles.accountMain__navItem} ${
                    activeTab === tab.id
                      ? styles["accountMain__navItem--active"]
                      : ""
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className={styles.accountMain__navIndicator}
                      layoutId="indicator"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className={styles.accountMain__quickActions}>
            <h3 className={styles.accountMain__quickActionsTitle}>
              Quick Actions
            </h3>
            <motion.button
              className={styles.accountMain__quickAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreditCard size={18} />
              <span>Payment Methods</span>
            </motion.button>
            <motion.button
              className={styles.accountMain__quickAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin size={18} />
              <span>Address Book</span>
            </motion.button>
            <motion.button
              className={styles.accountMain__quickAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings size={18} />
              <span>Preferences</span>
            </motion.button>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.accountMain__content}>
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileSection
                  userData={userData}
                  isEditing={isEditing}
                  onEditToggle={() => setIsEditing(!isEditing)}
                />
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SecuritySection />
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <NotificationSettings />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AccountMain;
