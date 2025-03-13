'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './CookingAbout.module.scss';

const CookingAbout = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.about__container}>
        <motion.div 
          className={styles.about__content}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className={styles.about__heading} variants={itemVariants}>
            <span className={styles.about__subheading}>About Our Meal Service</span>
            <h2 className={styles.about__title}>Culinary Excellence Delivered to Your Home</h2>
          </motion.div>
          
          <motion.p className={styles.about__text} variants={itemVariants}>
            Founded in 2018, our meal planning and delivery service was born from a passion for great food and a recognition that busy professionals and families need healthy, delicious meals without the time commitment of daily cooking.
          </motion.p>
          
          <motion.p className={styles.about__text} variants={itemVariants}>
            Our team of professional chefs craft each meal with care, using fresh, locally-sourced ingredients whenever possible. We offer flexible subscription plans that can be customized to your dietary preferences, lifestyle needs, and delivery schedule.
          </motion.p>

          <motion.div className={styles.about__features} variants={containerVariants}>
            <motion.div className={styles.about__feature} variants={itemVariants}>
              <div className={styles['about__feature-icon']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9994 15.94C20.9994 17.73 19.9594 19.33 18.3594 20.05C17.6694 20.36 16.8994 20.53 16.0994 20.53C15.2994 20.53 14.5294 20.36 13.8394 20.05C12.2394 19.33 11.1994 17.73 11.1994 15.94C11.1994 15.52 11.2594 15.11 11.3794 14.73H20.8194C20.9394 15.11 20.9994 15.52 20.9994 15.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.2099 8.91C20.8699 6.21 18.5999 4.11 15.8399 4C16.0099 4.34 16.0999 4.71 16.0999 5.12C16.0999 6.23 15.1999 7.13 14.0999 7.13C12.9999 7.13 12.0999 6.23 12.0999 5.12C12.0999 4.71 12.1899 4.34 12.3599 4C9.87991 4.1 7.77991 5.76 7.17991 8.09" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.9004 2H15.1004C16.3004 2 17.2704 2.97 17.2704 4.18V4.38C17.2704 5.59 16.3004 6.56 15.0904 6.56H14.8904C13.6904 6.56 12.7204 5.59 12.7204 4.38V4.18C12.7204 2.97 13.6904 2 14.9004 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 19H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles['about__feature-title']}>Chef-Crafted Meals</h3>
              <p className={styles['about__feature-text']}>Our culinary team creates innovative, nutritious recipes that rotate seasonally.</p>
            </motion.div>

            <motion.div className={styles.about__feature} variants={itemVariants}>
              <div className={styles['about__feature-icon']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.3201 15.9185C14.3201 17.8185 12.7801 19.3585 10.8801 19.3585C8.98015 19.3585 7.44015 17.8185 7.44015 15.9185C7.44015 14.0185 8.98015 12.4785 10.8801 12.4785C12.7801 12.4785 14.3201 14.0185 14.3201 15.9185Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.8799 19.3701V21.9001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.95 2.12012C11.9 2.12012 10.22 3.80012 10.22 5.85012V9.55012C10.22 10.3901 10.53 11.1601 11.06 11.7501C11.11 11.8101 11.13 11.8901 11.1 11.9701C11.07 12.0501 11 12.1101 10.91 12.1101H10.86C8.98 12.1101 7.44 13.6501 7.44 15.5301V15.9201C7.44 17.8201 8.98 19.3601 10.88 19.3601C12.78 19.3601 14.32 17.8201 14.32 15.9201V15.5301C14.32 13.6501 12.78 12.1101 10.9 12.1101H10.85C10.76 12.1101 10.69 12.0501 10.66 11.9701C10.63 11.8901 10.65 11.8101 10.7 11.7501C11.23 11.1601 11.54 10.3901 11.54 9.55012V5.85012C11.54 4.55012 12.65 3.44012 13.95 3.44012C15.25 3.44012 16.36 4.55012 16.36 5.85012V10.1001C16.36 10.4301 16.63 10.7001 16.96 10.7001C17.29 10.7001 17.56 10.4301 17.56 10.1001V5.85012C17.68 3.80012 16 2.12012 13.95 2.12012Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles['about__feature-title']}>Dietary Customization</h3>
              <p className={styles['about__feature-text']}>Options for various dietary needs including vegetarian, vegan, keto, paleo, and gluten-free.</p>
            </motion.div>

            <motion.div className={styles.about__feature} variants={itemVariants}>
              <div className={styles['about__feature-icon']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.54 8.31C17.54 9.76 16.36 10.94 14.91 10.94C13.46 10.94 12.28 9.76 12.28 8.31C12.28 6.86 13.46 5.68 14.91 5.68C16.36 5.68 17.54 6.86 17.54 8.31Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.91 13.7C11.95 13.7 9.55 16.1 9.55 19.06V20.99C9.55 21.54 10 21.99 10.55 21.99H19.27C19.82 21.99 20.27 21.54 20.27 20.99V19.06C20.27 16.1 17.87 13.7 14.91 13.7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.50001 10.41V13.29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.94 11.85H5.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.11 5.24V6.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.89 6.01H8.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.5 18.77V19.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.89 19.15H4.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles['about__feature-title']}>Fresh Ingredients</h3>
              <p className={styles['about__feature-text']}>We source from local farms and suppliers to ensure quality and freshness in every meal.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.about__image}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2
            }
          } : { opacity: 0, x: 50 }}
        >
          <div className={styles['about__image-container']}>
            <Image 
              src="/images/food/f11.jpeg"
              alt="Professional chef preparing fresh ingredients for a meal"
              width={600}
              height={800}
              className={styles['about__image-main']}
            />
            <div className={styles['about__image-accent']}></div>
          </div>

          <div className={styles.about__stats}>
            <div className={styles.about__stat}>
              <span className={styles['about__stat-number']}>5+</span>
              <span className={styles['about__stat-text']}>Years of Service</span>
            </div>
            <div className={styles.about__stat}>
              <span className={styles['about__stat-number']}>20K+</span>
              <span className={styles['about__stat-text']}>Meals Delivered Monthly</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingAbout;