'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button/Button';
import styles from './Hero.module.scss';

const Hero = () => {
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
                    <motion.h1
                        className={styles.hero__title}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        Experience <span className={styles.hero__highlight}>Sparkling Clean</span> Spaces, Every Time!
                    </motion.h1>

                    <motion.p
                        className={styles.hero__subtitle}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                        }}
                    >
                        A cleaning service that transforms your space from the conventional to the exceptional, providing a refreshing environment for you to thrive in.
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
                            Book Your Clean
                        </Button>

                        <div className={styles.hero__contact}>
                            <div className={styles.hero__contactIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div className={styles.hero__contactInfo}>
                                <span className={styles.hero__contactLabel}>Need help? Call us</span>
                                <a href="tel:+12345678900" className={styles.hero__contactLink}>+1 234 567 8900</a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.hero__imageContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className={styles.hero__shape}></div>
                    <div className={styles.hero__imageWrapper}>
                        <Image
                            src="/images/cleaning/c3.jpeg"
                            alt="Professional cleaning service"
                            fill
                            priority
                            className={styles.hero__image}
                        />
                    </div>

                    <div className={styles.hero__card}>
                        <div className={styles.hero__cardIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className={styles.hero__cardContent}>
                            <span className={styles.hero__cardTitle}>100% Satisfaction</span>
                            <span className={styles.hero__cardText}>Guaranteed</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className={styles.hero__shapesContainer}>
                <div className={styles.hero__shape1}></div>
                <div className={styles.hero__shape2}></div>
                <div className={styles.hero__shape3}></div>
            </div>

            <motion.div
                className={styles.hero__clients}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
            >
                <div className={styles.hero__clientsContainer}>
                    <div className={styles.hero__clientsText}>Our exceptional clients</div>
                    <div className={styles.hero__clientLogos}>
                        <div className={styles.hero__clientLogo}>CLIENT</div>
                        <div className={styles.hero__clientLogo}>CLIENT</div>
                        <div className={styles.hero__clientLogo}>CLIENT</div>
                        <div className={styles.hero__clientLogo}>CLIENT</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;