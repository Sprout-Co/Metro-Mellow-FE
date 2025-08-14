// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionDetailModal/SubscriptionDetailModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  Repeat,
  TrendingUp,
  Edit,
  Pause,
  Play,
  RefreshCw,
  Package,
  User,
  DollarSign,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import styles from "./SubscriptionDetailModal.module.scss";
import {
  Subscription,
  ServiceCategory,
  SubscriptionStatus,
} from "../../types/subscription";

interface SubscriptionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
}

type TabType = "overview" | "services" | "billing" | "history";

const SubscriptionDetailModal: React.FC<SubscriptionDetailModalProps> = ({
  isOpen,
  onClose,
  subscription,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null
  );

  if (!subscription) return null;

  // Get service icon
  const getServiceIcon = (serviceType: ServiceCategory) => {
    const icons = {
      [ServiceCategory.Cleaning]: "🧹",
      [ServiceCategory.Laundry]: "👕",
      [ServiceCategory.Cooking]: "🍳",
      [ServiceCategory.Errands]: "📦",
      [ServiceCategory.PestControl]: "🐛",
    };
    return icons[serviceType] || "🏠";
  };

  // Get service color
  const getServiceColor = (serviceType: ServiceCategory) => {
    const colors = {
      [ServiceCategory.Cleaning]: "#075056",
      [ServiceCategory.Laundry]: "#6366f1",
      [ServiceCategory.Cooking]: "#fe5b04",
      [ServiceCategory.Errands]: "#10b981",
      [ServiceCategory.PestControl]: "#ec4899",
    };
    return colors[serviceType] || "#6b7280";
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
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

  // Calculate progress
  const calculateProgress = () => {
    return Math.round(
      (subscription.completedServices / subscription.totalServices) * 100
    );
  };

  // Toggle service expansion
  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
  };

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: Package },
    { id: "services" as TabType, label: "Services", icon: CheckCircle },
    { id: "billing" as TabType, label: "Billing", icon: CreditCard },
    { id: "history" as TabType, label: "History", icon: FileText },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.modal__overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className={styles.modal__header}>
              <div className={styles.modal__headerContent}>
                <h2 className={styles.modal__title}>{subscription.name}</h2>
                <div className={styles.modal__subtitle}>
                  <StatusBadge status={subscription.status} />
                  <span className={styles.modal__id}>
                    ID: {subscription.id}
                  </span>
                </div>
              </div>
              <button className={styles.modal__closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className={styles.modal__tabs}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`${styles.modal__tab} ${
                      activeTab === tab.id ? styles["modal__tab--active"] : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className={styles.modal__body}>
              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.modal__tabContent}
                  >
                    {/* Quick Stats */}
                    <div className={styles.modal__statsGrid}>
                      <div className={styles.modal__statCard}>
                        <div className={styles.modal__statIcon}>
                          <Package size={20} />
                        </div>
                        <div className={styles.modal__statContent}>
                          <span className={styles.modal__statValue}>
                            {subscription.services.length}
                          </span>
                          <span className={styles.modal__statLabel}>
                            Active Services
                          </span>
                        </div>
                      </div>
                      <div className={styles.modal__statCard}>
                        <div className={styles.modal__statIcon}>
                          <Calendar size={20} />
                        </div>
                        <div className={styles.modal__statContent}>
                          <span className={styles.modal__statValue}>
                            {subscription.upcomingBookings.length}
                          </span>
                          <span className={styles.modal__statLabel}>
                            Upcoming
                          </span>
                        </div>
                      </div>
                      <div className={styles.modal__statCard}>
                        <div className={styles.modal__statIcon}>
                          <TrendingUp size={20} />
                        </div>
                        <div className={styles.modal__statContent}>
                          <span className={styles.modal__statValue}>
                            {calculateProgress()}%
                          </span>
                          <span className={styles.modal__statLabel}>
                            Complete
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Overview */}
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>
                        Subscription Progress
                      </h3>
                      <div className={styles.modal__progressCard}>
                        <div className={styles.modal__progressInfo}>
                          <span className={styles.modal__progressText}>
                            {subscription.completedServices} of{" "}
                            {subscription.totalServices} services completed
                          </span>
                          <span className={styles.modal__progressPercent}>
                            {calculateProgress()}%
                          </span>
                        </div>
                        <div className={styles.modal__progressBar}>
                          <motion.div
                            className={styles.modal__progressFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${calculateProgress()}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Key Information */}
                    <div className={styles.modal__section}>
                      <h3 className={styles.modal__sectionTitle}>
                        Key Information
                      </h3>
                      <div className={styles.modal__infoGrid}>
                        <div className={styles.modal__infoItem}>
                          <MapPin size={16} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Service Address
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.address}
                            </span>
                          </div>
                        </div>
                        <div className={styles.modal__infoItem}>
                          <Calendar size={16} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Next Service
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.nextServiceDate
                                ? formatDate(subscription.nextServiceDate)
                                : "Not scheduled"}
                            </span>
                          </div>
                        </div>
                        <div className={styles.modal__infoItem}>
                          <Repeat size={16} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Billing Cycle
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.billingCycle}
                            </span>
                          </div>
                        </div>
                        <div className={styles.modal__infoItem}>
                          <CreditCard size={16} />
                          <div>
                            <span className={styles.modal__infoLabel}>
                              Payment Method
                            </span>
                            <span className={styles.modal__infoValue}>
                              {subscription.paymentMethod}
                            </span>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.modal__tabContent}
                  >
                    <div className={styles.modal__servicesList}>
                      {subscription.services.map((service) => {
                        const isExpanded = expandedServiceId === service.id;
                        const progress = Math.round(
                          (service.completedServices / service.totalServices) *
                            100
                        );

                        return (
                          <div
                            key={service.id}
                            className={styles.modal__serviceCard}
                          >
                            <div
                              className={styles.modal__serviceHeader}
                              onClick={() => toggleServiceExpansion(service.id)}
                            >
                              <div className={styles.modal__serviceLeft}>
                                <div
                                  className={styles.modal__serviceIcon}
                                  style={{
                                    backgroundColor: `${getServiceColor(service.serviceType)}15`,
                                    color: getServiceColor(service.serviceType),
                                  }}
                                >
                                  {getServiceIcon(service.serviceType)}
                                </div>
                                <div className={styles.modal__serviceInfo}>
                                  <h4 className={styles.modal__serviceName}>
                                    {service.serviceName}
                                  </h4>
                                  <span className={styles.modal__serviceMeta}>
                                    {service.frequency} •{" "}
                                    {service.scheduledDays.join(", ")}
                                  </span>
                                </div>
                              </div>
                              <div className={styles.modal__serviceRight}>
                                <span className={styles.modal__servicePrice}>
                                  {formatPrice(service.price)}
                                </span>
                                <ChevronDown
                                  size={18}
                                  className={styles.modal__serviceExpand}
                                  style={{
                                    transform: isExpanded
                                      ? "rotate(180deg)"
                                      : "rotate(0)",
                                  }}
                                />
                              </div>
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  className={styles.modal__serviceDetails}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div
                                    className={styles.modal__serviceProgress}
                                  >
                                    <div
                                      className={styles.modal__progressHeader}
                                    >
                                      <span>Service Progress</span>
                                      <span>{progress}%</span>
                                    </div>
                                    <div className={styles.modal__progressBar}>
                                      <div
                                        className={styles.modal__progressFill}
                                        style={{
                                          width: `${progress}%`,
                                          backgroundColor: getServiceColor(
                                            service.serviceType
                                          ),
                                        }}
                                      />
                                    </div>
                                    <div
                                      className={styles.modal__progressStats}
                                    >
                                      <span>
                                        {service.completedServices} completed
                                      </span>
                                      <span>
                                        {service.totalServices -
                                          service.completedServices}{" "}
                                        remaining
                                      </span>
                                    </div>
                                  </div>
                                  {service.provider && (
                                    <div
                                      className={styles.modal__serviceProvider}
                                    >
                                      <User size={14} />
                                      <span>Provider: {service.provider}</span>
                                    </div>
                                  )}
                                  {service.notes && (
                                    <div className={styles.modal__serviceNotes}>
                                      <span
                                        className={styles.modal__notesLabel}
                                      >
                                        Notes:
                                      </span>
                                      <span>{service.notes}</span>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <motion.div
                    key="billing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.modal__tabContent}
                  >
                    <div className={styles.modal__billingCard}>
                      <div className={styles.modal__billingHeader}>
                        <h3 className={styles.modal__billingTitle}>
                          Current Plan
                        </h3>
                        <span className={styles.modal__billingAmount}>
                          {formatPrice(subscription.totalPrice)}
                          <span className={styles.modal__billingPeriod}>
                            /{subscription.billingCycle}
                          </span>
                        </span>
                      </div>

                      {subscription.discount && (
                        <div className={styles.modal__discount}>
                          <TrendingUp size={16} />
                          <span>{subscription.discount}% discount applied</span>
                        </div>
                      )}

                      <div className={styles.modal__billingDetails}>
                        <div className={styles.modal__billingItem}>
                          <span className={styles.modal__billingLabel}>
                            Next billing date
                          </span>
                          <span className={styles.modal__billingValue}>
                            {formatDate(subscription.nextBillingDate)}
                          </span>
                        </div>
                        <div className={styles.modal__billingItem}>
                          <span className={styles.modal__billingLabel}>
                            Payment method
                          </span>
                          <span className={styles.modal__billingValue}>
                            {subscription.paymentMethod}
                          </span>
                        </div>
                        <div className={styles.modal__billingItem}>
                          <span className={styles.modal__billingLabel}>
                            Auto-renewal
                          </span>
                          <span className={styles.modal__billingValue}>
                            {subscription.autoRenewal ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className={styles.modal__billingAction}>
                      <CreditCard size={16} />
                      Update Payment Method
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modal Footer */}
            <div className={styles.modal__footer}>
              {subscription.status === SubscriptionStatus.Active && (
                <>
                  <button className={styles.modal__footerBtn}>
                    <Edit size={16} />
                    Modify
                  </button>
                  <button
                    className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
                  >
                    <Pause size={16} />
                    Pause
                  </button>
                </>
              )}
              {subscription.status === SubscriptionStatus.Paused && (
                <button className={styles.modal__footerBtn}>
                  <Play size={16} />
                  Resume
                </button>
              )}
              <button
                className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--outline"]}`}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Status Badge Component
const StatusBadge: React.FC<{ status: SubscriptionStatus }> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case SubscriptionStatus.Active:
        return {
          icon: CheckCircle,
          color: "#059669",
          bg: "rgba(5, 150, 105, 0.1)",
        };
      case SubscriptionStatus.Paused:
        return { icon: Pause, color: "#d97706", bg: "rgba(217, 119, 6, 0.1)" };
      case SubscriptionStatus.Cancelled:
      case SubscriptionStatus.Expired:
        return { icon: X, color: "#fb2222", bg: "rgba(251, 34, 34, 0.1)" };
      case SubscriptionStatus.PendingActivation:
        return { icon: Clock, color: "#f2994a", bg: "rgba(242, 153, 74, 0.1)" };
      default:
        return {
          icon: AlertCircle,
          color: "#6b7280",
          bg: "rgba(107, 114, 128, 0.1)",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      className={styles.modal__status}
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon size={12} />
      <span>{status}</span>
    </div>
  );
};

export default SubscriptionDetailModal;
