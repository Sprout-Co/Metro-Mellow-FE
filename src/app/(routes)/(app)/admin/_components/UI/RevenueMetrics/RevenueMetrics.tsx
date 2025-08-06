import React from "react";
import { motion } from "framer-motion";
import styles from "./RevenueMetrics.module.scss";

interface RevenueMetricsProps {
  revenue: number;
  percentageIncrease: number;
}

const RevenueMetrics: React.FC<RevenueMetricsProps> = ({
  revenue,
  percentageIncrease,
}) => {
  return (
    <div className={styles.revenue_metrics}>
      <div className={styles.revenue_metrics__header}>
        <span className={styles.revenue_metrics__label}>MONTHLY REVENUE</span>
        <div className={styles.revenue_metrics__badge}>
          <span>+{percentageIncrease}%</span>
        </div>
      </div>

      <h2 className={styles.revenue_metrics__value}>
        ${revenue.toLocaleString()}
      </h2>

      <div className={styles.revenue_metrics__chart}>
        <svg width="100%" height="60" viewBox="0 0 240 60" fill="none">
          <motion.path
            d="M0,50 C20,30 40,40 60,30 C80,20 100,10 120,20 C140,30 160,40 180,20 C200,0 220,10 240,0"
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.6"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
};

export default RevenueMetrics;
