"use client";

import React from 'react';
import styles from './PlanSummary.module.scss';
import { BillingCycle } from '@/graphql/api';
import { ServiceItem } from '../ServiceSelector/ServiceSelector';

interface PlanSummaryProps {
  services: ServiceItem[];
  activeFrequency: BillingCycle;
  quantity: number;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({ 
  services,
  activeFrequency,
  quantity
}) => {
  // Check if any services are selected
  const selectedServices = services.filter(service => service.selected);
  const hasSelectedServices = selectedServices.length > 0;
  
  // Calculate total price (using a placeholder price of 15000 per service)
  const totalPrice = quantity * selectedServices.length * 15000;

  return (
    <div className={styles.summary}>
      {!hasSelectedServices ? (
        <div className={styles.summary__empty}>
          <div className={styles.summary__empty_image}>
            <img src="/images/general/sign.png" alt="No plans" />
          </div>
          <p className={styles.summary__empty_text}>No plans summary... yet.</p>
        </div>
      ) : (
        <div className={styles.summary__details}>
          <h3 className={styles.summary__details_title}>Selected Services</h3>
          <ul className={styles.summary__details_list}>
            {selectedServices.map(service => (
              <li key={service.id} className={styles.summary__details_item}>
                {service.name}
              </li>
            ))}
          </ul>
          <div className={styles.summary__total}>
            <span className={styles.summary__total_label}>
              {activeFrequency === BillingCycle.Monthly ? 'Monthly' : 'Quarterly'} Total:
            </span>
            <span className={styles.summary__total_price}>
              ₦{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSummary;
