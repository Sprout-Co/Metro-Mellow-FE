// src/app/(routes)/(app)/dashboard/subscriptions/_components/QuickStats/QuickStats.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Clock, DollarSign, Package } from "lucide-react";
import styles from "./QuickStats.module.scss";

interface QuickStatsProps {
  stats: {
    active: number;
    totalMonthlyValue: number;
    totalServices: number;
    upcomingServices: number;
    total: number;
  };
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(price);
  };

  const statsData = [
    {
      icon: Zap,
      label: "Active",
      value: stats.active,
      total: stats.total,
      color: "success",
      showProgress: true,
    },
    {
      icon: DollarSign,
      label: "Monthly Value",
      value: formatPrice(stats.totalMonthlyValue),
      color: "primary",
      showProgress: false,
    },
    {
      icon: Package,
      label: "Total Services",
      value: stats.totalServices,
      color: "info",
      showProgress: false,
    },
    {
      icon: Clock,
      label: "Upcoming",
      value: stats.upcomingServices,
      color: "warning",
      showProgress: false,
    },
  ];

  return (
    <div className={styles.quickStats}>
      <div className={styles.quickStats__grid}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={styles.quickStats__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              <div className={styles.quickStats__cardHeader}>
                <div
                  className={`${styles.quickStats__icon} ${
                    styles[`quickStats__icon--${stat.color}`]
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span className={styles.quickStats__label}>{stat.label}</span>
              </div>

              <div className={styles.quickStats__cardContent}>
                <div className={styles.quickStats__value}>
                  {stat.value}
                  {stat.showProgress && (
                    <span className={styles.quickStats__total}>
                      /{stat.total}
                    </span>
                  )}
                </div>

                {stat.showProgress && (
                  <div className={styles.quickStats__progress}>
                    <div className={styles.quickStats__progressBar}>
                      <motion.div
                        className={`${styles.quickStats__progressFill} ${
                          styles[`quickStats__progressFill--${stat.color}`]
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(stat.value / stat.total) * 100}%`,
                        }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      />
                    </div>
                    <span className={styles.quickStats__progressText}>
                      {Math.round((stat.value / stat.total) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickStats;
