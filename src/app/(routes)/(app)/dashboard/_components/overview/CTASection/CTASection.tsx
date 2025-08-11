import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Home,
  Droplets,
  Utensils,
  Bug,
  Plus,
  ChevronRight,
} from "lucide-react";
import styles from "./CTASection.module.scss";

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "cleaning",
    title: "Book Cleaning",
    description: "Professional home cleaning",
    icon: <Home />,
    href: "/dashboard/book-service?type=cleaning",
  },
  {
    id: "laundry",
    title: "Schedule Laundry",
    description: "Pickup and delivery",
    icon: <Droplets />,
    href: "/dashboard/book-service?type=laundry",
  },
  {
    id: "food",
    title: "Order Cooking",
    description: "Meal preparation service",
    icon: <Utensils />,
    href: "/dashboard/book-service?type=food",
  },
  {
    id: "pest",
    title: "Pest Control",
    description: "Safe pest management",
    icon: <Bug />,
    href: "/dashboard/book-service?type=pest",
  },
];

// Alternative Ultra-Clean Layout
const CTASectionAlternative: React.FC = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.minimalLayout}>
        {/* Services Column */}
        <div className={styles.servicesWrapper}>
          <div className={styles.header}>
            <h2 className={styles.header__title}>Book a Service</h2>
            <p className={styles.header__subtitle}>
              Choose from our available services
            </p>
          </div>

          {serviceOptions.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
              }}
            >
              <Link href={service.href}>
                <motion.div
                  className={styles.inlineService}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.inlineService__icon}>
                    {service.icon}
                  </div>
                  <div className={styles.inlineService__content}>
                    <h3 className={styles.inlineService__title}>
                      {service.title}
                    </h3>
                    <p className={styles.inlineService__description}>
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className={styles.inlineService__action} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Subscription Sidebar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.subscriptionBanner}>
            <div className={styles.subscriptionContent}>
              <h3 className={styles.subscriptionContent__title}>
                Save with Subscription
              </h3>
              <p className={styles.subscriptionContent__description}>
                Monthly plans from ₦25,000 and enjoy 30% savings in total
                subscription discounts
              </p>
            </div>
            <div className={styles.subscriptionAction}>
              <Link href="/dashboard/subscriptions">
                <motion.button
                  className={styles.subscriptionAction__button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASectionAlternative;
