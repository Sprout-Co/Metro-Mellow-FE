"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Star } from "lucide-react";
import Portal from "@/components/ui/Portal/Portal";
import styles from "./ChristmasPromoModal.module.scss";
import { Button } from "../Button";

const PROMO = {
  DISCOUNT: 20,
  EXPIRES: "2025-12-31T23:59:59",
  CODE: "XMAS2025",
  LINK: "/services/cleaning#services-showcase",
};

// Generate random snowflakes
const generateSnowflakes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 4 + Math.random() * 8,
  }));
};

const snowflakes = generateSnowflakes(30);

const ChristmasPromoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (new Date() > new Date(PROMO.EXPIRES)) return;
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  const goToOffer = () => {
    setIsOpen(false);
    router.push(PROMO.LINK);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        <div className={styles.promo}>
          <motion.div
            className={styles.promo__overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className={styles.promo__card}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Snowfall Effect */}
            <div className={styles.promo__snow}>
              {snowflakes.map((flake) => (
                <div
                  key={flake.id}
                  className={styles.promo__snowflake}
                  style={{
                    left: `${flake.left}%`,
                    animationDelay: `${flake.delay}s`,
                    animationDuration: `${flake.duration}s`,
                    width: `${flake.size}px`,
                    height: `${flake.size}px`,
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              className={styles.promo__close}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            {/* Decorative ornaments */}
            <div className={styles.promo__ornaments}>
              <div
                className={`${styles.promo__ornament} ${styles["promo__ornament--red"]}`}
              />
              <div
                className={`${styles.promo__ornament} ${styles["promo__ornament--gold"]}`}
              />
              <div
                className={`${styles.promo__ornament} ${styles["promo__ornament--green"]}`}
              />
            </div>

            {/* Stars decoration */}
            <div className={styles.promo__stars}>
              <Star
                className={styles.promo__star}
                size={12}
                fill="currentColor"
              />
              <Star
                className={styles.promo__star}
                size={16}
                fill="currentColor"
              />
              <Star
                className={styles.promo__star}
                size={10}
                fill="currentColor"
              />
            </div>

            {/* Main Content */}
            <div className={styles.promo__content}>
              {/* Header Badge */}
              <div className={styles.promo__badge}>
                <Gift size={14} strokeWidth={2} />
                <span>Holiday Special</span>
              </div>

              {/* Discount Display */}
              <div className={styles.promo__discountWrap}>
                <span className={styles.promo__discountNum}>
                  {PROMO.DISCOUNT}
                </span>
                <div className={styles.promo__discountMeta}>
                  <span className={styles.promo__percent}>%</span>
                  <span className={styles.promo__off}>OFF</span>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className={styles.promo__title}>Christmas Cleaning Sale</h2>
              <p className={styles.promo__desc}>
                Make your home sparkle this holiday season with our premium
                cleaning services
              </p>

              {/* Promo Code */}
              <div className={styles.promo__codeBox}>
                <div className={styles.promo__codeLabel}>
                  Use code at checkout
                </div>
                <div className={styles.promo__code}>
                  <code>{PROMO.CODE}</code>
                  <div className={styles.promo__codeDeco} />
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="secondary"
                className={styles.promo__cta}
                onClick={goToOffer}
              >
                <span>Redeem Offer</span>
                <Gift size={18} />
              </Button>

              {/* Footer */}
              <p className={styles.promo__footer}>
                <span className={styles.promo__footerIcon}>✨</span>
                Valid until December 31, 2025
              </p>
            </div>

            {/* Bottom decoration */}
            <div className={styles.promo__pine}>
              <svg viewBox="0 0 400 60" preserveAspectRatio="none">
                <path
                  d="M0,60 L0,40 Q50,20 100,35 T200,25 T300,35 T400,30 L400,60 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Portal>
  );
};

export default ChristmasPromoModal;
