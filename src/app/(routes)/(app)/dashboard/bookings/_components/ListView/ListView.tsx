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
  DollarSign
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
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort bookings by date
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group bookings by status
  const groupedBookings = {
    upcoming: sortedBookings.filter(b => 
      b.status === BookingStatus.Upcoming || b.status === BookingStatus.Confirmed
    ),
    pending: sortedBookings.filter(b => b.status === BookingStatus.Pending),
    inProgress: sortedBookings.filter(b => b.status === BookingStatus.InProgress),
    completed: sortedBookings.filter(b => b.status === BookingStatus.Completed),
    cancelled: sortedBookings.filter(b => b.status === BookingStatus.Cancelled),
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

  // Get status color
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

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  // Toggle expanded state
  const toggleExpanded = (bookingId: string) => {
    setExpandedBookingId(expandedBookingId === bookingId ? null : bookingId);
  };

  // Toggle menu
  const toggleMenu = (bookingId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenuId(activeMenuId === bookingId ? null : bookingId);
  };

  // Handle action clicks
  const handleAction = (action: string, bookingId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`${action} booking ${bookingId}`);
    
    if (action === "view") {
      const booking = sortedBookings.find(b => b.id === bookingId);
      if (booking) {
        setSelectedBooking(booking);
        setIsModalOpen(true);
      }
    }
    
    setActiveMenuId(null);
  };

  // Handle card click to open detail modal
  const handleCardClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const isExpanded = expandedBookingId === booking.id;
    const isMenuOpen = activeMenuId === booking.id;

    // Get service type color for the indicator
    const getServiceTypeColor = (serviceType: ServiceCategory) => {
      const colors = {
        [ServiceCategory.Cleaning]: "#075056",
        [ServiceCategory.Laundry]: "#6366f1",
        [ServiceCategory.Cooking]: "#fe5b04",
        [ServiceCategory.Errands]: "#10b981",
        [ServiceCategory.PestControl]: "#ec4899",
      };
      return colors[serviceType] || "#6b7280";
    };

    return (
      <motion.div
        layout
        className={styles.bookingCard}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ y: -1 }}
        onClick={() => handleCardClick(booking)}
      >
        <div 
          className={styles.bookingCard__indicator} 
          style={{ backgroundColor: getServiceTypeColor(booking.serviceType) }}
        />
      >
        <div className={styles.bookingCard__header}>
          <div className={styles.bookingCard__serviceInfo}>
            <div className={styles.bookingCard__serviceIcon}>
              {getServiceIcon(booking.serviceType)}
            </div>
            <div className={styles.bookingCard__serviceContent}>
              <h3 className={styles.bookingCard__serviceName}>
                {booking.serviceName}
                {booking.recurring && (
                  <span className={styles.bookingCard__recurringBadge}>
                    <Repeat size={10} />
                    {booking.frequency}
                  </span>
                )}
              </h3>
              <div className={styles.bookingCard__serviceType}>
                {booking.serviceType}
              </div>
            </div>
          </div>

          <div className={styles.bookingCard__headerRight}>
            <span 
              className={`${styles.bookingCard__status} ${
                styles[`bookingCard__status--${getStatusColor(booking.status)}`]
              }`}
            >
              {booking.status}
            </span>
            
            <div className={styles.bookingCard__menuContainer}>
              <motion.button
                className={styles.bookingCard__menuBtn}
                onClick={(e) => toggleMenu(booking.id, e)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical size={16} />
              </motion.button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className={styles.bookingCard__menu}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                  >
                    <button
                      className={styles.bookingCard__menuItem}
                      onClick={(e) => handleAction("view", booking.id, e)}
                    >
                      <CheckCircle size={14} />
                      View Details
                    </button>
                    <button
                      className={styles.bookingCard__menuItem}
                      onClick={(e) => handleAction("reschedule", booking.id, e)}
                    >
                      <RefreshCw size={14} />
                      Reschedule
                    </button>
                    <button
                      className={styles.bookingCard__menuItem}
                      onClick={(e) => handleAction("edit", booking.id, e)}
                    >
                      <Edit size={14} />
                      Edit Booking
                    </button>
                    <button
                      className={`${styles.bookingCard__menuItem} ${styles["bookingCard__menuItem--danger"]}`}
                      onClick={(e) => handleAction("cancel", booking.id, e)}
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className={styles.bookingCard__details}>
          <div className={styles.bookingCard__detail}>
            <Calendar size={14} />
            <span>{formatDate(booking.date)}</span>
          </div>
          <div className={styles.bookingCard__detail}>
            <Clock size={14} />
            <span>{formatTime(booking.date)} - {formatTime(booking.endTime)}</span>
          </div>
          <div className={styles.bookingCard__detail}>
            <User size={14} />
            <span>{booking.provider}</span>
          </div>
          <div className={styles.bookingCard__detail}>
            <MapPin size={14} />
            <span>{booking.address}</span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={styles.bookingCard__expandedContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.bookingCard__expandedSection}>
                <div className={styles.bookingCard__expandedRow}>
                  <div className={styles.bookingCard__priceInfo}>
                    <DollarSign size={16} />
                    <span className={styles.bookingCard__price}>
                      {formatPrice(booking.price)}
                    </span>
                  </div>

                  {booking.status === BookingStatus.Completed && booking.rating && (
                    <div className={styles.bookingCard__rating}>
                      <span>Rating:</span>
                      <div className={styles.bookingCard__stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={star <= booking.rating! ? styles["bookingCard__star--filled"] : ""}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {booking.notes && (
                  <div className={styles.bookingCard__notes}>
                    <MessageSquare size={14} />
                    <span>{booking.notes}</span>
                  </div>
                )}
              </div>

              <div className={styles.bookingCard__actions}>
                {booking.status === BookingStatus.Upcoming || booking.status === BookingStatus.Confirmed ? (
                  <>
                    <motion.button
                      className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--primary"]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Reschedule
                    </motion.button>
                    <motion.button
                      className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--secondary"]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact
                    </motion.button>
                    <motion.button
                      className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--danger"]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </>
                ) : booking.status === BookingStatus.Completed ? (
                  <>
                    <motion.button
                      className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--primary"]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Again
                    </motion.button>
                    {!booking.rating && (
                      <motion.button
                        className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--secondary"]}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Leave Review
                      </motion.button>
                    )}
                  </>
                ) : booking.status === BookingStatus.Pending ? (
                  <>
                    <motion.button
                      className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--primary"]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm
                    </motion.button>
                    <motion.button
                      className={`${styles.bookingCard__actionBtn} ${styles["bookingCard__actionBtn--secondary"]}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Edit
                    </motion.button>
                  </>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Render section only if it has bookings
  const renderSection = (title: string, bookings: Booking[], icon: React.ReactNode) => {
    if (bookings.length === 0) return null;

    return (
      <div className={styles.listView__section}>
        <div className={styles.listView__sectionHeader}>
          <div className={styles.listView__sectionTitle}>
            {icon}
            <h2>{title}</h2>
            <span className={styles.listView__count}>{bookings.length}</span>
          </div>
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
        {renderSection("Upcoming & Confirmed", groupedBookings.upcoming, <Calendar size={16} />)}
        {renderSection("Pending Confirmation", groupedBookings.pending, <Clock size={16} />)}
        {renderSection("In Progress", groupedBookings.inProgress, <RefreshCw size={16} />)}
        {renderSection("Completed", groupedBookings.completed, <CheckCircle size={16} />)}
        {renderSection("Cancelled", groupedBookings.cancelled, <X size={16} />)}
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