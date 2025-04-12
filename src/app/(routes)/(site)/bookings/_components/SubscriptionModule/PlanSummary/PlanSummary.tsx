// src/app/(routes)/(site)/bookings/_components/SubscriptionModule/PlanSummary/PlanSummary.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PlanSummary.module.scss";
import { Service } from "@/graphql/api";
import { PlanType, DurationType } from "../SubscriptionModule";
import { Icon } from "@/components/ui/Icon/Icon";
import { useUIStore } from "@/store";
import { ServiceId, ServiceCategory } from "@/graphql/api";

// Define our extended service types
export type CleaningDetails = {
  cleaningType: "standard" | "deep" | "post";
  houseType: "flat" | "duplex";
  rooms: {
    bedroom: number;
    livingRoom: number;
    bathroom: number;
    kitchen: number;
    balcony: number;
    studyRoom: number;
  };
  frequency: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  day: string;
  time: string;
};

export type FoodDetails = {
  foodPlanType: "basic" | "standard" | "premium";
  deliveryFrequency: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  deliveryDays: string[];
  mealsPerDay: {
    [key: string]: number;
  };
};

export type LaundryDetails = {
  laundryType: "wash-and-fold" | "wash-and-iron";
  bags: number;
  pickupFrequency: 1 | 2 | 3;
  pickupDays: string[];
};

export type ServiceDetails = CleaningDetails | FoodDetails | LaundryDetails;

export interface ExtendedService extends Service {
  type: "cleaning" | "food" | "laundry";
  details: ServiceDetails;
}

type FrequencyMultiplier = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type LaundryFrequencyMultiplier = 1 | 2 | 3;

// Pricing configuration for different service types
const PRICING_CONFIG = {
  cleaning: {
    basePrice: 3000, // Base price for cleaning service
    cleaningTypes: {
      standard: 0, // Additional cost for standard cleaning (none, it's the default)
      deep: 2500, // Additional cost for deep cleaning
      post: 5000, // Additional cost for post construction cleaning
    },
    roomPrices: {
      bedroom: 1000, // Price per bedroom
      livingRoom: 1500, // Price per living room
      bathroom: 1200, // Price per bathroom
      kitchen: 2000, // Price per kitchen
      balcony: 800, // Price per balcony
      studyRoom: 1000, // Price per study room
    },
    frequencyMultiplier: {
      1: 1, // Once a week (no discount)
      2: 1.9, // Twice a week (5% discount per cleaning)
      3: 2.7, // Three times a week (10% discount per cleaning)
      4: 3.4, // Four times a week (15% discount per cleaning)
      5: 4.0, // Five times a week (20% discount per cleaning)
      6: 4.5, // Six times a week (25% discount per cleaning)
      7: 5.0, // Daily (almost 30% discount per cleaning)
    },
  },
  food: {
    basePrice: 5000, // Base price for food service
    foodPlanTypes: {
      basic: 0, // Basic plan (no additional cost)
      standard: 3000, // Standard plan additional cost
      premium: 8000, // Premium plan additional cost
    },
    mealsPerDayPrice: 1500, // Price per meal
    deliveryFrequencyMultiplier: {
      1: 1, // Once a week (no discount)
      2: 1.9, // Twice a week (5% discount)
      3: 2.8, // Three times a week (7% discount)
      4: 3.6, // Four times a week (10% discount)
      5: 4.5, // Five times a week (10% discount)
      6: 5.2, // Six times a week (13% discount)
      7: 6.0, // Daily (15% discount)
    },
  },
  laundry: {
    basePrice: 2000, // Base price for laundry service
    laundryTypes: {
      "wash-and-fold": 0, // Wash and fold (no additional cost)
      "wash-and-iron": 1500, // Wash and iron additional cost
    },
    bagPrice: 1000, // Price per bag
    pickupFrequencyMultiplier: {
      1: 1, // Once a week (no discount)
      2: 1.9, // Twice a week (5% discount)
      3: 2.7, // Three times a week (10% discount)
    },
  },
};

// Default service details
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

type PlanSummaryProps = {
  selectedServices: Service[];
  planType: PlanType;
  duration: DurationType;
  onUpdateService?: (service: ExtendedService) => void;
};

