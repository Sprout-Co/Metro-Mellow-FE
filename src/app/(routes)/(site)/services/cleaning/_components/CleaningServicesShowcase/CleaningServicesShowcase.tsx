// src/app/(routes)/(site)/services/cleaning/_components/CleaningServicesShowcase/CleaningServicesShowcase.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./CleaningServicesShowcase.module.scss";
import CleaningServiceModal, {
  CleaningServiceConfiguration,
} from "@/components/ui/booking/modals/CleaningServiceModal/CleaningServiceModal";
import { GetServicesQuery, ServiceOption } from "@/graphql/api";
import { Home, Sparkles, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceShowcaseCard from "../../../_components/common/ServiceShowcaseCard/ServiceShowcaseCard";

interface CleaningServicesShowcaseProps {
  servicesData?: GetServicesQuery["services"];
  loading?: boolean;
  error?: any;
}

const CleaningServicesShowcase: React.FC<CleaningServicesShowcaseProps> = ({
  servicesData,
  loading,
  error,
}) => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.toLowerCase().includes("standard")) return <Home />;
    if (serviceName.toLowerCase().includes("deep")) return <Sparkles />;
    if (
      serviceName.toLowerCase().includes("office") ||
      serviceName.toLowerCase().includes("commercial")
    )
      return <Building />;
    return <Home />;
  };

  const getServiceEmoji = (serviceName: string) => {
    if (serviceName.toLowerCase().includes("standard")) return "🏠";
    if (serviceName.toLowerCase().includes("deep")) return "✨";
    if (
      serviceName.toLowerCase().includes("office") ||
      serviceName.toLowerCase().includes("commercial")
    )
      return "🏢";
    return "🧹";
  };

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

  const handleOpenModal = (serviceOption: ServiceOption) => {
    setSelectedServiceOption(serviceOption);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.showcase__loading}>
        <div className={styles.showcase__loader}></div>
      </div>
    );
  }

  return (
    <section className={styles.showcase} ref={sectionRef}>
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
            From quick touch-ups to deep transformations, we have the perfect
            service for your needs
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
          {servicesData?.[0]?.options?.map((service, index) => (
            <ServiceShowcaseCard
              key={service.id}
              service={service}
              onBookNowClick={handleOpenModal}
            />
          ))}
        </motion.div>
      </div>

      {/* Service Modal */}
      {selectedServiceOption && servicesData?.[0] && (
        <CleaningServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceOption={selectedServiceOption}
          service={servicesData[0]}
          includedFeatures={selectedServiceOption.inclusions || []}
          onOrderSubmit={(configuration: CleaningServiceConfiguration) => {
            console.log("Cleaning service configuration:", configuration);
          }}
        />
      )}
    </section>
  );
};

export default CleaningServicesShowcase;
