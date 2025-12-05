"use client"
import { Button } from '@/components/ui/Button/Button';
import styles from './ToDoToTaDaSection.module.scss';

const ToDoToTaDaSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.heading}>
          <span>From <span className={styles.bold}>To-Do</span></span><br />
          <span>to <span className={styles.taDa}>Ta-Da!</span></span>
        </h1>
        <ol className={styles.steps}>
          <li>Select your service and schedule your preferred time</li>
          <li>Our vetted professionals arrive with everything needed</li>
          <li>Relax while we handle it - satisfaction guaranteed!</li>
        </ol>
        {/* <button className={styles.ctaButton} type="button">
          BOOK A SERVICE
        </button> */}
        <Button variant="white" size='lg' fullWidth={false}>Get Started Now</Button>
      </div>
    </section>
  );
};

export default ToDoToTaDaSection; 