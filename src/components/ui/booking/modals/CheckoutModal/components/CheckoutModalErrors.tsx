import React from "react";
import styles from "../CheckoutModal.module.scss";

interface CheckoutModalErrorsProps {
  error?: string | null;
  slotError?: string | null;
  paymentError?: string | null;
  slotValidationError?: string | null;
  errorRef?: React.RefObject<HTMLDivElement>;
}

export const CheckoutModalErrors: React.FC<CheckoutModalErrorsProps> = ({
  error,
  slotError,
  paymentError,
  slotValidationError,
  errorRef,
}) => {
  const hasAnyError = error || slotError || slotValidationError || paymentError;

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

      {paymentError && (
        <div className={styles.checkoutModal__errorMessage}>
          <p>{paymentError}</p>
        </div>
      )}
    </div>
  );
};
