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
  // Show only 1, 2, 3 weeks
  const durationOptions = [1, 2, 3];
  const durationLabel = 'Week';

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
        You can have up to a 3-week plan
      </p>
    </div>
  );
};

export default DurationSelector;
