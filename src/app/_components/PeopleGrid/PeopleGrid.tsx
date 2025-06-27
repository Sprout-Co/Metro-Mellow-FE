import React from 'react';
import styles from './PeopleGrid.module.scss';

const people = [
  { img: '/images/people/chef1.png', alt: 'Chef 1', bg: 'accent' },
  { img: '/images/people/cleaner1.png', alt: 'Cleaner 1', bg: 'primary' },
  { img: '/images/people/cook1.png', alt: 'Cook 1', bg: 'secondary' },
  { img: '/images/people/chef2.png', alt: 'Chef 2', bg: 'accent-light' },
  { img: '/images/people/cleaner2.png', alt: 'Cleaner 2', bg: 'primary-dark' },
  { img: '/images/people/delivery1.png', alt: 'Delivery 1', bg: 'secondary' },
  { img: '/images/people/happy1.png', alt: 'Happy 1', bg: 'primary' },
  { img: '/images/people/phone1.png', alt: 'Phone 1', bg: 'accent' },
];

const PeopleGrid = () => (
  <section className={styles.peopleGrid}>
    <div className={styles.decorTop} />
    <div className={styles.grid}>
      {people.map((person, idx) => (
        <div
          key={idx}
          className={styles.card + ' ' + styles[`bg__${person.bg}`]}
        >
          <img src={person.img} alt={person.alt} className={styles.img} />
        </div>
      ))}
    </div>
    <div className={styles.decorBottom} />
  </section>
);

export default PeopleGrid; 