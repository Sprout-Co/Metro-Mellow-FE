"use client";

import React, { useState } from 'react';
import styles from './SubscriptionPlan.module.scss';
import { BillingCycle } from '@/graphql/api';
import FrequencySelector from './FrequencySelector/FrequencySelector';
import QuantitySelector from './QuantitySelector/QuantitySelector';
import ServiceSelector, { ServiceItem } from './ServiceSelector/ServiceSelector';
import DurationSelector from './DurationSelector/DurationSelector';
import PlanSummary from './PlanSummary/PlanSummary';

export interface SubscriptionPlanProps {
  onServiceSelect?: (serviceId: string) => void;
  onFrequencyChange?: (frequency: BillingCycle) => void;
  onQuantityChange?: (quantity: number) => void;
  onDurationChange?: (duration: number) => void;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  onServiceSelect,
  onFrequencyChange,
  onQuantityChange,
  onDurationChange
}) => {
  const [activeFrequency, setActiveFrequency] = useState<BillingCycle>(BillingCycle.Monthly);
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [services, setServices] = useState<ServiceItem[]>([
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

  const handleServiceSelect = (serviceId: string) => {
    const updatedServices = services.map(service => 
      service.id === serviceId ? { ...service, selected: !service.selected } : service
    );
    setServices(updatedServices);
    if (onServiceSelect) {
      onServiceSelect(serviceId);
    }
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    if (onDurationChange) {
      onDurationChange(newDuration);
    }
  };
  
  return (
    <div className={styles.subscription__container}>
      <div className={styles.subscription__left}>
        <FrequencySelector 
          activeFrequency={activeFrequency}
          onFrequencyChange={handleFrequencyChange}
        />
        
        <QuantitySelector 
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
        
        <ServiceSelector 
          services={services}
          onServiceSelect={handleServiceSelect}
        />
        
        <DurationSelector 
          billingCycle={activeFrequency}
          duration={duration}
          onDurationChange={handleDurationChange}
        />
      </div>
      
      <div className={styles.subscription__right}>
        <PlanSummary 
          services={services}
          activeFrequency={activeFrequency}
          quantity={quantity}
          duration={duration}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlan;
