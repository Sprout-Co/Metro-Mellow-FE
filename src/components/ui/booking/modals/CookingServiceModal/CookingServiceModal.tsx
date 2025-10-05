"use client";

import React from "react";
import ServiceModal from "../ServiceModal/ServiceModal";
import { Service } from "@/graphql/api";
import { ServiceOption } from "@/graphql/api";

export interface MealOption {
  id: string;
  name: string;
  count: number;
}

export interface CookingServiceConfiguration {
  mealType?: "basic" | "standard" | "premium";
  deliveryFrequency?: "daily" | "weekly" | "monthly";
  meals?: MealOption[];
}

export interface CookingServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  includedFeatures?: string[];
  onOrderSubmit?: (configuration: CookingServiceConfiguration) => void;
  serviceOption?: ServiceOption;
  service: Service;
}

const CookingServiceModal: React.FC<CookingServiceModalProps> = (props) => {
  return <ServiceModal {...props} serviceType="cooking" />;
};

export default CookingServiceModal;