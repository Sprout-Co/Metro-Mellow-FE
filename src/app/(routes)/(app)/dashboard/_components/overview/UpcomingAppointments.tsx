"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import styles from "./UpcomingAppointments.module.scss";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { BookingStatus, Booking } from "@/graphql/api";

export default function UpcomingAppointments() {
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(
    null
  );
  const { currentCustomerBookings, handleGetCustomerBookings } =
    useBookingOperations();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const calculateHoursLeft = (dateStr: string) => {
    const appointmentDate = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.round(
      (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    );
    return Math.max(0, diffHours);
  };

  const toggleAppointment = (id: string) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(id);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__loading}>
          <Icon
            name="refresh-cw"
            className={styles.appointments__loadingIcon}
          />
          <span>Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__error}>
          <Icon name="x" className={styles.appointments__errorIcon} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!currentCustomerBookings || currentCustomerBookings.length === 0) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__empty}>
          <Icon name="calendar" className={styles.appointments__emptyIcon} />
          <span>No upcoming appointments</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appointments}>
      {currentCustomerBookings.map((appointment: Booking) => (
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
              currentCustomerBookings.findIndex(
                (a: Booking) => a.id === appointment.id
              ) * 0.1,
          }}
        >
          <div
            className={styles.appointments__header}
            onClick={() => toggleAppointment(appointment.id)}
          >
            <div className={styles.appointments__serviceIcon}>
              {/* <Icon
                name={
                  appointment.service.name.toLowerCase().includes("cleaning")
                    ? "home"
                    : appointment.service.name.toLowerCase().includes("laundry")
                      ? "refresh-cw"
                      : appointment.service.name
                            .toLowerCase()
                            .includes("cooking")
                        ? "coffee"
                        : appointment.service.name
                              .toLowerCase()
                              .includes("pest")
                          ? "shield"
                          : "package"
                }
              /> */}
            </div>

            <div className={styles.appointments__details}>
              <h3 className={styles.appointments__service}>
                {appointment.service?.name}
              </h3>
              <div className={styles.appointments__meta}>
                <span className={styles.appointments__date}>
                  <Icon name="calendar" />
                  {formatDate(appointment.date)}
                </span>
                <span className={styles.appointments__time}>
                  <Icon name="clock" />
                  {appointment.timeSlot}
                </span>
              </div>
            </div>

            <div className={styles.appointments__timer}>
              <div className={styles.appointments__countdown}>
                <span className={styles.appointments__hours}>
                  {calculateHoursLeft(appointment.date)}h
                </span>
              </div>
              <button className={styles.appointments__expand}>
                <Icon
                  name={
                    expandedAppointment === appointment.id
                      ? "chevron-up"
                      : "chevron-down"
                  }
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {expandedAppointment === appointment.id && (
              <motion.div
                className={styles.appointments__content}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.appointments__provider}>
                  <div className={styles.appointments__providerAvatar}>
                    <span>
                      {appointment.staff?.firstName?.[0]}
                      {appointment.staff?.lastName?.[0] || "NA"}
                    </span>
                  </div>
                  <div className={styles.appointments__providerInfo}>
                    <span className={styles.appointments__providerName}>
                      {appointment.staff
                        ? `${appointment.staff.firstName} ${appointment.staff.lastName}`
                        : "Not assigned"}
                    </span>
                    <span className={styles.appointments__providerTitle}>
                      Service Professional
                    </span>
                  </div>
                </div>

                <div className={styles.appointments__location}>
                  <Icon name="map-pin" />
                  <span>{`${appointment.address.street}, ${appointment.address.city}, ${appointment.address.state} ${appointment.address.zipCode}`}</span>
                </div>

                <div className={styles.appointments__status}>
                  <span
                    className={`${styles.appointments__badge} ${
                      styles[
                        `appointments__badge--${appointment.status.toLowerCase()}`
                      ]
                    }`}
                  >
                    {appointment.status === BookingStatus.Confirmed
                      ? "Confirmed"
                      : appointment.status === BookingStatus.Pending
                        ? "Pending Confirmation"
                        : appointment.status === BookingStatus.Cancelled
                          ? "Cancelled"
                          : appointment.status === BookingStatus.Completed
                            ? "Completed"
                            : "Unknown"}
                  </span>
                </div>

                <div className={styles.appointments__actions}>
                  {appointment.status === BookingStatus.Confirmed && (
                    <>
                      <button
                        className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--reschedule"]}`}
                      >
                        <Icon name="calendar" />
                        Reschedule
                      </button>
                      <button
                        className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--cancel"]}`}
                      >
                        <Icon name="x" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <div className={styles.appointments__footer}>
        <button className={styles.appointments__viewAll}>
          View All Appointments
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}
