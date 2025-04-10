// SubscriptionModule.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PlanTypeSelector from "./PlanTypeSelector/PlanTypeSelector";
import ServiceCards from "./ServiceCards/ServiceCards";
import PlanSummary from "./PlanSummary/PlanSummary";
import styles from "./SubscriptionModule.module.scss";
import { Service, ServiceCategory, ServiceStatus } from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";

// Types
export type PlanType = "weekly" | "monthly";
export type DurationType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const SubscriptionModule: React.FC = () => {
  // State management
  const [planType, setPlanType] = useState<PlanType>("weekly");
  const [duration, setDuration] = useState<DurationType>(2);
  const [budget, setBudget] = useState<number>(25000);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );

  // Get service operations hook
  const { handleGetServices, servicesLoading, servicesError } =
    useServiceOperations();

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiServices = await handleGetServices(
          undefined,
          ServiceStatus.Active
        );
        if (apiServices) {
          setServices(apiServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [handleGetServices]);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  // Calculate total price
  const totalPrice = services.reduce((total, service) => {
    return selectedServices.has(service._id) ? total + service.price : total;
  }, 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Update service details
  const handleUpdateService = (serviceId: string, newDetails: any) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === serviceId ? { ...service, ...newDetails } : service
      )
    );
  };

  if (servicesLoading) {
    return <div>Loading services...</div>;
  }

  if (servicesError) {
    return <div>Error loading services: {servicesError.message}</div>;
  }

  return (
    <div className={styles.subscription}>
      <div className={styles.subscription__header}>
        <h1 className={styles.subscription__title}>Create Your Service Plan</h1>
        <p className={styles.subscription__subtitle}>
          Customize your home service subscription in one place
        </p>
      </div>

      <motion.div
        className={styles.subscription__container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Panel - Selection Area */}
        <div className={styles.subscription__selection}>
          <motion.div variants={itemVariants}>
            <PlanTypeSelector
              planType={planType}
              setPlanType={setPlanType}
              duration={duration}
              setDuration={setDuration}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ServiceCards
              services={services}
              selectedServices={selectedServices}
              toggleService={toggleService}
            />
          </motion.div>
        </div>

        {/* Right Panel - Summary Area */}
        <div className={styles.subscription__summary}>
          <PlanSummary
            planType={planType}
            duration={duration}
            selectedServices={services.filter((service) =>
              selectedServices.has(service._id)
            )}
            totalPrice={totalPrice}
            onUpdateService={handleUpdateService}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionModule;
