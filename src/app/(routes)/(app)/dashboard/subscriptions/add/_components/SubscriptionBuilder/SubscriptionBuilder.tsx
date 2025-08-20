// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/SubscriptionBuilder.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react";
import styles from "./SubscriptionBuilder.module.scss";
import ServiceSelector from "./ServiceSelector/ServiceSelector";
import BillingConfiguration from "./BillingConfiguration/BillingConfiguration";
import SubscriptionSummary from "./SubscriptionSummary/SubscriptionSummary";
import ServiceConfigDrawer from "./ServiceConfigDrawer/ServiceConfigDrawer";
import ValidationErrors from "./components/ValidationErrors";
import {
  Service,
  ServiceCategory,
  ServiceStatus,
  BillingCycle,
  CreateSubscriptionInput,
  SubscriptionServiceInput,
} from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { Icon } from "@/components/ui/Icon/Icon";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import {
  validateSubscription,
  validateServiceConfiguration,
  validateBillingConfiguration,
  ValidationError,
} from "./validation";

export type DurationType = 1 | 2 | 3 | 6 | 12;

interface ConfiguredService {
  service: Service;
  configuration: SubscriptionServiceInput;
}

const SubscriptionBuilder: React.FC = () => {
  // State management
  const [currentView, setCurrentView] = useState<"builder" | "checkout">(
    "builder"
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    BillingCycle.Monthly
  );
  const [duration, setDuration] = useState<DurationType>(3);
  const [services, setServices] = useState<Service[]>([]);
  const [configuredServices, setConfiguredServices] = useState<
    ConfiguredService[]
  >([]);
  const [selectedServiceForConfig, setSelectedServiceForConfig] =
    useState<Service | null>(null);
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState<string | null>(null);
  
  // Validation state
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  
  const { handleGetServices } = useServiceOperations();

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      setServicesError(null);
      try {
        const apiServices = await handleGetServices(
          undefined,
          ServiceStatus.Active
        );
        if (apiServices) {
          setServices(apiServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesError(
          error instanceof Error ? error.message : "Failed to fetch services"
        );
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, [handleGetServices]);

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedServiceForConfig(service);
    setEditingServiceId(null);
    setIsConfigDrawerOpen(true);
  };

  // Handle service edit
  const handleServiceEdit = (serviceId: string) => {
    const configured = configuredServices.find(
      (cs) => cs.service._id === serviceId
    );
    if (configured) {
      setSelectedServiceForConfig(configured.service);
      setEditingServiceId(serviceId);
      setIsConfigDrawerOpen(true);
    }
  };

  // Handle service removal
  const handleServiceRemove = (serviceId: string) => {
    setConfiguredServices((prev) =>
      prev.filter((cs) => cs.service._id !== serviceId)
    );
  };

  // Handle service configuration save
  const handleServiceConfigSave = (configuration: SubscriptionServiceInput) => {
    if (!selectedServiceForConfig) return;

    // Validate the configuration before saving
    const validation = validateServiceConfiguration(configuration, selectedServiceForConfig);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setShowValidationErrors(true);
      return;
    }

    if (editingServiceId) {
      // Update existing configuration
      setConfiguredServices((prev) =>
        prev.map((cs) =>
          cs.service._id === editingServiceId ? { ...cs, configuration } : cs
        )
      );
    } else {
      // Add new configured service
      setConfiguredServices((prev) => [
        ...prev,
        {
          service: selectedServiceForConfig,
          configuration,
        },
      ]);
    }

    // Clear validation errors on successful save
    setValidationErrors([]);
    setShowValidationErrors(false);
    setIsConfigDrawerOpen(false);
    setSelectedServiceForConfig(null);
    setEditingServiceId(null);
  };

  // Calculate subscription total
  const calculateTotal = () => {
    const monthlyTotal = configuredServices.reduce(
      (sum, cs) => sum + (cs.configuration.price || 0),
      0
    );
    return monthlyTotal * duration;
  };

  // Validate checkout requirements
  const validateCheckout = (): boolean => {
    const validation = validateSubscription(configuredServices, billingCycle, duration);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setShowValidationErrors(true);
      return false;
    }
    setValidationErrors([]);
    setShowValidationErrors(false);
    return true;
  };

  // Handle checkout with validation
  const handleCheckout = () => {
    if (validateCheckout()) {
      setCurrentView("checkout");
    }
  };

  if (servicesLoading) {
    return (
      <div className={styles.builder__loading}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Icon name="loader" size={32} />
        </motion.div>
        <p>Loading services...</p>
      </div>
    );
  }

  if (servicesError) {
    return (
      <div className={styles.builder__error}>
        <Icon name="alert-circle" size={48} />
        <h3>Unable to load services</h3>
        <p>Please try again later</p>
      </div>
    );
  }

  if (currentView === "checkout") {
    return (
      <CheckoutSummary
        configuredServices={configuredServices}
        billingCycle={billingCycle}
        duration={duration}
        onBack={() => setCurrentView("builder")}
        onConfirmCheckout={() => {
          // Handle checkout completion
          console.log("Checkout completed");
        }}
      />
    );
  }

  return (
    <div className={styles.builder}>
      {/* Hero Section */}
      <div className={styles.builder__hero}>
        <motion.div
          className={styles.builder__heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.builder__badge}>
            <Sparkles size={16} />
            <span>Save up to 30% with subscriptions</span>
          </div>
          <h1 className={styles.builder__title}>
            Build Your Perfect Service Plan
          </h1>
          <p className={styles.builder__subtitle}>
            Combine multiple services into one convenient subscription
          </p>
        </motion.div>
      </div>

      {/* Validation Errors */}
      {showValidationErrors && validationErrors.length > 0 && (
        <ValidationErrors
          errors={validationErrors}
          onDismiss={() => setShowValidationErrors(false)}
        />
      )}

      {/* Main Content */}
      <div className={styles.builder__container}>
        <div className={styles.builder__main}>
          {/* Step 1: Billing Configuration */}
          <motion.section
            className={styles.builder__section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.builder__sectionHeader}>
              <div className={styles.builder__stepIndicator}>
                <span>1</span>
              </div>
              <div>
                <h2>Choose Your Billing Plan</h2>
                <p>Select how often you'd like to be billed</p>
              </div>
            </div>
            <BillingConfiguration
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              duration={duration}
              setDuration={setDuration}
            />
          </motion.section>

          {/* Step 2: Service Selection */}
          <motion.section
            className={styles.builder__section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.builder__sectionHeader}>
              <div className={styles.builder__stepIndicator}>
                <span>2</span>
              </div>
              <div>
                <h2>Select Your Services</h2>
                <p>Choose and configure the services you need</p>
              </div>
            </div>
            <ServiceSelector
              services={services}
              configuredServices={configuredServices}
              onServiceSelect={handleServiceSelect}
              onServiceEdit={handleServiceEdit}
              onServiceRemove={handleServiceRemove}
            />
          </motion.section>
        </div>

        {/* Sticky Summary Sidebar */}
        <div className={styles.builder__sidebar}>
          <SubscriptionSummary
            configuredServices={configuredServices}
            billingCycle={billingCycle}
            duration={duration}
            total={calculateTotal()}
            onServiceEdit={handleServiceEdit}
            onServiceRemove={handleServiceRemove}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Service Configuration Drawer */}
      <ServiceConfigDrawer
        isOpen={isConfigDrawerOpen}
        onClose={() => {
          setIsConfigDrawerOpen(false);
          setSelectedServiceForConfig(null);
          setEditingServiceId(null);
        }}
        service={selectedServiceForConfig}
        existingConfiguration={
          editingServiceId
            ? configuredServices.find(
                (cs) => cs.service._id === editingServiceId
              )?.configuration
            : undefined
        }
        onSave={handleServiceConfigSave}
      />
    </div>
  );
};

export default SubscriptionBuilder;
