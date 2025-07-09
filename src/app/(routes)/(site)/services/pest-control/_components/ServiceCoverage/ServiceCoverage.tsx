'use client';

import React from 'react';
import styles from './ServiceCoverage.module.scss';
import { Icon } from '@/components/ui/Icon/Icon';

const pests = [
  {
    name: 'Ants',
    icon: 'bug',
    description: 'Elimination of common household ants and their colonies.'
  },
  {
    name: 'Cockroaches',
    icon: 'shield',
    description: 'Targeted treatments for all major cockroach species.'
  },
  {
    name: 'Rodents',
    icon: 'activity',
    description: 'Safe removal and prevention of mice and rats.'
  },
  {
    name: 'Termites',
    icon: 'droplet',
    description: 'Comprehensive termite inspection and control.'
  },
  {
    name: 'Mosquitoes',
    icon: 'zap',
    description: 'Outdoor and indoor mosquito management.'
  },
  {
    name: 'Bed Bugs',
    icon: 'bed',
    description: 'Effective eradication of bed bug infestations.'
  },
];

const ServiceCoverage = () => {
  return (
    <section className={styles.serviceCoverage}>
      <div className={styles.serviceCoverage__container}>
        <h2 className={styles.serviceCoverage__title}>What We Treat</h2>
        <div className={styles.serviceCoverage__grid}>
          {pests.map((pest) => (
            <div key={pest.name} className={styles.serviceCoverage__card}>
              <div className={styles.serviceCoverage__iconWrapper}>
                <Icon name={pest.icon} size={40} />
              </div>
              <div className={styles.serviceCoverage__cardContent}>
                <h3 className={styles.serviceCoverage__cardTitle}>{pest.name}</h3>
                <p className={styles.serviceCoverage__cardDesc}>{pest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverage; 