// src/app/(routes)/(site)/blog/_components/BlogHero/BlogHero.tsx
"use client";

import { motion } from "framer-motion";
import styles from "./BlogHero.module.scss";

export default function BlogHero() {
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
    <section className={styles["hero"]}>
      <div className={styles["hero__overlay"]}></div>
      <div className={styles["hero__container"]}>
        <motion.div
          className={styles["hero__content"]}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span className={styles["hero__label"]} variants={fadeIn}>
            BLOG & INSIGHTS
          </motion.span>

          <motion.h1 className={styles["hero__title"]} variants={fadeIn}>
            <span className={styles["hero__title--accent"]}>Expert Tips</span>{" "}
            for
            <br />
            <span className={styles["hero__title--main"]}>Your Lagos Home</span>
          </motion.h1>

          <motion.p className={styles["hero__description"]} variants={fadeIn}>
            Discover professional advice, maintenance tips, and insights to keep
            your home clean, organized, and comfortable all year round.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className={styles["hero__decoration"]}>
        <div className={styles["hero__decoration--shape1"]}></div>
        <div className={styles["hero__decoration--shape2"]}></div>
        <div className={styles["hero__decoration--shape3"]}></div>
      </div>
    </section>
  );
}
