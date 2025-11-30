"use client";

import React, { useState } from "react";
import styles from "./LegalAccordion.module.scss";

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

interface LegalAccordionProps {
  sections: LegalSection[];
  defaultOpenId?: string;
}

const LegalAccordion: React.FC<LegalAccordionProps> = ({
  sections,
  defaultOpenId,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    defaultOpenId || null
  );

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.accordion}>
      {sections.map((section) => (
        <div
          key={section.id}
          className={`${styles.accordion__item} ${expandedId === section.id ? styles.accordion__item_expanded : ""}`}
        >
          <button
            className={styles.accordion__header}
            onClick={() => toggleSection(section.id)}
            aria-expanded={expandedId === section.id}
            aria-controls={`content-${section.id}`}
          >
            <span className={styles.accordion__title}>{section.title}</span>
            <span className={styles.accordion__icon}>
              {expandedId === section.id ? "−" : "+"}
            </span>
          </button>
          {expandedId === section.id && (
            <div
              id={`content-${section.id}`}
              className={styles.accordion__content}
            >
              {section.content.map((paragraph, index) => (
                <p key={index} className={styles.accordion__paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LegalAccordion;

