"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";
import Portal from "@/components/ui/Portal/Portal";
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
        <div className={styles.wrapper}>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.article
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            {/* Left side - Visual */}
            <div className={styles.visual}>
              <div className={styles.giftIcon}>
                <Gift strokeWidth={1.5} />
              </div>
              <div className={styles.discount}>
                <span className={styles.discountNum}>{PROMO.DISCOUNT}</span>
                <div className={styles.discountMeta}>
                  <span className={styles.percent}>%</span>
                  <span className={styles.off}>OFF</span>
                </div>
              </div>
              <div className={styles.ornament} />
              <div className={styles.ornament2} />
            </div>

            {/* Right side - Content */}
            <div className={styles.body}>
              <button
                className={styles.close}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <span className={styles.badge}>Holiday Special</span>

              <h2 className={styles.heading}>
                Make Your Home
                <br />
                <em>Sparkle</em> This Season
              </h2>

              <p className={styles.text}>
                Professional cleaning services at a special holiday price.
                Limited time offer.
              </p>

              <div className={styles.codeBox}>
                <span>Code:</span>
                <strong>{PROMO.CODE}</strong>
              </div>

              <button className={styles.cta} onClick={goToOffer}>
                Claim Offer
                <ArrowRight size={18} />
              </button>

              <span className={styles.terms}>
                Ends Dec 31, 2025 • All cleaning services
              </span>
            </div>
          </motion.article>
        </div>
      </AnimatePresence>
    </Portal>
  );
};

export default ChristmasPromoModal;
