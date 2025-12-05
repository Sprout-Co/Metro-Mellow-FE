"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./SettingsOverview.module.scss";
import { Routes } from "@/constants/routes";
// Settings categories with their pages
const settingsCategories = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Update your personal information and address",
    icon: (
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    link: Routes.DASHBOARD_SETTINGS_PROFILE,
  },
  // TODO: Add notifications settings later
  // {
  //   id: "notifications",
  //   title: "Notifications",
  //   description: "Choose how and when you receive notifications",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
  //       <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  //     </svg>
  //   ),
  //   link: Routes.DASHBOARD_SETTINGS_NOTIFICATIONS,
  // },
  {
    id: "billing",
    title: "Billing & Payments",
    description: "Manage your payment methods and billing preferences",
    icon: (
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
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    ),
    link: Routes.DASHBOARD_SETTINGS_BILLING,
  },
  {
    id: "help",
    title: "Help & Support",
    description: "Find answers to common questions and contact support",
    icon: (
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
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    link: Routes.DASHBOARD_SETTINGS_HELP,
  },
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function SettingsOverview() {
  return (
    <div className={styles.settingsOverview}>
      <div className={styles.settingsOverview__header}>
        <h1 className={styles.settingsOverview__title}>Settings</h1>
        <p className={styles.settingsOverview__subtitle}>
          Manage your account settings and preferences
        </p>
      </div>

      <motion.div
        className={styles.settingsOverview__grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {settingsCategories.map((category) => (
          <motion.div
            key={category.id}
            className={styles.settingsOverview__card}
            variants={itemVariants}
          >
            <Link
              href={category.link}
              className={styles.settingsOverview__cardLink}
            >
              <div className={styles.settingsOverview__cardIcon}>
                {category.icon}
              </div>
              <div className={styles.settingsOverview__cardContent}>
                <h2 className={styles.settingsOverview__cardTitle}>
                  {category.title}
                </h2>
                <p className={styles.settingsOverview__cardDescription}>
                  {category.description}
                </p>
              </div>
              <div className={styles.settingsOverview__cardArrow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.settingsOverview__dangerZone}>
        <h2 className={styles.settingsOverview__dangerTitle}>Danger Zone</h2>
        <div className={styles.settingsOverview__dangerCard}>
          <div className={styles.settingsOverview__dangerInfo}>
            <h3 className={styles.settingsOverview__dangerActionTitle}>
              Delete Account
            </h3>
            <p className={styles.settingsOverview__dangerActionDescription}>
              Permanently delete your account and all of your data
            </p>
          </div>
          <button className={styles.settingsOverview__dangerButton}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
