'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './FAQ.module.scss';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What cleaning supplies do you bring?",
        answer: "We bring all professional-grade cleaning supplies and equipment needed for a thorough cleaning. We use eco-friendly products that are safe for children and pets. If you have specific products you'd prefer we use, just let us know!"
    },
    {
        question: "How do you determine the cost of cleaning?",
        answer: "Our pricing is based on the size of your space, the type of cleaning service requested, and the specific needs of your property. We offer free estimates so you know exactly what to expect before booking."
    },
    {
        question: "Do I need to be home during the cleaning?",
        answer: "No, you don't need to be home. Many clients provide a key or access code. We maintain strict security protocols to ensure your property and possessions are safe. If you prefer to be present, that's completely fine too."
    },
    {
        question: "Can I request specific cleaning tasks?",
        answer: "Absolutely! We offer customized cleaning plans tailored to your specific needs. Whether you want special attention to certain areas or have particular cleaning requirements, we're happy to accommodate your requests."
    },
    {
        question: "What is your satisfaction guarantee?",
        answer: "We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with any area we've cleaned, let us know within 24 hours and we'll return to re-clean it at no additional charge."
    },
    {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least one week in advance for regular cleaning services, and 2-3 weeks for deep cleans or special events. However, we do our best to accommodate last-minute requests based on availability."
    }
];

const FAQ = () => {
    // Directly use numeric state rather than null/number type to avoid issues
    const [activeIndex, setActiveIndex] = useState(-1);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    // Simple toggle function - no conditional logic to confuse things
    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section className={styles.faq} ref={ref}>
            <div className={styles.faq__container}>
                <div className={styles.faq__pattern}></div>

                <motion.div
                    className={styles.faq__header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.faq__badge}>FAQ</span>
                    <h2 className={styles.faq__title}>Frequently Asked Questions</h2>
                    <p className={styles.faq__subtitle}>
                        Find answers to common questions about our cleaning services, processes, and policies.
                    </p>
                </motion.div>

                <div className={styles.faq__content}>
                    <div className={styles.faq__accordionContainer}>
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`${styles.faq__accordionItem} ${activeIndex === index ? styles['faq__accordionItem--active'] : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <button
                                    className={styles.faq__accordionHeader}
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    <span className={styles.faq__accordionQuestion}>{faq.question}</span>
                                    <span className={styles.faq__accordionIcon}>
                                        {activeIndex === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        )}
                                    </span>
                                </button>

                                {/* Simple display approach based on active state */}
                                <div
                                    className={`${styles.faq__accordionBody} ${activeIndex === index ? styles['faq__accordionBody--active'] : ''}`}
                                >
                                    <div className={styles.faq__accordionContent}>
                                        <p className={styles.faq__accordionAnswer}>{faq.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className={styles.faq__callout}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className={styles.faq__calloutTitle}>Have more questions?</h3>
                        <p className={styles.faq__calloutText}>
                            Our customer support team is always ready to help you with any questions or concerns.
                        </p>
                        <a href="/contact" className={styles.faq__calloutButton}>
                            Contact Us
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;