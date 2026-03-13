"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ServiceStep.module.scss";
import { Service } from "@/graphql/api";

interface ServiceStepProps {
  services: Service[];
  loading?: boolean;
  error?: string;
  selectedServiceId: string | null;
  onSelectService: (id: string) => void;
}

const ServiceStep: React.FC<ServiceStepProps> = ({
  services,
  loading,
  error,
  selectedServiceId,
  onSelectService,
}) => {
  if (loading) {
    return (
      <div className={styles.empty}>
        Loading available services for subscriptions...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        We couldn&apos;t load services right now. Please try again in a moment.
      </div>
    );
  }

  return (
    <div className={styles.step}>
      {services.length === 0 ? (
        <div className={styles.empty}>
          There are no active services available for subscription yet.
        </div>
      ) : (
        <div className={styles.step__grid}>
          {services.map((service) => {
            const selected = service._id === selectedServiceId;
            return (
              <motion.button
                key={service._id}
                type="button"
                className={`${styles.card} ${
                  selected ? styles["card--selected"] : ""
                }`}
                onClick={() => onSelectService(service._id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.card__title}>{service.name}</div>
                <div className={styles.card__meta}>
                  {service.category?.toString().replace(/_/g, " ")}
                </div>
                {service.displayPrice && (
                  <div className={styles.card__price}>
                    {service.displayPrice}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServiceStep;
