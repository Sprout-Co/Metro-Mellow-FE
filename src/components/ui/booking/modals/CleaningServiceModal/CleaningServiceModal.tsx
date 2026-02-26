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

// Helper function to map ServiceId to CleaningType
const getCleaningTypeFromServiceId = (
  serviceId: ServiceId | undefined,
): CleaningType => {
  if (!serviceId) return CleaningType.StandardCleaning;

  switch (serviceId) {
    case ServiceId.DeepCleaning:
      return CleaningType.DeepCleaning;
    case ServiceId.MoveInMoveOutCleaning:
      return CleaningType.MoveInMoveOutCleaning;
    case ServiceId.PostConstructionCleaning:
      return CleaningType.PostConstructionCleaning;
    case ServiceId.StandardCleaning:
    default:
      return CleaningType.StandardCleaning;
  }
};

// Function to get service information sections based on cleaning type
const getServiceInformationSections = (
  cleaningType: CleaningType,
): ServiceInformationSection[] => {
  switch (cleaningType) {
    case CleaningType.DeepCleaning:
      return [
        {
          title: "Service Checklist",
          items: [
            "All Standard Cleaning tasks included",
            "High dusting (ceiling fans, high ledges, light fixtures, AC)",
            "Detailed dusting and wiping of baseboards, window sills, and tracks",
            "Wiping down doors, knobs, and light switches",
            "Cleaning under movable furniture and surface-level upholstery vacuuming",
            "Cleaning inside vanities and medicine cabinets",
            "Washing windows and blinds",
            "Kitchen deep clean: Inside oven, fridge, microwave, and cabinets/drawers",
            "Cleaning range hood, filter, and refrigerator coils",
            "Scrubbing tile grout, removing soap scum and limescale",
            "Deep cleaning around toilet bases and hidden crevices",
          ],
        },
        {
          title: "What You Provide",
          items: [
            "Mop bucket and Mop",
            "Broom/Sweeper and Dustpan",
            "Cobweb remover",
            "Access to home, running water, & electricity",
          ],
        },
        {
          title: "What We Provide",
          items: [
            "All Standard cleaning supplies",
            "Heavy-duty stain removers",
            "Grout cleaner",
            "Oven cleaner",
            "Heavy-duty vacuums",
            "Grout scrubbers & steam cleaners",
          ],
        },
      ];

    case CleaningType.MoveInMoveOutCleaning:
      return [
        {
          title: "Service Checklist",
          items: [
            "All Deep Cleaning tasks included",
            "Full cleaning inside all closets and storage drawers",
            "Detailed washing of window sills, tracks, frames, windows, and blinds",
            "Extensive spot cleaning and washing of walls and doors",
            "Deep scrubbing and sanitization of hard floors",
            "Steam cleaning or industrial vacuuming/shampooing of residual carpets",
            "Full cleaning inside and out of all appliances (oven, fridge, microwave, dishwasher, washer/dryer)",
            "Full cleaning inside all kitchen cabinets, pantry, and bathroom vanities",
          ],
        },
        {
          title: "What You Provide",
          items: [
            "Access to the home, running water, & electricity",
            "Property must be 100% empty of personal items",
          ],
        },
        {
          title: "What We Provide",
          items: [
            "We provide all tools (vacuums, mops, etc.)",
            "Specialized machinery",
            "Heavy-duty chemicals",
          ],
        },
      ];

    case CleaningType.PostConstructionCleaning:
      return [
        {
          title: "Service Checklist",
          items: [
            "All applicable Move-Out Cleaning tasks included",
            "Removal of all small debris, stickers, and labels from surfaces",
            "Specialized, industrial-grade fine dust removal using HEPA-filtered vacuums",
            "Removal of paint spatter, cement residue, or grout haze from floors, glass, and fixtures",
            "Heavy scrubbing of floors, tiles, and walls to remove embedded construction dirt",
            "Intensive scraping and cleaning of windows/glass to remove residue",
            "Polishing of all stainless steel and metal fixtures affected by construction dust",
          ],
        },
        {
          title: "What You Provide",
          items: [
            "Access to the home, running water, & electricity",
            "Secure, pre-approved disposal site for any major construction waste",
          ],
        },
        {
          title: "What We Provide",
          items: [
            "All specialized tools",
            "Industrial HEPA vacuums",
            "Solvents, buffers, and heavy-duty degreasers",
            "Personal Protective Equipment (PPE)",
          ],
        },
      ];

    case CleaningType.StandardCleaning:
    default:
      return [
        {
          title: "Service Checklist",
          items: [
            "Removing cobwebs from corners and ceilings",
            "Dusting all accessible surfaces (tables, nightstands, dressers, etc.)",
            "Wiping down light switches, door knobs, and cleaning mirrors",
            "Vacuuming carpets/rugs and sweeping/mopping hard floors",
            "Emptying trash cans and replacing liners",
            "Making beds (neatly arranging)",
            "Kitchen: Countertops, appliance exteriors, sink scrubbing, stovetop, and dishes",
            "Bathroom: Disinfecting toilet, showers, tubs, sinks, and fixtures",
          ],
        },
        {
          title: "What You Provide",
          items: [
            "Mop bucket and Mop",
            "Broom/Sweeper and Dustpan",
            "Cobweb remover",
            "Vacuum cleaner (if carpets are present)",
            "Access to home, running water, & electricity",
          ],
        },
        {
          title: "What We Provide",
          items: [
            "All-purpose detergents",
            "Liquid soap / Dish soap",
            "Bleach & Toilet cleaner",
            "Surface polish & Scouring powder",
            "Disinfectant & Glass cleaner",
            "Microfiber cloths and scrubbers",
          ],
        },
      ];
  }
};
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { LocalStorageKeys } from "@/utils/localStorage";
import LoginModal from "@/components/ui/booking/modals/LoginModal/LoginModal";
import ServiceModalFooter from "../ServiceModalFooter/ServiceModalFooter";
import ServiceInformation, {
  ServiceInformationSection,
} from "./components/ServiceInformation";
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
  // onOrderSubmit?: (configuration: CleaningServiceConfiguration) => void;
  serviceOption?: ServiceOption;
  service: Service;
  // Service information display options
  serviceInformationSections?: ServiceInformationSection[];
  serviceInformationTitle?: string;
}

