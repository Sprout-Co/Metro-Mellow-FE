// SubscriptionModule.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PlanTypeSelector from "./PlanTypeSelector/PlanTypeSelector";
import ServiceCards from "./ServiceCards/ServiceCards";
import EnhancedPlanSummary from "./PlanSummary/PlanSummary";
import { ExtendedService } from "./PlanSummary/PlanSummary";
import styles from "./SubscriptionModule.module.scss";
import {
  Service,
  ServiceCategory,
  ServiceStatus,
  BillingCycle,
} from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { useUIStore } from "@/store";
import {Icon} from "@/components/ui/Icon/Icon";

// Types
export type PlanType = "weekly" | "monthly";
export type DurationType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// Default service details maps for each service type
const DEFAULT_SERVICE_DETAILS = {
  cleaning: {
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
    frequency: 1 as const,
    day: "friday",
    time: "morning",
  },
  food: {
    foodPlanType: "basic",
    deliveryFrequency: 2 as const,
    deliveryDays: ["monday", "thursday"],
    mealsPerDay: {
      monday: 2,
      thursday: 2,
    },
  },
  laundry: {
    laundryType: "wash-and-fold",
    bags: 2,
    pickupFrequency: 1 as const,
    pickupDays: ["wednesday"],
  },
};

const SubscriptionModule: React.FC = () => {
  // Router for navigation
  const router = useRouter();
  const { openModal } = useUIStore();

  // State management
  const [planType, setPlanType] = useState<PlanType>("weekly");
  const [duration, setDuration] = useState<DurationType>(2);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );
  const [extendedServices, setExtendedServices] = useState<ExtendedService[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Get service operations hook
  const { handleGetServices, servicesLoading, servicesError } =
    useServiceOperations();
  const { handleCreateSubscription } = useSubscriptionOperations();

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiServices = await handleGetServices(
          undefined,
          ServiceStatus.Active
        );
        if (apiServices) {
          // Map service category to type and assign default details
          const mappedServices = apiServices.map((service) => {
            return {
              ...service,
              icon: service.icon || "🏠", // Default icon if none provided
            };
          });
          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [handleGetServices]);

  // Create extended services based on selected services
  useEffect(() => {
    const selected = services.filter((service) =>
      selectedServices.has(service._id)
    );

    // const extended = selected.map((service) => {
    //   // Find existing extended service or create a new one
    //   const existingService = extendedServices.find(
    //     (es) => es._id === service._id
    //   );

    //   if (existingService) {
    //     return existingService;
    //   }

    //   // Determine service type based on service ID or category
    //   let serviceType: "cleaning" | "food" | "laundry";
    //   if (
    //     service.service_id?.includes("CLEANING") ||
    //     service.category === "CLEANING"
    //   ) {
    //     serviceType = "cleaning";
    //   } else if (
    //     service.service_id?.includes("FOOD") ||
    //     service.category === "FOOD"
    //   ) {
    //     serviceType = "food";
    //   } else {
    //     serviceType = "laundry";
    //   }

    //   // Create extended service with default details
    //   return {
    //     ...service,
    //     type: serviceType,
    //     details: DEFAULT_SERVICE_DETAILS[serviceType],
    //   } as ExtendedService;
    // });

    // setExtendedServices(extended);
  }, [selectedServices, services]);

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

  // Update service details
  const handleUpdateService = (updatedService: ExtendedService) => {
    setExtendedServices((prev) =>
      prev.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    // This is a simplified version - the actual calculation happens in EnhancedPlanSummary
    // We're just using this to check if we have selected services
    return extendedServices.length > 0;
  };

  // Handle subscription creation
  // const handleCreateSubscriptionPlan = async () => {
  //   if (extendedServices.length === 0) {
  //     setSubmissionError("Please select at least one service");
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     setSubmissionError(null);

  //     // Map subscription services
  //     const subscriptionServices = extendedServices.map((service) => {
  //       // Prepare service details based on service type
  //       let serviceDetails: any = {};
  //       let scheduledDays: string[] = [];

  //       if (service.type === "cleaning") {
  //         serviceDetails = {
  //           cleaningType: service.details.cleaningType,
  //           propertyType: service.details.houseType,
  //           rooms: service.details.rooms,
  //         };
  //         scheduledDays = [service.details.day]; // Single day for cleaning
  //       } else if (service.type === "food") {
  //         const foodDetails = service.details as any;
  //         serviceDetails = {
  //           foodPlanType: foodDetails.foodPlanType,
  //           mealsPerDay: foodDetails.mealsPerDay,
  //         };
  //         scheduledDays = foodDetails.deliveryDays;
  //       } else if (service.type === "laundry") {
  //         const laundryDetails = service.details as any;
  //         serviceDetails = {
  //           laundryType: laundryDetails.laundryType,
  //           bags: laundryDetails.bags,
  //         };
  //         scheduledDays = laundryDetails.pickupDays;
  //       }

  //       // Get frequency from service details based on type
  //       const frequency =
  //         service.type === "cleaning"
  //           ? service.details.frequency
  //           : service.type === "food"
  //             ? (service.details as any).deliveryFrequency
  //             : (service.details as any).pickupFrequency;

  //       return {
  //         serviceId: service._id,
  //         serviceType: service.type.toUpperCase(),
  //         frequency: frequency.toString(),
  //         price: 0, // This will be calculated on the server
  //         serviceDetails,
  //         scheduledDays,
  //         preferredTimeSlot:
  //           service.type === "cleaning"
  //             ? (service.details as any).time
  //             : "MORNING",
  //       };
  //     });

  //     // Create subscription input
  //     const subscriptionInput = {
  //       // In a real application, customer ID would come from authenticated user
  //       customerId: "demo-customer-id",
  //       startDate: new Date(),
  //       endDate: new Date(
  //         Date.now() +
  //           duration * (planType === "weekly" ? 7 : 30) * 24 * 60 * 60 * 1000
  //       ),
  //       billingCycle:
  //         planType === "weekly" ? BillingCycle.Weekly : BillingCycle.Monthly,
  //       duration: duration,
  //       autoRenew: true,
  //       subscriptionServices,
  //     };

  //     console.log("Creating subscription with input:", subscriptionInput);

  //     // Call the API to create subscription
  //     const result = await handleCreateSubscription(subscriptionInput);

  //     console.log("Subscription created:", result);

  //     // Show success modal
  //     openModal("subscription-success", {
  //       planType,
  //       duration,
  //       services: extendedServices,
  //     });

  //     // Redirect to dashboard or confirmation page
  //     // router.push("/dashboard/subscriptions");
  //   } catch (error) {
  //     console.error("Failed to create subscription:", error);
  //     setSubmissionError(
  //       error instanceof Error
  //         ? error.message
  //         : "Failed to create subscription. Please try again."
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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

  if (servicesLoading) {
    return (
      <div className={styles.subscription__loading}>
        <motion.div
          className={styles.subscription__loading_spinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Icon name="loader" />
        </motion.div>
        <p>Loading services...</p>
      </div>
    );
  }

  if (servicesError) {
    return (
      <div className={styles.subscription__error}>
        <Icon name="alert-circle" />
        <h3>Error loading services</h3>
        <p>{servicesError.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
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

          {submissionError && (
            <motion.div
              className={styles.subscription__error_message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Icon name="alert-circle" />
              <span>{submissionError}</span>
            </motion.div>
          )}

          {/* <motion.button
            className={styles.subscription__create_button}
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ y: 0 }}
            disabled={!calculateTotalPrice() || isSubmitting}
            onClick={handleCreateSubscriptionPlan}
          >
            {isSubmitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Icon name="loader" />
                </motion.span>
                Creating...
              </>
            ) : (
              <>
                Create Subscription
                <Icon name="arrow-right" />
              </>
            )}
          </motion.button> */}
        </div>

        {/* Right Panel - Summary Area */}
        <div className={styles.subscription__summary}>
          <EnhancedPlanSummary
            planType={planType}
            duration={duration}
            selectedServices={services.filter((service) =>
              selectedServices.has(service._id)
            )}
            onUpdateService={handleUpdateService}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionModule;
