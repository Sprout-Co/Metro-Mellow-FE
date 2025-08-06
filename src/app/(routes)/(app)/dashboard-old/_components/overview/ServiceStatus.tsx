'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './ServiceStatus.module.scss';

// Sample service data
const services = [
  {
    id: 'service1',
    name: 'Weekly Home Cleaning',
    type: 'cleaning',
    status: 'active',
    schedule: 'Every Monday at 9:00 AM',
    nextDate: '2025-03-18',
    frequency: 'weekly',
    price: 120,
    provider: 'Sarah Johnson'
  },
  {
    id: 'service2',
    name: 'Bi-weekly Laundry Service',
    type: 'laundry',
    status: 'active',
    schedule: 'Every other Wednesday at 2:00 PM',
    nextDate: '2025-03-26',
    frequency: 'bi-weekly',
    price: 75,
    provider: 'Michael Chen'
  },
  {
    id: 'service3',
    name: 'Monthly Pest Control',
    type: 'pest-control',
    status: 'paused',
    schedule: 'First Friday of each month at 10:00 AM',
    nextDate: null,
    frequency: 'monthly',
    price: 90,
    provider: 'Robert Wilson'
  }
];

export default function ServiceStatus() {
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'cleaning':
        return 'home';
      case 'laundry':
        return 'refresh-cw';
      case 'cooking':
        return 'coffee';
      case 'pest-control':
        return 'shield';
      default:
        return 'package';
    }
  };
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Not scheduled';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className={styles.status}>
      {services.length > 0 ? (
        <div className={styles.status__list}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.status__card}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.status__header}>
                <div className={styles.status__iconWrapper}>
                  <Icon name={getServiceIcon(service.type)} className={styles.status__icon} />
                </div>
                <div className={styles.status__details}>
                  <h3 className={styles.status__name}>{service.name}</h3>
                  <p className={styles.status__schedule}>{service.schedule}</p>
                </div>
                <div className={styles.status__badge}>
                  <span 
                    className={`${styles.status__badgeText} ${
                      styles[`status__badgeText--${service.status}`]
                    }`}
                  >
                    {service.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
              
              <div className={styles.status__content}>
                <div className={styles.status__info}>
                  <div className={styles.status__infoItem}>
                    <span className={styles.status__infoLabel}>Next service:</span>
                    <span className={styles.status__infoValue}>
                      {formatDate(service.nextDate)}
                    </span>
                  </div>
                  <div className={styles.status__infoItem}>
                    <span className={styles.status__infoLabel}>Frequency:</span>
                    <span className={styles.status__infoValue}>
                      {service.frequency.charAt(0).toUpperCase() + service.frequency.slice(1)}
                    </span>
                  </div>
                  <div className={styles.status__infoItem}>
                    <span className={styles.status__infoLabel}>Provider:</span>
                    <span className={styles.status__infoValue}>{service.provider}</span>
                  </div>
                </div>
                
                <div className={styles.status__price}>
                  <span className={styles.status__priceValue}>${service.price}</span>
                  <span className={styles.status__priceLabel}>per service</span>
                </div>
              </div>
              
              <div className={styles.status__actions}>
                {service.status === 'active' ? (
                  <button className={styles.status__actionBtn}>
                    <Icon name="pause" />
                    Pause Service
                  </button>
                ) : (
                  <button className={`${styles.status__actionBtn} ${styles['status__actionBtn--resume']}`}>
                    <Icon name="play" />
                    Resume Service
                  </button>
                )}
                <button className={styles.status__actionBtn}>
                  <Icon name="edit" />
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.status__empty}>
          <div className={styles.status__emptyIcon}>
            <Icon name="package" />
          </div>
          <h3 className={styles.status__emptyTitle}>No Active Services</h3>
          <p className={styles.status__emptyText}>
            You don't have any active services at the moment. 
            Book a service to get started.
          </p>
          <button className={styles.status__emptyBtn}>
            Book a Service
            <Icon name="arrow-right" />
          </button>
        </div>
      )}
      
      <div className={styles.status__footer}>
        <button className={styles.status__footerBtn}>
          View All Services
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}