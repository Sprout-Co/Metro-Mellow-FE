import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Button from "../../../../_components/UI/Button/Button";
import styles from "./ErrorDisplay.module.scss";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className={styles.error_display}>
      <div className={styles.error_display__content}>
        <div className={styles.error_display__icon}>
          <Icon name="alert-triangle" size={24} />
        </div>
        <div className={styles.error_display__text}>
          <h4 className={styles.error_display__title}>Error</h4>
          <p className={styles.error_display__message}>{error}</p>
        </div>
        {onRetry && (
          <div className={styles.error_display__actions}>
            <Button variant="primary" size="small" onClick={onRetry}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
