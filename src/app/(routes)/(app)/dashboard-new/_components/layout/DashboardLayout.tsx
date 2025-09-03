'use client';

import { ReactNode } from 'react';
import DashboardHeader from '../header/DashboardHeader';
import DashboardBanner from '../banner/DashboardBanner';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({ children, className = '' }: DashboardLayoutProps) {
  return (
    <div className={`${styles.dashboardLayout} ${className}`}>
      <DashboardHeader />
      <DashboardBanner />
      
      <div className={styles.dashboardLayout__content}>
        <div className={styles.dashboardLayout__container}>
          {children}
        </div>
      </div>
    </div>
  );
}
