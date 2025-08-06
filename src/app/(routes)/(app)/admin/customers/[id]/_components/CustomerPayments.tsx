import { motion } from "framer-motion";
import { Payment } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import StatusBadge from "../../../_components/UI/StatusBadge/StatusBadge";
import styles from "../CustomerDetails.module.scss";

interface CustomerPaymentsProps {
  payments: Payment[];
  loadingStates: {
    payments: boolean;
  };
  formatDate: (date: string) => string;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CustomerPayments({
  payments,
  loadingStates,
  formatDate,
}: CustomerPaymentsProps) {
  return (
    <motion.div
      className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
      variants={fadeInVariants}
    >
      <div className={styles.customer_details__card_header}>
        <h3 className={styles.customer_details__card_title}>
          <i className="fas fa-credit-card"></i> Payment History
        </h3>
      </div>

      {loadingStates.payments ? (
        <div className="loading-spinner">Loading payments...</div>
      ) : payments.length > 0 ? (
        <table className={styles.customer_details__table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: Payment) => (
              <tr key={payment.id}>
                <td>{formatDate(payment.createdAt)}</td>
                <td>{formatToNaira(payment.amount)}</td>
                <td>
                  <StatusBadge
                    status={
                      payment.status === "COMPLETED"
                        ? "active"
                        : payment.status === "FAILED"
                          ? "cancelled"
                          : "pending"
                    }
                    label={payment.status}
                  />
                </td>
                <td>{payment.paymentMethod?.type || "N/A"}</td>
                <td>
                  <button className={styles.customer_details__icon_button}>
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.customer_details__empty}>
          No payment history found
        </p>
      )}
    </motion.div>
  );
}
