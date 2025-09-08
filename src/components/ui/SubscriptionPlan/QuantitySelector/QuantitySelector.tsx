"use client";

import React from 'react';
import styles from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (change: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity,
  onQuantityChange 
}) => {
  return (
    <div className={styles.quantity}>
      <button 
        className={styles.quantity__button} 
        onClick={() => onQuantityChange(-1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className={styles.quantity__counter}>{quantity}</span>
      <button 
        className={styles.quantity__button}
        onClick={() => onQuantityChange(1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
