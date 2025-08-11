"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookingStatus, TimeSlot, ServiceCategory } from "@/graphql/api";
import styles from "./WelcomeHeader.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface WelcomeHeaderProps {
  firstName?: string;
}

// Mock data that matches the GraphQL API structure
const mockCustomerBookings = [
  {
    id: "booking-1",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    timeSlot: TimeSlot.Morning,
    status: BookingStatus.Confirmed,
    service: {
      id: "service-1",
      name: "Deep Cleaning Service",
      category: ServiceCategory.Cleaning,
      icon: "cleaning",
      price: 120,
    },
    serviceType: ServiceCategory.Cleaning,
    staff: {
      id: "staff-1",
      firstName: "Maria",
      lastName: "Rodriguez",
      email: "maria@metromellow.com",
    },
    customer: {
      id: "customer-1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
    address: {
      id: "address-1",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    totalPrice: 120,
    paymentStatus: "PAID",
    notes: "Please focus on kitchen and bathrooms",
    serviceOption: "Deep Clean",
    serviceDetails: {},
    createdAt: "2024-08-10T00:00:00Z",
    updatedAt: "2024-08-10T00:00:00Z",
  },
  {
    id: "booking-2",
    date: "2024-08-18T00:00:00Z",
    timeSlot: TimeSlot.Afternoon,
    status: BookingStatus.Confirmed,
    service: {
      id: "service-2",
      name: "Premium Laundry Service",
      category: ServiceCategory.Laundry,
      icon: "laundry",
      price: 45,
    },
    serviceType: ServiceCategory.Laundry,
    staff: {
      id: "staff-2",
      firstName: "Carlos",
      lastName: "Smith",
      email: "carlos@metromellow.com",
    },
    customer: {
      id: "customer-1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
    address: {
      id: "address-1",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    totalPrice: 45,
    paymentStatus: "PAID",
    notes: "Wash and fold",
    serviceOption: "Wash & Fold",
    serviceDetails: {},
    createdAt: "2024-08-10T00:00:00Z",
    updatedAt: "2024-08-10T00:00:00Z",
  },
];

// Mock the useBookingOperations hook
const useMockBookingOperations = () => {
  return {
    currentCustomerBookings: mockCustomerBookings,
    loading: false,
    error: null,
    handleGetCustomerBookings: () => {
      // Mock function - no actual API call
      console.log("Mock: Getting customer bookings...");
    },
  };
};

// Toggle this to show/hide upcoming services for testing
const HAS_UPCOMING_SERVICES = true;

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  firstName = "Sarah",
}) => {
  // Use mock GraphQL hook
  // const { handleGetCustomerBookings, currentCustomerBookings, loading } = useMockBookingOperations();

  // useEffect(() => {
  //   handleGetCustomerBookings();
  // }, [handleGetCustomerBookings]);
  const currentCustomerBookings = mockCustomerBookings;
  // Filter and sort upcoming bookings (same logic as real GraphQL version)
  const upcomingService = useMemo(() => {
    if (!HAS_UPCOMING_SERVICES) return null;

    const now = new Date();
    const upcomingBookings = currentCustomerBookings
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
      dateLabel = bookingDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    const timeLabel =
      timeSlot === TimeSlot.Morning
        ? "Morning"
        : timeSlot === TimeSlot.Afternoon
          ? "Afternoon"
          : "Evening";

    return `${dateLabel} - ${timeLabel}`;
  };

  const getServiceIcon = (serviceType: ServiceCategory) => {
    const icons = {
      [ServiceCategory.Cleaning]: "🧹",
      [ServiceCategory.Laundry]: "👕",
      [ServiceCategory.Cooking]: "🍳",
      [ServiceCategory.PestControl]: "🐛",
      [ServiceCategory.Errands]: "📦",
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
              ? `Your next service is ${formatServiceDate(upcomingService.date, upcomingService.timeSlot)}`
              : "Ready to book your next home service?"}
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
                {getServiceIcon(upcomingService.serviceType)}
              </div>
              <div className={styles.welcomeHeader__serviceInfo}>
                <h3 className={styles.welcomeHeader__serviceName}>
                  {upcomingService.service.name}
                </h3>
                <p className={styles.welcomeHeader__serviceDate}>
                  {formatServiceDate(
                    upcomingService.date,
                    upcomingService.timeSlot
                  )}
                </p>
                {upcomingService.staff && (
                  <p className={styles.welcomeHeader__serviceStaff}>
                    with {upcomingService.staff.firstName}
                  </p>
                )}
              </div>
              <div className={styles.welcomeHeader__serviceStatus}>
                <span className={styles.welcomeHeader__statusBadge}>
                  {upcomingService.status === BookingStatus.Confirmed
                    ? "Confirmed"
                    : upcomingService.status === BookingStatus.Pending
                      ? "Pending"
                      : upcomingService.status === BookingStatus.InProgress
                        ? "In Progress"
                        : "Scheduled"}
                </span>
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
              <FnButton variant="accent">
                {upcomingService
                  ? "Manage Subscriptions"
                  : "Start Subscription"}
              </FnButton>
              {/* <Link
                href="/dashboard/book-service"
                className={styles.welcomeHeader__ctaButton}
              >
                {upcomingService ? "Book Another" : "Book a Service"}
              </Link> */}
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
              {/* <Link
                href="/dashboard/subscriptions"
                className={styles.welcomeHeader__ctaButtonSecondary}
              ></Link> */}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
