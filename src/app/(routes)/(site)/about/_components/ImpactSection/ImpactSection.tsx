'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ImpactSection.module.scss';

const ImpactSection: React.FC = () => {
  return (
    <section className={styles['impact-section']}>
      <div className={styles['impact-section__container']}>
        <h2 className={styles['impact-section__heading']}>Our impacts</h2>
        <p className={styles['impact-section__description']}>
          We're the spark that turns your chaos into calm, the groove that gets your life back in tune.
        </p>
        
        <div className={styles['impact-section__stats']}>
          <div className={styles['impact-section__stat-item']}>
            <div className={styles['impact-section__stat-number']}>900+</div>
            <div className={styles['impact-section__stat-label']}>Project completed</div>
          </div>
          <div className={styles['impact-section__stat-item']}>
            <div className={styles['impact-section__stat-number']}>120+</div>
            <div className={styles['impact-section__stat-label']}>Hire hands</div>
          </div>
          <div className={styles['impact-section__stat-item']}>
            <div className={styles['impact-section__stat-number']}>20+</div>
            <div className={styles['impact-section__stat-label']}>states availability</div>
          </div>
        </div>
        
        <div className={styles['impact-section__map']}>
          <Image 
            src="/images/impact/map.png"
            alt="Metro Mellow global impact map"
            width={1200}
            height={600}
            priority
          />
        </div>
        
        <div className={styles['impact-section__cta']}>
          <button>JOIN OUR MISSION</button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection; 