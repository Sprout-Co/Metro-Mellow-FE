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
} from "lucide-react";
import styles from "./ServiceConfigDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import {
  Service,
  ServiceCategory,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  SubscriptionServiceInput,
  HouseType,
  CleaningType,
} from "@/graphql/api";

interface ServiceConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  existingConfiguration?: SubscriptionServiceInput;
  onSave: (configuration: SubscriptionServiceInput) => void;
}

const ServiceConfigDrawer: React.FC<ServiceConfigDrawerProps> = ({
  isOpen,
  onClose,
  service,
  existingConfiguration,
  onSave,
}) => {
  const [activeStep, setActiveStep] = useState(0);
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
        setConfiguration({
          serviceId: service._id,
          category: service.category,
          frequency: SubscriptionFrequency.Weekly,
          scheduledDays: [],
          preferredTimeSlot: TimeSlot.Morning,
          price: service.price,
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
            serviceOption: service.options?.[0]?.id || "",
          },
        });
      }
    }
  }, [service, existingConfiguration, isOpen]);

  const steps = [
    { id: "frequency", label: "Frequency", icon: <Calendar size={18} /> },
    { id: "schedule", label: "Schedule", icon: <Clock size={18} /> },
    { id: "details", label: "Details", icon: <Home size={18} /> },
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

  const calculatePrice = () => {
    if (!service) return 0;

    let basePrice = service.price;
    const daysCount = configuration.scheduledDays?.length || 0;

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

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return configuration.frequency;
      case 1:
        return (
          configuration.scheduledDays && configuration.scheduledDays.length > 0
        );
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderFrequencyStep();
      case 1:
        return renderScheduleStep();
      case 2:
        return renderDetailsStep();
      default:
        return null;
    }
  };

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
        <label className={styles.drawer__label}>Select Days</label>
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

      {/* Service Options */}
      {service?.options && service.options.length > 0 && (
        <div className={styles.drawer__section}>
          <label className={styles.drawer__label}>Service Option</label>
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
    </motion.div>
  );

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
              } ${index < activeStep ? styles["drawer__progressStep--completed"] : ""}`}
            >
              <div className={styles.drawer__progressIcon}>{step.icon}</div>
              <span className={styles.drawer__progressLabel}>{step.label}</span>
            </div>
          ))}
        </div>

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
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                className={styles.drawer__saveBtn}
                onClick={handleSave}
                disabled={!canProceed()}
              >
                <Check size={18} />
                Save Configuration
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default ServiceConfigDrawer;
