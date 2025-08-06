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
    icon: 'Sparkles'
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
    serviceType: 'Food',
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
    icon: 'Sparkles'
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
    serviceType: 'Food',
    status: 'upcoming',
    date: 'Tue, Aug 28',
    time: '2:00 PM',
    timeOfDay: 'Afternoon',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Home-cooked meals preparation',
    frequency: 'Bi-weekly',
    isAssigned: true,
    icon: 'CookingPot'
  },
  {
    id: '7',
    serviceType: 'Laundry',
    status: 'completed',
    date: 'Wed, Aug 22',
    time: '11:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dry cleaning and ironing',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'Shirt'
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
    icon: 'Sparkles'
  }
];

interface Tab {
  id: string;
  label: string;
  isActive: boolean;
}

export default function AllOrdersSection() {
  const [serviceFilterTabs, setServiceFilterTabs] = useState<Tab[]>([
    { id: 'upcoming', label: 'UPCOMING', isActive: false },
    { id: 'completed', label: 'COMPLETED', isActive: false },
    { id: 'canceled', label: 'CANCELED', isActive: false },
    { id: 'paused', label: 'PAUSED', isActive: false },
    { id: 'all', label: 'ALL', isActive: true },
  ]);
  
  const activeServiceFilterTab = serviceFilterTabs.find(tab => tab.isActive)?.id || 'all';
  
  const handleServiceFilterTabClick = (clickedTabId: string) => {
    const updatedTabs = serviceFilterTabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setServiceFilterTabs(updatedTabs);
  };
  
  return (
    <div className={styles.allOrders}>
      
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