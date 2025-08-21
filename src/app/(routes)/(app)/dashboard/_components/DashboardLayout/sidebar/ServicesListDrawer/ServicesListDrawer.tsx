// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/ServicesListDrawer/ServicesListDrawer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Home,
  Droplets,
  Utensils,
  Bug,
  Package,
  Timer,
  ArrowRight,
  ChevronDown,
  Loader2,
} from "lucide-react";
import styles from "./ServicesListDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
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
  if (!options) return [];
  return options.map((option) => ({
    id: option.id,
    title: option.label,
    description: option.description,
    icon: <Package />, // Default icon for service options
    price: option.price,
  }));
};

interface ServicesListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect?: (serviceId: string, optionId?: string) => void;
}

const ServicesListDrawer: React.FC<ServicesListDrawerProps> = ({
  isOpen,
  onClose,
  onServiceSelect,
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleGetServices } = useServiceOperations();

  // Fetch services on component mount or when drawer opens
  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen, handleGetServices]);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleOptionClick = (serviceId: string, optionId?: string) => {
    if (onServiceSelect) {
      onServiceSelect(serviceId, optionId);
    }
    onClose();
  };

  // Filter services based on search
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
        <div className={styles.drawer}>
          <div className={styles.drawer__header}>
            <button className={styles.drawer__backBtn} onClick={onClose}>
              <ArrowLeft size={20} />
            </button>
            <div className={styles.drawer__headerText}>
              <h2 className={styles.drawer__title}>Our Services</h2>
              <p className={styles.drawer__subtitle}>Loading available services...</p>
            </div>
          </div>
          <div className={styles.drawer__content}>
            <div className={styles.drawer__loading}>
              <Loader2 className={styles.drawer__loadingSpinner} size={32} />
              <p>Fetching services...</p>
            </div>
          </div>
        </div>
      </ModalDrawer>
    );
  }

  if (error) {
    return (
      <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
        <div className={styles.drawer}>
          <div className={styles.drawer__header}>
            <button className={styles.drawer__backBtn} onClick={onClose}>
              <ArrowLeft size={20} />
            </button>
            <div className={styles.drawer__headerText}>
              <h2 className={styles.drawer__title}>Our Services</h2>
              <p className={styles.drawer__subtitle}>Something went wrong</p>
            </div>
          </div>
          <div className={styles.drawer__content}>
            <div className={styles.drawer__error}>
              <p className={styles.drawer__errorMessage}>{error}</p>
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
      </ModalDrawer>
    );
  }

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawer__header}>
          <button className={styles.drawer__backBtn} onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.drawer__headerText}>
            <h2 className={styles.drawer__title}>Our Services</h2>
            <p className={styles.drawer__subtitle}>
              Select a service to explore available options
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className={styles.drawer__search}>
          <Search className={styles.drawer__searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.drawer__searchInput}
          />
        </div>

        {/* Content */}
        <div className={styles.drawer__content}>
          <div className={styles.drawer__services}>
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
                  className={styles.drawer__serviceCard}
                >
                  <motion.button
                    className={`${styles.drawer__serviceHeader} ${
                      expandedService === service._id
                        ? styles["drawer__serviceHeader--active"]
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
                      className={styles.drawer__serviceIcon}
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
                    <div className={styles.drawer__serviceInfo}>
                      <h3 className={styles.drawer__serviceName}>
                        {service.name}
                      </h3>
                      <p className={styles.drawer__serviceDesc}>
                        {service.description}
                      </p>
                    </div>
                    <motion.div
                      className={styles.drawer__serviceArrow}
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
                        className={styles.drawer__serviceOptions}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <div className={styles.drawer__optionsList}>
                          {serviceOptions.length > 0 ? (
                            serviceOptions.map((option, optionIndex) => (
                              <motion.div
                                key={option.id}
                                className={styles.drawer__optionItem}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: optionIndex * 0.05,
                                }}
                              >
                                <div className={styles.drawer__optionIcon}>
                                  {option.icon}
                                </div>
                                <div className={styles.drawer__optionContent}>
                                  <h4 className={styles.drawer__optionTitle}>
                                    {option.title}
                                  </h4>
                                  <p className={styles.drawer__optionDesc}>
                                    {option.description}
                                  </p>
                                  <span className={styles.drawer__optionPrice}>
                                    <Timer size={12} />
                                    From ₦{option.price.toLocaleString()}
                                  </span>
                                  <div>
                                    <FnButton
                                      size="xs"
                                      variant="primary"
                                      onClick={() =>
                                        handleOptionClick(service._id, option.id)
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
                              className={styles.drawer__optionItem}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                            >
                              <div className={styles.drawer__optionIcon}>
                                <Package />
                              </div>
                              <div className={styles.drawer__optionContent}>
                                <h4 className={styles.drawer__optionTitle}>
                                  {service.name}
                                </h4>
                                <p className={styles.drawer__optionDesc}>
                                  {service.description}
                                </p>
                                <span className={styles.drawer__optionPrice}>
                                  <Timer size={12} />
                                  From ₦{service.price.toLocaleString()}
                                </span>
                                <div>
                                  <FnButton
                                    size="xs"
                                    variant="primary"
                                    onClick={() =>
                                      handleOptionClick(service._id)
                                    }
                                  >
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
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default ServicesListDrawer;