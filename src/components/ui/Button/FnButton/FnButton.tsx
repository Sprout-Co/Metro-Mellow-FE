"use client";

import React, { forwardRef } from "react";
import styles from "./FnButton.module.scss";

export interface FnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Icon only (no text) */
  iconOnly?: boolean;
  /** Custom class name */
  className?: string;
}

export const FnButton = forwardRef<HTMLButtonElement, FnButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      className = "",
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Generate CSS classes
    const buttonClasses = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      loading ? styles["button--loading"] : "",
      disabled ? styles["button--disabled"] : "",
      fullWidth ? styles["button--full-width"] : "",
      iconOnly ? styles["button--icon-only"] : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...rest}
      >
        <span className={styles.button__content}>
          {leftIcon && (
            <span
              className={`${styles.button__icon} ${styles["button__icon--left"]}`}
            >
              {leftIcon}
            </span>
          )}

          {!iconOnly && children}

          {rightIcon && (
            <span
              className={`${styles.button__icon} ${styles["button__icon--right"]}`}
            >
              {rightIcon}
            </span>
          )}
        </span>

        {loading && (
          <span className={styles.button__loader}>
            <span className={styles.spinner}></span>
          </span>
        )}
      </button>
    );
  }
);

FnButton.displayName = "FnButton";

export default FnButton;
