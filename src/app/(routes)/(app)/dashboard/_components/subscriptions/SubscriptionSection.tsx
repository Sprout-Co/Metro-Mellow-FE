'use client';

import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import FilterTabs, { FilterTab } from '../common/FilterTabs';
import EmptyState from '../common/EmptyState';
import styles from './SubscriptionSection.module.scss';

// Sort option type
interface SortOption {
  label: string;
  value: string;
}

export default function SubscriptionSection() {
  // Initial filter tabs
  const [filterTabs] = useState<FilterTab[]>([
    { id: 'all', label: 'ALL', isActive: true },
    { id: 'active', label: 'ACTIVE', isActive: false },
    { id: 'canceled', label: 'CANCELED', isActive: false },
    { id: 'suspended', label: 'SUSPENDED', isActive: false },
  ]);
  
  // Sort options
  const sortOptions: SortOption[] = [
    { label: 'Billing date', value: 'billing_date' },
    { label: 'Name', value: 'name' },
    { label: 'Date created', value: 'date_created' },
  ];
  
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Mock data - in a real scenario, this would come from API
  const hasSubscriptions = false;
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };
  
  return (
    <section className={styles.subscription}>
      <SectionHeader 
        title="Subscription" 
        subtitle="Here are a list of your subscription plans:"
      />
      
      <FilterTabs 
        tabs={filterTabs} 
        onTabChange={handleTabChange}
        className={styles.subscription__filterTabs}
      />
      
      {hasSubscriptions && (
        <div className={styles.subscription__sortContainer}>
          <div className={styles.subscription__sortBy}>
            <span className={styles.subscription__sortByLabel}>Sort by:</span>
            <select 
              className={styles.subscription__sortBySelect}
              value={selectedSort}
              onChange={handleSortChange}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {!hasSubscriptions && (
        <EmptyState 
          imageSrc="/images/general/sign.png"
          imageAlt="No subscriptions"
          message="Sorry, you currently do not have any subscription, but no fuss, you can easily just..."
          actionLabel="SUBSCRIBE TO A PLAN"
          onAction={() => console.log('Subscribe action')}
          className={styles.subscription__emptyState}
        />
      )}
    </section>
  );
}