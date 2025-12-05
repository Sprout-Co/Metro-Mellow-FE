"use client"
import React from 'react';
import styles from './ChoresSection.module.scss';



const FoodIcon = () => (
  <svg width="72" height="72" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Steam lines */}
    <path d="M60 40C60 40 55 30 60 25C65 20 70 30 70 30" stroke="#075056" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M100 35C100 35 95 25 100 20C105 15 110 25 110 25" stroke="#075056" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M140 40C140 40 135 30 140 25C145 20 150 30 150 30" stroke="#075056" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"/>
    
    {/* Plate */}
    <ellipse cx="100" cy="120" rx="70" ry="8" fill="#6A969A" stroke="#CDDCDD" strokeWidth="2"/>
    <ellipse cx="100" cy="115" rx="65" ry="5" fill="#075056" stroke="#CDDCDD" strokeWidth="2"/>
    
    {/* Food on plate */}
    <circle cx="85" cy="105" r="12" fill="#6A969A" stroke="#CDDCDD" strokeWidth="2"/>
    <circle cx="115" cy="105" r="12" fill="#6A969A" stroke="#CDDCDD" strokeWidth="2"/>
    <ellipse cx="100" cy="95" rx="20" ry="15" fill="#075056" stroke="#CDDCDD" strokeWidth="2"/>
    
    {/* Fork */}
    <rect x="155" y="60" width="3" height="50" rx="1.5" fill="#075056" stroke="#CDDCDD" strokeWidth="1"/>
    <rect x="150" y="60" width="3" height="15" rx="1.5" fill="#075056" stroke="#CDDCDD" strokeWidth="1"/>
    <rect x="160" y="60" width="3" height="15" rx="1.5" fill="#075056" stroke="#CDDCDD" strokeWidth="1"/>
    <rect x="152" y="55" width="9" height="8" rx="1" fill="#6A969A" stroke="#CDDCDD" strokeWidth="1"/>
    
    {/* Knife */}
    <rect x="170" y="55" width="3" height="55" rx="1.5" fill="#075056" stroke="#CDDCDD" strokeWidth="1"/>
    <path d="M170 55L175 50L178 53L173 58L170 55Z" fill="#6A969A" stroke="#CDDCDD" strokeWidth="1"/>
  </svg>
);

const PestIcon = () => (
  <svg width="72" height="72" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bug body */}
    <ellipse cx="100" cy="120" rx="35" ry="25" fill="#FE5B04" stroke="#FFDECD" strokeWidth="2"/>
    <ellipse cx="100" cy="115" rx="30" ry="20" fill="#FE9D68" stroke="#FFDECD" strokeWidth="2"/>
    
    {/* Bug head */}
    <circle cx="100" cy="90" r="18" fill="#FE5B04" stroke="#FFDECD" strokeWidth="2"/>
    
    {/* Antennae */}
    <path d="M90 75L85 60M85 60L80 50M85 60L90 55" stroke="#FE5B04" strokeWidth="3" strokeLinecap="round"/>
    <path d="M110 75L115 60M115 60L120 50M115 60L110 55" stroke="#FE5B04" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Legs */}
    <path d="M75 110L60 120M60 120L50 125" stroke="#FE5B04" strokeWidth="3" strokeLinecap="round"/>
    <path d="M70 130L55 140M55 140L45 145" stroke="#FE5B04" strokeWidth="3" strokeLinecap="round"/>
    <path d="M125 110L140 120M140 120L150 125" stroke="#FE5B04" strokeWidth="3" strokeLinecap="round"/>
    <path d="M130 130L145 140M145 140L155 145" stroke="#FE5B04" strokeWidth="3" strokeLinecap="round"/>
    
    {/* Wings */}
    <ellipse cx="85" cy="105" rx="12" ry="18" fill="#FE9D68" stroke="#FFDECD" strokeWidth="1.5" opacity="0.8"/>
    <ellipse cx="115" cy="105" rx="12" ry="18" fill="#FE9D68" stroke="#FFDECD" strokeWidth="1.5" opacity="0.8"/>
    
    {/* Eyes */}
    <circle cx="95" cy="88" r="4" fill="#FFDECD"/>
    <circle cx="105" cy="88" r="4" fill="#FFDECD"/>
  </svg>
);