const CleaningServiceModal: React.FC<CleaningServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/home/hero.jpg",
  serviceTitle = "Cleaning Service",
  serviceDescription = "Professional cleaning service",
  servicePrice = 0,
  includedFeatures = [],
  // onOrderSubmit,
  serviceOption,
  service,
  serviceInformationSections,
  serviceInformationTitle,
}) => {
  // Get cleaning type from service option
  const cleaningType = getCleaningTypeFromServiceId(serviceOption?.service_id);

  // Get default title based on cleaning type
  const getDefaultTitle = (type: CleaningType): string => {
    switch (type) {
      case CleaningType.DeepCleaning:
        return "What's Included in Deep Cleaning?";
      case CleaningType.MoveInMoveOutCleaning:
        return "What's Included in Move-In/Move-Out Cleaning?";
      case CleaningType.PostConstructionCleaning:
        return "What's Included in Post-Construction Cleaning?";
      case CleaningType.StandardCleaning:
      default:
        return "What's Included in Standard Cleaning?";
    }
  };

  // Get service information sections - use provided or get from cleaning type
  const informationSections =
    serviceInformationSections || getServiceInformationSections(cleaningType);

  // Get title - use provided or default based on cleaning type
  const informationTitle =
    serviceInformationTitle || getDefaultTitle(cleaningType);
  // State for cleaning configuration
  const [apartmentType, setApartmentType] = useState<HouseType>(HouseType.Flat);
  const [roomQuantities, setRoomQuantities] = useState<RoomQuantitiesInput>({
    bedroom: 1,
    bathroom: 1,
    balcony: 0,
    kitchen: 1,
    livingRoom: 1,
    staircase: 0,
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
    increment: boolean,
  ) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, (prev[room] as number) + (increment ? 1 : -1)),
    }));
  };

  // Calculate total room count
  const getTotalRoomCount = () => {
    return Object.values(roomQuantities).reduce(
      (total, quantity) => total + quantity,
      0,
    );
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    setError(null); // Clear any previous errors when starting new order
    // const configuration: CleaningServiceConfiguration = {
    //   apartmentType,
    //   roomQuantities,
    // };

    // console.log("configuration", configuration);

    // if (onOrderSubmit) {
    //   onOrderSubmit(configuration);
    // }

    setIsCheckoutModalOpen(true);
    // setIsSlidePanelOpen(true);
  };

  const calculateTotalPrice = () => {
    if (!service) return 0;

    // Start with base price
    const basePrice = serviceOption?.price || service.price;

    // Get room prices from service options
    const roomPrices =
      service.options?.find(
        (opt) => opt.service_id === serviceOption?.service_id,
      )?.roomPrices || {};

    // Calculate total price for each room type
    // Bedrooms: charge for quantity > 1 (first bedroom included in base)
    // Other rooms: charge for quantity > bedroom count (threshold based on bedroom selection)
    const bedroomCount = roomQuantities.bedroom || 0;
    const roomTotal = Object.entries(roomQuantities).reduce(
      (total, [room, quantity]) => {
        const roomPrice = roomPrices[room as keyof typeof roomPrices] || 0;
        const qty = quantity as number;

        if (room === "bedroom") {
          // For bedrooms: charge for quantity > 1
          if (qty > 1) {
            return total + roomPrice * (qty - 1);
          }
        } else {
          // For other rooms: charge for quantity > bedroom count
          if (qty > bedroomCount) {
            return total + roomPrice * (qty - bedroomCount);
          }
        }
        return total;
      },
      0,
    );

    // Add room prices to base price
    let totalPrice = basePrice + roomTotal;

    // Apply duplex multiplier if applicable
    if (apartmentType === HouseType.Duplex) {
      totalPrice *= 1.5;
    }

    return totalPrice;
  };

  // Handle checkout completion
  const handleCheckoutComplete = async (
    formData: CheckoutFormData,
    finalTotalPrice: number,
    onContinuePayment: (bookingId: string) => void,
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
        totalPrice: finalTotalPrice,
      };

      if (isAuthenticated) {
        const bookingResponse = await handleCreateBooking(completeOrder);
        const booking = bookingResponse;
        onContinuePayment(bookingResponse || "");
        // setShowOrderSuccessModal(true);
      } else {
        localStorage.setItem(
          LocalStorageKeys.BOOKING_DATA_TO_COMPLETE,
          JSON.stringify(completeOrder),
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
      fullScreen
      showCloseButton={true}
      className={styles.cleaningServiceModal}
      contentOverflow="hidden"
    >
      <div className={styles.modal__container}>
        {/* Details Section */}
        <div className={styles.modal__detailsSection}>
          {/* Service Title and Description */}
          <h2 className={styles.modal__title}>{serviceOption?.label}</h2>
          <div className={styles.modal__descriptionWrapper}>
            <p className={styles.modal__description}>
              {serviceOption?.description}
            </p>
          </div>

          {/* Service Information Section */}
          {informationSections.length > 0 && (
            <ServiceInformation
              mainTitle={informationTitle}
              sections={informationSections}
            />
          )}

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
                            false,
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
                            true,
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
        totalPrice={calculateTotalPrice()}
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
