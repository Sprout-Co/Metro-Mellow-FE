'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button/Button';
import styles from './OrderStepsSection.module.scss';

const OrderStepsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className={styles.orderSteps}>
      <div className={styles.orderSteps__container}>
        <motion.div 
          className={styles.orderSteps__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className={styles.orderSteps__title}
            variants={fadeIn}
          >
            What do I <br />
            Need to do?
          </motion.h2>
          
          <motion.p 
            className={styles.orderSteps__subtitle}
            variants={fadeIn}
          >
            Tap into tasty with just a few clicks.
          </motion.p>

          <motion.ul 
            className={styles.orderSteps__steps}
            variants={staggerContainer}
          >
            <motion.li variants={fadeIn}>
              <span className={styles.orderSteps__step}>1</span>
              <span className={styles.orderSteps__stepText}>Choose your crave.</span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.orderSteps__step}>2</span>
              <span className={styles.orderSteps__stepText}>Track your order.</span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.orderSteps__step}>3</span>
              <span className={styles.orderSteps__stepText}>Enjoy every bite.</span>
            </motion.li>
          </motion.ul>
        </motion.div>
        
        <div className={styles.orderSteps__illustration}>
          <Image
            src="/images/food/plate-svg.png"
            alt="Plate with fork and knife"
            width={600}
            height={600}
            className={styles.orderSteps__image}
            priority
          />
        </div>
      </div>
      
      <motion.div 
        className={styles.orderSteps__cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          variant="primary" 
          size="lg"
        >
          ORDER NOW
        </Button>
      </motion.div>
    </section>
  );
};

export default OrderStepsSection; 