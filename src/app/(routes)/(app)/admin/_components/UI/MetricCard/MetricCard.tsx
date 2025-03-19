// src/components/ui/MetricCard.tsx
import React from "react";
import { motion } from "framer-motion";
import Card from "../Card/Card";
import styles from "./MetricCard.module.scss";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  progress?: {
    current: number;
    total: number;
    label: string;
  };
  color?: "primary" | "secondary" | "success" | "warning" | "info" | "error";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  progress,
  color = "primary",
}) => {
  const progressPercentage = progress
    ? (progress.current / progress.total) * 100
    : 0;

  return (
    <Card
      className={`${styles.metric_card} ${styles[`metric_card--${color}`]}`}
    >
      <div className={styles.metric_card__icon}>
        <div className={styles.metric_card__icon_container}>{icon}</div>
      </div>

      <div className={styles.metric_card__content}>
        <h3 className={styles.metric_card__title}>{title}</h3>
        <p className={styles.metric_card__value}>{value}</p>

        {progress && (
          <div className={styles.metric_card__progress}>
            <div className={styles.metric_card__progress_bar}>
              <motion.div
                className={styles.metric_card__progress_fill}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className={styles.metric_card__progress_label}>
              <span>{progress.label}</span>
              <span>
                {progress.current} / {progress.total}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;
