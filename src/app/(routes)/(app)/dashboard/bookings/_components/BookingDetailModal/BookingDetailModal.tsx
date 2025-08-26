// src/app/(routes)/(app)/dashboard/bookings/_components/BookingDetailModal/BookingDetailModal.tsx
"use client";

import React, { useState } from "react";
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
  Pause,
} from "lucide-react";
import styles from "./BookingDetailModal.module.scss";
import { ServiceCategory, BookingStatus, Booking } from "@/graphql/api";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import RescheduleModal from "../RescheduleModal/RescheduleModal";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";

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
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] =
    useState(false);
  const [confirmationActionType, setConfirmationActionType] = useState<
    "cancel" | "pause" | "resume" | "reschedule" | null
  >(null);
  if (!booking) return null;

  // Format date
  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
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
      [BookingStatus.Paused]: "paused",
      [BookingStatus.Confirmed]: "confirmed",
      [BookingStatus.Pending]: "pending",
      [BookingStatus.InProgress]: "inProgress",
      [BookingStatus.Completed]: "completed",
      [BookingStatus.Cancelled]: "cancelled",
    };
    return colors[status] || "default";
  };

  // Get service icon
  const getServiceIcon = (service_category: ServiceCategory) => {
    const icons = {
      [ServiceCategory.Cleaning]: "🧹",
      [ServiceCategory.Laundry]: "👕",
      [ServiceCategory.Cooking]: "🍳",
      [ServiceCategory.Errands]: "📦",
      [ServiceCategory.PestControl]: "🐛",
    };
    return icons[service_category] || "🏠";
  };

  function handleConfirmAction(
    actionType: "pause" | "cancel" | "resume" | "reschedule"
  ) {
    setConfirmationActionType(actionType);
    setIsConfirmActionModalOpen(true);
  }

  const renderFooterButtons = () => {
    switch (booking.status) {
      case BookingStatus.Paused:
        return (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRescheduleModalOpen(true)}
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
              Resume Booking
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--danger"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("cancel")}
            >
              <X size={14} />
              Cancel Booking
            </motion.button>
          </>
        );
      case BookingStatus.Confirmed:
      case BookingStatus.Pending:
        return (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRescheduleModalOpen(true)}
            >
              <RefreshCw size={14} />
              Reschedule
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("pause")}
            >
              <Pause size={14} />
              Pause
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--danger"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("cancel")}
            >
              <X size={14} />
              Cancel Booking
            </motion.button>
          </>
        );
      case BookingStatus.Completed:
        return (
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
        );

      default:
        return (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </>
        );
    }
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <div className={styles.modal__header}>
        <div className={styles.modal__headerLeft}>
          <div className={styles.modal__serviceIcon}>
            {getServiceIcon(booking.service_category)}
          </div>
          <div>
            <h2 className={styles.modal__title}>
              {booking.service.name}
              {/* {booking.recurring && (
                <span className={styles.modal__recurringBadge}>
                  <Repeat size={12} />
                  {booking.serviceDetails.frequency}
                </span>
              )} */}
            </h2>
            <p className={styles.modal__subtitle}>{booking.service_category}</p>
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
                    {booking.timeSlot}
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
                    {booking.address.street}
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
                  {booking.staff?.firstName} {booking.staff?.lastName}
                </span>
                {booking.staff?.phone && (
                  <div className={styles.modal__providerContact}>
                    <Phone size={12} />
                    <span>{booking.staff?.phone || "+234 801 234 5678"}</span>
                  </div>
                )}
                {booking.staff?.email && (
                  <div className={styles.modal__providerContact}>
                    <Mail size={12} />
                    <span>
                      {booking.staff?.email || "provider@metromellow.com"}
                    </span>
                  </div>
                )}
              </div>
              {booking.status === BookingStatus.Paused ||
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
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
              {/* {booking.serviceDetails.recurring && (
                <div className={styles.modal__priceNote}>
                  <AlertCircle size={12} />
                  <span>Billed {booking.frequency?.toLowerCase()}</span>
                </div>
              )} */}
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
              {booking.feedback ? (
                <div className={styles.modal__rating}>
                  <div className={styles.modal__stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= booking.feedback?.rating!
                            ? styles["modal__star--filled"]
                            : ""
                        }
                      />
                    ))}
                  </div>
                  <span className={styles.modal__ratingText}>
                    {booking.feedback?.rating}/5 - Service completed
                    successfully
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
        {renderFooterButtons()}
        {/* {booking.status === BookingStatus.Paused ||
        booking.status === BookingStatus.Confirmed ? (
      
        ) : booking.status === BookingStatus.Completed ? (
 
        ) : booking.status === BookingStatus.Pending ? (
   
        ) : (
          <motion.button
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        )} */}
      </div>

      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        booking={booking}
      />
      <ConfirmActionModal
        actionType={confirmationActionType}
        isOpen={isConfirmActionModalOpen}
        onClose={() => setIsConfirmActionModalOpen(false)}
        booking={booking}
      />
    </ModalDrawer>
  );
};

export default BookingDetailModal;
