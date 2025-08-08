'use client';

import Image from 'next/image';
import styles from './EmptyState.module.scss';

export interface EmptyStateProps {
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  imageSrc = '/images/general/sign.png',
  imageAlt = 'Empty state',
  imageWidth = 200,
  imageHeight = 200,
  message,
  actionLabel,
  onAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      {imageSrc && (
        <div className={styles.emptyState__image}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
          />
        </div>
      )}
      
      <p className={styles.emptyState__text}>
        {message}
      </p>
      
      {actionLabel && onAction && (
        <button className={styles.emptyState__button} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}