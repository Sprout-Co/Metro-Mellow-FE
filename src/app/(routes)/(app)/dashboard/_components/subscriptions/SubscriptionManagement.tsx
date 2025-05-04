"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import styles from "./SubscriptionManagement.module.scss";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import {
  SubscriptionStatus,
  SubscriptionFrequency,
  Subscription,
} from "@/graphql/api";

type SubscriptionFilterType = "all" | "active" | "cancelled" | "suspended";
type SubscriptionSortType = "name" | "date" | "price";
type ConfirmationDialogType =
  | "pause"
  | "cancel"
  | "resume"
  | "reactivate"
  | null;

export default function SubscriptionManagement() {
  const [filter, setFilter] = useState<SubscriptionFilterType>("all");
  const [sort, setSort] = useState<SubscriptionSortType>("date");
  const [expandedSubscription, setExpandedSubscription] = useState<
    string | null
  >(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Confirmation dialog state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] =
    useState<ConfirmationDialogType>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);
  const [processingAction, setProcessingAction] = useState(false);

  const {
    handleGetCustomerSubscriptions,
    handleUpdateSubscriptionStatus,
    handlePauseSubscription,
    handleCancelSubscription,
    handleResumeSubscription,
    handleReactivateSubscription,
  } = useSubscriptionOperations();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await handleGetCustomerSubscriptions();
      setSubscriptions(data as Subscription[]);
    } catch (err) {
      setError("Failed to load subscriptions");
      console.error("Error loading subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case "cleaning":
        return "home";
      case "premium cleaning":
        return "star";
      case "laundry":
        return "box";
      case "cooking":
        return "coffee";
      case "pest control":
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

  // Open confirmation dialog
  const openConfirmation = (
    type: ConfirmationDialogType,
    subscriptionId: string
  ) => {
    setConfirmationType(type);
    setSelectedSubscriptionId(subscriptionId);
    setShowConfirmation(true);
  };

  // Close confirmation dialog
  const closeConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationType(null);
    setSelectedSubscriptionId(null);
  };

  // Handle confirmed action
  const handleConfirmedAction = async () => {
    if (!selectedSubscriptionId || !confirmationType) return;

    setProcessingAction(true);

    try {
      switch (confirmationType) {
        case "pause":
          await handlePauseSubscription(selectedSubscriptionId);
          break;
        case "cancel":
          await handleCancelSubscription(selectedSubscriptionId);
          break;
        case "resume":
          await handleResumeSubscription(selectedSubscriptionId);
          break;
        case "reactivate":
          await handleReactivateSubscription(selectedSubscriptionId);
          break;
      }

      await loadSubscriptions(); // Reload subscriptions after action
      closeConfirmation();
    } catch (err) {
      console.error(`Error performing ${confirmationType} action:`, err);
    } finally {
      setProcessingAction(false);
    }
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
        filtered.sort((a, b) => {
          const aName = a.subscriptionServices[0]?.service.name || "";
          const bName = b.subscriptionServices[0]?.service.name || "";
          return aName.localeCompare(bName);
        });
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
        filtered.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
    }

    return filtered;
  };

  // Get confirmation dialog content based on type
  const getConfirmationContent = () => {
    if (!confirmationType || !selectedSubscriptionId) return null;

    const subscription = subscriptions.find(
      (sub) => sub.id === selectedSubscriptionId
    );
    if (!subscription) return null;

    const serviceName =
      subscription.subscriptionServices[0]?.service.name || "service";

    switch (confirmationType) {
      case "pause":
        return {
          title: "Pause Subscription",
          message: (
            <>
              <p>
                Are you sure you want to pause your {serviceName} subscription?
              </p>
              <div className={styles.subscriptions__confirmationDetails}>
                <h4>What happens when you pause:</h4>
                <ul>
                  <li>Your subscription will be temporarily suspended</li>
                  <li>
                    Bookings scheduled within the next 48 hours will still
                    proceed
                  </li>
                  <li>All other future bookings will be put on hold</li>
                  <li>You won't be billed during the pause period</li>
                  <li>You can resume your subscription at any time</li>
                </ul>
              </div>
            </>
          ),
          confirmText: "Pause Subscription",
        };
      case "cancel":
        return {
          title: "Cancel Subscription",
          message: (
            <>
              <p>
                Are you sure you want to cancel your {serviceName} subscription?
              </p>
              <div className={styles.subscriptions__confirmationDetails}>
                <h4>What happens when you cancel:</h4>
                <ul>
                  <li>Your subscription will be permanently cancelled</li>
                  <li>
                    Bookings scheduled within the next 48 hours will still
                    proceed
                  </li>
                  <li>All other future bookings will be cancelled</li>
                  <li>
                    You'll receive a final pro-rated bill for any services used
                    in the current billing cycle
                  </li>
                  <li>
                    To use this service again, you'll need to create a new
                    subscription
                  </li>
                </ul>
              </div>
            </>
          ),
          confirmText: "Cancel Subscription",
        };
      case "resume":
        return {
          title: "Resume Subscription",
          message: (
            <>
              <p>Would you like to resume your {serviceName} subscription?</p>
              <div className={styles.subscriptions__confirmationDetails}>
                <h4>What happens when you resume:</h4>
                <ul>
                  <li>Your subscription will be reactivated immediately</li>
                  <li>
                    New bookings will be scheduled according to your service
                    frequency
                  </li>
                  <li>
                    Billing will resume on your next scheduled billing date
                  </li>
                  <li>
                    Previously cancelled bookings will need to be rescheduled
                    manually
                  </li>
                </ul>
              </div>
            </>
          ),
          confirmText: "Resume Subscription",
        };
      case "reactivate":
        return {
          title: "Reactivate Subscription",
          message: (
            <>
              <p>
                Would you like to reactivate your {serviceName} subscription?
              </p>
              <div className={styles.subscriptions__confirmationDetails}>
                <h4>What happens when you reactivate:</h4>
                <ul>
                  <li>Your subscription will be reactivated immediately</li>
                  <li>
                    New bookings will be scheduled according to your service
                    frequency
                  </li>
                  <li>
                    Billing will resume on your next scheduled billing date
                  </li>
                  <li>
                    Previously cancelled bookings will need to be rescheduled
                    manually
                  </li>
                </ul>
              </div>
            </>
          ),
          confirmText: "Reactivate Subscription",
        };
      default:
        return null;
    }
  };

  const confirmationContent = getConfirmationContent();
  const filteredSubscriptions = filterSubscriptions();

  if (loading) {
    return (
      <div className={styles.subscriptions__loading}>
        <div className={styles.subscriptions__loader}></div>
        <p className={styles.subscriptions__loadingText}>
          Loading your subscriptions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.subscriptions__error}>
        <div className={styles.subscriptions__errorIcon}>
          <Icon name="alert-circle" />
        </div>
        <h3 className={styles.subscriptions__errorTitle}>
          Something went wrong
        </h3>
        <p className={styles.subscriptions__errorMessage}>{error}</p>
        <button
          className={styles.subscriptions__retryButton}
          onClick={loadSubscriptions}
        >
          <Icon name="refresh-cw" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.subscriptions}>
      {/* Confirmation Dialog */}
      {showConfirmation && confirmationContent && (
        <div className={styles.subscriptions__overlay}>
          <motion.div
            className={styles.subscriptions__confirmationDialog}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 className={styles.subscriptions__confirmationTitle}>
              {confirmationContent.title}
            </h3>
            <div className={styles.subscriptions__confirmationMessage}>
              {confirmationContent.message}
            </div>
            <div className={styles.subscriptions__confirmationActions}>
              <button
                className={styles.subscriptions__confirmationCancel}
                onClick={closeConfirmation}
                disabled={processingAction}
              >
                Cancel
              </button>
              <button
                className={styles.subscriptions__confirmationConfirm}
                onClick={handleConfirmedAction}
                disabled={processingAction}
              >
                {processingAction ? (
                  <>
                    <div className={styles.subscriptions__buttonLoader}></div>
                    Processing...
                  </>
                ) : (
                  confirmationContent.confirmText
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <header className={styles.subscriptions__header}>
        <div>
          <h1 className={styles.subscriptions__title}>My Subscriptions</h1>
          <p className={styles.subscriptions__subtitle}>
            Manage your recurring services and billing
          </p>
        </div>

        <button className={styles.subscriptions__addBtn}>
          <Icon name="plus" />
          Add Subscription
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
                <div className={styles.subscriptions__serviceWrap}>
                  {subscription.subscriptionServices.map((service, idx) => (
                    <div
                      key={service.id}
                      className={`${styles.subscriptions__iconWrapper} ${styles[`subscriptions__iconWrapper--${service.serviceType.toLowerCase()}`]}`}
                      style={{
                        zIndex: subscription.subscriptionServices.length - idx,
                        marginLeft: idx > 0 ? "-8px" : "0",
                      }}
                    >
                      <Icon name={getSubscriptionIcon(service.service.name)} />
                    </div>
                  ))}

                  <div className={styles.subscriptions__details}>
                    <h3 className={styles.subscriptions__name}>
                      {subscription.subscriptionServices.length > 1
                        ? `${subscription.subscriptionServices[0].service.name} + ${subscription.subscriptionServices.length - 1} more`
                        : subscription.subscriptionServices[0]?.service.name}
                    </h3>
                    <p className={styles.subscriptions__schedule}>
                      {subscription.billingCycle
                        .toLowerCase()
                        .replace("_", " ")}{" "}
                      •
                      {subscription.subscriptionServices
                        .map(
                          (service) =>
                            ` ${service.frequency.toLowerCase().replace("_", " ")}`
                        )
                        .join(", ")}
                    </p>
                  </div>
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
                  <span className={styles.subscriptions__price}>
                    ₦{subscription.totalPrice.toLocaleString()}
                    <span className={styles.subscriptions__term}>
                      /
                      {subscription.billingCycle
                        .toLowerCase()
                        .replace("_", " ")}
                    </span>
                  </span>
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
                          <Icon name="calendar" />
                          Subscription Details
                        </h4>
                        <div className={styles.subscriptions__infoList}>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Status:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {subscription.status}
                            </span>
                          </div>
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
                              Duration:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {subscription.duration} months
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
                        </div>
                      </div>

                      <div className={styles.subscriptions__infoSection}>
                        <h4 className={styles.subscriptions__infoTitle}>
                          <Icon name="credit-card" />
                          Billing Information
                        </h4>
                        <div className={styles.subscriptions__infoList}>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Total Price:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              ₦{subscription.totalPrice.toLocaleString()} per{" "}
                              {subscription.billingCycle
                                .toLowerCase()
                                .replace("_", " ")}
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Next Billing:
                            </span>
                            <span className={styles.subscriptions__infoValue}>
                              {formatDate(subscription.nextBillingDate)}
                            </span>
                          </div>
                          <div className={styles.subscriptions__infoItem}>
                            <span className={styles.subscriptions__infoLabel}>
                              Last Billed:
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
                    </div>

                    <div className={styles.subscriptions__servicesSection}>
                      <h4 className={styles.subscriptions__infoTitle}>
                        <Icon name="package" />
                        Included Services
                      </h4>
                      <div className={styles.subscriptions__servicesList}>
                        {subscription.subscriptionServices.map((service) => (
                          <div
                            key={service.id}
                            className={styles.subscriptions__serviceItem}
                          >
                            <div
                              className={`${styles.subscriptions__serviceIcon} ${styles[`subscriptions__serviceIcon--${service.serviceType.toLowerCase()}`]}`}
                            >
                              <Icon
                                name={getSubscriptionIcon(service.service.name)}
                              />
                            </div>
                            <div className={styles.subscriptions__serviceInfo}>
                              <h5 className={styles.subscriptions__serviceName}>
                                {service.service.name}
                              </h5>
                              <p
                                className={
                                  styles.subscriptions__serviceSchedule
                                }
                              >
                                {service.frequency
                                  .toLowerCase()
                                  .replace("_", " ")}{" "}
                                •
                                {service.scheduledDays
                                  .map(
                                    (day) =>
                                      ` ${day.charAt(0) + day.slice(1).toLowerCase()}`
                                  )
                                  .join(", ")}
                              </p>
                            </div>
                            <div className={styles.subscriptions__servicePrice}>
                              ₦{service.price.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {subscription.status === "ACTIVE" && (
                      <div className={styles.subscriptions__bookingsInfo}>
                        <h4 className={styles.subscriptions__infoTitle}>
                          <Icon name="calendar" />
                          Upcoming Bookings
                        </h4>
                        <p className={styles.subscriptions__bookingsNote}>
                          You have upcoming bookings scheduled based on your
                          subscription. Changes to your subscription status may
                          affect these bookings.
                        </p>
                      </div>
                    )}

                    <div className={styles.subscriptions__actions}>
                      {subscription.status === "ACTIVE" ? (
                        <>
                          <button
                            className={styles.subscriptions__actionBtn}
                            onClick={() =>
                              openConfirmation("pause", subscription.id)
                            }
                          >
                            <Icon name="pause" />
                            Pause Subscription
                          </button>
                          <button
                            className={`${styles.subscriptions__actionBtn} ${styles["subscriptions__actionBtn--danger"]}`}
                            onClick={() =>
                              openConfirmation("cancel", subscription.id)
                            }
                          >
                            <Icon name="x" />
                            Cancel Subscription
                          </button>
                        </>
                      ) : subscription.status === "SUSPENDED" ? (
                        <>
                          <button
                            className={`${styles.subscriptions__actionBtn} ${styles["subscriptions__actionBtn--success"]}`}
                            onClick={() =>
                              openConfirmation("resume", subscription.id)
                            }
                          >
                            <Icon name="play" />
                            Resume Subscription
                          </button>
                          <button
                            className={`${styles.subscriptions__actionBtn} ${styles["subscriptions__actionBtn--danger"]}`}
                            onClick={() =>
                              openConfirmation("cancel", subscription.id)
                            }
                          >
                            <Icon name="x" />
                            Cancel Subscription
                          </button>
                        </>
                      ) : subscription.status === "CANCELLED" ? (
                        <button
                          className={`${styles.subscriptions__actionBtn} ${styles["subscriptions__actionBtn--success"]}`}
                          onClick={() =>
                            openConfirmation("reactivate", subscription.id)
                          }
                        >
                          <Icon name="refresh-cw" />
                          Reactivate Subscription
                        </button>
                      ) : null}
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
