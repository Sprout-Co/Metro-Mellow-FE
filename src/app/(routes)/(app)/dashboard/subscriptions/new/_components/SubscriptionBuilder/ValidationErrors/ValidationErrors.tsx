// ValidationErrors component for displaying validation messages
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import styles from "./ValidationErrors.module.scss";
import { ValidationError } from "../validation";

interface ValidationErrorsProps {
  errors: ValidationError[];
  onDismiss?: () => void;
  className?: string;
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({
  errors,
  onDismiss,
  className = "",
}) => {
  if (!errors || errors.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.validationErrors} ${className}`}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.validationErrors__header}>
          <div className={styles.validationErrors__icon}>
            <AlertCircle size={18} />
          </div>
          <h4>Please fix the following errors:</h4>
          {onDismiss && (
            <button
              className={styles.validationErrors__dismiss}
              onClick={onDismiss}
              aria-label="Dismiss errors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className={styles.validationErrors__list}>
          {errors.map((error, index) => (
            <motion.div
              key={`${error.field}-${index}`}
              className={styles.validationErrors__item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={styles.validationErrors__bullet} />
              <span>{error.message}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ValidationErrors;
