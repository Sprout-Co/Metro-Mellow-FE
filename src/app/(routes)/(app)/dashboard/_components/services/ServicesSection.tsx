'use client';

import { useState } from 'react';
import ServiceList from './list/ServiceList';
import { ServiceCardProps } from './card/ServiceCard';
import styles from './ServicesSection.module.scss';

// Mock data for services with different service types
const mockServices: ServiceCardProps[] = [
  {
    id: '1',
    serviceType: 'Cleaning',
    status: 'upcoming',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
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
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
    frequency: 'One-time off',
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
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'CookingPot'
  },
  {
    id: '4',
    serviceType: 'Cleaning',
    status: 'upcoming',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'House'
  },
  {
    id: '5',
    serviceType: 'Pest Control',
    status: 'completed',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'BugOff'
  },
  {
    id: '6',
    serviceType: 'Food',
    status: 'upcoming',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'CookingPot'
  },
  {
    id: '7',
    serviceType: 'Laundry',
    status: 'completed',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
    frequency: 'One-time off',
    isAssigned: true,
    icon: 'Shirt'
  },
  {
    id: '8',
    serviceType: 'Cleaning',
    status: 'canceled',
    date: 'Sat, Aug 25',
    time: '8:00 AM',
    timeOfDay: 'Morning',
    location: '7, Abisogun Street, Highcost, Barnawa, Lagos',
    additionalInfo: 'Dolor hic tibi proderit olim Lorem ipsure connectur ammet eget vivvera',
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

export default function ServicesSection() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'upcoming', label: 'UPCOMING', isActive: false },
    { id: 'completed', label: 'COMPLETED', isActive: false },
    { id: 'canceled', label: 'CANCELED', isActive: false },
    { id: 'paused', label: 'PAUSED', isActive: false },
    { id: 'all', label: 'ALL', isActive: true },
  ]);
  
  const activeTab = tabs.find(tab => tab.isActive)?.id || 'all';
  
  const handleTabClick = (clickedTabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setTabs(updatedTabs);
  };
  
  return (
    <div className={styles.services}>
      <div className={styles.services__tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.services__tab} ${tab.isActive ? styles['services__tab--active'] : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className={styles.services__content}>
        <ServiceList services={mockServices} activeTab={activeTab} />
      </div>
    </div>
  );
}