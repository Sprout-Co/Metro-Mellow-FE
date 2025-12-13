"use client";

import React from "react";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./ServiceSelectionModal.module.scss";
import { ServiceOption, ServiceCategory } from "@/graphql/api";
import { Button } from "@/components/ui/Button/Button";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import { ServiceStatus } from "@/graphql/api";

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCategory: ServiceCategory;
  onServiceSelect: (serviceOption: ServiceOption) => void;
}

const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({
  isOpen,
  onClose,
  serviceCategory,
  onServiceSelect,
}) => {
  const { data: servicesData, loading } = useGetServices({
    category: serviceCategory,
    status: ServiceStatus.Active,
  });

  const handleServiceClick = (serviceOption: ServiceOption) => {
    onServiceSelect(serviceOption);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Service"
      maxWidth="600px"
      showCloseButton={true}
      className={styles.serviceSelectionModal}
    >
      <div className={styles.modal__content}>
        {loading ? (
          <div className={styles.modal__loading}>
            <div className={styles.modal__loader}></div>
            <p>Loading services...</p>
          </div>
        ) : (
          <>
            <p className={styles.modal__description}>
              Choose the service that best fits your needs
            </p>
            <div className={styles.modal__servicesList}>
              {servicesData?.services?.[0]?.options?.map((serviceOption) => (
                <div
                  key={serviceOption.id}
                  className={styles.modal__serviceCard}
                  onClick={() => handleServiceClick(serviceOption)}
                >
                  <div className={styles.serviceCard__header}>
                    <h3 className={styles.serviceCard__title}>
                      {serviceOption.label}
                    </h3>
                    <div className={styles.serviceCard__price}>
                      ₦{serviceOption.price.toLocaleString()}
                    </div>
                  </div>
                  <p className={styles.serviceCard__description}>
                    {serviceOption.description}
                  </p>
                  {/* {serviceOption.inclusions &&
                    serviceOption.inclusions.length > 0 && (
                      <ul className={styles.serviceCard__inclusions}>
                        {serviceOption.inclusions
                          .slice(0, 3)
                          .map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                      </ul>
                    )} */}
                  <Button
                    variant="primary"
                    size="sm"
                    className={styles.serviceCard__button}
                  >
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ServiceSelectionModal;
