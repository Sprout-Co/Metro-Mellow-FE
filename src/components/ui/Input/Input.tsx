"use client";

import React, { forwardRef, useState, FocusEvent, ChangeEvent } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Input label */
  label?: string;
  /** Input variant */
  variant?: 'default' | 'bordered' | 'filled';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
  /** Custom class name */
  className?: string;
  /** Show required indicator */
  required?: boolean;
  /** Custom onChange handler */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = 'default',
      size = 'md',
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      required = false,
      disabled = false,
      type = 'text',
      onChange,
      onBlur,
      onFocus,
      value,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(event);
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const inputType = type === 'password' && passwordVisible ? 'text' : type;
    const hasValue = value !== undefined && value !== '';
    const showPasswordToggle = type === 'password';

    // Generate CSS classes
    const containerClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      focused ? styles['input--focused'] : '',
      error ? styles['input--error'] : '',
      disabled ? styles['input--disabled'] : '',
      fullWidth ? styles['input--full-width'] : '',
      hasValue ? styles['input--has-value'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.input__wrapper,
      leftIcon ? styles['input__wrapper--with-left-icon'] : '',
      rightIcon || showPasswordToggle ? styles['input__wrapper--with-right-icon'] : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={rest.id} className={styles.input__label}>
            {label}
            {required && <span className={styles.input__required}>*</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          {leftIcon && (
            <div className={styles.input__icon_left}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={styles.input__field}
            disabled={disabled}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />

          {(rightIcon || showPasswordToggle) && (
            <div className={styles.input__icon_right}>
              {showPasswordToggle ? (
                <button
                  type="button"
                  className={styles.input__password_toggle}
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                  disabled={disabled}
                >
                  {passwordVisible ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className={styles.input__message}>
            {error ? (
              <p className={styles.input__error}>{error}</p>
            ) : (
              helperText && <p className={styles.input__helper}>{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;