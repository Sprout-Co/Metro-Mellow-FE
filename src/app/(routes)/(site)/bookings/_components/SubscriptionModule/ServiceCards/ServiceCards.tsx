// ServiceCards.tsx
import React from "react";
import { motion } from "framer-motion";
import { Service } from "@/graphql/api";
import styles from "./ServiceCards.module.scss";

interface ServiceCardsProps {
  services: Service[];
  selectedServices: Set<string>;
  toggleService: (serviceId: string) => void;
}

const ServiceCards: React.FC<ServiceCardsProps> = ({
  services,
  selectedServices,
  toggleService,
}) => {
  // Format Naira
  const formatNaira = (value: number) => {
    return `₦${value.toLocaleString()}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className={styles.service_cards}>
      <h2 className={styles.service_cards__title}>Select Services</h2>

      <motion.div
        className={styles.service_cards__container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div
            key={service._id}
            className={`${styles.service_cards__card} ${selectedServices.has(service._id) ? styles.service_cards__card_selected : ""}`}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => toggleService(service._id)}
          >
            <div className={styles.service_cards__icon_container}>
              <span className={styles.service_cards__icon}>{service.icon}</span>
            </div>
            <div className={styles.service_cards__info}>
              <h3 className={styles.service_cards__name}>{service.name}</h3>
              <p className={styles.service_cards__price}>
                {formatNaira(service.price)} min
              </p>
            </div>
            <div className={styles.service_cards__checkbox}>
              <motion.div
                className={styles.service_cards__check}
                initial={false}
                animate={{
                  scale: selectedServices.has(service._id) ? 1 : 0,
                  opacity: selectedServices.has(service._id) ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServiceCards;
