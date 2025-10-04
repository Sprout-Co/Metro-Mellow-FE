"use client";

import React from "react";
import ServiceModal from "../ServiceModal/ServiceModal";
import { Service } from "@/graphql/api";
import { ServiceOption } from "@/graphql/api";

export interface LaundryServiceConfiguration {
  laundryType?: any;
  bags?: number;
  items?: any;
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

const LaundryServiceModal: React.FC<LaundryServiceModalProps> = (props) => {
  return <ServiceModal {...props} serviceType="laundry" />;
};

export default LaundryServiceModal;
