import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/slices/ui";
import Icon, { IconName } from "../common/Icon";
import { useState } from "react";
import styles from "./BookServiceModal.module.scss";

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
    icon: "droplet",
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
    icon: "package",
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
    label: "Pest Control",
    icon: "shield",
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

export default function BookServiceModal() {
  const { isModalOpen, modalType, closeModal } = useUIStore();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCleaningOption, setSelectedCleaningOption] =
    useState<CleaningOption | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [propertyType, setPropertyType] = useState<"flat" | "duplex">("flat");
  const [serviceFrequency, setServiceFrequency] =
    useState<ServiceFrequency>("one-off");
  const [roomQuantities, setRoomQuantities] = useState<RoomQuantity>({
    bedrooms: 0,
    livingRooms: 0,
    bathrooms: 0,
    kitchen: 0,
    study: 0,
    outdoor: 0,
  });
  const [selectedLaundryOption, setSelectedLaundryOption] =
    useState<LaundryOption | null>(null);
  const [showExtraItems, setShowExtraItems] = useState(false);
  const [laundryBags, setLaundryBags] = useState<number>(1);

  if (!isModalOpen || modalType !== "book-service") return null;

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setSelectedCleaningOption(null);
  };

  const handleCleaningOptionSelect = (option: CleaningOption) => {
    setSelectedCleaningOption(option);
  };

  const handleQuantityChange = (
    room: keyof RoomQuantity,
    increment: boolean
  ) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, prev[room] + (increment ? 1 : -1)),
    }));
  };

  const handleLaundryOptionSelect = (option: LaundryOption) => {
    setSelectedLaundryOption(option);
  };

  const handleLaundryBagChange = (increment: boolean) => {
    setLaundryBags((prev) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  const handleContinue = () => {
    if (selectedService && selectedDate && selectedTime) {
      // Handle booking submission
      console.log("Booking details:", {
        service: selectedService.id,
        cleaningOption: selectedCleaningOption?.id,
        date: selectedDate,
        time: selectedTime,
        propertyType,
        roomQuantities,
        frequency: serviceFrequency,
      });
      closeModal();
    }
  };

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
      if (serviceFrequency !== "one-off") {
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

  const renderServiceContent = () => {
    if (!selectedService) {
      return (
        <div className={styles.modal__services}>
          {services.map((service) => (
            <motion.button
              key={service.id}
              className={styles.modal__service}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleServiceSelect(service)}
            >
              <div className={styles.modal__serviceIcon}>
                <Icon name={service.icon} />
              </div>
              <div className={styles.modal__serviceInfo}>
                <h3 className={styles.modal__serviceTitle}>{service.label}</h3>
                <p className={styles.modal__serviceDescription}>
                  {service.description}
                </p>
                <div className={styles.modal__serviceMeta}>
                  <span className={styles.modal__servicePrice}>
                    {service.price}
                  </span>
                  <span className={styles.modal__serviceDuration}>
                    <Icon name="clock" />
                    {service.duration}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      );
    }

    if (selectedService.id === "cleaning" && !selectedCleaningOption) {
      return (
        <div className={styles.modal__cleaningOptions}>
          <div className={styles.modal__selectedService}>
            <div className={styles.modal__serviceIcon}>
              <Icon name={selectedService.icon} />
            </div>
            <div className={styles.modal__serviceInfo}>
              <h3 className={styles.modal__serviceTitle}>
                {selectedService.label}
              </h3>
              <p className={styles.modal__serviceDescription}>
                {selectedService.description}
              </p>
            </div>
            <button
              className={styles.modal__changeService}
              onClick={() => setSelectedService(null)}
            >
              Change
            </button>
          </div>

          <h3 className={styles.modal__sectionTitle}>Select Cleaning Type</h3>
          <div className={styles.modal__optionsGrid}>
            {cleaningOptions.map((option) => (
              <motion.button
                key={option.id}
                className={styles.modal__optionCard}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCleaningOptionSelect(option)}
              >
                <h4 className={styles.modal__optionTitle}>{option.label}</h4>
                <p className={styles.modal__optionDescription}>
                  {option.description}
                </p>
                <span className={styles.modal__optionPrice}>
                  {option.price}
                </span>
                <ul className={styles.modal__optionInclusions}>
                  {option.inclusions.map((inclusion, index) => (
                    <li key={index} className={styles.modal__optionInclusion}>
                      <Icon name="check-circle" />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>
        </div>
      );
    }

    if (selectedService.id === "laundry" && !selectedLaundryOption) {
      return (
        <div className={styles.modal__laundryOptions}>
          <div className={styles.modal__selectedService}>
            <div className={styles.modal__serviceIcon}>
              <Icon name={selectedService.icon} />
            </div>
            <div className={styles.modal__serviceInfo}>
              <h3 className={styles.modal__serviceTitle}>
                {selectedService.label}
              </h3>
              <p className={styles.modal__serviceDescription}>
                {selectedService.description}
              </p>
            </div>
            <button
              className={styles.modal__changeService}
              onClick={() => setSelectedService(null)}
            >
              Change
            </button>
          </div>

          <h3 className={styles.modal__sectionTitle}>Select Laundry Service</h3>
          <div className={styles.modal__optionsGrid}>
            {laundryOptions.map((option) => (
              <motion.button
                key={option.id}
                className={styles.modal__optionCard}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLaundryOptionSelect(option)}
              >
                <h4 className={styles.modal__optionTitle}>{option.label}</h4>
                <p className={styles.modal__optionDescription}>
                  {option.description}
                </p>
                <span className={styles.modal__optionPrice}>
                  {option.price}
                </span>
                <button
                  className={styles.modal__extraItemsButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLaundryOption(option);
                    setShowExtraItems(true);
                  }}
                >
                  Items that will cost you extra
                </button>
              </motion.button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.modal__bookingDetails}>
        <div className={styles.modal__selectedService}>
          <div className={styles.modal__serviceIcon}>
            <Icon name={selectedService.icon} />
          </div>
          <div className={styles.modal__serviceInfo}>
            <h3 className={styles.modal__serviceTitle}>
              {selectedService.label}
            </h3>
            {selectedCleaningOption && (
              <h4 className={styles.modal__optionTitle}>
                {selectedCleaningOption.label}
              </h4>
            )}
            {selectedLaundryOption && (
              <h4 className={styles.modal__optionTitle}>
                {selectedLaundryOption.label}
              </h4>
            )}
            <p className={styles.modal__serviceDescription}>
              {selectedService.description}
            </p>
            <span className={styles.modal__servicePrice}>
              {selectedCleaningOption?.price ||
                selectedLaundryOption?.price ||
                selectedService.price}
            </span>
          </div>
          <button
            className={styles.modal__changeService}
            onClick={() => {
              if (selectedService.id === "cleaning") {
                setSelectedCleaningOption(null);
              } else if (selectedService.id === "laundry") {
                setSelectedLaundryOption(null);
              } else {
                setSelectedService(null);
              }
            }}
          >
            Change
          </button>
        </div>

        <div className={styles.modal__schedule}>
          <h3 className={styles.modal__sectionTitle}>Schedule</h3>
          <div className={styles.modal__scheduleInputs}>
            <div className={styles.modal__inputGroup}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className={styles.modal__inputGroup}>
              <label htmlFor="time">Time</label>
              <select
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
              </select>
            </div>
          </div>

          {selectedService.id === "laundry" && (
            <div className={styles.modal__laundryBags}>
              <label>Number of Laundry Bags</label>
              <div className={styles.modal__laundryBagsControls}>
                <button
                  className={styles.modal__quantityButton}
                  onClick={() => handleLaundryBagChange(false)}
                >
                  <Icon name="minus" />
                </button>
                <span className={styles.modal__quantityValue}>
                  {laundryBags}
                </span>
                <button
                  className={styles.modal__quantityButton}
                  onClick={() => handleLaundryBagChange(true)}
                >
                  <Icon name="plus" />
                </button>
              </div>
              <span className={styles.modal__laundryBagsNote}>
                Approximately 30 items per bag
              </span>
            </div>
          )}

          <div className={styles.modal__frequency}>
            <label>Service Frequency</label>
            <div className={styles.modal__frequencyButtons}>
              <button
                className={`${styles.modal__frequencyButton} ${
                  serviceFrequency === "one-off"
                    ? styles.modal__frequencyButtonActive
                    : ""
                }`}
                onClick={() => setServiceFrequency("one-off")}
              >
                One-off
              </button>
              <button
                className={`${styles.modal__frequencyButton} ${
                  serviceFrequency === "weekly"
                    ? styles.modal__frequencyButtonActive
                    : ""
                }`}
                onClick={() => setServiceFrequency("weekly")}
              >
                Weekly
              </button>
              <button
                className={`${styles.modal__frequencyButton} ${
                  serviceFrequency === "bi-weekly"
                    ? styles.modal__frequencyButtonActive
                    : ""
                }`}
                onClick={() => setServiceFrequency("bi-weekly")}
              >
                Bi-weekly
              </button>
              <button
                className={`${styles.modal__frequencyButton} ${
                  serviceFrequency === "monthly"
                    ? styles.modal__frequencyButtonActive
                    : ""
                }`}
                onClick={() => setServiceFrequency("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {selectedService.id === "cleaning" && (
          <div className={styles.modal__propertyDetails}>
            <h3 className={styles.modal__sectionTitle}>Property Details</h3>
            <div className={styles.modal__propertyType}>
              <label>Property Type</label>
              <div className={styles.modal__propertyTypeButtons}>
                <button
                  className={`${styles.modal__propertyTypeButton} ${
                    propertyType === "flat"
                      ? styles.modal__propertyTypeButtonActive
                      : ""
                  }`}
                  onClick={() => setPropertyType("flat")}
                >
                  Flat
                </button>
                <button
                  className={`${styles.modal__propertyTypeButton} ${
                    propertyType === "duplex"
                      ? styles.modal__propertyTypeButtonActive
                      : ""
                  }`}
                  onClick={() => setPropertyType("duplex")}
                >
                  Duplex
                </button>
              </div>
            </div>

            <div className={styles.modal__roomQuantities}>
              {Object.entries(roomQuantities).map(([room, quantity]) => (
                <div key={room} className={styles.modal__roomQuantity}>
                  <label>
                    {room
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <div className={styles.modal__quantityControls}>
                    <button
                      className={styles.modal__quantityButton}
                      onClick={() =>
                        handleQuantityChange(room as keyof RoomQuantity, false)
                      }
                    >
                      <Icon name="minus" />
                    </button>
                    <span className={styles.modal__quantityValue}>
                      {quantity}
                    </span>
                    <button
                      className={styles.modal__quantityButton}
                      onClick={() =>
                        handleQuantityChange(room as keyof RoomQuantity, true)
                      }
                    >
                      <Icon name="plus" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.modal__inclusions}>
          <h3 className={styles.modal__sectionTitle}>Service Inclusions</h3>
          <ul className={styles.modal__inclusionsList}>
            {(
              selectedCleaningOption?.inclusions || selectedService.inclusions
            ).map((inclusion, index) => (
              <li key={index} className={styles.modal__inclusionItem}>
                <Icon name="check-circle" />
                {inclusion}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.modal__priceSummary}>
          <h3 className={styles.modal__sectionTitle}>Price Summary</h3>
          <div className={styles.modal__priceDetails}>
            <div className={styles.modal__priceRow}>
              <span>Base Price</span>
              <span>
                {selectedCleaningOption?.price ||
                  selectedLaundryOption?.price ||
                  selectedService.price}
              </span>
            </div>
            {selectedService.id === "laundry" && (
              <>
                <div className={styles.modal__priceRow}>
                  <span>Number of Bags</span>
                  <span>{laundryBags} bags</span>
                </div>
                <div className={styles.modal__priceRow}>
                  <span>Total Items</span>
                  <span>{laundryBags * 30} items</span>
                </div>
                {serviceFrequency !== "one-off" && (
                  <div className={styles.modal__priceRow}>
                    <span>Recurring Discount</span>
                    <span className={styles.modal__priceDiscount}>-10%</span>
                  </div>
                )}
              </>
            )}
            {selectedService.id === "cleaning" && (
              <>
                <div className={styles.modal__priceRow}>
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
                {serviceFrequency !== "one-off" && (
                  <div className={styles.modal__priceRow}>
                    <span>Recurring Discount</span>
                    <span className={styles.modal__priceDiscount}>-10%</span>
                  </div>
                )}
              </>
            )}
            <div className={styles.modal__priceDivider} />
            <div className={styles.modal__priceRow}>
              <span className={styles.modal__priceTotal}>Total Price</span>
              <span className={styles.modal__priceTotal}>
                ₦{calculateTotalPrice().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.modal__footer}>
          <button
            className={styles.modal__continueBtn}
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
          >
            Continue to Payment
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>
    );
  };

  const renderExtraItemsModal = () => {
    if (!selectedLaundryOption) return null;

    return (
      <motion.div
        className={styles.modal__extraItemsModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.modal__extraItemsContent}>
          <div className={styles.modal__extraItemsHeader}>
            <h3>Extra Items for {selectedLaundryOption.label}</h3>
            <button
              className={styles.modal__close}
              onClick={() => setShowExtraItems(false)}
            >
              <Icon name="x" />
            </button>
          </div>
          <div className={styles.modal__extraItemsBody}>
            <div className={styles.modal__extraItemsTable}>
              <div className={styles.modal__extraItemsRow}>
                <span>Items</span>
                <span>Cost</span>
              </div>
              {selectedLaundryOption.extraItems.map((item, index) => (
                <div key={index} className={styles.modal__extraItemsRow}>
                  <span>
                    {item.name} - {item.items} items
                  </span>
                  <span>₦{item.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
            {selectedLaundryOption.extraNotes && (
              <div className={styles.modal__extraNotes}>
                {selectedLaundryOption.extraNotes.map((note, index) => (
                  <p key={index}>{note}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

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
          className={styles.modal__content}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.modal__header}>
            <h2 className={styles.modal__title}>Book a Service</h2>
            <button className={styles.modal__close} onClick={closeModal}>
              <Icon name="x" />
            </button>
          </div>

          <div className={styles.modal__body}>{renderServiceContent()}</div>
        </motion.div>
      </motion.div>
      {showExtraItems && renderExtraItemsModal()}
    </AnimatePresence>
  );
}
