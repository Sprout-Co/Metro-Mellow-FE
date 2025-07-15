'use client';

import { FC } from 'react';
import Image from 'next/image';
import styles from './ServiceCatalog.module.scss';

// Define food categories data
const foodCategories = [
  {
    id: 'combos',
    title: 'COMBO\'S',
    image: '/images/food/egusi-fufu.png',
    price: 'Starting from NGN 5,000',
  },
  {
    id: 'platters',
    title: 'PLATTERS',
    image: '/images/food/egusi-fufu.png',
    price: 'Starting from NGN 5,000',
  },
  {
    id: 'proteins',
    title: 'PROTEINS',
    image: '/images/food/egusi-fufu.png',
    price: 'Starting from NGN 5,000',
  },
  {
    id: 'wraps',
    title: 'WRAPS',
    image: '/images/food/egusi-fufu.png',
    price: 'Starting from NGN 5,000',
  },
  {
    id: 'soups',
    title: 'SOUPS',
    image: '/images/food/egusi-fufu.png',
    price: 'Starting from NGN 5,000',
  },
  {
    id: 'drinks',
    title: 'DRINKS',
    image: '/images/food/egusi-fufu.png',
    price: 'Starting from NGN 5,000',
  }
];

// Define service categories for sidebar
const serviceCategories = [
  { id: 'food', name: 'Food' },
  { id: 'errand', name: 'Errand' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'pest-control', name: 'Pest Control' },
  { id: 'laundry', name: 'Laundry' },
];

const ServiceCatalog: FC = () => {
  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <div className={styles.catalog__header}>
          <h2 className={styles.catalog__title}>Our catalog</h2>
          <p className={styles.catalog__subtitle}>
            Select your need and wait for the magic.
          </p>
        </div>

        <div className={styles.catalog__content}>
          {/* Categories sidebar */}
          <div className={styles.catalog__sidebar}>
            <div className={styles.catalog__sidebarHeader}>
              <h3 className={styles.catalog__sidebarTitle}>Categories</h3>
            </div>
            <ul className={styles.catalog__sidebarList}>
              {serviceCategories.map((category) => (
                <li 
                  key={category.id} 
                  className={`${styles.catalog__sidebarItem} ${
                    category.id === 'food' ? styles['catalog__sidebarItem--active'] : ''
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Main catalog content */}
          <div className={styles.catalog__main}>
            <h3 className={styles.catalog__mainTitle}>Our Delicacies</h3>
            
            <div className={styles.catalog__grid}>
              {foodCategories.map((category) => (
                <div key={category.id} className={styles.catalog__card}>
                  <div className={styles.catalog__cardImageWrapper}>
                    <Image 
                      src={category.image} 
                      alt={category.title}
                      width={300}
                      height={300}
                      className={styles.catalog__cardImage}
                    />
                  </div>
                  <div className={styles.catalog__cardContent}>
                    <h4 className={styles.catalog__cardTitle}>{category.title}</h4>
                    <p className={styles.catalog__cardPrice}>{category.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCatalog; 