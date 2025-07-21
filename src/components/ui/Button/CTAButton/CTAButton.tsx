"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button, { ButtonProps as BaseButtonProps } from "../Button";
import styles from "./CTAButton.module.scss";

export type AnimationType =
  | "flicker"
  | "bounce"
  | "vibrate"
  | "pulse"
  | "glow"
  | "shimmer"
  | "wobble"
  | "heartbeat"
  | "flash"
  | "none";

export interface CTAButtonProps extends Omit<BaseButtonProps, "animation"> {
  /** Animation type for the CTA button */
  animationType?: AnimationType;
  /** Auto-start animation after delay (in ms), 0 to disable */
  autoAnimate?: number;
  /** Animation interval for repeating animations (in ms), 0 for no repeat */
  animationInterval?: number;
  /** Animation duration (in ms) */
  animationDuration?: number;
  /** Animation intensity - affects scale and movement */
  animationIntensity?: "subtle" | "medium" | "intense";
  /** Enable continuous animation (doesn't stop) */
  continuous?: boolean;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  animationType = "pulse",
  autoAnimate = 2000,
  animationInterval = 5000,
  animationDuration = 800,
  animationIntensity = "medium",
  continuous = false,
  pauseOnHover = false,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...buttonProps
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Handle auto-animation and intervals
  useEffect(() => {
    if (animationType === "none") return;

    let autoAnimateTimeout: NodeJS.Timeout | null = null;
    let animationIntervalId: NodeJS.Timeout | null = null;

    // Initial auto-animation
    if (autoAnimate > 0) {
      autoAnimateTimeout = setTimeout(() => {
        if (!isPaused) {
          setIsAnimating(true);
        }
      }, autoAnimate);
    }

    // Animation interval for non-continuous animations
    if (animationInterval > 0 && !continuous) {
      animationIntervalId = setInterval(() => {
        if (!isPaused) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), animationDuration);
        }
      }, animationInterval);
    }

    // For continuous animations
    if (continuous && !isPaused) {
      setIsAnimating(true);
    }

    // Cleanup
    return () => {
      if (autoAnimateTimeout) clearTimeout(autoAnimateTimeout);
      if (animationIntervalId) clearInterval(animationIntervalId);
    };
  }, [
    animationType,
    autoAnimate,
    animationInterval,
    animationDuration,
    continuous,
    isPaused,
  ]);

  // Handle mouse events for pause on hover
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) {
      setIsPaused(true);
      setIsAnimating(false);
    }
    onMouseEnter?.(e as any);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pauseOnHover) {
      setIsPaused(false);
      if (continuous) {
        setIsAnimating(true);
      }
    }
    onMouseLeave?.(e as any);
  };

  // Animation variants based on type and intensity
  const getAnimationVariants = () => {
    const intensityValues = {
      subtle: { scale: 1.02, move: 3, opacity: 0.8 },
      medium: { scale: 1.05, move: 6, opacity: 0.6 },
      intense: { scale: 1.08, move: 10, opacity: 0.4 },
    };

    const intensity = intensityValues[animationIntensity];
    const duration = animationDuration / 1000;

    switch (animationType) {
      case "bounce":
        return {
          animate: {
            y: [0, -intensity.move * 2, 0],
            transition: {
              duration,
              ease: "easeOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 0.5 : 0,
            },
          },
        };

      case "vibrate":
        return {
          animate: {
            x: [
              0,
              -intensity.move,
              intensity.move,
              -intensity.move,
              intensity.move,
              0,
            ],
            transition: {
              duration: duration * 0.6,
              ease: "easeInOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 0.3 : 0,
            },
          },
        };

      case "pulse":
        return {
          animate: {
            scale: [1, intensity.scale, 1],
            transition: {
              duration,
              ease: "easeInOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 0.2 : 0,
            },
          },
        };

      case "heartbeat":
        return {
          animate: {
            scale: [1, intensity.scale, 1, intensity.scale * 0.98, 1],
            transition: {
              duration: duration * 1.2,
              ease: "easeInOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 0.5 : 0,
            },
          },
        };

      case "wobble":
        return {
          animate: {
            rotate: [0, -5, 5, -3, 3, 0],
            scale: [1, intensity.scale * 0.98, 1],
            transition: {
              duration,
              ease: "easeInOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 0.3 : 0,
            },
          },
        };

      case "flash":
        return {
          animate: {
            opacity: [1, intensity.opacity, 1, intensity.opacity, 1],
            scale: [1, intensity.scale, 1],
            transition: {
              duration: duration * 0.8,
              ease: "easeInOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 1 : 0,
            },
          },
        };

      case "flicker":
        return {
          animate: {
            opacity: [
              1,
              intensity.opacity,
              0.9,
              intensity.opacity * 0.7,
              0.95,
              intensity.opacity,
              1,
            ],
            transition: {
              duration: duration * 0.7,
              ease: "easeInOut",
              repeat: continuous ? Infinity : 0,
              repeatDelay: continuous ? 0.5 : 0,
            },
          },
        };

      default:
        return {
          animate: {
            scale: 1,
            transition: { duration: 0 },
          },
        };
    }
  };

  // Combine CSS classes
  const wrapperClasses = [
    styles.ctaButtonWrapper,
    styles[`intensity-${animationIntensity}`],
    animationType !== "none" ? styles[`animation-${animationType}`] : "",
    isAnimating ? styles.animating : "",
    continuous ? styles.continuous : "",
    isPaused ? styles.paused : "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonClasses = [styles.ctaButton, className].filter(Boolean).join(" ");

  return (
    <motion.div
      className={wrapperClasses}
      animate={isAnimating ? "animate" : "initial"}
      variants={getAnimationVariants()}
      onAnimationComplete={() => {
        if (!continuous) {
          setIsAnimating(false);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        className={buttonClasses}
        animation="none" // Disable Button's built-in animation
        {...buttonProps}
      >
        {children}
      </Button>

      {/* Additional effect overlays for enhanced animations */}
      {(animationType === "glow" || animationType === "shimmer") && (
        <div className={styles.effectOverlay} />
      )}

      {animationType === "shimmer" && <div className={styles.shimmerEffect} />}
    </motion.div>
  );
};

export default CTAButton;
