"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CheckoutModal, {
  CheckoutFormData,
} from "@/components/ui/booking/modals/CheckoutModal/CheckoutModal";
import ServiceDetailsSlidePanel from "@/components/ui/booking/modals/ServiceDetailsSlidePanel/ServiceDetailsSlidePanel";
import styles from "./PestControlServiceModal.module.scss";

export interface TreatmentArea {
  id: string;
  name: string;
  selected: boolean;
}

export interface PestControlServiceConfiguration {
  treatmentType: "residential" | "commercial" | "emergency";
  severity: "low" | "medium" | "high";
  areas: TreatmentArea[];
}

export interface PestControlServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  includedFeatures?: string[];
  onOrderSubmit?: (configuration: PestControlServiceConfiguration) => void;
}

const PestControlServiceModal: React.FC<PestControlServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/placeholder.jpg",
  serviceTitle = "Pest Control Service",
  serviceDescription = "Professional pest control service",
  servicePrice = 0,
  includedFeatures = [],
  onOrderSubmit,
}) => {
  // State for pest control configuration
  const [treatmentType, setTreatmentType] = useState<
    "residential" | "commercial" | "emergency"
  >("residential");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");
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

  // Handle treatment type change
  const handleTreatmentTypeChange = (
    type: "residential" | "commercial" | "emergency"
  ) => {
    setTreatmentType(type);
  };

  // Handle severity change
  const handleSeverityChange = (level: "low" | "medium" | "high") => {
    setSeverity(level);
  };

  // Handle area selection
  const handleAreaToggle = (areaId: string) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId ? { ...area, selected: !area.selected } : area
      )
    );
  };

  // Get selected areas count
  const getSelectedAreasCount = () => {
    return areas.filter((area) => area.selected).length;
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    const configuration: PestControlServiceConfiguration = {
      treatmentType,
      severity,
      areas,
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
        treatmentType,
        severity,
        areas: areas.filter((area) => area.selected),
      },
      checkout: formData,
    };

    console.log("Complete pest control order:", completeOrder);

    // Close modals and show success
    setIsCheckoutModalOpen(false);
    onClose();

    alert(
      "Pest control service booked successfully! We'll confirm your booking details shortly."
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
      className={styles.pestControlServiceModal}
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
            {/* Treatment Type Selection */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Treatment Type</h3>
              <div className={styles.treatmentTypeOptions}>
                <label
                  className={`${styles.treatmentTypeOption} ${
                    treatmentType === "residential" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="treatmentType"
                    value="residential"
                    checked={treatmentType === "residential"}
                    onChange={() => handleTreatmentTypeChange("residential")}
                    className={styles.radioInput}
                  />
                  <span>Residential - Home treatment</span>
                </label>
                <label
                  className={`${styles.treatmentTypeOption} ${
                    treatmentType === "commercial" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="treatmentType"
                    value="commercial"
                    checked={treatmentType === "commercial"}
                    onChange={() => handleTreatmentTypeChange("commercial")}
                    className={styles.radioInput}
                  />
                  <span>Commercial - Business treatment</span>
                </label>
                <label
                  className={`${styles.treatmentTypeOption} ${
                    treatmentType === "emergency" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="treatmentType"
                    value="emergency"
                    checked={treatmentType === "emergency"}
                    onChange={() => handleTreatmentTypeChange("emergency")}
                    className={styles.radioInput}
                  />
                  <span>Emergency - Urgent treatment</span>
                </label>
              </div>
            </div>

            {/* Severity Level */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Infestation Severity</h3>
              <div className={styles.severityOptions}>
                <label
                  className={`${styles.severityOption} ${
                    severity === "low" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="severity"
                    value="low"
                    checked={severity === "low"}
                    onChange={() => handleSeverityChange("low")}
                    className={styles.radioInput}
                  />
                  <span>Low - Minor infestation</span>
                </label>
                <label
                  className={`${styles.severityOption} ${
                    severity === "medium" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="severity"
                    value="medium"
                    checked={severity === "medium"}
                    onChange={() => handleSeverityChange("medium")}
                    className={styles.radioInput}
                  />
                  <span>Medium - Moderate infestation</span>
                </label>
                <label
                  className={`${styles.severityOption} ${
                    severity === "high" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="severity"
                    value="high"
                    checked={severity === "high"}
                    onChange={() => handleSeverityChange("high")}
                    className={styles.radioInput}
                  />
                  <span>High - Severe infestation</span>
                </label>
              </div>
            </div>

            {/* Treatment Areas */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Treatment Areas</h3>
              <div className={styles.areasGrid}>
                {areas.map((area) => (
                  <label
                    key={area.id}
                    className={`${styles.areaOption} ${
                      area.selected ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={area.selected}
                      onChange={() => handleAreaToggle(area.id)}
                      className={styles.checkboxInput}
                    />
                    <span>{area.name}</span>
                  </label>
                ))}
              </div>
              <div className={styles.selectedAreasCount}>
                Selected Areas: {getSelectedAreasCount()}
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
              ORDER PEST CONTROL SERVICE
            </Button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCheckoutClose}
        onContinue={handleCheckoutComplete}
        serviceType="Pest Control"
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
        serviceType="Pest Control"
        includedFeatures={includedFeatures}
      />
    </Modal>
  );
};

export default PestControlServiceModal;
