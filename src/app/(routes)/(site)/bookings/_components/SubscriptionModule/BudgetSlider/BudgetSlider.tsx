// BudgetSlider.tsx
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import styles from './BudgetSlider.module.scss';

interface BudgetSliderProps {
  budget: number;
  setBudget: (budget: number) => void;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ budget, setBudget }) => {
  const MIN_BUDGET = 10000;
  const MAX_BUDGET = 40000;
  const STEP = 1000;
  
  const constraintsRef = useRef<HTMLDivElement>(null);
  const sliderWidth = useMotionValue(0);
  
  // Get percentage of current budget within range
  const percentage = (budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET);
  
  // Setup motion values
  const x = useMotionValue(0);
  const sliderX = useSpring(x, { stiffness: 700, damping: 40 });
  
  // Transform slider position to budget value
  const currentBudget = useTransform(
    sliderX,
    [0, sliderWidth.get()],
    [MIN_BUDGET, MAX_BUDGET]
  );
  
  // Update slider width on resize
  useEffect(() => {
    if (constraintsRef.current) {
      const updateWidth = () => {
        const width = constraintsRef.current?.offsetWidth || 0;
        sliderWidth.set(width - 28); // Adjust for thumb size
        x.set(percentage * (width - 28));
      };
      
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [percentage, sliderWidth, x]);
  
  // Update budget when dragging
  const handleDrag = () => {
    const newBudget = Math.round(currentBudget.get() / STEP) * STEP;
    setBudget(newBudget);
  };
  
  // Format number to Naira
  const formatNaira = (value: number) => {
    return `₦${value.toLocaleString()}`;
  };
  
  return (
    <div className={styles.budget_slider}>
      <div className={styles.budget_slider__header}>
        <h2 className={styles.budget_slider__title}>Weekly Budget</h2>
        <span className={styles.budget_slider__value}>{formatNaira(budget)}</span>
      </div>
      
      <div className={styles.budget_slider__container} ref={constraintsRef}>
        <div className={styles.budget_slider__track}>
          <motion.div 
            className={styles.budget_slider__filled}
            style={{ width: `${percentage * 100}%` }}
          />
        </div>
        
        <motion.div
          className={styles.budget_slider__thumb}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x: sliderX }}
          onDrag={handleDrag}
          whileTap={{ scale: 1.2 }}
        />
      </div>
      
      <div className={styles.budget_slider__labels}>
        <span className={styles.budget_slider__min}>{formatNaira(MIN_BUDGET)}</span>
        <span className={styles.budget_slider__max}>{formatNaira(MAX_BUDGET)}</span>
      </div>
    </div>
  );
};

export default BudgetSlider;