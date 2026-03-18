"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import styles from "./PestControlServiceConfiguration.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import ValidationErrors from "../../ValidationErrors/ValidationErrors";
import {
  Service,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  SubscriptionServiceInput,
  TreatmentType,
  Severity,
  ServiceId,
  HouseType,
  PropertyType,
} from "@/graphql/api";
import {
  validateServiceConfiguration,
  ValidationError,
  hasFieldError,
} from "../../validation";

interface PestControlServiceConfigurationProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  existingConfiguration?: SubscriptionServiceInput;
  onSave: (configuration: SubscriptionServiceInput) => void;
  onProceedToCheckout?: (configuration: SubscriptionServiceInput) => void;
}

const PestControlServiceConfiguration: React.FC<
  PestControlServiceConfigurationProps
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
    frequency: SubscriptionFrequency.Monthly,
    scheduledDays: [ScheduleDays.Monday],
    preferredTimeSlot: TimeSlot.Morning,
    price: service.price,
    category: service.category,
    serviceDetails: {
      pestControl: {
        treatmentType: TreatmentType.PestControlResidential,
        severity: Severity.Low,
        areas: [
          "Kitchen",
          "Living Room",
          "Bedroom",
          "Bathroom",
          "Office",
          "Other",
        ],
      },
      serviceOption:
        service.options?.[0]?.service_id || ServiceId.PestControlResidential,
    },
  });

  const steps = [
    { id: "service", label: "Treatment" },
    { id: "details", label: "Details" },
    { id: "schedule", label: "Schedule" },
    { id: "summary", label: "Review" },
  ];

  const propertyTypes = [
    { value: HouseType.Flat, label: "Flat/Apartment", icon: "🏢" },
    { value: HouseType.Duplex, label: "Duplex/House", icon: "🏠" },
  ];

  const severityLevels = [
    {
      value: Severity.Low,
      label: "Mild",
      description: "Minor infestation",
      icon: "🟢",
    },
    {
      value: Severity.Medium,
      label: "Moderate",
      description: "Noticeable infestation",
      icon: "🟡",
    },
    {
      value: Severity.High,
      label: "Severe",
      description: "Heavy infestation",
      icon: "🔴",
    },
  ];

  const frequencies = [
    {
      value: SubscriptionFrequency.Monthly,
      label: "Monthly",
      description: "Once a month",
      popular: true,
    },
    {
      value: SubscriptionFrequency.BiWeekly,
      label: "Bi-Weekly",
      description: "Every 2 weeks",
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
        setConfiguration(existingConfiguration);
      }
    }
  }, [isOpen, existingConfiguration]);

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => {
      const currentDays = prev.scheduledDays || [];
      const isSelected = currentDays.includes(day);

      // Monthly allows only one day
      if (prev.frequency === SubscriptionFrequency.Monthly) {
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
    const severity = configuration.serviceDetails.pestControl?.severity;
    const propertyType = configuration.serviceDetails.pestControl?.areas;
    const daysCount = configuration.scheduledDays?.length || 0;

    let basePrice =
      service.options?.find((opt) => opt.service_id === selectedOption)
        ?.price || 0;

    // Severity multiplier
    let severityMultiplier = 1;
    if (severity === Severity.Medium) {
      severityMultiplier = 1.5;
    } else if (severity === Severity.High) {
      severityMultiplier = 2;
    }

    // Property multiplier
    let propertyMultiplier = 1;
    // if (propertyType === HouseType.Duplex) {
    //   propertyMultiplier = 1.5;
    // }

    // Frequency multiplier
    let frequencyMultiplier = 1;
    if (configuration.frequency === SubscriptionFrequency.BiWeekly) {
      frequencyMultiplier = 2;
    }

    return (
      basePrice *
      severityMultiplier *
      propertyMultiplier *
      daysCount *
      frequencyMultiplier
    );
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
          !service.options?.length ||
          !!configuration.serviceDetails.serviceOption
        );
      case 1:
        return (
          !!configuration.serviceDetails.pestControl?.severity &&
          !!configuration.serviceDetails.pestControl?.areas
        );
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

  // Step 1: Treatment Type
  const renderServiceStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.drawer__stepContent}
    >
      <div className={styles.drawer__stepHeader}>
        <h3>Select Treatment</h3>
        <p>Choose pest control treatment</p>
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
                      pestControl: {
                        ...prev.serviceDetails.pestControl!,
                        treatmentType:
                          option.service_id as unknown as TreatmentType,
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
                  ₦{option.price.toLocaleString()}
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
        <h3>Property Details</h3>
        <p>Tell us about your property</p>
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Property Type</label>
        <div className={styles.drawer__propertyGrid}>
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              className={`${styles.drawer__propertyCard} ${
                configuration.serviceDetails.pestControl?.areas?.includes(
                  type.value
                )
                  ? styles["drawer__propertyCard--active"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({
                  ...prev,
                  serviceDetails: {
                    ...prev.serviceDetails,
                    pestControl: {
                      ...prev.serviceDetails.pestControl!,
                      areas: [
                        ...(prev.serviceDetails.pestControl?.areas || []),
                        type.value,
                      ],
                    },
                  },
                }))
              }
            >
              <span className={styles.drawer__propertyIcon}>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Infestation Severity</label>
        <div className={styles.drawer__severityGrid}>
          {severityLevels.map((level) => (
            <button
              key={level.value}
              className={`${styles.drawer__severityCard} ${
                configuration.serviceDetails.pestControl?.severity ===
                level.value
                  ? level.value === Severity.Low
                    ? styles["drawer__severityCard--success"]
                    : level.value === Severity.Medium
                      ? styles["drawer__severityCard--warning"]
                      : styles["drawer__severityCard--danger"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({
                  ...prev,
                  serviceDetails: {
                    ...prev.serviceDetails,
                    pestControl: {
                      ...prev.serviceDetails.pestControl!,
                      severity: level.value,
                    },
                  },
                }))
              }
            >
              <span className={styles.drawer__severityIcon}>{level.icon}</span>
              <div className={styles.drawer__severityContent}>
                <h4>{level.label}</h4>
                <p>{level.description}</p>
              </div>
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
        <p>Set your treatment schedule</p>
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
                <span className={styles.drawer__popularTag}>Recommended</span>
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

      {configuration.frequency === SubscriptionFrequency.Monthly && (
        <div className={styles.drawer__scheduleNote}>
          <p>Monthly allows one treatment day per month</p>
        </div>
      )}

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>Treatment Day</label>
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
        <label className={styles.drawer__label}>Preferred Time</label>
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
    const severityInfo = severityLevels.find(
      (s) => s.value === configuration.serviceDetails.pestControl?.severity
    );
    const propertyInfo = propertyTypes.find((p) =>
      Array.isArray(configuration.serviceDetails.pestControl?.areas)
        ? (
            configuration.serviceDetails.pestControl?.areas as string[]
          ).includes(p.value)
        : p.value === configuration.serviceDetails.pestControl?.areas
    );

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
            <h4 className={styles.summary__sectionTitle}>Treatment</h4>
            <div className={styles.summary__row}>
              <span className={styles.summary__label}>
                {selectedOption.label}
              </span>
              <span className={styles.summary__value}>
                ₦{selectedOption.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className={styles.summary__section}>
          <h4 className={styles.summary__sectionTitle}>Property</h4>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Type</span>
            <span className={styles.summary__value}>{propertyInfo?.label}</span>
          </div>
          <div className={styles.summary__row}>
            <span className={styles.summary__label}>Severity</span>
            <div className={styles.summary__severity}>
              <span className={styles.summary__severityIcon}>
                {severityInfo?.icon}
              </span>
              <span className={styles.summary__severityText}>
                {severityInfo?.label}
              </span>
            </div>
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

export default PestControlServiceConfiguration;
