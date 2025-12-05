// src/app/(routes)/(site)/services/laundry/LaundryServicesShowcase/LaundryServicesShowcase.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./LaundryServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import LaundryServiceModal, {
  LaundryServiceConfiguration,
} from "@/components/ui/booking/modals/LaundryServiceModal/LaundryServiceModal";
import { GetServicesQuery, ServiceOption } from "@/graphql/api";
import {
  Shirt,
  Sparkles,
  Timer,
  ArrowRight,
  Package,
  Shield,
} from "lucide-react";
import ServiceShowcaseCard from "../../_components/common/ServiceShowcaseCard/ServiceShowcaseCard";
import { ServiceCategory } from "@/graphql/api";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  const getServiceDetails = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes("wash")) {
      return {
        icon: "👔",
        color: "#E0E7FF",
        highlight: "Most Popular",
        badge: true,
      };
    }
    if (name.includes("dry")) {
      return {
        icon: "🧥",
        color: "#FEE2E2",
        highlight: "Premium Care",
        badge: false,
      };
    }
    if (name.includes("express")) {
      return {
        icon: "⚡",
        color: "#F0FDF4",
        highlight: "24hr Service",
        badge: false,
      };
    }
    return {
      icon: "🧺",
      color: "#FEF3C7",
      highlight: "Standard",
      badge: false,
    };
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

  const getLaundryIncludedFeatures = () => [
    "Professional laundry detergents included",
    "Experienced and vetted laundry professionals",
    "Satisfaction guarantee",
    "Flexible pickup and delivery",
    "Eco-friendly washing options",
    "Careful handling of delicate fabrics",
  ];

  if (loading) {
    return (
      <div className={styles.showcase__loading}>
        <div className={styles.showcase__spinner}></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <section className={styles.showcase} ref={sectionRef}>
      <div className={styles.showcase__container}>
        {/* Header */}
        <motion.div
          className={styles.showcase__header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.showcase__title}>
            Choose Your
            <span className={styles.showcase__titleAccent}>
              {" "}
              Laundry Service
            </span>
          </h1>
          <p className={styles.showcase__subtitle}>
            From everyday wash & fold to premium dry cleaning, we handle your
            garments with care
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className={styles.showcase__grid}
          variants={containerVariants}
        >
          {servicesData?.[0]?.options?.map((service) => {
            return (
              <ServiceShowcaseCard
                key={service.id}
                service={service}
                onBookNowClick={handleOpenModal}
                category={ServiceCategory.Laundry}
              />
            );
          })}
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
