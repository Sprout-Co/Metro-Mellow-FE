"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CartIcon from "@/components/ui/CartIcon";
import styles from "./CartModal.module.scss";
import CheckoutModal, {
  CheckoutFormData,
} from "../CheckoutModal/CheckoutModal";
import { Service, ServiceOption } from "@/graphql/api";

// Cart item that extends the Service type with cart-specific properties
export interface CartServiceItem extends Service {
  quantity: number;
  selectedOptions?: ServiceOption[];
  selectedVariants?: string[]; // For additional customizations
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: (formData?: CheckoutFormData) => void;
  items: CartServiceItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onRemoveVariant?: (itemId: string, variant: string) => void;
  onRemoveOption?: (itemId: string, optionId: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveVariant,
  onRemoveOption,
}) => {
  const [showShippingModal, setShowShippingModal] = useState(false);

  // Calculate subtotal including selected options
  const subtotal = items.reduce((sum, item) => {
    const basePrice = item.price * item.quantity;
    const optionsPrice =
      item.selectedOptions?.reduce((optSum, option) => {
        return optSum + option.price * item.quantity;
      }, 0) || 0;
    return sum + basePrice + optionsPrice;
  }, 0);

  // Format price with NGN currency
  const formatPrice = (price: number) => {
    return `NGN ${price.toLocaleString()}`;
  };

  const handleContinue = () => {
    setShowShippingModal(true);
  };

  const handleCheckoutComplete = (formData: CheckoutFormData) => {
    setShowShippingModal(false);
    if (onContinue) {
      onContinue(formData);
    }
  };

  const handleShippingModalClose = () => {
    setShowShippingModal(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showShippingModal}
        onClose={onClose}
        headerContent={
          <div className={styles.cartModal__headerTitle}>
            <div className={styles.cartModal__headerLeft}>
              <span>Your cart</span>
              <CartIcon itemCount={items.length} size="sm" showBadge={true} />
            </div>
            <button
              className={styles.cartModal__closeButton}
              onClick={onClose}
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        }
        showCloseButton={false}
        maxWidth="450px"
        className={styles.cartModal}
      >
        <div className={styles.cartModal__content}>
          {items.length === 0 ? (
            <div className={styles.cartModal__empty}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className={styles.cartModal__items}>
                {items.map((item) => (
                  <div key={item._id} className={styles.cartModal__item}>
                    <div className={styles.cartModal__itemImage}>
                      <Image
                        src={
                          item.imageUrl ||
                          `/images/services/${item.service_id.toLowerCase()}.jpg`
                        }
                        alt={item.name}
                        width={80}
                        height={80}
                        objectFit="cover"
                      />
                    </div>

                    <div className={styles.cartModal__itemInfo}>
                      <h3 className={styles.cartModal__itemName}>
                        {item.name}
                      </h3>

                      <div className={styles.cartModal__itemPrice}>
                        {formatPrice(item.price)}
                      </div>

                      {/* Display selected options */}
                      {item.selectedOptions &&
                        item.selectedOptions.length > 0 && (
                          <div className={styles.cartModal__itemVariants}>
                            {item.selectedOptions.map((option) => (
                              <div
                                key={option.id}
                                className={styles.cartModal__itemVariant}
                              >
                                {option.label} (+{formatPrice(option.price)})
                                <button
                                  className={styles.cartModal__variantRemove}
                                  aria-label={`Remove ${option.label}`}
                                  onClick={() =>
                                    onRemoveOption?.(item._id, option.id)
                                  }
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Display selected variants */}
                      {item.selectedVariants &&
                        item.selectedVariants.length > 0 && (
                          <div className={styles.cartModal__itemVariants}>
                            {item.selectedVariants.map((variant, index) => (
                              <div
                                key={index}
                                className={styles.cartModal__itemVariant}
                              >
                                {variant}
                                <button
                                  className={styles.cartModal__variantRemove}
                                  aria-label={`Remove ${variant}`}
                                  onClick={() =>
                                    onRemoveVariant?.(item._id, variant)
                                  }
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                      <div className={styles.cartModal__itemActions}>
                        <div className={styles.cartModal__quantityControls}>
                          <button
                            className={styles.cartModal__quantityButton}
                            onClick={() => {
                              console.log(
                                "Decrement clicked for item:",
                                item._id,
                                "current quantity:",
                                item.quantity
                              );
                              onUpdateQuantity(
                                item._id,
                                Math.max(1, item.quantity - 1)
                              );
                            }}
                            disabled={item.quantity <= 1}
                            type="button"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className={styles.cartModal__quantity}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.cartModal__quantityButton}
                            onClick={() => {
                              console.log(
                                "Increment clicked for item:",
                                item._id,
                                "current quantity:",
                                item.quantity
                              );
                              onUpdateQuantity(item._id, item.quantity + 1);
                            }}
                            type="button"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 5V19M5 12H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>

                        <button
                          className={styles.cartModal__itemRemove}
                          onClick={() => onRemoveItem(item._id)}
                          aria-label="Remove item"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartModal__subtotal}>
                <span className={styles.cartModal__subtotalLabel}>
                  Sub-total
                </span>
                <span className={styles.cartModal__subtotalAmount}>
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className={styles.cartModal__footer}>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleContinue}
                >
                  CONTINUE
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      <CheckoutModal
        isOpen={showShippingModal}
        onClose={handleShippingModalClose}
        onContinue={handleCheckoutComplete}
        service_category="Food"
        submitting={false}
      />
    </>
  );
};

export default CartModal;
