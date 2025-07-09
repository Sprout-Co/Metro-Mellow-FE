'use client';

import React from 'react';
import styles from './ServiceCoverage.module.scss';

const pests = [
  {
    name: 'Ants',
    emoji: '🐜',
    description: 'Elimination of common household ants and their colonies.'
  },
  {
    name: 'Cockroaches',
    emoji: '🪳',
    description: 'Targeted treatments for all major cockroach species.'
  },
  {
    name: 'Rodents',
    emoji: '🐭',
    description: 'Safe removal and prevention of mice and rats.'
  },
  {
    name: 'Termites',
    emoji: '🪲',
    description: 'Comprehensive termite inspection and control.'
  },
  {
    name: 'Mosquitoes',
    emoji: '🦟',
    description: 'Outdoor and indoor mosquito management.'
  },
  {
    name: 'Bed Bugs',
    emoji: '🛏️',
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
                <span className={styles.serviceCoverage__emoji} role="img" aria-label={pest.name}>{pest.emoji}</span>
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