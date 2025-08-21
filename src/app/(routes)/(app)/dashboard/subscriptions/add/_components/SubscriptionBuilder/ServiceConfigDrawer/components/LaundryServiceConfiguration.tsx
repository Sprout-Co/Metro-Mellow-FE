"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Droplets,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Shield,
  Package,
} from "lucide-react";
import styles from "../ServiceConfigDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import ValidationErrors from "../../components/ValidationErrors";
import {
  Service,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  SubscriptionServiceInput,
} from "@/graphql/api";
import {
  validateServiceConfiguration,
  ValidationError,
  hasFieldError,
} from "../../validation";

interface LaundryServiceConfigurationProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  existingConfiguration?: SubscriptionServiceInput;
  onSave: (configuration: SubscriptionServiceInput) => void;
  onProceedToCheckout?: (configuration: SubscriptionServiceInput) => void;
}

const LaundryServiceConfiguration: React.FC<LaundryServiceConfigurationProps> = ({
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
    serviceId: service._id,
    frequency: SubscriptionFrequency.Weekly,
    scheduledDays: [],
    preferredTimeSlot: TimeSlot.Morning,
    price: service.price,
    category: service.category,
    serviceDetails: {
      serviceOption: service.options?.[0]?.id || "",
    },
  });

  const steps = [
    { id: "details", label: "Details", icon: <Droplets size={18} /> },
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

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => {
      const currentDays = prev.scheduledDays || [];
      const isCurrentlySelected = currentDays.includes(day);
      const shouldLimitToOneDay = prev.frequency === SubscriptionFrequency.Monthly;

      if (shouldLimitToOneDay) {
        if (isCurrentlySelected) {
          return { ...prev, scheduledDays: currentDays.filter((d) => d !== day) };
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
      if (prev.frequency === SubscriptionFrequency.Monthly && prev.scheduledDays && prev.scheduledDays.length > 1) {
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
        return true;
      case 1:
        return configuration.frequency;
      case 2:
        return configuration.scheduledDays && configuration.scheduledDays.length > 0;
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
        <h3>Laundry Service Details</h3>
        <p>Configure your laundry service preferences</p>
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

      <div className={styles.drawer__section}>
        <div className={styles.drawer__infoCard}>
          <div className={styles.drawer__infoIcon}>
            <Droplets size={32} />
          </div>
          <div className={styles.drawer__infoContent}>
            <h4>Professional Laundry Service</h4>
            <p>
              Our laundry service includes pickup, professional washing, drying, 
              and folding with premium detergents and fabric care.
            </p>
            <ul>
              <li>✓ Free pickup and delivery</li>
              <li>✓ Premium detergents and softeners</li>
              <li>✓ Careful handling of delicate items</li>
              <li>✓ Professional folding and packaging</li>
            </ul>
          </div>
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
        <h3>How often do you need laundry service?</h3>
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
        <h3>Set your pickup schedule</h3>
        <p>Select days and preferred time for pickup and delivery</p>
        {configuration.frequency === SubscriptionFrequency.Monthly && (
          <div className={styles.drawer__scheduleNote}>
            <p>📅 Monthly frequency allows only one pickup day per month</p>
          </div>
        )}
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>
          Select Pickup Days <span className={styles.drawer__required}>*</span>
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
        <label className={styles.drawer__label}>Preferred Pickup Time</label>
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
          <h3>Perfect! Let's Review Your Laundry Service</h3>
          <p>Your personalized laundry configuration is ready</p>
        </div>

        {/* Service Overview */}
        <motion.div className={styles.drawer__serviceOverview}>
          <div className={styles.drawer__serviceHeader}>
            <div className={styles.drawer__serviceIconLarge}>
              <Droplets size={24} />
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
                <h6>Premium Care</h6>
                <p>Professional handling with premium detergents and care</p>
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
            <p>Customize your laundry service preferences</p>
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
                index === activeStep ? styles["drawer__progressStep--active"] : ""
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

export default LaundryServiceConfiguration;