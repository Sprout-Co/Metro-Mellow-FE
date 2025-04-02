// components/home/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <motion.h1 
            className={styles.hero__title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Home Services <span className={styles['hero__title--highlight']}>Made Easy</span>
          </motion.h1>
          
          <motion.p 
            className={styles.hero__description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Professional cleaning, laundry, cooking, errands, and pest control services 
            that bring comfort and peace to your home.
          </motion.p>
          
          <motion.div 
            className={styles.hero__cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/services" className={styles.hero__button}>
              Explore Services
            </Link>
            <Link href="/contact" className={styles['hero__button--secondary']}>
              Contact Us
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.hero__image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image 
            src="/images/brand/b1.jpeg" 
            alt="Metro Mellow home services" 
            width={600} 
            height={500}
            priority
          />
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.hero__trust}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className={styles.hero__trustText}>Trusted by <span className={styles['hero__trustText--bold']}>2,000+</span> families in your area</p>
        <div className={styles.hero__trustIcons}>
          <div className={styles.hero__trustIcon}>
            <Image src="/globe.svg" alt="Certified" width={80} height={40} />
          </div>
          <div className={styles.hero__trustIcon}>
            <Image src="/globe.svg" alt="Insured" width={80} height={40} />
          </div>
          <div className={styles.hero__trustIcon}>
            <Image src="/globe.svg" alt="100% Satisfaction" width={80} height={40} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}