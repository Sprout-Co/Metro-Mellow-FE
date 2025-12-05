"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./OrderStepsSection.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import { ArrowRightIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

const OrderStepsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const steps = [
    { id: 1, text: "Choose your crave" },
    { id: 2, text: "Track your order" },
    { id: 3, text: "Enjoy every bite" },
  ];

  return (
    <section className={styles.orderSteps}>
      <motion.div
        className={styles.orderSteps__container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div
          className={styles.orderSteps__imageWrapper}
          variants={imageVariants}
        >
          <div className={styles.orderSteps__imageDecoration}></div>
          <Image
            src="/images/food/plate-svg.png"
            alt="Plate with delicious food"
            width={600}
            height={600}
            className={styles.orderSteps__image}
            priority
          />
        </motion.div>

        <div className={styles.orderSteps__content}>
          <motion.div className={styles.orderSteps__textContent}>
            <motion.h2
              className={styles.orderSteps__title}
              variants={itemVariants}
            >
              What do I <br className={styles.orderSteps__titleBreak} />
              Need to do?
            </motion.h2>

            <motion.p
              className={styles.orderSteps__subtitle}
              variants={itemVariants}
            >
              Tap into tasty with just a few clicks.
            </motion.p>
          </motion.div>

          <div className={styles.orderSteps__stepsWrapper}>
            <ul className={styles.orderSteps__steps}>
              {steps.map((step, index) => (
                <motion.li
                  key={step.id}
                  className={styles.orderSteps__stepItem}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <span className={styles.orderSteps__stepNumber}>
                    {step.id}
                  </span>
                  <span className={styles.orderSteps__stepText}>
                    {step.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className={styles.orderSteps__cta}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.2,
                yoyo: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Button
              variant="secondary"
              size="lg"
              disabled
              className={styles.orderSteps__button}
            >
              <Clock size={16} style={{ marginRight: "8px" }} />
              Coming Soon
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OrderStepsSection;
