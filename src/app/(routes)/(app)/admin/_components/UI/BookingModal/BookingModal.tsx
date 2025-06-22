"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import StatusBadge from "../StatusBadge/StatusBadge";
import { Booking, BookingStatus } from "@/graphql/api";
import styles from "./BookingModal.module.scss";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  mode: "view" | "edit";
  onStatusUpdate?: (bookingId: string, status: BookingStatus) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  booking,
  mode,
  onStatusUpdate,
}: BookingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeSlot: unknown) => {
    if (!timeSlot || typeof timeSlot !== "object") return "N/A";
    const slot = timeSlot as { startTime?: string; endTime?: string };
    return `${slot.startTime || ""} - ${slot.endTime || ""}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case BookingStatus.Pending:
        return "pending";
      case BookingStatus.Confirmed:
        return "active";
      case BookingStatus.InProgress:
        return "active";
      case BookingStatus.Completed:
        return "completed";
      case BookingStatus.Cancelled:
        return "cancelled";
      default:
        return "pending";
    }
  };

  const customerName = `${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`.trim() || "N/A";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.booking_modal__backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.booking_modal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.booking_modal__header}>
              <div className={styles.booking_modal__title_section}>
                <h2 className={styles.booking_modal__title}>
                  Booking #{booking.id.slice(-8)}
                </h2>
                <StatusBadge
                  status={getStatusColor(booking.status) as any}
                  label={booking.status.replace(/([A-Z])/g, " $1").trim()}
                />
              </div>
              <button
                className={styles.booking_modal__close}
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className={styles.booking_modal__body}>
              <div className={styles.booking_modal__section}>
                <h3 className={styles.booking_modal__section_title}>Customer Information</h3>
                <div className={styles.booking_modal__info_grid}>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Name:</span>
                    <span className={styles.booking_modal__value}>{customerName}</span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Email:</span>
                    <span className={styles.booking_modal__value}>{booking.customer?.email || "N/A"}</span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Phone:</span>
                    <span className={styles.booking_modal__value}>{booking.customer?.phoneNumber || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className={styles.booking_modal__section}>
                <h3 className={styles.booking_modal__section_title}>Service Details</h3>
                <div className={styles.booking_modal__info_grid}>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Service:</span>
                    <span className={styles.booking_modal__value}>{booking.service?.name || "N/A"}</span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Category:</span>
                    <span className={styles.booking_modal__value}>{booking.service?.category || "N/A"}</span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Price:</span>
                    <span className={`${styles.booking_modal__value} ${styles.booking_modal__price}`}>
                      ${booking.totalPrice?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.booking_modal__section}>
                <h3 className={styles.booking_modal__section_title}>Schedule</h3>
                <div className={styles.booking_modal__info_grid}>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Date:</span>
                    <span className={styles.booking_modal__value}>{formatDate(booking.date)}</span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Time:</span>
                    <span className={styles.booking_modal__value}>{formatTime(booking.timeSlot)}</span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Duration:</span>
                    <span className={styles.booking_modal__value}>{booking.service?.duration || "N/A"} minutes</span>
                  </div>
                </div>
              </div>

              <div className={styles.booking_modal__section}>
                <h3 className={styles.booking_modal__section_title}>Address</h3>
                <div className={styles.booking_modal__address}>
                  {booking.address ? (
                    <>
                      <div>{booking.address.street}</div>
                      <div>{booking.address.city}, {booking.address.state} {booking.address.zipCode}</div>
                      <div>{booking.address.country}</div>
                    </>
                  ) : (
                    <div>No address provided</div>
                  )}
                </div>
              </div>

              {booking.specialInstructions && (
                <div className={styles.booking_modal__section}>
                  <h3 className={styles.booking_modal__section_title}>Special Instructions</h3>
                  <div className={styles.booking_modal__instructions}>
                    {booking.specialInstructions}
                  </div>
                </div>
              )}

              {booking.assignedStaff && (
                <div className={styles.booking_modal__section}>
                  <h3 className={styles.booking_modal__section_title}>Assigned Staff</h3>
                  <div className={styles.booking_modal__staff}>
                    <div className={styles.booking_modal__staff_name}>
                      {booking.assignedStaff.firstName} {booking.assignedStaff.lastName}
                    </div>
                    <div className={styles.booking_modal__staff_email}>
                      {booking.assignedStaff.email}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.booking_modal__section}>
                <h3 className={styles.booking_modal__section_title}>Booking Details</h3>
                <div className={styles.booking_modal__info_grid}>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Created:</span>
                    <span className={styles.booking_modal__value}>
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className={styles.booking_modal__info_item}>
                    <span className={styles.booking_modal__label}>Updated:</span>
                    <span className={styles.booking_modal__value}>
                      {new Date(booking.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.booking_modal__footer}>
              <Button variant="secondary" size="medium" onClick={onClose}>
                Close
              </Button>
              {mode === "edit" && onStatusUpdate && (
                <div className={styles.booking_modal__actions}>
                  {booking.status !== BookingStatus.Completed && booking.status !== BookingStatus.Cancelled && (
                    <>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={() => onStatusUpdate(booking.id, BookingStatus.Confirmed)}
                        disabled={booking.status === BookingStatus.Confirmed}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={() => onStatusUpdate(booking.id, BookingStatus.InProgress)}
                        disabled={booking.status === BookingStatus.InProgress}
                      >
                        Start
                      </Button>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={() => onStatusUpdate(booking.id, BookingStatus.Completed)}
                      >
                        Complete
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}