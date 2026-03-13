"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import styles from "./SingleServiceSubscriptionWizard.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import {
  CleaningType,
  HouseType,
  LaundryType,
  MealType,
  ScheduleDays,
  Service,
  ServiceCategory,
  ServiceDetailsInput,
  ServiceId,
  ServiceStatus,
  Severity,
  TreatmentType,
} from "@/graphql/api";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";
import { useRouter } from "next/navigation";
import ServiceStep from "../steps/ServiceStep/ServiceStep";
import ConfigurationStep, {
  SingleServiceConfig,
} from "../steps/ConfigurationStep/ConfigurationStep";
import CheckoutStep from "../steps/CheckoutStep/CheckoutStep";
import { showToast } from "@/components/ui/Toast/Toast";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import AddressModal from "../../../../addresses/_components/AddressModal";

type WizardStep = 0 | 1 | 2;

const steps = [
  { id: 0, label: "Service", description: "Choose what you need" },
  { id: 1, label: "Configure", description: "Tune schedule & details" },
  { id: 2, label: "Checkout", description: "Confirm & pay securely" },
] as const;

function buildServiceDetailsInput(
  service: Service,
  config: SingleServiceConfig,
): ServiceDetailsInput {
  const serviceOption = service.service_id ?? ServiceId.Cleaning;
  const base: ServiceDetailsInput = { serviceOption };

  switch (service.category) {
    case ServiceCategory.Cleaning:
      return {
        ...base,
        cleaning: {
          cleaningType: CleaningType.StandardCleaning,
          houseType: HouseType.Flat,
          rooms: {
            balcony: 0,
            bathroom: 1,
            bedroom: 2,
            kitchen: 1,
            livingRoom: 1,
            staircase: 0,
          },
        },
      };
    case ServiceCategory.Laundry:
      return {
        ...base,
        laundry: {
          bags: Math.max(1, config.quantity),
          laundryType: LaundryType.StandardLaundry,
        },
      };
    case ServiceCategory.Cooking:
      return {
        ...base,
        cooking: {
          mealType: MealType.Basic,
          mealsPerDelivery: (config.days.length
            ? config.days
            : [ScheduleDays.Monday]
          ).map((day) => ({ count: config.quantity, day })),
        },
      };
    case ServiceCategory.PestControl:
      return {
        ...base,
        pestControl: {
          areas: ["General"],
          severity: Severity.Low,
          treatmentType: TreatmentType.PestControlResidential,
        },
      };
    default:
      return base;
  }
}

