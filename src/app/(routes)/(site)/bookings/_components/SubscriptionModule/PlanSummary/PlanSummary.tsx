import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PlanSummary.module.scss";
import ServiceEditor from "./ServiceEditor/ServiceEditor";
import { ServiceType, PlanType, DurationType } from "../SubscriptionModule";

interface ServiceTypeExtended extends ServiceType {
  id: string;
  name: string;
  icon: string;
  type: "cleaning" | "food" | "laundry";
  details: any;
}

const mock = [
  {
    id: "cleaning-1",
    name: "Cleaning Service",
    icon: "🧹",
    type: "cleaning",
    details: {
      cleaningType: "standard",
      houseType: "flat",
      rooms: {
        bedroom: 2,
        livingRoom: 1,
        bathroom: 1,
        kitchen: 1,
        balcony: 0,
        studyRoom: 0,
      },
      frequency: 1,
      day: "friday",
      time: "8am",
    },
  },
  {
    id: "food-1",
    name: "Food Service",
    icon: "🍳",
    type: "food",
    details: {
      foodPlanType: "basic",
      deliveryFrequency: 2,
      deliveryDays: ["monday", "tuesday"],
      mealsPerDay: {
        monday: 5,
        tuesday: 2,
      },
    },
  },
];

type PlanSummaryProps = {
  selectedServices: ServiceType[];
  totalPrice?: number;
  planType?: PlanType;
  duration?: DurationType;
  onUpdateService?: (serviceId: string, details: any) => void;
};

const PlanSummary: React.FC<PlanSummaryProps> = ({
  selectedServices,
  totalPrice = 0,
  planType = "weekly",
  duration = 2,
  onUpdateService,
}) => {
  const [services, setServices] = useState<ServiceType[]>(selectedServices);

  const [editingService, setEditingService] = useState<ServiceType | null>(
    null
  );

  // Open service editor
  const handleEditService = (service: ServiceType) => {
    setEditingService(service);
  };

  // Close service editor
  const handleCloseEditor = () => {
    setEditingService(null);
  };

  // Save service changes
  const handleSaveService = (serviceData: any) => {
    if (editingService) {
      // Update the service in the services array
      const updatedServices = services.map((service) =>
        service.id === editingService.id
          ? { ...service, details: serviceData }
          : service
      );

      setServices(updatedServices);
      setEditingService(null);

      // If parent component provided an update handler, call it
      if (onUpdateService) {
        onUpdateService(editingService.id, serviceData);
      }
    }
  };

  // Calculate subscription totals based on plan type and duration
  const calculateTotals = () => {
    // Subtotal is the raw total price
    const subtotal = totalPrice;

    // Apply duration discount - longer subscriptions get better rates
    let discount = 0;
    if (duration >= 6) {
      discount = subtotal * 0.1; // 10% discount for 6+ months
    } else if (duration >= 3) {
      discount = subtotal * 0.05; // 5% discount for 3+ months
    }

    // Calculate final total
    const final = subtotal - discount;

    return {
      subtotal,
      discount,
      total: final,
      perPeriod: planType === "weekly" ? final / 4 : final, // Assuming 4 weeks per month for weekly plans
    };
  };

  const { subtotal, discount, total, perPeriod } = calculateTotals();

  // Format price to currency
  const formatPrice = (price: number) => {
    return `₦${(price / 100).toLocaleString()}`;
  };

  useEffect(() => {
    setServices(selectedServices);
  }, [selectedServices]);

  return (
    <div className={styles.plan_summary}>
      <h2 className={styles.plan_summary__title}>Your Plan Summary</h2>

      {/* Services List */}
      <div className={styles.plan_summary__services}>
        {services.map((service) => (
          <div key={service.id} className={styles.plan_summary__service}>
            <div className={styles.plan_summary__service_header}>
              <div className={styles.plan_summary__service_icon}>
                <span>{service.icon}</span>
              </div>
              <div className={styles.plan_summary__service_info}>
                <h3 className={styles.plan_summary__service_name}>
                  {service.name}
                </h3>
                <p className={styles.plan_summary__service_type}>
                  {service.type === "cleaning"
                    ? service.details.cleaningType === "standard"
                      ? "Standard Cleaning"
                      : service.details.cleaningType === "deep"
                        ? "Deep Cleaning"
                        : "Post Construction Cleaning"
                    : service.type === "food"
                      ? service.details.foodPlanType === "basic"
                        ? "Basic Plan"
                        : "Standard Plan"
                      : service.details.laundryType === "wash-and-iron"
                        ? "Wash And Iron"
                        : "Wash And Fold"}
                </p>
              </div>
              <button
                className={styles.plan_summary__service_edit}
                onClick={() => handleEditService(service)}
              >
                EDIT {service.type.toUpperCase()}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Summary */}
      {services.length > 0 && (
        <div className={styles.plan_summary__pricing}>
          <div className={styles.plan_summary__price_row}>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className={styles.plan_summary__price_row}>
              <span>Discount (Duration)</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div
            className={`${styles.plan_summary__price_row} ${styles.plan_summary__price_row_total}`}
          >
            <span>
              Total ({duration}{" "}
              {duration === 1
                ? planType === "weekly"
                  ? "week"
                  : "month"
                : planType === "weekly"
                  ? "weeks"
                  : "months"}
              )
            </span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className={styles.plan_summary__per_period}>
            <span>
              Billed as {formatPrice(perPeriod)} per{" "}
              {planType === "weekly" ? "week" : "month"}
            </span>
          </div>
        </div>
      )}

      {/* Service Editor Modal */}
      {editingService && (
        <div className={styles.plan_summary__modal}>
          <div
            className={styles.plan_summary__modal_backdrop}
            onClick={handleCloseEditor}
          />
          <div className={styles.plan_summary__modal_content}>
            <ServiceEditor
              serviceType={editingService.type}
              onClose={handleCloseEditor}
              onSave={handleSaveService}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSummary;
