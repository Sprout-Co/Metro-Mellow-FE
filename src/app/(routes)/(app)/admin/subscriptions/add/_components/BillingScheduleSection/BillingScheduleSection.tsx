import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import {
  BillingCycle,
  Service,
  SubscriptionFrequency,
  TimeSlot,
  ScheduleDays,
  ServiceCategory,
} from "@/graphql/api";
import { ServiceConfiguration } from "@/app/(routes)/(app)/admin/subscriptions/add/types/subscription";
import { formatToNaira } from "@/utils/string";
import {
  calculateServicePrice,
  calculateServicesPerBillingCycle,
  calculateBillingCycleAmount,
  calculateTotalSubscriptionCost,
} from "@/utils/pricing";
import styles from "./BillingScheduleSection.module.scss";

interface BillingScheduleSectionProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
  duration: number;
  setDuration: (duration: number) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  selectedServices: Service[];
  serviceConfigurations: Map<string, ServiceConfiguration>;
}

const BillingScheduleSection: React.FC<BillingScheduleSectionProps> = ({
  billingCycle,
  setBillingCycle,
  duration,
  setDuration,
  startDate,
  setStartDate,
  notes,
  setNotes,
  selectedServices,
  serviceConfigurations,
}) => {
  const formatBillingCycle = (cycle: BillingCycle) => {
    switch (cycle) {
      case BillingCycle.Weekly:
        return "Weekly";
      case BillingCycle.BiWeekly:
        return "Bi-Weekly";
      case BillingCycle.Monthly:
        return "Monthly";
      case BillingCycle.Quarterly:
        return "Quarterly";
      default:
        return cycle;
    }
  };

  const getDurationLabel = () => {
    switch (billingCycle) {
      case BillingCycle.Weekly:
        return duration === 1 ? "week" : "weeks";
      case BillingCycle.BiWeekly:
        return duration === 1 ? "bi-week period" : "bi-week periods";
      case BillingCycle.Monthly:
        return duration === 1 ? "month" : "months";
      case BillingCycle.Quarterly:
        return duration === 1 ? "quarter" : "quarters";
      default:
        return "periods";
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    selectedServices.forEach((service) => {
      const config = serviceConfigurations.get(service._id);
      if (config) {
        // Use the correct billing cycle calculation
        const billingCycleAmount = calculateBillingCycleAmount(
          service,
          config,
          billingCycle
        );
        total += billingCycleAmount;
      }
    });
    return total;
  };

  const getServiceIcon = (category: ServiceCategory): string => {
    switch (category) {
      case ServiceCategory.Cleaning:
        return "droplets";
      case ServiceCategory.Cooking:
        return "utensils";
      case ServiceCategory.Laundry:
        return "shirt";
      case ServiceCategory.PestControl:
        return "bug";
      case ServiceCategory.Errands:
        return "package";
      default:
        return "package";
    }
  };

  const getFrequencyLabel = (frequency: SubscriptionFrequency): string => {
    switch (frequency) {
      case SubscriptionFrequency.Daily:
        return "Daily";
      case SubscriptionFrequency.Weekly:
        return "Weekly";
      case SubscriptionFrequency.BiWeekly:
        return "Bi-Weekly";
      case SubscriptionFrequency.Monthly:
        return "Monthly";
      default:
        return "Weekly";
    }
  };

  const getTimeSlotLabel = (timeSlot: TimeSlot): string => {
    switch (timeSlot) {
      case TimeSlot.Morning:
        return "Morning (8AM - 12PM)";
      case TimeSlot.Afternoon:
        return "Afternoon (12PM - 4PM)";
      case TimeSlot.Evening:
        return "Evening (4PM - 8PM)";
      default:
        return "Morning (8AM - 12PM)";
    }
  };

  const getDayLabel = (day: ScheduleDays): string => {
    switch (day) {
      case ScheduleDays.Monday:
        return "Mon";
      case ScheduleDays.Tuesday:
        return "Tue";
      case ScheduleDays.Wednesday:
        return "Wed";
      case ScheduleDays.Thursday:
        return "Thu";
      case ScheduleDays.Friday:
        return "Fri";
      case ScheduleDays.Saturday:
        return "Sat";
      case ScheduleDays.Sunday:
        return "Sun";
      default:
        return "Mon";
    }
  };

  console.log(selectedServices, "xxxx");
  console.log(serviceConfigurations, "xxxx");
  return (
    <Card className={styles.billing_schedule}>
      <div className={styles.billing_schedule__header}>
        <h3 className={styles.billing_schedule__title}>
          <Icon name="calendar" />
          Billing & Schedule
        </h3>
        <p className={styles.billing_schedule__subtitle}>
          Configure billing cycle and subscription details
        </p>
      </div>

      <div className={styles.billing_schedule__content}>
        {/* Billing Configuration */}
        <div className={styles.billing_schedule__section}>
          <h4 className={styles.billing_schedule__section_title}>
            Billing Configuration
          </h4>
          <div className={styles.billing_schedule__grid}>
            <div className={styles.billing_schedule__field}>
              <label className={styles.billing_schedule__label}>
                Billing Cycle
              </label>
              <select
                value={billingCycle}
                onChange={(e) =>
                  setBillingCycle(e.target.value as BillingCycle)
                }
                className={styles.billing_schedule__select}
              >
                <option value={BillingCycle.Weekly}>Weekly</option>
                <option value={BillingCycle.BiWeekly}>Bi-Weekly</option>
                <option value={BillingCycle.Monthly}>Monthly</option>
                <option value={BillingCycle.Quarterly}>Quarterly</option>
              </select>
              <small className={styles.billing_schedule__help_text}>
                How often the customer will be billed
              </small>
            </div>

            <div className={styles.billing_schedule__field}>
              <label className={styles.billing_schedule__label}>
                Duration ({getDurationLabel()})
              </label>
              <input
                type="number"
                min="1"
                max="36"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                className={styles.billing_schedule__input}
              />
              <small className={styles.billing_schedule__help_text}>
                How long the subscription should run
              </small>
            </div>

            <div className={styles.billing_schedule__field}>
              <label className={styles.billing_schedule__label}>
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className={styles.billing_schedule__input}
              />
              <small className={styles.billing_schedule__help_text}>
                When the subscription should begin
              </small>
            </div>
          </div>
        </div>

        {/* Service Summary */}
        {selectedServices.length > 0 && (
          <div className={styles.billing_schedule__section}>
            <h4 className={styles.billing_schedule__section_title}>
              Service Summary
            </h4>
            <div className={styles.billing_schedule__services_summary}>
              {selectedServices.map((service) => {
                const config = serviceConfigurations.get(service._id);
                if (!config) return null;

                return (
                  <div
                    key={service._id}
                    className={styles.billing_schedule__service_item}
                  >
                    <div className={styles.billing_schedule__service_header}>
                      <div className={styles.billing_schedule__service_icon}>
                        <Icon name={getServiceIcon(service.category)} />
                      </div>
                      <div className={styles.billing_schedule__service_info}>
                        <h5>{service.name}</h5>
                        <p>
                          {formatToNaira(
                            calculateBillingCycleAmount(
                              service,
                              config,
                              billingCycle
                            )
                          )}{" "}
                          per {formatBillingCycle(billingCycle).toLowerCase()}
                        </p>
                      </div>
                      <div className={styles.billing_schedule__service_price}>
                        {formatToNaira(
                          calculateBillingCycleAmount(
                            service,
                            config,
                            billingCycle
                          )
                        )}
                      </div>
                    </div>
                    <div className={styles.billing_schedule__service_details}>
                      {config.selectedOption &&
                        config.serviceDetails?.optionLabel && (
                          <div
                            className={styles.billing_schedule__service_detail}
                          >
                            <span>Option:</span>{" "}
                            {config.serviceDetails.optionLabel}
                          </div>
                        )}
                      <div className={styles.billing_schedule__service_detail}>
                        <span>Time:</span>{" "}
                        {getTimeSlotLabel(config.preferredTimeSlot)}
                      </div>
                      <div className={styles.billing_schedule__service_detail}>
                        <span>Days:</span>{" "}
                        {config.scheduledDays
                          .map((day) => getDayLabel(day))
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.billing_schedule__explanation}>
              <h5>How You'll Be Charged & Services Delivered</h5>
              <div className={styles.billing_schedule__explanation_content}>
                <div className={styles.billing_schedule__explanation_section}>
                  <h6>📅 Billing Schedule</h6>
                  <p>
                    You'll be charged{" "}
                    <strong>{formatToNaira(calculateTotalPrice())}</strong>{" "}
                    every {formatBillingCycle(billingCycle).toLowerCase()}
                    for {duration} {getDurationLabel()}. Your first charge will
                    be on {startDate}.
                  </p>
                </div>

                <div className={styles.billing_schedule__explanation_section}>
                  <h6>🛠️ Service Delivery</h6>
                  <p>
                    Based on your selections, here's how your services will be
                    delivered:
                  </p>
                  <ul>
                    {selectedServices.map((service) => {
                      const config = serviceConfigurations.get(service._id);
                      if (!config) return null;

                      const servicesPerBillingCycle =
                        calculateServicesPerBillingCycle(
                          config.frequency,
                          config.scheduledDays.length,
                          billingCycle
                        );

                      const calculatedPrice = calculateServicePrice(
                        service,
                        config
                      );

                      return (
                        <li key={service._id}>
                          <strong>{service.name}</strong>:{" "}
                          {getFrequencyLabel(config.frequency).toLowerCase()} on{" "}
                          {config.scheduledDays
                            .map(
                              (day, index) =>
                                `${getDayLabel(day)}${index < config.scheduledDays.length - 1 ? ", " : ""}`
                            )
                            .join("")}{" "}
                          at{" "}
                          {getTimeSlotLabel(config.preferredTimeSlot)
                            .split(" ")[0]
                            .toLowerCase()}{" "}
                          (~{Math.round(servicesPerBillingCycle)} services per{" "}
                          {formatBillingCycle(billingCycle).toLowerCase()})
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.billing_schedule__explanation_section}>
                  <h6>💰 Total Cost Breakdown</h6>
                  <p>
                    Your total subscription cost for {duration}{" "}
                    {getDurationLabel()} will be{" "}
                    <strong>
                      {formatToNaira(
                        selectedServices.reduce((total, service) => {
                          const config = serviceConfigurations.get(service._id);
                          if (!config) return total;
                          return (
                            total +
                            calculateTotalSubscriptionCost(
                              service,
                              config,
                              billingCycle,
                              duration
                            )
                          );
                        }, 0)
                      )}
                    </strong>
                    , billed {formatBillingCycle(billingCycle).toLowerCase()} at{" "}
                    {formatToNaira(calculateTotalPrice())} per cycle.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.billing_schedule__total}>
              <span>
                Total per {formatBillingCycle(billingCycle).toLowerCase()}:
              </span>
              <span className={styles.billing_schedule__total_price}>
                {formatToNaira(calculateTotalPrice())}
              </span>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className={styles.billing_schedule__section}>
          <h4 className={styles.billing_schedule__section_title}>
            Additional Notes
          </h4>
          <div className={styles.billing_schedule__field}>
            <label className={styles.billing_schedule__label}>
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes for this subscription..."
              rows={4}
              className={styles.billing_schedule__textarea}
            />
            <small className={styles.billing_schedule__help_text}>
              Any additional information about this subscription
            </small>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BillingScheduleSection;
