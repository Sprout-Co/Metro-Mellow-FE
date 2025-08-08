'use client';

import React from 'react';
import SubscriptionCard, { SubscriptionCardProps } from '../card/SubscriptionCard';
import styles from './SubscriptionList.module.scss';

interface SubscriptionListProps {
  subscriptions: SubscriptionCardProps[];
  activeTab?: string;
}

export default function SubscriptionList({ 
  subscriptions,
  activeTab = 'all'
}: SubscriptionListProps) {
  // Filter subscriptions based on active tab
  const filteredSubscriptions = activeTab === 'all' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.status === activeTab);
  
  return (
    <div className={styles.subscriptionList}>
      {filteredSubscriptions.length > 0 ? (
        filteredSubscriptions.map((subscription) => (
          <SubscriptionCard 
            key={subscription.id}
            {...subscription}
          />
        ))
      ) : (
        <div className={styles.subscriptionList__empty}>
          <p>No subscriptions found for this filter.</p>
        </div>
      )}
    </div>
  );
}