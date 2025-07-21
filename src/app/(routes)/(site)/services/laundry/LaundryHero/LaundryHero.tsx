"use client";

import { motion } from "framer-motion";
import styles from "./LaundryHero.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const LaundryHero = () => {
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
            <span className={styles["hero__title--accent"]}>metromellow</span>
            <br />
            <span className={styles["hero__title--main"]}>Wash & Wow</span>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            Turn your dirty laundry blues into crisp, clean tunes. We pickup and
            deliver.
          </motion.p>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            <CTAButton
              href={Routes.GET_STARTED}
              size="lg"
              animationType="vibrate"
              animationIntensity="intense"
            >
              BOOK LAUNDRY
              <ArrowRightIcon className={styles.icon} />
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaundryHero;
