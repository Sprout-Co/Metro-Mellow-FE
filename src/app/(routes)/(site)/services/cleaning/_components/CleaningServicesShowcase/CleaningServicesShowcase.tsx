"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./CleaningServicesShowcase.module.scss";
import CleaningServiceModal from "@/components/ui/booking/modals/CleaningServiceModal/CleaningServiceModal";
import {
  GetServicesQuery,
  ServiceCategory,
  ServiceOption,
} from "@/graphql/api";
import ServiceShowcaseCard from "../../../_components/common/ServiceShowcaseCard/ServiceShowcaseCard";

interface CleaningServicesShowcaseProps {
  servicesData?: GetServicesQuery["services"];
  loading?: boolean;
  error?: any;
}

const CleaningServicesShowcase: React.FC<CleaningServicesShowcaseProps> = ({
  servicesData,
  loading,
}) => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

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

  const handleOpenModal = (serviceOption: ServiceOption) => {
    setSelectedServiceOption(serviceOption);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Don't render if loading - parent component handles this
  if (loading) {
    return null;
  }

  // Don't render if no services data - graceful degradation
  if (!servicesData || !servicesData[0] || !servicesData[0].options || servicesData[0].options.length === 0) {
    return null;
  }

  return (
    <section
      id="services-showcase"
      className={styles.showcase}
      ref={sectionRef}
    >
      <div className={styles.showcase__container}>
        {/* Section Header */}
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
            Choose Your Perfect
            <span className={styles.showcase__titleAccent}> Clean</span>
          </h2>
          <p className={styles.showcase__subtitle}>
            Professional cleaning service in Lagos. From quick touch-ups to deep
            transformations, we have the perfect cleaning service for your needs
            across Lagos State
          </p>
        </motion.div>

        {/* Trust Badges */}

        {/* Services Grid */}
        <motion.div
          className={styles.showcase__grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {servicesData[0].options.map((service) => (
            <ServiceShowcaseCard
              key={service.id}
              service={service}
              onBookNowClick={handleOpenModal}
              category={ServiceCategory.Cleaning}
            />
          ))}
        </motion.div>
      </div>

      {/* Service Modal */}
      {selectedServiceOption && servicesData[0] && (
        <CleaningServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceOption={selectedServiceOption}
          service={servicesData[0]}
          includedFeatures={selectedServiceOption.inclusions || []}
        />
      )}
    </section>
  );
};

export default CleaningServicesShowcase;
