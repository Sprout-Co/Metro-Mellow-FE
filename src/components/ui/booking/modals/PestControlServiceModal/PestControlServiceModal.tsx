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
import {
  CreateBookingInput,
  Service,
  ServiceCategory,
  ServiceId,
  ServiceOption,
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

export interface PestControlServiceConfiguration {
  treatmentType: TreatmentType;
  severity: Severity;
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
  serviceOption?: ServiceOption;
  service: Service;
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
  serviceOption,
  service,
}) => {
  // State for pest control configuration
  const [treatmentType, setTreatmentType] = useState<TreatmentType>(
    TreatmentType.PestControlResidential
  );
  const [severity, setSeverity] = useState<Severity>(Severity.Medium);
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
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { handleCreateBooking, isCreatingBooking } = useBookingOperations();

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!service) return 0;

    let totalPrice = service.price;
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

    return totalPrice;
  };

  // Handle severity change
  const handleSeverityChange = (level: Severity) => {
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
  const handleCheckoutComplete = async (formData: CheckoutFormData) => {
    try {
      const completeOrder: CreateBookingInput = {
        serviceId: service._id,
        service_category: service.category,
        serviceOption:
          serviceOption?.service_id || ServiceId.PestControlResidential,
        date: formData.date,
        timeSlot: formData.timeSlot,
        address: formData.addressId || "",
        notes: `Treatment Type: ${treatmentType}, Severity: ${severity}, Areas: ${areas
          .filter((a) => a.selected)
          .map((a) => a.name)
          .join(", ")}`,
        serviceDetails: {
          serviceOption:
            serviceOption?.service_id || ServiceId.PestControlResidential,
          pestControl: {
            treatmentType,
            severity,
            areas: areas.filter((area) => area.selected).map((area) => area.id),
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
      console.log("Complete pest control order:", completeOrder);
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
      className={styles.pestControlServiceModal}
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
        service_category="Pest Control"
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
        service_category="Pest Control"
        includedFeatures={includedFeatures}
        apartmentType={undefined}
        roomCount={getSelectedAreasCount()}
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

export default PestControlServiceModal;
