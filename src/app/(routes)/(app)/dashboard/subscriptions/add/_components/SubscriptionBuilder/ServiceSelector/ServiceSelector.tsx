"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Check,
  Edit2,
  X,
  Clock,
  Calendar,
  Home,
  Droplets,
  Utensils,
  Bug,
  Sparkles,
} from "lucide-react";
import styles from "./ServiceSelector.module.scss";
import { Service, ServiceCategory } from "@/graphql/api";

interface ConfiguredService {
  service: Service;
  configuration: any;
}

interface ServiceSelectorProps {
  services: Service[];
  configuredServices: ConfiguredService[];
  onServiceSelect: (service: Service) => void;
  onServiceEdit: (serviceId: string) => void;
  onServiceRemove: (serviceId: string) => void;
  currentBillingCycle: string;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  configuredServices,
  onServiceSelect,
  onServiceEdit,
  onServiceRemove,
  currentBillingCycle,
}) => {
  // Determine if a service should be disabled based on current billing cycle
  const isServiceDisabled = (
    service: Service
  ): { disabled: boolean; reason?: string } => {
    // If quarterly billing is selected, only allow pest control services
    if (
      currentBillingCycle === "QUARTERLY" &&
      service.category !== ServiceCategory.PestControl
    ) {
      return {
        disabled: true,
        reason:
          "Quarterly billing is only available for pest control services. Switch to monthly billing to add other services.",
      };
    }

    return { disabled: false };
  };
  const getServiceIcon = (category: string) => {
    const iconProps = { size: 24, strokeWidth: 1.5 };
    switch (category) {
      case "CLEANING":
        return <Home {...iconProps} />;
      case "LAUNDRY":
        return <Droplets {...iconProps} />;
      case "COOKING":
        return <Utensils {...iconProps} />;
      case "PEST_CONTROL":
        return <Bug {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };

  const getServiceColor = (category: string) => {
    switch (category) {
      case "CLEANING":
        return "cleaning";
      case "LAUNDRY":
        return "laundry";
      case "COOKING":
        return "cooking";
      case "PEST_CONTROL":
        return "pest";
      default:
        return "default";
    }
  };

  const isServiceConfigured = (serviceId: string) => {
    return configuredServices.some((cs) => cs.service._id === serviceId);
  };

  const getConfiguredService = (serviceId: string) => {
    return configuredServices.find((cs) => cs.service._id === serviceId);
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "WEEKLY":
        return "Weekly";
      case "BI_WEEKLY":
        return "Bi-Weekly";
      case "MONTHLY":
        return "Monthly";
      case "QUARTERLY":
        return "Quarterly";
      default:
        return frequency;
    }
  };

  return (
    <div className={styles.selector}>
      <div className={styles.selector__grid}>
        {services.map((service, index) => {
          const configured = isServiceConfigured(service._id);
          const configuredData = getConfiguredService(service._id);
          const colorClass = getServiceColor(service.category);
          const { disabled, reason } = isServiceDisabled(service);

          return (
            <motion.div
              key={service._id}
              className={`${styles.selector__card} ${configured ? styles["selector__card--configured"] : ""} ${
                disabled ? styles["selector__card--disabled"] : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              title={disabled ? reason : undefined}
            >
              {/* Configured Badge */}
              <AnimatePresence>
                {configured && (
                  <motion.div
                    className={styles.selector__badge}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Check size={14} />
                    <span>Added</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Card Header */}
              <div className={styles.selector__header}>
                <div
                  className={`${styles.selector__icon} ${
                    styles[`selector__icon--${colorClass}`]
                  }`}
                >
                  {getServiceIcon(service.category)}
                </div>
                <div className={styles.selector__info}>
                  <h3 className={styles.selector__name}>{service.name}</h3>
                  <p className={styles.selector__category}>
                    {service.category.replace(/_/g, " ")}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className={styles.selector__body}>
                <p className={styles.selector__description}>
                  {service.description}
                </p>

                {/* Price Display */}
                <div className={styles.selector__pricing}>
                  <span className={styles.selector__priceLabel}>
                    Starting from
                  </span>
                  <span className={styles.selector__price}>
                    ₦{service.price.toLocaleString()}
                    <span className={styles.selector__priceUnit}>/service</span>
                  </span>
                </div>

                {/* Configuration Summary */}
                {configured && configuredData && (
                  <motion.div
                    className={styles.selector__config}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.selector__configItem}>
                      <Calendar size={14} />
                      <span>
                        {getFrequencyLabel(
                          configuredData.configuration.frequency
                        )}
                      </span>
                    </div>
                    <div className={styles.selector__configItem}>
                      <Clock size={14} />
                      <span>
                        {configuredData.configuration.scheduledDays?.length ||
                          0}{" "}
                        days/week
                      </span>
                    </div>
                    <div className={styles.selector__configDivider} />
                    <div className={styles.selector__configPrice}>
                      <span>Monthly</span>
                      <strong>
                        ₦
                        {(
                          configuredData.configuration.price || 0
                        ).toLocaleString()}
                      </strong>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Card Footer */}
              <div className={styles.selector__footer}>
                {!configured ? (
                  disabled ? (
                    <div className={styles.selector__disabledBtn}>
                      <span>Cannot Add</span>
                      {reason && <small>{reason}</small>}
                    </div>
                  ) : (
                    <motion.button
                      className={styles.selector__addBtn}
                      onClick={() => onServiceSelect(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={18} />
                      <span>Add Service</span>
                    </motion.button>
                  )
                ) : (
                  <div className={styles.selector__actions}>
                    <motion.button
                      className={styles.selector__editBtn}
                      onClick={() => onServiceEdit(service._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button
                      className={styles.selector__removeBtn}
                      onClick={() => onServiceRemove(service._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {configuredServices.length === 0 && (
        <motion.div
          className={styles.selector__empty}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles size={24} />
          <p>Select services above to build your perfect subscription plan</p>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceSelector;
