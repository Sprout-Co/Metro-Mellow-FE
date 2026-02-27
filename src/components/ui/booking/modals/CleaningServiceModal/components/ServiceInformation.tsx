"use client";

import React, { useState } from "react";
import styles from "./ServiceInformation.module.scss";

export type ServiceInformationDisplayMode = "accordion";

export interface ServiceInformationSection {
  title: string;
  items: string[];
}

export interface ServiceInformationProps {
  displayMode?: ServiceInformationDisplayMode;
  mainTitle?: string;
  sections: ServiceInformationSection[];
  className?: string;
}

const ServiceInformation: React.FC<ServiceInformationProps> = ({
  displayMode = "accordion",
  mainTitle = "What's included",
  sections,
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div
      className={`${styles.serviceInformation} ${styles.accordion} ${
        className || ""
      }`}
    >
      {mainTitle && (
        <h4 className={styles.accordion__title}>{mainTitle}</h4>
      )}

      <div className={styles.accordion__sections}>
        {sections.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={section.title} className={styles.accordion__section}>
              <button
                type="button"
                className={`${styles.accordion__header} ${
                  isOpen ? styles["accordion__header--open"] : ""
                }`}
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={`service-info-panel-${index}`}
              >
                <span className={styles.accordion__label}>
                  {section.title}
                </span>
                <span className={styles.accordion__icon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id={`service-info-panel-${index}`}
                className={`${styles.accordion__panel} ${
                  isOpen ? styles["accordion__panel--open"] : ""
                }`}
              >
                <ul className={styles.accordion__list}>
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={styles.accordion__listItem}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceInformation;
