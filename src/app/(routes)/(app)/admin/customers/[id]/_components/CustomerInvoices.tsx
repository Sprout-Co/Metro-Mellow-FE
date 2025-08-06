import { motion } from "framer-motion";
import { Invoice } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import StatusBadge from "../../../_components/UI/StatusBadge/StatusBadge";
import styles from "../CustomerDetails.module.scss";

interface CustomerInvoicesProps {
  customerInvoices: any[];
  formatDate: (date: string) => string;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CustomerInvoices({
  customerInvoices,
  formatDate,
}: CustomerInvoicesProps) {
  return (
    <motion.div
      className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
      variants={fadeInVariants}
    >
      <div className={styles.customer_details__card_header}>
        <h3 className={styles.customer_details__card_title}>
          <i className="fas fa-file-invoice"></i> Invoices
        </h3>
      </div>

      {customerInvoices.length > 0 ? (
        <table className={styles.customer_details__table}>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerInvoices.map((invoice: any) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{formatDate(invoice.createdAt)}</td>
                <td>{formatToNaira(invoice.total || 0)}</td>
                <td>
                  <StatusBadge
                    status={
                      invoice.status === "PAID"
                        ? "active"
                        : invoice.status === "CANCELLED"
                          ? "cancelled"
                          : "pending"
                    }
                    label={invoice.status}
                  />
                </td>
                <td>
                  <button className={styles.customer_details__icon_button}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.customer_details__empty}>No invoices found</p>
      )}
    </motion.div>
  );
}
