"use client";

import React from 'react';
import styles from './ServiceSelector.module.scss';

export interface ServiceItem {
  id: string;
  name: string;
  selected: boolean;
}

interface ServiceSelectorProps {
  services: ServiceItem[];
  onServiceSelect: (serviceId: string) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ 
  services,
  onServiceSelect
}) => {
  return (
    <div className={styles.services}>
      <h3 className={styles.services__title}>Select your services</h3>
      <div className={styles.services__grid}>
        {services.map(service => (
          <div 
            key={service.id}
            className={`${styles.services__item} ${service.selected ? styles.services__item_selected : ''}`}
            onClick={() => onServiceSelect(service.id)}
          >
            <div className={styles.services__item_icon}>
              {service.selected && <span className={styles.services__item_check}>✓</span>}
            </div>
            <span className={styles.services__item_name}>{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
