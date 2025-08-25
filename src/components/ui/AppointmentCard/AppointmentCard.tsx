"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./AppointmentCard.module.scss";
import { Booking, ServiceCategory, BookingStatus } from "@/graphql/api";

interface AppointmentCardProps {
  booking?: Booking | null;
  className?: string;
  variant?: "header" | "standalone";
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  booking,
  className = "",
  variant = "header",
}) => {
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

  const formatServiceDate = (date: string | Date, timeSlot?: string) => {
    const bookingDate = new Date(date);
    const now = new Date();
    const diffTime = bookingDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let dateLabel = "";
    if (diffDays === 0) {
      dateLabel = "Today";
    } else if (diffDays === 1) {
      dateLabel = "Tomorrow";
    } else if (diffDays <= 7) {
      dateLabel = `In ${diffDays} days`;
    } else {
      dateLabel = bookingDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    let timeLabel = "";
    if (timeSlot) {
      timeLabel = timeSlot;
    } else {
      timeLabel = bookingDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    return `${dateLabel} - ${timeLabel}`;
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Confirmed:
        return "Confirmed";
      case BookingStatus.Pending:
        return "Pending";
      case BookingStatus.InProgress:
        return "In Progress";
      case BookingStatus.Completed:
        return "Completed";
      case BookingStatus.Cancelled:
        return "Cancelled";
      case BookingStatus.Paused:
        return "Paused";
      default:
        return "Scheduled";
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Confirmed:
        return "success";
      case BookingStatus.Pending:
        return "warning";
      case BookingStatus.InProgress:
        return "info";
      case BookingStatus.Completed:
        return "success";
      case BookingStatus.Cancelled:
      case BookingStatus.Paused:
        return "error";
      default:
        return "neutral";
    }
  };

  if (!booking)
    return (
      <motion.div
        className={styles.appointmentCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={styles.appointmentCard__icon}>🏠</div>
        <div className={styles.appointmentCard__info}>
          <h3 className={styles.appointmentCard__serviceName}>
            No upcoming services
          </h3>
          <p className={styles.appointmentCard__serviceDate}>
            Book your first service or set up a subscription to get started!
          </p>
        </div>
      </motion.div>
    );
  // Extract data from booking object
  const serviceName = booking.service?.name || booking.serviceOption;
  const serviceCategory = booking.service_category;
  const date = booking.date;
  const timeSlot = booking.timeSlot;
  const status = booking.status;
  const provider = booking.staff
    ? `${booking.staff.firstName} ${booking.staff.lastName}`
    : undefined;

  return (
    <motion.div
      className={`${styles.appointmentCard} ${styles[`appointmentCard--${variant}`]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <div className={styles.appointmentCard__icon}>
        {getServiceIcon(serviceCategory)}
      </div>
      <div className={styles.appointmentCard__info}>
        <h3 className={styles.appointmentCard__serviceName}>{serviceName}</h3>
        <p className={styles.appointmentCard__serviceDate}>
          {formatServiceDate(date, timeSlot)}
        </p>
        {provider && provider !== "Pending Assignment" && (
          <p className={styles.appointmentCard__serviceStaff}>
            with {provider}
          </p>
        )}
      </div>
      <div className={styles.appointmentCard__status}>
        <span
          className={`${styles.appointmentCard__statusBadge} ${styles[`appointmentCard__statusBadge--${getStatusColor(status)}`]}`}
        >
          {getStatusText(status)}
        </span>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
