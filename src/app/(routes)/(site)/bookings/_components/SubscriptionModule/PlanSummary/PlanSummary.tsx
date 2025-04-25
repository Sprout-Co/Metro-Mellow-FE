"use client";
import React, { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PlanSummary.module.scss";
import {
  BillingCycle,
  CreateSubscriptionInput,
  Service,
  ServiceId,
  ServiceCategory,
} from "@/graphql/api";
import { PlanType, DurationType } from "../SubscriptionModule";
import { Icon } from "@/components/ui/Icon/Icon";
import { useUIStore } from "@/store";
import EditServiceModal from "../EditServiceModal/EditServiceModal";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";

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
  const [editServiceModal, setEditServiceModal] = useState(false);
  const [subscriptionInput, setSubscriptionInput] =
    useState<CreateSubscriptionInput | null>(null);

  // Access the UI store to handle modals
  const { openModal } = useUIStore();

  // Add state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Get subscription operations hook
  const { handleCreateSubscription } = useSubscriptionOperations();

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
    // If we have subscription input with updated prices, use those
    if (subscriptionInput?.services) {
      const updatedService = subscriptionInput.services.find(
        (s) => s.serviceId === service._id
      );
      if (updatedService) {
        return updatedService.price;
      }
    }

    // Fallback to calculating price from service details
    const basePrice = service.price && service.price > 0 ? service.price : 5000;

    if (!service.details) return basePrice;

    const { type, details } = service;
    let price = basePrice;
    let frequency = 1;

    // Check if there's a selected option price to use instead of base price
    if (service.options && service.options.length > 0) {
      const selectedOptionId =
        type === "cleaning"
          ? (details as CleaningDetails).cleaningType
          : type === "food"
            ? (details as FoodDetails).foodPlanType
            : type === "laundry"
              ? (details as LaundryDetails).laundryType
              : undefined;

      if (selectedOptionId) {
        const selectedOption = service.options.find(
          (opt) =>
            opt.id === selectedOptionId ||
            opt.label.toLowerCase().includes(String(selectedOptionId))
        );

        if (selectedOption?.price && selectedOption.price > 0) {
          price = selectedOption.price;
        }
      }
    }

    // Get frequency based on service type
    switch (type) {
      case "cleaning": {
        const cleaningDetails = details as CleaningDetails;
        frequency = cleaningDetails.frequency;
        break;
      }
      case "food": {
        const foodDetails = details as FoodDetails;
        frequency = foodDetails.deliveryFrequency;
        break;
      }
      case "laundry": {
        const laundryDetails = details as LaundryDetails;
        frequency = laundryDetails.pickupFrequency;
        break;
      }
    }

    return Math.round(price * frequency);
  };

  // Update service prices whenever services, their details, or subscription input changes
  useEffect(() => {
    const newPrices: { [key: string]: number } = {};
    extendedServices.forEach((service) => {
      newPrices[service._id] = calculateServicePrice(service);
    });
    setServicePrices(newPrices);
  }, [extendedServices, subscriptionInput]);

  // Calculate subscription totals based on plan type and duration
  const calculateTotals = () => {
    // Calculate subtotal from individual service prices
    const subtotal = Object.values(servicePrices).reduce(
      (total, price) => total + price,
      0
    );

    // No duration discount is applied

    // Calculate final total
    const final = subtotal;

    return {
      subtotal,
      discount: 0, // No discount
      total: final,
      perPeriod: planType === "weekly" ? final / 4 : final, // Assuming 4 weeks per month for weekly plans
    };
  };

  const { subtotal, discount, total, perPeriod } = calculateTotals();

  // Format price to currency
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
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

  // Handle subscription creation
  const handleCreateSubscriptionPlan = async () => {
    if (extendedServices.length === 0) {
      setSubmissionError("Please select at least one service");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionError(null);

      if (subscriptionInput) {
        // Log the subscription input from the modal
        console.log("Creating subscription with input:", subscriptionInput);

        // Apply any additional properties from plan summary
        const finalSubscriptionInput = {
          ...subscriptionInput,
          billingCycle: planType.toUpperCase() as BillingCycle,
          duration: Number(duration),
          startDate: new Date().toISOString(),
          autoRenew: true,
        };

        console.log("Final subscription input:", finalSubscriptionInput);

        // Here you would typically call your API to create the subscription
        // await handleCreateSubscription(finalSubscriptionInput);

        // Show success message or redirect
        setTimeout(() => {
          setIsSubmitting(false);
          // You could add a success message here
        }, 1000);
      } else {
        // If no subscription input is available, prompt user to edit services first
        setSubmissionError("Please edit service details first");
        setIsSubmitting(false);
        setEditServiceModal(true);
      }
    } catch (error) {
      console.error("Failed to create subscription:", error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Failed to create subscription. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className={styles.plan_summary}>
        <div className={styles.plan_summary__header}>
          <h2 className={styles.plan_summary__title}>Your Plan Summary</h2>

          {/* Edit All Services Button */}
          {extendedServices.length > 0 && (
            <motion.button
              className={styles.plan_summary__edit_button}
              onClick={() => {
                setEditServiceModal(true);
              }}
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
                          ? (service.details as CleaningDetails)
                              .cleaningType === "standard"
                            ? "Standard Cleaning"
                            : (service.details as CleaningDetails)
                                  .cleaningType === "deep"
                              ? "Deep Cleaning"
                              : "Post Construction Cleaning"
                          : service.type === "food"
                            ? (service.details as FoodDetails).foodPlanType ===
                              "basic"
                              ? "Basic Plan"
                              : (service.details as FoodDetails)
                                    .foodPlanType === "standard"
                                ? "Standard Plan"
                                : "Premium Plan"
                            : (service.details as LaundryDetails)
                                  .laundryType === "wash-and-iron"
                              ? "Wash And Iron"
                              : "Wash And Fold"}
                      </p>
                    </div>
                    <div
                      className={styles.plan_summary__service_price_container}
                    >
                      <p className={styles.plan_summary__service_price}>
                        {formatPrice(servicePrices[service._id] || 0)}
                      </p>
                      <p className={styles.plan_summary__service_detail}>
                        {getFrequencyText(service)}
                      </p>
                    </div>
                  </div>

                  {/* Service Details Section */}
                  <div className={styles.plan_summary__service_details}>
                    {/* For Cleaning Services */}
                    {service.type === "cleaning" && (
                      <>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="home" size={14} /> Property:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as CleaningDetails).houseType ===
                            "flat"
                              ? "Flat/Apartment"
                              : "Duplex/House"}
                          </span>
                        </div>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="grid" size={14} /> Rooms:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {Object.entries(
                              (service.details as CleaningDetails).rooms
                            )
                              .filter(([_, count]) => count > 0)
                              .map(
                                ([room, count]) =>
                                  `${count} ${room}${count > 1 ? "s" : ""}`
                              )
                              .join(", ")}
                          </span>
                        </div>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="calendar" size={14} /> Day:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as CleaningDetails).day
                              .charAt(0)
                              .toUpperCase() +
                              (service.details as CleaningDetails).day.slice(1)}
                          </span>
                        </div>
                      </>
                    )}

                    {/* For Food Services */}
                    {service.type === "food" && (
                      <>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="coffee" size={14} /> Meal Plan:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as FoodDetails).foodPlanType
                              .charAt(0)
                              .toUpperCase() +
                              (
                                service.details as FoodDetails
                              ).foodPlanType.slice(1)}
                          </span>
                        </div>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="calendar" size={14} /> Delivery Days:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as FoodDetails).deliveryDays
                              .map(
                                (day) =>
                                  day.charAt(0).toUpperCase() + day.slice(1)
                              )
                              .join(", ")}
                          </span>
                        </div>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="package" size={14} /> Total Meals:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {Object.values(
                              (service.details as FoodDetails).mealsPerDay
                            ).reduce((sum, count) => sum + count, 0)}{" "}
                            meals/week
                          </span>
                        </div>
                      </>
                    )}

                    {/* For Laundry Services */}
                    {service.type === "laundry" && (
                      <>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="package" size={14} /> Bags:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as LaundryDetails).bags} (
                            {(service.details as LaundryDetails).bags * 30}{" "}
                            items)
                          </span>
                        </div>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="calendar" size={14} /> Pickup Days:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as LaundryDetails).pickupDays
                              .map(
                                (day) =>
                                  day.charAt(0).toUpperCase() + day.slice(1)
                              )
                              .join(", ")}
                          </span>
                        </div>
                        <div className={styles.plan_summary__detail_item}>
                          <span className={styles.plan_summary__detail_label}>
                            <Icon name="repeat" size={14} /> Service Type:
                          </span>
                          <span className={styles.plan_summary__detail_value}>
                            {(service.details as LaundryDetails).laundryType ===
                            "wash-and-iron"
                              ? "Wash & Iron"
                              : "Wash & Fold"}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Edit Button */}
                    <button
                      className={styles.plan_summary__service_edit}
                      onClick={() => setEditServiceModal(true)}
                    >
                      <Icon name="edit" size={14} /> Edit
                    </button>
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
                {planType === "weekly"
                  ? "Weekly payment: "
                  : "Monthly payment: "}
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

        {/* Action Buttons */}
        {extendedServices.length > 0 && (
          <div className={styles.summary__actions}>
            <button
              className={styles.summary__createButton}
              onClick={handleCreateSubscriptionPlan}
              disabled={isSubmitting || extendedServices.length === 0}
            >
              {isSubmitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
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
            </button>
          </div>
        )}

        {submissionError && (
          <div className={styles.summary__error}>
            <Icon name="alert-circle" />
            <span>{submissionError}</span>
          </div>
        )}
      </div>

      <EditServiceModal
        onClose={() => setEditServiceModal(false)}
        selectedServices={selectedServices}
        isOpen={editServiceModal}
        onUpdateService={onUpdateService}
        duration={duration}
        onSubscriptionInputChange={(input) => setSubscriptionInput(input)}
      />
    </Fragment>
  );
};

export default PlanSummary;
