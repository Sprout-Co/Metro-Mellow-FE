// components/about/Statistics.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './Statistics.module.scss';

const stats = [
  {
    id: 1,
    value: 15000,
    label: 'Happy Customers',
    suffix: '+',
  },
  {
    id: 2,
    value: 50000,
    label: 'Services Completed',
    suffix: '+',
  },
  {
    id: 3,
    value: 120,
    label: 'Professional Staff',
    suffix: '+',
  },
  {
    id: 4,
    value: 6,
    label: 'Years in Business',
    suffix: '',
  },
];

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    if (isInView) {
      const animations = stats.map((stat, index) => {
        return {
          duration: 2000, // Animation duration in ms
          end: stat.value,
        };
      });

      const startTime = Date.now();
      const animationFrame = () => {
        const elapsedTime = Date.now() - startTime;
        const newCounters = animations.map((animation, index) => {
          // Calculate current value based on elapsed time and animation duration
          const progress = Math.min(elapsedTime / animation.duration, 1);
          // Easing function for smoother animation
          const easedProgress = easeOutExpo(progress);
          return Math.floor(easedProgress * animation.end);
        });

        setCounters(newCounters);

        if (elapsedTime < 2000) {
          requestAnimationFrame(animationFrame);
        } else {
          // Ensure final values are exact
          setCounters(stats.map(stat => stat.value));
        }
      };

      requestAnimationFrame(animationFrame);
    }
  }, [isInView]);

  // Easing function for smoother animation
  const easeOutExpo = (x: number) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  return (
    <section className={styles.stats}>
      <div className={styles.stats__container} ref={ref}>
        <div className={styles.stats__grid}>
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              className={styles.stats__item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.stats__value}>
                {counters[index].toLocaleString()}
                <span className={styles.stats__suffix}>{stat.suffix}</span>
              </div>
              <div className={styles.stats__label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}