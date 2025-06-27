"use client"

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.scss';

const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero images array
  const heroImages = [
    '/images/home/hero4.png',
    '/images/home/hero6.png',
    '/images/home/hero3.png',
    '/images/home/hero5.png',
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    <section className={styles.hero}>
      {/* Sliding background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={styles.hero__background}
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
            <span className={styles['hero__title--accent']}>comfort</span>
            <span className={styles['hero__title--main']}>delivered to<br />your doorstep</span>
          </motion.h1>
          
          <motion.div
            className={styles.hero__cta}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link href="/get-started" className={styles.hero__button}>
              BOOK A SERVICE
            </Link>
          </motion.div>
        </div>
      </div>
      
      <div className={styles.hero__indicators}>
        {heroImages.map((_, index) => (
          <motion.span 
            key={index}
            className={`${styles.hero__indicator} ${index === currentSlide ? styles['hero__indicator--active'] : ''}`}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={indicatorVariants}
            onClick={() => handleIndicatorClick(index)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;