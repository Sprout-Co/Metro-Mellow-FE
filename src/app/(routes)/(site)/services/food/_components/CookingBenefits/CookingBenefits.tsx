'use client';

import { JSX, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './CookingBenefits.module.scss';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const CookingBenefits = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const benefits: Benefit[] = [
    {
      id: 1,
      title: "Save Time",
      description: "Eliminate meal planning, grocery shopping, and cooking time. Reclaim hours every week for what matters most to you.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.16 0 0 7.16 0 16C0 24.84 7.16 32 16 32C24.84 32 32 24.84 32 16C32 7.16 24.84 0 16 0ZM16 28C9.37 28 4 22.63 4 16C4 9.37 9.37 4 16 4C22.63 4 28 9.37 28 16C28 22.63 22.63 28 16 28ZM16.5 8H15V17L22.4 21.4L23.5 19.67L16.5 16V8Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Nutritional Balance",
      description: "Enjoy perfectly portioned meals with optimal macro and micronutrient balance, designed by nutritionists for health and wellness.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14.6667C12 16.5067 13.4933 18 15.3333 18H16.6667C18.5067 18 20 16.5067 20 14.6667C20 12.8267 18.5067 11.3333 16.6667 11.3333H15.3333C13.4933 11.3333 12 9.84 12 8C12 6.16 13.4933 4.66667 15.3333 4.66667H16.6667C18.5067 4.66667 20 6.16 20 8M16 0V32M28 16H4" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Reduce Food Waste",
      description: "Our precise portion control and sustainable practices mean less wasted food and packaging compared to traditional grocery shopping.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.66667 8H29.3333M25.3333 8V26.6667C25.3333 27.7333 24.4 28.6667 23.3333 28.6667H8.66667C7.6 28.6667 6.66667 27.7333 6.66667 26.6667V8M10.6667 8V5.33333C10.6667 4.26667 11.6 3.33333 12.6667 3.33333H19.3333C20.4 3.33333 21.3333 4.26667 21.3333 5.33333V8M13.3333 14.6667V22M18.6667 14.6667V22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Culinary Variety",
      description: "Explore new cuisines and flavors every week with our rotating menu of chef-created recipes and seasonal specialties.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6946 6.09524L17.9236 5.83344L17.6936 5.56926C16.5125 4.20855 14.778 3.33333 12.8571 3.33333C9.08213 3.33333 6 6.41546 6 10.1905C6 13.9654 9.08213 17.0476 12.8571 17.0476C16.6321 17.0476 19.7143 13.9654 19.7143 10.1905C19.7143 8.85164 19.2795 7.58731 18.5278 6.56633L18.3089 6.28241L18.0301 6.56919C18.0225 6.57687 17.9608 6.63874 17.866 6.72633C17.7676 6.81803 17.7093 6.88465 17.6946 6.09524ZM17.6946 6.09524C17.694 6.09578 17.6938 6.09597 17.6938 6.09597L17.6946 6.09524ZM29.1489 10.2941C28.6631 6.14984 25.2016 3 21 3C16.5817 3 13 6.58172 13 11C13 15.4183 16.5817 19 21 19C22.2837 19 23.494 18.6848 24.5611 18.1246L29.3611 22.9246L30.7753 21.5104L25.9753 16.7104C26.9621 15.244 27.5564 13.4502 27.5564 11.5185C27.5564 11.0987 27.5209 10.6897 27.4531 10.2941L27.3907 9.94444H29.2115L29.1489 10.2941ZM25.5564 11.5C25.5564 14.8137 22.8701 17.5 19.5564 17.5C16.2427 17.5 13.5564 14.8137 13.5564 11.5C13.5564 8.18629 16.2427 5.5 19.5564 5.5C22.8701 5.5 25.5564 8.18629 25.5564 11.5Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Special Diet Support",
      description: "Whether you're vegetarian, gluten-free, low-carb, or have other dietary requirements, we offer specialized plans to support your needs.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 2H17.5V30H14.5V2ZM24.5 9H27.5V23H24.5V9ZM4.5 9H7.5V23H4.5V9Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 6,
      title: "Expert Guidance",
      description: "Our team of chefs and nutritionists design each meal plan with your health and taste preferences in mind, ensuring balanced nutrition.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 27H29M7 27V7C7 6.46957 7.21071 5.96086 7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5H23C23.5304 5 24.0391 5.21071 24.4142 5.58579C24.7893 5.96086 25 6.46957 25 7V27M13 12H19M13 17H19M13 22H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="benefits" className={styles.benefits} ref={sectionRef}>
      <div className={styles.benefits__background}>
        <div className={styles.benefits__overlay}></div>
        <Image
          src="/images/cooking/benefits-bg.webp"
          alt="Fresh ingredients background"
          fill
          priority
          sizes="100vw"
          className={styles.benefits__image}
        />
      </div>
      
      <div className={styles.benefits__container}>
        <motion.div 
          className={styles.benefits__heading}
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
          <span className={styles.benefits__subheading}>Why Choose Us</span>
          <h2 className={styles.benefits__title}>The Benefits of Our Meal Service</h2>
          <p className={styles.benefits__description}>
            Discover how our chef-prepared meal plans can transform your dining experience, save you time, and help you maintain a healthy lifestyle.
          </p>
        </motion.div>

        <motion.div 
          className={styles.benefits__grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit) => (
            <motion.div 
              key={benefit.id}
              className={styles.benefits__item}
              variants={itemVariants}
            >
              <div className={styles['benefits__item-icon']}>
                {benefit.icon}
              </div>
              <h3 className={styles['benefits__item-title']}>{benefit.title}</h3>
              <p className={styles['benefits__item-description']}>{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.benefits__cta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut",
              delay: 0.6
            }
          } : { opacity: 0, y: 20 }}
        >
          <a href="/meal-plans" className={styles.benefits__button}>
            Experience the Benefits
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingBenefits;