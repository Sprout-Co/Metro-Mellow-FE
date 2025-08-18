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

// Enhanced Service Data with features
const services: ServiceOption[] = [
  {
    id: "cleaning",
    name: "House Cleaning",
    icon: <Home size={24} />,
    basePrice: 15000,
    color: "#075056",
    description: "Professional home cleaning services",
    features: ["Deep cleaning", "Eco-friendly products", "Trained staff"],
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
    icon: <Droplets size={24} />,
    basePrice: 5000,
    color: "#6366f1",
    description: "Wash, dry, fold & iron services",
    features: ["Free pickup", "48hr delivery", "Premium detergents"],
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
    icon: <Utensils size={24} />,
    basePrice: 30000,
    color: "#fe5b04",
    description: "Fresh home-cooked meals",
    features: ["Custom menus", "Dietary options", "Fresh ingredients"],
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
    icon: <Bug size={24} />,
    basePrice: 20000,
    color: "#10b981",
    description: "Safe & effective pest management",
    features: ["Pet-safe chemicals", "Quarterly visits", "Guaranteed results"],
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
  { value: "daily", label: "Daily", multiplier: 30, description: "Every day" },
  {
    value: "weekly",
    label: "Weekly",
    multiplier: 4,
    description: "Once a week",
  },
  {
    value: "biweekly",
    label: "Bi-Weekly",
    multiplier: 2,
    description: "Every 2 weeks",
  },
  {
    value: "monthly",
    label: "Monthly",
    multiplier: 1,
    description: "Once a month",
  },
];

// Time Slots
const timeSlots = [
  { value: "08:00 AM", label: "Morning", time: "08:00 AM", icon: "☀️" },
  { value: "09:00 AM", label: "Morning", time: "09:00 AM", icon: "☀️" },
  { value: "10:00 AM", label: "Morning", time: "10:00 AM", icon: "☀️" },
  { value: "11:00 AM", label: "Morning", time: "11:00 AM", icon: "☀️" },
  { value: "12:00 PM", label: "Afternoon", time: "12:00 PM", icon: "🌤️" },
  { value: "01:00 PM", label: "Afternoon", time: "01:00 PM", icon: "🌤️" },
  { value: "02:00 PM", label: "Afternoon", time: "02:00 PM", icon: "🌤️" },
  { value: "03:00 PM", label: "Afternoon", time: "03:00 PM", icon: "🌤️" },
  { value: "04:00 PM", label: "Evening", time: "04:00 PM", icon: "🌅" },
  { value: "05:00 PM", label: "Evening", time: "05:00 PM", icon: "🌅" },
  { value: "06:00 PM", label: "Evening", time: "06:00 PM", icon: "🌅" },
];

// Days of Week
const daysOfWeek = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" },
];

// Step configurations
const steps = [
  { number: 1, label: "Services", icon: <ShoppingCart size={18} /> },
  { number: 2, label: "Configure", icon: <Settings size={18} /> },
  { number: 3, label: "Schedule", icon: <CalendarCheck size={18} /> },
  { number: 4, label: "Review", icon: <Receipt size={18} /> },
];

export default function AddSubscriptionMain() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentConfigService, setCurrentConfigService] =
    useState<ServiceOption | null>(null);

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

  // Calculate savings
  const monthlyRegularPrice = useMemo(() => {
    return totalPrice * 1.3; // 30% more without subscription
  }, [totalPrice]);

  const monthlySavings = monthlyRegularPrice - totalPrice;
  const savingsPercentage = Math.round(
    (monthlySavings / monthlyRegularPrice) * 100
  );

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

  // Edit service
  const editService = (serviceId: string) => {
    const service = selectedServices.find((s) => s.serviceId === serviceId);
    const serviceOption = services.find((s) => s.id === serviceId);
    if (service && serviceOption) {
      setEditingService(serviceId);
      setCurrentConfigService(serviceOption);
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

  const isStepComplete = (step: number) => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2)
      return selectedServices.every((s) => Object.keys(s.config).length > 0);
    if (step === 3)
      return selectedServices.every(
        (s) => s.schedule.days && s.schedule.days.length > 0
      );
    return false;
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
