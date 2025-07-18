"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import FoodItemModal from "../FoodItemModal";
import CartModal, { CartItem } from "@/components/ui/CartModal";
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
    name: "Amala & Ewedu",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/amala-ewedu.png",
    isSpicy: false,
    isTopRated: true,
  },
  {
    id: "6",
    name: "Egusi & Fufu",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/egusi-fufu.png",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "7",
    name: "Pounded Yam & Efo Riro",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/pounded-yam-efo-riro.png",
    isSpicy: true,
    isTopRated: false,
  },
  {
    id: "8",
    name: "Grilled Chicken",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f4.jpeg",
    isSpicy: false,
    isTopRated: true,
  },
  {
    id: "9",
    name: "Beef Stew",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f5.jpeg",
    isSpicy: true,
    isTopRated: false,
  },
  {
    id: "10",
    name: "Fish Pepper Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f6.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "11",
    name: "Vegetable Salad",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f7.jpeg",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "12",
    name: "Chicken Curry",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f8.jpeg",
    isSpicy: true,
    isTopRated: false,
  },
  {
    id: "13",
    name: "Moi Moi",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f9.jpeg",
    isSpicy: false,
    isTopRated: true,
  },
  {
    id: "14",
    name: "Akara",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f10.jpeg",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "15",
    name: "Suya",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f11.jpeg",
    isSpicy: true,
    isTopRated: true,
  },
  {
    id: "16",
    name: "Pepper Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f12.jpeg",
    isSpicy: true,
    isTopRated: false,
  },
  {
    id: "17",
    name: "Efo Riro",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f13.jpeg",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "18",
    name: "Banga Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f14.jpeg",
    isSpicy: false,
    isTopRated: true,
  },
  {
    id: "19",
    name: "Okro Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f15.jpeg",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "20",
    name: "Ewedu Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f16.jpeg",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "21",
    name: "Gbegiri",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f17.png",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "22",
    name: "Efo Elegusi",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f20.jpeg",
    isSpicy: true,
    isTopRated: false,
  },
  {
    id: "23",
    name: "Ogbono Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f21.jpeg",
    isSpicy: false,
    isTopRated: false,
  },
  {
    id: "24",
    name: "Afang Soup",
    description: "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    image: "/images/food/f0.jpeg",
    isSpicy: false,
    isTopRated: true,
  },
];

const FoodMenuModal: React.FC<FoodMenuModalProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [isFoodItemModalOpen, setIsFoodItemModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAddToCart = (item: FoodItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 8, filteredItems.length));
  };

  const formatPrice = (price: number) => {
    return `NGN ${price.toLocaleString()}`;
  };

  // Open food item modal
  const handleFoodItemClick = (item: FoodItem) => {
    setSelectedFoodItem(item);
    setIsFoodItemModalOpen(true);
  };
  
  // Close food item modal
  const handleFoodItemModalClose = () => {
    setIsFoodItemModalOpen(false);
  };

  // Open cart modal
  const handleCartClick = () => {
    setIsCartModalOpen(true);
  };

  // Close cart modal
  const handleCartModalClose = () => {
    setIsCartModalOpen(false);
  };

  // Convert FoodItem to CartItem format
  const convertToCartItems = (): CartItem[] => {
    return cartItems.map((item, index) => ({
      id: `${item.id}-${index}`,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      variants: []
    }));
  };

  // Handle cart item quantity update
  const handleUpdateQuantity = (id: string, quantity: number) => {
    // For now, we'll just remove the item if quantity is 0
    // In a real implementation, you'd want to update the quantity
    if (quantity <= 0) {
      handleRemoveItem(id);
    }
  };

  // Handle cart item removal
  const handleRemoveItem = (id: string) => {
    const [itemId] = id.split('-');
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Handle continue to checkout
  const handleContinueToCheckout = () => {
    console.log('Continue to checkout with items:', cartItems);
    setIsCartModalOpen(false);
    // Here you would typically navigate to checkout or open checkout modal
  };

  // Filter items based on search query
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasMoreItems = visibleItems < filteredItems.length;
  const displayedItems = filteredItems.slice(0, visibleItems);

  // Reset visible items when search changes
  React.useEffect(() => {
    setVisibleItems(8);
  }, [searchQuery]);

  // Custom header content
  const headerContent = (
    <div className={styles.modal__headerContent}>
      <h2 className={styles.modal__title}>
        Select your sumptuous platters
      </h2>
      <div className={styles.modal__cart}>
        <div 
          className={styles.modal__cartIcon}
          onClick={handleCartClick}
          style={{ cursor: 'pointer' }}
        >
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
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="1200px"
        maxHeight="90vh"
        showCloseButton={true}
        headerContent={headerContent}
        className={styles.foodMenuModal}
      >
        {/* Search Bar */}
        <div className={styles.modal__searchBar}>
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Food Grid */}
        <div className={styles.modal__foodGrid}>
          {displayedItems.map((item) => (
            <motion.div
              key={item.id}
              className={styles.modal__foodCard}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleFoodItemClick(item)}
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
                {item.isTopRated && (
                  <div className={styles.modal__topRatedLabel}>
                    Top Rated Dish
                  </div>
                )}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreItems && (
          <div className={styles.modal__loadMoreContainer}>
            <div className={styles.modal__separatorLine}></div>
            <Button
              size="lg"
              onClick={handleLoadMore}
            >
              LOAD MORE DISHES
            </Button>
            <div className={styles.modal__separatorLine}></div>
          </div>
        )}
      </Modal>

      {/* Food Item Modal */}
      {selectedFoodItem && (
        <FoodItemModal
          isOpen={isFoodItemModalOpen}
          onClose={handleFoodItemModalClose}
          foodItem={selectedFoodItem}
        />
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCartModalClose}
        items={convertToCartItems()}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onContinue={handleContinueToCheckout}
      />
    </>
  );
};

export default FoodMenuModal;
