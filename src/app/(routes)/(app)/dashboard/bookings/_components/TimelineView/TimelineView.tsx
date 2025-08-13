// src/app/(routes)/(app)/dashboard/bookings/_components/TimelineView/TimelineView.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  ChevronDown,
  CheckCircle,
  Circle,
  XCircle,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import styles from "./TimelineView.module.scss";
import { ServiceCategory, BookingStatus } from "../../types/booking";
import BookingDetailModal from "../BookingDetailModal/BookingDetailModal";

interface Booking {
  id: string;
  serviceName: string;
  serviceType: ServiceCategory;
  date: Date;
  endTime: Date;
  status: BookingStatus;
  provider: string;
  address: string;
  price: number;
  notes?: string;
  recurring: boolean;
  frequency?: string;
  rating?: number;
}

interface TimelineViewProps {
  bookings: Booking[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ bookings }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group bookings by month
  const groupedBookings = useMemo(() => {
    const groups: { [key: string]: Booking[] } = {};

    bookings.forEach((booking) => {
      const date = new Date(booking.date);
      const monthYear = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(booking);
    });

    // Sort bookings within each group
    Object.keys(groups).forEach((key) => {
      groups[key].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });

    return groups;
  }, [bookings]);

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const getServiceIcon = (serviceType: ServiceCategory) => {
    const icons = {
      [ServiceCategory.Cleaning]: "🧹",
      [ServiceCategory.Laundry]: "👕",
      [ServiceCategory.Cooking]: "🍳",
      [ServiceCategory.Errands]: "📦",
      [ServiceCategory.PestControl]: "🐛",
    };
    return icons[serviceType] || "🏠";
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Completed:
        return <CheckCircle className={styles.timelineView__statusIcon} />;
      case BookingStatus.Cancelled:
        return <XCircle className={styles.timelineView__statusIcon} />;
      case BookingStatus.Pending:
        return <AlertCircle className={styles.timelineView__statusIcon} />;
      default:
        return <Circle className={styles.timelineView__statusIcon} />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    const colors = {
      [BookingStatus.Upcoming]: "upcoming",
      [BookingStatus.Confirmed]: "confirmed",
      [BookingStatus.Pending]: "pending",
      [BookingStatus.InProgress]: "inProgress",
      [BookingStatus.Completed]: "completed",
      [BookingStatus.Cancelled]: "cancelled",
    };
    return colors[status] || "default";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Sort groups by date (newest first)
  const sortedGroups = Object.entries(groupedBookings).sort((a, b) => {
    const dateA = new Date(a[1][0].date);
    const dateB = new Date(b[1][0].date);
    return dateB.getTime() - dateA.getTime();
  });

  // Auto-expand the current month
  React.useEffect(() => {
    const currentMonth = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    setExpandedGroups(new Set([currentMonth]));
  }, []);

  return (
    <>
      <div className={styles.timelineView}>
        {sortedGroups.map(([monthYear, monthBookings]) => (
          <div key={monthYear} className={styles.timelineView__group}>
            <motion.button
              className={styles.timelineView__groupHeader}
              onClick={() => toggleGroup(monthYear)}
              whileHover={{ backgroundColor: "rgba(7, 80, 86, 0.02)" }}
            >
              <div className={styles.timelineView__groupTitle}>
                <h3>{monthYear}</h3>
                <span className={styles.timelineView__groupCount}>
                  {monthBookings.length} booking
                  {monthBookings.length > 1 ? "s" : ""}
                </span>
              </div>
              <motion.div
                animate={{ rotate: expandedGroups.has(monthYear) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {expandedGroups.has(monthYear) && (
                <motion.div
                  className={styles.timelineView__timeline}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {monthBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      className={styles.timelineView__item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleBookingClick(booking)}
                    >
                      <div className={styles.timelineView__date}>
                        <span className={styles.timelineView__dateDay}>
                          {new Date(booking.date).getDate()}
                        </span>
                        <span className={styles.timelineView__dateMonth}>
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                      </div>

                      <div
                        className={`${styles.timelineView__indicator} ${
                          styles[
                            `timelineView__indicator--${getStatusColor(booking.status)}`
                          ]
                        }`}
                      >
                        {getStatusIcon(booking.status)}
                        <div className={styles.timelineView__line} />
                      </div>

                      <motion.div
                        className={styles.timelineView__card}
                        whileHover={{
                          x: 4,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        <div className={styles.timelineView__cardHeader}>
                          <div className={styles.timelineView__serviceInfo}>
                            <div className={styles.timelineView__serviceIcon}>
                              {getServiceIcon(booking.serviceType)}
                            </div>
                            <div>
                              <h4 className={styles.timelineView__serviceName}>
                                {booking.serviceName}
                              </h4>
                              <p className={styles.timelineView__serviceType}>
                                {booking.serviceType}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`${styles.timelineView__status} ${
                              styles[
                                `timelineView__status--${getStatusColor(booking.status)}`
                              ]
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className={styles.timelineView__cardDetails}>
                          <div className={styles.timelineView__detail}>
                            <Clock size={14} />
                            <span>
                              {formatTime(booking.date)} -{" "}
                              {formatTime(booking.endTime)}
                            </span>
                          </div>
                          <div className={styles.timelineView__detail}>
                            <User size={14} />
                            <span>{booking.provider}</span>
                          </div>
                          <div className={styles.timelineView__detail}>
                            <MapPin size={14} />
                            <span>{booking.address}</span>
                          </div>
                        </div>

                        <div className={styles.timelineView__cardFooter}>
                          <span className={styles.timelineView__price}>
                            {formatPrice(booking.price)}
                          </span>
                          <button
                            className={styles.timelineView__moreBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookingClick(booking);
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {Object.keys(groupedBookings).length === 0 && (
          <div className={styles.timelineView__empty}>
            <p>No bookings to display in timeline view</p>
          </div>
        )}
      </div>

      <BookingDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
      />
    </>
  );
};

export default TimelineView;

// TimelineView.module.scss
`

`;
