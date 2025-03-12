// components/booking/ServiceSelection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ServiceSelection.module.scss';

// Define available services
const services = [
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    icon: '🧹',
    description: 'Professional cleaning for every room in your home',
    popular: true,
    basePrice: 120
  },
  {
    id: 'laundry',
    name: 'Laundry Services',
    icon: '👕',
    description: 'Washing, drying, ironing, and folding of clothes and linens',
    popular: false,
    basePrice: 80
  },
  {
    id: 'cooking',
    name: 'Meal Preparation',
    icon: '🍳',
    description: 'Custom meal planning and preparation tailored to your preferences',
    popular: true,
    basePrice: 150
  },
  {
    id: 'errands',
    name: 'Errand Running',
    icon: '🛒',
    description: 'Personal assistant services for shopping, deliveries, and more',
    popular: false,
    basePrice: 60
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    icon: '🐜',
    description: 'Effective and eco-friendly pest management solutions',
    popular: false,
    basePrice: 110
  }
];

// Bundle options
const bundles = [
  {
    id: 'essential',
    name: 'Essential Bundle',
    services: ['cleaning', 'laundry'],
    description: 'Our most popular combination for a clean and organized home',
    icon: '✨',
    discount: 15,
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Bundle',
    services: ['cleaning', 'laundry', 'cooking'],
    description: 'All-inclusive package for the ultimate home comfort',
    icon: '🌟',
    discount: 20,
    popular: false
  },
  {
    id: 'complete',
    name: 'Complete Home Care',
    services: ['cleaning', 'laundry', 'cooking', 'errands'],
    description: 'Comprehensive service package for busy professionals',
    icon: '🏆',
    discount: 25,
    popular: false
  }
];

export default function ServiceSelection() {
  const [selectionType, setSelectionType] = useState<'individual' | 'bundle'>('individual');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  
  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };
  
  const handleBundleSelect = (bundleId: string) => {
    if (selectedBundle === bundleId) {
      setSelectedBundle(null);
      setSelectedServices([]);
    } else {
      setSelectedBundle(bundleId);
      // Automatically select the services in the bundle
      const bundle = bundles.find(b => b.id === bundleId);
      if (bundle) {
        setSelectedServices(bundle.services);
      }
    }
  };
  
  const handleSelectionTypeChange = (type: 'individual' | 'bundle') => {
    setSelectionType(type);
    
    if (type === 'individual') {
      setSelectedBundle(null);
    } else {
      setSelectedServices([]);
    }
  };

  return (
    <section className={styles.serviceSelection}>
      <div className={styles.serviceSelection__container}>
        <motion.div 
          className={styles.serviceSelection__content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.serviceSelection__header}>
            <h2 className={styles.serviceSelection__title}>Select Your Services</h2>
            <p className={styles.serviceSelection__description}>
              Choose individual services or save with our curated bundles
            </p>
          </div>
          
          <div className={styles.serviceSelection__tabs}>
            <button 
              className={`${styles.serviceSelection__tab} ${selectionType === 'individual' ? styles['serviceSelection__tab--active'] : ''}`}
              onClick={() => handleSelectionTypeChange('individual')}
            >
              Individual Services
            </button>
            <button 
              className={`${styles.serviceSelection__tab} ${selectionType === 'bundle' ? styles['serviceSelection__tab--active'] : ''}`}
              onClick={() => handleSelectionTypeChange('bundle')}
            >
              Service Bundles
              <span className={styles.serviceSelection__saveTag}>Save up to 25%</span>
            </button>
          </div>
          
          {selectionType === 'individual' ? (
            <div className={styles.serviceSelection__options}>
              <div className={styles.serviceSelection__grid}>
                {services.map((service) => (
                  <motion.div 
                    key={service.id}
                    className={`${styles.serviceSelection__card} ${selectedServices.includes(service.id) ? styles['serviceSelection__card--selected'] : ''}`}
                    onClick={() => handleServiceToggle(service.id)}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.popular && (
                      <span className={styles.serviceSelection__popularTag}>Popular</span>
                    )}
                    <div className={styles.serviceSelection__cardIcon}>{service.icon}</div>
                    <h3 className={styles.serviceSelection__cardTitle}>{service.name}</h3>
                    <p className={styles.serviceSelection__cardDescription}>{service.description}</p>
                    <div className={styles.serviceSelection__cardPrice}>
                      <span className={styles.serviceSelection__currencySymbol}>$</span>
                      <span className={styles.serviceSelection__price}>{service.basePrice}</span>
                      <span className={styles.serviceSelection__period}>/ session</span>
                    </div>
                    <div className={styles.serviceSelection__selectIndicator}>
                      {selectedServices.includes(service.id) ? (
                        <>
                          <span className={styles.serviceSelection__checkmark}>✓</span>
                          Selected
                        </>
                      ) : (
                        'Select Service'
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.serviceSelection__options}>
              <div className={styles.serviceSelection__grid}>
                {bundles.map((bundle) => (
                  <motion.div 
                    key={bundle.id}
                    className={`${styles.serviceSelection__bundleCard} ${selectedBundle === bundle.id ? styles['serviceSelection__bundleCard--selected'] : ''}`}
                    onClick={() => handleBundleSelect(bundle.id)}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {bundle.popular && (
                      <span className={styles.serviceSelection__popularTag}>Most Popular</span>
                    )}
                    <div className={styles.serviceSelection__bundleIconWrapper}>
                      <span className={styles.serviceSelection__bundleIcon}>{bundle.icon}</span>
                      <span className={styles.serviceSelection__bundleDiscount}>Save {bundle.discount}%</span>
                    </div>
                    <h3 className={styles.serviceSelection__bundleTitle}>{bundle.name}</h3>
                    <p className={styles.serviceSelection__bundleDescription}>{bundle.description}</p>
                    <div className={styles.serviceSelection__bundleServices}>
                      <p className={styles.serviceSelection__bundleServicesLabel}>Included Services:</p>
                      <ul className={styles.serviceSelection__bundleServicesList}>
                        {bundle.services.map(serviceId => {
                          const service = services.find(s => s.id === serviceId);
                          return service ? (
                            <li key={serviceId} className={styles.serviceSelection__bundleServiceItem}>
                              <span className={styles.serviceSelection__bundleServiceIcon}>{service.icon}</span>
                              <span className={styles.serviceSelection__bundleServiceName}>{service.name}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                    <div className={styles.serviceSelection__bundleSelect}>
                      {selectedBundle === bundle.id ? (
                        <>
                          <span className={styles.serviceSelection__checkmark}>✓</span>
                          Selected
                        </>
                      ) : (
                        'Select Bundle'
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          <div className={styles.serviceSelection__summary}>
            <div className={styles.serviceSelection__summaryContent}>
              <p className={styles.serviceSelection__summaryText}>
                {selectedServices.length > 0 ? (
                  <>You have selected <strong>{selectedServices.length}</strong> service{selectedServices.length !== 1 ? 's' : ''}</>
                ) : (
                  <>Please select at least one service to continue</>
                )}
              </p>
            </div>
            
            <motion.button 
              className={styles.serviceSelection__continueButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={selectedServices.length === 0}
            >
              Continue to Plan Selection
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