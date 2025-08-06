"use client";

import { motion } from "framer-motion";
import styles from "./CleaningHero.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const CleaningHero = () => {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.hero__overlay}></div>
      <div className={styles.hero__container}>
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.hero__title} variants={fadeIn}>
            <span className={styles["hero__title--accent"]}>Cleaning</span> That
            <br />
            <span className={styles["hero__title--main"]}>
              Sparkles & Shines
            </span>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            We turn mess into mellow magic — deep cleaning, tidying, and
            everything in between.
          </motion.p>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            <CTAButton
              href={Routes.GET_STARTED}
              size="lg"
              animationType="wobble"
              animationIntensity="intense"
            >
              BOOK CLEANING
              <ArrowRightIcon className={styles.icon} />
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningHero;
