'use client';

import React, { useState } from 'react';
import styles from './FAQSection.module.scss';

const questions = [
  {
    id: 'q1',
    question: 'Is my data safe?',
    answer: 'Yes, your data security is our priority. We use industry-standard encryption and secure protocols to protect all your personal information. Our systems are regularly audited and we never share your data with third parties without your explicit consent.'
  },
  {
    id: 'q2',
    question: 'Is there a free trial available?',
    answer: 'Absolutely! We offer a risk-free 7-day trial for new customers to experience our services. This gives you the opportunity to see the Metro Mellow difference before committing to a regular service schedule.'
  },
  {
    id: 'q3',
    question: 'Is moneyback guaranteed?',
    answer: "Yes, we offer a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll make it right or refund your money. Simply notify us within 24 hours of service completion and we'll address your concerns immediately."
  },
  {
    id: 'q4',
    question: 'Can I order on behalf of someone?',
    answer: "Yes, you can order our services as a gift or on behalf of someone else. Just provide their contact information during booking, and we'll coordinate directly with them for scheduling while keeping you updated throughout the process."
  },
  {
    id: 'q5',
    question: 'Is there a cancellation policy?',
    answer: 'We understand plans change. You can cancel or reschedule your service up to 24 hours before the scheduled time with no penalty. Cancellations within 24 hours may incur a small fee to cover our scheduling and preparation costs.'
  },
  {
    id: 'q6',
    question: 'Is there a service guarantee?',
    answer: "Absolutely. We guarantee the quality of all our services. If any service doesn't meet your expectations, we'll return to fix any issues at no additional cost. Our professional staff are trained to deliver consistent, high-quality results every time."
  }
];

const FAQSection: React.FC = () => {
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
              {questions.map((item) => (
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