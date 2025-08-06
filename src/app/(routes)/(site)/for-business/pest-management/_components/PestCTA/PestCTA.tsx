"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./PestCTA.module.scss";

const PestCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && company) {
      // Here you would typically send the data to your API
      setSubmitted(true);
    }
  };

  const benefits = [
    "Free comprehensive inspection",
    "Custom pest management plan",
    "24/7 emergency response included",
    "Satisfaction guarantee",
  ];

  return (
    <section className={styles.pestCTA}>
      <div className={styles.pestCTA__container}>
        <motion.div
          className={styles.pestCTA__content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pestCTA__main}>
            <div className={styles.pestCTA__text}>
              <h2 className={styles.pestCTA__title}>
                Protect Your Business Today
              </h2>
              <p className={styles.pestCTA__subtitle}>
                Don't let pests damage your reputation. Get a free inspection
                and custom pest management plan tailored to your business needs.
              </p>

              <ul className={styles.pestCTA__benefits}>
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle size={20} />
                    {benefit}
                  </motion.li>
                ))}
              </ul>

              <div className={styles.pestCTA__actions}>
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<Phone size={18} />}
                  className={styles.pestCTA__callButton}
                >
                  Call (555) 123-PEST
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Schedule Online
                </Button>
              </div>
            </div>

            <div className={styles.pestCTA__form}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.form__header}>
                    <h3>Get Your Free Inspection</h3>
                    <p>
                      Fill out the form and we'll contact you within 2 hours
                    </p>
                  </div>

                  <div className={styles.form__fields}>
                    <div className={styles.form__field}>
                      <input
                        type="text"
                        placeholder="Company Name *"
                        className={styles.form__input}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.form__field}>
                      <input
                        type="email"
                        placeholder="Business Email *"
                        className={styles.form__input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.form__field}>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        className={styles.form__input}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className={styles.form__submit}>
                      Get Free Inspection
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <p className={styles.form__disclaimer}>
                    * No obligation. We'll provide a comprehensive assessment
                    and quote.
                  </p>
                </form>
              ) : (
                <motion.div
                  className={styles.form__success}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle size={48} />
                  <h3>Thank You!</h3>
                  <p>
                    We've received your request. Our pest management specialist
                    will contact you within 2 hours to schedule your free
                    inspection.
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            className={styles.pestCTA__guarantees}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.guarantee}>
              <Shield size={24} />
              <div>
                <strong>100% Satisfaction Guarantee</strong>
                <span>
                  Not satisfied? We'll make it right or refund your money
                </span>
              </div>
            </div>

            <div className={styles.guarantee}>
              <Clock size={24} />
              <div>
                <strong>2-Hour Response Promise</strong>
                <span>We'll contact you within 2 hours, guaranteed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PestCTA;