const SingleServiceSubscriptionWizard: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<WizardStep>(0);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [config, setConfig] = useState<SingleServiceConfig | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const currentUser = useAppSelector(selectUser);
  const { handleAddAddress, handleGetCurrentUser } = useAuthOperations();

  const addresses = useMemo(
    () => currentUser?.addresses ?? [],
    [currentUser?.addresses],
  );

  useEffect(() => {
    const defaultOrFirst = currentUser?.defaultAddress ?? addresses[0] ?? "";
    setSelectedAddress((prev) =>
      prev && addresses.includes(prev) ? prev : defaultOrFirst,
    );
  }, [currentUser?.defaultAddress, addresses]);

  const handleSaveNewAddress = async (newAddress: string) => {
    await handleAddAddress(newAddress);
    await handleGetCurrentUser();
    setSelectedAddress(newAddress);
    setIsAddAddressModalOpen(false);
  };

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useGetServices({
    status: ServiceStatus.Active,
  });

  const { handleCreateSubscription } = useSubscriptionOperations();

  const {
    initializeSubscriptionPayment,
    loading: paymentInitializing,
    paymentSuccess,
    setPaymentSuccess,
    paymentReference,
  } = useSubscriptionPayment();

  const services: Service[] = useMemo(
    () => servicesData?.services ?? [],
    [servicesData],
  );

  const selectedService = useMemo(
    () => services.find((s) => s._id === selectedServiceId) ?? null,
    [services, selectedServiceId],
  );

  // After successful payment, send user back to subscriptions list
  useEffect(() => {
    if (paymentSuccess) {
      showToast("Subscription payment confirmed", "success");
      setPaymentSuccess(false);
      router.push("/dashboard/subscriptions");
    }
  }, [paymentSuccess, router, setPaymentSuccess]);

  const canProceedFromServiceStep =
    !!selectedService && !servicesLoading && !servicesError;

  const canProceedFromConfigStep = !!config && !!selectedService;

  const progress = ((activeStep + 1) / steps.length) * 100;

  const goNext = () => {
    if (activeStep === 0 && !canProceedFromServiceStep) return;
    if (activeStep === 1 && !canProceedFromConfigStep) return;
    setActiveStep((prev) => Math.min(2, (prev + 1) as WizardStep));
  };

  const goBack = () => {
    setActiveStep((prev) => Math.max(0, (prev - 1) as WizardStep));
  };

  const handleSubmitCheckout = async () => {
    if (!selectedService || !config || !currentUser) return;

    setSubmitting(true);
    setCreateError(null);

    try {
      const startDate = `${config.startDate}T00:00:00.000Z`;
      const address = selectedAddress?.trim() ?? "";
      if (!address) {
        setCreateError("Please select or add a delivery address to continue.");
        setSubmitting(false);
        return;
      }

      const serviceDetails = buildServiceDetailsInput(selectedService, config);
      const totalPrice = config.estimatedPrice * config.duration;

      const createInput = {
        billingCycle: config.billingCycle,
        duration: config.duration,
        startDate,
        autoRenew: true,
        address,
        totalPrice,
        services: [
          {
            category: selectedService.category as ServiceCategory,
            frequency: config.frequency,
            preferredTimeSlot: config.timeSlot,
            price: config.estimatedPrice,
            scheduledDays: config.days,
            serviceDetails,
            serviceId: selectedService._id,
          },
        ],
      };

      const response = await handleCreateSubscription(createInput);

      if (!response?.success) {
        throw new Error(
          "We couldn't create your subscription. Please try again.",
        );
      }

      const billing = response.billing;
      if (response.requiresPayment && billing && currentUser.email) {
        await initializeSubscriptionPayment(
          billing.id,
          billing.amount,
          currentUser.email,
        );
      } else {
        showToast("Subscription created successfully", "success");
        router.push("/dashboard/subscriptions");
      }
    } catch (error) {
      console.error("Subscription creation failed", error);
      setCreateError(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating your subscription.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wizard}>
      {/* Sidebar steps */}
      <aside className={styles.wizard__sidebar}>
        <div>
          <h2 className={styles.wizard__title}>New Subscription</h2>
          <p className={styles.wizard__subtitle}>
            Create a tailored plan for a single service.
          </p>
        </div>

        <div className={styles.wizard__steps}>
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            return (
              <div
                key={step.id}
                className={[
                  styles.wizard__step,
                  isActive ? styles["wizard__step--active"] : "",
                  isCompleted ? styles["wizard__step--completed"] : "",
                ].join(" ")}
              >
                <div
                  className={[
                    styles.wizard__stepIndicator,
                    isActive ? styles["wizard__stepIndicator--active"] : "",
                    isCompleted
                      ? styles["wizard__stepIndicator--completed"]
                      : "",
                  ].join(" ")}
                >
                  {isCompleted ? <Check size={16} /> : index + 1}
                </div>
                <div className={styles.wizard__stepText}>
                  <span className={styles.wizard__stepLabel}>{step.label}</span>
                  <span className={styles.wizard__stepDescription}>
                    {step.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main card */}
      <section className={styles.wizard__content}>
        <motion.div
          className={styles.wizard__card}
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <header className={styles.wizard__cardHeader}>
            <div>
              <h3 className={styles.wizard__cardTitle}>
                {activeStep === 0 && "Choose your service"}
                {activeStep === 1 && "Configure your plan"}
                {activeStep === 2 && "Review & checkout"}
              </h3>
              <p className={styles.wizard__cardSubtitle}>
                {activeStep === 0 &&
                  "Browse our services and pick the one you want to turn into a subscription."}
                {activeStep === 1 &&
                  "Adjust how often we should come, when, and any small details that matter to you."}
                {activeStep === 2 &&
                  "Double-check the details, then confirm and complete payment securely."}
              </p>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <ServiceStep
                key="service-step"
                services={services}
                loading={servicesLoading}
                error={servicesError?.message}
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
              />
            )}

            {activeStep === 1 && selectedService && (
              <ConfigurationStep
                key="config-step"
                service={selectedService}
                value={config}
                onChange={setConfig}
              />
            )}

            {activeStep === 2 && selectedService && config && (
              <CheckoutStep
                key="checkout-step"
                service={selectedService}
                config={config}
                submitting={submitting || paymentInitializing}
                error={createError}
                paymentReference={paymentReference}
                onSubmit={handleSubmitCheckout}
                onStartDateChange={(startDate) =>
                  setConfig((prev) => (prev ? { ...prev, startDate } : null))
                }
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                onAddAddressClick={() => setIsAddAddressModalOpen(true)}
              />
            )}
          </AnimatePresence>

          <footer className={styles.wizard__footer}>
            <div className={styles.wizard__progress}>
              <div
                className={styles.wizard__progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.wizard__cardActions}>
              {activeStep > 0 && (
                <FnButton
                  variant="secondary"
                  size="sm"
                  onClick={goBack}
                  disabled={submitting || paymentInitializing}
                >
                  <ArrowLeft size={16} />
                  Back
                </FnButton>
              )}
              {activeStep < 2 && (
                <FnButton
                  variant="primary"
                  size="sm"
                  onClick={goNext}
                  disabled={
                    (activeStep === 0 && !canProceedFromServiceStep) ||
                    (activeStep === 1 && !canProceedFromConfigStep) ||
                    submitting ||
                    paymentInitializing
                  }
                >
                  Next
                  <ArrowRight size={16} />
                </FnButton>
              )}
              {activeStep === 2 && (
                <FnButton
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitCheckout}
                  disabled={submitting || paymentInitializing}
                >
                  {submitting || paymentInitializing
                    ? "Processing..."
                    : "Confirm & Pay"}
                </FnButton>
              )}
            </div>
          </footer>
        </motion.div>
      </section>

      <AddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSave={handleSaveNewAddress}
      />
    </div>
  );
};

export default SingleServiceSubscriptionWizard;
