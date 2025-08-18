"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Droplets,
  Utensils,
  Bug,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Edit2,
  CreditCard,
  Sparkles,
  Clock,
  ShoppingCart,
  ArrowRight,
  Settings,
  CalendarCheck,
  Receipt,
  Plus,
  Info,
} from "lucide-react";
import styles from "./AddSubscriptionMain.module.scss";
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";
import FnButton from "@/components/ui/Button/FnButton";

// Service Types
interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  color: string;
  description: string;
  features: string[];
  configOptions: ConfigOption[];
}

interface ConfigOption {
  id: string;
  label: string;
  type: "select" | "number" | "checkbox" | "radio";
  options?: { value: string; label: string; price?: number }[];
  min?: number;
  max?: number;
  unit?: string;
  priceMultiplier?: number;
}

interface SelectedService {
  serviceId: string;
  config: Record<string, any>;
  schedule: {
    frequency: string;
    days?: string[];
    time?: string;
  };
  price: number;
}

// Enhanced Service Data with features
const services: ServiceOption[] = [
  {
    id: "cleaning",
    name: "House Cleaning",
    icon: <Home size={24} />,
    basePrice: 15000,
    color: "#075056",
    description: "Professional home cleaning services",
    features: ["Deep cleaning", "Eco-friendly products", "Trained staff"],
    configOptions: [
      {
        id: "type",
        label: "Cleaning Type",
        type: "radio",
        options: [
          { value: "regular", label: "Regular Cleaning", price: 0 },
          { value: "deep", label: "Deep Cleaning", price: 10000 },
          { value: "moveout", label: "Move-in/out", price: 20000 },
        ],
      },
      {
        id: "rooms",
        label: "Number of Rooms",
        type: "number",
        min: 1,
        max: 10,
        priceMultiplier: 2000,
      },
      {
        id: "extras",
        label: "Add-ons",
        type: "checkbox",
        options: [
          { value: "windows", label: "Window Cleaning", price: 3000 },
          { value: "fridge", label: "Fridge Cleaning", price: 2000 },
          { value: "oven", label: "Oven Cleaning", price: 2500 },
        ],
      },
    ],
  },
  {
    id: "laundry",
    name: "Laundry Service",
    icon: <Droplets size={24} />,
    basePrice: 5000,
    color: "#6366f1",
    description: "Wash, dry, fold & iron services",
    features: ["Free pickup", "48hr delivery", "Premium detergents"],
    configOptions: [
      {
        id: "type",
        label: "Service Type",
        type: "radio",
        options: [
          { value: "washfold", label: "Wash & Fold", price: 0 },
          { value: "dryclean", label: "Dry Cleaning", price: 3000 },
          { value: "iron", label: "Ironing Only", price: -2000 },
        ],
      },
      {
        id: "bags",
        label: "Number of Bags",
        type: "number",
        min: 1,
        max: 5,
        priceMultiplier: 5000,
      },
    ],
  },
  {
    id: "cooking",
    name: "Meal Preparation",
    icon: <Utensils size={24} />,
    basePrice: 30000,
    color: "#fe5b04",
    description: "Fresh home-cooked meals",
    features: ["Custom menus", "Dietary options", "Fresh ingredients"],
    configOptions: [
      {
        id: "mealPlan",
        label: "Meal Plan",
        type: "radio",
        options: [
          { value: "breakfast", label: "Breakfast Only", price: -20000 },
          { value: "lunch", label: "Lunch Only", price: -15000 },
          { value: "dinner", label: "Dinner Only", price: -10000 },
          { value: "all", label: "All Meals", price: 0 },
        ],
      },
      {
        id: "people",
        label: "Number of People",
        type: "number",
        min: 1,
        max: 8,
        priceMultiplier: 5000,
      },
    ],
  },
  {
    id: "pest",
    name: "Pest Control",
    icon: <Bug size={24} />,
    basePrice: 20000,
    color: "#10b981",
    description: "Safe & effective pest management",
    features: ["Pet-safe chemicals", "Quarterly visits", "Guaranteed results"],
    configOptions: [
      {
        id: "treatment",
        label: "Treatment Type",
        type: "radio",
        options: [
          { value: "prevention", label: "Prevention", price: 0 },
          { value: "treatment", label: "Active Treatment", price: 10000 },
          { value: "inspection", label: "Inspection Only", price: -10000 },
        ],
      },
    ],
  },
];

