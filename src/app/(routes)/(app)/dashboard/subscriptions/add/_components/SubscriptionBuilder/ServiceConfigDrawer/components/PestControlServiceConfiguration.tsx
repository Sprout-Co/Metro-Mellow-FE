"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Bug,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
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
  ServiceId,
  CleaningType,
  TreatmentType,
  Severity,
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
    scheduledDays: [],
    preferredTimeSlot: TimeSlot.Morning,
    price: service.price,
    category: service.category,
    serviceDetails: {
      serviceOption:
        service.options?.[0]?.service_id || ServiceId.PestControlResidential,
      pestControl: {
        treatmentType: TreatmentType.PestControlResidential,
        areas: [],
        severity: Severity.Medium,
      },
    },
  });

  const steps = [
    { id: "details", label: "Details", icon: <Bug size={18} /> },
    { id: "frequency", label: "Frequency", icon: <Calendar size={18} /> },
    { id: "schedule", label: "Schedule", icon: <Clock size={18} /> },
    { id: "summary", label: "Summary", icon: <Sparkles size={18} /> },
  ];

  // Pest control only allows monthly frequency
  const frequencies = [
    {
      value: SubscriptionFrequency.Monthly,
      label: "Monthly",
      description: "Professional pest control once a month",
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
      } else {
        // Ensure frequency is set to monthly for pest control
        setConfiguration((prev) => ({
          ...prev,
          frequency: SubscriptionFrequency.Monthly,
        }));
      }
    }
  }, [isOpen, existingConfiguration]);

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => {
      const currentDays = prev.scheduledDays || [];
      const isCurrentlySelected = currentDays.includes(day);

      // Pest control only allows one day per month
      if (isCurrentlySelected) {
        return { ...prev, scheduledDays: currentDays.filter((d) => d !== day) };
      } else {
        return { ...prev, scheduledDays: [day] };
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

    // Monthly frequency (multiplier = 1)
    return Math.round(basePrice * daysCount * 1);
  };

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
        return configuration.frequency === SubscriptionFrequency.Monthly;
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
        <h3>Pest Control Service Details</h3>
        <p>Configure your pest control service preferences</p>
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
                      ...(prev.serviceDetails.pestControl && {
                        pestControl: {
                          ...prev.serviceDetails.pestControl,
                          treatmentType:
                            option.service_id as unknown as TreatmentType,
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

      {/* Severity Selection */}
      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>
          Pest Problem Severity{" "}
          <span className={styles.drawer__required}>*</span>
        </label>
        <div className={styles.drawer__severityGrid}>
          {[
            {
              value: Severity.Low,
              label: "Low",
              description: "Minimal pest activity, preventive treatment",
              icon: "🟢",
              color: "success",
            },
            {
              value: Severity.Medium,
              label: "Medium",
              description: "Moderate pest activity, regular treatment needed",
              icon: "🟡",
              color: "warning",
            },
            {
              value: Severity.High,
              label: "High",
              description: "Heavy infestation, intensive treatment required",
              icon: "🔴",
              color: "danger",
            },
          ].map((severity) => (
            <motion.button
              key={severity.value}
              className={`${styles.drawer__severityCard} ${
                configuration.serviceDetails.pestControl?.severity ===
                severity.value
                  ? styles[`drawer__severityCard--${severity.color}`]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({
                  ...prev,
                  serviceDetails: {
                    ...prev.serviceDetails,
                    pestControl: {
                      ...prev.serviceDetails.pestControl!,
                      severity: severity.value,
                    },
                  },
                }))
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.drawer__severityIcon}>{severity.icon}</div>
              <div className={styles.drawer__severityContent}>
                <h4>{severity.label}</h4>
                <p>{severity.description}</p>
              </div>
              {configuration.serviceDetails.pestControl?.severity ===
                severity.value && (
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
      </div>

      <div className={styles.drawer__section}>
        <div className={styles.drawer__infoCard}>
          <div className={styles.drawer__infoIcon}>
            <Bug size={32} />
          </div>
          <div className={styles.drawer__infoContent}>
            <h4>Professional Pest Control</h4>
            <p>
              Our comprehensive pest control service provides effective
              treatment against common household pests with safe, eco-friendly
              solutions.
            </p>
            <ul>
              <li>✓ Complete property inspection</li>
              <li>✓ Targeted treatment for specific pests</li>
              <li>✓ Safe, eco-friendly chemicals</li>
              <li>✓ Prevention recommendations</li>
              <li>✓ Follow-up monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.drawer__section}>
        <div className={styles.drawer__warningCard}>
          <div className={styles.drawer__warningIcon}>
            <Bug size={20} />
          </div>
          <div className={styles.drawer__warningContent}>
            <h5>Monthly Service Required</h5>
            <p>
              Pest control services are most effective when performed monthly to
              ensure continuous protection and prevent re-infestation.
            </p>
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
        <h3>Service Frequency</h3>
        <p>Pest control requires regular monthly treatment for effectiveness</p>
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
              <span className={styles.drawer__popularTag}>Recommended</span>
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

      <div className={styles.drawer__infoSection}>
        <h5>Why Monthly Treatment?</h5>
        <p>
          Regular monthly pest control treatments ensure continuous protection
          by:
        </p>
        <ul>
          <li>Preventing pest populations from establishing</li>
          <li>Maintaining protective barriers around your property</li>
          <li>Addressing seasonal pest activity changes</li>
          <li>Ensuring long-term effectiveness of treatments</li>
        </ul>
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
        <h3>Set your service schedule</h3>
        <p>Select your preferred day and time for monthly pest control</p>
        <div className={styles.drawer__scheduleNote}>
          <p>📅 Pest control services allow only one service day per month</p>
        </div>
      </div>

      <div className={styles.drawer__section}>
        <label className={styles.drawer__label}>
          Select Service Day <span className={styles.drawer__required}>*</span>
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
        <label className={styles.drawer__label}>Preferred Service Time</label>
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
          <h3>Perfect! Let's Review Your Pest Control Service</h3>
          <p>Your personalized pest control configuration is ready</p>
        </div>

        {/* Service Overview */}
        <motion.div className={styles.drawer__serviceOverview}>
          <div className={styles.drawer__serviceHeader}>
            <div className={styles.drawer__serviceIconLarge}>
              <Bug size={24} />
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
                <Calendar size={18} />
              </div>
              <h5>Service Schedule</h5>
            </div>
            <div className={styles.drawer__configContent}>
              <div className={styles.drawer__propertyGrid}>
                <div className={styles.drawer__propertyItem}>
                  <span>Frequency:</span>
                  <strong>Monthly</strong>
                </div>
                <div className={styles.drawer__propertyItem}>
                  <span>Service Day:</span>
                  <strong>
                    {configuration.scheduledDays?.length > 0
                      ? daysOfWeek.find(
                          (d) => d.value === configuration.scheduledDays![0]
                        )?.label
                      : "Not selected"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.drawer__configCard}>
            <div className={styles.drawer__configHeader}>
              <div className={styles.drawer__configIcon}>
                <Bug size={18} />
              </div>
              <h5>Problem Severity</h5>
            </div>
            <div className={styles.drawer__configContent}>
              <div className={styles.drawer__severitySummary}>
                <div
                  className={`${styles.drawer__severityIndicator} ${
                    configuration.serviceDetails.pestControl?.severity ===
                    Severity.Low
                      ? styles["drawer__severityIndicator--success"]
                      : configuration.serviceDetails.pestControl?.severity ===
                          Severity.Medium
                        ? styles["drawer__severityIndicator--warning"]
                        : styles["drawer__severityIndicator--danger"]
                  }`}
                >
                  {configuration.serviceDetails.pestControl?.severity ===
                    Severity.Low && "🟢"}
                  {configuration.serviceDetails.pestControl?.severity ===
                    Severity.Medium && "🟡"}
                  {configuration.serviceDetails.pestControl?.severity ===
                    Severity.High && "🔴"}
                </div>
                <div className={styles.drawer__severityInfo}>
                  <h6>
                    {configuration.serviceDetails.pestControl?.severity ||
                      "Medium"}{" "}
                    Severity
                  </h6>
                  <p>
                    {configuration.serviceDetails.pestControl?.severity ===
                      Severity.Low &&
                      "Minimal pest activity, preventive treatment"}
                    {configuration.serviceDetails.pestControl?.severity ===
                      Severity.Medium &&
                      "Moderate pest activity, regular treatment needed"}
                    {configuration.serviceDetails.pestControl?.severity ===
                      Severity.High &&
                      "Heavy infestation, intensive treatment required"}
                  </p>
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
                <h6>Safe & Eco-Friendly</h6>
                <p>Family and pet-safe treatments with effective results</p>
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
            <p>Customize your pest control service preferences</p>
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
            <span>Monthly Rate</span>
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

export default PestControlServiceConfiguration;
