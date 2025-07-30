"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./bookings.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import ConfirmationModal from "../_components/UI/ConfirmationModal/ConfirmationModal";
import { motion } from "framer-motion";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { BookingStatus, Booking, PaymentStatus, TimeSlot } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import { Icon } from "@/components/ui/Icon/Icon";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Modal states
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

  const viewBooking = (booking: Booking) => {
    router.push(`/admin/bookings/${booking.id}`);
  };

  const columns = [
    {
      key: "customer",
      header: "Customer",
      width: "18%",
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
              <div className={styles.bookings_page__customer_phone}>
                {customer?.phoneNumber || "N/A"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "service",
      header: "Service",
      width: "12%",
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
      header: "Date",
      width: "10%",
      render: (value: string) => (
        <div className={styles.bookings_page__date_cell}>
          <div className={styles.bookings_page__date_main}>
            {formatDate(value)}
          </div>
          <div className={styles.bookings_page__date_day}>
            {new Date(value).toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        </div>
      ),
    },
    {
      key: "timeSlot",
      header: "Time",
      width: "8%",
      render: (value: TimeSlot) => (
        <div className={styles.bookings_page__time_cell}>{value}</div>
      ),
    },
    {
      key: "totalPrice",
      header: "Price",
      width: "8%",
      render: (value: number) => (
        <span className={styles.bookings_page__price}>
          {formatToNaira(value)}
        </span>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      width: "12%",
      render: (value: PaymentStatus) => {
        const getPaymentStatusColor = (status: PaymentStatus) => {
          switch (status) {
            case PaymentStatus.Paid:
              return "completed";
            case PaymentStatus.Pending:
              return "pending";
            case PaymentStatus.Failed:
              return "cancelled";
            case PaymentStatus.PartiallyRefunded:
              return "warning";
            case PaymentStatus.Refunded:
              return "cancelled";
            default:
              return "pending";
          }
        };

        const getPaymentStatusLabel = (status: PaymentStatus) => {
          switch (status) {
            case PaymentStatus.Paid:
              return "Paid";
            case PaymentStatus.Pending:
              return "Pending";
            case PaymentStatus.Failed:
              return "Failed";
            case PaymentStatus.PartiallyRefunded:
              return "Partial Refund";
            case PaymentStatus.Refunded:
              return "Refunded";
            default:
              return status.replace(/([A-Z])/g, " $1").trim();
          }
        };

        return (
          <StatusBadge
            status={getPaymentStatusColor(value) as any}
            label={getPaymentStatusLabel(value)}
          />
        );
      },
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
      width: "14%",
      render: (_value: unknown, row: unknown) => {
        const booking = row as Booking;
        return (
          <>
            <div className={styles.bookings_page__actions_cell}>
              <button
                className={styles.bookings_page__action_button}
                onClick={() => viewBooking(booking)}
                title="View details"
              >
                View
              </button>
              <button
                className={styles.bookings_page__action_button}
                onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                title="Edit booking"
              >
                Edit
              </button>
              {booking.status !== BookingStatus.Completed &&
                booking.status !== BookingStatus.Cancelled && (
                  <select
                    className={styles.bookings_page__status_select}
                    value={booking.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      openStatusConfirmation(
                        booking.id,
                        e.target.value as BookingStatus
                      );
                    }}
                    title="Change status"
                  >
                    <option value={BookingStatus.Pending}>Pending</option>
                    <option value={BookingStatus.Confirmed}>Confirmed</option>
                    <option value={BookingStatus.InProgress}>
                      In Progress
                    </option>
                    <option value={BookingStatus.Completed}>Completed</option>
                    <option value={BookingStatus.Cancelled}>Cancelled</option>
                  </select>
                )}
            </div>
          </>
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
              onClick={() => router.push("/admin/bookings/add")}
            >
              Add Booking
            </Button>
          </div>
        </div>

        {error && (
          <div className={styles.bookings_page__error}>
            <div className={styles.bookings_page__error_content}>
              <Icon
                name="alert-triangle"
                size={16}
                className={styles.bookings_page__error_icon}
              />
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
                onRowClick={viewBooking}
              />
            )}
          </motion.div>
        </Card>

        {/* Booking Details Modal */}
        {/* <BookingModal
          isOpen={showBookingModal}
          onClose={closeBookingModal}
          booking={selectedBooking}
          mode={bookingModalMode}
          onStatusUpdate={openStatusConfirmation}
          onReschedule={handleBookingReschedule}
        /> */}

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
