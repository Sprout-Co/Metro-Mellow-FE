"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./CleaningHero.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";

type CleaningHeroProps = {
  onCTAClick: () => void;
};

const textSlides = [
  "Professional cleaning services across Lagos.",
  "Deep cleaning, regular maintenance, and more—satisfaction guaranteed.",
  "Flexible scheduling for homes, offices, and apartments.",
];

const CleaningHero = ({ onCTAClick }: CleaningHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % textSlides.length),
      3500,
    );

    return () => clearInterval(interval);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.hero} aria-label="Cleaning services in Lagos">
      <div className={styles.hero__videoContainer} aria-hidden="true">
        <video
          className={styles.hero__video}
          src="/videos/cleaning-banner.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className={styles.hero__overlay} />

      <div className={styles.hero__container}>
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.hero__title} variants={fadeIn}>
            <span className={styles["hero__title--accent"]}>Cleaning</span>{" "}
            <span className={styles["hero__title--main"]}>
              Service in Lagos
            </span>
          </motion.h1>

          <motion.div className={styles.hero__slider} variants={fadeIn}>
            <AnimatePresence mode="wait">
              <motion.span
                key={textSlides[currentIndex]}
                className={styles.hero__sliderText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {textSlides[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            <CTAButton
              onClick={onCTAClick}
              size="lg"
              animationType="wobble"
              animationIntensity="intense"
            >
              BOOK CLEANING
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningHero;
