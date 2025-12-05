"use client";

import React from 'react';
import styles from './FrequencySelector.module.scss';
import { BillingCycle } from '@/graphql/api';

interface FrequencySelectorProps {
  activeFrequency: BillingCycle;
  onFrequencyChange: (frequency: BillingCycle) => void;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({ 
  activeFrequency,
  onFrequencyChange
}) => {
  return (
    <div className={styles.frequency}>
      <button 
        className={`${styles.frequency__tab} ${activeFrequency === BillingCycle.Monthly ? styles.frequency__tab_active : ''}`}
        onClick={() => onFrequencyChange(BillingCycle.Monthly)}
      >
        MONTHLY
      </button>
      <button 
        className={`${styles.frequency__tab} ${activeFrequency === BillingCycle.Quarterly ? styles.frequency__tab_active : ''}`}
        onClick={() => onFrequencyChange(BillingCycle.Quarterly)}
      >
        QUARTERLY
      </button>
    </div>
  );
};

export default FrequencySelector;
