"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./AppointmentCard.module.scss";
import {
  ServiceCategory as GraphQLServiceCategory,
  BookingStatus as GraphQLBookingStatus,
} from "@/graphql/api";

// Local types for backward compatibility
enum LocalServiceCategory {
  Cleaning = "Cleaning",
  Laundry = "Laundry",
  Cooking = "Cooking",
  Errands = "Errands",
  PestControl = "Pest Control",
}

enum LocalBookingStatus {
  Upcoming = "Upcoming",
  Confirmed = "Confirmed",
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

interface AppointmentCardProps {
  serviceName: string;
  service_category: GraphQLServiceCategory | LocalServiceCategory;
  date: string | Date;
  timeSlot?: string;
  status: GraphQLBookingStatus | LocalBookingStatus;
  provider?: string;
  className?: string;
  variant?: "header" | "standalone";
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  serviceName,
  service_category,
  date,
  timeSlot,
  status,
  provider,
  className = "",
  variant = "header",
}) => {
  const getServiceIcon = (
    service_category: GraphQLServiceCategory | LocalServiceCategory
  ) => {
    const icons = {
      [GraphQLServiceCategory.Cleaning]: "🧹",
      [LocalServiceCategory.Cleaning]: "🧹",
      [GraphQLServiceCategory.Laundry]: "👕",
      [LocalServiceCategory.Laundry]: "👕",
      [GraphQLServiceCategory.Cooking]: "🍳",
      [LocalServiceCategory.Cooking]: "🍳",
      [GraphQLServiceCategory.Errands]: "📦",
      [LocalServiceCategory.Errands]: "📦",
      [GraphQLServiceCategory.PestControl]: "🐛",
      [LocalServiceCategory.PestControl]: "🐛",
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

  const getStatusText = (status: GraphQLBookingStatus | LocalBookingStatus) => {
    switch (status) {
      case GraphQLBookingStatus.Confirmed:
      case LocalBookingStatus.Confirmed:
        return "Confirmed";
      case GraphQLBookingStatus.Pending:
      case LocalBookingStatus.Pending:
        return "Pending";
      case LocalBookingStatus.Upcoming:
        return "Upcoming";
      case GraphQLBookingStatus.InProgress:
      case LocalBookingStatus.InProgress:
        return "In Progress";
      case GraphQLBookingStatus.Completed:
      case LocalBookingStatus.Completed:
        return "Completed";
      case GraphQLBookingStatus.Cancelled:
      case LocalBookingStatus.Cancelled:
        return "Cancelled";
      case GraphQLBookingStatus.Paused:
        return "Paused";
      default:
        return "Scheduled";
    }
  };

  const getStatusColor = (
    status: GraphQLBookingStatus | LocalBookingStatus
  ) => {
    switch (status) {
      case GraphQLBookingStatus.Confirmed:
      case LocalBookingStatus.Confirmed:
      case LocalBookingStatus.Upcoming:
        return "success";
      case GraphQLBookingStatus.Pending:
      case LocalBookingStatus.Pending:
        return "warning";
      case GraphQLBookingStatus.InProgress:
      case LocalBookingStatus.InProgress:
        return "info";
      case GraphQLBookingStatus.Completed:
      case LocalBookingStatus.Completed:
        return "success";
      case GraphQLBookingStatus.Cancelled:
      case LocalBookingStatus.Cancelled:
      case GraphQLBookingStatus.Paused:
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <motion.div
      className={`${styles.appointmentCard} ${styles[`appointmentCard--${variant}`]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <div className={styles.appointmentCard__icon}>
        {getServiceIcon(service_category)}
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
