import React from 'react';
import styles from './PlanSummary.module.scss';
import Button from '../../Button/Button';
import { Icon } from '../../Icon/Icon';

export interface ServiceItem {
  id: string;
  type: 'food' | 'cleaning' | 'laundry' | 'pest-control';
  name: string;
  plan: string;
  price: number;
  frequency: string;
  details: {
    [key: string]: string | number;
  };
}

interface PlanSummaryProps {
  services: ServiceItem[];
  onProceed?: () => void;
  onEdit?: () => void;
}

const ServiceCard: React.FC<{ service: ServiceItem; onEdit?: () => void }> = ({ service, onEdit }) => {
  const renderDetails = () => {
    // If details are provided, use them
    if (service.details && typeof service.details === 'object' && Object.keys(service.details).length > 0) {
      return Object.entries(service.details).map(([key, value]) => (
        <div key={`${service.id}-${key}`} className={styles.serviceCard__detail}>
          <span className={styles.serviceCard__detailLabel}>{key}:</span>
          <span className={styles.serviceCard__detailValue}>{value || ''}</span>
        </div>
      ));
    }
    
    // If no details are provided, show a minimal fallback
    return (
      <div className={styles.serviceCard__detail}>
        <span className={styles.serviceCard__detailLabel}>Plan:</span>
        <span className={styles.serviceCard__detailValue}>{service.plan || 'Standard'}</span>
      </div>
    );
  };

  const getServiceIconClass = () => {
    const validTypes = ['food', 'cleaning', 'laundry', 'pest-control'];
    const type = validTypes.includes(service.type) ? service.type : 'food';
    return `serviceCard__icon--${type}`;
  };

  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceCard__header}>
        <div className={`${styles.serviceCard__icon} ${styles[getServiceIconClass()]}`}>
          <div className={styles.serviceCard__iconInner}></div>
        </div>
        <div className={styles.serviceCard__headerInfo}>
          <h3 className={styles.serviceCard__title}>{service.name}</h3>
          <p className={styles.serviceCard__plan}>{service.plan}</p>
        </div>
        <div className={styles.serviceCard__price}>
          <span className={styles.serviceCard__priceAmount}>₦{(service.price || 0).toLocaleString()}</span>
          <span className={styles.serviceCard__priceFrequency}>{service.frequency || 'Once a week'}</span>
        </div>
        {onEdit && (
          <Button 
            className={styles.serviceCard__editIcon}
            onClick={onEdit}
            aria-label={`Edit ${service.name} service`}
            variant="ghost"
          >
            <Icon name="edit" size={16} />
          </Button>
        )}
      </div>
      <div className={styles.serviceCard__details}>
        {renderDetails()}
      </div>
    </div>
  );
};

const PlanSummary: React.FC<PlanSummaryProps> = ({ services, onProceed, onEdit }) => {
  const calculateSubTotal = () => {
    return services.reduce((total, service) => total + (service.price || 0), 0);
  };

  const subTotal = calculateSubTotal();
  const total = subTotal; // Assuming no extra fees or discounts
  const monthlyTotal = total; // Assuming already calculated for monthly

  return (
    <div className={styles.summary}>
      <div className={styles.summary__header}>
        <h2 className={styles.summary__title}>Summary</h2>
        {onEdit && (
          <Button 
            onClick={onEdit} 
            className={styles.summary__editButton}
            variant="ghost"
          >
            EDIT
          </Button>
        )}
      </div>

      <div className={styles.serviceCards}>
        {services && services.length > 0 ? services.map((service) => (
          <ServiceCard 
            key={service.id || `service-${Math.random()}`} 
            service={service} 
            onEdit={() => onEdit && onEdit()}
          />
        )) : (
          <div className={styles.serviceCards__empty}>
            <p>No services selected</p>
          </div>
        )}
      </div>

      <div className={styles.summary__totals}>
        <div className={styles.summary__totalRow}>
          <span className={styles.summary__totalLabel}>Sub-total</span>
          <span className={styles.summary__totalValue}>₦{subTotal.toLocaleString()}</span>
        </div>
        <div className={styles.summary__totalRow}>
          <span className={styles.summary__totalLabel}>Total</span>
          <span className={styles.summary__totalValue}>₦{total.toLocaleString()}</span>
        </div>
        <div className={styles.summary__totalRow}>
          <span className={styles.summary__totalLabel}>Monthly cost:</span>
          <span className={styles.summary__totalValue}>₦{monthlyTotal.toLocaleString()}</span>
        </div>
      </div>

      {onProceed && (
        <div className={styles.summary__actions}>
          <Button 
            onClick={onProceed} 
            className={styles.summary__proceedButton}
            variant="primary"
            fullWidth
          >
            PROCEED TO
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanSummary;
