"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import styles from "./SubscriptionBuilder.module.scss";
import ServiceSelector from "./ServiceSelector/ServiceSelector";
import BillingConfiguration from "./BillingConfiguration/BillingConfiguration";
import SubscriptionSummary from "./SubscriptionSummary/SubscriptionSummary";
import ServiceConfigDrawer from "./ServiceConfigDrawer/ServiceConfigDrawer";
import ValidationErrors from "./ValidationErrors/ValidationErrors";
import {
  Service,
  ServiceStatus,
  BillingCycle,
  CreateSubscriptionInput,
  SubscriptionServiceInput,
  Address,
} from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { Icon } from "@/components/ui/Icon/Icon";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import {
  validateSubscription,
  validateServiceConfiguration,
  ValidationError,
} from "./validation";
import { showToast } from "../../../../../../../../components/ui/Toast/Toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/lib/redux/slices/authSlice";
import LoginModal from "@/components/ui/booking/modals/LoginModal/LoginModal";
import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";
import OrderSuccessModal from "@/components/ui/booking/modals/OrderSuccessModal/OrderSuccessModal";
import { Routes } from "@/constants/routes";
import FullPageLoader from "@/components/ui/FullPageLoader";

export type DurationType = 1 | 2 | 3 | 4;

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
  const [duration, setDuration] = useState<DurationType>(1);
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Subscription creation state
  const [startDate, setStartDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);

  // Validation state
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Hooks
  const { handleGetServices } = useServiceOperations();
  const { handleCreateSubscription } = useSubscriptionOperations();
  const {
    initializeSubscriptionPayment,
    loading: paymentLoading,
    error: paymentError,
    paymentSuccess,
    paymentReference,
    setPaymentSuccess,
  } = useSubscriptionPayment();
  const router = useRouter();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

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

  // Set default address when user data is loaded
  useEffect(() => {
    if (currentUser?.defaultAddress && !selectedAddress) {
      setSelectedAddress(currentUser.defaultAddress);
    }
  }, [currentUser, selectedAddress]);

  // Handle payment success - redirect to subscriptions dashboard
  useEffect(() => {
    if (paymentSuccess && paymentReference) {
      showToast(
        "Payment successful! Your subscription is now active. 🎉",
        "success"
      );
      setTimeout(() => {
        router.push("/dashboard/subscriptions");
      }, 2000);
    }
  }, [paymentSuccess, paymentReference, router]);

  // Handle payment error
  useEffect(() => {
    if (paymentError) {
      showToast(paymentError, "error");
    }
  }, [paymentError]);

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
    const validation = validateServiceConfiguration(
      configuration,
      selectedServiceForConfig
    );
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

  const calculateSubtotal = () => {
    return configuredServices.reduce(
      (sum, cs) => sum + (cs.configuration.price || 0),
      0
    );
  };

  const calculateDiscount = (): {
    amount: number;
    savingsPercentage: number;
  } => {
    const monthlyTotal = calculateSubtotal();
    const savingsPercentage =
      duration >= 12 ? 10 : duration >= 6 ? 7 : duration >= 3 ? 5 : 3;
    return {
      amount: Math.round(monthlyTotal * (savingsPercentage / 100) * duration),
      savingsPercentage: savingsPercentage,
    };
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal() * duration;
    const { amount, savingsPercentage } = calculateDiscount();
    return subtotal - amount;
  };

  // Validate checkout requirements
  const validateCheckout = (): boolean => {
    const validation = validateSubscription(
      configuredServices,
      billingCycle,
      duration
    );
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
    if (!isAuthenticated) {
      showToast("Please login to checkout", "error");
      setShowLoginModal(true);
      return;
    }
    if (validateCheckout()) {
      setCurrentView("checkout");
    }
  };

  // Handle subscription creation
  const handleCreateNewSubscription = async () => {
    setIsCreatingSubscription(true);

    try {
      // Get the address to use (selected or default)
      const addressToUse =
        selectedAddress?.id || currentUser?.defaultAddress?.id;

      if (!addressToUse) {
        showToast("Please select an address for your subscription", "error");
        setIsCreatingSubscription(false);
        return;
      }

      // Validate user email
      if (!currentUser?.email) {
        showToast("User email is required for payment", "error");
        setIsCreatingSubscription(false);
        return;
      }

      // Prepare subscription input
      const subscriptionInput: CreateSubscriptionInput = {
        address: addressToUse,
        autoRenew: true,
        billingCycle: billingCycle,
        duration: duration,
        startDate: startDate.toISOString(),
        totalPrice: calculateTotal(),
        services: configuredServices.map((cs) => ({
          serviceId: cs.service._id,
          category: cs.configuration.category,
          frequency: cs.configuration.frequency,
          price: cs.configuration.price,
          preferredTimeSlot: cs.configuration.preferredTimeSlot,
          scheduledDays: cs.configuration.scheduledDays,
          serviceDetails: cs.configuration.serviceDetails,
        })),
      };

      console.log("Creating subscription with input:", subscriptionInput);

      // Create subscription
      const createdSubscription =
        await handleCreateSubscription(subscriptionInput);

      if (!createdSubscription) {
        throw new Error("Failed to create subscription");
      }

      // console.log("Subscription created:", createdSubscription);

      // // Check if payment is required
      if (
        createdSubscription.requiresPayment &&
        createdSubscription.billing?.id
      ) {
        showToast("Subscription created! Proceeding to payment...", "success");

        // Calculate total amount
        const totalAmount = calculateTotal();

        // Initialize payment with billing ID
        await initializeSubscriptionPayment(
          createdSubscription.billing.id,
          totalAmount,
          currentUser.email
        );

        // Payment modal will open automatically
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Failed to create subscription",
        "error"
      );
      setIsCreatingSubscription(false);
    } finally {
      // Don't set loading to false here if payment is being processed
      // The payment hook will manage its own loading state
      // if (!paymentLoading) {
      //   setIsCreatingSubscription(false);
      // }
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
        startDate={startDate}
        selectedAddress={selectedAddress}
        onStartDateChange={setStartDate}
        onAddressChange={setSelectedAddress}
        isCreatingSubscription={isCreatingSubscription}
        onBack={() => setCurrentView("builder")}
        onConfirmCheckout={handleCreateNewSubscription}
        discount={calculateDiscount()}
        total={calculateTotal()}
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
            <span>Save up to 10% with subscriptions</span>
          </div>
          <h1 className={styles.builder__title}>
            <span>Build </span>
            Your Perfect Service Plan and save up to 10%
          </h1>
          <p className={styles.builder__subtitle}>
            Combine multiple services into one convenient subscription
          </p>
        </motion.div>
        <SignaturePattern />
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
              configuredServices={configuredServices}
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
              currentBillingCycle={billingCycle}
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
            discount={calculateDiscount()}
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

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          handleCheckout();
        }}
      />

      <OrderSuccessModal
        isOpen={paymentSuccess}
        title="Oya, You Are Good to Go! 🚀"
        message="Payment confirmed! Your subscription is active now. Enjoy the flex!"
        onClose={() => {
          setPaymentSuccess(false);
          router.push(Routes.DASHBOARD_SUBSCRIPTIONS);
        }}
      />

      <FullPageLoader
        isLoading={paymentLoading}
        message="Processing your payment. This may take a few minutes.
Please do not refresh or close this window."
      />
    </div>
  );
};

export default SubscriptionBuilder;
