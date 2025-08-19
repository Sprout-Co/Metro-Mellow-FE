// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/ServiceSelector/ServiceSelector.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Check,
  Edit2,
  Trash2,
  Clock,
  Calendar,
  Home,
  Droplets,
  Utensils,
  Bug,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import styles from "./ServiceSelector.module.scss";
import { Service } from "@/graphql/api";

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
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  configuredServices,
  onServiceSelect,
  onServiceEdit,
  onServiceRemove,
}) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getServiceIcon = (category: string) => {
    switch (category) {
      case "CLEANING":
        return <Home size={24} />;
      case "LAUNDRY":
        return <Droplets size={24} />;
      case "COOKING":
        return <Utensils size={24} />;
      case "PEST_CONTROL":
        return <Bug size={24} />;
      default:
        return <Home size={24} />;
    }
  };

  const isServiceConfigured = (serviceId: string) => {
    return configuredServices.some((cs) => cs.service._id === serviceId);
  };

  const getConfiguredService = (serviceId: string) => {
    return configuredServices.find((cs) => cs.service._id === serviceId);
  };

  return (
    <div className={styles.selector}>
      {/* Available Services */}
      <div className={styles.selector__grid}>
        {services.map((service) => {
          const configured = isServiceConfigured(service._id);
          const configuredData = getConfiguredService(service._id);

          return (
            <motion.div
              key={service._id}
              className={`${styles.selector__card} ${
                configured ? styles["selector__card--configured"] : ""
              }`}
              onMouseEnter={() => setHoveredService(service._id)}
              onMouseLeave={() => setHoveredService(null)}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {configured && (
                <div className={styles.selector__configuredBadge}>
                  <Check size={12} />
                  Configured
                </div>
              )}

              <div className={styles.selector__cardContent}>
                <div className={styles.selector__icon}>
                  {getServiceIcon(service.category)}
                </div>
                <h3 className={styles.selector__serviceName}>{service.name}</h3>
                <p className={styles.selector__serviceDesc}>
                  {service.description}
                </p>
                <div className={styles.selector__servicePrice}>
                  From ₦{service.price.toLocaleString()}/month
                </div>

                {configured && configuredData && (
                  <div className={styles.selector__configSummary}>
                    <div className={styles.selector__configItem}>
                      <Clock size={14} />
                      <span>
                        {configuredData.configuration.scheduledDays?.length ||
                          0}{" "}
                        days/week
                      </span>
                    </div>
                    <div className={styles.selector__configPrice}>
                      ₦
                      {(
                        configuredData.configuration.price || 0
                      ).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.selector__cardActions}>
                {!configured ? (
                  <motion.button
                    className={styles.selector__addButton}
                    onClick={() => onServiceSelect(service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={16} />
                    Configure Service
                  </motion.button>
                ) : (
                  <div className={styles.selector__configuredActions}>
                    <button
                      className={styles.selector__editButton}
                      onClick={() => onServiceEdit(service._id)}
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      className={styles.selector__removeButton}
                      onClick={() => onServiceRemove(service._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {hoveredService === service._id && !configured && (
                  <motion.div
                    className={styles.selector__hoverOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Sparkles size={20} />
                    <span>Click to customize</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {configuredServices.length === 0 && (
        <motion.div
          className={styles.selector__emptyTip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.selector__tipIcon}>
            <ChevronRight size={20} />
          </div>
          <p>Select and configure services to build your subscription</p>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceSelector;
