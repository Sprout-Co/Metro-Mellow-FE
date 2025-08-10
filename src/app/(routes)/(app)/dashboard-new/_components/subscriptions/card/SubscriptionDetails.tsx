'use client';

import React from 'react';
import Button from '@/components/ui/Button/Button';
import * as LucideIcons from 'lucide-react';
import { IconName } from '@/constants/services';
import styles from './SubscriptionDetails.module.scss';

export interface SubscriptionLineItem {
  name: string;
  frequency: string[];
  price: number;
}

export interface SubscriptionDetailsProps {
  serviceType: string;
  status: 'active' | 'canceled' | 'suspended';
  nextBillingDate: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  currency?: string;
  billingPeriodLabel?: string; // e.g. Monthly
  lastBilledDate?: string;
  durationWeeks?: number; // formats to "x weeks"
  autoRenew?: boolean;
  frequency: string[];
  icon?: IconName;
  items?: SubscriptionLineItem[];
  onCancel?: () => void;
  onPause?: () => void;
  onShowLess?: () => void;
}

const getIconByService = (serviceType: string, fallback?: IconName): IconName => {
  const iconMap: Record<string, IconName> = {
    Cleaning: 'Sparkles',
    Laundry: 'Shirt',
    Food: 'CookingPot',
    'Pest Control': 'BugOff',
    Gardening: 'Fence',
    Errand: 'PersonStanding',
  };
  return iconMap[serviceType] || (fallback ?? 'Sparkles');
};

const formatCurrency = (amount: number, currency = '₦') => `${currency}${amount.toLocaleString()}`;

export default function SubscriptionDetails({
  serviceType,
  status,
  nextBillingDate,
  startDate,
  endDate,
  totalPrice,
  currency = '₦',
  billingPeriodLabel = 'Monthly',
  lastBilledDate,
  durationWeeks,
  autoRenew,
  frequency,
  icon,
  items = [],
  onCancel,
  onPause,
  onShowLess,
}: SubscriptionDetailsProps) {
  const serviceIcon = getIconByService(serviceType, icon);
  const IconComponent = LucideIcons[serviceIcon] as React.ElementType | undefined;

  return (
    <div className={styles.details}>
      <div className={styles.details__headerRow}>
        <div className={styles.details__left}>
          <div className={`${styles.details__icon} ${styles[`details__icon--${status}`]}`}>
            {IconComponent ? <IconComponent className={styles.details__serviceIcon} /> : null}
          </div>
          <div className={styles.details__titleWrap}>
            <h4 className={styles.details__title}>{serviceType}</h4>
            <div className={styles.details__freqRow}>
              {frequency.map((freq, i) => (
                <span key={i} className={styles.details__freq}>• {freq}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.details__showLess}>
          <Button variant="ghost" size="sm" className={styles.details__toggleButton} onClick={onShowLess}>
            SHOW LESS ▲
          </Button>
        </div>
      </div>

      {/* Four equal columns, each with two fields, matching the reference layout */}
      <div className={styles.details__grid}
        role="group"
        aria-label="Subscription summary details"
      >
        <div className={styles.details__col}>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Status:</span>
            <span className={`${styles.details__status} ${styles[`details__status--${status}`]}`}>
              {status === 'active' ? 'Active' : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Next Billing:</span>
            <span className={styles.details__value}>{nextBillingDate}</span>
          </div>
        </div>

        <div className={styles.details__col}>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Start Date:</span>
            <span className={styles.details__value}>{startDate ?? '-'}</span>
          </div>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Total Price</span>
            {typeof totalPrice === 'number' ? (
              <span className={styles.details__value}>
                {formatCurrency(totalPrice, currency)}
                <span className={styles.details__period}>/{billingPeriodLabel}</span>
              </span>
            ) : (
              <span className={styles.details__value}>-</span>
            )}
          </div>
        </div>

        <div className={styles.details__col}>
          <div className={styles.details__field}>
            <span className={styles.details__label}>End Date:</span>
            <span className={styles.details__value}>{endDate ?? '-'}</span>
          </div>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Last Billed:</span>
            <span className={styles.details__value}>{lastBilledDate ?? '-'}</span>
          </div>
        </div>

        <div className={styles.details__col}>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Duration</span>
            <span className={styles.details__value}>{typeof durationWeeks === 'number' ? `${durationWeeks} weeks` : '-'}</span>
          </div>
          <div className={styles.details__field}>
            <span className={styles.details__label}>Auto-renew:</span>
            <span className={styles.details__value}>{typeof autoRenew === 'boolean' ? (autoRenew ? 'Yes' : 'No') : '-'}</span>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <div className={styles.details__items}>
          {items.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className={styles.details__itemRow}>
              <div className={styles.details__itemLeft}>
                {(() => {
                  const itemIconName = getIconByService(item.name, icon);
                  const ItemIcon = (LucideIcons[itemIconName] as React.ElementType) || undefined;
                  return (
                    <div className={`${styles.details__miniIcon} ${styles[`details__miniIcon--variant-${(idx % 3) + 1}`]}`}>
                      {ItemIcon ? <ItemIcon className={styles.details__miniIconIcon} /> : null}
                    </div>
                  );
                })()}
                <div className={styles.details__itemText}>
                  <div className={styles.details__itemName}>{item.name}</div>
                  <div className={styles.details__itemFreqRow}>
                    {item.frequency.map((f, i) => (
                      <span key={i} className={styles.details__itemFreq}>• {f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.details__itemRight}>
                <div className={styles.details__itemPriceLabel}>Price</div>
                <div className={styles.details__itemPrice}>{formatCurrency(item.price, currency)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.details__actions}>
        <Button className={styles.details__cancel} onClick={onCancel}>
          CANCEL
        </Button>
        <Button variant="secondary" className={styles.details__pause} onClick={onPause}>
          PAUSE
        </Button>
      </div>
    </div>
  );
}


