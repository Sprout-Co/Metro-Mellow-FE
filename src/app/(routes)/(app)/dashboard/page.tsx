'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from './_components/header/DashboardHeader';
import TabNavigation from './_components/navigation/TabNavigation';
import DashboardOverview from './_components/overview/DashboardOverview';
import ServiceManagement from './_components/services/ServiceManagement';
import PropertyManagement from './_components/properties/PropertyManagement';
import PaymentBilling from './_components/billing/PaymentBilling';
import ProviderInteraction from './_components/providers/ProviderInteraction';
import AccountSettings from './_components/settings/AccountSettings';
import RewardsLoyalty from './_components/rewards/RewardsLoyalty';
import HelpSupport from './_components/support/HelpSupport';
import styles from './Dashboard.module.scss';

// Tab type definition
type TabType = {
  id: string;
  label: string;
  icon: string;
};

// Dashboard tabs configuration
const dashboardTabs: TabType[] = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'services', label: 'Services', icon: 'calendar' },
  // { id: 'properties', label: 'Properties', icon: 'building' },
  // { id: 'billing', label: 'Billing', icon: 'credit-card' },
  // { id: 'providers', label: 'Providers', icon: 'users' },
  // { id: 'settings', label: 'Settings', icon: 'settings' },
  // { id: 'rewards', label: 'Rewards', icon: 'gift' },
  // { id: 'help', label: 'Help', icon: 'help-circle' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Animation variants for tab content
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: 'easeOut' 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3, 
        ease: 'easeIn' 
      } 
    }
  };

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      
      <main className={styles.dashboard__main}>
        <TabNavigation 
          tabs={dashboardTabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className={styles.dashboard__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className={styles.dashboard__tabContent}
            >
              {activeTab === 'overview' && <DashboardOverview />}
              {activeTab === 'services' && <ServiceManagement />}
              {activeTab === 'properties' && <PropertyManagement />}
              {activeTab === 'billing' && <PaymentBilling />}
              {activeTab === 'providers' && <ProviderInteraction />}
              {activeTab === 'settings' && <AccountSettings />}
              {activeTab === 'rewards' && <RewardsLoyalty />}
              {activeTab === 'help' && <HelpSupport />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}