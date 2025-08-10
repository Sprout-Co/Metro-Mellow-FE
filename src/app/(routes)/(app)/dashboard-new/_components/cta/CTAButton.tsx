'use client';

import styles from './CTAButton.module.scss';

export default function CTAButton() {
  const handleClick = () => {
    console.log('Book your first service clicked');
  };
  
  return (
    <button 
      className={styles.ctaButton}
      onClick={handleClick}
    >
      BOOK YOUR FIRST SERVICE
    </button>
  );
}