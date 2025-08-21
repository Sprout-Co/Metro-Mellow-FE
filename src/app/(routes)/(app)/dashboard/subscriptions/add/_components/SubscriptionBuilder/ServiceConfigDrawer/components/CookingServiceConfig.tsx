import React from "react";
import { motion } from "framer-motion";
import { MealType, ScheduleDays, SubscriptionServiceInput } from "@/graphql/api";
import { hasFieldError, ValidationError } from "../../validation";
import styles from "../ServiceConfigDrawer.module.scss";

interface CookingServiceConfigProps {
  configuration: SubscriptionServiceInput;
  onUpdate: (update: Partial<SubscriptionServiceInput>) => void;
  validationErrors: ValidationError[];
}

const CookingServiceConfig: React.FC<CookingServiceConfigProps> = ({
  configuration,
  onUpdate,
  validationErrors,
}) => {
  const mealTypes = [
    {
      value: MealType.Basic,
      label: "Basic Meals",
      description: "Simple, nutritious home-style cooking",
      icon: "🍳",
    },
    {
      value: MealType.Standard,
      label: "Standard Meals",
      description: "Varied menu with premium ingredients",
      icon: "🍽️",
      popular: true,
    },
  ];

  const daysOfWeek = [
    { value: ScheduleDays.Monday, label: "Monday", short: "Mon" },
    { value: ScheduleDays.Tuesday, label: "Tuesday", short: "Tue" },
    { value: ScheduleDays.Wednesday, label: "Wednesday", short: "Wed" },
    { value: ScheduleDays.Thursday, label: "Thursday", short: "Thu" },
    { value: ScheduleDays.Friday, label: "Friday", short: "Fri" },
    { value: ScheduleDays.Saturday, label: "Saturday", short: "Sat" },
    { value: ScheduleDays.Sunday, label: "Sunday", short: "Sun" },
  ];

  const updateMealCount = (day: ScheduleDays, count: number) => {
    const currentMeals = configuration.serviceDetails.cooking?.mealsPerDelivery || [];
    const existingIndex = currentMeals.findIndex((meal) => meal.day === day);

    let updatedMeals;
    if (count === 0) {
      updatedMeals = currentMeals.filter((meal) => meal.day !== day);
    } else if (existingIndex >= 0) {
      updatedMeals = currentMeals.map((meal, index) =>
        index === existingIndex ? { ...meal, count } : meal
      );
    } else {
      updatedMeals = [...currentMeals, { day, count }];
    }

    onUpdate({
      serviceDetails: {
        ...configuration.serviceDetails,
        cooking: {
          mealType: configuration.serviceDetails.cooking?.mealType || MealType.Basic,
          mealsPerDelivery: updatedMeals,
        },
      },
    });
  };

  const getMealCountForDay = (day: ScheduleDays): number => {
    const meals = configuration.serviceDetails.cooking?.mealsPerDelivery || [];
    const meal = meals.find((m) => m.day === day);
    return meal?.count || 0;
  };

  return (
    <>
      {/* Meal Type Selection */}
      <div className={styles.drawer__section}>
        <label
          className={`${styles.drawer__label} ${
            hasFieldError(validationErrors, "mealType")
              ? styles["drawer__label--error"]
              : ""
          }`}
        >
          Meal Plan Type <span className={styles.drawer__required}>*</span>
        </label>
        <div
          className={`${styles.drawer__optionsGrid} ${
            hasFieldError(validationErrors, "mealType")
              ? styles["drawer__optionsGrid--error"]
              : ""
          }`}
        >
          {mealTypes.map((mealType) => (
            <motion.button
              key={mealType.value}
              className={`${styles.drawer__optionCard} ${
                configuration.serviceDetails.cooking?.mealType === mealType.value
                  ? styles["drawer__optionCard--active"]
                  : ""
              }`}
              onClick={() =>
                onUpdate({
                  serviceDetails: {
                    ...configuration.serviceDetails,
                    cooking: {
                      ...configuration.serviceDetails.cooking,
                      mealType: mealType.value,
                      mealsPerDelivery:
                        configuration.serviceDetails.cooking?.mealsPerDelivery || [],
                    },
                  },
                })
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mealType.popular && (
                <span className={styles.drawer__popularTag}>Most Popular</span>
              )}
              <span className={styles.drawer__mealIcon}>{mealType.icon}</span>
              <h4>{mealType.label}</h4>
              <p>{mealType.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Meal Deliveries Configuration */}
      <div className={styles.drawer__section}>
        <label
          className={`${styles.drawer__label} ${
            hasFieldError(validationErrors, "mealsPerDelivery")
              ? styles["drawer__label--error"]
              : ""
          }`}
        >
          Meals Per Delivery Day <span className={styles.drawer__required}>*</span>
        </label>
        <p className={styles.drawer__sectionDescription}>
          Select which days you want meals delivered and how many meals per day
        </p>
        <div
          className={`${styles.drawer__mealsGrid} ${
            hasFieldError(validationErrors, "mealsPerDelivery")
              ? styles["drawer__mealsGrid--error"]
              : ""
          }`}
        >
          {daysOfWeek.map((day) => (
            <div key={day.value} className={styles.drawer__mealCard}>
              <div className={styles.drawer__mealDayInfo}>
                <span className={styles.drawer__dayShort}>{day.short}</span>
                <span className={styles.drawer__dayFull}>{day.label}</span>
              </div>
              <div className={styles.drawer__mealCounter}>
                <button
                  onClick={() =>
                    updateMealCount(day.value, Math.max(0, getMealCountForDay(day.value) - 1))
                  }
                  disabled={getMealCountForDay(day.value) === 0}
                >
                  −
                </button>
                <span>{getMealCountForDay(day.value)}</span>
                <button
                  onClick={() =>
                    updateMealCount(day.value, getMealCountForDay(day.value) + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CookingServiceConfig;