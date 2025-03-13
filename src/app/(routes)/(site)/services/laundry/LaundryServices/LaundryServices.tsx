// components/laundry/LaundryServices.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './LaundryServices.module.scss';

interface Service {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    features: string[];
}

const LaundryServices = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const services: Service[] = [
        {
            id: 1,
            title: "Wash & Fold",
            description: "Our signature wash and fold service handles your everyday laundry needs with care. We sort, wash, dry, and neatly fold your items, ready for you to put away.",
            imageUrl: "/images/laundry/wash-fold.jpg",
            features: [
                "Sorting by color and fabric type",
                "Pre-treatment of stains",
                "Temperature-appropriate washing",
                "Gentle drying cycles",
                "Precision folding and packaging"
            ]
        },
        {
            id: 2,
            title: "Dry Cleaning",
            description: "Professional dry cleaning for your delicate garments, suits, dresses, and items labeled 'dry clean only.' We use eco-friendly solvents and careful handling techniques.",
            imageUrl: "/images/laundry/dry-cleaning.jpg",
            features: [
                "Gentle solvent cleaning",
                "Hand-finished pressing",
                "Button and trim protection",
                "Quality inspection process",
                "Protective garment bags"
            ]
        },
        {
            id: 3,
            title: "Ironing & Pressing",
            description: "Achieve that crisp, professional look with our expert ironing and pressing services. Perfect for dress shirts, blouses, slacks, and formal attire.",
            imageUrl: "/images/laundry/ironing.jpg",
            features: [
                "Temperature control for fabric type",
                "Steam pressing for deep wrinkles",
                "Precise collar and cuff finishing",
                "Careful attention to pleats and details",
                "Hanging or folding as preferred"
            ]
        },
        {
            id: 4,
            title: "Stain Removal",
            description: "Our stain removal specialists tackle even the toughest spots and spills. We use targeted techniques and specialized products for different stain types.",
            imageUrl: "/images/laundry/stain-removal.jpg",
            features: [
                "Stain type identification",
                "Customized treatment methods",
                "Safe, eco-friendly products",
                "Preservation of fabric integrity",
                "Pre and post-treatment assessment"
            ]
        },
        {
            id: 5,
            title: "Subscription Plans",
            description: "Regular laundry service on your schedule. Set up weekly, bi-weekly, or monthly pickups and enjoy consistent, hassle-free laundry care.",
            imageUrl: "/images/laundry/stain-removal.jpg",
            features: [
                "Customizable schedule options",
                "Priority processing",
                "Personalized care instructions",
                "Volume discounts",
                "Free pickup and delivery"
            ]
        }
    ];

    const [activeService, setActiveService] = useState<Service>(services[0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
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
        <section id="services" className={styles.services} ref={sectionRef}>
            <div className={styles.services__container}>
                <motion.div
                    className={styles.services__heading}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.span
                        className={styles.services__subheading}
                        variants={itemVariants}
                    >
                        Our Services
                    </motion.span>
                    <motion.h2
                        className={styles.services__title}
                        variants={itemVariants}
                    >
                        Comprehensive Laundry Solutions
                    </motion.h2>
                    <motion.p
                        className={styles.services__description}
                        variants={itemVariants}
                    >
                        We offer a full range of laundry services to meet all your needs, from everyday basics to special garment care. Each service is performed with attention to detail and commitment to quality.
                    </motion.p>
                </motion.div>

                <div className={styles.services__content}>
                    <div className={styles.services__tabs}>
                        {services.map((service) => (
                            <motion.button
                                key={service.id}
                                className={`${styles.services__tab} ${activeService.id === service.id ? styles['services__tab--active'] : ''}`}
                                onClick={() => setActiveService(service)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        ease: "easeOut",
                                        delay: 0.1 * service.id
                                    }
                                } : { opacity: 0, x: -20 }}
                            >
                                <span>{service.title}</span>
                                {activeService.id === service.id && (
                                    <motion.div
                                        className={styles['services__tab-indicator']}
                                        layoutId="activeTab"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        className={styles.services__details}
                        key={activeService.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.5 }
                        }}
                    >
                        <div className={styles['services__details-content']}>
                            <h3 className={styles['services__details-title']}>{activeService.title}</h3>
                            <p className={styles['services__details-description']}>{activeService.description}</p>

                            <div className={styles['services__details-features']}>
                                <h4 className={styles['services__details-subtitle']}>What's Included:</h4>
                                <ul className={styles['services__details-list']}>
                                    {activeService.features.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            className={styles['services__details-item']}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                transition: {
                                                    duration: 0.3,
                                                    delay: 0.1 * index
                                                }
                                            }}
                                        >
                                            <svg className={styles['services__details-icon']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor" />
                                            </svg>
                                            <span>{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <motion.div
                            className={styles['services__details-image']}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut"
                                }
                            }}
                        >
                            <Image
                                src={activeService.imageUrl}
                                alt={`${activeService.title} service`}
                                width={500}
                                height={400}
                                className={styles['services__details-img']}
                            />
                            <div className={styles['services__details-accent']}></div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LaundryServices;