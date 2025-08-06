'use client';

import { useState } from 'react';
import styles from './ServiceCard.module.scss';

export interface ServiceCardProps {
  id: string;
  serviceType: string;
  status: 'upcoming' | 'past' | 'canceled' | 'paused';
  date: string;
  time: string;
  timeOfDay: string;
  location: string;
  additionalInfo?: string;
  frequency: string;
  isAssigned?: boolean;
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
  isAssigned = false
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCancel = () => {
    console.log(`Canceling service ${id}`);
  };

  const handleReschedule = () => {
    console.log(`Rescheduling service ${id}`);
  };

  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceCard__header}>
        <div className={styles.serviceCard__iconContainer}>
          <div className={styles.serviceCard__icon}>
            <span className={styles.serviceCard__emoji}>📅</span>
          </div>
        </div>
        
        <div className={styles.serviceCard__info}>
          <div className={styles.serviceCard__titleRow}>
            <h3 className={styles.serviceCard__title}>{serviceType}</h3>
            <span className={`${styles.serviceCard__badge} ${styles[`serviceCard__badge--${status.toLowerCase()}`]}`}>
              {status}
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
            <button 
              className={styles.serviceCard__toggleButton} 
              onClick={toggleExpand}
              aria-expanded="true"
            >
              SHOW LESS ▲
            </button>
          ) : (
            <button 
              className={styles.serviceCard__toggleButton} 
              onClick={toggleExpand}
              aria-expanded="false"
            >
              SHOW MORE ▼
            </button>
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
                <button 
                  className={styles.serviceCard__rescheduleButton} 
                  onClick={handleReschedule}
                >
                  Reschedule
                </button>
                <button 
                  className={styles.serviceCard__cancelButton} 
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}