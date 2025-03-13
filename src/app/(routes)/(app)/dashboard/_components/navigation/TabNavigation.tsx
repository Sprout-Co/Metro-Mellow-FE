'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './TabNavigation.module.scss';

type TabType = {
  id: string;
  label: string;
  icon: string;
};

type TabNavigationProps = {
  tabs: TabType[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export default function TabNavigation({ 
  tabs, 
  activeTab, 
  onTabChange 
}: TabNavigationProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (tabsRef.current && activeTabRef.current) {
      const tabsEl = tabsRef.current;
      const activeTabEl = activeTabRef.current;
      
      const tabsRect = tabsEl.getBoundingClientRect();
      const activeTabRect = activeTabEl.getBoundingClientRect();
      
      const isVisible = 
        activeTabRect.left >= tabsRect.left &&
        activeTabRect.right <= tabsRect.right;
      
      if (!isVisible) {
        const scrollLeft = 
          activeTabEl.offsetLeft - 
          tabsEl.offsetWidth / 2 + 
          activeTabEl.offsetWidth / 2;
        
        tabsEl.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__container} ref={tabsRef}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={tab.id === activeTab ? activeTabRef : null}
            className={`${styles.tabs__tab} ${
              tab.id === activeTab ? styles['tabs__tab--active'] : ''
            }`}
            onClick={() => onTabChange(tab.id)}
            aria-selected={tab.id === activeTab}
          >
            <Icon name={tab.icon} className={styles.tabs__tabIcon} />
            <span className={styles.tabs__tabLabel}>{tab.label}</span>
            
            {tab.id === activeTab && (
              <motion.div
                className={styles.tabs__tabIndicator}
                layoutId="tab-indicator"
                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}