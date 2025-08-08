"use client";

import React, { useState, useMemo } from 'react';
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

// Service configuration with pricing and details
const SERVICE_CONFIG = {
  cleaning: {
    name: 'Cleaning',
    plan: 'Standard Cleaning',
    basePrice: 15000,
    frequency: 'Once a week',
    details: {
      'Service Type': 'Standard Cleaning',
      'Duration': '2-3 hours',
      'Areas': 'Living room, Kitchen, Bathroom',
      'Supplies': 'Included'
    }
  },
  laundry: {
    name: 'Laundry',
    plan: 'Premium Laundry',
    basePrice: 8000,
    frequency: 'Once a week',
    details: {
      'Service Type': 'Wash & Iron',
      'Items': 'Up to 15 pieces',
      'Detergent': 'Premium included',
      'Delivery': 'Free'
    }
  },
  food: {
    name: 'Food',
    plan: 'Meal Plan',
    basePrice: 25000,
    frequency: '5 days a week',
    details: {
      'Meals': 'Lunch & Dinner',
      'Portions': '2 per meal',
      'Dietary': 'Customizable',
      'Delivery': 'Daily'
    }
  },
  'pest-control': {
    name: 'Pest Control',
    plan: 'Comprehensive',
    basePrice: 12000,
    frequency: 'Monthly',
    details: {
      'Service Type': 'Full Treatment',
      'Coverage': 'Entire property',
      'Warranty': '3 months',
      'Follow-up': 'Included'
    }
  }
};

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

  // Transform selected services into detailed format for PlanSummary
  const detailedServices = useMemo(() => {
    return services
      .filter(service => service.selected)
      .map(service => {
        const config = SERVICE_CONFIG[service.id as keyof typeof SERVICE_CONFIG];
        if (!config) return null;

        // Calculate price based on frequency and quantity
        let price = config.basePrice;
        if (activeFrequency === BillingCycle.Quarterly) {
          price = config.basePrice * 3 * 0.95; // 5% discount for quarterly
        }
        
        // Apply quantity multiplier
        price = price * quantity;

        return {
          id: service.id,
          type: service.id as 'food' | 'cleaning' | 'laundry' | 'pest-control',
          name: config.name,
          plan: config.plan,
          price: Math.round(price),
          frequency: config.frequency,
          details: config.details
        };
      })
      .filter(Boolean) as any[];
  }, [services, activeFrequency, quantity]);

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
          services={detailedServices}
          onEdit={() => {
            // This will trigger editing mode - you can implement the logic here
            console.log('Edit service clicked');
          }}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlan;
