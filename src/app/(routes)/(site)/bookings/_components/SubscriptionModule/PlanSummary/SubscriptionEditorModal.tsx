//@ts-nocheck
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/slices/ui";
import { Icon, IconName } from "@/components/ui/Icon/Icon";
import styles from "./SubscriptionEditorModal.module.scss";
import { useState, useEffect } from "react";
import ScheduleSelector from "./ServiceEditor/ScheduleSelector/ScheduleSelector";

interface CleaningOption {
  id: string;
  label: string;
  description: string;
  price: string;
  inclusions: string[];
}

interface ExtraItem {
  name: string;
  items: number;
  cost: number;
}

interface LaundryOption {
  id: string;
  label: string;
  description: string;
  price: string;
  extraItems: ExtraItem[];
  extraNotes?: string[];
}

interface Service {
  id: string;
  label: string;
  icon: IconName;
  description: string;
  price: string;
  duration: string;
  inclusions: string[];
  options?: CleaningOption[];
}

interface RoomQuantity {
  bedrooms: number;
  livingRooms: number;
  bathrooms: number;
  kitchen: number;
  study: number;
  outdoor: number;
}

type ServiceFrequency = "one-off" | "weekly" | "bi-weekly" | "monthly";

// Simplified 3-step booking process
enum BookingStep {
  SERVICE = 0, // Choose service and type
  DETAILS = 1, // Set details and schedule
  REVIEW = 2, // Review and confirm
}

const cleaningOptions: CleaningOption[] = [
  {
    id: "standard",
    label: "Standard Clean",
    description: "Regular cleaning service for maintaining a clean home",
    price: "From $50",
    inclusions: [
      "Sweeping and mopping of all floors",
      "Disinfect and wash toilet and urinals",
      "Dust and wipe all surfaces",
      "Cobweb removal from all surfaces",
      "Laying of bed",
      "Wash dirty dishes",
      "Empty and clean trash can",
    ],
  },
  {
    id: "deep-clean",
    label: "Deep Clean",
    description: "Thorough cleaning service for a more intensive clean",
    price: "From $80",
    inclusions: [
      "Sweeping and mopping of all floors",
      "Disinfect and wash toilet and urinals",
      "Dust and wipe all surfaces",
      "Cobweb removal from all surfaces",
      "Scrape floors, walls and clean all surfaces",
      "Clean cupboards and cabinets",
      "Wash dirty dishes",
      "Empty and clean trash can",
      "Clean internal and external parts of home appliances",
    ],
  },
  {
    id: "post-construction",
    label: "Post-Construction Clean",
    description:
      "Specialized cleaning service for after construction or renovation",
    price: "From $120",
    inclusions: [
      "Washing of windows and doors",
      "Scraping of POP from wall tiles",
      "Washing of the walls",
      "Dusting and wiping of all surfaces",
      "Sweeping and mopping of the floor",
      "Cobweb removal from all surfaces",
      "Resurfacing of the tiles to maintain quality",
      "Polishing of all wooden surfaces",
      "Scraping of cements and paint stains",
    ],
  },
];

