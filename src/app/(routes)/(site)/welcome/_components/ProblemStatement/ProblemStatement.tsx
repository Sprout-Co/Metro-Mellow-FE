"use client"

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Users, TrendingUp } from 'lucide-react';
import styles from './ProblemStatement.module.scss';

const ProblemStatement: FC = () => {
  const problems = [
    {
      icon: Clock,
      title: "Time Poverty",
      description: "Nigerians spend 6+ hours weekly on household chores, missing out on family time and personal growth opportunities.",
      stat: "6+ hours weekly"
    },
    {
      icon: Zap,
      title: "Service Reliability",
      description: "Finding trustworthy professionals for home services is a major challenge, with 70% experiencing service issues.",
      stat: "70% face issues"
    },
    {
      icon: Users,
      title: "Work-Life Balance",
      description: "Rising dual-income households struggle to maintain homes while building careers and nurturing relationships.",
      stat: "85% struggle"
    },
    {
      icon: TrendingUp,
      title: "Urban Living Stress",
      description: "Fast-paced city life leaves little time for essential household tasks, increasing stress and decreasing quality of life.",
      stat: "Growing concern"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.problemStatement}>
      <div className={styles.problemStatement__container}>
        <motion.div
          className={styles.problemStatement__header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2 className={styles.problemStatement__title}>
            <span className={styles["problemStatement__title--accent"]}>The Reality</span>
            <span className={styles["problemStatement__title--main"]}>
              Nigerian Households Face Today
            </span>
          </h2>
          <p className={styles.problemStatement__subtitle}>
            Modern life demands more than we can give. Between work, family, and personal goals, 
            household management becomes overwhelming. You're not alone in this struggle.
          </p>
        </motion.div>

        <motion.div
          className={styles.problemStatement__grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className={styles.problemStatement__card}
              variants={itemVariants}
            >
              <div className={styles.problemStatement__cardHeader}>
                <div className={styles.problemStatement__iconWrapper}>
                  <problem.icon className={styles.problemStatement__icon} />
                </div>
                <span className={styles.problemStatement__stat}>
                  {problem.stat}
                </span>
              </div>
              <h3 className={styles.problemStatement__cardTitle}>
                {problem.title}
              </h3>
              <p className={styles.problemStatement__cardDescription}>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.problemStatement__cta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h3 className={styles.problemStatement__ctaTitle}>
            What if there was a better way?
          </h3>
          <p className={styles.problemStatement__ctaText}>
            Imagine having reliable, professional home services at your fingertips. 
            No more searching, no more disappointments, no more stress.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;