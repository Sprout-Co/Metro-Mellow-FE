'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import styles from './LaundryAbout.module.scss';

const LaundryAbout = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <section className={styles.about} ref={ref}>
            <div className={styles.about__container}>
                <motion.div
                    className={styles.about__content}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <span className={styles.about__badge}>About Our Laundry Service</span>
                    <h2 className={styles.about__title}>Professional Laundry Care for All Your Needs</h2>

                    <p className={styles.about__text}>
                        At Urban Serve, we understand that laundry can be time-consuming and tedious. That's why we offer comprehensive laundry solutions to make your life easier. Our professional team handles everything from everyday clothes to special garments with the utmost care and attention to detail.
                    </p>

                    <p className={styles.about__text}>
                        We use premium, eco-friendly detergents and state-of-the-art equipment to ensure your clothes come back fresh, clean, and perfectly folded. Whether you need recurring weekly service or occasional help with large loads, we've got you covered.
                    </p>

                    <div className={styles.about__stats}>
                        <div className={styles.about__stat}>
                            <div className={styles.about__statValue}>10+</div>
                            <div className={styles.about__statLabel}>Years Experience</div>
                        </div>

                        <div className={styles.about__stat}>
                            <div className={styles.about__statValue}>24/7</div>
                            <div className={styles.about__statLabel}>Service Available</div>
                        </div>

                        <div className={styles.about__stat}>
                            <div className={styles.about__statValue}>100%</div>
                            <div className={styles.about__statLabel}>Quality Guarantee</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.about__images}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    <div className={styles.about__imageMain}>
                        <Image
                            src="/images/laundry/laundry-folding.jpg"
                            alt="Professional laundry folding"
                            width={500}
                            height={400}
                            className={styles.about__image}
                        />
                    </div>

                    <div className={styles.about__imageSecondary}>
                        <Image
                            src="/images/laundry/laundry-detail.jpg"
                            alt="Laundry service detail"
                            width={280}
                            height={200}
                            className={styles.about__imageSmall}
                        />
                    </div>

                    <div className={styles.about__certification}>
                        <div className={styles.about__certificationIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                        </div>
                        <div className={styles.about__certificationText}>
                            <span className={styles.about__certificationTitle}>Certified</span>
                            <span className={styles.about__certificationSubtitle}>Eco-Friendly Service</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LaundryAbout;