const laundryOptions: LaundryOption[] = [
  {
    id: "wash-fold",
    label: "Wash & Fold",
    description: "Professional washing and folding service",
    price: "From ₦430 per item",
    extraItems: [
      { name: "Curtains", items: 8, cost: 3440 },
      { name: "Bedsheet", items: 2, cost: 860 },
      { name: "Duvets", items: 8, cost: 3440 },
    ],
  },
  {
    id: "wash-iron",
    label: "Wash & Iron",
    description: "Professional washing and ironing service",
    price: "From ₦860 per item",
    extraItems: [
      { name: "Curtains", items: 6, cost: 5160 },
      { name: "Bedsheet", items: 2, cost: 1720 },
      { name: "Duvet", items: 4, cost: 3440 },
    ],
    extraNotes: [
      "Logistics charge for items on a hanger",
      "This also applies when you have more than 1 laundry bag",
      "Hanging clothes attracts an additional ₦300 per hanger",
    ],
  },
  {
    id: "dry-clean",
    label: "Dry Cleaning",
    description: "Professional dry cleaning service",
    price: "From ₦1,600 per item",
    extraItems: [
      { name: "Regular Items", items: 1, cost: 1600 },
      { name: "Wedding gowns", items: 22, cost: 35000 },
      { name: "Custom Wedding Suit set", items: 10, cost: 15000 },
      { name: "3pc suit", items: 5, cost: 8000 },
      { name: "2pc suit", items: 4, cost: 6000 },
      { name: "Stoned gowns", items: 5, cost: 7500 },
      { name: "Wool Materials", items: 3, cost: 5000 },
      { name: "Winter Jacket", items: 3, cost: 5000 },
      { name: "Tshirts / Shirts / Trousers", items: 1, cost: 1600 },
    ],
    extraNotes: [
      "Logistics charge for items on a hanger",
      "This also applies when you have more than 1 laundry bag",
      "Hanging clothes attracts an additional ₦300 per hanger",
    ],
  },
];

const services: Service[] = [
  {
    id: "cleaning",
    label: "Cleaning",
    icon: "Droplet",
    description: "Professional home cleaning service",
    price: "From $50",
    duration: "2-3 hours",
    inclusions: [
      "Professional cleaning service",
      "Trained and experienced cleaners",
      "Quality cleaning supplies",
      "Satisfaction guaranteed",
    ],
    options: cleaningOptions,
  },
  {
    id: "laundry",
    label: "Laundry",
    icon: "Package",
    description: "Wash, dry, and fold service",
    price: "From $30",
    duration: "24-48 hours",
    inclusions: [
      "Pickup and delivery",
      "Wash and dry",
      "Professional folding",
      "Stain treatment",
      "Fabric care",
    ],
  },
  {
    id: "pest-control",
    icon: "Shield",
    label: "Pest Control",
    description: "Professional pest control service",
    price: "From $80",
    duration: "1-2 hours",
    inclusions: [
      "Inspection and assessment",
      "Treatment application",
      "Follow-up visit",
      "Eco-friendly solutions",
      "Guaranteed results",
    ],
  },
];

// Step information for progress bar
const steps = [
  { label: "Choose Service", icon: "ShoppingBag" },
  { label: "Details & Schedule", icon: "Sliders" },
  { label: "Review", icon: "CheckCircle" },
];

interface SubscriptionEditorModalProps {
  selectedServices: ServiceType[];
}

