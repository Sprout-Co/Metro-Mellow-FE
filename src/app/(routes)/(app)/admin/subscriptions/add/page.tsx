"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "@/graphql/api";
import CustomerSelectionSection from "./_components/CustomerSelectionSection/CustomerSelectionSection";
import ServiceConfigurationSection from "./_components/ServiceConfigurationSection/ServiceConfigurationSection";
import BillingScheduleSection from "./_components/BillingScheduleSection/BillingScheduleSection";
import FormActions from "./_components/FormActions/FormActions";
import ErrorDisplay from "./_components/ErrorDisplay/ErrorDisplay";
import styles from "./AddSubscriptionPage.module.scss";

interface ServiceConfiguration {
  serviceId: string;
  price: number;
  frequency: SubscriptionFrequency;
  scheduledDays: ScheduleDays[];
  preferredTimeSlot: TimeSlot;
  serviceDetails: any;
  category: ServiceCategory;
}

export default function AddSubscriptionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [serviceConfigurations, setServiceConfigurations] = useState<
    ServiceConfiguration[]
  >([]);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    BillingCycle.Monthly
  );
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  // Data state
  const [customers, setCustomers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customerAddresses, setCustomerAddresses] = useState<Address[]>([]);

  const { handleCreateSubscription } = useSubscriptionOperations();
  const { handleGetCustomers } = useCustomerOperations();
  const { handleGetServices } = useServiceOperations();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      fetchCustomerAddresses();
      const customer = customers.find(
        (customer) => customer.id === selectedCustomerId
      );
      const addresses =
        customer?.addresses?.filter(
          (address): address is Address => address !== null
        ) || [];
      setCustomerAddresses(addresses);
    }
  }, [selectedCustomerId]);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const [customersData, servicesData] = await Promise.all([
        handleGetCustomers(),
        handleGetServices(),
      ]);
      setCustomers(customersData || []);
      setServices(servicesData || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerAddresses = async () => {
    // This would fetch customer addresses - implementation depends on available API
    // For now, we'll use a placeholder
    setCustomerAddresses([]);
  };

  const handleAddService = () => {
    const newService: ServiceConfiguration = {
      serviceId: "",
      price: 0,
      frequency: SubscriptionFrequency.Weekly,
      scheduledDays: [],
      preferredTimeSlot: TimeSlot.Morning,
      serviceDetails: {},
      category: ServiceCategory.Cleaning,
    };
    setServiceConfigurations([...serviceConfigurations, newService]);
  };

  const handleUpdateService = (
    index: number,
    updatedService: ServiceConfiguration
  ) => {
    const updated = [...serviceConfigurations];
    updated[index] = updatedService;
    setServiceConfigurations(updated);
  };

  const handleRemoveService = (index: number) => {
    const updated = serviceConfigurations.filter((_, i) => i !== index);
    setServiceConfigurations(updated);
  };

  const validateForm = (): string | null => {
    if (!selectedCustomerId) return "Please select a customer";
    if (serviceConfigurations.length === 0)
      return "Please add at least one service";
    if (!selectedAddressId) return "Please select an address";

    for (const service of serviceConfigurations) {
      if (!service.serviceId) return "Please select all services";
      if (service.price <= 0) return "Service prices must be greater than 0";
      if (service.scheduledDays.length === 0)
        return "Please select scheduled days for all services";
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const subscriptionServices: SubscriptionServiceInput[] =
        serviceConfigurations.map((service) => ({
          serviceId: service.serviceId,
          price: service.price,
          frequency: service.frequency,
          scheduledDays: service.scheduledDays,
          preferredTimeSlot: service.preferredTimeSlot,
          serviceDetails: service.serviceDetails,
          category: service.category,
        }));

      const input: CreateSubscriptionInput = {
        address: selectedAddressId,
        autoRenew,
        billingCycle,
        duration,
        services: subscriptionServices,
        startDate: new Date(startDate).toISOString(),
      };

      await handleCreateSubscription(input);
      router.push("/admin/subscriptions");
    } catch (error) {
      console.error("Error creating subscription:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create subscription"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminDashboardLayout
      title="Add Subscription"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Subscriptions", path: "/admin/subscriptions" },
        { label: "Add Subscription", path: "/admin/subscriptions/add" },
      ]}
    >
      <div className={styles.add_subscription_page}>
        <div className={styles.add_subscription_page__header}>
          <h2 className={styles.add_subscription_page__title}>
            Create New Subscription
          </h2>
          <p className={styles.add_subscription_page__subtitle}>
            Configure a new subscription for a customer
          </p>
        </div>

        {error && (
          <ErrorDisplay error={error} onDismiss={() => setError(null)} />
        )}

        <div className={styles.add_subscription_page__form}>
          <CustomerSelectionSection
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            customerSearchQuery={customerSearchQuery}
            addresses={customerAddresses}
            selectedAddressId={selectedAddressId}
            onCustomerSelect={setSelectedCustomerId}
            onSearchQueryChange={setCustomerSearchQuery}
            onAddressSelect={setSelectedAddressId}
            isLoading={isLoading}
          />

          <ServiceConfigurationSection
            services={services}
            serviceConfigurations={serviceConfigurations}
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            onRemoveService={handleRemoveService}
          />

          <BillingScheduleSection
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            startDate={startDate}
            setStartDate={setStartDate}
            duration={duration}
            setDuration={setDuration}
            autoRenew={autoRenew}
            setAutoRenew={setAutoRenew}
          />

          <FormActions
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/subscriptions")}
            isLoading={isLoading}
            disabled={!selectedCustomerId || serviceConfigurations.length === 0}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
