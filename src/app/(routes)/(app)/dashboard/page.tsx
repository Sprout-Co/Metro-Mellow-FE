'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from './_components/layout/DashboardLayout';
import NavigationTabs from './_components/navigation/NavigationTabs';
import ServicesSection from './_components/services/ServicesSection';
import AllOrdersSection from './_components/all-orders/AllOrdersSection';
import QuickActions from './_components/quick-actions/QuickActions';
import CTAButton from './_components/cta/CTAButton';
import SubscriptionSection from './_components/subscriptions/SubscriptionSection';
import AddressSection from './_components/address/AddressSection';
import EmptyState from './_components/common/EmptyState';
import Button from '@/components/ui/Button/Button';

import styles from './Dashboard.module.scss';

export default function Dashboard() {
  // This would typically be fetched from an API
  const hasServices = true;
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'subscription', 'address'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Helper function for handling add service action
  const handleAddService = () => {
    console.log('Add service action');
  };
  
  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <DashboardLayout>
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
              <AddressSection />
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
    </DashboardLayout>
  );
}