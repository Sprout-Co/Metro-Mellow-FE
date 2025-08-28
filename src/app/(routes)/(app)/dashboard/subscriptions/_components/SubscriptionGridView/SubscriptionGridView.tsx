// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionGridView/SubscriptionGridView.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Pause,
  Play,
  X,
  RefreshCw,
  Clock,
  DollarSign,
  Repeat,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import styles from "./SubscriptionGridView.module.scss";
import {
  ServiceCategory,
  SubscriptionStatus,
  GetCustomerSubscriptionsQuery,
} from "@/graphql/api";

// Type for GraphQL subscription data
type Subscription = GetCustomerSubscriptionsQuery["customerSubscriptions"][0];
import SubscriptionDetailModal from "../SubscriptionDetailModal/SubscriptionDetailModal";

interface SubscriptionGridViewProps {
  subscriptions: Subscription[];
}

const SubscriptionGridView: React.FC<SubscriptionGridViewProps> = ({
  subscriptions,
}) => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

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

  // Get status config
  const getStatusConfig = (status: SubscriptionStatus) => {
    const configs = {
      [SubscriptionStatus.Active]: {
        icon: CheckCircle,
        color: "#059669",
        bgColor: "rgba(5, 150, 105, 0.1)",
      },
      [SubscriptionStatus.Paused]: {
        icon: Pause,
        color: "#d97706",
        bgColor: "rgba(217, 119, 6, 0.1)",
      },
      [SubscriptionStatus.Cancelled]: {
        icon: X,
        color: "#fb2222",
        bgColor: "rgba(251, 34, 34, 0.1)",
      },
      [SubscriptionStatus.Expired]: {
        icon: AlertCircle,
        color: "#fb2222",
        bgColor: "rgba(251, 34, 34, 0.1)",
      },
      [SubscriptionStatus.Pending]: {
        icon: Clock,
        color: "#f2994a",
        bgColor: "rgba(242, 153, 74, 0.1)",
      },
      [SubscriptionStatus.Suspended]: {
        icon: Pause,
        color: "#d97706",
        bgColor: "rgba(217, 119, 6, 0.1)",
      },
    };
    return (
      configs[status] || {
        icon: AlertCircle,
        color: "#6b7280",
        bgColor: "rgba(107, 114, 128, 0.1)",
      }
    );
  };

  // Format date - handle GraphQL date strings
  const formatDate = (dateValue: string | Date) => {
    const date = new Date(dateValue);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      notation: "compact",
    }).format(price);
  };

  // Calculate progress
  const calculateProgress = (subscription: Subscription) => {
    // Calculate progress based on subscription duration and time elapsed
    const startDate = new Date(subscription.startDate);
    const endDate = subscription.endDate
      ? new Date(subscription.endDate)
      : null;
    const now = new Date();

    // If subscription has ended, show 100% progress
    if (endDate && now > endDate) {
      return 100;
    }

    // If subscription hasn't started yet, show 0% progress
    if (now < startDate) {
      return 0;
    }

    // Calculate progress based on time elapsed vs total duration
    const totalDuration = endDate
      ? endDate.getTime() - startDate.getTime()
      : subscription.duration * 30 * 24 * 60 * 60 * 1000; // Convert months to milliseconds (approximate)

    const elapsedTime = now.getTime() - startDate.getTime();
    const progress = Math.min(
      100,
      Math.max(0, (elapsedTime / totalDuration) * 100)
    );

    return Math.round(progress);
  };

  // Handle card click
  const handleCardClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  // Toggle menu
  const toggleMenu = (subscriptionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenuId(activeMenuId === subscriptionId ? null : subscriptionId);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className={styles.gridView}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {subscriptions.map((subscription) => {
          const primaryService = subscription.subscriptionServices[0];
          const statusConfig = getStatusConfig(subscription.status);
          const StatusIcon = statusConfig.icon;
          const progress = calculateProgress(subscription);

          return (
            <motion.div
              key={subscription.id}
              className={styles.gridView__card}
              variants={item}
              onClick={() => handleCardClick(subscription)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card Header */}
              <div className={styles.gridView__cardHeader}>
                <div className={styles.gridView__serviceIcons}>
                  {subscription.subscriptionServices
                    .slice(0, 3)
                    .map((service, index) => (
                      <div
                        key={service.id}
                        className={styles.gridView__serviceIcon}
                        style={{
                          backgroundColor: `${getServiceColor(service.service_category)}15`,
                          marginLeft: index > 0 ? "-12px" : "0",
                          zIndex: 3 - index,
                        }}
                      >
                        <span>{getServiceIcon(service.service_category)}</span>
                      </div>
                    ))}
                  {subscription.subscriptionServices.length > 3 && (
                    <div className={styles.gridView__moreServices}>
                      +{subscription.subscriptionServices.length - 3}
                    </div>
                  )}
                </div>

                <motion.button
                  className={styles.gridView__menuBtn}
                  onClick={(e) => toggleMenu(subscription.id, e)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical size={18} />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeMenuId === subscription.id && (
                    <motion.div
                      className={styles.gridView__menu}
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.1 }}
                    >
                      <button
                        className={styles.gridView__menuItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(subscription);
                        }}
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                      {subscription.status === SubscriptionStatus.Active && (
                        <>
                          <button className={styles.gridView__menuItem}>
                            <Edit size={14} />
                            Edit
                          </button>
                          <button className={styles.gridView__menuItem}>
                            <Pause size={14} />
                            Pause
                          </button>
                        </>
                      )}
                      {subscription.status === SubscriptionStatus.Paused && (
                        <button className={styles.gridView__menuItem}>
                          <Play size={14} />
                          Resume
                        </button>
                      )}
                      {(subscription.status === SubscriptionStatus.Expired ||
                        subscription.status ===
                          SubscriptionStatus.Cancelled) && (
                        <button className={styles.gridView__menuItem}>
                          <RefreshCw size={14} />
                          Renew
                        </button>
                      )}
                      <button
                        className={`${styles.gridView__menuItem} ${styles["gridView__menuItem--danger"]}`}
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Body */}
              <div className={styles.gridView__cardBody}>
                <h3 className={styles.gridView__name}>
                  {subscription.subscriptionServices.length > 1
                    ? `${subscription.subscriptionServices.length} Services Package`
                    : subscription.subscriptionServices[0]?.service.name ||
                      "Subscription"}
                </h3>

                <div
                  className={styles.gridView__status}
                  style={{
                    backgroundColor: statusConfig.bgColor,
                    color: statusConfig.color,
                  }}
                >
                  <StatusIcon size={14} />
                  <span>{subscription.status}</span>
                </div>

                <div className={styles.gridView__services}>
                  {subscription.subscriptionServices.length} service
                  {subscription.subscriptionServices.length > 1 ? "s" : ""}
                  <span className={styles.gridView__separator}>•</span>
                  {subscription.billingCycle}
                </div>

                {/* Progress */}
                <div className={styles.gridView__progress}>
                  <div className={styles.gridView__progressHeader}>
                    <span className={styles.gridView__progressLabel}>
                      Progress
                    </span>
                    <span className={styles.gridView__progressValue}>
                      {progress}%
                    </span>
                  </div>
                  <div className={styles.gridView__progressBar}>
                    <motion.div
                      className={styles.gridView__progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      style={{
                        backgroundColor: primaryService
                          ? getServiceColor(primaryService.service_category)
                          : "#6b7280",
                      }}
                    />
                  </div>
                  <div className={styles.gridView__progressStats}>
                    <span>
                      {subscription.subscriptionServices.length} services
                    </span>
                    <span>in subscription</span>
                  </div>
                </div>

                {/* Info Items */}
                <div className={styles.gridView__info}>
                  <div className={styles.gridView__infoItem}>
                    <Calendar size={14} />
                    <span>
                      Next billing: {formatDate(subscription.nextBillingDate)}
                    </span>
                  </div>
                  <div className={styles.gridView__infoItem}>
                    <MapPin size={14} />
                    <span>
                      {subscription.address?.street || "Address"},{" "}
                      {subscription.address?.city || "City"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className={styles.gridView__cardFooter}>
                <div className={styles.gridView__price}>
                  <span className={styles.gridView__priceAmount}>
                    {formatPrice(subscription.totalPrice)}
                  </span>
                  <span className={styles.gridView__pricePeriod}>
                    /{subscription.billingCycle}
                  </span>
                </div>

                <motion.div
                  className={styles.gridView__viewMore}
                  whileHover={{ x: 3 }}
                >
                  <ChevronRight size={18} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <SubscriptionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscription={selectedSubscription}
      />
    </>
  );
};

export default SubscriptionGridView;
