"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Minus, Plus } from "lucide-react";
import styles from "./LaundryServiceConfiguration.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import ValidationErrors from "../../ValidationErrors/ValidationErrors";
import {
  Service,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  SubscriptionServiceInput,
  LaundryType,
  ServiceId,
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

const LaundryServiceConfiguration: React.FC<
  LaundryServiceConfigurationProps
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
    scheduledDays: [ScheduleDays.Monday],
    preferredTimeSlot: TimeSlot.Morning,
    price: service.price,
    category: service.category,
    serviceDetails: {
      laundry: {
        laundryType: LaundryType.StandardLaundry,
        bags: 1,
      },
      serviceOption:
        service.options?.[0]?.service_id || ServiceId.StandardLaundry,
    },
  });

  const steps = [
    { id: "service", label: "Package" },
    { id: "details", label: "Details" },
    { id: "schedule", label: "Schedule" },
    { id: "summary", label: "Review" },
  ];

  const frequencies = [
    {
      value: SubscriptionFrequency.Weekly,
      label: "Weekly",
      description: "Every week",
      popular: true,
    },
    {
      value: SubscriptionFrequency.BiWeekly,
      label: "Bi-Weekly",
      description: "Every 2 weeks",
    },
    {
      value: SubscriptionFrequency.Monthly,
      label: "Monthly",
      description: "Once a month",
    },
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
    // {
    //   value: TimeSlot.Evening,
    //   label: "Evening",
    //   time: "4PM - 8PM",
    //   icon: "🌆",
    // },
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
      const isSelected = currentDays.includes(day);
      const isMonthly = prev.frequency === SubscriptionFrequency.Monthly;

      if (isMonthly) {
        return { ...prev, scheduledDays: isSelected ? [] : [day] };
      }

      return {
        ...prev,
        scheduledDays: isSelected
          ? currentDays.filter((d) => d !== day)
          : [...currentDays, day],
      };
    });
  };

  const calculatePrice = useMemo(() => {
    const selectedOption = configuration.serviceDetails.serviceOption;
    const bagsPerPickup = configuration.serviceDetails.laundry?.bags || 1;
    const daysCount = configuration.scheduledDays?.length || 0;

    let basePrice =
      service.options?.find((opt) => opt.service_id === selectedOption)
        ?.price || 0;

    let frequencyMultiplier = 4;
    if (configuration.frequency === SubscriptionFrequency.BiWeekly) {
      frequencyMultiplier = 2;
    } else if (configuration.frequency === SubscriptionFrequency.Monthly) {
      frequencyMultiplier = 1;
    }

    return basePrice * bagsPerPickup * daysCount * frequencyMultiplier;
  }, [configuration, service]);

  useEffect(() => {
    if (
      configuration.frequency === SubscriptionFrequency.Monthly &&
      configuration.scheduledDays &&
      configuration.scheduledDays.length > 1
    ) {
      setConfiguration((prev) => ({
        ...prev,
        scheduledDays: [prev.scheduledDays![0]],
      }));
    }
  }, [configuration.frequency]);

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
          !service.options?.length ||
          !!configuration.serviceDetails.serviceOption
        );
      case 1:
        return (configuration.serviceDetails.laundry?.bags || 0) > 0;
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

  const updateBagCount = (increment: boolean) => {
    setConfiguration((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        laundry: {
          ...prev.serviceDetails.laundry!,
          bagsPerPickup: Math.max(
            1,
            Math.min(
              10,
              (prev.serviceDetails.laundry?.bags || 1) + (increment ? 1 : -1)
            )
          ),
        },
      },
    }));
  };

  // Step 1: Package
  const renderServiceStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Select Package</h3>
        <p>Choose your laundry service</p>
      </div>

      {service.options && service.options.length > 0 && (
        <div className={styles.drawer__section}>
          <div className={styles.drawer__optionsGrid}>
            {service.options.map((option) => (
              <button
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
                      laundry: {
                        ...prev.serviceDetails.laundry!,
                        laundryType:
                          option.service_id as unknown as LaundryType,
                      },
                      serviceOption: option.service_id,
                    },
                  }))
                }
              >
                <div>
                  <h4>{option.label}</h4>
                  <p>{option.description}</p>
                </div>
                <span className={styles.drawer__optionPrice}>
                  ₦{option.price.toLocaleString()}/bag
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  // Step 2: Details
  const renderDetailsStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Bag Count</h3>
        <p>How many bags per pickup?</p>
      </div>

      <div className={styles.drawer__section}>
        <div className={styles.drawer__bagSelector}>
          <div className={styles.drawer__bagInputWrapper}>
            <button
              className={styles.drawer__bagButton}
              onClick={() => updateBagCount(false)}
              disabled={(configuration.serviceDetails.laundry?.bags || 1) <= 1}
            >
              <Minus size={18} />
            </button>
            <span className={styles.drawer__bagCount}>
              {configuration.serviceDetails.laundry?.bags || 1}
            </span>
            <button
              className={styles.drawer__bagButton}
              onClick={() => updateBagCount(true)}
              disabled={(configuration.serviceDetails.laundry?.bags || 1) >= 10}
            >
              <Plus size={18} />
            </button>
          </div>
          <div className={styles.drawer__bagInfo}>
            <span>bags per pickup</span>
          </div>
        </div>
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Frequency</label>
        <div className={styles.drawer__frequencyGrid}>
          {frequencies.map((freq) => (
            <button
              key={freq.value}
              className={`${styles.drawer__frequencyCard} ${
                configuration.frequency === freq.value
                  ? styles["drawer__frequencyCard--active"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({ ...prev, frequency: freq.value }))
              }
            >
              {freq.popular && (
                <span className={styles.drawer__popularTag}>Popular</span>
              )}
              <div className={styles.drawer__frequencyContent}>
                <h4>{freq.label}</h4>
                <p>{freq.description}</p>
              </div>
              {configuration.frequency === freq.value && (
                <div className={styles.drawer__checkmark}>
                  <Check size={12} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Step 3: Schedule
  const renderScheduleStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Schedule</h3>
        <p>Select pickup days and time</p>
      </div>

      {configuration.frequency === SubscriptionFrequency.Monthly && (
        <div className={styles.drawer__scheduleNote}>
          <p>Monthly allows only one pickup day</p>
        </div>
      )}

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Pickup Days</label>
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

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Pickup Time</label>
        <div className={styles.drawer__timeGrid}>
          {timeSlots.map((slot) => (
            <button
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
            >
              <span className={styles.drawer__timeIcon}>{slot.icon}</span>
              <div className={styles.drawer__timeInfo}>
                <h4>{slot.label}</h4>
                <p>{slot.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Step 4: Summary
  const renderSummaryStep = () => {
    const selectedOption = service.options?.find(
      (opt) => opt.service_id === configuration.serviceDetails.serviceOption
    );
    const selectedDays = configuration.scheduledDays || [];
    const selectedTime = timeSlots.find(
      (t) => t.value === configuration.preferredTimeSlot
    );
    const frequencyLabel = frequencies.find(
      (f) => f.value === configuration.frequency
    )?.label;
    const bagsPerPickup = configuration.serviceDetails.laundry?.bags || 1;

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
                ₦{selectedOption.price.toLocaleString()}/bag
              </span>
            </div>
          </div>
        )}

        <div className={styles.summary__section}>
          <h4 className={styles.summary__sectionTitle}>Details</h4>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Bags per pickup</span>
            <span className={styles.summary__value}>{bagsPerPickup}</span>
          </div>
        </div>

        <div className={styles.summary__section}>
          <h4 className={styles.summary__sectionTitle}>Schedule</h4>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Frequency</span>
            <span className={styles.summary__value}>{frequencyLabel}</span>
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
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Time</span>
            <span className={styles.summary__value}>{selectedTime?.label}</span>
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
        return renderServiceStep();
      case 1:
        return renderDetailsStep();
      case 2:
        return renderScheduleStep();
      case 3:
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

export default LaundryServiceConfiguration;
