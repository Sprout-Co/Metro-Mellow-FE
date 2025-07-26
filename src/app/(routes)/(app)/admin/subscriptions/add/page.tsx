"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { useCustomerOperations } from "@/graphql/hooks/customers/useCustomerOperations";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import {
  User,
  Service,
  BillingCycle,
  SubscriptionFrequency,
  TimeSlot,
  ScheduleDays,
  ServiceCategory,
  CreateSubscriptionInput,
  SubscriptionServiceInput,
  Address,
  ServiceStatus,
} from "@/graphql/api";
import { ServiceConfiguration } from "@/app/(routes)/(app)/admin/subscriptions/add/types/subscription";
import CustomerSelectionSection from "./_components/CustomerSelectionSection/CustomerSelectionSection";
import ServiceConfigurationSection from "./_components/ServiceConfigurationSection/ServiceConfigurationSection";
import BillingScheduleSection from "./_components/BillingScheduleSection/BillingScheduleSection";
import FormActions from "./_components/FormActions/FormActions";
import ErrorDisplay from "./_components/ErrorDisplay/ErrorDisplay";
import styles from "./AddSubscriptionPage.module.scss";

export default function AddSubscriptionPage() {
  const router = useRouter();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Customer selection state
  const [customers, setCustomers] = useState<User[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  // Service configuration state
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );
  const [serviceConfigurations, setServiceConfigurations] = useState<
    Map<string, ServiceConfiguration>
  >(new Map());

  // Billing and scheduling state
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    BillingCycle.Monthly
  );
  const [duration, setDuration] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Hooks
  const { handleGetCustomers } = useCustomerOperations();
  const { handleGetServices } = useServiceOperations();
  const { handleCreateSubscription } = useSubscriptionOperations();

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const apiCustomers = await handleGetCustomers();
        if (apiCustomers) {
          setCustomers(apiCustomers);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Failed to load customers");
      }
    };

    fetchCustomers();
  }, [handleGetCustomers]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
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
        setError("Failed to load services");
      }
    };

    fetchServices();
  }, [handleGetServices]);

  // Update addresses when customer changes
  useEffect(() => {
    if (selectedCustomerId) {
      const selectedCustomer = customers.find(
        (c) => c.id === selectedCustomerId
      );
      if (selectedCustomer?.addresses) {
        const validAddresses = selectedCustomer.addresses.filter(
          (addr): addr is Address => addr !== null
        );
        setAddresses(validAddresses);
        setSelectedAddressId(validAddresses[0]?.id || "");
      }
    }
  }, [selectedCustomerId, customers]);

  // Handle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
        // Remove configuration when service is deselected
        setServiceConfigurations((prevConfig) => {
          const newConfig = new Map(prevConfig);
          newConfig.delete(serviceId);
          return newConfig;
        });
      } else {
        newSet.add(serviceId);
        // Add default configuration when service is selected
        const service = services.find((s) => s._id === serviceId);
        if (service) {
          setServiceConfigurations((prevConfig) => {
            const newConfig = new Map(prevConfig);
            // Use the first option's price if available, otherwise use base service price
            const defaultOption =
              service.options && service.options.length > 0
                ? service.options[0]
                : null;
            const defaultPrice = defaultOption
              ? defaultOption.price
              : service.price || 0;

            newConfig.set(serviceId, {
              serviceId,
              price: defaultPrice,
              frequency: SubscriptionFrequency.Weekly,
              scheduledDays: [ScheduleDays.Monday],
              preferredTimeSlot: TimeSlot.Morning,
              serviceDetails: defaultOption
                ? {
                    optionId: defaultOption.id,
                    optionLabel: defaultOption.label,
                    optionPrice: defaultOption.price,
                  }
                : {},
              category: service.category,
              selectedOption: defaultOption ? defaultOption.id : undefined,
            });
            return newConfig;
          });
        }
      }
      return newSet;
    });
  };

  // Update service configuration
  const updateServiceConfiguration = (
    serviceId: string,
    config: Partial<ServiceConfiguration>
  ) => {
    setServiceConfigurations((prev) => {
      const newConfig = new Map(prev);
      const existing = newConfig.get(serviceId);
      if (existing) {
        newConfig.set(serviceId, { ...existing, ...config });
      }
      return newConfig;
    });
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation functions
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return selectedCustomerId !== "" && selectedAddressId !== "";
      case 2:
        return selectedServices.size > 0;
      case 3:
        return startDate !== "" && duration > 0;
      default:
        return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedCustomer = customers.find(
        (c) => c.id === selectedCustomerId
      );
      const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

      if (!selectedCustomer || !selectedAddress) {
        throw new Error("Customer or address not found");
      }

      const subscriptionServices: SubscriptionServiceInput[] = Array.from(
        selectedServices
      ).map((serviceId) => {
        const config = serviceConfigurations.get(serviceId);
        const service = services.find((s) => s._id === serviceId);

        if (!config || !service) {
          throw new Error(`Configuration not found for service ${serviceId}`);
        }

        return {
          serviceId,
          category: service.category,
          price: config.price,
          frequency: config.frequency,
          scheduledDays: config.scheduledDays,
          preferredTimeSlot: config.preferredTimeSlot,
          serviceDetails: config.serviceDetails,
        };
      });

      const subscriptionInput: CreateSubscriptionInput = {
        address: selectedAddressId,
        autoRenew: true,
        services: subscriptionServices,
        billingCycle,
        duration,
        startDate,
      };

      const result = await handleCreateSubscription(subscriptionInput);

      if (result) {
        // Redirect to subscriptions list with success message
        router.push("/admin/subscriptions?success=true");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create subscription"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Loading states
  if (customers.length === 0 && services.length === 0) {
    return (
      <AdminDashboardLayout
        title="Create Subscription"
        breadcrumbs={[
          { label: "Admin", path: "/admin" },
          { label: "Subscriptions", path: "/admin/subscriptions" },
          { label: "Create", path: "/admin/subscriptions/add" },
        ]}
      >
        <div className={styles.loading}>
          <div className={styles.loading__spinner}></div>
          <p>Loading...</p>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout
      title="Create Subscription"
      breadcrumbs={[
        { label: "Admin", path: "/admin" },
        { label: "Subscriptions", path: "/admin/subscriptions" },
        { label: "Create", path: "/admin/subscriptions/add" },
      ]}
    >
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Progress indicator */}
        <motion.div variants={itemVariants} className={styles.progress}>
          <div className={styles.progress__steps}>
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`${styles.progress__step} ${
                  currentStep >= step ? styles["progress__step--active"] : ""
                }`}
              >
                <div className={styles.progress__step_number}>{step}</div>
                <div className={styles.progress__step_label}>
                  {step === 1 && "Customer Selection"}
                  {step === 2 && "Service Configuration"}
                  {step === 3 && "Billing & Schedule"}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Error display */}
        {error && (
          <motion.div variants={itemVariants}>
            <ErrorDisplay error={error} onRetry={() => setError(null)} />
          </motion.div>
        )}

        {/* Step content */}
        <motion.div variants={itemVariants} className={styles.content}>
          {currentStep === 1 && (
            <CustomerSelectionSection
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              customerSearchQuery={customerSearchQuery}
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onCustomerSelect={setSelectedCustomerId}
              onSearchQueryChange={setCustomerSearchQuery}
              onAddressSelect={setSelectedAddressId}
              isLoading={false}
            />
          )}

          {currentStep === 2 && (
            <ServiceConfigurationSection
              services={services}
              selectedServices={selectedServices}
              serviceConfigurations={serviceConfigurations}
              onServiceToggle={toggleService}
              onConfigurationUpdate={updateServiceConfiguration}
              isLoading={false}
            />
          )}

          {currentStep === 3 && (
            <BillingScheduleSection
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              duration={duration}
              setDuration={setDuration}
              startDate={startDate}
              setStartDate={setStartDate}
              notes={notes}
              setNotes={setNotes}
              selectedServices={services.filter((s) =>
                selectedServices.has(s._id)
              )}
              serviceConfigurations={serviceConfigurations}
            />
          )}
        </motion.div>

        {/* Form actions */}
        <motion.div variants={itemVariants}>
          <FormActions
            currentStep={currentStep}
            totalSteps={3}
            onNext={nextStep}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            canProceed={validateStep(currentStep)}
            canSubmit={currentStep === 3 && validateStep(currentStep)}
          />
        </motion.div>
      </motion.div>
    </AdminDashboardLayout>
  );
}
