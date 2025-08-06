'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  type: 'upcoming' | 'past' | 'cancelled' | 'paused' | 'all';
  onAction: () => void;
}

export default function EmptyState({ type, onAction }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'upcoming':
        return {
          icon: 'calendar',
          title: 'No Upcoming Appointments',
          description: 'You don\'t have any scheduled appointments at the moment.',
          actionLabel: 'Schedule Service',
          showAction: true
        };
      case 'past':
        return {
          icon: 'clock',
          title: 'No Past Appointments',
          description: 'You don\'t have any past appointments.',
          actionLabel: '',
          showAction: false
        };
      case 'cancelled':
        return {
          icon: 'x-circle',
          title: 'No Cancelled Appointments',
          description: 'You don\'t have any cancelled appointments.',
          actionLabel: '',
          showAction: false
        };
      case 'paused':
        return {
          icon: 'pause-circle',
          title: 'No Paused Appointments',
          description: 'You don\'t have any paused appointments.',
          actionLabel: '',
          showAction: false
        };
      default:
        return {
          icon: 'calendar',
          title: 'No Appointments',
          description: 'You don\'t have any appointments.',
          actionLabel: 'Schedule Service',
          showAction: true
        };
    }
  };

  const { icon, title, description, actionLabel, showAction } = getEmptyStateContent();

  return (
    <motion.div 
      className={styles.emptyState}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.emptyState__icon}>
        <Icon name={icon} />
      </div>
      <h3 className={styles.emptyState__title}>{title}</h3>
      <p className={styles.emptyState__description}>{description}</p>
      
      {showAction && (
        <motion.button 
          className={styles.emptyState__button}
          onClick={onAction}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {actionLabel}
          <Icon name="arrow-right" />
        </motion.button>
      )}
    </motion.div>
  );
}