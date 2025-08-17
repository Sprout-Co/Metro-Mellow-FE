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
  Plus,
  Minus,
  X,
  CreditCard,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// Service Types
interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  color: string;
  description: string;
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

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fbfbfb",
    padding: "2rem 1rem",
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1b1c22",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-baloo2), sans-serif",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#6e6e6e",
    fontFamily: "var(--font-montserrat), sans-serif",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginBottom: "3rem",
    flexWrap: "wrap" as const,
  },
  progressStep: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    position: "relative" as const,
  },
  progressNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    color: "#6e6e6e",
    fontWeight: "bold",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
  },
  progressNumberActive: {
    backgroundColor: "#075056",
    color: "white",
    boxShadow: "0 4px 12px rgba(7, 80, 86, 0.3)",
  },
  progressNumberCompleted: {
    backgroundColor: "#059669",
    color: "white",
  },
  progressLabel: {
    fontSize: "0.875rem",
    color: "#6e6e6e",
    fontWeight: "500",
  },
  content: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    minHeight: "400px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  stepHeader: {
    marginBottom: "2rem",
  },
  stepTitle: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "#1b1c22",
    marginBottom: "0.5rem",
  },
  stepDescription: {
    fontSize: "1rem",
    color: "#6e6e6e",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  serviceCard: {
    backgroundColor: "white",
    border: "2px solid #f1f1f1",
    borderRadius: "1rem",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative" as const,
  },
  serviceCardSelected: {
    borderColor: "#075056",
    backgroundColor: "rgba(7, 80, 86, 0.02)",
  },
  serviceIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  serviceTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1b1c22",
    marginBottom: "0.5rem",
  },
  serviceDescription: {
    fontSize: "0.875rem",
    color: "#6e6e6e",
    marginBottom: "1rem",
  },
  servicePrice: {
    fontSize: "0.875rem",
    color: "#075056",
    fontWeight: "600",
  },
  selectedBadge: {
    position: "absolute" as const,
    top: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    backgroundColor: "#059669",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "1rem",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    padding: "1.5rem 2rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
  },
  button: {
    padding: "0.75rem 1.5rem",
    borderRadius: "2rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    border: "none",
    fontSize: "1rem",
  },
  buttonPrimary: {
    backgroundColor: "#075056",
    color: "white",
  },
  buttonGhost: {
    backgroundColor: "transparent",
    color: "#6e6e6e",
    border: "1px solid #f1f1f1",
  },
  buttonAccent: {
    backgroundColor: "#fe5b04",
    color: "white",
  },
  footerPrice: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#1b1c22",
  },
  modal: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "1rem",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "1rem",
    maxWidth: "600px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
    borderBottom: "1px solid #f1f1f1",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1b1c22",
  },
  modalBody: {
    padding: "1.5rem",
  },
  configField: {
    marginBottom: "1.5rem",
  },
  configLabel: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#343439",
    marginBottom: "0.5rem",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    transition: "background 0.2s",
  },
  numberInput: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  numberButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "1px solid #f1f1f1",
    backgroundColor: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  priceModifier: {
    marginLeft: "auto",
    fontSize: "0.75rem",
    color: "#fe5b04",
    fontWeight: "600",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
    borderTop: "1px solid #f1f1f1",
  },
  configuredService: {
    backgroundColor: "#fbfbfb",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  configuredHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  configuredInfo: {
    flex: 1,
  },
  configuredTitle: {
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#1b1c22",
  },
  configuredPrice: {
    fontSize: "0.875rem",
    color: "#075056",
    fontWeight: "600",
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    border: "1px solid #f1f1f1",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "#6e6e6e",
    transition: "all 0.2s",
  },
  configuredDetails: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  configuredDetail: {
    display: "flex",
    gap: "0.5rem",
    fontSize: "0.875rem",
  },
  detailLabel: {
    color: "#6e6e6e",
  },
  detailValue: {
    color: "#1b1c22",
    fontWeight: "500",
  },
  scheduleService: {
    backgroundColor: "#fbfbfb",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  scheduleHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  scheduleOptions: {
    display: "grid",
    gap: "1rem",
  },
  scheduleField: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  scheduleDays: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
  },
  dayButton: {
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #f1f1f1",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "all 0.2s",
  },
  dayButtonSelected: {
    backgroundColor: "#075056",
    color: "white",
    borderColor: "#075056",
  },
  select: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #f1f1f1",
    backgroundColor: "white",
    fontSize: "0.875rem",
    cursor: "pointer",
  },
  invoice: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    border: "1px solid #f1f1f1",
  },
  invoiceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #f1f1f1",
  },
  invoiceTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1b1c22",
  },
  invoiceServices: {
    marginBottom: "2rem",
  },
  invoiceService: {
    padding: "1rem 0",
    borderBottom: "1px solid #f8f8f8",
  },
  invoiceServiceHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  invoiceServiceInfo: {
    flex: 1,
  },
  invoiceServiceName: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1b1c22",
    marginBottom: "0.25rem",
  },
  invoiceServiceSchedule: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: "#6e6e6e",
  },
  invoiceServicePrice: {
    textAlign: "right" as const,
  },
  invoiceTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  invoiceSavings: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#059669",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  benefitsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
    marginTop: "1rem",
  },
  benefit: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#343439",
    fontSize: "0.875rem",
  },
};

