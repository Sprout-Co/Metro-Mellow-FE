import React from "react";
import styles from "../CheckoutModal.module.scss";

interface CheckoutSummaryProps {
  totalPrice: number;
  deliveryCost: number;
  discount?: number;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  totalPrice,
  deliveryCost,
  discount = 0,
}) => {
  const finalTotal = totalPrice + deliveryCost - discount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.checkoutModal__summary}>
      <h4 className={styles.checkoutModal__summaryTitle}>Order Summary</h4>

      <div className={styles.checkoutModal__summaryItem}>
        <span>Subtotal</span>
        <span>₦{formatCurrency(totalPrice)}</span>
      </div>

      <div className={styles.checkoutModal__summaryItem}>
        <span>Logistics Fee</span>
        <span>
          {deliveryCost > 0 ? `₦${formatCurrency(deliveryCost)}` : "Free"}
        </span>
      </div>

      {discount > 0 && (
        <div
          className={`${styles.checkoutModal__summaryItem} ${styles["checkoutModal__summaryItem--discount"]}`}
        >
          <span>Referral Discount</span>
          <span>-₦{formatCurrency(discount)}</span>
        </div>
      )}

      <div
        className={`${styles.checkoutModal__summaryItem} ${styles["checkoutModal__summaryItem--total"]}`}
      >
        <span>Total</span>
        <span>₦{formatCurrency(finalTotal)}</span>
      </div>
    </div>
  );
};
