'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './ServiceCatalog.module.scss';

// Define food categories data
const foodCategories = [
  {
    id: 'combos',
    title: 'COMBO\'S',
    image: '/images/food/egusi-fufu.png',
    price: 'NGN 5,000',
  },
  {
    id: 'platters',
    title: 'PLATTERS',
    image: '/images/food/egusi-fufu.png',
    price: 'NGN 5,000',
  },
  {
    id: 'proteins',
    title: 'PROTEINS',
    image: '/images/food/egusi-fufu.png',
    price: 'NGN 5,000',
  },
  {
    id: 'wraps',
    title: 'WRAPS',
    image: '/images/food/egusi-fufu.png',
    price: 'NGN 5,000',
  },
  {
    id: 'soups',
    title: 'SOUPS',
    image: '/images/food/egusi-fufu.png',
    price: 'NGN 5,000',
  },
  {
    id: 'drinks',
    title: 'DRINKS',
    image: '/images/food/egusi-fufu.png',
    price: 'NGN 5,000',
  }
];



// Define cleaning categories data
const cleaningCategories = [
  {
    id: 'deep-cleaning',
    title: 'DEEP CLEANING',
    image: '/images/cleaning/c1.jpeg',
  },
  {
    id: 'regular-cleaning',
    title: 'REGULAR CLEANING',
    image: '/images/cleaning/c2.jpeg',
  },
  {
    id: 'kitchen-cleaning',
    title: 'KITCHEN CLEANING',
    image: '/images/cleaning/c3.jpeg',
  },
  {
    id: 'bathroom-cleaning',
    title: 'BATHROOM CLEANING',
    image: '/images/cleaning/c1.jpeg',
  },
  {
    id: 'window-cleaning',
    title: 'WINDOW CLEANING',
    image: '/images/cleaning/c2.jpeg',
  },
  {
    id: 'carpet-cleaning',
    title: 'CARPET CLEANING',
    image: '/images/cleaning/c3.jpeg',
  }
];

// Define pest control categories data
const pestControlCategories = [
  {
    id: 'general-pest',
    title: 'GENERAL PEST CONTROL',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'cockroach-control',
    title: 'COCKROACH CONTROL',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'rodent-control',
    title: 'RODENT CONTROL',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'termite-control',
    title: 'TERMITE CONTROL',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'bedbug-control',
    title: 'BEDBUG CONTROL',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'mosquito-control',
    title: 'MOSQUITO CONTROL',
    image: '/images/pest-control/p1.jpeg',
  }
];

// Define laundry categories data
const laundryCategories = [
  {
    id: 'wash-dry-fold',
    title: 'WASH & FOLD',
    image: '/images/laundry/l1.jpeg',
  },
  {
    id: 'dry-cleaning',
    title: 'DRY CLEANING',
    image: '/images/laundry/l2.jpeg',
  },
  {
    id: 'ironing',
    title: 'IRONING',
    image: '/images/laundry/l3.jpeg',
  },
  {
    id: 'starch-press',
    title: 'STARCH & PRESS',
    image: '/images/laundry/l1.jpeg',
  },
  {
    id: 'curtain-cleaning',
    title: 'CURTAIN CLEANING',
    image: '/images/laundry/l2.jpeg',
  },
  {
    id: 'bedding-cleaning',
    title: 'BEDDING CLEANING',
    image: '/images/laundry/l3.jpeg',
  }
];

// Define service categories for sidebar
const serviceCategories = [
  { id: 'food', name: 'Food' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'pest-control', name: 'Pest Control' },
  { id: 'laundry', name: 'Laundry' },
];

const ServiceCatalog: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('food');

  // Function to get the appropriate data based on selected category
  const getCategoryData = () => {
    switch (selectedCategory) {
      case 'food':
        return { data: foodCategories, title: 'Our Delicacies' };
      case 'cleaning':
        return { data: cleaningCategories, title: 'Our Cleaning Services' };
      case 'pest-control':
        return { data: pestControlCategories, title: 'Our Pest Control Services' };
      case 'laundry':
        return { data: laundryCategories, title: 'Our Laundry Services' };
      default:
        return { data: foodCategories, title: 'Our Delicacies' };
    }
  };

  const { data: currentData, title: currentTitle } = getCategoryData();

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
                    category.id === selectedCategory ? styles['catalog__sidebarItem--active'] : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Main catalog content */}
          <div className={styles.catalog__main}>
            <h3 className={styles.catalog__mainTitle}>{currentTitle}</h3>
            
            <div className={styles.catalog__grid}>
              {currentData.map((category) => (
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