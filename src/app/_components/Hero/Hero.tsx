"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Hero.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";

type HeroSlide = {
  id: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: "metroeats",
    headline: "Do you need to order meals?",
    description:
      "MetroEats is MetroMellow's in-house cloud kitchen serving freshly prepared homemade-style Nigerian meals, with dependable delivery and bulk meal options.",
    ctaLabel: "Order Meals",
    ctaHref: "/metroeats",
    backgroundImage: "/images/metroeats/metroeats-menu/jollof.png",
  },
  {
    id: "cleaning",
    headline: "Do you need cleaning?",
    description:
      "MetroMellow helps you book reliable home and office cleaning professionals in minutes, so your spaces stay fresh, organized, and ready for everyday living.",
    ctaLabel: "Book Cleaning",
    ctaHref: "/services/cleaning",
    backgroundImage: "/images/cleaning/sparkelr-3-back.jpeg",
  },
  {
    id: "laundry",
    headline: "Do you need laundry?",
    description:
      "Schedule easy pickup, professional washing, careful ironing, and doorstep delivery with MetroMellow, designed to make your weekly laundry routine effortless.",
    ctaLabel: "Schedule Laundry",
    ctaHref: "/services/laundry",
    backgroundImage: "/images/home/home4.jpeg",
  },
];

const Hero: FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const goToNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setActiveSlideIndex(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveSlideIndex(index);
  }, []);

  useEffect(() => {
    const autoSlideInterval = setInterval(goToNextSlide, 10000);
    return () => clearInterval(autoSlideInterval);
  }, [goToNextSlide]);

  const activeSlide = heroSlides[activeSlideIndex];

  return (
    <section
      className={styles.hero}
      role="banner"
      aria-label="MetroMellow Hero"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          className={styles.hero__slide}
          style={{ backgroundImage: `url(${activeSlide.backgroundImage})` }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.hero__overlay} />
        </motion.div>
      </AnimatePresence>

      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <motion.h1
            key={`${activeSlide.id}-headline`}
            className={styles.hero__title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            {activeSlide.headline}
          </motion.h1>

          <motion.p
            key={`${activeSlide.id}-description`}
            className={styles.hero__subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.14 }}
          >
            {activeSlide.description}
          </motion.p>

          <motion.div
            key={`${activeSlide.id}-cta`}
            className={styles.hero__cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <CTAButton
              variant="white"
              size="lg"
              fullWidth={false}
              href={activeSlide.ctaHref}
              animationType="pulse"
              animationIntensity="medium"
              animationInterval={2000}
            >
              {activeSlide.ctaLabel}
            </CTAButton>
          </motion.div>
        </div>
      </div>

      <div className={styles.hero__controls} aria-label="Hero slider controls">
        <button
          type="button"
          className={styles.hero__arrow}
          aria-label="Previous service slide"
          onClick={goToPreviousSlide}
        >
          &#10094;
        </button>

        <div
          className={styles.hero__dots}
          role="tablist"
          aria-label="Service slides"
        >
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-label={`Show ${slide.headline} slide`}
              aria-selected={index === activeSlideIndex}
              className={`${styles.hero__dot} ${
                index === activeSlideIndex ? styles["hero__dot--active"] : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.hero__arrow}
          aria-label="Next service slide"
          onClick={goToNextSlide}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default Hero;
