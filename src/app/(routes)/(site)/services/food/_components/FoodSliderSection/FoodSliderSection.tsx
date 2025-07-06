'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FoodSliderSection.module.scss';

// Type definitions
interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface FoodCategory {
  id: string;
  name: string;
  dishes: Dish[];
}

// Food category data
const foodCategories: FoodCategory[] = [
  {
    id: 'comfort',
    name: 'Comfort Classics',
    dishes: [
      {
        id: 'cc1',
        name: 'Homestyle Mac & Cheese',
        description: 'Creamy three-cheese blend with a crispy breadcrumb topping',
        image: '/images/food/f1.png'
      },
      {
        id: 'cc2',
        name: 'Classic Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        image: '/images/food/f2.png'
      },
      {
        id: 'cc3',
        name: 'Chicken Pot Pie',
        description: 'Tender chicken and vegetables in a flaky crust',
        image: '/images/food/f3.jpeg'
      },
      {
        id: 'cc4',
        name: 'Meatloaf & Mashed Potatoes',
        description: 'Savory meatloaf with creamy mashed potatoes and gravy',
        image: '/images/food/f4.jpeg'
      }
    ]
  },
  {
    id: 'gourmet',
    name: 'Gourmet Delights',
    dishes: [
      {
        id: 'gd1',
        name: 'Truffle Risotto',
        description: 'Creamy arborio rice with wild mushrooms and truffle oil',
        image: '/images/food/f5.jpeg'
      },
      {
        id: 'gd2',
        name: 'Seared Scallops',
        description: 'Pan-seared scallops with citrus beurre blanc',
        image: '/images/food/f6.jpeg'
      },
      {
        id: 'gd3',
        name: 'Beef Wellington',
        description: 'Tender filet mignon wrapped in puff pastry',
        image: '/images/food/f7.jpeg'
      },
      {
        id: 'gd4',
        name: 'Duck Confit',
        description: 'Slow-cooked duck leg with cherry reduction',
        image: '/images/food/f8.jpeg'
      }
    ]
  },
  {
    id: 'healthy',
    name: 'Healthy Bowls',
    dishes: [
      {
        id: 'hb1',
        name: 'Mediterranean Bowl',
        description: 'Quinoa, hummus, falafel, and fresh vegetables',
        image: '/images/food/f9.jpeg'
      },
      {
        id: 'hb2',
        name: 'Poke Bowl',
        description: 'Fresh tuna, avocado, edamame, and sushi rice',
        image: '/images/food/f10.jpeg'
      },
      {
        id: 'hb3',
        name: 'Buddha Bowl',
        description: 'Roasted sweet potatoes, chickpeas, kale, and tahini dressing',
        image: '/images/food/f11.jpeg'
      },
      {
        id: 'hb4',
        name: 'Protein Power Bowl',
        description: 'Grilled chicken, quinoa, black beans, and avocado',
        image: '/images/food/f12.jpeg'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Sweet Treats',
    dishes: [
      {
        id: 'st1',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center',
        image: '/images/food/f13.jpeg'
      },
      {
        id: 'st2',
        name: 'New York Cheesecake',
        description: 'Classic creamy cheesecake with berry compote',
        image: '/images/food/f14.jpeg'
      },
      {
        id: 'st3',
        name: 'Tiramisu',
        description: 'Coffee-soaked ladyfingers with mascarpone cream',
        image: '/images/food/f15.jpeg'
      },
      {
        id: 'st4',
        name: 'Crème Brûlée',
        description: 'Vanilla custard with a caramelized sugar top',
        image: '/images/food/f16.jpeg'
      }
    ]
  }
];

// DishCard component
interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  return (
    <div className={styles.dish}>
      <div className={styles.dish__image}>
        <Image 
          src={dish.image} 
          alt={dish.name} 
          width={600} 
          height={600}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles["dish__name-overlay"]}>
        <h3 className={styles.dish__name}>{dish.name}</h3>
      </div>
      <div className={styles.dish__panel}>
        <div className={styles["dish__panel-content"]}>
          <h3 className={styles["dish__panel-name"]}>{dish.name}</h3>
          <p className={styles.dish__description}>{dish.description}</p>
        </div>
      </div>
    </div>
  );
};

const FoodSliderSection = () => {
  const [activeCategory, setActiveCategory] = useState(foodCategories[0].id);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get current category
  const currentCategory = foodCategories.find(cat => cat.id === activeCategory);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentSlide(0);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = foodCategories.findIndex(cat => cat.id === activeCategory);
      const nextIndex = (currentIndex + 1) % foodCategories.length;
      setActiveCategory(foodCategories[nextIndex].id);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeCategory]);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <div className={styles.slider__header}>
          <h2 className={styles.slider__title}>Taste the Rainbow</h2>
          <p className={styles.slider__subtitle}>
            Explore our diverse menu categories, from comfort classics to gourmet delights
          </p>
        </div>

        <div className={styles.slider__tabs}>
          {foodCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.slider__tab} ${
                activeCategory === category.id ? styles['slider__tab--active'] : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.slider__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.slider__slide}
            >
              <div className={styles.slider__grid}>
                {currentCategory?.dishes.map((dish) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <DishCard dish={dish} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.slider__navigation}>
          <button
            className={`${styles.slider__arrow} ${styles['slider__arrow--prev']}`}
            onClick={() => {
              const currentIndex = foodCategories.findIndex(cat => cat.id === activeCategory);
              const prevIndex = (currentIndex - 1 + foodCategories.length) % foodCategories.length;
              setActiveCategory(foodCategories[prevIndex].id);
            }}
            aria-label="Previous category"
          >
            →
          </button>

          {foodCategories.map((category, index) => (
            <span
              key={category.id}
              className={`${styles.slider__dot} ${
                activeCategory === category.id ? styles['slider__dot--active'] : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}

          <button
            className={styles.slider__arrow}
            onClick={() => {
              const currentIndex = foodCategories.findIndex(cat => cat.id === activeCategory);
              const nextIndex = (currentIndex + 1) % foodCategories.length;
              setActiveCategory(foodCategories[nextIndex].id);
            }}
            aria-label="Next category"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FoodSliderSection; 