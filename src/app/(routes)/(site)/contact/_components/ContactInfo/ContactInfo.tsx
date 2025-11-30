"use client";

import { FC } from 'react';
import styles from './ContactInfo.module.scss';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo: FC = () => {
  return (
    <section className={styles.contactInfo}>
      <div className={styles.contactInfo__container}>
        <div className={styles.contactInfo__content}>
          <div className={styles.contactInfo__heading}>
            <h2 className={styles.contactInfo__title}>
              24/7 <br />
              <span className={styles.contactInfo__titleLarge}>available</span>
            </h2>
            <p className={styles.contactInfo__subtitle}>
              Fast, reliable, and eco-friendly. We 
              keep it cool while keeping your 
              wardrobe cooler.
            </p>
          </div>

          <div className={styles.contactInfo__details}>
            <div className={styles.contactInfo__item}>
              <div className={styles.contactInfo__iconWrapper}>
                <MapPin className={styles.contactInfo__icon} />
              </div>
              <p className={styles.contactInfo__text}>
                22, Advance Close, Ikoku,<br />
                Lagos, Nigeria.
              </p>
            </div>

            <div className={styles.contactInfo__item}>
              <div className={styles.contactInfo__iconWrapper}>
                <Phone className={styles.contactInfo__icon} />
              </div>
              <p className={styles.contactInfo__text}>
                <a href="tel:+2347049452585">+2347049452585</a>
              </p>
            </div>

            <div className={styles.contactInfo__item}>
              <div className={styles.contactInfo__iconWrapper}>
                <Mail className={styles.contactInfo__icon} />
              </div>
              <p className={styles.contactInfo__text}>
                team@metromellow.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo; 