"use client";

import { motion } from "framer-motion";
import styles from "./FoodHero.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";

const FoodHero = () => {
  const handleOrderMeal = () => {
    console.log("Order meal clicked");
    // Handle order meal action, e.g., redirect to order page or open order modal
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
            <span className={styles["hero__title--accent"]}>Hungry</span> for
            <br />
            <span className={styles["hero__title--main"]}>
              hassle-free eat?
            </span>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            MetroMellow delivers flavor with fervor! From comfort grub to
            gourmet goodies, we bring the city's best bites to your door.
          </motion.p>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            <CTAButton
              onClick={handleOrderMeal}
              animationType="wobble"
              animationIntensity="intense"
              size="lg"
            >
              ORDER A MEAL
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodHero;
