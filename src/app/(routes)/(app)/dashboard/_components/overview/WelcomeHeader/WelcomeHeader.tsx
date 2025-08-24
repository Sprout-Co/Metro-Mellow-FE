"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookingStatus,
  TimeSlot,
  ServiceCategory,
  Booking,
} from "@/graphql/api";
import styles from "./WelcomeHeader.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import AppointmentCard from "@/components/ui/AppointmentCard/AppointmentCard";
import { openServicesListDrawer } from "@/lib/redux/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";

interface WelcomeHeaderProps {
  firstName?: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const firstName = user?.firstName;

  const { handleGetCustomerBookings } = useBookingOperations();
  const [customerBookings, setCustomerBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch customer bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const bookings = await handleGetCustomerBookings();
        setCustomerBookings((bookings as Booking[]) || []);
      } catch (error) {
        console.error("Failed to fetch customer bookings:", error);
        setCustomerBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [handleGetCustomerBookings]);

  // Filter and sort upcoming bookings
  const upcomingService = useMemo(() => {
    if (isLoading || !customerBookings.length) return null;

    const now = new Date();
    const upcomingBookings = customerBookings
      .filter((booking) => {
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
  }, [customerBookings, isLoading]);

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
            {getGreeting()},{" "}
            <span className={styles.welcomeHeader__name}>{firstName}</span>
          </motion.h1>
          <motion.p
            className={styles.welcomeHeader__subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {upcomingService
              ? "Here's your upcoming service"
              : "Ready to book your next home service?"}
          </motion.p>
        </div>

        <div className={styles.welcomeHeader__content__bottom}>
          {upcomingService ? (
            <AppointmentCard booking={upcomingService} variant="header" />
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
                  Book your first service or set up a subscription to get
                  started!
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
              <FnButton
                variant="accent"
                onClick={() => dispatch(openServicesListDrawer())}
              >
                {upcomingService ? "Book Another" : "Book a Service"}
              </FnButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FnButton variant="secondary">
                {upcomingService
                  ? "Manage Subscriptions"
                  : "Start Subscription"}
              </FnButton>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
