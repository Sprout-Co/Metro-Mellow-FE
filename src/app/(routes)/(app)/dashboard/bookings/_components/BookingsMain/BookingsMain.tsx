// src/app/(routes)/(app)/dashboard/bookings/_components/BookingsMain/BookingsMain.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  List,
  Plus,
  Filter,
  Search,
  CalendarDays,
  Grid3x3,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  Bell,
} from "lucide-react";
import styles from "./BookingsMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import CalendarView from "../CalendarView/CalendarView";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
// import { BookingStatus, ServiceCategory } from "../../types/booking";
import ListView from "../ListView/ListView";
import AppointmentCard from "@/components/ui/AppointmentCard";
import QuickActions from "../QuickActions/QuickActions";
import TimelineView from "../TimelineView/TimelineView";
import DashboardHeader from "../../../_components/DashboardHeader/DashboardHeader";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { Booking, ServiceCategory, BookingStatus } from "@/graphql/api";
// import TimelineView from "../TimelineView/TimelineView";
// import BookingStats from "../BookingStats/BookingStats";
// import QuickActions from "../QuickActions/QuickActions";

// Mock data (same as before)
// const mockBookings = [
//   {
//     id: "1",
//     serviceName: "Deep Home Cleaning",
//     service_category: ServiceCategory.Cleaning,
//     date: new Date(2024, 7, 15, 10, 0),
//     endTime: new Date(2024, 7, 15, 12, 0),
//     status: BookingStatus.Confirmed,
//     provider: "Maria Rodriguez",
//     address: "24 Emmanuel Osakwe Street, Lagos",
//     price: 25000,
//     notes: "Please focus on kitchen and bathrooms",
//     recurring: false,
//   },
//   {
//     id: "2",
//     serviceName: "Laundry Service",
//     service_category: ServiceCategory.Laundry,
//     date: new Date(2024, 7, 16, 14, 0),
//     endTime: new Date(2024, 7, 16, 15, 0),
//     status: BookingStatus.Upcoming,
//     provider: "Pending Assignment",
//     address: "24 Emmanuel Osakwe Street, Lagos",
//     price: 8000,
//     notes: "3 bags of laundry",
//     recurring: true,
//     frequency: "Weekly",
//   },
//   {
//     id: "3",
//     serviceName: "Meal Preparation",
//     service_category: ServiceCategory.Cooking,
//     date: new Date(2024, 7, 18, 17, 0),
//     endTime: new Date(2024, 7, 18, 19, 0),
//     status: BookingStatus.Upcoming,
//     provider: "Chef Kemi",
//     address: "24 Emmanuel Osakwe Street, Lagos",
//     price: 15000,
//     notes: "Vegetarian meals only",
//     recurring: false,
//   },
//   {
//     id: "4",
//     serviceName: "Grocery Shopping",
//     service_category: ServiceCategory.Errands,
//     date: new Date(2024, 7, 20, 9, 0),
//     endTime: new Date(2024, 7, 20, 11, 0),
//     status: BookingStatus.Pending,
//     provider: "James O.",
//     address: "Shoprite, Ikeja",
//     price: 5000,
//     notes: "Shopping list shared via email",
//     recurring: false,
//   },
//   {
//     id: "5",
//     serviceName: "Pest Control Treatment",
//     service_category: ServiceCategory.PestControl,
//     date: new Date(2024, 7, 25, 8, 0),
//     endTime: new Date(2024, 7, 25, 10, 0),
//     status: BookingStatus.Upcoming,
//     provider: "PestPro Team",
//     address: "24 Emmanuel Osakwe Street, Lagos",
//     price: 20000,
//     notes: "Monthly prevention service",
//     recurring: true,
//     frequency: "Monthly",
//   },
//   {
//     id: "6",
//     serviceName: "Office Cleaning",
//     service_category: ServiceCategory.Cleaning,
//     date: new Date(2024, 7, 10, 18, 0),
//     endTime: new Date(2024, 7, 10, 20, 0),
//     status: BookingStatus.Completed,
//     provider: "CleanPro Team",
//     address: "Metro Office, Victoria Island",
//     price: 35000,
//     notes: "Deep clean completed successfully",
//     recurring: false,
//     rating: 5,
//   },
//   {
//     id: "7",
//     serviceName: "Dry Cleaning",
//     service_category: ServiceCategory.Laundry,
//     date: new Date(2024, 7, 5, 10, 0),
//     endTime: new Date(2024, 7, 5, 11, 0),
//     status: BookingStatus.Cancelled,
//     provider: "Express Laundry",
//     address: "24 Emmanuel Osakwe Street, Lagos",
//     price: 12000,
//     notes: "Customer cancelled - rescheduled",
//     recurring: false,
//   },
//   {
//     id: "8",
//     serviceName: "Office Cleaning",
//     service_category: ServiceCategory.Cleaning,
//     date: new Date(new Date().setDate(new Date().getDate() + 1)), //tomorrow
//     endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
//     status: BookingStatus.Upcoming,
//     provider: "CleanPro Team",
//     address: "Metro Office, Victoria Island",
//     price: 35000,
//     notes: "Deep clean completed successfully",
//     recurring: false,
//     rating: 5,
//   },
// ];

