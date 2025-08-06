'use client';

import { useState } from 'react';
import ServiceCard, { ServiceCardProps } from '../card/ServiceCard';
import styles from './ServiceList.module.scss';

interface ServiceListProps {
  services: ServiceCardProps[];
  activeTab: string;
}

export default function ServiceList({ services, activeTab }: ServiceListProps) {
  const filteredServices = services.filter(service => {
    if (activeTab === 'all') return true;
    return service.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className={styles.serviceList}>
      {filteredServices.length === 0 ? (
        <div className={styles.serviceList__empty}>
          <p>No {activeTab} services found.</p>
        </div>
      ) : (
        filteredServices.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))
      )}
    </div>
  );
}