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

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleBookService = (serviceId: string, serviceOptionId: string) => {
    // if (onBookService) {
    //   onBookService(serviceId, serviceOptionId);
    // }
    console.log("Booking service:", serviceId);
    console.log("Booking service:", services);
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
                            <FnButton size="xs" variant="primary">
                              Book Now
                            </FnButton>
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

      {renderServiceModal()}
    </div>
  );
};

export default ServiceAccordion;
