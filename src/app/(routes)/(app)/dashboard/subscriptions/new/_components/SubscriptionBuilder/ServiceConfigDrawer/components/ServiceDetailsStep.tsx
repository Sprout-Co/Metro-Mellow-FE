import React from "react";
import { motion } from "framer-motion";
import { Service, ServiceCategory, SubscriptionServiceInput } from "@/graphql/api";
import { ValidationError } from "../../validation";
import styles from "../ServiceConfigDrawer.module.scss";
import ServiceOptionsConfig from "./ServiceOptionsConfig";
import CleaningServiceConfig from "./CleaningServiceConfig";
import CookingServiceConfig from "./CookingServiceConfig";
import LaundryServiceConfig from "./LaundryServiceConfig";
import PestControlServiceConfig from "./PestControlServiceConfig";

interface ServiceDetailsStepProps {
  service: Service;
  configuration: SubscriptionServiceInput;
  onUpdate: (update: Partial<SubscriptionServiceInput>) => void;
  validationErrors: ValidationError[];
}

const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({
  service,
  configuration,
  onUpdate,
  validationErrors,
}) => {
  const renderServiceSpecificConfig = () => {
    switch (service.category) {
      case ServiceCategory.Cleaning:
        return (
          <CleaningServiceConfig
            configuration={configuration}
            onUpdate={onUpdate}
          />
        );
      case ServiceCategory.Cooking:
        return (
          <CookingServiceConfig
            configuration={configuration}
            onUpdate={onUpdate}
            validationErrors={validationErrors}
          />
        );
      case ServiceCategory.Laundry:
        return (
          <LaundryServiceConfig
            configuration={configuration}
            onUpdate={onUpdate}
          />
        );
      case ServiceCategory.PestControl:
        return (
          <PestControlServiceConfig
            configuration={configuration}
            onUpdate={onUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Service details</h3>
        <p>Customize your service requirements</p>
      </div>

      <ServiceOptionsConfig
        service={service}
        configuration={configuration}
        onUpdate={onUpdate}
        validationErrors={validationErrors}
      />

      {renderServiceSpecificConfig()}
    </motion.div>
  );
};

export default ServiceDetailsStep;