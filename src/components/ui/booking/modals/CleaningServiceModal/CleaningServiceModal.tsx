"use client";

import React from "react";
import ServiceModal from "../ServiceModal/ServiceModal";
import { Service } from "@/graphql/api";
import { ServiceOption } from "@/graphql/api";

export interface CleaningServiceConfiguration {
  apartmentType?: any;
  roomQuantities?: any;
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
  serviceOption?: ServiceOption;
  service: Service;
}

const CleaningServiceModal: React.FC<CleaningServiceModalProps> = (props) => {
  return <ServiceModal {...props} serviceType="cleaning" />;
};

export default CleaningServiceModal;
