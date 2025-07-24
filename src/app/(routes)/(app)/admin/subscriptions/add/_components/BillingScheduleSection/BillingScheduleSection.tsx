import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { BillingCycle } from "@/graphql/api";
import styles from "./BillingScheduleSection.module.scss";

interface BillingScheduleSectionProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  autoRenew: boolean;
  setAutoRenew: (autoRenew: boolean) => void;
}

const BillingScheduleSection: React.FC<BillingScheduleSectionProps> = ({
  billingCycle,
  setBillingCycle,
  startDate,
  setStartDate,
  duration,
  setDuration,
  autoRenew,
  setAutoRenew,
}) => {
  const formatBillingCycle = (cycle: BillingCycle) => {
    switch (cycle) {
      case BillingCycle.Monthly:
        return "Monthly";
      case BillingCycle.Weekly:
        return "Weekly";
      case BillingCycle.Yearly:
        return "Yearly";
      default:
        return cycle;
    }
  };

  const getDurationLabel = () => {
    switch (billingCycle) {
      case BillingCycle.Monthly:
        return duration === 1 ? "month" : "months";
      case BillingCycle.Weekly:
        return duration === 1 ? "week" : "weeks";
      case BillingCycle.Yearly:
        return duration === 1 ? "year" : "years";
      default:
        return "periods";
    }
  };

  return (
    <Card className={styles.billing_schedule}>
      <h3 className={styles.billing_schedule__title}>
        <Icon name="calendar" />
        Billing & Schedule
      </h3>

      <div className={styles.billing_schedule__grid}>
        <div className={styles.billing_schedule__field}>
          <label className={styles.billing_schedule__label}>Billing Cycle</label>
          <select
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
            className={styles.billing_schedule__select}
          >
            <option value={BillingCycle.Weekly}>Weekly</option>
            <option value={BillingCycle.Monthly}>Monthly</option>
            <option value={BillingCycle.Yearly}>Yearly</option>
          </select>
          <small className={styles.billing_schedule__help_text}>
            How often the customer will be billed
          </small>
        </div>

        <div className={styles.billing_schedule__field}>
          <label className={styles.billing_schedule__label}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={styles.billing_schedule__input}
          />
          <small className={styles.billing_schedule__help_text}>
            When the subscription should begin
          </small>
        </div>

        <div className={styles.billing_schedule__field}>
          <label className={styles.billing_schedule__label}>
            Duration ({getDurationLabel()})
          </label>
          <input
            type="number"
            min="1"
            max="36"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
            className={styles.billing_schedule__input}
          />
          <small className={styles.billing_schedule__help_text}>
            How many {formatBillingCycle(billingCycle).toLowerCase()} cycles
          </small>
        </div>

        <div className={styles.billing_schedule__field}>
          <label className={styles.billing_schedule__checkbox_label}>
            <input
              type="checkbox"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
              className={styles.billing_schedule__checkbox}
            />
            <span className={styles.billing_schedule__checkbox_text}>
              Auto-renew subscription
            </span>
          </label>
          <small className={styles.billing_schedule__help_text}>
            Automatically renew when duration expires
          </small>
        </div>
      </div>

      <div className={styles.billing_schedule__summary}>
        <h4>Subscription Summary</h4>
        <div className={styles.billing_schedule__summary_grid}>
          <div className={styles.billing_schedule__summary_item}>
            <span>Billing:</span>
            <strong>{formatBillingCycle(billingCycle)}</strong>
          </div>
          <div className={styles.billing_schedule__summary_item}>
            <span>Duration:</span>
            <strong>{duration} {getDurationLabel()}</strong>
          </div>
          <div className={styles.billing_schedule__summary_item}>
            <span>Auto-renew:</span>
            <strong>{autoRenew ? "Yes" : "No"}</strong>
          </div>
          <div className={styles.billing_schedule__summary_item}>
            <span>Starts:</span>
            <strong>{new Date(startDate).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BillingScheduleSection;