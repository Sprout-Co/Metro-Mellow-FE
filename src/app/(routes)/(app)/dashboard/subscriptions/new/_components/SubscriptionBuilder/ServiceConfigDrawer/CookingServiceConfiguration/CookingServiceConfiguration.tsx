"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import styles from "./CookingServiceConfiguration.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import ValidationErrors from "../../ValidationErrors/ValidationErrors";
import {
  Service,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  SubscriptionServiceInput,
  MealType,
  ServiceId,
} from "@/graphql/api";
import {
  validateServiceConfiguration,
  ValidationError,
} from "../../validation";

function pickPreferredCookingTimeSlot(c: SubscriptionServiceInput): TimeSlot {
  const order = c.scheduledDays || [];
  const meals = c.serviceDetails.cooking?.mealsPerDelivery || [];
  for (const d of order) {
    const m = meals.find((x) => x.day === d && x.count > 0);
    if (m) return m.timeSlot;
  }
  const anyWithMeals = meals.find((m) => m.count > 0);
  if (anyWithMeals) return anyWithMeals.timeSlot;
  return c.preferredTimeSlot || TimeSlot.Morning;
}

interface CookingServiceConfigurationProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  existingConfiguration?: SubscriptionServiceInput;
  onSave: (configuration: SubscriptionServiceInput) => void;
  onProceedToCheckout?: (configuration: SubscriptionServiceInput) => void;
}

const CookingServiceConfiguration: React.FC<
  CookingServiceConfigurationProps
