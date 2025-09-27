"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CheckoutModal, {
  CheckoutFormData,
} from "@/components/ui/booking/modals/CheckoutModal/CheckoutModal";
import ServiceDetailsSlidePanel from "@/components/ui/booking/modals/ServiceDetailsSlidePanel/ServiceDetailsSlidePanel";
import styles from "./CleaningServiceModal.module.scss";
import {
  CleaningType,
  CreateBookingInput,
  HouseType,
  RoomQuantitiesInput,
  Service,
  ServiceCategory,
  ServiceId,
  ServiceOption,
} from "@/graphql/api";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { LocalStorageKeys } from "@/utils/localStorage";
import LoginModal from "@/components/ui/booking/modals/LoginModal/LoginModal";
import ServiceModalFooter from "../ServiceModalFooter/ServiceModalFooter";
// import LoginModal from "@/components/ui/LoginModal/LoginModal";

export interface CleaningServiceOption {
  id: string;
  name: string;
  count: number;
}

export interface CleaningServiceConfiguration {
  apartmentType: HouseType;
  roomQuantities: RoomQuantitiesInput;
}

export interface CleaningServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  includedFeatures?: string[];
  onOrderSubmit?: (configuration: CleaningServiceConfiguration) => void;
  serviceOption?: ServiceOption;
  service: Service;
}

const CleaningServiceModal: React.FC<CleaningServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/placeholder.jpg",
  serviceTitle = "Cleaning Service",
  serviceDescription = "Professional cleaning service",
  servicePrice = 0,
  includedFeatures = [],
  onOrderSubmit,
  serviceOption,
  service,
}) => {
  // State for cleaning configuration
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

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { handleCreateBooking, isCreatingBooking } = useBookingOperations();

  // Handle apartment type change
  const handleApartmentTypeChange = (type: HouseType) => {
    setApartmentType(type);
  };

  // Handle room counter changes
  const handleRoomCounterChange = (
    room: keyof RoomQuantitiesInput,
    increment: boolean
  ) => {
    // setRooms((prev) =>
    //   prev.map((room) => {
    //     if (room.id === roomId) {
    //       const newCount = increment
    //         ? room.count + 1
    //         : Math.max(0, room.count - 1);
    //       return { ...room, count: newCount };
    //     }
    //     return room;
    //   })
    // );
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, (prev[room] as number) + (increment ? 1 : -1)),
    }));
  };

  // Calculate total room count
  const getTotalRoomCount = () => {
    return Object.values(roomQuantities).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    setError(null); // Clear any previous errors when starting new order
    const configuration: CleaningServiceConfiguration = {
      apartmentType,
      roomQuantities,
    };

    console.log("configuration", configuration);

    // if (onOrderSubmit) {
    //   onOrderSubmit(configuration);
    // }

    setIsCheckoutModalOpen(true);
    setIsSlidePanelOpen(true);
  };

  const calculateTotalPrice = () => {
    if (!service) return 0;

    let totalPrice = service.price;

    {
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
    }
    return totalPrice;
  };

  // Handle checkout completion
  const handleCheckoutComplete = async (
    formData: CheckoutFormData,
    onContinuePayment: () => void
  ) => {
    try {
      setError(null); // Clear any previous errors
      console.log("starting");
      const completeOrder: CreateBookingInput = {
        serviceId: service._id,
        service_category: service.category,
        serviceOption: serviceOption?.service_id || ServiceId.StandardCleaning,
        date: formData.date,
        timeSlot: formData.timeSlot,
        address: formData.addressId || "",
        notes: `Frequency`,
        serviceDetails: {
          serviceOption:
            serviceOption?.service_id || ServiceId.StandardCleaning,
          cleaning: {
            cleaningType: serviceOption?.service_id as unknown as CleaningType,
            houseType: apartmentType,
            rooms: roomQuantities,
          },
        },
        totalPrice: calculateTotalPrice(),
      };

      if (isAuthenticated) {
        await handleCreateBooking(completeOrder);
        onContinuePayment();
        // setShowOrderSuccessModal(true);
      } else {
        localStorage.setItem(
          LocalStorageKeys.BOOKING_DATA_TO_COMPLETE,
          JSON.stringify(completeOrder)
        );
        setShowLoginModal(true);
      }
      console.log("Complete cleaning order:", completeOrder);
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
      className={styles.cleaningServiceModal}
    >
      <div className={styles.modal__container}>
        {/* Details Section */}
        <div className={styles.modal__detailsSection}>
          {/* Service Title and Description */}
          <h2 className={styles.modal__title}>{serviceOption?.label}</h2>
          <p className={styles.modal__description}>
            {serviceOption?.description}
          </p>

          {/* Price Section */}
          <div className={styles.modal__price}>
            NGN {calculateTotalPrice().toLocaleString()}
          </div>

          {/* Configuration Section */}
          <div className={styles.modal__configurationSection}>
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
        service_category="Cleaning"
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
        apartmentType={apartmentType}
        roomCount={getTotalRoomCount()}
        service_category="Cleaning"
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

export default CleaningServiceModal;
