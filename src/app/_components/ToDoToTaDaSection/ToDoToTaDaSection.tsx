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
          <li>Click what's stressing you out</li>
          <li>Choose your rescue time</li>
          <li>Boom. It's done. You're the hero.</li>
        </ol>
        {/* <button className={styles.ctaButton} type="button">
          BOOK A SERVICE
        </button> */}
        <Button variant="white" size='lg' fullWidth={false}>Book a service</Button>
      </div>
    </section>
  );
};

export default ToDoToTaDaSection; 