"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./subscription-details.module.scss";
import Card from "../../_components/UI/Card/Card";
import Button from "../../_components/UI/Button/Button";
import StatusBadge from "../../_components/UI/StatusBadge/StatusBadge";
import ConfirmationModal from "../../_components/UI/ConfirmationModal/ConfirmationModal";
import AddServiceModal from "./_components/AddServiceModal/AddServiceModal";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { SubscriptionStatus, Subscription } from "@/graphql/api";
import { Icon } from "@/components/ui/Icon/Icon";
import { formatToNaira } from "@/utils/string";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const slideIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

export default function SubscriptionDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "details" | "services" | "billing" | "history"
  >("details");

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: string;
    title: string;
    message: string;
    action: () => Promise<void>;
  } | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Edit mode states
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    billingCycle: "",
    autoRenew: false,
  });

  const {
    handleGetSubscription,
    handleCancelSubscription,
    handlePauseSubscription,
    handleResumeSubscription,
    handleReactivateSubscription,
    handleUpdateSubscription,
    handleRemoveServiceFromSubscription,
  } = useSubscriptionOperations();

  useEffect(() => {
    if (id) {
      fetchSubscription();
    }
  }, [id]);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await handleGetSubscription(id);
      setSubscription(data as Subscription);

      // Initialize edit form data
      if (data) {
        setEditFormData({
          billingCycle: data.billingCycle || "",
          autoRenew: data.autoRenew || false,
        });
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch subscription details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscriptionClick = () => {
    setConfirmAction({
      type: "cancel",
      title: "Cancel Subscription",
      message: `Are you sure you want to cancel this subscription? This will stop all future billing and services.`,
      action: async () => {
        setIsActionLoading(true);
        try {
          await handleCancelSubscription(id);
          await fetchSubscription();
          setShowConfirmModal(false);
          setConfirmAction(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to cancel subscription"
          );
        } finally {
          setIsActionLoading(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  const handlePauseSubscriptionClick = () => {
    setConfirmAction({
      type: "pause",
      title: "Pause Subscription",
      message: `Are you sure you want to pause this subscription? Services will be temporarily suspended.`,
      action: async () => {
        setIsActionLoading(true);
        try {
          await handlePauseSubscription(id);
          await fetchSubscription();
          setShowConfirmModal(false);
          setConfirmAction(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to pause subscription"
          );
        } finally {
          setIsActionLoading(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  const handleResumeSubscriptionClick = () => {
    setConfirmAction({
      type: "resume",
      title: "Resume Subscription",
      message: `Are you sure you want to resume this subscription? Services and billing will restart.`,
      action: async () => {
        setIsActionLoading(true);
        try {
          await handleResumeSubscription(id);
          await fetchSubscription();
          setShowConfirmModal(false);
          setConfirmAction(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to resume subscription"
          );
        } finally {
          setIsActionLoading(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  const handleReactivateSubscriptionClick = () => {
    setConfirmAction({
      type: "reactivate",
      title: "Reactivate Subscription",
      message: `Are you sure you want to reactivate this subscription? Services and billing will restart.`,
      action: async () => {
        setIsActionLoading(true);
        try {
          await handleReactivateSubscription(id);
          await fetchSubscription();
          setShowConfirmModal(false);
          setConfirmAction(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to reactivate subscription"
          );
        } finally {
          setIsActionLoading(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  const handleRemoveServiceClick = (serviceId: string) => {
    setConfirmAction({
      type: "remove_service",
      title: "Remove Service",
      message: `Are you sure you want to remove this service from the subscription?`,
      action: async () => {
        setIsActionLoading(true);
        try {
          await handleRemoveServiceFromSubscription(id, serviceId);
          await fetchSubscription();
          setShowConfirmModal(false);
          setConfirmAction(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to remove service from subscription"
          );
        } finally {
          setIsActionLoading(false);
        }
      },
    });
    setShowConfirmModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      setIsActionLoading(true);
      setError(null);
      if (!subscription?.customer?.id) {
        throw new Error("Customer ID is required");
      }
      await handleUpdateSubscription(id, {
        billingCycle: editFormData.billingCycle as any,
        autoRenew: editFormData.autoRenew,
        customerId: subscription.customer.id,
      });

      await fetchSubscription();
      setIsEditing(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update subscription"
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleServiceAdded = async () => {
    // Refresh the subscription data to show the newly added service
    await fetchSubscription();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatBillingCycle = (cycle: string) => {
    if (!cycle) return "N/A";
    return cycle.charAt(0).toUpperCase() + cycle.slice(1).toLowerCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case SubscriptionStatus.Active:
        return "active";
      case SubscriptionStatus.Paused:
        return "pending";
      case SubscriptionStatus.Cancelled:
        return "cancelled";
      case SubscriptionStatus.Expired:
        return "cancelled";
      default:
        return "pending";
    }
  };

  const getStatusLabel = (status: string) => {
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : "Unknown";
  };

  // Calculate the next service date based on billing cycle
  const calculateNextServiceDate = (
    lastBillingDate: string,
    billingCycle: string
  ) => {
    if (!lastBillingDate || !billingCycle) return "Not scheduled";

    const date = new Date(lastBillingDate);
    switch (billingCycle) {
      case "WEEKLY":
        date.setDate(date.getDate() + 7);
        break;
      case "BIWEEKLY":
        date.setDate(date.getDate() + 14);
        break;
      case "MONTHLY":
        date.setMonth(date.getMonth() + 1);
        break;
      case "QUARTERLY":
        date.setMonth(date.getMonth() + 3);
        break;
      case "YEARLY":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        return "Not scheduled";
    }

    return formatDate(date.toISOString());
  };

  // Mock data for service history (since we don't have actual history from the API)
  const serviceHistory = [
    {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Completed",
      staff: "Miguel Rodriguez",
      notes: "Service completed as scheduled",
    },
    {
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Completed",
      staff: "Sarah Johnson",
      notes: "Customer requested extra kitchen cleaning",
    },
    {
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Missed",
      staff: "Miguel Rodriguez",
      notes: "Customer was not home",
    },
  ];

  if (isLoading) {
    return (
      <AdminDashboardLayout
        title="Subscription Details"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Subscriptions", path: "/admin/subscriptions" },
          { label: "Details", path: `/admin/subscriptions/${id}` },
        ]}
      >
        <div className={styles.subscription_details}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.subscription_details__loading}
          >
            <div className={styles.subscription_details__loading_spinner}></div>
            <p>Loading subscription details...</p>
          </motion.div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (error) {
    return (
      <AdminDashboardLayout
        title="Subscription Details"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Subscriptions", path: "/admin/subscriptions" },
          { label: "Details", path: `/admin/subscriptions/${id}` },
        ]}
      >
        <div className={styles.subscription_details}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.subscription_details__error}
          >
            <Icon
              name="alert-triangle"
              size={32}
              className={styles.subscription_details__error_icon}
            />
            <h3>Error Loading Subscription</h3>
            <p>{error}</p>
            <Button
              variant="primary"
              size="small"
              onClick={() => fetchSubscription()}
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!subscription) {
    return (
      <AdminDashboardLayout
        title="Subscription Details"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Subscriptions", path: "/admin/subscriptions" },
          { label: "Details", path: `/admin/subscriptions/${id}` },
        ]}
      >
        <div className={styles.subscription_details}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.subscription_details__not_found}
          >
            <Icon
              name="search-off"
              size={32}
              className={styles.subscription_details__not_found_icon}
            />
            <h3>Subscription Not Found</h3>
            <p>The subscription you're looking for could not be found.</p>
            <Button
              variant="primary"
              size="small"
              onClick={() => router.push("/admin/subscriptions")}
            >
              Back to Subscriptions
            </Button>
          </motion.div>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout
      title="Subscription Details"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Subscriptions", path: "/admin/subscriptions" },
        { label: "Details", path: `/admin/subscriptions/${id}` },
      ]}
    >
      <div className={styles.subscription_details}>
        {/* Header Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className={styles.subscription_details__header}
        >
          <div className={styles.subscription_details__title_area}>
            <div className={styles.subscription_details__title_row}>
              <h1 className={styles.subscription_details__title}>
                Subscription Details
              </h1>
              <StatusBadge
                status={getStatusColor(subscription.status)}
                label={getStatusLabel(subscription.status)}
              />
            </div>
            <p className={styles.subscription_details__subtitle}>
              Subscription ID:{" "}
              <span className={styles.subscription_details__id}>
                {subscription.id}
              </span>
            </p>
          </div>

          <div className={styles.subscription_details__actions}>
            <Button
              variant="primary"
              size="small"
              onClick={() => router.push("/admin/subscriptions")}
              icon={<Icon name="arrow-left" size={16} />}
            >
              Back to List
            </Button>

            {subscription.status === SubscriptionStatus.Active && (
              <>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handlePauseSubscriptionClick}
                >
                  Pause
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleCancelSubscriptionClick}
                >
                  Cancel
                </Button>
              </>
            )}

            {subscription.status === SubscriptionStatus.Paused && (
              <Button
                variant="secondary"
                size="small"
                onClick={handleResumeSubscriptionClick}
              >
                Resume
              </Button>
            )}

            {subscription.status === SubscriptionStatus.Cancelled && (
              <Button
                variant="secondary"
                size="small"
                onClick={handleReactivateSubscriptionClick}
              >
                Reactivate
              </Button>
            )}
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate="visible"
          className={styles.subscription_details__overview}
        >
          <Card className={styles.subscription_details__overview_card}>
            <h3 className={styles.subscription_details__overview_title}>
              <Icon
                name="user"
                size={18}
                className={styles.subscription_details__overview_icon}
              />
              Customer
            </h3>
            <div className={styles.subscription_details__overview_content}>
              <p className={styles.subscription_details__overview_value}>
                {subscription.customer?.firstName}{" "}
                {subscription.customer?.lastName}
              </p>
              <p className={styles.subscription_details__overview_subvalue}>
                {subscription.customer?.email}
              </p>
              {subscription.customer?.phone && (
                <p className={styles.subscription_details__overview_subvalue}>
                  {subscription.customer?.phone}
                </p>
              )}
            </div>
          </Card>

          <Card className={styles.subscription_details__overview_card}>
            <h3 className={styles.subscription_details__overview_title}>
              <Icon
                name="calendar"
                size={18}
                className={styles.subscription_details__overview_icon}
              />
              Billing Cycle
            </h3>
            <div className={styles.subscription_details__overview_content}>
              <p className={styles.subscription_details__overview_value}>
                {formatBillingCycle(subscription.billingCycle)}
              </p>
              <p className={styles.subscription_details__overview_subvalue}>
                Auto-renew: {subscription.autoRenew ? "Yes" : "No"}
              </p>
              <p className={styles.subscription_details__overview_subvalue}>
                {subscription.duration
                  ? `${subscription.duration} months duration`
                  : "No fixed duration"}
              </p>
            </div>
          </Card>

          <Card className={styles.subscription_details__overview_card}>
            <h3 className={styles.subscription_details__overview_title}>
              <Icon
                name="dollar-sign"
                size={18}
                className={styles.subscription_details__overview_icon}
              />
              Pricing
            </h3>
            <div className={styles.subscription_details__overview_content}>
              <p className={styles.subscription_details__overview_value}>
                {formatToNaira(subscription.totalPrice)}/month
              </p>
              <p className={styles.subscription_details__overview_subvalue}>
                Next billing:{" "}
                {subscription.nextBillingDate
                  ? formatDate(subscription.nextBillingDate)
                  : "Not scheduled"}
              </p>
              <p className={styles.subscription_details__overview_subvalue}>
                Last billed:{" "}
                {subscription.lastBillingDate
                  ? formatDate(subscription.lastBillingDate)
                  : "Not billed yet"}
              </p>
            </div>
          </Card>

          <Card className={styles.subscription_details__overview_card}>
            <h3 className={styles.subscription_details__overview_title}>
              <Icon
                name="clock"
                size={18}
                className={styles.subscription_details__overview_icon}
              />
              Dates
            </h3>
            <div className={styles.subscription_details__overview_content}>
              <p className={styles.subscription_details__overview_value}>
                Start date: {formatDate(subscription.startDate)}
              </p>
              {subscription.endDate && (
                <p className={styles.subscription_details__overview_subvalue}>
                  End date: {formatDate(subscription.endDate)}
                </p>
              )}
              <p className={styles.subscription_details__overview_subvalue}>
                Created: {formatDate(subscription.createdAt)}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate="visible"
          className={styles.subscription_details__tabs}
        >
          <button
            className={`${styles.subscription_details__tab} ${activeTab === "details" ? styles.subscription_details__tab_active : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`${styles.subscription_details__tab} ${activeTab === "services" ? styles.subscription_details__tab_active : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services
            <span className={styles.subscription_details__tab_count}>
              {subscription.subscriptionServices?.length || 0}
            </span>
          </button>
          <button
            className={`${styles.subscription_details__tab} ${activeTab === "billing" ? styles.subscription_details__tab_active : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            Billing
          </button>
          <button
            className={`${styles.subscription_details__tab} ${activeTab === "history" ? styles.subscription_details__tab_active : ""}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.subscription_details__content_card}>
                <div className={styles.subscription_details__card_header}>
                  <h2 className={styles.subscription_details__card_title}>
                    Subscription Details
                  </h2>
                  {/* <Button
                    variant={isEditing ? "primary" : "secondary"}
                    size="small"
                    onClick={() =>
                      isEditing ? handleSaveChanges() : setIsEditing(true)
                    }
                    disabled={
                      isActionLoading ||
                      subscription.status !== SubscriptionStatus.Active
                    }
                  >
                    {isEditing ? "Save Changes" : "Edit Details"}
                  </Button> */}
                </div>

                <div className={styles.subscription_details__detail_form}>
                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Billing Cycle
                    </label>
                    {isEditing ? (
                      <select
                        className={styles.subscription_details__form_select}
                        value={editFormData.billingCycle}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            billingCycle: e.target.value,
                          })
                        }
                      >
                        <option value="WEEKLY">Weekly</option>
                        <option value="BIWEEKLY">Biweekly</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="YEARLY">Yearly</option>
                      </select>
                    ) : (
                      <p className={styles.subscription_details__form_value}>
                        {formatBillingCycle(subscription.billingCycle)}
                      </p>
                    )}
                  </div>

                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Auto-Renew
                    </label>
                    {isEditing ? (
                      <div
                        className={
                          styles.subscription_details__toggle_container
                        }
                      >
                        <input
                          type="checkbox"
                          id="autoRenew"
                          className={styles.subscription_details__toggle_input}
                          checked={editFormData.autoRenew}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              autoRenew: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="autoRenew"
                          className={styles.subscription_details__toggle_label}
                        >
                          {editFormData.autoRenew ? "Yes" : "No"}
                        </label>
                      </div>
                    ) : (
                      <p className={styles.subscription_details__form_value}>
                        {subscription.autoRenew ? "Yes" : "No"}
                      </p>
                    )}
                  </div>

                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Status
                    </label>
                    <p className={styles.subscription_details__form_value}>
                      <StatusBadge
                        status={getStatusColor(subscription.status)}
                        label={getStatusLabel(subscription.status)}
                      />
                    </p>
                  </div>

                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Start Date
                    </label>
                    <p className={styles.subscription_details__form_value}>
                      {formatDate(subscription.startDate)}
                    </p>
                  </div>

                  {subscription.endDate && (
                    <div className={styles.subscription_details__form_group}>
                      <label
                        className={styles.subscription_details__form_label}
                      >
                        End Date
                      </label>
                      <p className={styles.subscription_details__form_value}>
                        {formatDate(subscription.endDate)}
                      </p>
                    </div>
                  )}

                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Next Billing Date
                    </label>
                    <p className={styles.subscription_details__form_value}>
                      {subscription.nextBillingDate
                        ? formatDate(subscription.nextBillingDate)
                        : "Not scheduled"}
                    </p>
                  </div>

                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Last Billing Date
                    </label>
                    <p className={styles.subscription_details__form_value}>
                      {subscription.lastBillingDate
                        ? formatDate(subscription.lastBillingDate)
                        : "Not billed yet"}
                    </p>
                  </div>

                  <div className={styles.subscription_details__form_group}>
                    <label className={styles.subscription_details__form_label}>
                      Next Service Date
                    </label>
                    <p className={styles.subscription_details__form_value}>
                      {calculateNextServiceDate(
                        subscription.lastBillingDate,
                        subscription.billingCycle
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.subscription_details__content_card}>
                <div className={styles.subscription_details__card_header}>
                  <h2 className={styles.subscription_details__card_title}>
                    Services
                  </h2>
                  {/* {subscription.status === SubscriptionStatus.Active && (
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => setShowAddServiceModal(true)}
                    >
                      Add Service
                    </Button>
                  )} */}
                </div>

                {subscription.subscriptionServices &&
                subscription.subscriptionServices.length > 0 ? (
                  <div
                    className={styles.subscription_details__services_container}
                  >
                    {subscription.subscriptionServices.map(
                      (serviceItem, index) => (
                        <motion.div
                          key={serviceItem.id || index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={styles.subscription_details__service_card}
                        >
                          <div
                            className={
                              styles.subscription_details__service_header
                            }
                          >
                            <div
                              className={
                                styles.subscription_details__service_icon_container
                              }
                            >
                              <Icon
                                name={serviceItem.service?.icon || "box"}
                                size={24}
                                className={
                                  styles.subscription_details__service_icon
                                }
                              />
                            </div>
                            <div
                              className={
                                styles.subscription_details__service_info
                              }
                            >
                              <h3
                                className={
                                  styles.subscription_details__service_name
                                }
                              >
                                {serviceItem.service?.name || "Unknown Service"}
                              </h3>
                              <p
                                className={
                                  styles.subscription_details__service_type
                                }
                              >
                                {serviceItem.serviceType
                                  ? serviceItem.serviceType
                                      .charAt(0)
                                      .toUpperCase() +
                                    serviceItem.serviceType
                                      .slice(1)
                                      .toLowerCase()
                                  : "Standard"}{" "}
                                •
                                {serviceItem.frequency
                                  ? ` ${serviceItem.frequency.charAt(0).toUpperCase() + serviceItem.frequency.slice(1).toLowerCase()}`
                                  : " Regular frequency"}
                              </p>
                            </div>
                            <div
                              className={
                                styles.subscription_details__service_price
                              }
                            >
                              {formatToNaira(serviceItem.price || 0)}/month
                            </div>
                          </div>

                          <div
                            className={
                              styles.subscription_details__service_details
                            }
                          >
                            {serviceItem.service?.description && (
                              <p
                                className={
                                  styles.subscription_details__service_description
                                }
                              >
                                {serviceItem.service.description}
                              </p>
                            )}

                            {serviceItem.serviceDetails?.cleaning && (
                              <div
                                className={
                                  styles.subscription_details__service_specifics
                                }
                              >
                                <h4>Cleaning Details:</h4>
                                <p>
                                  Type:{" "}
                                  {
                                    serviceItem.serviceDetails.cleaning
                                      .cleaningType
                                  }
                                </p>
                                <p>
                                  House Type:{" "}
                                  {
                                    serviceItem.serviceDetails.cleaning
                                      .houseType
                                  }
                                </p>
                                {serviceItem.serviceDetails.cleaning.rooms && (
                                  <div
                                    className={
                                      styles.subscription_details__room_details
                                    }
                                  >
                                    <h5>Rooms:</h5>
                                    <ul
                                      className={
                                        styles.subscription_details__room_list
                                      }
                                    >
                                      {Object.entries(
                                        serviceItem.serviceDetails.cleaning
                                          .rooms
                                      )
                                        .filter(
                                          ([_, value]) => Number(value) > 0
                                        )
                                        .map(([room, count]) => (
                                          <li key={room}>
                                            {room.charAt(0).toUpperCase() +
                                              room.slice(1)}
                                            : {count}
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {serviceItem.serviceDetails?.laundry && (
                              <div
                                className={
                                  styles.subscription_details__service_specifics
                                }
                              >
                                <h4>Laundry Details:</h4>
                                <p>
                                  Type:{" "}
                                  {
                                    serviceItem.serviceDetails.laundry
                                      .laundryType
                                  }
                                </p>
                                <p>
                                  Bags:{" "}
                                  {serviceItem.serviceDetails.laundry.bags}
                                </p>
                                {serviceItem.serviceDetails.laundry.items && (
                                  <div
                                    className={
                                      styles.subscription_details__laundry_details
                                    }
                                  >
                                    <h5>Items:</h5>
                                    <ul
                                      className={
                                        styles.subscription_details__laundry_list
                                      }
                                    >
                                      {Object.entries(
                                        serviceItem.serviceDetails.laundry.items
                                      )
                                        .filter(
                                          ([_, value]) => Number(value) > 0
                                        )
                                        .map(([item, count]) => (
                                          <li key={item}>
                                            {item.charAt(0).toUpperCase() +
                                              item.slice(1)}
                                            : {count}
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {serviceItem.serviceDetails?.cooking && (
                              <div
                                className={
                                  styles.subscription_details__service_specifics
                                }
                              >
                                <h4>Cooking Details:</h4>
                                <p>
                                  Meal Type:{" "}
                                  {serviceItem.serviceDetails.cooking.mealType}
                                </p>
                                {serviceItem.serviceDetails.cooking
                                  .mealsPerDelivery && (
                                  <div
                                    className={
                                      styles.subscription_details__cooking_details
                                    }
                                  >
                                    <h5>Meals Per Delivery:</h5>
                                    <ul
                                      className={
                                        styles.subscription_details__cooking_list
                                      }
                                    >
                                      {serviceItem.serviceDetails.cooking.mealsPerDelivery.map(
                                        (meal, i) => (
                                          <li key={i}>
                                            {meal.day}: {meal.count} meals
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {serviceItem.serviceDetails?.pestControl && (
                              <div
                                className={
                                  styles.subscription_details__service_specifics
                                }
                              >
                                <h4>Pest Control Details:</h4>
                                <p>
                                  Treatment Type:{" "}
                                  {
                                    serviceItem.serviceDetails.pestControl
                                      .treatmentType
                                  }
                                </p>
                                <p>
                                  Severity:{" "}
                                  {
                                    serviceItem.serviceDetails.pestControl
                                      .severity
                                  }
                                </p>
                                <p>
                                  Areas:{" "}
                                  {serviceItem.serviceDetails.pestControl.areas?.join(
                                    ", "
                                  )}
                                </p>
                              </div>
                            )}

                            {serviceItem.scheduledDays && (
                              <div
                                className={
                                  styles.subscription_details__schedule
                                }
                              >
                                <h4>Schedule:</h4>
                                <p>
                                  Days: {serviceItem.scheduledDays.join(", ")}
                                </p>
                                <p>
                                  Preferred Time:{" "}
                                  {serviceItem.preferredTimeSlot}
                                </p>
                              </div>
                            )}
                          </div>

                          <div
                            className={
                              styles.subscription_details__service_actions
                            }
                          >
                            <Button
                              variant="secondary"
                              size="small"
                              onClick={() =>
                                console.log(
                                  "Edit service functionality to be implemented"
                                )
                              }
                              disabled={
                                subscription.status !==
                                SubscriptionStatus.Active
                              }
                            >
                              Edit Service
                            </Button>
                            <Button
                              variant="secondary"
                              size="small"
                              onClick={() =>
                                handleRemoveServiceClick(serviceItem.id)
                              }
                              disabled={
                                subscription.status !==
                                SubscriptionStatus.Active
                              }
                            >
                              Remove Service
                            </Button>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                ) : (
                  <div className={styles.subscription_details__no_services}>
                    <Icon
                      name="package"
                      size={48}
                      className={styles.subscription_details__no_services_icon}
                    />
                    <p>No services associated with this subscription.</p>
                    {subscription.status === SubscriptionStatus.Active && (
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => setShowAddServiceModal(true)}
                      >
                        Add a Service
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.subscription_details__content_card}>
                <div className={styles.subscription_details__card_header}>
                  <h2 className={styles.subscription_details__card_title}>
                    Billing Information
                  </h2>
                </div>

                <div className={styles.subscription_details__billing_info}>
                  <div className={styles.subscription_details__billing_section}>
                    <h3
                      className={styles.subscription_details__billing_subtitle}
                    >
                      Payment Method
                    </h3>
                    {subscription.paymentMethod ? (
                      <div
                        className={styles.subscription_details__payment_method}
                      >
                        <div className={styles.subscription_details__card_info}>
                          <div
                            className={styles.subscription_details__card_type}
                          >
                            {subscription.paymentMethod.brand} ••••{" "}
                            {subscription.paymentMethod.last4}
                          </div>
                          <div
                            className={styles.subscription_details__card_expiry}
                          >
                            Expires {subscription.paymentMethod.expiryMonth}/
                            {subscription.paymentMethod.expiryYear}
                          </div>
                        </div>
                        {subscription.status === SubscriptionStatus.Active && (
                          <Button
                            variant="secondary"
                            size="small"
                            onClick={() =>
                              console.log(
                                "Change payment method functionality to be implemented"
                              )
                            }
                          >
                            Change
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className={styles.subscription_details__no_payment}>
                        <p>No payment method on file.</p>
                        {subscription.status === SubscriptionStatus.Active && (
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() =>
                              console.log(
                                "Add payment method functionality to be implemented"
                              )
                            }
                          >
                            Add Payment Method
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className={styles.subscription_details__billing_section}>
                    <h3
                      className={styles.subscription_details__billing_subtitle}
                    >
                      Billing Summary
                    </h3>
                    <div
                      className={styles.subscription_details__billing_summary}
                    >
                      <div className={styles.subscription_details__billing_row}>
                        <span>Billing Cycle:</span>
                        <span>
                          {formatBillingCycle(subscription.billingCycle)}
                        </span>
                      </div>
                      <div className={styles.subscription_details__billing_row}>
                        <span>Next Billing Date:</span>
                        <span>
                          {subscription.nextBillingDate
                            ? formatDate(subscription.nextBillingDate)
                            : "Not scheduled"}
                        </span>
                      </div>
                      <div className={styles.subscription_details__billing_row}>
                        <span>Monthly Total:</span>
                        <span className={styles.subscription_details__amount}>
                          {formatToNaira(subscription.totalPrice || 0)}
                        </span>
                      </div>
                      {subscription.duration && (
                        <div
                          className={styles.subscription_details__billing_row}
                        >
                          <span>Contract Length:</span>
                          <span>{subscription.duration} months</span>
                        </div>
                      )}
                      <div className={styles.subscription_details__billing_row}>
                        <span>Auto-Renew:</span>
                        <span>{subscription.autoRenew ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sample Billing History */}
                  <div className={styles.subscription_details__billing_section}>
                    <h3
                      className={styles.subscription_details__billing_subtitle}
                    >
                      Billing History
                    </h3>
                    <div
                      className={styles.subscription_details__billing_history}
                    >
                      <table
                        className={styles.subscription_details__billing_table}
                      >
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Invoice</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Sample billing data - would come from API in real app */}
                          <tr>
                            <td>
                              {formatDate(
                                new Date(
                                  Date.now() - 30 * 24 * 60 * 60 * 1000
                                ).toISOString()
                              )}
                            </td>
                            <td>
                              {formatToNaira(subscription.totalPrice || 0)}
                            </td>
                            <td>
                              <StatusBadge status="active" label="Paid" />
                            </td>
                            <td>
                              <Button
                                variant="text"
                                size="small"
                                onClick={() =>
                                  console.log(
                                    "View invoice functionality to be implemented"
                                  )
                                }
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {formatDate(
                                new Date(
                                  Date.now() - 60 * 24 * 60 * 60 * 1000
                                ).toISOString()
                              )}
                            </td>
                            <td>
                              {formatToNaira(subscription.totalPrice || 0)}
                            </td>
                            <td>
                              <StatusBadge status="active" label="Paid" />
                            </td>
                            <td>
                              <Button
                                variant="text"
                                size="small"
                                onClick={() =>
                                  console.log(
                                    "View invoice functionality to be implemented"
                                  )
                                }
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.subscription_details__content_card}>
                <div className={styles.subscription_details__card_header}>
                  <h2 className={styles.subscription_details__card_title}>
                    Service History
                  </h2>
                </div>

                <div className={styles.subscription_details__history}>
                  {serviceHistory.length > 0 ? (
                    <div className={styles.subscription_details__history_list}>
                      {serviceHistory.map((record, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={styles.subscription_details__history_item}
                        >
                          <div
                            className={
                              styles.subscription_details__history_date
                            }
                          >
                            {formatDate(record.date)}
                          </div>
                          <div
                            className={
                              styles.subscription_details__history_content
                            }
                          >
                            <div
                              className={
                                styles.subscription_details__history_status
                              }
                            >
                              <StatusBadge
                                status={
                                  record.status === "Completed"
                                    ? "active"
                                    : "cancelled"
                                }
                                label={record.status}
                              />
                            </div>
                            <p
                              className={
                                styles.subscription_details__history_staff
                              }
                            >
                              Staff: {record.staff}
                            </p>
                            <p
                              className={
                                styles.subscription_details__history_notes
                              }
                            >
                              {record.notes}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.subscription_details__no_history}>
                      <Icon
                        name="clock"
                        size={48}
                        className={styles.subscription_details__no_history_icon}
                      />
                      <p>No service history available for this subscription.</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setConfirmAction(null);
          }}
          onConfirm={() => confirmAction?.action()}
          title={confirmAction?.title || ""}
          message={confirmAction?.message || ""}
          confirmText="Confirm"
          cancelText="Cancel"
          variant={
            confirmAction?.type === "cancel"
              ? "danger"
              : confirmAction?.type === "pause"
                ? "warning"
                : "info"
          }
          isLoading={isActionLoading}
        />

        {/* Add Service Modal */}
        {/* <AddServiceModal
          isOpen={showAddServiceModal}
          onClose={() => setShowAddServiceModal(false)}
          subscriptionId={id}
          onServiceAdded={handleServiceAdded}
          subscriptionServices={subscription.subscriptionServices}
        /> */}
      </div>
    </AdminDashboardLayout>
  );
}
