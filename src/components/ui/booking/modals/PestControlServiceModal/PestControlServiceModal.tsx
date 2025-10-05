"use client";

import React from "react";
import ServiceModal from "../ServiceModal/ServiceModal";
import { Service } from "@/graphql/api";
import { ServiceOption } from "@/graphql/api";

export interface TreatmentArea {
  id: string;
  name: string;
  selected: boolean;
}

export interface PestControlServiceConfiguration {
  treatmentType?: any;
  severity?: any;
  areas?: TreatmentArea[];
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

const PestControlServiceModal: React.FC<PestControlServiceModalProps> = (props) => {
  return <ServiceModal {...props} serviceType="pest-control" />;
};

export default PestControlServiceModal;
