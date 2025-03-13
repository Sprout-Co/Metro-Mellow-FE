'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './QuickActions.module.scss';

const quickActions = [
  {
    id: 'book',
    label: 'Book Service',
    icon: 'calendar-plus',
    color: 'primary'
  },
  {
    id: 'reschedule',
    label: 'Reschedule',
    icon: 'calendar',
    color: 'secondary'
  },
  {
    id: 'contact',
    label: 'Contact Support',
    icon: 'headphones',
    color: 'info'
  },
  {
    id: 'manage',
    label: 'Manage Subscriptions',
    icon: 'refresh-cw',
    color: 'success'
  },
  {
    id: 'track',
    label: 'Track Provider',
    icon: 'map-pin',
    color: 'warning'
  },
  {
    id: 'settings',
    label: 'Account Settings',
    icon: 'settings',
    color: 'neutral'
  }
];

export default function QuickActions() {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    })
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actions__grid}>
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            className={`${styles.actions__item} ${styles[`actions__item--${action.color}`]}`}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`${styles.actions__icon} ${styles[`actions__icon--${action.color}`]}`}>
              <Icon name={action.icon} />
            </div>
            <span className={styles.actions__label}>{action.label}</span>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className={styles.actions__bookService}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className={styles.actions__bookContent}>
          <div className={styles.actions__bookIcon}>
            <Icon name="clipboard-list" />
          </div>
          <div className={styles.actions__bookText}>
            <h3 className={styles.actions__bookTitle}>Need a new service?</h3>
            <p className={styles.actions__bookDescription}>
              Book any of our premium home services in just a few clicks.
            </p>
          </div>
        </div>
        <button className={styles.actions__bookButton}>
          Book Now
          <Icon name="arrow-right" />
        </button>
      </motion.div>
    </div>
  );
}