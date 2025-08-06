'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './PropertyCard.module.scss';

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
};

type PropertyCardProps = {
  property: PropertyType;
  onClick: () => void;
};

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <motion.div 
      className={styles['property-card']}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.2 }
      }}
    >
      <div 
        className={styles['property-card__image']} 
        style={{ backgroundImage: `url(${property.image})` }}
      >
        {property.isDefault && (
          <div className={styles['property-card__default-badge']}>
            <Icon name="home" />
            Default
          </div>
        )}
      </div>
      
      <div className={styles['property-card__content']}>
        <h3 className={styles['property-card__name']}>{property.name}</h3>
        <p className={styles['property-card__address']}>
          <Icon name="map-pin" />
          {property.address}
        </p>
        
        <div className={styles['property-card__details']}>
          <div className={styles['property-card__detail']}>
            <Icon name="square" />
            <span>{property.size}</span>
          </div>
          <div className={styles['property-card__detail']}>
            <Icon name="bed" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          </div>
          <div className={styles['property-card__detail']}>
            <Icon name="droplet" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
          </div>
        </div>
      </div>
      
      <div className={styles['property-card__footer']}>
        <div className={styles['property-card__stat']}>
          <Icon name="clipboard-list" />
          <span>{property.servicesCount} Services Active</span>
        </div>
        <div className={styles['property-card__stat']}>
          <Icon name="calendar" />
          <span>{property.upcomingServices} Upcoming</span>
        </div>
      </div>
      
      <div className={styles['property-card__action']}>
        <button className={styles['property-card__action-btn']}>
          <Icon name="chevron-right" />
        </button>
      </div>
    </motion.div>
  );
}