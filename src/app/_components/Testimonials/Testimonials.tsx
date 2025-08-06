// components/home/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Testimonials.module.scss";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    quote:
      "Metromellow has transformed my weekly cleaning routine. Their team is professional, thorough, and always goes above and beyond. Highly recommend!",
    avatar: "/images/testimonials/sarah.webp",
    service: "Home Cleaning",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    location: "Chicago, IL",
    quote:
      "I've been using their meal preparation service for 3 months now, and it has saved me so much time. The food is always delicious and customized to my preferences.",
    avatar: "/images/testimonials/michael.webp",
    service: "Meal Preparation",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "San Francisco, CA",
    quote:
      "The laundry service is exceptional! They handle everything with care and my clothes come back perfectly folded. It's one less thing I have to worry about.",
    avatar: "/images/testimonials/emily.webp",
    service: "Laundry Services",
    rating: 4,
  },
  {
    id: 4,
    name: "David Williams",
    location: "Austin, TX",
    quote:
      "Their pest control service was quick, effective, and used eco-friendly products which was important to me. Haven't seen a single pest since!",
    avatar: "/images/testimonials/david.webp",
    service: "Pest Control",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonials__container}>
        <motion.div
          className={styles.testimonials__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.testimonials__title}>What Our Customers Say</h2>
          <p className={styles.testimonials__subtitle}>
            Don't just take our word for it, hear from our satisfied customers
          </p>
        </motion.div>

        <div className={styles.testimonials__carousel}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`${styles.testimonials__item} ${index === activeIndex ? styles["testimonials__item--active"] : ""}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 0.9,
                x: `${(index - activeIndex) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.testimonials__quote}>
                <svg
                  className={styles.testimonials__quoteIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7M19 15H15C14.4696 15 13.9609 14.7893 13.5858 14.4142C13.2107 14.0391 13 13.5304 13 13V11C13 10.4696 13.2107 9.96086 13.5858 9.58579C13.9609 9.21071 14.4696 9 15 9H17C17.5304 9 18.0391 9.21071 18.4142 9.58579C18.7893 9.96086 19 10.4696 19 11M11 15H7C6.46957 15 5.96086 14.7893 5.58579 14.4142C5.21071 14.0391 5 13.5304 5 13V11C5 10.4696 5.21071 9.96086 5.58579 9.58579C5.96086 9.21071 6.46957 9 7 9H9C9.53043 9 10.0391 9.21071 10.4142 9.58579C10.7893 9.96086 11 10.4696 11 11M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className={styles.testimonials__text}>{testimonial.quote}</p>
              </div>

              <div className={styles.testimonials__author}>
                <div className={styles.testimonials__avatar}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                  />
                </div>
                <div className={styles.testimonials__info}>
                  <h4 className={styles.testimonials__name}>
                    {testimonial.name}
                  </h4>
                  <p className={styles.testimonials__location}>
                    {testimonial.location}
                  </p>
                  <div className={styles.testimonials__service}>
                    {testimonial.service}
                  </div>
                  <div className={styles.testimonials__rating}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.testimonials__star} ${i < testimonial.rating ? styles["testimonials__star--active"] : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.testimonials__indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.testimonials__indicator} ${index === activeIndex ? styles["testimonials__indicator--active"] : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
