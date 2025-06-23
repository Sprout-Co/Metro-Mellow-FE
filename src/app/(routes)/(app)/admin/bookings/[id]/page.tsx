"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./BookingDetails.module.scss";
import Card from "../../_components/UI/Card/Card";
import Button from "../../_components/UI/Button/Button";
import ConfirmationModal from "../../_components/UI/ConfirmationModal/ConfirmationModal";
import StatusBadge from "../../_components/UI/StatusBadge/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  BookingStatus,
  Booking,
  PaymentStatus,
  TimeSlot,
  ServiceCategory,
  CleaningType,
  PropertyType,
  LaundryType,
} from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import { Icon } from "@/components/ui/Icon/Icon";
import BookServiceModal from "../../../dashboard/_components/overview/BookServiceModal";

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Status confirmation modal states
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(
    null
  );

  // Edit booking modal state
  const [showEditModal, setShowEditModal] = useState(false);

  // Cancel booking confirmation modal state
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Staff assignment modal state
  const [showAssignStaffModal, setShowAssignStaffModal] = useState(false);

  // Action loading state
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    handleGetBooking,
    handleCancelBooking: handleCancelBookingOperation,
    handleCompleteBooking,
    handleUpdateBookingStatus,
  } = useBookingOperations();

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await handleGetBooking(bookingId);
      setBooking(data as Booking);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch booking details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (status: BookingStatus) => {
    setSelectedStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedStatus || !booking) return;

    try {
      setIsActionLoading(true);

      if (selectedStatus === BookingStatus.Cancelled) {
        await handleCancelBookingOperation(booking.id);
      } else if (selectedStatus === BookingStatus.Completed) {
        await handleCompleteBooking(booking.id);
      } else {
        await handleUpdateBookingStatus(booking.id, selectedStatus);
      }

      // Refetch booking details to update the UI
      await fetchBookingDetails();
      setShowStatusModal(false);
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

  const handleCancelBooking = async () => {
    if (!booking) return;

    try {
      setIsActionLoading(true);
      await handleCancelBookingOperation(booking.id);
      await fetchBookingDetails();
      setShowCancelModal(false);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setError(
        error instanceof Error ? error.message : "Failed to cancel booking"
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeSlotLabel = (timeSlot: TimeSlot) => {
    switch (timeSlot) {
      case TimeSlot.Morning:
        return "Morning (6:00 AM - 12:00 PM)";
      case TimeSlot.Afternoon:
        return "Afternoon (12:00 PM - 6:00 PM)";
      case TimeSlot.Evening:
        return "Evening (6:00 PM - 10:00 PM)";
      default:
        return timeSlot;
    }
  };

  const getStatusBadgeClass = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Pending:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--pending"]
        );
      case BookingStatus.Confirmed:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--confirmed"]
        );
      case BookingStatus.InProgress:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--in-progress"]
        );
      case BookingStatus.Completed:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--completed"]
        );
      case BookingStatus.Cancelled:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--cancelled"]
        );
      default:
        return styles.booking_details__status_badge;
    }
  };

  const getPaymentStatusBadgeClass = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Paid:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--paid"]
        );
      case PaymentStatus.Pending:
      case PaymentStatus.Failed:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--unpaid"]
        );
      case PaymentStatus.PartiallyRefunded:
      case PaymentStatus.Refunded:
        return (
          styles.booking_details__status_badge +
          " " +
          styles["booking_details__status_badge--cancelled"]
        );
      default:
        return styles.booking_details__status_badge;
    }
  };

  const getServiceCategoryLabel = (category?: ServiceCategory) => {
    if (!category) return "N/A";

    switch (category) {
      case ServiceCategory.Cleaning:
        return "Home Cleaning";
      case ServiceCategory.Laundry:
        return "Laundry Services";
      case ServiceCategory.Cooking:
        return "Meal Preparation";
      case ServiceCategory.Errands:
        return "Errands & Tasks";
      case ServiceCategory.PestControl:
        return "Pest Control";
      default:
        return category.replace(/([A-Z])/g, " $1").trim();
    }
  };

  const getCleaningTypeLabel = (type?: CleaningType) => {
    if (!type) return "N/A";

    switch (type) {
      case CleaningType.Regular:
        return "Regular Cleaning";
      case CleaningType.DeepCleaning:
        return "Deep Cleaning";
      case CleaningType.MovingIn:
        return "Move-in Cleaning";
      case CleaningType.MovingOut:
        return "Move-out Cleaning";
      default:
        return type.replace(/([A-Z])/g, " $1").trim();
    }
  };

  const getPropertyTypeLabel = (type?: PropertyType) => {
    if (!type) return "N/A";

    switch (type) {
      case PropertyType.Apartment:
        return "Apartment";
      case PropertyType.House:
        return "House";
      case PropertyType.Office:
        return "Office";
      case PropertyType.Studio:
        return "Studio";
      default:
        return type;
    }
  };

  const getLaundryTypeLabel = (type?: LaundryType) => {
    if (!type) return "N/A";

    switch (type) {
      case LaundryType.WashAndFold:
        return "Wash & Fold";
      case LaundryType.WashAndIron:
        return "Wash & Iron";
      case LaundryType.DryClean:
        return "Dry Cleaning";
      default:
        return type.replace(/([A-Z])/g, " $1").trim();
    }
  };

  if (isLoading) {
    return (
      <AdminDashboardLayout
        title="Booking Details"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Bookings", path: "/admin/bookings" },
          { label: "Loading...", path: "" },
        ]}
      >
        <div className={styles.booking_details__loading}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading booking details...
          </motion.div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (error) {
    return (
      <AdminDashboardLayout
        title="Booking Details"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Bookings", path: "/admin/bookings" },
          { label: "Error", path: "" },
        ]}
      >
        <div className={styles.booking_details__error}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>Error loading booking details: {error}</p>
            <Button
              variant="secondary"
              size="small"
              onClick={() => fetchBookingDetails()}
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!booking) {
    return (
      <AdminDashboardLayout
        title="Booking Details"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Bookings", path: "/admin/bookings" },
          { label: "Not Found", path: "" },
        ]}
      >
        <div className={styles.booking_details__error}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>
              Booking not found. It may have been deleted or you don't have
              permission to view it.
            </p>
            <Button
              variant="primary"
              size="small"
              onClick={() => router.push("/admin/bookings")}
            >
              Back to Bookings
            </Button>
          </motion.div>
        </div>
      </AdminDashboardLayout>
    );
  }

  // Get customer name
  const customerName = booking.customer
    ? `${booking.customer.firstName || ""} ${booking.customer.lastName || ""}`.trim()
    : "Unknown Customer";

  // Get customer initials
  const customerInitials = booking.customer
    ? `${booking.customer.firstName?.charAt(0) || ""}${booking.customer.lastName?.charAt(0) || ""}`.toUpperCase()
    : "UC";

  // Get staff name and initials if assigned
  const staffName = booking.staff
    ? `${booking.staff.firstName || ""} ${booking.staff.lastName || ""}`.trim()
    : null;

  const staffInitials = booking.staff
    ? `${booking.staff.firstName?.charAt(0) || ""}${booking.staff.lastName?.charAt(0) || ""}`.toUpperCase()
    : null;

  // Format address if available
  const formattedAddress = booking.address
    ? `${booking.address.street}, ${booking.address.city}, ${booking.address.state} ${booking.address.zipCode}, ${booking.address.country}`
    : "No address provided";

  return (
    <AdminDashboardLayout
      title="Booking Details"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Bookings", path: "/admin/bookings" },
        { label: `Booking #${booking.id.slice(-8)}`, path: "" },
      ]}
    >
      <motion.div
        className={styles.booking_details__container}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Header Section */}
        <div className={styles.booking_details__header}>
          <motion.div
            className={styles.booking_details__title_wrapper}
            variants={slideUp}
          >
            <h1 className={styles.booking_details__title}>
              Booking Details
              <span className={styles.booking_details__id}>
                #{booking.id.slice(-8)}
              </span>
            </h1>
            <p className={styles.booking_details__subtitle}>
              Created on {formatDateTime(booking.createdAt || "")}
            </p>
          </motion.div>

          <motion.div
            className={styles.booking_details__actions}
            variants={slideUp}
          >
            <Button
              variant="outline"
              size="small"
              onClick={() => router.push("/admin/bookings")}
              icon={<Icon name="arrow-left" />}
            >
              Back
            </Button>

            {booking.status !== BookingStatus.Completed &&
              booking.status !== BookingStatus.Cancelled && (
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleStatusChange(BookingStatus.Completed)}
                  icon={<Icon name="check-circle" />}
                >
                  Mark Complete
                </Button>
              )}

            {booking.status !== BookingStatus.Cancelled && (
              <Button
                variant="secondary"
                size="small"
                onClick={() => setShowCancelModal(true)}
                icon={<Icon name="x-circle" />}
              >
                Cancel
              </Button>
            )}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className={styles.booking_details__grid}>
          {/* Left Column */}
          <motion.div variants={slideUp} custom={1} transition={{ delay: 0.1 }}>
            <Card className={styles.booking_details__info_card}>
              <div className={styles.booking_details__card_header}>
                <h2 className={styles.booking_details__card_title}>
                  <Icon
                    name="info"
                    className={styles.booking_details__service_icon}
                  />
                  Booking Information
                </h2>
              </div>

              <div className={styles.booking_details__card_content}>
                <div className={styles.booking_details__info_row}>
                  <span className={styles.booking_details__info_label}>
                    Status
                  </span>
                  <span
                    className={getStatusBadgeClass(
                      booking.status as BookingStatus
                    )}
                  >
                    {booking.status?.replace(/([A-Z])/g, " $1").trim() ||
                      "Unknown"}
                  </span>
                </div>

                <div className={styles.booking_details__info_row}>
                  <span className={styles.booking_details__info_label}>
                    Payment Status
                  </span>
                  <span
                    className={getPaymentStatusBadgeClass(
                      booking.paymentStatus as PaymentStatus
                    )}
                  >
                    {booking.paymentStatus?.replace(/([A-Z])/g, " $1").trim() ||
                      "Unknown"}
                  </span>
                </div>

                <div className={styles.booking_details__info_row}>
                  <span className={styles.booking_details__info_label}>
                    Date
                  </span>
                  <span className={styles.booking_details__info_value}>
                    {formatDate(booking.date || "")}
                  </span>
                </div>

                <div className={styles.booking_details__info_row}>
                  <span className={styles.booking_details__info_label}>
                    Time Slot
                  </span>
                  <span className={styles.booking_details__info_value}>
                    {getTimeSlotLabel(booking.timeSlot as TimeSlot)}
                  </span>
                </div>

                <div className={styles.booking_details__info_row}>
                  <span className={styles.booking_details__info_label}>
                    Total Price
                  </span>
                  <span
                    className={styles.booking_details__info_value}
                    style={{ fontWeight: 600, color: "#28c76f" }}
                  >
                    {formatToNaira(booking.totalPrice || 0)}
                  </span>
                </div>

                {booking.status !== BookingStatus.Completed &&
                  booking.status !== BookingStatus.Cancelled && (
                    <div
                      className={styles.booking_details__status_select_wrapper}
                    >
                      <label
                        htmlFor="status-select"
                        className={styles.booking_details__info_label}
                      >
                        Update Status
                      </label>
                      <select
                        id="status-select"
                        className={styles.booking_details__status_select}
                        value={booking.status || ""}
                        onChange={(e) =>
                          handleStatusChange(e.target.value as BookingStatus)
                        }
                      >
                        <option value={BookingStatus.Pending}>Pending</option>
                        <option value={BookingStatus.Confirmed}>
                          Confirmed
                        </option>
                        <option value={BookingStatus.InProgress}>
                          In Progress
                        </option>
                        <option value={BookingStatus.Completed}>
                          Completed
                        </option>
                        <option value={BookingStatus.Cancelled}>
                          Cancelled
                        </option>
                      </select>
                    </div>
                  )}
              </div>
            </Card>

            <motion.div
              variants={slideUp}
              custom={2}
              transition={{ delay: 0.2 }}
              style={{ marginTop: "24px" }}
            >
              <Card className={styles.booking_details__info_card}>
                <div className={styles.booking_details__card_header}>
                  <h2 className={styles.booking_details__card_title}>
                    <Icon
                      name="user"
                      className={styles.booking_details__service_icon}
                    />
                    Customer Information
                  </h2>
                </div>

                <div className={styles.booking_details__card_content}>
                  <div className={styles.booking_details__customer}>
                    <div className={styles.booking_details__customer_avatar}>
                      {customerInitials}
                    </div>
                    <div className={styles.booking_details__customer_info}>
                      <h3 className={styles.booking_details__customer_name}>
                        {customerName}
                      </h3>
                      <p className={styles.booking_details__customer_email}>
                        {booking.customer?.email || "No email provided"}
                      </p>
                      <p className={styles.booking_details__customer_phone}>
                        {booking.customer?.phone || "No phone provided"}
                      </p>
                    </div>
                  </div>

                  <div className={styles.booking_details__address}>
                    <h4 className={styles.booking_details__address_title}>
                      Service Address
                    </h4>
                    <p className={styles.booking_details__address_content}>
                      {formattedAddress}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={slideUp} custom={3} transition={{ delay: 0.3 }}>
            <Card className={styles.booking_details__info_card}>
              <div className={styles.booking_details__card_header}>
                <h2 className={styles.booking_details__card_title}>
                  <Icon
                    name="package"
                    className={styles.booking_details__service_icon}
                  />
                  Service Details
                </h2>
              </div>

              <div className={styles.booking_details__card_content}>
                <div className={styles.booking_details__service_header}>
                  <div>
                    <h3 className={styles.booking_details__service_name}>
                      {booking.service?.name || "Unknown Service"}
                    </h3>
                    <p className={styles.booking_details__service_category}>
                      {getServiceCategoryLabel(
                        booking.service?.category as ServiceCategory
                      )}
                    </p>
                  </div>
                  <span className={styles.booking_details__service_price}>
                    {formatToNaira(booking.totalPrice || 0)}
                  </span>
                </div>

                {/* Service Specific Details */}
                {booking.service?.category === ServiceCategory.Cleaning &&
                  booking.serviceDetails?.cleaning && (
                    <div className={styles.booking_details__service_details}>
                      <div className={styles.booking_details__info_row}>
                        <span className={styles.booking_details__info_label}>
                          Cleaning Type
                        </span>
                        <span className={styles.booking_details__info_value}>
                          {getCleaningTypeLabel(
                            booking.serviceDetails.cleaning
                              .cleaningType as CleaningType
                          )}
                        </span>
                      </div>

                      <div className={styles.booking_details__info_row}>
                        <span className={styles.booking_details__info_label}>
                          Property Type
                        </span>
                        <span className={styles.booking_details__info_value}>
                          {getPropertyTypeLabel(
                            booking.serviceDetails.cleaning
                              .houseType as PropertyType
                          )}
                        </span>
                      </div>

                      {booking.serviceDetails.cleaning.rooms && (
                        <>
                          <h4
                            className={styles.booking_details__info_label}
                            style={{ marginTop: "16px", marginBottom: "8px" }}
                          >
                            Rooms to Clean
                          </h4>
                          <div className={styles.booking_details__rooms_grid}>
                            {booking.serviceDetails.cleaning.rooms.bedroom >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {
                                    booking.serviceDetails.cleaning.rooms
                                      .bedroom
                                  }
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Bedroom
                                  {booking.serviceDetails.cleaning.rooms
                                    .bedroom > 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.cleaning.rooms.bathroom >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {
                                    booking.serviceDetails.cleaning.rooms
                                      .bathroom
                                  }
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Bathroom
                                  {booking.serviceDetails.cleaning.rooms
                                    .bathroom > 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.cleaning.rooms.livingRoom >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {
                                    booking.serviceDetails.cleaning.rooms
                                      .livingRoom
                                  }
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Living Room
                                  {booking.serviceDetails.cleaning.rooms
                                    .livingRoom > 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.cleaning.rooms.kitchen >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {
                                    booking.serviceDetails.cleaning.rooms
                                      .kitchen
                                  }
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Kitchen
                                  {booking.serviceDetails.cleaning.rooms
                                    .kitchen > 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.cleaning.rooms.balcony >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {
                                    booking.serviceDetails.cleaning.rooms
                                      .balcony
                                  }
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Balcony
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.cleaning.rooms.studyRoom >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {
                                    booking.serviceDetails.cleaning.rooms
                                      .studyRoom
                                  }
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Study Room
                                  {booking.serviceDetails.cleaning.rooms
                                    .studyRoom > 1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                {booking.service?.category === ServiceCategory.Laundry &&
                  booking.serviceDetails?.laundry && (
                    <div className={styles.booking_details__service_details}>
                      <div className={styles.booking_details__info_row}>
                        <span className={styles.booking_details__info_label}>
                          Laundry Type
                        </span>
                        <span className={styles.booking_details__info_value}>
                          {getLaundryTypeLabel(
                            booking.serviceDetails.laundry
                              .laundryType as LaundryType
                          )}
                        </span>
                      </div>

                      <div className={styles.booking_details__info_row}>
                        <span className={styles.booking_details__info_label}>
                          Bags
                        </span>
                        <span className={styles.booking_details__info_value}>
                          {booking.serviceDetails.laundry.bags || 0} bag
                          {booking.serviceDetails.laundry.bags !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {booking.serviceDetails.laundry.items && (
                        <>
                          <h4
                            className={styles.booking_details__info_label}
                            style={{ marginTop: "16px", marginBottom: "8px" }}
                          >
                            Items
                          </h4>
                          <div className={styles.booking_details__rooms_grid}>
                            {booking.serviceDetails.laundry.items.shirts >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {booking.serviceDetails.laundry.items.shirts}
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Shirt
                                  {booking.serviceDetails.laundry.items.shirts >
                                  1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.laundry.items.pants > 0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {booking.serviceDetails.laundry.items.pants}
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Pant
                                  {booking.serviceDetails.laundry.items.pants >
                                  1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.laundry.items.dresses >
                              0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {booking.serviceDetails.laundry.items.dresses}
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Dress
                                  {booking.serviceDetails.laundry.items
                                    .dresses > 1
                                    ? "es"
                                    : ""}
                                </p>
                              </div>
                            )}
                            {booking.serviceDetails.laundry.items.suits > 0 && (
                              <div
                                className={styles.booking_details__room_item}
                              >
                                <p
                                  className={styles.booking_details__room_count}
                                >
                                  {booking.serviceDetails.laundry.items.suits}
                                </p>
                                <p
                                  className={styles.booking_details__room_label}
                                >
                                  Suit
                                  {booking.serviceDetails.laundry.items.suits >
                                  1
                                    ? "s"
                                    : ""}
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                {/* Notes */}
                {booking.notes && (
                  <div className={styles.booking_details__notes}>
                    <strong>Notes:</strong> {booking.notes}
                  </div>
                )}

                {/* Staff Assignment */}
                {staffName ? (
                  <div className={styles.booking_details__staff}>
                    <div className={styles.booking_details__staff_avatar}>
                      {staffInitials}
                    </div>
                    <div className={styles.booking_details__staff_info}>
                      <h3 className={styles.booking_details__staff_name}>
                        {staffName}
                      </h3>
                      <p className={styles.booking_details__staff_role}>
                        Assigned Staff
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.booking_details__no_staff}>
                    <p>No staff member assigned to this booking yet.</p>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => setShowAssignStaffModal(true)}
                      style={{ marginTop: "8px" }}
                    >
                      Assign Staff
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            <motion.div
              variants={slideUp}
              custom={4}
              transition={{ delay: 0.4 }}
              style={{ marginTop: "24px" }}
            >
              <Card className={styles.booking_details__info_card}>
                <div className={styles.booking_details__card_header}>
                  <h2 className={styles.booking_details__card_title}>
                    <Icon
                      name="clock"
                      className={styles.booking_details__service_icon}
                    />
                    Booking Timeline
                  </h2>
                </div>

                <div className={styles.booking_details__card_content}>
                  <div className={styles.booking_details__timeline}>
                    <div className={styles.booking_details__timeline_event}>
                      <p className={styles.booking_details__timeline_date}>
                        {formatDateTime(booking.createdAt || "")}
                      </p>
                      <h4 className={styles.booking_details__timeline_title}>
                        Booking Created
                      </h4>
                      <p
                        className={styles.booking_details__timeline_description}
                      >
                        Booking was created and payment was initialized.
                      </p>
                    </div>

                    {booking.status === BookingStatus.Confirmed && (
                      <div className={styles.booking_details__timeline_event}>
                        <p className={styles.booking_details__timeline_date}>
                          {formatDateTime(booking.updatedAt || "")}
                        </p>
                        <h4 className={styles.booking_details__timeline_title}>
                          Booking Confirmed
                        </h4>
                        <p
                          className={
                            styles.booking_details__timeline_description
                          }
                        >
                          Booking was confirmed and scheduled.
                        </p>
                      </div>
                    )}

                    {booking.status === BookingStatus.InProgress && (
                      <div className={styles.booking_details__timeline_event}>
                        <p className={styles.booking_details__timeline_date}>
                          {formatDateTime(booking.updatedAt || "")}
                        </p>
                        <h4 className={styles.booking_details__timeline_title}>
                          Service In Progress
                        </h4>
                        <p
                          className={
                            styles.booking_details__timeline_description
                          }
                        >
                          Service is currently being performed.
                        </p>
                      </div>
                    )}

                    {booking.status === BookingStatus.Completed && (
                      <div className={styles.booking_details__timeline_event}>
                        <p className={styles.booking_details__timeline_date}>
                          {formatDateTime(booking.updatedAt || "")}
                        </p>
                        <h4 className={styles.booking_details__timeline_title}>
                          Service Completed
                        </h4>
                        <p
                          className={
                            styles.booking_details__timeline_description
                          }
                        >
                          Service was successfully completed.
                        </p>
                      </div>
                    )}

                    {booking.status === BookingStatus.Cancelled && (
                      <div className={styles.booking_details__timeline_event}>
                        <p className={styles.booking_details__timeline_date}>
                          {formatDateTime(booking.updatedAt || "")}
                        </p>
                        <h4 className={styles.booking_details__timeline_title}>
                          Booking Cancelled
                        </h4>
                        <p
                          className={
                            styles.booking_details__timeline_description
                          }
                        >
                          Booking was cancelled.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Status Update Confirmation Modal */}
        <ConfirmationModal
          isOpen={showStatusModal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedStatus(null);
          }}
          onConfirm={confirmStatusChange}
          title={`Update Booking Status`}
          message={`Are you sure you want to change the status of this booking to "${selectedStatus?.replace(/([A-Z])/g, " $1").trim()}"?`}
          confirmText="Update Status"
          cancelText="Cancel"
          variant={
            selectedStatus === BookingStatus.Cancelled ? "danger" : "warning"
          }
          isLoading={isActionLoading}
        />

        {/* Cancel Booking Confirmation Modal */}
        <ConfirmationModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          message={`Are you sure you want to cancel this booking for ${customerName}? This action cannot be undone.`}
          confirmText="Cancel Booking"
          cancelText="Keep Booking"
          variant="danger"
          isLoading={isActionLoading}
        />

        {/* Edit Booking Modal */}
        {showEditModal && (
          <BookServiceModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            addressId={booking.address?.id}
            bookingId={booking.id}
            initialData={booking}
          />
        )}

        {/* TODO: Add Staff Assignment Modal when component is available */}
      </motion.div>
    </AdminDashboardLayout>
  );
}
