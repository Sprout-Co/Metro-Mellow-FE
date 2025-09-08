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
  Play,
  Pause,
  Ban,
  List,
} from "lucide-react";
import styles from "./ListView.module.scss";
import { ServiceCategory, BookingStatus, Booking } from "@/graphql/api";
import BookingDetailModal from "../BookingDetailModal/BookingDetailModal";

interface ListViewProps {
  bookings: Booking[];
  refetchBookings?: () => void;
}

type TabType = "all" | "active" | "pending" | "past";

const ListView: React.FC<ListViewProps> = ({ bookings, refetchBookings }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Sort bookings by date
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get filtered bookings based on active tab
  const getFilteredBookings = (tabId: TabType) => {
    switch (tabId) {
      case "all":
        return sortedBookings;
      case "active":
        return sortedBookings.filter(
          (booking) =>
            booking.status === BookingStatus.Confirmed ||
            booking.status === BookingStatus.InProgress
        );
      case "pending":
        return sortedBookings.filter(
          (booking) =>
            booking.status === BookingStatus.Pending ||
            booking.status === BookingStatus.Paused
        );
      case "past":
        return sortedBookings.filter(
          (booking) =>
            booking.status === BookingStatus.Completed ||
            booking.status === BookingStatus.Cancelled
        );
      default:
        return sortedBookings;
    }
  };

  // Tab configuration with logical grouping
  const tabs = [
    {
      id: "all" as TabType,
      label: "All",
      count: sortedBookings.length,
      icon: List,
    },
    {
      id: "active" as TabType,
      label: "Active",
      count: sortedBookings.filter(
        (b) =>
          b.status === BookingStatus.Confirmed ||
          b.status === BookingStatus.InProgress
      ).length,
      icon: Play,
    },
    {
      id: "pending" as TabType,
      label: "Pending",
      count: sortedBookings.filter(
        (b) =>
          b.status === BookingStatus.Pending ||
          b.status === BookingStatus.Paused
      ).length,
      icon: Clock,
    },
    {
      id: "past" as TabType,
      label: "Past",
      count: sortedBookings.filter(
        (b) =>
          b.status === BookingStatus.Completed ||
          b.status === BookingStatus.Cancelled
      ).length,
      icon: Calendar,
    },
  ];

  // Get service icon
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

  // Get service color
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

  // Get status style
  const getStatusStyle = (status: BookingStatus) => {
    const styles = {
      [BookingStatus.Paused]: "paused",
      [BookingStatus.Confirmed]: "confirmed",
      [BookingStatus.Pending]: "pending",
      [BookingStatus.InProgress]: "inProgress",
      [BookingStatus.Completed]: "completed",
      [BookingStatus.Cancelled]: "cancelled",
    };
    return styles[status] || "default";
  };

  // Format date
  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateObj.toDateString() === today.toDateString()) {
      return "Today";
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
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
        onClick={() => handleCardClick(booking)}
      >
        {/* Main Content Grid */}
        <div className={styles.bookingCard__grid}>
          {/* Left Section - Service Info */}
          <div className={styles.bookingCard__left}>
            <div className={styles.bookingCard__serviceHeader}>
              <div
                className={styles.bookingCard__serviceIcon}
                style={{
                  backgroundColor: `${getServiceColor(booking.service_category)}15`,
                }}
              >
                <span>{getServiceIcon(booking.service_category)}</span>
              </div>
              <div className={styles.bookingCard__serviceDetails}>
                <h3 className={styles.bookingCard__serviceName}>
                  {booking.service.name}
                  {/* {booking.serviceDetails.recurring && (
                    <span className={styles.bookingCard__recurringBadge}>
                      <Repeat size={12} />
                      {booking.serviceDetails.frequency}
                    </span>
                  )} */}
                </h3>
                <p className={styles.bookingCard__service_category}>
                  {booking.service_category}
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
                <span>{booking.timeSlot}</span>
              </div>
              <div className={styles.bookingCard__infoItem}>
                <MapPin size={14} />
                <span>{booking.address.street}</span>
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
                {formatPrice(booking.totalPrice)}
              </span>
            </div>
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
                      {!booking.feedback && (
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

  // Get empty message for current tab
  const getEmptyMessage = (tabId: TabType) => {
    const messages = {
      all: "No bookings found",
      active: "No active bookings",
      pending: "No pending bookings",
      past: "No past bookings",
    };
    return messages[tabId] || "No bookings found";
  };

  return (
    <>
      <div className={styles.listView}>
        {/* Tabs */}
        <div className={styles.listView__tabs}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                className={`${styles.listView__tab} ${
                  isActive ? styles["listView__tab--active"] : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
                <span className={styles.listView__tabCount}>{tab.count}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className={styles.listView__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.listView__tabPanel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getFilteredBookings(activeTab).length === 0 ? (
                <div className={styles.listView__emptySection}>
                  <p>{getEmptyMessage(activeTab)}</p>
                </div>
              ) : (
                <div className={styles.listView__bookings}>
                  {getFilteredBookings(activeTab).map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
          refetchBookings={refetchBookings}
        />
      )}
    </>
  );
};

export default ListView;
