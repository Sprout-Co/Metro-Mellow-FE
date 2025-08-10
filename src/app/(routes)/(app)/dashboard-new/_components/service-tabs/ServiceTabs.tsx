'use client';

import { useState } from 'react';
import styles from './ServiceTabs.module.scss';

interface Tab {
  id: string;
  label: string;
  isActive: boolean;
}

interface ServiceTabsProps {
  tabs: Tab[];
}

export default function ServiceTabs({ tabs: initialTabs }: ServiceTabsProps) {
  const [tabs, setTabs] = useState(initialTabs);
  
  const handleTabClick = (clickedTabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setTabs(updatedTabs);
  };
  
  return (
    <div className={styles.serviceTabs}>
      <div className={styles.serviceTabs__container}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.serviceTabs__tab} ${tab.isActive ? styles['serviceTabs__tab--active'] : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}