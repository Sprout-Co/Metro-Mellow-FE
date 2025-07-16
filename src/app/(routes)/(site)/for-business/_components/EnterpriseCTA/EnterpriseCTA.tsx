"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import styles from "./EnterpriseCTA.module.scss";

const EnterpriseCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your API
      setSubmitted(true);
    }
  };

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            Ready to Transform Your Business Operations?
          </h2>
          <p className={styles.description}>
            Join leading businesses that have streamlined operations, reduced
            costs, and improved employee satisfaction with our enterprise
            solutions.
          </p>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              className={styles.primaryButton}
            >
              Get Free Consultation
            </Button>

            <Button
              variant="white"
              size="lg"
              className={styles.secondaryButton}
            >
              Download Enterprise Brochure
            </Button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <p className={styles.formLabel}>
                Or leave your email for our team to contact you:
              </p>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Enter your business email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.submit}>
                  Request Info
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Thank you! Our enterprise team will be in touch shortly.
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className={styles.trustIndicators}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <div className={styles.trustIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Enterprise-Grade Security</span>
            </div>
            <div className={styles.trustBadge}>
              <div className={styles.trustIcon}>
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
              <span>SLA Guaranteed</span>
            </div>
            <div className={styles.trustBadge}>
              <div className={styles.trustIcon}>
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
              <span>24/7 Support</span>
            </div>
          </div>

          <div className={styles.clientLogos}>
            <p className={styles.clientsLabel}>Trusted by leading companies</p>
            <div className={styles.logos}>
              <div className={styles.logo}></div>
              <div className={styles.logo}></div>
              <div className={styles.logo}></div>
              <div className={styles.logo}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseCTA;
