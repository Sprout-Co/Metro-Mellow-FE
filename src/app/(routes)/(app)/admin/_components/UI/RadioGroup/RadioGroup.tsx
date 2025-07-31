import React from "react";
import styles from "./RadioGroup.module.scss";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
  disabled = false,
  required = true,
}) => {
  return (
    <div className={`${styles.radio_group} ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.radio_group__option} ${
            option.disabled || disabled ? styles.disabled : ""
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled || disabled}
            className={styles.radio_group__input}
            required={required}
          />
          <span className={styles.radio_group__label}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
