
import React from "react";
import styles from "./RecentBookings.module.scss";
import Card from "../Card/Card";

interface Booking {
  id: string;
  service: {
    name: string;
    type: "cleaning" | "laundry" | "cooking" | "pest-control" | "errands";
  };
  customer: {
    name: string;
  };
  price: number;
  scheduledAt: string;
  status: "active" | "pending" | "completed" | "cancelled";
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
  const getServiceIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      cleaning: "C",
      laundry: "L",
      cooking: "C",
      "pest-control": "P",
      errands: "E",
    };

    return iconMap[type] || "S";
  };

  const getServiceColor = (type: string) => {
    const colorMap: Record<string, string> = {
      cleaning: "primary",
      laundry: "secondary",
      cooking: "success",
      "pest-control": "info",
      errands: "warning",
    };

    return colorMap[type] || "primary";
  };

  return (
    <Card className={styles.recent_bookings}>
      <h3 className={styles.recent_bookings__title}>Recent Bookings</h3>

      <div className={styles.recent_bookings__list}>
        {bookings.map((booking) => (
          <div key={booking.id} className={styles.recent_bookings__item}>
            <div
              className={`${styles.recent_bookings__service_icon} ${styles[`recent_bookings__service_icon--${getServiceColor(booking.service.type)}`]}`}
            >
              {getServiceIcon(booking.service.type)}
            </div>

            <div className={styles.recent_bookings__details}>
              <h4 className={styles.recent_bookings__service_name}>
                {booking.service.name}
              </h4>
              <p className={styles.recent_bookings__customer_name}>
                {booking.customer.name}
              </p>
            </div>

            <div className={styles.recent_bookings__info}>
              <p className={styles.recent_bookings__price}>${booking.price}</p>
              <p className={styles.recent_bookings__time}>
                {booking.scheduledAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentBookings;
