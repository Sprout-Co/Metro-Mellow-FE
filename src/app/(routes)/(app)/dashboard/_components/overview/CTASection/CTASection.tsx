import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CTASection.module.scss";

// Service card data
const serviceCards = [
  {
    id: "laundry",
    title: "Schedule Laundry Pickup",
    icon: "👕",
    href: "/services/laundry",
  },
  {
    id: "cleaning",
    title: "Book A Cleaning Session",
    icon: "🧹",
    href: "/services/cleaning",
  },
  {
    id: "giftcard",
    title: "Send A Giftcard",
    icon: "🎁",
    href: "/giftcards",
  },
];

const CTASection: React.FC = () => {
  return (
    <div className={styles.ctaSection}>
      {/* Service Selection Section */}
      <div className={styles.serviceSection}>
        <h2 className={styles.sectionTitle}>What do you need? Tap it.</h2>

        <div className={styles.serviceCards}>
          {serviceCards.map((service) => (
            <motion.div
              key={service.id}
              className={styles.serviceCard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <div className={styles.arrowIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className={styles.cardIllustration}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.serviceIcon}>{service.icon}</span>
                  </div>
                  <div className={styles.starPattern}>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={styles.star}
                        style={{
                          left: `${20 + i * 20}%`,
                          top: `${30 + i * 15}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscription Section */}
      <div className={styles.subscriptionSection}>
        <div className={styles.subscriptionContent}>
          <div className={styles.subscriptionText}>
            <h2 className={styles.subscriptionTitle}>
              Get our mobile application for recurring services.
            </h2>
            <p className={styles.subscriptionDescription}>
              Automate your household tasks with our premium services. Select
              from weekly plans (1-3 weeks) or extended monthly options (1-6
              months).
            </p>
            <Button
              variant="primary"
              size="md"
              className={styles.subscriptionButton}
              href="/subscription"
            >
              Begin subscription plan
            </Button>
          </div>

          <div className={styles.subscriptionImages}>
            <div className={styles.imageStack}>
              <div className={`${styles.appImage} ${styles.imageBack}`}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.imageIcon}>📱</span>
                </div>
              </div>
              <div className={`${styles.appImage} ${styles.imageFront}`}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.imageIcon}>🏠</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