// Mock Service Data
const services: ServiceOption[] = [
  {
    id: "cleaning",
    name: "House Cleaning",
    icon: <Home />,
    basePrice: 15000,
    color: "#075056",
    description: "Professional home cleaning services",
    configOptions: [
      {
        id: "type",
        label: "Cleaning Type",
        type: "radio",
        options: [
          { value: "regular", label: "Regular Cleaning", price: 0 },
          { value: "deep", label: "Deep Cleaning", price: 10000 },
          { value: "moveout", label: "Move-in/out", price: 20000 },
        ],
      },
      {
        id: "rooms",
        label: "Number of Rooms",
        type: "number",
        min: 1,
        max: 10,
        priceMultiplier: 2000,
      },
      {
        id: "extras",
        label: "Add-ons",
        type: "checkbox",
        options: [
          { value: "windows", label: "Window Cleaning", price: 3000 },
          { value: "fridge", label: "Fridge Cleaning", price: 2000 },
          { value: "oven", label: "Oven Cleaning", price: 2500 },
        ],
      },
    ],
  },
  {
    id: "laundry",
    name: "Laundry Service",
    icon: <Droplets />,
    basePrice: 5000,
    color: "#6366f1",
    description: "Wash, dry, fold & iron services",
    configOptions: [
      {
        id: "type",
        label: "Service Type",
        type: "radio",
        options: [
          { value: "washfold", label: "Wash & Fold", price: 0 },
          { value: "dryclean", label: "Dry Cleaning", price: 3000 },
          { value: "iron", label: "Ironing Only", price: -2000 },
        ],
      },
      {
        id: "bags",
        label: "Number of Bags",
        type: "number",
        min: 1,
        max: 5,
        priceMultiplier: 5000,
      },
    ],
  },
  {
    id: "cooking",
    name: "Meal Preparation",
    icon: <Utensils />,
    basePrice: 30000,
    color: "#fe5b04",
    description: "Fresh home-cooked meals",
    configOptions: [
      {
        id: "mealPlan",
        label: "Meal Plan",
        type: "radio",
        options: [
          { value: "breakfast", label: "Breakfast Only", price: -20000 },
          { value: "lunch", label: "Lunch Only", price: -15000 },
          { value: "dinner", label: "Dinner Only", price: -10000 },
          { value: "all", label: "All Meals", price: 0 },
        ],
      },
      {
        id: "people",
        label: "Number of People",
        type: "number",
        min: 1,
        max: 8,
        priceMultiplier: 5000,
      },
    ],
  },
  {
    id: "pest",
    name: "Pest Control",
    icon: <Bug />,
    basePrice: 20000,
    color: "#10b981",
    description: "Safe & effective pest management",
    configOptions: [
      {
        id: "treatment",
        label: "Treatment Type",
        type: "radio",
        options: [
          { value: "prevention", label: "Prevention", price: 0 },
          { value: "treatment", label: "Active Treatment", price: 10000 },
          { value: "inspection", label: "Inspection Only", price: -10000 },
        ],
      },
    ],
  },
];

