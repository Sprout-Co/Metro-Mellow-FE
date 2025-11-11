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

  return (
    <div className={styles.checkoutModal__summary}>
      <div className={styles.checkoutModal__summaryItem}>
        <span>Subtotal</span>
        <span>₦{totalPrice}</span>
      </div>
      <div className={styles.checkoutModal__summaryItem}>
        <span>Delivery Fee</span>
        <span>₦{deliveryCost}</span>
      </div>
      {discount > 0 && (
        <div className={styles.checkoutModal__summaryItem}>
          <span>Discount</span>
          <span>-₦{discount}</span>
        </div>
      )}
      <div className={styles.checkoutModal__summaryItem}>
        <span>Total</span>
        <span>₦{finalTotal}</span>
      </div>
    </div>
  );
};

