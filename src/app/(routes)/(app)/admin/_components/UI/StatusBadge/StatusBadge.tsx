import React from "react";
import styles from "./StatusBadge.module.scss";

interface StatusBadgeProps {
  status:
    | "active"
    | "inactive"
    | "pending"
    | "completed"
    | "cancelled"
    | "confirmed";
  label?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const statusMap = {
    active: { label: "Active", color: "success" },
    inactive: { label: "Inactive", color: "error" },
    pending: { label: "Pending", color: "warning" },
    completed: { label: "Completed", color: "primary" },
    cancelled: { label: "Cancelled", color: "error" },
    confirmed: { label: "Confirmed", color: "primary" },
  };

  const { label: defaultLabel, color } = statusMap[status];
  const displayLabel = label || defaultLabel;

  return (
    <span className={`${styles.badge} ${styles[`badge--${color}`]}`}>
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