const PlanSummary: React.FC<PlanSummaryProps> = ({
  selectedServices,
  planType = "weekly",
  duration = 2,
  onUpdateService,
}) => {
  // State to track extended services with details
  const [extendedServices, setExtendedServices] = useState<ExtendedService[]>(
    []
  );
  const [servicePrices, setServicePrices] = useState<{ [key: string]: number }>(
    {}
  );

  // Access the UI store to handle modals
  const { openModal } = useUIStore();

  // Extend base services with details
  useEffect(() => {
    const extended = selectedServices.map((service) => {
      // Find existing extended service or create a new one
      const existingService = extendedServices.find(
        (es) => es._id === service._id
      );

      if (existingService) {
        return existingService;
      }

      // Determine service type based on service ID or category
      let serviceType: "cleaning" | "food" | "laundry";
      if (isCleaningService(service)) {
        serviceType = "cleaning";
      } else if (isFoodService(service)) {
        serviceType = "food";
      } else {
        serviceType = "laundry";
      }

      // Create extended service with default details
      return {
        ...service,
        type: serviceType,
        details: DEFAULT_SERVICE_DETAILS[serviceType],
      } as ExtendedService;
    });

    setExtendedServices(extended);
  }, [selectedServices]);

  // Calculate individual service prices
  const calculateServicePrice = (service: ExtendedService): number => {
    const { type, details } = service;

    if (!details) return service.price || 0;

    let price = 0;

    switch (type) {
      case "cleaning": {
        const cleaningDetails = details as CleaningDetails;
        // Base price
        price += PRICING_CONFIG.cleaning.basePrice;

        // Add cost based on cleaning type
        price +=
          PRICING_CONFIG.cleaning.cleaningTypes[cleaningDetails.cleaningType] ||
          0;

        // Add cost based on room counts
        Object.entries(cleaningDetails.rooms).forEach(([roomType, count]) => {
          const room =
            roomType as keyof typeof PRICING_CONFIG.cleaning.roomPrices;
          price += PRICING_CONFIG.cleaning.roomPrices[room] * count;
        });

        // Apply frequency multiplier
        const cleaningFrequency =
          cleaningDetails.frequency as FrequencyMultiplier;
        price = Math.round(
          price * PRICING_CONFIG.cleaning.frequencyMultiplier[cleaningFrequency]
        );
        break;
      }

      case "food": {
        const foodDetails = details as FoodDetails;
        // Base price
        price += PRICING_CONFIG.food.basePrice;

        // Add cost based on food plan type
        price += PRICING_CONFIG.food.foodPlanTypes[foodDetails.foodPlanType];

        // Add cost based on meals per day
        let totalMeals = 0;
        Object.values(foodDetails.mealsPerDay).forEach((mealCount) => {
          totalMeals += mealCount;
        });
        price += PRICING_CONFIG.food.mealsPerDayPrice * totalMeals;

        // Apply delivery frequency multiplier
        const deliveryFrequency =
          foodDetails.deliveryFrequency as FrequencyMultiplier;
        price = Math.round(
          price *
            PRICING_CONFIG.food.deliveryFrequencyMultiplier[deliveryFrequency]
        );
        break;
      }

      case "laundry": {
        const laundryDetails = details as LaundryDetails;
        // Base price
        price += PRICING_CONFIG.laundry.basePrice;

        // Add cost based on laundry type
        price +=
          PRICING_CONFIG.laundry.laundryTypes[laundryDetails.laundryType];

        // Add cost based on bag count
        price += PRICING_CONFIG.laundry.bagPrice * laundryDetails.bags;

        // Apply pickup frequency multiplier
        const pickupFrequency =
          laundryDetails.pickupFrequency as LaundryFrequencyMultiplier;
        price = Math.round(
          price *
            PRICING_CONFIG.laundry.pickupFrequencyMultiplier[pickupFrequency]
        );
        break;
      }

      default:
        price = service.price || 0;
    }

    return Math.round(price);
  };

  // Update service prices whenever services or their details change
  useEffect(() => {
    const newPrices: { [key: string]: number } = {};
    extendedServices.forEach((service) => {
      newPrices[service._id] = calculateServicePrice(service);
    });
    setServicePrices(newPrices);
  }, [extendedServices]);

  // Calculate subscription totals based on plan type and duration
  const calculateTotals = () => {
    // Calculate subtotal from individual service prices
    const subtotal = Object.values(servicePrices).reduce(
      (total, price) => total + price,
      0
    );

    // Apply duration discount - longer subscriptions get better rates
    let discount = 0;
    if (duration >= 6) {
      discount = subtotal * 0.1; // 10% discount for 6+ months
    } else if (duration >= 3) {
      discount = subtotal * 0.05; // 5% discount for 3+ months
    }

    // Calculate final total
    const final = subtotal - discount;

    return {
      subtotal,
      discount,
      total: final,
      perPeriod: planType === "weekly" ? final / 4 : final, // Assuming 4 weeks per month for weekly plans
    };
  };

  const { subtotal, discount, total, perPeriod } = calculateTotals();

  // Format price to currency
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  // Handle Edit All Services button click
  const handleEditAllServices = () => {
    // Get the service types that are currently selected
    const serviceTypes = extendedServices.map((service) => ({
      type: service.type,
      id: service._id,
    }));

    // Open the subscription editor modal with the selected service types
    openModal("craft-subscription", { selectedServices: serviceTypes });
  };

  // Get frequency text based on service type and frequency value
  const getFrequencyText = (service: ExtendedService) => {
    if (service.type === "cleaning") {
      const details = service.details as CleaningDetails;
      const freq = details.frequency;
      return freq === 1
        ? "Once a week"
        : freq === 2
          ? "Twice a week"
          : freq === 3
            ? "Three times a week"
            : freq === 4
              ? "Four times a week"
              : freq === 5
                ? "Five times a week"
                : freq === 6
                  ? "Six times a week"
                  : "Daily";
    } else if (service.type === "food") {
      const details = service.details as FoodDetails;
      const freq = details.deliveryFrequency;
      return freq === 1
        ? "Once a week"
        : freq === 2
          ? "Twice a week"
          : freq === 3
            ? "Three times a week"
            : freq === 4
              ? "Four times a week"
              : freq === 5
                ? "Five times a week"
                : freq === 6
                  ? "Six times a week"
                  : "Daily";
    } else if (service.type === "laundry") {
      const details = service.details as LaundryDetails;
      const freq = details.pickupFrequency;
      return freq === 1
        ? "Once a week"
        : freq === 2
          ? "Twice a week"
          : "Three times a week";
    }
    return "";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const isCleaningService = (service: Service) => {
    return (
      service.service_id === ServiceId.StandardCleaning ||
      service.service_id === ServiceId.DeepCleaning ||
      service.service_id === ServiceId.PostConstructionCleaning ||
      service.category === ServiceCategory.Cleaning
    );
  };

  const isFoodService = (service: Service) => {
    return service.category === ServiceCategory.Cooking;
  };

  return (
    <div className={styles.plan_summary}>
      <div className={styles.plan_summary__header}>
        <h2 className={styles.plan_summary__title}>Your Plan Summary</h2>

        {/* Edit All Services Button */}
        {extendedServices.length > 0 && (
          <motion.button
            className={styles.plan_summary__edit_button}
            onClick={handleEditAllServices}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Icon name="Edit" /> Edit Services
          </motion.button>
        )}
      </div>

      {/* Services List */}
      {extendedServices.length === 0 ? (
        <div className={styles.plan_summary__empty}>
          <p>Select services to see your plan summary</p>
        </div>
      ) : (
        <motion.div
          className={styles.plan_summary__services}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {extendedServices.map((service) => (
              <motion.div
                key={service._id}
                className={styles.plan_summary__service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className={styles.plan_summary__service_header}>
                  <div className={styles.plan_summary__service_icon}>
                    <span>{service.icon}</span>
                  </div>
                  <div className={styles.plan_summary__service_info}>
                    <h3 className={styles.plan_summary__service_name}>
                      {service.name}
                    </h3>
                    <p className={styles.plan_summary__service_type}>
                      {service.type === "cleaning"
                        ? (service.details as CleaningDetails).cleaningType ===
                          "standard"
                          ? "Standard Cleaning"
                          : (service.details as CleaningDetails)
                                .cleaningType === "deep"
                            ? "Deep Cleaning"
                            : "Post Construction Cleaning"
                        : service.type === "food"
                          ? (service.details as FoodDetails).foodPlanType ===
                            "basic"
                            ? "Basic Plan"
                            : (service.details as FoodDetails).foodPlanType ===
                                "standard"
                              ? "Standard Plan"
                              : "Premium Plan"
                          : (service.details as LaundryDetails).laundryType ===
                              "wash-and-iron"
                            ? "Wash And Iron"
                            : "Wash And Fold"}
                    </p>
                  </div>
                  <div className={styles.plan_summary__service_price_container}>
                    <p className={styles.plan_summary__service_price}>
                      {formatPrice(servicePrices[service._id] || 0)}
                    </p>
                    <p className={styles.plan_summary__service_detail}>
                      {getFrequencyText(service)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pricing Summary */}
      {extendedServices.length > 0 && (
        <motion.div
          className={styles.plan_summary__pricing}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.plan_summary__price_row}>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className={styles.plan_summary__price_row}>
              <span>Discount ({duration >= 6 ? "10%" : "5%"})</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div
            className={`${styles.plan_summary__price_row} ${styles.plan_summary__price_row_total}`}
          >
            <span>
              Total ({duration}{" "}
              {duration === 1
                ? planType === "weekly"
                  ? "week"
                  : "month"
                : planType === "weekly"
                  ? "weeks"
                  : "months"}
              )
            </span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className={styles.plan_summary__per_period}>
            <span>
              {planType === "weekly" ? "Weekly payment: " : "Monthly payment: "}
              {formatPrice(perPeriod)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Total Section */}
      {extendedServices.length > 0 && (
        <motion.div
          className={styles.plan_summary__total}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className={styles.plan_summary__total_label}>Plan Total</span>
          <div className={styles.plan_summary__total_value}>
            <span className={styles.plan_summary__total_price}>
              {formatPrice(total)}
            </span>
            <span className={styles.plan_summary__total_period}>
              {duration}{" "}
              {duration === 1
                ? planType === "weekly"
                  ? "week"
                  : "month"
                : planType === "weekly"
                  ? "weeks"
                  : "months"}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PlanSummary;
