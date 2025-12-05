import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import styles from "./PaymentAlertBanner.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface PaymentAlertBannerProps {
  onViewBilling: () => void;
}

const PaymentAlertBanner: React.FC<PaymentAlertBannerProps> = ({
  onViewBilling,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.paymentAlert}
    >
      <div className={styles.paymentAlert__icon}>
        <AlertTriangle size={20} />
      </div>
      <div className={styles.paymentAlert__content}>
        <h4 className={styles.paymentAlert__title}>Payment Required</h4>
        <p className={styles.paymentAlert__message}>
          Your payment for the current billing period is pending. Please
          complete the payment to continue using this subscription and perform
          actions like pause or cancel.
        </p>
      </div>
      <FnButton
        className={styles.paymentAlert__button}
        variant="primary"
        size="sm"
        animation="bounce"
        onClick={onViewBilling}
      >
        View Billing
      </FnButton>
    </motion.div>
  );
};

export default PaymentAlertBanner;
