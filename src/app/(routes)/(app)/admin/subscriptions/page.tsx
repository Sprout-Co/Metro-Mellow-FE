"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./subscriptions.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import ConfirmationModal from "../_components/UI/ConfirmationModal/ConfirmationModal";
import { motion } from "framer-motion";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { SubscriptionStatus, Subscription, SubscriptionService } from "@/graphql/api";
import { Icon } from "@/components/ui/Icon/Icon";

export default function SubscriptionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SubscriptionStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "status_change";
    subscriptionId: string;
    newStatus: SubscriptionStatus;
    title: string;
    message: string;
  } | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    handleGetSubscriptions,
    handleCancelSubscription,
    handlePauseSubscription,
    handleResumeSubscription,
    handleReactivateSubscription,
    handleUpdateSubscriptionStatus,
  } = useSubscriptionOperations();

  useEffect(() => {
    fetchSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await handleGetSubscriptions();
      setSubscriptions((data as Subscription[]) || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch subscriptions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      searchQuery === "" ||
      subscription.customer?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.customer?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.subscriptionServices?.some((service: SubscriptionService) =>
        service.service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter = activeFilter === "all" || subscription.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const openStatusConfirmation = (subscriptionId: string, newStatus: SubscriptionStatus) => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    const customerName = subscription?.customer ? `${subscription.customer.firstName || ""} ${subscription.customer.lastName || ""}`.trim() : "Unknown";
    
    let title = "";
    let message = "";
    
    switch (newStatus) {
      case SubscriptionStatus.Cancelled:
        title = "Cancel Subscription";
        message = `Are you sure you want to cancel the subscription for ${customerName}? This will stop all future billing and services.`;
        break;
      case SubscriptionStatus.Paused:
        title = "Pause Subscription";
        message = `Pause the subscription for ${customerName}? Services will be temporarily suspended.`;
        break;
      case SubscriptionStatus.Active:
        const currentStatus = subscription?.status;
        if (currentStatus === SubscriptionStatus.Paused) {
          title = "Resume Subscription";
          message = `Resume the subscription for ${customerName}? Services will restart.`;
        } else if (currentStatus === SubscriptionStatus.Cancelled) {
          title = "Reactivate Subscription";
          message = `Reactivate the subscription for ${customerName}? Billing and services will resume.`;
        } else {
          title = "Activate Subscription";
          message = `Activate the subscription for ${customerName}?`;
        }
        break;
      default:
        title = "Update Status";
        message = `Update the subscription status for ${customerName}?`;
    }
    
    setConfirmAction({
      type: "status_change",
      subscriptionId,
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
      
      const { subscriptionId, newStatus } = confirmAction;
      const subscription = subscriptions.find(s => s.id === subscriptionId);
      
      if (newStatus === SubscriptionStatus.Cancelled) {
        await handleCancelSubscription(subscriptionId);
      } else if (newStatus === SubscriptionStatus.Paused) {
        await handlePauseSubscription(subscriptionId);
      } else if (newStatus === SubscriptionStatus.Active && subscription?.status === SubscriptionStatus.Paused) {
        await handleResumeSubscription(subscriptionId);
      } else if (newStatus === SubscriptionStatus.Active && subscription?.status === SubscriptionStatus.Cancelled) {
        await handleReactivateSubscription(subscriptionId);
      } else {
        await handleUpdateSubscriptionStatus(subscriptionId, newStatus);
      }
      
      await fetchSubscriptions();
      setShowConfirmModal(false);
      setConfirmAction(null);
    } catch (error) {
      console.error("Error updating subscription status:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update subscription status"
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const openModal = (_type: "create" | "edit" | "view", _subscription?: unknown) => {
    // Modal functionality to be implemented
    console.log("Modal functionality to be implemented");
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatBillingCycle = (cycle: string) => {
    return cycle.charAt(0).toUpperCase() + cycle.slice(1).toLowerCase();
  };

  const calculateTotalPrice = (services: unknown[]) => {
    return services?.reduce((total, service) => {
      const s = service as { price?: number };
      return total + (s.price || 0);
    }, 0) || 0;
  };

  const getServiceNames = (services: unknown[]) => {
    return services?.map((service) => {
      const s = service as { service?: { name?: string } };
      return s.service?.name;
    }).join(", ") || "N/A";
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
          phone?: string; 
        };
        const fullName = `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim() || "N/A";
        return (
          <div className={styles.subscriptions_page__customer_cell}>
            {/* <div className={styles.subscriptions_page__customer_initial}>
              {customer?.firstName?.charAt(0) || 'N'}
            </div> */}
            <div className={styles.subscriptions_page__customer_info}>
              <div className={styles.subscriptions_page__customer_name}>
                {fullName}
              </div>
              <div className={styles.subscriptions_page__customer_email}>
                {customer?.email || 'N/A'}
              </div>
              <div className={styles.subscriptions_page__customer_phone}>
                {customer?.phone || 'N/A'}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "services",
      header: "Services",
      width: "18%",
      render: (value: unknown) => {
        const services = value as unknown[];
        return (
          <div className={styles.subscriptions_page__services_cell}>
            <div className={styles.subscriptions_page__services_list}>
              {getServiceNames(services)}
            </div>
            <div className={styles.subscriptions_page__services_count}>
              {services?.length || 0} service{(services?.length || 0) !== 1 ? 's' : ''}
            </div>
            <div className={styles.subscriptions_page__services_price}>
              ${calculateTotalPrice(services).toFixed(2)}/month
            </div>
          </div>
        );
      },
    },
    {
      key: "billingCycle",
      header: "Billing",
      width: "10%",
      render: (value: string) => (
        <div className={styles.subscriptions_page__billing_cell}>
          <div className={styles.subscriptions_page__billing_cycle}>
            {formatBillingCycle(value)}
          </div>
          <div className={styles.subscriptions_page__billing_frequency}>
            Every {value === "MONTHLY" ? "month" : value === "WEEKLY" ? "week" : "year"}
          </div>
        </div>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      width: "10%",
      render: (value: string) => (
        <div className={styles.subscriptions_page__date_cell}>
          <div className={styles.subscriptions_page__date_main}>
            {formatDate(value)}
          </div>
          <div className={styles.subscriptions_page__date_elapsed}>
            {Math.floor((Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24))} days ago
          </div>
        </div>
      ),
    },
    {
      key: "nextBillingDate",
      header: "Next Billing",
      width: "10%",
      render: (value: string) => {
        if (!value) return <span className={styles.subscriptions_page__no_billing}>N/A</span>;
        const isOverdue = new Date(value) < new Date();
        return (
          <div className={`${styles.subscriptions_page__next_billing} ${isOverdue ? styles.subscriptions_page__overdue : ''}`}>
            {formatDate(value)}
          </div>
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
          label={value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "16%",
      render: (_value: unknown, row: unknown) => {
        const subscription = row as Subscription;
        return (
          <div className={styles.subscriptions_page__actions_cell}>
            <button
              className={styles.subscriptions_page__action_button}
              onClick={() => router.push(`/admin/subscriptions/${subscription.id}`)}
              title="View details"
            >
              View
            </button>
          </div>
        );
      },
    },
  ];

  const subscriptionStats = [
    { label: "Total Subscriptions", value: subscriptions.length },
    {
      label: "Active",
      value: subscriptions.filter((s) => s.status === SubscriptionStatus.Active).length,
    },
    {
      label: "Paused",
      value: subscriptions.filter((s) => s.status === SubscriptionStatus.Paused).length,
    }
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: SubscriptionStatus.Active, label: "Active" },
    { value: SubscriptionStatus.Paused, label: "Paused" },
    { value: SubscriptionStatus.Cancelled, label: "Cancelled" },
    { value: SubscriptionStatus.Expired, label: "Expired" },
  ];

  return (
    <AdminDashboardLayout
      title="Subscriptions"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Subscriptions", path: "/admin/subscriptions" },
      ]}
    >
      <div className={styles.subscriptions_page}>
        <div className={styles.subscriptions_page__header}>
          <div className={styles.subscriptions_page__title_area}>
            <h2 className={styles.subscriptions_page__title}>Subscription Management</h2>
            <p className={styles.subscriptions_page__subtitle}>
              View and manage all customer subscriptions
            </p>
          </div>

          <div className={styles.subscriptions_page__actions}>
            <Button
              variant="primary"
              size="medium"
              icon="+"
              onClick={() => router.push("/admin/subscriptions/add")}
            >
              Add Subscription
            </Button>
          </div>
        </div>

        {error && (
          <div className={styles.subscriptions_page__error}>
            <div className={styles.subscriptions_page__error_content}>
              <Icon name="alert-triangle" size={16} className={styles.subscriptions_page__error_icon} />
              <span className={styles.subscriptions_page__error_message}>
                {error}
              </span>
              <button
                className={styles.subscriptions_page__error_dismiss}
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className={styles.subscriptions_page__stats}>
          {subscriptionStats.map((stat, index) => (
            <Card key={index} className={styles.subscriptions_page__stat_card}>
              <h3 className={styles.subscriptions_page__stat_label}>{stat.label}</h3>
              <p className={styles.subscriptions_page__stat_value}>{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className={styles.subscriptions_page__content}>
          <div className={styles.subscriptions_page__filters}>
            <div className={styles.subscriptions_page__search}>
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.subscriptions_page__search_input}
              />
            </div>

            <div className={styles.subscriptions_page__filter_buttons}>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.subscriptions_page__filter_button} ${
                    activeFilter === option.value
                      ? styles["subscriptions_page__filter_button--active"]
                      : ""
                  }`}
                  onClick={() => setActiveFilter(option.value as SubscriptionStatus | "all")}
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
              <div className={styles.subscriptions_page__loading}>Loading subscriptions...</div>
            ) : (
              <Table
                columns={columns}
                data={filteredSubscriptions}
                onRowClick={(subscription) => router.push(`/admin/subscriptions/${subscription.id}`)}
              />
            )}
          </motion.div>
        </Card>

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
          variant={confirmAction?.newStatus === SubscriptionStatus.Cancelled ? "danger" : "warning"}
          isLoading={isActionLoading}
        />
      </div>
    </AdminDashboardLayout>
  );
}