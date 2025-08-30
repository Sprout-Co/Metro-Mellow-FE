// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionDetailModal/SubscriptionDetailModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Clock,
  Repeat,
  TrendingUp,
  MessageSquare,
  Edit,
  Pause,
  Play,
  RefreshCw,
  CheckCircle,
  Package,
  Star,
  Info,
  AlertTriangle,
} from "lucide-react";
import styles from "./SubscriptionDetailModal.module.scss";
import {
  ServiceCategory,
  GetCustomerSubscriptionsQuery,
  SubscriptionStatus,
} from "@/graphql/api";
import { calculateSubscriptionProgress } from "../../utils/subscriptionProgress";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { Booking, BookingStatus } from "@/graphql/api";

// Type for GraphQL subscription data
type Subscription = GetCustomerSubscriptionsQuery["customerSubscriptions"][0];
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import SubscriptionConfirmActionModal, {
  SubscriptionActionType,
} from "../SubscriptionConfirmActionModal/SubscriptionConfirmActionModal";

type TabType = "overview" | "services" | "bookings" | "billing";

interface SubscriptionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
}

const SubscriptionDetailModal: React.FC<SubscriptionDetailModalProps> = ({
  isOpen,
  onClose,
  subscription,
}) => {
  // Early return before any hooks to comply with Rules of Hooks
  if (!subscription) return null;

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [confirmationActionType, setConfirmationActionType] =
    useState<SubscriptionActionType>(null);
  const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] =
    useState(false);
  const [subscriptionBookings, setSubscriptionBookings] = useState<Booking[]>(
    []
  );
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const { handleGetCustomerBookings } = useBookingOperations();

  // Fetch bookings for this subscription when modal opens and bookings tab is active
  useEffect(() => {
    if (isOpen && activeTab === "bookings" && subscription) {
      fetchSubscriptionBookings();
    }
  }, [isOpen, activeTab, subscription?.id]);

  const fetchSubscriptionBookings = async () => {
    setLoadingBookings(true);
    setBookingsError(null);

    try {
      const result = await handleGetCustomerBookings();
      const allBookings = result?.data;

      if (allBookings) {
        // Filter bookings that might be related to this subscription
        // Since we don't have a direct subscription query, we'll filter by:
        // 1. Bookings that are recurring (likely subscription-based)
        // 2. Bookings with services that match the subscription services
        const subscriptionServiceIds = subscription.subscriptionServices.map(
          (s) => s.service._id
        );

        const filteredBookings = allBookings.filter((booking) => {
          // Check if booking service matches any subscription service
          const matchesService = subscriptionServiceIds.includes(
            booking.service._id
          );

          // Check if booking has recurring flag (likely subscription-based)
          const isRecurring = booking.recurring === true;

          // For now, we'll show recurring bookings that match the services
          return matchesService && isRecurring;
        });

        setSubscriptionBookings(filteredBookings);
      }
    } catch (error) {
      console.error("Error fetching subscription bookings:", error);
      setBookingsError("Failed to load bookings for this subscription");
    } finally {
      setLoadingBookings(false);
    }
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Info },
    { id: "services" as const, label: "Services", icon: Package },
    { id: "bookings" as const, label: "Bookings", icon: Calendar },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
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

  // Format date - handle GraphQL date strings
  const formatDate = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time - handle GraphQL date strings
  const formatTime = (dateValue: string | Date) => {
    const date = new Date(dateValue);
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

  // Calculate subscription progress using utility function
  const calculateProgress = () => {
    if (!subscription) return 0;
    return calculateSubscriptionProgress(subscription);
  };

  function handleConfirmAction(actionType: SubscriptionActionType) {
    setConfirmationActionType(actionType);
    setIsConfirmActionModalOpen(true);
  }

  function handleConfirmActionClose() {
    setIsConfirmActionModalOpen(false);
    setConfirmationActionType(null);
  }

  function handleConfirmActionSuccess(reason?: string) {
    // Optionally handle the success callback
    console.log(
      "Subscription action completed:",
      confirmationActionType,
      reason
    );
    // You might want to refetch subscription data or show a toast notification
  }

  const renderFooterButtons = () => {
    switch (subscription.status) {
      case SubscriptionStatus.Active:
        return (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("pause")}
            >
              <Pause size={14} />
              Pause
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--danger"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("cancel")}
            >
              <X size={14} />
              Cancel Subscription
            </motion.button>
          </>
        );
      case SubscriptionStatus.Paused:
        return (
          <>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("resume")}
            >
              <Play size={14} />
              Resume
            </motion.button>
            <motion.button
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--danger"]}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleConfirmAction("cancel")}
            >
              <X size={14} />
              Cancel Subscription
            </motion.button>
          </>
        );
      case SubscriptionStatus.Expired:
      case SubscriptionStatus.Cancelled:
        return (
          <motion.button
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleConfirmAction("reactivate")}
          >
            <RefreshCw size={14} />
            Reactivate
          </motion.button>
        );
      default:
        return (
          <motion.button
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        );
    }
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <>
        <div className={styles.modal__header}>
          <div className={styles.modal__headerLeft}>
            <div className={styles.modal__serviceIcon}>
              {subscription.subscriptionServices[0]
                ? getServiceIcon(
                    subscription.subscriptionServices[0]
                      .service_category as ServiceCategory
                  )
                : "🏠"}
            </div>
            <div className={styles.modal__headerContent}>
              <h2 className={styles.modal__title}>
                {subscription.subscriptionServices.length > 1
                  ? `${subscription.subscriptionServices.length} Services Package`
                  : subscription.subscriptionServices[0]?.service.name ||
                    "Subscription"}
              </h2>
              <p className={styles.modal__subtitle}>
                {subscription.subscriptionServices.length} service
                {subscription.subscriptionServices.length > 1 ? "s" : ""} •{" "}
                {subscription.billingCycle}
              </p>
            </div>
          </div>
          <button className={styles.modal__closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.modal__body}>
          {/* Tab Navigation */}
          <div className={styles.modal__tabs}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`${styles.modal__tab} ${
                    activeTab === tab.id ? styles["modal__tab--active"] : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className={styles.modal__tabContent}>
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className={styles.modal__sections}>
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>Overview</h3>
                      <div className={styles.modal__overviewGrid}>
                        <div className={styles.modal__overviewCard}>
                          <div className={styles.modal__overviewCardHeader}>
                            <Package size={16} />
                            <span>Services</span>
                          </div>
                          <div className={styles.modal__overviewCardValue}>
                            {subscription.subscriptionServices.length}
                          </div>
                        </div>
                        <div className={styles.modal__overviewCard}>
                          <div className={styles.modal__overviewCardHeader}>
                            <CheckCircle size={16} />
                            <span>Progress</span>
                          </div>
                          <div className={styles.modal__overviewCardValue}>
                            {calculateProgress()}%
                          </div>
                        </div>
                        <div className={styles.modal__overviewCard}>
                          <div className={styles.modal__overviewCardHeader}>
                            <CreditCard size={16} />
                            <span>Total Price</span>
                          </div>
                          <div className={styles.modal__overviewCardValue}>
                            {formatPrice(subscription.totalPrice)}
                          </div>
                        </div>
                        <div className={styles.modal__overviewCard}>
                          <div className={styles.modal__overviewCardHeader}>
                            <Calendar size={16} />
                            <span>Next Billing</span>
                          </div>
                          <div className={styles.modal__overviewCardValue}>
                            {
                              formatDate(subscription.nextBillingDate).split(
                                ", "
                              )[0]
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>Quick Info</h3>
                      <div className={styles.modal__info}>
                        <div className={styles.modal__infoItem}>
                          <MapPin size={14} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Service Address
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.address?.street || "Address"},{" "}
                              {subscription.address?.city || "City"}
                            </span>
                          </div>
                        </div>
                        <div className={styles.modal__infoItem}>
                          <RefreshCw size={14} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Auto-renewal
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.autoRenew ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        </div>
                        <div className={styles.modal__infoItem}>
                          <Repeat size={14} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Billing Cycle
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.billingCycle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Services Tab */}
              {activeTab === "services" && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className={styles.modal__sections}>
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>
                        Included Services
                      </h3>
                      <div className={styles.modal__servicesList}>
                        {subscription.subscriptionServices.map((service) => (
                          <div
                            key={service.id}
                            className={styles.modal__serviceItem}
                          >
                            <div
                              className={styles.modal__serviceItemIcon}
                              style={{
                                backgroundColor: `${getServiceColor(service.service_category)}15`,
                                color: getServiceColor(
                                  service.service_category
                                ),
                              }}
                            >
                              {getServiceIcon(
                                service.service_category as ServiceCategory
                              )}
                            </div>
                            <div className={styles.modal__serviceItemContent}>
                              <div className={styles.modal__serviceItemHeader}>
                                <h4 className={styles.modal__serviceItemName}>
                                  {service.service.name}
                                </h4>
                                <span
                                  className={styles.modal__serviceItemPrice}
                                >
                                  {formatPrice(service.price)}
                                </span>
                              </div>
                              <div className={styles.modal__serviceItemDetails}>
                                <div
                                  className={styles.modal__serviceItemDetail}
                                >
                                  <Repeat size={12} />
                                  <span>
                                    {service.frequency
                                      .toLowerCase()
                                      .replace("_", " ")}
                                  </span>
                                </div>
                                <div
                                  className={styles.modal__serviceItemDetail}
                                >
                                  <Calendar size={12} />
                                  <span>
                                    {service.scheduledDays
                                      .map(
                                        (day: string) =>
                                          day.charAt(0) +
                                          day.slice(1).toLowerCase()
                                      )
                                      .join(", ")}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={styles.modal__serviceItemProgress}
                              >
                                <div
                                  className={
                                    styles.modal__serviceItemProgressText
                                  }
                                >
                                  <span>Service active</span>
                                  <span>{formatPrice(service.price)}</span>
                                </div>
                                <div
                                  className={
                                    styles.modal__serviceItemProgressBar
                                  }
                                >
                                  <div
                                    className={
                                      styles.modal__serviceItemProgressFill
                                    }
                                    style={{
                                      width: `100%`,
                                      backgroundColor: getServiceColor(
                                        service.service_category
                                      ),
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className={styles.modal__sections}>
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>
                        Subscription Bookings
                      </h3>

                      {loadingBookings ? (
                        <div className={styles.modal__loadingState}>
                          <RefreshCw className="animate-spin" size={24} />
                          <p>Loading bookings...</p>
                        </div>
                      ) : bookingsError ? (
                        <div className={styles.modal__errorState}>
                          <AlertTriangle size={24} />
                          <h4>Error Loading Bookings</h4>
                          <p>{bookingsError}</p>
                          <motion.button
                            className={styles.modal__retryButton}
                            onClick={fetchSubscriptionBookings}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Try Again
                          </motion.button>
                        </div>
                      ) : subscriptionBookings.length > 0 ? (
                        <div className={styles.modal__bookingsList}>
                          {subscriptionBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className={styles.modal__bookingItem}
                            >
                              <div className={styles.modal__bookingIcon}>
                                {getServiceIcon(
                                  booking.service.category as ServiceCategory
                                )}
                              </div>
                              <div className={styles.modal__bookingContent}>
                                <div className={styles.modal__bookingHeader}>
                                  <h4 className={styles.modal__bookingName}>
                                    {booking.service.name}
                                  </h4>
                                  <span
                                    className={`${styles.modal__bookingStatus} ${styles[`modal__bookingStatus--${booking.status.toLowerCase()}`]}`}
                                  >
                                    {booking.status}
                                  </span>
                                </div>
                                <div className={styles.modal__bookingDetails}>
                                  <div className={styles.modal__bookingDetail}>
                                    <Calendar size={12} />
                                    <span>{formatDate(booking.date)}</span>
                                  </div>
                                  <div className={styles.modal__bookingDetail}>
                                    <Clock size={12} />
                                    <span>{booking.timeSlot}</span>
                                  </div>
                                  {booking.staff && (
                                    <div
                                      className={styles.modal__bookingDetail}
                                    >
                                      <User size={12} />
                                      <span>
                                        {booking.staff.firstName}{" "}
                                        {booking.staff.lastName}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className={styles.modal__bookingPrice}>
                                  {formatPrice(booking.totalPrice)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.modal__emptyState}>
                          <Calendar size={48} />
                          <h4>No bookings found</h4>
                          <p>
                            No recurring bookings found for this subscription.
                            Bookings will appear here once services are
                            scheduled.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className={styles.modal__sections}>
                    {/* Billing Summary Card - Greeting Card Style */}
                    <div className={styles.modal__section}>
                      <div className={styles.modal__billingCard}>
                        <div className={styles.modal__billingCardHeader}>
                          <div>
                            <h3 className={styles.modal__billingCardTitle}>
                              Subscription Billing Summary
                            </h3>
                            <p className={styles.modal__billingCardSubtitle}>
                              {subscription.billingCycle} billing • Auto-renewal{" "}
                              {subscription.autoRenew ? "enabled" : "disabled"}
                            </p>
                          </div>
                        </div>

                        <div className={styles.modal__billingCardContent}>
                          <div className={styles.modal__billingAmount}>
                            <span className={styles.modal__billingAmountLabel}>
                              Total Amount
                            </span>
                            <span className={styles.modal__billingAmountValue}>
                              {formatPrice(subscription.totalPrice)}
                              <small>/{subscription.billingCycle}</small>
                            </span>
                          </div>

                          {/* Discount information removed as it's not available in GraphQL data */}

                          <div className={styles.modal__billingDetails}>
                            <div className={styles.modal__billingDetail}>
                              <CreditCard size={14} />
                              <div>
                                <span
                                  className={styles.modal__billingDetailLabel}
                                >
                                  Payment Method
                                </span>
                                <span
                                  className={styles.modal__billingDetailValue}
                                >
                                  {subscription.paymentMethod?.brand ||
                                    "No payment method"}{" "}
                                  ••••{" "}
                                  {subscription.paymentMethod?.last4 || "****"}
                                </span>
                              </div>
                            </div>

                            <div className={styles.modal__billingDetail}>
                              <Calendar size={14} />
                              <div>
                                <span
                                  className={styles.modal__billingDetailLabel}
                                >
                                  Next Billing Date
                                </span>
                                <span
                                  className={styles.modal__billingDetailValue}
                                >
                                  {formatDate(subscription.nextBillingDate)}
                                </span>
                              </div>
                            </div>

                            <div className={styles.modal__billingDetail}>
                              <Clock size={14} />
                              <div>
                                <span
                                  className={styles.modal__billingDetailLabel}
                                >
                                  Last Payment
                                </span>
                                <span
                                  className={styles.modal__billingDetailValue}
                                >
                                  {subscription.lastBillingDate
                                    ? formatDate(subscription.lastBillingDate)
                                    : "No previous billing"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Breakdown */}
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>
                        Service Breakdown
                      </h3>
                      <div className={styles.modal__serviceBreakdown}>
                        {subscription.subscriptionServices.map((service) => (
                          <div
                            key={service.id}
                            className={styles.modal__serviceBreakdownItem}
                          >
                            <div className={styles.modal__serviceBreakdownIcon}>
                              {getServiceIcon(
                                service.service_category as ServiceCategory
                              )}
                            </div>
                            <div className={styles.modal__serviceBreakdownInfo}>
                              <span
                                className={styles.modal__serviceBreakdownName}
                              >
                                {service.service.name}
                              </span>
                              <span
                                className={styles.modal__serviceBreakdownFreq}
                              >
                                {service.frequency
                                  .toLowerCase()
                                  .replace("_", " ")}
                              </span>
                            </div>
                            <span
                              className={styles.modal__serviceBreakdownPrice}
                            >
                              {formatPrice(service.price)}
                            </span>
                          </div>
                        ))}

                        <div className={styles.modal__serviceBreakdownTotal}>
                          <span>Total</span>
                          <span>{formatPrice(subscription.totalPrice)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Billing History Preview */}
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>
                        Recent Billing
                      </h3>
                      <div className={styles.modal__billingHistory}>
                        <div className={styles.modal__billingHistoryItem}>
                          <div className={styles.modal__billingHistoryIcon}>
                            <CheckCircle size={16} />
                          </div>
                          <div className={styles.modal__billingHistoryInfo}>
                            <span className={styles.modal__billingHistoryDate}>
                              {subscription.lastBillingDate
                                ? formatDate(subscription.lastBillingDate)
                                : "No payment yet"}
                            </span>
                            <span
                              className={styles.modal__billingHistoryAmount}
                            >
                              {formatPrice(subscription.totalPrice)}
                            </span>
                          </div>
                          <span className={styles.modal__billingHistoryStatus}>
                            Paid
                          </span>
                        </div>

                        <div className={styles.modal__billingHistoryItem}>
                          <div className={styles.modal__billingHistoryIcon}>
                            <Calendar size={16} />
                          </div>
                          <div className={styles.modal__billingHistoryInfo}>
                            <span className={styles.modal__billingHistoryDate}>
                              {formatDate(subscription.nextBillingDate)}
                            </span>
                            <span
                              className={styles.modal__billingHistoryAmount}
                            >
                              {formatPrice(subscription.totalPrice)}
                            </span>
                          </div>
                          <span className={styles.modal__billingHistoryStatus}>
                            Upcoming
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.modal__footer}>{renderFooterButtons()}</div>
      </>

      {/* Confirm Action Modal */}
      <SubscriptionConfirmActionModal
        isOpen={isConfirmActionModalOpen}
        onClose={handleConfirmActionClose}
        subscription={subscription}
        actionType={confirmationActionType}
        onConfirm={handleConfirmActionSuccess}
      />
    </ModalDrawer>
  );
};

export default SubscriptionDetailModal;
