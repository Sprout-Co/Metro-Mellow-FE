import React from 'react';
import styles from './ServiceHero.module.scss';

interface ServiceHeroProps {
  onBookServices?: () => void;
}

const services = [
  { name: 'Laundromat', colorClass: styles['service-badge--laundromat'] },
  { name: 'Cleaning', colorClass: styles['service-badge--cleaning'] },
  { name: 'Cooking', colorClass: styles['service-badge--cooking'] },
  { name: 'Errands', colorClass: styles['service-badge--errands'] },
  { name: 'Pests', colorClass: styles['service-badge--pests'] },
];

const ServiceHero: React.FC<ServiceHeroProps> = ({ onBookServices }) => {
  return (
    <section className={styles['service-hero']}>
      <div className={styles['service-hero__wrapper']}>
        {/* Left: Call to Action */}
        <div className={styles['service-hero__left']}>
          <div className={styles['service-hero__cta-block']}>
            <h1 className={styles['service-hero__heading']}>
              Unburden<br />yourself!
            </h1>
            <button
              className={styles['service-hero__cta']}
              onClick={onBookServices}
              type="button"
            >
              BOOK A SERVICES
            </button>
          </div>
        </div>
        {/* Right: Service Cards */}
        <div className={styles['service-hero__right']}>
          <div className={styles['service-hero__badges']}>
            {services.map((service, idx) => (
              <div
                key={service.name}
                className={`${styles['service-badge']} ${service.colorClass}`}
                style={{ '--badge-index': idx } as React.CSSProperties}
              >
                <span className={styles['service-badge__text']}>{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;