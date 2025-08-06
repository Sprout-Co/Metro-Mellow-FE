'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './CookingCTA.module.scss';

const CookingCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className={styles.cta} ref={sectionRef}>
      <div className={styles.cta__container}>
        <div className={styles.cta__content}>
          <motion.div 
            className={styles.cta__text}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6,
                ease: "easeOut"
              }
            } : { opacity: 0, y: 20 }}
          >
            <h2 className={styles.cta__title}>Ready to Transform Your Mealtime Experience?</h2>
            <p className={styles.cta__description}>
              Join thousands of satisfied customers who have simplified their lives with our chef-prepared meal delivery service. Reclaim your time, enjoy healthier eating, and experience the convenience of delicious meals at your doorstep.
            </p>
          </motion.div>

          <motion.div 
            className={styles.cta__actions}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2
              }
            } : { opacity: 0, y: 20 }}
          >
            <a href="/meal-plans" className={styles.cta__button}>
              Browse Meal Plans
            </a>
            <a href="/menu" className={styles.cta__link}>
              View This Week's Menu
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>

        <motion.div 
          className={styles.cta__features}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut",
              delay: 0.4
            }
          } : { opacity: 0, y: 20 }}
        >
          <div className={styles.cta__feature}>
            <div className={styles['cta__feature-icon']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p className={styles['cta__feature-text']}>No Commitment Required</p>
          </div>

          <div className={styles.cta__feature}>
            <div className={styles['cta__feature-icon']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p className={styles['cta__feature-text']}>Free Delivery on All Plans</p>
          </div>

          <div className={styles.cta__feature}>
            <div className={styles['cta__feature-icon']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p className={styles['cta__feature-text']}>100% Satisfaction Guarantee</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingCTA;