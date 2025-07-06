'use client';

import React from 'react';
import styles from './FoodIllustrationSection.module.scss';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FoodIllustrationSection = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className={styles.illustration} ref={sectionRef}>
      <div className={styles.illustration__container}>
        <motion.div 
          className={styles.illustration__content}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut"
            }
          } : { opacity: 0, y: 20 }}
        >
          <h2 className={styles.illustration__heading}>
            From Comfort<br />
            Classics to<br />
            Gourmet<br />
            Goodies
          </h2>
        </motion.div>
        
        <motion.div 
          className={styles.illustration__info}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }
          } : { opacity: 0, y: 20 }}
        >
          <p className={styles.illustration__description}>
            Whether it's lunch or late-night, we deliver flavors that make your taste buds sing.
          </p>
          <div className={styles.illustration__action}>
            <button className={styles.illustration__button}>JOIN OUR MISSION</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodIllustrationSection; 