import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./CounterControl.module.scss";

interface CounterControlProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
  className?: string;
}

const CounterControl: React.FC<CounterControlProps> = ({
  label,
  value,
  min = 0,
  max,
  onIncrement,
  onDecrement,
  disabled = false,
  className = "",
}) => {
  const isDecrementDisabled = value <= min || disabled;
  const isIncrementDisabled = (max !== undefined && value >= max) || disabled;

  return (
    <div className={`${styles.counter} ${className}`}>
      <span className={styles.counter__label}>{label}</span>
      <div className={styles.counter__controls}>
        <button
          type="button"
          onClick={onDecrement}
          disabled={isDecrementDisabled}
          className={styles.counter__btn}
        >
          <Icon name="minus" />
        </button>
        <span className={styles.counter__value}>{value}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={isIncrementDisabled}
          className={styles.counter__btn}
        >
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
};

export default CounterControl;
