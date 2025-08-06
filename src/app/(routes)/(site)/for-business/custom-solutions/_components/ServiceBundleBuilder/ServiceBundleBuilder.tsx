"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, Plus, ArrowRight } from "lucide-react";
import styles from "./ServiceBundleBuilder.module.scss";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "cleaning",
    name: "Office Cleaning",
    description: "Daily, weekly, or monthly cleaning services",
    price: 299,
    frequency: "monthly"
  },
  {
    id: "catering",
    name: "Corporate Catering",
    description: "Breakfast, lunch, and event catering",
    price: 150,
    frequency: "per event"
  },
  {
    id: "laundry",
    name: "Uniform Management",
    description: "Pickup, cleaning, and delivery service",
    price: 199,
    frequency: "monthly"
  },
  {
    id: "pest",
    name: "Pest Management",
    description: "Quarterly pest control and prevention",
    price: 89,
    frequency: "quarterly"
  },
  {
    id: "maintenance",
    name: "Facility Maintenance",
    description: "General repairs and upkeep",
    price: 399,
    frequency: "monthly"
  },
  {
    id: "security",
    name: "Security Services",
    description: "On-site security personnel",
    price: 2499,
    frequency: "monthly"
  }
];

const ServiceBundleBuilder: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return serviceOptions
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.price, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.serviceBundleBuilder}>
      <div className={styles.serviceBundleBuilder__container}>
        <motion.div
          className={styles.serviceBundleBuilder__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Build Your Custom Service Bundle</h2>
          <p>Select the services that match your business needs and create a tailored package</p>
        </motion.div>

        <motion.div
          className={styles.serviceBundleBuilder__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceOptions.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <motion.div
                key={service.id}
                className={`${styles.serviceCard} ${isSelected ? styles.serviceCard_selected : ''}`}
                variants={itemVariants}
                onClick={() => toggleService(service.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.serviceCard__header}>
                  <div className={styles.serviceCard__checkbox}>
                    {isSelected ? <Check size={16} /> : <Plus size={16} />}
                  </div>
                  <h3>{service.name}</h3>
                </div>
                <p className={styles.serviceCard__description}>{service.description}</p>
                <div className={styles.serviceCard__pricing}>
                  <span className={styles.serviceCard__price}>${service.price}</span>
                  <span className={styles.serviceCard__frequency}>/{service.frequency}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {selectedServices.length > 0 && (
          <motion.div
            className={styles.serviceBundleBuilder__summary}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.summary__content}>
              <div className={styles.summary__details}>
                <h3>Your Custom Bundle</h3>
                <p>{selectedServices.length} services selected</p>
                <div className={styles.summary__total}>
                  <span>Starting from </span>
                  <strong>${calculateTotal().toLocaleString()}/month</strong>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                rightIcon={<ArrowRight size={18} />}
              >
                Get Custom Quote
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServiceBundleBuilder;