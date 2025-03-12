'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import styles from './CookingHero.module.scss';

const CookingHero = () => {
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
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <motion.div 
          className={styles.hero__content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className={styles.hero__title}
            variants={fadeIn}
          >
            Chef-Prepared Meals <span>Delivered to Your Door</span>
          </motion.h1>

          <motion.p 
            className={styles.hero__description}
            variants={fadeIn}
          >
            Customized meal plans created by professional chefs using fresh, local ingredients. Subscribe and enjoy delicious, nutritious meals delivered on your schedule.
          </motion.p>

          <motion.div 
            className={styles.hero__buttons}
            variants={fadeIn}
          >
            <Button 
              variant="primary" 
              size="lg"
              href="/meal-plans"
            >
              Browse Meal Plans
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              href="#how-it-works"
            >
              How It Works
            </Button>
          </motion.div>

          <motion.div 
            className={styles.hero__stats}
            variants={fadeIn}
          >
            <div className={styles.hero__stat}>
              <span className={styles['hero__stat-number']}>500+</span>
              <span className={styles['hero__stat-text']}>Unique Recipes</span>
            </div>
            <div className={styles.hero__stat}>
              <span className={styles['hero__stat-number']}>4.9</span>
              <span className={styles['hero__stat-text']}>Customer Rating</span>
            </div>
            <div className={styles.hero__stat}>
              <span className={styles['hero__stat-number']}>7</span>
              <span className={styles['hero__stat-text']}>Dietary Options</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.hero__image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2
            }
          }}
        >
          <Image 
            src="/images/cleaning/hero-cleaning.png"
            alt="Chef preparing gourmet meals in professional kitchen"
            width={600}
            height={700}
            priority
            className={styles['hero__image-main']}
          />
          <div className={styles['hero__image-accent']}></div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.hero__scroll}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 0.8, duration: 0.5 }
        }}
      >
        <a href="#about" aria-label="Scroll to about section">
          <motion.div 
            animate={{ 
              y: [0, 10, 0], 
              transition: { 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop" 
              }
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default CookingHero;