"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./bookings.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import ConfirmationModal from "../_components/UI/ConfirmationModal/ConfirmationModal";
import BookingModal from "../_components/UI/BookingModal/BookingModal";
import { motion } from "framer-motion";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { BookingStatus, Booking } from "@/graphql/api";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [dateFilter, setDateFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingModalMode, setBookingModalMode] = useState<"view" | "edit">(
    "view"
  );

  // Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "status_change";
    bookingId: string;
    newStatus: BookingStatus;
    title: string;
    message: string;
  } | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    handleGetBookings,
    handleCancelBooking,
    handleCompleteBooking,
    handleUpdateBookingStatus,
  } = useBookingOperations();

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await handleGetBookings();
      setBookings((data as Booking[]) || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch bookings"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookingsByDate = (booking: Booking) => {
    if (dateFilter === "all") return true;

    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (dateFilter) {
      case "today":
        return bookingDate.toDateString() === today.toDateString();
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return bookingDate >= weekAgo && bookingDate <= today;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return bookingDate >= monthAgo && bookingDate <= today;
      default:
        return true;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      `${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesDate = filterBookingsByDate(booking);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const openStatusConfirmation = (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    const booking = bookings.find((b) => b.id === bookingId);
    const customerName = booking?.customer
      ? `${booking.customer.firstName || ""} ${booking.customer.lastName || ""}`.trim()
      : "Unknown";

    let title = "";
    let message = "";

    switch (newStatus) {
      case BookingStatus.Cancelled:
        title = "Cancel Booking";
        message = `Are you sure you want to cancel the booking for ${customerName}? This action cannot be undone.`;
        break;
      case BookingStatus.Completed:
        title = "Complete Booking";
        message = `Mark the booking for ${customerName} as completed?`;
        break;
      case BookingStatus.Confirmed:
        title = "Confirm Booking";
        message = `Confirm the booking for ${customerName}?`;
        break;
      case BookingStatus.InProgress:
        title = "Start Booking";
        message = `Mark the booking for ${customerName} as in progress?`;
        break;
      default:
        title = "Update Status";
        message = `Update the booking status for ${customerName}?`;
    }

    setConfirmAction({
      type: "status_change",
      bookingId,
      newStatus,
      title,
      message,
    });
    setShowConfirmModal(true);
  };

  const handleConfirmedStatusUpdate = async () => {
    if (!confirmAction) return;

    try {
      setIsActionLoading(true);
      setError(null);

      const { bookingId, newStatus } = confirmAction;

      if (newStatus === BookingStatus.Cancelled) {
        await handleCancelBooking(bookingId);
      } else if (newStatus === BookingStatus.Completed) {
        await handleCompleteBooking(bookingId);
      } else {
        await handleUpdateBookingStatus(bookingId, newStatus);
      }

      await fetchBookings();
      setShowConfirmModal(false);
      setConfirmAction(null);
    } catch (error) {
      console.error("Error updating booking status:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update booking status"
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReschedule = (
    bookingId: string,
    newDate: string,
    newTime: string
  ) => {
    // Implement reschedule functionality
    console.log("Rescheduling booking:", bookingId, newDate, newTime);
    // This would call your reschedule API
  };

  const openBookingModal = (mode: "view" | "edit", booking: Booking) => {
    setSelectedBooking(booking);
    setBookingModalMode(mode);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case BookingStatus.Pending:
        return "pending";
      case BookingStatus.Confirmed:
        return "active";
      case BookingStatus.InProgress:
        return "active";
      case BookingStatus.Completed:
        return "completed";
      case BookingStatus.Cancelled:
        return "cancelled";
      default:
        return "pending";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeSlot: unknown) => {
    if (!timeSlot || typeof timeSlot !== "object") return "N/A";
    const slot = timeSlot as { startTime?: string; endTime?: string };
    return `${slot.startTime || ""} - ${slot.endTime || ""}`;
  };

  // Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === BookingStatus.Pending).length,
    completed: bookings.filter((b) => b.status === BookingStatus.Completed)
      .length,
    revenue: bookings
      .filter((b) => b.status === BookingStatus.Completed)
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      width: "8%",
      sortable: true,
      render: (value: string) => (
        <span className={styles.bookings_page__booking_id}>
          #{value.slice(-8)}
        </span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      width: "20%",
      render: (value: unknown) => {
        const customer = value as {
          firstName?: string;
          lastName?: string;
          email?: string;
          phoneNumber?: string;
        };
        const fullName =
          `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim() ||
          "N/A";
        return (
          <div className={styles.bookings_page__customer_cell}>
            <div className={styles.bookings_page__customer_avatar}>
              {customer?.firstName?.charAt(0) || "N"}
            </div>
            <div className={styles.bookings_page__customer_details}>
              <div className={styles.bookings_page__customer_name}>
                {fullName}
              </div>
              <div className={styles.bookings_page__customer_contact}>
                <div className={styles.bookings_page__customer_email}>
                  {customer?.email || "N/A"}
                </div>
                <div className={styles.bookings_page__customer_phone}>
                  {customer?.phoneNumber || "N/A"}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "service",
      header: "Service",
      width: "15%",
      sortable: true,
      render: (value: unknown) => {
        const service = value as { name?: string; category?: string };
        return (
          <div className={styles.bookings_page__service_cell}>
            <div className={styles.bookings_page__service_name}>
              {service?.name || "N/A"}
            </div>
            <div className={styles.bookings_page__service_category}>
              {service?.category || ""}
            </div>
          </div>
        );
      },
    },
    {
      key: "date",
      header: "Schedule",
      width: "18%",
      sortable: true,
      render: (value: string, item: Booking) => (
        <div className={styles.bookings_page__schedule_cell}>
          <div className={styles.bookings_page__schedule_icon}>📅</div>
          <div className={styles.bookings_page__schedule_details}>
            <div className={styles.bookings_page__schedule_date}>
              {formatDate(value)}
            </div>
            <div className={styles.bookings_page__schedule_time}>
              {formatTime(item.timeSlot)}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "totalPrice",
      header: "Price",
      width: "10%",
      sortable: true,
      render: (value: number) => (
        <span className={styles.bookings_page__price}>
          ${value?.toFixed(2) || "0.00"}
        </span>
      ),
    },
    {
      key: "assignedStaff",
      header: "Staff",
      width: "12%",
      render: (value: unknown) => {
        const staff = value as { firstName?: string; lastName?: string };
        if (!staff?.firstName) {
          return (
            <span className={styles.bookings_page__no_staff}>Unassigned</span>
          );
        }
        return (
          <div className={styles.bookings_page__staff_cell}>
            <div className={styles.bookings_page__staff_avatar}>
              {staff.firstName.charAt(0)}
            </div>
            <div className={styles.bookings_page__staff_name}>
              {`${staff.firstName} ${staff.lastName || ""}`.trim()}
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      width: "10%",
      sortable: true,
      render: (value: string) => (
        <StatusBadge
          status={getStatusColor(value) as any}
          label={value.replace(/([A-Z])/g, " $1").trim()}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "7%",
      render: (_value: unknown, row: unknown) => {
        const booking = row as Booking;
        return (
          <div className={styles.bookings_page__actions_cell}>
            <button
              className={`${styles.bookings_page__action_button} ${styles["bookings_page__action_button--view"]}`}
              onClick={(e) => {
                e.stopPropagation();
                openBookingModal("view", booking);
              }}
              title="View details"
            >
              👁️
            </button>
            <button
              className={`${styles.bookings_page__action_button} ${styles["bookings_page__action_button--edit"]}`}
              onClick={(e) => {
                e.stopPropagation();
                openBookingModal("edit", booking);
              }}
              title="Edit booking"
            >
              ✏️
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <AdminDashboardLayout
      title="Bookings"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Bookings", path: "/admin/bookings" },
      ]}
    >
      <div className={styles.bookings_page}>
        <div className={styles.bookings_page__header}>
          <div className={styles.bookings_page__header_content}>
            <div className={styles.bookings_page__title_area}>
              <motion.h1
                className={styles.bookings_page__title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Booking Management
              </motion.h1>
              <motion.p
                className={styles.bookings_page__subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Manage all service bookings, track schedules, and monitor
                customer appointments
              </motion.p>
            </div>

            <motion.div
              className={styles.bookings_page__actions}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                variant="secondary"
                size="medium"
                icon="↻"
                onClick={fetchBookings}
              >
                Refresh
              </Button>
              <Button
                variant="primary"
                size="medium"
                icon="+"
                onClick={() =>
                  console.log("Create booking functionality to be implemented")
                }
              >
                Add Booking
              </Button>
            </motion.div>
          </div>
        </div>

        {error && (
          <motion.div
            className={styles.bookings_page__error}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.bookings_page__error_content}>
              <span className={styles.bookings_page__error_icon}>⚠️</span>
              <span className={styles.bookings_page__error_message}>
                {error}
              </span>
              <button
                className={styles.bookings_page__error_dismiss}
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        <div className={styles.bookings_page__stats_container}>
          <div className={styles.bookings_page__stats}>
            <motion.div
              className={styles.bookings_page__stat_card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.bookings_page__stat_header}>
                <div
                  className={`${styles.bookings_page__stat_icon} ${styles["bookings_page__stat_icon--total"]}`}
                >
                  📊
                </div>
                <span
                  className={`${styles.bookings_page__stat_trend} ${styles["bookings_page__stat_trend--up"]}`}
                >
                  +12%
                </span>
              </div>
              <h3 className={styles.bookings_page__stat_value}>
                {stats.total}
              </h3>
              <p className={styles.bookings_page__stat_label}>Total Bookings</p>
            </motion.div>

            <motion.div
              className={styles.bookings_page__stat_card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.bookings_page__stat_header}>
                <div
                  className={`${styles.bookings_page__stat_icon} ${styles["bookings_page__stat_icon--pending"]}`}
                >
                  ⏳
                </div>
              </div>
              <h3 className={styles.bookings_page__stat_value}>
                {stats.pending}
              </h3>
              <p className={styles.bookings_page__stat_label}>Pending</p>
            </motion.div>

            <motion.div
              className={styles.bookings_page__stat_card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.bookings_page__stat_header}>
                <div
                  className={`${styles.bookings_page__stat_icon} ${styles["bookings_page__stat_icon--completed"]}`}
                >
                  ✅
                </div>
                <span
                  className={`${styles.bookings_page__stat_trend} ${styles["bookings_page__stat_trend--up"]}`}
                >
                  +8%
                </span>
              </div>
              <h3 className={styles.bookings_page__stat_value}>
                {stats.completed}
              </h3>
              <p className={styles.bookings_page__stat_label}>Completed</p>
            </motion.div>

            <motion.div
              className={styles.bookings_page__stat_card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.bookings_page__stat_header}>
                <div
                  className={`${styles.bookings_page__stat_icon} ${styles["bookings_page__stat_icon--revenue"]}`}
                >
                  💰
                </div>
                <span
                  className={`${styles.bookings_page__stat_trend} ${styles["bookings_page__stat_trend--up"]}`}
                >
                  +15%
                </span>
              </div>
              <h3 className={styles.bookings_page__stat_value}>
                ${stats.revenue.toFixed(0)}
              </h3>
              <p className={styles.bookings_page__stat_label}>Revenue</p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className={styles.bookings_page__content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className={styles.bookings_page__filters}>
            <div className={styles.bookings_page__filters_row}>
              <div className={styles.bookings_page__search}>
                <span className={styles.bookings_page__search_icon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search by customer name, booking ID, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.bookings_page__search_input}
                />
              </div>

              <div className={styles.bookings_page__filter_group}>
                <div className={styles.bookings_page__filter_dropdown}>
                  <select
                    className={styles.bookings_page__filter_select}
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as BookingStatus | "all")
                    }
                  >
                    <option value="all">All Status</option>
                    <option value={BookingStatus.Pending}>Pending</option>
                    <option value={BookingStatus.Confirmed}>Confirmed</option>
                    <option value={BookingStatus.InProgress}>
                      In Progress
                    </option>
                    <option value={BookingStatus.Completed}>Completed</option>
                    <option value={BookingStatus.Cancelled}>Cancelled</option>
                  </select>
                  <span className={styles.bookings_page__filter_icon}>▼</span>
                </div>

                <div className={styles.bookings_page__filter_dropdown}>
                  <select
                    className={styles.bookings_page__filter_select}
                    value={dateFilter}
                    onChange={(e) =>
                      setDateFilter(
                        e.target.value as "all" | "today" | "week" | "month"
                      )
                    }
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <span className={styles.bookings_page__filter_icon}>▼</span>
                </div>
              </div>
            </div>

            {(statusFilter !== "all" ||
              dateFilter !== "all" ||
              searchQuery) && (
              <div className={styles.bookings_page__filter_chips}>
                {statusFilter !== "all" && (
                  <button
                    className={styles.bookings_page__filter_chip}
                    onClick={() => setStatusFilter("all")}
                  >
                    {statusFilter.replace(/([A-Z])/g, " $1").trim()} ×
                  </button>
                )}
                {dateFilter !== "all" && (
                  <button
                    className={styles.bookings_page__filter_chip}
                    onClick={() => setDateFilter("all")}
                  >
                    {dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)} ×
                  </button>
                )}
                {searchQuery && (
                  <button
                    className={styles.bookings_page__filter_chip}
                    onClick={() => setSearchQuery("")}
                  >
                    Search: {searchQuery} ×
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={styles.bookings_page__table_container}>
            <Table
              columns={columns}
              data={filteredBookings}
              loading={isLoading}
              selectable={false}
              pagination={{
                enabled: true,
                pageSize: 10,
                showSizeSelector: true,
              }}
              onRowClick={(booking) =>
                openBookingModal("view", booking as Booking)
              }
              highlightOnHover
            />
          </div>
        </motion.div>

        {/* Booking Details Modal */}
        <BookingModal
          isOpen={showBookingModal}
          onClose={closeBookingModal}
          booking={selectedBooking}
          mode={bookingModalMode}
          onStatusUpdate={openStatusConfirmation}
          onReschedule={handleReschedule}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setConfirmAction(null);
          }}
          onConfirm={handleConfirmedStatusUpdate}
          title={confirmAction?.title || ""}
          message={confirmAction?.message || ""}
          confirmText="Confirm"
          cancelText="Cancel"
          variant={
            confirmAction?.newStatus === BookingStatus.Cancelled
              ? "danger"
              : "warning"
          }
          isLoading={isActionLoading}
        />
      </div>
    </AdminDashboardLayout>
  );
}
