"use client";

import React from "react";
import { Service, ServiceCategory, SubscriptionServiceInput } from "@/graphql/api";
import CleaningServiceConfiguration from "./CleaningServiceConfiguration";
import CookingServiceConfiguration from "./CookingServiceConfiguration";
import LaundryServiceConfiguration from "./LaundryServiceConfiguration";
import PestControlServiceConfiguration from "./PestControlServiceConfiguration";

interface ServiceConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  existingConfiguration?: SubscriptionServiceInput;
  onSave: (configuration: SubscriptionServiceInput) => void;
  onProceedToCheckout?: (configuration: SubscriptionServiceInput) => void;
}

const ServiceConfigDrawer: React.FC<ServiceConfigDrawerProps> = ({
  isOpen,
  onClose,
  service,
  existingConfiguration,
  onSave,
  onProceedToCheckout,
}) => {
  if (!service) return null;

  const renderServiceConfiguration = () => {
    const commonProps = {
      isOpen,
      onClose,
      service,
      existingConfiguration,
      onSave,
      onProceedToCheckout,
    };

    switch (service.category) {
      case ServiceCategory.Cleaning:
        return <CleaningServiceConfiguration {...commonProps} />;
      case ServiceCategory.Cooking:
        return <CookingServiceConfiguration {...commonProps} />;
      case ServiceCategory.Laundry:
        return <LaundryServiceConfiguration {...commonProps} />;
      case ServiceCategory.PestControl:
        return <PestControlServiceConfiguration {...commonProps} />;
      default:
        // Fallback for any other service types
        return <LaundryServiceConfiguration {...commonProps} />;
    }
  };

  return renderServiceConfiguration();
};

export default ServiceConfigDrawer;