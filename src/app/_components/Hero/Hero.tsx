"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";

const Hero: FC = () => {
  // Animation variants
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

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.hero} role="banner">
      {/* Background image */}
      <div
        className={styles.hero__background}
        style={{
          backgroundImage: `url(/images/cleaning/sparkeler-back-image.png)`,
        }}
      />

      <div className={styles.hero__overlay}></div>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__title}
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            <span className={styles["hero__title--accent"]}>Professional</span>
            <span className={styles["hero__title--word"]}>Home</span>
            <span className={styles["hero__title--word"]}>Services</span>
          </motion.h1>

          <motion.p
            className={styles.hero__subtitle}
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            Trusted professionals for{" "}
            <Link
              href="/services/cleaning"
              className={styles.hero__subtitleHighlight}
            >
              house cleaning
            </Link>
            ,{" "}
            <Link
              href="/services/laundry"
              className={styles.hero__subtitleHighlight}
            >
              laundry service
            </Link>
            ,{" "}
            <Link
              href="/services/food"
              className={styles.hero__subtitleHighlight}
            >
              fresh meal delivery
            </Link>
            , and{" "}
            <Link
              href="/services/pest-control"
              className={styles.hero__subtitleHighlight}
            >
              pest control
            </Link>{" "}
            Same-day service available.
          </motion.p>

          <motion.div
            className={styles.hero__cta}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            whileHover="hover"
          >
            {/* <Link href="/get-started" className={styles.hero__button}>
              BOOK A SERVICE
            </Link> */}
            <CTAButton
              variant="white"
              size="lg"
              fullWidth={false}
              href={Routes.GET_STARTED}
              animationType="wobble"
              animationIntensity="intense"
              animationInterval={1500}
            >
              Get Started Today
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
