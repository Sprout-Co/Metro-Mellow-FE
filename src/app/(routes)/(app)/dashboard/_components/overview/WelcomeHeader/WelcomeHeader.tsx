"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./WelcomeHeader.module.scss";

// Mock user data - in a real app, this would come from an API or context
const userData = {
  firstName: "Sarah",
  activeServices: 2,
  nextService: "Tomorrow at 10:00 AM",
  loyaltyPoints: 320,
};

const WelcomeHeader: React.FC = () => {
  // Get current time to determine greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      className={styles.welcomeHeader}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.welcomeHeader__content}>
        <div className={styles.welcomeHeader__greeting}>
          <motion.h1
            className={styles.welcomeHeader__title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {getGreeting()}, {userData.firstName}
          </motion.h1>
          <motion.p
            className={styles.welcomeHeader__subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Here's what's happening with your home services
          </motion.p>
        </div>

        <div className={styles.welcomeHeader__stats}>
          <motion.div
            className={styles.welcomeHeader__statItem}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className={styles.welcomeHeader__statValue}>
              {userData.activeServices}
            </span>
            <span className={styles.welcomeHeader__statLabel}>
              Active Services
            </span>
          </motion.div>

          <motion.div
            className={styles.welcomeHeader__statItem}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className={styles.welcomeHeader__statValue}>
              {userData.nextService}
            </span>
            <span className={styles.welcomeHeader__statLabel}>
              Next Service
            </span>
          </motion.div>

          <motion.div
            className={styles.welcomeHeader__statItem}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className={styles.welcomeHeader__statValue}>
              {userData.loyaltyPoints}
            </span>
            <span className={styles.welcomeHeader__statLabel}>
              Loyalty Points
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
