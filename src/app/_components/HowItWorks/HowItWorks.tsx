// components/home/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './HowItWorks.module.scss';

const steps = [
  {
    id: 1,
    title: 'Book a Service',
    description: 'Choose from our range of home services and select a date and time that works for you.',
    icon: '/images/icons/book.svg',
  },
  {
    id: 2,
    title: 'Get Matched',
    description: 'We will match you with experienced, background-checked professionals in your area.',
    icon: '/images/icons/match.svg',
  },
  {
    id: 3,
    title: 'Service Delivered',
    description: 'Our professionals arrive on time and complete the service to your satisfaction.',
    icon: '/images/icons/deliver.svg',
  },
  {
    id: 4,
    title: 'Rate & Review',
    description: 'Share your feedback and book recurring services for additional convenience.',
    icon: '/images/icons/review.svg',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.process}>
      <div className={styles.process__container}>
        <motion.div 
          className={styles.process__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.process__title}>How It Works</h2>
          <p className={styles.process__subtitle}>
            Getting started with Metro Mellow is simple and straightforward
          </p>
        </motion.div>
        
        <div className={styles.process__steps}>
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              className={styles.process__step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.process__stepNumber}>
                <span>{step.id}</span>
                {index < steps.length - 1 && (
                  <div className={styles.process__connector}></div>
                )}
              </div>
              <div className={styles.process__stepContent}>
                <div className={styles.process__iconWrapper}>
                  <Image 
                    src={step.icon} 
                    alt={step.title} 
                    width={32} 
                    height={32} 
                    className={styles.process__icon}
                  />
                </div>
                <h3 className={styles.process__stepTitle}>{step.title}</h3>
                <p className={styles.process__stepDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.process__illustration}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/images/how-it-works.webp" 
            alt="Metro Mellow process" 
            width={800} 
            height={400}
            className={styles.process__image}
          />
        </motion.div>
      </div>
    </section>
  );
}