// components/booking/PlanOptions.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PlanOptions.module.scss';

// Define plan options
const subscriptionPlans = [
  {
    id: 'one-time',
    name: 'One-Time Service',
    description: 'A single service without commitment',
    icon: '📅',
    discount: 0,
    popular: false,
    frequency: 'Once'
  },
  {
    id: 'weekly',
    name: 'Weekly Plan',
    description: 'Regular service every week',
    icon: '🔄',
    discount: 15,
    popular: true,
    frequency: 'Every week'
  },
  {
    id: 'biweekly',
    name: 'Bi-Weekly Plan',
    description: 'Service every two weeks',
    icon: '📆',
    discount: 10,
    popular: false,
    frequency: 'Every 2 weeks'
  },
  {
    id: 'monthly',
    name: 'Monthly Plan',
    description: 'Service once a month',
    icon: '📅',
    discount: 5,
    popular: false,
    frequency: 'Once a month'
  }
];

export default function PlanOptions() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <section className={styles.planOptions}>
      <div className={styles.planOptions__container}>
        <motion.div 
          className={styles.planOptions__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.planOptions__header}>
            <h2 className={styles.planOptions__title}>Choose Your Plan</h2>
            <p className={styles.planOptions__description}>
              Select a one-time service or save with regular subscriptions
            </p>
          </div>
          
          <div className={styles.planOptions__grid}>
            {subscriptionPlans.map((plan) => (
              <motion.div 
                key={plan.id}
                className={`${styles.planOptions__card} ${selectedPlan === plan.id ? styles['planOptions__card--selected'] : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {plan.popular && (
                  <span className={styles.planOptions__popularTag}>Most Popular</span>
                )}
                
                <div className={styles.planOptions__cardIcon}>{plan.icon}</div>
                <h3 className={styles.planOptions__cardTitle}>{plan.name}</h3>
                <p className={styles.planOptions__cardDescription}>{plan.description}</p>
                
                <div className={styles.planOptions__cardFeatures}>
                  <div className={styles.planOptions__cardFeature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Frequency: {plan.frequency}</span>
                  </div>
                  
                  <div className={styles.planOptions__cardFeature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Easy scheduling</span>
                  </div>
                  
                  <div className={styles.planOptions__cardFeature}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>No long-term contract</span>
                  </div>
                  
                  {plan.discount > 0 && (
                    <div className={styles.planOptions__cardFeature}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className={styles.planOptions__discount}>Save {plan.discount}% on each service</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.planOptions__cardSelect}>
                  {selectedPlan === plan.id ? (
                    <>
                      <span className={styles.planOptions__checkmark}>✓</span>
                      Plan Selected
                    </>
                  ) : (
                    'Select Plan'
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className={styles.planOptions__footer}>
            <p className={styles.planOptions__note}>
              * All subscriptions can be paused or canceled anytime. You'll be charged only after each service is complete.
            </p>
            
            <motion.button 
              className={styles.planOptions__continueButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!selectedPlan}
            >
              Continue to Customization
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}