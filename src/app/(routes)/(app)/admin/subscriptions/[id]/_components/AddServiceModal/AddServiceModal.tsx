"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import {
  Service,
  SubscriptionFrequency,
  TimeSlot,
  ScheduleDays,
  ServiceCategory,
  CleaningType,
  HouseType,
  LaundryType,
  Severity,
  TreatmentType,
  MealType,
  SubscriptionServiceInput,
} from "@/graphql/api";
import { ServiceConfiguration } from "../../../add/types/subscription";
import { formatToNaira } from "@/utils/string";
import { calculateServicePrice } from "@/utils/pricing";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import ServiceSpecificFields from "../../../add/_components/ServiceConfigurationSection/ServiceSpecificFields";
import styles from "./AddServiceModal.module.scss";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  onServiceAdded: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  subscriptionId,
  onServiceAdded,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );
  const [serviceConfigurations, setServiceConfigurations] = useState<
    Map<string, ServiceConfiguration>
  >(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handleGetServices } = useServiceOperations();
  const { handleAddServiceToSubscription } = useSubscriptionOperations();

  useEffect(() => {
    if (isOpen) {
      fetchServices();
    }
  }, [isOpen]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const servicesData = await handleGetServices();
      setServices(servicesData as Service[]);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to load services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeServiceConfiguration = (
    service: Service
  ): ServiceConfiguration => {
    return {
      serviceId: service._id,
      price: service.price,
      frequency: getDefaultFrequency(service.category),
      scheduledDays: [ScheduleDays.Monday],
      preferredTimeSlot: TimeSlot.Morning,
      serviceDetails: {
        serviceOption: service.options?.[0]?.id || "",
      },
      category: service.category,
      selectedOption: service.options?.[0]?.id || "",
      // Initialize service-specific configs with defaults
      ...(service.category === ServiceCategory.Cleaning && {
        cleaning: {
          cleaningType: CleaningType.StandardCleaning,
          houseType: HouseType.Flat,
          rooms: {
            balcony: 0,
            bathroom: 1,
            bedroom: 1,
            kitchen: 1,
            livingRoom: 1,
            lobby: 0,
            other: 0,
            outdoor: 0,
            studyRoom: 0,
          },
        },
      }),
      ...(service.category === ServiceCategory.Laundry && {
        laundry: {
          bags: 1,
          laundryType: LaundryType.StandardLaundry,
          items: {
            shirts: 0,
            pants: 0,
            dresses: 0,
            suits: 0,
            others: 0,
          },
        },
      }),
      ...(service.category === ServiceCategory.PestControl && {
        pestControl: {
          areas: [],
          severity: Severity.Medium,
          treatmentType: TreatmentType.Residential,
        },
      }),
      ...(service.category === ServiceCategory.Cooking && {
        cooking: {
          mealType: MealType.Standard,
          mealsPerDelivery: [],
        },
      }),
    };
  };

  const getDefaultFrequency = (
    category: ServiceCategory
  ): SubscriptionFrequency => {
    switch (category) {
      case ServiceCategory.Cleaning:
      case ServiceCategory.Laundry:
        return SubscriptionFrequency.Weekly;
      case ServiceCategory.Cooking:
        return SubscriptionFrequency.Weekly;
      case ServiceCategory.PestControl:
        return SubscriptionFrequency.Quarterly;
      default:
        return SubscriptionFrequency.Weekly;
    }
  };

  const getServiceFrequencyOptions = (
    category: ServiceCategory
  ): SubscriptionFrequency[] => {
    switch (category) {
      case ServiceCategory.Cleaning:
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
        return [SubscriptionFrequency.Weekly];
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    const newSelectedServices = new Set(selectedServices);
    const newConfigurations = new Map(serviceConfigurations);

    if (selectedServices.has(serviceId)) {
      newSelectedServices.delete(serviceId);
      newConfigurations.delete(serviceId);
    } else {
      newSelectedServices.add(serviceId);
      const service = services.find((s) => s._id === serviceId);
      if (service) {
        newConfigurations.set(
          serviceId,
          initializeServiceConfiguration(service)
        );
      }
    }

    setSelectedServices(newSelectedServices);
    setServiceConfigurations(newConfigurations);
  };

  const handleConfigurationUpdate = (
    serviceId: string,
    config: Partial<ServiceConfiguration>
  ) => {
    const newConfigurations = new Map(serviceConfigurations);
    const currentConfig = newConfigurations.get(serviceId);
    if (currentConfig) {
      newConfigurations.set(serviceId, { ...currentConfig, ...config });
      setServiceConfigurations(newConfigurations);
    }
  };

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

    const updatedConfig = { ...config, scheduledDays: updated };

    // Calculate new price with updated days
    const service = services.find((s) => s._id === serviceId);
    if (service) {
      const newPrice = calculateServicePrice(service, updatedConfig);
      handleConfigurationUpdate(serviceId, {
        scheduledDays: updated,
        price: newPrice,
      });
    } else {
      handleConfigurationUpdate(serviceId, { scheduledDays: updated });
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

  const calculateTotalPrice = (): number => {
    return Array.from(serviceConfigurations.values()).reduce(
      (total, config) => total + config.price,
      0
    );
  };

  const handleSubmit = async () => {
    if (selectedServices.size === 0) {
      setError("Please select at least one service.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Add each selected service to the subscription
      for (const serviceId of selectedServices) {
        const config = serviceConfigurations.get(serviceId);
        if (!config) continue;

        const serviceInput: SubscriptionServiceInput = {
          serviceId: config.serviceId,
          category: config.category,
          frequency: config.frequency,
          preferredTimeSlot: config.preferredTimeSlot,
          price: config.price,
          scheduledDays: config.scheduledDays,
          serviceDetails: {
            serviceOption: config.selectedOption,
            ...(config.cleaning && { cleaning: config.cleaning }),
            ...(config.laundry && { laundry: config.laundry }),
            ...(config.pestControl && { pestControl: config.pestControl }),
            ...(config.cooking && { cooking: config.cooking }),
          },
        };

        await handleAddServiceToSubscription(subscriptionId, serviceInput);
      }

      // Success - close modal and refresh
      onServiceAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding services:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add services. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedServices(new Set());
    setServiceConfigurations(new Map());
    setError(null);
    onClose();
  };

  const renderServiceConfiguration = () => {
    if (selectedServices.size === 0) return null;

    return (
      <motion.div
        className={styles.add_service_modal__configuration}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className={styles.add_service_modal__section_title}>
          <Icon name="settings" size={16} />
          Service Configuration
        </h4>
        <AnimatePresence>
          {Array.from(selectedServices).map((serviceId) => {
            const service = services.find((s) => s._id === serviceId);
            const config = serviceConfigurations.get(serviceId);

            if (!service || !config) return null;

            return (
              <motion.div
                key={serviceId}
                className={styles.add_service_modal__config_item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.add_service_modal__config_header}>
                  <h5>{service.name}</h5>
                  <div className={styles.add_service_modal__config_price}>
                    <Icon name={getServiceIcon(service.category)} size={16} />
                    <span>{formatToNaira(config.price)}</span>
                  </div>
                </div>

                <div className={styles.add_service_modal__config_fields}>
                  {/* Service Options */}
                  {service.options && service.options.length > 0 && (
                    <div className={styles.add_service_modal__field}>
                      <label>Service Option</label>
                      <select
                        value={config.selectedOption || ""}
                        onChange={(e) => {
                          const selectedOptionId = e.target.value;
                          const updatedConfig = {
                            ...config,
                            selectedOption: selectedOptionId,
                            serviceDetails: {
                              ...config.serviceDetails,
                              serviceOption: selectedOptionId,
                            },
                          };

                          const newPrice = calculateServicePrice(
                            service,
                            updatedConfig
                          );
                          handleConfigurationUpdate(serviceId, {
                            selectedOption: selectedOptionId,
                            price: newPrice,
                            serviceDetails: updatedConfig.serviceDetails,
                          });
                        }}
                        className={styles.add_service_modal__select}
                      >
                        <option value="">Select an option</option>
                        {service.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label} - {formatToNaira(option.price)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Service-Specific Fields */}
                  <ServiceSpecificFields
                    serviceCategory={service.category}
                    config={config}
                    onConfigurationUpdate={handleConfigurationUpdate}
                    serviceId={serviceId}
                    service={service}
                  />

                  {/* Frequency */}
                  <div className={styles.add_service_modal__field}>
                    <label>Frequency</label>
                    <select
                      value={config.frequency}
                      onChange={(e) => {
                        const frequency = e.target
                          .value as SubscriptionFrequency;
                        const updatedConfig = { ...config, frequency };
                        const newPrice = calculateServicePrice(
                          service,
                          updatedConfig
                        );
                        handleConfigurationUpdate(serviceId, {
                          frequency,
                          price: newPrice,
                        });
                      }}
                      className={styles.add_service_modal__select}
                    >
                      {getServiceFrequencyOptions(service.category).map(
                        (frequency) => (
                          <option key={frequency} value={frequency}>
                            {getFrequencyLabel(frequency)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Time Slot */}
                  <div className={styles.add_service_modal__field}>
                    <label>Preferred Time</label>
                    <select
                      value={config.preferredTimeSlot}
                      onChange={(e) =>
                        handleConfigurationUpdate(serviceId, {
                          preferredTimeSlot: e.target.value as TimeSlot,
                        })
                      }
                      className={styles.add_service_modal__select}
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
                  <div className={styles.add_service_modal__field}>
                    <label>Scheduled Days</label>
                    <div className={styles.add_service_modal__days_grid}>
                      {Object.values(ScheduleDays).map((day) => (
                        <label
                          key={day}
                          className={styles.add_service_modal__day_checkbox}
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Services to Subscription"
      maxWidth="800px"
      maxHeight="90vh"
    >
      <div className={styles.add_service_modal}>
        {error && (
          <motion.div
            className={styles.add_service_modal__error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="alert-triangle" size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        {isLoading ? (
          <div className={styles.add_service_modal__loading}>
            <Icon name="loader" size={24} />
            <p>Loading services...</p>
          </div>
        ) : (
          <>
            {/* Service Selection */}
            <motion.div
              className={styles.add_service_modal__selection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className={styles.add_service_modal__section_title}>
                <Icon name="list" size={16} />
                Available Services
              </h4>
              <div className={styles.add_service_modal__services_grid}>
                {services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    className={`${styles.add_service_modal__service_card} ${
                      selectedServices.has(service._id)
                        ? styles["add_service_modal__service_card--selected"]
                        : ""
                    }`}
                    onClick={() => handleServiceToggle(service._id)}
                    // initial={{ opacity: 0, y: 20 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.2, delay: index * 0.05 }}
                    // whileHover={{ scale: 1.02 }}
                    // whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.add_service_modal__service_icon}>
                      <Icon name={getServiceIcon(service.category)} size={18} />
                    </div>
                    <div className={styles.add_service_modal__service_info}>
                      <h5>{service.name}</h5>
                      <p>{service.description}</p>
                      <span className={styles.add_service_modal__service_price}>
                        From {formatToNaira(service.price)}
                      </span>
                    </div>
                    <div className={styles.add_service_modal__service_checkbox}>
                      <input
                        type="checkbox"
                        checked={selectedServices.has(service._id)}
                        onChange={() => handleServiceToggle(service._id)}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Service Configuration */}
            {renderServiceConfiguration()}

            {/* Footer */}
            <motion.div
              className={styles.add_service_modal__footer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className={styles.add_service_modal__total}>
                {selectedServices.size > 0 && (
                  <div className={styles.add_service_modal__total_price}>
                    <span>
                      Total: {formatToNaira(calculateTotalPrice())}/month
                    </span>
                    <small>{selectedServices.size} service(s) selected</small>
                  </div>
                )}
              </div>
              <div className={styles.add_service_modal__actions}>
                <Button variant="secondary" size="md" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                  disabled={selectedServices.size === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="loader" size={16} />
                      <span>Adding...</span>
                    </>
                  ) : (
                    "Add Services"
                  )}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddServiceModal;
