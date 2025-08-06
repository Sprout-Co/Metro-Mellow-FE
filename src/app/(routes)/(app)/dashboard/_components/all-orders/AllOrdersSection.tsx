'use client';

import { useState } from 'react';
import ServiceList from '../services/list/ServiceList';
import { ServiceCardProps } from '../services/card/ServiceCard';
import styles from './AllOrdersSection.module.scss';

// Mock data for services with different service types
const mockAllOrders: ServiceCardProps[] = [
  {
    id: '1',
    serviceType: 'Cleaning',
    status: 'upcoming',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Deep cleaning for the entire house',
    frequency: 'One-time off',
    isAssigned: false,
    icon: 'House'
  },
  {
    id: '2',
    serviceType: 'Laundry',
    status: 'completed',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Includes ironing and folding services',
    frequency: 'Weekly',
    isAssigned: true,
    icon: 'Shirt'
  },
  {
    id: '3',
    serviceType: 'Cooking',
    status: 'canceled',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Traditional Nigerian dishes',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'CookingPot'
  },
  {
    id: '4',
    serviceType: 'Cleaning',
    status: 'upcoming',
    date: 'Mon, Aug 27',
    time: '10:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Focus on bathroom and kitchen',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'House'
  },
  {
    id: '5',
    serviceType: 'Pest Control',
    status: 'completed',
    date: 'Fri, Aug 24',
    time: '9:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Treatment for ants and cockroaches',
    frequency: 'Monthly',
    isAssigned: true,
    icon: 'BugOff'
  },
  {
    id: '6',
    serviceType: 'Gardening',
    status: 'upcoming',
    date: 'Tue, Aug 28',
    time: '2:00 PM',
    timeOfDay: 'Afternoon',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Lawn mowing and plant trimming',
    frequency: 'Bi-weekly',
    isAssigned: true,
    icon: 'Fence'
  },
  {
    id: '7',
    serviceType: 'Errand',
    status: 'completed',
    date: 'Wed, Aug 22',
    time: '11:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Grocery shopping and pharmacy pickup',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'PersonStanding'
  },
  {
    id: '8',
    serviceType: 'Cleaning',
    status: 'canceled',
    date: 'Thu, Aug 23',
    time: '1:00 PM',
    timeOfDay: 'Afternoon',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Window cleaning and dusting',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'House'
  }
];

interface Tab {
  id: string;
  label: string;
  isActive: boolean;
}

export default function AllOrdersSection() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'overview', label: 'OVERVIEW', isActive: true },
    { id: 'subscription', label: 'SUBSCRIPTION', isActive: false },
    { id: 'address', label: 'ADDRESS', isActive: false },
  ]);
  
  const [serviceFilterTabs, setServiceFilterTabs] = useState<Tab[]>([
    { id: 'upcoming', label: 'UPCOMING', isActive: false },
    { id: 'past', label: 'PAST', isActive: false },
    { id: 'canceled', label: 'CANCELED', isActive: false },
    { id: 'paused', label: 'PAUSED', isActive: false },
    { id: 'all', label: 'ALL', isActive: true },
  ]);
  
  const activeTab = tabs.find(tab => tab.isActive)?.id || 'overview';
  const activeServiceFilterTab = serviceFilterTabs.find(tab => tab.isActive)?.id || 'all';
  
  const handleTabClick = (clickedTabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setTabs(updatedTabs);
  };
  
  const handleServiceFilterTabClick = (clickedTabId: string) => {
    const updatedTabs = serviceFilterTabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setServiceFilterTabs(updatedTabs);
  };
  
  return (
    <div className={styles.allOrders}>
      <div className={styles.allOrders__tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.allOrders__tab} ${tab.isActive ? styles['allOrders__tab--active'] : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.allOrders__serviceFilterTabs}>
        {serviceFilterTabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.allOrders__serviceFilterTab} ${tab.isActive ? styles['allOrders__serviceFilterTab--active'] : ''}`}
            onClick={() => handleServiceFilterTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.allOrders__content}>
        <ServiceList services={mockAllOrders} activeTab={activeServiceFilterTab} />
      </div>
    </div>
  );
}