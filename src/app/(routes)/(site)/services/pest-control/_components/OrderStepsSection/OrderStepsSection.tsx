'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './OrderStepsSection.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { Routes } from '@/constants/routes';

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
        {/* No pest-specific image available, so omit or add later if needed */}
        <div className={styles.orderSteps__illustration}>
          <motion.div
            className={styles.orderSteps__content}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className={styles.orderSteps__title} variants={fadeIn}>
              What do I <br />
              Need to do?
            </motion.h2>

            <motion.p className={styles.orderSteps__subtitle} variants={fadeIn}>
              Three simple steps to a pest-free, stress-free home.
            </motion.p>
          </motion.div>
          <motion.ul
            className={styles.orderSteps__steps}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.li variants={fadeIn}>
              <span className={styles.orderSteps__step}>1</span>
              <span className={styles.orderSteps__stepText}>
                Book your inspection online or by phone.
              </span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.orderSteps__step}>2</span>
              <span className={styles.orderSteps__stepText}>
                Our experts assess and treat your pest problem.
              </span>
            </motion.li>
            <motion.li variants={fadeIn}>
              <span className={styles.orderSteps__step}>3</span>
              <span className={styles.orderSteps__stepText}>
                Enjoy a safe, pest-free environment.
              </span>
            </motion.li>
          </motion.ul>
        </div>
      </div>

      <motion.div
        className={styles.orderSteps__cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <Button href={Routes.GET_STARTED} size="lg">
          BOOK PEST CONTROL
        </Button>
      </motion.div>
    </section>
  );
};

export default OrderStepsSection; 