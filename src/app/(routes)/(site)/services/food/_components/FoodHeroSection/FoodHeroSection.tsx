import React from 'react';
import styles from './FoodHeroSection.module.scss';

const FoodHeroSection = () => (
  <section className={styles.foodHeroSection}>
    <div className={styles.left}>
      <h1 className={styles.heading}>
        From<br />
        Comfort<br />
        Classics to<br />
        Gourmet<br />
        Goodies
      </h1>
    </div>
    <div className={styles.right}>
      <p className={styles.description}>
        Whether it's lunch or late-night, we deliver flavors that make your taste buds sing.
      </p>
      <button className={styles.ctaButton} type="button">
        JOIN OUR MISSION
      </button>
    </div>
  </section>
);

export default FoodHeroSection; 