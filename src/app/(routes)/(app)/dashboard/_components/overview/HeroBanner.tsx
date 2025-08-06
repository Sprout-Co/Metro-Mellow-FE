'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroBanner.module.scss';

export default function HeroBanner() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__content}>
        <motion.div 
          className={styles.hero__textContent}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className={styles.hero__title}>Welcome Back, John!</h1>
          <p className={styles.hero__subtitle}>
            Here's what's happening with your home services today.
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.hero__illustration}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
      >
        <Image 
          src="/images/home/hero-house.png"
          alt="Home illustration"
          width={300}
          height={200}
          className={styles.hero__image}
        />
      </motion.div>
    </div>
  );
}