// components/booking/CustomizationPanel.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CustomizationPanel.module.scss';

const initialPreferences = [
  {
    id: 'eco-friendly',
    category: 'general',
    label: 'Eco-friendly products only',
    checked: false,
    icon: '🌱'
  },
  {
    id: 'pet-friendly',
    category: 'general',
    label: 'Pet-friendly options',
    checked: false,
    icon: '🐾'
  },
  {
    id: 'allergies',
    category: 'general',
    label: 'Hypoallergenic products',
    checked: false,
    icon: '😷'
  },
  {
    id: 'fragrance-free',
    category: 'general',
    label: 'Fragrance-free products',
    checked: false,
    icon: '🚫'
  },
  {
    id: 'deep-clean',
    category: 'cleaning',
    label: 'Deep cleaning for bathrooms',
    checked: false,
    icon: '🚿'
  },
  {
    id: 'fold-clothes',
    category: 'laundry',
    label: 'Folding & organizing clothes',
    checked: false,
    icon: '👕'
  },
  {
    id: 'dietary',
    category: 'cooking',
    label: 'Dietary restrictions',
    checked: false,
    icon: '🥗'
  },
  {
    id: 'priority',
    category: 'errands',
    label: 'Priority handling',
    checked: false,
    icon: '⚡'
  }
];

export default function CustomizationPanel() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [specialRequests, setSpecialRequests] = useState('');
  const [homeAccess, setHomeAccess] = useState('');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [homeSize, setHomeSize] = useState<number>(1000);
  
  const handlePreferenceChange = (id: string) => {
    setPreferences(
      preferences.map(pref => 
        pref.id === id ? { ...pref, checked: !pref.checked } : pref
      )
    );
  };
  
  const categories = [...new Set(preferences.map(pref => pref.category))];

  return (
    <section className={styles.customize}>
      <div className={styles.customize__container}>
        <motion.div 
          className={styles.customize__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.customize__header}>
            <h2 className={styles.customize__title}>Customize Your Experience</h2>
            <p className={styles.customize__description}>
              Tell us about your preferences and requirements to personalize your service
            </p>
          </div>
          
          <div className={styles.customize__grid}>
            <div className={styles.customize__preferencesCard}>
              <h3 className={styles.customize__cardTitle}>
                <span className={styles.customize__cardIcon}>✨</span>
                Preferences
              </h3>
              
              {categories.map(category => (
                <div key={category} className={styles.customize__category}>
                  <h4 className={styles.customize__categoryTitle}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} Preferences
                  </h4>
                  
                  <div className={styles.customize__checkboxGroup}>
                    {preferences
                      .filter(pref => pref.category === category)
                      .map(preference => (
                        <label key={preference.id} className={styles.customize__checkbox}>
                          <input
                            type="checkbox"
                            checked={preference.checked}
                            onChange={() => handlePreferenceChange(preference.id)}
                          />
                          <span className={styles.customize__checkmark}></span>
                          <span className={styles.customize__checkboxIcon}>{preference.icon}</span>
                          <span className={styles.customize__checkboxLabel}>{preference.label}</span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.customize__propertyCard}>
              <h3 className={styles.customize__cardTitle}>
                <span className={styles.customize__cardIcon}>🏠</span>
                Property Details
              </h3>
              
              <div className={styles.customize__formGroup}>
                <label className={styles.customize__label}>Home Size (sq ft)</label>
                <div className={styles.customize__rangeWrapper}>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={homeSize}
                    onChange={(e) => setHomeSize(parseInt(e.target.value))}
                    className={styles.customize__rangeInput}
                  />
                  <div className={styles.customize__rangeValue}>{homeSize} sq ft</div>
                </div>
              </div>
              
              <div className={styles.customize__formRow}>
                <div className={styles.customize__formGroup}>
                  <label className={styles.customize__label}>Bedrooms</label>
                  <div className={styles.customize__counterControl}>
                    <button 
                      type="button" 
                      className={styles.customize__counterBtn}
                      onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                      disabled={bedrooms === 0}
                    >
                      -
                    </button>
                    <span className={styles.customize__counterValue}>{bedrooms}</span>
                    <button 
                      type="button" 
                      className={styles.customize__counterBtn}
                      onClick={() => setBedrooms(bedrooms + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className={styles.customize__formGroup}>
                  <label className={styles.customize__label}>Bathrooms</label>
                  <div className={styles.customize__counterControl}>
                    <button 
                      type="button" 
                      className={styles.customize__counterBtn}
                      onClick={() => setBathrooms(Math.max(0, bathrooms - 0.5))}
                      disabled={bathrooms === 0}
                    >
                      -
                    </button>
                    <span className={styles.customize__counterValue}>{bathrooms}</span>
                    <button 
                      type="button" 
                      className={styles.customize__counterBtn}
                      onClick={() => setBathrooms(bathrooms + 0.5)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={styles.customize__formGroup}>
                <label className={styles.customize__label}>Home Access Instructions</label>
                <textarea
                  className={styles.customize__textarea}
                  value={homeAccess}
                  onChange={(e) => setHomeAccess(e.target.value)}
                  placeholder="E.g., Door code, key location, gate access, etc."
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className={styles.customize__requestsCard}>
              <h3 className={styles.customize__cardTitle}>
                <span className={styles.customize__cardIcon}>📝</span>
                Special Requests
              </h3>
              
              <div className={styles.customize__formGroup}>
                <label className={styles.customize__label}>
                  Any special instructions or requests for our professionals?
                </label>
                <textarea
                  className={styles.customize__textarea}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Tell us about any specific areas that need attention, special requests, or other important details..."
                  rows={6}
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className={styles.customize__actions}>
            <motion.button 
              className={styles.customize__button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Schedule
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