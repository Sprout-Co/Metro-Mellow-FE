'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styles from './CookingFAQ.module.scss';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const CookingFAQ = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How does the meal delivery service work?",
      answer: "Our service provides chef-prepared meals delivered directly to your door on a subscription basis. You choose your meal plan based on your household size and preferences, select your desired meals from our weekly menu, and we deliver them according to your chosen schedule. The meals arrive in insulated packaging to keep them fresh, and most just need a few minutes of heating before they're ready to enjoy."
    },
    {
      id: 2,
      question: "How often are meals delivered?",
      answer: "We offer flexible delivery schedules including weekly, bi-weekly, or monthly options. You can choose your preferred delivery day and time slot during checkout. Meal deliveries are available Monday through Friday in most service areas."
    },
    {
      id: 3,
      question: "Can I customize my meal plan for dietary restrictions?",
      answer: "Absolutely! We offer specialized meal plans for various dietary needs including vegetarian, vegan, gluten-free, dairy-free, keto, paleo, and low-sodium options. During signup, you can indicate your dietary preferences, and our menu will filter accordingly. You can also note specific allergies or ingredients to avoid, and our chefs will accommodate these restrictions."
    },
    {
      id: 4,
      question: "How long do the meals stay fresh?",
      answer: "Our meals are prepared fresh, never frozen, and are designed to stay fresh in your refrigerator for 5-7 days from delivery. Each meal container is clearly labeled with a 'best by' date. Some items like salads are best consumed within the first 2-3 days, while heartier dishes like stews and curries may last the full week."
    },
    {
      id: 5,
      question: "Can I skip deliveries or pause my subscription?",
      answer: "Yes, you have full flexibility to manage your subscription. You can skip weeks, pause your subscription, or make changes to your plan at any time through your account dashboard. We just ask that any changes be made at least 3 days before your scheduled delivery to allow our chefs time to prepare accordingly."
    },
    {
      id: 6,
      question: "What areas do you currently service?",
      answer: "We currently deliver to most major metropolitan areas and their surrounding suburbs. You can check if we deliver to your area by entering your zip code on our website. We're constantly expanding our delivery zones, so if we're not in your area yet, you can join our waitlist to be notified when we expand to your location."
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
            Find answers to our most commonly asked questions about our meal delivery service. If you can't find what you're looking for, feel free to contact us directly.
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
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

export default CookingFAQ;