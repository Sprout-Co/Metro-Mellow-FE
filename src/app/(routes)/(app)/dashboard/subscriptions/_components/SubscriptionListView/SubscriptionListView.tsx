// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionListView/SubscriptionListView.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  Calendar,
  MoreVertical,
  Edit,
  X,
  RefreshCw,
  Star,
  MessageSquare,
  CheckCircle,
  Repeat,
  DollarSign,
  Phone,
  Eye,
  Copy,
  FileText,
  ChevronRight,
  Play,
  Pause,
  CreditCard,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import styles from "./SubscriptionListView.module.scss";
import {
  ServiceCategory,
  SubscriptionStatus,
  GetCustomerSubscriptionsQuery,
} from "@/graphql/api";

// Type for GraphQL subscription data
type Subscription = GetCustomerSubscriptionsQuery["customerSubscriptions"][0];
import SubscriptionDetailModal from "../SubscriptionDetailModal/SubscriptionDetailModal";
import { calculateSubscriptionProgress } from "../../utils/subscriptionProgress";

interface SubscriptionListViewProps {
  subscriptions: Subscription[];
}

type TabType = "active" | "paused" | "expired";

const SubscriptionListView: React.FC<SubscriptionListViewProps> = ({
  subscriptions,
}) => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("active");

  // Sort subscriptions by next billing date
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) =>
      new Date(a.nextBillingDate).getTime() -
      new Date(b.nextBillingDate).getTime()
  );

  // Group subscriptions by status
  const groupedSubscriptions = {
    active: sortedSubscriptions.filter(
      (s) =>
        s.status === SubscriptionStatus.Active ||
        s.status === SubscriptionStatus.Pending
    ),
    paused: sortedSubscriptions.filter(
      (s) => s.status === SubscriptionStatus.Paused
    ),
    expired: sortedSubscriptions.filter(
      (s) =>
        s.status === SubscriptionStatus.Expired ||
        s.status === SubscriptionStatus.Cancelled
    ),
  };

  // Tab configuration
  const tabs = [
    {
      id: "active" as TabType,
      label: "Active",
      count: groupedSubscriptions.active.length,
      icon: CheckCircle,
    },
    {
      id: "paused" as TabType,
      label: "Paused",
      count: groupedSubscriptions.paused.length,
      icon: Pause,
    },
    {
      id: "expired" as TabType,
      label: "Expired",
      count: groupedSubscriptions.expired.length,
      icon: X,
    },
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
      [ServiceCategory.Cleaning]: "#075056", //"#075056",
      [ServiceCategory.Laundry]: "#075056", //"#6366f1",
      [ServiceCategory.Cooking]: "#075056", //"#fe5b04",
      [ServiceCategory.Errands]: "#075056", //"#10b981",
      [ServiceCategory.PestControl]: "#075056",
    };
    return colors[service_category] || "#6b7280";
  };

  // Get status style
  const getStatusStyle = (status: SubscriptionStatus) => {
    const styles = {
      [SubscriptionStatus.Active]: "active",
      [SubscriptionStatus.Paused]: "paused",
      [SubscriptionStatus.Cancelled]: "cancelled",
      [SubscriptionStatus.Expired]: "expired",
      [SubscriptionStatus.Pending]: "pending",
      [SubscriptionStatus.Suspended]: "paused", // Treat suspended as paused for styling
    };
    return styles[status] || "default";
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
        weekday: "short",
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
    }).format(price);
  };

  // Calculate subscription progress using utility function
  const calculateProgress = (subscription: Subscription) => {
    return calculateSubscriptionProgress(subscription);
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

  const SubscriptionCard: React.FC<{ subscription: Subscription }> = ({
    subscription,
  }) => {
    const isMenuOpen = activeMenuId === subscription.id;
    const isHovered = hoveredId === subscription.id;
    const progress = calculateProgress(subscription);

    // Get primary service for display
    const primaryService = subscription.subscriptionServices[0];
    const serviceIcons = subscription.subscriptionServices.slice(0, 3); // Show max 3 service icons

    return (
      <motion.div
        layout
        className={styles.subscriptionCard}
        onClick={() => handleCardClick(subscription)}
        onMouseEnter={() => setHoveredId(subscription.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Service Type Indicator */}
        {/* <div
          className={styles.subscriptionCard__indicator}
          style={{
            backgroundColor: primaryService
              ? getServiceColor(primaryService.service_category)
              : "#6b7280",
          }}
        /> */}

        {/* Main Content Grid */}
        <div className={styles.subscriptionCard__grid}>
          {/* Left Section - Service Info */}
          <div className={styles.subscriptionCard__left}>
            <div className={styles.subscriptionCard__serviceHeader}>
              {/* Multiple Service Icons */}
              <div className={styles.subscriptionCard__serviceIcons}>
                {serviceIcons.map((service, index) => (
                  <div
                    key={service.id}
                    className={styles.subscriptionCard__serviceIcon}
                    style={{
                      backgroundColor: `${getServiceColor(service.service_category)}15`,
                      zIndex: serviceIcons.length - index,
                      marginLeft: index > 0 ? "-8px" : "0",
                    }}
                  >
                    <span>{getServiceIcon(service.service_category)}</span>
                  </div>
                ))}
                {subscription.subscriptionServices.length > 3 && (
                  <div className={styles.subscriptionCard__moreServices}>
                    +{subscription.subscriptionServices.length - 3}
                  </div>
                )}
              </div>

              <div className={styles.subscriptionCard__serviceDetails}>
                <h3 className={styles.subscriptionCard__serviceName}>
                  {subscription.subscriptionServices.length > 1
                    ? `${subscription.subscriptionServices.length} Services Package`
                    : subscription.subscriptionServices[0]?.service.name ||
                      "Subscription"}
                  <span className={styles.subscriptionCard__frequencyBadge}>
                    <Repeat size={12} />
                    {subscription.billingCycle}
                  </span>
                </h3>
                <p className={styles.subscriptionCard__service_category}>
                  {subscription.subscriptionServices.length === 1
                    ? subscription.subscriptionServices[0].service.name
                    : `${subscription.subscriptionServices.length} services included`}
                </p>
              </div>
            </div>

            <div className={styles.subscriptionCard__info}>
              <div className={styles.subscriptionCard__infoItem}>
                <Calendar size={14} />
                <span>
                  Next billing: {formatDate(subscription.nextBillingDate)}
                </span>
              </div>
              <div className={styles.subscriptionCard__infoItem}>
                <MapPin size={14} />
                <span>
                  {subscription.address?.street || "Address"},{" "}
                  {subscription.address?.city || "City"}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={styles.subscriptionCard__progress}>
              <div className={styles.subscriptionCard__progressHeader}>
                <span className={styles.subscriptionCard__progressText}>
                  {subscription.subscriptionServices.length} services in
                  subscription
                </span>
                <span className={styles.subscriptionCard__progressPercent}>
                  {progress}%
                </span>
              </div>
              <div className={styles.subscriptionCard__progressBar}>
                <div
                  className={styles.subscriptionCard__progressFill}
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "#075056",
                    // backgroundColor: primaryService
                    //   ? getServiceColor(primaryService.service_category)
                    //   : "#6b7280",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Section - Status, Price & Actions */}
          <div className={styles.subscriptionCard__right}>
            <div className={styles.subscriptionCard__meta}>
              <span
                className={`${styles.subscriptionCard__status} ${
                  styles[
                    `subscriptionCard__status--${getStatusStyle(subscription.status)}`
                  ]
                }`}
              >
                {subscription.status}
              </span>
              <div className={styles.subscriptionCard__pricing}>
                <span className={styles.subscriptionCard__price}>
                  {formatPrice(subscription.totalPrice)}
                </span>
                <span className={styles.subscriptionCard__billingCycle}>
                  per {subscription.billingCycle}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <div className={styles.subscriptionCard__menuContainer}>
            <motion.button
              className={styles.subscriptionCard__menuBtn}
              onClick={(e) => toggleMenu(subscription.id, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreVertical size={18} />
            </motion.button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className={styles.subscriptionCard__menu}
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.1 }}
                >
                  <button
                    className={styles.subscriptionCard__menuItem}
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
                      <button className={styles.subscriptionCard__menuItem}>
                        <Pause size={14} />
                        Pause Subscription
                      </button>
                      <button className={styles.subscriptionCard__menuItem}>
                        <Edit size={14} />
                        Modify Subscription
                      </button>
                    </>
                  )}
                  {subscription.status === SubscriptionStatus.Paused && (
                    <button className={styles.subscriptionCard__menuItem}>
                      <Play size={14} />
                      Resume Subscription
                    </button>
                  )}
                  {(subscription.status === SubscriptionStatus.Expired ||
                    subscription.status === SubscriptionStatus.Cancelled) && (
                    <button className={styles.subscriptionCard__menuItem}>
                      <RefreshCw size={14} />
                      Renew Subscription
                    </button>
                  )}
                  <button className={styles.subscriptionCard__menuItem}>
                    <FileText size={14} />
                    View Billing History
                  </button>
                  <button className={styles.subscriptionCard__menuItem}>
                    <CreditCard size={14} />
                    Update Payment Method
                  </button>
                  {subscription.status !== SubscriptionStatus.Cancelled &&
                    subscription.status !== SubscriptionStatus.Expired && (
                      <button
                        className={`${styles.subscriptionCard__menuItem} ${
                          styles["subscriptionCard__menuItem--danger"]
                        }`}
                      >
                        <X size={14} />
                        Cancel Subscription
                      </button>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hover Arrow */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.subscriptionCard__arrow}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <ChevronRight size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Get empty message for current tab
  const getEmptyMessage = (tabId: TabType) => {
    const messages = {
      active: "No active subscriptions",
      paused: "No paused subscriptions",
      expired: "No expired subscriptions",
    };
    return messages[tabId];
  };

  return (
    <>
      <div className={styles.subscriptionListView}>
        {/* Tabs */}
        <div className={styles.subscriptionListView__tabs}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                className={`${styles.subscriptionListView__tab} ${
                  isActive ? styles["subscriptionListView__tab--active"] : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
                <span className={styles.subscriptionListView__tabCount}>
                  {tab.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className={styles.subscriptionListView__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.subscriptionListView__tabPanel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {groupedSubscriptions[activeTab].length === 0 ? (
                <div className={styles.subscriptionListView__emptySection}>
                  <p>{getEmptyMessage(activeTab)}</p>
                </div>
              ) : (
                <div className={styles.subscriptionListView__subscriptions}>
                  {groupedSubscriptions[activeTab].map((subscription) => (
                    <SubscriptionCard
                      key={subscription.id}
                      subscription={subscription}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <SubscriptionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscription={selectedSubscription}
      />
    </>
  );
};

export default SubscriptionListView;
