// src/app/(routes)/(site)/services/pest-control/_components/PestControlServicesShowcase/PestControlServicesShowcase.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./PestControlServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import PestControlServiceModal, {
  PestControlServiceConfiguration,
} from "@/components/ui/booking/modals/PestControlServiceModal";
import { GetServicesQuery, ServiceOption } from "@/graphql/api";
import {
  Shield,
  Home,
  Building,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Leaf,
} from "lucide-react";
import ServiceShowcaseCard from "../../../_components/common/ServiceShowcaseCard/ServiceShowcaseCard";
import { ServiceCategory } from "@/graphql/api";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  const getServiceInfo = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes("residential") || name.includes("home")) {
      return {
        icon: <Home />,
        emoji: "🏠",
        color: "#F0FDF4",
        badge: "Most Popular",
        showBadge: true,
      };
    }
    if (name.includes("commercial") || name.includes("office")) {
      return {
        icon: <Building />,
        emoji: "🏢",
        color: "#FEF3C7",
        badge: "Business",
        showBadge: false,
      };
    }
    if (name.includes("emergency")) {
      return {
        icon: <AlertCircle />,
        emoji: "🚨",
        color: "#FEE2E2",
        badge: "24/7 Service",
        showBadge: true,
      };
    }
    return {
      icon: <Shield />,
      emoji: "🛡️",
      color: "#E0E7FF",
      badge: "Standard",
      showBadge: false,
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
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

  const getPestControlIncludedFeatures = () => [
    "EPA-approved pest control products",
    "Experienced and certified pest control technicians",
    "Satisfaction guarantee",
    "Flexible scheduling options",
    "Eco-friendly solutions available",
    "Comprehensive pest assessment included",
  ];

  if (loading) {
    return (
      <div className={styles.showcase__loading}>
        <Shield className={styles.showcase__loadingIcon} />
        <p>Loading pest control services...</p>
      </div>
    );
  }

  return (
    <section className={styles.showcase} ref={sectionRef}>
      <div className={styles.showcase__container}>
        {/* Header Section */}
        <motion.div
          className={styles.showcase__header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.showcase__title}>
            Effective Solutions for
            <span className={styles.showcase__titleAccent}>
              {" "}
              Every Pest Problem
            </span>
          </h2>
          <p className={styles.showcase__subtitle}>
            From prevention to elimination, our certified experts protect your
            property with safe, effective treatments
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div className={styles.showcase__grid}>
          {servicesData?.[0]?.options?.map((service, index) => {
            const info = getServiceInfo(service.label);
            return (
              <ServiceShowcaseCard
                key={service.id}
                service={service}
                onBookNowClick={handleOpenModal}
                category={ServiceCategory.PestControl}
              />
            );
          })}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className={styles.showcase__cta}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <AlertCircle className={styles.showcase__ctaIcon} />
          <div className={styles.showcase__ctaContent}>
            <h3 className={styles.showcase__ctaTitle}>
              Emergency Pest Problem?
            </h3>
            <p className={styles.showcase__ctaText}>
              We offer 24/7 emergency service for urgent pest situations
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            href="tel:+234800000000"
            className={styles.showcase__ctaButton}
          >
            Call Now: +234 800 000 0000
          </Button>
        </motion.div>
      </div>

      {/* Pest Control Service Modal */}
      {selectedServiceOption && servicesData?.[0] && (
        <PestControlServiceModal
          serviceImage="/images/pest-control/p1.jpeg"
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
