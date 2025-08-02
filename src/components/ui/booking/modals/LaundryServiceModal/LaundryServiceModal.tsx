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

export interface LaundryItem {
  id: string;
  name: string;
  count: number;
}

export interface LaundryServiceConfiguration {
  laundryType: "standard" | "dry-clean" | "express";
  bags: number;
  items: LaundryItem[];
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
}) => {
  // State for laundry configuration
  const [laundryType, setLaundryType] = useState<
    "standard" | "dry-clean" | "express"
  >("standard");
  const [bags, setBags] = useState(1);
  const [items, setItems] = useState<LaundryItem[]>([
    { id: "shirts", name: "Shirts", count: 0 },
    { id: "pants", name: "Pants", count: 0 },
    { id: "dresses", name: "Dresses", count: 0 },
    { id: "suits", name: "Suits", count: 0 },
    { id: "bedding", name: "Bedding", count: 0 },
    { id: "towels", name: "Towels", count: 0 },
    { id: "other", name: "Other", count: 0 },
  ]);

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);

  // Handle laundry type change
  const handleLaundryTypeChange = (
    type: "standard" | "dry-clean" | "express"
  ) => {
    setLaundryType(type);
  };

  // Handle bag count change
  const handleBagCountChange = (increment: boolean) => {
    const newCount = increment ? bags + 1 : Math.max(1, bags - 1);
    setBags(newCount);
  };

  // Handle item counter changes
  const handleItemCounterChange = (itemId: string, increment: boolean) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newCount = increment
            ? item.count + 1
            : Math.max(0, item.count - 1);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  // Calculate total item count
  const getTotalItemCount = () => {
    return items.reduce((total, item) => total + item.count, 0);
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    const configuration: LaundryServiceConfiguration = {
      laundryType,
      bags,
      items,
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
        laundryType,
        bags,
        items,
      },
      checkout: formData,
    };

    console.log("Complete laundry order:", completeOrder);

    // Close modals and show success
    setIsCheckoutModalOpen(false);
    onClose();

    alert(
      "Laundry service booked successfully! We'll confirm your booking details shortly."
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
      className={styles.laundryServiceModal}
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
            {/* Laundry Type Selection */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Service Type</h3>
              <div className={styles.laundryTypeOptions}>
                <label
                  className={`${styles.laundryTypeOption} ${
                    laundryType === "standard" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="laundryType"
                    value="standard"
                    checked={laundryType === "standard"}
                    onChange={() => handleLaundryTypeChange("standard")}
                    className={styles.radioInput}
                  />
                  <span>Standard (2-3 days)</span>
                </label>
                <label
                  className={`${styles.laundryTypeOption} ${
                    laundryType === "dry-clean" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="laundryType"
                    value="dry-clean"
                    checked={laundryType === "dry-clean"}
                    onChange={() => handleLaundryTypeChange("dry-clean")}
                    className={styles.radioInput}
                  />
                  <span>Dry Clean (3-4 days)</span>
                </label>
                <label
                  className={`${styles.laundryTypeOption} ${
                    laundryType === "express" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="laundryType"
                    value="express"
                    checked={laundryType === "express"}
                    onChange={() => handleLaundryTypeChange("express")}
                    className={styles.radioInput}
                  />
                  <span>Express (24 hours)</span>
                </label>
              </div>
            </div>

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
              <h3 className={styles.sectionTitle}>Item Breakdown (Optional)</h3>
              <div className={styles.itemsGrid}>
                {items.map((item) => (
                  <div key={item.id} className={styles.itemCounter}>
                    <span className={styles.itemName}>{item.name}</span>
                    <div className={styles.counterControls}>
                      <button
                        className={styles.counterButton}
                        onClick={() => handleItemCounterChange(item.id, false)}
                        aria-label={`Decrement ${item.name}`}
                      >
                        -
                      </button>
                      <span className={styles.counterValue}>{item.count}</span>
                      <button
                        className={styles.counterButton}
                        onClick={() => handleItemCounterChange(item.id, true)}
                        aria-label={`Increment ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.totalItems}>
                Total Items: {getTotalItemCount()}
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
              ORDER LAUNDRY SERVICE
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCheckoutClose}
        onContinue={handleCheckoutComplete}
        serviceType="Laundry"
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
        serviceType="Laundry"
        includedFeatures={includedFeatures}
      />
    </Modal>
  );
};

export default LaundryServiceModal;