// Frequency Options
const frequencyOptions = [
  { value: "daily", label: "Daily", multiplier: 30 },
  { value: "weekly", label: "Weekly", multiplier: 4 },
  { value: "biweekly", label: "Bi-Weekly", multiplier: 2 },
  { value: "monthly", label: "Monthly", multiplier: 1 },
];

// Time Slots
const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

// Days of Week
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SubscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentConfigService, setCurrentConfigService] =
    useState<ServiceOption | null>(null);
  const [tempConfig, setTempConfig] = useState<Record<string, any>>({});

  // Calculate total price
  const totalPrice = useMemo(() => {
    return selectedServices.reduce((total, service) => {
      const frequency = frequencyOptions.find(
        (f) => f.value === service.schedule.frequency
      );
      const multiplier = frequency?.multiplier || 1;
      return total + service.price * multiplier;
    }, 0);
  }, [selectedServices]);

  // Toggle Service Selection
  const toggleService = (serviceId: string) => {
    const exists = selectedServices.find((s) => s.serviceId === serviceId);
    if (exists) {
      setSelectedServices((prev) =>
        prev.filter((s) => s.serviceId !== serviceId)
      );
    } else {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setCurrentConfigService(service);
        setTempConfig({});
        setShowConfigModal(true);
      }
    }
  };

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
  const saveServiceConfig = () => {
    if (!currentConfigService) return;

    const price = calculateServicePrice(currentConfigService, tempConfig);
    const newService: SelectedService = {
      serviceId: currentConfigService.id,
      config: tempConfig,
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
    setTempConfig({});
  };

  // Edit service
  const editService = (serviceId: string) => {
    const service = selectedServices.find((s) => s.serviceId === serviceId);
    const serviceOption = services.find((s) => s.id === serviceId);
    if (service && serviceOption) {
      setEditingService(serviceId);
      setCurrentConfigService(serviceOption);
      setTempConfig(service.config);
      setShowConfigModal(true);
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) return;
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Create Your Subscription</h1>
          <p style={styles.subtitle}>
            Bundle multiple services into one convenient monthly plan
          </p>
        </div>

        {/* Progress Indicator */}
        <div style={styles.progress}>
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              style={styles.progressStep}
              onClick={() => step <= currentStep && setCurrentStep(step)}
            >
              <div
                style={{
                  ...styles.progressNumber,
                  ...(step === currentStep ? styles.progressNumberActive : {}),
                  ...(step < currentStep ? styles.progressNumberCompleted : {}),
                }}
              >
                {step < currentStep ? <Check size={16} /> : step}
              </div>
              <span style={styles.progressLabel}>
                {step === 1
                  ? "Services"
                  : step === 2
                    ? "Configure"
                    : step === 3
                      ? "Schedule"
                      : "Review"}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={styles.content}>
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Services */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={styles.stepHeader}>
                  <h2 style={styles.stepTitle}>Choose Your Services</h2>
                  <p style={styles.stepDescription}>
                    Select the services you'd like to include in your
                    subscription
                  </p>
                </div>

                <div style={styles.servicesGrid}>
                  {services.map((service) => {
                    const isSelected = selectedServices.some(
                      (s) => s.serviceId === service.id
                    );

                    return (
                      <motion.div
                        key={service.id}
                        style={{
                          ...styles.serviceCard,
                          ...(isSelected ? styles.serviceCardSelected : {}),
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleService(service.id)}
                      >
                        <div
                          style={{
                            ...styles.serviceIcon,
                            backgroundColor: `${service.color}15`,
                            color: service.color,
                          }}
                        >
                          {service.icon}
                        </div>
                        <h3 style={styles.serviceTitle}>{service.name}</h3>
                        <p style={styles.serviceDescription}>
                          {service.description}
                        </p>
                        <div style={styles.servicePrice}>
                          Starting from ₦{service.basePrice.toLocaleString()}
                          /month
                        </div>
                        {isSelected && (
                          <div style={styles.selectedBadge}>
                            <CheckCircle size={16} />
                            Selected
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Configure Services */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={styles.stepHeader}>
                  <h2 style={styles.stepTitle}>Configure Your Services</h2>
                  <p style={styles.stepDescription}>
                    Customize each service to match your needs
                  </p>
                </div>

                {selectedServices.map((selected) => {
                  const service = services.find(
                    (s) => s.id === selected.serviceId
                  );
                  if (!service) return null;

                  return (
                    <div
                      key={selected.serviceId}
                      style={styles.configuredService}
                    >
                      <div style={styles.configuredHeader}>
                        <div
                          style={{
                            ...styles.serviceIcon,
                            backgroundColor: `${service.color}15`,
                            color: service.color,
                            width: "48px",
                            height: "48px",
                          }}
                        >
                          {service.icon}
                        </div>
                        <div style={styles.configuredInfo}>
                          <h3 style={styles.configuredTitle}>{service.name}</h3>
                          <div style={styles.configuredPrice}>
                            ₦{selected.price.toLocaleString()}/month
                          </div>
                        </div>
                        <button
                          style={styles.editButton}
                          onClick={() => editService(selected.serviceId)}
                        >
                          <Edit2 size={18} />
                          Edit
                        </button>
                      </div>

                      <div style={styles.configuredDetails}>
                        {Object.entries(selected.config).map(([key, value]) => {
                          const option = service.configOptions.find(
                            (o) => o.id === key
                          );
                          if (!option) return null;

                          let displayValue = value;
                          if (option.type === "radio") {
                            displayValue =
                              option.options?.find((o) => o.value === value)
                                ?.label || value;
                          } else if (Array.isArray(value)) {
                            displayValue = value
                              .map(
                                (v) =>
                                  option.options?.find((o) => o.value === v)
                                    ?.label || v
                              )
                              .join(", ");
                          }

                          return (
                            <div key={key} style={styles.configuredDetail}>
                              <span style={styles.detailLabel}>
                                {option.label}:
                              </span>
                              <span style={styles.detailValue}>
                                {displayValue}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Step 3: Schedule Services */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={styles.stepHeader}>
                  <h2 style={styles.stepTitle}>Set Your Schedule</h2>
                  <p style={styles.stepDescription}>
                    Choose when you'd like each service to be performed
                  </p>
                </div>

                {selectedServices.map((selected) => {
                  const service = services.find(
                    (s) => s.id === selected.serviceId
                  );
                  if (!service) return null;

                  return (
                    <div
                      key={selected.serviceId}
                      style={styles.scheduleService}
                    >
                      <div style={styles.scheduleHeader}>
                        <div
                          style={{
                            ...styles.serviceIcon,
                            backgroundColor: `${service.color}15`,
                            color: service.color,
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          {service.icon}
                        </div>
                        <h3 style={styles.configuredTitle}>{service.name}</h3>
                      </div>

                      <div style={styles.scheduleOptions}>
                        <div style={styles.scheduleField}>
                          <label style={styles.configLabel}>Frequency</label>
                          <select
                            style={styles.select}
                            value={selected.schedule.frequency}
                            onChange={(e) => {
                              setSelectedServices((prev) =>
                                prev.map((s) =>
                                  s.serviceId === selected.serviceId
                                    ? {
                                        ...s,
                                        schedule: {
                                          ...s.schedule,
                                          frequency: e.target.value,
                                        },
                                      }
                                    : s
                                )
                              );
                            }}
                          >
                            {frequencyOptions.map((freq) => (
                              <option key={freq.value} value={freq.value}>
                                {freq.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.scheduleField}>
                          <label style={styles.configLabel}>
                            Preferred Days
                          </label>
                          <div style={styles.scheduleDays}>
                            {daysOfWeek.map((day) => (
                              <button
                                key={day}
                                style={{
                                  ...styles.dayButton,
                                  ...(selected.schedule.days?.includes(day)
                                    ? styles.dayButtonSelected
                                    : {}),
                                }}
                                onClick={() => {
                                  setSelectedServices((prev) =>
                                    prev.map((s) => {
                                      if (s.serviceId !== selected.serviceId)
                                        return s;
                                      const days = s.schedule.days || [];
                                      const newDays = days.includes(day)
                                        ? days.filter((d) => d !== day)
                                        : [...days, day];
                                      return {
                                        ...s,
                                        schedule: {
                                          ...s.schedule,
                                          days: newDays,
                                        },
                                      };
                                    })
                                  );
                                }}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div style={styles.scheduleField}>
                          <label style={styles.configLabel}>
                            Preferred Time
                          </label>
                          <select
                            style={styles.select}
                            value={selected.schedule.time}
                            onChange={(e) => {
                              setSelectedServices((prev) =>
                                prev.map((s) =>
                                  s.serviceId === selected.serviceId
                                    ? {
                                        ...s,
                                        schedule: {
                                          ...s.schedule,
                                          time: e.target.value,
                                        },
                                      }
                                    : s
                                )
                              );
                            }}
                          >
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={styles.stepHeader}>
                  <h2 style={styles.stepTitle}>Review Your Subscription</h2>
                  <p style={styles.stepDescription}>
                    Confirm your selections and proceed to checkout
                  </p>
                </div>

                <div style={styles.invoice}>
                  <div style={styles.invoiceHeader}>
                    <h3 style={styles.invoiceTitle}>Subscription Summary</h3>
                    <div>Starting: {new Date().toLocaleDateString()}</div>
                  </div>

                  <div style={styles.invoiceServices}>
                    {selectedServices.map((selected) => {
                      const service = services.find(
                        (s) => s.id === selected.serviceId
                      );
                      if (!service) return null;
                      const frequency = frequencyOptions.find(
                        (f) => f.value === selected.schedule.frequency
                      );

                      return (
                        <div
                          key={selected.serviceId}
                          style={styles.invoiceService}
                        >
                          <div style={styles.invoiceServiceHeader}>
                            <div
                              style={{
                                ...styles.serviceIcon,
                                backgroundColor: `${service.color}15`,
                                color: service.color,
                                width: "40px",
                                height: "40px",
                              }}
                            >
                              {service.icon}
                            </div>
                            <div style={styles.invoiceServiceInfo}>
                              <h4 style={styles.invoiceServiceName}>
                                {service.name}
                              </h4>
                              <div style={styles.invoiceServiceSchedule}>
                                <Calendar size={14} />
                                {frequency?.label} •{" "}
                                {selected.schedule.days?.join(", ")} •{" "}
                                {selected.schedule.time}
                              </div>
                            </div>
                            <div style={styles.invoiceServicePrice}>
                              <div>
                                ₦{selected.price.toLocaleString()} ×{" "}
                                {frequency?.multiplier}
                              </div>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  marginTop: "0.25rem",
                                }}
                              >
                                ₦
                                {(
                                  selected.price * (frequency?.multiplier || 1)
                                ).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <div style={styles.invoiceTotal}>
                      <span>Total Monthly Cost</span>
                      <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <div style={styles.invoiceSavings}>
                      <TrendingUp size={16} />
                      You save 30% with subscription!
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>
                    Subscription Benefits
                  </h3>
                  <div style={styles.benefitsList}>
                    {[
                      "30% savings on all services",
                      "Priority scheduling",
                      "Dedicated service team",
                      "Flexible rescheduling",
                      "Cancel anytime",
                    ].map((benefit) => (
                      <div key={benefit} style={styles.benefit}>
                        <CheckCircle size={20} color="#059669" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div style={styles.footer}>
          <button
            style={{
              ...styles.button,
              ...styles.buttonGhost,
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? "not-allowed" : "pointer",
            }}
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div>
            {currentStep < 4 && selectedServices.length > 0 && (
              <div style={styles.footerPrice}>
                Total: ₦{totalPrice.toLocaleString()}/month
              </div>
            )}
          </div>

          {currentStep < 4 ? (
            <button
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                opacity:
                  currentStep === 1 && selectedServices.length === 0 ? 0.5 : 1,
                cursor:
                  currentStep === 1 && selectedServices.length === 0
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={nextStep}
              disabled={currentStep === 1 && selectedServices.length === 0}
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              style={{
                ...styles.button,
                ...styles.buttonAccent,
              }}
              onClick={() => console.log("Proceed to checkout")}
            >
              <CreditCard size={20} />
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && currentConfigService && (
          <motion.div
            style={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  Configure {currentConfigService.name}
                </h2>
                <button
                  onClick={() => setShowConfigModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={styles.modalBody}>
                {currentConfigService.configOptions.map((option) => (
                  <div key={option.id} style={styles.configField}>
                    <label style={styles.configLabel}>{option.label}</label>

                    {option.type === "radio" && (
                      <div style={styles.radioGroup}>
                        {option.options?.map((opt) => (
                          <label key={opt.value} style={styles.radioLabel}>
                            <input
                              type="radio"
                              name={option.id}
                              value={opt.value}
                              checked={tempConfig[option.id] === opt.value}
                              onChange={(e) =>
                                setTempConfig((prev) => ({
                                  ...prev,
                                  [option.id]: e.target.value,
                                }))
                              }
                            />
                            <span>{opt.label}</span>
                            {opt.price !== undefined && opt.price !== 0 && (
                              <span style={styles.priceModifier}>
                                {opt.price > 0 ? "+" : ""}₦
                                {opt.price.toLocaleString()}
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    )}

                    {option.type === "number" && (
                      <div style={styles.numberInput}>
                        <button
                          style={styles.numberButton}
                          onClick={() =>
                            setTempConfig((prev) => ({
                              ...prev,
                              [option.id]: Math.max(
                                option.min || 1,
                                (prev[option.id] || option.min || 1) - 1
                              ),
                            }))
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={tempConfig[option.id] || option.min || 1}
                          onChange={(e) =>
                            setTempConfig((prev) => ({
                              ...prev,
                              [option.id]:
                                parseInt(e.target.value) || option.min || 1,
                            }))
                          }
                          min={option.min}
                          max={option.max}
                          style={{
                            width: "60px",
                            textAlign: "center" as const,
                            padding: "0.5rem",
                            border: "1px solid #f1f1f1",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <button
                          style={styles.numberButton}
                          onClick={() =>
                            setTempConfig((prev) => ({
                              ...prev,
                              [option.id]: Math.min(
                                option.max || 10,
                                (prev[option.id] || option.min || 1) + 1
                              ),
                            }))
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}

                    {option.type === "checkbox" && (
                      <div style={styles.checkboxGroup}>
                        {option.options?.map((opt) => (
                          <label key={opt.value} style={styles.radioLabel}>
                            <input
                              type="checkbox"
                              value={opt.value}
                              checked={(tempConfig[option.id] || []).includes(
                                opt.value
                              )}
                              onChange={(e) => {
                                const values = tempConfig[option.id] || [];
                                if (e.target.checked) {
                                  setTempConfig((prev) => ({
                                    ...prev,
                                    [option.id]: [...values, opt.value],
                                  }));
                                } else {
                                  setTempConfig((prev) => ({
                                    ...prev,
                                    [option.id]: values.filter(
                                      (v: string) => v !== opt.value
                                    ),
                                  }));
                                }
                              }}
                            />
                            <span>{opt.label}</span>
                            {opt.price !== undefined && opt.price !== 0 && (
                              <span style={styles.priceModifier}>
                                {opt.price > 0 ? "+" : ""}₦
                                {opt.price.toLocaleString()}
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "2rem",
                    padding: "1rem",
                    backgroundColor: "#fbfbfb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>Service Price</span>
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#075056",
                    }}
                  >
                    ₦
                    {calculateServicePrice(
                      currentConfigService,
                      tempConfig
                    ).toLocaleString()}
                    /month
                  </span>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  style={{ ...styles.button, ...styles.buttonGhost }}
                  onClick={() => setShowConfigModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  onClick={saveServiceConfig}
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
