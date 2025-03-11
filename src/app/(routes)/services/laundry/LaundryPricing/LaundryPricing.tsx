'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './LaundryPricing.module.scss';

interface PricingOption {
    id: string;
    name: string;
    description: string;
    popular?: boolean;
    price: {
        value: number;
        unit: string;
    };
    features: {
        included: string[];
        excluded?: string[];
    };
}

interface PricingTab {
    id: string;
    label: string;
}

const LaundryPricing = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const pricingTabs: PricingTab[] = [
        { id: 'subscription', label: 'Subscription' },
        { id: 'onetime', label: 'One-Time Service' }
    ];

    const [activeTab, setActiveTab] = useState<string>(pricingTabs[0].id);

    const subscriptionPlans: PricingOption[] = [
        {
            id: 'basic',
            name: 'Basic',
            description: 'Perfect for individuals or small households with moderate laundry needs',
            price: {
                value: 79,
                unit: 'month'
            },
            features: {
                included: [
                    '15 lbs of laundry per week',
                    'Wash & fold service',
                    'Weekly pickup & delivery',
                    'Standard 48-hour turnaround',
                    'Basic stain treatment'
                ]
            }
        },
        {
            id: 'premium',
            name: 'Premium',
            description: 'Ideal for families or those wanting more comprehensive laundry care',
            popular: true,
            price: {
                value: 129,
                unit: 'month'
            },
            features: {
                included: [
                    '30 lbs of laundry per week',
                    'Wash & fold service',
                    'Weekly pickup & delivery',
                    'Express 24-hour turnaround',
                    'Advanced stain treatment',
                    'Garment repairs (buttons, small tears)',
                    'Special items care (comforters, blankets)'
                ]
            }
        },
        {
            id: 'ultimate',
            name: 'Ultimate',
            description: 'The complete package for those who want full laundry management',
            price: {
                value: 199,
                unit: 'month'
            },
            features: {
                included: [
                    '50 lbs of laundry per week',
                    'Wash & fold service',
                    'Twice weekly pickup & delivery',
                    'Priority 12-hour turnaround',
                    'Premium stain treatment',
                    'Garment repairs & alterations',
                    'Special items care',
                    'Dry cleaning (4 items per month)',
                    'Seasonal storage options'
                ]
            }
        }
    ];

    const onetimePlans: PricingOption[] = [
        {
            id: 'washfold',
            name: 'Wash & Fold',
            description: 'Standard laundry service for everyday clothing items',
            price: {
                value: 2.49,
                unit: 'lb'
            },
            features: {
                included: [
                    'Sorting by color and fabric',
                    'Wash and dry cycles',
                    'Folding and packaging',
                    'Standard 48-hour turnaround',
                    'Free pickup and delivery (min. order $30)'
                ]
            }
        },
        {
            id: 'drycleaning',
            name: 'Dry Cleaning',
            description: 'Professional cleaning for delicate and special garments',
            popular: true,
            price: {
                value: 5.99,
                unit: 'item'
            },
            features: {
                included: [
                    'Inspection for stains and damage',
                    'Professional dry cleaning',
                    'Pressing and finishing',
                    'Packaged in protective covers',
                    'Free pickup and delivery (min. order $30)'
                ]
            }
        },
        {
            id: 'specialty',
            name: 'Specialty Items',
            description: 'For bulky, large, or uniquely demanding laundry items',
            price: {
                value: 14.99,
                unit: 'item'
            },
            features: {
                included: [
                    'Comforters & duvets',
                    'Blankets & bedspreads',
                    'Area rugs (small)',
                    'Specialized cleaning methods',
                    'Free pickup and delivery (min. order $30)'
                ]
            }
        }
    ];

    const activePlans = activeTab === 'subscription' ? subscriptionPlans : onetimePlans;

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section id="pricing" className={styles.pricing} ref={sectionRef}>
            <div className={styles.pricing__container}>
                <motion.div
                    className={styles.pricing__heading}
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
                    <span className={styles.pricing__subheading}>Pricing Plans</span>
                    <h2 className={styles.pricing__title}>Flexible Options for Every Need</h2>
                    <p className={styles.pricing__description}>
                        Choose between our subscription plans for regular service or one-time options for occasional needs. All plans include free pickup and delivery within our service area.
                    </p>
                </motion.div>

                <div className={styles.pricing__tabs}>
                    {pricingTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.pricing__tab} ${activeTab === tab.id ? styles['pricing__tab--active'] : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    className={styles['pricing__tab-indicator']}
                                    layoutId="pricingTab"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <motion.div
                    className={styles.pricing__plans}
                    key={activeTab}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    {activePlans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            className={`${styles.pricing__plan} ${plan.popular ? styles['pricing__plan--popular'] : ''}`}
                            variants={fadeIn}
                        >
                            {plan.popular && (
                                <div className={styles['pricing__plan-badge']}>Most Popular</div>
                            )}

                            <div className={styles['pricing__plan-header']}>
                                <h3 className={styles['pricing__plan-name']}>{plan.name}</h3>
                                <p className={styles['pricing__plan-description']}>{plan.description}</p>
                            </div>

                            <div className={styles['pricing__plan-price']}>
                                <span className={styles['pricing__plan-amount']}>${plan.price.value}</span>
                                <span className={styles['pricing__plan-unit']}>/{plan.price.unit}</span>
                            </div>

                            <ul className={styles['pricing__plan-features']}>
                                {plan.features.included.map((feature, index) => (
                                    <li key={index} className={styles['pricing__plan-feature']}>
                                        <svg className={styles['pricing__plan-check']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}

                                {plan.features.excluded && plan.features.excluded.map((feature, index) => (
                                    <li key={index} className={`${styles['pricing__plan-feature']} ${styles['pricing__plan-feature--excluded']}`}>
                                        <svg className={styles['pricing__plan-cross']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z" fill="currentColor" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={styles['pricing__plan-button']}>
                                Choose Plan
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.pricing__note}
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            delay: 0.8
                        }
                    } : { opacity: 0 }}
                >
                    <p>
                        All prices include standard pickup and delivery. Additional fees may apply for rush service or special handling requirements. For commercial pricing, please <a href="/contact">contact us</a> for a customized quote.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default LaundryPricing;