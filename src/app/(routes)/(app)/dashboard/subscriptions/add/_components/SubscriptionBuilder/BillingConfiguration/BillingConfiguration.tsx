// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/BillingConfiguration/BillingConfiguration.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp, Award } from "lucide-react";
import styles from "./BillingConfiguration.module.scss";
import { BillingCycle, ServiceCategory } from "@/graphql/api";
import { DurationType } from "../SubscriptionBuilder";

interface ConfiguredService {
  service: {
    category: ServiceCategory;
  };
}

interface BillingConfigurationProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
  duration: DurationType;
  setDuration: (duration: DurationType) => void;
  configuredServices?: ConfiguredService[];
}

const BillingConfiguration: React.FC<BillingConfigurationProps> = ({
  billingCycle,
  setBillingCycle,
  duration,
  setDuration,
  configuredServices = [],
}) => {
  const monthlyDurations: DurationType[] = [1, 2, 3, 6, 12];
  const quarterlyDurations: DurationType[] = [3, 6, 12];

  // Determine allowed billing cycles based on configured services
  const hasPestControl = configuredServices.some(
    (cs) => cs.service.category === ServiceCategory.PestControl
  );
  
  const hasNonPestControlServices = configuredServices.some(
    (cs) => cs.service.category !== ServiceCategory.PestControl
  );

  // Monthly: Always allowed (all service types support it)
  // Quarterly: Only allowed if there are no non-pest-control services
  const allowMonthly = true; // All services support monthly
  const allowQuarterly = !hasNonPestControlServices; // Only if no cleaning/laundry/cooking services

  const durations =
    billingCycle === BillingCycle.Monthly
      ? monthlyDurations
      : quarterlyDurations;

  const getSavingsPercentage = (dur: DurationType) => {
    if (dur >= 12) return 30;
    if (dur >= 6) return 20;
    if (dur >= 3) return 10;
    return 0;
  };

  // Auto-adjust billing cycle based on services
  React.useEffect(() => {
    if (configuredServices.length > 0) {
      // If non-pest control services are added and quarterly is selected, switch to monthly
      if (hasNonPestControlServices && billingCycle === BillingCycle.Quarterly) {
        setBillingCycle(BillingCycle.Monthly);
      }
    }
  }, [configuredServices, hasNonPestControlServices, billingCycle, setBillingCycle]);

  return (
    <div className={styles.config}>
      {/* Billing Cycle Selection */}
      <div className={styles.config__billingCycle}>
        <h3 className={styles.config__label}>Billing Frequency</h3>
        {configuredServices.length === 0 && (
          <p className={styles.config__hint}>
            Select services to see available billing options
          </p>
        )}
        
        
        {configuredServices.length > 0 && (
          <div>
            {billingCycle === BillingCycle.Quarterly && hasNonPestControlServices && (
              <div className={styles.config__warning}>
                <p>⚠️ Quarterly billing is only available for pest control services. Other services have been restricted.</p>
              </div>
            )}
            <div className={styles.config__cycleOptions}>
            {allowMonthly && (
              <motion.button
                className={`${styles.config__cycleOption} ${
                  billingCycle === BillingCycle.Monthly
                    ? styles["config__cycleOption--active"]
                    : ""
                }`}
                onClick={() => setBillingCycle(BillingCycle.Monthly)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar size={20} />
                <div>
                  <strong>Monthly</strong>
                  <span>Billed every month</span>
                  <small>Available for all service types</small>
                </div>
                {billingCycle === BillingCycle.Monthly && (
                  <motion.div
                    className={styles.config__checkmark}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.button>
            )}

            {allowQuarterly && (
              <motion.button
                className={`${styles.config__cycleOption} ${
                  billingCycle === BillingCycle.Quarterly
                    ? styles["config__cycleOption--active"]
                    : ""
                }`}
                onClick={() => setBillingCycle(BillingCycle.Quarterly)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TrendingUp size={20} />
                <div>
                  <strong>Quarterly</strong>
                  <span>Billed every 3 months</span>
                  <small>Only for pest control services</small>
                </div>
                {billingCycle === BillingCycle.Quarterly && (
                  <motion.div
                    className={styles.config__checkmark}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.button>
            )}
            
            {!allowMonthly && !allowQuarterly && (
              <div className={styles.config__noBillingOptions}>
                <p>No billing options available for selected services</p>
              </div>
            )}
            </div>
          </div>
        )}
      </div>

      {/* Duration Selection */}
      <div className={styles.config__duration}>
        <h3 className={styles.config__label}>Commitment Period</h3>
        <div className={styles.config__durationGrid}>
          {durations.map((dur) => {
            const savings = getSavingsPercentage(dur);
            const isPopular = dur === 6;

            return (
              <motion.button
                key={dur}
                className={`${styles.config__durationCard} ${
                  duration === dur ? styles["config__durationCard--active"] : ""
                } ${isPopular ? styles["config__durationCard--popular"] : ""}`}
                onClick={() => setDuration(dur)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* {isPopular && (
                  <div className={styles.config__popularBadge}>
                    <Award size={14} />
                    Most Popular
                  </div>
                )} */}
                <div className={styles.config__durationValue}>{dur}</div>
                <div className={styles.config__durationLabel}>
                  {dur === 1 ? "Month" : "Months"}
                </div>
                {/* {savings > 0 && (
                  <div className={styles.config__durationSaving}>
                    Save {savings}%
                  </div>
                )} */}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      {/* <div className={styles.config__benefits}>
        <div className={styles.config__benefit}>
          <Clock size={16} />
          <span>Cancel anytime after commitment period</span>
        </div>
        <div className={styles.config__benefit}>
          <TrendingUp size={16} />
          <span>Lock in current prices for entire duration</span>
        </div>
      </div> */}
    </div>
  );
};

export default BillingConfiguration;
