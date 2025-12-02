"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ArrowRight, X } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import Portal from "@/components/ui/Portal/Portal";
import styles from "./WelcomeModal.module.scss";

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector(selectUser);

  const firstName = user?.firstName || "Friend";

  useEffect(() => {
    const isWelcome = searchParams.get("welcome") === "true";
    if (isWelcome) {
      // Small delay for smooth entrance after page load
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    // Remove the welcome param from URL without refresh
    const url = new URL(window.location.href);
    url.searchParams.delete("welcome");
    router.replace(url.pathname, { scroll: false });
  };

  const handleGetStarted = () => {
    handleClose();
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button className={styles.closeBtn} onClick={handleClose}>
                <X size={20} />
              </button>

              {/* Decorative elements */}
              <div className={styles.decorations}>
                <motion.div
                  className={`${styles.sparkle} ${styles["sparkle--1"]}`}
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={24} />
                </motion.div>
                <motion.div
                  className={`${styles.sparkle} ${styles["sparkle--2"]}`}
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} />
                </motion.div>
                <motion.div
                  className={`${styles.sparkle} ${styles["sparkle--3"]}`}
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={16} />
                </motion.div>
              </div>

              {/* Content */}
              <div className={styles.content}>
                {/* Emoji wave */}
                <motion.div
                  className={styles.wave}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  👋
                </motion.div>

                {/* Welcome heading */}
                <motion.h1
                  className={styles.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome, {firstName}!
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className={styles.subtitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  We&apos;re so happy to have you here! 🎉
                </motion.p>

                {/* Message */}
                <motion.p
                  className={styles.message}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Your account is all set up and ready to go. From fresh laundry
                  to spotless spaces, we&apos;re here to make your life easier.
                </motion.p>

                {/* Features list */}
                <motion.ul
                  className={styles.features}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <li>
                    <span className={styles.featureIcon}>🧺</span>
                    Schedule your first laundry pickup
                  </li>
                  <li>
                    <span className={styles.featureIcon}>🏠</span>
                    Book home cleaning services
                  </li>
                  <li>
                    <span className={styles.featureIcon}>⭐</span>
                    Earn rewards with every order
                  </li>
                </motion.ul>

                {/* CTA Button */}
                <motion.button
                  className={styles.ctaBtn}
                  onClick={handleGetStarted}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let&apos;s Get Started
                  <ArrowRight size={18} />
                </motion.button>
              </div>

              {/* Footer tagline */}
              <motion.p
                className={styles.tagline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Made with <Heart size={12} className={styles.heart} /> by
                Metromellow
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default WelcomeModal;
