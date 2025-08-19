// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/SubscriptionSummary/SubscriptionSummary.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Calendar,
  CreditCard,
  Edit2,
  Trash2,
  ArrowRight,
  TrendingUp,
  Shield,
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

  const savings = monthlyTotal > 0 ? Math.round(monthlyTotal * 0.3) : 0;
  const finalTotal = total - savings * duration;

  return (
    <div className={styles.summary}>
      <div className={styles.summary__header}>
        <ShoppingCart size={20} />
        <h3>Subscription Summary</h3>
      </div>

      {configuredServices.length === 0 ? (
        <div className={styles.summary__empty}>
          <div className={styles.summary__emptyIcon}>📦</div>
          <p>No services configured yet</p>
          <span>Start by selecting and configuring services</span>
        </div>
      ) : (
        <>
          {/* Services List */}
          <div className={styles.summary__services}>
            {configuredServices.map((cs) => (
              <motion.div
                key={cs.service._id}
                className={styles.summary__serviceItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={styles.summary__serviceInfo}>
                  <h4>{cs.service.name}</h4>
                  <p>
                    {cs.configuration.scheduledDays?.length || 0} days/week •{" "}
                    {cs.configuration.preferredTimeSlot}
                  </p>
                </div>
                <div className={styles.summary__servicePrice}>
                  ₦{(cs.configuration.price || 0).toLocaleString()}/mo
                </div>
                <div className={styles.summary__serviceActions}>
                  <button onClick={() => onServiceEdit(cs.service._id)}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => onServiceRemove(cs.service._id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Billing Details */}
          <div className={styles.summary__billing}>
            <div className={styles.summary__billingRow}>
              <Calendar size={16} />
              <span>Billing Cycle</span>
              <strong>{billingCycle}</strong>
            </div>
            <div className={styles.summary__billingRow}>
              <CreditCard size={16} />
              <span>Duration</span>
              <strong>{duration} months</strong>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className={styles.summary__pricing}>
            <div className={styles.summary__priceRow}>
              <span>Subtotal</span>
              <span>₦{(monthlyTotal * duration).toLocaleString()}</span>
            </div>
            {savings > 0 && (
              <div className={styles.summary__priceRow}>
                <span className={styles.summary__savings}>
                  <TrendingUp size={14} />
                  Subscription Savings (30%)
                </span>
                <span className={styles.summary__savingsAmount}>
                  -₦{(savings * duration).toLocaleString()}
                </span>
              </div>
            )}
            <div className={styles.summary__total}>
              <span>Total</span>
              <strong>₦{finalTotal.toLocaleString()}</strong>
            </div>
            <div className={styles.summary__perMonth}>
              ₦{Math.round(finalTotal / duration).toLocaleString()}/month
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className={styles.summary__ctaButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Subscription
            <ArrowRight size={16} />
          </motion.button>

          {/* Benefits */}
          <div className={styles.summary__benefits}>
            <div className={styles.summary__benefit}>
              <Shield size={14} />
              <span>Cancel anytime</span>
            </div>
            <div className={styles.summary__benefit}>
              <TrendingUp size={14} />
              <span>Price lock guarantee</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionSummary;
