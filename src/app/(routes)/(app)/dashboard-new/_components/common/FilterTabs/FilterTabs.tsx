'use client';

import { useState } from 'react';
import styles from './FilterTabs.module.scss';

// Tab interface
export interface FilterTab {
  id: string;
  label: string;
  isActive: boolean;
}

// Component props
export interface FilterTabsProps {
  tabs: FilterTab[];
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export default function FilterTabs({ tabs: initialTabs, onTabChange, className = '' }: FilterTabsProps) {
  const [tabs, setTabs] = useState<FilterTab[]>(initialTabs);
  
  const handleTabClick = (clickedTabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === clickedTabId
    }));
    
    setTabs(updatedTabs);
    
    // Call the parent component's onTabChange if provided
    if (onTabChange) {
      onTabChange(clickedTabId);
    }
  };
  
  return (
    <div className={`${styles.filterTabs} ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.filterTabs__tab} ${tab.isActive ? styles['filterTabs__tab--active'] : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}