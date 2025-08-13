// src/app/(routes)/(app)/dashboard/bookings/_components/BookingStats/BookingStats.tsx
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  XCircle,
  AlertCircle,
  DollarSign,
  Star,
} from "lucide-react";
import styles from "./BookingStats.module.scss";
import { BookingStatus } from "../../types/booking";

interface Booking {
  id: string;
  status: BookingStatus;
  date: Date;
  price: number;
  rating?: number;
}

interface BookingStatsProps {
  bookings: Booking[];
}

const BookingStats: React.FC<BookingStatsProps> = ({ bookings }) => {
  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    // Calculate various statistics
    const totalBookings = bookings.length;
    const upcomingBookings = bookings.filter(
      (b) =>
        b.status === BookingStatus.Upcoming ||
        b.status === BookingStatus.Confirmed
    ).length;
    const completedBookings = bookings.filter(
      (b) => b.status === BookingStatus.Completed
    ).length;
    const cancelledBookings = bookings.filter(
      (b) => b.status === BookingStatus.Cancelled
    ).length;

    // This month's bookings
    const thisMonthBookings = bookings.filter((b) => {
      const bookingDate = new Date(b.date);
      return (
        bookingDate.getMonth() === thisMonth &&
        bookingDate.getFullYear() === thisYear
      );
    });

    // Calculate total spent
    const totalSpent = bookings
      .filter((b) => b.status === BookingStatus.Completed)
      .reduce((sum, b) => sum + b.price, 0);

    // Calculate average rating
    const ratedBookings = bookings.filter((b) => b.rating !== undefined);
    const averageRating =
      ratedBookings.length > 0
        ? ratedBookings.reduce((sum, b) => sum + (b.rating || 0), 0) /
          ratedBookings.length
        : 0;

    // Calculate completion rate
    const completionRate =
      totalBookings > 0
        ? (
            (completedBookings / (totalBookings - cancelledBookings)) *
            100
          ).toFixed(1)
        : "0";

    // Calculate growth (mock data - comparing to previous month)
    const growth = 12.5; // This would be calculated from actual data

    return {
      totalBookings,
      upcomingBookings,
      completedBookings,
      cancelledBookings,
      thisMonthCount: thisMonthBookings.length,
      totalSpent,
      averageRating,
      completionRate,
      growth,
    };
  }, [bookings]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      id: "upcoming",
      title: "Upcoming",
      value: stats.upcomingBookings,
      icon: <Clock />,
      color: "primary",
      trend: null,
    },
    {
      id: "completed",
      title: "Completed",
      value: stats.completedBookings,
      icon: <CheckCircle2 />,
      color: "success",
      trend: `${stats.completionRate}% rate`,
    },
    {
      id: "thisMonth",
      title: "This Month",
      value: stats.thisMonthCount,
      icon: <Calendar />,
      color: "accent",
      trend: `+${stats.growth}%`,
      trendUp: true,
    },
    {
      id: "totalSpent",
      title: "Total Spent",
      value: formatCurrency(stats.totalSpent),
      icon: <DollarSign />,
      color: "secondary",
      trend: null,
    },
  ];

  return (
    <div className={styles.bookingStats}>
      <div className={styles.bookingStats__grid}>
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.id}
            className={`${styles.bookingStats__card} ${
              styles[`bookingStats__card--${stat.color}`]
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <div className={styles.bookingStats__cardHeader}>
              <div className={styles.bookingStats__iconWrapper}>
                {stat.icon}
              </div>
              {stat.trend && (
                <div
                  className={`${styles.bookingStats__trend} ${
                    stat.trendUp ? styles["bookingStats__trend--up"] : ""
                  }`}
                >
                  {stat.trendUp && <TrendingUp size={14} />}
                  <span>{stat.trend}</span>
                </div>
              )}
            </div>
            <div className={styles.bookingStats__cardBody}>
              <div className={styles.bookingStats__value}>{stat.value}</div>
              <div className={styles.bookingStats__title}>{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional insights */}
      <div className={styles.bookingStats__insights}>
        <div className={styles.bookingStats__insightItem}>
          <Star className={styles.bookingStats__insightIcon} />
          <span className={styles.bookingStats__insightText}>
            Average Rating: {stats.averageRating.toFixed(1)}/5
          </span>
        </div>
        {stats.cancelledBookings > 0 && (
          <div className={styles.bookingStats__insightItem}>
            <AlertCircle className={styles.bookingStats__insightIcon} />
            <span className={styles.bookingStats__insightText}>
              {stats.cancelledBookings} cancelled booking
              {stats.cancelledBookings > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingStats;

// BookingStats.module.scss
`

`;
