import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServicesGallery.module.scss';

// Define the service professionals data
const serviceProfessionals = [
  {
    id: 'chef1',
    image: '/images/food/f1.png',
    role: 'Chef',
    bgColor: 'primary',
    size: 'large',
    position: 'top-left'
  },
  {
    id: 'cleaner1',
    image: '/images/cleaning/c1.jpeg',
    role: 'Cleaner',
    bgColor: 'secondary',
    size: 'medium',
    position: 'bottom-left'
  },
  {
    id: 'chef2',
    image: '/images/food/f10.jpeg',
    role: 'Cook',
    bgColor: 'primary',
    size: 'medium',
    position: 'middle-center'
  },
  {
    id: 'chef3',
    image: '/images/food/f3.jpeg',
    role: 'Baker',
    bgColor: 'secondary',
    size: 'medium',
    position: 'middle-center-right'
  },
  {
    id: 'assistant1',
    image: '/images/errand/e1.jpeg',
    role: 'Assistant',
    bgColor: 'secondary',
    size: 'large',
    position: 'middle-right'
  },
  {
    id: 'delivery1',
    image: '/images/food/f3.jpeg',
    role: 'Delivery',
    bgColor: 'secondary',
    size: 'medium',
    position: 'bottom-center'
  },
  {
    id: 'delivery2',
    image: '/images/food/f4.jpeg',
    role: 'Courier',
    bgColor: 'primary',
    size: 'medium',
    position: 'bottom-center-right'
  },
  {
    id: 'support1',
    image: '/images/cleaning/c2.jpeg',
    role: 'Support',
    bgColor: 'primary',
    size: 'medium',
    position: 'bottom-right'
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