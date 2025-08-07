'use client';

import styles from './SectionHeader.module.scss';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <h1 className={styles.sectionHeader__title}>{title}</h1>
      {subtitle && <p className={styles.sectionHeader__subtitle}>{subtitle}</p>}
    </div>
  );
}