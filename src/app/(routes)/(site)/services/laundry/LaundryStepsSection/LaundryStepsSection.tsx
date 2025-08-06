"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./LaundryStepsSection.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import { ArrowRightIcon } from "lucide-react";

const LaundryStepsSection = () => {
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
    <section className={styles.laundrySteps}>
      <div className={styles.laundrySteps__container}>
        <div className={styles.laundrySteps__illustration}>
          <motion.div
            className={styles.laundrySteps__content}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className={styles.laundrySteps__title} variants={fadeIn}>
              How Laundry
              <br />
              Works
            </motion.h2>
            <motion.p
              className={styles.laundrySteps__subtitle}
              variants={fadeIn}
            >
              Get your laundry done in three easy steps.
            </motion.p>
          </motion.div>
          <motion.ul
            className={styles.laundrySteps__steps}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.li variants={fadeIn}>
              <span className={styles.laundrySteps__step}>1</span>
              <span className={styles.laundrySteps__stepText}>
                Choose your laundry service.
              </span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.laundrySteps__step}>2</span>
              <span className={styles.laundrySteps__stepText}>
                Schedule your pickup.
              </span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.laundrySteps__step}>3</span>
              <span className={styles.laundrySteps__stepText}>
                Get fresh, folded laundry delivered.
              </span>
            </motion.li>
          </motion.ul>
        </div>
      </div>
      <motion.div
        className={styles.laundrySteps__cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <CTAButton
          href={Routes.GET_STARTED}
          size="lg"
          animationType="vibrate"
          animationIntensity="intense"
        >
          START LAUNDRY
          <ArrowRightIcon className={styles.icon} />
        </CTAButton>
      </motion.div>
    </section>
  );
};

export default LaundryStepsSection;
