import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
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
  getPricingBreakdown,
} from "@/utils/pricing";
import styles from "./DetailedBillingBreakdown.module.scss";

interface DetailedBillingBreakdownProps {
  selectedServices: Service[];
  serviceConfigurations: Map<string, ServiceConfiguration>;
  billingCycle: BillingCycle;
  duration: number;
  startDate: string;
}

const DetailedBillingBreakdown: React.FC<DetailedBillingBreakdownProps> = ({
  selectedServices,
  serviceConfigurations,
  billingCycle,
  duration,
  startDate,
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
      case SubscriptionFrequency.Quarterly:
        return "Quarterly";
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

  const calculateTotalBillingCycleAmount = () => {
    return selectedServices.reduce((total, service) => {
      const config = serviceConfigurations.get(service._id);
      if (!config) return total;
      return total + calculateBillingCycleAmount(service, config, billingCycle);
    }, 0);
  };

  const calculateTotalSubscriptionCostForAllServices = () => {
    return selectedServices.reduce((total, service) => {
      const config = serviceConfigurations.get(service._id);
      if (!config) return total;
      return (
        total +
        calculateTotalSubscriptionCost(service, config, billingCycle, duration)
      );
    }, 0);
  };

  const getBillingCyclesInDuration = () => {
    switch (billingCycle) {
      case BillingCycle.Weekly:
        return duration;
      case BillingCycle.BiWeekly:
        return Math.ceil(duration / 2);
      case BillingCycle.Monthly:
        return duration;
      case BillingCycle.Quarterly:
        return Math.ceil(duration / 3);
      default:
        return duration;
    }
  };

  return (
    <div className={styles.detailed_breakdown}>
      {/* How Billing Works Section */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="info-circle" />
          How Our Billing System Works
        </h4>
        <div className={styles.detailed_breakdown__explanation}>
          <div className={styles.detailed_breakdown__explanation_item}>
            <h5>🔄 Two-Tier Frequency System</h5>
            <p>
              Our system uses two separate frequencies to give you maximum
              flexibility:
            </p>
            <ul>
              <li>
                <strong>Service Frequency:</strong> How often your services are
                performed (weekly, bi-weekly, monthly, quarterly)
              </li>
              <li>
                <strong>Billing Frequency:</strong> How often you're charged
                (weekly, bi-weekly, monthly, quarterly)
              </li>
            </ul>
          </div>

          <div className={styles.detailed_breakdown__explanation_item}>
            <h5>💰 Billing Calculation Formula</h5>
            <p>Your billing amount is calculated using this simple formula:</p>
            <div className={styles.detailed_breakdown__formula}>
              <strong>
                Billing Amount = Service Price × Services Per Billing Cycle
              </strong>
            </div>
            <p>
              Where "Services Per Billing Cycle" depends on your service
              frequency and billing cycle.
            </p>
          </div>

          <div className={styles.detailed_breakdown__explanation_item}>
            <h5>📅 Your Current Configuration</h5>
            <div className={styles.detailed_breakdown__config_summary}>
              <div className={styles.detailed_breakdown__config_item}>
                <span>Billing Cycle:</span>
                <strong>{formatBillingCycle(billingCycle)}</strong>
              </div>
              <div className={styles.detailed_breakdown__config_item}>
                <span>Duration:</span>
                <strong>
                  {duration} {getDurationLabel()}
                </strong>
              </div>
              <div className={styles.detailed_breakdown__config_item}>
                <span>Start Date:</span>
                <strong>{new Date(startDate).toLocaleDateString()}</strong>
              </div>
              <div className={styles.detailed_breakdown__config_item}>
                <span>Total Billing Cycles:</span>
                <strong>{getBillingCyclesInDuration()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service-by-Service Breakdown */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="calculator" />
          Service-by-Service Breakdown
        </h4>

        {selectedServices.map((service) => {
          const config = serviceConfigurations.get(service._id);
          if (!config) return null;

          const servicePrice = calculateServicePrice(service, config);
          const servicesPerBillingCycle = calculateServicesPerBillingCycle(
            config.frequency,
            config.scheduledDays.length,
            billingCycle
          );
          const billingCycleAmount = calculateBillingCycleAmount(
            service,
            config,
            billingCycle
          );
          const totalServiceCost = calculateTotalSubscriptionCost(
            service,
            config,
            billingCycle,
            duration
          );
          const pricingBreakdown = getPricingBreakdown(service, config);

          return (
            <div
              key={service._id}
              className={styles.detailed_breakdown__service}
            >
              <div className={styles.detailed_breakdown__service_header}>
                <div className={styles.detailed_breakdown__service_icon}>
                  <Icon name={getServiceIcon(service.category)} />
                </div>
                <div className={styles.detailed_breakdown__service_info}>
                  <h5>{service.name}</h5>
                  <p className={styles.detailed_breakdown__service_frequency}>
                    {getFrequencyLabel(config.frequency)} service on{" "}
                    {config.scheduledDays
                      .map(
                        (day, index) =>
                          `${getDayLabel(day)}${index < config.scheduledDays.length - 1 ? ", " : ""}`
                      )
                      .join("")}{" "}
                    at{" "}
                    {getTimeSlotLabel(config.preferredTimeSlot)
                      .split(" ")[0]
                      .toLowerCase()}
                  </p>
                </div>
              </div>

              <div className={styles.detailed_breakdown__service_calculation}>
                <div className={styles.detailed_breakdown__calculation_step}>
                  <h6>Step 1: Calculate Service Price</h6>
                  <div className={styles.detailed_breakdown__price_breakdown}>
                    <div className={styles.detailed_breakdown__price_item}>
                      <span>Base Price:</span>
                      <span>{formatToNaira(pricingBreakdown.basePrice)}</span>
                    </div>
                    {pricingBreakdown.adjustments.map((adjustment, index) => (
                      <div
                        key={index}
                        className={styles.detailed_breakdown__price_item}
                      >
                        <span>{adjustment.label}:</span>
                        <span>
                          {adjustment.multiplier
                            ? `${adjustment.multiplier}x multiplier`
                            : formatToNaira(adjustment.amount)}
                        </span>
                      </div>
                    ))}
                    <div
                      className={styles.detailed_breakdown__price_item_total}
                    >
                      <span>Service Price:</span>
                      <span>{formatToNaira(servicePrice)}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.detailed_breakdown__calculation_step}>
                  <h6>Step 2: Calculate Services Per Billing Cycle</h6>
                  <div
                    className={styles.detailed_breakdown__frequency_calculation}
                  >
                    <p>
                      <strong>Service Frequency:</strong>{" "}
                      {getFrequencyLabel(config.frequency)}
                    </p>
                    <p>
                      <strong>Scheduled Days:</strong>{" "}
                      {config.scheduledDays.length} day(s) per{" "}
                      {getFrequencyLabel(config.frequency).toLowerCase()}
                    </p>
                    <p>
                      <strong>Billing Cycle:</strong>{" "}
                      {formatBillingCycle(billingCycle)}
                    </p>
                    <div className={styles.detailed_breakdown__formula}>
                      <strong>
                        Services Per Billing Cycle ={" "}
                        {config.scheduledDays.length} ×{" "}
                        {servicesPerBillingCycle / config.scheduledDays.length}{" "}
                        = {Math.round(servicesPerBillingCycle)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className={styles.detailed_breakdown__calculation_step}>
                  <h6>Step 3: Calculate Billing Amount</h6>
                  <div
                    className={styles.detailed_breakdown__billing_calculation}
                  >
                    <div className={styles.detailed_breakdown__formula}>
                      <strong>
                        Billing Amount = {formatToNaira(servicePrice)} ×{" "}
                        {Math.round(servicesPerBillingCycle)} ={" "}
                        {formatToNaira(billingCycleAmount)}
                      </strong>
                    </div>
                    <p>
                      You'll be charged{" "}
                      <strong>{formatToNaira(billingCycleAmount)}</strong> every{" "}
                      {formatBillingCycle(billingCycle).toLowerCase()} for this
                      service.
                    </p>
                  </div>
                </div>

                <div className={styles.detailed_breakdown__calculation_step}>
                  <h6>Step 4: Calculate Total Service Cost</h6>
                  <div className={styles.detailed_breakdown__total_calculation}>
                    <p>
                      <strong>Total Billing Cycles:</strong>{" "}
                      {getBillingCyclesInDuration()}
                    </p>
                    <div className={styles.detailed_breakdown__formula}>
                      <strong>
                        Total Cost = {formatToNaira(billingCycleAmount)} ×{" "}
                        {getBillingCyclesInDuration()} ={" "}
                        {formatToNaira(totalServiceCost)}
                      </strong>
                    </div>
                    <p>
                      Total cost for this service over {duration}{" "}
                      {getDurationLabel()}:{" "}
                      <strong>{formatToNaira(totalServiceCost)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="summary" />
          Billing Summary
        </h4>

        <div className={styles.detailed_breakdown__summary}>
          <div className={styles.detailed_breakdown__summary_item}>
            <span>
              Amount per {formatBillingCycle(billingCycle).toLowerCase()}:
            </span>
            <strong>{formatToNaira(calculateTotalBillingCycleAmount())}</strong>
          </div>
          <div className={styles.detailed_breakdown__summary_item}>
            <span>Number of billing cycles:</span>
            <strong>{getBillingCyclesInDuration()}</strong>
          </div>
          <div className={styles.detailed_breakdown__summary_item}>
            <span>Total subscription cost:</span>
            <strong>
              {formatToNaira(calculateTotalSubscriptionCostForAllServices())}
            </strong>
          </div>
        </div>

        <div className={styles.detailed_breakdown__billing_schedule}>
          <h5>📅 Your Billing Schedule</h5>
          <p>
            You'll be charged{" "}
            <strong>{formatToNaira(calculateTotalBillingCycleAmount())}</strong>{" "}
            every {formatBillingCycle(billingCycle).toLowerCase()}, starting on{" "}
            <strong>{new Date(startDate).toLocaleDateString()}</strong>.
          </p>
          <p>
            This will continue for{" "}
            <strong>
              {duration} {getDurationLabel()}
            </strong>
            , totaling{" "}
            <strong>{getBillingCyclesInDuration()} billing cycles</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedBillingBreakdown;
