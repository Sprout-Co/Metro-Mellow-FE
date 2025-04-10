"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import styles from "./SubscriptionManagement.module.scss";
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
  const [activeTab, setActiveTab] = useState("details");
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
      setActiveTab("details");
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: SubscriptionStatus
  ) => {
    try {
      await handleUpdateSubscriptionStatus(id, newStatus);
      await loadSubscriptions();
    } catch (err) {
      console.error("Error updating subscription status:", err);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await handleCancelSubscription(id);
      await loadSubscriptions();
    } catch (err) {
      console.error("Error cancelling subscription:", err);
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      await handleReactivateSubscription(id);
      await loadSubscriptions();
    } catch (err) {
      console.error("Error reactivating subscription:", err);
    }
  };

  const getFilterCount = (filterType: SubscriptionFilterType) => {
    if (filterType === "all") return subscriptions.length;
    return subscriptions.filter(
      (sub) => sub.status.toLowerCase() === filterType
    ).length;
  };

  const filterSubscriptions = () => {
    let filtered = [...subscriptions];

    if (filter !== "all") {
      filtered = filtered.filter(
        (subscription) => subscription.status.toLowerCase() === filter
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
      <div className={styles.subscription__loading}>
        <div className={styles.subscription__loader}></div>
        <p className={styles.subscription__loading_text}>
          Loading your subscriptions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.subscription__error}>
        <div className={styles.subscription__error_icon}>
          <Icon name="alert-circle" />
        </div>
        <h3 className={styles.subscription__error_title}>
          Something went wrong
        </h3>
        <p className={styles.subscription__error_message}>{error}</p>
        <button
          className={styles.subscription__retry_button}
          onClick={() => loadSubscriptions()}
        >
          <Icon name="refresh-cw" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.subscription}>
      {/* Header */}
      <div className={styles.subscription__header}>
        <h1 className={styles.subscription__title}>Subscription Management</h1>
        <p className={styles.subscription__subtitle}>
          View and manage your active service subscriptions, adjust billing
          preferences, or create new subscriptions.
        </p>
      </div>

      {/* Controls */}
      <div className={styles.subscription__controls}>
        <div className={styles.subscription__tabs}>
          <button
            className={`${styles.subscription__tab} ${
              filter === "all" ? styles["subscription__tab--active"] : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All Subscriptions
            <span className={styles.subscription__tab_count}>
              {getFilterCount("all")}
            </span>
          </button>
          <button
            className={`${styles.subscription__tab} ${
              filter === "active" ? styles["subscription__tab--active"] : ""
            }`}
            onClick={() => setFilter("active")}
          >
            Active
            <span className={styles.subscription__tab_count}>
              {getFilterCount("active")}
            </span>
          </button>
          <button
            className={`${styles.subscription__tab} ${
              filter === "suspended" ? styles["subscription__tab--active"] : ""
            }`}
            onClick={() => setFilter("suspended")}
          >
            Paused
            <span className={styles.subscription__tab_count}>
              {getFilterCount("suspended")}
            </span>
          </button>
          <button
            className={`${styles.subscription__tab} ${
              filter === "cancelled" ? styles["subscription__tab--active"] : ""
            }`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
            <span className={styles.subscription__tab_count}>
              {getFilterCount("cancelled")}
            </span>
          </button>
        </div>

        <div className={styles.subscription__actions}>
          <button className={styles.subscription__sort_button}>
            <Icon name="filter" />
            Sort by:{" "}
            {sort === "date"
              ? "Next Billing"
              : sort === "name"
                ? "Name"
                : "Price"}
          </button>
          <button className={styles.subscription__add_button}>
            <Icon name="plus" />
            New Subscription
          </button>
        </div>
      </div>

      {filteredSubscriptions.length > 0 ? (
        <div className={styles.subscription__accordion}>
          {filteredSubscriptions.map((subscription) => (
            <motion.div
              key={subscription.id}
              className={`${styles.subscription__item} ${
                expandedSubscription === subscription.id
                  ? styles["subscription__item--expanded"]
                  : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Accordion Header */}
              <div
                className={styles.subscription__item_header}
                onClick={() => toggleSubscription(subscription.id)}
              >
                <div className={styles.subscription__service}>
                  <div
                    className={`${styles.subscription__service_icon} ${
                      styles[
                        `subscription__service_icon--${subscription.plan.toLowerCase()}`
                      ]
                    }`}
                  >
                    <Icon name={getSubscriptionIcon(subscription.plan)} />
                  </div>
                  <div className={styles.subscription__service_details}>
                    <div className={styles.subscription__service_name}>
                      {subscription.service.name}
                    </div>
                    <div className={styles.subscription__service_plan}>
                      {subscription.plan} •{" "}
                      {subscription.frequency.toLowerCase().replace("_", " ")}
                    </div>
                  </div>
                </div>

                <div className={styles.subscription__meta}>
                  <div className={styles.subscription__meta_item}>
                    <span
                      className={`${styles.subscription__status} ${
                        styles[
                          `subscription__status--${subscription.status.toLowerCase()}`
                        ]
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </div>
                  <div className={styles.subscription__meta_item}>
                    <div className={styles.subscription__meta_label}>
                      Next Billing
                    </div>
                    <div className={styles.subscription__meta_value}>
                      {formatDate(subscription.nextBillingDate)}
                    </div>
                  </div>
                  <div className={styles.subscription__meta_item}>
                    <div className={styles.subscription__meta_label}>Price</div>
                    <div className={styles.subscription__meta_value}>
                      ${subscription.price}
                      <span className={styles.subscription__term}>
                        /{subscription.frequency.toLowerCase().split("_")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <button className={styles.subscription__toggle}>
                  <Icon name="chevron-down" />
                </button>
              </div>

              {/* Accordion Content */}
              <AnimatePresence>
                {expandedSubscription === subscription.id && (
                  <motion.div
                    className={styles.subscription__item_content}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.subscription__tabs_wrapper}>
                      <div className={styles.subscription__detail_tabs}>
                        <button
                          className={`${styles.subscription__detail_tab} ${
                            activeTab === "details"
                              ? styles["subscription__detail_tab--active"]
                              : ""
                          }`}
                          onClick={() => setActiveTab("details")}
                        >
                          Subscription Details
                        </button>
                        <button
                          className={`${styles.subscription__detail_tab} ${
                            activeTab === "billing"
                              ? styles["subscription__detail_tab--active"]
                              : ""
                          }`}
                          onClick={() => setActiveTab("billing")}
                        >
                          Billing Information
                        </button>
                        <button
                          className={`${styles.subscription__detail_tab} ${
                            activeTab === "service"
                              ? styles["subscription__detail_tab--active"]
                              : ""
                          }`}
                          onClick={() => setActiveTab("service")}
                        >
                          Service Details
                        </button>
                      </div>
                    </div>

                    {activeTab === "details" && (
                      <div className={styles.subscription__panel}>
                        <div className={styles.subscription__panel_section}>
                          <h3>
                            <Icon name="info" />
                            Subscription Information
                          </h3>
                          <div className={styles.subscription__detail_list}>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="tag" />
                                Plan Type
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {subscription.plan}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="refresh-cw" />
                                Auto-Renew
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {subscription.autoRenew ? "Yes" : "No"}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="calendar" />
                                Start Date
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {formatDate(subscription.startDate)}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="calendar" />
                                End Date
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {formatDate(subscription.endDate) || "Ongoing"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.subscription__panel_section}>
                          <h3>
                            <Icon name="activity" />
                            Subscription Status
                          </h3>
                          <div className={styles.subscription__detail_list}>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="check-circle" />
                                Status
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {subscription.status}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="clock" />
                                Created On
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {formatDate(subscription.startDate)}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="repeat" />
                                Frequency
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {subscription.frequency
                                  .toLowerCase()
                                  .replace("_", " ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "billing" && (
                      <div className={styles.subscription__panel}>
                        <div className={styles.subscription__panel_section}>
                          <h3>
                            <Icon name="credit-card" />
                            Payment Details
                          </h3>
                          <div className={styles.subscription__detail_list}>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="dollar-sign" />
                                Price
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                ${subscription.price} per{" "}
                                {subscription.frequency
                                  .toLowerCase()
                                  .replace("_", " ")}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="credit-card" />
                                Payment Method
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                Visa ending in 4242
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="calendar" />
                                Next Billing Date
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {formatDate(subscription.nextBillingDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.subscription__panel_section}>
                          <h3>
                            <Icon name="file-text" />
                            Billing History
                          </h3>
                          <div className={styles.subscription__detail_list}>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="clock" />
                                Last Billed
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {formatDate(subscription.lastBillingDate)}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="file" />
                                Invoices
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                <a
                                  href="#"
                                  className={
                                    styles.subscription__action_button_link
                                  }
                                >
                                  View Invoices
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "service" && (
                      <div className={styles.subscription__panel}>
                        <div className={styles.subscription__panel_section}>
                          <h3>
                            <Icon name="package" />
                            Service Information
                          </h3>
                          <div className={styles.subscription__detail_list}>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="tag" />
                                Service Type
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                {subscription.service.type || "Standard"}
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="users" />
                                Provider
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                Metro Mellow
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="map-pin" />
                                Service Location
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                Default Address
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.subscription__panel_section}>
                          <h3>
                            <Icon name="settings" />
                            Service Preferences
                          </h3>
                          <div className={styles.subscription__detail_list}>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="clock" />
                                Preferred Time
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                Morning (9:00 AM - 12:00 PM)
                              </span>
                            </div>
                            <div className={styles.subscription__detail_item}>
                              <span
                                className={styles.subscription__detail_label}
                              >
                                <Icon name="star" />
                                Service Rating
                              </span>
                              <span
                                className={styles.subscription__detail_value}
                              >
                                4.8/5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={styles.subscription__action_bar}>
                      {subscription.status.toLowerCase() === "active" ? (
                        <button
                          className={`${styles.subscription__action_button} ${styles["subscription__action_button--danger"]}`}
                          onClick={() =>
                            handleStatusChange(
                              subscription.id,
                              SubscriptionStatus.Suspended
                            )
                          }
                        >
                          <Icon name="pause" />
                          Pause Subscription
                        </button>
                      ) : subscription.status.toLowerCase() === "suspended" ? (
                        <button
                          className={`${styles.subscription__action_button} ${styles["subscription__action_button--success"]}`}
                          onClick={() =>
                            handleStatusChange(
                              subscription.id,
                              SubscriptionStatus.Active
                            )
                          }
                        >
                          <Icon name="play" />
                          Resume Subscription
                        </button>
                      ) : null}

                      {subscription.status.toLowerCase() !== "cancelled" && (
                        <button
                          className={`${styles.subscription__action_button} ${styles["subscription__action_button--danger"]}`}
                          onClick={() => handleCancel(subscription.id)}
                        >
                          <Icon name="x" />
                          Cancel Subscription
                        </button>
                      )}

                      <button
                        className={`${styles.subscription__action_button} ${styles["subscription__action_button--outline"]}`}
                      >
                        <Icon name="edit-2" />
                        Edit Subscription
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.subscription__empty}>
          <div className={styles.subscription__empty_icon}>
            <Icon name={filter !== "all" ? "filter" : "calendar"} />
          </div>
          <h3 className={styles.subscription__empty_title}>
            No {filter !== "all" ? filter : ""} subscriptions found
          </h3>
          <p className={styles.subscription__empty_text}>
            {filter !== "all"
              ? `You don't have any ${filter} subscriptions at the moment.`
              : "You haven't subscribed to any services yet. Get started by creating your first subscription."}
          </p>
          {filter !== "all" ? (
            <button
              className={styles.subscription__add_button}
              onClick={() => setFilter("all")}
            >
              <Icon name="list" />
              View All Subscriptions
            </button>
          ) : (
            <button className={styles.subscription__add_button}>
              <Icon name="plus" />
              Create Subscription
            </button>
          )}
        </div>
      )}
    </div>
  );
}
