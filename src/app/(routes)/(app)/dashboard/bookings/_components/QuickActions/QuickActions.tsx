// src/app/(routes)/(app)/dashboard/bookings/_components/QuickActions/QuickActions.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  RefreshCw,
  Copy,
  Calendar,
  FileText,
  HelpCircle,
  Star,
  Gift,
} from "lucide-react";
import styles from "./QuickActions.module.scss";

const QuickActions: React.FC = () => {
  const actions = [
    {
      id: "book",
      icon: <Plus />,
      title: "Book Service",
      description: "Schedule a new service",
      color: "primary",
      onClick: () => console.log("Book service"),
    },
    {
      id: "reschedule",
      icon: <RefreshCw />,
      title: "Reschedule",
      description: "Change appointment time",
      color: "secondary",
      onClick: () => console.log("Reschedule"),
    },
    {
      id: "recurring",
      icon: <Copy />,
      title: "Set Recurring",
      description: "Create subscription",
      color: "accent",
      onClick: () => console.log("Set recurring"),
    },
    {
      id: "review",
      icon: <Star />,
      title: "Leave Review",
      description: "Rate your service",
      color: "warning",
      onClick: () => console.log("Leave review"),
    },
    {
      id: "refer",
      icon: <Gift />,
      title: "Refer Friend",
      description: "Earn rewards",
      color: "accent",
      onClick: () => console.log("Refer friend"),
    },
    {
      id: "support",
      icon: <HelpCircle />,
      title: "Get Support",
      description: "Contact help center",
      color: "neutral",
      onClick: () => console.log("Get support"),
    },
  ];

  return (
    <div className={styles.quickActions}>
      <div className={styles.quickActions__header}>
        <h3 className={styles.quickActions__title}>Quick Actions</h3>
        <p className={styles.quickActions__subtitle}>
          Manage your bookings with one click
        </p>
      </div>

      <div className={styles.quickActions__grid}>
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            className={`${styles.quickActions__card} ${
              styles[`quickActions__card--${action.color}`]
            }`}
            onClick={action.onClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{
              y: -4,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.quickActions__iconWrapper}>
              {action.icon}
            </div>
            <div className={styles.quickActions__content}>
              <h4 className={styles.quickActions__cardTitle}>{action.title}</h4>
              <p className={styles.quickActions__cardDescription}>
                {action.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

// QuickActions.module.scss
`

`;
