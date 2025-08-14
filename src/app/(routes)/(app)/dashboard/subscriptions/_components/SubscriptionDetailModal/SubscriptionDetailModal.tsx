// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionDetailModal/SubscriptionDetailModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Clock,
  Repeat,
  TrendingUp,
  MessageSquare,
  Edit,
  Pause,
  Play,
  RefreshCw,
  CheckCircle,
  Package,
  Star,
  Info,
} from "lucide-react";
import styles from "./SubscriptionDetailModal.module.scss";
import {
  Subscription,
  ServiceCategory,
  UpcomingBooking,
} from "../../types/subscription";

type TabType = "overview" | "services" | "bookings" | "billing";

interface SubscriptionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
}

const SubscriptionDetailModal: React.FC<SubscriptionDetailModalProps> = ({
  isOpen,
  onClose,
  subscription,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  if (!subscription) return null;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Info },
    { id: "services" as const, label: "Services", icon: Package },
    { id: "bookings" as const, label: "Bookings", icon: Calendar },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
  ];

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
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

  // Calculate subscription progress
  const calculateProgress = () => {
    return Math.round(
      (subscription.completedServices / subscription.totalServices) * 100
    );
  };

  // Get booking status color
  const getBookingStatusColor = (status: UpcomingBooking["status"]) => {
    const colors = {
      scheduled: "#d97706",
      confirmed: "#059669",
      in_progress: "#2293fb",
    };
    return colors[status] || "#6b7280";
  };

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
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.modal__header}>
              <div className={styles.modal__headerLeft}>
                <div className={styles.modal__serviceIcon}>
                  {subscription.services[0]
                    ? getServiceIcon(subscription.services[0].serviceType)
                    : "🏠"}
                </div>
                <div className={styles.modal__headerContent}>
                  <h2 className={styles.modal__title}>{subscription.name}</h2>
                  <p className={styles.modal__subtitle}>
                    {subscription.services.length} service
                    {subscription.services.length > 1 ? "s" : ""} •{" "}
                    {subscription.billingCycle}
                  </p>
                </div>
              </div>
              <button className={styles.modal__closeBtn} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modal__body}>
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
                      <div className={styles.modal__sections}>
                        <div className={styles.modal__section}>
                          <h3 className={styles.modal__sectionTitle}>
                            Overview
                          </h3>
                          <div className={styles.modal__overviewGrid}>
                            <div className={styles.modal__overviewCard}>
                              <div className={styles.modal__overviewCardHeader}>
                                <Package size={16} />
                                <span>Services</span>
                              </div>
                              <div className={styles.modal__overviewCardValue}>
                                {subscription.services.length}
                              </div>
                            </div>
                            <div className={styles.modal__overviewCard}>
                              <div className={styles.modal__overviewCardHeader}>
                                <CheckCircle size={16} />
                                <span>Progress</span>
                              </div>
                              <div className={styles.modal__overviewCardValue}>
                                {calculateProgress()}%
                              </div>
                            </div>
                            <div className={styles.modal__overviewCard}>
                              <div className={styles.modal__overviewCardHeader}>
                                <CreditCard size={16} />
                                <span>Total Price</span>
                              </div>
                              <div className={styles.modal__overviewCardValue}>
                                {formatPrice(subscription.totalPrice)}
                              </div>
                            </div>
                            <div className={styles.modal__overviewCard}>
                              <div className={styles.modal__overviewCardHeader}>
                                <Calendar size={16} />
                                <span>Next Billing</span>
                              </div>
                              <div className={styles.modal__overviewCardValue}>
                                {
                                  formatDate(
                                    subscription.nextBillingDate
                                  ).split(", ")[0]
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className={styles.modal__section}>
                          <h3 className={styles.modal__sectionTitle}>
                            Quick Info
                          </h3>
                          <div className={styles.modal__info}>
                            <div className={styles.modal__infoItem}>
                              <MapPin size={14} />
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
                              <RefreshCw size={14} />
                              <div>
                                <span className={styles.modal__infoLabel}>
                                  Auto-renewal
                                </span>
                                <span className={styles.modal__infoValue}>
                                  {subscription.autoRenewal
                                    ? "Enabled"
                                    : "Disabled"}
                                </span>
                              </div>
                            </div>
                            <div className={styles.modal__infoItem}>
                              <Repeat size={14} />
                              <div>
                                <span className={styles.modal__infoLabel}>
                                  Billing Cycle
                                </span>
                                <span className={styles.modal__infoValue}>
                                  {subscription.billingCycle}
                                </span>
                              </div>
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className={styles.modal__sections}>
                        <div className={styles.modal__section}>
                          <h3 className={styles.modal__sectionTitle}>
                            Included Services
                          </h3>
                          <div className={styles.modal__servicesList}>
                            {subscription.services.map((service) => (
                              <div
                                key={service.id}
                                className={styles.modal__serviceItem}
                              >
                                <div
                                  className={styles.modal__serviceItemIcon}
                                  style={{
                                    backgroundColor: `${getServiceColor(service.serviceType)}15`,
                                    color: getServiceColor(service.serviceType),
                                  }}
                                >
                                  {getServiceIcon(service.serviceType)}
                                </div>
                                <div
                                  className={styles.modal__serviceItemContent}
                                >
                                  <div
                                    className={styles.modal__serviceItemHeader}
                                  >
                                    <h4
                                      className={styles.modal__serviceItemName}
                                    >
                                      {service.serviceName}
                                    </h4>
                                    <span
                                      className={styles.modal__serviceItemPrice}
                                    >
                                      {formatPrice(service.price)}
                                    </span>
                                  </div>
                                  <div
                                    className={styles.modal__serviceItemDetails}
                                  >
                                    <div
                                      className={
                                        styles.modal__serviceItemDetail
                                      }
                                    >
                                      <Repeat size={12} />
                                      <span>{service.frequency}</span>
                                    </div>
                                    <div
                                      className={
                                        styles.modal__serviceItemDetail
                                      }
                                    >
                                      <Calendar size={12} />
                                      <span>
                                        {service.scheduledDays.join(", ")}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className={
                                      styles.modal__serviceItemProgress
                                    }
                                  >
                                    <div
                                      className={
                                        styles.modal__serviceItemProgressText
                                      }
                                    >
                                      <span>
                                        {service.completedServices}/
                                        {service.totalServices} completed
                                      </span>
                                      <span>
                                        {Math.round(
                                          (service.completedServices /
                                            service.totalServices) *
                                            100
                                        )}
                                        %
                                      </span>
                                    </div>
                                    <div
                                      className={
                                        styles.modal__serviceItemProgressBar
                                      }
                                    >
                                      <div
                                        className={
                                          styles.modal__serviceItemProgressFill
                                        }
                                        style={{
                                          width: `${(service.completedServices / service.totalServices) * 100}%`,
                                          backgroundColor: getServiceColor(
                                            service.serviceType
                                          ),
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
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
                      <div className={styles.modal__sections}>
                        {subscription.upcomingBookings.length > 0 ? (
                          <div className={styles.modal__section}>
                            <h3 className={styles.modal__sectionTitle}>
                              Upcoming Bookings
                            </h3>
                            <div className={styles.modal__bookingsList}>
                              {subscription.upcomingBookings.map((booking) => (
                                <div
                                  key={booking.id}
                                  className={styles.modal__bookingItem}
                                >
                                  <div
                                    className={styles.modal__bookingIcon}
                                    style={{
                                      backgroundColor: `${getServiceColor(booking.serviceType)}15`,
                                    }}
                                  >
                                    {getServiceIcon(booking.serviceType)}
                                  </div>
                                  <div className={styles.modal__bookingContent}>
                                    <div
                                      className={styles.modal__bookingHeader}
                                    >
                                      <h4 className={styles.modal__bookingName}>
                                        {booking.serviceName}
                                      </h4>
                                      <span
                                        className={styles.modal__bookingStatus}
                                        style={{
                                          color: getBookingStatusColor(
                                            booking.status
                                          ),
                                        }}
                                      >
                                        {booking.status}
                                      </span>
                                    </div>
                                    <div
                                      className={styles.modal__bookingDetails}
                                    >
                                      <div
                                        className={styles.modal__bookingDetail}
                                      >
                                        <Calendar size={12} />
                                        <span>{formatDate(booking.date)}</span>
                                      </div>
                                      <div
                                        className={styles.modal__bookingDetail}
                                      >
                                        <Clock size={12} />
                                        <span>{booking.time}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className={styles.modal__section}>
                            <div className={styles.modal__emptyState}>
                              <Calendar size={48} />
                              <h4>No upcoming bookings</h4>
                              <p>
                                Your next bookings will appear here when
                                scheduled.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
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
                      <div className={styles.modal__sections}>
                        {/* Billing Summary Card - Greeting Card Style */}
                        <div className={styles.modal__section}>
                          <div className={styles.modal__billingCard}>
                            <div className={styles.modal__billingCardHeader}>
                              <div>
                                <h3 className={styles.modal__billingCardTitle}>
                                  Subscription Billing Summary
                                </h3>
                                <p
                                  className={styles.modal__billingCardSubtitle}
                                >
                                  {subscription.billingCycle} billing •
                                  Auto-renewal{" "}
                                  {subscription.autoRenewal
                                    ? "enabled"
                                    : "disabled"}
                                </p>
                              </div>
                            </div>

                            <div className={styles.modal__billingCardContent}>
                              <div className={styles.modal__billingAmount}>
                                <span
                                  className={styles.modal__billingAmountLabel}
                                >
                                  Total Amount
                                </span>
                                <span
                                  className={styles.modal__billingAmountValue}
                                >
                                  {formatPrice(subscription.totalPrice)}
                                  <small>/{subscription.billingCycle}</small>
                                </span>
                              </div>

                              {subscription.discount && (
                                <div className={styles.modal__billingDiscount}>
                                  <TrendingUp size={14} />
                                  <span>
                                    You're saving {subscription.discount}% with
                                    this subscription!
                                  </span>
                                </div>
                              )}

                              <div className={styles.modal__billingDetails}>
                                <div className={styles.modal__billingDetail}>
                                  <CreditCard size={14} />
                                  <div>
                                    <span
                                      className={
                                        styles.modal__billingDetailLabel
                                      }
                                    >
                                      Payment Method
                                    </span>
                                    <span
                                      className={
                                        styles.modal__billingDetailValue
                                      }
                                    >
                                      {subscription.paymentMethod}
                                    </span>
                                  </div>
                                </div>

                                <div className={styles.modal__billingDetail}>
                                  <Calendar size={14} />
                                  <div>
                                    <span
                                      className={
                                        styles.modal__billingDetailLabel
                                      }
                                    >
                                      Next Billing Date
                                    </span>
                                    <span
                                      className={
                                        styles.modal__billingDetailValue
                                      }
                                    >
                                      {formatDate(subscription.nextBillingDate)}
                                    </span>
                                  </div>
                                </div>

                                <div className={styles.modal__billingDetail}>
                                  <Clock size={14} />
                                  <div>
                                    <span
                                      className={
                                        styles.modal__billingDetailLabel
                                      }
                                    >
                                      Last Payment
                                    </span>
                                    <span
                                      className={
                                        styles.modal__billingDetailValue
                                      }
                                    >
                                      {subscription.lastPaymentDate
                                        ? formatDate(
                                            subscription.lastPaymentDate
                                          )
                                        : "No previous payment"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Service Breakdown */}
                        <div className={styles.modal__section}>
                          <h3 className={styles.modal__sectionTitle}>
                            Service Breakdown
                          </h3>
                          <div className={styles.modal__serviceBreakdown}>
                            {subscription.services.map((service) => (
                              <div
                                key={service.id}
                                className={styles.modal__serviceBreakdownItem}
                              >
                                <div
                                  className={styles.modal__serviceBreakdownIcon}
                                >
                                  {getServiceIcon(service.serviceType)}
                                </div>
                                <div
                                  className={styles.modal__serviceBreakdownInfo}
                                >
                                  <span
                                    className={
                                      styles.modal__serviceBreakdownName
                                    }
                                  >
                                    {service.serviceName}
                                  </span>
                                  <span
                                    className={
                                      styles.modal__serviceBreakdownFreq
                                    }
                                  >
                                    {service.frequency}
                                  </span>
                                </div>
                                <span
                                  className={
                                    styles.modal__serviceBreakdownPrice
                                  }
                                >
                                  {formatPrice(service.price)}
                                </span>
                              </div>
                            ))}

                            <div
                              className={styles.modal__serviceBreakdownTotal}
                            >
                              <span>Total</span>
                              <span>
                                {formatPrice(subscription.totalPrice)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Billing History Preview */}
                        <div className={styles.modal__section}>
                          <h3 className={styles.modal__sectionTitle}>
                            Recent Billing
                          </h3>
                          <div className={styles.modal__billingHistory}>
                            <div className={styles.modal__billingHistoryItem}>
                              <div className={styles.modal__billingHistoryIcon}>
                                <CheckCircle size={16} />
                              </div>
                              <div className={styles.modal__billingHistoryInfo}>
                                <span
                                  className={styles.modal__billingHistoryDate}
                                >
                                  {subscription.lastPaymentDate
                                    ? formatDate(subscription.lastPaymentDate)
                                    : "No payment yet"}
                                </span>
                                <span
                                  className={styles.modal__billingHistoryAmount}
                                >
                                  {formatPrice(subscription.totalPrice)}
                                </span>
                              </div>
                              <span
                                className={styles.modal__billingHistoryStatus}
                              >
                                Paid
                              </span>
                            </div>

                            <div className={styles.modal__billingHistoryItem}>
                              <div className={styles.modal__billingHistoryIcon}>
                                <Calendar size={16} />
                              </div>
                              <div className={styles.modal__billingHistoryInfo}>
                                <span
                                  className={styles.modal__billingHistoryDate}
                                >
                                  {formatDate(subscription.nextBillingDate)}
                                </span>
                                <span
                                  className={styles.modal__billingHistoryAmount}
                                >
                                  {formatPrice(subscription.totalPrice)}
                                </span>
                              </div>
                              <span
                                className={styles.modal__billingHistoryStatus}
                              >
                                Upcoming
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className={styles.modal__footer}>
              {subscription.status === "Active" && (
                <>
                  <motion.button
                    className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit size={14} />
                    Modify
                  </motion.button>
                  <motion.button
                    className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Pause size={14} />
                    Pause
                  </motion.button>
                </>
              )}
              {subscription.status === "Paused" && (
                <motion.button
                  className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={14} />
                  Resume
                </motion.button>
              )}
              {(subscription.status === "Expired" ||
                subscription.status === "Cancelled") && (
                <motion.button
                  className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--primary"]}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw size={14} />
                  Renew
                </motion.button>
              )}
              <motion.button
                className={`${styles.modal__footerBtn} ${styles["modal__footerBtn--secondary"]}`}
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionDetailModal;
