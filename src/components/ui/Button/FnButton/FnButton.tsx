"use client";

import React, { useState, useRef, forwardRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import Link from "next/link";
import styles from "./FnButton.module.scss";

export interface FnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "white" | "accent";
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
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  /** Link href - if provided, renders as a link */
  href?: string;
  /** External link - if true, opens in new tab */
  external?: boolean;
  /** Link target */
  target?: string;
  /** Link rel attribute */
  rel?: string;
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

export const FnButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  FnButtonProps
>(
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
      href,
      external = false,
      target,
      rel,
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
    const linkRef = useRef<HTMLAnchorElement>(null);
    const controls = useAnimation();
    const [ripple, setRipple] = useState({
      active: false,
      x: 0,
      y: 0,
      size: 0,
    });

    // Determine if this should be a link
    const isLink = Boolean(href);
    const isExternal = external || target === "_blank";

    // Combine refs
    const combineButtonRef = (node: HTMLButtonElement | null) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
      buttonRef.current = node;
    };

    const combineLinkRef = (node: HTMLAnchorElement | null) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
      linkRef.current = node;
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
    const handleRipple = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      const currentRef = buttonRef.current || linkRef.current;
      if (currentRef) {
        const rect = currentRef.getBoundingClientRect();
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
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (!disabled && !loading) {
        handleRipple(e);
        onClick?.(e);
      }
    };

    // Common motion props
    const motionProps = {
      initial: "initial",
      whileHover: "hover",
      whileTap: "tap",
      animate: controls,
      variants: buttonVariants[animation],
    };

    // Link props (without motion props for Next.js Link)
    const linkProps = {
      className: buttonClasses,
      onClick: handleClick,
      href,
      target: isExternal ? "_blank" : target,
      rel: isExternal ? "noopener noreferrer" : rel,
    };

    // Button props
    const buttonProps = {
      className: buttonClasses,
      onClick: handleClick,
      disabled: disabled || loading,
      ...motionProps,
      ...rest,
    };

    // Common content
    const content = (
      <>
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
      </>
    );

    // Render as link or button
    if (isLink && href) {
      // Use Next.js Link for internal links, regular anchor for external
      if (href.startsWith("/") || href.startsWith("#") || !isExternal) {
        const { href: _, ...linkPropsWithoutHref } = linkProps;
        return (
          <Link href={href} {...linkPropsWithoutHref}>
            {content}
          </Link>
        );
      } else {
        return (
          <motion.a ref={combineLinkRef} {...linkProps} {...motionProps}>
            {content}
          </motion.a>
        );
      }
    }

    // Render as button
    return (
      <motion.button ref={combineButtonRef} {...buttonProps}>
        {content}
      </motion.button>
    );
  }
);

FnButton.displayName = "FnButton";

export default FnButton;
