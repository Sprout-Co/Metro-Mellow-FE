"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./Testimonials.module.scss";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer K.",
    role: "Homeowner",
    location: "Brookside",
    content:
      "I was dealing with a serious ant problem that other companies couldn't resolve. The team at Urban Serve Pest Control identified the issue immediately and implemented a solution that finally worked. The technicians were professional, thorough and explained everything clearly.",
    image: "/images/testimonials/person-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Robert M.",
    role: "Property Manager",
    location: "Downtown",
    content:
      "Managing multiple properties means pest issues can quickly become overwhelming. Urban Serve's commercial pest control service has been a game-changer for us. Their preventative approach and quick response times have saved us countless headaches and tenant complaints.",
    image: "/images/testimonials/person-2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah T.",
    role: "Restaurant Owner",
    location: "Westside",
    content:
      "In the food business, pest control is non-negotiable. Urban Serve created a custom plan that meets all health department requirements while using methods safe around food preparation. Their discreet service and thorough documentation make inspections stress-free.",
    image: "/images/testimonials/person-3.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael P.",
    role: "Homeowner",
    location: "Northridge",
    content:
      "I was concerned about using pest control with young children in the house. Urban Serve put my mind at ease with their eco-friendly, child-safe approaches. The technician took time to address all my concerns and the results have been excellent.",
    image: "/images/testimonials/person-4.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`${styles.testimonials__star} ${
            index < rating ? styles.testimonials__star_filled : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ));
  };

  return (
    <section className={styles.testimonials} id="testimonials" ref={ref}>
      <div className={styles.testimonials__container}>
        <motion.div
          className={styles.testimonials__header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.testimonials__badge}>TESTIMONIALS</span>
          <h2 className={styles.testimonials__title}>What Our Customers Say</h2>
          <p className={styles.testimonials__subtitle}>
            Don't just take our word for it. Hear from our satisfied customers
            who have experienced the Urban Serve Pest Control difference.
          </p>
        </motion.div>

        <div className={styles.testimonials__slider}>
          <div className={styles.testimonials__slides}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`${styles.testimonials__slide} ${
                  index === activeIndex ? styles.testimonials__slide_active : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? {
                        opacity: index === activeIndex ? 1 : 0,
                        scale: index === activeIndex ? 1 : 0.9,
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <div className={styles.testimonials__card}>
                  <div className={styles.testimonials__quote}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>

                  <div className={styles.testimonials__rating}>
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className={styles.testimonials__content}>
                    {testimonial.content}
                  </p>

                  <div className={styles.testimonials__author}>
                    <div className={styles.testimonials__author_image}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className={styles.testimonials__avatar}
                      />
                    </div>
                    <div className={styles.testimonials__author_info}>
                      <h4 className={styles.testimonials__author_name}>
                        {testimonial.name}
                      </h4>
                      <p className={styles.testimonials__author_role}>
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.testimonials__controls}>
            <button
              className={styles.testimonials__control}
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className={styles.testimonials__dots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonials__dot} ${
                    index === activeIndex ? styles.testimonials__dot_active : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            <button
              className={styles.testimonials__control}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
