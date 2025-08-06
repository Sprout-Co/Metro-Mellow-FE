'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './CookingPlans.module.scss';

interface PlanOption {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
  price: {
    value: number;
    unit: string;
  };
  meals: number;
  servings: number;
  features: string[];
}

interface PlanFrequency {
  id: string;
  label: string;
  discount: number;
}

const CookingPlans = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const planFrequencies: PlanFrequency[] = [
    { id: 'weekly', label: 'Weekly', discount: 0 },
    { id: 'biweekly', label: 'Bi-Weekly', discount: 5 },
    { id: 'monthly', label: 'Monthly', discount: 10 }
  ];
  
  const [activeFrequency, setActiveFrequency] = useState<string>(planFrequencies[0].id);
  
  const plans: PlanOption[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals or couples who want to enjoy chef-prepared meals a few times a week',
      price: {
        value: 59,
        unit: 'week'
      },
      meals: 3,
      servings: 2,
      features: [
        '3 meals per week (2 servings each)',
        'Choose from 10 weekly recipes',
        'Customizable protein options',
        'Free delivery',
        'No commitment - cancel anytime'
      ]
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Ideal for families seeking convenient, nutritious meals throughout the week',
      popular: true,
      price: {
        value: 129,
        unit: 'week'
      },
      meals: 5,
      servings: 4,
      features: [
        '5 meals per week (4 servings each)',
        'Choose from all 20 weekly recipes',
        'Customizable protein options',
        'Kid-friendly menu options',
        'Free delivery',
        'Flexibility to skip weeks',
        'No commitment - cancel anytime'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Comprehensive meal solution for those who want variety and gourmet options',
      price: {
        value: 179,
        unit: 'week'
      },
      meals: 7,
      servings: 4,
      features: [
        '7 meals per week (4 servings each)',
        'Full access to all recipes including premium options',
        'Priority selection of seasonal specials',
        'Customizable protein and sides',
        'Includes breakfast options',
        'Free priority delivery',
        'Dedicated account manager',
        'No commitment - cancel anytime'
      ]
    }
  ];

  const getDiscountedPrice = (basePrice: number, frequency: string): number => {
    const selectedFrequency = planFrequencies.find(freq => freq.id === frequency);
    if (selectedFrequency && selectedFrequency.discount) {
      return basePrice * (1 - selectedFrequency.discount / 100);
    }
    return basePrice;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section id="plans" className={styles.plans} ref={sectionRef}>
      <div className={styles.plans__container}>
        <motion.div 
          className={styles.plans__heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut"
            }
          } : { opacity: 0, y: 20 }}
        >
          <span className={styles.plans__subheading}>Meal Plans</span>
          <h2 className={styles.plans__title}>Subscription Options</h2>
          <p className={styles.plans__description}>
            Choose the perfect meal plan for your lifestyle and dietary preferences. All plans include chef-crafted recipes, premium ingredients, and convenient delivery.
          </p>
        </motion.div>

        <div className={styles.plans__frequency}>
          <p className={styles['plans__frequency-label']}>Delivery Frequency:</p>
          <div className={styles['plans__frequency-options']}>
            {planFrequencies.map((frequency) => (
              <button
                key={frequency.id}
                className={`${styles['plans__frequency-option']} ${activeFrequency === frequency.id ? styles['plans__frequency-option--active'] : ''}`}
                onClick={() => setActiveFrequency(frequency.id)}
              >
                {frequency.label}
                {frequency.discount > 0 && (
                  <span className={styles['plans__frequency-discount']}>Save {frequency.discount}%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          className={styles.plans__grid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {plans.map((plan) => (
            <motion.div 
              key={plan.id}
              className={`${styles.plans__card} ${plan.popular ? styles['plans__card--popular'] : ''}`}
              variants={fadeIn}
            >
              {plan.popular && (
                <div className={styles['plans__card-badge']}>Most Popular</div>
              )}
              
              <div className={styles['plans__card-header']}>
                <h3 className={styles['plans__card-name']}>{plan.name}</h3>
                <p className={styles['plans__card-description']}>{plan.description}</p>
              </div>
              
              <div className={styles['plans__card-price']}>
                <div className={styles['plans__card-amount']}>
                  <span className={styles['plans__card-currency']}>$</span>
                  <span className={styles['plans__card-value']}>{getDiscountedPrice(plan.price.value, activeFrequency).toFixed(0)}</span>
                  <span className={styles['plans__card-period']}>/{plan.price.unit}</span>
                </div>
                <div className={styles['plans__card-details']}>
                  <div className={styles['plans__card-detail']}>
                    <span className={styles['plans__card-detail-value']}>{plan.meals}</span>
                    <span className={styles['plans__card-detail-label']}>meals</span>
                  </div>
                  <div className={styles['plans__card-detail']}>
                    <span className={styles['plans__card-detail-value']}>{plan.servings}</span>
                    <span className={styles['plans__card-detail-label']}>servings</span>
                  </div>
                </div>
              </div>
              
              <ul className={styles['plans__card-features']}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles['plans__card-feature']}>
                    <svg className={styles['plans__card-check']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={styles['plans__card-button']}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.plans__note}
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: 1,
            transition: { 
              duration: 0.5,
              delay: 0.8
            }
          } : { opacity: 0 }}
        >
          <p>
            All plans include free delivery within our service area. Need a custom plan? <a href="/contact">Contact us</a> for corporate and special dietary options.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingPlans;