'use client';

import { useEffect } from 'react';
import DashboardHeader from './_components/header/DashboardHeader';
import DashboardBanner from './_components/banner/DashboardBanner';
import NavigationTabs from './_components/navigation/NavigationTabs';
import ServiceTabs from './_components/service-tabs/ServiceTabs';
import QuickActions from './_components/quick-actions/QuickActions';
import EmptyState from './_components/empty-state/EmptyState';
import CTAButton from './_components/cta/CTAButton';

import styles from './Dashboard.module.scss';

export default function Dashboard() {
  // This would typically be fetched from an API
  const hasServices = false;

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
              <ServiceTabs 
                tabs={[
                  { id: 'upcoming', label: 'UPCOMING', isActive: true },
                  { id: 'past', label: 'PAST', isActive: false },
                  { id: 'canceled', label: 'CANCELED', isActive: false },
                  { id: 'paused', label: 'PAUSED', isActive: false },
                  { id: 'all', label: 'ALL', isActive: false },
                ]} 
              />
              
              <div className={styles.dashboard__serviceContent}>
                {!hasServices && <EmptyState />}
              </div>
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