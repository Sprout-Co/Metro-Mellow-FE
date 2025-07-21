"use client";

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './BusinessHero.module.scss';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';

const BusinessHero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Business hero images array
  const businessImages = [
    '/images/corporate/cp12.png',
    '/images/corporate/cp1.png',
    '/images/corporate/cp3.png',
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % businessImages.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [businessImages.length]);

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

  const indicatorVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.7 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut",
      },
    }),
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
            <span className={styles["businessHero__title--accent"]}>Corporate</span>
            <span className={styles["businessHero__title--main"]}>
              Facility
              <br />
              Services
            </span>
          </motion.h1>

          <motion.p
            className={styles.businessHero__subtitle}
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            Transform your workplace with comprehensive facility services. Professional cleaning, catering, laundry, and pest control - all managed seamlessly for your business.
          </motion.p>

          <motion.div
            className={styles.businessHero__cta}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            whileHover="hover"
          >
            <Button variant="white" size='lg' fullWidth={false} rightIcon={<ArrowRight size={18} />}>
              Get Enterprise Quote
            </Button>
            <Button variant="white" size='lg' fullWidth={false} rightIcon={<Calendar size={18} />}>
              Schedule Demo
            </Button>
          </motion.div>
        </div>
      </div>

      <div className={styles.businessHero__indicators}>
        {businessImages.map((_, index) => (
          <motion.span
            key={index}
            className={`${styles.businessHero__indicator} ${index === currentSlide ? styles["businessHero__indicator--active"] : ""}`}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={indicatorVariants}
            onClick={() => handleIndicatorClick(index)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </section>
  );
};

export default BusinessHero;
