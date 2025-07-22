import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { Service } from "@/graphql/api";
import styles from "./ServiceSelectionSection.module.scss";

interface ServiceSelectionSectionProps {
  services: Service[];
  selectedServiceId: string;
  selectedOptionId: string;
  onServiceSelect: (id: string) => void;
  onOptionSelect: (id: string) => void;
  isLoading?: boolean;
}

const ServiceSelectionSection: React.FC<ServiceSelectionSectionProps> = ({
  services,
  selectedServiceId,
  selectedOptionId,
  onServiceSelect,
  onOptionSelect,
  isLoading = false,
}) => {
  const selectedService = services.find((s) => s._id === selectedServiceId);

  return (
    <Card className={styles.service_selection}>
      <h3 className={styles.service_selection__title}>
        <Icon name="package" />
        Service
      </h3>

      {isLoading ? (
        <div className={styles.service_selection__loading}>
          <Icon name="loader" size={20} />
          <span>Loading services...</span>
        </div>
      ) : (
        <>
          <div className={styles.service_selection__field}>
            <label className={styles.service_selection__label}>
              Service Type
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => {
                onServiceSelect(e.target.value);
                onOptionSelect(""); // Reset option when service changes
              }}
              className={styles.service_selection__select}
              disabled={isLoading}
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.label} - {service.displayPrice}
                </option>
              ))}
            </select>
          </div>

          {/* Service Options */}
          {selectedService?.options && selectedService.options.length > 0 && (
            <div className={styles.service_selection__field}>
              <label className={styles.service_selection__label}>
                Service Option
              </label>
              <select
                value={selectedOptionId}
                onChange={(e) => onOptionSelect(e.target.value)}
                className={styles.service_selection__select}
                disabled={isLoading}
                required
              >
                <option value="">Select an option</option>
                {selectedService.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} - From ₦{option.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default ServiceSelectionSection;
