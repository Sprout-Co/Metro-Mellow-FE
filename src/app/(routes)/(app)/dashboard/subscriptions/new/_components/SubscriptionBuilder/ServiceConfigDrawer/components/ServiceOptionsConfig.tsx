import React from "react";
import { motion } from "framer-motion";
import { Service, SubscriptionServiceInput } from "@/graphql/api";
import { hasFieldError, ValidationError } from "../../validation";
import styles from "../ServiceConfigDrawer.module.scss";

interface ServiceOptionsConfigProps {
  service: Service;
  configuration: SubscriptionServiceInput;
  onUpdate: (update: Partial<SubscriptionServiceInput>) => void;
  validationErrors: ValidationError[];
}

const ServiceOptionsConfig: React.FC<ServiceOptionsConfigProps> = ({
  service,
  configuration,
  onUpdate,
  validationErrors,
}) => {
  if (!service.options || service.options.length === 0) {
    return null;
  }

  return (
    <div className={styles.drawer__section}>
      <label
        className={`${styles.drawer__label} ${
          hasFieldError(validationErrors, "serviceOption")
            ? styles["drawer__label--error"]
            : ""
        }`}
      >
        Service Package <span className={styles.drawer__required}>*</span>
      </label>
      <div
        className={`${styles.drawer__optionsGrid} ${
          hasFieldError(validationErrors, "serviceOption")
            ? styles["drawer__optionsGrid--error"]
            : ""
        }`}
      >
        {service.options.map((option) => (
          <motion.button
            key={option.id}
            className={`${styles.drawer__optionCard} ${
              configuration.serviceDetails.serviceOption === option.id
                ? styles["drawer__optionCard--active"]
                : ""
            }`}
            onClick={() =>
              onUpdate({
                serviceDetails: {
                  ...configuration.serviceDetails,
                  serviceOption: option.id,
                },
              })
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h4>{option.label}</h4>
            <p>{option.description}</p>
            <span className={styles.drawer__optionPrice}>
              +₦{option.price.toLocaleString()}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ServiceOptionsConfig;