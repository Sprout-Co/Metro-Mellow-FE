"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import styles from "./UpcomingAppointments.module.scss";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  BookingStatus,
  TimeSlot,
  GetCustomerBookingsQuery,
} from "@/graphql/api";
import { useRouter } from "next/navigation"; // Import router
import Modal from "@/components/ui/Modal/Modal";
import RescheduleServiceModal from "./RescheduleServiceModal";

// Helper function to get time slot hours and minutes
const getTimeSlotTime = (timeSlot: TimeSlot) => {
  switch (timeSlot) {
    case TimeSlot.Morning:
      return { hours: 9, minutes: 0 };
    case TimeSlot.Afternoon:
      return { hours: 13, minutes: 0 };
    case TimeSlot.Evening:
      return { hours: 17, minutes: 0 };
    default:
      return { hours: 9, minutes: 0 };
  }
};

type CustomerBooking = NonNullable<
  GetCustomerBookingsQuery["customerBookings"]
>[number];

export default function UpcomingAppointments() {
  const router = useRouter(); // Initialize router
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(
    null
  );
  const [showAll, setShowAll] = useState(false);
  // Add filter state
  const [filter, setFilter] = useState<
    "upcoming" | "past" | "cancelled" | "paused" | "all"
  >("upcoming");
  const {
    currentCustomerBookings,
    handleGetCustomerBookings,
    handleCancelBooking,
  } = useBookingOperations();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        await handleGetCustomerBookings();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch appointments"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [handleGetCustomerBookings]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string, timeSlot: TimeSlot) => {
    // Convert timeSlot enum to approximate time range
    let timeRange = "";
    switch (timeSlot) {
      case TimeSlot.Morning:
        timeRange = "8:00 AM - 12:00 PM (Morning)";
        break;
      case TimeSlot.Afternoon:
        timeRange = "12:00 PM - 4:00 PM (Afternoon)";
        break;
      case TimeSlot.Evening:
        timeRange = "4:00 PM - 8:00 PM (Evening)";
        break;
      default:
        timeRange = "Time not specified";
    }
    return timeRange;
  };

  const calculateHoursLeft = (dateStr: string) => {
    const appointmentDate = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.round(
      (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    );
    return diffHours;
  };

  const getTimeLeft = (date: string, timeSlot: TimeSlot) => {
    const now = new Date();
    const appointmentDate = new Date(date);
    const appointmentTime = getTimeSlotTime(timeSlot);
    appointmentDate.setHours(
      appointmentTime.hours,
      appointmentTime.minutes,
      0,
      0
    );

    const diff = appointmentDate.getTime() - now.getTime();
    const isPast = diff < 0;
    const isToday = appointmentDate.toDateString() === now.toDateString();
    const isImminent = isToday && diff > 0 && diff <= 2 * 60 * 60 * 1000; // Within 2 hours

    if (isPast) {
      return {
        label: "Completed",
        isImminent: false,
        status: "COMPLETED",
      };
    }

    if (isImminent) {
      return {
        label: "Starting soon",
        isImminent: true,
        status: "PENDING",
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return {
        label: `${days} day${days > 1 ? "s" : ""} left`,
        isImminent: false,
        status: "PENDING",
      };
    }

    return {
      label: `${hours} hour${hours > 1 ? "s" : ""} left`,
      isImminent: false,
      status: "PENDING",
    };
  };

  const getServiceIcon = (serviceName?: string) => {
    if (!serviceName) return "package";

    if (serviceName.toLowerCase().includes("cleaning")) return "home";
    if (serviceName.toLowerCase().includes("laundry")) return "refresh-cw";
    if (serviceName.toLowerCase().includes("cooking")) return "coffee";
    if (serviceName.toLowerCase().includes("pest")) return "shield";
    return "package";
  };

  const toggleAppointment = (id: string) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(id);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Navigate to detailed view
  const navigateToAppointmentDetails = (id: string) => {
    router.push(`/dashboard/appointments/${id}`);
  };

  // Sort appointments by date (closest first)
  const sortedAppointments = [...(currentCustomerBookings || [])].sort(
    (a: CustomerBooking, b: CustomerBooking) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    }
  );

  // Filter appointments based on status and time
  const filterAppointments = (appointment: CustomerBooking) => {
    // Get time status
    const { status: timeStatus } = getTimeLeft(
      appointment.date,
      appointment.timeSlot
    );

    if (filter === "upcoming") {
      // For upcoming: not completed, not cancelled, and not past
      return (
        appointment.status !== BookingStatus.Completed &&
        appointment.status !== BookingStatus.Cancelled &&
        appointment.status !== BookingStatus.Paused &&
        timeStatus !== BookingStatus.Completed
      );
    } else if (filter === "past") {
      // For past: completed status or time has passed (but not cancelled)
      return (
        appointment.status === BookingStatus.Completed ||
        timeStatus === BookingStatus.Completed
      );
    } else if (filter === "cancelled") {
      // For cancelled: only show cancelled appointments
      return appointment.status === BookingStatus.Cancelled;
    } else if (filter === "paused") {
      // For paused: only show paused appointments
      return appointment.status === BookingStatus.Paused;
    } else {
      // For all: show everything
      return true;
    }
  };

  const filteredAppointments = sortedAppointments.filter(filterAppointments);

  // Display either all appointments or just the 5 most imminent ones
  const displayedAppointments = showAll
    ? filteredAppointments
    : filteredAppointments.slice(0, 5);

  const handleCancelClick = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointmentId) return;

    try {
      setIsCancelling(true);
      await handleCancelBooking(selectedAppointmentId);
      setShowCancelModal(false);
      setShowSuccessModal(true);
      // Refresh the bookings list
      await handleGetCustomerBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__loading}>
          <div className={styles.appointments__spinner}></div>
          <span>Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__error}>
          <Icon
            name="alert-circle"
            className={styles.appointments__errorIcon}
          />
          <span>{error}</span>
          <button
            className={styles.appointments__retryBtn}
            onClick={() => handleGetCustomerBookings()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!filteredAppointments || filteredAppointments.length === 0) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__header}>
          <h2 className={styles.appointments__title}>
            {filter === "upcoming"
              ? "Upcoming"
              : filter === "past"
                ? "Past"
                : filter === "cancelled"
                  ? "Cancelled"
                  : filter === "paused"
                    ? "Paused"
                    : "All"}{" "}
            Appointments
            <span className={styles.appointments__count}>0</span>
          </h2>

          {/* Add filter tabs */}
          <div className={styles.appointments__filters}>
            <button
              className={`${styles.appointments__filterBtn} ${filter === "upcoming" ? styles.appointments__filterBtn_active : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === "past" ? styles.appointments__filterBtn_active : ""}`}
              onClick={() => setFilter("past")}
            >
              Past
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === "cancelled" ? styles.appointments__filterBtn_active : ""}`}
              onClick={() => setFilter("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === "paused" ? styles.appointments__filterBtn_active : ""}`}
              onClick={() => setFilter("paused")}
            >
              Paused
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === "all" ? styles.appointments__filterBtn_active : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </div>
        </div>

        <div className={styles.appointments__empty}>
          <div className={styles.appointments__emptyIcon}>
            <Icon name="calendar" />
          </div>
          <h3 className={styles.appointments__emptyTitle}>
            No{" "}
            {filter === "upcoming"
              ? "Upcoming"
              : filter === "past"
                ? "Past"
                : filter === "cancelled"
                  ? "Cancelled"
                  : filter === "paused"
                    ? "Paused"
                    : "All"}{" "}
            Appointments
          </h3>
          <p className={styles.appointments__emptyText}>
            {filter === "upcoming"
              ? "You don't have any scheduled appointments at the moment."
              : filter === "past"
                ? "You don't have any past appointments."
                : filter === "cancelled"
                  ? "You don't have any cancelled appointments."
                  : filter === "paused"
                    ? "You don't have any paused appointments."
                    : "You don't have any appointments."}
          </p>
          {filter === "upcoming" && (
            <button
              className={styles.appointments__scheduleBtn}
              onClick={() => router.push("/dashboard/book-service")}
            >
              Schedule Service
              <Icon name="arrow-right" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.appointments}>
        <div className={styles.appointments__header}>
          <h2 className={styles.appointments__title}>
            {filter === "upcoming"
              ? "Upcoming"
              : filter === "past"
                ? "Past"
                : filter === "cancelled"
                  ? "Cancelled"
                  : filter === "paused"
                    ? "Paused"
                    : "All"}{" "}
            Appointments
            <span className={styles.appointments__count}>
              {filteredAppointments.length}
            </span>
          </h2>

          {/* Add filter tabs */}
          <div className={styles.appointments__filters}>
            <button
              className={`${styles.appointments__filterBtn} ${
                filter === "upcoming"
                  ? styles.appointments__filterBtn_active
                  : ""
              }`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${
                filter === "past" ? styles.appointments__filterBtn_active : ""
              }`}
              onClick={() => setFilter("past")}
            >
              Past
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${
                filter === "cancelled"
                  ? styles.appointments__filterBtn_active
                  : ""
              }`}
              onClick={() => setFilter("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${
                filter === "paused" ? styles.appointments__filterBtn_active : ""
              }`}
              onClick={() => setFilter("paused")}
            >
              Paused
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${
                filter === "all" ? styles.appointments__filterBtn_active : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </div>
        </div>

        <div className={styles.appointments__list}>
          {displayedAppointments.map((appointment: CustomerBooking) => {
            const {
              label: timeLeftLabel,
              isImminent,
              status,
            } = getTimeLeft(appointment.date, appointment.timeSlot);

            // Override the appointment status if it's completed based on time
            const displayStatus =
              status === "COMPLETED" ? "COMPLETED" : appointment.status;

            return (
              <motion.div
                key={appointment.id}
                className={styles.appointments__card}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay:
                    displayedAppointments.findIndex(
                      (a: CustomerBooking) => a.id === appointment.id
                    ) * 0.1,
                }}
              >
                <div className={styles.appointments__cardContent}>
                  <div className={styles.appointments__mainInfo}>
                    <div
                      className={`${styles.appointments__serviceIcon} ${isImminent ? styles["appointments__serviceIcon--imminent"] : ""}`}
                    >
                      <Icon name={getServiceIcon(appointment.service?.name)} />
                    </div>

                    <div className={styles.appointments__infoContainer}>
                      <div className={styles.appointments__infoRow}>
                        <h3 className={styles.appointments__service}>
                          {appointment.service?.name || "Service"}
                        </h3>
                        <span
                          className={`${styles.appointments__status} ${
                            styles[
                              `appointments__status--${displayStatus.toLowerCase()}`
                            ]
                          }`}
                        >
                          {displayStatus.replace(/_/g, " ")}
                        </span>
                      </div>

                      <div className={styles.appointments__infoRow}>
                        <div className={styles.appointments__dateTime}>
                          <span className={styles.appointments__date}>
                            <Icon name="calendar" />
                            {formatDate(appointment.date)}
                          </span>
                          <span className={styles.appointments__time}>
                            <Icon name="clock" />
                            {formatTime(appointment.date, appointment.timeSlot)}
                          </span>
                        </div>

                        <span
                          className={`${styles.appointments__countdown} ${
                            isImminent
                              ? styles["appointments__countdown--imminent"]
                              : ""
                          } ${
                            displayStatus === "COMPLETED"
                              ? styles["appointments__countdown--completed"]
                              : ""
                          }`}
                        >
                          {timeLeftLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={styles.appointments__expandBtn}
                    onClick={() => toggleAppointment(appointment.id)}
                    aria-label={
                      expandedAppointment === appointment.id
                        ? "Hide details"
                        : "Show details"
                    }
                  >
                    <Icon
                      name={
                        expandedAppointment === appointment.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {expandedAppointment === appointment.id && (
                    <motion.div
                      className={styles.appointments__details}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.appointments__detailsGrid}>
                        <div className={styles.appointments__detailsColumn}>
                          <div className={styles.appointments__detailsSection}>
                            <h4 className={styles.appointments__detailsTitle}>
                              <Icon name="user" />
                              Service Provider
                            </h4>
                            {appointment.staff ? (
                              <div className={styles.appointments__provider}>
                                <div
                                  className={
                                    styles.appointments__providerAvatar
                                  }
                                >
                                  <span>
                                    {appointment.staff.firstName?.[0]}
                                    {appointment.staff.lastName?.[0]}
                                  </span>
                                </div>
                                <div
                                  className={styles.appointments__providerInfo}
                                >
                                  <span
                                    className={
                                      styles.appointments__providerName
                                    }
                                  >
                                    {`${appointment.staff.firstName} ${appointment.staff.lastName}`}
                                  </span>
                                  <span
                                    className={
                                      styles.appointments__providerRole
                                    }
                                  >
                                    Professional {appointment.serviceType}{" "}
                                    Specialist
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.appointments__unassigned}>
                                <Icon name="alert-circle" />
                                Provider will be assigned soon
                              </div>
                            )}
                          </div>

                          <div className={styles.appointments__detailsSection}>
                            <h4 className={styles.appointments__detailsTitle}>
                              <Icon name="map-pin" />
                              Service Location
                            </h4>
                            <address className={styles.appointments__address}>
                              {`${appointment.address.street}, ${appointment.address.city}, ${appointment.address.state} ${appointment.address.zipCode}`}
                            </address>
                          </div>
                        </div>

                        <div className={styles.appointments__detailsColumn}>
                          <div className={styles.appointments__detailsSection}>
                            <h4 className={styles.appointments__detailsTitle}>
                              <Icon name="info" />
                              Additional Information
                            </h4>
                            <div className={styles.appointments__notes}>
                              {appointment.notes ||
                                "No additional notes for this service."}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.appointments__actions}>
                        {appointment.status === BookingStatus.Pending ||
                        appointment.status === BookingStatus.Paused ? (
                          <>
                            <button
                              className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--reschedule"]}`}
                              onClick={() => {
                                setSelectedAppointmentId(appointment.id);
                                setShowRescheduleModal(true);
                              }}
                            >
                              <Icon name="calendar" />
                              Reschedule
                            </button>
                            <button
                              className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--cancel"]}`}
                              onClick={() => handleCancelClick(appointment.id)}
                            >
                              <Icon name="x" />
                              Cancel
                            </button>
                          </>
                        ) : null}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filteredAppointments.length > 5 && (
          <div className={styles.appointments__footer}>
            <button
              className={styles.appointments__viewAllBtn}
              onClick={toggleShowAll}
            >
              {showAll ? (
                <>
                  Show Less
                  <Icon name="chevron-up" />
                </>
              ) : (
                <>
                  Show All Appointments ({filteredAppointments.length})
                  <Icon name="chevron-down" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Appointment"
        maxWidth="400px"
      >
        <div className={styles.appointments__modalContent}>
          <p>Are you sure you want to cancel this appointment?</p>
          <div className={styles.appointments__modalActions}>
            <button
              className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--cancel"]}`}
              onClick={() => setShowCancelModal(false)}
              disabled={isCancelling}
            >
              No, Keep It
            </button>
            <button
              className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--confirm"]}`}
              onClick={handleConfirmCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Yes, Cancel It"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Appointment Cancelled"
        maxWidth="400px"
      >
        <div className={styles.appointments__modalContent}>
          <div className={styles.appointments__successIcon}>
            <Icon name="check-circle" />
          </div>
          <p>Your appointment has been successfully cancelled.</p>
          <button
            className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--primary"]}`}
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Reschedule Modal */}
      <RescheduleServiceModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        bookingId={selectedAppointmentId || undefined}
      />
    </>
  );
}
