import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServicesGallery.module.scss';

// Define the service professionals data with exact positioning
const serviceProfessionals = [
  {
    id: 'chef1',
    image: '/images/food/f1.png',
    role: 'Chef',
    bgColor: 'primary',
    position: 'top-left'
  },
  {
    id: 'chef2',
    image: '/images/food/f10.jpeg',
    role: 'Chef',
    bgColor: 'primary',
    position: 'top-right'
  },
  {
    id: 'cleaner1',
    image: '/images/cleaning/c1.jpeg',
    role: 'Cleaner',
    bgColor: 'secondary',
    position: 'middle-left'
  },
  {
    id: 'cook1',
    image: '/images/food/f3.jpeg',
    role: 'Cook',
    bgColor: 'primary',
    position: 'middle-center-left'
  },
  {
    id: 'assistant1',
    image: '/images/errand/e1.jpeg',
    role: 'Assistant',
    bgColor: 'secondary',
    position: 'middle-center-right'
  },
  {
    id: 'support1',
    image: '/images/cleaning/c3.jpeg',
    role: 'Support',
    bgColor: 'primary',
    position: 'bottom-left'
  },
  {
    id: 'delivery1',
    image: '/images/food/f4.jpeg',
    role: 'Delivery',
    bgColor: 'secondary',
    position: 'bottom-center'
  },
  {
    id: 'delivery2',
    image: '/images/food/f3.jpeg',
    role: 'Courier',
    bgColor: 'primary',
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
            <div className={`${styles.servicesGallery__card} ${styles[`servicesGallery__card--${professional.bgColor}`]}`}>
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