"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./bookings.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import { motion } from "framer-motion";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { BookingStatus, Booking } from "@/graphql/api";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Modal state for future implementation
  // const [selectedBooking, setSelectedBooking] = useState<unknown>(null);
  // const [showModal, setShowModal] = useState(false);
  // const [modalType, setModalType] = useState<"create" | "edit" | "view">("view");

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

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      `${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || booking.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    try {
      setError(null);
      if (newStatus === BookingStatus.Cancelled) {
        await handleCancelBooking(bookingId);
      } else if (newStatus === BookingStatus.Completed) {
        await handleCompleteBooking(bookingId);
      } else {
        await handleUpdateBookingStatus(bookingId, newStatus);
      }
      await fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update booking status"
      );
    }
  };

  const openModal = (_type: "create" | "edit" | "view", _booking?: unknown) => {
    // Modal functionality to be implemented
    console.log("Modal functionality to be implemented");
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
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeSlot: unknown) => {
    if (!timeSlot || typeof timeSlot !== "object") return "N/A";
    const slot = timeSlot as { startTime?: string; endTime?: string };
    return `${slot.startTime || ""} - ${slot.endTime || ""}`;
  };

  const columns = [
    {
      key: "id",
      header: "Booking ID",
      width: "10%",
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
        };
        const fullName =
          `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim() ||
          "N/A";
        return (
          <div className={styles.bookings_page__customer_cell}>
            <div className={styles.bookings_page__customer_initial}>
              {customer?.firstName?.charAt(0) || "N"}
            </div>
            <div className={styles.bookings_page__customer_info}>
              <div className={styles.bookings_page__customer_name}>
                {fullName}
              </div>
              <div className={styles.bookings_page__customer_email}>
                {customer?.email || "N/A"}
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
      render: (value: unknown) => (value as { name?: string })?.name || "N/A",
    },
    {
      key: "date",
      header: "Date",
      width: "10%",
      render: (value: string) => formatDate(value),
    },
    {
      key: "timeSlot",
      header: "Time",
      width: "10%",
      render: (value: unknown) => formatTime(value),
    },
    {
      key: "totalPrice",
      header: "Price",
      width: "10%",
      render: (value: number) => (
        <span className={styles.bookings_page__price}>
          ${value?.toFixed(2) || "0.00"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "10%",
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
      width: "15%",
      render: (_value: unknown, row: unknown) => {
        const booking = row as { id: string; status: BookingStatus };
        return (
          <div className={styles.bookings_page__actions_cell}>
            <button
              className={styles.bookings_page__action_button}
              onClick={() => openModal("view", row)}
            >
              View
            </button>
            <button
              className={styles.bookings_page__action_button}
              onClick={() => openModal("edit", row)}
            >
              Edit
            </button>
            {booking.status !== BookingStatus.Completed &&
              booking.status !== BookingStatus.Cancelled && (
                <select
                  className={styles.bookings_page__status_select}
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      booking.id,
                      e.target.value as BookingStatus
                    )
                  }
                >
                  <option value={BookingStatus.Pending}>Pending</option>
                  <option value={BookingStatus.Confirmed}>Confirmed</option>
                  <option value={BookingStatus.InProgress}>In Progress</option>
                  <option value={BookingStatus.Completed}>Completed</option>
                  <option value={BookingStatus.Cancelled}>Cancelled</option>
                </select>
              )}
          </div>
        );
      },
    },
  ];

  const bookingStats = [
    { label: "Total Bookings", value: bookings.length },
    {
      label: "Pending",
      value: bookings.filter((b) => b.status === BookingStatus.Pending).length,
    },
    {
      label: "Completed",
      value: bookings.filter((b) => b.status === BookingStatus.Completed)
        .length,
    },
    {
      label: "Revenue",
      value: `$${bookings
        .filter((b) => b.status === BookingStatus.Completed)
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
        .toFixed(2)}`,
    },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: BookingStatus.Pending, label: "Pending" },
    { value: BookingStatus.Confirmed, label: "Confirmed" },
    { value: BookingStatus.InProgress, label: "In Progress" },
    { value: BookingStatus.Completed, label: "Completed" },
    { value: BookingStatus.Cancelled, label: "Cancelled" },
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
          <div className={styles.bookings_page__title_area}>
            <h2 className={styles.bookings_page__title}>Booking Management</h2>
            <p className={styles.bookings_page__subtitle}>
              View and manage all service bookings
            </p>
          </div>

          <div className={styles.bookings_page__actions}>
            <Button
              variant="primary"
              size="medium"
              icon="+"
              onClick={() => openModal("create")}
            >
              Add Booking
            </Button>
          </div>
        </div>

        {error && (
          <div className={styles.bookings_page__error}>
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
          </div>
        )}

        <div className={styles.bookings_page__stats}>
          {bookingStats.map((stat, index) => (
            <Card key={index} className={styles.bookings_page__stat_card}>
              <h3 className={styles.bookings_page__stat_label}>{stat.label}</h3>
              <p className={styles.bookings_page__stat_value}>{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className={styles.bookings_page__content}>
          <div className={styles.bookings_page__filters}>
            <div className={styles.bookings_page__search}>
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.bookings_page__search_input}
              />
            </div>

            <div className={styles.bookings_page__filter_buttons}>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.bookings_page__filter_button} ${
                    activeFilter === option.value
                      ? styles["bookings_page__filter_button--active"]
                      : ""
                  }`}
                  onClick={() =>
                    setActiveFilter(option.value as BookingStatus | "all")
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className={styles.bookings_page__loading}>
                Loading bookings...
              </div>
            ) : (
              <Table
                columns={columns}
                data={filteredBookings}
                onRowClick={(booking) => openModal("view", booking)}
              />
            )}
          </motion.div>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
