"use client";

import React, { useEffect, useState } from "react";
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

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function CustomizeModal() {
  const { customizationMeal, closeCustomize, addItem } = useMetroEatsCart();
  const [protein, setProtein] = useState("No preference");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (customizationMeal) {
      setProtein("No preference");
      setNotes("");
    }
  }, [customizationMeal]);

  useEffect(() => {
    if (customizationMeal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [customizationMeal]);

  const handleAddToCart = () => {
    if (!customizationMeal) return;
    const customization: CartCustomization = {};
    if (protein && protein !== "No preference") customization.protein = protein;
    if (notes.trim()) customization.notes = notes.trim();
    addItem(
      customizationMeal.mealId,
      customizationMeal.name,
      customizationMeal.price,
      1,
      Object.keys(customization).length ? customization : undefined,
    );
    closeCustomize();
  };

  return (
    <AnimatePresence>
      {customizationMeal && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCustomize}
            aria-hidden
          />
          <motion.div
            className={styles.modal}
            // initial={{ opacity: 0, scale: 0.96 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0.96 }}
            // transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Customize your meal"
          >
            <div className={styles.modal__header}>
              <h2 className={styles.modal__title}>Customize your order</h2>
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
            </div>
            <div className={styles.modal__body}>
              <p className={styles.modal__mealName}>{customizationMeal.name}</p>
              <p className={styles.modal__mealPrice}>
                {fmt(customizationMeal.price)}
              </p>

              <label className={styles.modal__label}>
                Protein preference
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
              </label>

              <label className={styles.modal__label}>
                Special instructions (optional)
                <textarea
                  className={styles.modal__textarea}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. no onions, extra sauce..."
                  rows={3}
                />
              </label>
            </div>
            <div className={styles.modal__footer}>
              <button
                type="button"
                className={styles.modal__cancel}
                onClick={closeCustomize}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.modal__add}
                onClick={handleAddToCart}
              >
                Add to cart — {fmt(customizationMeal.price)}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
