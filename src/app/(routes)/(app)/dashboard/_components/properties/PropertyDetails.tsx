'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Icon from '../common/Icon';
import styles from './PropertyDetails.module.scss';

type PropertyType = {
  id: string;
  name: string;
  address: string;
  type: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  isDefault: boolean;
  image: string;
  servicesCount: number;
  upcomingServices: number;
  access: {
    instructions: string;
    keysLocation: string;
    code: string;
    specialNotes: string;
  };
  pets: Array<{
    name: string;
    type: string;
    breed: string;
    notes: string;
  }>;
};

type PropertyDetailsProps = {
  property: PropertyType;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function PropertyDetails({ 
  property, 
  activeTab, 
  onTabChange 
}: PropertyDetailsProps) {
  const tabs = [
    { id: 'details', label: 'Property Details' },
    { id: 'access', label: 'Access Instructions' },
    { id: 'pets', label: 'Pets' },
    { id: 'services', label: 'Services' }
  ];
  
  return (
    <div className={styles.details}>
      <div className={styles.details__header}>
        <div 
          className={styles.details__image}
          style={{ backgroundImage: `url(${property.image})` }}
        >
          {property.isDefault && (
            <div className={styles.details__defaultBadge}>
              <Icon name="home" />
              Default Property
            </div>
          )}
        </div>
        
        <div className={styles.details__info}>
          <h2 className={styles.details__name}>{property.name}</h2>
          <p className={styles.details__address}>
            <Icon name="map-pin" />
            {property.address}
          </p>
          
          <div className={styles.details__stats}>
            <div className={styles.details__stat}>
              <Icon name="home" />
              <span>{property.type}</span>
            </div>
            <div className={styles.details__stat}>
              <Icon name="square" />
              <span>{property.size}</span>
            </div>
            <div className={styles.details__stat}>
              <Icon name="bed" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </div>
            <div className={styles.details__stat}>
              <Icon name="droplet" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.details__tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.details__tab} ${
              activeTab === tab.id ? styles['details__tab--active'] : ''
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className={styles.details__tabIndicator}
                layoutId="tab-indicator-property"
                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className={styles.details__content}>
        {activeTab === 'details' && (
          <div className={styles.details__section}>
            <h3 className={styles.details__sectionTitle}>Property Details</h3>
            <div className={styles.details__propertyDetails}>
              <div className={styles.details__detail}>
                <span className={styles.details__detailLabel}>Type:</span>
                <span className={styles.details__detailValue}>{property.type}</span>
              </div>
              <div className={styles.details__detail}>
                <span className={styles.details__detailLabel}>Size:</span>
                <span className={styles.details__detailValue}>{property.size}</span>
              </div>
              <div className={styles.details__detail}>
                <span className={styles.details__detailLabel}>Bedrooms:</span>
                <span className={styles.details__detailValue}>{property.bedrooms}</span>
              </div>
              <div className={styles.details__detail}>
                <span className={styles.details__detailLabel}>Bathrooms:</span>
                <span className={styles.details__detailValue}>{property.bathrooms}</span>
              </div>
              <div className={styles.details__detail}>
                <span className={styles.details__detailLabel}>Default Property:</span>
                <span className={styles.details__detailValue}>{property.isDefault ? 'Yes' : 'No'}</span>
              </div>
            </div>
            
            <div className={styles.details__actions}>
              <button className={styles.details__actionBtn}>
                <Icon name="edit" />
                Edit Property
              </button>
              {!property.isDefault && (
                <button className={styles.details__actionBtn}>
                  <Icon name="home" />
                  Set as Default
                </button>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'access' && (
          <div className={styles.details__section}>
            <h3 className={styles.details__sectionTitle}>Access Instructions</h3>
            <div className={styles.details__accessInfo}>
              <div className={styles.details__accessItem}>
                <h4 className={styles.details__accessTitle}>
                  <Icon name="info" />
                  Entry Instructions
                </h4>
                <p className={styles.details__accessText}>{property.access.instructions}</p>
              </div>
              
              <div className={styles.details__accessItem}>
                <h4 className={styles.details__accessTitle}>
                  <Icon name="key" />
                  Keys Location
                </h4>
                <p className={styles.details__accessText}>{property.access.keysLocation}</p>
              </div>
              
              <div className={styles.details__accessItem}>
                <h4 className={styles.details__accessTitle}>
                  <Icon name="hash" />
                  Access Code
                </h4>
                <p className={styles.details__accessText}>{property.access.code}</p>
              </div>
              
              <div className={styles.details__accessItem}>
                <h4 className={styles.details__accessTitle}>
                  <Icon name="file-text" />
                  Special Notes
                </h4>
                <p className={styles.details__accessText}>{property.access.specialNotes}</p>
              </div>
            </div>
            
            <div className={styles.details__actions}>
              <button className={styles.details__actionBtn}>
                <Icon name="edit" />
                Edit Access Information
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'pets' && (
          <div className={styles.details__section}>
            <h3 className={styles.details__sectionTitle}>Pets</h3>
            {property.pets.length > 0 ? (
              <div className={styles.details__petsList}>
                {property.pets.map((pet, index) => (
                  <div key={index} className={styles.details__petCard}>
                    <div className={styles.details__petIcon}>
                      <Icon name={pet.type.toLowerCase() === 'dog' ? 'github' : 'github'} />
                    </div>
                    <div className={styles.details__petInfo}>
                      <h4 className={styles.details__petName}>{pet.name}</h4>
                      <div className={styles.details__petDetails}>
                        <span className={styles.details__petType}>{pet.type}</span>
                        <span className={styles.details__petBreed}>{pet.breed}</span>
                      </div>
                      <p className={styles.details__petNotes}>{pet.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.details__emptyState}>
                <div className={styles.details__emptyIcon}>
                  <Icon name="github" />
                </div>
                <p className={styles.details__emptyText}>No pets added for this property</p>
              </div>
            )}
            
            <div className={styles.details__actions}>
              <button className={styles.details__actionBtn}>
                <Icon name="plus" />
                Add Pet
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className={styles.details__section}>
            <h3 className={styles.details__sectionTitle}>Services at this Property</h3>
            <div className={styles.details__servicesStats}>
              <div className={styles.details__serviceStat}>
                <div className={styles.details__serviceStatIcon}>
                  <Icon name="clipboard-list" />
                </div>
                <div className={styles.details__serviceStatContent}>
                  <span className={styles.details__serviceStatValue}>{property.servicesCount}</span>
                  <span className={styles.details__serviceStatLabel}>Active Services</span>
                </div>
              </div>
              
              <div className={styles.details__serviceStat}>
                <div className={styles.details__serviceStatIcon}>
                  <Icon name="calendar" />
                </div>
                <div className={styles.details__serviceStatContent}>
                  <span className={styles.details__serviceStatValue}>{property.upcomingServices}</span>
                  <span className={styles.details__serviceStatLabel}>Upcoming Services</span>
                </div>
              </div>
            </div>
            
            <div className={styles.details__servicesMessage}>
              <Icon name="info" />
              <p>
                View and manage all services for this property in the 
                <strong>Services</strong> tab of your dashboard.
              </p>
            </div>
            
            <div className={styles.details__actions}>
              <button className={styles.details__actionBtnPrimary}>
                <Icon name="plus" />
                Book New Service
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}