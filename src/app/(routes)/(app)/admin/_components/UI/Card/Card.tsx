// src/components/ui/Card.tsx
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
