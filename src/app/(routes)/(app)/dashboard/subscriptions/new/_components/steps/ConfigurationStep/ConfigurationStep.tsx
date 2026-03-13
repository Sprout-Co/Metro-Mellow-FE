"use client";

import React, { useEffect, useState } from "react";
import styles from "./ConfigurationStep.module.scss";
import {
  BillingCycle,
  ScheduleDays,
  Service,
  SubscriptionFrequency,
  TimeSlot,
} from "@/graphql/api";

export interface SingleServiceConfig {
  billingCycle: BillingCycle;
  duration: number;
  frequency: SubscriptionFrequency;
  timeSlot: TimeSlot;
  days: ScheduleDays[];
  quantity: number;
  notes: string;
  estimatedPrice: number;
  startDate: string; // ISO date string (YYYY-MM-DD)
}

const DEFAULT_DAYS: ScheduleDays[] = [ScheduleDays.Monday];
const BILLING_OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: BillingCycle.Monthly, label: "Monthly" },
  { value: BillingCycle.Quarterly, label: "Quarterly" },
];
const FREQUENCY_OPTIONS: { value: SubscriptionFrequency; label: string }[] = [
  { value: SubscriptionFrequency.Weekly, label: "Weekly" },
  { value: SubscriptionFrequency.BiWeekly, label: "Bi-weekly" },
  { value: SubscriptionFrequency.Monthly, label: "Monthly" },
];
const TIME_SLOT_OPTIONS: { value: TimeSlot; label: string }[] = [
  { value: TimeSlot.Morning, label: "Morning" },
  { value: TimeSlot.Afternoon, label: "Afternoon" },
  { value: TimeSlot.Evening, label: "Evening" },
];
const DAY_OPTIONS: { value: ScheduleDays; label: string }[] = [
  { value: ScheduleDays.Monday, label: "Mon" },
  { value: ScheduleDays.Tuesday, label: "Tue" },
  { value: ScheduleDays.Wednesday, label: "Wed" },
  { value: ScheduleDays.Thursday, label: "Thu" },
  { value: ScheduleDays.Friday, label: "Fri" },
  { value: ScheduleDays.Saturday, label: "Sat" },
  { value: ScheduleDays.Sunday, label: "Sun" },
];

function getDefaultStartDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function getDefaultConfig(service: Service): SingleServiceConfig {
  const basePrice = typeof service.price === "number" ? service.price : 0;
  return {
    billingCycle: BillingCycle.Monthly,
    duration: 1,
    frequency: SubscriptionFrequency.Weekly,
    timeSlot: TimeSlot.Morning,
    days: [...DEFAULT_DAYS],
    quantity: 1,
    notes: "",
    estimatedPrice: basePrice,
    startDate: getDefaultStartDate(),
  };
}

interface ConfigurationStepProps {
  service: Service;
  value: SingleServiceConfig | null;
  onChange: (config: SingleServiceConfig) => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  service,
  value,
  onChange,
}) => {
  const [local, setLocal] = useState<SingleServiceConfig>(() =>
    value ? { ...value } : getDefaultConfig(service),
  );

  useEffect(() => {
    if (value) setLocal({ ...value });
  }, [value]);

  // Sync initial default config to parent so Next is enabled
  useEffect(() => {
    if (!value) onChange(local);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const basePrice = typeof service.price === "number" ? service.price : 0;

  const update = (patch: Partial<SingleServiceConfig>) => {
    const next = { ...local, ...patch };
    next.estimatedPrice = basePrice * next.quantity * next.duration;
    setLocal(next);
    onChange(next);
  };

  const toggleDay = (day: ScheduleDays) => {
    const next = local.days.includes(day)
      ? local.days.filter((d) => d !== day)
      : [...local.days, day];
    if (next.length > 0) update({ days: next });
  };

  return (
    <div className={styles.step}>
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Billing cycle</label>
          <select
            className={styles.select}
            value={local.billingCycle}
            onChange={(e) =>
              update({ billingCycle: e.target.value as BillingCycle })
            }
          >
            {BILLING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Duration (billing periods)</label>
          <input
            type="number"
            min={1}
            max={12}
            className={styles.input}
            value={local.duration}
            onChange={(e) =>
              update({
                duration: Math.max(1, parseInt(e.target.value, 10) || 1),
              })
            }
          />
          <span className={styles.hint}>1–12</span>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Service frequency</label>
          <select
            className={styles.select}
            value={local.frequency}
            onChange={(e) =>
              update({ frequency: e.target.value as SubscriptionFrequency })
            }
          >
            {FREQUENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Preferred time</label>
          <select
            className={styles.select}
            value={local.timeSlot}
            onChange={(e) => update({ timeSlot: e.target.value as TimeSlot })}
          >
            {TIME_SLOT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Quantity</label>
          <input
            type="number"
            min={1}
            max={20}
            className={styles.input}
            value={local.quantity}
            onChange={(e) =>
              update({
                quantity: Math.max(
                  1,
                  Math.min(20, parseInt(e.target.value, 10) || 1),
                ),
              })
            }
          />
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.label}>Preferred days</label>
          <div className={styles.dayChips}>
            {DAY_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`${styles.dayChip} ${local.days.includes(o.value) ? styles.dayChipSelected : ""}`}
                onClick={() => toggleDay(o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.label}>Notes (optional)</label>
          <textarea
            className={styles.textarea}
            value={local.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Special instructions or preferences"
          />
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.summary__title}>Summary</div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Service</span>
          <span className={styles.summary__value}>{service.name}</span>
        </div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Billing</span>
          <span className={styles.summary__value}>
            {local.billingCycle} × {local.duration}
          </span>
        </div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Estimated total</span>
          <span className={styles.summary__value}>
            ₦{local.estimatedPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationStep;
