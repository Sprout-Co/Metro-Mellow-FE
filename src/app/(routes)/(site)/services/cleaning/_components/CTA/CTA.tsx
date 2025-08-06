'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './CTA.module.scss';
import Button from '@/components/ui/Button/Button';

const CTA = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <section className={styles.cta} ref={ref}>
            <div className={styles.cta__container}>
                <div className={styles.cta__content}>
                    <motion.h2
                        className={styles.cta__title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        Ready for a Spotless <span className={styles.cta__highlight}>Transformation?</span>
                    </motion.h2>

                    <motion.p
                        className={styles.cta__text}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Book our professional cleaning service today and experience the difference.
                        Our team is ready to make your space shine!
                    </motion.p>

                    <motion.div
                        className={styles.cta__actions}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            href="/booking"
                            className={styles.cta__button}
                        >
                            Book a Cleaning
                        </Button>

                        <span className={styles.cta__or}>or</span>

                        <a href="tel:+12345678900" className={styles.cta__phone}>
                            <svg className={styles.cta__phoneIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            Call (234) 567-8900
                        </a>
                    </motion.div>
                </div>

                <div className={styles.cta__decorator}>
                    <motion.div
                        className={`${styles.cta__circle} ${styles['cta__circle--1']}`}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />
                    <motion.div
                        className={`${styles.cta__circle} ${styles['cta__circle--2']}`}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    />
                    <motion.div
                        className={`${styles.cta__circle} ${styles['cta__circle--3']}`}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    />
                </div>
            </div>
        </section>
    );
};

export default CTA;