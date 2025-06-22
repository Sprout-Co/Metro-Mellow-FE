"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./subscriptions.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import { motion } from "framer-motion";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { SubscriptionStatus } from "@/graphql/api";

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SubscriptionStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<unknown[]>([]);
  // Modal state for future implementation
  // const [selectedSubscription, setSelectedSubscription] = useState<unknown>(null);
  // const [showModal, setShowModal] = useState(false);
  // const [modalType, setModalType] = useState<"create" | "edit" | "view">("view");

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
      const data = await handleGetSubscriptions();
      setSubscriptions(data || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      searchQuery === "" ||
      subscription.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.services?.some((service: any) =>
        service.service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter = activeFilter === "all" || subscription.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleStatusUpdate = async (subscriptionId: string, newStatus: SubscriptionStatus) => {
    try {
      if (newStatus === SubscriptionStatus.Cancelled) {
        await handleCancelSubscription(subscriptionId);
      } else if (newStatus === SubscriptionStatus.Paused) {
        await handlePauseSubscription(subscriptionId);
      } else if (newStatus === SubscriptionStatus.Active && subscriptions.find(s => s.id === subscriptionId)?.status === SubscriptionStatus.Paused) {
        await handleResumeSubscription(subscriptionId);
      } else if (newStatus === SubscriptionStatus.Active && subscriptions.find(s => s.id === subscriptionId)?.status === SubscriptionStatus.Cancelled) {
        await handleReactivateSubscription(subscriptionId);
      } else {
        await handleUpdateSubscriptionStatus(subscriptionId, newStatus);
      }
      await fetchSubscriptions();
    } catch (error) {
      console.error("Error updating subscription status:", error);
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
      key: "id",
      header: "Subscription ID",
      width: "10%",
      render: (value: string) => (
        <span className={styles.subscriptions_page__subscription_id}>#{value.slice(-8)}</span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      width: "20%",
      render: (value: unknown) => {
        const customer = value as { name?: string; email?: string };
        return (
          <div className={styles.subscriptions_page__customer_cell}>
            <div className={styles.subscriptions_page__customer_initial}>
              {customer?.name?.charAt(0) || 'N'}
            </div>
            <div className={styles.subscriptions_page__customer_info}>
              <div className={styles.subscriptions_page__customer_name}>
                {customer?.name || 'N/A'}
              </div>
              <div className={styles.subscriptions_page__customer_email}>
                {customer?.email || 'N/A'}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "services",
      header: "Services",
      width: "20%",
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
          </div>
        );
      },
    },
    {
      key: "billingCycle",
      header: "Billing",
      width: "10%",
      render: (value: string) => formatBillingCycle(value),
    },
    {
      key: "startDate",
      header: "Start Date",
      width: "10%",
      render: (value: string) => formatDate(value),
    },
    {
      key: "services",
      header: "Price",
      width: "10%",
      render: (value: unknown) => {
        const services = value as unknown[];
        return (
          <span className={styles.subscriptions_page__price}>
            ${calculateTotalPrice(services).toFixed(2)}
          </span>
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
      width: "10%",
      render: (_value: unknown, row: unknown) => {
        const subscription = row as { id: string; status: SubscriptionStatus };
        return (
          <div className={styles.subscriptions_page__actions_cell}>
            <button
              className={styles.subscriptions_page__action_button}
              onClick={() => openModal("view", row)}
            >
              View
            </button>
            <button
              className={styles.subscriptions_page__action_button}
              onClick={() => openModal("edit", row)}
            >
              Edit
            </button>
            <select
              className={styles.subscriptions_page__status_select}
              value={subscription.status}
              onChange={(e) => handleStatusUpdate(subscription.id, e.target.value as SubscriptionStatus)}
            >
              <option value={SubscriptionStatus.Active}>Active</option>
              <option value={SubscriptionStatus.Paused}>Paused</option>
              <option value={SubscriptionStatus.Cancelled}>Cancelled</option>
              <option value={SubscriptionStatus.Expired}>Expired</option>
            </select>
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
    },
    {
      label: "Monthly Revenue",
      value: `$${subscriptions
        .filter((s) => s.status === SubscriptionStatus.Active)
        .reduce((sum, s) => sum + calculateTotalPrice(s.services || []), 0)
        .toFixed(2)}`,
    },
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
              onClick={() => openModal("create")}
            >
              Add Subscription
            </Button>
          </div>
        </div>

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
                onRowClick={(subscription) => openModal("view", subscription)}
              />
            )}
          </motion.div>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}