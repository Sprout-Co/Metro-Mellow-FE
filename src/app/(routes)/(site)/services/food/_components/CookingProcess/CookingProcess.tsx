'use client';

import { JSX, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './CookingProcess.module.scss';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const CookingProcess = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps: Step[] = [
    {
      id: 1,
      title: "Choose Your Plan",
      description: "Select a subscription plan that fits your household size and meal frequency preferences.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 6.66667H10C8.15905 6.66667 6.66667 8.15905 6.66667 10V30C6.66667 31.841 8.15905 33.3333 10 33.3333H30C31.841 33.3333 33.3333 31.841 33.3333 30V10C33.3333 8.15905 31.841 6.66667 30 6.66667Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 20L18.3333 23.3333L25 16.6667" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Customize Meals",
      description: "Browse our weekly menu and select meals based on your dietary preferences and taste.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.3333 35C27.4167 35 26.6667 34.75 26.0833 34.25C25.5 33.75 25.1667 33.0833 25.0833 32.1667H15C14.9167 33.0833 14.5417 33.75 13.875 34.25C13.2083 34.75 12.4167 35 11.5 35C10.4167 35 9.5 34.625 8.75 33.875C8 33.125 7.625 32.1667 7.625 31C7.625 29.9167 8 29 8.75 28.25C9.5 27.5 10.4167 27.125 11.5 27.125C12.4167 27.125 13.2083 27.375 13.875 27.875C14.5417 28.375 14.9167 29.0417 15 30H25.0833C25.1667 29.0833 25.5 28.375 26.0833 27.875C26.6667 27.375 27.4167 27.125 28.3333 27.125C29.4167 27.125 30.3333 27.5 31.0833 28.25C31.8333 29 32.2083 29.9167 32.2083 31C32.2083 32.1667 31.8333 33.125 31.0833 33.875C30.3333 34.625 29.4167 35 28.3333 35ZM28.3333 32.5C28.75 32.5 29.0833 32.3333 29.375 32C29.6667 31.6667 29.7917 31.3333 29.7917 31C29.7917 30.6667 29.6667 30.3333 29.375 30C29.0833 29.6667 28.75 29.5 28.3333 29.5C27.9167 29.5 27.5833 29.6667 27.2917 30C27 30.3333 26.875 30.6667 26.875 31C26.875 31.3333 27 31.6667 27.2917 32C27.5833 32.3333 27.9167 32.5 28.3333 32.5ZM11.5 32.5C11.9167 32.5 12.25 32.3333 12.5417 32C12.8333 31.6667 12.9583 31.3333 12.9583 31C12.9583 30.6667 12.8333 30.3333 12.5417 30C12.25 29.6667 11.9167 29.5 11.5 29.5C11.0833 29.5 10.75 29.6667 10.4583 30C10.1667 30.3333 10.0417 30.6667 10.0417 31C10.0417 31.3333 10.1667 31.6667 10.4583 32C10.75 32.3333 11.0833 32.5 11.5 32.5ZM15 21.6667H25C25.6667 21.6667 26.25 21.4583 26.75 21.0417C27.25 20.625 27.5833 20.0833 27.75 19.4167L30.3333 8.75H9.66667L12.25 19.4167C12.4167 20.0833 12.75 20.625 13.25 21.0417C13.75 21.4583 14.3333 21.6667 15 21.6667ZM14.25 8.75L16.6667 4.16667H23.3333L25.75 8.75H14.25Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "We Cook & Package",
      description: "Our chefs prepare your meals using fresh ingredients, then carefully package them for delivery.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3333 8.33333C13.3333 12.9357 17.0643 16.6667 21.6667 16.6667C26.269 16.6667 30 12.9357 30 8.33333C30 3.73096 26.269 0 21.6667 0C17.0643 0 13.3333 3.73096 13.3333 8.33333Z" fill="currentColor"/>
          <path d="M33.3333 25.0001C33.3333 27.6334 30.1333 30.0001 26.6667 30.0001C23.2 30.0001 20 27.6334 20 25.0001C20 22.3667 23.2 20.0001 26.6667 20.0001C30.1333 20.0001 33.3333 22.3667 33.3333 25.0001Z" fill="currentColor"/>
          <path d="M18.3334 31.6668C18.3334 34.3001 15.1334 36.6668 11.6667 36.6668C8.20004 36.6668 5.00004 34.3001 5.00004 31.6668C5.00004 29.0334 8.20004 26.6668 11.6667 26.6668C15.1334 26.6668 18.3334 29.0334 18.3334 31.6668Z" fill="currentColor"/>
          <path d="M33.3333 8.33333C35 8.33333 36.6667 10 36.6667 11.6667V15C36.6667 17.6667 34.3333 19.1667 31.6667 19.1667H28.3333L25 23.3333V18.3333L26.6667 15H21.6667C18.3333 15 16.6667 13.3333 16.6667 10V5C16.6667 4.08333 17.0833 3.33333 17.5 2.5C18.3333 1.16667 20 0 21.6667 0H25C25.4167 0 25.8333 0 26.2167 0C25.85 0.8 25.55 1.65 25.55 2.55C25.55 5.91667 28.1833 8.66667 31.55 8.81667C32.1333 8.83333 32.75 8.63333 33.3333 8.33333Z" fill="currentColor"/>
          <path d="M18.3333 31.6667V30V28.3333C18.3333 25.8333 15.8333 23.3333 13.3333 23.3333H10L6.66667 20V26.6667L10 25H5C3.33333 25 1.66667 26.6667 1.66667 28.3333V31.6667C1.66667 33.3333 3.33333 35 5 35H10C11.6667 35 16.6667 35 18.3333 31.6667Z" fill="currentColor"/>
          <path d="M29.9999 38.3333C31.6666 38.3333 33.3333 36.6667 33.3333 35V31.6667C33.3333 30 31.6666 28.3333 29.9999 28.3333H24.9999C23.3333 28.3333 21.6666 30 21.6666 31.6667V35C21.6666 36.6667 23.3333 38.3333 24.9999 38.3333H29.9999Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Home Delivery",
      description: "Receive your meals at your doorstep in insulated packaging to keep everything fresh.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.6667 10H28.3333V3.33333H3.33333V28.3333H8.33333C8.33333 31.6667 11.0667 34.1667 14.1667 34.1667C17.2667 34.1667 20 31.6667 20 28.3333H25C25 31.6667 27.5 34.1667 30.8333 34.1667C34.1667 34.1667 36.6667 31.6667 36.6667 28.3333V10ZM14.1667 30.8333C12.8333 30.8333 11.6667 29.6667 11.6667 28.3333C11.6667 27 12.8333 25.8333 14.1667 25.8333C15.5 25.8333 16.6667 27 16.6667 28.3333C16.6667 29.6667 15.5 30.8333 14.1667 30.8333ZM27.5 16.6667H19.1667V10H27.5V16.6667ZM30.8333 30.8333C29.5 30.8333 28.3333 29.6667 28.3333 28.3333C28.3333 27 29.5 25.8333 30.8333 25.8333C32.1667 25.8333 33.3333 27 33.3333 28.3333C33.3333 29.6667 32.1667 30.8333 30.8333 30.8333Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Heat & Enjoy",
      description: "Follow the simple heating instructions (or enjoy cold dishes as is) and experience restaurant-quality meals at home.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 36.6667H10C8.33333 36.6667 6.66667 35 6.66667 33.3333V30H33.3333V33.3333C33.3333 35 31.6667 36.6667 30 36.6667ZM33.3333 13.3333H6.66667V26.6667H33.3333V13.3333ZM30 3.33333H10C8.33333 3.33333 6.66667 5 6.66667 6.66667V10H33.3333V6.66667C33.3333 5 31.6667 3.33333 30 3.33333ZM21.6667 21.6667H18.3333V18.3333H15V21.6667H11.6667V25H15V28.3333H18.3333V25H21.6667V21.6667Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
    <section id="how-it-works" className={styles.process} ref={sectionRef}>
      <div className={styles.process__container}>
        <motion.div 
          className={styles.process__heading}
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
          <span className={styles.process__subheading}>How It Works</span>
          <h2 className={styles.process__title}>Our Simple 5-Step Process</h2>
          <p className={styles.process__description}>
            From selecting your meal plan to enjoying chef-prepared dishes at home, our streamlined process makes eating well effortless.
          </p>
        </motion.div>

        <motion.div 
          className={styles.process__steps}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              className={styles.process__step}
              variants={itemVariants}
            >
              <div className={styles['process__step-number']}>
                <span>{step.id}</span>
              </div>
              <div className={styles['process__step-icon']}>
                {step.icon}
              </div>
              <div className={styles['process__step-content']}>
                <h3 className={styles['process__step-title']}>{step.title}</h3>
                <p className={styles['process__step-description']}>{step.description}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className={styles.process__line}
            initial={{ scaleX: 0 }}
            animate={isInView ? { 
              scaleX: 1,
              transition: { 
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.5
              }
            } : { scaleX: 0 }}
          ></motion.div>
        </motion.div>

        <motion.div 
          className={styles.process__cta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut",
              delay: 0.8
            }
          } : { opacity: 0, y: 20 }}
        >
          <p className={styles.process__text}>Ready to experience chef-prepared meals at home?</p>
          <a href="/meal-plans" className={styles.process__button}>
            Browse Meal Plans
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="currentColor"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingProcess;