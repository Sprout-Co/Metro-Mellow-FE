import { motion } from "framer-motion";
import { Booking } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import StatusBadge from "../../../_components/UI/StatusBadge/StatusBadge";
import styles from "../CustomerDetails.module.scss";

interface CustomerBookingsProps {
  bookings: Booking[];
  loadingStates: {
    bookings: boolean;
  };
  formatDate: (date: string) => string;
  formatBookingStatus: (status: any) => { label: string; status: string };
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CustomerBookings({
  bookings,
  loadingStates,
  formatDate,
  formatBookingStatus,
}: CustomerBookingsProps) {
  return (
    <motion.div
      className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
      variants={fadeInVariants}
    >
      <div className={styles.customer_details__card_header}>
        <h3 className={styles.customer_details__card_title}>
          <i className="fas fa-calendar-alt"></i> All Bookings
        </h3>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: Booking) => {
              const { label, status } = formatBookingStatus(booking.status);
              return (
                <tr key={booking.id}>
                  <td>{booking.service?.name || "N/A"}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>
                    <StatusBadge status={status as any} label={label} />
                  </td>
                  <td>{formatToNaira(booking.totalPrice || 0)}</td>
                  <td>
                    <button className={styles.customer_details__icon_button}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={styles.customer_details__empty}>No bookings found</p>
      )}
    </motion.div>
  );
}
