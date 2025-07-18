"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import styles from "./FoodMenuModal.module.scss";

// Food item interface
interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isSpicy: boolean;
  isTopRated: boolean;
}

// Modal props interface
interface FoodMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample food data
const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Fried Rice",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f1.png",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "2",
    name: "Jollof Rice",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/jollof-rice.png",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "3",
    name: "Creamy Pasta",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f2.png",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "4",
    name: "Jollof Pasta",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f3.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "5",
    name: "Fried Rice",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f4.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "6",
    name: "Jollof Rice",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f5.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "7",
    name: "Creamy Pasta",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f6.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "8",
    name: "Jollof Pasta",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f7.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
];

const FoodMenuModal: React.FC<FoodMenuModalProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);

  const handleAddToCart = (item: FoodItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleLoadMore = () => {
    // TODO: Implement load more functionality
    console.log("Load more dishes clicked");
  };

  const formatPrice = (price: number) => {
    return `NGN ${price.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className={styles.modal__backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Modal Container */}
        <motion.div
          className={styles.modal__container}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className={styles.modal__header}>
            <div className={styles.modal__headerContent}>
              <h2 className={styles.modal__title}>
                Select your sumptuous platters
              </h2>
              <div className={styles.modal__cart}>
                <div className={styles.modal__cartIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13H17Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className={styles.modal__cartBadge}>
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button className={styles.modal__close} onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={styles.modal__content}>
            {/* Food Grid */}
            <div className={styles.modal__foodGrid}>
              {foodItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.modal__foodCard}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.modal__foodImageContainer}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className={styles.modal__foodImage}
                    />
                  </div>
                  
                  <div className={styles.modal__topRatedContainer}>
                    <div className={styles.modal__topRatedLabel}>
                      Top Rated Dish
                    </div>
                    {item.isSpicy && (
                      <div className={styles.modal__spicyBadge}>
                        Spicy
                      </div>
                    )}
                  </div>
                  
                  <h3 className={styles.modal__foodName}>{item.name}</h3>
                  
                  <p className={styles.modal__foodDescription}>
                    {item.description}
                  </p>
                  
                  <div className={styles.modal__foodFooter}>
                    <span className={styles.modal__foodPrice}>
                      {formatPrice(item.price)}
                    </span>
                    <button 
                      className={styles.modal__addToCartButton}
                      onClick={() => handleAddToCart(item)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            <div className={styles.modal__loadMoreContainer}>
              <button
                className={styles.modal__loadMoreButton}
                onClick={handleLoadMore}
              >
                LOAD MORE DISHES
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FoodMenuModal;
