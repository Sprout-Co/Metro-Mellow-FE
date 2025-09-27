"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CheckoutModal, {
  CheckoutFormData,
} from "@/components/ui/booking/modals/CheckoutModal/CheckoutModal";
import ServiceDetailsSlidePanel from "@/components/ui/booking/modals/ServiceDetailsSlidePanel/ServiceDetailsSlidePanel";
import styles from "./LaundryServiceModal.module.scss";
import {
  CreateBookingInput,
  Service,
  ServiceCategory,
  ServiceId,
  ServiceOption,
  LaundryType,
  LaundryItemsInput,
} from "@/graphql/api";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { LocalStorageKeys } from "@/utils/localStorage";
import LoginModal from "@/components/ui/booking/modals/LoginModal/LoginModal";
import ServiceModalFooter from "../ServiceModalFooter/ServiceModalFooter";

export interface LaundryItem {
  id: string;
  name: string;
  count: number;
}

export interface LaundryServiceConfiguration {
  laundryType: LaundryType;
  bags: number;
  items: LaundryItemsInput;
}

export interface LaundryServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  includedFeatures?: string[];
  onOrderSubmit?: (configuration: LaundryServiceConfiguration) => void;
  serviceOption?: ServiceOption;
  service: Service;
}

const LaundryServiceModal: React.FC<LaundryServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/placeholder.jpg",
  serviceTitle = "Laundry Service",
  serviceDescription = "Professional laundry service",
  servicePrice = 0,
  includedFeatures = [],
  onOrderSubmit,
  serviceOption,
  service,
}) => {
  const [bags, setBags] = useState(1);

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { handleCreateBooking, isCreatingBooking } = useBookingOperations();

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!service) return 0;

    let totalPrice = serviceOption?.price || service.price;
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

    return totalPrice;
  };

  // Handle bag count change
  const handleBagCountChange = (increment: boolean) => {
    const newCount = increment ? bags + 1 : Math.max(1, bags - 1);
    setBags(newCount);
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    // const configuration: LaundryServiceConfiguration = {
    //   laundryType: LaundryType.StandardLaundry,
    //   bags,
    // };

    // if (onOrderSubmit) {
    //   onOrderSubmit(configuration);
    // }

    setIsCheckoutModalOpen(true);
    setIsSlidePanelOpen(true);
  };

  // Handle checkout completion
  const handleCheckoutComplete = async (formData: CheckoutFormData) => {
    try {
      if (!serviceOption?.service_id) {
        throw new Error("Service option is required");
      }
      const completeOrder: CreateBookingInput = {
        serviceId: service._id,
        service_category: service.category,
        serviceOption: serviceOption?.service_id || "",
        date: formData.date,
        timeSlot: formData.timeSlot,
        address: formData.addressId || "",
        notes: `Laundry Type: ${LaundryType.StandardLaundry}, Bags: ${bags}`,
        serviceDetails: {
          serviceOption: serviceOption?.service_id || "",
          laundry: {
            laundryType: serviceOption.service_id as unknown as LaundryType,
            bags,
          },
        },
        totalPrice: calculateTotalPrice(),
      };

      if (isAuthenticated) {
        await handleCreateBooking(completeOrder);
        setShowOrderSuccessModal(true);
      } else {
        localStorage.setItem(
          LocalStorageKeys.BOOKING_DATA_TO_COMPLETE,
          JSON.stringify(completeOrder)
        );
        setShowLoginModal(true);
      }
      console.log("Complete laundry order:", completeOrder);
    } catch (error) {
      console.error("Error creating booking:", error);
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
      className={styles.laundryServiceModal}
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
        service_category="Laundry"
        submitting={isCreatingBooking}
      />

      {/* Service Details Slide Panel */}
      <ServiceDetailsSlidePanel
        isOpen={isSlidePanelOpen}
        onClose={handleSlidePanelClose}
        onOpen={handleSlidePanelOpen}
        serviceTitle={serviceTitle}
        serviceDescription={serviceDescription}
        servicePrice={calculateTotalPrice()}
        serviceImage={serviceImage}
        service_category="Laundry"
        includedFeatures={includedFeatures}
        apartmentType={undefined}
        roomCount={bags}
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

export default LaundryServiceModal;
