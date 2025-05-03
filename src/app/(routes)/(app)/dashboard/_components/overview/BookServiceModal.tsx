// src/components/booking/BookServiceModal.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/slices/ui";
import Icon, { IconName } from "../common/Icon";
import styles from "./BookServiceModal.module.scss";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  ServiceCategory,
  ServiceStatus,
  TimeSlot,
  Service,
  ServiceOption,
  CleaningType,
  HouseType,
  LaundryType,
  RoomQuantities,
  RoomQuantitiesInput,
  ServiceId,
  Severity,
  TreatmentType,
  RoomPrices,
  CreateBookingInput,
} from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import Modal from "@/components/ui/Modal/Modal";

/**
 * Service frequency options
 */
type ServiceFrequency = "one-off" | "weekly" | "bi-weekly" | "monthly";

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
  icon: IconName;
}

/**
 * Progress bar steps configuration
 */
const steps: Step[] = [
  { label: "Choose Service", icon: "package" },
  { label: "Details & Schedule", icon: "settings" },
  { label: "Review", icon: "check-circle" },
];

/**
 * BookServiceModal: Component for booking home services
 */
export default function BookServiceModal() {
  // Get modal state and operations from store
  const { isModalOpen, modalType, closeModal } = useUIStore();
  const { handleCreateBooking } = useBookingOperations();
  const { handleGetServices } = useServiceOperations();

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
  const [serviceFrequency, setServiceFrequency] =
    useState<ServiceFrequency>("one-off");
  const [propertyType, setPropertyType] = useState<"flat" | "duplex">("flat");
  const [roomQuantities, setRoomQuantities] = useState<RoomQuantitiesInput>({
    balcony: 0,
    bathroom: 1,
    bedroom: 1,
    kitchen: 1,
    livingRoom: 1,
    lobby: 1,
    other: 0,
    outdoor: 0,
    studyRoom: 0,
  });
  const [laundryBags, setLaundryBags] = useState<number>(1);
  const [severity, setSeverity] = useState<Severity>(Severity.Medium);
  const [treatmentType, setTreatmentType] = useState<TreatmentType>(
    TreatmentType.Residential
  );

  // Schedule state
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<TimeSlot>(TimeSlot.Morning);

  // UI state
  const [showExtraItems, setShowExtraItems] = useState(false);

  const [expandedSections, setExpandedSections] = useState<{
    booking: boolean;
    service: boolean;
  }>({
    booking: true,
    service: true,
  });

  const toggleSection = (section: "booking" | "service") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  /**
   * Fetch services from API
   */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const services = await handleGetServices(
          undefined,
          ServiceStatus.Active
        );

        if (!services) {
          throw new Error("No services returned from API");
        }

        setServices(
          services.filter(
            (service) => service.category !== ServiceCategory.Cooking
          )
        );
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [handleGetServices]);

  // Don't render if modal is closed or not for booking service
  if (!isModalOpen || modalType !== "book-service") return null;

  // Show loading state
  if (isLoading) {
    return (
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Book a Service"
        maxWidth="800px"
      >
        <div className={styles.modal__content}>
          <p>Loading services...</p>
        </div>
      </Modal>
    );
  }

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
        return (
          isStepAccessible(BookingStep.DETAILS) &&
          !!selectedDate &&
          !!selectedTime
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
    room: keyof RoomQuantitiesInput,
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
   * Calculate total price based on selected options
   */
  const calculateTotalPrice = () => {
    if (!selectedService) return 0;

    let totalPrice = selectedService.price;

    switch (selectedService.category) {
      case ServiceCategory.Cleaning: {
        // Calculate total price based on room prices and number of days
        const selectedDays = 1; // Default to 1 day for one-off bookings
        const roomPrices = selectedService.roomPrices || {};

        // Calculate total price for each room type
        const roomTotal = Object.entries(roomQuantities).reduce(
          (total, [room, quantity]) => {
            const roomPrice = roomPrices[room as keyof typeof roomPrices] || 0;
            return total + roomPrice * (quantity as number);
          },
          0
        );

        // Multiply by number of days selected
        totalPrice = roomTotal * selectedDays;
        break;
      }
      case ServiceCategory.Laundry: {
        // Calculate total price based on number of bags, items per bag, and selected days
        const itemsPerBag = 30;
        const basePrice = selectedOption?.price || selectedService.price;
        const totalItems = laundryBags * basePrice;
        const selectedDays = 1; // Default to 1 day for one-off bookings

        // Calculate total price
        totalPrice = totalItems; //* basePrice * selectedDays;
        break;
      }
      case ServiceCategory.PestControl: {
        // Calculate total price based on property type and severity
        const basePrice = selectedOption?.price || selectedService.price;
        const severityMultiplier = {
          [Severity.Low]: 1,
          [Severity.Medium]: 1.2,
          [Severity.High]: 1.5,
        };

        // Apply treatment type multiplier
        const treatmentMultiplier = {
          [TreatmentType.Residential]: 1,
          [TreatmentType.Commercial]: 1.5,
        };

        // Calculate total price
        totalPrice =
          basePrice *
          severityMultiplier[severity] *
          treatmentMultiplier[treatmentType];
        break;
      }
      default:
        // For unknown service types, use the base price
        totalPrice = selectedService.price;
        break;
    }

    return totalPrice;
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
    if (!selectedService || !selectedDate || !selectedTime) return;

    try {
      // Determine the service type based on service ID
      const getServiceType = (serviceId: string): ServiceCategory => {
        switch (serviceId) {
          case ServiceId.Cleaning:
            return ServiceCategory.Cleaning;
          case ServiceId.Laundry:
            return ServiceCategory.Laundry;
          case ServiceId.PestControl:
          case ServiceId.PestControlResidential:
          case ServiceId.PestControlCommercial:
            return ServiceCategory.PestControl;
          default:
            return ServiceCategory.Cleaning;
        }
      };

      // Format booking data
      const bookingData: CreateBookingInput = {
        serviceId: selectedService._id,
        serviceType: getServiceType(selectedService.service_id),
        serviceOption: selectedOption?.service_id || "" as string,
        date: new Date(selectedDate),
        timeSlot: selectedTime,
        address: {
          street: "123 Main St",
          city: "City",
          state: "State",
          zipCode: "12345",
          country: "Country",
        },
        notes: `Frequency: ${serviceFrequency}`,
        serviceDetails: {
          serviceOption: selectedOption?.service_id || "" as string,
          cleaning:
            selectedService.service_id === ServiceId.Cleaning
              ? {
                  cleaningType: selectedOption?.service_id as unknown as CleaningType,
                  houseType:
                    propertyType === "flat" ? HouseType.Flat : HouseType.Duplex,
                  rooms: roomQuantities,
                }
              : undefined,
          laundry:
            selectedService.service_id === ServiceId.Laundry
              ? {
                  bags: laundryBags,
                  laundryType: LaundryType.StandardLaundry,
                }
              : undefined,
          pestControl:
            selectedService.service_id === ServiceId.PestControl ||
            selectedService.service_id === ServiceId.PestControlResidential ||
            selectedService.service_id === ServiceId.PestControlCommercial
              ? {
                  areas: ["living room", "kitchen", "bathroom"],
                  severity: severity,
                  treatmentType: treatmentType,
                }
              : undefined,
        },
        totalPrice: calculateTotalPrice(),
      };

      // Submit the booking
      await handleCreateBooking(bookingData);

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  /**
   * Check if the next button should be disabled
   */
  const isNextDisabled = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        if (
          (selectedService?.service_id === ServiceId.Cleaning ||
            selectedService?.service_id === ServiceId.Laundry) &&
          selectedService.options &&
          selectedService?.options?.length > 0
        ) {
          return !selectedOption;
        }
        return !selectedService;
      case BookingStep.DETAILS:
        if (selectedService?.service_id === ServiceId.Cleaning) {
          return (
            !selectedDate ||
            !selectedTime ||
            Object.values(roomQuantities).every((qty) => Number(qty) === 0)
          );
        }
        return !selectedDate || !selectedTime;
      default:
        return false;
    }
  };

  /**
   * Get the button text based on the current step
   */
  const getNextButtonText = () => {
    switch (currentStep) {
      case BookingStep.DETAILS:
        return "Review Booking";
      case BookingStep.REVIEW:
        return "Confirm & Book";
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
                    <Icon name={service.icon as IconName} />
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
                    {`From $${option.price}`}
                  </span>

                  {/* Show "View extra items" button for laundry options */}
                  {selectedService.service_id === ServiceId.Laundry &&
                    option.extraItems &&
                    option.extraItems?.length > 0 && (
                      <div
                        className={styles.modal__optionCardInfoLink}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOption(option);
                          setShowExtraItems(true);
                        }}
                      >
                        View extra items pricing
                        {/* <Icon name="info" /> */}
                      </div>
                    )}
                </div>
                <div className={styles.modal__optionCardCheckbox}>
                  {/* {selectedOption?.id === option.id && <Icon name="check" />} */}
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
          {/* Schedule */}
          <motion.div
            variants={itemVariants}
            className={styles.modal__formGroup}
          >
            <label>
              <Icon name="calendar" />
              Schedule
            </label>
            <div className={styles.modal__formRow}>
              <div className={styles.modal__formGroup}>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  className={styles.modal__input}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className={styles.modal__formGroup}>
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  className={styles.modal__select}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value as TimeSlot)}
                >
                  <option value="">Select a time slot</option>
                  <option value={TimeSlot.Morning}>Morning</option>
                  <option value={TimeSlot.Afternoon}>Afternoon</option>
                  <option value={TimeSlot.Evening}>Evening</option>
                </select>
              </div>
            </div>
            <p className={styles.modal__helper}>
              Our service hours are 9:00 AM to 5:00 PM, Monday through Saturday
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
                    propertyType === "flat"
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setPropertyType("flat")}
                >
                  Flat / Apartment
                </button>
                <button
                  className={`${styles.modal__toggleButton} ${
                    propertyType === "duplex"
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setPropertyType("duplex")}
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
                            room as keyof RoomQuantitiesInput,
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
                            room as keyof RoomQuantitiesInput,
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

          {/* Pest Control Specific Fields */}
          {(selectedService.service_id === ServiceId.PestControl ||
            selectedService.service_id === ServiceId.PestControlResidential ||
            selectedService.service_id === ServiceId.PestControlCommercial) && (
            <motion.div
              variants={itemVariants}
              className={styles.modal__formGroup}
            >
              <label>
                <Icon name="bug-off" />
                Pest Control Details
              </label>
              <div className={styles.modal__toggleGroup}>
                <button
                  className={`${styles.modal__toggleButton} ${
                    propertyType === "flat"
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setPropertyType("flat")}
                >
                  Residential
                </button>
                <button
                  className={`${styles.modal__toggleButton} ${
                    propertyType === "duplex"
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setPropertyType("duplex")}
                >
                  Commercial
                </button>
              </div>

              <label style={{ marginTop: "20px" }}>
                <Icon name="alert-triangle" />
                Severity Level
              </label>
              <div className={styles.modal__toggleGroup}>
                <button
                  className={`${styles.modal__toggleButton} ${
                    severity === Severity.Low
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setSeverity(Severity.Low)}
                >
                  Low
                </button>
                <button
                  className={`${styles.modal__toggleButton} ${
                    severity === Severity.Medium
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setSeverity(Severity.Medium)}
                >
                  Medium
                </button>
                <button
                  className={`${styles.modal__toggleButton} ${
                    severity === Severity.High
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setSeverity(Severity.High)}
                >
                  High
                </button>
              </div>

              <label style={{ marginTop: "20px" }}>
                <Icon name="spray" />
                Treatment Type
              </label>
              <div className={styles.modal__toggleGroup}>
                <button
                  className={`${styles.modal__toggleButton} ${
                    treatmentType === TreatmentType.Residential
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setTreatmentType(TreatmentType.Residential)}
                >
                  Residential
                </button>
                <button
                  className={`${styles.modal__toggleButton} ${
                    treatmentType === TreatmentType.Commercial
                      ? styles.modal__toggleButtonSelected
                      : ""
                  }`}
                  onClick={() => setTreatmentType(TreatmentType.Commercial)}
                >
                  Commercial
                </button>
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
                <div
                  className={`${styles.modal__bookingSectionTitle} ${expandedSections.booking ? styles.modal__accordionOpen : ""}`}
                  onClick={() => toggleSection("booking")}
                >
                  <div className={styles.modal__bookingSectionTitleContent}>
                    <Icon name="calendar" size={16} />
                    Schedule Information
                  </div>
                  <Icon
                    name="chevron-down"
                    size={16}
                    className={styles.modal__accordionIcon}
                  />
                </div>
                <div
                  className={`${styles.modal__bookingSectionContent} ${expandedSections.booking ? styles.modal__accordionContentOpen : ""}`}
                >
                  <div className={styles.modal__bookingDetailsGrid}>
                    <div className={styles.modal__bookingDetailItem}>
                      <div className={styles.modal__bookingDetailLabel}>
                        Service Date
                      </div>
                      <div className={styles.modal__bookingDetailValue}>
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className={styles.modal__bookingDetailItem}>
                      <div className={styles.modal__bookingDetailLabel}>
                        Time Slot
                      </div>
                      <div className={styles.modal__bookingDetailValue}>
                        {selectedTime === TimeSlot.Morning
                          ? "Morning (8:00 AM - 12:00 PM)"
                          : selectedTime === TimeSlot.Afternoon
                            ? "Afternoon (12:00 PM - 4:00 PM)"
                            : selectedTime === TimeSlot.Evening
                              ? "Evening (4:00 PM - 8:00 PM)"
                              : selectedTime}
                      </div>
                    </div>

                    <div className={styles.modal__bookingDetailItem}>
                      <div className={styles.modal__bookingDetailLabel}>
                        Booking Frequency
                      </div>
                      <div className={styles.modal__bookingDetailValue}>
                        <span
                          className={`${styles.modal__frequencyBadge} ${styles[`modal__frequencyBadge--${serviceFrequency}`]}`}
                        >
                          {serviceFrequency.replace("-", " ")}
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
                  {serviceFrequency !== "one-off" && (
                    <div className={styles.modal__recurringInfo}>
                      <div className={styles.modal__recurringInfoIcon}>
                        <Icon name="repeat" size={18} />
                      </div>
                      <div className={styles.modal__recurringInfoContent}>
                        <div className={styles.modal__recurringInfoTitle}>
                          Recurring Service
                        </div>
                        <p className={styles.modal__recurringInfoText}>
                          This is a {serviceFrequency.replace("-", " ")}{" "}
                          booking.
                          {serviceFrequency === "weekly"
                            ? " Your service will be scheduled each week on the same day and time."
                            : serviceFrequency === "bi-weekly"
                              ? " Your service will be scheduled every two weeks on the same day and time."
                              : serviceFrequency === "monthly"
                                ? " Your service will be scheduled once a month on the same day and time."
                                : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className={styles.modal__bookingSection}>
                <div
                  className={`${styles.modal__bookingSectionTitle} ${expandedSections.service ? styles.modal__accordionOpen : ""}`}
                  onClick={() => toggleSection("service")}
                >
                  <div className={styles.modal__bookingSectionTitleContent}>
                    <Icon name={selectedService.icon as IconName} size={16} />
                    Service Details
                  </div>
                  <Icon
                    name="chevron-down"
                    size={16}
                    className={styles.modal__accordionIcon}
                  />
                </div>
                <div
                  className={`${styles.modal__bookingSectionContent} ${expandedSections.service ? styles.modal__accordionContentOpen : ""}`}
                >
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
                          {propertyType === "flat"
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
                              <div
                                key={room}
                                className={styles.modal__roomItem}
                              >
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
                                      .replace(/^./, (str) =>
                                        str.toUpperCase()
                                      )}
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

                  {/* Pest Control details */}
                  {(selectedService.service_id === ServiceId.PestControl ||
                    selectedService.service_id ===
                      ServiceId.PestControlResidential ||
                    selectedService.service_id ===
                      ServiceId.PestControlCommercial) && (
                    <div className={styles.modal__laundryDetail}>
                      <div className={styles.modal__laundryDetailTitle}>
                        Pest Control Details
                      </div>
                      <div className={styles.modal__pestControlInfo}>
                        <div className={styles.modal__pestControlDetail}>
                          <div className={styles.modal__pestControlDetailIcon}>
                            <Icon name="bug-off" size={20} />
                          </div>
                          <div className={styles.modal__pestControlDetailInfo}>
                            <div
                              className={styles.modal__pestControlDetailTitle}
                            >
                              Treatment Type
                            </div>
                            <div
                              className={styles.modal__pestControlDetailValue}
                            >
                              {treatmentType === TreatmentType.Residential
                                ? "Residential"
                                : "Commercial"}
                            </div>
                          </div>
                        </div>
                        <div className={styles.modal__pestControlDetail}>
                          <div className={styles.modal__pestControlDetailIcon}>
                            <Icon name="alert-triangle" size={20} />
                          </div>
                          <div className={styles.modal__pestControlDetailInfo}>
                            <div
                              className={styles.modal__pestControlDetailTitle}
                            >
                              Infestation Severity
                            </div>
                            <div
                              className={styles.modal__pestControlDetailValue}
                            >
                              {severity === Severity.Low
                                ? "Low"
                                : severity === Severity.Medium
                                  ? "Medium"
                                  : "High"}
                            </div>
                          </div>
                        </div>
                        <div className={styles.modal__pestControlDetail}>
                          <div className={styles.modal__pestControlDetailIcon}>
                            <Icon name="check-circle" size={20} />
                          </div>
                          <div className={styles.modal__pestControlDetailInfo}>
                            <div
                              className={styles.modal__pestControlDetailTitle}
                            >
                              Treatment Areas
                            </div>
                            <div
                              className={styles.modal__pestControlDetailValue}
                            >
                              Living Room, Kitchen, Bathroom
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
          <div className={styles.modal__priceSummaryBox}>
            <div className={styles.modal__priceTotal}>
              <span>Total Amount</span>
              <span>₦{calculateTotalPrice().toLocaleString()}</span>
            </div>
          </div>
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

  /**
   * Main component render
   */
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Book a Service"
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
}
