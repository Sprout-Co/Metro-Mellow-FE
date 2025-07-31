'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './ServiceCatalog.module.scss';

// Define food categories data
const foodCategories = [
  {
    id: 'combos',
    title: 'Combo\'s',
    image: '/images/food/jollof-rice.png',
    price: 'NGN 5,000',
  },
  {
    id: 'platters',
    title: 'Platters',
    image: '/images/food/f1.png',
    price: 'NGN 5,000',
  },
  {
    id: 'proteins',
    title: 'Proteins',
    image: '/images/food/pounded-yam-efo-riro.png',
    price: 'NGN 5,000',
  },
  {
    id: 'wraps',
    title: 'Wraps',
    image: '/images/food/f4.jpeg',
    price: 'NGN 5,000',
  },
  {
    id: 'soups',
    title: 'Soups',
    image: '/images/food/f2.png',
    price: 'NGN 5,000',
  },
  {
    id: 'drinks',
    title: 'Drinks',
    image: '/images/food/f3.jpeg',
    price: 'NGN 5,000',
  }
];



// Define cleaning categories data
const cleaningCategories = [
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    image: '/images/cleaning/c1.jpeg',
  },
  {
    id: 'regular-cleaning',
    title: 'Regular Cleaning',
    image: '/images/cleaning/c2.jpeg',
  },
  {
    id: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    image: '/images/cleaning/c3.jpeg',
  },
  {
    id: 'bathroom-cleaning',
    title: 'Bathroom Cleaning',
    image: '/images/cleaning/c1.jpeg',
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    image: '/images/cleaning/c2.jpeg',
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    image: '/images/cleaning/c3.jpeg',
  }
];

// Define pest control categories data
const pestControlCategories = [
  {
    id: 'general-pest',
    title: 'General Pest Control',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'cockroach-control',
    title: 'Cockroach Control',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'rodent-control',
    title: 'Rodent Control',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'termite-control',
    title: 'Termite Control',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'bedbug-control',
    title: 'Bedbug Control',
    image: '/images/pest-control/p1.jpeg',
  },
  {
    id: 'mosquito-control',
    title: 'Mosquito Control',
    image: '/images/pest-control/p1.jpeg',
  }
];

// Define laundry categories data
const laundryCategories = [
  {
    id: 'wash-dry-fold',
    title: 'Wash & Fold',
    image: '/images/laundry/l1.jpeg',
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    image: '/images/laundry/l2.jpeg',
  },
  {
    id: 'ironing',
    title: 'Ironing',
    image: '/images/laundry/l3.jpeg',
  },
  {
    id: 'starch-press',
    title: 'Starch & Press',
    image: '/images/laundry/l1.jpeg',
  },
  {
    id: 'curtain-cleaning',
    title: 'Curtain Cleaning',
    image: '/images/laundry/l2.jpeg',
  },
  {
    id: 'bedding-cleaning',
    title: 'Bedding Cleaning',
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