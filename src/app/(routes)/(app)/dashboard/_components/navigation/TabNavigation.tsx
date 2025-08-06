'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './TabNavigation.module.scss';

interface TabType {
  id: string;
  label: string;
  icon: string;
}

interface TabNavigationProps {
  tabs: TabType[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className={styles.tabs}>
      <div className={styles.tabs__container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabs__tab} ${activeTab === tab.id ? styles['tabs__tab--active'] : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
          >
            <Icon name={tab.icon} className={styles.tabs__icon} />
            <span className={styles.tabs__label}>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                className={styles.tabs__indicator}
                layoutId="tab-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}