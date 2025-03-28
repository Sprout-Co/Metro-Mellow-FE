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
      name: "Nigerian Jollof Rice with Grilled Chicken",
      description: "Experience the vibrant flavors of Nigeria with our signature Jollof Rice, simmered in a rich tomato and pepper sauce with traditional spices. Served with tender grilled free-range chicken and seasonal vegetables for a complete meal.",
      image: "/images/food/f12.jpeg",
      category: "mains",
      tags: ["Nigerian", "spicy", "hearty"],
      prepTime: "8 min",
      calories: 450
    },
    {
      id: 2,
      name: "Egusi Soup with Pounded Yam",
      description: "Relish the authentic taste of Nigeria with our Egusi Soup, prepared with ground melon seeds, leafy greens, and tender meat, served alongside smooth, well-mashed pounded yam.",
      image: "/images/food/f14.jpeg",
      category: "mains",
      tags: ["Nigerian", "rich", "hearty", "comfort food"],
      prepTime: "12 min",
      calories: 550
    },
    {
      id: 3,
      name: "Spicy Suya Skewers",
      description: "Enjoy our fiery suya skewers featuring thin slices of marinated beef dusted with a spicy peanut-chili blend and grilled to perfection. Served with fresh slices of onions and tomatoes.",
      image: "/images/food/f10.jpeg",
      category: "mains",
      tags: ["Nigerian", "spicy", "grilled", "protein-rich"],
      prepTime: "7 min",
      calories: 430
    },
    {
      id: 4,
      name: "Fried Plantains & Fresh Salad",
      description: "Delight in crispy golden fried plantains paired with a refreshing mixed salad of crisp lettuce, tomatoes, and cucumbers, lightly dressed to enhance the natural flavors.",
      image: "/images/food/f9.jpeg",
      category: "sides",
      tags: ["Nigerian", "crispy", "refreshing", "light"],
      prepTime: "5 min",
      calories: 200
    },
    {
      id: 5,
      name: "Traditional Puff Puff Dessert",
      description: "Indulge in our classic Puff Puff dessert, featuring soft, deep-fried dough balls with a lightly sweet exterior and tender, fluffy interior—a beloved Nigerian treat.",
      image: "/images/food/f16.jpeg",
      category: "desserts",
      tags: ["Nigerian", "sweet", "fried", "classic"],
      prepTime: "0 min",
      calories: 300
    },
    {
      id: 6,
      name: "Banga Soup and Semo",
      description: "Savor the rich, aromatic flavors of Banga Soup—a traditional palm fruit stew infused with spices and assorted meats, served with smooth semo for a hearty meal.",
      image: "/images/food/f20.jpeg",
      category: "mains",
      tags: ["Nigerian", "aromatic", "hearty", "traditional"],
      prepTime: "10 min",
      calories: 600
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