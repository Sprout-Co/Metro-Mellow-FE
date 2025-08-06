'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import styles from './ServiceCard.module.scss';
import * as LucideIcons from "lucide-react";
import { IconName } from '@/constants/services';
import CancelOrderButton from '../../cancel-order/CancelOrderButton';

export interface ServiceCardProps {
  id: string;
  serviceType: string;
  status: 'upcoming' | 'completed' | 'canceled' | 'paused';
  date: string;
  time: string;
  timeOfDay: string;
  location: string;
  additionalInfo?: string;
  frequency: string;
  isAssigned?: boolean;
  icon?: IconName;
}

export default function ServiceCard({
  id,
  serviceType,
  status,
  date,
  time,
  timeOfDay,
  location,
  additionalInfo,
  frequency,
  isAssigned = false,
  icon = 'House'
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Cancel functionality moved to CancelOrderButton component

  const handleReschedule = () => {
    console.log(`Rescheduling service ${id}`);
  };
  
  const getServiceIcon = () => {
    // Map service types to icons
    const iconMap: Record<string, IconName> = {
      'Cleaning': 'Sparkles',
      'Laundry': 'Shirt',
      'Food': 'CookingPot',
      'Pest Control': 'BugOff',
    };
    
    return iconMap[serviceType] || icon;
  };
  
  const serviceIcon = getServiceIcon();
  const IconComponent = LucideIcons[serviceIcon] as React.ElementType;

  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceCard__header}>
        <div className={styles.serviceCard__iconContainer}>
          <div className={`${styles.serviceCard__icon} ${styles[`serviceCard__icon--${status}`]}`}>
            {IconComponent ? (
              <IconComponent className={`${styles.serviceCard__serviceIcon} ${styles[`serviceCard__serviceIcon--${status}`]}`} />
            ) : (
              <span className={styles.serviceCard__emoji}>🧹</span>
            )}
          </div>
        </div>
        
        <div className={styles.serviceCard__info}>
          <div className={styles.serviceCard__titleRow}>
            <h3 className={styles.serviceCard__title}>{serviceType}</h3>
            <span className={`${styles.serviceCard__badge} ${styles[`serviceCard__badge--${status.toLowerCase()}`]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          <div className={styles.serviceCard__details}>
            <div className={styles.serviceCard__dateTime}>
              <span className={styles.serviceCard__date}>• {date}</span>
              <span className={styles.serviceCard__time}>• {time} ({timeOfDay})</span>
            </div>
          </div>
        </div>

        <div className={styles.serviceCard__actions}>
          {expanded ? (
            <Button 
              className={styles.serviceCard__toggleButton} 
              onClick={toggleExpand}
              aria-expanded="true"
              variant="ghost"
              size="sm"
            >
              Show Less ▲
            </Button>
          ) : (
            <Button 
              className={styles.serviceCard__toggleButton} 
              onClick={toggleExpand}
              aria-expanded="false"
              variant="ghost"
              size="sm"
            >
              Show More ▼
            </Button>
          )}
        </div>
      </div>
      
      {expanded && (
        <div className={styles.serviceCard__expandedContent}>
          <div className={styles.serviceCard__detailsGrid}>
            <div className={styles.serviceCard__detailItem}>
              <span className={styles.serviceCard__label}>Location</span>
              <span className={styles.serviceCard__value}>{location}</span>
            </div>
            
            {additionalInfo && (
              <div className={styles.serviceCard__detailItem}>
                <span className={styles.serviceCard__label}>Notes</span>
                <span className={styles.serviceCard__value}>{additionalInfo}</span>
              </div>
            )}
            
            <div className={styles.serviceCard__detailItem}>
              <span className={styles.serviceCard__label}>Frequency</span>
              <span className={styles.serviceCard__value}>{frequency}</span>
            </div>
          </div>
          
          <div className={styles.serviceCard__sidebar}>
            {!isAssigned && status === 'upcoming' && (
              <div className={styles.serviceCard__status}>
                <div className={styles.serviceCard__statusIcon}>
                  <div className={styles.serviceCard__loadingSpinner}></div>
                </div>
                <span className={styles.serviceCard__statusText}>waiting to be assigned</span>
              </div>
            )}
            
            {status === 'upcoming' && (
              <div className={styles.serviceCard__buttonGroup}>
                <Button 
                  className={styles.serviceCard__rescheduleButton}
                  onClick={handleReschedule}
                  fullWidth
                >
                  Reschedule
                </Button>
                <CancelOrderButton
                  orderId={id}
                  className={styles.serviceCard__cancelButton}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}