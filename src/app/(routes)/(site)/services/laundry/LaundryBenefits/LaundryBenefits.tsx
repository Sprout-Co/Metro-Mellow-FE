'use client';

import { JSX, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './LaundryBenefits.module.scss';

interface Benefit {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
}

const LaundryBenefits = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const benefits: Benefit[] = [
        {
            id: 1,
            title: "Save Time",
            description: "Reclaim your valuable time by outsourcing laundry chores. Our service handles everything from washing to folding.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.16 0 0 7.16 0 16C0 24.84 7.16 32 16 32C24.84 32 32 24.84 32 16C32 7.16 24.84 0 16 0ZM16 28C9.37 28 4 22.63 4 16C4 9.37 9.37 4 16 4C22.63 4 28 9.37 28 16C28 22.63 22.63 28 16 28ZM16.5 8H15V17L22.4 21.4L23.5 19.67L16.5 16V8Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 2,
            title: "Professional Quality",
            description: "Experience cleaner, fresher laundry with our professional-grade equipment and specialized detergents.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 0H4C1.79 0 0 1.79 0 4V28C0 30.21 1.79 32 4 32H28C30.21 32 32 30.21 32 28V4C32 1.79 30.21 0 28 0ZM14 24L4 14L6.83 11.17L14 18.34L25.17 7.17L28 10L14 24Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 3,
            title: "Extend Garment Life",
            description: "Our gentle washing techniques and fabric-specific care help preserve the quality and longevity of your clothes.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.67 0H5.33C2.4 0 0 2.4 0 5.33V26.67C0 29.6 2.4 32 5.33 32H26.67C29.6 32 32 29.6 32 26.67V5.33C32 2.4 29.6 0 26.67 0ZM10.67 24C8.53 24 6.67 22.13 6.67 20C6.67 17.87 8.53 16 10.67 16C12.8 16 14.67 17.87 14.67 20C14.67 22.13 12.8 24 10.67 24ZM16 10.67C13.87 10.67 12 8.8 12 6.67C12 4.53 13.87 2.67 16 2.67C18.13 2.67 20 4.53 20 6.67C20 8.8 18.13 10.67 16 10.67ZM21.33 24C19.2 24 17.33 22.13 17.33 20C17.33 17.87 19.2 16 21.33 16C23.47 16 25.33 17.87 25.33 20C25.33 22.13 23.47 24 21.33 24Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 4,
            title: "Reduce Stress",
            description: "Eliminate the frustration of endless laundry cycles and the stress of fitting laundry into your busy schedule.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.16 0 0 7.16 0 16C0 24.84 7.16 32 16 32C24.84 32 32 24.84 32 16C32 7.16 24.84 0 16 0ZM16 28C9.37 28 4 22.63 4 16C4 9.37 9.37 4 16 4C22.63 4 28 9.37 28 16C28 22.63 22.63 28 16 28ZM22 8H21V7C21 6.45 20.55 6 20 6C19.45 6 19 6.45 19 7V8H13V7C13 6.45 12.55 6 12 6C11.45 6 11 6.45 11 7V8H10C8.9 8 8 8.9 8 10V22C8 23.1 8.9 24 10 24H22C23.1 24 24 23.1 24 22V10C24 8.9 23.1 8 22 8ZM21 22H11C10.45 22 10 21.55 10 21V13H22V21C22 21.55 21.55 22 21 22Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 5,
            title: "Convenience",
            description: "Our pickup and delivery service brings laundry care to your doorstep, eliminating trips to the laundromat or dry cleaner.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.16 0 0 7.16 0 16C0 24.84 7.16 32 16 32C24.84 32 32 24.84 32 16C32 7.16 24.84 0 16 0ZM14 26L4 16L6.83 13.17L14 20.34L25.17 9.17L28 12L14 26Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 6,
            title: "Customized Care",
            description: "We follow your specific preferences for detergents, fabric softeners, folding methods, and special instructions.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 12H22V4C22 2.9 21.1 2 20 2H12C10.9 2 10 2.9 10 4V12H2C0.9 12 0 12.9 0 14V22C0 23.1 0.9 24 2 24H10V30C10 31.1 10.9 32 12 32H20C21.1 32 22 31.1 22 30V24H30C31.1 24 32 23.1 32 22V14C32 12.9 31.1 12 30 12Z" fill="currentColor" />
                </svg>
            )
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
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
        <section id="benefits" className={styles.benefits} ref={sectionRef}>
            <div className={styles.benefits__background}>
                <div className={styles.benefits__overlay}></div>
                <Image
                    src="/images/laundry/benefits-bg.webp"
                    alt="Clean laundry background"
                    fill
                    priority
                    sizes="100vw"
                    className={styles.benefits__image}
                />
            </div>

            <div className={styles.benefits__container}>
                <motion.div
                    className={styles.benefits__heading}
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
                    <span className={styles.benefits__subheading}>Why Choose Us</span>
                    <h2 className={styles.benefits__title}>The Benefits of Our Laundry Service</h2>
                    <p className={styles.benefits__description}>
                        Discover how our professional laundry service can transform your daily routine and give you back precious time while providing superior results.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.benefits__grid}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {benefits.map((benefit) => (
                        <motion.div
                            key={benefit.id}
                            className={styles.benefits__item}
                            variants={itemVariants}
                        >
                            <div className={styles['benefits__item-icon']}>
                                {benefit.icon}
                            </div>
                            <h3 className={styles['benefits__item-title']}>{benefit.title}</h3>
                            <p className={styles['benefits__item-description']}>{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.benefits__cta}
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
                    <a href="/book-service" className={styles.benefits__button}>
                        Experience the Benefits
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default LaundryBenefits;