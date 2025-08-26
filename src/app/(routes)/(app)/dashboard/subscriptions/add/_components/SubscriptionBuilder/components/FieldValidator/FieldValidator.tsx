import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FieldValidator.module.scss';

interface FieldValidatorProps {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
  success?: boolean;
  children: React.ReactNode;
}

export const FieldValidator: React.FC<FieldValidatorProps> = ({
  label,
  required,
  error,
  touched,
  hint,
  success,
  children,
}) => {
  const hasError = touched && error;

  return (
    <div className={`${styles.field} ${hasError ? styles.field_error : ''}`}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {hasError ? (
          <motion.div
            className={styles.error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.div>
        ) : success ? (
          <motion.div
            className={styles.success}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓
          </motion.div>
        ) : hint ? (
          <div className={styles.hint}>{hint}</div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};