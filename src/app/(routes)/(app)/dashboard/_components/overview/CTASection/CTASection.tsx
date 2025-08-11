import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Sparkles,
  Shirt,
  Timer,
  Package,
  Soup,
  Coffee,
  Calendar,
  Shield,
  Zap,
  MousePointer2,
  Leaf,
} from "lucide-react";
import styles from "./CTASection.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface SubService {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration?: string;
}

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  subServices: SubService[];
}

const serviceOptions: ServiceOption[] = [
  {
    id: "cleaning",
    title: "Professional Cleaning",
    description: "Comprehensive home & office cleaning services",
    icon: <Home />,
    href: "/dashboard/book-service?type=cleaning",
    color: "#075056",
    subServices: [
      {
        id: "deep-clean",
        title: "Deep Cleaning",
        description: "Thorough cleaning of all areas",
        icon: <Sparkles />,
        duration: "4-6 hours",
      },
      {
        id: "regular-clean",
        title: "Regular Maintenance",
        description: "Weekly or bi-weekly cleaning",
        icon: <Timer />,
        duration: "2-3 hours",
      },
      {
        id: "move-in-out",
        title: "Move-in/Move-out",
        description: "Complete property cleaning",
        icon: <Package />,
        duration: "5-7 hours",
      },
    ],
  },
  {
    id: "laundry",
    title: "Laundry Services",
    description: "Pickup, wash, fold & delivery",
    icon: <Droplets />,
    href: "/dashboard/book-service?type=laundry",
    color: "#6366f1",
    subServices: [
      {
        id: "wash-fold",
        title: "Wash & Fold",
        description: "Standard laundry service",
        icon: <Shirt />,
        duration: "24-48 hours",
      },
      {
        id: "dry-clean",
        title: "Dry Cleaning",
        description: "Delicate & formal wear",
        icon: <Sparkles />,
        duration: "2-3 days",
      },
      {
        id: "iron-press",
        title: "Ironing Service",
        description: "Professional pressing",
        icon: <Timer />,
        duration: "Same day",
      },
    ],
  },
  {
    id: "food",
    title: "Cooking & Meals",
    description: "Professional meal preparation services",
    icon: <Utensils />,
    href: "/dashboard/book-service?type=food",
    color: "#fe5b04",
    subServices: [
      {
        id: "meal-prep",
        title: "Weekly Meal Prep",
        description: "Prepared meals for the week",
        icon: <Calendar />,
        duration: "Every Sunday",
      },
      {
        id: "daily-cook",
        title: "Daily Cooking",
        description: "Fresh meals daily",
        icon: <Soup />,
        duration: "2-3 hours daily",
      },
      {
        id: "event-catering",
        title: "Event Catering",
        description: "Party & event meals",
        icon: <Coffee />,
        duration: "As scheduled",
      },
    ],
  },
  {
    id: "pest",
    title: "Pest Control",
    description: "Safe & effective pest management",
    icon: <Bug />,
    href: "/dashboard/book-service?type=pest",
    color: "#10b981",
    subServices: [
      {
        id: "inspection",
        title: "Pest Inspection",
        description: "Thorough property assessment",
        icon: <Shield />,
        duration: "1-2 hours",
      },
      {
        id: "treatment",
        title: "Treatment Service",
        description: "Safe pest elimination",
        icon: <Zap />,
        duration: "2-4 hours",
      },
      {
        id: "prevention",
        title: "Prevention Plan",
        description: "Monthly prevention service",
        icon: <Leaf />,
        duration: "Monthly visits",
      },
    ],
  },
];

const CTASection: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className={styles.ctaSection}>
      <div className={styles.minimalLayout}>
        {/* Services Column */}
        <div className={styles.servicesWrapper}>
          <div className={styles.header}>
            <h2 className={styles.header__title}>Book a Service</h2>
            <p className={styles.header__subtitle}>
              Select a service to explore available options
            </p>
          </div>

          <div className={styles.accordionContainer}>
            {serviceOptions.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className={styles.accordionItem}
              >
                <motion.button
                  className={`${styles.accordionHeader} ${
                    expandedService === service.id
                      ? styles["accordionHeader--active"]
                      : ""
                  }`}
                  onClick={() => toggleService(service.id)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    borderLeftColor:
                      expandedService === service.id
                        ? service.color
                        : "transparent",
                  }}
                >
                  <div
                    className={styles.accordionHeader__icon}
                    style={{
                      backgroundColor:
                        expandedService === service.id
                          ? service.color
                          : undefined,
                      color:
                        expandedService === service.id
                          ? "#ffffff"
                          : service.color,
                    }}
                  >
                    {service.icon}
                  </div>
                  <div className={styles.accordionHeader__content}>
                    <h3 className={styles.accordionHeader__title}>
                      {service.title}
                    </h3>
                    <p className={styles.accordionHeader__description}>
                      {service.description}
                    </p>
                  </div>
                  <motion.div
                    className={styles.accordionHeader__arrow}
                    animate={{
                      rotate: expandedService === service.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      className={styles.accordionContent}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <div className={styles.subServicesList}>
                        {service.subServices.map((subService, subIndex) => (
                          <motion.div
                            key={subService.id}
                            className={styles.subServiceItem}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: subIndex * 0.05,
                            }}
                          >
                            <div className={styles.subServiceItem__icon}>
                              {subService.icon}
                            </div>
                            <div className={styles.subServiceItem__content}>
                              <h4 className={styles.subServiceItem__title}>
                                {subService.title}
                              </h4>
                              <p className={styles.subServiceItem__description}>
                                {subService.description}
                              </p>
                              {subService.duration && (
                                <span
                                  className={styles.subServiceItem__duration}
                                >
                                  <Timer size={12} />
                                  {subService.duration}
                                </span>
                              )}
                              <div>
                                <FnButton size="xs" variant="primary">
                                  Book Now
                                </FnButton>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {/* 
                        <Link href={service.href}>
                          <motion.button
                            className={styles.bookServiceButton}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              backgroundColor: service.color,
                            }}
                          >
                            Book {service.title.split(" ")[0]} Service
                            <ArrowRight size={16} />
                          </motion.button>
                        </Link> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
                Monthly plans from ₦25,000 and enjoy 30% savings on all services
              </p>
              <div className={styles.subscriptionContent__benefits}>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>Priority booking</span>
                </div>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>30% discount</span>
                </div>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>Free consultations</span>
                </div>
              </div>
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

export default CTASection;
