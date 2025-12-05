import React from "react";
import styles from "../CheckoutModal.module.scss";

interface CheckoutModalHeaderProps {
  onClose: () => void;
}

export const CheckoutModalHeader: React.FC<CheckoutModalHeaderProps> = ({
  onClose,
}) => {
  return (
    <div className={styles.checkoutModal__header}>
      <h2 className={styles.checkoutModal__title}>Complete Your Booking</h2>

      <button
        className={styles.checkoutModal__close}
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
