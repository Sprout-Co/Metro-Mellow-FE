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

export interface CleaningServiceOption {
  id: string;
  name: string;
  count: number;
}

export interface CleaningServiceConfiguration {
  apartmentType: "flat" | "duplex";
  rooms: CleaningServiceOption[];
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
}) => {
  // State for cleaning configuration
  const [apartmentType, setApartmentType] = useState<"flat" | "duplex">("flat");
  const [rooms, setRooms] = useState<CleaningServiceOption[]>([
    { id: "bedroom", name: "Bedroom", count: 1 },
    { id: "livingRoom", name: "Living Room", count: 1 },
    { id: "kitchen", name: "Kitchen", count: 1 },
    { id: "bathroom", name: "Bathroom", count: 1 },
    { id: "balcony", name: "Balcony", count: 1 },
    { id: "lobby", name: "Lobby", count: 1 },
    { id: "outdoor", name: "Outdoor", count: 1 },
    { id: "studyRoom", name: "Study Room", count: 1 },
    { id: "other", name: "Other", count: 1 },
  ]);

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);

  // Handle apartment type change
  const handleApartmentTypeChange = (type: "flat" | "duplex") => {
    setApartmentType(type);
  };

  // Handle room counter changes
  const handleRoomCounterChange = (roomId: string, increment: boolean) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          const newCount = increment
            ? room.count + 1
            : Math.max(0, room.count - 1);
          return { ...room, count: newCount };
        }
        return room;
      })
    );
  };

  // Calculate total room count
  const getTotalRoomCount = () => {
    return rooms.reduce((total, room) => total + room.count, 0);
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    const configuration: CleaningServiceConfiguration = {
      apartmentType,
      rooms,
    };

    if (onOrderSubmit) {
      onOrderSubmit(configuration);
    }

    setIsCheckoutModalOpen(true);
    setIsSlidePanelOpen(true);
  };

  // Handle checkout completion
  const handleCheckoutComplete = (formData: CheckoutFormData) => {
    const completeOrder = {
      service: {
        title: serviceTitle,
        price: servicePrice,
        apartmentType,
        rooms,
      },
      checkout: formData,
    };

    console.log("Complete cleaning order:", completeOrder);

    // Close modals and show success
    setIsCheckoutModalOpen(false);
    onClose();

    alert(
      "Cleaning service booked successfully! We'll confirm your booking details shortly."
    );
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
      maxWidth="1200px"
      showCloseButton={true}
      className={styles.cleaningServiceModal}
    >
      <div className={styles.modal__container}>
        {/* Image Section */}
        <div className={styles.modal__imageSection}>
          <Image
            src={serviceImage}
            alt={serviceTitle}
            width={500}
            height={500}
            className={styles.modal__image}
          />
        </div>

        {/* Details Section */}
        <div className={styles.modal__detailsSection}>
          {/* Service Title and Description */}
          <h2 className={styles.modal__title}>{serviceTitle}</h2>
          <p className={styles.modal__description}>{serviceDescription}</p>

          {/* Price Section */}
          <div className={styles.modal__price}>
            NGN {servicePrice.toLocaleString()}
          </div>

          {/* Configuration Section */}
          <div className={styles.modal__configurationSection}>
            {/* Apartment Type Selection */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Your Apartment Type</h3>
              <div className={styles.apartmentTypeOptions}>
                <label
                  className={`${styles.apartmentTypeOption} ${
                    apartmentType === "flat" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="apartmentType"
                    value="flat"
                    checked={apartmentType === "flat"}
                    onChange={() => handleApartmentTypeChange("flat")}
                    className={styles.radioInput}
                  />
                  <span>Flat/Apartment</span>
                </label>
                <label
                  className={`${styles.apartmentTypeOption} ${
                    apartmentType === "duplex" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="apartmentType"
                    value="duplex"
                    checked={apartmentType === "duplex"}
                    onChange={() => handleApartmentTypeChange("duplex")}
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
                {rooms.map((room) => (
                  <div key={room.id} className={styles.roomCounter}>
                    <span className={styles.roomName}>{room.name}</span>
                    <div className={styles.counterControls}>
                      <button
                        className={styles.counterButton}
                        onClick={() => handleRoomCounterChange(room.id, false)}
                        aria-label={`Decrement ${room.name}`}
                      >
                        -
                      </button>
                      <span className={styles.counterValue}>{room.count}</span>
                      <button
                        className={styles.counterButton}
                        onClick={() => handleRoomCounterChange(room.id, true)}
                        aria-label={`Increment ${room.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.totalRooms}>
                Total Rooms: {getTotalRoomCount()}
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className={styles.modal__orderButtonContainer}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleOrderSubmit}
              className={styles.modal__orderButton}
            >
              ORDER CLEANING SERVICE
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCheckoutClose}
        onContinue={handleCheckoutComplete}
        serviceType="Cleaning"
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
        serviceType="Cleaning"
        includedFeatures={includedFeatures}
      />
    </Modal>
  );
};

export default CleaningServiceModal;
