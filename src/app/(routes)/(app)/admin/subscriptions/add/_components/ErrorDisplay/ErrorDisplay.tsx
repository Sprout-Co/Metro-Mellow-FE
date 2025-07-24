import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./ErrorDisplay.module.scss";

interface ErrorDisplayProps {
  error: string;
  onDismiss: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onDismiss }) => {
  return (
    <div className={styles.error_display}>
      <div className={styles.error_display__content}>
        <Icon name="alert-triangle" size={16} className={styles.error_display__icon} />
        <span className={styles.error_display__message}>{error}</span>
        <button
          className={styles.error_display__dismiss}
          onClick={onDismiss}
          aria-label="Dismiss error"
        >
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;