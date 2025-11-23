// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionDetailModal/SubscriptionDetailModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  CreditCard,
  Pause,
  Play,
  RefreshCw,
  Package,
  Info,
  AlertTriangle,
} from "lucide-react";
import styles from "./SubscriptionDetailModal.module.scss";
import {
  ServiceCategory,
  GetCustomerSubscriptionsQuery,
  SubscriptionStatus,
  Billing,
} from "@/graphql/api";
import { calculateSubscriptionProgress } from "../../utils/subscriptionProgress";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { useBillingOperations } from "@/graphql/hooks/billing/useBillingOperations";
import { Booking, BookingStatus, BillingStatus } from "@/graphql/api";
import { OverviewTab, ServicesTab, BookingsTab, BillingTab } from "./tabs";
import PaymentAlertBanner from "./PaymentAlertBanner";
import ErrorBanner from "./ErrorBanner/ErrorBanner";
import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";

// Type for GraphQL subscription data
type SubscriptionType =
  GetCustomerSubscriptionsQuery["customerSubscriptions"][0];
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import SubscriptionConfirmActionModal, {
  SubscriptionActionType,
} from "../SubscriptionConfirmActionModal/SubscriptionConfirmActionModal";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import FnButton from "@/components/ui/Button/FnButton";
import OrderSuccessModal from "@/components/ui/booking/modals/OrderSuccessModal/OrderSuccessModal";

type TabType = "overview" | "services" | "bookings" | "billing";

interface SubscriptionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: SubscriptionType | null;
  refetchSubscriptions?: () => void;
}

