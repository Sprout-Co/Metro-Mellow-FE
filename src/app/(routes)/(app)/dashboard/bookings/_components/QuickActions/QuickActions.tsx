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
  Route,
} from "lucide-react";
import styles from "./QuickActions.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";

interface QuickActionsProps {
  onAddBooking: () => void;
  onReschedule: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddBooking,
  onReschedule,
}) => {
  const router = useRouter();
  const actions = [
    {
      id: "book",
      icon: <Plus />,
      title: "Book Service",
      description: "Schedule a new service",
      color: "primary",
      onClick: onAddBooking,
    },
    {
      id: "recurring",
      icon: <Copy />,
      title: "Set Recurring",
      description: "Create subscription",
      color: "accent",
      onClick: () => router.push(Routes.DASHBOARD_SUBSCRIPTIONS_ADD),
    },
    {
      id: "refer",
      icon: <Gift />,
      title: "Refer Friend",
      description: "Earn rewards",
      color: "accent",
      onClick: () => router.push(Routes.DASHBOARD_REFER_FRIEND),
    },
    {
      id: "support",
      icon: <HelpCircle />,
      title: "Get Support",
      description: "Contact help center",
      color: "neutral",
      onClick: () => router.push(Routes.DASHBOARD_SUPPORT),
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
