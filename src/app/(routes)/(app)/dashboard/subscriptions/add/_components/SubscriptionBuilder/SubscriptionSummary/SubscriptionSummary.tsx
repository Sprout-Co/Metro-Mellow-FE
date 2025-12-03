"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Calendar,
  Clock,
  Edit2,
  X,
  Package,
  Tag,
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

  return (
    <div className={styles.summary}>
      {/* Header */}
      <div className={styles.summary__header}>
        <div className={styles.summary__headerIcon}>
          <ShoppingBag size={20} />
        </div>
        <div className={styles.summary__headerText}>
          <h3>Order Summary</h3>
          {configuredServices.length > 0 && (
            <span className={styles.summary__count}>
              {configuredServices.length} service
              {configuredServices.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {configuredServices.length === 0 ? (
        <div className={styles.summary__empty}>
          <div className={styles.summary__emptyIcon}>
            <Package size={32} strokeWidth={1.5} />
          </div>
          <p>Add services to see your summary</p>
        </div>
      ) : (
        <>
          {/* Services List */}
          <div className={styles.summary__services}>
            <AnimatePresence>
              {configuredServices.map((cs, index) => (
                <motion.div
                  key={cs.service._id}
                  className={styles.summary__serviceItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.summary__serviceInfo}>
                    <span className={styles.summary__serviceName}>
                      {cs.service.name}
                    </span>
                    <span className={styles.summary__serviceMeta}>
                      {getFrequencyLabel(cs.configuration.frequency)} •{" "}
                      {cs.configuration.scheduledDays?.length || 0} days
                    </span>
                  </div>
                  <div className={styles.summary__serviceRight}>
                    <span className={styles.summary__servicePrice}>
                      ₦{(cs.configuration.price || 0).toLocaleString()}
                    </span>
                    <div className={styles.summary__serviceActions}>
                      <button
                        className={styles.summary__editBtn}
                        onClick={() => onServiceEdit(cs.service._id)}
                        aria-label="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className={styles.summary__removeBtn}
                        onClick={() => onServiceRemove(cs.service._id)}
                        aria-label="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pricing */}
          <div className={styles.summary__pricing}>
            <div className={styles.summary__row}>
              <span>Subtotal ({duration} mo)</span>
              <span>₦{(monthlyTotal * duration).toLocaleString()}</span>
            </div>

            {discount.amount > 0 && (
              <div className={styles.summary__discountRow}>
                <span className={styles.summary__discountLabel}>
                  <Tag size={14} />
                  Discount ({discount.savingsPercentage}%)
                </span>
                <span className={styles.summary__discountValue}>
                  -₦{discount.amount.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className={styles.summary__total}>
            <div className={styles.summary__totalRow}>
              <div className={styles.summary__totalLabel}>
                <span>Total</span>
                <span className={styles.summary__perMonth}>
                  ₦{Math.round(total / duration).toLocaleString()}/mo
                </span>
              </div>
              <span className={styles.summary__totalAmount}>
                ₦{total.toLocaleString()}
              </span>
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
    </div>
  );
};

export default SubscriptionSummary;
