import { motion } from "framer-motion";
import { User, Booking } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import StatusBadge from "../../../_components/UI/StatusBadge/StatusBadge";
import styles from "../CustomerDetails.module.scss";

interface CustomerOverviewProps {
  customer: User;
  bookings: Booking[];
  totalSpent: number;
  completedBookings: number;
  activeSubscriptions: number;
  customerInvoices: any[];
  totalInvoiced: number;
  loadingStates: {
    bookings: boolean;
  };
  onTabChange: (tab: string) => void;
  formatDate: (date: string) => string;
  formatBookingStatus: (status: any) => { label: string; status: string };
  getStatusColor: (status: any) => string;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CustomerOverview({
  customer,
  bookings,
  totalSpent,
  completedBookings,
  activeSubscriptions,
  customerInvoices,
  totalInvoiced,
  loadingStates,
  onTabChange,
  formatDate,
  formatBookingStatus,
  getStatusColor,
}: CustomerOverviewProps) {
  return (
    <div className={styles.customer_details__tab_content}>
      <motion.div
        className={styles.customer_details__card}
        variants={fadeInVariants}
      >
        <div className={styles.customer_details__card_header}>
          <h3 className={styles.customer_details__card_title}>
            <i className="fas fa-user"></i> Personal Information
          </h3>
          <div className={styles.customer_details__card_actions}>
            <button className={styles.customer_details__icon_button}>
              <i className="fas fa-pen"></i>
            </button>
          </div>
        </div>

        <div className={styles.customer_details__avatar}>
          {customer.firstName?.charAt(0) || ""}
          {customer.lastName?.charAt(0) || ""}
        </div>

        <div className={styles.customer_details__info_grid}>
          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>First Name</p>
            <p className={styles.customer_details__info_value}>
              {customer.firstName || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Last Name</p>
            <p className={styles.customer_details__info_value}>
              {customer.lastName || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Email</p>
            <p className={styles.customer_details__info_value}>
              {customer.email || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Phone</p>
            <p className={styles.customer_details__info_value}>
              {customer.phone || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Status</p>
            <p className={styles.customer_details__info_value}>
              <span
                className={`${styles.customer_details__status} ${styles[`customer_details__status--${getStatusColor(customer.accountStatus)}`]}`}
              >
                {customer.accountStatus?.replace(/([A-Z])/g, " $1").trim() ||
                  "N/A"}
              </span>
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>
              Email Verified
            </p>
            <p className={styles.customer_details__info_value}>
              <span
                className={`${styles.customer_details__status} ${styles[`customer_details__status--${customer.emailVerified ? "active" : "pending"}`]}`}
              >
                {customer.emailVerified ? "Verified" : "Not Verified"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.customer_details__card}
        variants={fadeInVariants}
      >
        <div className={styles.customer_details__card_header}>
          <h3 className={styles.customer_details__card_title}>
            <i className="fas fa-home"></i> Address Information
          </h3>
          <div className={styles.customer_details__card_actions}>
            <button className={styles.customer_details__icon_button}>
              <i className="fas fa-pen"></i>
            </button>
          </div>
        </div>

        <div className={styles.customer_details__info_grid}>
          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Street</p>
            <p className={styles.customer_details__info_value}>
              {customer.defaultAddress?.street || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>City</p>
            <p className={styles.customer_details__info_value}>
              {customer.defaultAddress?.city || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>State</p>
            <p className={styles.customer_details__info_value}>
              {customer.defaultAddress?.state || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Zip Code</p>
            <p className={styles.customer_details__info_value}>
              {customer.defaultAddress?.zipCode || "N/A"}
            </p>
          </div>

          <div className={styles.customer_details__info_item}>
            <p className={styles.customer_details__info_label}>Country</p>
            <p className={styles.customer_details__info_value}>
              {customer.defaultAddress?.country || "N/A"}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
        variants={fadeInVariants}
      >
        <div className={styles.customer_details__card_header}>
          <h3 className={styles.customer_details__card_title}>
            <i className="fas fa-chart-line"></i> Customer Summary
          </h3>
        </div>

        <div className={styles.customer_details__bookings_summary}>
          <div className={styles.customer_details__summary_card}>
            <p className={styles.customer_details__summary_value}>
              {formatToNaira(totalSpent)}
            </p>
            <p className={styles.customer_details__summary_label}>
              Total Spent
            </p>
          </div>

          <div className={styles.customer_details__summary_card}>
            <p className={styles.customer_details__summary_value}>
              {bookings.length}
            </p>
            <p className={styles.customer_details__summary_label}>
              Total Bookings
            </p>
          </div>

          <div className={styles.customer_details__summary_card}>
            <p className={styles.customer_details__summary_value}>
              {completedBookings}
            </p>
            <p className={styles.customer_details__summary_label}>
              Completed Bookings
            </p>
          </div>

          <div className={styles.customer_details__summary_card}>
            <p className={styles.customer_details__summary_value}>
              {activeSubscriptions}
            </p>
            <p className={styles.customer_details__summary_label}>
              Active Subscriptions
            </p>
          </div>

          <div className={styles.customer_details__summary_card}>
            <p className={styles.customer_details__summary_value}>
              {customerInvoices.length}
            </p>
            <p className={styles.customer_details__summary_label}>
              Total Invoices
            </p>
          </div>

          <div className={styles.customer_details__summary_card}>
            <p className={styles.customer_details__summary_value}>
              {formatToNaira(totalInvoiced)}
            </p>
            <p className={styles.customer_details__summary_label}>
              Total Invoiced
            </p>
          </div>
        </div>

        <div className={styles.customer_details__chart}>
          Spending Graph (Placeholder)
        </div>
      </motion.div>

      <motion.div
        className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
        variants={fadeInVariants}
      >
        <div className={styles.customer_details__card_header}>
          <h3 className={styles.customer_details__card_title}>
            <i className="fas fa-calendar-alt"></i> Recent Bookings
          </h3>
          <div className={styles.customer_details__card_actions}>
            <button
              className={styles.customer_details__icon_button}
              onClick={() => onTabChange("bookings")}
            >
              View All
            </button>
          </div>
        </div>

        {loadingStates.bookings ? (
          <div className="loading-spinner">Loading bookings...</div>
        ) : bookings.length > 0 ? (
          <table className={styles.customer_details__table}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((booking: Booking) => {
                const { label, status } = formatBookingStatus(booking.status);
                return (
                  <tr key={booking.id}>
                    <td>{booking.service?.name || "N/A"}</td>
                    <td>{formatDate(booking.date)}</td>
                    <td>
                      <StatusBadge status={status as any} label={label} />
                    </td>
                    <td>{formatToNaira(booking.totalPrice || 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className={styles.customer_details__empty}>No bookings found</p>
        )}
      </motion.div>
    </div>
  );
}
