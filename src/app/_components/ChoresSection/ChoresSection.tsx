import React from 'react';
import styles from './ChoresSection.module.scss';

const services = [
  {
    name: 'Errand',
    desc: 'Enjoy work without the pressure of wondering what would happen to you if you lose your job.',
    icon: '/public/images/errand/e1.jpeg', // Replace with your SVG or image path
    bg: 'chores-card--errand',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Food',
    desc: 'Enjoy your work without the pressure of wondering what would happen to you if you lose.',
    icon: '/public/images/food/f1.png',
    bg: 'chores-card--food',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Pest Control',
    desc: 'Enjoy your work without the pressure of wondering what would happen to you if you lose.',
    icon: '/public/images/pest-control/p1.jpeg',
    bg: 'chores-card--pest',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Cleaning',
    desc: 'Enjoy work without the pressure of wondering what would happen to you if you lose your job.',
    icon: '/public/images/cleaning/c1.jpeg',
    bg: 'chores-card--cleaning',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Laundry',
    desc: 'Enjoy work without the pressure of wondering what would happen to you if you lose your job.',
    icon: '/public/images/laundry/dry-cleaning.jpg',
    bg: 'chores-card--laundry',
    btn: 'chores-card__btn--secondary',
  },
];

const ChoresSection: React.FC = () => {
  return (
    <section className={styles['chores-section']}>
      <div className={styles['chores-section__container']}>
        <h2 className={styles['chores-section__heading']}>
          We Handle the Chores, You Chase the Cheers.
        </h2>
        <p className={styles['chores-section__subheading']}>
          whatever's hijacking your peace, Metromellow sends it packing with a smile.
        </p>
        <div className={styles['chores-section__grid']}>
          {services.map((service) => (
            <div key={service.name} className={`${styles['chores-card']} ${styles[service.bg]}`}>
              <div className={styles['chores-card__icon']}>
                <img src={service.icon} alt={service.name} />
              </div>
              <div className={styles['chores-card__content']}>
                <h3 className={styles['chores-card__title']}>{service.name}</h3>
                <p className={styles['chores-card__desc']}>{service.desc}</p>
                <button className={`${styles['chores-card__btn']} ${styles[service.btn]}`}>START HIRING</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoresSection; 