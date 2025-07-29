import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import {
  Service,
  SubscriptionFrequency,
  TimeSlot,
  ScheduleDays,
  ServiceCategory,
} from "@/graphql/api";
import { ServiceConfiguration } from "@/app/(routes)/(app)/admin/subscriptions/add/types/subscription";
import { formatToNaira } from "@/utils/string";
import { calculateServicePrice } from "@/utils/pricing";
import ServiceSpecificFields from "./ServiceSpecificFields";
import styles from "./ServiceConfigurationSection.module.scss";

interface ServiceConfigurationSectionProps {
  services: Service[];
  selectedServices: Set<string>;
  serviceConfigurations: Map<string, ServiceConfiguration>;
  onServiceToggle: (serviceId: string) => void;
  onConfigurationUpdate: (
    serviceId: string,
    config: Partial<ServiceConfiguration>
  ) => void;
  isServiceDisabled?: (serviceId: string) => boolean;
  isLoading?: boolean;
}

const ServiceConfigurationSection: React.FC<
  ServiceConfigurationSectionProps
> = ({
  services,
  selectedServices,
  serviceConfigurations,
  onServiceToggle,
  onConfigurationUpdate,
  isServiceDisabled,
  isLoading = false,
}) => {
  const handleScheduledDaysChange = (
    serviceId: string,
    day: ScheduleDays,
    checked: boolean
  ) => {
    const config = serviceConfigurations.get(serviceId);
    if (!config) return;

    const current = config.scheduledDays;
    const updated = checked
      ? [...current, day]
      : current.filter((d) => d !== day);

    const updatedConfig = {
      ...config,
      scheduledDays: updated,
    };

    // Calculate new price with updated days
    const service = services.find((s) => s._id === serviceId);
    if (service) {
      const newPrice = calculateServicePrice(service, updatedConfig);
      onConfigurationUpdate(serviceId, {
        scheduledDays: updated,
        price: newPrice,
      });
    } else {
      onConfigurationUpdate(serviceId, { scheduledDays: updated });
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

  const getFrequencyLabel = (frequency: SubscriptionFrequency): string => {
    switch (frequency) {
      case SubscriptionFrequency.Daily:
        return "Daily";
      case SubscriptionFrequency.Weekly:
        return "Weekly (Every Week)";
      case SubscriptionFrequency.BiWeekly:
        return "Bi-Weekly (Every 2 Weeks)";
      case SubscriptionFrequency.Monthly:
        return "Monthly (Every Month)";
      case SubscriptionFrequency.Quarterly:
        return "Quarterly (Every 3 Months)";
      default:
        return "invalid frequency";
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

  if (isLoading) {
    return (
      <Card className={styles.service_configuration}>
        <div className={styles.service_configuration__loading}>
          <Icon name="loader" size={24} />
          <p>Loading services...</p>
        </div>
      </Card>
    );
  }

  const getServiceFrequencyOptions = (
    service: ServiceCategory
  ): SubscriptionFrequency[] => {
    switch (service) {
      case ServiceCategory.Cleaning:
        return [
          SubscriptionFrequency.Weekly,
          SubscriptionFrequency.BiWeekly,
          SubscriptionFrequency.Monthly,
        ];
      case ServiceCategory.Laundry:
        return [
          SubscriptionFrequency.Weekly,
          SubscriptionFrequency.BiWeekly,
          SubscriptionFrequency.Monthly,
        ];
      case ServiceCategory.Cooking:
        return [SubscriptionFrequency.Weekly, SubscriptionFrequency.BiWeekly];
      case ServiceCategory.PestControl:
        return [SubscriptionFrequency.Quarterly];
      default:
        return [];
    }
  };

  return (
    <Card className={styles.service_configuration}>
      <div className={styles.service_configuration__header}>
        <h3 className={styles.service_configuration__title}>
          <Icon name="package" />
          Service Configuration
        </h3>
        <p className={styles.service_configuration__subtitle}>
          Select services and configure their settings
        </p>
      </div>

      {/* Service Selection */}
      <div className={styles.service_configuration__selection}>
        <h4 className={styles.service_configuration__section_title}>
          Available Services
        </h4>
        <div className={styles.service_configuration__services_grid}>
          {services.map((service) => {
            const isDisabled = isServiceDisabled
              ? isServiceDisabled(service._id)
              : false;
            return (
              <div
                key={service._id}
                className={`${styles.service_configuration__service_card} ${
                  selectedServices.has(service._id)
                    ? styles["service_configuration__service_card--selected"]
                    : ""
                } ${
                  isDisabled
                    ? styles["service_configuration__service_card--disabled"]
                    : ""
                }`}
                onClick={() => !isDisabled && onServiceToggle(service._id)}
              >
                <div className={styles.service_configuration__service_icon}>
                  <Icon name={getServiceIcon(service.category)} />
                </div>
                <div className={styles.service_configuration__service_info}>
                  <h5>{service.name}</h5>
                  <p>{service.description}</p>
                  <span className={styles.service_configuration__service_price}>
                    {formatToNaira(service.price)}
                  </span>
                  {isDisabled && (
                    <p
                      className={
                        styles.service_configuration__service_disabled_message
                      }
                    >
                      {service.category === ServiceCategory.PestControl
                        ? "Not available with other services"
                        : "Not available with pest control"}
                    </p>
                  )}
                </div>
                <div className={styles.service_configuration__service_checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedServices.has(service._id)}
                    onChange={() => !isDisabled && onServiceToggle(service._id)}
                    disabled={isDisabled}
                    className={styles.service_configuration__checkbox}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Configuration */}
      {selectedServices.size > 0 && (
        <div className={styles.service_configuration__config}>
          <h4 className={styles.service_configuration__section_title}>
            Service Settings
          </h4>
          {Array.from(selectedServices).map((serviceId) => {
            const service = services.find((s) => s._id === serviceId);
            const config = serviceConfigurations.get(serviceId);

            if (!service || !config) return null;

            return (
              <div
                key={serviceId}
                className={styles.service_configuration__config_item}
              >
                <div className={styles.service_configuration__config_header}>
                  <h5>{service.name}</h5>
                  <div
                    className={
                      styles.service_configuration__config_header_right
                    }
                  >
                    <Icon name={getServiceIcon(service.category)} />
                    <span
                      className={styles.service_configuration__config_price}
                    >
                      {formatToNaira(config.price)}
                    </span>
                  </div>
                </div>

                <div className={styles.service_configuration__config_grid}>
                  {/* Service Options */}
                  {service.options && service.options.length > 0 && (
                    <div className={styles.service_configuration__field}>
                      <label>Service Option</label>
                      <select
                        value={config.selectedOption || ""}
                        onChange={(e) => {
                          const selectedOptionId = e.target.value;
                          const selectedOption = service.options?.find(
                            (option) => option.id === selectedOptionId
                          );

                          const updatedConfig = {
                            ...config,
                            selectedOption: selectedOptionId,
                            serviceDetails: {
                              ...config.serviceDetails,
                              serviceOption: selectedOptionId,
                            },
                          };

                          // Calculate new price using the pricing utility
                          const newPrice = calculateServicePrice(
                            service,
                            updatedConfig
                          );

                          onConfigurationUpdate(serviceId, {
                            selectedOption: selectedOptionId,
                            price: newPrice,
                            serviceDetails: updatedConfig.serviceDetails,
                          });
                        }}
                        className={styles.service_configuration__select}
                      >
                        <option value="">Select an option</option>
                        {service.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label} - {formatToNaira(option.price)}
                          </option>
                        ))}
                      </select>
                      <p
                        className={
                          styles.service_configuration__field_description
                        }
                      >
                        Select a specific service option to customize your
                        experience.
                        {config.selectedOption && (
                          <>
                            <br />
                            Selected:{" "}
                            <strong>
                              {service.options?.find(
                                (opt) => opt.id === config.selectedOption
                              )?.label || config.selectedOption}
                            </strong>
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Service-Specific Fields */}
                  <ServiceSpecificFields
                    serviceCategory={service.category}
                    config={config}
                    onConfigurationUpdate={onConfigurationUpdate}
                    serviceId={serviceId}
                    service={service}
                  />

                  {/* Frequency */}
                  <div className={styles.service_configuration__field}>
                    <label>Frequency</label>
                    <select
                      value={config.frequency}
                      onChange={(e) => {
                        const updatedConfig = {
                          ...config,
                          frequency: e.target.value as SubscriptionFrequency,
                        };

                        // Calculate new price with updated frequency
                        const service = services.find(
                          (s) => s._id === serviceId
                        );
                        if (service) {
                          const newPrice = calculateServicePrice(
                            service,
                            updatedConfig
                          );
                          onConfigurationUpdate(serviceId, {
                            frequency: e.target.value as SubscriptionFrequency,
                            price: newPrice,
                          });
                        } else {
                          onConfigurationUpdate(serviceId, {
                            frequency: e.target.value as SubscriptionFrequency,
                          });
                        }
                      }}
                      className={styles.service_configuration__select}
                    >
                      <option value="">Select a frequency</option>
                      {getServiceFrequencyOptions(service.category).map(
                        (frequency) => (
                          <option key={frequency} value={frequency}>
                            {getFrequencyLabel(frequency)}
                          </option>
                        )
                      )}
                      {/* <option value={SubscriptionFrequency.Daily}>
                        Daily (Every Day)
                      </option>
                      <option value={SubscriptionFrequency.Weekly}>
                        Weekly (Every Week)
                      </option>
                      <option value={SubscriptionFrequency.BiWeekly}>
                        Bi-Weekly (Every 2 Weeks)
                      </option>
                      <option value={SubscriptionFrequency.Monthly}>
                        Monthly (Every Month)
                      </option> */}
                    </select>
                    <p
                      className={
                        styles.service_configuration__field_description
                      }
                    >
                      Frequency is how often you want the service to be
                      delivered.
                      <br />
                      Every{" "}
                      {config.scheduledDays
                        .map((day) => getDayLabel(day))
                        .join(", ")}{" "}
                      for {getFrequencyLabel(config.frequency).toLowerCase()}
                    </p>
                  </div>

                  {/* Time Slot */}
                  <div className={styles.service_configuration__field}>
                    <label>Preferred Time</label>
                    <select
                      value={config.preferredTimeSlot}
                      onChange={(e) =>
                        onConfigurationUpdate(serviceId, {
                          preferredTimeSlot: e.target.value as TimeSlot,
                        })
                      }
                      className={styles.service_configuration__select}
                    >
                      <option value={TimeSlot.Morning}>
                        Morning (8AM - 12PM)
                      </option>
                      <option value={TimeSlot.Afternoon}>
                        Afternoon (12PM - 4PM)
                      </option>
                      <option value={TimeSlot.Evening}>
                        Evening (4PM - 8PM)
                      </option>
                    </select>
                  </div>

                  {/* Scheduled Days */}
                  <div className={styles.service_configuration__field}>
                    <label>Scheduled Days</label>
                    <div className={styles.service_configuration__days_grid}>
                      {Object.values(ScheduleDays).map((day) => (
                        <label
                          key={day}
                          className={styles.service_configuration__day_checkbox}
                        >
                          <input
                            type="checkbox"
                            checked={config.scheduledDays.includes(day)}
                            onChange={(e) =>
                              handleScheduledDaysChange(
                                serviceId,
                                day,
                                e.target.checked
                              )
                            }
                          />
                          <span>{getDayLabel(day)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedServices.size === 0 && (
        <div className={styles.service_configuration__empty}>
          <Icon name="package" size={48} />
          <p>No services selected</p>
          <p>Select services from above to configure their settings</p>
        </div>
      )}
    </Card>
  );
};

export default ServiceConfigurationSection;
