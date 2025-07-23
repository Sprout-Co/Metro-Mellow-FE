"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import styles from "./CleaningServiceModal.module.scss";

interface RoomCounter {
  count: number;
  name: string;
}

interface CleaningServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
}

const CleaningServiceModal: React.FC<CleaningServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/cleaning/deep-cleaning.jpg",
  serviceTitle = "Deep Cleaning",
  serviceDescription = "Grilled plantain, Full Grilled mackerel, Sprinkled with utazi, Ugba (optional) and a portion of heavens pepper sauce",
  servicePrice = 4950,
}) => {
  // State for apartment type
  const [apartmentType, setApartmentType] = useState<"flat" | "duplex">("flat");

  // State for room counters
  const [roomCounters, setRoomCounters] = useState<RoomCounter[]>([
    { name: "Bedroom", count: 1 },
    { name: "Living Room", count: 1 },
    { name: "Kitchen", count: 1 },
    { name: "Balcony", count: 1 },
    { name: "Lobby", count: 1 },
    { name: "Outdoor", count: 1 },
    { name: "Study Room", count: 1 },
    { name: "Bathroom", count: 1 },
    { name: "Other", count: 1 },
  ]);

  // Handle apartment type selection
  const handleApartmentTypeChange = (type: "flat" | "duplex") => {
    setApartmentType(type);
  };

  // Handle increment/decrement for room counters
  const handleCounterChange = (index: number, increment: boolean) => {
    const updatedCounters = [...roomCounters];
    if (increment) {
      updatedCounters[index].count += 1;
    } else {
      if (updatedCounters[index].count > 0) {
        updatedCounters[index].count -= 1;
      }
    }
    setRoomCounters(updatedCounters);
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    // Implement order submission logic
    console.log("Order submitted", { apartmentType, roomCounters });
    onClose();
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
        <div className={styles.modal__imageSection}>
          <Image 
            src={serviceImage}
            alt={serviceTitle}
            width={500}
            height={500}
            className={styles.modal__image}
          />
        </div>

        <div className={styles.modal__detailsSection}>
          <h2 className={styles.modal__title}>{serviceTitle}</h2>
          <p className={styles.modal__description}>{serviceDescription}</p>

          <div className={styles.modal__price}>
            NGN {servicePrice.toLocaleString()}
          </div>

          <div className={styles.modal__apartmentTypeSection}>
            <h3 className={styles.modal__sectionTitle}>Your Apartment type</h3>
            <div className={styles.modal__apartmentTypes}>
              <label className={`${styles.modal__apartmentType} ${apartmentType === "flat" ? styles.modal__apartmentType_selected : ""}`}>
                <input 
                  type="radio" 
                  name="apartmentType" 
                  checked={apartmentType === "flat"}
                  onChange={() => handleApartmentTypeChange("flat")}
                  className={styles.modal__radioInput}
                />
                <span>Flat/Apartment</span>
              </label>
              
              <label className={`${styles.modal__apartmentType} ${apartmentType === "duplex" ? styles.modal__apartmentType_selected : ""}`}>
                <input 
                  type="radio" 
                  name="apartmentType" 
                  checked={apartmentType === "duplex"}
                  onChange={() => handleApartmentTypeChange("duplex")} 
                  className={styles.modal__radioInput}
                />
                <span>Duplex/House</span>
              </label>
            </div>
          </div>

          <div className={styles.modal__roomCountersSection}>
            <div className={styles.modal__roomCountersGrid}>
              {roomCounters.map((room, index) => (
                <div key={room.name} className={styles.modal__roomCounter}>
                  <span className={styles.modal__roomName}>{room.name}</span>
                  <div className={styles.modal__counterControls}>
                    <button
                      className={styles.modal__counterButton}
                      onClick={() => handleCounterChange(index, true)}
                      aria-label={`Increment ${room.name}`}
                    >
                      +
                    </button>
                    <span className={styles.modal__counterValue}>{room.count}</span>
                    <button
                      className={styles.modal__counterButton}
                      onClick={() => handleCounterChange(index, false)}
                      aria-label={`Decrement ${room.name}`}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.modal__orderButtonContainer}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleOrderSubmit}
              className={styles.modal__orderButton}
            >
              ORDER
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CleaningServiceModal; 