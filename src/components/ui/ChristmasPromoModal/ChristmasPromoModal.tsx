"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Portal from "@/components/ui/Portal/Portal";
import styles from "./ChristmasPromoModal.module.scss";

const CHRISTMAS_PROMO = {
  DISCOUNT_PERCENTAGE: 20,
  EXPIRATION_DATE: "2025-12-31T23:59:59",
  PROMO_CODE: "XMAS2025",
  CTA_LINK: "/services/cleaning#services-showcase",
};

const isPromotionActive = (expirationDate: string): boolean => {
  return new Date() < new Date(expirationDate);
};

interface ChristmasPromoModalProps {
  delayMs?: number;
}

const ChristmasPromoModal: React.FC<ChristmasPromoModalProps> = ({
  delayMs = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPromotionActive(CHRISTMAS_PROMO.EXPIRATION_DATE)) return;
    const timer = setTimeout(() => setIsOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen]);

  const handleCTA = () => {
    setIsOpen(false);
    router.push(CHRISTMAS_PROMO.CTA_LINK);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        <div className={styles.overlay}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <Sparkles size={28} />
              </div>

              <span className={styles.tag}>Limited Time Offer</span>

              <h2 className={styles.title}>
                Christmas <span>Sale</span>
              </h2>

              <p className={styles.subtitle}>
                Get your home sparkling clean for the holidays
              </p>

              <div className={styles.discountBox}>
                <span className={styles.discountValue}>
                  {CHRISTMAS_PROMO.DISCOUNT_PERCENTAGE}%
                </span>
                <span className={styles.discountLabel}>OFF</span>
              </div>

              <p className={styles.description}>on all cleaning services</p>

              <div className={styles.codeWrapper}>
                <span className={styles.codeLabel}>Use code</span>
                <code className={styles.code}>
                  {CHRISTMAS_PROMO.PROMO_CODE}
                </code>
              </div>

              <button className={styles.ctaBtn} onClick={handleCTA}>
                Book Now
              </button>

              <p className={styles.expiry}>Valid until December 31, 2025</p>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Portal>
  );
};

export default ChristmasPromoModal;
