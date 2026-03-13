"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import styles from "./SingleServiceSubscriptionWizard.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { Service, ServiceStatus } from "@/graphql/api";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";
import { useRouter } from "next/navigation";
import ServiceStep from "../steps/ServiceStep/ServiceStep";
import ConfigurationStep from "../steps/ConfigurationStep/ConfigurationStep";
import CheckoutStep from "../steps/CheckoutStep/CheckoutStep";
import { showToast } from "@/components/ui/Toast/Toast";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import AddressModal from "../../../../addresses/_components/AddressModal";
import ServiceConfigDrawer from "../steps/ConfigurationStep/ServiceConfigDrawer/ServiceConfigDrawer";

type WizardStep = 0 | 1 | 2;

const steps = [
  { id: 0, label: "Service", description: "Choose what you need" },
  { id: 1, label: "Configure", description: "Tune schedule & details" },
  { id: 2, label: "Checkout", description: "Confirm & pay securely" },
] as const;

const SingleServiceSubscriptionWizard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<WizardStep>(0);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useGetServices({
    status: ServiceStatus.Active,
  });

  const services: Service[] = useMemo(
    () => servicesData?.services ?? [],
    [servicesData],
  );

  const selectedService = useMemo(
    () => services.find((s) => s._id === selectedServiceId) ?? null,
    [services, selectedServiceId],
  );

  const canProceedFromServiceStep =
    !!selectedService && !servicesLoading && !servicesError;

  const progress = ((activeStep + 1) / steps.length) * 100;

  const goNext = () => {
    if (activeStep === 0 && !canProceedFromServiceStep) return;
    setActiveStep((prev) => {
      const next = (prev + 1) as WizardStep;
      return next > 2 ? 2 : next;
    });
  };

  const goBack = () => {
    setActiveStep((prev) => {
      const next = (prev - 1) as WizardStep;
      return next < 0 ? 0 : next;
    });
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

            {/* {activeStep === 1 && selectedService && <ConfigurationStep />} */}
            {activeStep === 1 && selectedService && (
              <ServiceConfigDrawer
                isOpen={true}
                onClose={() => {}}
                service={selectedService}
                onSave={() => {}}
                onProceedToCheckout={() => {}}
              />
            )}

            {activeStep === 2 && selectedService && <CheckoutStep />}
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
                <FnButton variant="secondary" size="sm" onClick={goBack}>
                  <ArrowLeft size={16} />
                  Back
                </FnButton>
              )}
              {activeStep < 2 && (
                <FnButton
                  variant="primary"
                  size="sm"
                  onClick={goNext}
                  disabled={activeStep === 0 && !canProceedFromServiceStep}
                >
                  Next
                  <ArrowRight size={16} />
                </FnButton>
              )}
              {activeStep === 2 && (
                <FnButton variant="primary" size="sm" onClick={() => {}}>
                  Confirm & Pay
                </FnButton>
              )}
            </div>
          </footer>
        </motion.div>
      </section>

      <AddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSave={async () => {}}
      />
    </div>
  );
};

export default SingleServiceSubscriptionWizard;
