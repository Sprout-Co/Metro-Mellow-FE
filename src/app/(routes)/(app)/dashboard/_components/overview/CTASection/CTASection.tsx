import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import styles from "./CTASection.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { Service, ServiceCategory, ServiceStatus } from "@/graphql/api";

// Helper function to get icon for service category
const getServiceIcon = (category: ServiceCategory) => {
  switch (category) {
    case ServiceCategory.Cleaning:
      return <Home />;
    case ServiceCategory.Laundry:
      return <Droplets />;
    case ServiceCategory.Cooking:
      return <Utensils />;
    case ServiceCategory.PestControl:
      return <Bug />;
    default:
      return <Package />;
  }
};

// Helper function to get color for service category
const getServiceColor = (category: ServiceCategory) => {
  switch (category) {
    case ServiceCategory.Cleaning:
      return "#075056";
    case ServiceCategory.Laundry:
      return "#6366f1";
    case ServiceCategory.Cooking:
      return "#fe5b04";
    case ServiceCategory.PestControl:
      return "#10b981";
    default:
      return "#6b7280";
  }
};

// Helper function to get service options with icons
const getServiceOptions = (options: Service["options"] = []) => {
  return options.map((option) => ({
    id: option.id,
    title: option.label,
    description: option.description,
    icon: <Package />, // Default icon for service options
    price: option.price,
  }));
};

const CTASection: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleGetServices } = useServiceOperations();

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch only active services
        const fetchedServices = await handleGetServices(undefined, ServiceStatus.Active);
        setServices(fetchedServices || []);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [handleGetServices]);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  if (loading) {
    return (
      <div className={styles.ctaSection}>
        <div className={styles.minimalLayout}>
          <div className={styles.servicesWrapper}>
            <div className={styles.header}>
              <h2 className={styles.header__title}>Book a Service</h2>
              <p className={styles.header__subtitle}>Loading available services...</p>
            </div>
            <div className={styles.loadingContainer}>
              <Loader2 className={styles.loadingSpinner} size={32} />
              <p>Fetching services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.ctaSection}>
        <div className={styles.minimalLayout}>
          <div className={styles.servicesWrapper}>
            <div className={styles.header}>
              <h2 className={styles.header__title}>Book a Service</h2>
              <p className={styles.header__subtitle}>Something went wrong</p>
            </div>
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <FnButton 
                onClick={() => window.location.reload()} 
                variant="primary" 
                size="sm"
              >
                Try Again
              </FnButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {services.map((service, index) => {
              const serviceIcon = getServiceIcon(service.category);
              const serviceColor = getServiceColor(service.category);
              const serviceOptions = getServiceOptions(service.options);
              
              return (
              <motion.div
                key={service._id}
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
                    expandedService === service._id
                      ? styles["accordionHeader--active"]
                      : ""
                  }`}
                  onClick={() => toggleService(service._id)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    borderLeftColor:
                      expandedService === service._id
                        ? serviceColor
                        : "transparent",
                  }}
                >
                  <div
                    className={styles.accordionHeader__icon}
                    style={{
                      backgroundColor:
                        expandedService === service._id
                          ? serviceColor
                          : undefined,
                      color:
                        expandedService === service._id
                          ? "#ffffff"
                          : serviceColor,
                    }}
                  >
                    {serviceIcon}
                  </div>
                  <div className={styles.accordionHeader__content}>
                    <h3 className={styles.accordionHeader__title}>
                      {service.name}
                    </h3>
                    <p className={styles.accordionHeader__description}>
                      {service.description}
                    </p>
                  </div>
                  <motion.div
                    className={styles.accordionHeader__arrow}
                    animate={{
                      rotate: expandedService === service._id ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedService === service._id && (
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
                        {serviceOptions.length > 0 ? (
                          serviceOptions.map((option, optionIndex) => (
                            <motion.div
                              key={option.id}
                              className={styles.subServiceItem}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: optionIndex * 0.05,
                              }}
                            >
                              <div className={styles.subServiceItem__icon}>
                                {option.icon}
                              </div>
                              <div className={styles.subServiceItem__content}>
                                <h4 className={styles.subServiceItem__title}>
                                  {option.title}
                                </h4>
                                <p className={styles.subServiceItem__description}>
                                  {option.description}
                                </p>
                                <span className={styles.subServiceItem__duration}>
                                  <Timer size={12} />
                                  From ₦{option.price.toLocaleString()}
                                </span>
                                <div>
                                  <Link href={`/dashboard/subscriptions/add?service=${service._id}`}>
                                    <FnButton
                                      size="xs"
                                      variant="primary"
                                      onClick={() => {
                                        console.log(
                                          "Booking service option:",
                                          option.id
                                        );
                                      }}
                                    >
                                      Book Now
                                    </FnButton>
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <motion.div
                            className={styles.subServiceItem}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <div className={styles.subServiceItem__icon}>
                              <Package />
                            </div>
                            <div className={styles.subServiceItem__content}>
                              <h4 className={styles.subServiceItem__title}>
                                {service.name}
                              </h4>
                              <p className={styles.subServiceItem__description}>
                                {service.description}
                              </p>
                              <span className={styles.subServiceItem__duration}>
                                <Timer size={12} />
                                From ₦{service.price.toLocaleString()}
                              </span>
                              <div>
                                <Link href={`/dashboard/subscriptions/add?service=${service._id}`}>
                                  <FnButton
                                    size="xs"
                                    variant="primary"
                                    onClick={() => {
                                      console.log(
                                        "Booking service:",
                                        service._id
                                      );
                                    }}
                                  >
                                    Book Now
                                  </FnButton>
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
            })}
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
