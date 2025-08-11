"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { BookingStatus, TimeSlot, ServiceCategory } from "@/graphql/api";
import styles from "./WelcomeHeader.module.scss";

interface WelcomeHeaderProps {
  firstName?: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ firstName = "Customer" }) => {
  const { handleGetCustomerBookings, currentCustomerBookings, loading } = useBookingOperations();

  useEffect(() => {
    handleGetCustomerBookings();
  }, [handleGetCustomerBookings]);

  const upcomingService = useMemo(() => {
    if (!currentCustomerBookings?.length) return null;

    const now = new Date();
    const upcomingBookings = currentCustomerBookings
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        return (
          booking.status !== BookingStatus.Completed &&
          booking.status !== BookingStatus.Cancelled &&
          booking.status !== BookingStatus.Paused &&
          bookingDate > now
        );
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return upcomingBookings[0] || null;
  }, [currentCustomerBookings]);

  const formatServiceDate = (date: string, timeSlot: TimeSlot) => {
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
      dateLabel = bookingDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }

    const timeLabel = timeSlot === TimeSlot.Morning ? "Morning" : 
                      timeSlot === TimeSlot.Afternoon ? "Afternoon" : "Evening";
    
    return `${dateLabel} - ${timeLabel}`;
  };

  const getServiceIcon = (serviceType: ServiceCategory) => {
    const icons = {
      [ServiceCategory.Cleaning]: "🧹",
      [ServiceCategory.Laundry]: "👕",
      [ServiceCategory.Cooking]: "🍳",
      [ServiceCategory.PestControl]: "🐛",
      [ServiceCategory.Errands]: "📦"
    };
    return icons[serviceType] || "🏠";
  };
  // Get current time to determine greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      className={styles.welcomeHeader}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.welcomeHeader__content}>
        <div className={styles.welcomeHeader__greeting}>
          <motion.h1
            className={styles.welcomeHeader__title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {getGreeting()}, {firstName}
          </motion.h1>
          <motion.p
            className={styles.welcomeHeader__subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {upcomingService ? 
              `Your next service is ${formatServiceDate(upcomingService.date, upcomingService.timeSlot)}` :
              "Ready to book your next home service?"
            }
          </motion.p>
        </div>

        <div className={styles.welcomeHeader__content__bottom}>
          {upcomingService ? (
            <motion.div
              className={styles.welcomeHeader__upcomingService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.welcomeHeader__serviceIcon}>
                {upcomingService.icon}
              </div>
              <div className={styles.welcomeHeader__serviceInfo}>
                <h3 className={styles.welcomeHeader__serviceName}>
                  {upcomingService.serviceName}
                </h3>
                <p className={styles.welcomeHeader__serviceDate}>
                  {formatServiceDate(upcomingService.date, upcomingService.timeSlot)}
                </p>
                <p className={styles.welcomeHeader__serviceStaff}>
                  with {upcomingService.staffName}
                </p>
              </div>
              <div className={styles.welcomeHeader__serviceStatus}>
                <span className={styles.welcomeHeader__statusBadge}>Confirmed</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.welcomeHeader__noService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.welcomeHeader__noServiceIcon}>🏠</div>
              <div className={styles.welcomeHeader__noServiceContent}>
                <h3 className={styles.welcomeHeader__noServiceTitle}>
                  No upcoming services
                </h3>
                <p className={styles.welcomeHeader__noServiceText}>
                  Book your first service or set up a subscription to get started!
                </p>
              </div>
            </motion.div>
          )}

          <div className={styles.welcomeHeader__actions}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/dashboard/book-service" className={styles.welcomeHeader__ctaButton}>
                {upcomingService ? "Book Another" : "Book a Service"}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/dashboard/subscriptions" className={styles.welcomeHeader__ctaButtonSecondary}>
                {upcomingService ? "Manage Subscriptions" : "Start Subscription"}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
