"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
//  import StatusBadge from "../StatusBadge/StatusBadge";
import { Booking, BookingStatus, TimeSlot } from "@/graphql/api";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./BookingModal.module.scss";
import { formatToNaira } from "@/utils/string";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  mode: "view" | "edit";
  onStatusUpdate?: (bookingId: string, status: BookingStatus) => void;
  onReschedule?: (bookingId: string, newDate: string, newTime: string) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  booking,
  mode,
  onStatusUpdate,
  onReschedule,
}: BookingModalProps) {
  const [activeTab, setActiveTab] = useState(
    mode === "edit" ? "reschedule" : "details"
  );
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTimeSlot, setRescheduleTimeSlot] = useState<TimeSlot>(
    TimeSlot.Morning
  );
  const [isRescheduling, setIsRescheduling] = useState(false);

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

  // Reset active tab when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(mode === "edit" ? "reschedule" : "details");

      // Prefill reschedule date with current booking date
      if (mode === "edit" && booking) {
        const currentDate = new Date(booking.date);
        const formattedDate = currentDate.toISOString().split("T")[0];
        setRescheduleDate(formattedDate);
      }
    }
  }, [isOpen, mode, booking]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReschedule = async () => {
    if (booking && onReschedule && rescheduleDate && rescheduleTimeSlot) {
      try {
        setIsRescheduling(true);

        // Convert TimeSlot to a time string for the API
        let timeString = "09:00"; // Default to 9 AM
        switch (rescheduleTimeSlot) {
          case TimeSlot.Morning:
            timeString = "09:00";
            break;
          case TimeSlot.Afternoon:
            timeString = "14:00";
            break;
          case TimeSlot.Evening:
            timeString = "18:00";
            break;
        }

        await onReschedule(booking.id, rescheduleDate, timeString);

        // Reset form and close modal
        setRescheduleDate("");
        setRescheduleTimeSlot(TimeSlot.Morning);
        setActiveTab("details");
        onClose();
      } catch (error) {
        console.error("Reschedule error:", error);
      } finally {
        setIsRescheduling(false);
      }
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

  const customerName =
    `${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`.trim() ||
    "N/A";

  const bookingTimeline = [
    {
      title: "Booking Created",
      date: new Date(booking.createdAt).toLocaleString(),
      status: "completed",
    },
    {
      title: "Confirmed",
      date:
        booking.status === BookingStatus.Confirmed ||
        booking.status === BookingStatus.InProgress ||
        booking.status === BookingStatus.Completed
          ? "Completed"
          : "Pending",
      status:
        booking.status === BookingStatus.Confirmed ||
        booking.status === BookingStatus.InProgress ||
        booking.status === BookingStatus.Completed
          ? "completed"
          : "pending",
    },
    {
      title: "Service Started",
      date:
        booking.status === BookingStatus.InProgress ||
        booking.status === BookingStatus.Completed
          ? "In Progress"
          : "Pending",
      status:
        booking.status === BookingStatus.InProgress ||
        booking.status === BookingStatus.Completed
          ? "completed"
          : booking.status === BookingStatus.Confirmed
            ? "active"
            : "pending",
    },
    {
      title: "Completed",
      date:
        booking.status === BookingStatus.Completed
          ? new Date(booking.updatedAt).toLocaleString()
          : "Pending",
      status:
        booking.status === BookingStatus.Completed ? "completed" : "pending",
    },
  ];

  const timeSlotOptions = [
    { value: TimeSlot.Morning, label: "Morning (6 AM - 12 PM)" },
    { value: TimeSlot.Afternoon, label: "Afternoon (12 PM - 6 PM)" },
    { value: TimeSlot.Evening, label: "Evening (6 PM - 12 AM)" },
  ];

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <div className={styles.booking_modal__header}>
              <div className={styles.booking_modal__header_content}>
                <div className={styles.booking_modal__header_top}>
                  <div className={styles.booking_modal__title_section}>
                    <h2 className={styles.booking_modal__title}>
                      Booking #{booking.id.slice(-8)}
                    </h2>
                    <p className={styles.booking_modal__subtitle}>
                      {booking.service?.name || "Service"} •{" "}
                      {formatDate(booking.date)}
                    </p>
                  </div>
                  <button
                    className={styles.booking_modal__close}
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
                <div className={styles.booking_modal__status_badge}>
                  {booking.status.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            </div>

            <div className={styles.booking_modal__tabs}>
              <button
                className={`${styles.booking_modal__tab} ${
                  activeTab === "details"
                    ? styles["booking_modal__tab--active"]
                    : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`${styles.booking_modal__tab} ${
                  activeTab === "timeline"
                    ? styles["booking_modal__tab--active"]
                    : ""
                }`}
                onClick={() => setActiveTab("timeline")}
              >
                Timeline
              </button>
              <button
                className={`${styles.booking_modal__tab} ${
                  activeTab === "notes"
                    ? styles["booking_modal__tab--active"]
                    : ""
                }`}
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>
              {mode === "edit" &&
                booking.status !== BookingStatus.Completed &&
                booking.status !== BookingStatus.Cancelled && (
                  <button
                    className={`${styles.booking_modal__tab} ${
                      activeTab === "reschedule"
                        ? styles["booking_modal__tab--active"]
                        : ""
                    }`}
                    onClick={() => setActiveTab("reschedule")}
                  >
                    Reschedule
                  </button>
                )}
            </div>

            <div className={styles.booking_modal__body}>
              {activeTab === "details" && (
                <motion.div
                  className={styles.booking_modal__content}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.booking_modal__grid}>
                    <div className={styles.booking_modal__section}>
                      <div className={styles.booking_modal__section_header}>
                        <div className={styles.booking_modal__section_icon}>
                          <Icon name="user" size={20} />
                        </div>
                        <h3 className={styles.booking_modal__section_title}>
                          Customer Information
                        </h3>
                      </div>
                      <div className={styles.booking_modal__info_list}>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Name
                          </span>
                          <span className={styles.booking_modal__value}>
                            {customerName}
                          </span>
                        </div>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Email
                          </span>
                          <span className={styles.booking_modal__value}>
                            {booking.customer?.email || "N/A"}
                          </span>
                        </div>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Phone
                          </span>
                          <span className={styles.booking_modal__value}>
                            {booking.customer.phone || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.booking_modal__section}>
                      <div className={styles.booking_modal__section_header}>
                        <div className={styles.booking_modal__section_icon}>
                          🧹
                        </div>
                        <h3 className={styles.booking_modal__section_title}>
                          Service Details
                        </h3>
                      </div>
                      <div className={styles.booking_modal__info_list}>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Service
                          </span>
                          <span className={styles.booking_modal__value}>
                            {booking.service?.name || "N/A"}
                          </span>
                        </div>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Category
                          </span>
                          <span className={styles.booking_modal__value}>
                            {booking.service?.category || "N/A"}
                          </span>
                        </div>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Duration
                          </span>
                          <span className={styles.booking_modal__value}>
                            {booking.timeSlot || "N/A"}
                          </span>
                        </div>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Price
                          </span>
                          <span
                            className={`${styles.booking_modal__value} ${styles["booking_modal__value--price"]}`}
                          >
                            {formatToNaira(booking.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.booking_modal__section}>
                      <div className={styles.booking_modal__section_header}>
                        <div className={styles.booking_modal__section_icon}>
                          <Icon name="calendar" size={20} />
                        </div>
                        <h3 className={styles.booking_modal__section_title}>
                          Schedule
                        </h3>
                      </div>
                      <div className={styles.booking_modal__info_list}>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Date
                          </span>
                          <span className={styles.booking_modal__value}>
                            {formatDate(booking.date)}
                          </span>
                        </div>
                        <div className={styles.booking_modal__info_item}>
                          <span className={styles.booking_modal__label}>
                            Time
                          </span>
                          <span className={styles.booking_modal__value}>
                            {formatTime(booking.timeSlot)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.booking_modal__section}>
                      <div className={styles.booking_modal__section_header}>
                        <div className={styles.booking_modal__section_icon}>
                          📍
                        </div>
                        <h3 className={styles.booking_modal__section_title}>
                          Location
                        </h3>
                      </div>
                      <div className={styles.booking_modal__info_list}>
                        {booking.address ? (
                          <>
                            <div className={styles.booking_modal__info_item}>
                              <span className={styles.booking_modal__label}>
                                Address
                              </span>
                              <span className={styles.booking_modal__value}>
                                {booking.address.street}
                              </span>
                            </div>
                            <div className={styles.booking_modal__info_item}>
                              <span className={styles.booking_modal__label}>
                                City
                              </span>
                              <span className={styles.booking_modal__value}>
                                {booking.address.city}, {booking.address.state}{" "}
                                {booking.address.zipCode}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className={styles.booking_modal__info_item}>
                            <span className={styles.booking_modal__value}>
                              No address provided
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "timeline" && (
                <motion.div
                  className={styles.booking_modal__timeline}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {bookingTimeline.map((item, index) => (
                    <div
                      key={index}
                      className={styles.booking_modal__timeline_item}
                    >
                      <div
                        className={`${styles.booking_modal__timeline_dot} ${
                          item.status === "completed"
                            ? styles["booking_modal__timeline_dot--completed"]
                            : item.status === "active"
                              ? styles["booking_modal__timeline_dot--active"]
                              : ""
                        }`}
                      />
                      <div className={styles.booking_modal__timeline_content}>
                        <h4 className={styles.booking_modal__timeline_title}>
                          {item.title}
                        </h4>
                        <p className={styles.booking_modal__timeline_date}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "notes" && (
                <motion.div
                  className={styles.booking_modal__content}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.booking_modal__section}>
                    <div className={styles.booking_modal__section_header}>
                      <div className={styles.booking_modal__section_icon}>
                        <Icon name="file-text" size={20} />
                      </div>
                      <h3 className={styles.booking_modal__section_title}>
                        Special Instructions
                      </h3>
                    </div>
                    <div className={styles.booking_modal__info_list}>
                      <p className={styles.booking_modal__value}>
                        {booking.notes || "No special instructions provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reschedule" && mode === "edit" && (
                <motion.div
                  className={styles.booking_modal__content}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.booking_modal__section}>
                    <div className={styles.booking_modal__section_header}>
                      <div className={styles.booking_modal__section_icon}>
                        <Icon name="calendar" size={20} />
                      </div>
                      <h3 className={styles.booking_modal__section_title}>
                        Reschedule Booking
                      </h3>
                    </div>
                    <div className={styles.booking_modal__reschedule_info}>
                      <div className={styles.booking_modal__current_schedule}>
                        <h4>Current Schedule</h4>
                        <p>Date: {formatDate(booking.date)}</p>
                        <p>Time: {formatTime(booking.timeSlot)}</p>
                      </div>

                      <div className={styles.booking_modal__reschedule_form}>
                        <div className={styles.booking_modal__form_group}>
                          <label className={styles.booking_modal__form_label}>
                            New Date
                          </label>
                          <input
                            type="date"
                            className={styles.booking_modal__form_input}
                            value={rescheduleDate}
                            onChange={(e) => setRescheduleDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        <div className={styles.booking_modal__form_group}>
                          <label className={styles.booking_modal__form_label}>
                            New Time Slot
                          </label>
                          <select
                            className={styles.booking_modal__form_input}
                            value={rescheduleTimeSlot}
                            onChange={(e) =>
                              setRescheduleTimeSlot(e.target.value as TimeSlot)
                            }
                          >
                            {timeSlotOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={styles.booking_modal__form_actions}>
                          <Button
                            variant="primary"
                            size="medium"
                            onClick={handleReschedule}
                            disabled={!rescheduleDate || isRescheduling}
                          >
                            {isRescheduling
                              ? "Rescheduling..."
                              : "Confirm Reschedule"}
                          </Button>
                          <Button
                            variant="outline"
                            size="medium"
                            onClick={() => {
                              setRescheduleDate("");
                              setRescheduleTimeSlot(TimeSlot.Morning);
                            }}
                            disabled={isRescheduling}
                          >
                            Reset Form
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className={styles.booking_modal__footer}>
              <div className={styles.booking_modal__actions}>
                <Button variant="secondary" size="medium" onClick={onClose}>
                  Close
                </Button>
                {mode === "edit" &&
                  onStatusUpdate &&
                  booking.status !== BookingStatus.Completed &&
                  booking.status !== BookingStatus.Cancelled && (
                    <>
                      {booking.status === BookingStatus.Pending && (
                        <Button
                          variant="primary"
                          size="medium"
                          onClick={() =>
                            onStatusUpdate(booking.id, BookingStatus.Confirmed)
                          }
                        >
                          Confirm Booking
                        </Button>
                      )}
                      {booking.status === BookingStatus.Confirmed && (
                        <Button
                          variant="primary"
                          size="medium"
                          onClick={() =>
                            onStatusUpdate(booking.id, BookingStatus.InProgress)
                          }
                        >
                          Start Service
                        </Button>
                      )}
                      {booking.status === BookingStatus.InProgress && (
                        <Button
                          variant="primary"
                          size="medium"
                          onClick={() =>
                            onStatusUpdate(booking.id, BookingStatus.Completed)
                          }
                        >
                          Complete Service
                        </Button>
                      )}
                      <Button
                        variant="tertiary"
                        size="medium"
                        onClick={() =>
                          onStatusUpdate(booking.id, BookingStatus.Cancelled)
                        }
                      >
                        Cancel Booking
                      </Button>
                    </>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
