// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/ServiceConfigDrawer/ServiceConfigDrawer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Home,
  Package,
  Plus,
  Minus,
  Check,
  ChevronRight,
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
  PropertyType,
  ServiceId,
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
      propertyType: PropertyType.Flat,
      roomQuantities: {
        bedroom: 2,
        livingRoom: 1,
        bathroom: 1,
        kitchen: 1,
        balcony: 0,
        studyRoom: 0,
      },
    },
    serviceOption: "",
  });

  // Service-specific state
  const [propertyType, setPropertyType] = useState<PropertyType>(
    PropertyType.Flat
  );
  const [roomQuantities, setRoomQuantities] = useState({
    bedroom: 2,
    livingRoom: 1,
    bathroom: 1,
    kitchen: 1,
    balcony: 0,
    studyRoom: 0,
  });
  const [serviceOption, setServiceOption] = useState<string>("");

  useEffect(() => {
    if (service) {
      if (existingConfiguration) {
        setConfiguration(existingConfiguration);
      } else {
        setConfiguration({
          serviceId: service._id,
          frequency: SubscriptionFrequency.Weekly,
          scheduledDays: [],
          preferredTimeSlot: TimeSlot.Morning,
          price: service.price,
        });
      }
    }
  }, [service, existingConfiguration]);

  const steps = [
    { label: "Service Type", icon: <Package size={16} /> },
    { label: "Schedule", icon: <Calendar size={16} /> },
    { label: "Details", icon: <Home size={16} /> },
    { label: "Review", icon: <Check size={16} /> },
  ];

  const daysOfWeek = [
    { value: ScheduleDays.Monday, label: "Mon" },
    { value: ScheduleDays.Tuesday, label: "Tue" },
    { value: ScheduleDays.Wednesday, label: "Wed" },
    { value: ScheduleDays.Thursday, label: "Thu" },
    { value: ScheduleDays.Friday, label: "Fri" },
    { value: ScheduleDays.Saturday, label: "Sat" },
    { value: ScheduleDays.Sunday, label: "Sun" },
  ];

  const timeSlots = [
    { value: TimeSlot.Morning, label: "Morning", time: "8:00 AM - 12:00 PM" },
    {
      value: TimeSlot.Afternoon,
      label: "Afternoon",
      time: "12:00 PM - 4:00 PM",
    },
    { value: TimeSlot.Evening, label: "Evening", time: "4:00 PM - 8:00 PM" },
  ];

  const toggleDay = (day: ScheduleDays) => {
    setConfiguration((prev) => ({
      ...prev,
      scheduledDays: prev.scheduledDays?.includes(day)
        ? prev.scheduledDays.filter((d) => d !== day)
        : [...(prev.scheduledDays || []), day],
    }));
  };

  const calculatePrice = () => {
    if (!service) return 0;

    let basePrice = service.price;
    const daysCount = configuration.scheduledDays?.length || 0;

    // Price calculation based on service type and configuration
    if (service.category === ServiceCategory.Cleaning) {
      const roomCount = Object.values(roomQuantities).reduce(
        (a, b) => a + b,
        0
      );
      basePrice = (service.price / 3) * roomCount; // Base price per room
      if (propertyType === PropertyType.Duplex) {
        basePrice *= 1.5;
      }
    }

    // Weekly price based on days selected
    const weeklyPrice = basePrice * daysCount;
    // Monthly price (4.33 weeks per month average)
    return Math.round(weeklyPrice * 4.33);
  };

  useEffect(() => {
    setConfiguration((prev) => ({
      ...prev,
      price: calculatePrice(),
    }));
  }, [roomQuantities, propertyType, configuration.scheduledDays]);

  const handleSave = () => {
    onSave({
      ...configuration,
      serviceDetails: {
        propertyType,
        roomQuantities,
        serviceOption,
      },
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderServiceTypeStep();
      case 1:
        return renderScheduleStep();
      case 2:
        return renderDetailsStep();
      case 3:
        return renderReviewStep();
      default:
        return null;
    }
  };

  const renderServiceTypeStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <h3>Select Service Type</h3>
      {service?.options?.map((option) => (
        <motion.div
          key={option.id}
          className={`${styles.drawer__optionCard} ${
            serviceOption === option.id
              ? styles["drawer__optionCard--selected"]
              : ""
          }`}
          onClick={() => setServiceOption(option.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div>
            <h4>{option.label}</h4>
            <p>{option.description}</p>
            <span className={styles.drawer__optionPrice}>
              From ₦{option.price.toLocaleString()}
            </span>
          </div>
          {serviceOption === option.id && (
            <div className={styles.drawer__optionCheck}>
              <Check size={16} />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );

  const renderScheduleStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <h3>Set Your Schedule</h3>

      {/* Frequency */}
      <div className={styles.drawer__field}>
        <label>Service Frequency</label>
        <div className={styles.drawer__frequencyOptions}>
          {[
            { value: SubscriptionFrequency.Weekly, label: "Weekly" },
            { value: SubscriptionFrequency.BiWeekly, label: "Bi-Weekly" },
            { value: SubscriptionFrequency.Monthly, label: "Monthly" },
          ].map((freq) => (
            <button
              key={freq.value}
              className={`${styles.drawer__frequencyOption} ${
                configuration.frequency === freq.value
                  ? styles["drawer__frequencyOption--active"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({ ...prev, frequency: freq.value }))
              }
            >
              {freq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Days Selection */}
      <div className={styles.drawer__field}>
        <label>Select Days</label>
        <div className={styles.drawer__daysGrid}>
          {daysOfWeek.map((day) => (
            <motion.button
              key={day.value}
              className={`${styles.drawer__dayButton} ${
                configuration.scheduledDays?.includes(day.value)
                  ? styles["drawer__dayButton--active"]
                  : ""
              }`}
              onClick={() => toggleDay(day.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {day.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Slot */}
      <div className={styles.drawer__field}>
        <label>Preferred Time</label>
        <div className={styles.drawer__timeSlots}>
          {timeSlots.map((slot) => (
            <motion.div
              key={slot.value}
              className={`${styles.drawer__timeSlot} ${
                configuration.preferredTimeSlot === slot.value
                  ? styles["drawer__timeSlot--active"]
                  : ""
              }`}
              onClick={() =>
                setConfiguration((prev) => ({
                  ...prev,
                  preferredTimeSlot: slot.value,
                }))
              }
              whileHover={{ scale: 1.02 }}
            >
              <Clock size={16} />
              <div>
                <strong>{slot.label}</strong>
                <span>{slot.time}</span>
              </div>
            </motion.div>
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
      <h3>Service Details</h3>

      {service?.category === ServiceCategory.Cleaning && (
        <>
          {/* Property Type */}
          <div className={styles.drawer__field}>
            <label>Property Type</label>
            <div className={styles.drawer__propertyTypes}>
              <button
                className={`${styles.drawer__propertyType} ${
                  propertyType === PropertyType.Flat
                    ? styles["drawer__propertyType--active"]
                    : ""
                }`}
                onClick={() => setPropertyType(PropertyType.Flat)}
              >
                Flat/Apartment
              </button>
              <button
                className={`${styles.drawer__propertyType} ${
                  propertyType === PropertyType.Duplex
                    ? styles["drawer__propertyType--active"]
                    : ""
                }`}
                onClick={() => setPropertyType(PropertyType.Duplex)}
              >
                Duplex/House
              </button>
            </div>
          </div>

          {/* Room Configuration */}
          <div className={styles.drawer__field}>
            <label>Room Configuration</label>
            <div className={styles.drawer__rooms}>
              {Object.entries(roomQuantities).map(([room, quantity]) => (
                <div key={room} className={styles.drawer__roomControl}>
                  <span>
                    {room
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <div className={styles.drawer__counter}>
                    <button
                      onClick={() =>
                        setRoomQuantities((prev) => ({
                          ...prev,
                          [room]: Math.max(0, quantity - 1),
                        }))
                      }
                      disabled={quantity === 0}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        setRoomQuantities((prev) => ({
                          ...prev,
                          [room]: quantity + 1,
                        }))
                      }
                    >
                      <Plus size={14} />
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

  const renderReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.drawer__stepContent}
    >
      <h3>Review Configuration</h3>

      <div className={styles.drawer__reviewCard}>
        <div className={styles.drawer__reviewSection}>
          <h4>Service</h4>
          <p>{service?.name}</p>
          {serviceOption && (
            <span className={styles.drawer__badge}>{serviceOption}</span>
          )}
        </div>

        <div className={styles.drawer__reviewSection}>
          <h4>Schedule</h4>
          <div className={styles.drawer__reviewItems}>
            <div>
              <Calendar size={14} />
              <span>
                {configuration.scheduledDays
                  ?.map((d) => d.slice(0, 3))
                  .join(", ")}
              </span>
            </div>
            <div>
              <Clock size={14} />
              <span>{configuration.preferredTimeSlot}</span>
            </div>
          </div>
        </div>

        {service?.category === ServiceCategory.Cleaning && (
          <div className={styles.drawer__reviewSection}>
            <h4>Property Details</h4>
            <p>{propertyType}</p>
            <div className={styles.drawer__reviewRooms}>
              {Object.entries(roomQuantities)
                .filter(([_, qty]) => qty > 0)
                .map(([room, qty]) => (
                  <span key={room}>
                    {qty} {room.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </span>
                ))}
            </div>
          </div>
        )}

        <div className={styles.drawer__reviewPrice}>
          <span>Monthly Price</span>
          <strong>₦{configuration.price?.toLocaleString()}</strong>
        </div>
      </div>
    </motion.div>
  );

  if (!service) return null;

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawer__header}>
          <h2>Configure {service.name}</h2>
          <button onClick={onClose} className={styles.drawer__close}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className={styles.drawer__progress}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.drawer__step} ${
                index === activeStep ? styles["drawer__step--active"] : ""
              } ${index < activeStep ? styles["drawer__step--completed"] : ""}`}
              onClick={() => index <= activeStep && setActiveStep(index)}
            >
              <div className={styles.drawer__stepIcon}>{step.icon}</div>
              <span>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className={styles.drawer__content}>
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>

        {/* Footer */}
        <div className={styles.drawer__footer}>
          <button
            className={styles.drawer__backButton}
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            Back
          </button>

          {activeStep < steps.length - 1 ? (
            <button
              className={styles.drawer__nextButton}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Continue
              <ChevronRight size={16} />
            </button>
          ) : (
            <button className={styles.drawer__saveButton} onClick={handleSave}>
              Save Configuration
              <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </ModalDrawer>
  );
};

export default ServiceConfigDrawer;
