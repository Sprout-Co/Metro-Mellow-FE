'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './RecentActivity.module.scss';

// Sample activity data
const activities = [
  {
    id: 'act1',
    type: 'service-completed',
    title: 'Home Cleaning Completed',
    description: 'Your home cleaning service has been completed successfully.',
    time: '2 hours ago',
    icon: 'check-circle',
    color: 'success'
  },
  {
    id: 'act2',
    type: 'service-scheduled',
    title: 'Laundry Service Scheduled',
    description: 'Your laundry service has been scheduled for March 18, 2:00 PM.',
    time: '5 hours ago',
    icon: 'calendar',
    color: 'primary'
  },
  {
    id: 'act3',
    type: 'payment',
    title: 'Payment Processed',
    description: 'Your payment of $120 for Weekly Home Cleaning has been processed.',
    time: '1 day ago',
    icon: 'credit-card',
    color: 'info'
  },
  {
    id: 'act4',
    type: 'subscription',
    title: 'Subscription Renewed',
    description: 'Your monthly pest control subscription has been renewed.',
    time: '3 days ago',
    icon: 'refresh-cw',
    color: 'warning'
  }
];

export default function RecentActivity() {
  return (
    <div className={styles.activity}>
      {activities.length > 0 ? (
        <div className={styles.activity__timeline}>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={styles.activity__item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.activity__iconCol}>
                <div className={`${styles.activity__icon} ${styles[`activity__icon--${activity.color}`]}`}>
                  <Icon name={activity.icon} />
                </div>
                {index < activities.length - 1 && (
                  <div className={styles.activity__line}></div>
                )}
              </div>
              
              <div className={styles.activity__content}>
                <div className={styles.activity__header}>
                  <h4 className={styles.activity__title}>{activity.title}</h4>
                  <span className={styles.activity__time}>{activity.time}</span>
                </div>
                <p className={styles.activity__description}>{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.activity__empty}>
          <div className={styles.activity__emptyIcon}>
            <Icon name="activity" />
          </div>
          <p className={styles.activity__emptyText}>No recent activity</p>
        </div>
      )}
      
      <div className={styles.activity__footer}>
        <button className={styles.activity__footerBtn}>
          View All Activity
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}