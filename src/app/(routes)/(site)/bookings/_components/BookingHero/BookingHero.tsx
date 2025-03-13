// components/booking/BookingHero.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './BookingHero.module.scss';

export default function BookingHero() {
  return (
    <section className={styles.bookingHero}>
      <div className={styles.bookingHero__container}>
        <motion.div 
          className={styles.bookingHero__content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.bookingHero__title}>
            Craft Your <span className={styles['bookingHero__title--highlight']}>Perfect</span> Service Plan
          </h1>
          
          <p className={styles.bookingHero__subtitle}>
            Customize your home services experience to fit your schedule, preferences, and needs
          </p>
          
          <div className={styles.bookingHero__steps}>
            <div className={styles.bookingHero__step}>
              <div className={styles.bookingHero__stepNumber}>1</div>
              <div className={styles.bookingHero__stepText}>
                <span className={styles.bookingHero__stepTitle}>Choose Services</span>
                <span className={styles.bookingHero__stepDesc}>Select one or combine multiple services</span>
              </div>
            </div>
            
            <div className={styles.bookingHero__stepDivider}></div>
            
            <div className={styles.bookingHero__step}>
              <div className={styles.bookingHero__stepNumber}>2</div>
              <div className={styles.bookingHero__stepText}>
                <span className={styles.bookingHero__stepTitle}>Select Plan</span>
                <span className={styles.bookingHero__stepDesc}>One-time or subscription options</span>
              </div>
            </div>
            
            <div className={styles.bookingHero__stepDivider}></div>
            
            <div className={styles.bookingHero__step}>
              <div className={styles.bookingHero__stepNumber}>3</div>
              <div className={styles.bookingHero__stepText}>
                <span className={styles.bookingHero__stepTitle}>Customize</span>
                <span className={styles.bookingHero__stepDesc}>Add specific requirements</span>
              </div>
            </div>
            
            <div className={styles.bookingHero__stepDivider}></div>
            
            <div className={styles.bookingHero__step}>
              <div className={styles.bookingHero__stepNumber}>4</div>
              <div className={styles.bookingHero__stepText}>
                <span className={styles.bookingHero__stepTitle}>Schedule</span>
                <span className={styles.bookingHero__stepDesc}>Pick your preferred dates</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}