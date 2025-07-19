"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./StorySection.module.scss";
import { Button } from "@/components/ui/Button/Button";
import VideoSection from "../VideoSection/VideoSection";
import CTAButtonExample from "@/components/ui/Button/CTAButton/CTAButtonExample";

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
        <div className={styles.storySection__container}>
          <div className={styles.storySection__content}>
            <motion.h2
              className={styles.storySection__title}
              initial="hidden"
              animate="visible"
              custom={1}
              variants={textVariants}
            >
              Our Story:
              <br />
              From Frazzle
              <br />
              to Dazzle
            </motion.h2>

            <motion.p
              className={styles.storySection__subtitle}
              initial="hidden"
              animate="visible"
              custom={2}
              variants={textVariants}
            >
              We're the spark that turns your chaos into calm, the groove that
              gets your life back in tune.
            </motion.p>

            <motion.div
              className={styles.storySection__cta}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button href="/bookings" size="lg" variant="primary">
                BOOK A SERVICE
              </Button>
              <CTAButtonExample />
            </motion.div>
          </div>
        </div>
        <VideoSection />
      </section>
    </>
  );
};

export default StorySection;
