"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import styles from "./CartDrawer.module.scss";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeLine,
    updateQuantity,
    cartCount,
    cartTotal,
  } = useMetroEatsCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-label="Cart"
          >
            <div className={styles.drawer__header}>
              <h2 className={styles.drawer__title}>Your cart</h2>
              <button
                type="button"
                className={styles.drawer__close}
                onClick={closeCart}
                aria-label="Close cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className={styles.drawer__empty}>
                <p>Your cart is empty</p>
                <p className={styles.drawer__emptySub}>
                  Add meals from our menu to get started.
                </p>
              </div>
            ) : (
              <>
                <ul className={styles.drawer__list}>
                  {items.map((line) => (
                    <li key={line.lineId} className={styles.drawer__item}>
                      <div className={styles.drawer__itemInfo}>
                        <span className={styles.drawer__itemName}>{line.name}</span>
                        {(line.customization?.protein || line.customization?.notes) && (
                          <span className={styles.drawer__itemCustom}>
                            {[line.customization.protein, line.customization.notes]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        )}
                        <span className={styles.drawer__itemPrice}>
                          {fmt(line.price)} × {line.quantity}
                        </span>
                      </div>
                      <div className={styles.drawer__itemActions}>
                        <div className={styles.drawer__qty}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className={styles.drawer__remove}
                          onClick={() => removeLine(line.lineId)}
                          aria-label={`Remove ${line.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles.drawer__footer}>
                  <div className={styles.drawer__totalRow}>
                    <span>Total</span>
                    <span className={styles.drawer__totalAmount}>{fmt(cartTotal)}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.drawer__checkout}
                    disabled={items.length === 0}
                  >
                    Proceed to checkout ({cartCount} item{cartCount !== 1 ? "s" : ""})
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