const SubscriptionDetailModal: React.FC<SubscriptionDetailModalProps> = ({
  isOpen,
  onClose,
  subscription,
  refetchSubscriptions,
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
  const [allSubscriptionBookings, setAllSubscriptionBookings] = useState<
    Booking[]
  >([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [selectedBookingStatus, setSelectedBookingStatus] = useState<
    BookingStatus | "all"
  >("all");
  const [subscriptionBillings, setSubscriptionBillings] = useState<any[]>([]);
  const [billingStats, setBillingStats] = useState<any>(null);
  const [loadingBillings, setLoadingBillings] = useState(false);
  const [billingsError, setBillingsError] = useState<string | null>(null);
  const [renewingSubscription, setRenewingSubscription] = useState(false);
  const [errors, setErrors] = useState<{
    renewal?: string | null;
    bookings?: string | null;
    billings?: string | null;
  }>({
    renewal: null,
    bookings: null,
    billings: null,
  });

  const { handleGetCustomerBookings } = useBookingOperations();
  const {
    handleGetSubscriptionBillings,
    handleGetBillingStats,
    filterBillingsByStatus,
    calculateTotalAmount,
  } = useBillingOperations();
  const {
    initializeSubscriptionPayment,
    loading: paymentLoading,
    paymentSuccess,
    setPaymentSuccess,
  } = useSubscriptionPayment();
  const { handleRenewSubscription } = useSubscriptionOperations();
  // Fetch bookings for this subscription when modal opens and bookings tab is active
  useEffect(() => {
    if (isOpen && activeTab === "bookings" && subscription) {
      fetchSubscriptionBookings();
    }
  }, [isOpen, activeTab, subscription?.id]);

  // Fetch billing data when modal opens (not just on billing tab)
  // We need billing data to check payment status for actions
  useEffect(() => {
    if (isOpen && subscription) {
      fetchSubscriptionBillings();
    }
  }, [isOpen, subscription?.id]);

  // Filter bookings when status filter changes
  useEffect(() => {
    if (selectedBookingStatus === "all") {
      setSubscriptionBookings(allSubscriptionBookings);
    } else {
      const filteredByStatus = allSubscriptionBookings.filter(
        (booking) => booking.status === selectedBookingStatus
      );
      setSubscriptionBookings(filteredByStatus);
    }
  }, [selectedBookingStatus, allSubscriptionBookings]);

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

        setAllSubscriptionBookings(filteredBookings);
        setSubscriptionBookings(filteredBookings);
      }
    } catch (error) {
      console.error("Error fetching subscription bookings:", error);
      setBookingsError("Failed to load bookings for this subscription");
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchSubscriptionBillings = async () => {
    if (!subscription?.id) return;

    setLoadingBillings(true);
    setBillingsError(null);

    try {
      // Fetch both billings and stats in parallel
      const [billingsResult, statsResult] = await Promise.all([
        handleGetSubscriptionBillings(subscription.id),
        handleGetBillingStats(subscription.id),
      ]);

      setSubscriptionBillings(billingsResult || []);
      setBillingStats(statsResult || null);
    } catch (error) {
      console.error("Error fetching subscription billings:", error);
      setBillingsError("Failed to load billing information");
    } finally {
      setLoadingBillings(false);
    }
  };

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Info },
    { id: "services" as const, label: "Services", icon: Package },
    { id: "bookings" as const, label: "Bookings", icon: Calendar },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
  ];

  function handleConfirmAction(actionType: SubscriptionActionType) {
    setConfirmationActionType(actionType);
    setIsConfirmActionModalOpen(true);
  }

  function handleConfirmActionClose() {
    setIsConfirmActionModalOpen(false);
    setConfirmationActionType(null);
  }

  function handleConfirmActionSuccess(reason?: string) {
    // Log the action for debugging
    console.log(
      "Subscription action completed:",
      confirmationActionType,
      reason
    );

    // Close the detail modal after successful action
    onClose();

    // Refresh the subscriptions data to reflect changes
    if (refetchSubscriptions) {
      refetchSubscriptions();
    }
  }

  async function onRenewSubscriptionClick(subscriptionId: string) {
    try {
      setRenewingSubscription(true);
      console.log(subscriptionBillings.length, " before renewal");
      const result = await handleRenewSubscription(subscriptionId);

      if (result.billing) {
        setSubscriptionBillings((prev) => [...prev, result.billing]);
        await initializeSubscriptionPayment(
          result.billing.id,
          result.billing.amount,
          subscription?.customer?.email || ""
        );
        // console.log(subscriptionBillings.length, " after renewal");
      }
      await handleRetryPayment();
      console.log(subscriptionBillings.length, " after retry");
    } catch (error) {
      console.error("Error renewing subscription:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while renewing your subscription. Please try again.";
      setErrors((prev) => ({ ...prev, renewal: errorMessage }));
    } finally {
      setRenewingSubscription(false);
    }
  }

  const handleRetryPayment = async () => {
    console.log(subscriptionBillings.length, " before retry");
    if (!subscription) return;

    try {
      // Get the most recent unpaid billing
      const unpaidBilling = subscriptionBillings.find(
        (billing) =>
          billing.status === BillingStatus.Pending ||
          billing.status === BillingStatus.Failed
      );

      if (unpaidBilling) {
        await initializeSubscriptionPayment(
          unpaidBilling.id,
          unpaidBilling.amount,
          subscription.customer?.email || ""
        );
      } else {
        console.error("No unpaid billing found");
      }
    } catch (err) {
      console.error("Payment retry failed:", err);
    }
  };
  // Check if the current billing period has been paid
  const isCurrentPeriodPaid = () => {
    if (!subscriptionBillings || subscriptionBillings.length === 0) {
      return false;
    }

    // Find the most recent billing record
    const sortedBillings = [...subscriptionBillings].sort(
      (a, b) =>
        new Date(b.billingDate).getTime() - new Date(a.billingDate).getTime()
    );

    const latestBilling = sortedBillings[0];

    // Check if the latest billing is paid
    return latestBilling?.status === BillingStatus.Paid;
  };

  const renderFooterButtons = () => {
    const isPaid = isCurrentPeriodPaid();
    if (!isPaid) {
      return (
        <>
          <FnButton
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
            onClick={handleRetryPayment}
            disabled={paymentLoading}
            size="lg"
            loading={paymentLoading}
            // whileHover={{ scale: 1.02 }}
            // whileTap={{ scale: 0.98 }}
            leftIcon={<RefreshCw size={14} />}
          >
            {paymentLoading ? "Processing..." : "Retry Payment"}
          </FnButton>
        </>
      );
    }
    switch (subscription.status) {
      case SubscriptionStatus.Active:
        return (
          <>
            {/* TBD: Work out how to pause a subscription from the backend */}
            {/* <FnButton
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
              size="lg"
              loading={paymentLoading}
              leftIcon={<Pause size={14} />}
              onClick={() => isPaid && handleConfirmAction("pause")}
              disabled={!isPaid}
              style={{
                opacity: !isPaid ? 0.5 : 1,
                cursor: !isPaid ? "not-allowed" : "pointer",
              }}
              title={
                !isPaid
                  ? "Complete payment before pausing subscription"
                  : "Pause subscription"
              }
            >
              Pause
            </FnButton> */}
            <FnButton
              size="lg"
              loading={paymentLoading}
              leftIcon={<X size={14} />}
              onClick={() => isPaid && handleConfirmAction("cancel")}
              disabled={!isPaid}
              fullWidth
              style={{
                opacity: !isPaid ? 0.5 : 1,
                cursor: !isPaid ? "not-allowed" : "pointer",
              }}
              title={
                !isPaid
                  ? "Complete payment before canceling subscription"
                  : "Cancel subscription"
              }
            >
              Cancel Subscription
            </FnButton>
          </>
        );
      case SubscriptionStatus.Paused:
        return (
          <>
            <FnButton
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
              size="lg"
              loading={paymentLoading}
              leftIcon={<Play size={14} />}
              onClick={() => handleConfirmAction("resume")}
            >
              Resume
            </FnButton>
            <FnButton
              className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--danger"]}`}
              size="lg"
              loading={paymentLoading}
              leftIcon={<X size={14} />}
              onClick={() => handleConfirmAction("cancel")}
            >
              Cancel Subscription
            </FnButton>
          </>
        );
      case SubscriptionStatus.Expired:
        return (
          <FnButton
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
            size="lg"
            loading={renewingSubscription}
            leftIcon={<RefreshCw size={14} />}
            onClick={() => onRenewSubscriptionClick(subscription.id)}
            disabled={renewingSubscription}
          >
            {renewingSubscription ? "Renewing..." : "Renew"}
          </FnButton>
        );
      case SubscriptionStatus.Cancelled:
        return (
          <FnButton
            // className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
            variant="primary"
            size="lg"
            fullWidth
            loading={renewingSubscription}
            leftIcon={<RefreshCw size={14} />}
            onClick={() => handleConfirmAction("reactivate")}
          >
            Reactivate
          </FnButton>
        );
      default:
        return (
          <FnButton
            className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
            onClick={onClose}
            size="lg"
            loading={paymentLoading}
            leftIcon={<X size={14} />}
          >
            Close
          </FnButton>
        );
    }
  };

  const footerContent = (
    <div className={styles.modal__footer}>{renderFooterButtons()}</div>
  );

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={() => {
        setErrors((prev) => ({
          renewal: null,
          bookings: null,
          billings: null,
        }));
        onClose();
      }}
      width="lg"
      title={
        subscription.subscriptionServices.length > 1
          ? `${subscription.subscriptionServices.length} Services Package`
          : subscription.subscriptionServices[0]?.service.name || "Subscription"
      }
      description={subscription.billingCycle}
      showFooter={true}
      footer={footerContent}
    >
      <div className={styles.modal__body}>
        {/* Payment Alert Banner */}
        {!isCurrentPeriodPaid() && (
          <PaymentAlertBanner onViewBilling={() => setActiveTab("billing")} />
        )}

        {/* Error Banner */}
        {errors.renewal && (
          <ErrorBanner
            error={errors.renewal}
            onDismiss={() => setErrors((prev) => ({ ...prev, renewal: null }))}
            title="Renewal Failed"
          />
        )}

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
                <OverviewTab subscription={subscription} />
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
                <ServicesTab subscription={subscription} />
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
                <BookingsTab
                  subscription={subscription}
                  subscriptionBookings={subscriptionBookings}
                  allSubscriptionBookings={allSubscriptionBookings}
                  loadingBookings={loadingBookings}
                  bookingsError={bookingsError}
                  fetchSubscriptionBookings={fetchSubscriptionBookings}
                  selectedBookingStatus={selectedBookingStatus}
                  setSelectedBookingStatus={setSelectedBookingStatus}
                />
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
                <BillingTab
                  subscription={subscription}
                  subscriptionBillings={subscriptionBillings}
                  billingStats={billingStats}
                  loadingBillings={loadingBillings}
                  billingsError={billingsError}
                  fetchSubscriptionBillings={fetchSubscriptionBillings}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirm Action Modal */}
      <SubscriptionConfirmActionModal
        isOpen={isConfirmActionModalOpen}
        onClose={handleConfirmActionClose}
        subscription={subscription}
        actionType={confirmationActionType}
        onConfirm={handleConfirmActionSuccess}
      />
      <OrderSuccessModal
        title="Oya, You Are Good to Go! 🚀"
        message="Payment confirmed! Your subscription is active now. Enjoy the flex!"
        isOpen={paymentSuccess}
        onClose={() => {
          refetchSubscriptions?.();
          setPaymentSuccess(false);
        }}
      />
    </ModalDrawer>
  );
};

export default SubscriptionDetailModal;
