import { motion } from "framer-motion";
import { Subscription } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import StatusBadge from "../../../_components/UI/StatusBadge/StatusBadge";
import styles from "../CustomerDetails.module.scss";

interface CustomerSubscriptionsProps {
  subscriptions: Subscription[];
  loadingStates: {
    subscriptions: boolean;
  };
  formatDate: (date: string) => string;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CustomerSubscriptions({
  subscriptions,
  loadingStates,
  formatDate,
}: CustomerSubscriptionsProps) {
  return (
    <motion.div
      className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
      variants={fadeInVariants}
    >
      <div className={styles.customer_details__card_header}>
        <h3 className={styles.customer_details__card_title}>
          <i className="fas fa-sync-alt"></i> Subscriptions
        </h3>
      </div>

      {loadingStates.subscriptions ? (
        <div className="loading-spinner">Loading subscriptions...</div>
      ) : subscriptions.length > 0 ? (
        <table className={styles.customer_details__table}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Status</th>
              <th>Next Billing</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription: Subscription) => (
              <tr key={subscription.id}>
                <td>{subscription.services?.[0]?.service?.name || "N/A"}</td>
                <td>
                  <StatusBadge
                    status={
                      subscription.status === "ACTIVE" ? "active" : "inactive"
                    }
                    label={subscription.status}
                  />
                </td>
                <td>{formatDate(subscription.nextBillingDate)}</td>
                <td>{formatToNaira(subscription.totalPrice || 0)}</td>
                <td>
                  <button className={styles.customer_details__icon_button}>
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.customer_details__empty}>No subscriptions found</p>
      )}
    </motion.div>
  );
}
