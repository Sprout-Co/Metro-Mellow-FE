'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import { IconName } from '@/constants/services';
import styles from './SubscriptionCard.module.scss';
import SubscriptionDetails from './SubscriptionDetails';

export interface SubscriptionCardProps {
  id: string;
  serviceType: string;
  status: 'active' | 'canceled' | 'suspended';
  nextBillingDate: string;
  amount: number;
  currency?: string;
  frequency: string[];
  icon?: IconName;
  additionalInfo?: string[];
  onClick?: () => void;
  // Optional fields for expanded details
  startDate?: string;
  endDate?: string;
  lastBilledDate?: string;
  durationWeeks?: number;
  autoRenew?: boolean;
  billingPeriodLabel?: string;
  items?: { name: string; frequency: string[]; price: number }[];
}

export default function SubscriptionCard({
  id,
  serviceType,
  status,
  nextBillingDate,
  amount,
  currency = '₦',
  frequency,
  icon = 'Sparkles',
  additionalInfo,
  onClick,
  startDate,
  endDate,
  lastBilledDate,
  durationWeeks,
  autoRenew,
  billingPeriodLabel,
  items,
}: SubscriptionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const getServiceIcon = () => {
    // Map service types to icons - reusing existing mapping logic
    const iconMap: Record<string, IconName> = {
      'Cleaning': 'Sparkles',
      'Laundry': 'Shirt',
      'Food': 'CookingPot',
      'Pest Control': 'BugOff',
      'Gardening': 'Fence',
      'Errand': 'PersonStanding'
    };
    
    return iconMap[serviceType] || icon;
  };

  const serviceIcon = getServiceIcon();
  const IconComponent = LucideIcons[serviceIcon] as React.ElementType;
  
  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString()}`;
  };

  const handleShowMore = () => {
    setExpanded(true);
    if (onClick) onClick();
  };

  const handleShowLess = () => setExpanded(false);

  return (
    <div className={styles.subscriptionCard}>
      <div className={styles.subscriptionCard__content}>
        {/* Left section with icon and service info */}
        <div className={styles.subscriptionCard__left}>
          <div className={styles.subscriptionCard__iconContainer}>
            <div className={`${styles.subscriptionCard__icon} ${styles[`subscriptionCard__icon--${status}`]}`}>
              {IconComponent && (
                <IconComponent className={styles.subscriptionCard__serviceIcon} />
              )}
            </div>
          </div>
          
          <div className={styles.subscriptionCard__details}>
            <h3 className={styles.subscriptionCard__title}>{serviceType}</h3>
            <div className={styles.subscriptionCard__frequencies}>
              {frequency.map((freq, index) => (
                <span key={index} className={styles.subscriptionCard__frequency}>• {freq}</span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Status badge */}
        <div className={styles.subscriptionCard__statusContainer}>
          <span className={`${styles.subscriptionCard__badge} ${styles[`subscriptionCard__badge--${status}`]}`}>
            • {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        {/* Billing info */}
        <div className={styles.subscriptionCard__billingInfo}>
          <span className={styles.subscriptionCard__label}>Next Billing:</span>
          <span className={styles.subscriptionCard__date}>{nextBillingDate}</span>
        </div>
        
        {/* Price */}
        <div className={styles.subscriptionCard__priceContainer}>
          <div className={styles.subscriptionCard__price}>
            {formatCurrency(amount)}
            <span className={styles.subscriptionCard__frequency}>/Monthly</span>
          </div>
        </div>
        
        {/* Action button */}
        <div className={styles.subscriptionCard__actions}>
          {expanded ? (
            <Button
              className={styles.subscriptionCard__toggleButton}
              onClick={handleShowLess}
              variant="ghost"
              size="sm"
            >
              SHOW LESS ▲
            </Button>
          ) : (
            <Button
              className={styles.subscriptionCard__toggleButton}
              onClick={handleShowMore}
              variant="ghost"
              size="sm"
            >
              SHOW MORE ▼
            </Button>
          )}
        </div>
      </div>
      
      {expanded && (
        <div className={styles.subscriptionCard__additionalInfo}>
          <SubscriptionDetails
            serviceType={serviceType}
            status={status}
            nextBillingDate={nextBillingDate}
            startDate={startDate}
            endDate={endDate}
            totalPrice={amount}
            currency={currency}
            billingPeriodLabel={billingPeriodLabel ?? 'Monthly'}
            lastBilledDate={lastBilledDate ?? nextBillingDate}
            durationWeeks={durationWeeks}
            autoRenew={autoRenew}
            frequency={frequency}
            icon={serviceIcon}
            items={items ?? (additionalInfo || []).map((name) => ({ name, frequency, price: amount }))}
            onCancel={() => {}}
            onPause={() => {}}
            onShowLess={handleShowLess}
          />
        </div>
      )}
    </div>
  );
}