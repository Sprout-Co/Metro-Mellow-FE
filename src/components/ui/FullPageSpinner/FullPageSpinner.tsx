import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./FullPageSpinner.module.scss";

interface FullPageSpinnerProps {
  message?: string;
  size?: number;
  className?: string;
  isLoading?: boolean;
}

const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  message,
  size = 24,
  className,
  isLoading = true,
}) => {
  if (!isLoading) return null;

  return (
    <div className={`${styles.spinner} ${className || ""}`}>
      <div className={styles.spinner__content}>
        <Loader2 size={size} className={styles.spinner__icon} />
        {message && <p className={styles.spinner__message}>{message}</p>}
      </div>
    </div>
  );
};

export default FullPageSpinner;