> = ({ isOpen, onClose, service, existingConfiguration, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [configuration, setConfiguration] = useState<SubscriptionServiceInput>({
    serviceId: service._id,
    frequency: SubscriptionFrequency.Weekly,
    scheduledDays: [],
    preferredTimeSlot: TimeSlot.Morning,
    price: service.price,
    category: service.category,
    serviceDetails: {
      cooking: {
        mealType: MealType.Basic,
        mealsPerDelivery: [
          { day: ScheduleDays.Monday, count: 1, timeSlot: TimeSlot.Morning },
          { day: ScheduleDays.Tuesday, count: 1, timeSlot: TimeSlot.Morning },
          { day: ScheduleDays.Wednesday, count: 1, timeSlot: TimeSlot.Morning },
          { day: ScheduleDays.Thursday, count: 1, timeSlot: TimeSlot.Morning },
          { day: ScheduleDays.Friday, count: 1, timeSlot: TimeSlot.Morning },
          { day: ScheduleDays.Saturday, count: 1, timeSlot: TimeSlot.Morning },
          { day: ScheduleDays.Sunday, count: 1, timeSlot: TimeSlot.Morning },
        ],
      },
      serviceOption:
        service.options?.[0]?.service_id || ServiceId.StandardCooking,
    },
  });

  const steps = [
    { id: "schedule", label: "Schedule" },
    { id: "summary", label: "Review" },
  ];

  const daysOfWeek = [
    { value: ScheduleDays.Monday, label: "Mon" },
    { value: ScheduleDays.Tuesday, label: "Tue" },
    { value: ScheduleDays.Wednesday, label: "Wed" },
    { value: ScheduleDays.Thursday, label: "Thu" },
    { value: ScheduleDays.Friday, label: "Fri" },
    { value: ScheduleDays.Saturday, label: "Sat" },
    // { value: ScheduleDays.Sunday, label: "Sun" },
  ];

  const timeSlots = [
    {
      value: TimeSlot.Morning,
      label: "Morning",
      time: "8AM - 12PM",
      icon: "🌅",
    },
    {
      value: TimeSlot.Afternoon,
      label: "Afternoon",
      time: "12PM - 4PM",
      icon: "☀️",
    },
    {
      value: TimeSlot.Evening,
      label: "Evening",
      time: "4PM - 8PM",
      icon: "🌆",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
      setValidationErrors([]);
      setShowValidationErrors(false);
      if (existingConfiguration) {
        setConfiguration({
          ...existingConfiguration,
          frequency: SubscriptionFrequency.Weekly,
        });
      }
    }
  }, [isOpen, existingConfiguration]);

  const updateMealCount = (day: ScheduleDays, count: number) => {
    setConfiguration((prev) => {
      const currentMeals = prev.serviceDetails.cooking?.mealsPerDelivery || [];
      const existingIndex = currentMeals.findIndex((meal) => meal.day === day);

      let updatedMeals;
      if (count === 0) {
        updatedMeals = currentMeals.filter((meal) => meal.day !== day);
      } else if (existingIndex >= 0) {
        updatedMeals = currentMeals.map((meal, index) =>
          index === existingIndex ? { ...meal, count } : meal,
        );
      } else {
        updatedMeals = [
          ...currentMeals,
          {
            day,
            count,
            timeSlot: pickPreferredCookingTimeSlot(prev),
          },
        ];
      }

      const next: SubscriptionServiceInput = {
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          cooking: {
            mealType: prev.serviceDetails.cooking?.mealType || MealType.Basic,
            mealsPerDelivery: updatedMeals,
          },
        },
      };
      return {
        ...next,
        preferredTimeSlot: pickPreferredCookingTimeSlot(next),
      };
    });
  };

  const updateMealTimeSlot = (day: ScheduleDays, timeSlot: TimeSlot) => {
    setConfiguration((prev) => {
      const currentMeals = prev.serviceDetails.cooking?.mealsPerDelivery || [];
      const existingIndex = currentMeals.findIndex((meal) => meal.day === day);
      if (existingIndex < 0) return prev;

      const updatedMeals = currentMeals.map((meal, index) =>
        index === existingIndex ? { ...meal, timeSlot } : meal,
      );

      const next: SubscriptionServiceInput = {
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          cooking: {
            mealType: prev.serviceDetails.cooking?.mealType || MealType.Basic,
            mealsPerDelivery: updatedMeals,
          },
        },
      };
      return {
        ...next,
        preferredTimeSlot: pickPreferredCookingTimeSlot(next),
      };
    });
  };

  const getMealCountForDay = (day: ScheduleDays): number => {
    const meals = configuration.serviceDetails.cooking?.mealsPerDelivery || [];
    const meal = meals.find((m) => m.day === day);
    return meal?.count || 0;
  };

  const getTimeSlotForDay = (day: ScheduleDays): TimeSlot => {
    const meals = configuration.serviceDetails.cooking?.mealsPerDelivery || [];
    const meal = meals.find((m) => m.day === day);
    return (
      meal?.timeSlot ?? configuration.preferredTimeSlot ?? TimeSlot.Morning
    );
  };

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => {
      const currentDays = prev.scheduledDays || [];
      const isSelected = currentDays.includes(day);
      const scheduledDays = isSelected
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];

      let mealsPerDelivery =
        prev.serviceDetails.cooking?.mealsPerDelivery || [];
      if (isSelected) {
        mealsPerDelivery = mealsPerDelivery.filter((m) => m.day !== day);
      }

      const next: SubscriptionServiceInput = {
        ...prev,
        scheduledDays,
        serviceDetails: {
          ...prev.serviceDetails,
          cooking: prev.serviceDetails.cooking
            ? {
                ...prev.serviceDetails.cooking,
                mealsPerDelivery,
              }
            : prev.serviceDetails.cooking,
        },
      };
      return {
        ...next,
        preferredTimeSlot: pickPreferredCookingTimeSlot(next),
      };
    });
  };

  const calculatePrice = useMemo(() => {
    const selectedOption = configuration.serviceDetails.serviceOption;
    let totalPrice =
      service.options?.find((opt) => opt.service_id === selectedOption)
        ?.price || 0;
    const totalMeals =
      configuration.serviceDetails.cooking?.mealsPerDelivery?.reduce(
        (sum, delivery) => sum + delivery.count,
        0,
      ) || 0;

    totalPrice *= totalMeals;

    return totalPrice * 4;
  }, [configuration, service]);

  useEffect(() => {
    setConfiguration((prev) => ({ ...prev, price: calculatePrice }));
  }, [calculatePrice]);

  const validateCurrentStep = () => {
    const validation = validateServiceConfiguration(configuration, service);
    setValidationErrors(validation.errors);
    setShowValidationErrors(!validation.isValid);
    return validation;
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return (
          configuration.scheduledDays && configuration.scheduledDays.length > 0
        );
      case 1:
        return true;
      default:
        return false;
    }
  };

  const handleSave = () => {
    onSave(configuration);
    onClose();
  };

  const getTotalWeeklyMeals = () => {
    return (
      configuration.serviceDetails.cooking?.mealsPerDelivery?.reduce(
        (sum, delivery) => sum + delivery.count,
        0,
      ) || 0
    );
  };

  // Step 1: Schedule
  const renderScheduleStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Schedule</h3>
        <p>Select delivery days and meals</p>
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Delivery Days</label>
        <div className={styles.drawer__daysGrid}>
          {daysOfWeek.map((day) => (
            <button
              key={day.value}
              className={`${styles.drawer__dayCard} ${
                configuration.scheduledDays?.includes(day.value)
                  ? styles["drawer__dayCard--active"]
                  : ""
              }`}
              onClick={() => toggleDay(day.value)}
            >
              <span className={styles.drawer__dayShort}>{day.label}</span>
            </button>
          ))}
        </div>
      </div>

      {configuration.scheduledDays &&
        configuration.scheduledDays.length > 0 && (
          <div className={styles.drawer__section}>
            <label className={styles.drawer__label}>
              Meals &amp; delivery time
            </label>
            <p className={styles.drawer__mealScheduleHint}>
              Set how many meals you want each day, then pick a delivery window
              for that day.
            </p>
            <div className={styles.drawer__mealsListStack}>
              {daysOfWeek
                .filter((d) => configuration.scheduledDays?.includes(d.value))
                .map((day) => {
                  const count = getMealCountForDay(day.value);
                  const activeSlot = getTimeSlotForDay(day.value);
                  return (
                    <div key={day.value} className={styles.drawer__mealDayRow}>
                      <div className={styles.drawer__mealDayHeader}>
                        <span className={styles.drawer__dayShort}>
                          {day.label}
                        </span>
                        <div className={styles.drawer__mealCounter}>
                          <button
                            type="button"
                            onClick={() =>
                              updateMealCount(day.value, Math.max(0, count - 1))
                            }
                            disabled={count === 0}
                          >
                            −
                          </button>
                          <span>{count}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateMealCount(day.value, count + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <span className={styles.drawer__mealTimeLabel}>
                        Delivery time
                      </span>
                      <div className={styles.drawer__timePills}>
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            disabled={count === 0}
                            title={
                              count === 0
                                ? "Add at least one meal to choose a time"
                                : slot.time
                            }
                            className={`${styles.drawer__timePill} ${
                              activeSlot === slot.value
                                ? styles["drawer__timePill--active"]
                                : ""
                            }`}
                            onClick={() =>
                              updateMealTimeSlot(day.value, slot.value)
                            }
                          >
                            <span className={styles.drawer__timePillIcon}>
                              {slot.icon}
                            </span>
                            <span className={styles.drawer__timePillLabel}>
                              {slot.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
    </motion.div>
  );

  // Step 2: Summary
  const renderSummaryStep = () => {
    const selectedOption = service.options?.find(
      (opt) => opt.service_id === configuration.serviceDetails.serviceOption,
    );
    const selectedDays = configuration.scheduledDays || [];
    const totalWeeklyMeals = getTotalWeeklyMeals();
    const mealsByDay = (
      configuration.serviceDetails.cooking?.mealsPerDelivery || []
    )
      .filter((m) => m.count > 0)
      .map((m) => {
        const dayInfo = daysOfWeek.find((d) => d.value === m.day);
        const slotInfo = timeSlots.find((t) => t.value === m.timeSlot);
        return {
          ...m,
          label: dayInfo?.label || m.day,
          timeLabel: slotInfo?.label || m.timeSlot,
        };
      });

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.drawer__stepContent}
      >
        <div className={styles.drawer__stepHeader}>
          <h3>Review</h3>
          <p>Confirm your selections</p>
        </div>

        {selectedOption && (
          <div className={styles.summary__section}>
            <h4 className={styles.summary__sectionTitle}>Package</h4>
            <div className={styles.summary__row}>
              <span className={styles.summary__label}>
                {selectedOption.label}
              </span>
              <span className={styles.summary__value}>
                ₦{selectedOption.price.toLocaleString()}/meal
              </span>
            </div>
          </div>
        )}

        <div className={styles.summary__section}>
          <h4 className={styles.summary__sectionTitle}>Schedule</h4>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Frequency</span>
            <span className={styles.summary__value}>Weekly</span>
          </div>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Days</span>
            <div className={styles.summary__days}>
              {selectedDays.map((day) => {
                const d = daysOfWeek.find((x) => x.value === day);
                return (
                  <span key={day} className={styles.summary__dayPill}>
                    {d?.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.summary__section}>
          <h4 className={styles.summary__sectionTitle}>Meals</h4>
          <div className={styles.summary__mealsList}>
            {mealsByDay.map((meal) => (
              <div key={meal.day} className={styles.summary__mealItem}>
                <span>{meal.label}</span>
                <span>
                  {meal.count} meal{meal.count !== 1 ? "s" : ""} ·{" "}
                  {meal.timeLabel}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Total Weekly</span>
            <span className={styles.summary__value}>
              {totalWeeklyMeals} meals
            </span>
          </div>
        </div>

        <div className={styles.summary__priceRow}>
          <span className={styles.summary__priceLabel}>Monthly Total</span>
          <span className={styles.summary__priceValue}>
            ₦{calculatePrice.toLocaleString()}
          </span>
        </div>
      </motion.div>
    );
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderScheduleStep();
      case 1:
        return renderSummaryStep();
      default:
        return null;
    }
  };

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
      addContentPadding={false}
    >
      <div className={styles.drawer}>
        <div className={styles.drawer__header}>
          <div className={styles.drawer__headerContent}>
            <h2>{service.name}</h2>
            <p>Configure your service</p>
          </div>
          <button onClick={onClose} className={styles.drawer__closeBtn}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.drawer__progress}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`${styles.drawer__progressStep} ${
                index === activeStep
                  ? styles["drawer__progressStep--active"]
                  : ""
              } ${index < activeStep ? styles["drawer__progressStep--completed"] : ""}`}
            >
              <div className={styles.drawer__progressDot} />
              <span className={styles.drawer__progressLabel}>{step.label}</span>
            </div>
          ))}
        </div>

        {showValidationErrors && validationErrors.length > 0 && (
          <ValidationErrors
            errors={validationErrors}
            onDismiss={() => setShowValidationErrors(false)}
          />
        )}

        <div className={styles.drawer__content}>
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>

        <div className={styles.drawer__footer}>
          <div className={styles.drawer__footerPrice}>
            <span>Total:</span>
            <strong>₦{calculatePrice.toLocaleString()}</strong>
          </div>
          <div className={styles.drawer__footerActions}>
            <button
              className={styles.drawer__backBtn}
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              <ChevronLeft size={16} />
              Back
            </button>
            {activeStep < steps.length - 1 ? (
              <button
                className={styles.drawer__nextBtn}
                onClick={() => {
                  if (canProceed()) {
                    setActiveStep(activeStep + 1);
                    setShowValidationErrors(false);
                  } else {
                    validateCurrentStep();
                  }
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className={styles.drawer__saveBtn}
                onClick={() => {
                  const validation = validateCurrentStep();
                  if (validation.isValid) {
                    handleSave();
                  }
                }}
              >
                <Check size={16} />
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default CookingServiceConfiguration;
