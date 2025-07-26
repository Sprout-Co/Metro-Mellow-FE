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
      {/* Non-Technical Summary - Added at the beginning */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="lightbulb" />
          Understanding Your Subscription (In Simple Terms)
        </h4>
        <div className={styles.detailed_breakdown__simple_summary}>
          <div className={styles.detailed_breakdown__summary_explanation}>
            <h5>🎯 What You Need to Know</h5>
            <p>
              Think of your subscription like a{" "}
              <strong>monthly gym membership</strong> or{" "}
              <strong>Netflix subscription</strong>. You pay a fixed amount
              regularly, and you get services delivered to your home.
            </p>
          </div>

          <div className={styles.detailed_breakdown__key_points}>
            <div className={styles.detailed_breakdown__key_point}>
              <div className={styles.detailed_breakdown__key_icon}>💳</div>
              <div>
                <h6>Fixed Monthly Payment</h6>
                <p>
                  You pay the same amount every{" "}
                  {formatBillingCycle(billingCycle).toLowerCase()}, just like
                  your phone bill
                </p>
              </div>
            </div>

            <div className={styles.detailed_breakdown__key_point}>
              <div className={styles.detailed_breakdown__key_icon}>📅</div>
              <div>
                <h6>Services on Schedule</h6>
                <p>
                  We come to your home on the days you choose, at the times you
                  prefer
                </p>
              </div>
            </div>

            <div className={styles.detailed_breakdown__key_point}>
              <div className={styles.detailed_breakdown__key_icon}>💰</div>
              <div>
                <h6>No Surprise Charges</h6>
                <p>
                  Your bill is calculated upfront - you know exactly what you'll
                  pay
                </p>
              </div>
            </div>

            <div className={styles.detailed_breakdown__key_point}>
              <div className={styles.detailed_breakdown__key_icon}>⏰</div>
              <div>
                <h6>Set It & Forget It</h6>
                <p>
                  Once set up, everything runs automatically - no need to
                  remember to book services
                </p>
              </div>
            </div>
          </div>

          <div className={styles.detailed_breakdown__how_it_works}>
            <h5>🔍 How Your Bill is Calculated</h5>
            <div className={styles.detailed_breakdown__calculation_example}>
              <p>
                <strong>Example:</strong> If you choose weekly cleaning for
                ₦5,000 per visit:
              </p>
              <ul>
                <li>Weekly cleaning = 4 visits per month</li>
                <li>4 visits × ₦5,000 = ₦20,000 per month</li>
                <li>You pay ₦20,000 monthly, we clean weekly</li>
              </ul>
              <p className={styles.detailed_breakdown__example_note}>
                💡 <strong>Simple:</strong> More frequent services = higher
                monthly bill, but better value per service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple How It Works */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="info-circle" />
          How Your Billing Works
        </h4>
        <div className={styles.detailed_breakdown__simple_explanation}>
          <div className={styles.detailed_breakdown__explanation_card}>
            <div className={styles.detailed_breakdown__explanation_icon}>
              💰
            </div>
            <div>
              <h5>Simple Formula</h5>
              <p>
                You pay for each service × how many times it happens per billing
                cycle
              </p>
            </div>
          </div>

          <div className={styles.detailed_breakdown__explanation_card}>
            <div className={styles.detailed_breakdown__explanation_icon}>
              📅
            </div>
            <div>
              <h5>Your Schedule</h5>
              <p>
                Billed every{" "}
                <strong>
                  {formatBillingCycle(billingCycle).toLowerCase()}
                </strong>{" "}
                for{" "}
                <strong>
                  {duration}{" "}
                  {billingCycle === BillingCycle.Weekly
                    ? "weeks"
                    : billingCycle === BillingCycle.Monthly
                      ? "months"
                      : "periods"}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Breakdown - Simplified */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="calculator" />
          What You're Paying For
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

          return (
            <div
              key={service._id}
              className={styles.detailed_breakdown__service_simple}
            >
              <div className={styles.detailed_breakdown__service_header}>
                <div className={styles.detailed_breakdown__service_icon}>
                  <Icon name={getServiceIcon(service.category)} />
                </div>
                <div className={styles.detailed_breakdown__service_info}>
                  <h5>{service.name}</h5>
                  <p>
                    {getFrequencyLabel(config.frequency)} on{" "}
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

              <div className={styles.detailed_breakdown__service_pricing}>
                <div className={styles.detailed_breakdown__pricing_row}>
                  <span>Price per service:</span>
                  <span>{formatToNaira(servicePrice)}</span>
                </div>
                <div className={styles.detailed_breakdown__pricing_row}>
                  <span>
                    Services per{" "}
                    {formatBillingCycle(billingCycle).toLowerCase()}:
                  </span>
                  <span>{Math.round(servicesPerBillingCycle)}</span>
                </div>
                <div className={styles.detailed_breakdown__pricing_row_total}>
                  <span>
                    Total per {formatBillingCycle(billingCycle).toLowerCase()}:
                  </span>
                  <span>{formatToNaira(billingCycleAmount)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Summary */}
      <div className={styles.detailed_breakdown__section}>
        <h4 className={styles.detailed_breakdown__section_title}>
          <Icon name="summary" />
          Your Billing Summary
        </h4>

        <div className={styles.detailed_breakdown__summary_simple}>
          <div className={styles.detailed_breakdown__summary_card}>
            <div className={styles.detailed_breakdown__summary_icon}>💳</div>
            <div>
              <h5>Per {formatBillingCycle(billingCycle).toLowerCase()}</h5>
              <p className={styles.detailed_breakdown__summary_amount}>
                {formatToNaira(calculateTotalBillingCycleAmount())}
              </p>
            </div>
          </div>

          <div className={styles.detailed_breakdown__summary_card}>
            <div className={styles.detailed_breakdown__summary_icon}>📊</div>
            <div>
              <h5>
                Total for {duration}{" "}
                {billingCycle === BillingCycle.Weekly
                  ? "weeks"
                  : billingCycle === BillingCycle.Monthly
                    ? "months"
                    : "periods"}
              </h5>
              <p className={styles.detailed_breakdown__summary_amount}>
                {formatToNaira(calculateTotalSubscriptionCostForAllServices())}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.detailed_breakdown__billing_note}>
          <p>
            💡 <strong>First payment:</strong>{" "}
            {new Date(startDate).toLocaleDateString()}
          </p>
          <p>
            💡 <strong>Billing cycles:</strong> {getBillingCyclesInDuration()}{" "}
            total
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedBillingBreakdown;