// interface Booking {
//   id: string;
//   serviceName: string;
//   service_category: ServiceCategory;
//   date: Date;
//   endTime: Date;
//   status: BookingStatus;
//   provider: string;
//   address: string;
//   price: number;
//   notes?: string;
//   recurring: boolean;
//   frequency?: string;
//   rating?: number;
// }

type ViewMode = "calendar" | "list" | "timeline";

const BookingsMain: React.FC = () => {
  const { handleGetCustomerBookings } = useBookingOperations();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedservice_category, setSelectedservice_category] = useState<
    ServiceCategory | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "all">(
    "all"
  );
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerBookings, setCustomerBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const { data, loading } = await handleGetCustomerBookings();
        setBookings(data || []);
        setIsLoading(loading);
      } catch (error) {
        console.error("Failed to fetch customer bookings:", error);
        setCustomerBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [handleGetCustomerBookings]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.service?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.staff?.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          b.address?.label?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by service type
    if (selectedservice_category !== "all") {
      filtered = filtered.filter(
        (b) => b.service_category === selectedservice_category
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((b) => b.status === selectedStatus);
    }

    // Filter by date range
    const now = new Date();
    if (selectedDateRange === "today") {
      filtered = filtered.filter((b) => {
        const bookingDate = new Date(b.date);
        return bookingDate.toDateString() === now.toDateString();
      });
    } else if (selectedDateRange === "week") {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      filtered = filtered.filter((b) => {
        const bookingDate = new Date(b.date);
        return bookingDate >= now && bookingDate <= weekFromNow;
      });
    } else if (selectedDateRange === "month") {
      const monthFromNow = new Date();
      monthFromNow.setMonth(monthFromNow.getMonth() + 1);
      filtered = filtered.filter((b) => {
        const bookingDate = new Date(b.date);
        return bookingDate >= now && bookingDate <= monthFromNow;
      });
    }

    return filtered;
  }, [
    bookings,
    selectedservice_category,
    selectedStatus,
    selectedDateRange,
    searchQuery,
  ]);

  // Get next upcoming booking
  const nextBooking = useMemo(() => {
    const now = new Date();
    const upcoming = bookings
      .filter((b) => {
        const bookingDate = new Date(b.date);
        return bookingDate > now && b.status === BookingStatus.Confirmed;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcoming[0] || null;
  }, [bookings]);

  const handleAddBooking = () => {
    console.log("Add new booking");
    // Navigate to booking form or open modal
  };

  const handleExportData = () => {
    console.log("Export bookings data");
    // Implement export functionality
  };

  const handleservice_categoryChange = (value: string) => {
    setSelectedservice_category(value as ServiceCategory | "all");
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as BookingStatus | "all");
  };

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value);
  };

  return (
    <div className={styles.bookingsMain}>
      {/* Header Section */}
      <DashboardHeader
        title="My Bookings"
        subtitle="Manage and track all your service appointments"
        actionBtnText="Book Service"
        actionBtnIcon={<Plus size={18} />}
        onActionButtonClick={handleAddBooking}
        booking={nextBooking || bookings[0] || ({} as Booking)}
        upcomingService={
          nextBooking
            ? {
                serviceName: nextBooking.service?.name || "",
                service_category: nextBooking.service_category,
                date: nextBooking.date.toISOString(),
                status: nextBooking.status,
                provider: nextBooking.staff?.firstName || "",
              }
            : undefined
        }
      />

      {/* Quick Actions */}
      <QuickActions />

      {/* Controls Section */}
      <div className={styles.bookingsMain__controls}>
        <div className={styles.bookingsMain__controlsLeft}>
          {/* Search Bar */}
          <div className={styles.bookingsMain__searchContainer}>
            <Search className={styles.bookingsMain__searchIcon} />
            <input
              type="text"
              placeholder="Search bookings..."
              className={styles.bookingsMain__searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Toggle */}
          <div className={styles.bookingsMain__viewToggle}>
            <motion.button
              className={`${styles.bookingsMain__viewBtn} ${
                viewMode === "list"
                  ? styles["bookingsMain__viewBtn--active"]
                  : ""
              }`}
              onClick={() => setViewMode("list")}
              whileTap={{ scale: 0.95 }}
            >
              <List />
              <span>List</span>
            </motion.button>
            <motion.button
              className={`${styles.bookingsMain__viewBtn} ${
                viewMode === "calendar"
                  ? styles["bookingsMain__viewBtn--active"]
                  : ""
              }`}
              onClick={() => setViewMode("calendar")}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar />
              <span>Calendar</span>
            </motion.button>
            <motion.button
              className={`${styles.bookingsMain__viewBtn} ${
                viewMode === "timeline"
                  ? styles["bookingsMain__viewBtn--active"]
                  : ""
              }`}
              onClick={() => setViewMode("timeline")}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3x3 />
              <span>Timeline</span>
            </motion.button>
          </div>
        </div>

        <div className={styles.bookingsMain__controlsRight}>
          {/* Filters */}
          <div className={styles.bookingsMain__filters}>
            <FilterDropdown
              label="Service"
              value={selectedservice_category}
              onChange={handleservice_categoryChange}
              options={[
                { value: "all", label: "All Services" },
                { value: ServiceCategory.Cleaning, label: "Cleaning" },
                { value: ServiceCategory.Laundry, label: "Laundry" },
                { value: ServiceCategory.Cooking, label: "Cooking" },
                { value: ServiceCategory.Errands, label: "Errands" },
                { value: ServiceCategory.PestControl, label: "Pest Control" },
              ]}
            />
            <FilterDropdown
              label="Status"
              value={selectedStatus}
              onChange={handleStatusChange}
              options={[
                { value: "all", label: "All Status" },
                { value: BookingStatus.Paused, label: "Paused" },
                { value: BookingStatus.Confirmed, label: "Confirmed" },
                { value: BookingStatus.Pending, label: "Pending" },
                { value: BookingStatus.InProgress, label: "In Progress" },
                { value: BookingStatus.Completed, label: "Completed" },
                { value: BookingStatus.Cancelled, label: "Cancelled" },
              ]}
            />
            <FilterDropdown
              label="Date"
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              options={[
                { value: "all", label: "All Time" },
                { value: "today", label: "Today" },
                { value: "week", label: "This Week" },
                { value: "month", label: "This Month" },
              ]}
            />
          </div>

          {/* Export Button */}
          <motion.button
            className={styles.bookingsMain__exportBtn}
            onClick={handleExportData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Export
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.bookingsMain__content}>
        <AnimatePresence mode="wait">
          {viewMode === "calendar" ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarView bookings={filteredBookings} />
            </motion.div>
          ) : viewMode === "timeline" ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TimelineView bookings={filteredBookings} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ListView bookings={filteredBookings} />
            </motion.div>
          )}
        </AnimatePresence>

        {filteredBookings.length === 0 && (
          <div className={styles.bookingsMain__emptyState}>
            <div className={styles.bookingsMain__emptyIcon}>
              <CalendarDays />
            </div>
            <h3 className={styles.bookingsMain__emptyTitle}>
              No bookings found
            </h3>
            <p className={styles.bookingsMain__emptyText}>
              {searchQuery ||
              selectedservice_category !== "all" ||
              selectedStatus !== "all" ||
              selectedDateRange !== "all"
                ? "Try adjusting your filters to see more bookings"
                : "You don't have any bookings yet. Click the button below to schedule your first service."}
            </p>
            <FnButton variant="primary" onClick={handleAddBooking}>
              <Plus size={18} />
              Book Your First Service
            </FnButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsMain;
