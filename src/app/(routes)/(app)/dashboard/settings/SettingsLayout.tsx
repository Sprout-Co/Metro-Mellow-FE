"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./SettingsLayout.module.scss";

interface SettingsLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className={styles.settingsLayout}>
      <motion.div
        className={styles.settingsLayout__header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.settingsLayout__title}>{title}</h1>
        {subtitle && (
          <p className={styles.settingsLayout__subtitle}>{subtitle}</p>
        )}
      </motion.div>

      <motion.div
        className={styles.settingsLayout__content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SettingsLayout;
