"use client";

import { ReactNode } from "react";
import styles from "./SettingsLayout.module.scss";

interface SettingsLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function SettingsLayout({
  title,
  subtitle,
  children,
}: SettingsLayoutProps) {
  return (
    <div className={styles.settingsLayout}>
      <div className={styles.settingsLayout__header}>
        <h1 className={styles.settingsLayout__title}>{title}</h1>
        <p className={styles.settingsLayout__subtitle}>{subtitle}</p>
      </div>
      <div className={styles.settingsLayout__content}>{children}</div>
    </div>
  );
}
