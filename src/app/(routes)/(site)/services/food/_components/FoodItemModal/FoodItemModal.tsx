"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import styles from "./FoodItemModal.module.scss";
import { ServiceCategory, ServiceId } from "@/graphql/api";

// Food item interface (should match with FoodMenuModal)
interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isSpicy: boolean;
  isTopRated: boolean;
  category: ServiceCategory;
  service_id: ServiceId;
  label: string;
  icon: string;
  displayPrice: string;
  status: string;
  features?: string[];
  inclusions?: string[];
}

interface FoodItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodItem: FoodItem;
}

const FoodItemModal: React.FC<FoodItemModalProps> = ({
  isOpen,
  onClose,
  foodItem,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<
    "small" | "plenty" | null
  >(null);
  const [selectedProtein, setSelectedProtein] = useState<string | null>(null);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleProteinSelect = (protein: string) => {
    setSelectedProtein(protein);
  };

  const handleOrder = () => {
    // Implement order functionality
    console.log("Order placed:", {
      foodItem,
      quantity,
      spiceLevel: selectedSpiceLevel,
      protein: selectedProtein,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="1000px"
      maxHeight="90vh"
      showCloseButton={true}
      backdropBlur={true}
      className={styles.foodItemModal}
    >
      <div className={styles.modal__content}>
        <div className={styles.modal__imageContainer}>
          <Image
            src={foodItem.imageUrl}
            alt={foodItem.name}
            width={500}
            height={500}
            className={styles.modal__image}
          />
        </div>

        <div className={styles.modal__details}>
          <div className={styles.modal__labelSection}>
            {foodItem.isTopRated && (
              <div className={styles.modal__topRated}>
                <span>Top Rated Dish</span>
                {foodItem.isSpicy && (
                  <span className={styles.modal__spicy}>Spicy</span>
                )}
              </div>
            )}
            {!foodItem.isTopRated && foodItem.isSpicy && (
              <div className={styles.modal__topRated}>
                <span></span>
                <span className={styles.modal__spicy}>Spicy</span>
              </div>
            )}
          </div>

          <h2 className={styles.modal__title}>{foodItem.name}</h2>

          <p className={styles.modal__description}>{foodItem.description}</p>

          <div className={styles.modal__priceContainer}>
            <div className={styles.modal__price}>NGN {foodItem.price}</div>
          </div>

          <div className={styles.modal__options}>
            <h3 className={styles.modal__optionsTitle}>
              Extras you might like
            </h3>

            <div className={styles.modal__spiceOptions}>
              <Button
                type="button"
                variant="secondary"
                className={`${styles.modal__spiceOption} ${selectedSpiceLevel === "small" ? styles.modal__spiceOption_selected : ""}`}
                onClick={() => setSelectedSpiceLevel("small")}
              >
                <span className={styles.modal__radioIcon}></span>
                <span>Small Pepper</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={`${styles.modal__spiceOption} ${selectedSpiceLevel === "plenty" ? styles.modal__spiceOption_selected : ""}`}
                onClick={() => setSelectedSpiceLevel("plenty")}
              >
                <span className={styles.modal__radioIcon}></span>
                <span>Plenty Pepper</span>
              </Button>
            </div>
          </div>

          <div className={styles.modal__actionControls}>
            <div className={styles.modal__quantitySection}>
              <button
                className={styles.modal__quantityButton}
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>

              <span className={styles.modal__quantity}>{quantity}</span>

              <button
                className={styles.modal__quantityButton}
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                -
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleOrder}
              className={styles.modal__orderButton}
            >
              ORDER
            </Button>
          </div>

          <div className={styles.modal__proteinOptions}>
            {["Beef", "Chicken", "Turkey", "Salad"].map((protein) => (
              <button
                key={protein}
                className={`${styles.modal__proteinOption} ${
                  selectedProtein === protein
                    ? styles.modal__proteinOption_selected
                    : ""
                }`}
                onClick={() => handleProteinSelect(protein)}
              >
                {protein}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FoodItemModal;
