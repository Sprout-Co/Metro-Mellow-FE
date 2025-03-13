'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styles from './LaundryFAQ.module.scss';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const LaundryFAQ = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            id: 1,
            question: "How does your pickup and delivery service work?",
            answer: "We offer scheduled pickup and delivery services based on your preferences. Simply sign up, select your desired time slots, and leave your laundry in the designated bags we provide. Our drivers will collect your items and return them clean and neatly folded or hung at your scheduled delivery time."
        },
        {
            id: 2,
            question: "What types of garments do you accept?",
            answer: "We accept most types of clothing, bedding, and linens. This includes regular clothing, delicates, business attire, bedsheets, towels, and comforters. However, we cannot process items that are heavily soiled with hazardous materials, contain leather, fur, or items that explicitly state 'do not wash' on their care labels."
        },
        {
            id: 3,
            question: "How are your prices calculated?",
            answer: "Our pricing is transparent and depends on the service you choose. For wash & fold services, we charge by weight. For dry cleaning and specialty items, we charge per piece. Subscription plans offer bundled services at discounted rates. All prices include standard pickup and delivery within our service area."
        },
        {
            id: 4,
            question: "What detergents and fabric softeners do you use?",
            answer: "We use high-quality, eco-friendly detergents that are effective yet gentle on fabrics and the environment. We offer fragrance-free options as well as lightly scented varieties. If you have specific preferences or allergies, we're happy to accommodate your needs with our selection of hypoallergenic products."
        },
        {
            id: 5,
            question: "What if I'm not satisfied with the service?",
            answer: "Your satisfaction is our priority. If you're not completely happy with our service, please notify us within 24 hours of delivery, and we'll redo the service at no additional cost. For any damaged items, we have a claims process that our customer service team will guide you through."
        },
        {
            id: 6,
            question: "Do you offer rush or same-day service?",
            answer: "Yes, we offer expedited service options for an additional fee. Same-day service is available for orders placed before 9 AM, with delivery by 8 PM. Rush service guarantees a 24-hour turnaround. Please note that availability may be limited based on capacity and your location."
        }
    ];

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="faq" className={styles.faq} ref={sectionRef}>
            <div className={styles.faq__container}>
                <motion.div
                    className={styles.faq__heading}
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
                    <span className={styles.faq__subheading}>FAQ</span>
                    <h2 className={styles.faq__title}>Frequently Asked Questions</h2>
                    <p className={styles.faq__description}>
                        Find answers to our most commonly asked questions about our laundry services. If you can't find what you're looking for, feel free to contact us directly.
                    </p>
                </motion.div>

                <div className={styles.faq__list}>
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`${styles.faq__item} ${activeIndex === index ? styles['faq__item--active'] : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut",
                                    delay: 0.1 * index
                                }
                            } : { opacity: 0, y: 20 }}
                        >
                            <button
                                className={styles.faq__question}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span>{item.question}</span>
                                <div className={styles.faq__icon}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={activeIndex === index ? styles['faq__icon--active'] : ''}
                                    >
                                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        className={styles.faq__answer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: 'auto',
                                            opacity: 1,
                                            transition: {
                                                height: { duration: 0.3 },
                                                opacity: { duration: 0.3, delay: 0.1 }
                                            }
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: { duration: 0.3 },
                                                opacity: { duration: 0.2 }
                                            }
                                        }}
                                    >
                                        <p>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.faq__contact}
                    variants={fadeIn}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <p>Still have questions? We're here to help.</p>
                    <a href="/contact" className={styles.faq__button}>
                        Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default LaundryFAQ;