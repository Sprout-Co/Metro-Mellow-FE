"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useMetroEatsCart,
  type CartCustomization,
} from "../../_context/MetroEatsCartContext";
import styles from "./CustomizeModal.module.scss";

// const PROTEIN_OPTIONS = [
//   "No preference",
//   "Chicken",
//   "Beef",
//   "Fish",
//   "Turkey",
//   "Goat",
//   "Assorted",
// ];

// Mock add-ons for the stylish UI (you can map these from your DB later)
const MOCK_ADDONS = [
  { id: "a1", name: "Extra Plantain", price: 500 },
  { id: "a2", name: "Extra Egg", price: 300 },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function CustomizeModal() {
  const { mealToCustomize, closeCustomizeMealModal, addItem } =
    useMetroEatsCart();
  const [protein, setProtein] = useState("No preference");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  /** Extra item id -> quantity (0 = not selected) */
  const [extraQuantities, setExtraQuantities] = useState<Record<string, number>>(
    {},
  );

  // Reset state when a new meal is selected
  useEffect(() => {
    if (mealToCustomize) {
      setProtein("No preference");
      setNotes("");
      setQuantity(1);
      setExtraQuantities({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mealToCustomize]);

  const handleExtraQtyChange = (extraItemId: string, delta: number) => {
    setExtraQuantities((prev) => {
      const current = prev[extraItemId] ?? 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [extraItemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [extraItemId]: next };
    });
  };
  const handleQtyChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const basePrice = useMemo(() => {
    if (!mealToCustomize) return 0;
    return mealToCustomize.selectedPrice;
  }, [mealToCustomize]);

  // Calculate total price dynamically
  const totalPrice = useMemo(() => {
    if (!mealToCustomize) return 0;
    const addonsPrice = mealToCustomize.extras.reduce((sum, extra) => {
      const qty = extraQuantities[extra.id] ?? 0;
      return sum + extra.price * qty;
    }, 0);
    return (basePrice + addonsPrice) * quantity;
  }, [mealToCustomize, extraQuantities, quantity]);

  const handleAddToCart = () => {
    if (!mealToCustomize) return;

    const customization: CartCustomization = {};
    if (protein && protein !== "No preference") customization.protein = protein;
    if (notes.trim()) customization.notes = notes.trim();
    // if (selectedAddons.length > 0) customization.addons = selectedAddons; // Assuming your context accepts this

    addItem(
      mealToCustomize.id,
      mealToCustomize.name,
      basePrice,
      quantity,
      Object.keys(customization).length ? customization : undefined,
      mealToCustomize.availableStyles[0],
    );
    closeCustomizeMealModal();
  };

  // Fallback image if mealToCustomize doesn't have one
  const imageUrl =
    mealToCustomize?.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <AnimatePresence>
      {mealToCustomize && (
        <div className={styles.modal}>
          <motion.div
            className={styles.modal__backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCustomizeMealModal}
            aria-hidden
          />

          <motion.div
            className={styles.modal__container}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-label="Customize your meal"
          >
            <button
              type="button"
              className={styles.modal__close}
              onClick={closeCustomizeMealModal}
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Left side: Image */}
            <div
              className={styles.modal__imagePane}
              style={{ backgroundImage: `url('${imageUrl}')` }}
            />

            {/* Right side: Details & Inputs */}
            <div className={styles.modal__detailsPane}>
              <div className={styles.modal__header}>
                <h2 className={styles.modal__title}>{mealToCustomize.name}</h2>
                <p className={styles.modal__price}>{fmt(basePrice)} Base</p>
                {mealToCustomize.description && (
                  <p className={styles.modal__desc}>
                    {mealToCustomize.description}
                  </p>
                )}
              </div>

              <div className={styles.modal__scrollArea}>
                {/* Extra Items: quantity per item */}
                <div className={styles.modal__group}>
                  <h3 className={styles.modal__groupTitle}>Extra Items</h3>
                  {mealToCustomize.extras.map((extraItem) => {
                    const qty = extraQuantities[extraItem.id] ?? 0;
                    return (
                      <div
                        key={extraItem.id}
                        className={styles.modal__optionLabel}
                      >
                        <div className={styles.modal__optionMain}>
                          <span className={styles.modal__optionName}>
                            {extraItem.name}
                          </span>
                          <span className={styles.modal__optionPrice}>
                            +{fmt(extraItem.price)}
                          </span>
                        </div>
                        <div className={styles.modal__qtySelector}>
                          <button
                            type="button"
                            className={styles.modal__qtyBtn}
                            onClick={() =>
                              handleExtraQtyChange(extraItem.id, -1)
                            }
                            aria-label={`Decrease ${extraItem.name}`}
                            disabled={qty === 0}
                          >
                            −
                          </button>
                          <span className={styles.modal__qtyDisplay}>
                            {qty}
                          </span>
                          <button
                            type="button"
                            className={styles.modal__qtyBtn}
                            onClick={() =>
                              handleExtraQtyChange(extraItem.id, 1)
                            }
                            aria-label={`Increase ${extraItem.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Notes */}
                <div className={styles.modal__group}>
                  <h3 className={styles.modal__groupTitle}>
                    Special Instructions
                  </h3>
                  <textarea
                    className={styles.modal__textarea}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. no onions, extra pepper..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Footer: Quantity and Add */}
              <div className={styles.modal__footer}>
                <div className={styles.modal__qtySelector}>
                  <button
                    type="button"
                    className={styles.modal__qtyBtn}
                    onClick={() => handleQtyChange(-1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={styles.modal__qtyDisplay}>{quantity}</span>
                  <button
                    type="button"
                    className={styles.modal__qtyBtn}
                    onClick={() => handleQtyChange(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.modal__addBtn}
                  onClick={handleAddToCart}
                >
                  <span>Add to cart</span>
                  <span>{fmt(totalPrice)}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
