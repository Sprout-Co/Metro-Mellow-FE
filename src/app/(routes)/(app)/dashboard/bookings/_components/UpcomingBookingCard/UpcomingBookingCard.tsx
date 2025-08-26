// src/app/(routes)/(app)/dashboard/bookings/_components/UpcomingBookingCard/UpcomingBookingCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  Calendar,
  Phone,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import styles from "./UpcomingBookingCard.module.scss";
import { ServiceCategory, BookingStatus } from "../../types/booking";
import FnButton from "@/components/ui/Button/FnButton";

interface Booking {
  id: string;
  serviceName: string;
  service_category: ServiceCategory;
  date: Date;
  endTime: Date;
  status: BookingStatus;
  provider: string;
  address: string;
  price: number;
  notes?: string;
}

interface UpcomingBookingCardProps {
  booking: Booking;
}

const UpcomingBookingCard: React.FC<UpcomingBookingCardProps> = ({
  booking,
}) => {
  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTimeUntil = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diff = dateObj.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 1) return `in ${days} days`;
    if (days === 1) return "tomorrow";
    if (hours > 1) return `in ${hours} hours`;
    if (hours === 1) return "in 1 hour";
    return "soon";
  };

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

  const getServiceColor = (service_category: ServiceCategory) => {
    const colors = {
      [ServiceCategory.Cleaning]: "#075056",
      [ServiceCategory.Laundry]: "#6366f1",
      [ServiceCategory.Cooking]: "#fe5b04",
      [ServiceCategory.Errands]: "#10b981",
      [ServiceCategory.PestControl]: "#ec4899",
    };
    return colors[service_category] || "#6b7280";
  };

  return (
    <motion.div
      className={styles.upcomingCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className={styles.upcomingCard__header}>
        <div className={styles.upcomingCard__headerLeft}>
          <AlertCircle className={styles.upcomingCard__alertIcon} />
          <div>
            <h3 className={styles.upcomingCard__title}>Your Next Service</h3>
            <p className={styles.upcomingCard__subtitle}>
              {getTimeUntil(booking.date)}
            </p>
          </div>
        </div>
        <div className={styles.upcomingCard__actions}>
          <FnButton variant="ghost" size="sm">
            Reschedule
          </FnButton>
          <FnButton variant="primary" size="sm">
            <Phone size={16} />
            Contact Provider
          </FnButton>
        </div>
      </div>

      <div className={styles.upcomingCard__body}>
        <div className={styles.upcomingCard__service}>
          <div
            className={styles.upcomingCard__serviceIcon}
            style={{
              backgroundColor: `${getServiceColor(booking.service_category)}15`,
            }}
          >
            <span>{getServiceIcon(booking.service_category)}</span>
          </div>
          <div className={styles.upcomingCard__serviceInfo}>
            <h4 className={styles.upcomingCard__serviceName}>
              {booking.serviceName}
            </h4>
            <p className={styles.upcomingCard__service_category}>
              {booking.service_category}
            </p>
          </div>
        </div>

        <div className={styles.upcomingCard__details}>
          <div className={styles.upcomingCard__detailItem}>
            <Calendar className={styles.upcomingCard__detailIcon} />
            <div className={styles.upcomingCard__detailContent}>
              <span className={styles.upcomingCard__detailLabel}>
                Date & Time
              </span>
              <span className={styles.upcomingCard__detailValue}>
                {formatDate(booking.date)} at {formatTime(booking.date)}
              </span>
            </div>
          </div>

          <div className={styles.upcomingCard__detailItem}>
            <User className={styles.upcomingCard__detailIcon} />
            <div className={styles.upcomingCard__detailContent}>
              <span className={styles.upcomingCard__detailLabel}>Provider</span>
              <span className={styles.upcomingCard__detailValue}>
                {booking.provider}
              </span>
            </div>
          </div>

          <div className={styles.upcomingCard__detailItem}>
            <MapPin className={styles.upcomingCard__detailIcon} />
            <div className={styles.upcomingCard__detailContent}>
              <span className={styles.upcomingCard__detailLabel}>Location</span>
              <span className={styles.upcomingCard__detailValue}>
                {booking.address}
              </span>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className={styles.upcomingCard__notes}>
            <span className={styles.upcomingCard__notesLabel}>Notes:</span>
            <span className={styles.upcomingCard__notesText}>
              {booking.notes}
            </span>
          </div>
        )}
      </div>

      <motion.button
        className={styles.upcomingCard__viewDetails}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        View Details
        <ChevronRight size={16} />
      </motion.button>
    </motion.div>
  );
};

export default UpcomingBookingCard;

// UpcomingBookingCard.module.scss
`

`;
