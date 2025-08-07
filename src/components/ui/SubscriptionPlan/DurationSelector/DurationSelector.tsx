"use client";

import React from 'react';
import styles from './DurationSelector.module.scss';
import { BillingCycle } from '@/graphql/api';

interface DurationSelectorProps {
  billingCycle: BillingCycle;
  duration: number;
  onDurationChange: (duration: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  billingCycle,
  duration,
  onDurationChange
}) => {
  // For weekly plans, show weeks. For monthly/quarterly, show months
  const isWeekly = billingCycle === BillingCycle.Monthly; // We'll need to add Weekly to the enum
  const maxDuration = isWeekly ? 8 : 12;
  const durationOptions = Array.from({ length: maxDuration }, (_, i) => i + 1);
  const durationLabel = isWeekly ? 'Week' : 'Month';

  return (
    <div className={styles.duration}>
      <h3 className={styles.duration__title}>Duration</h3>
      <div className={styles.duration__grid}>
        {durationOptions.map(option => (
          <button
            key={option}
            className={`${styles.duration__option} ${duration === option ? styles.duration__option_active : ''}`}
            onClick={() => onDurationChange(option)}
          >
            {option} {option === 1 ? durationLabel : `${durationLabel}s`}
          </button>
        ))}
      </div>
      <p className={styles.duration__helper}>
        You can have up to a {maxDuration}-{durationLabel.toLowerCase()} plan
      </p>
    </div>
  );
};

export default DurationSelector;
