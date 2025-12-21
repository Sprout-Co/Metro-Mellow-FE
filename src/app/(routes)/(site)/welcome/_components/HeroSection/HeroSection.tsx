"use client";

import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.scss";

const HeroSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "/images/home/hero4.png",
    "/images/home/hero6.png",
    "/images/home/hero3.png",
    "/images/home/hero5.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

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

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.heroSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={styles.heroSection__background}
          style={{
            backgroundImage: `url(${heroImages[currentSlide]})`,
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

      <div className={styles.heroSection__overlay}></div>
      <div className={styles.heroSection__container}>
        <div className={styles.heroSection__content}>
          <motion.h1
            className={styles.heroSection__title}
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            <span className={styles["heroSection__title--accent"]}>
              Premium
            </span>
            <span className={styles["heroSection__title--main"]}>
              Home Services
              <br />
              in Nigeria
            </span>
          </motion.h1>

          <motion.p
            className={styles.heroSection__subtitle}
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            Metromellow provides professional cleaning, cooking, laundry, and
            pest control services. Book your services today and experience
            premium home care delivered to your doorstep.
          </motion.p>

          <motion.div
            className={styles.heroSection__cta}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Button
              variant="white"
              size="lg"
              fullWidth={false}
              onClick={() => {
                const waitlistSection = document.getElementById("waitlist");
                if (waitlistSection) {
                  waitlistSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span>Join Waitlist</span>
              <ArrowRight className={styles.heroSection__buttonIcon} />
            </Button>
            <motion.p
              className={styles.heroSection__ctaText}
              initial="hidden"
              animate="visible"
              custom={3}
              variants={textVariants}
            >
              <span className={styles.heroSection__ctaNumber}>200+</span> people
              already joined
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className={styles.heroSection__indicators}>
        {heroImages.map((_, index) => (
          <motion.span
            key={index}
            className={`${styles.heroSection__indicator} ${index === currentSlide ? styles["heroSection__indicator--active"] : ""}`}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={textVariants}
            onClick={() => handleIndicatorClick(index)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
