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
            <motion.div
              key={service.id}
              className={styles.showcase__card}
              variants={cardVariants}
            >
              {/* Card Header */}
              <div className={styles.showcase__cardHeader}>
                <div className={styles.showcase__iconWrapper}>
                  <span className={styles.showcase__emoji}>
                    {getServiceEmoji(service.label)}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.showcase__cardContent}>
                <h3 className={styles.showcase__cardTitle}>{service.label}</h3>
                <p className={styles.showcase__cardDescription}>
                  {service.description}
                </p>

                {/* Price */}
                <div className={styles.showcase__price}>
                  <span className={styles.showcase__priceLabel}>
                    Starting at
                  </span>
                  <div className={styles.showcase__priceAmount}>
                    <span className={styles.showcase__priceCurrency}>₦</span>
                    <span className={styles.showcase__priceValue}>
                      {service.price?.toLocaleString()}
                    </span>
                    <span className={styles.showcase__priceUnit}>/service</span>
                  </div>
                </div>

                {/* Features */}
                {/* <ul className={styles.showcase__features}>
                  {service.inclusions?.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className={styles.showcase__feature}>
                      <div className={styles.showcase__featureIcon}>✓</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul> */}

                {/* CTA Button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => handleOpenModal(service)}
                >
                  Book Now
                  <ArrowRight className={styles.showcase__buttonIcon} />
                </Button>
              </div>

              {/* Card Footer */}
              {/* <div className={styles.showcase__cardFooter}>
                <Clock className={styles.showcase__footerIcon} />
                <span>Book in 60 seconds</span>
              </div> */}
            </motion.div>
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
