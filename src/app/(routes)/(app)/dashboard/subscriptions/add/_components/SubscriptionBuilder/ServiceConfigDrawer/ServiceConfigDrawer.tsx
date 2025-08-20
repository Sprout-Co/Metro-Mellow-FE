// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/ServiceConfigDrawer/ServiceConfigDrawer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Home,
  ChevronRight,
  ChevronLeft,
  Check,
  Info,
  Sparkles,
  CreditCard,
  Shield,
  Package,
  Droplets,
  Utensils,
  Bug,
} from "lucide-react";
import styles from "./ServiceConfigDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import ValidationErrors from "../components/ValidationErrors";
import {
  Service,
  ServiceCategory,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  SubscriptionServiceInput,
  HouseType,
  CleaningType,
  MealType,
} from "@/graphql/api";
import {
  validateServiceConfiguration,
  ValidationError,
  hasFieldError,
  getFieldError,
} from "../validation";

interface ServiceConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  existingConfiguration?: SubscriptionServiceInput;
  onSave: (configuration: SubscriptionServiceInput) => void;
  onProceedToCheckout?: (configuration: SubscriptionServiceInput) => void;
}

const ServiceConfigDrawer: React.FC<ServiceConfigDrawerProps> = ({
  isOpen,
  onClose,
  service,
  existingConfiguration,
  onSave,
  onProceedToCheckout,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [configuration, setConfiguration] = useState<SubscriptionServiceInput>({
    serviceId: "",
    frequency: SubscriptionFrequency.Weekly,
    scheduledDays: [],
    preferredTimeSlot: TimeSlot.Morning,
    price: 0,
    category: ServiceCategory.Cleaning,
    serviceDetails: {
      cleaning: {
        cleaningType: CleaningType.StandardCleaning,
        houseType: HouseType.Flat,
        rooms: {
          bedroom: 1,
          livingRoom: 1,
          bathroom: 1,
          kitchen: 1,
          balcony: 0,
          studyRoom: 0,
          lobby: 0,
          other: 0,
          outdoor: 0,
        },
      },
      cooking: {
        mealType: MealType.Basic,
        mealsPerDelivery: [],
      },
      serviceOption: "",
    },
  });

  // Reset to step 0 when drawer opens
  useEffect(() => {
    if (isOpen) {
      setActiveStep(0);
    }
  }, [isOpen]);

  // Initialize configuration when service changes
  useEffect(() => {
    if (service && isOpen) {
      if (existingConfiguration) {
        setConfiguration(existingConfiguration);
      } else {
        // Initialize with proper defaults based on service
        const baseConfig = {
          serviceId: service._id,
          category: service.category,
          frequency: SubscriptionFrequency.Weekly,
          scheduledDays: [],
          preferredTimeSlot: TimeSlot.Morning,
          price: service.price,
          serviceDetails: {
            serviceOption: service.options?.[0]?.id || "",
            cleaning: service.category === ServiceCategory.Cleaning ? {
              cleaningType: CleaningType.StandardCleaning,
              houseType: HouseType.Flat,
              rooms: {
                bedroom: 1,
                livingRoom: 1,
                bathroom: 1,
                kitchen: 1,
                balcony: 0,
                studyRoom: 0,
                lobby: 0,
                other: 0,
                outdoor: 0,
              },
            } : undefined,
            cooking: service.category === ServiceCategory.Cooking ? {
              mealType: MealType.Basic,
              mealsPerDelivery: [],
            } : undefined,
          },
        };
        setConfiguration(baseConfig);
      }
    }
  }, [service, existingConfiguration, isOpen]);

  const steps = [
    { id: "details", label: "Details", icon: <Home size={18} /> },
    { id: "frequency", label: "Frequency", icon: <Calendar size={18} /> },
    { id: "schedule", label: "Schedule", icon: <Clock size={18} /> },
    { id: "summary", label: "Summary", icon: <Sparkles size={18} /> },
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

  const propertyTypes = [
    { value: HouseType.Flat, label: "Flat/Apartment", icon: "🏢" },
    { value: HouseType.Duplex, label: "Duplex/House", icon: "🏠" },
  ];

  const roomTypes = [
    { key: "bedroom", label: "Bedroom", icon: "🛏️" },
    { key: "livingRoom", label: "Living Room", icon: "🛋️" },
    { key: "bathroom", label: "Bathroom", icon: "🚿" },
    { key: "kitchen", label: "Kitchen", icon: "🍳" },
    { key: "balcony", label: "Balcony", icon: "🌿" },
    { key: "studyRoom", label: "Study Room", icon: "📚" },
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

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => ({
      ...prev,
      scheduledDays: prev.scheduledDays?.includes(day)
        ? prev.scheduledDays.filter((d) => d !== day)
        : [...(prev.scheduledDays || []), day],
    }));
  };

  const updateRoomCount = (room: string, increment: boolean) => {
    setConfiguration((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        cleaning: {
          cleaningType:
            prev.serviceDetails.cleaning?.cleaningType ||
            CleaningType.StandardCleaning,
          houseType: prev.serviceDetails.cleaning?.houseType || HouseType.Flat,
          rooms: {
            balcony: prev.serviceDetails.cleaning?.rooms?.balcony || 0,
            bathroom: prev.serviceDetails.cleaning?.rooms?.bathroom || 0,
            bedroom: prev.serviceDetails.cleaning?.rooms?.bedroom || 0,
            kitchen: prev.serviceDetails.cleaning?.rooms?.kitchen || 0,
            livingRoom: prev.serviceDetails.cleaning?.rooms?.livingRoom || 0,
            lobby: prev.serviceDetails.cleaning?.rooms?.lobby || 0,
            other: prev.serviceDetails.cleaning?.rooms?.other || 0,
            outdoor: prev.serviceDetails.cleaning?.rooms?.outdoor || 0,
            studyRoom: prev.serviceDetails.cleaning?.rooms?.studyRoom || 0,
            [room]: Math.max(
              0,
              (prev.serviceDetails.cleaning?.rooms?.[
                room as keyof typeof prev.serviceDetails.cleaning.rooms
              ] || 0) + (increment ? 1 : -1)
            ),
          },
        },
      },
    }));
  };

  const updateMealCount = (day: ScheduleDays, count: number) => {
    setConfiguration((prev) => {
      const currentMeals = prev.serviceDetails.cooking?.mealsPerDelivery || [];
      const existingIndex = currentMeals.findIndex(meal => meal.day === day);
      
      let updatedMeals;
      if (count === 0) {
        // Remove the meal delivery for this day
        updatedMeals = currentMeals.filter(meal => meal.day !== day);
      } else if (existingIndex >= 0) {
        // Update existing meal delivery
        updatedMeals = currentMeals.map((meal, index) =>
          index === existingIndex ? { ...meal, count } : meal
        );
      } else {
        // Add new meal delivery
        updatedMeals = [...currentMeals, { day, count }];
      }

      return {
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          cooking: {
            mealType: prev.serviceDetails.cooking?.mealType || MealType.Basic,
            mealsPerDelivery: updatedMeals,
          },
        },
      };
    });
  };

  const getMealCountForDay = (day: ScheduleDays): number => {
    const meals = configuration.serviceDetails.cooking?.mealsPerDelivery || [];
    const meal = meals.find(m => m.day === day);
    return meal?.count || 0;
  };

  const calculatePrice = () => {
    if (!service) return 0;

    let basePrice = service.price;
    const daysCount = configuration.scheduledDays?.length || 0;

    // Add service option price
    if (configuration.serviceDetails.serviceOption && service.options) {
      const selectedOption = service.options.find(
        (opt) => opt.id === configuration.serviceDetails.serviceOption
      );
      if (selectedOption) {
        basePrice += selectedOption.price;
      }
    }

    if (
      service.category === ServiceCategory.Cleaning &&
      configuration.serviceDetails.cleaning
    ) {
      const roomCount = Object.values(
        configuration.serviceDetails.cleaning.rooms || {}
      ).reduce((sum, count) => sum + (count || 0), 0);
      basePrice = (service.price / 3) * Math.max(1, roomCount);

      if (
        configuration.serviceDetails.cleaning.houseType === HouseType.Duplex
      ) {
        basePrice *= 1.5;
      }
    }

    // Calculate based on frequency
    let multiplier = 4; // Weekly (4 times per month)
    if (configuration.frequency === SubscriptionFrequency.BiWeekly) {
      multiplier = 2;
    } else if (configuration.frequency === SubscriptionFrequency.Monthly) {
      multiplier = 1;
    }

    return Math.round(basePrice * daysCount * multiplier);
  };

  useEffect(() => {
    const price = calculatePrice();
    setConfiguration((prev) => ({ ...prev, price }));
  }, [
    configuration.scheduledDays,
    configuration.frequency,
    configuration.serviceDetails,
    service,
  ]);

  const handleSave = () => {
    onSave(configuration);
    onClose();
  };

  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout(configuration);
    }
  };

  const validateCurrentStep = () => {
    if (!service) return { isValid: false, errors: [] };
    
    const validation = validateServiceConfiguration(configuration, service);
    setValidationErrors(validation.errors);
    setShowValidationErrors(!validation.isValid);
    return validation;
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0: // Details step
        if (service?.options && service.options.length > 0) {
          const hasServiceOption = !!configuration.serviceDetails.serviceOption;
          if (!hasServiceOption) return false;
        }
        
        // Cooking service specific validation
        if (service?.category === ServiceCategory.Cooking) {
          const hasMealType = !!configuration.serviceDetails.cooking?.mealType;
          const hasMealDeliveries = configuration.serviceDetails.cooking?.mealsPerDelivery && 
            configuration.serviceDetails.cooking.mealsPerDelivery.length > 0;
          return hasMealType && hasMealDeliveries;
        }
        
        // Cleaning service specific validation
        if (service?.category === ServiceCategory.Cleaning) {
          const hasHouseType = !!configuration.serviceDetails.cleaning?.houseType;
          const hasRooms = configuration.serviceDetails.cleaning?.rooms &&
            Object.values(configuration.serviceDetails.cleaning.rooms).reduce((sum, count) => sum + (count || 0), 0) > 0;
          return hasHouseType && hasRooms;
        }
        
        return true;
      case 1: // Frequency step
        return configuration.frequency;
      case 2: // Schedule step
        return (
          configuration.scheduledDays && configuration.scheduledDays.length > 0
        );
      case 3: // Summary step
        return true;
      default:
        return false;
    }
  };

  const getFrequencyLabel = (frequency: SubscriptionFrequency) => {
    switch (frequency) {
      case SubscriptionFrequency.Weekly:
        return "Weekly";
      case SubscriptionFrequency.BiWeekly:
        return "Bi-Weekly";
      case SubscriptionFrequency.Monthly:
        return "Monthly";
      default:
        return frequency;
    }
  };

  const getSelectedOptionDetails = () => {
    if (!service?.options || !configuration.serviceDetails.serviceOption) {
      return null;
    }
    return service.options.find(
      (opt) => opt.id === configuration.serviceDetails.serviceOption
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

  const renderDetailsStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Service details</h3>
        <p>Customize your service requirements</p>
      </div>

      {/* Service Options - Now First */}
      {service?.options && service.options.length > 0 && (
        <div className={styles.drawer__section}>
          <label className={`${styles.drawer__label} ${
            hasFieldError(validationErrors, "serviceOption") ? styles["drawer__label--error"] : ""
          }`}>
            Service Package <span className={styles.drawer__required}>*</span>
          </label>
          <div className={`${styles.drawer__optionsGrid} ${
            hasFieldError(validationErrors, "serviceOption") ? styles["drawer__optionsGrid--error"] : ""
          }`}>
            {service.options.map((option) => (
              <motion.button
                key={option.id}
                className={`${styles.drawer__optionCard} ${
                  configuration.serviceDetails.serviceOption === option.id
                    ? styles["drawer__optionCard--active"]
                    : ""
                }`}
                onClick={() =>
                  setConfiguration((prev) => ({
                    ...prev,
                    serviceDetails: {
                      ...prev.serviceDetails,
                      serviceOption: option.id,
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

      {service?.category === ServiceCategory.Cleaning && (
        <>
          {/* Property Type */}
          <div className={styles.drawer__section}>
            <label className={styles.drawer__label}>Property Type</label>
            <div className={styles.drawer__propertyGrid}>
              {propertyTypes.map((type) => (
                <motion.button
                  key={type.value}
                  className={`${styles.drawer__propertyCard} ${
                    configuration.serviceDetails.cleaning?.houseType ===
                    type.value
                      ? styles["drawer__propertyCard--active"]
                      : ""
                  }`}
                  onClick={() =>
                    setConfiguration((prev) => ({
                      ...prev,
                      serviceDetails: {
                        ...prev.serviceDetails,
                        cleaning: {
                          ...prev.serviceDetails.cleaning!,
                          houseType: type.value,
                        },
                      },
                    }))
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.drawer__propertyIcon}>
                    {type.icon}
                  </span>
                  <span>{type.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Room Configuration */}
          <div className={styles.drawer__section}>
            <label className={styles.drawer__label}>Room Configuration</label>
            <div className={styles.drawer__roomsGrid}>
              {roomTypes.map((room) => (
                <div key={room.key} className={styles.drawer__roomCard}>
                  <div className={styles.drawer__roomInfo}>
                    <span className={styles.drawer__roomIcon}>{room.icon}</span>
                    <span className={styles.drawer__roomLabel}>
                      {room.label}
                    </span>
                  </div>
                  <div className={styles.drawer__roomCounter}>
                    <button
                      onClick={() => updateRoomCount(room.key, false)}
                      disabled={
                        !configuration.serviceDetails.cleaning?.rooms?.[
                          room.key as keyof typeof configuration.serviceDetails.cleaning.rooms
                        ]
                      }
                    >
                      −
                    </button>
                    <span>
                      {configuration.serviceDetails.cleaning?.rooms?.[
                        room.key as keyof typeof configuration.serviceDetails.cleaning.rooms
                      ] || 0}
                    </span>
                    <button onClick={() => updateRoomCount(room.key, true)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {service?.category === ServiceCategory.Cooking && (
        <>
          {/* Meal Type Selection */}
          <div className={styles.drawer__section}>
            <label className={`${styles.drawer__label} ${
              hasFieldError(validationErrors, "mealType") ? styles["drawer__label--error"] : ""
            }`}>
              Meal Plan Type <span className={styles.drawer__required}>*</span>
            </label>
            <div className={`${styles.drawer__optionsGrid} ${
              hasFieldError(validationErrors, "mealType") ? styles["drawer__optionsGrid--error"] : ""
            }`}>
              {mealTypes.map((mealType) => (
                <motion.button
                  key={mealType.value}
                  className={`${styles.drawer__optionCard} ${
                    configuration.serviceDetails.cooking?.mealType === mealType.value
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
                          mealsPerDelivery: prev.serviceDetails.cooking?.mealsPerDelivery || [],
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
          </div>

          {/* Meal Deliveries Configuration */}
          <div className={styles.drawer__section}>
            <label className={`${styles.drawer__label} ${
              hasFieldError(validationErrors, "mealsPerDelivery") ? styles["drawer__label--error"] : ""
            }`}>
              Meals Per Delivery Day <span className={styles.drawer__required}>*</span>
            </label>
            <p className={styles.drawer__sectionDescription}>
              Select which days you want meals delivered and how many meals per day
            </p>
            <div className={`${styles.drawer__mealsGrid} ${
              hasFieldError(validationErrors, "mealsPerDelivery") ? styles["drawer__mealsGrid--error"] : ""
            }`}>
              {daysOfWeek.map((day) => (
                <div key={day.value} className={styles.drawer__mealCard}>
                  <div className={styles.drawer__mealDayInfo}>
                    <span className={styles.drawer__dayShort}>{day.short}</span>
                    <span className={styles.drawer__dayFull}>{day.label}</span>
                  </div>
                  <div className={styles.drawer__mealCounter}>
                    <button
                      onClick={() => updateMealCount(day.value, Math.max(0, getMealCountForDay(day.value) - 1))}
                      disabled={getMealCountForDay(day.value) === 0}
                    >
                      −
                    </button>
                    <span>{getMealCountForDay(day.value)}</span>
                    <button onClick={() => updateMealCount(day.value, getMealCountForDay(day.value) + 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );

  const renderFrequencyStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>How often do you need this service?</h3>
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
        <h3>Set your schedule</h3>
        <p>Select days and preferred time for the service</p>
      </div>

      {/* Days Selection */}
      <div className={styles.drawer__section}>
        <label className={`${styles.drawer__label} ${
          hasFieldError(validationErrors, "scheduledDays") ? styles["drawer__label--error"] : ""
        }`}>
          Select Days <span className={styles.drawer__required}>*</span>
        </label>
        <div className={`${styles.drawer__daysGrid} ${
          hasFieldError(validationErrors, "scheduledDays") ? styles["drawer__daysGrid--error"] : ""
        }`}>
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

      {/* Time Slot Selection */}
      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Preferred Time</label>
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
    const selectedOption = getSelectedOptionDetails();
    const roomCount = configuration.serviceDetails.cleaning?.rooms
      ? Object.values(configuration.serviceDetails.cleaning.rooms).reduce(
          (sum, count) => sum + (count || 0),
          0
        )
      : 0;

    const getServiceIcon = () => {
      switch (service?.category) {
        case ServiceCategory.Cleaning:
          return { icon: <Home size={24} />, color: "#3B82F6", bgColor: "rgba(59, 130, 246, 0.1)" };
        case ServiceCategory.Laundry:
          return { icon: <Droplets size={24} />, color: "#06B6D4", bgColor: "rgba(6, 182, 212, 0.1)" };
        case ServiceCategory.Cooking:
          return { icon: <Utensils size={24} />, color: "#F59E0B", bgColor: "rgba(245, 158, 11, 0.1)" };
        case ServiceCategory.PestControl:
          return { icon: <Bug size={24} />, color: "#EF4444", bgColor: "rgba(239, 68, 68, 0.1)" };
        default:
          return { icon: <Package size={24} />, color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)" };
      }
    };

    const serviceIcon = getServiceIcon();

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={styles.drawer__stepContent}
      >
        <div className={styles.drawer__stepHeader}>
          <h3>Perfect! Let's Review</h3>
          <p>Your personalized service configuration is ready</p>
        </div>

        {/* Service Overview Card */}
        <motion.div 
          className={styles.drawer__serviceOverview}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.drawer__serviceHeader}>
            <div 
              className={styles.drawer__serviceIconLarge}
              style={{ background: serviceIcon.bgColor, color: serviceIcon.color }}
            >
              {serviceIcon.icon}
            </div>
            <div className={styles.drawer__serviceHeaderInfo}>
              <h4>{service?.name}</h4>
              <p>{service?.description}</p>
              <div className={styles.drawer__serviceBadge}>
                <Sparkles size={14} />
                <span>Premium Service</span>
              </div>
            </div>
            <div className={styles.drawer__servicePriceCard}>
              <span>Monthly Rate</span>
              <strong style={{ color: serviceIcon.color }}>₦{calculatePrice().toLocaleString()}</strong>
              <small>All inclusive</small>
            </div>
          </div>
        </motion.div>

        {/* Configuration Details Grid */}
        <div className={styles.drawer__configGrid}>
          {/* Service Package */}
          {selectedOption && (
            <motion.div 
              className={styles.drawer__configCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.drawer__configHeader}>
                <div className={styles.drawer__configIcon}>
                  <Package size={18} />
                </div>
                <h5>Service Package</h5>
              </div>
              <div className={styles.drawer__configContent}>
                <div className={styles.drawer__packageDetails}>
                  <h6>{selectedOption.label}</h6>
                  <p>{selectedOption.description}</p>
                  <div className={styles.drawer__packagePrice}>
                    <span>Add-on: +₦{selectedOption.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Property Details (for Cleaning) */}
          {service?.category === ServiceCategory.Cleaning && (
            <motion.div 
              className={styles.drawer__configCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className={styles.drawer__configHeader}>
                <div className={styles.drawer__configIcon}>
                  <Home size={18} />
                </div>
                <h5>Property Details</h5>
              </div>
              <div className={styles.drawer__configContent}>
                <div className={styles.drawer__propertyGrid}>
                  <div className={styles.drawer__propertyItem}>
                    <span>Type:</span>
                    <strong>
                      {configuration.serviceDetails.cleaning?.houseType === HouseType.Flat
                        ? "Flat/Apartment"
                        : "Duplex/House"}
                    </strong>
                  </div>
                  <div className={styles.drawer__propertyItem}>
                    <span>Rooms:</span>
                    <strong>{roomCount} room{roomCount !== 1 ? "s" : ""}</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Meal Details (for Cooking) */}
          {service?.category === ServiceCategory.Cooking && (
            <motion.div 
              className={styles.drawer__configCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
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
                      {configuration.serviceDetails.cooking?.mealType === MealType.Basic
                        ? "Basic Meals"
                        : "Standard Meals"}
                    </strong>
                  </div>
                  <div className={styles.drawer__propertyItem}>
                    <span>Total Weekly Meals:</span>
                    <strong>
                      {configuration.serviceDetails.cooking?.mealsPerDelivery?.reduce(
                        (sum, delivery) => sum + delivery.count, 0
                      ) || 0} meals
                    </strong>
                  </div>
                </div>
                {configuration.serviceDetails.cooking?.mealsPerDelivery && 
                 configuration.serviceDetails.cooking.mealsPerDelivery.length > 0 && (
                  <div className={styles.drawer__mealSchedule}>
                    <h6>Delivery Schedule:</h6>
                    <div className={styles.drawer__mealScheduleList}>
                      {configuration.serviceDetails.cooking.mealsPerDelivery.map((delivery) => {
                        const dayName = daysOfWeek.find(d => d.value === delivery.day)?.label || "Unknown";
                        return (
                          <div key={delivery.day} className={styles.drawer__mealScheduleItem}>
                            <span>{dayName}:</span>
                            <strong>{delivery.count} meal{delivery.count !== 1 ? 's' : ''}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Schedule Configuration */}
          <motion.div 
            className={styles.drawer__configCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.drawer__configHeader}>
              <div className={styles.drawer__configIcon}>
                <Calendar size={18} />
              </div>
              <h5>Service Schedule</h5>
            </div>
            <div className={styles.drawer__configContent}>
              <div className={styles.drawer__scheduleGrid}>
                <div className={styles.drawer__scheduleItem}>
                  <div className={styles.drawer__scheduleLabel}>
                    <Clock size={14} />
                    <span>Frequency</span>
                  </div>
                  <strong>{getFrequencyLabel(configuration.frequency)}</strong>
                </div>
                <div className={styles.drawer__scheduleItem}>
                  <div className={styles.drawer__scheduleLabel}>
                    <Calendar size={14} />
                    <span>Days</span>
                  </div>
                  <strong>
                    {configuration.scheduledDays
                      ?.map((day) => daysOfWeek.find((d) => d.value === day)?.short)
                      .join(", ") || "Not selected"}
                  </strong>
                </div>
                <div className={styles.drawer__scheduleItem}>
                  <div className={styles.drawer__scheduleLabel}>
                    <Clock size={14} />
                    <span>Time Slot</span>
                  </div>
                  <strong>
                    {timeSlots.find(slot => slot.value === configuration.preferredTimeSlot)?.time || "Not selected"}
                  </strong>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pricing Breakdown */}
          <motion.div 
            className={styles.drawer__configCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className={styles.drawer__configHeader}>
              <div className={styles.drawer__configIcon}>
                <CreditCard size={18} />
              </div>
              <h5>Pricing Breakdown</h5>
            </div>
            <div className={styles.drawer__configContent}>
              <div className={styles.drawer__pricingBreakdown}>
                <div className={styles.drawer__pricingItem}>
                  <span>Base Service</span>
                  <span>₦{service?.price.toLocaleString()}</span>
                </div>
                {selectedOption && (
                  <div className={styles.drawer__pricingItem}>
                    <span>Package Add-on</span>
                    <span>+₦{selectedOption.price.toLocaleString()}</span>
                  </div>
                )}
                {service?.category === ServiceCategory.Cleaning && roomCount > 3 && (
                  <div className={styles.drawer__pricingItem}>
                    <span>Additional Rooms</span>
                    <span>Included in calculation</span>
                  </div>
                )}
                <div className={styles.drawer__pricingDivider} />
                <div className={styles.drawer__pricingTotal}>
                  <span>Monthly Total</span>
                  <strong>₦{calculatePrice().toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Benefits */}
        <motion.div 
          className={styles.drawer__benefitsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
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
                <h6>Flexible Scheduling</h6>
                <p>Easy rescheduling and cancellation options</p>
              </div>
            </div>
            <div className={styles.drawer__benefitCard}>
              <div className={styles.drawer__benefitIcon}>
                <Sparkles size={16} />
              </div>
              <div>
                <h6>Premium Quality</h6>
                <p>Professional staff with premium equipment and supplies</p>
              </div>
            </div>
            <div className={styles.drawer__benefitCard}>
              <div className={styles.drawer__benefitIcon}>
                <CreditCard size={16} />
              </div>
              <div>
                <h6>Locked-in Pricing</h6>
                <p>Your rate stays the same throughout your subscription</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (!service) return null;

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawer__header}>
          <div className={styles.drawer__headerContent}>
            <h2>Configure {service.name}</h2>
            <p>Customize your service preferences</p>
          </div>
          <button onClick={onClose} className={styles.drawer__closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        <div className={styles.drawer__progress}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`${styles.drawer__progressStep} ${
                index === activeStep
                  ? styles["drawer__progressStep--active"]
                  : ""
              } ${
                index < activeStep
                  ? styles["drawer__progressStep--completed"]
                  : ""
              }`}
            >
              <div className={styles.drawer__progressIcon}>{step.icon}</div>
              <span className={styles.drawer__progressLabel}>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Validation Errors */}
        {showValidationErrors && validationErrors.length > 0 && (
          <ValidationErrors
            errors={validationErrors}
            onDismiss={() => setShowValidationErrors(false)}
          />
        )}

        {/* Content */}
        <div className={styles.drawer__content}>
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>

        {/* Footer */}
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
                disabled={false}
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
                <motion.button
                  className={styles.drawer__checkoutBtn}
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className={styles.drawer__checkoutBtnContent}>
                    <CreditCard size={18} />
                    <span>Proceed to Checkout</span>
                  </div>
                  <div className={styles.drawer__checkoutBtnGlow} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default ServiceConfigDrawer;
