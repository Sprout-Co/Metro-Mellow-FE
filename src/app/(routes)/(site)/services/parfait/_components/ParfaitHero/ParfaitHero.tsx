"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ParfaitHero.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import ParfaitAnimation from "../ParfaitAnimation/ParfaitAnimation";

const ParfaitHero: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className={styles["parfait-hero"]}>
      <div className={styles["parfait-hero__container"]}>
        <div className={styles["parfait-hero__content"]}>
          <motion.div
            className={styles["parfait-hero__text"]}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className={styles["parfait-hero__title"]}
              custom={1}
              variants={textVariants}
            >
              Build Your Perfect
              <span className={styles["parfait-hero__title--accent"]}>
                {" "}
                Parfait Paradise
              </span>
            </motion.h1>
            <motion.p
              className={styles["parfait-hero__subtitle"]}
              custom={2}
              variants={textVariants}
            >
              Layer by layer, create your dream parfait with fresh ingredients,
              artisanal yogurt, and delightful toppings delivered right to your
              door
            </motion.p>
            <motion.div
              className={styles["parfait-hero__cta"]}
              custom={3}
              variants={textVariants}
            >
              <CTAButton
                variant="primary"
                size="lg"
                href="#builder"
                animationType="wobble"
              >
                Start Building
              </CTAButton>
              <CTAButton variant="white" size="lg" href="#menu">
                View Menu
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles["parfait-hero__visual"]}>
          <ParfaitAnimation />
        </div>
      </div>
      <div className={styles["parfait-hero__decorations"]}>
        <motion.div
          className={styles["parfait-hero__berry"]}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍓
        </motion.div>
        <motion.div
          className={styles["parfait-hero__blueberry"]}
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🫐
        </motion.div>
      </div>
    </section>
  );
};

export default ParfaitHero;