const CleaningIcon = () => (
  <svg width="72" height="72" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Spray bottle body */}
    <rect x="80" y="60" width="40" height="100" rx="8" fill="#2293FB" stroke="#D3E9FE" strokeWidth="2"/>
    <rect x="85" y="65" width="30" height="90" rx="4" fill="#7ABEFD" stroke="#D3E9FE" strokeWidth="1.5"/>
    
    {/* Bottle neck */}
    <rect x="95" y="50" width="10" height="15" rx="2" fill="#2293FB" stroke="#D3E9FE" strokeWidth="2"/>
    
    {/* Spray trigger */}
    <rect x="92" y="40" width="16" height="12" rx="2" fill="#7ABEFD" stroke="#D3E9FE" strokeWidth="2"/>
    <rect x="95" y="35" width="10" height="8" rx="1" fill="#2293FB" stroke="#D3E9FE" strokeWidth="1.5"/>
    
    {/* Spray nozzle */}
    <circle cx="100" cy="30" r="4" fill="#2293FB" stroke="#D3E9FE" strokeWidth="1.5"/>
    
    {/* Spray mist */}
    <path d="M100 25C100 25 90 15 85 10M100 25C100 25 110 15 115 10" stroke="#7ABEFD" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    <path d="M100 20C100 20 95 10 92 5M100 20C100 20 105 10 108 5" stroke="#7ABEFD" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    
    {/* Label/design on bottle */}
    <rect x="88" y="80" width="24" height="30" rx="2" fill="#2293FB" opacity="0.3"/>
    <path d="M95 95L100 100L105 95" stroke="#D3E9FE" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const LaundryIcon = () => (
  <svg width="72" height="72" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Laundry basket */}
    <path d="M50 80L60 160L140 160L150 80L50 80Z" fill="#91776E" stroke="#DAD2CF" strokeWidth="2"/>
    <path d="M55 85L65 155L135 155L145 85L55 85Z" fill="#471D0D" stroke="#DAD2CF" strokeWidth="1.5"/>
    
    {/* Basket handle */}
    <path d="M70 80Q100 50 130 80" stroke="#91776E" strokeWidth="4" strokeLinecap="round" fill="none"/>
    
    {/* Basket weave pattern */}
    <line x1="70" y1="100" x2="130" y2="100" stroke="#91776E" strokeWidth="1.5" opacity="0.5"/>
    <line x1="70" y1="120" x2="130" y2="120" stroke="#91776E" strokeWidth="1.5" opacity="0.5"/>
    <line x1="70" y1="140" x2="130" y2="140" stroke="#91776E" strokeWidth="1.5" opacity="0.5"/>
    
    {/* Shirt hanging */}
    <path d="M110 50L100 70L90 70L80 50L85 45L95 45L105 45L110 50Z" fill="#6A969A" stroke="#CDDCDD" strokeWidth="2"/>
    <path d="M95 45L95 50L90 50L90 45Z" fill="#075056" stroke="#CDDCDD" strokeWidth="1"/>
    <rect x="85" y="50" width="20" height="25" rx="2" fill="#6A969A" stroke="#CDDCDD" strokeWidth="1.5"/>
    <path d="M85 75L90 80L100 80L105 75" stroke="#075056" strokeWidth="2" strokeLinecap="round" fill="none"/>
    
    {/* Hanger */}
    <path d="M95 30L90 35L100 35L95 30Z" fill="#91776E" stroke="#DAD2CF" strokeWidth="1.5"/>
    <line x1="95" y1="30" x2="95" y2="45" stroke="#91776E" strokeWidth="2"/>
</svg>
);
import { Button } from '@/components/ui/Button/Button';
const services = [
  {
    name: 'Fresh Meal Delivery',
    desc: 'Nutritious, delicious meals prepared by professional chefs. From traditional Nigerian dishes to international cuisine, delivered fresh to your door.',
    icon: <FoodIcon />,
    bg: 'chores-card--food',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Pest Control',
    desc: 'Safe, effective pest elimination for homes and offices. Licensed professionals using eco-friendly treatments to keep your space pest-free.',
    icon: <PestIcon />,
    bg: 'chores-card--pest',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Cleaning',
    desc: 'Deep cleaning, regular maintenance, and move-in/out services. Professional cleaners with quality supplies and satisfaction guarantee.',
    icon: <CleaningIcon />,
    bg: 'chores-card--cleaning',
    btn: 'chores-card__btn--primary',
  },
  {
    name: 'Laundry Service',
    desc: 'Wash, fold, iron, and dry cleaning services. Pickup and delivery included. Your clothes handled with care by laundry professionals.',
    icon: <LaundryIcon />,
    bg: 'chores-card--laundry',
    btn: 'chores-card__btn--secondary',
  },
];

const ChoresSection: React.FC = () => {
  return (
    <section className={styles['chores-section']}>
      <div className={styles['chores-section__container']}>
        <h2 className={styles['chores-section__heading']}>
          Professional Home Services That Actually Work
        </h2>
        <p className={styles['chores-section__subheading']}>
          From deep cleaning to fresh meals, our vetted professionals deliver results you can trust. No stress, no hassle, just quality service when you need it.
        </p>
        <div className={styles['chores-section__grid']}>
          {services.map((service) => (
            <div key={service.name} className={`${styles['chores-card']} ${styles[service.bg]}`}>
              <div className={styles['chores-card__icon']}>
                {service.icon}
              </div>
              <div className={styles['chores-card__content']}>
                <h3 className={styles['chores-card__title']}>{service.name}</h3>
                <p className={styles['chores-card__desc']}>{service.desc}</p>
                {/* <button className={`${styles['chores-card__btn']} ${styles[service.btn]}`}>
                  START HIRING
                </button> */}
                <Button variant="white" size='md' fullWidth={false}>Learn More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoresSection;