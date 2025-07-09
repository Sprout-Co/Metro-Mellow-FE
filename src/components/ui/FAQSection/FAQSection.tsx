'use client';

import React, { useState } from 'react';
import styles from './FAQSection.module.scss';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.faq__container}>
        <div className={styles.faq__content}>
          <div className={styles.faq__heading}>
            <h2 className={styles.faq__title}>
              <span className={styles['faq__title-line']}>Questions?</span><br />
              <span className={styles['faq__title-line']}>Here are</span><br />
              <span className={styles['faq__title-line']}>some</span><br />
              <span className={styles['faq__title-line']}>answers</span>
            </h2>
          </div>
          
          <div className={styles.faq__questions}>
            <ul className={styles.faq__list}>
              {faqs.map((item) => (
                <li 
                  key={item.id} 
                  className={`${styles.faq__item} ${expandedId === item.id ? styles.faq__item_expanded : ''}`}
                >
                  <div 
                    className={styles.faq__question}
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <span className={styles.faq__dash}>—</span>
                    <span>{item.question}</span>
                    <span className={styles.faq__toggle}>
                      {expandedId === item.id ? '−' : '+'}
                    </span>
                  </div>
                  {expandedId === item.id && (
                    <div className={styles.faq__answer}>
                      {item.answer}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 