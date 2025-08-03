"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./LaundryServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import ServiceModal, {
  ServiceConfiguration,
} from "@/components/ui/booking/modals/ServiceModal/ServiceModal";
import LaundryServiceModal, {
  LaundryServiceConfiguration,
} from "@/components/ui/booking/modals/LaundryServiceModal/LaundryServiceModal";
import { GetServicesQuery, Service, ServiceOption } from "@/graphql/api";

interface LaundryServicesShowcaseProps {
  servicesData?: GetServicesQuery["services"];
  loading?: boolean;
  error?: any;
}

const LaundryServicesShowcase: React.FC<LaundryServicesShowcaseProps> = ({
  servicesData,
  loading,
  error,
}) => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  // Configuration for laundry service modal
  const getLaundryServiceConfiguration = (): ServiceConfiguration => ({
    options: [
      { id: "shirt", name: "Shirt", count: 1 },
      { id: "trouser", name: "Trouser", count: 1 },
      { id: "native", name: "Native", count: 1 },
      { id: "towel", name: "Towel", count: 1 },
      { id: "bedsheet", name: "Bedsheet", count: 1 },
      { id: "duvet", name: "Duvet", count: 1 },
      { id: "shoe", name: "Shoe", count: 1 },
      { id: "other", name: "Other", count: 1 },
    ],
    allowCustomization: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Handle opening the modal with selected service
  const handleOpenModal = (serviceOption: ServiceOption) => {
    setSelectedServiceOption(serviceOption);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle order submission
  const handleOrderSubmit = (configuration: any) => {
    console.log("Laundry service configuration:", configuration);
  };

  // Features included in laundry services
  const getLaundryIncludedFeatures = () => [
    "Professional laundry detergents included",
    "Experienced and vetted laundry professionals",
    "Satisfaction guarantee",
    "Flexible pickup and delivery",
    "Eco-friendly washing options",
    "Careful handling of delicate fabrics",
  ];

  return (
    <section className={styles.showcase} ref={sectionRef}>
      <div className={styles.showcase__container}>
        <motion.div
          className={styles.showcase__header}
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }
              : { opacity: 0, y: 20 }
          }
        >
          <h2 className={styles.showcase__title}>
            Choose Your Laundry Service
          </h2>
          <p className={styles.showcase__subtitle}>
            From everyday essentials to specialty fabrics, we have the perfect
            care solution for your garments.
          </p>
        </motion.div>

        <motion.div
          className={styles.showcase__grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {servicesData?.[0]?.options?.map((service) => (
            <motion.div
              key={service.id}
              className={styles.showcase__card}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.showcase__icon}>
                <span className={styles.showcase__emoji}>🧺</span>
              </div>

              <div className={styles.showcase__content}>
                <h3 className={styles.showcase__name}>{service.label}</h3>
                <p className={styles.showcase__description}>
                  {service.description}
                </p>

                <ul className={styles.showcase__features}>
                  {service.inclusions?.map((feature, index) => (
                    <li key={index} className={styles.showcase__feature}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.showcase__priceTag}>
                  <span className={styles.showcase__priceValue}>
                    NGN {service.price?.toLocaleString()}
                  </span>
                  <span className={styles.showcase__priceUnit}>/load</span>
                </div>

                <div className={styles.showcase__action}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenModal(service)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Laundry Service Modal */}
      {selectedServiceOption && servicesData?.[0] && (
        <LaundryServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceOption={selectedServiceOption}
          service={servicesData?.[0]}
          includedFeatures={
            selectedServiceOption.inclusions || getLaundryIncludedFeatures()
          }
          onOrderSubmit={(configuration: LaundryServiceConfiguration) => {
            console.log("Laundry service configuration:", configuration);
          }}
        />
      )}
    </section>
  );
};

export default LaundryServicesShowcase;
