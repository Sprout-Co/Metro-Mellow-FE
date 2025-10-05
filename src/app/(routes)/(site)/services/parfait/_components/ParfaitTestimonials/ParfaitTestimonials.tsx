"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ParfaitTestimonials.module.scss";

const testimonials = [
  {
    id: 1,
    text: "The parfaits are so fresh and delicious! I love being able to customize exactly what I want.",
    author: "Amara O.",
    rating: 5,
    emoji: "🍓",
  },
  {
    id: 2,
    text: "Quick delivery and amazing taste. My go-to healthy breakfast option!",
    author: "Kemi A.",
    rating: 5,
    emoji: "🥭",
  },
  {
    id: 3,
    text: "The build-your-own option is genius. My kids love creating their own parfait combinations!",
    author: "David N.",
    rating: 5,
    emoji: "🫐",
  },
];

const ParfaitTestimonials: React.FC = () => {
  return (
    <section className={styles["parfait-testimonials"]}>
      <div className={styles["parfait-testimonials__container"]}>
        <motion.div
          className={styles["parfait-testimonials__header"]}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles["parfait-testimonials__title"]}>
            What Our Parfait Lovers Say
          </h2>
        </motion.div>

        <div className={styles["parfait-testimonials__grid"]}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={styles["parfait-testimonials__card"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles["parfait-testimonials__emoji"]}>
                {testimonial.emoji}
              </div>
              <p className={styles["parfait-testimonials__text"]}>
                "{testimonial.text}"
              </p>
              <div className={styles["parfait-testimonials__rating"]}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className={styles["parfait-testimonials__author"]}>
                — {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParfaitTestimonials;
