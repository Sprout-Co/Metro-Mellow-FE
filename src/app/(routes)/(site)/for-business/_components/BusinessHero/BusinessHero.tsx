"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./BusinessHero.module.scss";

const businessImages = [
  "/images/brand/b1.jpeg",
  "/images/brand/b2.jpeg",
  "/images/brand/b3.jpeg",
];

const BusinessHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % businessImages.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, []);

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

  const slideVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const scrollIndicatorVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.businessHero}>
      {/* Sliding background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={styles.businessHero__background}
          style={{
            backgroundImage: `url(${businessImages[currentSlide]})`,
          }}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      <div className={styles.businessHero__overlay}></div>
      <div className={styles.businessHero__container}>
        <div className={styles.businessHero__content}>
          <motion.h1
            className={styles.businessHero__title}
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            Enterprise Solutions for Modern Businesses
          </motion.h1>

          <motion.p
            className={styles.businessHero__subtitle}
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            Streamline operations, boost productivity, and enhance employee
            satisfaction with our comprehensive B2B service platform
          </motion.p>

          <motion.div
            className={styles.businessHero__cta}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Button
              variant="primary"
              size="lg"
              className={styles.businessHero__button}
              rightIcon={<ArrowRight size={18} />}
            >
              Get Enterprise Quote
            </Button>

            <Button
              variant="white"
              size="lg"
              className={styles.businessHero__button}
              rightIcon={<Calendar size={18} />}
            >
              Schedule Demo
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className={styles.businessHero__indicators}>
        {businessImages.map((_, index) => (
          <motion.span
            key={index}
            className={`${styles.businessHero__indicator} ${index === currentSlide ? styles["businessHero__indicator--active"] : ""}`}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={textVariants}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.businessHero__scrollIndicator}
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
      >
        <ArrowRight size={24} className={styles.businessHero__scrollIcon} />
      </motion.div>
    </section>
  );
};

export default BusinessHero;
