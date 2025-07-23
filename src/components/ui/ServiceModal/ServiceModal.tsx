"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CheckoutModal, { CheckoutFormData } from "@/components/ui/CheckoutModal/CheckoutModal";
import ServiceDetailsSlidePanel from "@/components/ui/ServiceDetailsSlidePanel/ServiceDetailsSlidePanel";
import styles from "./ServiceModal.module.scss";

// Configuration interfaces for different service types
export interface ServiceOption {
  id: string;
  name: string;
  count: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  options: string[];
  required?: boolean;
}

export interface ServiceConfiguration {
  categories?: ServiceCategory[];
  options?: ServiceOption[];
  allowCustomization?: boolean;
}

export interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  serviceConfiguration?: ServiceConfiguration;
  // Optional sections to show/hide
  showImageSection?: boolean;
  showPriceSection?: boolean;
  showConfigurationSection?: boolean;
  // Custom content slots
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  // Callback for order submission
  onOrderSubmit?: (configuration: any) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/placeholder.jpg",
  serviceTitle = "Service",
  serviceDescription = "Service description",
  servicePrice = 0,
  serviceConfiguration,
  showImageSection = true,
  showPriceSection = true,
  showConfigurationSection = true,
  headerContent,
  footerContent,
  onOrderSubmit,
}) => {
  // State for service configuration
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({});
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>(
    serviceConfiguration?.options || []
  );

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);

  // Handle category selection (radio buttons)
  const handleCategoryChange = (categoryId: string, optionValue: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryId]: optionValue
    }));
  };

  // Handle service option counter changes
  const handleOptionCounterChange = (optionId: string, increment: boolean) => {
    setServiceOptions(prev => 
      prev.map(option => {
        if (option.id === optionId) {
          const newCount = increment ? option.count + 1 : Math.max(0, option.count - 1);
          return { ...option, count: newCount };
        }
        return option;
      })
    );
  };

  // Calculate total count for slide panel
  const getTotalCount = () => {
    return serviceOptions.reduce((total, option) => total + option.count, 0);
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    const configuration = {
      categories: selectedCategories,
      options: serviceOptions,
      serviceTitle,
      servicePrice,
    };
    
    console.log("Service configured", configuration);
    
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
        categories: selectedCategories,
        options: serviceOptions,
      },
      checkout: formData,
    };
    
    console.log("Complete order:", completeOrder);
    
    // Close modals and show success
    setIsCheckoutModalOpen(false);
    onClose();
    
    alert("Order placed successfully! We'll confirm your booking details shortly.");
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
      className={styles.serviceModal}
    >
      <div className={styles.modal__container}>
        {/* Image Section */}
        {showImageSection && (
          <div className={styles.modal__imageSection}>
            <Image 
              src={serviceImage}
              alt={serviceTitle}
              width={500}
              height={500}
              className={styles.modal__image}
            />
          </div>
        )}

        {/* Details Section */}
        <div className={styles.modal__detailsSection}>
          {/* Custom header content */}
          {headerContent && (
            <div className={styles.modal__headerContent}>
              {headerContent}
            </div>
          )}

          {/* Service Title and Description */}
          <h2 className={styles.modal__title}>{serviceTitle}</h2>
          <p className={styles.modal__description}>{serviceDescription}</p>

          {/* Price Section */}
          {showPriceSection && (
            <div className={styles.modal__price}>
              NGN {servicePrice.toLocaleString()}
            </div>
          )}

          {/* Configuration Section */}
          {showConfigurationSection && serviceConfiguration && (
            <div className={styles.modal__configurationSection}>
              {/* Category Selection (Radio buttons) */}
              {serviceConfiguration.categories?.map(category => (
                <div key={category.id} className={styles.modal__categorySection}>
                  <h3 className={styles.modal__sectionTitle}>{category.name}</h3>
                  <div className={styles.modal__categoryOptions}>
                    {category.options.map(option => (
                      <label 
                        key={option}
                        className={`${styles.modal__categoryOption} ${
                          selectedCategories[category.id] === option ? styles.modal__categoryOption_selected : ""
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={category.id}
                          value={option}
                          checked={selectedCategories[category.id] === option}
                          onChange={() => handleCategoryChange(category.id, option)}
                          className={styles.modal__radioInput}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Service Options with Counters */}
              {serviceConfiguration.options && serviceConfiguration.options.length > 0 && (
                <div className={styles.modal__optionsSection}>
                  <div className={styles.modal__optionsGrid}>
                    {serviceOptions.map(option => (
                      <div key={option.id} className={styles.modal__optionCounter}>
                        <span className={styles.modal__optionName}>{option.name}</span>
                        <div className={styles.modal__counterControls}>
                          <button
                            className={styles.modal__counterButton}
                            onClick={() => handleOptionCounterChange(option.id, true)}
                            aria-label={`Increment ${option.name}`}
                          >
                            +
                          </button>
                          <span className={styles.modal__counterValue}>{option.count}</span>
                          <button
                            className={styles.modal__counterButton}
                            onClick={() => handleOptionCounterChange(option.id, false)}
                            aria-label={`Decrement ${option.name}`}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom footer content */}
          {footerContent && (
            <div className={styles.modal__footerContent}>
              {footerContent}
            </div>
          )}

          {/* Order Button */}
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

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCheckoutClose}
        onContinue={handleCheckoutComplete}
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
        apartmentType={selectedCategories.apartmentType as "flat" | "duplex" | undefined}
        roomCount={getTotalCount()}
      />
    </Modal>
  );
};

export default ServiceModal; 