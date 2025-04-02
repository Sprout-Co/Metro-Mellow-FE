"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import styles from "./ServiceManagement.module.scss";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import {
  SubscriptionStatus,
  SubscriptionPlan,
  SubscriptionFrequency,
} from "@/graphql/api";

type SubscriptionFilterType = "all" | "active" | "cancelled" | "suspended";
type SubscriptionSortType = "name" | "date" | "price";

export default function SubscriptionManagement() {
  const [filter, setFilter] = useState<SubscriptionFilterType>("all");
  const [sort, setSort] = useState<SubscriptionSortType>("date");
  const [expandedSubscription, setExpandedSubscription] = useState<
    string | null
  >(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    handleGetCustomerSubscriptions,
    handleUpdateSubscriptionStatus,
    handleCancelSubscription,
    handleReactivateSubscription,
  } = useSubscriptionOperations();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await handleGetCustomerSubscriptions();
      setSubscriptions(data || []);
    } catch (err) {
      setError("Failed to load subscriptions");
      console.error("Error loading subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionIcon = (plan: SubscriptionPlan) => {
    switch (plan) {
      case SubscriptionPlan.Basic:
        return "home";
      case SubscriptionPlan.Premium:
        return "award";
      case SubscriptionPlan.Luxury:
        return "shield";
      default:
        return "package";
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not scheduled";

    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const toggleSubscription = (id: string) => {
    if (expandedSubscription === id) {
      setExpandedSubscription(null);
    } else {
      setExpandedSubscription(id);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: SubscriptionStatus
  ) => {
    try {
      await handleUpdateSubscriptionStatus(id, newStatus);
      await loadSubscriptions(); // Reload subscriptions after status change
    } catch (err) {
      console.error("Error updating subscription status:", err);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await handleCancelSubscription(id);
      await loadSubscriptions(); // Reload subscriptions after cancellation
    } catch (err) {
      console.error("Error cancelling subscription:", err);
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      await handleReactivateSubscription(id);
      await loadSubscriptions(); // Reload subscriptions after reactivation
    } catch (err) {
      console.error("Error reactivating subscription:", err);
    }
  };

  const filterSubscriptions = () => {
    let filtered = [...subscriptions];

    if (filter !== "all") {
      filtered = filtered.filter(
        (subscription) => subscription.status === filter.toUpperCase()
      );
    }

    switch (sort) {
      case "name":
        filtered.sort((a, b) => a.service.name.localeCompare(b.service.name));
        break;
      case "date":
        filtered.sort((a, b) => {
          if (!a.nextBillingDate) return 1;
          if (!b.nextBillingDate) return -1;
          return (
            new Date(a.nextBillingDate).getTime() -
            new Date(b.nextBillingDate).getTime()
          );
        });
        break;
      case "price":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  };

  const filteredSubscriptions = filterSubscriptions();

  if (loading) {
    return (
      <div className={styles.subscriptions__loading}>
        Loading subscriptions...
      </div>
    );
  }

  if (error) {
    return <div className={styles.subscriptions__error}>{error}</div>;
  }

  return (
    <div className={styles.subscriptions}>
      <header className={styles.subscriptions__header}>
        <div>
          <h1 className={styles.subscriptions__title}>
            Subscription Management
          </h1>
          <p className={styles.subscriptions__subtitle}>
            View and manage all your subscriptions
          </p>
        </div>

        <button className={styles.subscriptions__addBtn}>
          <Icon name="plus" />
          New Subscription
        </button>
      </header>

      <div className={styles.subscriptions__toolbar}>
        <div className={styles.subscriptions__filters}>
          <button
            className={`${styles.subscriptions__filterBtn} ${filter === "all" ? styles["subscriptions__filterBtn--active"] : ""}`}
            onClick={() => setFilter("all")}
          >
            All Subscriptions
          </button>
          <button
            className={`${styles.subscriptions__filterBtn} ${filter === "active" ? styles["subscriptions__filterBtn--active"] : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`${styles.subscriptions__filterBtn} ${filter === "cancelled" ? styles["subscriptions__filterBtn--active"] : ""}`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
          <button
            className={`${styles.subscriptions__filterBtn} ${filter === "suspended" ? styles["subscriptions__filterBtn--active"] : ""}`}
            onClick={() => setFilter("suspended")}
          >
            Suspended
          </button>
        </div>

        <div className={styles.subscriptions__sort}>
          <label htmlFor="sort" className={styles.subscriptions__sortLabel}>
            Sort by:
          </label>
          <select
            id="sort"
            className={styles.subscriptions__sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value as SubscriptionSortType)}
          >
            <option value="date">Next Billing Date</option>
            <option value="name">Service Name</option>
            <option value="price">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {filteredSubscriptions.length > 0 ? (
        <div className={styles.subscriptions__list}>
          {filteredSubscriptions.map((subscription) => (
            <motion.div
              key={subscription.id}
              className={styles.subscriptions__card}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={styles.subscriptions__cardHeader}
                onClick={() => toggleSubscription(subscription.id)}
              >
                <div
                  className={`${styles.subscriptions__iconWrapper} ${styles[`subscriptions__iconWrapper--${subscription.plan.toLowerCase()}`]}`}
                >
                  <Icon name={getSubscriptionIcon(subscription.plan)} />
                </div>

                <div className={styles.subscriptions__details}>
                  <h3 className={styles.subscriptions__name}>
                    {subscription.service.name}
                  </h3>
                  <p className={styles.subscriptions__schedule}>
                    {subscription.frequency.toLowerCase().replace("_", " ")} •{" "}
                    {subscription.plan}
                  </p>
                </div>

                <div className={styles.subscriptions__meta}>
                  <span
                    className={`${styles.subscriptions__status} ${styles[`subscriptions__status--${subscription.status.toLowerCase()}`]}`}
                  >
                    {subscription.status}
                  </span>
                  <div className={styles.subscriptions__next}>
                    <span className={styles.subscriptions__nextLabel}>
                      Next Billing:
                    </span>
                    <span className={styles.subscriptions__nextDate}>
                      {formatDate(subscription.nextBillingDate)}
                    </span>
                  </div>
                  <button className={styles.subscriptions__expandBtn}>
                    <Icon
                      name={
                        expandedSubscription === subscription.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                    />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedSubscription === subscription.id && (
                  <motion.div
                    className={styles.subscriptions__cardContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.subscriptions__infoGrid}>
                      <div className={styles.subscriptions__infoSection}>
                        <h4 className={styles.subscriptions__infoTitle}>
                          <Icon name="help-circle" />
                          Subscription Details
                        </h4>
                        <div className={styles.subscriptions__infoList}>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Plan:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {subscription.plan}
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Price:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              ${subscription.price} per billing cycle
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Last Billing:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {formatDate(subscription.lastBillingDate)}
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Auto-renew:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {subscription.autoRenew ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.subscriptions__infoSection}>
                        <h4 className={styles.subscriptions__infoTitle}>
                          <Icon name="calendar" />
                          Billing Schedule
                        </h4>
                        <div className={styles.subscriptions__infoList}>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Start Date:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {formatDate(subscription.startDate)}
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              End Date:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {formatDate(subscription.endDate)}
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Frequency:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {subscription.frequency
                                .toLowerCase()
                                .replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.subscriptions__actions}>
                      {subscription.status === SubscriptionStatus.Active ? (
                        <button
                          className={styles.subscriptions__actionBtn}
                          onClick={() =>
                            handleStatusChange(
                              subscription.id,
                              SubscriptionStatus.Suspended
                            )
                          }
                        >
                          <Icon name="minus" />
                          Suspend Subscription
                        </button>
                      ) : subscription.status ===
                        SubscriptionStatus.Suspended ? (
                        <button
                          className={`${styles.subscriptions__actionBtn} ${styles["subscriptions__actionBtn--resume"]}`}
                          onClick={() =>
                            handleStatusChange(
                              subscription.id,
                              SubscriptionStatus.Active
                            )
                          }
                        >
                          <Icon name="plus" />
                          Resume Subscription
                        </button>
                      ) : null}
                      <button
                        className={styles.subscriptions__actionBtn}
                        onClick={() => handleCancel(subscription.id)}
                      >
                        <Icon name="x" />
                        Cancel Subscription
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.subscriptions__empty}>
          <div className={styles.subscriptions__emptyIcon}>
            <Icon name="calendar" />
          </div>
          <h3 className={styles.subscriptions__emptyTitle}>
            No Subscriptions Found
          </h3>
          <p className={styles.subscriptions__emptyText}>
            {filter !== "all"
              ? `You don't have any ${filter} subscriptions at the moment.`
              : "You haven't subscribed to any services yet. Get started by creating your first subscription."}
          </p>
          <button className={styles.subscriptions__emptyBtn}>
            Create Subscription
            <Icon name="arrow-right" />
          </button>
        </div>
      )}
    </div>
  );
}
