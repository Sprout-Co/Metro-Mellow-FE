'use client';

import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import FilterTabs, { FilterTab } from '../common/FilterTabs';
import EmptyState from '../common/EmptyState';
import SubscriptionList from './list/SubscriptionList';
import { SubscriptionCardProps } from './card/SubscriptionCard';
import Button from '@/components/ui/Button/Button';
import SubscriptionPlan from '@/components/ui/SubscriptionPlan/SubscriptionPlan';
import styles from './SubscriptionSection.module.scss';

// Sort option type
interface SortOption {
  label: string;
  value: string;
}

export default function SubscriptionSection() {
  // State for showing subscription plan form
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  
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
      serviceType: 'Food',
      status: 'active',
      nextBillingDate: 'Thu, Jan 4',
      amount: 45000,
      frequency: ['Bi-weekly'],
      icon: 'CookingPot',
      onClick: () => console.log('Show more details for subscription 2')
    },
    {
      id: '3',
      serviceType: 'Laundry',
      status: 'suspended',
      nextBillingDate: 'Mon, Jan 8',
      amount: 35000,
      frequency: ['Weekly'],
      icon: 'Shirt',
      onClick: () => console.log('Show more details for subscription 3')
    },
    {
      id: '4',
      serviceType: 'Pest Control',
      status: 'active',
      nextBillingDate: 'Fri, Jan 12',
      amount: 25000,
      frequency: ['Monthly'],
      icon: 'BugOff',
      onClick: () => console.log('Show more details for subscription 4')
    },
    {
      id: '5',
      serviceType: 'Cleaning',
      status: 'canceled',
      nextBillingDate: 'Wed, Jan 10',
      amount: 55000,
      frequency: ['Weekly'],
      icon: 'Sparkles',
      onClick: () => console.log('Show more details for subscription 5')
    },
    {
      id: '6',
      serviceType: 'Food',
      status: 'active',
      nextBillingDate: 'Sun, Jan 7',
      amount: 40000,
      frequency: ['Weekly', 'Monthly'],
      icon: 'CookingPot',
      additionalInfo: ['Laundry'],
      onClick: () => console.log('Show more details for subscription 6')
    },
    {
      id: '7',
      serviceType: 'Laundry',
      status: 'active',
      nextBillingDate: 'Sat, Jan 6',
      amount: 30000,
      frequency: ['Bi-weekly'],
      icon: 'Shirt',
      onClick: () => console.log('Show more details for subscription 7')
    },
    {
      id: '8',
      serviceType: 'Pest Control',
      status: 'suspended',
      nextBillingDate: 'Tue, Jan 16',
      amount: 22000,
      frequency: ['Monthly'],
      icon: 'BugOff',
      onClick: () => console.log('Show more details for subscription 8')
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

  // Handle new subscription button click
  const handleNewSubscription = () => {
    setShowSubscriptionForm(true);
  };

  // Handle close subscription form
  const handleCloseSubscriptionForm = () => {
    setShowSubscriptionForm(false);
  };
  
  return (
    <section className={styles.subscription}>
      <div className={styles.subscription__header}>
        <div className={styles.subscription__headerContent}>
          <div className={styles.subscription__titleSection}>
            <h2 className={styles.subscription__title}>
              {showSubscriptionForm ? 'Create a Subscription Plan' : 'Subscription'}
            </h2>
            <p className={styles.subscription__subtitle}>
              {showSubscriptionForm ? 'Here are a list of your subscription plans:' : 'Here are a list of your subscription plans:'}
            </p>
          </div>
          {showSubscriptionForm ? (
            <Button 
              variant="ghost"
              size="lg"
              onClick={handleCloseSubscriptionForm}
              className={styles.subscription__backButton}
            >
              ← Back to Subscriptions
            </Button>
          ) : (
            <Button 
              variant="primary"
              size="lg"
              onClick={handleNewSubscription}
              className={styles.subscription__newButton}
            >
              NEW SUBSCRIPTION
            </Button>
          )}
        </div>
      </div>
      
      {!showSubscriptionForm && (
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
      )}
      
      {showSubscriptionForm ? (
        <div className={styles.subscription__form}>
          <div className={styles.subscription__formContent}>
            <SubscriptionPlan />
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}