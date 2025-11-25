// SubscriptionSummary.tsx - Complete Redesign
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Calendar,
  Clock,
  Edit2,
  X,
  ArrowRight,
  Package,
  Home,
  Droplets,
  Utensils,
  Bug,
  Gift,
  CreditCard,
} from "lucide-react";
import styles from "./SubscriptionSummary.module.scss";
import { BillingCycle } from "@/graphql/api";
import { DurationType } from "../SubscriptionBuilder";
import FnButton from "@/components/ui/Button/FnButton";

interface ConfiguredService {
  service: any;
  configuration: any;
}

interface SubscriptionSummaryProps {
  configuredServices: ConfiguredService[];
  billingCycle: BillingCycle;
  duration: DurationType;
  total: number;
  discount: { amount: number; savingsPercentage: number };
  onServiceEdit: (serviceId: string) => void;
  onServiceRemove: (serviceId: string) => void;
  onCheckout: () => void;
}

const SubscriptionSummary: React.FC<SubscriptionSummaryProps> = ({
  configuredServices,
  billingCycle,
  duration,
  total,
  discount,
  onServiceEdit,
  onServiceRemove,
  onCheckout,
}) => {
  const monthlyTotal = configuredServices.reduce(
    (sum, cs) => sum + (cs.configuration.price || 0),
    0
  );

  const getServiceEmoji = (category: string) => {
    switch (category) {
      case "CLEANING":
        return "🏠";
      case "LAUNDRY":
        return "👔";
      case "COOKING":
        return "🍳";
      case "PEST_CONTROL":
        return "🐛";
      default:
        return "📦";
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "WEEKLY":
        return "Weekly";
      case "BI_WEEKLY":
        return "Bi-Weekly";
      case "MONTHLY":
        return "Monthly";
      default:
        return frequency;
    }
  };

  const formatStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <motion.div
      className={styles.summary}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Modern Header */}
      <div className={styles.summary__header}>
        <div className={styles.summary__headerContent}>
          <div className={styles.summary__headerIcon}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.summary__headerText}>
            <h3>Order Summary</h3>
            <span className={styles.summary__headerBadge}>
              {configuredServices.length} service
              {configuredServices.length !== 1 ? "s" : ""} selected
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {configuredServices.length === 0 ? (
        <div className={styles.summary__empty}>
          <div className={styles.summary__emptyIcon}>
            <Package size={40} strokeWidth={1} />
          </div>
          <h4 className={styles.summary__emptyTitle}>Your cart is empty</h4>
          <p className={styles.summary__emptyText}>
            Add services to see your subscription summary
          </p>
        </div>
      ) : (
        <>
          {/* Services List */}
          <div className={styles.summary__servicesList}>
            <AnimatePresence>
              {configuredServices.map((cs, index) => (
                <motion.div
                  key={cs.service._id}
                  className={styles.summary__serviceItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.summary__serviceContent}>
                    <div className={styles.summary__serviceIcon}>
                      {getServiceEmoji(cs.service.category)}
                    </div>
                    <div className={styles.summary__serviceDetails}>
                      <div className={styles.summary__serviceName}>
                        {cs.service.name}
                      </div>
                      <div className={styles.summary__serviceMeta}>
                        <span className={styles.summary__metaItem}>
                          📅 {getFrequencyLabel(cs.configuration.frequency)}
                        </span>
                        <span className={styles.summary__metaItem}>
                          📍 {cs.configuration.scheduledDays?.length || 0}{" "}
                          days/week
                        </span>
                      </div>
                    </div>
                    <div className={styles.summary__serviceRight}>
                      <div className={styles.summary__servicePrice}>
                        ₦{(cs.configuration.price || 0).toLocaleString()}
                      </div>
                      <div className={styles.summary__serviceActions}>
                        <button
                          className={`${styles.summary__actionBtn} ${styles["summary__actionBtn--edit"]}`}
                          onClick={() => onServiceEdit(cs.service._id)}
                          aria-label="Edit service"
                        >
                          ✏️
                        </button>
                        <button
                          className={`${styles.summary__actionBtn} ${styles["summary__actionBtn--remove"]}`}
                          onClick={() => onServiceRemove(cs.service._id)}
                          aria-label="Remove service"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Price Breakdown */}
          <div className={styles.summary__priceSection}>
            <div className={styles.summary__priceRow}>
              <span className={styles.summary__priceLabel}>Services Total</span>
              <span className={styles.summary__priceValue}>
                ₦{(monthlyTotal * duration).toLocaleString()}
              </span>
            </div>

            {discount.amount > 0 && (
              <motion.div
                className={styles.summary__discountRow}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className={styles.summary__discountLabel}>
                  🎁
                  <span>Subscription Discount</span>
                  <span className={styles.summary__discountBadge}>
                    {discount.savingsPercentage}% OFF
                  </span>
                </span>
                <span className={styles.summary__discountValue}>
                  -₦{discount.amount.toLocaleString()}
                </span>
              </motion.div>
            )}
          </div>

          {/* Total Section */}
          <div className={styles.summary__totalSection}>
            <div className={styles.summary__totalRow}>
              <div className={styles.summary__totalLabelGroup}>
                <span className={styles.summary__totalMainLabel}>
                  Total Amount
                </span>
                <span className={styles.summary__totalSubLabel}>
                  ₦{Math.round(total / duration).toLocaleString()}/month
                </span>
              </div>
              <motion.span
                className={styles.summary__totalAmount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ₦{total.toLocaleString()}
              </motion.span>
            </div>

            <FnButton
              variant="primary"
              size="lg"
              onClick={onCheckout}
              fullWidth
            >
              Proceed to Checkout
            </FnButton>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SubscriptionSummary;
