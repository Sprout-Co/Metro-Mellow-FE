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
import { useCart, useCartActions } from "@/lib/redux/hooks";

interface ReduxCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: (formData?: CheckoutFormData) => void;
}

export const ReduxCartModal: React.FC<ReduxCartModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  const [showShippingModal, setShowShippingModal] = useState(false);

  // Get cart state from Redux
  const { items, itemCount, total } = useCart();

  // Get cart actions from Redux
  const {
    updateQuantity,
    removeFromCart,
    removeVariant,
    removeOption,
    setCartOpen,
  } = useCartActions();

  // Format price with NGN currency
  const formatPrice = (price: number) => {
    return `NGN ${price.toLocaleString()}`;
  };

  const handleContinue = () => {
    setShowShippingModal(true);
  };

  const handleCheckoutComplete = (formData: CheckoutFormData) => {
    setShowShippingModal(false);
    if (onCheckout) {
      onCheckout(formData);
    }
  };

  const handleShippingModalClose = () => {
    setShowShippingModal(false);
  };

  const handleModalClose = () => {
    setCartOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showShippingModal}
        onClose={handleModalClose}
        headerContent={
          <div className={styles.cartModal__headerTitle}>
            <div className={styles.cartModal__headerLeft}>
              <span>Your cart</span>
              <CartIcon itemCount={itemCount} size="sm" showBadge={true} />
            </div>
            <button
              className={styles.cartModal__closeButton}
              onClick={handleModalClose}
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
                                    removeOption(item._id, option.id)
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
                                    removeVariant(item._id, variant)
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
                              updateQuantity(
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
                              updateQuantity(item._id, item.quantity + 1);
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
                          onClick={() => removeFromCart(item._id)}
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
                  {formatPrice(total)}
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
        onCheckout={handleCheckoutComplete}
        service_category="Food"
        submitting={false}
      />
    </>
  );
};

export default ReduxCartModal;
