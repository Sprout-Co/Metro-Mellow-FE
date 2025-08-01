'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Clock, Star, ArrowRight } from 'lucide-react';
import styles from './ServiceCatalog.module.scss';

// Define food categories data
const foodCategories = [
  {
    id: 'combos',
    title: 'Combo\'s',
    image: '/images/food/jollof-rice.png',
    price: 'NGN 5,000',
    description: 'Complete meal with rice, protein & sides',
    duration: '30-45 mins',
    rating: 4.8,
    includes: 'Rice, Protein, Vegetables, Drink'
  },
  {
    id: 'platters',
    title: 'Platters',
    image: '/images/food/f1.png',
    price: 'NGN 5,000',
    description: 'Generous portions perfect for sharing',
    duration: '25-40 mins',
    rating: 4.7,
    includes: 'Mixed portions, Multiple sides'
  },
  {
    id: 'proteins',
    title: 'Proteins',
    image: '/images/food/pounded-yam-efo-riro.png',
    price: 'NGN 5,000',
    description: 'Premium grilled proteins prepared fresh',
    duration: '20-35 mins',
    rating: 4.9,
    includes: 'Chicken, Beef, Fish options'
  },
  {
    id: 'wraps',
    title: 'Wraps',
    image: '/images/food/f4.jpeg',
    price: 'NGN 5,000',
    description: 'Fresh wraps with premium fillings',
    duration: '15-25 mins',
    rating: 4.6,
    includes: 'Fresh vegetables, Premium sauces'
  },
  {
    id: 'soups',
    title: 'Soups',
    image: '/images/food/f2.png',
    price: 'NGN 5,000',
    description: 'Traditional Nigerian soups',
    duration: '35-50 mins',
    rating: 4.8,
    includes: 'Traditional spices, Fresh ingredients'
  },
  {
    id: 'drinks',
    title: 'Drinks',
    image: '/images/food/f3.jpeg',
    price: 'NGN 5,000',
    description: 'Refreshing beverages & traditional drinks',
    duration: '5-10 mins',
    rating: 4.5,
    includes: 'Hot & Cold options available'
  }
];



// Define cleaning categories data
const cleaningCategories = [
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    image: '/images/cleaning/c1.jpeg',
    price: 'From NGN 15,000',
    description: 'Comprehensive cleaning for your entire space',
    duration: '4-6 hours',
    rating: 4.9,
    includes: 'All rooms, Appliances, Deep sanitization'
  },
  {
    id: 'regular-cleaning',
    title: 'Regular Cleaning',
    image: '/images/cleaning/c2.jpeg',
    price: 'From NGN 8,000',
    description: 'Weekly maintenance cleaning service',
    duration: '2-3 hours',
    rating: 4.8,
    includes: 'Surface cleaning, Vacuuming, Mopping'
  },
  {
    id: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    image: '/images/cleaning/c3.jpeg',
    price: 'From NGN 6,000',
    description: 'Kitchen deep cleaning & sanitization',
    duration: '2-3 hours',
    rating: 4.7,
    includes: 'Appliances, Counters, Cabinet exteriors'
  },
  {
    id: 'bathroom-cleaning',
    title: 'Bathroom Cleaning',
    image: '/images/cleaning/c1.jpeg',
    price: 'From NGN 4,000',
    description: 'Complete bathroom sanitization',
    duration: '1-2 hours',
    rating: 4.8,
    includes: 'Tiles, Fixtures, Mirrors, Sanitization'
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    image: '/images/cleaning/c2.jpeg',
    price: 'From NGN 3,000',
    description: 'Professional interior & exterior cleaning',
    duration: '1-2 hours',
    rating: 4.6,
    includes: 'Interior & Exterior, Frames, Sills'
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    image: '/images/cleaning/c3.jpeg',
    price: 'From NGN 5,000',
    description: 'Professional carpet & upholstery cleaning',
    duration: '2-4 hours',
    rating: 4.7,
    includes: 'Steam cleaning, Stain removal, Deodorizing'
  }
];

