"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, X } from "lucide-react";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import styles from "./CartDrawer.module.scss";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const DELIVERY_FEE = 500;

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    closeCart,
    removeLine,
    updateQuantity,
    updateLineExtraQuantity,
    cartCount,
    cartTotal,
  } = useMetroEatsCart();

  const deliveryFee: number = DELIVERY_FEE;
  const orderTotal = cartTotal + deliveryFee;

  const handleProceedToCheckout = () => {
    closeCart();
    router.push("/metroeats/checkout");
  };

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
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            role="dialog"
            aria-label="Cart"
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.header__left}>
                <ShoppingBag size={22} strokeWidth={2} />
                <div className={styles.header__text}>
                  <h2 className={styles.header__title}>Your Order</h2>
                  {items.length > 0 && (
                    <span className={styles.header__count}>
                      {cartCount} item{cartCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className={styles.header__close}
                onClick={closeCart}
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.empty__illustration}>
                  <div className={styles.empty__circle} />
                  <ShoppingBag
                    size={48}
                    strokeWidth={1.5}
                    className={styles.empty__icon}
                  />
                </div>
                <h3 className={styles.empty__title}>Your cart is empty</h3>
                <p className={styles.empty__desc}>
                  Looks like you haven&apos;t added any meals yet. Browse our
                  menu and find something delicious!
                </p>
                <button
                  type="button"
                  className={styles.empty__cta}
                  onClick={closeCart}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <ul className={styles.list}>
                  <AnimatePresence initial={false}>
                    {items.map((line) => (
                      <motion.li
                        key={line.lineId}
                        className={styles.item}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className={styles.item__image}>
                          {line.image ? (
                            <Image
                              src={line.image}
                              alt={line.name}
                              fill
                              sizes="88px"
                              className={styles.item__img}
                              unoptimized
                            />
                          ) : (
                            <span className={styles.item__placeholder}>🍽</span>
                          )}
                          <span className={styles.item__badge}>
                            {line.style === "PLATE" ? "Plate" : "Bowl"}
                          </span>
                        </div>

                        <div className={styles.item__content}>
                          <div className={styles.item__top}>
                            <h4 className={styles.item__name}>{line.name}</h4>
                            <button
                              type="button"
                              className={styles.item__delete}
                              onClick={() => removeLine(line.lineId)}
                              aria-label={`Remove ${line.name}`}
                            >
                              <Trash2 size={16} strokeWidth={2} />
                            </button>
                          </div>

                          {(line.customization?.protein ||
                            line.customization?.notes) && (
                            <p className={styles.item__custom}>
                              {[
                                line.customization.protein,
                                line.customization.notes,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          )}

                          {line.extras && line.extras.length > 0 && (
                            <ul className={styles.item__extras}>
                              {line.extras.map((extra) => (
                                <li
                                  key={extra.id}
                                  className={styles.item__extra}
                                >
                                  <span className={styles.item__extraName}>
                                    + {extra.name}
                                  </span>
                                  <div className={styles.item__extraRow}>
                                    <div className={styles.qty}>
                                      <button
                                        type="button"
                                        className={styles.qty__btn}
                                        onClick={() =>
                                          updateLineExtraQuantity(
                                            line.lineId,
                                            extra.id,
                                            extra.quantity - 1,
                                          )
                                        }
                                        aria-label={`Decrease ${extra.name}`}
                                      >
                                        <Minus size={14} strokeWidth={2.5} />
                                      </button>
                                      <span className={styles.qty__value}>
                                        {extra.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        className={styles.qty__btn}
                                        onClick={() =>
                                          updateLineExtraQuantity(
                                            line.lineId,
                                            extra.id,
                                            extra.quantity + 1,
                                          )
                                        }
                                        aria-label={`Increase ${extra.name}`}
                                      >
                                        <Plus size={14} strokeWidth={2.5} />
                                      </button>
                                    </div>
                                    <span className={styles.item__extraPrice}>
                                      {fmt(extra.price * extra.quantity)}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className={styles.item__bottom}>
                            <div className={styles.qty}>
                              <button
                                type="button"
                                className={styles.qty__btn}
                                onClick={() =>
                                  updateQuantity(line.lineId, line.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} strokeWidth={2.5} />
                              </button>
                              <span className={styles.qty__value}>
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                className={styles.qty__btn}
                                onClick={() =>
                                  updateQuantity(line.lineId, line.quantity + 1)
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} strokeWidth={2.5} />
                              </button>
                            </div>
                            <span className={styles.item__price}>
                              {fmt(
                                line.price * line.quantity +
                                  (line.extras?.reduce(
                                    (s, e) => s + e.price * e.quantity,
                                    0,
                                  ) ?? 0),
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className={styles.footer}>
                  <div className={styles.summary}>
                    <div className={styles.summary__row}>
                      <span>Subtotal</span>
                      <span>{fmt(cartTotal)}</span>
                    </div>
                    <div className={styles.summary__row}>
                      <span>Delivery</span>
                      <span
                        className={
                          deliveryFee === 0 ? styles.summary__free : ""
                        }
                      >
                        {deliveryFee === 0 ? "Free" : fmt(deliveryFee)}
                      </span>
                    </div>
                    <div className={styles.summary__total}>
                      <span>Total</span>
                      <span>{fmt(orderTotal)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.checkout}
                    disabled={items.length === 0}
                    onClick={handleProceedToCheckout}
                  >
                    <span>Checkout</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
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
