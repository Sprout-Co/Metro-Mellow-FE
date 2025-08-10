'use client';

import Image from 'next/image';
import styles from './DashboardBanner.module.scss';

export default function DashboardBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__imageContainer}>
        <Image
          src="/images/brand/city-primary.png"
          alt="City skyline"
          fill
          priority
          className={styles.banner__image}
        />
      </div>
    </div>
  );
}