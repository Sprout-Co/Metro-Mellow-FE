import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Plus, Loader2 } from "lucide-react";
import styles from "./CTASection.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import ServiceAccordion from "@/components/ui/ServiceAccordion";
import { Service, ServiceCategory, ServiceOption } from "@/graphql/api";
import CleaningServiceModal from "@/components/ui/booking/modals/CleaningServiceModal";
import LaundryServiceModal from "@/components/ui/booking/modals/LaundryServiceModal";
import CookingServiceModal from "@/components/ui/booking/modals/CookingServiceModal";
import PestControlServiceModal from "@/components/ui/booking/modals/PestControlServiceModal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const CTASection: React.FC = () => {
  // Services are now initialized at app level, so we just need to access the state
  const { services, loading, error } = useSelector(
    (state: RootState) => state.services
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);

  const renderServiceModal = () => {
    if (!selectedService || !selectedServiceOption) return null;
    switch (selectedService?.category) {
      case ServiceCategory.Cleaning:
        return (
          <CleaningServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      case ServiceCategory.Laundry:
        return (
          <LaundryServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      case ServiceCategory.Cooking:
        return (
          <CookingServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      case ServiceCategory.PestControl:
        return (
          <PestControlServiceModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            service={selectedService}
            serviceOption={selectedServiceOption}
          />
        );
      default:
        return null;
    }
  };

  const handleBookService = (serviceId: string, serviceOptionId: string) => {
    console.log("Booking service:", serviceId);
    console.log("Booking service:", services);
    const service = services.find((service) => service._id === serviceId);
    if (service) {
      setSelectedService(service);
      setSelectedServiceOption(
        service.options?.find((option) => option.id === serviceOptionId) || null
      );
    }
    setIsOpen(true);
  };

  if (loading) {
    return (
      <div className={styles.ctaSection}>
        <div className={styles.minimalLayout}>
          <div className={styles.servicesWrapper}>
            <div className={styles.header}>
              <h2 className={styles.header__title}>Book a Service</h2>
              <p className={styles.header__subtitle}>
                Loading available services...
              </p>
            </div>
            <div className={styles.loadingContainer}>
              <Loader2 className={styles.loadingSpinner} size={32} />
              <p>Fetching services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.ctaSection}>
        <div className={styles.minimalLayout}>
          <div className={styles.servicesWrapper}>
            <div className={styles.header}>
              <h2 className={styles.header__title}>Book a Service</h2>
              <p className={styles.header__subtitle}>Something went wrong</p>
            </div>
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <FnButton
                onClick={() => window.location.reload()}
                variant="primary"
                size="sm"
              >
                Try Again
              </FnButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ctaSection}>
      <div className={styles.minimalLayout}>
        {/* Services Column */}
        <div className={styles.servicesWrapper}>
          <div className={styles.header}>
            <h2 className={styles.header__title}>Book a Service</h2>
            <p className={styles.header__subtitle}>
              Select a service to explore available options
            </p>
          </div>

          <ServiceAccordion
            services={services}
            onBookService={handleBookService}
            onBookServiceWithoutOption={(serviceId) => {
              console.log("Booking service:", serviceId);
            }}
          />
        </div>

        {/* Subscription Sidebar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.subscriptionBanner}>
            <div className={styles.subscriptionContent}>
              <h3 className={styles.subscriptionContent__title}>
                Save with Subscription
              </h3>
              <p className={styles.subscriptionContent__description}>
                Monthly plans from ₦25,000 and enjoy 30% savings on all services
              </p>
              <div className={styles.subscriptionContent__benefits}>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>Priority booking</span>
                </div>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>30% discount</span>
                </div>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>Free consultations</span>
                </div>
              </div>
            </div>
            <div className={styles.subscriptionAction}>
              <Link href="/dashboard/subscriptions">
                <motion.button
                  className={styles.subscriptionAction__button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {renderServiceModal()}
    </div>
  );
};

export default CTASection;
