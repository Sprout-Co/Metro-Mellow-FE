'use client';

import { useEffect } from 'react';
import DashboardHeader from './_components/header/DashboardHeader';
import DashboardBanner from './_components/banner/DashboardBanner';
import NavigationTabs from './_components/navigation/NavigationTabs';
import ServicesSection from './_components/services/ServicesSection';
import AllOrdersSection from './_components/all-orders/AllOrdersSection';
import QuickActions from './_components/quick-actions/QuickActions';
import CTAButton from './_components/cta/CTAButton';

import styles from './Dashboard.module.scss';

export default function Dashboard() {
  // This would typically be fetched from an API
  const hasServices = true;

  const EmptyState = () => (
    <div className={styles.dashboard__emptyState}>
      <p>No services found.</p>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <DashboardBanner />
      
      <div className={styles.dashboard__content}>
        <div className={styles.dashboard__container}>
          <NavigationTabs 
            tabs={[
              { id: 'overview', label: 'OVERVIEW', isActive: true },
              { id: 'subscription', label: 'SUBSCRIPTION', isActive: false },
              { id: 'address', label: 'ADDRESS', isActive: false },
            ]} 
          />
          
          <div className={styles.dashboard__main}>
            <div className={styles.dashboard__services}>
              {hasServices ? <AllOrdersSection /> : <EmptyState />}
            </div>
            
            <div className={styles.dashboard__sidebar}>
              <QuickActions />
            </div>
          </div>
          
          <div className={styles.dashboard__cta}>
            <CTAButton />
          </div>
        </div>
      </div>
    </div>
  );
}