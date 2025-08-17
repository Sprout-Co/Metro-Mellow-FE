// src/components/ui/Input/Input.tsx
"use client";

import React, {
  forwardRef,
  useState,
  FocusEvent,
  ChangeEvent,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Input.module.scss";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange"
  > {
  /** Input label */
  label?: string;
  /** Input variant */
  variant?: "default" | "filled" | "outlined" | "floating";
  /** Input size */
  size?: "sm" | "md" | "lg";
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helperText?: string;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Full width input */
  fullWidth?: boolean;
  /** Custom class name */
  className?: string;
  /** Show required indicator */
  required?: boolean;
  /** Show character counter */
  showCounter?: boolean;
  /** Max character length for counter */
  maxLength?: number;
  /** Loading state */
  loading?: boolean;
  /** Custom onChange handler */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Custom onBlur handler */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = "default",
      size = "md",
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      required = false,
      disabled = false,
      loading = false,
      showCounter = false,
      maxLength,
      type = "text",
      onChange,
      onBlur,
      onFocus,
      value,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (maxLength && newValue.length > maxLength) {
        return;
      }
      setInternalValue(newValue);
      onChange?.(event);
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const inputType = type === "password" && passwordVisible ? "text" : type;
    const hasValue = internalValue !== "";
    const showPasswordToggle = type === "password";
    const characterCount = String(internalValue).length;
    const isNearLimit = maxLength && characterCount > maxLength * 0.9;
    const isAtLimit = maxLength && characterCount >= maxLength;

    // Generate CSS classes
    const containerClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      focused ? styles["input--focused"] : "",
      error ? styles["input--error"] : "",
      success ? styles["input--success"] : "",
      disabled ? styles["input--disabled"] : "",
      loading ? styles["input--loading"] : "",
      fullWidth ? styles["input--full-width"] : "",
      hasValue ? styles["input--has-value"] : "",
      variant === "floating" ? styles["input--floating"] : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const wrapperClasses = [
      styles.input__wrapper,
      leftIcon ? styles["input__wrapper--with-left-icon"] : "",
      rightIcon || showPasswordToggle
        ? styles["input__wrapper--with-right-icon"]
        : "",
      focused ? styles["input__wrapper--focused"] : "",
      error ? styles["input__wrapper--error"] : "",
      success ? styles["input__wrapper--success"] : "",
      hasValue ? styles["input__wrapper--has-value"] : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Icons for states
    const ErrorIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const SuccessIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const EyeIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15a3 3 0 100-6 3 3 0 000 6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const EyeOffIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const LoadingSpinner = () => (
      <motion.div
        className={styles.input__spinner}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    );

    return (
      <div className={containerClasses}>
        {label && variant !== "floating" && (
          <motion.label
            htmlFor={rest.id}
            className={styles.input__label}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            {required && <span className={styles.input__required}>*</span>}
          </motion.label>
        )}

        <div className={wrapperClasses}>
          {variant === "floating" && label && (
            <label htmlFor={rest.id} className={styles.input__label}>
              {label}
              {required && <span className={styles.input__required}>*</span>}
            </label>
          )}

          {leftIcon && (
            <motion.div
              className={styles.input__icon_left}
              animate={{
                color: focused ? "var(--primary)" : "var(--gray-500)",
                scale: focused ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {leftIcon}
            </motion.div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={styles.input__field}
            disabled={disabled || loading}
            required={required}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={variant === "floating" ? " " : placeholder}
            maxLength={maxLength}
            {...rest}
          />

          {loading && (
            <div className={styles.input__icon_right}>
              <LoadingSpinner />
            </div>
          )}

          {!loading && (rightIcon || showPasswordToggle) && (
            <div className={styles.input__icon_right}>
              {showPasswordToggle ? (
                <button
                  type="button"
                  className={styles.input__password_toggle}
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                  disabled={disabled}
                >
                  {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}

          {/* Animated border effect */}
          {/* <motion.div
            className={styles.input__border}
            initial={false}
            animate={{
              scaleX: focused ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          /> */}
        </div>

        {/* Helper messages */}
        <AnimatePresence mode="wait">
          {(error || success || helperText || showCounter) && (
            <motion.div
              className={styles.input__footer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error && (
                <div
                  className={`${styles.input__message} ${styles["input__message--error"]}`}
                >
                  <ErrorIcon />
                  <span>{error}</span>
                </div>
              )}
              {success && !error && (
                <div
                  className={`${styles.input__message} ${styles["input__message--success"]}`}
                >
                  <SuccessIcon />
                  <span>{success}</span>
                </div>
              )}
              {helperText && !error && !success && (
                <div className={styles.input__message}>
                  <span>{helperText}</span>
                </div>
              )}
              {showCounter && maxLength && (
                <div
                  className={[
                    styles.input__counter,
                    isAtLimit ? styles["input__counter--error"] : "",
                    isNearLimit && !isAtLimit
                      ? styles["input__counter--warning"]
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {characterCount} / {maxLength}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
