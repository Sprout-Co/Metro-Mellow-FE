import React from "react";
import { motion } from "framer-motion";
import {
  Filter,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import {
  GetCustomerSubscriptionsQuery,
  Booking,
  BookingStatus,
  ServiceCategory,
} from "@/graphql/api";
import {
  getServiceIcon,
  formatDate,
  formatPrice,
  formatStatusName,
} from "../types";
import styles from "./BookingsTab.module.scss";

type SubscriptionType =
  GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

interface BookingsTabProps {
  subscription: SubscriptionType;
  subscriptionBookings: Booking[];
  allSubscriptionBookings: Booking[];
  loadingBookings: boolean;
  bookingsError: string | null;
  fetchSubscriptionBookings: () => void;
  selectedBookingStatus: BookingStatus | "all";
  setSelectedBookingStatus: (status: BookingStatus | "all") => void;
}

const BookingsTab: React.FC<BookingsTabProps> = ({
  subscription,
  subscriptionBookings,
  allSubscriptionBookings,
  loadingBookings,
  bookingsError,
  fetchSubscriptionBookings,
  selectedBookingStatus,
  setSelectedBookingStatus,
}) => {
  // Helper function to get booking count by status
  const getBookingCountByStatus = (status: BookingStatus | "all"): number => {
    if (status === "all") return allSubscriptionBookings.length;
    return allSubscriptionBookings.filter(
      (booking) => booking.status === status
    ).length;
  };

  return (
    <div className={styles.modal__sections}>
      <div className={styles.modal__section}>
        <div className={styles.modal__sectionHeader}>
          <h3 className={styles.modal__sectionTitle}>Subscription Bookings</h3>
          <div className={styles.modal__filterContainer}>
            <Filter size={16} />
            <select
              value={selectedBookingStatus}
              onChange={(e) =>
                setSelectedBookingStatus(
                  e.target.value as BookingStatus | "all"
                )
              }
              className={styles.modal__statusFilter}
            >
              <option value="all">
                All Status ({getBookingCountByStatus("all")})
              </option>
              <option value={BookingStatus.Pending}>
                {formatStatusName(BookingStatus.Pending)} (
                {getBookingCountByStatus(BookingStatus.Pending)})
              </option>
              <option value={BookingStatus.Confirmed}>
                {formatStatusName(BookingStatus.Confirmed)} (
                {getBookingCountByStatus(BookingStatus.Confirmed)})
              </option>
              <option value={BookingStatus.InProgress}>
                {formatStatusName(BookingStatus.InProgress)} (
                {getBookingCountByStatus(BookingStatus.InProgress)})
              </option>
              <option value={BookingStatus.Completed}>
                {formatStatusName(BookingStatus.Completed)} (
                {getBookingCountByStatus(BookingStatus.Completed)})
              </option>
              <option value={BookingStatus.Cancelled}>
                {formatStatusName(BookingStatus.Cancelled)} (
                {getBookingCountByStatus(BookingStatus.Cancelled)})
              </option>
              <option value={BookingStatus.Paused}>
                {formatStatusName(BookingStatus.Paused)} (
                {getBookingCountByStatus(BookingStatus.Paused)})
              </option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>

        {loadingBookings ? (
          <div className={styles.modal__loadingState}>
            <RefreshCw className="animate-spin" size={24} />
            <p>Loading bookings...</p>
          </div>
        ) : bookingsError ? (
          <div className={styles.modal__errorState}>
            <AlertTriangle size={24} />
            <h4>Error Loading Bookings</h4>
            <p>{bookingsError}</p>
            <motion.button
              className={styles.modal__retryButton}
              onClick={fetchSubscriptionBookings}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          </div>
        ) : subscriptionBookings.length > 0 ? (
          <div className={styles.modal__bookingsList}>
            {subscriptionBookings.map((booking) => (
              <div key={booking.id} className={styles.modal__bookingItem}>
                <div className={styles.modal__bookingIcon}>
                  {getServiceIcon(booking.service.category as ServiceCategory)}
                </div>
                <div className={styles.modal__bookingContent}>
                  <div className={styles.modal__bookingHeader}>
                    <h4 className={styles.modal__bookingName}>
                      {booking.service.name}
                    </h4>
                    <span
                      className={`${styles.modal__bookingStatus} ${styles[`modal__bookingStatus--${booking.status.toLowerCase()}`]}`}
                    >
                      {formatStatusName(booking.status)}
                    </span>
                  </div>
                  <div className={styles.modal__bookingDetails}>
                    <div className={styles.modal__bookingDetail}>
                      <Calendar size={12} />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className={styles.modal__bookingDetail}>
                      <Clock size={12} />
                      <span>{booking.timeSlot}</span>
                    </div>
                    {booking.staff && (
                      <div className={styles.modal__bookingDetail}>
                        <User size={12} />
                        <span>
                          {booking.staff.firstName} {booking.staff.lastName}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.modal__bookingPrice}>
                    {formatPrice(booking.totalPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.modal__emptyState}>
            <Calendar size={48} />
            <h4>No bookings found</h4>
            <p>
              No recurring bookings found for this subscription. Bookings will
              appear here once services are scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsTab;
