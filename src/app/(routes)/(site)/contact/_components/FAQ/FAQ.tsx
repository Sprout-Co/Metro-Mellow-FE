// components/contact/FAQ.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./FAQ.module.scss";

// FAQ Data
const faqItems = [
  {
    id: 1,
    question: "What areas do you service?",
    answer:
      "Metromellow currently serves the greater New York City area, including Manhattan, Brooklyn, Queens, and parts of New Jersey. We are constantly expanding our service area, so please contact us if you are unsure if we cover your location.",
  },
  {
    id: 2,
    question: "How do I schedule a service?",
    answer:
      "You can schedule a service through our website, by phone, or via email. We recommend booking at least 48 hours in advance, especially for first-time clients, but we do our best to accommodate last-minute requests when possible.",
  },
  {
    id: 3,
    question: "Are your cleaning products eco-friendly?",
    answer:
      "Yes, we prioritize the use of eco-friendly, non-toxic cleaning products in all our services. If you have specific product preferences or allergies, please let us know, and we will accommodate your needs.",
  },
  {
    id: 4,
    question: "What is your cancellation policy?",
    answer:
      "We understand that plans change. We request at least 24 hours notice for cancellations to avoid a cancellation fee. For circumstances outside your control, please contact us as soon as possible.",
  },
  {
    id: 5,
    question: "Are your service providers insured and background checked?",
    answer:
      "Absolutely. All Metromellow professionals undergo thorough background checks, and our company is fully insured. We take your safety and security seriously.",
  },
  {
    id: 6,
    question: "Do you offer recurring service plans?",
    answer:
      "Yes, we offer weekly, bi-weekly, and monthly service plans at discounted rates. Recurring clients also receive priority scheduling and consistent service providers when possible.",
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.faq__container}>
        <motion.div
          className={styles.faq__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.faq__title}>Frequently Asked Questions</h2>
          <p className={styles.faq__subtitle}>
            Find answers to common questions about our services
          </p>
        </motion.div>

        <div className={styles.faq__list}>
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${styles.faq__item} ${openItem === item.id ? styles["faq__item--open"] : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={styles.faq__question}
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItem === item.id}
              >
                {item.question}
                <span className={styles.faq__icon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={
                        openItem === item.id
                          ? "M18 15L12 9L6 15"
                          : "M6 9L12 15L18 9"
                      }
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={styles.faq__answer}
                style={{
                  maxHeight: openItem === item.id ? "1000px" : "0",
                  opacity: openItem === item.id ? 1 : 0,
                }}
              >
                <p>{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.faq__contact}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className={styles.faq__contactText}>
            Can't find what you're looking for? We're here to help!
          </p>
          <a
            href="mailto:support@metromellow.com"
            className={styles.faq__contactLink}
          >
            support@metromellow.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
