'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import styles from './About.module.scss';

const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '1000+', label: 'Happy Clients' },
    { value: '24/7', label: 'Customer Support' },
    { value: '100%', label: 'Satisfaction Rate' }
];

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <section className={styles.about} ref={ref}>
            <div className={styles.about__pattern}></div>

            <div className={styles.about__container}>
                <motion.div
                    className={styles.about__imageWrapper}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.8, ease: "easeOut" }
                        }
                    }}
                >
                    <div className={styles.about__imageMain}>
                        <Image
                            src="/images/cleaning/cleaning-page-about-us.jpg"
                            alt="Office cleaning service"
                            width={500}
                            height={600}
                            className={styles.about__image}
                        />
                        <div className={styles.about__imageShadow}></div>
                    </div>

                    <div className={styles.about__imageSecondary}>
                        <Image
                            src="/images/cleaning/cleaning-detail.jpg"
                            alt="Cleaning detail"
                            width={250}
                            height={250}
                            className={styles.about__imageSmall}
                        />
                    </div>

                    <div className={styles.about__experience}>
                        <span className={styles.about__experienceYears}>10+</span>
                        <span className={styles.about__experienceText}>Years of Experience</span>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.about__content}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, x: 50 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
                        }
                    }}
                >
                    <div className={styles.about__header}>
                        <span className={styles.about__subheading}>ABOUT US</span>
                        <h2 className={styles.about__title}>Transforming Spaces with Pristine Excellence</h2>
                    </div>

                    <p className={styles.about__text}>
                        At UrbanServe, we believe that a clean environment is the foundation for a happy, healthy life. Our mission is to transform spaces into pristine sanctuaries where you can thrive.
                    </p>

                    <p className={styles.about__text}>
                        It's not just a service—it's a craft we've perfected over the years through expertise and dedication. We pride ourselves on our attention to detail, eco-friendly practices, and the smiles we bring to our clients' faces.
                    </p>

                    <ul className={styles.about__features}>
                        <li className={styles.about__feature}>
                            <svg className={styles.about__featureIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>Professional & Certified Cleaners</span>
                        </li>
                        <li className={styles.about__feature}>
                            <svg className={styles.about__featureIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>Eco-Friendly Cleaning Products</span>
                        </li>
                        <li className={styles.about__feature}>
                            <svg className={styles.about__featureIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>100% Satisfaction Guarantee</span>
                        </li>
                    </ul>
                </motion.div>
            </div>

            <motion.div
                className={styles.about__stats}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.4,
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                <div className={styles.about__statsContainer}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={styles.about__statItem}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5 }
                                }
                            }}
                        >
                            <span className={styles.about__statValue}>{stat.value}</span>
                            <span className={styles.about__statLabel}>{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default About;