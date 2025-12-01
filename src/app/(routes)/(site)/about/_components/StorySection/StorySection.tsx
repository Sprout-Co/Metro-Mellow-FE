"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./StorySection.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

const StorySection: React.FC = () => {
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
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <section className={styles.storySection}>
        <SignaturePattern />
        <div className={styles.storySection__container}>
          <div className={styles.storySection__content}>
        <motion.h2
          className={styles.storySection__title}
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
        >
          Why We Started
          <br />
          Metromellow
        </motion.h2>

        <motion.p
          className={styles.storySection__subtitle}
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
        >
          Modern life is demanding. Between work, commutes, personal responsibilities, and the daily grind of managing a home, there's never enough time. We saw too many people burning out, missing precious moments, and struggling to maintain the quality of life they work so hard to achieve.
        </motion.p>

            <motion.div
              className={styles.storySection__cta}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              whileHover="hover"
            >
              {/* <Button href="/bookings" size="lg" variant="primary">
                BOOK A SERVICE
              </Button> */}
              <CTAButton
                animationType="wobble"
                animationIntensity="intense"
                autoAnimate={1000}
                animationInterval={4000}
                variant="primary"
                size="lg"
                href={Routes.GET_STARTED}
              >
                BOOK A SERVICE
              </CTAButton>
              {/* <CTAButtonExample /> */}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StorySection;
