"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CheckoutModal, {
  CheckoutFormData,
} from "@/components/ui/booking/modals/CheckoutModal/CheckoutModal";
import ServiceDetailsSlidePanel from "@/components/ui/booking/modals/ServiceDetailsSlidePanel/ServiceDetailsSlidePanel";
import styles from "./ServiceModal.module.scss";
import {
  CleaningType,
  CreateBookingInput,
  HouseType,
  RoomQuantitiesInput,
  Service,
  ServiceCategory,
  ServiceId,
  ServiceOption,
  LaundryType,
  LaundryItemsInput,
  Severity,
  TreatmentType,
} from "@/graphql/api";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { LocalStorageKeys } from "@/utils/localStorage";
import LoginModal from "@/components/ui/booking/modals/LoginModal/LoginModal";
import ServiceModalFooter from "../ServiceModalFooter/ServiceModalFooter";

export interface TreatmentArea {
  id: string;
  name: string;
  selected: boolean;
}

export interface ServiceConfiguration {
  apartmentType?: HouseType;
  roomQuantities?: RoomQuantitiesInput;
  bags?: number;
  items?: LaundryItemsInput;
  severity?: Severity;
  treatmentType?: TreatmentType;
  areas?: TreatmentArea[];
}

export interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  includedFeatures?: string[];
  onOrderSubmit?: (configuration: ServiceConfiguration) => void;
  serviceOption?: ServiceOption;
  service: Service;
  serviceType: "cleaning" | "laundry" | "pest-control";
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/placeholder.jpg",
  serviceTitle = "Service",
  serviceDescription = "Professional service",
  servicePrice = 0,
  includedFeatures = [],
  onOrderSubmit,
  serviceOption,
  service,
  serviceType,
}) => {
  // State for service configuration
  const [apartmentType, setApartmentType] = useState<HouseType>(HouseType.Flat);
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
  const [bags, setBags] = useState(1);
  
  // Pest control state
  const [severity, setSeverity] = useState<Severity>(Severity.Medium);
  const [treatmentType, setTreatmentType] = useState<TreatmentType>(
    TreatmentType.PestControlResidential
  );
  const [areas, setAreas] = useState<TreatmentArea[]>([
    { id: "kitchen", name: "Kitchen", selected: true },
    { id: "bathroom", name: "Bathroom", selected: true },
    { id: "bedroom", name: "Bedroom", selected: false },
    { id: "livingRoom", name: "Living Room", selected: false },
    { id: "basement", name: "Basement", selected: false },
    { id: "attic", name: "Attic", selected: false },
    { id: "garden", name: "Garden/Outdoor", selected: false },
    { id: "garage", name: "Garage", selected: false },
  ]);

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { handleCreateBooking, isCreatingBooking } = useBookingOperations();

  // Handle apartment type change (for cleaning)
  const handleApartmentTypeChange = (type: HouseType) => {
    setApartmentType(type);
  };

  // Handle room counter changes (for cleaning)
  const handleRoomCounterChange = (
    room: keyof RoomQuantitiesInput,
    increment: boolean
  ) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, (prev[room] as number) + (increment ? 1 : -1)),
    }));
  };

  // Handle bag count change (for laundry)
  const handleBagCountChange = (increment: boolean) => {
    const newCount = increment ? bags + 1 : Math.max(1, bags - 1);
    setBags(newCount);
  };

  // Handle severity change (for pest control)
  const handleSeverityChange = (level: Severity) => {
    setSeverity(level);
  };

  // Handle area selection (for pest control)
  const handleAreaToggle = (areaId: string) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId ? { ...area, selected: !area.selected } : area
      )
    );
  };

  // Get selected areas count (for pest control)
  const getSelectedAreasCount = () => {
    return areas.filter((area) => area.selected).length;
  };

  // Calculate total room count (for cleaning)
  const getTotalRoomCount = () => {
    return Object.values(roomQuantities).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    setError(null); // Clear any previous errors when starting new order
    const configuration: ServiceConfiguration = {
      apartmentType,
      roomQuantities,
      bags,
      severity,
      treatmentType,
      areas,
    };

    console.log("configuration", configuration);

    setIsCheckoutModalOpen(true);
    setIsSlidePanelOpen(true);
  };

  const calculateTotalPrice = () => {
    if (!service) return 0;

    let totalPrice = service.price;

    if (serviceType === "cleaning") {
      // Calculate total price based on room prices and number of days
      const selectedDays = 1; // Default to 1 day for one-off bookings
      const roomPrices = service.roomPrices || {};

      // Calculate total price for each room type
      const roomTotal = Object.entries(roomQuantities).reduce(
        (total, [room, quantity]) => {
          const roomPrice = roomPrices[room as keyof typeof roomPrices] || 0;
          return total + roomPrice * (quantity as number);
        },
        0
      );

      let cleaningTypeMultiplier = 1;

      switch (serviceOption?.service_id) {
        case ServiceId.StandardCleaning:
          cleaningTypeMultiplier = 1;
          break;
        case ServiceId.DeepCleaning:
          cleaningTypeMultiplier = 2.5;
          break;
        case ServiceId.PostConstructionCleaning:
          cleaningTypeMultiplier = 4;
          break;
        case ServiceId.MoveInMoveOutCleaning:
          cleaningTypeMultiplier = 2.5;
          break;
        default:
          break;
      }

      // Multiply by number of days selected
      totalPrice = roomTotal * selectedDays * cleaningTypeMultiplier;
      if (apartmentType === HouseType.Duplex) {
        totalPrice *= 1.5;
      }
    } else if (serviceType === "laundry") {
      // Calculate laundry pricing
      totalPrice = serviceOption?.price || service.price;
      const totalItems = bags * totalPrice;

      // Base price multiplier based on laundry type
      let typeMultiplier = 1;
      switch (serviceOption?.service_id) {
        case ServiceId.StandardLaundry:
          typeMultiplier = 1;
          break;
        case ServiceId.PremiumLaundry:
          typeMultiplier = 1.5;
          break;
        case ServiceId.DryCleaning:
          typeMultiplier = 2;
          break;
      }

      // Price per bag calculation
      totalPrice = totalItems * typeMultiplier;
    } else if (serviceType === "pest-control") {
      // Calculate pest control pricing
      const selectedAreasCount = getSelectedAreasCount();

      // Base price multiplier based on treatment type
      let typeMultiplier = 1;
      switch (treatmentType) {
        case TreatmentType.PestControlResidential:
          typeMultiplier = 1;
          break;
        case TreatmentType.PestControlCommercial:
          typeMultiplier = 2;
          break;
      }

      // Severity multiplier
      let severityMultiplier = 1;
      switch (severity) {
        case Severity.Low:
          severityMultiplier = 1;
          break;
        case Severity.Medium:
          severityMultiplier = 1.5;
          break;
        case Severity.High:
          severityMultiplier = 2;
          break;
      }

      // Price calculation: base price * areas * type * severity
      totalPrice =
        service.price * selectedAreasCount * typeMultiplier * severityMultiplier;
    }

    return totalPrice;
  };

  // Handle checkout completion
  const handleCheckoutComplete = async (
    formData: CheckoutFormData,
    onContinuePayment: (bookingId: string) => void
  ) => {
    try {
      setError(null); // Clear any previous errors
      console.log("starting");
      if (!serviceOption?.service_id) {
        throw new Error("Service option is required");
      }

      const completeOrder: CreateBookingInput = {
        serviceId: service._id,
        service_category: service.category,
        serviceOption: serviceOption.service_id,
        date: formData.date,
        timeSlot: formData.timeSlot,
        address: formData.addressId || "",
        notes: serviceType === "cleaning" 
          ? `Frequency` 
          : serviceType === "laundry" 
          ? `Laundry Type: ${LaundryType.StandardLaundry}, Bags: ${bags}`
          : `Treatment Type: ${treatmentType}, Severity: ${severity}, Areas: ${areas
              .filter((a) => a.selected)
              .map((a) => a.name)
              .join(", ")}`,
        serviceDetails: {
          serviceOption: serviceOption.service_id,
          ...(serviceType === "cleaning" ? {
            cleaning: {
              cleaningType: serviceOption?.service_id as unknown as CleaningType,
              houseType: apartmentType,
              rooms: roomQuantities,
            },
          } : serviceType === "laundry" ? {
            laundry: {
              laundryType: serviceOption?.service_id as unknown as LaundryType,
              bags,
            },
          } : {
            pestControl: {
              treatmentType,
              severity,
              areas: areas.filter((area) => area.selected).map((area) => area.id),
            },
          }),
        },
        totalPrice: calculateTotalPrice(),
      };

      if (isAuthenticated) {
        const bookingResponse = await handleCreateBooking(completeOrder);
        const booking = bookingResponse;
        onContinuePayment(bookingResponse || "");
        // setShowOrderSuccessModal(true);
      } else {
        localStorage.setItem(
          LocalStorageKeys.BOOKING_DATA_TO_COMPLETE,
          JSON.stringify(completeOrder)
        );
        setShowLoginModal(true);
      }
      console.log(`Complete ${serviceType} order:`, completeOrder);
    } catch (error) {
      console.error("Error creating booking:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating your booking. Please try again.";
      setError(errorMessage);
    }
  };

  // Handle checkout modal close
  const handleCheckoutClose = () => {
    setIsCheckoutModalOpen(false);
    setIsSlidePanelOpen(false);
  };

  // Handle slide panel close
  const handleSlidePanelClose = () => {
    setIsSlidePanelOpen(false);
  };

  // Handle slide panel open
  const handleSlidePanelOpen = () => {
    setIsSlidePanelOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="800px"
      showCloseButton={true}
      className={styles.serviceModal}
      title={serviceOption?.label}
    >
      <div className={styles.modal__container}>
        {/* Details Section */}
        <div className={styles.modal__detailsSection}>
          {/* Service Description */}
          <p className={styles.modal__description}>
            {serviceOption?.description}
          </p>

          {/* Price Section */}
            <div className={styles.modal__price}>
            NGN {calculateTotalPrice().toLocaleString()}
            </div>

          {/* Configuration Section */}
            <div className={styles.modal__configurationSection}>
            {serviceType === "cleaning" && (
              <>
                {/* Apartment Type Selection */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Your Apartment Type</h3>
                  <div className={styles.apartmentTypeOptions}>
                    <label
                      className={`${styles.apartmentTypeOption} ${
                        apartmentType === HouseType.Flat ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="apartmentType"
                        value={HouseType.Flat}
                        checked={apartmentType === HouseType.Flat}
                        onChange={() => handleApartmentTypeChange(HouseType.Flat)}
                        className={styles.radioInput}
                      />
                      <span>Flat/Apartment</span>
                    </label>
                      <label
                      className={`${styles.apartmentTypeOption} ${
                        apartmentType === HouseType.Duplex ? styles.selected : ""
                        }`}
                      >
                        <input
                          type="radio"
                        name="apartmentType"
                        value={HouseType.Duplex}
                        checked={apartmentType === HouseType.Duplex}
                        onChange={() => handleApartmentTypeChange(HouseType.Duplex)}
                        className={styles.radioInput}
                      />
                      <span>Duplex/House</span>
                      </label>
                  </div>
                </div>

                {/* Room Selection */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Select Rooms to Clean</h3>
                  <div className={styles.roomsGrid}>
                    {Object.entries(roomQuantities).map(([room, quantity]) => (
                      <div key={room} className={styles.roomCounter}>
                        <span className={styles.roomName}>
                          {room
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          </span>
                        <div className={styles.counterControls}>
                            <button
                            className={styles.counterButton}
                              onClick={() =>
                              handleRoomCounterChange(
                                room as keyof RoomQuantitiesInput,
                                false
                              )
                              }
                            aria-label={`Decrement ${room}`}
                            >
                            -
                            </button>
                          <span className={styles.counterValue}>{quantity}</span>
                            <button
                            className={styles.counterButton}
                              onClick={() =>
                              handleRoomCounterChange(
                                room as keyof RoomQuantitiesInput,
                                true
                              )
                              }
                            aria-label={`Increment ${room}`}
                            >
                            +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </>
            )}

            {serviceType === "laundry" && (
              <>
                {/* Bag Count */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Number of Bags</h3>
                  <div className={styles.bagCounter}>
                    <span className={styles.bagLabel}>Laundry Bags</span>
                    <div className={styles.counterControls}>
                      <button
                        className={styles.counterButton}
                        onClick={() => handleBagCountChange(false)}
                        aria-label="Decrement bags"
                      >
                        -
                      </button>
                      <span className={styles.counterValue}>{bags}</span>
                      <button
                        className={styles.counterButton}
                        onClick={() => handleBagCountChange(true)}
                        aria-label="Increment bags"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item Selection */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Extra Items (TBD)</h3>
                  <div className={styles.itemsGrid}>
                    {[
                      { name: "Duvet", id: "duvet" },
                      { name: "Bedsheet", id: "bedsheet" },
                      { name: "Towel", id: "towel" },
                      { name: "Other", id: "other" },
                    ].map((item) => (
                      <div key={item.id} className={styles.itemCounter}>
                        <span className={styles.itemName}>{item.name}</span>
                        <div className={styles.counterControls}>
                          <button
                            className={styles.counterButton}
                            aria-label={`Decrement ${item.name}`}
                          >
                            -
                          </button>
                          <span className={styles.counterValue}>0</span>
                          <button
                            className={styles.counterButton}
                            aria-label={`Increment ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
            </div>
              </>
            )}

            {serviceType === "pest-control" && (
              <>
                {/* Severity Level */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Infestation Severity</h3>
                  <div className={styles.severityOptions}>
                    <label
                      className={`${styles.severityOption} ${
                        severity === Severity.Low ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="severity"
                        value={Severity.Low}
                        checked={severity === Severity.Low}
                        onChange={() => handleSeverityChange(Severity.Low)}
                        className={styles.radioInput}
                      />
                      <span>Low - Minor infestation</span>
                    </label>
                    <label
                      className={`${styles.severityOption} ${
                        severity === Severity.Medium ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="severity"
                        value={Severity.Medium}
                        checked={severity === Severity.Medium}
                        onChange={() => handleSeverityChange(Severity.Medium)}
                        className={styles.radioInput}
                      />
                      <span>Medium - Moderate infestation</span>
                    </label>
                    <label
                      className={`${styles.severityOption} ${
                        severity === Severity.High ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="severity"
                        value={Severity.High}
                        checked={severity === Severity.High}
                        onChange={() => handleSeverityChange(Severity.High)}
                        className={styles.radioInput}
                      />
                      <span>High - Severe infestation</span>
                    </label>
                  </div>
                </div>

                {/* Treatment Type */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Treatment Type</h3>
                  <div className={styles.treatmentTypeOptions}>
                    <label
                      className={`${styles.treatmentTypeOption} ${
                        treatmentType === TreatmentType.PestControlResidential
                          ? styles.selected
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="treatmentType"
                        value={TreatmentType.PestControlResidential}
                        checked={
                          treatmentType === TreatmentType.PestControlResidential
                        }
                        onChange={() =>
                          setTreatmentType(TreatmentType.PestControlResidential)
                        }
                        className={styles.radioInput}
                      />
                      <span>Residential - Home treatment</span>
                    </label>
                    <label
                      className={`${styles.treatmentTypeOption} ${
                        treatmentType === TreatmentType.PestControlCommercial
                          ? styles.selected
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="treatmentType"
                        value={TreatmentType.PestControlCommercial}
                        checked={
                          treatmentType === TreatmentType.PestControlCommercial
                        }
                        onChange={() =>
                          setTreatmentType(TreatmentType.PestControlCommercial)
                        }
                        className={styles.radioInput}
                      />
                      <span>Commercial - Business treatment</span>
                    </label>
                  </div>
                </div>

                {/* Treatment Areas */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Treatment Areas</h3>
                  <div className={styles.areasGrid}>
                    {areas.map((area) => (
                      <div
                        key={area.id}
                        className={`${styles.areaOption} ${
                          area.selected ? styles.selected : ""
                        }`}
                        onClick={() => handleAreaToggle(area.id)}
                      >
                        <input
                          type="checkbox"
                          checked={area.selected}
                          onChange={() => handleAreaToggle(area.id)}
                          className={styles.checkboxInput}
                        />
                        <span>{area.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.selectedAreasCount}>
                    {getSelectedAreasCount()} area(s) selected
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Order Button */}
          <ServiceModalFooter
            price={calculateTotalPrice()}
            handleOrderSubmit={handleOrderSubmit}
          />
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCheckoutClose}
        onCheckout={handleCheckoutComplete}
        service_category={serviceType === "cleaning" ? "Cleaning" : serviceType === "laundry" ? "Laundry" : "Pest Control"}
        submitting={isCreatingBooking}
        error={error}
        onClearError={() => setError(null)}
      />

      {/* Service Details Slide Panel */}
      <ServiceDetailsSlidePanel
        isOpen={isSlidePanelOpen}
        onClose={handleSlidePanelClose}
        onOpen={handleSlidePanelOpen}
        serviceTitle={serviceTitle}
        serviceDescription={serviceDescription}
        servicePrice={servicePrice}
        serviceImage={serviceImage}
        apartmentType={serviceType === "cleaning" ? apartmentType : undefined}
        roomCount={serviceType === "cleaning" ? getTotalRoomCount() : serviceType === "laundry" ? bags : getSelectedAreasCount()}
        service_category={serviceType === "cleaning" ? "Cleaning" : serviceType === "laundry" ? "Laundry" : "Pest Control"}
        includedFeatures={includedFeatures}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showOrderSuccessModal}
        onClose={() => {
          setShowOrderSuccessModal(false);
          onClose();
        }}
      />

      {!isAuthenticated && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
          }}
        />
      )}
    </Modal>
  );
};

export default ServiceModal;