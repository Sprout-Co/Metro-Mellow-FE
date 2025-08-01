"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Sun, Moon, Star, ChefHat, Leaf } from "lucide-react";
import styles from "./MenuShowcase.module.scss";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  dietary?: string[];
}

interface MenuCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    icon: <Coffee />,
    description: "Start your team's day right with fresh, energizing breakfast options",
    items: [
      {
        name: "Executive Breakfast Platter",
        description: "Assorted pastries, fresh fruit, premium coffee & teas",
        price: "$12/person",
        dietary: ["vegetarian"]
      },
      {
        name: "Power Breakfast Bowl",
        description: "Greek yogurt, granola, berries, honey drizzle",
        price: "$8/person",
        dietary: ["vegetarian", "gluten-free"]
      },
      {
        name: "Hot Breakfast Buffet",
        description: "Scrambled eggs, bacon, sausage, hash browns, toast",
        price: "$15/person"
      }
    ]
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: <Sun />,
    description: "Satisfying midday meals that keep productivity high",
    items: [
      {
        name: "Gourmet Sandwich Box",
        description: "Premium deli meats, artisan breads, sides & dessert",
        price: "$14/person"
      },
      {
        name: "Mediterranean Bowl",
        description: "Quinoa, grilled chicken, hummus, fresh vegetables",
        price: "$16/person",
        dietary: ["gluten-free"]
      },
      {
        name: "Executive Lunch Buffet",
        description: "Two entrees, sides, salads, dessert, beverages",
        price: "$22/person"
      }
    ]
  },
  {
    id: "dinner",
    name: "Dinner",
    icon: <Moon />,
    description: "Elegant evening dining for special events and meetings",
    items: [
      {
        name: "Three-Course Plated Dinner",
        description: "Appetizer, choice of entree, dessert with wine pairing",
        price: "$45/person"
      },
      {
        name: "BBQ Dinner Buffet",
        description: "Grilled meats, classic sides, cornbread, dessert",
        price: "$28/person"
      },
      {
        name: "Vegetarian Fine Dining",
        description: "Plant-based three-course meal with seasonal ingredients",
        price: "$38/person",
        dietary: ["vegetarian", "vegan"]
      }
    ]
  },
  {
    id: "specialty",
    name: "Specialty",
    icon: <Star />,
    description: "Custom menus for special occasions and dietary needs",
    items: [
      {
        name: "International Cuisine Night",
        description: "Rotating global menus - Italian, Asian, Mexican themes",
        price: "$32/person"
      },
      {
        name: "Healthy Living Menu",
        description: "Low-calorie, nutrient-dense options with calorie counts",
        price: "$18/person",
        dietary: ["gluten-free", "low-carb"]
      },
      {
        name: "Holiday Celebration Feast",
        description: "Seasonal specialties for company celebrations",
        price: "$35/person"
      }
    ]
  }
];

const MenuShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("breakfast");

  const activeMenu = menuCategories.find(cat => cat.id === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.menuShowcase}>
      <div className={styles.menuShowcase__container}>
        <motion.div
          className={styles.menuShowcase__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.header__icon}>
            <ChefHat />
          </div>
          <h2>Our Menu Categories</h2>
          <p>From energizing breakfasts to elegant dinners, we offer comprehensive catering solutions for every business occasion</p>
        </motion.div>

        <motion.div
          className={styles.menuShowcase__tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.tab} ${activeCategory === category.id ? styles.tab_active : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className={styles.tab__icon}>
                {category.icon}
              </div>
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {activeMenu && (
          <motion.div
            className={styles.menuShowcase__content}
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.category__header}>
              <h3>{activeMenu.name}</h3>
              <p>{activeMenu.description}</p>
            </div>

            <motion.div
              className={styles.menu__grid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {activeMenu.items.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.menu__item}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.item__header}>
                    <h4>{item.name}</h4>
                    <span className={styles.item__price}>{item.price}</span>
                  </div>
                  <p className={styles.item__description}>{item.description}</p>
                  {item.dietary && (
                    <div className={styles.item__dietary}>
                      {item.dietary.map((diet, idx) => (
                        <span key={idx} className={styles.dietary__tag}>
                          <Leaf size={12} />
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className={styles.menuShowcase__cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Custom Menu Options Available</h3>
          <p>Don't see what you're looking for? Our chefs can create custom menus tailored to your specific needs, dietary restrictions, and budget requirements.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuShowcase;