'use client';

import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import FilterTabs, { FilterTab } from '../common/FilterTabs';
import EmptyState from '../common/EmptyState';
import SubscriptionList from './list/SubscriptionList';
import { SubscriptionCardProps } from './card/SubscriptionCard';
import Button from '@/components/ui/Button/Button';
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
  
  // Mock subscription data - in a real scenario, this would come from API
  const mockSubscriptions: SubscriptionCardProps[] = [
    {
      id: '1',
      serviceType: 'Cleaning',
      status: 'active',
      nextBillingDate: 'Tue, Jan 2',
      amount: 60000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'Sparkles',
      additionalInfo: ['Laundry', 'Food', 'Pest Control'],
      onClick: () => console.log('Show more details for subscription 1')
    },
    {
      id: '2',
      serviceType: 'Cleaning',
      status: 'active',
      nextBillingDate: 'Tue, Jan 2',
      amount: 60000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'Sparkles',
      additionalInfo: ['Laundry', 'Food', 'Pest Control'],
      onClick: () => console.log('Show more details for subscription 2')
    },
    {
      id: '3',
      serviceType: 'Cleaning',
      status: 'active',
      nextBillingDate: 'Tue, Jan 2',
      amount: 60000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'Sparkles',
      onClick: () => console.log('Show more details for subscription 3')
    },
    {
      id: '4',
      serviceType: 'Cleaning',
      status: 'active',
      nextBillingDate: 'Tue, Jan 2',
      amount: 60000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'Sparkles',
      onClick: () => console.log('Show more details for subscription 4')
    },
    {
      id: '5',
      serviceType: 'Cleaning',
      status: 'active',
      nextBillingDate: 'Tue, Jan 2',
      amount: 60000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'Sparkles',
      onClick: () => console.log('Show more details for subscription 5')
    },
    {
      id: '6',
      serviceType: 'Cleaning',
      status: 'active',
      nextBillingDate: 'Tue, Jan 2',
      amount: 60000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'Sparkles',
      onClick: () => console.log('Show more details for subscription 6')
    }
  ];
  
  const hasSubscriptions = mockSubscriptions.length > 0;
  
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
      
      <div className={styles.subscription__headerRow}>
        <FilterTabs 
          tabs={filterTabs} 
          onTabChange={handleTabChange}
          className={styles.subscription__filterTabs}
        />
        
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
      </div>
      
      {hasSubscriptions ? (
        <SubscriptionList 
          subscriptions={mockSubscriptions} 
          activeTab={activeTab} 
        />
      ) : (
        <EmptyState 
          imageSrc="/images/general/sign.png"
          imageAlt="No subscriptions"
          message="Sorry, you currently do not have any subscription, but no fuss, you can easily just..."
          className={styles.subscription__emptyState}
        />
      )}
      
      <div className={styles.subscription__actionContainer}>
        <Button 
          variant="primary"
          size="lg"
          onClick={() => console.log('New subscription')}
        >
          NEW SUBSCRIPTION
        </Button>
      </div>
    </section>
  );
}