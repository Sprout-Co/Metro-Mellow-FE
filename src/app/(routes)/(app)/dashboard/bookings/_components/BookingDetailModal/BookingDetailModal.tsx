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
import {
  ServiceCategory,
  BookingStatus,
  Booking,
  PaymentStatus,
} from "@/graphql/api";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import RescheduleModal from "../RescheduleModal/RescheduleModal";
import ConfirmActionModal, {
  ActionType,
} from "../ConfirmActionModal/ConfirmActionModal";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import ModalDrawerHeader from "@/components/ui/ModalDrawer/ModalDrawerHeader/ModalDrawerHeader";

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  refetchBookings?: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  isOpen,
  onClose,
  booking,
  refetchBookings,
}) => {
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] =
    useState(false);
  const [confirmationActionType, setConfirmationActionType] =
    useState<ActionType>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
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

  // Get payment status color
  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      [PaymentStatus.Paid]: "paid",
      [PaymentStatus.Completed]: "paid",
      [PaymentStatus.Pending]: "paymentPending",
      [PaymentStatus.Failed]: "failed",
      [PaymentStatus.Refunded]: "refunded",
      [PaymentStatus.PartiallyRefunded]: "partiallyRefunded",
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

  function handleConfirmActionSuccess(reason?: string) {
    console.log("Action completed:", confirmationActionType, reason);

    // Close the detail modal
    onClose();

    // Refresh the bookings data
    if (refetchBookings) {
      refetchBookings();
    }
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
              onClick={() => handleConfirmAction("resume")}
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
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFeedbackModalOpen(true)}
            >
              <MessageSquare size={14} />
              Leave Feedback
            </motion.button>
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

  const footerContent = (
    <div className={styles.modal__footer}>{renderFooterButtons()}</div>
  );

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
      title={booking.service.name}
      description={booking.service_category}
      showFooter={true}
      footer={footerContent}
    >
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
            <h3 className={styles.modal__sectionTitle}>Pricing & Payment</h3>
            <div className={styles.modal__priceCard}>
              <div className={styles.modal__priceRow}>
                <span className={styles.modal__priceLabel}>Service Fee</span>
                <span className={styles.modal__priceValue}>
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
              <div className={styles.modal__priceRow}>
                <span className={styles.modal__priceLabel}>Payment Status</span>
                <span
                  className={`${styles.modal__paymentStatus} ${
                    styles[
                      `modal__paymentStatus--${getPaymentStatusColor(booking.paymentStatus)}`
                    ]
                  }`}
                >
                  {(booking.paymentStatus === PaymentStatus.Paid ||
                    booking.paymentStatus === PaymentStatus.Completed) && (
                    <CheckCircle size={12} />
                  )}
                  {booking.paymentStatus === PaymentStatus.Pending && (
                    <AlertCircle size={12} />
                  )}
                  {booking.paymentStatus === PaymentStatus.Failed && (
                    <X size={12} />
                  )}
                  {(booking.paymentStatus === PaymentStatus.Refunded ||
                    booking.paymentStatus ===
                      PaymentStatus.PartiallyRefunded) && (
                    <RefreshCw size={12} />
                  )}
                  {booking.paymentStatus}
                </span>
              </div>
              <div className={styles.modal__priceRow}>
                <span className={styles.modal__priceLabel}>Booking Status</span>
                <span
                  className={`${styles.modal__bookingStatus} ${
                    styles[
                      `modal__bookingStatus--${getStatusColor(booking.status)}`
                    ]
                  }`}
                >
                  {booking.status === BookingStatus.Confirmed && (
                    <CheckCircle size={12} />
                  )}
                  {booking.status === BookingStatus.Pending && (
                    <AlertCircle size={12} />
                  )}
                  {booking.status === BookingStatus.Paused && (
                    <Pause size={12} />
                  )}
                  {booking.status === BookingStatus.Completed && (
                    <CheckCircle size={12} />
                  )}
                  {booking.status === BookingStatus.Cancelled && (
                    <X size={12} />
                  )}
                  {booking.status === BookingStatus.InProgress && (
                    <RefreshCw size={12} />
                  )}
                  {booking.status}
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
                <div className={styles.modal__feedback}>
                  <div className={styles.modal__feedbackHeader}>
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
                          fill={
                            star <= booking.feedback?.rating!
                              ? "#FFD700"
                              : "transparent"
                          }
                          stroke={
                            star <= booking.feedback?.rating!
                              ? "#FFD700"
                              : "#E0E7FF"
                          }
                        />
                      ))}
                    </div>
                    <span className={styles.modal__ratingText}>
                      {booking.feedback?.rating}/5 stars
                    </span>
                  </div>
                  {booking.feedback?.comment && (
                    <div className={styles.modal__feedbackComment}>
                      <p>"{booking.feedback.comment}"</p>
                    </div>
                  )}
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
        onConfirm={handleConfirmActionSuccess}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        booking={booking}
      />
    </ModalDrawer>
  );
};

export default BookingDetailModal;
