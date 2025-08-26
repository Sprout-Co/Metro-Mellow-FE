import React from 'react';
import styles from './ProgressIndicator.module.scss';

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  isValid: boolean;
  isActive: boolean;
  isCompleted: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  onStepClick: (stepId: string) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  onStepClick,
}) => {
  return (
    <div className={styles.progress}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`${styles.step} ${step.isActive ? styles.active : ''} ${
            step.isCompleted ? styles.completed : ''
          }`}
          onClick={() => onStepClick(step.id)}
        >
          <div className={styles.icon}>{step.icon}</div>
          <div className={styles.label}>{step.label}</div>
          {index < steps.length - 1 && <div className={styles.line} />}
        </div>
      ))}
    </div>
  );
};