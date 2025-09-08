import React from 'react';
import CancelOrderButton from './CancelOrderButton';
import styles from './CancelOrderDemo.module.scss';

export default function CancelOrderDemo() {
  return (
    <div className={styles.cancelOrderDemo}>
      <h2 className={styles.cancelOrderDemo__title}>Cancel Order Example</h2>
      
      <div className={styles.cancelOrderDemo__card}>
        <div className={styles.cancelOrderDemo__info}>
          <h3 className={styles.cancelOrderDemo__serviceName}>Cleaning Service</h3>
          <p className={styles.cancelOrderDemo__date}>Sat, Aug 25 • 8:00 AM (Morning)</p>
        </div>
        
        <div className={styles.cancelOrderDemo__actions}>
          <CancelOrderButton 
            orderId="demo-123" 
            serviceFeePercentage={2}
          />
        </div>
      </div>
      
      <p className={styles.cancelOrderDemo__note}>
        Click the Cancel button to see the cancel confirmation modal.
      </p>
    </div>
  );
}