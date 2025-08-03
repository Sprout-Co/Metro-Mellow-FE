"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./PestControlServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { ServiceConfiguration } from "@/components/ui/booking/modals/ServiceModal/ServiceModal";
import { GetServicesQuery, ServiceOption } from "@/graphql/api";
import PestControlServiceModal, {
  PestControlServiceConfiguration,
} from "@/components/ui/booking/modals/PestControlServiceModal";

interface PestControlServicesShowcaseProps {
  servicesData?: GetServicesQuery["services"];
  loading?: boolean;
  error?: any;
}

const PestControlServicesShowcase: React.FC<
  PestControlServicesShowcaseProps
> = ({ servicesData, loading, error }) => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  // Configuration for pest control service modal
  const getPestControlServiceConfiguration = (): ServiceConfiguration => ({
    options: [
      { id: "bedrooms", name: "Bedrooms", count: 1 },
      { id: "livingrooms", name: "Living Rooms", count: 1 },
      { id: "kitchen", name: "Kitchen", count: 1 },
      { id: "bathrooms", name: "Bathrooms", count: 1 },
      { id: "outdoor", name: "Outdoor Area", count: 1 },
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
    console.log("Pest control service configuration:", configuration);
  };

  // Features included in pest control services
  const getPestControlIncludedFeatures = () => [
    "EPA-approved pest control products",
    "Experienced and certified pest control technicians",
    "Satisfaction guarantee",
    "Flexible scheduling options",
    "Eco-friendly solutions available",
    "Comprehensive pest assessment included",
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
            Choose Your Pest Control Service
          </h2>
          <p className={styles.showcase__subtitle}>
            From basic treatments to specialized solutions, we have the perfect
            pest management options for your home or business.
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
                <span className={styles.showcase__emoji}>🐜</span>
              </div>

              <div className={styles.showcase__content}>
                <h3 className={styles.showcase__name}>{service.label}</h3>
                <p className={styles.showcase__description}>{service.label}</p>

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
                  <span className={styles.showcase__priceUnit}>/service</span>
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

      {/* Pest Control Service Modal */}
      {selectedServiceOption && servicesData?.[0] && (
        <PestControlServiceModal
          serviceImage={"/images/pest-control/p1.jpeg"}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceOption={selectedServiceOption}
          service={servicesData?.[0]}
          includedFeatures={
            selectedServiceOption.inclusions || getPestControlIncludedFeatures()
          }
          onOrderSubmit={(configuration: PestControlServiceConfiguration) => {
            console.log("Pest control service configuration:", configuration);
          }}
        />
      )}
    </section>
  );
};

export default PestControlServicesShowcase;
