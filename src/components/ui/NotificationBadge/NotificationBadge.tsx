'use client';

import React from 'react';
import { useNotifications } from '@/components/providers/NotificationProvider';
import styles from './NotificationBadge.module.scss';

interface NotificationBadgeProps {
  className?: string;
  showCount?: boolean;
  maxCount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger';
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  className = '',
  showCount = true,
  maxCount = 99,
  size = 'md',
  variant = 'primary'
}) => {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0) {
    return null;
  }

  const displayCount = unreadCount > maxCount ? `${maxCount}+` : unreadCount.toString();

  return (
    <span 
      className={`
        ${styles.badge} 
        ${styles[size]} 
        ${styles[variant]} 
        ${className}
      `.trim()}
      aria-label={`${unreadCount} unread notifications`}
      role="status"
    >
      {showCount ? displayCount : ''}
    </span>
  );
};

export default NotificationBadge;