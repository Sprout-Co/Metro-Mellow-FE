"use client"
import React, { useState } from "react";
import styles from "./TestimonialCarouselSection.module.scss";
import { Icon } from "@/components/ui/Icon/Icon";

const testimonials = [
  {
    text: "I really like the system at this management, I love recommending this software to you guys",
    name: "Adebayo Oke",
    rating: 5,
  },
  {
    text: "The service is fantastic and the support team is always helpful!",
    name: "Chioma Phillips",
    rating: 5,
  },
  {
    text: "A seamless experience from start to finish. Highly recommended!",
    name: "Kemi Ayobanji",
    rating: 5,
  },
];

const CARDS_PER_VIEW = 3;

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
      <div className={styles.container}>
      <h2 className={styles.heading}>Hear the gospel<br />from the crowd</h2>
      <div className={styles.carousel}>
        {testimonials.slice(index, index + CARDS_PER_VIEW).map((t, i) => (
          <div className={styles.card} key={i}>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.quote}>
              <Icon name="quote" size={48} />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.name}>{t.name}</span>
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
      </div>
    </section>
  );
};

export default TestimonialCarouselSection; 