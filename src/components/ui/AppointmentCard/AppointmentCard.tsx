"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./AppointmentCard.module.scss";
import {
  Booking,
  ServiceCategory as GraphQLServiceCategory,
  BookingStatus as GraphQLBookingStatus,
} from "@/graphql/api";

interface AppointmentCardProps {
  booking: Booking;
  className?: string;
  variant?: "header" | "standalone";
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  booking,
  className = "",
  variant = "header",
}) => {
  const getServiceIcon = (service_category: GraphQLServiceCategory) => {
    const icons = {
      [GraphQLServiceCategory.Cleaning]: "🧹",
      [GraphQLServiceCategory.Laundry]: "👕",
      [GraphQLServiceCategory.Cooking]: "🍳",
      [GraphQLServiceCategory.Errands]: "📦",
      [GraphQLServiceCategory.PestControl]: "🐛",
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

  const getStatusText = (status: GraphQLBookingStatus) => {
    switch (status) {
      case GraphQLBookingStatus.Confirmed:
        return "Confirmed";
      case GraphQLBookingStatus.Pending:
        return "Pending";
      case GraphQLBookingStatus.InProgress:
        return "In Progress";
      case GraphQLBookingStatus.Completed:
        return "Completed";
      case GraphQLBookingStatus.Cancelled:
        return "Cancelled";
      case GraphQLBookingStatus.Paused:
        return "Paused";
      default:
        return "Scheduled";
    }
  };

  const getStatusColor = (status: GraphQLBookingStatus) => {
    switch (status) {
      case GraphQLBookingStatus.Confirmed:
        return "success";
      case GraphQLBookingStatus.Pending:
        return "warning";
      case GraphQLBookingStatus.InProgress:
        return "info";
      case GraphQLBookingStatus.Completed:
        return "success";
      case GraphQLBookingStatus.Cancelled:
      case GraphQLBookingStatus.Paused:
        return "error";
      default:
        return "neutral";
    }
  };

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
