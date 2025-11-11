import React from "react";
import styles from "../CheckoutModal.module.scss";

interface CheckoutModalErrorsProps {
  error?: string | null;
  slotError?: string | null;
  slotValidationError?: string | null;
  errorRef?: React.RefObject<HTMLDivElement>;
}

export const CheckoutModalErrors: React.FC<CheckoutModalErrorsProps> = ({
  error,
  slotError,
  slotValidationError,
  errorRef,
}) => {
  const hasAnyError = error || slotError || slotValidationError;

  if (!hasAnyError) return null;

  return (
    <div ref={errorRef}>
      {error && (
        <div className={styles.checkoutModal__errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {slotError && (
        <div className={styles.checkoutModal__errorMessage}>
          <p>{slotError}</p>
        </div>
      )}

      {slotValidationError && (
        <div className={styles.checkoutModal__errorMessage}>
          <p>{slotValidationError}</p>
        </div>
      )}
    </div>
  );
};

