'use client';

import { useState } from 'react';
import styles from './NavigationTabs.module.scss';

interface Tab {
  id: string;
  label: string;
  isActive: boolean;
}

interface NavigationTabsProps {
  tabs: Tab[];
}

export default function NavigationTabs({ tabs: initialTabs }: NavigationTabsProps) {
  const [tabs, setTabs] = useState(initialTabs);
  
  const handleTabClick = (clickedTabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setTabs(updatedTabs);
  };
  
  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__container}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabs__tab} ${tab.isActive ? styles['tabs__tab--active'] : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}