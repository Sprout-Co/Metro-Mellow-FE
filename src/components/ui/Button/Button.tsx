// src/components/ui/Button/Button.tsx
import React, { useState, useRef, forwardRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import styles from "./Button.module.scss";

// Button props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "primary" | "secondary" | "ghost" | "white";
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
  /** Animation variant */
  animation?: "none" | "scale" | "bounce";
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Animation variants
const buttonVariants: Record<string, Variants> = {
  none: {},
  scale: {
    initial: { scale: 1 },
    // hover: { scale: 1.01 },
    tap: { scale: 0.95 },
  },
  bounce: {
    initial: { y: 0 },
    hover: { y: -5 },
    tap: { y: 0 },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      animation = "scale",
      children,
      disabled,
      onClick,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const controls = useAnimation();
    const [ripple, setRipple] = useState({
      active: false,
      x: 0,
      y: 0,
      size: 0,
    });

    // Combine refs
    const combinedRef = (node: HTMLButtonElement) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
      buttonRef.current = node;
    };

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

    // Handle ripple effect
    const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        setRipple({
          active: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          size,
        });

        // Reset ripple after animation
        setTimeout(() => {
          setRipple({ ...ripple, active: false });
        }, 600);
      }
    };

    // Handle click with ripple
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        handleRipple(e);
        onClick?.(e);
      }
    };

    return (
      <motion.button
        ref={combinedRef}
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        animate={controls}
        variants={buttonVariants[animation]}
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

        {loading && <span className={styles.button__loader} />}

        {ripple.active && (
          <span
            className={`${styles.button__ripple} ${styles["button__ripple--active"]}`}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
