import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import styles from "./ErrorBanner.module.scss";

interface ErrorBannerProps {
  error: string | null;
  onDismiss?: () => void;
  title?: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  error,
  onDismiss,
  title = "Error",
}) => {
  if (!error) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={styles.errorBanner}
      >
        <div className={styles.errorBanner__icon}>
          <AlertCircle size={20} />
        </div>
        <div className={styles.errorBanner__content}>
          <h4 className={styles.errorBanner__title}>{title}</h4>
          <p className={styles.errorBanner__message}>{error}</p>
        </div>
        {onDismiss && (
          <button
            className={styles.errorBanner__dismiss}
            onClick={onDismiss}
            aria-label="Dismiss error"
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorBanner;
