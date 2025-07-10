"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle, Users, Gift, Bell, AlertCircle } from "lucide-react";
import { useWaitlist } from "@/hooks/useWaitlist";
import styles from "./WaitlistSection.module.scss";

const WaitlistSection: FC = () => {
  const [email, setEmail] = useState("");
  const {
    isLoading,
    isSubmitted,
    error,
    successMessage,
    stats,
    addToWaitlist,
    getStats
  } = useWaitlist();

  // Load waitlist stats on component mount
  useEffect(() => {
    getStats();
  }, [getStats]);

  const benefits = [
    {
      icon: Users,
      title: "First Access",
      description: "Be among the first to experience Metromellow services",
    },
    {
      icon: Gift,
      title: "Exclusive Offers",
      description: "Special launch discounts and promotional packages",
    },
    {
      icon: Bell,
      title: "Priority Updates",
      description: "Get notified about launch dates and new features",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    await addToWaitlist(email.trim(), {
      source: 'welcome_page',
      interests: ['cleaning', 'cooking', 'laundry', 'pest-control'] // All services for now
    });

    if (isSubmitted) {
      setEmail("");
      // Refresh stats after successful signup
      getStats();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isSubmitted) {
    return (
      <section className={styles.waitlistSection} id="waitlist">
        <div className={styles.waitlistSection__container}>
          <motion.div
            className={styles.waitlistSection__success}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className={styles.waitlistSection__successIcon}>
              <CheckCircle />
            </div>
            <h2 className={styles.waitlistSection__successTitle}>
              Welcome to the Metromellow Family!
            </h2>
            <p className={styles.waitlistSection__successText}>
              {successMessage || "You're now on our exclusive waitlist. We'll keep you updated on our launch progress and send you early access when we're ready to serve you."}
            </p>
            <div className={styles.waitlistSection__successStats}>
              <div className={styles.waitlistSection__stat}>
                <span className={styles.waitlistSection__statNumber}>
                  {'200+'}
                </span>
                <span className={styles.waitlistSection__statLabel}>
                  People on waitlist
                </span>
              </div>
              <div className={styles.waitlistSection__stat}>
                <span className={styles.waitlistSection__statNumber}>
                  Q3 2025
                </span>
                <span className={styles.waitlistSection__statLabel}>
                  Expected launch
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.waitlistSection} id="waitlist">
      <div className={styles.waitlistSection__container}>
        <motion.div
          className={styles.waitlistSection__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className={styles.waitlistSection__header}
            variants={itemVariants}
          >
            <h2 className={styles.waitlistSection__title}>
              <span className={styles["waitlistSection__title--accent"]}>
                Join
              </span>
              <span className={styles["waitlistSection__title--main"]}>
                The Waitlist
              </span>
            </h2>
            <p className={styles.waitlistSection__subtitle}>
              Be part of the revolution in home services. Get exclusive early
              access, special launch offers, and priority booking when we
              launch.
            </p>
          </motion.div>

          <motion.div
            className={styles.waitlistSection__benefits}
            variants={itemVariants}
          >
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.waitlistSection__benefit}>
                <div className={styles.waitlistSection__benefitIcon}>
                  <benefit.icon />
                </div>
                <div className={styles.waitlistSection__benefitContent}>
                  <h3 className={styles.waitlistSection__benefitTitle}>
                    {benefit.title}
                  </h3>
                  <p className={styles.waitlistSection__benefitDescription}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            className={styles.waitlistSection__form}
            onSubmit={handleSubmit}
            variants={formVariants}
          >
            <div className={styles.waitlistSection__inputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={styles.waitlistSection__input}
                required
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading || !email.trim()}
                // className={styles.waitlistSection__submitButton}
              >
                {isLoading ? (
                  <span>Joining...</span>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight
                      className={styles.waitlistSection__buttonIcon}
                    />
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className={styles.waitlistSection__error}>
                <AlertCircle className={styles.waitlistSection__errorIcon} />
                <span>{error}</span>
              </div>
            )}

            <p className={styles.waitlistSection__formText}>
              <span className={styles.waitlistSection__formNumber}>
                {'200+'}
              </span>{" "}
              people already joined • No spam, unsubscribe anytime
            </p>
          </motion.form>

          <motion.div
            className={styles.waitlistSection__stats}
            variants={itemVariants}
          >
            <div className={styles.waitlistSection__stat}>
              <span className={styles.waitlistSection__statNumber}>4</span>
              <span className={styles.waitlistSection__statLabel}>
                Premium Services
              </span>
            </div>
            <div className={styles.waitlistSection__stat}>
              <span className={styles.waitlistSection__statNumber}>2</span>
              <span className={styles.waitlistSection__statLabel}>
                Launch Cities
              </span>
            </div>
            <div className={styles.waitlistSection__stat}>
              <span className={styles.waitlistSection__statNumber}>24/7</span>
              <span className={styles.waitlistSection__statLabel}>
                Customer Support
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
