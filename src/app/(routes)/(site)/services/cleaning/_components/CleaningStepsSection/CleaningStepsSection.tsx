"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./CleaningStepsSection.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const CleaningStepsSection = ({ onCTAClick }: { onCTAClick: () => void }) => {
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
    <section className={styles.cleaningSteps}>
      <div className={styles.cleaningSteps__container}>
        <div className={styles.cleaningSteps__illustration}>
          <motion.div
            className={styles.cleaningSteps__content}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className={styles.cleaningSteps__title}
              variants={fadeIn}
            >
              What do I <br />
              Need to do?
            </motion.h2>

            <motion.p
              className={styles.cleaningSteps__subtitle}
              variants={fadeIn}
            >
              Get your space sparkling clean with just a few clicks.
            </motion.p>
          </motion.div>
          <motion.ul
            className={styles.cleaningSteps__steps}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.li variants={fadeIn}>
              <span className={styles.cleaningSteps__step}>1</span>
              <span className={styles.cleaningSteps__stepText}>
                Choose your cleaning service.
              </span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.cleaningSteps__step}>2</span>
              <span className={styles.cleaningSteps__stepText}>
                Schedule your appointment.
              </span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.cleaningSteps__step}>3</span>
              <span className={styles.cleaningSteps__stepText}>
                Enjoy your clean space.
              </span>
            </motion.li>
          </motion.ul>
        </div>
      </div>

      <motion.div
        className={styles.cleaningSteps__cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <CTAButton
          onClick={onCTAClick}
          size="lg"
          animationType="vibrate"
          animationIntensity="intense"
        >
          BOOK CLEANING
          <ArrowRightIcon className={styles.icon} />
        </CTAButton>
      </motion.div>
    </section>
  );
};

export default CleaningStepsSection;
