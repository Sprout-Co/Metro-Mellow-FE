import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import styles from './FoodIntroSection.module.scss';

const FoodIntroSection = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.intro__top}>
        <h2 className={styles.intro__heading}>Mellow Meals, Metro Style!</h2>
        <p className={styles.intro__desc}>
          Fresh, fast, and finger-licking good, food delivery that fuels your day the mellow way.
        </p>
        <Button className={styles.intro__button} variant="primary" size="lg">
          PLACE AN ORDER
        </Button>
        <div className={styles.intro__imageWrap}>
          <Image
            src="/images/food/food-animation.jpeg"
            alt="Metro Mellow Food Animation"
            width={400}
            height={320}
            className={styles.intro__image}
            priority
          />
        </div>
      </div>
      <div className={styles.intro__bottom}>
        <div className={styles.intro__bottomLeft}>
          <h3 className={styles.intro__bottomHeading}>
            From<br />Comfort<br />Classics to<br />Gourmet<br />Goodies
          </h3>
        </div>
        <div className={styles.intro__bottomRight}>
          <p className={styles.intro__bottomDesc}>
            Whether it's lunch or late-night, we deliver flavors that make your taste buds sing.
          </p>
          <Button className={styles.intro__bottomButton} variant="primary" size="lg">
            JOIN OUR MISSION
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoodIntroSection; 