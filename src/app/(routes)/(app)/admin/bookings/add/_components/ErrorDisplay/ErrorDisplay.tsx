import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./ErrorDisplay.module.scss";

interface ErrorDisplayProps {
  error: string | null;
  onClear: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className={styles.error_display}>
      <Icon name="alert-triangle" />
      <span>{error}</span>
      <button onClick={onClear} className={styles.error_display__close}>
        ×
      </button>
    </div>
  );
};

export default ErrorDisplay;
