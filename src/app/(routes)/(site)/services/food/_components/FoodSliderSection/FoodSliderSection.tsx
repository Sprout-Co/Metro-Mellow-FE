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
    name: 'Nigerian Classics',
    dishes: [
      {
        id: 'cc1',
        name: 'Jollof Rice',
        description: 'Aromatic rice cooked in rich tomato sauce with spices and vegetables',
        image: '/images/food/f1.png'
      },
      {
        id: 'cc2',
        name: 'Pounded Yam & Efo Riro',
        description: 'Smooth pounded yam served with spinach stew and assorted meat',
        image: '/images/food/f2.png'
      },
      {
        id: 'cc3',
        name: 'Amala & Ewedu',
        description: 'Yam flour swallow with jute leaves soup and beef',
        image: '/images/food/f3.jpeg'
      },
      {
        id: 'cc4',
        name: 'Egusi Soup & Fufu',
        description: 'Ground melon seed soup with cassava fufu and fish',
        image: '/images/food/f4.jpeg'
      },
      {
        id: 'cc5',
        name: 'Banga Soup & Starch',
        description: 'Palm nut soup with cassava starch and fresh fish',
        image: '/images/food/f1.png'
      },
      {
        id: 'cc6',
        name: 'Okro Soup & Eba',
        description: 'Fresh okra soup with garri and prawns',
        image: '/images/food/f2.png'
      }
    ]
  },
  {
    id: 'gourmet',
    name: 'Premium Dishes',
    dishes: [
      {
        id: 'gd1',
        name: 'Pepper Soup',
        description: 'Spicy hot soup with goat meat, fish, or chicken and herbs',
        image: '/images/food/f5.jpeg'
      },
      {
        id: 'gd2',
        name: 'Suya',
        description: 'Grilled spicy beef skewers with groundnut powder and spices',
        image: '/images/food/f6.jpeg'
      },
      {
        id: 'gd3',
        name: 'Nkwobi',
        description: 'Spicy cow foot served with palm oil and utazi leaves',
        image: '/images/food/f7.jpeg'
      },
      {
        id: 'gd4',
        name: 'Abacha & Ugba',
        description: 'African salad with cassava flakes, oil bean seeds, and fish',
        image: '/images/food/f8.jpeg'
      },
      {
        id: 'gd5',
        name: 'Isi Ewu',
        description: 'Goat head pepper soup with palm oil and spices',
        image: '/images/food/f5.jpeg'
      },
      {
        id: 'gd6',
        name: 'Ofada Rice & Ayamase',
        description: 'Local rice with green pepper sauce and assorted meat',
        image: '/images/food/f6.jpeg'
      }
    ]
  },
  {
    id: 'healthy',
    name: 'Light & Fresh',
    dishes: [
      {
        id: 'hb1',
        name: 'Efo Riro Salad',
        description: 'Fresh spinach with tomatoes, peppers, and grilled fish',
        image: '/images/food/f9.jpeg'
      },
      {
        id: 'hb2',
        name: 'Bitter Leaf Soup',
        description: 'Light bitter leaf soup with fish and minimal palm oil',
        image: '/images/food/f10.jpeg'
      },
      {
        id: 'hb3',
        name: 'Vegetable Okro',
        description: 'Fresh okra soup with vegetables and light seasoning',
        image: '/images/food/f11.jpeg'
      },
      {
        id: 'hb4',
        name: 'Grilled Fish & Plantain',
        description: 'Fresh grilled fish with ripe plantain and vegetables',
        image: '/images/food/f12.jpeg'
      },
      {
        id: 'hb5',
        name: 'Yam & Egg Sauce',
        description: 'Boiled yam with light tomato and egg sauce',
        image: '/images/food/f9.jpeg'
      },
      {
        id: 'hb6',
        name: 'Coconut Rice',
        description: 'Light coconut rice with vegetables and grilled chicken',
        image: '/images/food/f10.jpeg'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Sweet Delights',
    dishes: [
      {
        id: 'st1',
        name: 'Puff Puff',
        description: 'Deep-fried sweet dough balls dusted with powdered sugar',
        image: '/images/food/f13.jpeg'
      },
      {
        id: 'st2',
        name: 'Chin Chin',
        description: 'Crispy fried pastry squares with a hint of nutmeg',
        image: '/images/food/f14.jpeg'
      },
      {
        id: 'st3',
        name: 'Boli & Fish',
        description: 'Roasted plantain with grilled fish and pepper sauce',
        image: '/images/food/f15.jpeg'
      },
      {
        id: 'st4',
        name: 'Akara',
        description: 'Bean cakes made from ground beans and spices',
        image: '/images/food/f16.jpeg'
      },
      {
        id: 'st5',
        name: 'Moi Moi',
        description: 'Steamed bean pudding with fish and vegetables',
        image: '/images/food/f13.jpeg'
      },
      {
        id: 'st6',
        name: 'Zobo Drink',
        description: 'Refreshing hibiscus drink with ginger and pineapple',
        image: '/images/food/f14.jpeg'
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
  const [isHovering, setIsHovering] = useState(false);

  // Get current category
  const currentCategory = foodCategories.find(cat => cat.id === activeCategory);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentSlide(0);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isHovering) return; // Pause auto-play when hovering

    const interval = setInterval(() => {
      const currentIndex = foodCategories.findIndex(cat => cat.id === activeCategory);
      const nextIndex = (currentIndex + 1) % foodCategories.length;
      setActiveCategory(foodCategories[nextIndex].id);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeCategory, isHovering]);

  // Handle hover events
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <div className={styles.slider__header}>
          <h2 className={styles.slider__title}>Taste the Rainbow</h2>
          <p className={styles.slider__subtitle}>
            Taste 50+ authentic dishes. New menu every week to select from!
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

        <div 
          className={styles.slider__content}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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