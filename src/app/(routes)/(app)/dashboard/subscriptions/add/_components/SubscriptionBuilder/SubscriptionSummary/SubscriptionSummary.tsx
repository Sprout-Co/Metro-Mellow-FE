// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/SubscriptionSummary/SubscriptionSummary.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Calendar,
  CreditCard,
  Edit2,
  X,
  ArrowRight,
  Shield,
  Clock,
  TrendingDown,
  Package,
  Info,
} from "lucide-react";
import styles from "./SubscriptionSummary.module.scss";
import { BillingCycle } from "@/graphql/api";
import { DurationType } from "../SubscriptionBuilder";

interface ConfiguredService {
  service: any;
  configuration: any;
}

interface SubscriptionSummaryProps {
  configuredServices: ConfiguredService[];
  billingCycle: BillingCycle;
  duration: DurationType;
  total: number;
  onServiceEdit: (serviceId: string) => void;
  onServiceRemove: (serviceId: string) => void;
}

const SubscriptionSummary: React.FC<SubscriptionSummaryProps> = ({
  configuredServices,
  billingCycle,
  duration,
  total,
  onServiceEdit,
  onServiceRemove,
}) => {
  const monthlyTotal = configuredServices.reduce(
    (sum, cs) => sum + (cs.configuration.price || 0),
    0
  );

  const savingsPercentage =
    duration >= 12 ? 30 : duration >= 6 ? 20 : duration >= 3 ? 10 : 0;
  const savingsAmount = Math.round(
    monthlyTotal * (savingsPercentage / 100) * duration
  );
  const finalTotal = total - savingsAmount;

  const getServiceIcon = (category: string) => {
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

  return (
    <motion.div
      className={styles.summary}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className={styles.summary__header}>
        <div className={styles.summary__headerIcon}>
          <ShoppingCart size={20} />
        </div>
        <div className={styles.summary__headerText}>
          <h3>Order Summary</h3>
          <p>
            {configuredServices.length} service
            {configuredServices.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      </div>

      {/* Content */}
      {configuredServices.length === 0 ? (
        <div className={styles.summary__empty}>
          <div className={styles.summary__emptyIcon}>
            <Package size={48} strokeWidth={1} />
          </div>
          <h4>Your cart is empty</h4>
          <p>Add services to see your subscription summary</p>
        </div>
      ) : (
        <>
          {/* Services List */}
          <div className={styles.summary__services}>
            <AnimatePresence>
              {configuredServices.map((cs, index) => (
                <motion.div
                  key={cs.service._id}
                  className={styles.summary__service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.summary__serviceHeader}>
                    <div className={styles.summary__serviceIcon}>
                      {getServiceIcon(cs.service.category)}
                    </div>
                    <div className={styles.summary__serviceInfo}>
                      <h4>{cs.service.name}</h4>
                      <div className={styles.summary__serviceMeta}>
                        <span>
                          <Calendar size={12} />
                          {cs.configuration.frequency?.replace(/_/g, " ")}
                        </span>
                        <span>
                          <Clock size={12} />
                          {cs.configuration.scheduledDays?.length || 0}x/week
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.summary__serviceActions}>
                    <span className={styles.summary__servicePrice}>
                      ₦{(cs.configuration.price || 0).toLocaleString()}
                    </span>
                    <div className={styles.summary__serviceButtons}>
                      <button
                        className={styles.summary__editBtn}
                        onClick={() => onServiceEdit(cs.service._id)}
                        aria-label="Edit service"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className={styles.summary__removeBtn}
                        onClick={() => onServiceRemove(cs.service._id)}
                        aria-label="Remove service"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Billing Info */}
          <div className={styles.summary__billing}>
            <div className={styles.summary__billingItem}>
              <Calendar size={16} />
              <span>Billing</span>
              <strong>{billingCycle}</strong>
            </div>
            <div className={styles.summary__billingItem}>
              <CreditCard size={16} />
              <span>Duration</span>
              <strong>
                {duration} month{duration !== 1 ? "s" : ""}
              </strong>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className={styles.summary__breakdown}>
            <div className={styles.summary__breakdownRow}>
              <span>Services Total</span>
              <span>₦{(monthlyTotal * duration).toLocaleString()}</span>
            </div>

            {savingsAmount > 0 && (
              <motion.div
                className={`${styles.summary__breakdownRow} ${styles["summary__breakdownRow--savings"]}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>
                  <TrendingDown size={14} />
                  Discount ({savingsPercentage}%)
                </span>
                <span>-₦{savingsAmount.toLocaleString()}</span>
              </motion.div>
            )}

            <div className={styles.summary__total}>
              <div className={styles.summary__totalLabel}>
                <span>Total Amount</span>
                <span className={styles.summary__totalPeriod}>
                  ₦{Math.round(finalTotal / duration).toLocaleString()}/month
                </span>
              </div>
              <motion.div
                className={styles.summary__totalAmount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ₦{finalTotal.toLocaleString()}
              </motion.div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className={styles.summary__cta}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </motion.button>

          {/* Benefits */}
          <div className={styles.summary__benefits}>
            <div className={styles.summary__benefit}>
              <Shield size={14} />
              <span>Cancel anytime</span>
            </div>
            <div className={styles.summary__benefit}>
              <Info size={14} />
              <span>Price lock guarantee</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SubscriptionSummary;
