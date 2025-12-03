import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Timer,
  Package,
  Home,
  Droplets,
  Utensils,
  Bug,
  Loader2,
  Clock,
} from "lucide-react";
import styles from "./ServiceAccordion.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { Service, ServiceCategory, ServiceOption } from "@/graphql/api";
import CleaningServiceModal from "../booking/modals/CleaningServiceModal";
import LaundryServiceModal from "../booking/modals/LaundryServiceModal";
import CookingServiceModal from "../booking/modals/CookingServiceModal";
import PestControlServiceModal from "../booking/modals/PestControlServiceModal";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

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

const getServiceColor = (category: ServiceCategory) => {
  switch (category) {
    case ServiceCategory.Cleaning:
      return "#075056";
    case ServiceCategory.Laundry:
      return "#8b5cf6";
    case ServiceCategory.Cooking:
      return "#f59e0b";
    case ServiceCategory.PestControl:
      return "#10b981";
    default:
      return "#6b7280";
  }
};

const getServiceOptions = (options: Service["options"] = []) => {
  if (!options) return [];
  return options.map((option) => ({
    id: option.id,
    title: option.label,
    description: option.description,
    icon: <Package />,
    price: option.price,
  }));
};

// Check if service is available (currently only Cleaning)
const isServiceAvailable = (category: ServiceCategory) => {
  return category === ServiceCategory.Cleaning;
};

interface ServiceAccordionProps {
  searchQuery?: string;
  className?: string;
}

const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  searchQuery,
  className,
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { services, loading, error } = useSelector(
    (state: RootState) => state.services
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
      service.description
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || "")
  );

  const toggleService = (serviceId: string, category: ServiceCategory) => {
    // Only allow expanding available services
    if (!isServiceAvailable(category)) return;
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleBookService = (serviceId: string, serviceOptionId: string) => {
    const service = services.find((service) => service._id === serviceId);
    if (service) {
      setSelectedService(service);
      setSelectedServiceOption(
        service.options?.find((option) => option.id === serviceOptionId) || null
      );
    }
    setIsOpen(true);
  };

  const renderServiceModal = () => {
    if (!selectedService || !selectedServiceOption) return null;
    switch (selectedService?.category) {
      case ServiceCategory.Cleaning:
        return (
          <CleaningServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      case ServiceCategory.Laundry:
        return (
          <LaundryServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      case ServiceCategory.Cooking:
        return (
          <CookingServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      case ServiceCategory.PestControl:
        return (
          <PestControlServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className={styles.ctaSection}>
        <div className={styles.minimalLayout}>
          <div className={styles.servicesWrapper}>
            <div className={styles.header}>
              <h2 className={styles.header__title}>Book a Service</h2>
              <p className={styles.header__subtitle}>
                Loading available services...
              </p>
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
    <div className={`${styles.accordionContainer} ${className || ""}`}>
      {filteredServices.map((service, index) => {
        const serviceIcon = getServiceIcon(service.category);
        const serviceColor = getServiceColor(service.category);
        const serviceOptions = getServiceOptions(service.options);
        const isAvailable = isServiceAvailable(service.category);
        const isExpanded = expandedService === service._id;

        return (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`${styles.accordionItem} ${
              !isAvailable ? styles["accordionItem--disabled"] : ""
            }`}
          >
            <motion.button
              className={`${styles.accordionHeader} ${
                isExpanded ? styles["accordionHeader--active"] : ""
              }`}
              onClick={() => toggleService(service._id, service.category)}
              whileTap={isAvailable ? { scale: 0.995 } : undefined}
              style={{
                borderLeftColor: isExpanded ? serviceColor : "transparent",
              }}
            >
              <div
                className={styles.accordionHeader__icon}
                style={{
                  backgroundColor: isExpanded
                    ? serviceColor
                    : `${serviceColor}15`,
                  color: isExpanded ? "#ffffff" : serviceColor,
                }}
              >
                {serviceIcon}
              </div>

              <div className={styles.accordionHeader__content}>
                <div className={styles.accordionHeader__titleRow}>
                  <h3 className={styles.accordionHeader__title}>
                    {service.name}
                  </h3>
                  {!isAvailable && (
                    <span className={styles.accordionHeader__comingSoon}>
                      <Clock size={12} />
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className={styles.accordionHeader__description}>
                  {service.description}
                </p>
              </div>

              {isAvailable && (
                <motion.div
                  className={styles.accordionHeader__arrow}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown />
                </motion.div>
              )}
            </motion.button>

            <AnimatePresence>
              {isExpanded && isAvailable && (
                <motion.div
                  className={styles.accordionContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
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
                          <div className={styles.subServiceItem__content}>
                            <h4 className={styles.subServiceItem__title}>
                              {option.title}
                            </h4>
                            <p className={styles.subServiceItem__description}>
                              {option.description}
                            </p>
                          </div>
                          <div className={styles.subServiceItem__right}>
                            <span className={styles.subServiceItem__price}>
                              From ₦{option.price.toLocaleString()}
                            </span>
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
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        className={styles.subServiceItem}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className={styles.subServiceItem__content}>
                          <h4 className={styles.subServiceItem__title}>
                            {service.name}
                          </h4>
                          <p className={styles.subServiceItem__description}>
                            {service.description}
                          </p>
                        </div>
                        <div className={styles.subServiceItem__right}>
                          <span className={styles.subServiceItem__price}>
                            From ₦{service.price.toLocaleString()}
                          </span>
                          <FnButton size="xs" variant="primary">
                            Book Now
                          </FnButton>
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

      {renderServiceModal()}
    </div>
  );
};

export default ServiceAccordion;
