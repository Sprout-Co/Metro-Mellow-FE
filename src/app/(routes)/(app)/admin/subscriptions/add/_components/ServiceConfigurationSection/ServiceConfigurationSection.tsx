import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import Button from "../../../../_components/UI/Button/Button";
import { Service, SubscriptionFrequency, TimeSlot, ScheduleDays, ServiceCategory } from "@/graphql/api";
import styles from "./ServiceConfigurationSection.module.scss";

interface ServiceConfiguration {
  serviceId: string;
  price: number;
  frequency: SubscriptionFrequency;
  scheduledDays: ScheduleDays[];
  preferredTimeSlot: TimeSlot;
  serviceDetails: any;
  category: ServiceCategory;
}

interface ServiceConfigurationSectionProps {
  services: Service[];
  serviceConfigurations: ServiceConfiguration[];
  onAddService: () => void;
  onUpdateService: (index: number, service: ServiceConfiguration) => void;
  onRemoveService: (index: number) => void;
}

const ServiceConfigurationSection: React.FC<ServiceConfigurationSectionProps> = ({
  services,
  serviceConfigurations,
  onAddService,
  onUpdateService,
  onRemoveService,
}) => {
  const handleServiceChange = (index: number, field: keyof ServiceConfiguration, value: any) => {
    const updated = { ...serviceConfigurations[index], [field]: value };
    onUpdateService(index, updated);
  };

  const handleScheduledDaysChange = (index: number, day: ScheduleDays, checked: boolean) => {
    const current = serviceConfigurations[index].scheduledDays;
    const updated = checked 
      ? [...current, day]
      : current.filter(d => d !== day);
    handleServiceChange(index, 'scheduledDays', updated);
  };

  const getServiceOptions = (excludeIds: string[]) => {
    return services.filter(service => !excludeIds.includes(service._id));
  };

  const usedServiceIds = serviceConfigurations.map(config => config.serviceId).filter(Boolean);

  return (
    <Card className={styles.service_configuration}>
      <div className={styles.service_configuration__header}>
        <h3 className={styles.service_configuration__title}>
          <Icon name="package" />
          Service Configuration
        </h3>
        <Button
          variant="secondary"
          size="small"
          icon="+"
          onClick={onAddService}
        >
          Add Service
        </Button>
      </div>

      {serviceConfigurations.length === 0 ? (
        <div className={styles.service_configuration__empty}>
          <Icon name="package" size={48} />
          <p>No services added yet</p>
          <Button variant="primary" onClick={onAddService}>
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className={styles.service_configuration__services}>
          {serviceConfigurations.map((config, index) => {
            const availableServices = getServiceOptions(usedServiceIds.filter((_, i) => i !== index));
            const selectedService = services.find(s => s._id === config.serviceId);

            return (
              <div key={index} className={styles.service_configuration__service_item}>
                <div className={styles.service_configuration__service_header}>
                  <h4>Service {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => onRemoveService(index)}
                    className={styles.service_configuration__remove_btn}
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>

                <div className={styles.service_configuration__grid}>
                  <div className={styles.service_configuration__field}>
                    <label>Service Type</label>
                    <select
                      value={config.serviceId}
                      onChange={(e) => {
                        const service = services.find(s => s._id === e.target.value);
                        handleServiceChange(index, 'serviceId', e.target.value);
                        if (service) {
                          handleServiceChange(index, 'category', service.category);
                          handleServiceChange(index, 'price', service.basePrice || 0);
                        }
                      }}
                      className={styles.service_configuration__select}
                    >
                      <option value="">Select service...</option>
                      {availableServices.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.service_configuration__field}>
                    <label>Price ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={config.price}
                      onChange={(e) => handleServiceChange(index, 'price', parseFloat(e.target.value) || 0)}
                      className={styles.service_configuration__input}
                    />
                  </div>

                  <div className={styles.service_configuration__field}>
                    <label>Frequency</label>
                    <select
                      value={config.frequency}
                      onChange={(e) => handleServiceChange(index, 'frequency', e.target.value as SubscriptionFrequency)}
                      className={styles.service_configuration__select}
                    >
                      <option value={SubscriptionFrequency.Weekly}>Weekly</option>
                      <option value={SubscriptionFrequency.BiWeekly}>Bi-weekly</option>
                      <option value={SubscriptionFrequency.Monthly}>Monthly</option>
                    </select>
                  </div>

                  <div className={styles.service_configuration__field}>
                    <label>Preferred Time</label>
                    <select
                      value={config.preferredTimeSlot}
                      onChange={(e) => handleServiceChange(index, 'preferredTimeSlot', e.target.value as TimeSlot)}
                      className={styles.service_configuration__select}
                    >
                      <option value={TimeSlot.Morning}>Morning (8AM - 12PM)</option>
                      <option value={TimeSlot.Afternoon}>Afternoon (12PM - 5PM)</option>
                      <option value={TimeSlot.Evening}>Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.service_configuration__field}>
                  <label>Scheduled Days</label>
                  <div className={styles.service_configuration__days}>
                    {Object.values(ScheduleDays).map((day) => (
                      <label key={day} className={styles.service_configuration__day_checkbox}>
                        <input
                          type="checkbox"
                          checked={config.scheduledDays.includes(day)}
                          onChange={(e) => handleScheduledDaysChange(index, day, e.target.checked)}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedService && (
                  <div className={styles.service_configuration__service_info}>
                    <p><strong>Category:</strong> {selectedService.category}</p>
                    {selectedService.description && (
                      <p><strong>Description:</strong> {selectedService.description}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ServiceConfigurationSection;