import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PlanSummary.module.scss";
import ServiceEditor from "./ServiceEditor/ServiceEditor";
import { ServiceType, PlanType, DurationType } from "../SubscriptionModule";

// Type definitions for pricing configuration
type CleaningType = "standard" | "deep" | "post";
type RoomType =
  | "bedroom"
  | "livingRoom"
  | "bathroom"
  | "kitchen"
  | "balcony"
  | "studyRoom";
type FoodPlanType = "basic" | "standard" | "premium";
type LaundryType = "wash-and-fold" | "wash-and-iron";
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

interface ServiceTypeExtended extends ServiceType {
  id: string;
  name: string;
  icon: string;
  type: "cleaning" | "food" | "laundry";
  details: any;
}

const mock = [
  {
    id: "cleaning-1",
    name: "Cleaning Service",
    icon: "🧹",
    type: "cleaning",
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
    id: "food-1",
    name: "Food Service",
    icon: "🍳",
    type: "food",
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
];

type PlanSummaryProps = {
  selectedServices: ServiceType[];
  totalPrice?: number;
  planType?: PlanType;
  duration?: DurationType;
  onUpdateService?: (serviceId: string, details: any) => void;
};

const PlanSummary: React.FC<PlanSummaryProps> = ({
  selectedServices,
  totalPrice = 0,
  planType = "weekly",
  duration = 2,
  onUpdateService,
}) => {
  const [services, setServices] = useState<ServiceType[]>(selectedServices);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null
  );
  const [servicePrices, setServicePrices] = useState<{ [key: string]: number }>(
    {}
  );

  // Calculate individual service prices
  const calculateServicePrice = (service: ServiceType): number => {
    const { type, details } = service;

    if (!details) return service.minPrice || 0;

    let price = 0;

    switch (type) {
      case "cleaning":
        // Base price
        price += PRICING_CONFIG.cleaning.basePrice;

        // Add cost based on cleaning type
        if (details.cleaningType) {
          const cleaningType = details.cleaningType as CleaningType;
          price += PRICING_CONFIG.cleaning.cleaningTypes[cleaningType] || 0;
        }

        // Add cost based on room counts
        if (details.rooms) {
          Object.entries(details.rooms).forEach(([roomType, count]) => {
            const room = roomType as RoomType;
            if (room in PRICING_CONFIG.cleaning.roomPrices && count) {
              price +=
                PRICING_CONFIG.cleaning.roomPrices[room] * (count as number);
            }
          });
        }

        // Apply frequency multiplier
        if (details.frequency) {
          const frequency = details.frequency as FrequencyMultiplier;
          if (frequency in PRICING_CONFIG.cleaning.frequencyMultiplier) {
            price = Math.round(
              price * PRICING_CONFIG.cleaning.frequencyMultiplier[frequency]
            );
          }
        }
        break;

      case "food":
        // Base price
        price += PRICING_CONFIG.food.basePrice;

        // Add cost based on food plan type
        if (details.foodPlanType) {
          const foodPlanType = details.foodPlanType as FoodPlanType;
          price += PRICING_CONFIG.food.foodPlanTypes[foodPlanType] || 0;
        }

        // Add cost based on meals per day
        if (details.mealsPerDay) {
          let totalMeals = 0;
          Object.values(details.mealsPerDay).forEach((mealCount) => {
            if (typeof mealCount === "number") {
              totalMeals += mealCount;
            }
          });
          price += PRICING_CONFIG.food.mealsPerDayPrice * totalMeals;
        }

        // Apply delivery frequency multiplier
        if (details.deliveryFrequency) {
          const deliveryFrequency =
            details.deliveryFrequency as FrequencyMultiplier;
          if (
            deliveryFrequency in PRICING_CONFIG.food.deliveryFrequencyMultiplier
          ) {
            price = Math.round(
              price *
                PRICING_CONFIG.food.deliveryFrequencyMultiplier[
                  deliveryFrequency
                ]
            );
          }
        }
        break;

      case "laundry":
        // Base price
        price += PRICING_CONFIG.laundry.basePrice;

        // Add cost based on laundry type
        if (details.laundryType) {
          const laundryType = details.laundryType as LaundryType;
          price += PRICING_CONFIG.laundry.laundryTypes[laundryType] || 0;
        }

        // Add cost based on bag count
        if (typeof details.bags === "number") {
          price += PRICING_CONFIG.laundry.bagPrice * details.bags;
        }

        // Apply pickup frequency multiplier
        if (details.pickupFrequency) {
          const pickupFrequency =
            details.pickupFrequency as LaundryFrequencyMultiplier;
          if (
            pickupFrequency in PRICING_CONFIG.laundry.pickupFrequencyMultiplier
          ) {
            price = Math.round(
              price *
                PRICING_CONFIG.laundry.pickupFrequencyMultiplier[
                  pickupFrequency
                ]
            );
          }
        }
        break;

      default:
        price = service.minPrice || 0;
    }

    return Math.round(price); // Ensure we always return a rounded number
  };

  // Update service prices whenever services or their details change
  useEffect(() => {
    const newPrices: { [key: string]: number } = {};
    services.forEach((service) => {
      newPrices[service.id] = calculateServicePrice(service);
    });
    setServicePrices(newPrices);
  }, [services, JSON.stringify(services.map((s) => s.details))]);

  // Toggle service accordion
  const toggleServiceAccordion = (serviceId: string) => {
    setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
  };

  // Save service changes
  const handleSaveService = (serviceId: string, serviceData: any) => {
    const updatedServices = services.map((service) =>
      service.id === serviceId
        ? { ...service, details: { ...service.details, ...serviceData } }
        : service
    );

    setServices(updatedServices);
    setExpandedServiceId(null);

    // If parent component provided an update handler, call it
    if (onUpdateService) {
      onUpdateService(serviceId, serviceData);
    }
  };

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
    return `₦${(price / 100).toLocaleString()}`;
  };

  useEffect(() => {
    setServices(selectedServices);
  }, [selectedServices]);

  return (
    <div className={styles.plan_summary}>
      <h2 className={styles.plan_summary__title}>Your Plan Summary</h2>

      {/* Services List */}
      <div className={styles.plan_summary__services}>
        {services.map((service) => (
          <div key={service.id} className={styles.plan_summary__service}>
            <div
              className={`${styles.plan_summary__service_header} ${expandedServiceId === service.id ? styles.plan_summary__service_header_active : ""}`}
              onClick={() => toggleServiceAccordion(service.id)}
            >
              <div className={styles.plan_summary__service_icon}>
                <span>{service.icon}</span>
              </div>
              <div className={styles.plan_summary__service_info}>
                <h3 className={styles.plan_summary__service_name}>
                  {service.name}
                </h3>
                <p className={styles.plan_summary__service_type}>
                  {service.type === "cleaning"
                    ? service.details.cleaningType === "standard"
                      ? "Standard Cleaning"
                      : service.details.cleaningType === "deep"
                        ? "Deep Cleaning"
                        : "Post Construction Cleaning"
                    : service.type === "food"
                      ? service.details.foodPlanType === "basic"
                        ? "Basic Plan"
                        : "Standard Plan"
                      : service.details.laundryType === "wash-and-iron"
                        ? "Wash And Iron"
                        : "Wash And Fold"}
                </p>
              </div>
              <div className={styles.plan_summary__service_price_container}>
                <p className={styles.plan_summary__service_price}>
                  {formatPrice(servicePrices[service.id] || 0)}
                </p>
                <span className={styles.plan_summary__accordion_icon}>
                  {expandedServiceId === service.id ? "▲" : "▼"}
                </span>
              </div>
            </div>

            {/* Accordion content */}
            <AnimatePresence>
              {expandedServiceId === service.id && (
                <motion.div
                  className={styles.plan_summary__service_editor}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceEditor
                    serviceType={service.type}
                    onClose={() => setExpandedServiceId(null)}
                    onSave={(data) => handleSaveService(service.id, data)}
                    initialData={service.details}
                    accordionMode={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Pricing Summary */}
      {services.length > 0 && (
        <div className={styles.plan_summary__pricing}>
          <div className={styles.plan_summary__price_row}>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className={styles.plan_summary__price_row}>
              <span>Discount (Duration)</span>
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
              Billed as {formatPrice(perPeriod)} per{" "}
              {planType === "weekly" ? "week" : "month"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSummary;
