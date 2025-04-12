// EditServiceModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Service,
  ServiceCategory,
  ServiceType,
  ServiceId,
} from "@/graphql/api";
import styles from "./EditServiceModal.module.scss";
import { Icon } from "@/components/ui/Icon/Icon";
import Portal from "../../Portal/Portal";
import Modal from "../../Modal/Modal";

// Type definitions for service details
type CleaningDetails = {
  cleaningType: ServiceId;
  houseType: "flat" | "duplex";
  rooms: {
    bedroom: number;
    livingRoom: number;
    bathroom: number;
    kitchen: number;
    balcony: number;
    studyRoom: number;
  };
  frequency: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  day: string;
  time: string;
};

type FoodDetails = {
  foodPlanType: "basic" | "standard" | "premium";
  deliveryFrequency: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  deliveryDays: string[];
  mealsPerDay: {
    [key: string]: number;
  };
};

type LaundryDetails = {
  laundryType: ServiceId;
  bags: number;
  pickupFrequency: 1 | 2 | 3;
  pickupDays: string[];
};

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service & {
    type: ServiceType;
    category: ServiceCategory;
    details: CleaningDetails | FoodDetails | LaundryDetails;
  };
  onSave: (serviceId: string, updatedDetails: any) => void;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  onSave,
}) => {
  // State for service details
  const [serviceDetails, setServiceDetails] = useState<any>(service.details);

  // Reset details when service changes
  useEffect(() => {
    setServiceDetails(service.details);
  }, [service]);

  // Handle cleaning room quantity changes
  const handleRoomChange = (room: string, increment: boolean) => {
    if (service.type === ServiceType.Cleaning) {
      setServiceDetails((prev: CleaningDetails) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [room]: Math.max(
            0,
            prev.rooms[room as keyof typeof prev.rooms] + (increment ? 1 : -1)
          ),
        },
      }));
    }
  };

  // Handle laundry bag quantity changes
  const handleBagChange = (increment: boolean) => {
    if (service.type === ServiceType.Laundry) {
      setServiceDetails((prev: LaundryDetails) => ({
        ...prev,
        bags: Math.max(1, prev.bags + (increment ? 1 : -1)),
      }));
    }
  };

  // Handle food meal quantity changes
  const handleMealChange = (day: string, increment: boolean) => {
    if (service.category === ServiceCategory.Cooking) {
      setServiceDetails((prev: FoodDetails) => ({
        ...prev,
        mealsPerDay: {
          ...prev.mealsPerDay,
          [day]: Math.max(
            0,
            (prev.mealsPerDay[day] || 0) + (increment ? 1 : -1)
          ),
        },
      }));
    }
  };

  // Handle frequency change
  const handleFrequencyChange = (frequency: number) => {
    if (service.type === ServiceType.Cleaning) {
      setServiceDetails((prev: CleaningDetails) => ({
        ...prev,
        frequency: frequency as 1 | 2 | 3 | 4 | 5 | 6 | 7,
      }));
    } else if (service.category === ServiceCategory.Cooking) {
      setServiceDetails((prev: FoodDetails) => ({
        ...prev,
        deliveryFrequency: frequency as 1 | 2 | 3 | 4 | 5 | 6 | 7,
      }));
    } else if (service.type === ServiceType.Laundry) {
      setServiceDetails((prev: LaundryDetails) => ({
        ...prev,
        pickupFrequency: frequency as 1 | 2 | 3,
      }));
    }
  };

  // Handle type change (cleaning type, food plan type, laundry type)
  const handleTypeChange = (type: string) => {
    if (service.type === ServiceType.Cleaning) {
      setServiceDetails((prev: CleaningDetails) => ({
        ...prev,
        cleaningType: type as ServiceId,
      }));
    } else if (service.category === ServiceCategory.Cooking) {
      setServiceDetails((prev: FoodDetails) => ({
        ...prev,
        foodPlanType: type as "basic" | "standard" | "premium",
      }));
    } else if (service.type === ServiceType.Laundry) {
      setServiceDetails((prev: LaundryDetails) => ({
        ...prev,
        laundryType: type as ServiceId,
      }));
    }
  };

  // Handle property type change for cleaning service
  const handlePropertyTypeChange = (type: "flat" | "duplex") => {
    if (service.type === ServiceType.Cleaning) {
      setServiceDetails((prev: CleaningDetails) => ({
        ...prev,
        houseType: type,
      }));
    }
  };

  // Handle day selection (delivery days or pickup days)
  const handleDayToggle = (day: string) => {
    if (service.category === ServiceCategory.Cooking) {
      setServiceDetails((prev: FoodDetails) => {
        const currentDays = prev.deliveryDays || [];
        const newDays = currentDays.includes(day)
          ? currentDays.filter((d) => d !== day)
          : [...currentDays, day];

        return {
          ...prev,
          deliveryDays: newDays,
        };
      });
    } else if (service.type === ServiceType.Laundry) {
      setServiceDetails((prev: LaundryDetails) => {
        const currentDays = prev.pickupDays || [];
        const newDays = currentDays.includes(day)
          ? currentDays.filter((d) => d !== day)
          : [...currentDays, day];

        return {
          ...prev,
          pickupDays: newDays,
        };
      });
    }
  };

  // Handle save button click
  const handleSave = () => {
    onSave(service._id, serviceDetails);
    onClose();
  };

  // If not open, don't render
  if (!isOpen) return null;

  // Days of the week for selection
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${service.name}`}
      maxWidth="800px"
    >
      <div className={styles.edit_service_modal__content}>
        {/* Service Type Selection - For all services */}
        {service.type === ServiceType.Cleaning && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Grid" />
              Cleaning Type
            </h3>
            <div className={styles.edit_service_modal__toggle_group}>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as CleaningDetails).cleaningType ===
                  ServiceId.StandardCleaning
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange(ServiceId.StandardCleaning)}
              >
                Standard
              </button>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as CleaningDetails).cleaningType ===
                  ServiceId.DeepCleaning
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange(ServiceId.DeepCleaning)}
              >
                Deep
              </button>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as CleaningDetails).cleaningType ===
                  ServiceId.PostConstructionCleaning
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() =>
                  handleTypeChange(ServiceId.PostConstructionCleaning)
                }
              >
                Post Construction
              </button>
            </div>
          </div>
        )}

        {service.category === ServiceCategory.Cooking && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Grid" />
              Food Plan Type
            </h3>
            <div className={styles.edit_service_modal__toggle_group}>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as FoodDetails).foodPlanType === "basic"
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange("basic")}
              >
                Basic
              </button>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as FoodDetails).foodPlanType === "standard"
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange("standard")}
              >
                Standard
              </button>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as FoodDetails).foodPlanType === "premium"
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange("premium")}
              >
                Premium
              </button>
            </div>
          </div>
        )}

        {service.type === ServiceType.Laundry && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Grid" />
              Laundry Type
            </h3>
            <div className={styles.edit_service_modal__toggle_group}>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as LaundryDetails).laundryType ===
                  ServiceId.StandardLaundry
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange(ServiceId.StandardLaundry)}
              >
                Wash & Fold
              </button>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as LaundryDetails).laundryType ===
                  ServiceId.PremiumLaundry
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handleTypeChange(ServiceId.PremiumLaundry)}
              >
                Wash & Iron
              </button>
            </div>
          </div>
        )}

        {/* Frequency Section - For all services */}
        <div className={styles.edit_service_modal__section}>
          <h3 className={styles.edit_service_modal__section_title}>
            <Icon name="Repeat" />
            {service.type === ServiceType.Cleaning
              ? "Cleaning"
              : service.category === ServiceCategory.Cooking
                ? "Delivery"
                : "Pickup"}{" "}
            Frequency
          </h3>
          <div className={styles.edit_service_modal__toggle_group}>
            {[1, 2, 3, 4, 5, 6, 7]
              .slice(0, service.type === ServiceType.Laundry ? 3 : 7)
              .map((freq) => (
                <button
                  key={freq}
                  className={`${styles.edit_service_modal__toggle_button} ${
                    (service.type === ServiceType.Cleaning &&
                      (serviceDetails as CleaningDetails).frequency === freq) ||
                    (service.category === ServiceCategory.Cooking &&
                      (serviceDetails as FoodDetails).deliveryFrequency ===
                        freq) ||
                    (service.type === ServiceType.Laundry &&
                      (serviceDetails as LaundryDetails).pickupFrequency ===
                        freq)
                      ? styles.edit_service_modal__toggle_button_selected
                      : ""
                  }`}
                  onClick={() => handleFrequencyChange(freq)}
                >
                  {freq === 1
                    ? "Once"
                    : freq === 2
                      ? "Twice"
                      : freq === 3
                        ? "3x"
                        : freq === 4
                          ? "4x"
                          : freq === 5
                            ? "5x"
                            : freq === 6
                              ? "6x"
                              : "Daily"}
                </button>
              ))}
          </div>
          <p className={styles.edit_service_modal__helper_text}>
            {service.type === ServiceType.Cleaning
              ? "How many times per week would you like cleaning services?"
              : service.category === ServiceCategory.Cooking
                ? "How many days per week would you like food delivery?"
                : "How many times per week would you like laundry pickup?"}
          </p>
        </div>

        {/* Property Type - Cleaning only */}
        {service.type === ServiceType.Cleaning && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Home" />
              Property Type
            </h3>
            <div className={styles.edit_service_modal__toggle_group}>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as CleaningDetails).houseType === "flat"
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handlePropertyTypeChange("flat")}
              >
                Flat / Apartment
              </button>
              <button
                className={`${styles.edit_service_modal__toggle_button} ${
                  (serviceDetails as CleaningDetails).houseType === "duplex"
                    ? styles.edit_service_modal__toggle_button_selected
                    : ""
                }`}
                onClick={() => handlePropertyTypeChange("duplex")}
              >
                Duplex / House
              </button>
            </div>
          </div>
        )}

        {/* Room Selection - Cleaning only */}
        {service.type === ServiceType.Cleaning && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Grid" />
              Rooms to Clean
            </h3>
            <div className={styles.edit_service_modal__rooms_grid}>
              {Object.entries((serviceDetails as CleaningDetails).rooms).map(
                ([room, count]) => (
                  <div
                    key={room}
                    className={styles.edit_service_modal__counter_group}
                  >
                    <span className={styles.edit_service_modal__counter_label}>
                      {room === "bedroom"
                        ? "Bedrooms"
                        : room === "livingRoom"
                          ? "Living Rooms"
                          : room === "bathroom"
                            ? "Bathrooms"
                            : room === "kitchen"
                              ? "Kitchens"
                              : room === "balcony"
                                ? "Balconies"
                                : "Study Rooms"}
                    </span>
                    <div
                      className={styles.edit_service_modal__counter_controls}
                    >
                      <button
                        className={styles.edit_service_modal__counter_button}
                        onClick={() => handleRoomChange(room, false)}
                        disabled={count <= 0}
                      >
                        <Icon name="Minus" />
                      </button>
                      <span
                        className={styles.edit_service_modal__counter_value}
                      >
                        {count}
                      </span>
                      <button
                        className={styles.edit_service_modal__counter_button}
                        onClick={() => handleRoomChange(room, true)}
                      >
                        <Icon name="Plus" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Bag Selection - Laundry only */}
        {service.type === ServiceType.Laundry && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Package" />
              Laundry Bags
            </h3>
            <div className={styles.edit_service_modal__counter_group}>
              <span className={styles.edit_service_modal__counter_label}>
                Number of Bags
              </span>
              <div className={styles.edit_service_modal__counter_controls}>
                <button
                  className={styles.edit_service_modal__counter_button}
                  onClick={() => handleBagChange(false)}
                  disabled={(serviceDetails as LaundryDetails).bags <= 1}
                >
                  <Icon name="Minus" />
                </button>
                <span className={styles.edit_service_modal__counter_value}>
                  {(serviceDetails as LaundryDetails).bags}
                </span>
                <button
                  className={styles.edit_service_modal__counter_button}
                  onClick={() => handleBagChange(true)}
                >
                  <Icon name="Plus" />
                </button>
              </div>
            </div>
            <p className={styles.edit_service_modal__helper_text}>
              Approximately 30 items per bag
            </p>
          </div>
        )}

        {/* Meal Selection - Food only */}
        {service.category === ServiceCategory.Cooking && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Calendar" />
              Delivery Days
            </h3>
            <div className={styles.edit_service_modal__days_grid}>
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`${styles.edit_service_modal__day_button} ${
                    (serviceDetails as FoodDetails).deliveryDays?.includes(day)
                      ? styles.edit_service_modal__day_button_selected
                      : ""
                  }`}
                  onClick={() => handleDayToggle(day)}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>

            <h3
              className={styles.edit_service_modal__section_title}
              style={{ marginTop: "20px" }}
            >
              <Icon name="Coffee" />
              Meals Per Day
            </h3>
            <div className={styles.edit_service_modal__meals_grid}>
              {(serviceDetails as FoodDetails).deliveryDays?.map((day) => (
                <div
                  key={day}
                  className={styles.edit_service_modal__counter_group}
                >
                  <span className={styles.edit_service_modal__counter_label}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>
                  <div className={styles.edit_service_modal__counter_controls}>
                    <button
                      className={styles.edit_service_modal__counter_button}
                      onClick={() => handleMealChange(day, false)}
                      disabled={
                        (serviceDetails as FoodDetails).mealsPerDay?.[day] <= 0
                      }
                    >
                      <Icon name="Minus" />
                    </button>
                    <span className={styles.edit_service_modal__counter_value}>
                      {(serviceDetails as FoodDetails).mealsPerDay?.[day] || 0}
                    </span>
                    <button
                      className={styles.edit_service_modal__counter_button}
                      onClick={() => handleMealChange(day, true)}
                    >
                      <Icon name="Plus" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {(serviceDetails as FoodDetails).deliveryDays?.length === 0 && (
              <p className={styles.edit_service_modal__empty_message}>
                Please select delivery days first
              </p>
            )}
          </div>
        )}

        {/* Pickup Days - Laundry only */}
        {service.type === ServiceType.Laundry && (
          <div className={styles.edit_service_modal__section}>
            <h3 className={styles.edit_service_modal__section_title}>
              <Icon name="Calendar" />
              Pickup Days
            </h3>
            <div className={styles.edit_service_modal__days_grid}>
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`${styles.edit_service_modal__day_button} ${
                    (serviceDetails as LaundryDetails).pickupDays?.includes(day)
                      ? styles.edit_service_modal__day_button_selected
                      : ""
                  }`}
                  onClick={() => handleDayToggle(day)}
                  disabled={
                    (serviceDetails as LaundryDetails).pickupDays?.length >=
                      (serviceDetails as LaundryDetails).pickupFrequency &&
                    !(serviceDetails as LaundryDetails).pickupDays?.includes(
                      day
                    )
                  }
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
            <p className={styles.edit_service_modal__helper_text}>
              Select up to {(serviceDetails as LaundryDetails).pickupFrequency}{" "}
              pickup day(s) per week
            </p>
          </div>
        )}

        <div className={styles.edit_service_modal__footer}>
          <button
            className={`${styles.edit_service_modal__button} ${styles.edit_service_modal__button_cancel}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${styles.edit_service_modal__button} ${styles.edit_service_modal__button_save}`}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditServiceModal;
