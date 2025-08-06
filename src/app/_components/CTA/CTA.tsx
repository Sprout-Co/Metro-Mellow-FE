// components/home/CTASection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styles from "./CTA.module.scss";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API
    // For demo purposes, we'll just set submitted to true
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className={styles.cta}>
      <div className={styles.cta__container}>
        <motion.div
          className={styles.cta__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.cta__title}>
            Ready to Experience the Metromellow Difference?
          </h2>
          <p className={styles.cta__description}>
            Join thousands of satisfied customers who have transformed their
            home life with our comprehensive service solutions. Get started
            today!
          </p>

          <div className={styles.cta__actions}>
            <Link href="/services" className={styles.cta__button}>
              Explore Services
            </Link>
            <span className={styles.cta__or}>or</span>
            {!submitted ? (
              <form onSubmit={handleSubmit} className={styles.cta__form}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.cta__input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.cta__submit}>
                  Request a Quote
                </button>
              </form>
            ) : (
              <motion.p
                className={styles.cta__success}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Thank you! We'll be in touch shortly.
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.cta__features}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.cta__feature}>
            <div className={styles.cta__featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.cta__featureText}>
              <h4 className={styles.cta__featureTitle}>
                Satisfaction Guaranteed
              </h4>
              <p className={styles.cta__featureDescription}>
                100% satisfaction or we'll make it right
              </p>
            </div>
          </div>

          <div className={styles.cta__feature}>
            <div className={styles.cta__featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.cta__featureText}>
              <h4 className={styles.cta__featureTitle}>Fully Insured</h4>
              <p className={styles.cta__featureDescription}>
                All services backed by comprehensive insurance
              </p>
            </div>
          </div>

          <div className={styles.cta__feature}>
            <div className={styles.cta__featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12L15 15M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.cta__featureText}>
              <h4 className={styles.cta__featureTitle}>Flexible Scheduling</h4>
              <p className={styles.cta__featureDescription}>
                Book services when it's convenient for you
              </p>
            </div>
          </div>

          <div className={styles.cta__feature}>
            <div className={styles.cta__featureIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.cta__featureText}>
              <h4 className={styles.cta__featureTitle}>Vetted Professionals</h4>
              <p className={styles.cta__featureDescription}>
                Background-checked, experienced staff
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