// Frequency Options
const frequencyOptions = [
  { value: "daily", label: "Daily", multiplier: 30, description: "Every day" },
  {
    value: "weekly",
    label: "Weekly",
    multiplier: 4,
    description: "Once a week",
  },
  {
    value: "biweekly",
    label: "Bi-Weekly",
    multiplier: 2,
    description: "Every 2 weeks",
  },
  {
    value: "monthly",
    label: "Monthly",
    multiplier: 1,
    description: "Once a month",
  },
];

// Time Slots
const timeSlots = [
  { value: "08:00 AM", label: "Morning", time: "08:00 AM", icon: "☀️" },
  { value: "09:00 AM", label: "Morning", time: "09:00 AM", icon: "☀️" },
  { value: "10:00 AM", label: "Morning", time: "10:00 AM", icon: "☀️" },
  { value: "11:00 AM", label: "Morning", time: "11:00 AM", icon: "☀️" },
  { value: "12:00 PM", label: "Afternoon", time: "12:00 PM", icon: "🌤️" },
  { value: "01:00 PM", label: "Afternoon", time: "01:00 PM", icon: "🌤️" },
  { value: "02:00 PM", label: "Afternoon", time: "02:00 PM", icon: "🌤️" },
  { value: "03:00 PM", label: "Afternoon", time: "03:00 PM", icon: "🌤️" },
  { value: "04:00 PM", label: "Evening", time: "04:00 PM", icon: "🌅" },
  { value: "05:00 PM", label: "Evening", time: "05:00 PM", icon: "🌅" },
  { value: "06:00 PM", label: "Evening", time: "06:00 PM", icon: "🌅" },
];

// Days of Week
const daysOfWeek = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" },
];

// Step configurations
const steps = [
  { number: 1, label: "Services", icon: <ShoppingCart size={18} /> },
  { number: 2, label: "Configure", icon: <Settings size={18} /> },
  { number: 3, label: "Schedule", icon: <CalendarCheck size={18} /> },
  { number: 4, label: "Review", icon: <Receipt size={18} /> },
];

