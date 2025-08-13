// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionDetailModal/SubscriptionDetailModal.tsx
"use client";

import React from "react";
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
} from "lucide-react";
import styles from "./SubscriptionDetailModal.module.scss";
import { Subscription, ServiceCategory } from "../../types/subscription";
import FnButton from "@/components/ui/Button/FnButton";

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
                  {getServiceIcon(subscription.serviceType)}
                </div>
                <div className={styles.modal__headerContent}>
                  <h2 className={styles.modal__title}>
                    {subscription.serviceName}
                  </h2>
                  <p className={styles.modal__subtitle}>
                    {subscription.serviceType} • {subscription.frequency}
                  </p>
                </div>
              </div>
              <button className={styles.modal__closeBtn} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modal__body}>
              {/* Status Bar */}
              <div className={styles.modal__statusBar}>
                <span
                  className={`${styles.modal__status} ${styles[`modal__status--${subscription.status.toLowerCase().replace(/\s+/g, "")}`]}`}
                >
                  {subscription.status}
                </span>
                <span className={styles.modal__subscriptionId}>
                  Sub ID: #{subscription.id.slice(0, 6).toUpperCase()}
                </span>
              </div>

              <div className={styles.modal__sections}>
                {/* Progress Section */}
                <div className={styles.modal__section}>
                  <h3 className={styles.modal__sectionTitle}>Progress</h3>
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
                      <div
                        className={styles.modal__progressFill}
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Next Service Details */}
                <div className={styles.modal__section}>
                  <h3 className={styles.modal__sectionTitle}>Next Service</h3>
                  <div className={styles.modal__info}>
                    <div className={styles.modal__infoItem}>
                      <Calendar size={14} />
                      <div>
                        <span className={styles.modal__infoLabel}>Date</span>
                        <span className={styles.modal__infoValue}>
                          {formatDate(subscription.nextServiceDate)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.modal__infoItem}>
                      <Clock size={14} />
                      <div>
                        <span className={styles.modal__infoLabel}>Time</span>
                        <span className={styles.modal__infoValue}>
                          {formatTime(subscription.nextServiceDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className={styles.modal__section}>
                  <h3 className={styles.modal__sectionTitle}>Location</h3>
                  <div className={styles.modal__info}>
                    <div className={styles.modal__infoItem}>
                      <MapPin size={14} />
                      <div>
                        <span className={styles.modal__infoLabel}>Address</span>
                        <span className={styles.modal__infoValue}>
                          {subscription.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Provider Section */}
                <div className={styles.modal__section}>
                  <h3 className={styles.modal__sectionTitle}>
                    Service Provider
                  </h3>
                  <div className={styles.modal__providerCard}>
                    <div className={styles.modal__providerAvatar}>
                      <User size={16} />
                    </div>
                    <div className={styles.modal__providerInfo}>
                      <span className={styles.modal__providerName}>
                        {subscription.provider || "Not assigned"}
                      </span>
                      <div className={styles.modal__providerContact}>
                        <Repeat size={12} />
                        <span>{subscription.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div className={styles.modal__section}>
                  <h3 className={styles.modal__sectionTitle}>Billing</h3>
                  <div className={styles.modal__priceCard}>
                    <div className={styles.modal__priceRow}>
                      <span className={styles.modal__priceLabel}>
                        Service Fee
                      </span>
                      <span className={styles.modal__priceValue}>
                        {formatPrice(subscription.price)}
                      </span>
                    </div>
                    <div className={styles.modal__priceRow}>
                      <span className={styles.modal__priceLabel}>
                        Billing Cycle
                      </span>
                      <span className={styles.modal__priceValue}>
                        {subscription.billingCycle}
                      </span>
                    </div>
                    {subscription.discount && (
                      <div className={styles.modal__priceNote}>
                        <TrendingUp size={12} />
                        <span>{subscription.discount}% discount applied</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className={styles.modal__section}>
                  <h3 className={styles.modal__sectionTitle}>Payment</h3>
                  <div className={styles.modal__info}>
                    <div className={styles.modal__infoItem}>
                      <CreditCard size={14} />
                      <div>
                        <span className={styles.modal__infoLabel}>
                          Payment Method
                        </span>
                        <span className={styles.modal__infoValue}>
                          {subscription.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className={styles.modal__infoItem}>
                      <Calendar size={14} />
                      <div>
                        <span className={styles.modal__infoLabel}>
                          Next Billing
                        </span>
                        <span className={styles.modal__infoValue}>
                          {formatDate(subscription.nextBillingDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {subscription.notes && (
                  <div className={styles.modal__section}>
                    <h3 className={styles.modal__sectionTitle}>
                      Special Instructions
                    </h3>
                    <div className={styles.modal__notes}>
                      <MessageSquare size={14} />
                      <p>{subscription.notes}</p>
                    </div>
                  </div>
                )}
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