// Define pest control categories data
const pestControlCategories = [
  {
    id: 'general-pest',
    title: 'General Pest Control',
    image: '/images/pest-control/p1.jpeg',
    price: 'From NGN 12,000',
    description: 'Complete pest prevention & elimination',
    duration: '2-3 hours',
    rating: 4.8,
    includes: 'Inspection, Treatment, 3-month warranty'
  },
  {
    id: 'cockroach-control',
    title: 'Cockroach Control',
    image: '/images/pest-control/p1.jpeg',
    price: 'From NGN 8,000',
    description: 'Safe cockroach elimination treatment',
    duration: '1-2 hours',
    rating: 4.9,
    includes: 'Gel baiting, Spray treatment, Follow-up'
  },
  {
    id: 'rodent-control',
    title: 'Rodent Control',
    image: '/images/pest-control/p1.jpeg',
    price: 'From NGN 10,000',
    description: 'Rodent removal & entry point sealing',
    duration: '2-4 hours',
    rating: 4.7,
    includes: 'Trapping, Sealing, Prevention advice'
  },
  {
    id: 'termite-control',
    title: 'Termite Control',
    image: '/images/pest-control/p1.jpeg',
    price: 'From NGN 25,000',
    description: 'Professional termite treatment',
    duration: '4-6 hours',
    rating: 4.8,
    includes: 'Soil treatment, Wood treatment, 1-year warranty'
  },
  {
    id: 'bedbug-control',
    title: 'Bedbug Control',
    image: '/images/pest-control/p1.jpeg',
    price: 'From NGN 15,000',
    description: 'Complete bedbug heat treatment',
    duration: '3-5 hours',
    rating: 4.6,
    includes: 'Heat treatment, Chemical spray, Mattress care'
  },
  {
    id: 'mosquito-control',
    title: 'Mosquito Control',
    image: '/images/pest-control/p1.jpeg',
    price: 'From NGN 7,000',
    description: 'Mosquito control & breeding elimination',
    duration: '1-2 hours',
    rating: 4.5,
    includes: 'Fogging, Breeding site treatment, Prevention'
  }
];

// Define laundry categories data
const laundryCategories = [
  {
    id: 'wash-dry-fold',
    title: 'Wash & Fold',
    image: '/images/laundry/l1.jpeg',
    price: 'From NGN 2,000',
    description: 'Complete wash, dry & fold service',
    duration: '24-48 hours',
    rating: 4.8,
    includes: 'Wash, Dry, Fold, Eco-friendly detergent'
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    image: '/images/laundry/l2.jpeg',
    price: 'From NGN 3,500',
    description: 'Professional dry cleaning service',
    duration: '2-3 days',
    rating: 4.9,
    includes: 'Stain treatment, Press, Protective bags'
  },
  {
    id: 'ironing',
    title: 'Ironing',
    image: '/images/laundry/l3.jpeg',
    price: 'From NGN 500',
    description: 'Professional ironing for crisp clothes',
    duration: '4-8 hours',
    rating: 4.7,
    includes: 'Steam ironing, Hangers, Quality guarantee'
  },
  {
    id: 'starch-press',
    title: 'Starch & Press',
    image: '/images/laundry/l1.jpeg',
    price: 'From NGN 800',
    description: 'Traditional starch & press service',
    duration: '6-12 hours',
    rating: 4.6,
    includes: 'Custom starch levels, Professional press'
  },
  {
    id: 'curtain-cleaning',
    title: 'Curtain Cleaning',
    image: '/images/laundry/l2.jpeg',
    price: 'From NGN 5,000',
    description: 'Specialized curtain cleaning service',
    duration: '3-5 days',
    rating: 4.5,
    includes: 'Take down, Clean, Rehang service'
  },
  {
    id: 'bedding-cleaning',
    title: 'Bedding Cleaning',
    image: '/images/laundry/l3.jpeg',
    price: 'From NGN 3,000',
    description: 'Deep cleaning for bedding & pillows',
    duration: '2-3 days',
    rating: 4.8,
    includes: 'Sanitization, Dust mite removal, Fresh scent'
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
                    <div className={styles.catalog__cardHeader}>
                      <h4 className={styles.catalog__cardTitle}>{category.title}</h4>
                      <div className={styles.catalog__cardPrice}>{category.price}</div>
                    </div>
                    
                    <p className={styles.catalog__cardDescription}>{category.description}</p>
                    
                    <div className={styles.catalog__cardMeta}>
                      <div className={styles.catalog__cardMetaItem}>
                        <Clock size={14} />
                        <span>{category.duration}</span>
                      </div>
                      <div className={styles.catalog__cardMetaItem}>
                        <Star size={14} />
                        <span>{category.rating}</span>
                      </div>
                    </div>
                    
                    <div className={styles.catalog__cardActions}>
                      <Button 
                        variant="primary" 
                        size="md" 
                        rightIcon={<ArrowRight size={16} />}
                        className={styles.catalog__bookButton}
                      >
                        Book Now
                      </Button>
                    </div>
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