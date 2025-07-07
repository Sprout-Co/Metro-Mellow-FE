'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CleaningPromoSection.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { Routes } from '@/constants/routes';

const CleaningPromoSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className={styles.promo}>
      <div className={styles.promo__container}>
        <motion.div 
          className={styles.promo__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className={styles.promo__title}
            variants={fadeIn}
          >
            Choose Your<br />
            <span className={styles['promo__title--accent']}>Clean Scene</span>
          </motion.h2>

          <motion.p 
            className={styles.promo__description}
            variants={fadeIn}
          >
            Standard, deep, move-in/move-out, we tailor to your space and needs.
          </motion.p>

          <motion.div 
            className={styles.promo__cta}
            variants={fadeIn}
          >
            <Button href={Routes.GET_STARTED} size="lg">
              START CLEANING
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningPromoSection; 