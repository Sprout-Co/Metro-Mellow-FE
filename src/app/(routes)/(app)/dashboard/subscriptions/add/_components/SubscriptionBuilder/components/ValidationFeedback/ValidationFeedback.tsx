import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ValidationFeedback.module.scss';

interface ValidationFeedbackProps {
  field: string;
  value: any;
  validator: (value: any) => { isValid: boolean; message: string };
  debounceMs?: number;
}

export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({
  field,
  value,
  validator,
  debounceMs = 300,
}) => {
  const [feedback, setFeedback] = useState<{ isValid: boolean; message: string } | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    setIsValidating(true);
    const handler = setTimeout(() => {
      const result = validator(value);
      setFeedback(result);
      setIsValidating(false);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, validator, debounceMs]);

  return (
    <AnimatePresence>
      {feedback && !feedback.isValid && (
        <motion.div
          className={styles.feedback}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {feedback.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};