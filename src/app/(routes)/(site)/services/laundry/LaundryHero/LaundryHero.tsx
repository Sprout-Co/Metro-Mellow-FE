'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button/Button';
import styles from './LaundryHero.module.scss';

const LaundryHero = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start("visible");
    }, [controls]);

    return (
        <section className={styles.hero}>
            <div className={styles.hero__container}>
                <motion.div
                    className={styles.hero__content}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
                    }}
                >
                    <motion.span
                        className={styles.hero__label}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        Laundry Service
                    </motion.span>

                    <motion.h1
                        className={styles.hero__title}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        Premium Laundry Services <span className={styles.hero__highlight}>Delivered</span> To Your Door
                    </motion.h1>

                    <motion.p
                        className={styles.hero__subtitle}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        We take care of your garments with professional precision and eco-friendly practices. Free pickup and delivery with every order.
                    </motion.p>

                    <motion.div
                        className={styles.hero__actions}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            href="/contact"
                            className={styles.hero__button}
                        >
                            Schedule Pickup
                        </Button>

                        <a href="#pricing" className={styles.hero__priceLink}>
                            View Pricing
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                        </a>
                    </motion.div>

                    <motion.div
                        className={styles.hero__features}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: "easeOut" } }
                        }}
                    >
                        <div className={styles.hero__feature}>
                            <svg className={styles.hero__icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Free Pickup & Delivery</span>
                        </div>
                        <div className={styles.hero__feature}>
                            <svg className={styles.hero__icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>24-Hour Turnaround</span>
                        </div>
                        <div className={styles.hero__feature}>
                            <svg className={styles.hero__icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Eco-Friendly Cleaning</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.hero__imageContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className={styles.hero__bubble1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                        </svg>
                        <span>Care for your clothes</span>
                    </div>
                    <div className={styles.hero__bubble2}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span>Quality guaranteed</span>
                    </div>

                    <div className={styles.hero__imageMain}>
                        <Image
                            src="/images/laundry/laundry-hero.jpg"
                            alt="Professional laundry service"
                            fill
                            priority
                            className={styles.hero__image}
                        />
                    </div>
                </motion.div>
            </div>

            <div className={styles.hero__shapesContainer}>
                <div className={styles.hero__shape1}></div>
                <div className={styles.hero__shape2}></div>
                <div className={styles.hero__shape3}></div>
            </div>

            <div className={styles.hero__scrollIndicator}>
                <span className={styles.hero__scrollText}>Scroll to learn more</span>
                <div className={styles.hero__mouse}>
                    <div className={styles.hero__mouseWheel}></div>
                </div>
            </div>
        </section>
    );
};

export default LaundryHero;