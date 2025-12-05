import React from "react";
import styles from "./FullPageLoader.module.scss";
import Portal from "../Portal/Portal";

interface FullPageLoaderProps {
  isLoading?: boolean;
  message?: string;
  className?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  isLoading = true,
  message,
  className,
}) => {
  if (!isLoading) return null;

  return (
    <Portal>
      <div className={`${styles.overlay} ${className || ""}`}>
        <div className={styles.spinner} role="status" aria-label="Loading" />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </Portal>
  );
};

export default FullPageLoader;