export default function SubscriptionEditorModal({
  selectedServices,
}: SubscriptionEditorModalProps) {
  const { isModalOpen, modalType, closeModal } = useUIStore();
  const [currentStep, setCurrentStep] = useState<BookingStep>(
    BookingStep.SERVICE
  );
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Service selection state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCleaningOption, setSelectedCleaningOption] =
    useState<CleaningOption | null>(null);
  const [selectedLaundryOption, setSelectedLaundryOption] =
    useState<LaundryOption | null>(null);
  const [showServiceOptions, setShowServiceOptions] = useState<boolean>(false);

  // Filter services to only show selected ones
  const filteredServices = services.filter((service) =>
    selectedServices.some((selected) => selected.type === service.id)
  );

  // Service details state
  const [propertyType, setPropertyType] = useState<"flat" | "duplex">("flat");
  const [roomQuantities, setRoomQuantities] = useState<RoomQuantity>({
    bedrooms: 0,
    livingRooms: 0,
    bathrooms: 0,
    kitchen: 0,
    study: 0,
    outdoor: 0,
  });
  const [laundryBags, setLaundryBags] = useState<number>(1);

  // Schedule state
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("8am");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // UI state
  const [showExtraItems, setShowExtraItems] = useState(false);

  // Only render the modal on the client side
  if (!isClient) return null;

  if (!isModalOpen || modalType !== "craft-subscription") return null;

  // Calculate if the step is accessible
  const isStepAccessible = (step: BookingStep): boolean => {
    switch (step) {
      case BookingStep.SERVICE:
        return true;
      case BookingStep.DETAILS:
        if (selectedService?.id === "cleaning") {
          return !!selectedCleaningOption;
        } else if (selectedService?.id === "laundry") {
          return !!selectedLaundryOption;
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

  // Handle clicking on progress step
  const handleStepClick = (step: BookingStep) => {
    if (isStepAccessible(step)) {
      setCurrentStep(step);
    }
  };

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);

    if (service.id === "cleaning" || service.id === "laundry") {
      setShowServiceOptions(true);
    } else {
      setShowServiceOptions(false);
      setCurrentStep(BookingStep.DETAILS);
    }
  };

  // Handle cleaning option selection
  const handleCleaningOptionSelect = (option: CleaningOption) => {
    setSelectedCleaningOption(option);
    setCurrentStep(BookingStep.DETAILS);
  };

  // Handle laundry option selection
  const handleLaundryOptionSelect = (option: LaundryOption) => {
    setSelectedLaundryOption(option);
    setCurrentStep(BookingStep.DETAILS);
  };

  // Handle room quantity changes
  const handleQuantityChange = (
    room: keyof RoomQuantity,
    increment: boolean
  ) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, prev[room] + (increment ? 1 : -1)),
    }));
  };

  // Handle laundry bag quantity changes
  const handleLaundryBagChange = (increment: boolean) => {
    setLaundryBags((prev) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  // Handle day selection
  const toggleDay = (day: string) => {
    let newDays = [...selectedDays];

    if (selectedDays.includes(day)) {
      // Remove day if it's not the last one
      if (selectedDays.length > 1) {
        newDays = newDays.filter((d) => d !== day);
      }
    } else {
      // Add day
      newDays.push(day);
    }

    setSelectedDays(newDays);
  };

  // Get days of week
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Calculate total price based on selected options
  const calculateTotalPrice = () => {
    if (!selectedService) return 0;

    let basePrice = 0;

    // Get base price from cleaning option or service
    if (selectedService.id === "cleaning" && selectedCleaningOption) {
      basePrice = parseInt(selectedCleaningOption.price.replace(/[^0-9]/g, ""));
    } else if (selectedService.id === "laundry" && selectedLaundryOption) {
      // For laundry, calculate based on bags and frequency
      const itemsPerBag = 30;
      const totalItems = laundryBags * itemsPerBag;
      const basePricePerItem = parseInt(
        selectedLaundryOption.price.replace(/[^0-9]/g, "")
      );
      basePrice = totalItems * basePricePerItem;

      // Apply recurring discount if applicable
      if (selectedDays.length > 0) {
        basePrice = Math.round(basePrice * 0.9); // 10% discount for recurring
      }
    } else {
      basePrice = parseInt(selectedService.price.replace(/[^0-9]/g, ""));
    }

    // Add price per room for cleaning service
    if (selectedService.id === "cleaning") {
      const roomPrices = {
        bedrooms: 20,
        livingRooms: 15,
        bathrooms: 25,
        kitchen: 30,
        study: 15,
        outdoor: 20,
      };

      const roomTotal = Object.entries(roomQuantities).reduce(
        (total, [room, quantity]) => {
          return total + roomPrices[room as keyof typeof roomPrices] * quantity;
        },
        0
      );

      return basePrice + roomTotal;
    }

    return basePrice;
  };

  // Navigation handlers
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

  const handleSubmit = () => {
    // Create booking data object
    const bookingData = {
      service: selectedService?.id,
      serviceType:
        selectedService?.id === "cleaning"
          ? selectedCleaningOption?.id
          : selectedService?.id === "laundry"
            ? selectedLaundryOption?.id
            : null,
      details: {
        time: selectedTime,
        days: selectedDays,
        propertyType: selectedService?.id === "cleaning" ? propertyType : null,
        rooms: selectedService?.id === "cleaning" ? roomQuantities : null,
        laundryBags: selectedService?.id === "laundry" ? laundryBags : null,
      },
      pricing: {
        totalPrice: calculateTotalPrice(),
        currency: "₦",
      },
    };

    // Log the booking data to console
    console.log("Booking submitted:", JSON.stringify(bookingData, null, 2));

    // Close the modal
    closeModal();
  };

  // Check if the next button should be disabled
  const isNextDisabled = () => {
    switch (currentStep) {
      case BookingStep.SERVICE:
        if (selectedService?.id === "cleaning") {
          return !selectedCleaningOption;
        } else if (selectedService?.id === "laundry") {
          return !selectedLaundryOption;
        }
        return !selectedService;
      case BookingStep.DETAILS:
        // Need date, time, and for cleaning - at least one room
        if (selectedService?.id === "cleaning") {
          return (
            selectedDays.length === 0 ||
            Object.values(roomQuantities).every((qty) => qty === 0)
          );
        } else if (selectedService?.id === "laundry") {
          return selectedDays.length === 0;
        }
        return selectedDays.length === 0;
      default:
        return false;
    }
  };

  // Get the button text based on the current step
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

  // Calculate progress width
  const calculateProgressWidth = () => {
    const maxSteps = steps.length - 1;
    const progress = (currentStep / maxSteps) * 100;
    return `${progress}%`;
  };

  // Animation variants
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

  // Render service selection step
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
          <>
            <motion.h2
              className={styles.modal__contentTitle}
              variants={itemVariants}
            >
              <Icon name="ShoppingBag" />
              Select a Service
            </motion.h2>
            <motion.p
              className={styles.modal__contentSubtitle}
              variants={itemVariants}
            >
              Choose from your selected services
            </motion.p>

            <div className={styles.modal__serviceGrid}>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  className={`${styles.modal__serviceCard} ${
                    selectedService?.id === service.id
                      ? styles.modal__serviceCardSelected
                      : ""
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className={styles.modal__serviceCardIcon}>
                    <Icon name={service.icon} />
                  </div>
                  <h3 className={styles.modal__serviceCardTitle}>
                    {service.label}
                  </h3>
                  <span className={styles.modal__serviceCardPrice}>
                    {service.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.modal__backLink}
              onClick={() => setShowServiceOptions(false)}
            >
              <Icon name="ArrowLeft" />
              <span>Back to services</span>
            </div>

            <motion.h2
              className={styles.modal__contentTitle}
              variants={itemVariants}
            >
              <Icon name="Grid" />
              Select {selectedService?.label} Type
            </motion.h2>
            <motion.p
              className={styles.modal__contentSubtitle}
              variants={itemVariants}
            >
              Choose the type of {selectedService?.label.toLowerCase()} service
              you need
            </motion.p>

            {selectedService?.id === "cleaning" &&
              cleaningOptions.map((option) => (
                <motion.div
                  key={option.id}
                  className={`${styles.modal__optionCard} ${
                    selectedCleaningOption?.id === option.id
                      ? styles.modal__optionCardSelected
                      : ""
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCleaningOptionSelect(option)}
                >
                  <div className={styles.modal__optionCardContent}>
                    <h3 className={styles.modal__optionCardTitle}>
                      {option.label}
                    </h3>
                    <p className={styles.modal__optionCardDescription}>
                      {option.description}
                    </p>
                    <span className={styles.modal__optionCardPrice}>
                      {option.price}
                    </span>
                  </div>
                  <div className={styles.modal__optionCardCheckbox}>
                    {selectedCleaningOption?.id === option.id && (
                      <Icon name="Check" />
                    )}
                  </div>
                </motion.div>
              ))}

            {selectedService?.id === "laundry" &&
              laundryOptions.map((option) => (
                <motion.div
                  key={option.id}
                  className={`${styles.modal__optionCard} ${
                    selectedLaundryOption?.id === option.id
                      ? styles.modal__optionCardSelected
                      : ""
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLaundryOptionSelect(option)}
                >
                  <div className={styles.modal__optionCardContent}>
                    <h3 className={styles.modal__optionCardTitle}>
                      {option.label}
                    </h3>
                    <p className={styles.modal__optionCardDescription}>
                      {option.description}
                    </p>
                    <span className={styles.modal__optionCardPrice}>
                      {option.price}
                    </span>

                    <div
                      className={styles.modal__optionCardInfoLink}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLaundryOption(option);
                        setShowExtraItems(true);
                      }}
                    >
                      View extra items pricing
                      <Icon name="Info" />
                    </div>
                  </div>
                  <div className={styles.modal__optionCardCheckbox}>
                    {selectedLaundryOption?.id === option.id && (
                      <Icon name="Check" />
                    )}
                  </div>
                </motion.div>
              ))}
          </>
        )}
      </motion.div>
    );
  };

  // Render service details and scheduling step
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
          <Icon name="ArrowLeft" />
          <span>Back to service selection</span>
        </div>

        <motion.h2
          className={styles.modal__contentTitle}
          variants={itemVariants}
        >
          <Icon name="Sliders" />
          {selectedService.label} Details
          {selectedService.id === "cleaning" && selectedCleaningOption
            ? ` - ${selectedCleaningOption.label}`
            : selectedService.id === "laundry" && selectedLaundryOption
              ? ` - ${selectedLaundryOption.label}`
              : ""}
        </motion.h2>

        <motion.div className={styles.modal__form} variants={containerVariants}>
          {/* Schedule Section */}
          <motion.div
            variants={itemVariants}
            className={styles.modal__formGroup}
          >
            <label>
              <Icon name="Calendar" />
              Schedule
            </label>

            <div className={styles.modal__scheduleSelector}>
              <h3 className={styles.modal__scheduleTitle}>
                Select your service days
              </h3>

              <div className={styles.modal__daysGrid}>
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`${styles.modal__dayButton} ${
                      selectedDays.includes(day)
                        ? styles.modal__dayButtonSelected
                        : ""
                    }`}
                    onClick={() => toggleDay(day)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                  </button>
                ))}
              </div>

              {selectedDays.length > 0 && (
                <div className={styles.modal__scheduleSummary}>
                  <span>
                    Service will be provided on:{" "}
                    {selectedDays
                      .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
                      .join(", ")}
                  </span>
                </div>
              )}

              {selectedService.id === "cleaning" && (
                <div className={styles.modal__timeSelector}>
                  <h3 className={styles.modal__scheduleTitle}>
                    Select your preferred time
                  </h3>
                  <div className={styles.modal__timeOptions}>
                    {["morning", "afternoon", "evening"].map((time) => (
                      <button
                        key={time}
                        className={`${styles.modal__timeButton} ${
                          selectedTime === time
                            ? styles.modal__timeButtonSelected
                            : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cleaning Specific Fields */}
          {selectedService.id === "cleaning" && (
            <motion.div
              variants={itemVariants}
              className={styles.modal__formGroup}
            >
              <label>
                <Icon name="Home" />
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
                <Icon name="Grid" />
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
                            room as keyof RoomQuantity,
                            false
                          )
                        }
                        disabled={quantity <= 0}
                      >
                        <Icon name="Minus" />
                      </button>
                      <span className={styles.modal__counterGroupValue}>
                        {quantity}
                      </span>
                      <button
                        className={styles.modal__counterGroupButton}
                        onClick={() =>
                          handleQuantityChange(room as keyof RoomQuantity, true)
                        }
                      >
                        <Icon name="Plus" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Laundry Specific Fields */}
          {selectedService.id === "laundry" && (
            <motion.div
              variants={itemVariants}
              className={styles.modal__formGroup}
            >
              <label>
                <Icon name="Package" />
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
                    <Icon name="Minus" />
                  </button>
                  <span className={styles.modal__counterGroupValue}>
                    {laundryBags}
                  </span>
                  <button
                    className={styles.modal__counterGroupButton}
                    onClick={() => handleLaundryBagChange(true)}
                  >
                    <Icon name="Plus" />
                  </button>
                </div>
              </div>
              <p className={styles.modal__helper}>
                Approximately 30 items per bag
              </p>
            </motion.div>
          )}

          {/* Service Inclusions */}
          {/* <motion.div
            variants={itemVariants}
            className={styles.modal__formGroup}
          >
            <label>
              <Icon name="CheckCircle" />
              Service Inclusions
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "10px",
              }}
            >
              {(selectedCleaningOption?.inclusions || selectedLaundryOption
                ? selectedService.inclusions
                : selectedService.inclusions || []
              )
                .slice(0, 4)
                .map((inclusion, index) => (
                  <div key={index} className={styles.modal__inclusion}>
                    <Icon name="Check" />
                    <span className={styles.modal__inclusionText}>
                      {inclusion}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div> */}

          {/* Price Summary */}
          <motion.div
            variants={itemVariants}
            className={styles.modal__formGroup}
          >
            <label>
              <Icon name="DollarSign" />
              Price Summary
            </label>
            <div className={styles.modal__summaryItem}>
              <span className={styles.modal__summaryItemLabel}>Service</span>
              <span className={styles.modal__summaryItemValue}>
                {selectedService.label}
                {selectedCleaningOption
                  ? ` - ${selectedCleaningOption.label}`
                  : ""}
                {selectedLaundryOption
                  ? ` - ${selectedLaundryOption.label}`
                  : ""}
              </span>
            </div>

            {selectedService.id === "cleaning" && (
              <div className={styles.modal__summaryItem}>
                <span className={styles.modal__summaryItemLabel}>
                  Room Charges
                </span>
                <span className={styles.modal__summaryItemValue}>
                  $
                  {Object.entries(roomQuantities).reduce(
                    (total, [room, quantity]) => {
                      const roomPrices = {
                        bedrooms: 20,
                        livingRooms: 15,
                        bathrooms: 25,
                        kitchen: 30,
                        study: 15,
                        outdoor: 20,
                      };
                      return (
                        total +
                        roomPrices[room as keyof typeof roomPrices] * quantity
                      );
                    },
                    0
                  )}
                </span>
              </div>
            )}

            {selectedService.id === "laundry" && (
              <div className={styles.modal__summaryItem}>
                <span className={styles.modal__summaryItemLabel}>Laundry</span>
                <span className={styles.modal__summaryItemValue}>
                  {laundryBags} bag{laundryBags > 1 ? "s" : ""} (approx.{" "}
                  {laundryBags * 30} items)
                </span>
              </div>
            )}

            <div className={styles.modal__summaryItem}>
              <span className={styles.modal__summaryItemLabel}>Schedule</span>
              <span className={styles.modal__summaryItemValue}>
                {selectedDays.length} day{selectedDays.length > 1 ? "s" : ""}{" "}
                per week
              </span>
            </div>

            <div className={styles.modal__summaryItem}>
              <span
                className={
                  styles.modal__summaryItemLabel +
                  " " +
                  styles.modal__summaryItemTotal
                }
              >
                Total Price
              </span>
              <span
                className={
                  styles.modal__summaryItemValue +
                  " " +
                  styles.modal__summaryItemTotal
                }
              >
                ₦{calculateTotalPrice().toLocaleString()}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // Render booking summary step in invoice style
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
          <Icon name="ArrowLeft" />
          <span>Back to details</span>
        </div>

        <motion.h2
          className={styles.modal__contentTitle}
          variants={itemVariants}
        >
          <Icon name="CheckCircle" />
          Review Your Booking
        </motion.h2>
        <motion.p
          className={styles.modal__contentSubtitle}
          variants={itemVariants}
        >
          Please confirm your booking details
        </motion.p>

        <motion.div className={styles.modal__invoice} variants={itemVariants}>
          {/* Invoice Header */}
          <div className={styles.modal__invoiceHeader}>
            <div className={styles.modal__invoiceLogo}>
              <Icon name="Home" size={24} />
              <span>Metro Mellow</span>
            </div>
            <div className={styles.modal__invoiceId}>
              <span>Booking #</span>
              <span>{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          </div>

          {/* Service Overview */}
          <div className={styles.modal__invoiceSection}>
            <div className={styles.modal__invoiceItem}>
              <div className={styles.modal__invoiceItemIcon}>
                <Icon name={selectedService.icon} />
              </div>
              <div className={styles.modal__invoiceItemContent}>
                <h3>
                  {selectedService.label}
                  {selectedCleaningOption
                    ? ` - ${selectedCleaningOption.label}`
                    : ""}
                  {selectedLaundryOption
                    ? ` - ${selectedLaundryOption.label}`
                    : ""}
                </h3>
                <p>{selectedService.description}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className={styles.modal__invoiceSection}>
            <h3 className={styles.modal__invoiceSectionTitle}>
              <Icon name="Info" />
              Booking Details
            </h3>

            <div className={styles.modal__invoiceGrid}>
              <div className={styles.modal__invoiceDetailItem}>
                <span className={styles.modal__invoiceDetailLabel}>
                  <Icon name="Calendar" size={14} />
                  Schedule
                </span>
                <span className={styles.modal__invoiceDetailValue}>
                  {selectedDays.length} day
                  {selectedDays.length > 1 ? "s" : ""} per week
                </span>
              </div>

              <div className={styles.modal__invoiceDetailItem}>
                <span className={styles.modal__invoiceDetailLabel}>
                  <Icon name="Clock" size={14} />
                  Time
                </span>
                <span className={styles.modal__invoiceDetailValue}>
                  {selectedTime}
                </span>
              </div>

              {selectedService.id === "cleaning" && (
                <div className={styles.modal__invoiceDetailItem}>
                  <span className={styles.modal__invoiceDetailLabel}>
                    <Icon name="Home" size={14} />
                    Property Type
                  </span>
                  <span className={styles.modal__invoiceDetailValue}>
                    {propertyType === "flat"
                      ? "Flat / Apartment"
                      : "Duplex / House"}
                  </span>
                </div>
              )}
            </div>

            {/* Service-specific details */}
            {selectedService.id === "cleaning" && (
              <div className={styles.modal__invoiceRoomList}>
                <h4>Rooms to Clean</h4>
                <div className={styles.modal__invoiceRooms}>
                  {Object.entries(roomQuantities)
                    .filter(([_, quantity]) => quantity > 0)
                    .map(([room, quantity]) => (
                      <div key={room} className={styles.modal__invoiceRoom}>
                        <span>
                          {room
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </span>
                        <span>{quantity}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {selectedService.id === "laundry" && (
              <div className={styles.modal__invoiceRoomList}>
                <h4>Laundry Details</h4>
                <div className={styles.modal__invoiceDetailItem}>
                  <span className={styles.modal__invoiceDetailLabel}>
                    <Icon name="Package" size={14} />
                    Number of Bags
                  </span>
                  <span className={styles.modal__invoiceDetailValue}>
                    {laundryBags} bag{laundryBags > 1 ? "s" : ""} (approx.{" "}
                    {laundryBags * 30} items)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className={styles.modal__invoiceSection}>
            <h3 className={styles.modal__invoiceSectionTitle}>
              <Icon name="DollarSign" />
              Price Breakdown
            </h3>

            <div className={styles.modal__invoicePriceTable}>
              <div
                className={
                  styles.modal__invoicePriceRow +
                  " " +
                  styles.modal__invoicePriceHeader
                }
              >
                <span>Item</span>
                <span>Price</span>
              </div>

              <div className={styles.modal__invoicePriceRow}>
                <span>
                  Base Service
                  {selectedCleaningOption
                    ? ` (${selectedCleaningOption.label})`
                    : ""}
                  {selectedLaundryOption
                    ? ` (${selectedLaundryOption.label})`
                    : ""}
                </span>
                <span>
                  {selectedCleaningOption?.price ||
                    selectedLaundryOption?.price ||
                    selectedService.price}
                </span>
              </div>

              {selectedService.id === "cleaning" && (
                <div className={styles.modal__invoicePriceRow}>
                  <span>Room Charges</span>
                  <span>
                    $
                    {Object.entries(roomQuantities).reduce(
                      (total, [room, quantity]) => {
                        const roomPrices = {
                          bedrooms: 20,
                          livingRooms: 15,
                          bathrooms: 25,
                          kitchen: 30,
                          study: 15,
                          outdoor: 20,
                        };
                        return (
                          total +
                          roomPrices[room as keyof typeof roomPrices] * quantity
                        );
                      },
                      0
                    )}
                  </span>
                </div>
              )}

              {selectedService.id === "laundry" && (
                <div className={styles.modal__invoicePriceRow}>
                  <span>Laundry Items ({laundryBags * 30} items)</span>
                  <span>
                    ₦
                    {(
                      laundryBags *
                      30 *
                      parseInt(
                        selectedLaundryOption!.price.replace(/[^0-9]/g, "")
                      )
                    ).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.modal__invoiceTotal}>
              <span>Total</span>
              <span>₦{calculateTotalPrice().toLocaleString()}</span>
            </div>
          </div>

          {/* Inclusions */}
          <div className={styles.modal__invoiceSection}>
            <h3 className={styles.modal__invoiceSectionTitle}>
              <Icon name="Check" />
              Service Includes
            </h3>

            <div className={styles.modal__invoiceInclusions}>
              {(selectedCleaningOption?.inclusions || selectedLaundryOption
                ? selectedService.inclusions
                : selectedService.inclusions || []
              )
                .slice(0, 3)
                .map((inclusion, index) => (
                  <div key={index} className={styles.modal__invoiceInclusion}>
                    <Icon name="CheckCircle" size={16} />
                    <span>{inclusion}</span>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Render extra items modal for laundry service
  const renderExtraItemsModal = () => {
    if (!selectedLaundryOption || !showExtraItems) return null;

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
              Extra Items for {selectedLaundryOption.label}
            </h3>
            <button
              className={styles.modal__close}
              onClick={() => setShowExtraItems(false)}
            >
              <Icon name="X" />
            </button>
          </div>

          <div className={styles.modal__extraItemsContent}>
            <div className={styles.modal__extraItem}>
              <span className={styles.modal__extraItemName}>Items</span>
              <span className={styles.modal__extraItemPrice}>Cost</span>
            </div>

            {selectedLaundryOption.extraItems.map((item, index) => (
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

            {selectedLaundryOption.extraNotes && (
              <motion.div
                className={styles.modal__extraNotes}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className={styles.modal__extraNotesTitle}>
                  Additional Information
                </h4>
                {selectedLaundryOption.extraNotes.map((note, index) => (
                  <p key={index} className={styles.modal__extraNotesItem}>
                    {note}
                  </p>
                ))}
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

  // Render progress bar
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
                {isComplete && !isActive && <Icon name="Check" size={12} />}
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

  // Render the appropriate step content based on the current step
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

  // Main render
  return (
    <AnimatePresence>
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal__backdrop}
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className={styles.modal__container}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className={styles.modal__header}>
            <h2 className={styles.modal__title}>Craft Your Subscription</h2>
            <button className={styles.modal__close} onClick={closeModal}>
              <Icon name="X" />
            </button>
          </div>

          {renderProgressBar()}

          <div className={styles.modal__content}>
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </div>

          {(currentStep === BookingStep.DETAILS ||
            currentStep === BookingStep.REVIEW) && (
            <div className={styles.modal__footer}>
              <button
                className={`${styles.modal__button} ${styles.modal__buttonBack}`}
                onClick={handleBack}
              >
                <Icon name="ArrowLeft" />
                Back
              </button>

              <button
                className={`${styles.modal__button} ${styles.modal__buttonPrimary}`}
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                {getNextButtonText()}
                <Icon name="ArrowRight" />
              </button>
            </div>
          )}
        </motion.div>

        {renderExtraItemsModal()}
      </motion.div>
    </AnimatePresence>
  );
}
