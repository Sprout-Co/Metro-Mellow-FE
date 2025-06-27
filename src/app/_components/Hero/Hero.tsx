"use client"

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.scss';

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

  return (
    <section className={styles.hero}>
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
        {[0, 1, 2, 3].map((_, index) => (
          <motion.span 
            key={index}
            className={`${styles.hero__indicator} ${index === 0 ? styles['hero__indicator--active'] : ''}`}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={indicatorVariants}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;