export default function AddSubscriptionMain() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentConfigService, setCurrentConfigService] =
    useState<ServiceOption | null>(null);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return selectedServices.reduce((total, service) => {
      const frequency = frequencyOptions.find(
        (f) => f.value === service.schedule.frequency
      );
      const multiplier = frequency?.multiplier || 1;
      return total + service.price * multiplier;
    }, 0);
  }, [selectedServices]);

  // Calculate savings
  const monthlyRegularPrice = useMemo(() => {
    return totalPrice * 1.3; // 30% more without subscription
  }, [totalPrice]);

  const monthlySavings = monthlyRegularPrice - totalPrice;
  const savingsPercentage = Math.round(
    (monthlySavings / monthlyRegularPrice) * 100
  );

  // Toggle Service Selection
  const toggleService = (serviceId: string) => {
    const exists = selectedServices.find((s) => s.serviceId === serviceId);
    if (exists) {
      setSelectedServices((prev) =>
        prev.filter((s) => s.serviceId !== serviceId)
      );
    } else {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setCurrentConfigService(service);
        setShowConfigModal(true);
      }
    }
  };

  // Calculate service price based on config
  const calculateServicePrice = (
    service: ServiceOption,
    config: Record<string, any>
  ) => {
    let price = service.basePrice;

    service.configOptions.forEach((option) => {
      const value = config[option.id];
      if (!value) return;

      if (option.type === "radio") {
        const selected = option.options?.find((o) => o.value === value);
        if (selected?.price) price += selected.price;
      } else if (option.type === "number" && option.priceMultiplier) {
        price += (value - 1) * option.priceMultiplier;
      } else if (option.type === "checkbox" && Array.isArray(value)) {
        value.forEach((v) => {
          const selected = option.options?.find((o) => o.value === v);
          if (selected?.price) price += selected.price;
        });
      }
    });

    return Math.max(0, price);
  };

  // Save service configuration
  const saveServiceConfig = (config: Record<string, any>) => {
    if (!currentConfigService) return;

    const price = calculateServicePrice(currentConfigService, config);
    const newService: SelectedService = {
      serviceId: currentConfigService.id,
      config: config,
      schedule: {
        frequency: "weekly",
        days: ["Mon"],
        time: "09:00 AM",
      },
      price,
    };

    if (editingService) {
      setSelectedServices((prev) =>
        prev.map((s) => (s.serviceId === editingService ? newService : s))
      );
      setEditingService(null);
    } else {
      setSelectedServices((prev) => [...prev, newService]);
    }

    setShowConfigModal(false);
    setCurrentConfigService(null);
  };

  // Edit service
  const editService = (serviceId: string) => {
    const service = selectedServices.find((s) => s.serviceId === serviceId);
    const serviceOption = services.find((s) => s.id === serviceId);
    if (service && serviceOption) {
      setEditingService(serviceId);
      setCurrentConfigService(serviceOption);
      setShowConfigModal(true);
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) return;
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const isStepComplete = (step: number) => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2)
      return selectedServices.every((s) => Object.keys(s.config).length > 0);
    if (step === 3)
      return selectedServices.every(
        (s) => s.schedule.days && s.schedule.days.length > 0
      );
    return false;
  };

  return (
    <div className={styles.addSubscriptionMain}>
      <div className={styles.addSubscriptionMain__container}>
        <div className={styles.addSubscriptionMain__wrapper}>
          {/* Enhanced Header */}
          <div className={styles.addSubscriptionMain__header}>
            <div className={styles.addSubscriptionMain__headerContent}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className={styles.addSubscriptionMain__title}>
                  Create Your Perfect Subscription
                </h1>
                <p className={styles.addSubscriptionMain__subtitle}>
                  Save up to 30% by bundling services into a convenient monthly
                  plan
                </p>
              </motion.div>

              {totalPrice > 0 && (
                <motion.div
                  className={styles.addSubscriptionMain__headerStats}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.addSubscriptionMain__stat}>
                    <span className={styles.addSubscriptionMain__statLabel}>
                      Monthly Total
                    </span>
                    <span className={styles.addSubscriptionMain__statValue}>
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.addSubscriptionMain__stat}>
                    <span className={styles.addSubscriptionMain__statLabel}>
                      You Save
                    </span>
                    <span
                      className={styles.addSubscriptionMain__statValueGreen}
                    >
                      ₦{monthlySavings.toLocaleString()} ({savingsPercentage}%)
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced Progress Stepper */}
          <div className={styles.addSubscriptionMain__stepper}>
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <motion.div
                  className={`${styles.addSubscriptionMain__step} ${
                    step.number === currentStep
                      ? styles["addSubscriptionMain__step--active"]
                      : ""
                  } ${
                    step.number < currentStep || isStepComplete(step.number)
                      ? styles["addSubscriptionMain__step--completed"]
                      : ""
                  }`}
                  onClick={() =>
                    step.number <= currentStep && setCurrentStep(step.number)
                  }
                  whileHover={step.number <= currentStep ? { scale: 1.05 } : {}}
                  whileTap={step.number <= currentStep ? { scale: 0.95 } : {}}
                >
                  <div className={styles.addSubscriptionMain__stepIcon}>
                    {step.number < currentStep ||
                    isStepComplete(step.number) ? (
                      <Check size={20} />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className={styles.addSubscriptionMain__stepLabel}>
                    {step.label}
                  </span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`${styles.addSubscriptionMain__stepConnector} ${
                      step.number < currentStep
                        ? styles[
                            "addSubscriptionMain__stepConnector--completed"
                          ]
                        : ""
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className={styles.addSubscriptionMain__content}>
            <AnimatePresence mode="wait">
              {/* Step 1: Choose Services - Enhanced */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.addSubscriptionMain__stepHeader}>
                    <h2 className={styles.addSubscriptionMain__stepTitle}>
                      Choose Your Services
                    </h2>
                    <p className={styles.addSubscriptionMain__stepDescription}>
                      Select the services you'd like to include in your
                      subscription package
                    </p>
                  </div>

                  <div className={styles.addSubscriptionMain__servicesGrid}>
                    {services.map((service, index) => {
                      const isSelected = selectedServices.some(
                        (s) => s.serviceId === service.id
                      );

                      return (
                        <motion.div
                          key={service.id}
                          className={`${styles.addSubscriptionMain__serviceCard} ${
                            isSelected
                              ? styles[
                                  "addSubscriptionMain__serviceCard--selected"
                                ]
                              : ""
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          onClick={() => toggleService(service.id)}
                        >
                          {isSelected && (
                            <motion.div
                              className={
                                styles.addSubscriptionMain__selectedIndicator
                              }
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <Check size={16} />
                            </motion.div>
                          )}

                          <div
                            className={styles.addSubscriptionMain__serviceIcon}
                            style={{
                              backgroundColor: `${service.color}15`,
                              color: service.color,
                            }}
                          >
                            {service.icon}
                          </div>

                          <h3
                            className={styles.addSubscriptionMain__serviceTitle}
                          >
                            {service.name}
                          </h3>

                          <p
                            className={
                              styles.addSubscriptionMain__serviceDescription
                            }
                          >
                            {service.description}
                          </p>

                          <div
                            className={
                              styles.addSubscriptionMain__serviceFeatures
                            }
                          >
                            {service.features.map((feature) => (
                              <span
                                key={feature}
                                className={
                                  styles.addSubscriptionMain__serviceFeature
                                }
                              >
                                <Sparkles size={12} />
                                {feature}
                              </span>
                            ))}
                          </div>

                          <div
                            className={
                              styles.addSubscriptionMain__servicePricing
                            }
                          >
                            <span
                              className={
                                styles.addSubscriptionMain__servicePrice
                              }
                            >
                              From ₦{service.basePrice.toLocaleString()}
                            </span>
                            <span
                              className={
                                styles.addSubscriptionMain__servicePeriod
                              }
                            >
                              /month
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Configure Services - Enhanced */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.addSubscriptionMain__stepHeader}>
                    <h2 className={styles.addSubscriptionMain__stepTitle}>
                      Configure Your Services
                    </h2>
                    <p className={styles.addSubscriptionMain__stepDescription}>
                      Customize each service to perfectly match your needs
                    </p>
                  </div>

                  <div className={styles.addSubscriptionMain__configList}>
                    {selectedServices.map((selected, index) => {
                      const service = services.find(
                        (s) => s.id === selected.serviceId
                      );
                      if (!service) return null;

                      return (
                        <motion.div
                          key={selected.serviceId}
                          className={styles.addSubscriptionMain__configCard}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div
                            className={styles.addSubscriptionMain__configHeader}
                          >
                            <div
                              className={styles.addSubscriptionMain__configLeft}
                            >
                              <div
                                className={
                                  styles.addSubscriptionMain__configIcon
                                }
                                style={{
                                  backgroundColor: `${service.color}15`,
                                  color: service.color,
                                }}
                              >
                                {service.icon}
                              </div>
                              <div
                                className={
                                  styles.addSubscriptionMain__configInfo
                                }
                              >
                                <h3
                                  className={
                                    styles.addSubscriptionMain__configTitle
                                  }
                                >
                                  {service.name}
                                </h3>
                                <div
                                  className={
                                    styles.addSubscriptionMain__configPrice
                                  }
                                >
                                  ₦{selected.price.toLocaleString()}/month
                                </div>
                              </div>
                            </div>
                            <motion.button
                              className={styles.addSubscriptionMain__editButton}
                              onClick={() => editService(selected.serviceId)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Edit2 size={16} />
                              Edit
                            </motion.button>
                          </div>

                          {Object.keys(selected.config).length > 0 ? (
                            <div
                              className={
                                styles.addSubscriptionMain__configDetails
                              }
                            >
                              {Object.entries(selected.config).map(
                                ([key, value]) => {
                                  const option = service.configOptions.find(
                                    (o) => o.id === key
                                  );
                                  if (!option) return null;

                                  let displayValue = value;
                                  if (option.type === "radio") {
                                    displayValue =
                                      option.options?.find(
                                        (o) => o.value === value
                                      )?.label || value;
                                  } else if (Array.isArray(value)) {
                                    displayValue = value
                                      .map(
                                        (v) =>
                                          option.options?.find(
                                            (o) => o.value === v
                                          )?.label || v
                                      )
                                      .join(", ");
                                  }

                                  return (
                                    <div
                                      key={key}
                                      className={
                                        styles.addSubscriptionMain__configDetail
                                      }
                                    >
                                      <span
                                        className={
                                          styles.addSubscriptionMain__configDetailLabel
                                        }
                                      >
                                        {option.label}
                                      </span>
                                      <span
                                        className={
                                          styles.addSubscriptionMain__configDetailValue
                                        }
                                      >
                                        {displayValue}
                                      </span>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div
                              className={
                                styles.addSubscriptionMain__configEmpty
                              }
                            >
                              <Info size={16} />
                              <span>Click edit to configure this service</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Schedule Services - Enhanced */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.addSubscriptionMain__stepHeader}>
                    <h2 className={styles.addSubscriptionMain__stepTitle}>
                      Set Your Schedule
                    </h2>
                    <p className={styles.addSubscriptionMain__stepDescription}>
                      Choose when you'd like each service to be performed
                    </p>
                  </div>

                  <div className={styles.addSubscriptionMain__scheduleList}>
                    {selectedServices.map((selected, index) => {
                      const service = services.find(
                        (s) => s.id === selected.serviceId
                      );
                      if (!service) return null;

                      return (
                        <motion.div
                          key={selected.serviceId}
                          className={styles.addSubscriptionMain__scheduleCard}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div
                            className={
                              styles.addSubscriptionMain__scheduleHeader
                            }
                          >
                            <div
                              className={
                                styles.addSubscriptionMain__scheduleIcon
                              }
                              style={{
                                backgroundColor: `${service.color}15`,
                                color: service.color,
                              }}
                            >
                              {service.icon}
                            </div>
                            <h3
                              className={
                                styles.addSubscriptionMain__scheduleTitle
                              }
                            >
                              {service.name}
                            </h3>
                          </div>

                          <div
                            className={styles.addSubscriptionMain__scheduleGrid}
                          >
                            {/* Frequency Selection */}
                            <div
                              className={
                                styles.addSubscriptionMain__scheduleField
                              }
                            >
                              <label
                                className={
                                  styles.addSubscriptionMain__scheduleLabel
                                }
                              >
                                <Calendar size={16} />
                                Frequency
                              </label>
                              <div
                                className={
                                  styles.addSubscriptionMain__frequencyOptions
                                }
                              >
                                {frequencyOptions.map((freq) => (
                                  <motion.button
                                    key={freq.value}
                                    className={`${styles.addSubscriptionMain__frequencyOption} ${
                                      selected.schedule.frequency === freq.value
                                        ? styles[
                                            "addSubscriptionMain__frequencyOption--selected"
                                          ]
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setSelectedServices((prev) =>
                                        prev.map((s) =>
                                          s.serviceId === selected.serviceId
                                            ? {
                                                ...s,
                                                schedule: {
                                                  ...s.schedule,
                                                  frequency: freq.value,
                                                },
                                              }
                                            : s
                                        )
                                      );
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <span
                                      className={
                                        styles.addSubscriptionMain__frequencyLabel
                                      }
                                    >
                                      {freq.label}
                                    </span>
                                    <span
                                      className={
                                        styles.addSubscriptionMain__frequencyDesc
                                      }
                                    >
                                      {freq.description}
                                    </span>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Days Selection */}
                            <div
                              className={
                                styles.addSubscriptionMain__scheduleField
                              }
                            >
                              <label
                                className={
                                  styles.addSubscriptionMain__scheduleLabel
                                }
                              >
                                <CalendarCheck size={16} />
                                Preferred Days
                              </label>
                              <div
                                className={styles.addSubscriptionMain__daysGrid}
                              >
                                {daysOfWeek.map((day) => (
                                  <motion.button
                                    key={day.short}
                                    className={`${styles.addSubscriptionMain__dayOption} ${
                                      selected.schedule.days?.includes(
                                        day.short
                                      )
                                        ? styles[
                                            "addSubscriptionMain__dayOption--selected"
                                          ]
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setSelectedServices((prev) =>
                                        prev.map((s) => {
                                          if (
                                            s.serviceId !== selected.serviceId
                                          )
                                            return s;
                                          const days = s.schedule.days || [];
                                          const newDays = days.includes(
                                            day.short
                                          )
                                            ? days.filter(
                                                (d) => d !== day.short
                                              )
                                            : [...days, day.short];
                                          return {
                                            ...s,
                                            schedule: {
                                              ...s.schedule,
                                              days: newDays,
                                            },
                                          };
                                        })
                                      );
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <span
                                      className={
                                        styles.addSubscriptionMain__dayShort
                                      }
                                    >
                                      {day.short}
                                    </span>
                                    <span
                                      className={
                                        styles.addSubscriptionMain__dayFull
                                      }
                                    >
                                      {day.full}
                                    </span>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Time Selection */}
                            <div
                              className={
                                styles.addSubscriptionMain__scheduleField
                              }
                            >
                              <label
                                className={
                                  styles.addSubscriptionMain__scheduleLabel
                                }
                              >
                                <Clock size={16} />
                                Preferred Time
                              </label>
                              <div
                                className={styles.addSubscriptionMain__timeGrid}
                              >
                                {timeSlots.map((slot) => (
                                  <motion.button
                                    key={slot.value}
                                    className={`${styles.addSubscriptionMain__timeOption} ${
                                      selected.schedule.time === slot.value
                                        ? styles[
                                            "addSubscriptionMain__timeOption--selected"
                                          ]
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setSelectedServices((prev) =>
                                        prev.map((s) =>
                                          s.serviceId === selected.serviceId
                                            ? {
                                                ...s,
                                                schedule: {
                                                  ...s.schedule,
                                                  time: slot.value,
                                                },
                                              }
                                            : s
                                        )
                                      );
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <span
                                      className={
                                        styles.addSubscriptionMain__timeIcon
                                      }
                                    >
                                      {slot.icon}
                                    </span>
                                    <span
                                      className={
                                        styles.addSubscriptionMain__timeValue
                                      }
                                    >
                                      {slot.time}
                                    </span>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review & Confirm - Enhanced */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.addSubscriptionMain__stepHeader}>
                    <h2 className={styles.addSubscriptionMain__stepTitle}>
                      Review Your Subscription
                    </h2>
                    <p className={styles.addSubscriptionMain__stepDescription}>
                      Confirm your selections and proceed to checkout
                    </p>
                  </div>

                  <div className={styles.addSubscriptionMain__reviewGrid}>
                    {/* Summary Card */}
                    <div className={styles.addSubscriptionMain__summaryCard}>
                      <h3 className={styles.addSubscriptionMain__summaryTitle}>
                        Subscription Summary
                      </h3>

                      <div
                        className={styles.addSubscriptionMain__summaryServices}
                      >
                        {selectedServices.map((selected) => {
                          const service = services.find(
                            (s) => s.id === selected.serviceId
                          );
                          if (!service) return null;
                          const frequency = frequencyOptions.find(
                            (f) => f.value === selected.schedule.frequency
                          );

                          return (
                            <div
                              key={selected.serviceId}
                              className={
                                styles.addSubscriptionMain__summaryService
                              }
                            >
                              <div
                                className={
                                  styles.addSubscriptionMain__summaryServiceHeader
                                }
                              >
                                <div
                                  className={
                                    styles.addSubscriptionMain__summaryServiceIcon
                                  }
                                  style={{
                                    backgroundColor: `${service.color}15`,
                                    color: service.color,
                                  }}
                                >
                                  {service.icon}
                                </div>
                                <div
                                  className={
                                    styles.addSubscriptionMain__summaryServiceInfo
                                  }
                                >
                                  <h4>{service.name}</h4>
                                  <p>
                                    {frequency?.label} •{" "}
                                    {selected.schedule.days?.join(", ")} •{" "}
                                    {selected.schedule.time}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={
                                  styles.addSubscriptionMain__summaryServicePrice
                                }
                              >
                                <span
                                  className={
                                    styles.addSubscriptionMain__priceLabel
                                  }
                                >
                                  ₦{selected.price.toLocaleString()} ×{" "}
                                  {frequency?.multiplier}
                                </span>
                                <span
                                  className={
                                    styles.addSubscriptionMain__priceValue
                                  }
                                >
                                  ₦
                                  {(
                                    selected.price *
                                    (frequency?.multiplier || 1)
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div
                        className={styles.addSubscriptionMain__summaryFooter}
                      >
                        <div
                          className={styles.addSubscriptionMain__summaryTotal}
                        >
                          <span>Total Monthly Cost</span>
                          <span
                            className={
                              styles.addSubscriptionMain__summaryTotalValue
                            }
                          >
                            ₦{totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div
                          className={styles.addSubscriptionMain__summarySavings}
                        >
                          <Sparkles size={16} />
                          You save ₦{monthlySavings.toLocaleString()} monthly (
                          {savingsPercentage}%)
                        </div>
                      </div>
                    </div>

                    {/* Benefits Card */}
                    <div className={styles.addSubscriptionMain__benefitsCard}>
                      <h3 className={styles.addSubscriptionMain__benefitsTitle}>
                        Your Benefits
                      </h3>
                      <div className={styles.addSubscriptionMain__benefitsList}>
                        {[
                          "30% savings on all services",
                          "Priority scheduling",
                          "Dedicated service team",
                          "Flexible rescheduling",
                          "Monthly billing",
                          "Cancel anytime",
                          "Quality guarantee",
                          "24/7 support",
                        ].map((benefit) => (
                          <motion.div
                            key={benefit}
                            className={styles.addSubscriptionMain__benefitItem}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Check
                              size={18}
                              className={
                                styles.addSubscriptionMain__benefitIcon
                              }
                            />
                            <span>{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Footer */}
          <div className={styles.addSubscriptionMain__footer}>
            <motion.button
              className={`${styles.addSubscriptionMain__footerBtn} ${
                styles["addSubscriptionMain__footerBtn--secondary"]
              }`}
              onClick={prevStep}
              disabled={currentStep === 1}
              whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
            >
              <ChevronLeft size={20} />
              Previous
            </motion.button>

            <div className={styles.addSubscriptionMain__footerCenter}>
              {currentStep < 4 && selectedServices.length > 0 && (
                <motion.div
                  className={styles.addSubscriptionMain__footerPrice}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span
                    className={styles.addSubscriptionMain__footerPriceLabel}
                  >
                    Monthly Total
                  </span>
                  <span
                    className={styles.addSubscriptionMain__footerPriceValue}
                  >
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </motion.div>
              )}
            </div>

            {currentStep < 4 ? (
              <motion.button
                className={`${styles.addSubscriptionMain__footerBtn} ${
                  styles["addSubscriptionMain__footerBtn--primary"]
                }`}
                onClick={nextStep}
                disabled={currentStep === 1 && selectedServices.length === 0}
                whileHover={
                  !(currentStep === 1 && selectedServices.length === 0)
                    ? { scale: 1.02 }
                    : {}
                }
                whileTap={
                  !(currentStep === 1 && selectedServices.length === 0)
                    ? { scale: 0.98 }
                    : {}
                }
              >
                Next
                <ChevronRight size={20} />
              </motion.button>
            ) : (
              <motion.button
                className={`${styles.addSubscriptionMain__footerBtn} ${
                  styles["addSubscriptionMain__footerBtn--accent"]
                }`}
                onClick={() => console.log("Proceed to checkout")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </motion.button>
            )}
          </div>
        </div>

        {/* Configuration Modal */}

        <ConfigurationModal
          isOpen={showConfigModal}
          service={currentConfigService}
          initialConfig={
            editingService && currentConfigService
              ? selectedServices.find((s) => s.serviceId === editingService)
                  ?.config || {}
              : {}
          }
          onClose={() => setShowConfigModal(false)}
          onSave={saveServiceConfig}
          calculateServicePrice={calculateServicePrice}
        />
      </div>
    </div>
  );
}
