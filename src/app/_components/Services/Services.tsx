// components/home/ServiceShowcase.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Services.module.scss';

// Define services data
const services = [
  {
    id: 'cleaning',
    title: 'Home Cleaning',
    description: 'Professional cleaning services for every room in your home, from basic cleaning to deep sanitization.',
    icon: '/images/icons/cleaning.svg',
    image: '/images/services/cleaning.webp',
  },
  {
    id: 'laundry',
    title: 'Laundry Services',
    description: 'Complete laundry solutions including washing, drying, ironing, and folding of all your clothes and linens.',
    icon: '/images/icons/laundry.svg',
    image: '/images/services/laundry.webp',
  },
  {
    id: 'cooking',
    title: 'Meal Preparation',
    description: 'Custom meal planning and preparation services tailored to your dietary needs and preferences.',
    icon: '/images/icons/cooking.svg',
    image: '/images/services/cooking.webp',
  },
  {
    id: 'errands',
    title: 'Errand Running',
    description: 'Save time with our personal assistant services handling grocery shopping, package delivery, and more.',
    icon: '/images/icons/errands.svg',
    image: '/images/services/errands.webp',
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    description: 'Effective and eco-friendly solutions to keep your home free from unwanted pests and insects.',
    icon: '/images/icons/pest-control.svg',
    image: '/images/services/pest-control.webp',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ServiceShowcase() {
  return (
    <section className={styles.services}>
      <div className={styles.services__container}>
        <motion.div 
          className={styles.services__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.services__title}>Our Services</h2>
          <p className={styles.services__subtitle}>
            Everything you need to maintain a comfortable and peaceful home environment
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.services__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className={styles.services__card}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={styles.services__iconWrapper}>
                <Image 
                  src={service.icon} 
                  alt={service.title} 
                  width={40} 
                  height={40} 
                  className={styles.services__icon}
                />
              </div>
              <h3 className={styles.services__cardTitle}>{service.title}</h3>
              <p className={styles.services__cardDescription}>{service.description}</p>
              <Link href={`/services/${service.id}`} className={styles.services__cardLink}>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.services__cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/services" className={styles.services__button}>
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}