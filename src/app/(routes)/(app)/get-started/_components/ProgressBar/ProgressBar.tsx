"use client";

import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {
  // Step 1 = 50%, Step 2 = 100%
  const progress = (currentStep / totalSteps) * 100;
  const circumference = 2 * Math.PI * 50; // radius = 50 (matches SVG)
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressBar__container}>
        <div className={styles.progressBar__circle}>
          <svg
            className={styles.progressBar__svg}
            width="120"
            height="120"
            viewBox="0 0 120 120"
          >
            {/* Background circle */}
            <circle
              className={styles.progressBar__backgroundCircle}
              cx="60"
              cy="60"
              r="50"
              fill="none"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              className={styles.progressBar__progressCircle}
              cx="60"
              cy="60"
              r="50"
              fill="none"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className={styles.progressBar__content}>
            <div className={styles.progressBar__stepInfo}>
              <span className={styles.progressBar__currentStep}>
                {currentStep}
              </span>
              <span className={styles.progressBar__separator}>/</span>
              <span className={styles.progressBar__totalSteps}>
                {totalSteps}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
