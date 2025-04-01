// SubscriptionModule.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PlanTypeSelector from "./PlanTypeSelector/PlanTypeSelector";
import DurationSelector from "./DurationSelector/DurationSelector";
import BudgetSlider from "./BudgetSlider/BudgetSlider";
import ServiceCards from "./ServiceCards/ServiceCards";
import PlanSummary from "./PlanSummary/PlanSummary";
import styles from "./SubscriptionModule.module.scss";

// Types
export type PlanType = "weekly" | "monthly";
export type DurationType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ServiceType = {
  id: string;
  name: string;
  icon: string;
  minPrice: number;
  selected: boolean;
  type: "cleaning" | "food" | "laundry";
  details?: any;
};

const SubscriptionModule: React.FC = () => {
  // State management
  const [planType, setPlanType] = useState<PlanType>("weekly");
  const [duration, setDuration] = useState<DurationType>(2);
  const [budget, setBudget] = useState<number>(25000);
  const [services, setServices] = useState<ServiceType[]>([
    {
      id: "cleaning",
      name: "Cleaning",
      icon: "🧹",
      minPrice: 7500,
      type: "cleaning",
      selected: false,
      details: {
        cleaningType: "standard",
        houseType: "flat",
        rooms: {
          bedroom: 2,
          livingRoom: 1,
          bathroom: 1,
          kitchen: 1,
          balcony: 0,
          studyRoom: 0,
        },
        frequency: 1,
        day: "friday",
        time: "8am",
      },
    },
    {
      id: "laundry",
      name: "Laundry",
      icon: "👕",
      minPrice: 5000,
      type: "laundry",
      selected: false,
      details: {
        laundryType: "wash-and-iron",
        bags: 3,
        pickupFrequency: 1,
        pickupDay: "friday",
      },
    },
    {
      id: "cooking",
      name: "Cooking",
      icon: "🍳",
      minPrice: 10000,
      type: "food",
      selected: false,
      details: {
        foodPlanType: "basic",
        deliveryFrequency: 2,
        deliveryDays: ["monday", "tuesday"],
        mealsPerDay: {
          monday: 5,
          tuesday: 2,
        },
      },
    },
  ]);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  // Calculate total price
  const totalPrice = services.reduce((total, service) => {
    return service.selected ? total + service.minPrice : total;
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
        service.id === serviceId ? { ...service, details: newDetails } : service
      )
    );
  };

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
            <ServiceCards services={services} toggleService={toggleService} />
          </motion.div>
        </div>

        {/* Right Panel - Summary Area */}
        <div className={styles.subscription__summary}>
          <PlanSummary
            planType={planType}
            duration={duration}
            selectedServices={services.filter((i) => i.selected)}
            totalPrice={totalPrice}
            onUpdateService={handleUpdateService}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionModule;
