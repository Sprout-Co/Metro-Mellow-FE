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
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import styles from "./AddSubscriptionMain.module.scss";
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";

// Service Types
interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  color: string;
  description: string;
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

// Mock Service Data
const services: ServiceOption[] = [
  {
    id: "cleaning",
    name: "House Cleaning",
    icon: <Home />,
    basePrice: 15000,
    color: "#075056",
    description: "Professional home cleaning services",
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
    icon: <Droplets />,
    basePrice: 5000,
    color: "#6366f1",
    description: "Wash, dry, fold & iron services",
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
    icon: <Utensils />,
    basePrice: 30000,
    color: "#fe5b04",
    description: "Fresh home-cooked meals",
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
    icon: <Bug />,
    basePrice: 20000,
    color: "#10b981",
    description: "Safe & effective pest management",
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
  { value: "daily", label: "Daily", multiplier: 30 },
  { value: "weekly", label: "Weekly", multiplier: 4 },
  { value: "biweekly", label: "Bi-Weekly", multiplier: 2 },
  { value: "monthly", label: "Monthly", multiplier: 1 },
];

// Time Slots
const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

// Days of Week
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

  return (
    <div className={styles.addSubscriptionMain}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Header Section */}
          <div className={styles.addSubscriptionMain__header}>
            <div>
              <div className={styles.addSubscriptionMain__headerContent}>
                <h1 className={styles.addSubscriptionMain__title}>
                  Create Your Subscription
                </h1>
                <p className={styles.addSubscriptionMain__subtitle}>
                  Bundle multiple services into one convenient monthly plan
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className={styles.progress}>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={styles.progressStep}
                onClick={() => step <= currentStep && setCurrentStep(step)}
              >
                <div
                  className={`${styles.progressNumber} ${
                    step === currentStep ? styles.active : ""
                  } ${step < currentStep ? styles.completed : ""}`}
                >
                  {step < currentStep ? <Check size={16} /> : step}
                </div>
                <span className={styles.progressLabel}>
                  {step === 1
                    ? "Services"
                    : step === 2
                      ? "Configure"
                      : step === 3
                        ? "Schedule"
                        : "Review"}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className={styles.content}>
            <AnimatePresence mode="wait">
              {/* Step 1: Choose Services */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>Choose Your Services</h2>
                    <p className={styles.stepDescription}>
                      Select the services you'd like to include in your
                      subscription
                    </p>
                  </div>

                  <div className={styles.servicesGrid}>
                    {services.map((service) => {
                      const isSelected = selectedServices.some(
                        (s) => s.serviceId === service.id
                      );

                      return (
                        <motion.div
                          key={service.id}
                          className={`${styles.serviceCard} ${
                            isSelected ? styles.selected : ""
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleService(service.id)}
                        >
                          <div
                            className={styles.serviceIcon}
                            style={{
                              backgroundColor: `${service.color}15`,
                              color: service.color,
                            }}
                          >
                            {service.icon}
                          </div>
                          <h3 className={styles.serviceTitle}>
                            {service.name}
                          </h3>
                          <p className={styles.serviceDescription}>
                            {service.description}
                          </p>
                          <div className={styles.servicePrice}>
                            Starting from ₦{service.basePrice.toLocaleString()}
                            /month
                          </div>
                          {isSelected && (
                            <div className={styles.selectedBadge}>
                              <CheckCircle size={16} />
                              Selected
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Configure Services */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>
                      Configure Your Services
                    </h2>
                    <p className={styles.stepDescription}>
                      Customize each service to match your needs
                    </p>
                  </div>

                  {selectedServices.map((selected) => {
                    const service = services.find(
                      (s) => s.id === selected.serviceId
                    );
                    if (!service) return null;

                    return (
                      <div
                        key={selected.serviceId}
                        className={styles.configuredService}
                      >
                        <div className={styles.configuredHeader}>
                          <div
                            className={styles.serviceIcon}
                            style={{
                              backgroundColor: `${service.color}15`,
                              color: service.color,
                            }}
                          >
                            {service.icon}
                          </div>
                          <div className={styles.configuredInfo}>
                            <h3 className={styles.configuredTitle}>
                              {service.name}
                            </h3>
                            <div className={styles.configuredPrice}>
                              ₦{selected.price.toLocaleString()}/month
                            </div>
                          </div>
                          <button
                            className={styles.editButton}
                            onClick={() => editService(selected.serviceId)}
                          >
                            <Edit2 size={18} />
                            Edit
                          </button>
                        </div>

                        <div className={styles.configuredDetails}>
                          {Object.entries(selected.config).map(
                            ([key, value]) => {
                              const option = service.configOptions.find(
                                (o) => o.id === key
                              );
                              if (!option) return null;

                              let displayValue = value;
                              if (option.type === "radio") {
                                displayValue =
                                  option.options?.find((o) => o.value === value)
                                    ?.label || value;
                              } else if (Array.isArray(value)) {
                                displayValue = value
                                  .map(
                                    (v) =>
                                      option.options?.find((o) => o.value === v)
                                        ?.label || v
                                  )
                                  .join(", ");
                              }

                              return (
                                <div
                                  key={key}
                                  className={styles.configuredDetail}
                                >
                                  <span className={styles.detailLabel}>
                                    {option.label}:
                                  </span>
                                  <span className={styles.detailValue}>
                                    {displayValue}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* Step 3: Schedule Services */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>Set Your Schedule</h2>
                    <p className={styles.stepDescription}>
                      Choose when you'd like each service to be performed
                    </p>
                  </div>

                  {selectedServices.map((selected) => {
                    const service = services.find(
                      (s) => s.id === selected.serviceId
                    );
                    if (!service) return null;

                    return (
                      <div
                        key={selected.serviceId}
                        className={styles.scheduleService}
                      >
                        <div className={styles.scheduleHeader}>
                          <div
                            className={styles.serviceIcon}
                            style={{
                              backgroundColor: `${service.color}15`,
                              color: service.color,
                            }}
                          >
                            {service.icon}
                          </div>
                          <h3 className={styles.configuredTitle}>
                            {service.name}
                          </h3>
                        </div>

                        <div className={styles.scheduleOptions}>
                          <div className={styles.scheduleField}>
                            <label className={styles.configLabel}>
                              Frequency
                            </label>
                            <select
                              className={styles.select}
                              value={selected.schedule.frequency}
                              onChange={(e) => {
                                setSelectedServices((prev) =>
                                  prev.map((s) =>
                                    s.serviceId === selected.serviceId
                                      ? {
                                          ...s,
                                          schedule: {
                                            ...s.schedule,
                                            frequency: e.target.value,
                                          },
                                        }
                                      : s
                                  )
                                );
                              }}
                            >
                              {frequencyOptions.map((freq) => (
                                <option key={freq.value} value={freq.value}>
                                  {freq.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className={styles.scheduleField}>
                            <label className={styles.configLabel}>
                              Preferred Days
                            </label>
                            <div className={styles.scheduleDays}>
                              {daysOfWeek.map((day) => (
                                <button
                                  key={day}
                                  className={`${styles.dayButton} ${
                                    selected.schedule.days?.includes(day)
                                      ? styles.dayButtonSelected
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setSelectedServices((prev) =>
                                      prev.map((s) => {
                                        if (s.serviceId !== selected.serviceId)
                                          return s;
                                        const days = s.schedule.days || [];
                                        const newDays = days.includes(day)
                                          ? days.filter((d) => d !== day)
                                          : [...days, day];
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
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className={styles.scheduleField}>
                            <label className={styles.configLabel}>
                              Preferred Time
                            </label>
                            <select
                              className={styles.select}
                              value={selected.schedule.time}
                              onChange={(e) => {
                                setSelectedServices((prev) =>
                                  prev.map((s) =>
                                    s.serviceId === selected.serviceId
                                      ? {
                                          ...s,
                                          schedule: {
                                            ...s.schedule,
                                            time: e.target.value,
                                          },
                                        }
                                      : s
                                  )
                                );
                              }}
                            >
                              {timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* Step 4: Review & Confirm */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>
                      Review Your Subscription
                    </h2>
                    <p className={styles.stepDescription}>
                      Confirm your selections and proceed to checkout
                    </p>
                  </div>

                  <div className={styles.invoice}>
                    <div className={styles.invoiceHeader}>
                      <h3 className={styles.invoiceTitle}>
                        Subscription Summary
                      </h3>
                      <div>Starting: {new Date().toLocaleDateString()}</div>
                    </div>

                    <div className={styles.invoiceServices}>
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
                            className={styles.invoiceService}
                          >
                            <div className={styles.invoiceServiceHeader}>
                              <div
                                className={styles.serviceIcon}
                                style={{
                                  backgroundColor: `${service.color}15`,
                                  color: service.color,
                                }}
                              >
                                {service.icon}
                              </div>
                              <div className={styles.invoiceServiceInfo}>
                                <h4 className={styles.invoiceServiceName}>
                                  {service.name}
                                </h4>
                                <div className={styles.invoiceServiceSchedule}>
                                  <Calendar size={14} />
                                  {frequency?.label} •{" "}
                                  {selected.schedule.days?.join(", ")} •{" "}
                                  {selected.schedule.time}
                                </div>
                              </div>
                              <div
                                className={styles.invoiceServicePriceContainer}
                              >
                                <div>
                                  ₦{selected.price.toLocaleString()} ×{" "}
                                  {frequency?.multiplier}
                                </div>
                                <div className={styles.invoiceServicePrice}>
                                  ₦
                                  {(
                                    selected.price *
                                    (frequency?.multiplier || 1)
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <div className={styles.invoiceTotal}>
                        <span>Total Monthly Cost</span>
                        <span>₦{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className={styles.invoiceSavings}>
                        <TrendingUp size={16} />
                        You save 30% with subscription!
                      </div>
                    </div>
                  </div>

                  <div className={styles.benefitsContainer}>
                    <h3 className={styles.benefitsTitle}>
                      Subscription Benefits
                    </h3>
                    <div className={styles.benefitsList}>
                      {[
                        "30% savings on all services",
                        "Priority scheduling",
                        "Dedicated service team",
                        "Flexible rescheduling",
                        "Cancel anytime",
                      ].map((benefit) => (
                        <div key={benefit} className={styles.benefit}>
                          <CheckCircle size={20} color="#059669" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className={styles.footer}>
            <button
              className={`${styles.button} ${styles.buttonGhost}`}
              style={{
                opacity: currentStep === 1 ? 0.5 : 1,
                cursor: currentStep === 1 ? "not-allowed" : "pointer",
              }}
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div>
              {currentStep < 4 && selectedServices.length > 0 && (
                <div className={styles.footerPrice}>
                  Total: ₦{totalPrice.toLocaleString()}/month
                </div>
              )}
            </div>

            {currentStep < 4 ? (
              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                style={{
                  opacity:
                    currentStep === 1 && selectedServices.length === 0
                      ? 0.5
                      : 1,
                  cursor:
                    currentStep === 1 && selectedServices.length === 0
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={nextStep}
                disabled={currentStep === 1 && selectedServices.length === 0}
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                className={`${styles.button} ${styles.buttonAccent}`}
                style={{}}
                onClick={() => console.log("Proceed to checkout")}
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </button>
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
