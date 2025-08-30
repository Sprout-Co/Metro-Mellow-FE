"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Utensils,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  CreditCard,
  Shield,
  Package,
} from "lucide-react";
import styles from "../ServiceConfigDrawer.module.scss";
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
  CleaningType,
} from "@/graphql/api";
import {
  validateServiceConfiguration,
  ValidationError,
  hasFieldError,
} from "../../validation";

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
> = ({
  isOpen,
  onClose,
  service,
  existingConfiguration,
  onSave,
  onProceedToCheckout,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
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
          {
            day: ScheduleDays.Monday,
            count: 1,
          },
          {
            day: ScheduleDays.Tuesday,
            count: 1,
          },
          {
            day: ScheduleDays.Wednesday,
            count: 1,
          },
          {
            day: ScheduleDays.Thursday,
            count: 1,
          },
          {
            day: ScheduleDays.Friday,
            count: 1,
          },
          {
            day: ScheduleDays.Saturday,
            count: 1,
          },
          {
            day: ScheduleDays.Sunday,
            count: 1,
          },
        ],
      },
      serviceOption:
        service.options?.[0]?.service_id || ServiceId.StandardCooking,
    },
  });

  const steps = [
    { id: "details", label: "Details", icon: <Utensils size={18} /> },
    { id: "frequency", label: "Frequency", icon: <Calendar size={18} /> },
    { id: "schedule", label: "Schedule", icon: <Clock size={18} /> },
    { id: "summary", label: "Summary", icon: <Sparkles size={18} /> },
  ];

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

  const frequencies = [
    {
      value: SubscriptionFrequency.Weekly,
      label: "Weekly",
      description: "Service every week",
      popular: true,
    },
    {
      value: SubscriptionFrequency.BiWeekly,
      label: "Bi-Weekly",
      description: "Service every 2 weeks",
      popular: false,
    },
    {
      value: SubscriptionFrequency.Monthly,
      label: "Monthly",
      description: "Service once a month",
      popular: false,
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

  const timeSlots = [
    {
      value: TimeSlot.Morning,
      label: "Morning",
      time: "8:00 AM - 12:00 PM",
      icon: "🌅",
    },
    {
      value: TimeSlot.Afternoon,
      label: "Afternoon",
      time: "12:00 PM - 4:00 PM",
      icon: "☀️",
    },
    {
      value: TimeSlot.Evening,
      label: "Evening",
      time: "4:00 PM - 8:00 PM",
      icon: "🌆",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
      setValidationErrors([]);
      setShowValidationErrors(false);

      if (existingConfiguration) {
        setConfiguration(existingConfiguration);
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
          index === existingIndex ? { ...meal, count } : meal
        );
      } else {
        updatedMeals = [...currentMeals, { day, count }];
      }

      return {
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          cooking: {
            mealType: prev.serviceDetails.cooking?.mealType || MealType.Basic,
            // ...prev.serviceDetails.cooking,
            mealsPerDelivery: updatedMeals,
          },
        },
      };
    });
  };

  const getMealCountForDay = (day: ScheduleDays): number => {
    const meals = configuration.serviceDetails.cooking?.mealsPerDelivery || [];
    const meal = meals.find((m) => m.day === day);
    return meal?.count || 0;
  };

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => {
      const currentDays = prev.scheduledDays || [];
      const isCurrentlySelected = currentDays.includes(day);
      const shouldLimitToOneDay =
        prev.frequency === SubscriptionFrequency.Monthly;

      if (shouldLimitToOneDay) {
        if (isCurrentlySelected) {
          return {
            ...prev,
            scheduledDays: currentDays.filter((d) => d !== day),
          };
        } else {
          return { ...prev, scheduledDays: [day] };
        }
      } else {
        return {
          ...prev,
          scheduledDays: isCurrentlySelected
            ? currentDays.filter((d) => d !== day)
            : [...currentDays, day],
        };
      }
    });
  };

  const calculatePrice = () => {
    let basePrice = service.price;
    const daysCount = configuration.scheduledDays?.length || 0;

    if (configuration.serviceDetails.serviceOption && service.options) {
      const selectedOption = service.options.find(
        (opt) => opt.id === configuration.serviceDetails.serviceOption
      );
      if (selectedOption) {
        basePrice += selectedOption.price;
      }
    }

    let multiplier = 4;
    if (configuration.frequency === SubscriptionFrequency.BiWeekly) {
      multiplier = 2;
    } else if (configuration.frequency === SubscriptionFrequency.Monthly) {
      multiplier = 1;
    }

    return Math.round(basePrice * daysCount * multiplier);
  };

  useEffect(() => {
    setConfiguration((prev) => {
      if (
        prev.frequency === SubscriptionFrequency.Monthly &&
        prev.scheduledDays &&
        prev.scheduledDays.length > 1
      ) {
        return { ...prev, scheduledDays: [prev.scheduledDays[0]] };
      }
      return prev;
    });
  }, [configuration.frequency]);

  useEffect(() => {
    const price = calculatePrice();
    setConfiguration((prev) => ({ ...prev, price }));
  }, [
    configuration.scheduledDays,
    configuration.frequency,
    configuration.serviceDetails,
  ]);

  const validateCurrentStep = () => {
    const validation = validateServiceConfiguration(configuration, service);
    setValidationErrors(validation.errors);
    setShowValidationErrors(!validation.isValid);
    return validation;
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        if (service.options && service.options.length > 0) {
          const hasServiceOption = !!configuration.serviceDetails.serviceOption;
          if (!hasServiceOption) return false;
        }

        const hasMealType = !!configuration.serviceDetails.cooking?.mealType;
        const hasMealDeliveries =
          configuration.serviceDetails.cooking?.mealsPerDelivery &&
          configuration.serviceDetails.cooking.mealsPerDelivery.length > 0;
        return hasMealType && hasMealDeliveries;
      case 1:
        return configuration.frequency;
      case 2:
        return (
          configuration.scheduledDays && configuration.scheduledDays.length > 0
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleSave = () => {
    onSave(configuration);
    onClose();
  };

  const renderDetailsStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Cooking Service Details</h3>
        <p>Configure your meal delivery preferences</p>
      </div>

      {/* Service Options */}
      {service.options && service.options.length > 0 && (
        <div className={styles.drawer__section}>
          <label
            className={`${styles.drawer__label} ${
              hasFieldError(validationErrors, "serviceOption")
                ? styles["drawer__label--error"]
                : ""
            }`}
          >
            Service Package <span className={styles.drawer__required}>*</span>
          </label>
          <div className={styles.drawer__optionsGrid}>
            {service.options.map((option) => (
              <motion.button
                key={option.id}
                className={`${styles.drawer__optionCard} ${
                  configuration.serviceDetails.serviceOption ===
                  option.service_id
                    ? styles["drawer__optionCard--active"]
                    : ""
                }`}
                onClick={() =>
                  setConfiguration((prev) => ({
                    ...prev,
                    serviceDetails: {
                      ...prev.serviceDetails,
                      ...(prev.serviceDetails.cooking && {
                        cooking: {
                          ...prev.serviceDetails.cooking,
                          mealType: option.service_id as unknown as MealType,
                        },
                      }),
                      serviceOption: option.service_id,
                    },
                  }))
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4>{option.label}</h4>
                <p>{option.description}</p>
                <span className={styles.drawer__optionPrice}>
                  +₦{option.price.toLocaleString()}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Meal Type Selection */}
      {/* <div className={styles.drawer__section}>
        <label
          className={`${styles.drawer__label} ${
            hasFieldError(validationErrors, "mealType")
              ? styles["drawer__label--error"]
              : ""
          }`}
        >
          Meal Plan Type <span className={styles.drawer__required}>*</span>
        </label>
        <div className={styles.drawer__optionsGrid}>
          {mealTypes.map((mealType) => (
            <motion.button
              key={mealType.value}
              className={`${styles.drawer__optionCard} ${
                configuration.serviceDetails.cooking?.mealType ===
                mealType.value
                  ? styles["drawer__optionCard--active"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({
                  ...prev,
                  serviceDetails: {
                    ...prev.serviceDetails,
                    cooking: {
                      ...prev.serviceDetails.cooking,
                      mealType: mealType.value,
                      mealsPerDelivery:
                        prev.serviceDetails.cooking?.mealsPerDelivery || [],
                    },
                  },
                }))
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
      </div> */}

      {/* Meal Deliveries Configuration */}
      <div className={styles.drawer__section}>
        <label
          className={`${styles.drawer__label} ${
            hasFieldError(validationErrors, "mealsPerDelivery")
              ? styles["drawer__label--error"]
              : ""
          }`}
        >
          Meals Per Delivery Day{" "}
          <span className={styles.drawer__required}>*</span>
        </label>
        <p className={styles.drawer__sectionDescription}>
          Select which days you want meals delivered and how many meals per day
        </p>
        <div className={styles.drawer__mealsGrid}>
          {daysOfWeek.map((day) => (
            <div key={day.value} className={styles.drawer__mealCard}>
              <div className={styles.drawer__mealDayInfo}>
                <span className={styles.drawer__dayShort}>{day.short}</span>
                <span className={styles.drawer__dayFull}>{day.label}</span>
              </div>
              <div className={styles.drawer__mealCounter}>
                <button
                  onClick={() =>
                    updateMealCount(
                      day.value,
                      Math.max(0, getMealCountForDay(day.value) - 1)
                    )
                  }
                  disabled={getMealCountForDay(day.value) === 0}
                >
                  −
                </button>
                <span>{getMealCountForDay(day.value)}</span>
                <button
                  onClick={() =>
                    updateMealCount(
                      day.value,
                      getMealCountForDay(day.value) + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderFrequencyStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>How often do you need cooking service?</h3>
        <p>Choose the frequency that works best for you</p>
      </div>

      <div className={styles.drawer__frequencyGrid}>
        {frequencies.map((freq) => (
          <motion.button
            key={freq.value}
            className={`${styles.drawer__frequencyCard} ${
              configuration.frequency === freq.value
                ? styles["drawer__frequencyCard--active"]
                : ""
            }`}
            onClick={() =>
              setConfiguration((prev) => ({ ...prev, frequency: freq.value }))
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {freq.popular && (
              <span className={styles.drawer__popularTag}>Most Popular</span>
            )}
            <div className={styles.drawer__frequencyContent}>
              <h4>{freq.label}</h4>
              <p>{freq.description}</p>
            </div>
            {configuration.frequency === freq.value && (
              <motion.div
                className={styles.drawer__checkmark}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Check size={16} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderScheduleStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Set your delivery schedule</h3>
        <p>Select days and preferred time for meal delivery</p>
        {configuration.frequency === SubscriptionFrequency.Monthly && (
          <div className={styles.drawer__scheduleNote}>
            <p>📅 Monthly frequency allows only one delivery day per month</p>
          </div>
        )}
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>
          Select Delivery Days{" "}
          <span className={styles.drawer__required}>*</span>
        </label>
        <div className={styles.drawer__daysGrid}>
          {daysOfWeek.map((day) => (
            <motion.button
              key={day.value}
              className={`${styles.drawer__dayCard} ${
                configuration.scheduledDays?.includes(day.value)
                  ? styles["drawer__dayCard--active"]
                  : ""
              }`}
              onClick={() => toggleDay(day.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.drawer__dayShort}>{day.short}</span>
              <span className={styles.drawer__dayFull}>{day.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Preferred Delivery Time</label>
        <div className={styles.drawer__timeGrid}>
          {timeSlots.map((slot) => (
            <motion.button
              key={slot.value}
              className={`${styles.drawer__timeCard} ${
                configuration.preferredTimeSlot === slot.value
                  ? styles["drawer__timeCard--active"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({
                  ...prev,
                  preferredTimeSlot: slot.value,
                }))
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={styles.drawer__timeIcon}>{slot.icon}</span>
              <div className={styles.drawer__timeInfo}>
                <h4>{slot.label}</h4>
                <p>{slot.time}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderSummaryStep = () => {
    const selectedOption = service.options?.find(
      (opt) => opt.id === configuration.serviceDetails.serviceOption
    );

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={styles.drawer__stepContent}
      >
        <div className={styles.drawer__stepHeader}>
          <h3>Perfect! Let's Review Your Cooking Service</h3>
          <p>Your personalized meal delivery configuration is ready</p>
        </div>

        {/* Service Overview */}
        <motion.div className={styles.drawer__serviceOverview}>
          <div className={styles.drawer__serviceHeader}>
            <div className={styles.drawer__serviceIconLarge}>
              <Utensils size={24} />
            </div>
            <div className={styles.drawer__serviceHeaderInfo}>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
            </div>
            <div className={styles.drawer__servicePriceCard}>
              <span>Monthly Rate</span>
              <strong>₦{calculatePrice().toLocaleString()}</strong>
              <small>All inclusive</small>
            </div>
          </div>
        </motion.div>

        {/* Configuration Details */}
        <div className={styles.drawer__configGrid}>
          {selectedOption && (
            <div className={styles.drawer__configCard}>
              <div className={styles.drawer__configHeader}>
                <div className={styles.drawer__configIcon}>
                  <Package size={18} />
                </div>
                <h5>Service Package</h5>
              </div>
              <div className={styles.drawer__configContent}>
                <h6>{selectedOption.label}</h6>
                <p>{selectedOption.description}</p>
              </div>
            </div>
          )}

          <div className={styles.drawer__configCard}>
            <div className={styles.drawer__configHeader}>
              <div className={styles.drawer__configIcon}>
                <Utensils size={18} />
              </div>
              <h5>Meal Configuration</h5>
            </div>
            <div className={styles.drawer__configContent}>
              <div className={styles.drawer__propertyGrid}>
                <div className={styles.drawer__propertyItem}>
                  <span>Plan Type:</span>
                  <strong>
                    {configuration.serviceDetails.cooking?.mealType ===
                    MealType.Basic
                      ? "Basic Meals"
                      : "Standard Meals"}
                  </strong>
                </div>
                <div className={styles.drawer__propertyItem}>
                  <span>Total Weekly Meals:</span>
                  <strong>
                    {configuration.serviceDetails.cooking?.mealsPerDelivery?.reduce(
                      (sum, delivery) => sum + delivery.count,
                      0
                    ) || 0}{" "}
                    meals
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className={styles.drawer__benefitsSection}>
          <h5 className={styles.drawer__benefitsTitle}>
            <Sparkles size={18} />
            What You Get With This Service
          </h5>
          <div className={styles.drawer__benefitsGrid}>
            <div className={styles.drawer__benefitCard}>
              <div className={styles.drawer__benefitIcon}>
                <Shield size={16} />
              </div>
              <div>
                <h6>100% Satisfaction Guarantee</h6>
                <p>Not happy? We'll make it right or refund your money</p>
              </div>
            </div>
            <div className={styles.drawer__benefitCard}>
              <div className={styles.drawer__benefitIcon}>
                <Check size={16} />
              </div>
              <div>
                <h6>Fresh Ingredients Daily</h6>
                <p>We source fresh, quality ingredients for every meal</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderDetailsStep();
      case 1:
        return renderFrequencyStep();
      case 2:
        return renderScheduleStep();
      case 3:
        return renderSummaryStep();
      default:
        return null;
    }
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <div className={styles.drawer}>
        <div className={styles.drawer__header}>
          <div className={styles.drawer__headerContent}>
            <h2>Configure {service.name}</h2>
            <p>Customize your cooking service preferences</p>
          </div>
          <button onClick={onClose} className={styles.drawer__closeBtn}>
            <X size={20} />
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
              <div className={styles.drawer__progressIcon}>{step.icon}</div>
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
            <span>Estimated Monthly</span>
            <strong>₦{calculatePrice().toLocaleString()}</strong>
          </div>
          <div className={styles.drawer__footerActions}>
            <button
              className={styles.drawer__backBtn}
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              <ChevronLeft size={18} />
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
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <div className={styles.drawer__finalActions}>
                <button
                  className={styles.drawer__saveBtn}
                  onClick={() => {
                    const validation = validateCurrentStep();
                    if (validation.isValid) {
                      handleSave();
                    }
                  }}
                >
                  <Check size={18} />
                  Save & Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default CookingServiceConfiguration;
