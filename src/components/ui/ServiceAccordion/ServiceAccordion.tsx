import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  Timer,
  Package,
  Home,
  Droplets,
  Utensils,
  Bug,
} from "lucide-react";
import styles from "./ServiceAccordion.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { Service, ServiceCategory, ServiceOption } from "@/graphql/api";

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
  if (!options) return [];
  return options.map((option) => ({
    id: option.id,
    title: option.label,
    description: option.description,
    icon: <Package />, // Default icon for service options
    price: option.price,
  }));
};

interface ServiceAccordionProps {
  services: Service[];
  onBookService?: (serviceId: string, serviceOptionId: string) => void;
  onBookServiceWithoutOption?: (serviceId: string) => void;
  className?: string;
}

const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  services,
  onBookService,
  onBookServiceWithoutOption,
  className,
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleBookService = (serviceId: string, serviceOptionId: string) => {
    if (onBookService) {
      onBookService(serviceId, serviceOptionId);
    }
  };

  const handleBookServiceWithoutOption = (serviceId: string) => {
    if (onBookServiceWithoutOption) {
      onBookServiceWithoutOption(serviceId);
    }
  };

  return (
    <div className={`${styles.accordionContainer} ${className || ""}`}>
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
                    expandedService === service._id ? serviceColor : undefined,
                  color:
                    expandedService === service._id ? "#ffffff" : serviceColor,
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
                              <FnButton
                                size="xs"
                                variant="primary"
                                onClick={() =>
                                  handleBookService(service._id, option.id)
                                }
                              >
                                Book Now
                              </FnButton>
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
                            <Link
                              href={`/dashboard/subscriptions/add?service=${service._id}`}
                            >
                              <FnButton
                                size="xs"
                                variant="primary"
                                onClick={() => {
                                  handleBookServiceWithoutOption(service._id);
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
  );
};

export default ServiceAccordion;
