// components/about/OurValues.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './OurValues.module.scss';

const values = [
  {
    id: 1,
    title: 'Quality First',
    description: 'We deliver exceptional service that exceeds expectations, maintaining the highest standards in everything we do.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Trustworthy Relationships',
    description: 'We build lasting connections with our clients through reliability, transparency, and always honoring our commitments.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.3643 5.63574L16.9501 7.04996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.05005 16.95L5.63583 18.3642" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.3643 18.3642L16.9501 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.05005 7.04996L5.63583 5.63574" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Eco-Conscious Solutions',
    description: 'We are committed to environmentally responsible practices and products that protect our planet and your family health.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16.92V15.34C22 14.82 21.55 14.37 21.03 14.37H19.94M2 15.07V16.93C2 17.46 2.45 17.88 2.98 17.88H4.13M17.75 21H6.25C3.9 21 2 20.1 2 17.75V6.25C2 3.9 3.9 2 6.25 2H17.75C20.1 2 22 3.9 22 6.25V17.75C22 20.1 20.1 21 17.75 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.24 11.76L14.12 9.63C13.93 9.44 13.93 9.12 14.12 8.93L16.24 6.81C16.43 6.62 16.76 6.62 16.95 6.81L19.07 8.93C19.26 9.12 19.26 9.44 19.07 9.63L16.95 11.76C16.76 11.95 16.43 11.95 16.24 11.76Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.93 11.73L7.05 9.61C7.24 9.42 7.24 9.09 7.05 8.9L4.93 6.78C4.74 6.59 4.42 6.59 4.22 6.78L2.1 8.9C1.91 9.09 1.91 9.42 2.1 9.61L4.22 11.73C4.42 11.92 4.74 11.92 4.93 11.73Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.58 19.18L12.7 17.05C12.89 16.86 12.89 16.54 12.7 16.35L10.58 14.22C10.39 14.03 10.06 14.03 9.87 14.22L7.75 16.35C7.56 16.54 7.56 16.86 7.75 17.05L9.87 19.18C10.06 19.37 10.39 19.37 10.58 19.18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Empowered Team',
    description: 'We invest in our professionals through fair pay, growth opportunities, and creating a supportive work environment.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Community Impact',
    description: 'We actively contribute to the communities we serve through volunteer initiatives and supporting local causes.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Innovation',
    description: 'We continuously improve our services by embracing new technologies and methods to enhance customer experience.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.63672 5.63672L6.34372 6.34372" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.6563 17.6563L18.3633 18.3633" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.63672 18.3633L6.34372 17.6563" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.6563 6.34372L18.3633 5.63672" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function OurValues() {
  return (
    <section className={styles.values}>
      <div className={styles.values__container}>
        <motion.div 
          className={styles.values__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.values__title}>Our Core Values</h2>
          <p className={styles.values__subtitle}>
            Principles that guide every decision we make and service we provide
          </p>
        </motion.div>
        
        <div className={styles.values__grid}>
          {values.map((value, index) => (
            <motion.div 
              key={value.id}
              className={styles.values__card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.values__iconWrapper}>
                {value.icon}
              </div>
              <h3 className={styles.values__cardTitle}>{value.title}</h3>
              <p className={styles.values__cardDescription}>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}