"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Package,
  Star,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";
import styles from "./AccountStats.module.scss";

interface AccountStatsProps {
  userData: {
    joinDate: string;
    totalBookings: number;
    activeSubscriptions: number;
    loyaltyPoints: number;
  };
}

const AccountStats: React.FC<AccountStatsProps> = ({ userData }) => {
  const stats = [
    {
      icon: <Calendar />,
      label: "Member Since",
      value: userData.joinDate,
      color: "primary",
    },
    {
      icon: <Package />,
      label: "Total Bookings",
      value: userData.totalBookings.toString(),
      color: "secondary",
    },
    {
      icon: <TrendingUp />,
      label: "Active Subscriptions",
      value: userData.activeSubscriptions.toString(),
      color: "success",
    },
    {
      icon: <Award />,
      label: "Loyalty Points",
      value: userData.loyaltyPoints.toString(),
      color: "accent",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      primary: styles["accountStats__card--primary"],
      secondary: styles["accountStats__card--secondary"],
      success: styles["accountStats__card--success"],
      accent: styles["accountStats__card--accent"],
    };
    return colorMap[color] || "";
  };

  return (
    <div className={styles.accountStats}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={`${styles.accountStats__card} ${getColorClass(
            stat.color
          )}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className={styles.accountStats__icon}>{stat.icon}</div>
          <div className={styles.accountStats__content}>
            <span className={styles.accountStats__label}>{stat.label}</span>
            <span className={styles.accountStats__value}>{stat.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AccountStats;
