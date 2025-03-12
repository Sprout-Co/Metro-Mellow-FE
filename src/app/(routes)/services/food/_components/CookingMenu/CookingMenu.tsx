'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './CookingMenu.module.scss';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  prepTime: string;
  calories: number;
}

interface MenuCategory {
  id: string;
  label: string;
}

const CookingMenu = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const menuCategories: MenuCategory[] = [
    { id: 'all', label: 'All Dishes' },
    { id: 'mains', label: 'Main Dishes' },
    { id: 'sides', label: 'Sides' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'desserts', label: 'Desserts' }
  ];
  
  const [activeCategory, setActiveCategory] = useState<string>(menuCategories[0].id);
  
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Herb Roasted Chicken",
      description: "Free-range chicken breast, seasoned with fresh herbs and roasted to perfection. Served with seasonal vegetables.",
      image: "/images/cooking/menu-chicken.webp",
      category: "mains",
      tags: ["protein", "low-carb", "gluten-free"],
      prepTime: "5 min",
      calories: 380
    },
    {
      id: 2,
      name: "Mediterranean Quinoa Bowl",
      description: "Protein-packed quinoa with roasted vegetables, feta cheese, kalamata olives, and fresh herbs. Drizzled with lemon tahini dressing.",
      image: "/images/cooking/menu-quinoa.webp",
      category: "vegetarian",
      tags: ["vegetarian", "high-protein", "fiber-rich"],
      prepTime: "3 min",
      calories: 320
    },
    {
      id: 3,
      name: "Wild Salmon with Citrus",
      description: "Sustainably sourced salmon fillet with a citrus glaze, served with roasted asparagus and wild rice.",
      image: "/images/cooking/menu-salmon.webp",
      category: "mains",
      tags: ["omega-3", "protein", "gluten-free"],
      prepTime: "6 min",
      calories: 420
    },
    {
      id: 4,
      name: "Roasted Sweet Potatoes",
      description: "Perfectly roasted sweet potatoes seasoned with cinnamon and olive oil, topped with a sprinkle of sea salt.",
      image: "/images/cooking/menu-sweetpotato.webp",
      category: "sides",
      tags: ["vegetarian", "fiber", "vitamin-rich"],
      prepTime: "4 min",
      calories: 180
    },
    {
      id: 5,
      name: "Berry Chia Pudding",
      description: "Creamy chia seed pudding made with almond milk and vanilla, topped with fresh seasonal berries and a drizzle of honey.",
      image: "/images/cooking/menu-chia.webp",
      category: "desserts",
      tags: ["vegetarian", "antioxidants", "omega-3"],
      prepTime: "0 min",
      calories: 220
    },
    {
      id: 6,
      name: "Hearty Lentil Soup",
      description: "A comforting blend of lentils, vegetables, and aromatic herbs simmered in a savory broth. Perfect for a cozy meal.",
      image: "/images/cooking/menu-lentil.webp",
      category: "vegetarian",
      tags: ["vegetarian", "protein", "fiber-rich"],
      prepTime: "5 min",
      calories: 290
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="menu" className={styles.menu} ref={sectionRef}>
      <div className={styles.menu__container}>
        <motion.div 
          className={styles.menu__heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut"
            }
          } : { opacity: 0, y: 20 }}
        >
          <span className={styles.menu__subheading}>Explore Our Menu</span>
          <h2 className={styles.menu__title}>Chef-Crafted Weekly Selections</h2>
          <p className={styles.menu__description}>
            Browse our rotating menu of chef-crafted dishes, made with seasonal ingredients and designed to delight your palate. New items are added regularly to keep your meal plan fresh and exciting.
          </p>
        </motion.div>

        <div className={styles.menu__categories}>
          {menuCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.menu__category} ${activeCategory === category.id ? styles['menu__category--active'] : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
              {activeCategory === category.id && (
                <motion.div 
                  className={styles['menu__category-indicator']}
                  layoutId="menuCategory"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          className={styles.menu__grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              className={styles.menu__item}
              variants={itemVariants}
            >
              <div className={styles['menu__item-image']}>
                <Image 
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className={styles['menu__item-img']}
                />
                <div className={styles['menu__item-tags']}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles['menu__item-tag']}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles['menu__item-content']}>
                <h3 className={styles['menu__item-name']}>{item.name}</h3>
                <p className={styles['menu__item-description']}>{item.description}</p>
                <div className={styles['menu__item-footer']}>
                  <div className={styles['menu__item-info']}>
                    <div className={styles['menu__item-prep']}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14ZM9 4H7V8.4L10.7 10.7L11.5 9.4L8.5 7.5V4Z" fill="currentColor"/>
                      </svg>
                      <span>{item.prepTime} heat time</span>
                    </div>
                    <div className={styles['menu__item-calories']}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14ZM9 7H11V9H9V7ZM5 7H7V9H5V7Z" fill="currentColor"/>
                      </svg>
                      <span>{item.calories} cal</span>
                    </div>
                  </div>
                  <button className={styles['menu__item-button']}>Add to Plan</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.menu__more}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut",
              delay: 0.6
            }
          } : { opacity: 0, y: 20 }}
        >
          <p>Browse our full selection of 40+ weekly dishes when you sign up.</p>
          <a href="/menu" className={styles.menu__button}>
            View Full Menu
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.3 8.7L8.3 11.7C8.1 11.9 7.9 12 7.7 12C7.5 12 7.3 11.9 7.1 11.7C6.7 11.3 6.7 10.7 7.1 10.3L8.4 9H5C4.4 9 4 8.6 4 8C4 7.4 4.4 7 5 7H8.4L7.1 5.7C6.7 5.3 6.7 4.7 7.1 4.3C7.5 3.9 8.1 3.9 8.5 4.3L11.5 7.3C11.7 7.5 11.8 7.7 11.8 7.9C11.8 8.1 11.7 8.3 11.5 8.5L11.3 8.7Z" fill="currentColor"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingMenu;