'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './LaundryProcess.module.scss';

interface Step {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
}

const LaundryProcess = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const steps: Step[] = [
        {
            id: 1,
            title: "Schedule Service",
            description: "Book online, by phone, or through our mobile app. Select your preferred service, pickup date, and time slot.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 18.3333H10V21.6667H13.3333V18.3333ZM21.6667 18.3333H18.3333V21.6667H21.6667V18.3333ZM30 18.3333H26.6667V21.6667H30V18.3333ZM33.3333 6.66667H31.6667V3.33333H28.3333V6.66667H11.6667V3.33333H8.33333V6.66667H6.66667C4.83333 6.66667 3.33333 8.16667 3.33333 10V33.3333C3.33333 35.1667 4.83333 36.6667 6.66667 36.6667H33.3333C35.1667 36.6667 36.6667 35.1667 36.6667 33.3333V10C36.6667 8.16667 35.1667 6.66667 33.3333 6.66667ZM33.3333 33.3333H6.66667V15H33.3333V33.3333Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 2,
            title: "Pickup",
            description: "Our driver collects your laundry from your doorstep. We provide laundry bags for easier sorting and handling.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.3333 8.33333H6.66667C5.75 8.33333 5 9.08333 5 10V13.3333H35V10C35 9.08333 34.25 8.33333 33.3333 8.33333ZM35 15H5V30C5 30.9167 5.75 31.6667 6.66667 31.6667H33.3333C34.25 31.6667 35 30.9167 35 30V15ZM25 23.3333H15V21.6667H25V23.3333Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 3,
            title: "Processing",
            description: "We sort, inspect, pre-treat stains, and process your items according to your selected service and specific care instructions.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.3333 5H6.66667C5 5 3.33333 6.66667 3.33333 8.33333V31.6667C3.33333 33.3333 5 35 6.66667 35H33.3333C35 35 36.6667 33.3333 36.6667 31.6667V8.33333C36.6667 6.66667 35 5 33.3333 5ZM20 8.33333C23.6667 8.33333 26.6667 11.3333 26.6667 15C26.6667 18.6667 23.6667 21.6667 20 21.6667C16.3333 21.6667 13.3333 18.6667 13.3333 15C13.3333 11.3333 16.3333 8.33333 20 8.33333ZM33.3333 31.6667H6.66667V30C6.66667 25 16.6667 22.5 20 22.5C23.3333 22.5 33.3333 25 33.3333 30V31.6667Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 4,
            title: "Quality Check",
            description: "Our quality control team inspects each item to ensure everything meets our high standards before packaging.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3333 26.6667L10 18.3333L7.5 20.8333L18.3333 31.6667L38.3333 11.6667L35.8333 9.16667L18.3333 26.6667Z" fill="currentColor" />
                    <path d="M30 20C30 14.4667 25.5334 10 20 10C14.4667 10 10 14.4667 10 20C10 25.5333 14.4667 30 20 30C21.7333 30 23.3667 29.5667 24.8 28.8L27.0667 31.0667C24.9334 32.3333 22.5334 33 20 33C13.1 33 7.5 27.4 7.5 20.5C7.5 13.6 13.1 8 20 8C26.9 8 32.5 13.6 32.5 20.5C32.5 21.4 32.4 22.2667 32.2 23.1L29.8 20.7C29.9334 20.4667 30 20.2333 30 20Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: 5,
            title: "Delivery",
            description: "We deliver your fresh, clean laundry back to your doorstep at your scheduled time, neatly folded or hung as requested.",
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.6667 10H28.3333V3.33333H3.33333V28.3333H8.33333C8.33333 31.6667 11.0667 34.1667 14.1667 34.1667C17.2667 34.1667 20 31.6667 20 28.3333H25C25 31.6667 27.5 34.1667 30.8333 34.1667C34.1667 34.1667 36.6667 31.6667 36.6667 28.3333V10ZM14.1667 30.8333C12.8333 30.8333 11.6667 29.6667 11.6667 28.3333C11.6667 27 12.8333 25.8333 14.1667 25.8333C15.5 25.8333 16.6667 27 16.6667 28.3333C16.6667 29.6667 15.5 30.8333 14.1667 30.8333ZM27.5 16.6667H19.1667V10H27.5V16.6667ZM30.8333 30.8333C29.5 30.8333 28.3333 29.6667 28.3333 28.3333C28.3333 27 29.5 25.8333 30.8333 25.8333C32.1667 25.8333 33.3333 27 33.3333 28.3333C33.3333 29.6667 32.1667 30.8333 30.8333 30.8333Z" fill="currentColor" />
                </svg>
            )
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
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
        <section id="process" className={styles.process} ref={sectionRef}>
            <div className={styles.process__container}>
                <motion.div
                    className={styles.process__heading}
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
                    <span className={styles.process__subheading}>How It Works</span>
                    <h2 className={styles.process__title}>Our Simple 5-Step Process</h2>
                    <p className={styles.process__description}>
                        From pickup to delivery, we've streamlined our laundry service to make it as convenient as possible for you. Our efficient process ensures timely service without compromising on quality.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.process__steps}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {steps.map((step) => (
                        <motion.div
                            key={step.id}
                            className={styles.process__step}
                            variants={itemVariants}
                        >
                            <div className={styles['process__step-number']}>
                                <span>{step.id}</span>
                            </div>
                            <div className={styles['process__step-icon']}>
                                {step.icon}
                            </div>
                            <div className={styles['process__step-content']}>
                                <h3 className={styles['process__step-title']}>{step.title}</h3>
                                <p className={styles['process__step-description']}>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        className={styles.process__line}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? {
                            scaleX: 1,
                            transition: {
                                duration: 1.2,
                                ease: "easeInOut",
                                delay: 0.5
                            }
                        } : { scaleX: 0 }}
                    ></motion.div>
                </motion.div>

                <motion.div
                    className={styles.process__cta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.8
                        }
                    } : { opacity: 0, y: 20 }}
                >
                    <p className={styles.process__text}>Ready to experience our efficient laundry service?</p>
                    <a href="/book-service" className={styles.process__button}>
                        Schedule Pickup
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="currentColor" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default LaundryProcess;