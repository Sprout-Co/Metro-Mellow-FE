'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import styles from './Services.module.scss';
import Button from '@/components/ui/Button/Button';

interface ServiceItem {
    id: string;
    title: string;
    description: string[];
    image: string;
    icon: React.ReactNode;
    color: string;
    price: string;
}

const servicesData: ServiceItem[] = [
    {
        id: 'residential',
        title: 'Residential Cleaning',
        description: [
            'Daily & weekly home cleaning options',
            'Deep cleaning of kitchens & bathrooms',
            'Thorough dusting & vacuuming',
            'Customizable cleaning checklists'
        ],
        image: '/images/cleaning/residential-cleaning.jpg',
        color: '#4A6FFF',
        price: 'From $89',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        )
    },
    {
        id: 'commercial',
        title: 'Commercial Cleaning',
        description: [
            'Office & workspace sanitization',
            'Retail & commercial floor cleaning',
            'Window & glass surface cleaning',
            'Flexible scheduling for businesses'
        ],
        image: '/images/cleaning/commercial-cleaning.jpg',
        color: '#28C76F',
        price: 'From $199',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
        )
    },
    {
        id: 'deep',
        title: 'Deep Cleaning',
        description: [
            'End-to-end thorough cleaning',
            'Inside appliance & cabinet cleaning',
            'Detailed baseboards & crown molding',
            'Wall washing & floor deep scrubbing'
        ],
        image: '/images/cleaning/deep-cleaning.jpg',
        color: '#FF7A4A',
        price: 'From $249',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
        )
    }
];

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className={styles.services} ref={ref}>
            <div className={styles.services__container}>
                <motion.div
                    className={styles.services__header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.services__badge}>OUR SERVICES</span>
                    <h2 className={styles.services__title}>Professional Cleaning Services</h2>
                    <p className={styles.services__subtitle}>
                        We provide a variety of cleaning services to meet all your needs. Our professional team ensures quality and satisfaction with every visit.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.services__grid}
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {servicesData.map((service) => (
                        <motion.div key={service.id} className={styles.services__cardWrapper} variants={item}>
                            <div className={styles.services__card} style={{ '--card-color': service.color } as React.CSSProperties}>
                                <div className={styles.services__cardImageContainer}>
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        width={400}
                                        height={250}
                                        className={styles.services__cardImage}
                                    />
                                    <div className={styles.services__cardOverlay}></div>
                                </div>

                                <div className={styles.services__cardIcon} style={{ backgroundColor: service.color }}>
                                    {service.icon}
                                </div>

                                <div className={styles.services__cardContent}>
                                    <div className={styles.services__cardHeader}>
                                        <h3 className={styles.services__cardTitle}>{service.title}</h3>
                                        <div className={styles.services__cardPrice}>{service.price}</div>
                                    </div>

                                    <ul className={styles.services__cardList}>
                                        {service.description.map((item, index) => (
                                            <li key={index} className={styles.services__cardListItem}>
                                                <svg className={styles.services__checkIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className={styles.services__cardActions}>
                                        <Button
                                            variant="primary"
                                            size="md"
                                            href={`/services/${service.id}`}
                                            className={styles.services__cardButton}
                                        >
                                            Book Now
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="md"
                                            href={`/services/${service.id}`}
                                            className={styles.services__cardButton}
                                        >
                                            Learn More
                                        </Button>
                                    </div>
                                </div>

                                <div className={styles.services__cardBadge}>
                                    <span>Popular</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;