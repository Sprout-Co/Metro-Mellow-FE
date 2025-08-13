// src/app/(routes)/(app)/dashboard/bookings/_components/ListView/ListView.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  Calendar,
  MoreVertical,
  Edit,
  X,
  RefreshCw,
  Star,
  MessageSquare,
  CheckCircle,
  Repeat,
  DollarSign,
  Phone,
  Eye,
  Copy,
  FileText,
  ChevronRight,
} from "lucide-react";
import styles from "./ListView.module.scss";
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

interface ListViewProps {
  bookings: Booking[];
}

const ListView: React.FC<ListViewProps> = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Sort bookings by date
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group bookings by status
  const groupedBookings = {
    active: sortedBookings.filter(
      (b) =>
        b.status === BookingStatus.Upcoming ||
        b.status === BookingStatus.Confirmed ||
        b.status === BookingStatus.InProgress
    ),
    pending: sortedBookings.filter((b) => b.status === BookingStatus.Pending),
    past: sortedBookings.filter(
      (b) =>
        b.status === BookingStatus.Completed ||
        b.status === BookingStatus.Cancelled
    ),
  };

  // Get service icon
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

  // Get service color
  const getServiceColor = (serviceType: ServiceCategory) => {
    const colors = {
      [ServiceCategory.Cleaning]: "#075056",
      [ServiceCategory.Laundry]: "#6366f1",
      [ServiceCategory.Cooking]: "#fe5b04",
      [ServiceCategory.Errands]: "#10b981",
      [ServiceCategory.PestControl]: "#ec4899",
    };
    return colors[serviceType] || "#6b7280";
  };

  // Get status style
  const getStatusStyle = (status: BookingStatus) => {
    const styles = {
      [BookingStatus.Upcoming]: "upcoming",
      [BookingStatus.Confirmed]: "confirmed",
      [BookingStatus.Pending]: "pending",
      [BookingStatus.InProgress]: "inProgress",
      [BookingStatus.Completed]: "completed",
      [BookingStatus.Cancelled]: "cancelled",
    };
    return styles[status] || "default";
  };

  // Format date
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle card click
  const handleCardClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Toggle menu
  const toggleMenu = (bookingId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenuId(activeMenuId === bookingId ? null : bookingId);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const isMenuOpen = activeMenuId === booking.id;
    const isHovered = hoveredId === booking.id;

    return (
      <motion.div
        layout
        className={styles.bookingCard}
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -20 }}
        // whileHover={{ y: -2 }}
        onHoverStart={() => setHoveredId(booking.id)}
        onHoverEnd={() => setHoveredId(null)}
        onClick={() => handleCardClick(booking)}
      >
        {/* Service Type Indicator */}
        <div
          className={styles.bookingCard__indicator}
          style={{ backgroundColor: getServiceColor(booking.serviceType) }}
        />

        {/* Main Content Grid */}
        <div className={styles.bookingCard__grid}>
          {/* Left Section - Service Info */}
          <div className={styles.bookingCard__left}>
            <div className={styles.bookingCard__serviceHeader}>
              <div
                className={styles.bookingCard__serviceIcon}
                style={{
                  backgroundColor: `${getServiceColor(booking.serviceType)}15`,
                }}
              >
                <span>{getServiceIcon(booking.serviceType)}</span>
              </div>
              <div className={styles.bookingCard__serviceDetails}>
                <h3 className={styles.bookingCard__serviceName}>
                  {booking.serviceName}
                  {booking.recurring && (
                    <span className={styles.bookingCard__recurringBadge}>
                      <Repeat size={12} />
                      {booking.frequency}
                    </span>
                  )}
                </h3>
                <p className={styles.bookingCard__serviceType}>
                  {booking.serviceType}
                </p>
              </div>
            </div>

            <div className={styles.bookingCard__info}>
              <div className={styles.bookingCard__infoItem}>
                <Calendar size={14} />
                <span>{formatDate(booking.date)}</span>
              </div>
              <div className={styles.bookingCard__infoItem}>
                <Clock size={14} />
                <span>
                  {formatTime(booking.date)} - {formatTime(booking.endTime)}
                </span>
              </div>
              <div className={styles.bookingCard__infoItem}>
                <User size={14} />
                <span>{booking.provider}</span>
              </div>
              <div className={styles.bookingCard__infoItem}>
                <MapPin size={14} />
                <span>{booking.address}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Status, Price & Actions */}
          <div className={styles.bookingCard__right}>
            <div className={styles.bookingCard__meta}>
              <span
                className={`${styles.bookingCard__status} ${
                  styles[
                    `bookingCard__status--${getStatusStyle(booking.status)}`
                  ]
                }`}
              >
                {booking.status}
              </span>
              <span className={styles.bookingCard__price}>
                {formatPrice(booking.price)}
              </span>
            </div>

            {/* Quick Actions */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={styles.bookingCard__quickActions}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {(booking.status === BookingStatus.Upcoming ||
                    booking.status === BookingStatus.Confirmed) && (
                    <>
                      <motion.button
                        className={styles.bookingCard__quickBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Call provider");
                        }}
                      >
                        <Phone size={16} />
                      </motion.button>
                      <motion.button
                        className={styles.bookingCard__quickBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Reschedule");
                        }}
                      >
                        <RefreshCw size={16} />
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    className={styles.bookingCard__quickBtn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(booking);
                    }}
                  >
                    <Eye size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu Button */}
          <div className={styles.bookingCard__menuContainer}>
            <motion.button
              className={styles.bookingCard__menuBtn}
              onClick={(e) => toggleMenu(booking.id, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreVertical size={18} />
            </motion.button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className={styles.bookingCard__menu}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.1 }}
                >
                  <button
                    className={styles.bookingCard__menuItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(booking);
                    }}
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                  {booking.status !== BookingStatus.Completed &&
                    booking.status !== BookingStatus.Cancelled && (
                      <>
                        <button className={styles.bookingCard__menuItem}>
                          <RefreshCw size={14} />
                          Reschedule
                        </button>
                        <button className={styles.bookingCard__menuItem}>
                          <Edit size={14} />
                          Edit Booking
                        </button>
                      </>
                    )}
                  {booking.status === BookingStatus.Completed && (
                    <>
                      <button className={styles.bookingCard__menuItem}>
                        <Copy size={14} />
                        Book Again
                      </button>
                      <button className={styles.bookingCard__menuItem}>
                        <FileText size={14} />
                        Download Invoice
                      </button>
                      {!booking.rating && (
                        <button className={styles.bookingCard__menuItem}>
                          <Star size={14} />
                          Leave Review
                        </button>
                      )}
                    </>
                  )}
                  {booking.status !== BookingStatus.Completed &&
                    booking.status !== BookingStatus.Cancelled && (
                      <button
                        className={`${styles.bookingCard__menuItem} ${
                          styles["bookingCard__menuItem--danger"]
                        }`}
                      >
                        <X size={14} />
                        Cancel Booking
                      </button>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hover Arrow */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.bookingCard__arrow}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <ChevronRight size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Render section
  const renderSection = (
    title: string,
    bookings: Booking[],
    emptyMessage: string
  ) => {
    if (bookings.length === 0) {
      return (
        <div className={styles.listView__emptySection}>
          <p>{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className={styles.listView__section}>
        <div className={styles.listView__sectionHeader}>
          <h2 className={styles.listView__sectionTitle}>{title}</h2>
          <span className={styles.listView__count}>{bookings.length}</span>
        </div>
        <div className={styles.listView__bookings}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.listView}>
        {renderSection(
          "Active Bookings",
          groupedBookings.active,
          "No active bookings"
        )}
        {renderSection(
          "Pending Confirmation",
          groupedBookings.pending,
          "No pending bookings"
        )}
        {renderSection(
          "Past Bookings",
          groupedBookings.past,
          "No past bookings"
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

export default ListView;
