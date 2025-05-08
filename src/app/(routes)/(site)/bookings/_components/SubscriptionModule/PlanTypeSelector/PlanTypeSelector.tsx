// PlanTypeSelector.tsx
import React from "react";
import { motion } from "framer-motion";
import {  DurationType } from "../SubscriptionModule";
import styles from "./PlanTypeSelector.module.scss";
import { BillingCycle } from "@/graphql/api";

interface PlanTypeSelectorProps {
  billingCycle: BillingCycle;
  setBillingCycle: (type: BillingCycle) => void;
  duration: DurationType;
  setDuration: React.Dispatch<React.SetStateAction<DurationType>>;
}

const PlanTypeSelector: React.FC<PlanTypeSelectorProps> = ({
  billingCycle,
  setBillingCycle,
  duration,
  setDuration,
}) => {
  const maxDuration = billingCycle === BillingCycle.Weekly ? 3 : 12;
  const durationLabel = billingCycle === BillingCycle.Weekly ? "Weeks" : "Months";
  const WeeklyDurations: DurationType[] = [1, 2, 3];
  const MonthlyDurations: DurationType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleDurationChange = (change: number) => {
    const newValue = duration + change;
    // For weekly plans, keep the 3-week limit
    if (billingCycle === BillingCycle.Weekly) {
      if (newValue <= 1) setDuration(1);
      else if (newValue <= 2) setDuration(2);
      else setDuration(3); // Max 3 weeks for weekly plans
    } else {
      // For monthly plans, allow any value from 1 to 12
      if (newValue < 1) setDuration(1);
      else if (newValue > 12) setDuration(12);
      else setDuration(newValue as DurationType);
    }
  };

  return (
    <>
      <div className={styles.plan_selector}>
        <h2 className={styles.plan_selector__title}>Billing Cycle</h2>

        <div className={styles.plan_selector__toggle}>
          <button
            className={`${styles.plan_selector__option} ${billingCycle === BillingCycle.Weekly ? styles.plan_selector__option_active : ""}`}
            onClick={() => setBillingCycle(BillingCycle.Weekly)}
          >
            Weekly
          </button>

          <button
            className={`${styles.plan_selector__option} ${billingCycle === BillingCycle.Monthly ? styles.plan_selector__option_active : ""}`}
            onClick={() => setBillingCycle(BillingCycle.Monthly)}
          >
            Monthly
          </button>

          <motion.div
            className={styles.plan_selector__slider}
            initial={false}
            animate={{
              x: billingCycle === BillingCycle.Weekly ? 0 : "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </div>
      </div>
      <div className={styles.duration_selector}>
        <h2 className={styles.duration_selector__title}>Duration</h2>
        <div className={styles.duration_selector__container}>
          {(billingCycle === BillingCycle.Weekly ? WeeklyDurations : MonthlyDurations).map(
            (value) => (
              <motion.button
                key={value}
                className={`${styles.duration_selector__pill} ${
                  duration === value
                    ? styles.duration_selector__pill_active
                    : ""
                }`}
                onClick={() => setDuration(value)}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {value}{" "}
                {value === 1
                  ? billingCycle === BillingCycle.Weekly
                    ? "Week"
                    : "Month"
                  : billingCycle === BillingCycle.Weekly
                    ? "Weeks"
                    : "Months"}
              </motion.button>
            )
          )}
        </div>
        <p className={styles.duration_selector__helper}>
          You can have up to a 8-Week plan
        </p>
      </div>
    </>
  );
};

export default PlanTypeSelector;
