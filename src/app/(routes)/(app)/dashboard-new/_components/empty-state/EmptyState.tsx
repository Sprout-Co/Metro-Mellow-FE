'use client';

import Image from 'next/image';
import styles from './EmptyState.module.scss';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyState__content}>
        <div className={styles.emptyState__imageContainer}>
          <Image
            src="/images/brand/empty-state.png"
            alt="No services"
            width={213}
            height={213}
            className={styles.emptyState__image}
          />
        </div>
        <p className={styles.emptyState__message}>
          Sorry, your service history is empty. Book without any fuss.
        </p>
      </div>
    </div>
  );
}