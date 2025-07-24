"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./PestControlServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import ServiceModal, { ServiceConfiguration } from "@/components/ui/ServiceModal/ServiceModal";

// Service data
const pestControlServices = [
  {
    id: "general",
    name: "General Pest Control",
    icon: "🐜",
    description:
      "Comprehensive treatment for common household pests including ants, cockroaches, and spiders. Perfect for regular maintenance.",
    features: [
      "Interior & Exterior Treatment",
      "Common Pest Elimination",
      "Prevention Barriers",
      "30-Day Guarantee",
    ],
    price: 7500,
    image: "/images/pest-control/p1.jpeg"
  },
  {
    id: "termite",
    name: "Termite Treatment",
    icon: "🪲",
    description:
      "Specialized treatment for termite infestations with thorough inspection, targeted elimination, and preventative measures.",
    features: [
      "Termite Colony Elimination",
      "Wood Treatment",
      "Barrier Installation",
      "3-Month Guarantee",
    ],
    price: 12500,
    image: "/images/pest-control/p1.jpeg"
  },
  {
    id: "rodent",
    name: "Rodent Control",
    icon: "🐭",
    description:
      "Complete rodent management solutions including trapping, removal, and preventative sealing of entry points.",
    features: [
      "Rodent Removal",
      "Entry Point Sealing",
      "Sanitation Treatment",
      "Preventative Consultation",
    ],
    price: 9500,
    image: "/images/pest-control/p1.jpeg"
  },
];

const PestControlServicesShowcase = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof pestControlServices[0] | null>(null);

  // Configuration for pest control service modal
  const getPestControlServiceConfiguration = (): ServiceConfiguration => ({
    options: [
      { id: "bedrooms", name: "Number of Bedrooms", count: 1 },
      { id: "livingrooms", name: "Number of Living Rooms", count: 1 },
      { id: "kitchen", name: "Kitchen", count: 1 },
      { id: "bathrooms", name: "Number of Bathrooms", count: 1 },
      { id: "outdoor", name: "Outdoor Area", count: 1 },
    ],
    allowCustomization: true
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
  const handleOpenModal = (service: typeof pestControlServices[0]) => {
    setSelectedService(service);
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
    "Comprehensive pest assessment included"
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
          <h2 className={styles.showcase__title}>Choose Your Pest Control Service</h2>
          <p className={styles.showcase__subtitle}>
            From basic treatments to specialized solutions, we have the perfect pest management options for your home or business.
          </p>
        </motion.div>

        <motion.div
          className={styles.showcase__grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {pestControlServices.map((service) => (
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
                <span className={styles.showcase__emoji}>{service.icon}</span>
              </div>

              <div className={styles.showcase__content}>
                <h3 className={styles.showcase__name}>{service.name}</h3>
                <p className={styles.showcase__description}>
                  {service.description}
                </p>

                <ul className={styles.showcase__features}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.showcase__feature}>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className={styles.showcase__priceTag}>
                  <span className={styles.showcase__priceValue}>
                    NGN {service.price.toLocaleString()}
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
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceTitle={selectedService.name}
          serviceDescription={selectedService.description}
          servicePrice={selectedService.price}
          serviceImage={selectedService.image}
          serviceConfiguration={getPestControlServiceConfiguration()}
          serviceType="Pest Control"
          includedFeatures={getPestControlIncludedFeatures()}
          onOrderSubmit={handleOrderSubmit}
        />
      )}
    </section>
  );
};

export default PestControlServicesShowcase; 