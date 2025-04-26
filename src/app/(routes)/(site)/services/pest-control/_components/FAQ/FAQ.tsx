"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Are your pest control methods safe for children and pets?",
    answer:
      "Yes, we prioritize safety in all our treatments. We use eco-friendly, low-toxicity products that are effective against pests but safe for your family and pets when used as directed. We also provide guidance on when it's safe to re-enter treated areas.",
  },
  {
    question: "How often should I schedule pest control services?",
    answer:
      "The frequency depends on several factors including the type of pest, severity of infestation, and your location. For preventative maintenance, quarterly services are typically recommended. However, we customize treatment schedules based on your specific needs.",
  },
  {
    question: "What types of pests do you treat?",
    answer:
      "We handle a comprehensive range of pests including ants, roaches, spiders, rodents, termites, bed bugs, mosquitoes, flies, wasps, and more. Our technicians are trained to identify and effectively treat virtually any pest problem you might encounter.",
  },
  {
    question: "Do you offer emergency pest control services?",
    answer:
      "Yes, we understand that some pest situations require immediate attention. We offer emergency pest control services with same-day or next-day appointments whenever possible. Contact our customer service line for emergency assistance.",
  },
  {
    question: "What's included in your initial inspection?",
    answer:
      "Our comprehensive inspection includes a thorough examination of your property to identify active infestations, potential entry points, conducive conditions, and risk factors. We then provide a detailed report and customized treatment plan addressing your specific pest issues.",
  },
  {
    question: "Do you offer any guarantees for your pest control services?",
    answer:
      "Yes, we stand behind our work with a satisfaction guarantee. If pests return between scheduled treatments, we'll return at no additional cost. We also offer specific guarantees for certain pest services, such as termite treatments. Ask your technician about our service warranties.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq" ref={ref}>
      <div className={styles.faq__container}>
        <motion.div
          className={styles.faq__header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.faq__badge}>FAQ</span>
          <h2 className={styles.faq__title}>Frequently Asked Questions</h2>
          <p className={styles.faq__subtitle}>
            Get answers to common questions about our pest control services. If
            you don't find what you're looking for, feel free to contact us
            directly.
          </p>
        </motion.div>

        <motion.div
          className={styles.faq__list}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faq__item}>
              <button
                className={`${styles.faq__question} ${
                  activeIndex === index ? styles.faq__question_active : ""
                }`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>
                <span className={styles.faq__icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {activeIndex === index ? (
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </>
                    )}
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className={styles.faq__answer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.faq__answer_content}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.faq__cta}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p>Still have questions?</p>
          <a href="/contact" className={styles.faq__button}>
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
