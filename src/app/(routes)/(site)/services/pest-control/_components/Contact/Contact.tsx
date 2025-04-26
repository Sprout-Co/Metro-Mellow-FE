"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Contact.module.scss";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.contact__container}>
        <motion.div
          className={styles.contact__header}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <span className={styles.contact__badge}>CONTACT US</span>
          <h2 className={styles.contact__title}>
            Get in Touch for Pest Control Solutions
          </h2>
          <p className={styles.contact__subtitle}>
            Have questions or need more information? Our team is ready to help.
            Reach out to us using any of the methods below.
          </p>
        </motion.div>

        <div className={styles.contact__content}>
          <motion.div
            className={styles.contact__info}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className={styles.contact__info_item} variants={fadeIn}>
              <div className={styles.contact__info_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className={styles.contact__info_content}>
                <h3 className={styles.contact__info_title}>Phone</h3>
                <p className={styles.contact__info_text}>
                  <a
                    href="tel:(123) 456-7890"
                    className={styles.contact__info_link}
                  >
                    (123) 456-7890
                  </a>
                </p>
                <p className={styles.contact__info_detail}>
                  Available 24/7 for emergencies
                </p>
              </div>
            </motion.div>

            <motion.div className={styles.contact__info_item} variants={fadeIn}>
              <div className={styles.contact__info_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.contact__info_content}>
                <h3 className={styles.contact__info_title}>Email</h3>
                <p className={styles.contact__info_text}>
                  <a
                    href="mailto:info@urbanserve.com"
                    className={styles.contact__info_link}
                  >
                    info@urbanserve.com
                  </a>
                </p>
                <p className={styles.contact__info_detail}>
                  We respond within 24 hours
                </p>
              </div>
            </motion.div>

            <motion.div className={styles.contact__info_item} variants={fadeIn}>
              <div className={styles.contact__info_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.contact__info_content}>
                <h3 className={styles.contact__info_title}>Address</h3>
                <p className={styles.contact__info_text}>
                  123 Urban Street, Suite 456
                  <br />
                  Cityville, ST 78901
                </p>
                <p className={styles.contact__info_detail}>
                  Mon-Fri: 8am-6pm, Sat: 9am-4pm
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.contact__form_wrapper}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <form className={styles.contact__form}>
              <div className={styles.contact__form_group}>
                <label htmlFor="name" className={styles.contact__form_label}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.contact__form_input}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className={styles.contact__form_row}>
                <div className={styles.contact__form_group}>
                  <label htmlFor="email" className={styles.contact__form_label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.contact__form_input}
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className={styles.contact__form_group}>
                  <label htmlFor="phone" className={styles.contact__form_label}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.contact__form_input}
                    placeholder="Your Phone"
                  />
                </div>
              </div>

              <div className={styles.contact__form_group}>
                <label htmlFor="service" className={styles.contact__form_label}>
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className={styles.contact__form_select}
                >
                  <option value="">Select a Service</option>
                  <option value="residential">Residential Pest Control</option>
                  <option value="commercial">Commercial Pest Control</option>
                  <option value="termite">Termite Control</option>
                  <option value="rodent">Rodent Control</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.contact__form_group}>
                <label htmlFor="message" className={styles.contact__form_label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.contact__form_textarea}
                  placeholder="Tell us about your pest problem"
                  rows={5}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.contact__form_button}>
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
