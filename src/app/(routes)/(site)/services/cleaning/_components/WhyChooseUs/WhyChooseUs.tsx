'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './WhyChooseUs.module.scss';

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const featuresData: Feature[] = [
    {
        id: 'professionals',
        title: 'Trusted Professionals',
        description: 'Our cleaning experts are thoroughly screened, background-checked, and trained to deliver exceptional service.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        )
    },
    {
        id: 'ecofriendly',
        title: 'Eco-Friendly Practices',
        description: 'We use environmentally-conscious cleaning products that are safe for your family, pets, and the planet.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z"></path>
                <path d="M6 18a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6A4 4 0 0 0 6 6v12z"></path>
                <line x1="12" y1="22" x2="12" y2="2"></line>
            </svg>
        )
    },
    {
        id: 'satisfaction',
        title: 'Satisfaction Guaranteed',
        description: "If you're not 100% satisfied, we'll re-clean any areas of concern at no additional cost to ensure your happiness.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
        )
    }
];

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <section className={styles.features} ref={ref}>
            <div className={styles.features__container}>
                <motion.div
                    className={styles.features__header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.features__badge}>WHY CHOOSE US</span>
                    <h2 className={styles.features__title}>The Urban Serve Difference</h2>
                    <p className={styles.features__subtitle}>
                        We're committed to delivering exceptional cleaning services that exceed your expectations.
                    </p>
                </motion.div>

                <div className={styles.features__grid}>
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className={styles.features__card}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className={styles.features__iconContainer}>
                                <div className={styles.features__icon}>{feature.icon}</div>
                                <div className={styles.features__iconBackground}></div>
                            </div>

                            <h3 className={styles.features__cardTitle}>{feature.title}</h3>
                            <p className={styles.features__cardDescription}>{feature.description}</p>

                            <div className={styles.features__cardBackground}></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;