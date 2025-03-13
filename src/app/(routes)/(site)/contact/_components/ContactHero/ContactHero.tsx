'use client';

import { motion } from 'framer-motion';
import styles from './ContactHero.module.scss';

export default function ContactHero() {
  return (
    <section className={styles.contactHero}>
      <div className={styles.contactHero__overlay}></div>
      <div className={styles.contactHero__container}>
        <motion.div 
          className={styles.contactHero__content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.contactHero__title}>
            Get in <span className={styles['contactHero__title--highlight']}>Touch</span>
          </h1>
          
          <p className={styles.contactHero__subtitle}>
            We're here to answer your questions and help you get started with our services
          </p>
        </motion.div>
      </div>
    </section>
  );
}