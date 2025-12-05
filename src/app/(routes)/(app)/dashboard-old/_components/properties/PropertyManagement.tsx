'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import PropertyCard from './PropertyCard';
import PropertyDetails from './PropertyDetails';
import styles from './PropertyManagement.module.scss';

// Sample property data
const properties = [
  {
    id: 'prop1',
    name: 'Main Residence',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    type: 'Apartment',
    size: '1,200 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    isDefault: true,
    image: '/properties/apartment.jpg',
    servicesCount: 4,
    upcomingServices: 2,
    access: {
      instructions: 'Buzz apartment 4B for entry',
      keysLocation: 'Keypad at main entrance',
      code: '4321',
      specialNotes: 'Please remove shoes upon entry'
    },
    pets: [
      { name: 'Max', type: 'Dog', breed: 'Golden Retriever', notes: 'Friendly, but keep gate closed' }
    ]
  },
  {
    id: 'prop2',
    name: 'Vacation Home',
    address: '456 Beach Drive, Miami, FL 33139',
    type: 'House',
    size: '2,500 sq ft',
    bedrooms: 3,
    bathrooms: 2.5,
    isDefault: false,
    image: '/properties/house.jpg',
    servicesCount: 2,
    upcomingServices: 1,
    access: {
      instructions: 'Key in lockbox',
      keysLocation: 'Black lockbox on side gate',
      code: '9876',
      specialNotes: 'Alarm code is 7890 - please disarm upon entry and rearm when leaving'
    },
    pets: []
  }
];

export default function PropertyManagement() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  const getSelectedPropertyData = () => {
    return properties.find(p => p.id === selectedProperty);
  };

  return (
    <motion.div 
      className={styles.management}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className={styles.management__header}>
        <div>
          <h1 className={styles.management__title}>
            Your Properties
          </h1>
          <p className={styles.management__subtitle}>
            Manage your service locations and access details
          </p>
        </div>
        <motion.button 
          className={styles.management__addBtn}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon name="plus" />
          Add Property
        </motion.button>
      </header>
      
      <AnimatePresence mode="wait">
        {selectedProperty ? (
          <motion.div
            key="property-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.management__detailsView}
          >
            <button 
              className={styles.management__backBtn}
              onClick={() => setSelectedProperty(null)}
            >
              <Icon name="arrow-left" />
              Back to Properties
            </button>
            
            <PropertyDetails 
              property={getSelectedPropertyData()!} 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </motion.div>
        ) : (
          <motion.div
            key="property-list"
            className={styles.management__list}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {properties.map((property) => (
              <motion.div
                key={property.id}
                variants={itemVariants}
                className={styles.management__cardWrapper}
              >
                <PropertyCard 
                  property={property}
                  onClick={() => setSelectedProperty(property.id)}
                />
              </motion.div>
            ))}
            
            <motion.div
              variants={itemVariants}
              className={styles.management__addCard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.management__addCardContent}>
                <div className={styles.management__addCardIcon}>
                  <Icon name="plus-circle" />
                </div>
                <h3 className={styles.management__addCardTitle}>
                  Add New Property
                </h3>
                <p className={styles.management__addCardDescription}>
                  Register an additional service location
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}