// src/app/(routes)/(site)/bookings/_components/SubscriptionModule/EditServiceModal/EditServiceModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./EditServiceModal.module.scss";
import Modal from "@/components/ui/Modal/Modal";
import { Icon, IconName } from "@/components/ui/Icon/Icon";

import { motion, AnimatePresence } from "framer-motion";
import {
  CleaningType,
  HouseType,
  LaundryType,
  RoomQuantities,
  ScheduleDays,
  Service,
  ServiceCategory,
  Severity,
  TimeSlot,
  TreatmentType,
  SubscriptionFrequency,
  SubscriptionServiceInput,
  ServiceOption,
  ServiceId,
  PropertyType,
  MealType,
  CreateSubscriptionInput,
  BillingCycle,
} from "@/graphql/api";
import { ExtendedService } from "../PlanSummary/PlanSummary";

/**
 * Days of the week for scheduling
 */
type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/**
 * Time slots available for selection
 */
interface TimeSlotOption {
  id: TimeSlot;
  label: string;
  time: string;
}

/**
 * Steps for the booking process
 */
enum BookingStep {
  SERVICE = 0, // Choose service and type
  DETAILS = 1, // Set details and schedule
  REVIEW = 2, // Review and confirm
}

/**
 * Progress step information
 */
interface Step {
  label: string;
  icon: IconName | string;
}

/**
 * Time slot options
 */
const TIME_SLOT_OPTIONS: TimeSlotOption[] = [
  { id: TimeSlot.Morning, label: "Morning", time: "8:00 AM - 12:00 PM" },
  { id: TimeSlot.Afternoon, label: "Afternoon", time: "12:00 PM - 4:00 PM" },
  { id: TimeSlot.Evening, label: "Evening", time: "4:00 PM - 8:00 PM" },
];

/**
 * Days of the week
 */
const DAYS_OF_WEEK: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

/**
 * Progress bar steps configuration
 */
const steps: Step[] = [
  { label: "Choose Service", icon: "package" },
  { label: "Details & Schedule", icon: "settings" },
  { label: "Review", icon: "check-circle" },
];

/**
 * Interface for service schedule
 */
