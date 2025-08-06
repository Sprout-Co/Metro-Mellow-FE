"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import { ArrowRightIcon } from "lucide-react";

const PestControlHero = () => {
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
            <div className={styles.hero__titleLine}>
              <span className={styles["hero__title--accent"]}>Bugged</span> Out?
            </div>
            <div className={styles.hero__titleLine}>
              <span className={styles["hero__title--main"]}>
                We Are Here To Help
              </span>
            </div>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            Tiny pests, big problem? We exterminate stress and pests alike.
          </motion.p>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            <CTAButton
              href={Routes.GET_STARTED}
              size="lg"
              animationType="vibrate"
              animationIntensity="intense"
            >
              GET PEST CONTROL
              <ArrowRightIcon className={styles.icon} />
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PestControlHero;
