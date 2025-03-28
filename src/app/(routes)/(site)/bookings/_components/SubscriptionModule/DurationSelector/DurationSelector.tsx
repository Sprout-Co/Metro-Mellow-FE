// DurationSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { DurationType } from '../SubscriptionModule';
import styles from './DurationSelector.module.scss';

interface DurationSelectorProps {
  duration: DurationType;
  setDuration: (duration: DurationType) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ duration, setDuration }) => {
  const durations: DurationType[] = [1, 2, 4, 8];
  
  return (
    <div className={styles.duration_selector}>
      <h2 className={styles.duration_selector__title}>Duration</h2>
      <div className={styles.duration_selector__container}>
        {durations.map((value) => (
          <motion.button
            key={value}
            className={`${styles.duration_selector__pill} ${duration === value ? styles.duration_selector__pill_active : ''}`}
            onClick={() => setDuration(value)}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {value} {value === 1 ? 'Week' : 'Weeks'}
          </motion.button>
        ))}
      </div>
      <p className={styles.duration_selector__helper}>You can have up to a 8-Week plan</p>
    </div>
  );
};

export default DurationSelector;