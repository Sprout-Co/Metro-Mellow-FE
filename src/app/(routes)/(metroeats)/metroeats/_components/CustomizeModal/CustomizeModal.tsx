"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useMetroEatsCart,
  type CartCustomization,
} from "../../_context/MetroEatsCartContext";
import styles from "./CustomizeModal.module.scss";

const PROTEIN_OPTIONS = [
  "No preference",
  "Chicken",
  "Beef",
  "Fish",
  "Turkey",
  "Goat",
  "Assorted",
];

// Mock add-ons for the stylish UI (you can map these from your DB later)
const MOCK_ADDONS = [
  { id: "a1", name: "Extra Plantain", price: 500 },
  { id: "a2", name: "Extra Egg", price: 300 },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function CustomizeModal() {
  const { customizationMeal, closeCustomize, addItem } = useMetroEatsCart();
  const [protein, setProtein] = useState("No preference");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Reset state when a new meal is selected
  useEffect(() => {
    if (customizationMeal) {
      setProtein("No preference");
      setNotes("");
      setQuantity(1);
      setSelectedAddons([]);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [customizationMeal]);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  const handleQtyChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Calculate total price dynamically
  const totalPrice = useMemo(() => {
    if (!customizationMeal) return 0;
    const basePrice = customizationMeal.price;
    const addonsPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = MOCK_ADDONS.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return (basePrice + addonsPrice) * quantity;
  }, [customizationMeal, selectedAddons, quantity]);

  const handleAddToCart = () => {
    if (!customizationMeal) return;

    const customization: CartCustomization = {};
    if (protein && protein !== "No preference") customization.protein = protein;
    if (notes.trim()) customization.notes = notes.trim();
    if (selectedAddons.length > 0) customization.addons = selectedAddons; // Assuming your context accepts this

    addItem(
      customizationMeal.mealId,
      customizationMeal.name,
      customizationMeal.price,
      quantity,
      Object.keys(customization).length ? customization : undefined,
      customizationMeal.style,
    );
    closeCustomize();
  };

  // Fallback image if customizationMeal doesn't have one
  const imageUrl =
    customizationMeal?.imageUrl ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <AnimatePresence>
      {customizationMeal && (
        <div className={styles.modal}>
          <motion.div
            className={styles.modal__backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCustomize}
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
              onClick={closeCustomize}
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
                <h2 className={styles.modal__title}>
                  {customizationMeal.name}
                </h2>
                <p className={styles.modal__price}>
                  {fmt(customizationMeal.price)} Base
                </p>
                {customizationMeal.description && (
                  <p className={styles.modal__desc}>
                    {customizationMeal.description}
                  </p>
                )}
              </div>

              <div className={styles.modal__scrollArea}>
                {/* Protein Selection */}
                <div className={styles.modal__group}>
                  <h3 className={styles.modal__groupTitle}>
                    Protein Preference
                  </h3>
                  <select
                    className={styles.modal__select}
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  >
                    {PROTEIN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add-ons (Checkbox Style from previous design) */}
                <div className={styles.modal__group}>
                  <h3 className={styles.modal__groupTitle}>Extra Add-ons</h3>
                  {MOCK_ADDONS.map((addon) => (
                    <label key={addon.id} className={styles.modal__optionLabel}>
                      <div className={styles.modal__optionMain}>
                        <input
                          type="checkbox"
                          className={styles.modal__optionInput}
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonToggle(addon.id)}
                        />
                        <span className={styles.modal__optionName}>
                          {addon.name}
                        </span>
                      </div>
                      <span className={styles.modal__optionPrice}>
                        +{fmt(addon.price)}
                      </span>
                    </label>
                  ))}
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
