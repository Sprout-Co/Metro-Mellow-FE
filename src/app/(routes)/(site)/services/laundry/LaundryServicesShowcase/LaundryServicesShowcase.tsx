"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./LaundryServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import Image from "next/image";

// Service data
const laundryServices = [
  {
    id: "standard",
    name: "Standard Laundry",
    icon: "👕",
    description:
      "Basic wash, dry, and fold service for everyday clothing and linens. Perfect for regular laundry needs.",
    features: [
      "Wash & Dry",
      "Basic Folding",
      "Stain Treatment",
      "Fabric Softener",
    ],
    price: 1950,
    image: "/images/laundry/l1.jpeg"
  },
  {
    id: "premium",
    name: "Premium Laundry",
    icon: "✨",
    description:
      "Enhanced laundry service with special care for delicate fabrics and precision folding techniques.",
    features: [
      "Everything in Standard",
      "Delicate Fabric Care",
      "Precision Folding",
      "Garment Steaming",
    ],
    price: 3450,
    image: "/images/laundry/l5.jpeg"
  },
  {
    id: "drycleaning",
    name: "Dry Cleaning",
    icon: "🧥",
    description:
      "Professional dry cleaning for suits, dresses, and special garments that require careful handling.",
    features: [
      "Suit & Formal Wear",
      "Stain Removal",
      "Pressing & Finishing",
      "Garment Preservation",
    ],
    price: 4950,
    image: "/images/laundry/dry-cleaning.jpg"
  },
];

// Service Modal Component
const LaundryServiceModal = ({ 
  isOpen, 
  onClose, 
  service 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  service: typeof laundryServices[0] 
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleOrder = () => {
    console.log("Order placed for", service.name, "Quantity:", quantity);
    // Here you would typically handle the order process
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <div className={styles.modal}>
        <div className={styles.modal__imageSection}>
          <Image
            src={service.image}
            alt={service.name}
            width={400}
            height={300}
            className={styles.modal__image}
          />
        </div>
        
        <div className={styles.modal__content}>
          <h2 className={styles.modal__title}>{service.name}</h2>
          <p className={styles.modal__description}>{service.description}</p>
          
          <div className={styles.modal__price}>
            NGN {service.price.toLocaleString()}
          </div>
          
          <div className={styles.modal__features}>
            <h3 className={styles.modal__subtitle}>Features</h3>
            <ul className={styles.modal__featuresList}>
              {service.features.map((feature, index) => (
                <li key={index} className={styles.modal__feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.modal__quantity}>
            <h3 className={styles.modal__subtitle}>How many loads?</h3>
            <div className={styles.modal__counter}>
              <button 
                className={styles.modal__counterButton} 
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.modal__counterValue}>{quantity}</span>
              <button 
                className={styles.modal__counterButton} 
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>
          
          <div className={styles.modal__totalSection}>
            <span className={styles.modal__totalLabel}>Total:</span>
            <span className={styles.modal__totalValue}>
              NGN {(service.price * quantity).toLocaleString()}
            </span>
          </div>
          
          <div className={styles.modal__actions}>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleOrder}
              fullWidth
            >
              Book Service
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const LaundryServicesShowcase = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof laundryServices[0] | null>(null);

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
  const handleOpenModal = (service: typeof laundryServices[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          <h2 className={styles.showcase__title}>Choose Your Laundry Service</h2>
          <p className={styles.showcase__subtitle}>
            From everyday essentials to specialty fabrics, we have the perfect care solution for your garments.
          </p>
        </motion.div>

        <motion.div
          className={styles.showcase__grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {laundryServices.map((service) => (
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
      {selectedService && (
        <LaundryServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </section>
  );
};

export default LaundryServicesShowcase; 