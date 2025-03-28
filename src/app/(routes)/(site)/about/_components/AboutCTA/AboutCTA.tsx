// components/about/AboutCTA.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './AboutCTA.module.scss';

export default function AboutCTA() {
  return (
    <section className={styles.aboutCta}>
      <div className={styles.aboutCta__container}>
        <motion.div 
          className={styles.aboutCta__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.aboutCta__title}>Ready to Experience the Metro Mellow Difference?</h2>
          <p className={styles.aboutCta__text}>
            Let us take care of your home services needs so you can focus on what matters most to you.
          </p>
          <div className={styles.aboutCta__buttons}>
            <Link href="/services" className={styles.aboutCta__primaryBtn}>
              Our Services
            </Link>
            <Link href="/contact" className={styles.aboutCta__secondaryBtn}>
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}