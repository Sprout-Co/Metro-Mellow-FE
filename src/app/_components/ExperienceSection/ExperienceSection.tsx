import React from 'react';
import styles from './ExperienceSection.module.scss';

const ExperienceSection: React.FC = () => {
  return (
    <section className={styles['experience-section']}>
      <div className={styles['experience-section__container']}>
        <div className={styles['experience-section__media']}>
          <div className={styles['experience-section__video-box']}>
            <button className={styles['experience-section__play-button']} aria-label="Play video">
              <span className={styles['experience-section__play-icon']} />
            </button>
          </div>
        </div>
        <div className={styles['experience-section__content']}>
          <h2 className={styles['experience-section__heading']}>
            Experience a<br />life without<br />hassle
          </h2>
          <p className={styles['experience-section__subtext']}>
            We're the spark that turns your chaos into calm, the groove that gets your life back in tune.
          </p>
          <button className={styles['experience-section__cta']} type="button">
            BOOK A SERVICE
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 