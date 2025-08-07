'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from './_components/header/DashboardHeader';
import DashboardBanner from './_components/banner/DashboardBanner';
import NavigationTabs from './_components/navigation/NavigationTabs';
import ServicesSection from './_components/services/ServicesSection';
import AllOrdersSection from './_components/all-orders/AllOrdersSection';
import QuickActions from './_components/quick-actions/QuickActions';
import CTAButton from './_components/cta/CTAButton';
import { SubscriptionSection } from './_components/subscriptions';
import EmptyState from './_components/common/EmptyState';
import Button from '@/components/ui/Button/Button';

import styles from './Dashboard.module.scss';

export default function Dashboard() {
  // This would typically be fetched from an API
  const hasServices = true;
  const [activeTab, setActiveTab] = useState('overview');

  // Helper function for handling add service action
  const handleAddService = () => {
    console.log('Add service action');
  };
  
  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <DashboardBanner />
      
      <div className={styles.dashboard__content}>
        <div className={styles.dashboard__container}>
          <NavigationTabs 
            tabs={[
              { id: 'overview', label: 'OVERVIEW', isActive: activeTab === 'overview' },
              { id: 'subscription', label: 'SUBSCRIPTION', isActive: activeTab === 'subscription' },
              { id: 'address', label: 'ADDRESS', isActive: activeTab === 'address' },
            ]} 
            onTabClick={handleTabClick}
          />
          
          {activeTab === 'overview' && (
            <div className={styles.dashboard__main}>
              <div className={styles.dashboard__services}>
                {hasServices ? <AllOrdersSection /> : (
                  <EmptyState
                    imageSrc="/images/general/sign.png"
                    imageAlt="No services"
                    message="You don't have any services yet. Get started by adding a service."
                    actionLabel="ADD A SERVICE"
                    onAction={handleAddService}
                    className={styles.dashboard__emptyState}
                  />
                )}
              </div>
              
              <div className={styles.dashboard__sidebar}>
                <QuickActions />
              </div>
            </div>
          )}
          
          {activeTab === 'subscription' && (
            <SubscriptionSection />
          )}
          
          {activeTab === 'address' && (
            <div className={styles.dashboard__main}>
              <p>Address section content will go here</p>
            </div>
          )}
          
          {activeTab === 'overview' && (
            <div className={styles.dashboard__cta}>
              <CTAButton />
            </div>
          )}
          
          {activeTab === 'subscription' && (
            <div className={styles.dashboard__cta}>
              <Button 
                variant="primary"
                size="lg"
                onClick={() => console.log('Subscribe to a plan clicked')}
              >
                SUBSCRIBE TO A PLAN
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}