'use client';

import React from 'react';
import Image from 'next/image';
import styles from './FoodIllustrationSection.module.scss';

const FoodIllustrationSection = () => {
  return (
    <section className={styles.illustrationSection}>
      <div className={styles.illustrationSection__container}>
        <Image
          src="/images/food/food-svg.png"
          alt="MetroMellow Food Animation"
          width={800}
          height={700}
          className={styles.illustrationSection__image}
          priority
        />
      </div>
    </section>
  );
};

export default FoodIllustrationSection; 