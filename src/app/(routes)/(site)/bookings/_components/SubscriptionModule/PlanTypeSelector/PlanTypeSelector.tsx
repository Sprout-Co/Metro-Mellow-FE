// PlanTypeSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { PlanType } from '../SubscriptionModule';
import styles from './PlanTypeSelector.module.scss';

interface PlanTypeSelectorProps {
  planType: PlanType;
  setPlanType: (type: PlanType) => void;
}

const PlanTypeSelector: React.FC<PlanTypeSelectorProps> = ({ planType, setPlanType }) => {
  return (
    <div className={styles.plan_selector}>
      <h2 className={styles.plan_selector__title}>Plan Type</h2>
      
      <div className={styles.plan_selector__toggle}>
        <button
          className={`${styles.plan_selector__option} ${planType === 'weekly' ? styles.plan_selector__option_active : ''}`}
          onClick={() => setPlanType('weekly')}
        >
          Weekly
        </button>
        
        <button
          className={`${styles.plan_selector__option} ${planType === 'monthly' ? styles.plan_selector__option_active : ''}`}
          onClick={() => setPlanType('monthly')}
        >
          Monthly
        </button>
        
        <motion.div 
          className={styles.plan_selector__slider}
          initial={false}
          animate={{
            x: planType === 'weekly' ? 0 : '100%'
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      </div>
    </div>
  );
};

export default PlanTypeSelector;