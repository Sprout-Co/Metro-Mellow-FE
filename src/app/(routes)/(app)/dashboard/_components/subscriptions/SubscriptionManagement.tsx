'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './SubscriptionManagement.module.scss';
import EmptyState from '../overview/EmptyState';

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: '1',
    name: 'Weekly Cleaning',
    status: 'ACTIVE',
    nextBillingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    price: 79.99,
    frequency: 'WEEKLY',
    services: [
      { name: 'Home Cleaning', included: true },
      { name: 'Laundry', included: false },
      { name: 'Kitchen Deep Clean', included: true },
      { name: 'Bathroom Deep Clean', included: true }
    ]
  },
  {
    id: '2',
    name: 'Monthly Laundry',
    status: 'ACTIVE',
    nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    price: 49.99,
    frequency: 'MONTHLY',
    services: [
      { name: 'Wash & Fold', included: true },
      { name: 'Ironing', included: true },
      { name: 'Dry Cleaning', included: false },
      { name: 'Stain Removal', included: true }
    ]
  }
];

export default function SubscriptionManagement() {
  const [expandedSubscription, setExpandedSubscription] = useState<string | null>(null);
  const [subscriptions] = useState(mockSubscriptions);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleSubscription = (id: string) => {
    if (expandedSubscription === id) {
      setExpandedSubscription(null);
    } else {
      setExpandedSubscription(id);
    }
  };

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <EmptyState 
        type="upcoming"
        onAction={() => console.log('Subscribe clicked')}
      />
    );
  }

  return (
    <div className={styles.subscriptions}>
      <header className={styles.subscriptions__header}>
        <h2 className={styles.subscriptions__title}>
          Your Subscriptions
          <span className={styles.subscriptions__count}>{subscriptions.length}</span>
        </h2>
        <button className={styles.subscriptions__addBtn}>
          <Icon name="plus" />
          Add Subscription
        </button>
      </header>

      <div className={styles.subscriptions__list}>
        {subscriptions.map((subscription) => (
          <motion.div 
            key={subscription.id}
            className={styles.subscriptions__card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: subscriptions.findIndex(s => s.id === subscription.id) * 0.1
            }}
          >
            <div className={styles.subscriptions__cardHeader}>
              <div className={styles.subscriptions__cardInfo}>
                <h3 className={styles.subscriptions__cardTitle}>
                  {subscription.name}
                </h3>
                <div className={styles.subscriptions__cardMeta}>
                  <span className={`${styles.subscriptions__status} ${styles[`subscriptions__status--${subscription.status.toLowerCase()}`]}`}>
                    {subscription.status}
                  </span>
                  <span className={styles.subscriptions__frequency}>
                    {subscription.frequency.toLowerCase()}
                  </span>
                </div>
              </div>
              <div className={styles.subscriptions__cardPrice}>
                <span className={styles.subscriptions__priceAmount}>
                  ${subscription.price}
                </span>
                <span className={styles.subscriptions__priceFrequency}>
                  /{subscription.frequency.toLowerCase()}
                </span>
              </div>
            </div>

            <div className={styles.subscriptions__cardContent}>
              <div className={styles.subscriptions__billingInfo}>
                <Icon name="calendar" className={styles.subscriptions__icon} />
                <span>Next billing: {formatDate(subscription.nextBillingDate)}</span>
              </div>

              <div className={styles.subscriptions__actions}>
                <button 
                  className={`${styles.subscriptions__actionBtn} ${styles['subscriptions__actionBtn--secondary']}`}
                  onClick={() => toggleSubscription(subscription.id)}
                >
                  {expandedSubscription === subscription.id ? 'Hide Details' : 'View Details'}
                  <Icon name={expandedSubscription === subscription.id ? 'chevron-up' : 'chevron-down'} />
                </button>
                <button className={`${styles.subscriptions__actionBtn} ${styles['subscriptions__actionBtn--primary']}`}>
                  Manage
                </button>
              </div>
            </div>

            {expandedSubscription === subscription.id && (
              <motion.div 
                className={styles.subscriptions__details}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className={styles.subscriptions__detailsTitle}>Included Services</h4>
                <ul className={styles.subscriptions__servicesList}>
                  {subscription.services.map((service, index) => (
                    <li 
                      key={index} 
                      className={`${styles.subscriptions__serviceItem} ${!service.included ? styles['subscriptions__serviceItem--disabled'] : ''}`}
                    >
                      <Icon 
                        name={service.included ? 'check' : 'x'} 
                        className={`${styles.subscriptions__serviceIcon} ${service.included ? styles['subscriptions__serviceIcon--included'] : styles['subscriptions__serviceIcon--excluded']}`}
                      />
                      <span>{service.name}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.subscriptions__detailsActions}>
                  <button className={`${styles.subscriptions__actionBtn} ${styles['subscriptions__actionBtn--secondary']}`}>
                    <Icon name="edit-2" />
                    Edit Subscription
                  </button>
                  <button className={`${styles.subscriptions__actionBtn} ${styles['subscriptions__actionBtn--danger']}`}>
                    <Icon name="pause" />
                    Pause Subscription
                  </button>
                  <button className={`${styles.subscriptions__actionBtn} ${styles['subscriptions__actionBtn--danger']}`}>
                    <Icon name="trash-2" />
                    Cancel Subscription
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}