interface ServiceSchedule {
  days: DayOfWeek[];
  timeSlot: TimeSlot;
}

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: Service[];
  existingSubscriptionServices?: SubscriptionServiceInput[];
  billingCycle?: BillingCycle;
  duration?: number;
  startDate?: Date;
  autoRenew?: boolean;
  onUpdateService?: (service: ExtendedService) => void;
  onSubscriptionInputChange?: (input: CreateSubscriptionInput) => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  selectedServices,
  existingSubscriptionServices = [],
  billingCycle = BillingCycle.Monthly,
  duration = 12,
  startDate = new Date(),
  autoRenew = true,
  onUpdateService,
  onSubscriptionInputChange,
}) => {
  // API data state
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Current step in the booking process
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    BookingStep.SERVICE
  );

  // Service selection state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(
    null
  );
  const [showServiceOptions, setShowServiceOptions] = useState<boolean>(false);

  // Service details state
  const [serviceSchedules, setServiceSchedules] = useState<
    Record<string, ServiceSchedule>
  >({});
  const [propertyType, setPropertyType] = useState<PropertyType>(
    PropertyType.Flat
  );
  const [roomQuantities, setRoomQuantities] = useState<RoomQuantities>({
    balcony: 0,
    bathroom: 1,
    bedroom: 1,
    kitchen: 1,
    livingRoom: 1,
    other: 0,
    studyRoom: 0,
  });
  const [laundryBags, setLaundryBags] = useState<number>(1);
  const [mealType, setMealType] = useState<MealType>(MealType.Standard);
  const [mealsPerDay, setMealsPerDay] = useState<Record<DayOfWeek, number>>({
    monday: 1,
    tuesday: 1,
    wednesday: 1,
    thursday: 1,
    friday: 1,
    saturday: 1,
    sunday: 1,
  });

  // UI state
  const [showExtraItems, setShowExtraItems] = useState(false);

  useEffect(() => {
    setServices(selectedServices);
    // Initialize schedules for each service
    const initialSchedules: Record<string, ServiceSchedule> = {};
    selectedServices.forEach((service) => {
      initialSchedules[service._id] = {
        days: ["monday"],
        timeSlot: TimeSlot.Morning,
      };
    });
    setServiceSchedules(initialSchedules);
  }, [selectedServices]);

  /**
   * Handle selecting and deselecting days for a specific service
   */
  const handleDayToggle = (serviceId: string, day: DayOfWeek) => {
    setServiceSchedules((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        days: prev[serviceId].days.includes(day)
          ? prev[serviceId].days.filter((d) => d !== day)
          : [...prev[serviceId].days, day],
      },
    }));
  };

  /**
   * Handle selecting time slot for a specific service
   */
  const handleTimeSlotToggle = (serviceId: string, timeSlot: TimeSlot) => {
    setServiceSchedules((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        timeSlot,
      },
    }));
  };

  /**
   * Check if the step is accessible based on current selections
   */
  const isStepAccessible = (step: BookingStep): boolean => {
    switch (step) {
      case BookingStep.SERVICE:
        return true;
      case BookingStep.DETAILS:
        if (
          (selectedService?.service_id === ServiceId.Cleaning ||
            selectedService?.service_id === ServiceId.Laundry) &&
          selectedService.options &&
          selectedService?.options?.length > 0
        ) {
          return !!selectedOption;
        }
        return !!selectedService;
      case BookingStep.REVIEW:
        if (!selectedService?._id || !serviceSchedules[selectedService._id]) {
          return false;
        }
        return (
          isStepAccessible(BookingStep.DETAILS) &&
          serviceSchedules[selectedService._id].days.length > 0 &&
          serviceSchedules[selectedService._id].timeSlot !== TimeSlot.Morning
        );
      default:
        return false;
    }
  };

  /**
   * Handle clicking on progress step
   */
  const handleStepClick = (step: BookingStep) => {
    if (isStepAccessible(step)) {
      setCurrentStep(step);
    }
  };

  /**
   * Calculate progress width for the progress bar
   */
  const calculateProgressWidth = () => {
    const maxSteps = steps.length - 1;
    const progress = (currentStep / maxSteps) * 100;
    return `${progress}%`;
  };

  /**
   * Handle service selection
   */
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setSelectedOption(null);

    if (
      (service.service_id === ServiceId.Cleaning ||
        service.service_id === ServiceId.Laundry) &&
      service.options &&
      service.options.length > 0
    ) {
      setShowServiceOptions(true);
    } else {
      setShowServiceOptions(false);
      setCurrentStep(BookingStep.DETAILS);
    }
  };

  /**
   * Handle service option selection
   */
  const handleOptionSelect = (option: ServiceOption) => {
    setSelectedOption(option);
    setCurrentStep(BookingStep.DETAILS);
  };

  /**
   * Handle room quantity changes for cleaning service
   */
  const handleQuantityChange = (
    room: keyof RoomQuantities,
    increment: boolean
  ) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, (prev[room] as number) + (increment ? 1 : -1)),
    }));
  };

  /**
   * Handle laundry bag quantity changes
   */
  const handleLaundryBagChange = (increment: boolean) => {
    setLaundryBags((prev) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  /**
   * Handle meals per day changes
   */
  const handleMealsPerDayChange = (day: DayOfWeek, increment: boolean) => {
    setMealsPerDay((prev) => ({
      ...prev,
      [day]: Math.max(1, (prev[day] as number) + (increment ? 1 : -1)),
    }));
  };

  /**
   * Calculate total price based on selected options
   */
  const calculateTotalPrice = () => {
    if (!selectedService) return 0;

    let basePrice = 0;

    // Get base price from service option or service
    if (selectedService.service_id === ServiceId.Cleaning && selectedOption) {
      basePrice = selectedOption.price;

      // Add price per room for cleaning service
      const roomPrices = selectedService?.roomPrices || {
        bedrooms: 5000, // +₦5k per extra bedroom
        livingRooms: 4000, // +₦4k per additional living-/family room
        bathrooms: 6000, // +₦6k per extra bathroom (more scrubbing & chemicals)
        kitchen: 7500, // +₦7.5k for a full extra kitchen (most labour-intensive)
        study: 4000, // +₦4k for a study/home office
        outdoor: 5000, // +₦5k for balcony, patio or small outdoor area
      };

      const roomTotal = Object.entries(roomQuantities).reduce(
        (total: number, [room, quantity]) => {
          return (
            total +
            (roomPrices[room as keyof typeof roomPrices] as number) *
              (quantity as number)
          );
        },
        0
      );

      return basePrice + roomTotal;
    } else if (
      selectedService.service_id === ServiceId.Laundry &&
      selectedOption
    ) {
      // For laundry, calculate based on bags
      const itemsPerBag = 30;
      const totalItems = laundryBags * itemsPerBag;
      basePrice = totalItems * selectedOption.price;

      // Apply recurring discount if applicable
      if (serviceSchedules[selectedService._id]?.days.length > 1) {
        basePrice = Math.round(basePrice * 0.9); // 10% discount for recurring
      }
    } else if (
      selectedService.service_id === "COOKING" &&
      serviceSchedules[selectedService._id]?.days.length > 0
    ) {
      // For cooking, calculate based on meals per day
      const mealsPerDayTotal = serviceSchedules[
        selectedService._id
      ].days.reduce(
        (total: number, day: DayOfWeek) => total + (mealsPerDay[day] || 1),
        0
      );
      basePrice =
        mealsPerDayTotal *
        (selectedOption ? selectedOption.price : selectedService.price);
    } else {
      basePrice = selectedService.price;
    }

    return basePrice;
  };

  /**
   * Handle navigation to next step
   */
  const handleNext = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        setCurrentStep(BookingStep.DETAILS);
        break;
      case BookingStep.DETAILS:
        setCurrentStep(BookingStep.REVIEW);
        break;
      case BookingStep.REVIEW:
        handleSubmit();
        break;
    }
  };

  /**
   * Handle navigation to previous step
   */
  const handleBack = () => {
    switch (currentStep) {
      case BookingStep.DETAILS:
        setCurrentStep(BookingStep.SERVICE);
        break;
      case BookingStep.REVIEW:
        setCurrentStep(BookingStep.DETAILS);
        break;
    }
  };

  /**
   * Handle final booking submission
   */
  const handleSubmit = async () => {
    try {
      // Transform the data into the required format
      const subscriptionInput: CreateSubscriptionInput = {
        customerId: "customer123", // This should come from auth context in a real app
        billingCycle,
        duration,
        startDate: startDate.toISOString(),
        autoRenew,
        services: services.map((service) => {
          // Get the selected option for this service
          const option = service.options?.find(
            (opt) => opt.id === selectedOption?.id
          );

          // Get the service type
          const serviceType = service.service_id?.includes("CLEANING")
            ? "cleaning"
            : service.service_id?.includes("COOKING")
              ? "cooking"
              : "laundry";

          // Prepare service details based on type
          let serviceDetails = {};

          switch (serviceType) {
            case "cleaning": {
              serviceDetails = {
                cleaning: {
                  cleaningType: selectedOption?.service_id,
                  houseType: propertyType.toUpperCase(),
                  rooms: roomQuantities,
                },
              };
              break;
            }
            case "cooking": {
              serviceDetails = {
                cooking: {
                  mealType,
                  mealDeliveries: serviceSchedules[service._id].days.map(
                    (day) => ({
                      day: day.toUpperCase(),
                      count: mealsPerDay[day],
                    })
                  ),
                },
              };
              break;
            }
            case "laundry": {
              serviceDetails = {
                laundry: {
                  laundryType: selectedOption?.service_id,
                  bags: laundryBags,
                  items: {
                    shirts: 0,
                    pants: 0,
                    dresses: 0,
                    suits: 0,
                    others: 0,
                  },
                },
              };
              break;
            }
            default:
              console.warn(`Unknown service type: ${serviceType}`);
              break;
          }

          return {
            serviceId: service._id,
            frequency: SubscriptionFrequency.Weekly,
            scheduledDays: serviceSchedules[service._id].days.map((day) => {
              const dayKey =
                day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
              return ScheduleDays[dayKey as keyof typeof ScheduleDays];
            }) as ScheduleDays[],
            preferredTimeSlot: serviceSchedules[service._id].timeSlot,
            serviceDetails,
          };
        }),
      };

      // Call the callback with the subscription input
      onSubscriptionInputChange?.(subscriptionInput);

      // Close the modal on success
      onClose();
    } catch (error) {
      console.error("Failed to create subscription:", error);
      // Handle error appropriately
    }
  };

  /**
   * Check if the next button should be disabled
   */
  const isNextDisabled = () => {
    // switch (currentStep) {
    //   case BookingStep.SERVICE:
    //     if (
    //       (selectedService?.service_id === ServiceId.Cleaning ||
    //         selectedService?.service_id === ServiceId.Laundry) &&
    //       selectedService.options &&
    //       selectedService?.options?.length > 0
    //     ) {
    //       return !selectedOption;
    //     }
    //     return !selectedService;
    //   case BookingStep.DETAILS:
    //     if (!selectedService?._id || !serviceSchedules[selectedService._id]) {
    //       return true;
    //     }
    //     if (selectedService.service_id === ServiceId.Cleaning) {
    //       return (
    //         serviceSchedules[selectedService._id].days.length === 0 ||
    //         serviceSchedules[selectedService._id].timeSlot ===
    //           TimeSlot.Morning ||
    //         Object.values(roomQuantities).every((qty) => Number(qty) === 0)
    //       );
    //     } else if (selectedService.service_id === "COOKING") {
    //       // For cooking, we require at least one day selected
    //       if (
    //         serviceSchedules[selectedService._id].days.length === 0 ||
    //         serviceSchedules[selectedService._id].timeSlot === TimeSlot.Morning
    //       ) {
    //         return true;
    //       }

    //       // Check if meals per day is set for all selected days
    //       return serviceSchedules[selectedService._id].days.some(
    //         (day) => !mealsPerDay[day] || mealsPerDay[day] < 1
    //       );
    //     }
    //     return (
    //       serviceSchedules[selectedService._id].days.length === 0 ||
    //       serviceSchedules[selectedService._id].timeSlot === TimeSlot.Morning
    //     );
    //   default:
    //     return false;
    // }
    return false;
  };

  /**
   * Get the button text based on the current step
   */
  const getNextButtonText = () => {
    switch (currentStep) {
      case BookingStep.DETAILS:
        return "Review Selection";
      case BookingStep.REVIEW:
        return "Confirm & Continue";
      default:
        return "Continue";
    }
  };

  /**
   * Animation variants
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  /**
   * Render progress bar
   */
  const renderProgressBar = () => {
    return (
      <div className={styles.modal__progress}>
        <div className={styles.modal__progressLine}></div>
        <div
          className={styles.modal__progressBar}
          style={{ width: calculateProgressWidth() }}
        ></div>

        {steps.map((step, index) => {
          const isComplete = currentStep > index;
          const isActive = currentStep === index;
          const isDisabled = !isStepAccessible(index as BookingStep);

          return (
            <div
              key={index}
              className={`
                ${styles.modal__progressStep}
                ${isActive ? styles.modal__progressStepActive : ""}
                ${isComplete ? styles.modal__progressStepComplete : ""}
                ${isDisabled ? styles.modal__progressStepDisabled : ""}
              `}
              onClick={() =>
                !isDisabled && handleStepClick(index as BookingStep)
              }
            >
              <div className={styles.modal__progressStepDot}>
                {isComplete && !isActive && <Icon name="check" size={12} />}
              </div>
              <div className={styles.modal__progressStepLabel}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * Render service selection step (Step 1)
   */
  const renderServiceSelection = () => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ marginBottom: "32px" }}
      >
        {!showServiceOptions ? (
          // Show main service selection
          <>
            <motion.h2
              className={styles.modal__contentTitle}
              variants={itemVariants}
            >
              <Icon name="shopping-bag" />
              Select a Service
            </motion.h2>
            <motion.p
              className={styles.modal__contentSubtitle}
              variants={itemVariants}
            >
              Choose from our range of professional services
            </motion.p>

            <div className={styles.modal__serviceGrid}>
              {services.map((service) => (
                <motion.div
                  key={service.service_id}
                  className={`${styles.modal__serviceCard} ${
                    selectedService?.service_id === service.service_id
                      ? styles.modal__serviceCardSelected
                      : ""
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className={styles.modal__serviceCardIcon}>
                    {service.icon}
                    {/* <Icon name={service.icon as IconName} /> */}
                  </div>
                  <h3 className={styles.modal__serviceCardTitle}>
                    {service.label}
                  </h3>
                  <span className={styles.modal__serviceCardPrice}>
                    {service.displayPrice}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          // Show service options
          <>
            <div
              className={styles.modal__backLink}
              onClick={() => setShowServiceOptions(false)}
            >
              <Icon name="arrow-left" />
              <span>Back to services</span>
            </div>

            <motion.h2
              className={styles.modal__contentTitle}
              variants={itemVariants}
            >
              <Icon name="grid" />
              Select {selectedService?.label} Type
            </motion.h2>
            <motion.p
              className={styles.modal__contentSubtitle}
              variants={itemVariants}
            >
              Choose the type of {selectedService?.label.toLowerCase()} service
              you need
            </motion.p>

            {/* Service options */}
            {selectedService?.options?.map((option) => (
              <motion.div
                key={option.id}
                className={`${styles.modal__optionCard} ${
                  selectedOption?.id === option.id
                    ? styles.modal__optionCardSelected
                    : ""
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(option)}
              >
                <div className={styles.modal__optionCardContent}>
                  <h3 className={styles.modal__optionCardTitle}>
                    {option.label}
                  </h3>
                  <p className={styles.modal__optionCardDescription}>
                    {option.description}
                  </p>
                  <span className={styles.modal__optionCardPrice}>
                    {`From ₦${option.price.toLocaleString("en-US")}`}
                  </span>

                  {/* Show "View extra items" button for laundry options */}
                  {selectedService.service_id === ServiceId.Laundry &&
                    option.inclusions &&
                    option.inclusions?.length > 0 && (
                      <div
                        className={styles.modal__optionCardInfoLink}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOption(option);
                          setShowExtraItems(true);
                        }}
                      >
                        View extra items pricing
                        <Icon name="info" />
                      </div>
                    )}
                </div>
                <div className={styles.modal__optionCardCheckbox}>
                  {selectedOption?.id === option.id && <Icon name="check" />}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    );
  };

  /**
   * Render service details and scheduling step (Step 2)
   */
  const renderDetailsAndSchedule = () => {
    if (!selectedService) return null;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.modal__backLink} onClick={handleBack}>
          <Icon name="arrow-left" />
          <span>Back to service selection</span>
        </div>

        <motion.h2
          className={styles.modal__contentTitle}
          variants={itemVariants}
        >
          <Icon name="sliders" />
          {selectedService.label} Details
          {selectedOption ? ` - ${selectedOption.label}` : ""}
        </motion.h2>

        <motion.div className={styles.modal__form} variants={containerVariants}>
          {/* Days Selection */}
          <motion.div
            variants={itemVariants}
            className={styles.modal__formGroup}
          >
            <label>
              <Icon name="calendar" />
              Preferred Service Days
            </label>
            <div className={styles.modal__daySelectionContainer}>
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  className={`${styles.modal__dayPill} ${
                    serviceSchedules[selectedService._id]?.days.includes(day)
                      ? styles.modal__dayPillSelected
                      : ""
                  }`}
                  onClick={() => handleDayToggle(selectedService._id, day)}
                >
                  <span className={styles.modal__dayPillText}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>
                  {serviceSchedules[selectedService._id]?.days.includes(
                    day
                  ) && (
                    <span className={styles.modal__dayPillCheck}>
                      <Icon name="check" size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className={styles.modal__helper}>
              Select one or more days for your service
            </p>
          </motion.div>

          {/* Time Slot Selection */}
          <motion.div
            variants={itemVariants}
            className={styles.modal__formGroup}
          >
            <label>
              <Icon name="clock" />
              Preferred Time Slot
            </label>
            <div className={styles.modal__timeSlotContainer}>
              {TIME_SLOT_OPTIONS.map((slot) => (
                <button
                  key={slot.id}
                  className={`${styles.modal__timeSlotPill} ${
                    serviceSchedules[selectedService._id]?.timeSlot === slot.id
                      ? styles.modal__timeSlotPillSelected
                      : ""
                  }`}
                  onClick={() =>
                    handleTimeSlotToggle(selectedService._id, slot.id)
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <span className={styles.modal__timeSlotPillLabel}>
                      {slot.label}
                    </span>
                    <span className={styles.modal__timeSlotPillTime}>
                      <Icon
                        name="clock"
                        size={12}
                        style={{ marginRight: "6px" }}
                      />
                      {slot.time}
                    </span>
                  </div>
                  {serviceSchedules[selectedService._id]?.timeSlot ===
                    slot.id && (
                    <span className={styles.modal__timeSlotPillCheck}>
                      <Icon name="check" size={14} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className={styles.modal__helper}>
              Select your preferred time slot for the service
            </p>
          </motion.div>

          {/* Cleaning Specific Fields */}
          {selectedService.service_id === ServiceId.Cleaning && (
            <motion.div
              variants={itemVariants}
              className={styles.modal__formGroup}
            >
              <label>
                <Icon name="home" />
                Property Details
              </label>
              <div className={styles.modal__toggleGroup}>
                <button
                  className={`${styles.modal__toggleButton} ${
                    propertyType === PropertyType.Flat
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setPropertyType(PropertyType.Flat)}
                >
                  Flat / Apartment
                </button>
                <button
                  className={`${styles.modal__toggleButton} ${
                    propertyType === PropertyType.Duplex
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setPropertyType(PropertyType.Duplex)}
                >
                  Duplex / House
                </button>
              </div>

              <label style={{ marginTop: "20px" }}>
                <Icon name="grid" />
                Rooms to Clean
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "12px",
                }}
              >
                {Object.entries(roomQuantities).map(([room, quantity]) => (
                  <div key={room} className={styles.modal__counterGroup}>
                    <span className={styles.modal__counterGroupLabel}>
                      {room
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <div className={styles.modal__counterGroupControl}>
                      <button
                        className={styles.modal__counterGroupButton}
                        onClick={() =>
                          handleQuantityChange(
                            room as keyof RoomQuantities,
                            false
                          )
                        }
                        disabled={(quantity as number) <= 0}
                      >
                        <Icon name="minus" />
                      </button>
                      <span className={styles.modal__counterGroupValue}>
                        {quantity}
                      </span>
                      <button
                        className={styles.modal__counterGroupButton}
                        onClick={() =>
                          handleQuantityChange(
                            room as keyof RoomQuantities,
                            true
                          )
                        }
                      >
                        <Icon name="plus" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Laundry Specific Fields */}
          {selectedService.service_id === ServiceId.Laundry && (
            <motion.div
              variants={itemVariants}
              className={styles.modal__formGroup}
            >
              <label>
                <Icon name="package" />
                Laundry Details
              </label>
              <div className={styles.modal__counterGroup}>
                <span className={styles.modal__counterGroupLabel}>
                  Number of Laundry Bags
                </span>
                <div className={styles.modal__counterGroupControl}>
                  <button
                    className={styles.modal__counterGroupButton}
                    onClick={() => handleLaundryBagChange(false)}
                    disabled={laundryBags <= 1}
                  >
                    <Icon name="minus" />
                  </button>
                  <span className={styles.modal__counterGroupValue}>
                    {laundryBags}
                  </span>
                  <button
                    className={styles.modal__counterGroupButton}
                    onClick={() => handleLaundryBagChange(true)}
                  >
                    <Icon name="plus" />
                  </button>
                </div>
              </div>
              <p className={styles.modal__helper}>
                Approximately 30 items per bag
              </p>
            </motion.div>
          )}

          {/* Cooking Specific Fields */}
          {selectedService.service_id === "COOKING" && (
            <motion.div
              variants={itemVariants}
              className={styles.modal__formGroup}
            >
              <label>
                <Icon name="coffee" />
                Meal Delivery Details
              </label>

              <div className={styles.modal__mealType}>
                <div className={styles.modal__toggleGroup}>
                  <button
                    className={`${styles.modal__toggleButton} ${
                      mealType === MealType.Standard
                        ? styles.modal__toggleButtonSelected
                        : ""
                    }`}
                    onClick={() => setMealType(MealType.Standard)}
                  >
                    Standard Meal
                  </button>
                  <button
                    className={`${styles.modal__toggleButton} ${
                      mealType === MealType.Basic
                        ? styles.modal__toggleButtonSelected
                        : ""
                    }`}
                    onClick={() => setMealType(MealType.Basic)}
                  >
                    Basic Meal
                  </button>
                </div>
              </div>

              <label style={{ marginTop: "20px" }}>
                <Icon name="calendar" />
                Meals Per Day
              </label>
              <div className={styles.modal__mealsPerDayContainer}>
                {serviceSchedules[selectedService._id]?.days.length > 0 ? (
                  serviceSchedules[selectedService._id].days.map((day) => (
                    <div key={day} className={styles.modal__counterGroup}>
                      <span className={styles.modal__counterGroupLabel}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </span>
                      <div className={styles.modal__counterGroupControl}>
                        <button
                          className={styles.modal__counterGroupButton}
                          onClick={() => handleMealsPerDayChange(day, false)}
                          disabled={mealsPerDay[day] <= 1}
                        >
                          <Icon name="minus" />
                        </button>
                        <span className={styles.modal__counterGroupValue}>
                          {mealsPerDay[day] || 1}
                        </span>
                        <button
                          className={styles.modal__counterGroupButton}
                          onClick={() => handleMealsPerDayChange(day, true)}
                        >
                          <Icon name="plus" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.modal__noSelectedDays}>
                    Please select at least one delivery day above.
                  </p>
                )}
              </div>
              <p className={styles.modal__helper}>
                Select how many meals you want delivered each day
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  /**
   * Render booking review step (Step 3)
   */
  const renderReview = () => {
    if (!selectedService) return null;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.modal__backLink} onClick={handleBack}>
          <Icon name="arrow-left" />
          <span>Back to details</span>
        </div>

        <motion.div className={styles.modal__invoice} variants={itemVariants}>
          {/* Invoice Header */}
          <div className={styles.modal__simpleHeader}>
            <div className={styles.modal__companyInfo}>
              <div className={styles.modal__companyLogo}>
                <Icon name="home" size={20} />
              </div>
              <div className={styles.modal__companyName}>Metro Mellow</div>
            </div>
            <div className={styles.modal__bookingNumber}>
              #{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>

          {/* Booking Details */}
          <div className={styles.modal__invoiceSection}>
            <h3 className={styles.modal__invoiceSectionTitle}>
              <Icon name="info" />
              Booking Details
            </h3>

            <div className={styles.modal__bookingSummaryBox}>
              {/* Schedule Information */}
              <div className={styles.modal__bookingSection}>
                <div className={styles.modal__bookingSectionTitle}>
                  <Icon name="calendar" size={16} />
                  Schedule Information
                </div>
                <div className={styles.modal__bookingDetailsGrid}>
                  <div className={styles.modal__bookingDetailItem}>
                    <div className={styles.modal__bookingDetailLabel}>
                      Service Days
                    </div>
                    <div className={styles.modal__bookingDetailValue}>
                      {serviceSchedules[selectedService._id]?.days.length > 0
                        ? serviceSchedules[selectedService._id].days
                            .map(
                              (day) =>
                                day.charAt(0).toUpperCase() + day.slice(1)
                            )
                            .join(", ")
                        : "No days selected"}
                    </div>
                  </div>

                  <div className={styles.modal__bookingDetailItem}>
                    <div className={styles.modal__bookingDetailLabel}>
                      Time Slot
                    </div>
                    <div className={styles.modal__bookingDetailValue}>
                      {(() => {
                        const timeSlotOption = TIME_SLOT_OPTIONS.find(
                          (option) =>
                            option.id ===
                            serviceSchedules[selectedService._id].timeSlot
                        );
                        return (
                          timeSlotOption?.label ||
                          serviceSchedules[selectedService._id].timeSlot
                        );
                      })()}
                    </div>
                  </div>

                  <div className={styles.modal__bookingDetailItem}>
                    <div className={styles.modal__bookingDetailLabel}>
                      Booking Type
                    </div>
                    <div className={styles.modal__bookingDetailValue}>
                      <span
                        className={`${styles.modal__frequencyBadge} ${
                          serviceSchedules[selectedService._id]?.days.length > 1
                            ? styles["modal__frequencyBadge--weekly"]
                            : styles["modal__frequencyBadge--one-off"]
                        }`}
                      >
                        {serviceSchedules[selectedService._id]?.days.length > 1
                          ? "Recurring"
                          : "One-time"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.modal__bookingDetailItem}>
                    <div className={styles.modal__bookingDetailLabel}>
                      Service Duration
                    </div>
                    <div className={styles.modal__bookingDetailValue}>
                      {selectedService.service_id === ServiceId.Laundry
                        ? "24-48 hours"
                        : "2-3 hours"}
                    </div>
                  </div>
                </div>

                {/* Recurring service info */}
                {serviceSchedules[selectedService._id]?.days.length > 1 && (
                  <div className={styles.modal__recurringInfo}>
                    <div className={styles.modal__recurringInfoIcon}>
                      <Icon name="repeat" size={18} />
                    </div>
                    <div className={styles.modal__recurringInfoContent}>
                      <div className={styles.modal__recurringInfoTitle}>
                        Recurring Service
                      </div>
                      <p className={styles.modal__recurringInfoText}>
                        This is a recurring booking scheduled for{" "}
                        {serviceSchedules[selectedService._id]?.days.length}{" "}
                        days each week.
                        {selectedService.service_id === ServiceId.Laundry &&
                          " A 10% discount has been applied."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className={styles.modal__bookingSection}>
                <div className={styles.modal__bookingSectionTitle}>
                  <Icon name={selectedService.icon as IconName} size={16} />
                  Service Details
                </div>

                <div className={styles.modal__bookingDetailsGrid}>
                  <div className={styles.modal__bookingDetailItem}>
                    <div className={styles.modal__bookingDetailLabel}>
                      Service Type
                    </div>
                    <div className={styles.modal__bookingDetailValue}>
                      {selectedService.label}
                      {selectedOption ? ` - ${selectedOption.label}` : ""}
                    </div>
                  </div>

                  {selectedService.service_id === ServiceId.Cleaning && (
                    <div className={styles.modal__bookingDetailItem}>
                      <div className={styles.modal__bookingDetailLabel}>
                        Property Type
                      </div>
                      <div className={styles.modal__bookingDetailValue}>
                        {propertyType === PropertyType.Flat
                          ? "Flat / Apartment"
                          : "Duplex / House"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cleaning rooms detail */}
                {selectedService.service_id === ServiceId.Cleaning &&
                  Object.values(roomQuantities).some(
                    (qty) => Number(qty) > 0
                  ) && (
                    <div className={styles.modal__roomsDetail}>
                      <div className={styles.modal__roomsDetailTitle}>
                        Rooms to Clean
                      </div>
                      <div className={styles.modal__roomsGrid}>
                        {Object.entries(roomQuantities)
                          .filter(([_, quantity]) => Number(quantity) > 0)
                          .map(([room, quantity]) => (
                            <div key={room} className={styles.modal__roomItem}>
                              <div className={styles.modal__roomIcon}>
                                <Icon
                                  name={
                                    room === "bedrooms"
                                      ? "bed"
                                      : room === "livingRooms"
                                        ? "layout"
                                        : room === "bathrooms"
                                          ? "droplet"
                                          : room === "kitchen"
                                            ? "coffee"
                                            : room === "study"
                                              ? "book"
                                              : "home"
                                  }
                                  size={14}
                                />
                              </div>
                              <div className={styles.modal__roomInfo}>
                                <span className={styles.modal__roomName}>
                                  {room
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </span>
                                <span className={styles.modal__roomQuantity}>
                                  {quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Laundry details */}
                {selectedService.service_id === ServiceId.Laundry && (
                  <div className={styles.modal__laundryDetail}>
                    <div className={styles.modal__laundryDetailTitle}>
                      Laundry Details
                    </div>
                    <div className={styles.modal__laundryInfo}>
                      <div className={styles.modal__laundryBags}>
                        <div className={styles.modal__laundryBagsCount}>
                          {laundryBags}
                        </div>
                        <div className={styles.modal__laundryBagsLabel}>
                          {laundryBags > 1 ? "Bags" : "Bag"}
                        </div>
                      </div>
                      <div className={styles.modal__laundryItems}>
                        <div className={styles.modal__laundryItemsIcon}>
                          <Icon name="package" size={20} />
                        </div>
                        <div className={styles.modal__laundryItemsInfo}>
                          <div className={styles.modal__laundryItemsCount}>
                            {laundryBags * 30} items total
                          </div>
                          <div className={styles.modal__laundryItemsNote}>
                            Approximately 30 items per bag
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Address */}
              <div className={styles.modal__bookingSection}>
                <div className={styles.modal__bookingSectionTitle}>
                  <Icon name="map-pin" size={16} />
                  Service Address
                </div>
                <div className={styles.modal__addressBox}>
                  <div className={styles.modal__addressIcon}>
                    <Icon name="home" size={20} />
                  </div>
                  <div className={styles.modal__addressDetails}>
                    <div className={styles.modal__addressLine}>
                      123 Main Street
                    </div>
                    <div className={styles.modal__addressLine}>
                      City, State 12345
                    </div>
                    <div className={styles.modal__addressLine}>Country</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className={styles.modal__invoiceSection}>
            <h3 className={styles.modal__invoiceSectionTitle}>
              <Icon name="dollar-sign" />
              Price Breakdown
            </h3>

            <div className={styles.modal__priceSummaryBox}>
              {/* Service Base Price */}
              <div className={styles.modal__priceCard}>
                <div className={styles.modal__priceCardHeader}>
                  <Icon name="package" size={18} />
                  <h4>Service Details</h4>
                </div>
                <div className={styles.modal__priceRow}>
                  <span className={styles.modal__priceLabel}>
                    {selectedService.label}
                    {selectedOption ? ` - ${selectedOption.label}` : ""}
                  </span>
                  <span className={styles.modal__priceValue}>
                    {selectedOption
                      ? `₦${selectedOption.price.toLocaleString("en-US")}`
                      : selectedService.displayPrice}
                  </span>
                </div>

                {/* Cleaning specific breakdown */}
                {selectedService.service_id === ServiceId.Cleaning && (
                  <>
                    <div className={styles.modal__priceDivider}></div>

                    {Object.entries(roomQuantities)
                      .filter(([_, quantity]) => Number(quantity) > 0)
                      .map(([room, quantity]) => {
                        const roomPrices = {
                          bedrooms: 5000,
                          livingRooms: 4000,
                          bathrooms: 6000,
                          kitchen: 7500,
                          study: 4000,
                          outdoor: 5000,
                        };
                        const pricePerRoom = roomPrices[
                          room as keyof typeof roomPrices
                        ] as number;
                        const subtotal = pricePerRoom * (quantity as number);

                        return (
                          <div key={room} className={styles.modal__priceRow}>
                            <span className={styles.modal__priceLabel}>
                              {quantity}x{" "}
                              {room
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </span>
                            <span className={styles.modal__priceValue}>
                              ₦{subtotal.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                  </>
                )}

                {/* Laundry specific breakdown */}
                {selectedService.service_id === ServiceId.Laundry &&
                  selectedOption && (
                    <>
                      <div className={styles.modal__priceDivider}></div>
                      <div className={styles.modal__priceRow}>
                        <span className={styles.modal__priceLabel}>
                          {laundryBags} bag{laundryBags > 1 ? "s" : ""} × 30
                          items
                        </span>
                        <span className={styles.modal__priceValue}>
                          {laundryBags * 30} items
                        </span>
                      </div>
                      <div className={styles.modal__priceRow}>
                        <span className={styles.modal__priceLabel}>
                          Price per item
                        </span>
                        <span className={styles.modal__priceValue}>
                          ₦{selectedOption.price.toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.modal__priceRow}>
                        <span className={styles.modal__priceLabel}>
                          Subtotal
                        </span>
                        <span className={styles.modal__priceValue}>
                          ₦
                          {(
                            laundryBags *
                            30 *
                            selectedOption.price
                          ).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
              </div>
              {/* Summary */}
              <div className={styles.modal__priceCard}>
                <div className={styles.modal__priceCardHeader}>
                  <Icon name="shopping-cart" size={18} />
                  <h4>Order Summary</h4>
                </div>

                <div className={styles.modal__priceRow}>
                  <span className={styles.modal__priceLabel}>Base Price</span>
                  <span className={styles.modal__priceValue}>
                    {selectedService.service_id === ServiceId.Cleaning &&
                    selectedOption
                      ? `₦${selectedOption.price.toLocaleString()}`
                      : selectedService.service_id === ServiceId.Laundry &&
                          selectedOption
                        ? `₦${(selectedOption.price * laundryBags * 30).toLocaleString()}`
                        : selectedService.displayPrice}
                  </span>
                </div>

                {selectedService.service_id === ServiceId.Cleaning && (
                  <div className={styles.modal__priceRow}>
                    <span className={styles.modal__priceLabel}>
                      Room Charges
                    </span>
                    <span className={styles.modal__priceValue}>
                      ₦
                      {Object.entries(roomQuantities)
                        .reduce((total, [room, quantity]) => {
                          const roomPrices = {
                            bedrooms: 5000,
                            livingRooms: 4000,
                            bathrooms: 6000,
                            kitchen: 7500,
                            study: 4000,
                            outdoor: 5000,
                          };
                          return (
                            total +
                            (roomPrices[
                              room as keyof typeof roomPrices
                            ] as number) *
                              (quantity as number)
                          );
                        }, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                )}

                {selectedService.service_id === ServiceId.Laundry &&
                  serviceSchedules[selectedService._id]?.days.length > 1 &&
                  selectedOption && (
                    <div className={styles.modal__priceRow}>
                      <span className={styles.modal__priceLabel}>
                        Recurring Discount (10%)
                      </span>
                      <span className={styles.modal__priceDiscount}>
                        -₦
                        {Math.round(
                          laundryBags * 30 * selectedOption.price * 0.1
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                <div className={styles.modal__priceDivider}></div>

                <div className={styles.modal__totalRow}>
                  <span className={styles.modal__totalLabel}>Final Total</span>
                  <span className={styles.modal__totalValue}>
                    ₦{calculateTotalPrice().toLocaleString()}
                  </span>
                </div>

                <div className={styles.modal__priceInfoNote}>
                  <Icon name="info" size={16} />
                  <span>
                    {serviceSchedules[selectedService._id]?.days.length > 1
                      ? "Recurring bookings receive a 10% discount on laundry services."
                      : "No discounts applied for one-time bookings."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Inclusions */}
          {selectedService.inclusions &&
            selectedService.inclusions.length > 0 && (
              <div className={styles.modal__invoiceSection}>
                <h3 className={styles.modal__invoiceSectionTitle}>
                  <Icon name="check" />
                  Service Includes
                </h3>

                <div className={styles.modal__invoiceInclusions}>
                  {selectedService.inclusions
                    .slice(0, 3)
                    .map((inclusion, index) => (
                      <div
                        key={index}
                        className={styles.modal__invoiceInclusion}
                      >
                        <Icon name="check-circle" size={16} />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </motion.div>
      </motion.div>
    );
  };

  /**
   * Render extra items modal for laundry service
   */
  const renderExtraItemsModal = () => {
    if (!selectedOption || !showExtraItems || !selectedOption.extraItems)
      return null;

    return (
      <motion.div
        className={styles.modal__extraItemsModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal__extraItemsContainer}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className={styles.modal__extraItemsHeader}>
            <h3 className={styles.modal__extraItemsTitle}>
              Extra Items for {selectedOption.label}
            </h3>
            <button
              className={styles.modal__close}
              onClick={() => setShowExtraItems(false)}
            >
              <Icon name="x" />
            </button>
          </div>

          <div className={styles.modal__extraItemsContent}>
            <div className={styles.modal__extraItem}>
              <span className={styles.modal__extraItemName}>Items</span>
              <span className={styles.modal__extraItemPrice}>Cost</span>
            </div>

            {selectedOption.extraItems.map((item, index) => (
              <motion.div
                key={index}
                className={styles.modal__extraItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className={styles.modal__extraItemName}>
                  {item.name} - {item.items} items
                </span>
                <span className={styles.modal__extraItemPrice}>
                  ₦{item.cost.toLocaleString()}
                </span>
              </motion.div>
            ))}

            {selectedService &&
              selectedService.service_id === "DRY_CLEANING" && (
                <motion.div
                  className={styles.modal__extraNotes}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className={styles.modal__extraNotesTitle}>
                    Additional Information
                  </h4>
                  <p className={styles.modal__extraNotesItem}>
                    Logistics charge for items on a hanger
                  </p>
                  <p className={styles.modal__extraNotesItem}>
                    This also applies when you have more than 1 laundry bag
                  </p>
                  <p className={styles.modal__extraNotesItem}>
                    Hanging clothes attracts an additional ₦300 per hanger
                  </p>
                </motion.div>
              )}
          </div>

          <div className={styles.modal__extraItemsFooter}>
            <button
              className={`${styles.modal__button} ${styles.modal__buttonPrimary}`}
              onClick={() => setShowExtraItems(false)}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  /**
   * Render current step content
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        return renderServiceSelection();
      case BookingStep.DETAILS:
        return renderDetailsAndSchedule();
      case BookingStep.REVIEW:
        return renderReview();
      default:
        return renderServiceSelection();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Subscription Services"
      maxWidth="800px"
    >
      <div className={styles.modal__content}>
        {/* Progress bar */}
        {renderProgressBar()}
        {/* Step content */}
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        {/* Navigation buttons */}
        {(currentStep === BookingStep.DETAILS ||
          currentStep === BookingStep.REVIEW) && (
          <div className={styles.modal__footer}>
            <button
              className={`${styles.modal__button} ${styles.modal__buttonBack}`}
              onClick={handleBack}
            >
              <Icon name="arrow-left" />
              Back
            </button>

            <button
              className={`${styles.modal__button} ${styles.modal__buttonPrimary}`}
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              {getNextButtonText()}
              <Icon name="arrow-right" />
            </button>
          </div>
        )}
      </div>
      {/* Extra items modal */}
      {renderExtraItemsModal()}
    </Modal>
  );
};

export default EditServiceModal;
