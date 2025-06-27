import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServicesGallery.module.scss';

// Define the service professionals data
const serviceProfessionals = [
  {
    id: 'chef1',
    image: '/images/home/hero2.png',
    role: 'Chef',
    bgColor: 'primary',
    size: 'large',
    position: 'top-left'
  },
  {
    id: 'cleaner1',
    image: '/images/home/hero2.png',
    role: 'Cleaner',
    bgColor: 'secondary',
    size: 'medium',
    position: 'bottom-left'
  },
  {
    id: 'chef2',
    image: '/images/home/hero3.png',
    role: 'Cook',
    bgColor: 'primary',
    size: 'medium',
    position: 'middle-center'
  },
  {
    id: 'chef3',
    image: '/images/home/hero2.png',
    role: 'Baker',
    bgColor: 'secondary',
    size: 'medium',
    position: 'middle-center-right'
  },
  {
    id: 'assistant1',
    image: '/images/home/hero2.png',
    role: 'Assistant',
    bgColor: 'secondary',
    size: 'large',
    position: 'middle-right'
  },
  {
    id: 'delivery1',
    image: '/images/home/hero2.png',
    role: 'Delivery',
    bgColor: 'secondary',
    size: 'medium',
    position: 'bottom-center'
  },
  {
    id: 'support1',
    image: '/images/home/hero2.png',
    role: 'Support',
    bgColor: 'primary',
    size: 'medium',
    position: 'bottom-right'
  },
  {
    id: 'laughing1',
    image: '/images/home/hero2.png',
    bgColor: 'primary',
    size: 'small',
    position: 'bottom-right-small'
  }
];

const ServicesGallery = () => {
  return (
    <section className={styles.servicesGallery}>
      <div className={styles.servicesGallery__grid}>
        {serviceProfessionals.map((professional, idx) => (
          <div
            key={idx}
            className={`${styles.servicesGallery__item} ${styles[`servicesGallery__item--${professional.position}`]}`}
          >
            <div className={`${styles.servicesGallery__card} ${styles[`servicesGallery__card--${professional.bgColor}`]} ${styles[`servicesGallery__card--${professional.size}`]}`}>
              <img 
                src={professional.image} 
                alt={`${professional.role} professional`} 
                className={styles.servicesGallery__image}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGallery;