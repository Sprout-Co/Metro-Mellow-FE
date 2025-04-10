"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PlanSummary.module.scss";
import ServiceEditor from "./ServiceEditor/ServiceEditor";
import { Service } from "@/graphql/api";
import { PlanType, DurationType } from "../SubscriptionModule";
import { useUIStore } from "@/store";

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

interface ExtendedService extends Service {
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
  selectedServices: ExtendedService[];
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
  const [services, setServices] = useState<ExtendedService[]>(selectedServices);
  const [servicePrices, setServicePrices] = useState<{ [key: string]: number }>(
    {}
  );
  const { openModal } = useUIStore();

  // Calculate individual service prices
  const calculateServicePrice = (service: ExtendedService): number => {
    const { type, details } = service;

    if (!details) return service.price || 0;

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
        price = service.price || 0;
    }

    return Math.round(price); // Ensure we always return a rounded number
  };

  // Update service prices whenever services or their details change
  useEffect(() => {
    const newPrices: { [key: string]: number } = {};
    services.forEach((service) => {
      newPrices[service._id] = calculateServicePrice(service);
    });
    setServicePrices(newPrices);
  }, [services, JSON.stringify(services.map((s) => s.details))]);

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

  useEffect(() => {
    setServices(selectedServices);
  }, [selectedServices]);

  return (
    <div className={styles.plan_summary}>
      <div className={styles.plan_summary__header}>
        <h2 className={styles.plan_summary__title}>Your Plan Summary</h2>
        <button
          className={styles.plan_summary__edit_button}
          onClick={() =>
            openModal("craft-subscription", { selectedServices: services })
          }
        >
          Edit Services
        </button>
      </div>

      {/* Services List */}
      <div className={styles.plan_summary__services}>
        {services.map((service) => (
          <div key={service._id} className={styles.plan_summary__service}>
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
                {service.type === "cleaning" && service.details.rooms && (
                  <div className={styles.plan_summary__service_details}>
                    {Object.entries(service.details.rooms).map(
                      ([room, count]) =>
                        (count as number) > 0 && (
                          <span
                            key={room}
                            className={styles.plan_summary__service_detail}
                          >
                            {count as number} {room}
                          </span>
                        )
                    )}
                  </div>
                )}
                {service.type === "food" && (
                  <div className={styles.plan_summary__service_details}>
                    <div className={styles.plan_summary__detail_row}>
                      <span className={styles.plan_summary__detail_label}>
                        Delivery frequency
                      </span>
                      <span className={styles.plan_summary__detail_value}>
                        {service.details.deliveryFrequency === 1
                          ? "Once a week"
                          : service.details.deliveryFrequency === 2
                            ? "Twice a week"
                            : service.details.deliveryFrequency === 3
                              ? "Three times a week"
                              : service.details.deliveryFrequency === 4
                                ? "Four times a week"
                                : service.details.deliveryFrequency === 5
                                  ? "Five times a week"
                                  : service.details.deliveryFrequency === 6
                                    ? "Six times a week"
                                    : "Daily"}
                      </span>
                    </div>
                    <div className={styles.plan_summary__detail_row}>
                      <span className={styles.plan_summary__detail_label}>
                        Meals Per Delivery
                      </span>
                      <span className={styles.plan_summary__detail_value}>
                        {Object.entries(service.details.mealsPerDay)
                          .map(
                            ([day, count]) =>
                              (count as number) > 0 && `${count} on ${day}`
                          )
                          .join(", ")}
                      </span>
                    </div>
                    <div className={styles.plan_summary__detail_row}>
                      <span className={styles.plan_summary__detail_label}>
                        Delivery Day(s)
                      </span>
                      <span className={styles.plan_summary__detail_value}>
                        {service.details.deliveryDays?.join(", ")}
                      </span>
                    </div>
                  </div>
                )}
                {service.type === "laundry" && service.details.bags && (
                  <div className={styles.plan_summary__service_details}>
                    <span className={styles.plan_summary__service_detail}>
                      {service.details.bags} bags
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.plan_summary__service_price_container}>
                <p className={styles.plan_summary__service_price}>
                  {formatPrice(servicePrices[service._id] || 0)}
                </p>
              </div>
            </div>
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
