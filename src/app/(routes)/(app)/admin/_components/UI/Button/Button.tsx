import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      <span className={styles.button__label}>{children}</span>
    </motion.button>
  );
};

export default Button;
