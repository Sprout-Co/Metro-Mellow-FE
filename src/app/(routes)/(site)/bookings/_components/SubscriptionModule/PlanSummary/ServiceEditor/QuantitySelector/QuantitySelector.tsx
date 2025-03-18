import React, { useState, useEffect } from 'react';
import styles from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
  type: 'food' | 'laundry';
  quantity?: number;
  mealsPerDay?: Record<string, number>;
  days?: string[];
  onQuantityChange?: (quantity: number) => void;
  onMealsChange?: (mealsPerDay: Record<string, number>) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  type,
  quantity = 1,
  mealsPerDay = {},
  days = [],
  onQuantityChange,
  onMealsChange
}) => {
  const [summary, setSummary] = useState<string>('');
  
  // Update summary text based on selections
  useEffect(() => {
    if (type === 'laundry') {
      setSummary(`See how we count laundry items`);
    } else if (type === 'food') {
      const totalMeals = Object.values(mealsPerDay).reduce((total, count) => total + count, 0);
      setSummary(`You will receive ${totalMeals} meals a week.`);
    }
  }, [type, quantity, mealsPerDay]);
  
  // Handle quantity change for laundry bags
  const handleQuantityChange = (change: number) => {
    if (onQuantityChange) {
      const newQuantity = Math.max(1, quantity + change);
      onQuantityChange(newQuantity);
    }
  };
  
  // Handle meal quantity change per day
  const handleMealChange = (day: string, change: number) => {
    if (onMealsChange && mealsPerDay) {
      const currentValue = mealsPerDay[day] || 0;
      const newValue = Math.max(0, currentValue + change);
      onMealsChange({ ...mealsPerDay, [day]: newValue });
    }
  };
  
  return (
    <div className={styles.quantity}>
      {type === 'laundry' ? (
        // Laundry quantity selector
        <>
          <h3 className={styles.quantity__heading}>
            How many bags of laundry do you want picked up?
            <span className={styles.quantity__subtext}>(You can have up to 30 items in a bag!)</span>
          </h3>
          
          <div className={styles.quantity__selector}>
            <button 
              className={styles.quantity__btn}
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className={styles.quantity__value}>{quantity}</span>
            <button 
              className={styles.quantity__btn}
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          
          {summary && (
            <button className={styles.quantity__info}>
              {summary} <span className={styles.quantity__info_link}>here</span>.
            </button>
          )}
        </>
      ) : (
        // Food meal quantity selector
        <>
          <h3 className={styles.quantity__heading}>
            How many meals do you want to receive per delivery?
          </h3>
          
          <div className={styles.quantity__toggle}>
            <span>Receive the same number of meals per delivery.</span>
            <div className={styles.quantity__toggle_switch}>
              <div className={styles.quantity__toggle_thumb} />
            </div>
          </div>
          
          <div className={styles.quantity__days}>
            {days.map((day) => (
              <div key={day} className={styles.quantity__day}>
                <span className={styles.quantity__day_name}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
                
                <div className={styles.quantity__day_selector}>
                  <button 
                    className={styles.quantity__btn}
                    onClick={() => handleMealChange(day, -1)}
                    disabled={(mealsPerDay?.[day] || 0) <= 0}
                  >
                    -
                  </button>
                  <span className={styles.quantity__value}>{mealsPerDay?.[day] || 0}</span>
                  <button 
                    className={styles.quantity__btn}
                    onClick={() => handleMealChange(day, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {summary && (
            <div className={styles.quantity__summary}>
              {summary}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuantitySelector;