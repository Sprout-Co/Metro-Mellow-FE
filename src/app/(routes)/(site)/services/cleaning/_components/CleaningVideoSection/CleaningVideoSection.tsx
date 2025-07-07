'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './CleaningVideoSection.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { Routes } from '@/constants/routes';
import { Play } from 'lucide-react';

const CleaningVideoSection = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const playVideo = () => {
    setVideoPlaying(true);
  };

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
    <section className={styles.video} ref={ref}>
      <div className={styles.video__container}>
        <motion.div 
          className={styles.video__wrapper}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className={styles.video__player}>
            {!videoPlaying ? (
              <>
                <div className={styles.video__thumbnail}>
                  <img 
                    src="/images/cleaning/c4.jpeg" 
                    alt="Professional Cleaning Video Thumbnail" 
                    className={styles.video__image}
                  />
                  <div className={styles.video__overlay}>
                    <button 
                      className={styles.video__playButton}
                      onClick={playVideo}
                      aria-label="Play video"
                    >
                      <Play size={32} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.video__iframe}>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Metro Mellow Cleaning Process"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className={styles.video__content}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 
            className={styles.video__title}
            variants={fadeIn}
          >
            See How We Transform Your Space
          </motion.h2>
          
          <motion.p 
            className={styles.video__description}
            variants={fadeIn}
          >
            Watch our professional cleaning process in action. From initial assessment to final inspection, see how we deliver exceptional results every time.
          </motion.p>
          
          <motion.ul 
            className={styles.video__features}
            variants={staggerContainer}
          >
            <motion.li 
              className={styles.video__feature}
              variants={fadeIn}
            >
              Professional equipment and techniques
            </motion.li>
            <motion.li 
              className={styles.video__feature}
              variants={fadeIn}
            >
              Attention to detail
            </motion.li>
            <motion.li 
              className={styles.video__feature}
              variants={fadeIn}
            >
              Quality assurance process
            </motion.li>
            <motion.li 
              className={styles.video__feature}
              variants={fadeIn}
            >
              Customer satisfaction guarantee
            </motion.li>
          </motion.ul>
          
          <motion.div 
            className={styles.video__cta}
            variants={fadeIn}
          >
            <Button href={Routes.GET_STARTED} size="lg">
              Book Your Cleaning Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningVideoSection; 