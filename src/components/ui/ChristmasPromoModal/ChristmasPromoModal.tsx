"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Portal from "@/components/ui/Portal/Portal";
import { Button } from "../Button";
import styles from "./ChristmasPromoModal.module.scss";

const PROMO = {
  DISCOUNT: 20,
  EXPIRES: "2025-12-31T23:59:59",
  CODE: "XMAS2025",
  LINK: "/services/cleaning#services-showcase",
};

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Left Visual Panel */}
            <div className={styles.promo__visual}>
              <div className={styles.promo__icon}>
                <Sparkles strokeWidth={1.5} />
              </div>
              <div className={styles.promo__discount}>
                <span className={styles.promo__discountNum}>
                  {PROMO.DISCOUNT}
                </span>
                <div className={styles.promo__discountMeta}>
                  <span className={styles.promo__percent}>%</span>
                  <span className={styles.promo__off}>OFF</span>
                </div>
              </div>
              <p className={styles.promo__visualText}>Holiday Special</p>
            </div>

            {/* Right Content Panel */}
            <div className={styles.promo__body}>
              <button
                className={styles.promo__close}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <h2 className={styles.promo__title}>Christmas Cleaning Sale</h2>

              <p className={styles.promo__desc}>
                Get your home sparkling clean for the holidays with our
                professional cleaning services.
              </p>

              <div className={styles.promo__code}>
                <span>Use code</span>
                <code>{PROMO.CODE}</code>
              </div>

              <button className={styles.promo__cta} onClick={goToOffer}>
                Redeem Offer
              </button>

              <p className={styles.promo__footer}>
                Valid until December 31, 2025
              </p>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Portal>
  );
};

export default ChristmasPromoModal;
