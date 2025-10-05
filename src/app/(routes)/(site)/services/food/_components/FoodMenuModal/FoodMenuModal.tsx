"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import FoodItemModal from "../FoodItemModal";
import CartModal, {
  CartServiceItem,
} from "@/components/ui/booking/modals/CartModal";
import CartIcon from "@/components/ui/CartIcon";
import styles from "./FoodMenuModal.module.scss";
import { ServiceCategory, ServiceId } from "@/graphql/api";

// Food item interface that extends the Service structure
interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isSpicy: boolean;
  isTopRated: boolean;
  variants?: string[];
  quantity?: number;
  category: ServiceCategory;
  service_id: ServiceId;
  label: string;
  icon: string;
  displayPrice: string;
  status: string;
  features?: string[];
  inclusions?: string[];
}

// Modal props interface
interface FoodMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample food data adapted to Service structure
const foodItems: FoodItem[] = [
  {
    _id: "1",
    name: "Fried Rice",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f1.png",
    isSpicy: true,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Fried Rice",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "2",
    name: "Jollof Rice",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/jollof-rice.png",
    isSpicy: true,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Jollof Rice",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "3",
    name: "Creamy Pasta",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f2.png",
    isSpicy: true,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Creamy Pasta",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "4",
    name: "Jollof Pasta",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f3.jpeg",
    isSpicy: true,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Jollof Pasta",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "5",
    name: "Amala & Ewedu",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/amala-ewedu.png",
    isSpicy: false,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Amala & Ewedu",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "6",
    name: "Egusi & Fufu",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/egusi-fufu.png",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Egusi & Fufu",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "7",
    name: "Pounded Yam & Efo Riro",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/pounded-yam-efo-riro.png",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Pounded Yam & Efo Riro",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "8",
    name: "Grilled Chicken",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f4.jpeg",
    isSpicy: false,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Grilled Chicken",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "9",
    name: "Beef Stew",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f5.jpeg",
    isSpicy: true,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Beef Stew",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "10",
    name: "Fish Pepper Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f6.jpeg",
    isSpicy: true,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Fish Pepper Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "11",
    name: "Vegetable Salad",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f7.jpeg",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Vegetable Salad",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "12",
    name: "Chicken Curry",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f8.jpeg",
    isSpicy: true,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Chicken Curry",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "13",
    name: "Moi Moi",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f9.jpeg",
    isSpicy: false,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Moi Moi",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "14",
    name: "Akara",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f10.jpeg",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Akara",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "15",
    name: "Suya",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f11.jpeg",
    isSpicy: true,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Suya",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "16",
    name: "Pepper Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f12.jpeg",
    isSpicy: true,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Pepper Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "17",
    name: "Efo Riro",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f13.jpeg",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Efo Riro",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "18",
    name: "Banga Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f14.jpeg",
    isSpicy: false,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Banga Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "19",
    name: "Okro Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f15.jpeg",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Okro Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "20",
    name: "Ewedu Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f16.jpeg",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Ewedu Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "21",
    name: "Gbegiri",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f17.png",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Gbegiri",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "22",
    name: "Efo Elegusi",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f20.jpeg",
    isSpicy: true,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Efo Elegusi",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "23",
    name: "Ogbono Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f21.jpeg",
    isSpicy: false,
    isTopRated: false,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Ogbono Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
  {
    _id: "24",
    name: "Afang Soup",
    description:
      "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
    price: 4950,
    imageUrl: "/images/food/f0.jpeg",
    isSpicy: false,
    isTopRated: true,
    category: ServiceCategory.Cooking,
    service_id: ServiceId.StandardCooking,
    label: "Afang Soup",
    icon: "utensils",
    displayPrice: "NGN 4,950",
    status: "ACTIVE",
  },
];

const FoodMenuModal: React.FC<FoodMenuModalProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(
    null
  );
  const [isFoodItemModalOpen, setIsFoodItemModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAddToCart = (item: FoodItem) => {
    // For now, we'll add some default variants
    // In a real implementation, these would come from user selection
    const itemWithVariants = {
      ...item,
      variants: ["Beef", "Turkey", "Salad"], // Default variants as shown in the image
    };
    setCartItems((prev) => [...prev, itemWithVariants]);
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 8, filteredItems.length));
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

  // Convert FoodItem to CartServiceItem format
  const convertToCartItems = (): CartServiceItem[] => {
    return cartItems.map((item, index) => ({
      _id: `${item._id}-${index}`,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity || 1,
      selectedVariants: item.variants || [],
      category: item.category,
      service_id: item.service_id,
      label: item.label,
      icon: item.icon,
      displayPrice: item.displayPrice,
      status: item.status as any,
      features: item.features,
      inclusions: item.inclusions,
    }));
  };

  // Handle cart item quantity update
  const handleUpdateQuantity = (id: string, quantity: number) => {
    console.log("Updating quantity for item:", id, "to:", quantity);

    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      const [itemId] = id.split("-");
      setCartItems((prev) =>
        prev.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        })
      );
    }
  };

  // Handle cart item removal
  const handleRemoveItem = (id: string) => {
    const [itemId] = id.split("-");
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  // Handle variant removal
  const handleRemoveVariant = (itemId: string, variant: string) => {
    const [originalItemId] = itemId.split("-");
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === originalItemId) {
          return {
            ...item,
            variants: item.variants?.filter((v) => v !== variant) || [],
          };
        }
        return item;
      })
    );
  };

  // Handle continue to checkout
  const handleContinueToCheckout = () => {
    console.log("Continue to checkout with items:", cartItems);
    setIsCartModalOpen(false);
    // Here you would typically navigate to checkout or open checkout modal
  };

  // Filter items based on search query
  const filteredItems = foodItems.filter((item) =>
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
      <h2 className={styles.modal__title}>Select your meal</h2>
      <div className={styles.modal__headerActions}>
        <div className={styles.modal__cart}>
          <CartIcon
            itemCount={cartItems.length}
            onClick={handleCartClick}
            size="md"
            showBadge={true}
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          leftIcon={<X size={20} />}
          onClick={onClose}
          aria-label="Close modal"
          className={styles.modal__cancelButton}
        />
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
              key={item._id}
              className={styles.modal__foodCard}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleFoodItemClick(item)}
            >
              <div className={styles.modal__foodImageContainer}>
                <Image
                  src={item.imageUrl}
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
                  <div className={styles.modal__spicyBadge}>Spicy</div>
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
            <Button size="lg" onClick={handleLoadMore}>
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
        onRemoveVariant={handleRemoveVariant}
        onCheckout={handleContinueToCheckout}
      />
    </>
  );
};

export default FoodMenuModal;
