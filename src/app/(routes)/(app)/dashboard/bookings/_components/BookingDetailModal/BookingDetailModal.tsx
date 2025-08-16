// src/app/(routes)/(app)/dashboard/bookings/_components/BookingDetailModal/BookingDetailModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  MessageSquare,
  Edit,
  RefreshCw,
  Star,
  Repeat,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import styles from "./BookingDetailModal.module.scss";
import { ServiceCategory, BookingStatus } from "../../types/booking";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";

interface Booking {
  id: string;
  serviceName: string;
  serviceType: ServiceCategory;
  date: Date;
  endTime: Date;
  status: BookingStatus;
  provider: string;
  providerPhone?: string;
  providerEmail?: string;
  address: string;
  price: number;
  notes?: string;
  recurring: boolean;
  frequency?: string;
  rating?: number;
}

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!booking) return null;

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get status color
  const getStatusColor = (status: BookingStatus) => {
    const colors = {
      [BookingStatus.Upcoming]: "upcoming",
      [BookingStatus.Confirmed]: "confirmed",
      [BookingStatus.Pending]: "pending",
      [BookingStatus.InProgress]: "inProgress",
      [BookingStatus.Completed]: "completed",
      [BookingStatus.Cancelled]: "cancelled",
    };
    return colors[status] || "default";
  };

  // Get service icon
  const getServiceIcon = (serviceType: ServiceCategory) => {
    const icons = {
      [ServiceCategory.Cleaning]: "🧹",
      [ServiceCategory.Laundry]: "👕",
      [ServiceCategory.Cooking]: "🍳",
      [ServiceCategory.Errands]: "📦",
      [ServiceCategory.PestControl]: "🐛",
    };
    return icons[serviceType] || "🏠";
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="md">
      <div className={styles.modal__header}>
        <div className={styles.modal__headerLeft}>
          <div className={styles.modal__serviceIcon}>
            {getServiceIcon(booking.serviceType)}
          </div>
          <div>
            <h2 className={styles.modal__title}>
              {booking.serviceName}
              {booking.recurring && (
                <span className={styles.modal__recurringBadge}>
                  <Repeat size={12} />
                  {booking.frequency}
                </span>
              )}
            </h2>
            <p className={styles.modal__subtitle}>{booking.serviceType}</p>
          </div>
        </div>
        <button className={styles.modal__closeBtn} onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className={styles.modal__body}>
        <div className={styles.modal__statusBar}>
          <span
            className={`${styles.modal__status} ${
              styles[`modal__status--${getStatusColor(booking.status)}`]
            }`}
          >
            {booking.status === BookingStatus.Confirmed && (
              <CheckCircle size={12} />
            )}
            {booking.status === BookingStatus.Pending && (
              <AlertCircle size={12} />
            )}
            {booking.status}
          </span>
          <span className={styles.modal__bookingId}>
            Booking ID: #{booking.id.slice(0, 6).toUpperCase()}
          </span>
        </div>

        <div className={styles.modal__sections}>
          {/* Date & Time Section */}
          <div className={styles.modal__section}>
            <h3 className={styles.modal__sectionTitle}>Date & Time</h3>
            <div className={styles.modal__info}>
              <div className={styles.modal__infoItem}>
                <Calendar size={14} />
                <div>
                  <span className={styles.modal__infoLabel}>Date</span>
                  <span className={styles.modal__infoValue}>
                    {formatDate(booking.date)}
                  </span>
                </div>
              </div>
              <div className={styles.modal__infoItem}>
                <Clock size={14} />
                <div>
                  <span className={styles.modal__infoLabel}>Time</span>
                  <span className={styles.modal__infoValue}>
                    {formatTime(booking.date)} - {formatTime(booking.endTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className={styles.modal__section}>
            <h3 className={styles.modal__sectionTitle}>Location</h3>
            <div className={styles.modal__info}>
              <div className={styles.modal__infoItem}>
                <MapPin size={14} />
                <div>
                  <span className={styles.modal__infoLabel}>Address</span>
                  <span className={styles.modal__infoValue}>
                    {booking.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Provider Section */}
          <div className={styles.modal__section}>
            <h3 className={styles.modal__sectionTitle}>Service Provider</h3>
            <div className={styles.modal__providerCard}>
              <div className={styles.modal__providerAvatar}>
                <User size={16} />
              </div>
              <div className={styles.modal__providerInfo}>
                <span className={styles.modal__providerName}>
                  {booking.provider}
                </span>
                {booking.providerPhone && (
                  <div className={styles.modal__providerContact}>
                    <Phone size={12} />
                    <span>{booking.providerPhone || "+234 801 234 5678"}</span>
                  </div>
                )}
                {booking.providerEmail && (
                  <div className={styles.modal__providerContact}>
                    <Mail size={12} />
                    <span>
                      {booking.providerEmail || "provider@metromellow.com"}
                    </span>
                  </div>
                )}
              </div>
              {booking.status === BookingStatus.Upcoming ||
              booking.status === BookingStatus.Confirmed ? (
                <button className={styles.modal__contactBtn}>Contact</button>
              ) : null}
            </div>
          </div>

          {/* Pricing Section */}
          <div className={styles.modal__section}>
            <h3 className={styles.modal__sectionTitle}>Pricing</h3>
            <div className={styles.modal__priceCard}>
              <div className={styles.modal__priceRow}>
                <span className={styles.modal__priceLabel}>Service Fee</span>
                <span className={styles.modal__priceValue}>
                  {formatPrice(booking.price)}
                </span>
              </div>
              {booking.recurring && (
                <div className={styles.modal__priceNote}>
                  <AlertCircle size={12} />
                  <span>Billed {booking.frequency?.toLowerCase()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          {booking.notes && (
            <div className={styles.modal__section}>
              <h3 className={styles.modal__sectionTitle}>
                Special Instructions
              </h3>
              <div className={styles.modal__notes}>
                <MessageSquare size={14} />
                <p>{booking.notes}</p>
              </div>
            </div>
          )}

          {/* Rating Section (for completed bookings) */}
          {booking.status === BookingStatus.Completed && (
            <div className={styles.modal__section}>
              <h3 className={styles.modal__sectionTitle}>Service Rating</h3>
              {booking.rating ? (
                <div className={styles.modal__rating}>
                  <div className={styles.modal__stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= booking.rating!
                            ? styles["modal__star--filled"]
                            : ""
                        }
                      />
                    ))}
                  </div>
                  <span className={styles.modal__ratingText}>
                    {booking.rating}/5 - Service completed successfully
                  </span>
                </div>
              ) : (
                <button className={styles.modal__rateBtn}>
                  <Star size={14} />
                  Rate this service
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.modal__footer}>
        {booking.status === BookingStatus.Upcoming ||
        booking.status === BookingStatus.Confirmed ? (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={14} />
              Reschedule
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit size={14} />
              Edit Details
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--danger"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X size={14} />
              Cancel
            </motion.button>
          </>
        ) : booking.status === BookingStatus.Completed ? (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={14} />
              Book Again
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare size={14} />
              Leave Feedback
            </motion.button>
          </>
        ) : booking.status === BookingStatus.Pending ? (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle size={14} />
              Confirm Booking
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit size={14} />
              Modify
            </motion.button>
          </>
        ) : (
          <motion.button
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        )}
      </div>
    </ModalDrawer>
  );
};

export default BookingDetailModal;
