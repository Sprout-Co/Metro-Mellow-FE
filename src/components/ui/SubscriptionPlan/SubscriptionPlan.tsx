"use client";

import React, { useState } from 'react';
import styles from './SubscriptionPlan.module.scss';
import { BillingCycle } from '@/graphql/api';

export interface Service {
  id: string;
  name: string;
  selected: boolean;
}

export interface SubscriptionPlanProps {
  onServiceSelect?: (serviceId: string) => void;
  onFrequencyChange?: (frequency: BillingCycle) => void;
  onQuantityChange?: (quantity: number) => void;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  onServiceSelect,
  onFrequencyChange,
  onQuantityChange
}) => {
  const [activeFrequency, setActiveFrequency] = useState<BillingCycle>(BillingCycle.Monthly);
  const [quantity, setQuantity] = useState<number>(1);
  const [services, setServices] = useState<Service[]>([
    { id: 'cleaning', name: 'Cleaning', selected: true },
    { id: 'laundry', name: 'Laundry', selected: false },
    { id: 'food', name: 'Food', selected: false },
    { id: 'pest-control', name: 'Pest Control', selected: false },
  ]);

  const handleFrequencyChange = (frequency: BillingCycle) => {
    setActiveFrequency(frequency);
    if (onFrequencyChange) {
      onFrequencyChange(frequency);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  const toggleService = (serviceId: string) => {
    const updatedServices = services.map(service => 
      service.id === serviceId ? { ...service, selected: !service.selected } : service
    );
    setServices(updatedServices);
    if (onServiceSelect) {
      onServiceSelect(serviceId);
    }
  };

  // Check if any services are selected
  const hasSelectedServices = services.some(service => service.selected);
  
  return (
    <div className={styles.subscription__container}>
      <div className={styles.subscription__left}>
        <div className={styles.subscription__frequency}>
          <button 
            className={`${styles.subscription__tab} ${activeFrequency === BillingCycle.Monthly ? styles.subscription__tab_active : ''}`}
            onClick={() => handleFrequencyChange(BillingCycle.Monthly)}
          >
            MONTHLY
          </button>
          <button 
            className={`${styles.subscription__tab} ${activeFrequency === BillingCycle.Quarterly ? styles.subscription__tab_active : ''}`}
            onClick={() => handleFrequencyChange(BillingCycle.Quarterly)}
          >
            QUARTERLY
          </button>
        </div>

        <div className={styles.subscription__quantity}>
          <button 
            className={styles.subscription__button} 
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className={styles.subscription__counter}>{quantity}</span>
          <button 
            className={styles.subscription__button}
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>

        <div className={styles.subscription__services}>
          <h3 className={styles.subscription__services_title}>Select your services</h3>
          <div className={styles.subscription__services_grid}>
            {services.map(service => (
              <div 
                key={service.id}
                className={`${styles.subscription__service} ${service.selected ? styles.subscription__service_selected : ''}`}
                onClick={() => toggleService(service.id)}
              >
                <div className={styles.subscription__service_icon}>
                  {service.selected && <span className={styles.subscription__service_check}>✓</span>}
                </div>
                <span className={styles.subscription__service_name}>{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.subscription__right}>
        <div className={styles.subscription__summary}>
          {!hasSelectedServices ? (
            <div className={styles.subscription__empty}>
              <div className={styles.subscription__empty_image}>
                <img src="/images/general/sign.png" alt="No plans" />
              </div>
              <p className={styles.subscription__empty_text}>No plans summary... yet.</p>
            </div>
          ) : (
            <div className={styles.subscription__details}>
              <h3 className={styles.subscription__details_title}>Selected Services</h3>
              <ul className={styles.subscription__details_list}>
                {services.filter(s => s.selected).map(service => (
                  <li key={service.id} className={styles.subscription__details_item}>
                    {service.name}
                  </li>
                ))}
              </ul>
              <div className={styles.subscription__total}>
                <span className={styles.subscription__total_label}>
                  {activeFrequency === BillingCycle.Monthly ? 'Monthly' : 'Quarterly'} Total:
                </span>
                <span className={styles.subscription__total_price}>
                  ₦{(quantity * services.filter(s => s.selected).length * 15000).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
