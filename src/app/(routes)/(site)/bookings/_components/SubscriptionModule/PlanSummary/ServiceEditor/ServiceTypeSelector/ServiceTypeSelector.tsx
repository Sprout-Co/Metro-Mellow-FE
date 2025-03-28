import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServiceTypeSelector.module.scss';

interface ServiceTypeSelectorProps {
  type: 'cleaning' | 'food' | 'laundry';
  selectedType: string;
  onChange: (type: string) => void;
}

const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  type,
  selectedType,
  onChange
}) => {
  const getOptions = () => {
    switch (type) {
      case 'cleaning':
        return [
          {
            id: 'standard',
            title: 'Standard Cleaning',
            description: 'Perfect for the routine clean that includes, sweeping and mopping, clearing dishes, cobweb removals, bathroom cleaning, and taking out the trash.'
          },
          {
            id: 'deep',
            title: 'Deep Cleaning',
            description: 'Perfect for the periodic cleaning that includes everything in Standard cleaning, plus cleaning cabinets, cupboards, and appliances like refrigerators.'
          },
          {
            id: 'post-construction',
            title: 'Post Construction Cleaning',
            description: 'Perfect for when a building or facility has just been renovated.'
          }
        ];
      
      case 'food':
        return [
          {
            id: 'basic',
            title: 'Basic Plan',
            description: 'Great taste, great value. Enjoy 20-25 meal combinations weekly.'
          },
          {
            id: 'standard',
            title: 'Standard Plan',
            description: 'More variety, more portions. Enjoy 30+ meal combinations weekly.'
          }
        ];
      
      case 'laundry':
        return [
          {
            id: 'wash-and-iron',
            title: 'Wash And Iron',
            description: 'Your dirty laundry gets picked up, pre-treated, washed, ironed, neatly-folded, and delivered in 48 hours. You get a free laundry bag with your first service!'
          },
          {
            id: 'wash-and-fold',
            title: 'Wash And Fold',
            description: 'Your dirty laundry gets picked up, pre-treated, washed, neatly-folded and delivered in 48 hours. You get a free laundry bag with your first service!'
          }
        ];
        
      default:
        return [];
    }
  };
  
  const getLabel = () => {
    switch (type) {
      case 'cleaning':
        return 'Select your cleaning type.';
      case 'food':
        return 'Select a plan type';
      case 'laundry':
        return 'Select your laundry type.';
      default:
        return 'Select an option';
    }
  };
  
  const options = getOptions();
  
  return (
    <div className={styles.selector}>
      <h3 className={styles.selector__heading}>{getLabel()}</h3>
      
      <div className={styles.selector__options}>
        {options.map((option) => (
          <div 
            key={option.id}
            className={`${styles.selector__option} ${selectedType === option.id ? styles.selector__option_selected : ''}`}
            onClick={() => onChange(option.id)}
          >
            <div className={styles.selector__option_content}>
              <h4 className={styles.selector__option_title}>{option.title}</h4>
              <p className={styles.selector__option_description}>{option.description}</p>
            </div>
            
            <div className={styles.selector__option_radio}>
              <div className={styles.selector__option_circle}>
                {selectedType === option.id && (
                  <motion.div 
                    className={styles.selector__option_dot}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeSelector;