"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ServiceHero.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import ServiceSelectionModal from "@/components/ui/booking/modals/ServiceSelectionModal/ServiceSelectionModal";
import CleaningServiceModal from "@/components/ui/booking/modals/CleaningServiceModal/CleaningServiceModal";
import LaundryServiceModal from "@/components/ui/booking/modals/LaundryServiceModal/LaundryServiceModal";
import CookingServiceModal from "@/components/ui/booking/modals/CookingServiceModal/CookingServiceModal";
import PestControlServiceModal from "@/components/ui/booking/modals/PestControlServiceModal/PestControlServiceModal";
import { ServiceCategory, ServiceOption, Service } from "@/graphql/api";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import { ServiceStatus } from "@/graphql/api";

interface ServiceHeroProps {
  backgroundImage: string;
  accentText: string;
  mainText: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  connectorText?: string;
  animationType?: "wobble" | "vibrate" | "heartbeat";
  animationIntensity?: "subtle" | "intense";
  isAvailable?: boolean;
  serviceCategory?: ServiceCategory;
  useServiceModal?: boolean;
}

const ServiceHero = ({
  backgroundImage,
  accentText,
  mainText,
  description,
  ctaText,
  ctaHref = Routes.GET_STARTED,
  connectorText = "That",
  animationType = "wobble",
  animationIntensity = "intense",
  isAvailable = true,
  serviceCategory,
  useServiceModal = false,
}: ServiceHeroProps) => {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  const { data: servicesData } = useGetServices({
    category: serviceCategory,
    status: ServiceStatus.Active,
  });

  const handleCTAClick = () => {
    if (useServiceModal && serviceCategory) {
      setIsSelectionModalOpen(true);
    }
  };

  const handleServiceSelect = (serviceOption: ServiceOption) => {
    setSelectedServiceOption(serviceOption);
    setIsServiceModalOpen(true);
  };

  const handleCloseSelectionModal = () => {
    setIsSelectionModalOpen(false);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedServiceOption(null);
  };

  const renderServiceModal = () => {
    if (!selectedServiceOption || !servicesData?.services?.[0]) return null;

    const service = servicesData.services[0];

    switch (serviceCategory) {
      case ServiceCategory.Cleaning:
        return (
          <CleaningServiceModal
            isOpen={isServiceModalOpen}
            onClose={handleCloseServiceModal}
            serviceOption={selectedServiceOption}
            service={service}
            includedFeatures={selectedServiceOption.inclusions || []}
          />
        );
      case ServiceCategory.Laundry:
        return (
          <LaundryServiceModal
            isOpen={isServiceModalOpen}
            onClose={handleCloseServiceModal}
            serviceOption={selectedServiceOption}
            service={service}
          />
        );
      case ServiceCategory.Cooking:
        return (
          <CookingServiceModal
            isOpen={isServiceModalOpen}
            onClose={handleCloseServiceModal}
            serviceOption={selectedServiceOption}
            service={service}
          />
        );
      case ServiceCategory.PestControl:
        return (
          <PestControlServiceModal
            isOpen={isServiceModalOpen}
            onClose={handleCloseServiceModal}
            serviceOption={selectedServiceOption}
            service={service}
          />
        );
      default:
        return null;
    }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getButtonAnimation = () => {
    switch (animationType) {
      case "wobble":
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        };
      case "vibrate":
        return {
          whileHover: {
            x: [0, -2, 2, -2, 2, 0],
            transition: { duration: 0.3 },
          },
        };
      case "heartbeat":
        return {
          whileHover: {
            scale: [1, 1.1, 1],
            transition: { duration: 0.3, repeat: 1 },
          },
        };
      default:
        return {};
    }
  };

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.hero__overlay}></div>
      <div className={styles.hero__container}>
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.hero__title} variants={fadeIn}>
            <span className={styles["hero__title--accent"]}>{accentText}</span>{" "}
            {connectorText}
            {connectorText && <br />}
            <span className={styles["hero__title--main"]}>{mainText}</span>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            {description}
          </motion.p>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            {isAvailable ? (
              useServiceModal && serviceCategory ? (
                <CTAButton
                  onClick={handleCTAClick}
                  size="lg"
                  animationType={animationType}
                  animationIntensity={animationIntensity}
                  rightIcon={<ArrowRightIcon size={18} />}
                  {...getButtonAnimation()}
                >
                  {ctaText}
                </CTAButton>
              ) : (
                <CTAButton
                  href={ctaHref}
                  size="lg"
                  animationType={animationType}
                  animationIntensity={animationIntensity}
                  rightIcon={<ArrowRightIcon size={18} />}
                  {...getButtonAnimation()}
                >
                  {ctaText}
                </CTAButton>
              )
            ) : (
              <Button variant="secondary" size="lg" disabled>
                <Clock size={16} style={{ marginRight: "8px" }} />
                Coming Soon
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Service Selection Modal */}
      {useServiceModal && serviceCategory && (
        <ServiceSelectionModal
          isOpen={isSelectionModalOpen}
          onClose={handleCloseSelectionModal}
          serviceCategory={serviceCategory}
          onServiceSelect={handleServiceSelect}
        />
      )}

      {/* Service-specific Modal */}
      {renderServiceModal()}
    </section>
  );
};

export default ServiceHero;
