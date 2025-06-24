"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./BookingDetails.module.scss";
import Button from "../../_components/UI/Button/Button";
import ConfirmationModal from "../../_components/UI/ConfirmationModal/ConfirmationModal";
import { motion } from "framer-motion";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  BookingStatus,
  Booking,
  PaymentStatus,
  TimeSlot,
  ServiceCategory,
  CleaningType,
  LaundryType,
  HouseType,
} from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import { Icon } from "@/components/ui/Icon/Icon";
import { useAdminOperations } from "@/graphql/hooks/admin/useAdminOperations";

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
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
  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<PaymentStatus | null>(
    booking?.paymentStatus as PaymentStatus || null
  );
  // Cancel booking confirmation modal state
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Action loading state
  const [isActionLoading, setIsActionLoading] = useState(false);

  const [rescheduleDate, setRescheduleDate] = useState(booking?.date || new Date().toISOString());
  const [rescheduleTimeSlot, setRescheduleTimeSlot] = useState<TimeSlot>(
    booking?.timeSlot as TimeSlot || TimeSlot.Morning
  );
  const [isRescheduling, setIsRescheduling] = useState(false);

  const {
    handleGetBooking,
    handleCancelBooking: handleCancelBookingOperation,
    handleCompleteBooking,
    handleUpdateBookingStatus,
    handleRescheduleBooking,
  } = useBookingOperations();
  const { handleUpdateBookingPaymentStatus } = useAdminOperations();

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

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const handleStatusChange = (status: BookingStatus) => {
    setSelectedStatus(status);
    setShowStatusModal(true);
  };

  const handlePaymentStatusChange = (paymentStatus: PaymentStatus) => {
    setSelectedPaymentStatus(paymentStatus);
    setShowPaymentStatusModal(true);
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
        return `${styles.booking_details__badge} ${styles["booking_details__badge--pending"]}`;
      case BookingStatus.Confirmed:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--confirmed"]}`;
      case BookingStatus.InProgress:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--in-progress"]}`;
      case BookingStatus.Completed:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--completed"]}`;
      case BookingStatus.Cancelled:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--cancelled"]}`;
      default:
        return styles.booking_details__badge;
    }
  };

  const getPaymentStatusBadgeClass = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Paid:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--paid"]}`;
      case PaymentStatus.Pending:
      case PaymentStatus.Failed:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--unpaid"]}`;
      case PaymentStatus.PartiallyRefunded:
      case PaymentStatus.Refunded:
        return `${styles.booking_details__badge} ${styles["booking_details__badge--refunded"]}`;
      default:
        return styles.booking_details__badge;
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
        return String(category)
          .replace(/([A-Z])/g, " $1")
          .trim();
    }
  };

  const getCleaningTypeLabel = (type?: CleaningType) => {
    if (!type) return "N/A";
    switch (type) {
      case CleaningType.StandardCleaning:
        return "Standard Cleaning";
      case CleaningType.MoveInMoveOutCleaning:
        return "Move-in/Move-out Cleaning";
      case CleaningType.PostConstructionCleaning:
        return "Post-construction Cleaning";
      case CleaningType.DeepCleaning:
        return "Deep Cleaning";
      default:
        return String(type)
          .replace(/([A-Z])/g, " $1")
          .trim();
    }
  };

  const getPropertyTypeLabel = (type?: HouseType) => {
    if (!type) return "N/A";
    switch (type) {
      case HouseType.Duplex:
        return "Duplex";
      case HouseType.Flat:
        return "Flat";
      default:
        return String(type)
          .replace(/([A-Z])/g, " $1")
          .trim();
    }
  };

  const getLaundryTypeLabel = (type?: LaundryType) => {
    if (!type) return "N/A";
    switch (type) {
      case LaundryType.StandardLaundry:
        return "Wash & Fold";
      case LaundryType.PremiumLaundry:
        return "Wash & Iron";
      case LaundryType.DryCleaning:
        return "Dry Cleaning";
      default:
        return String(type)
          .replace(/([A-Z])/g, " $1")
          .trim();
    }
  };


  const timeSlotOptions = [
    { value: TimeSlot.Morning, label: "Morning (6 AM - 12 PM)" },
    { value: TimeSlot.Afternoon, label: "Afternoon (12 PM - 6 PM)" },
    { value: TimeSlot.Evening, label: "Evening (6 PM - 12 AM)" },
  ];

   const handleReschedule = async () => {
     if (booking && rescheduleDate && rescheduleTimeSlot) {
       try {
         setIsRescheduling(true);

         // Convert TimeSlot to a time string for the API
         let timeSlot = TimeSlot.Morning; // Default to 9 AM
         switch (rescheduleTimeSlot) {
           case TimeSlot.Morning:
             timeSlot = TimeSlot.Morning;
             break;
           case TimeSlot.Afternoon:
              timeSlot = TimeSlot.Afternoon;
             break;
           case TimeSlot.Evening:
             timeSlot = TimeSlot.Evening;
             break;
         }

         await handleRescheduleBooking(booking.id, rescheduleDate, timeSlot);

         // Reset form and close modal
         setRescheduleDate("");
         setRescheduleTimeSlot(TimeSlot.Morning);
       } catch (error) {
         console.error("Reschedule error:", error);
       } finally {
         setIsRescheduling(false);
       }
     }
   };

  const confirmPaymentStatusChange = async () => {
    if (!booking) return;
    try {
      setIsActionLoading(true);
      await handleUpdateBookingPaymentStatus(booking.id, selectedPaymentStatus as PaymentStatus);
      await fetchBookingDetails();
      setShowPaymentStatusModal(false);
    } catch (error) {
      console.error("Error updating payment status:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update payment status"
      );
    } finally {
      setIsActionLoading(false);
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
        { label: `#${booking.id.slice(-8)}`, path: "" },
      ]}
    >
      <motion.div
        className={styles.booking_details}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Navigation */}
        <button
          onClick={() => router.push("/admin/bookings")}
          className={styles.booking_details__back}
        >
          <Icon name="arrow-left" size={16} />
          Back to Bookings
        </button>

        {/* Header */}
        <div className={styles.booking_details__header}>
          <div className={styles.booking_details__header_left}>
            <div className={styles.booking_details__booking_number}>
              Booking #{booking.id.slice(-8)}
            </div>
            <h1 className={styles.booking_details__title}>
              {booking.service?.name || "Service Booking"}
            </h1>
            <div className={styles.booking_details__subtitle}>
              {getServiceCategoryLabel(
                booking.service?.category as ServiceCategory
              )}
            </div>

            <div className={styles.booking_details__meta_line}>
              <span className={styles.booking_details__date}>
                <Icon name="calendar" size={16} />
                {formatDate(booking.date || "")}
              </span>
              <span className={styles.booking_details__time}>
                <Icon name="clock" size={16} />
                {getTimeSlotLabel(booking.timeSlot as TimeSlot)}
              </span>
              <span
                className={getStatusBadgeClass(booking.status as BookingStatus)}
              >
                {booking.status?.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </div>
          </div>

          <div className={styles.booking_details__header_right}>
            <div className={styles.booking_details__price}>
              {formatToNaira(booking.totalPrice || 0)}
            </div>

            {/* <div className={styles.booking_details__actions}>
              {booking.status !== BookingStatus.Completed &&
                booking.status !== BookingStatus.Cancelled && (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => handleStatusChange(BookingStatus.Completed)}
                  >
                    <Icon name="check" size={16} />
                    Complete
                  </Button>
                )}

              {booking.status !== BookingStatus.Cancelled && (
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setShowCancelModal(true)}
                >
                  <Icon name="x" size={16} />
                  Cancel
                </Button>
              )}
            </div> */}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.booking_details__content}>
          {/* Customer Information */}
          <section className={styles.booking_details__section}>
            <h2 className={styles.booking_details__section_title}>
              <Icon name="user" size={20} />
              Customer
            </h2>

            <div className={styles.booking_details__customer}>
              <div className={styles.booking_details__customer_avatar}>
                {customerInitials}
              </div>
              <div className={styles.booking_details__customer_info}>
                <h3 className={styles.booking_details__customer_name}>
                  {customerName}
                </h3>
                <div className={styles.booking_details__customer_contact}>
                  <span>
                    <Icon name="mail" size={14} />
                    {booking.customer?.email || "No email"}
                  </span>
                  <span>
                    <Icon name="phone" size={14} />
                    {booking.customer?.phone || "No phone"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.booking_details__address}>
              <h4>
                <Icon name="map-pin" size={16} />
                Service Address
              </h4>
              <p>{formattedAddress}</p>
            </div>
          </section>

          {/* Service Details */}
          <section className={styles.booking_details__section}>
            <h2 className={styles.booking_details__section_title}>
              <Icon name="package" size={20} />
              Service Details
            </h2>

            {/* Service Specific Details */}
            {booking.service?.category === ServiceCategory.Cleaning &&
              booking.serviceDetails?.cleaning && (
                <div className={styles.booking_details__service_info}>
                  <div className={styles.booking_details__detail_row}>
                    <span>Cleaning Type</span>
                    <span>
                      {getCleaningTypeLabel(
                        booking.serviceDetails.cleaning
                          .cleaningType as CleaningType
                      )}
                    </span>
                  </div>
                  <div className={styles.booking_details__detail_row}>
                    <span>Property Type</span>
                    <span>
                      {getPropertyTypeLabel(
                        booking.serviceDetails.cleaning.houseType
                      )}
                    </span>
                  </div>

                  {booking.serviceDetails.cleaning.rooms && (
                    <div className={styles.booking_details__rooms}>
                      <h4>Rooms to Clean</h4>
                      <div className={styles.booking_details__room_list}>
                        {booking.serviceDetails.cleaning.rooms.bedroom > 0 && (
                          <span className={styles.booking_details__room_item}>
                            {booking.serviceDetails.cleaning.rooms.bedroom}{" "}
                            Bedroom
                            {booking.serviceDetails.cleaning.rooms.bedroom > 1
                              ? "s"
                              : ""}
                          </span>
                        )}
                        {booking.serviceDetails.cleaning.rooms.bathroom > 0 && (
                          <span className={styles.booking_details__room_item}>
                            {booking.serviceDetails.cleaning.rooms.bathroom}{" "}
                            Bathroom
                            {booking.serviceDetails.cleaning.rooms.bathroom > 1
                              ? "s"
                              : ""}
                          </span>
                        )}
                        {booking.serviceDetails.cleaning.rooms.livingRoom >
                          0 && (
                          <span className={styles.booking_details__room_item}>
                            {booking.serviceDetails.cleaning.rooms.livingRoom}{" "}
                            Living Room
                            {booking.serviceDetails.cleaning.rooms.livingRoom >
                            1
                              ? "s"
                              : ""}
                          </span>
                        )}
                        {booking.serviceDetails.cleaning.rooms.kitchen > 0 && (
                          <span className={styles.booking_details__room_item}>
                            {booking.serviceDetails.cleaning.rooms.kitchen}{" "}
                            Kitchen
                            {booking.serviceDetails.cleaning.rooms.kitchen > 1
                              ? "s"
                              : ""}
                          </span>
                        )}
                        {booking.serviceDetails.cleaning.rooms.balcony > 0 && (
                          <span className={styles.booking_details__room_item}>
                            {booking.serviceDetails.cleaning.rooms.balcony}{" "}
                            Balcony
                          </span>
                        )}
                        {booking.serviceDetails.cleaning.rooms.studyRoom >
                          0 && (
                          <span className={styles.booking_details__room_item}>
                            {booking.serviceDetails.cleaning.rooms.studyRoom}{" "}
                            Study Room
                            {booking.serviceDetails.cleaning.rooms.studyRoom > 1
                              ? "s"
                              : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {booking.service?.category === ServiceCategory.Laundry &&
              booking.serviceDetails?.laundry && (
                <div className={styles.booking_details__service_info}>
                  <div className={styles.booking_details__detail_row}>
                    <span>Laundry Type</span>
                    <span>
                      {getLaundryTypeLabel(
                        booking.serviceDetails.laundry
                          .laundryType as LaundryType
                      )}
                    </span>
                  </div>
                  <div className={styles.booking_details__detail_row}>
                    <span>Bags</span>
                    <span>
                      {booking.serviceDetails.laundry.bags || 0} bag
                      {booking.serviceDetails.laundry.bags !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              )}

            {booking.notes && (
              <div className={styles.booking_details__notes}>
                <h4>
                  <Icon name="file-text" size={16} />
                  Special Instructions
                </h4>
                <p>{booking.notes}</p>
              </div>
            )}
          </section>

          {/* Staff & Status */}
          <section className={styles.booking_details__section}>
            <h2 className={styles.booking_details__section_title}>
              <Icon name="users" size={20} />
              Assignment & Status
            </h2>

            <div className={styles.booking_details__status_grid}>
              <div className={styles.booking_details__status_item}>
                <label>Booking Status</label>
                <span
                  className={getStatusBadgeClass(
                    booking.status as BookingStatus
                  )}
                >
                  {booking.status?.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>

              <div className={styles.booking_details__status_item}>
                <label>Payment Status</label>
                <span
                  className={getPaymentStatusBadgeClass(
                    booking.paymentStatus as PaymentStatus
                  )}
                >
                  {booking.paymentStatus?.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>

              <div className={styles.booking_details__status_item}>
                <label>Created</label>
                <span>{formatDateTime(booking.createdAt || "")}</span>
              </div>

              <div className={styles.booking_details__status_item}>
                <label>Last Updated</label>
                <span>{formatDateTime(booking.updatedAt || "")}</span>
              </div>
            </div>

            <div className={styles.booking_details__status_update_container}>
            {booking.status !== BookingStatus.Completed &&
              booking.status !== BookingStatus.Cancelled && (
                <div className={styles.booking_details__status_update}>
                  <label htmlFor="status-select">Update Status</label>
                  <select
                    id="status-select"
                    value={booking.status || ""}
                    onChange={(e) =>
                      handleStatusChange(e.target.value as BookingStatus)
                    }
                  >
                    <option value={BookingStatus.Pending}>Pending</option>
                    <option value={BookingStatus.Confirmed}>Confirmed</option>
                    <option value={BookingStatus.InProgress}>
                      In Progress
                    </option>

                    <option value={BookingStatus.Completed}>Completed</option>
                    <option value={BookingStatus.Cancelled}>Cancelled</option>
                  </select>
                </div>
              )}

            
              <div className={styles.booking_details__status_update}>
                <label htmlFor="payment-status-select">Update Payment Status</label>
                <select
                  id="payment-status-select"
                  value={booking.paymentStatus || ""}
                  onChange={(e) =>
                    handlePaymentStatusChange(e.target.value as PaymentStatus)
                  }
                >
                  <option value={PaymentStatus.Pending}>Pending</option>
                  <option value={PaymentStatus.Paid}>Paid</option>
                  <option value={PaymentStatus.Failed}>Failed</option>
                </select>
              </div>
            </div>
            <motion.div
              className={styles.booking_modal__content}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.booking_modal__section}>
                <div className={styles.booking_modal__section_header}>
                  <div className={styles.booking_modal__section_icon}>
                    <Icon name="calendar" size={20} />
                  </div>
                  <h3 className={styles.booking_modal__section_title}>
                    Reschedule Booking
                  </h3>
                </div>
                <div className={styles.booking_modal__reschedule_info}>
                  <div className={styles.booking_modal__current_schedule}>
                    <h4>Current Schedule</h4>
                    <p>Date: {formatDate(booking.date)}</p>
                    <p>Time: {getTimeSlotLabel(booking.timeSlot as TimeSlot)}</p>
                  </div>

                  <div className={styles.booking_modal__reschedule_form}>
                    <div className={styles.booking_modal__form_group}>
                      <label className={styles.booking_modal__form_label}>
                        New Date
                      </label>
                      <input
                        type="date"
                        className={styles.booking_modal__form_input}
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className={styles.booking_modal__form_group}>
                      <label className={styles.booking_modal__form_label}>
                        New Time Slot
                      </label>
                      <select
                        className={styles.booking_modal__form_input}
                        value={rescheduleTimeSlot}
                        onChange={(e) =>
                          setRescheduleTimeSlot(e.target.value as TimeSlot)
                        }
                      >
                        {timeSlotOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.booking_modal__form_actions}>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={handleReschedule}
                        disabled={!rescheduleDate || isRescheduling}
                      >
                        {isRescheduling
                          ? "Rescheduling..."
                          : "Confirm Reschedule"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Status Update Confirmation Modal */}
        <ConfirmationModal
          isOpen={showStatusModal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedStatus(null);
          }}
          onConfirm={confirmStatusChange}
          title="Update Booking Status"
          message={`Are you sure you want to change the status of this booking to "${selectedStatus?.replace(/([A-Z])/g, " $1").trim()}"?`}
          confirmText="Update Status"
          cancelText="Cancel"
          variant={
            selectedStatus === BookingStatus.Cancelled ? "danger" : "warning"
          }
          isLoading={isActionLoading}
        />

        <ConfirmationModal

          isOpen={showPaymentStatusModal}
          onClose={() => setShowPaymentStatusModal(false)}
          onConfirm={confirmPaymentStatusChange}
          title="Update Payment Status"
          message={`Are you sure you want to change the payment status of this booking to "${selectedPaymentStatus?.replace(/([A-Z])/g, " $1").trim()}"?`}
          confirmText="Update Payment Status"
          cancelText="Cancel"
          variant="warning"
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
      </motion.div>
    </AdminDashboardLayout>
  );
}
