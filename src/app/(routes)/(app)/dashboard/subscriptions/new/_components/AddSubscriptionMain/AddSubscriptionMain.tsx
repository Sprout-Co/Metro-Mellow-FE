"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Droplets,
  Utensils,
  Bug,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Edit2,
  CreditCard,
  Sparkles,
  Clock,
  ShoppingCart,
  ArrowRight,
  Settings,
  CalendarCheck,
  Receipt,
  Plus,
  Info,
} from "lucide-react";
import styles from "./AddSubscriptionMain.module.scss";
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";
import FnButton from "@/components/ui/Button/FnButton";
import DashboardHeader from "../../../../_components/DashboardHeader/DashboardHeader";

// Service Types
interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  color: string;
  description: string;
  features: string[];
  configOptions: ConfigOption[];
}

interface ConfigOption {
  id: string;
  label: string;
  type: "select" | "number" | "checkbox" | "radio";
  options?: { value: string; label: string; price?: number }[];
  min?: number;
  max?: number;
  unit?: string;
  priceMultiplier?: number;
}

interface SelectedService {
  serviceId: string;
  config: Record<string, any>;
  schedule: {
    frequency: string;
    days?: string[];
    time?: string;
  };
  price: number;
}

export default function AddSubscriptionMain() {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentConfigService, setCurrentConfigService] =
    useState<ServiceOption | null>(null);

  // Calculate service price based on config
  const calculateServicePrice = (
    service: ServiceOption,
    config: Record<string, any>
  ) => {
    let price = service.basePrice;

    service.configOptions.forEach((option) => {
      const value = config[option.id];
      if (!value) return;

      if (option.type === "radio") {
        const selected = option.options?.find((o) => o.value === value);
        if (selected?.price) price += selected.price;
      } else if (option.type === "number" && option.priceMultiplier) {
        price += (value - 1) * option.priceMultiplier;
      } else if (option.type === "checkbox" && Array.isArray(value)) {
        value.forEach((v) => {
          const selected = option.options?.find((o) => o.value === v);
          if (selected?.price) price += selected.price;
        });
      }
    });

    return Math.max(0, price);
  };

  // Save service configuration
  const saveServiceConfig = (config: Record<string, any>) => {
    if (!currentConfigService) return;

    const price = calculateServicePrice(currentConfigService, config);
    const newService: SelectedService = {
      serviceId: currentConfigService.id,
      config: config,
      schedule: {
        frequency: "weekly",
        days: ["Mon"],
        time: "09:00 AM",
      },
      price,
    };

    if (editingService) {
      setSelectedServices((prev) =>
        prev.map((s) => (s.serviceId === editingService ? newService : s))
      );
      setEditingService(null);
    } else {
      setSelectedServices((prev) => [...prev, newService]);
    }

    setShowConfigModal(false);
    setCurrentConfigService(null);
  };

  return (
    <div className={styles.addSubscriptionMain}>
      <div className={styles.addSubscriptionMain__wrapper}>
        <DashboardHeader
          title="Create Your Perfect Subscription"
          subtitle="Save up to 30% by bundling services into a convenient monthly plan"
        />
      </div>

      <ConfigurationModal
        isOpen={showConfigModal}
        service={currentConfigService}
        initialConfig={
          editingService && currentConfigService
            ? selectedServices.find((s) => s.serviceId === editingService)
                ?.config || {}
            : {}
        }
        onClose={() => setShowConfigModal(false)}
        onSave={saveServiceConfig}
        calculateServicePrice={calculateServicePrice as any}
      />
    </div>
  );
}
