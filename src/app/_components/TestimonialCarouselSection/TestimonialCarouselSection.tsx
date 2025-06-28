"use client"
import React, { useState } from "react";
import styles from "./TestimonialCarouselSection.module.scss";

const testimonials = [
  {
    text: "I really like the system at this management, I love recommending this software to you guys",
    name: "Ashley Cooper",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    text: "The service is fantastic and the support team is always helpful!",
    name: "Jordan Smith",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
  },
  {
    text: "A seamless experience from start to finish. Highly recommended!",
    name: "Taylor Lee",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
];

const CARDS_PER_VIEW = 2;

const TestimonialCarouselSection = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - CARDS_PER_VIEW : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => (prev + 1 >= testimonials.length - CARDS_PER_VIEW + 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Hear the gospel<br />from the crowd</h2>
      <div className={styles.carousel}>
        {testimonials.slice(index, index + CARDS_PER_VIEW).map((t, i) => (
          <div className={styles.card} key={i}>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.quote}>&ldquo;&rdquo;</div>
            <div className={styles.userInfo}>
              <img className={styles.avatar} src={t.avatar} alt={t.name} />
              <span className={styles.name}>{t.name}</span>
              <span className={styles.stars}>{"★".repeat(t.rating)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.navButtons}>
        <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous testimonials">
          &#8592;
        </button>
        <button className={styles.navBtn + ' ' + styles.active} onClick={handleNext} aria-label="Next testimonials">
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarouselSection; 