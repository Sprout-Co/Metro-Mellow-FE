'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './LaundryEcoFriendly.module.scss';

const LaundryEcoFriendly = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const ecoFeatures = [
        {
            id: 1,
            title: "Biodegradable Detergents",
            description: "We use plant-based, biodegradable detergents that are gentle on the environment and safe for waterways."
        },
        {
            id: 2,
            title: "Energy-Efficient Equipment",
            description: "Our facilities feature ENERGY STAR-rated machines that consume less electricity and water."
        },
        {
            id: 3,
            title: "Water Conservation",
            description: "Our systems recycle and reuse water where possible, reducing our overall water consumption."
        },
        {
            id: 4,
            title: "Eco-Friendly Packaging",
            description: "We use recyclable and biodegradable packaging materials for all our laundry deliveries."
        }
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            }
        }
    };

    return (
        <section id="eco-friendly" className={styles.eco} ref={sectionRef}>
            <div className={styles.eco__container}>
                <div className={styles.eco__content}>
                    <motion.div
                        className={styles.eco__heading}
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
                        <span className={styles.eco__subheading}>Eco-Friendly Practices</span>
                        <h2 className={styles.eco__title}>Committed to Sustainable Laundry</h2>
                        <p className={styles.eco__description}>
                            We believe in providing exceptional laundry service while minimizing our environmental impact. Our eco-friendly practices help protect the planet without compromising on cleaning quality.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.eco__features}
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {ecoFeatures.map((feature) => (
                            <motion.div
                                key={feature.id}
                                className={styles.eco__feature}
                                variants={fadeIn}
                            >
                                <div className={styles['eco__feature-icon']}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className={styles['eco__feature-content']}>
                                    <h3 className={styles['eco__feature-title']}>{feature.title}</h3>
                                    <p className={styles['eco__feature-description']}>{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className={styles.eco__certification}
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
                        <div className={styles['eco__certification-icon']}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 2L4 8V16C4 23.1 9.84 29.5 16 30C22.16 29.5 28 23.1 28 16V8L16 2ZM25.32 16C25.32 21.74 21.04 26.72 16 27.18C10.96 26.72 6.68 21.74 6.68 16V9.66L16 4.84L25.32 9.66V16Z" fill="currentColor" />
                                <path d="M14 21.02L9 16.02L10.76 14.26L14 17.5L21.24 10.26L23 12.02L14 21.02Z" fill="currentColor" />
                            </svg>
                        </div>
                        <p className={styles['eco__certification-text']}>
                            Our laundry service is proudly certified by the Green Business Association for our commitment to sustainable practices and environmental responsibility.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.eco__image}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.3
                        }
                    } : { opacity: 0, x: 50 }}
                >
                    <Image
                        src="/images/laundry/dry-cleaning.jpg"
                        alt="Eco-friendly laundry practices"
                        width={600}
                        height={700}
                        className={styles['eco__image-main']}
                    />
                    <div className={styles['eco__image-accent']}></div>
                </motion.div>
            </div>
        </section>
    );
};

export default LaundryEcoFriendly;