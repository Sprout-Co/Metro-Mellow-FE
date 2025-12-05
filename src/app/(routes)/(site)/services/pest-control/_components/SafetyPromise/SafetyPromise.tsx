"use client";

import React, { useRef, useEffect } from "react";
import styles from "./SafetyPromise.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

const SafetyPromise = () => {
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
    <section className={styles.safetyPromise}>
      <div className={styles.safetyPromise__container}>
        <div className={styles.safetyPromise__content}>
          <motion.div
            className={styles.safetyPromise__textContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className={styles.safetyPromise__title}
              variants={fadeIn}
            >
              Smart, Safe <br />
              <span className={styles.safetyPromise__titleAmp}>&</span> Secure
            </motion.h2>

            <motion.p
              className={styles.safetyPromise__description}
              variants={fadeIn}
            >
              Eco-friendly, pet-safe pest control that keeps critters out and
              peace in.
            </motion.p>

            <motion.div className={styles.safetyPromise__cta} variants={fadeIn}>
              <CTAButton
                href={Routes.GET_STARTED}
                variant="primary"
                size="lg"
                animationType="vibrate"
                animationIntensity="intense"
              >
                GET STARTED
                <ArrowRightIcon className={styles.icon} />
              </CTAButton>
            </motion.div>
          </motion.div>

          <div className={styles.safetyPromise__imageWrapper}>
            <div className={styles.safetyPromise__checkmark}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyPromise;
