"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./ClientTestimonials.module.scss";

const ClientTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Facilities Manager",
      company: "TechCorp Solutions",
      rating: 5,
      text: "Metro Mellow transformed our office environment. Their attention to detail and consistent quality has impressed both our staff and clients.",
    },
    {
      name: "Michael Chen",
      title: "Operations Director",
      company: "Global Finance Inc.",
      rating: 5,
      text: "Professional, reliable, and thorough. They've maintained our corporate standards while exceeding our expectations for cleanliness.",
    },
    {
      name: "Lisa Rodriguez",
      title: "Office Manager",
      company: "Creative Agency Plus",
      rating: 5,
      text: "The team is incredibly professional and flexible with our scheduling needs. Our workspace has never looked better.",
    },
  ];

  return (
    <section className={styles.clientTestimonials}>
      <div className={styles.clientTestimonials__container}>
        <motion.div
          className={styles.clientTestimonials__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.clientTestimonials__title}>
            What Our <span className={styles.clientTestimonials__highlight}>Clients</span> Say
          </h2>
        </motion.div>

        <div className={styles.clientTestimonials__grid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.clientTestimonials__card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.clientTestimonials__quote}>
                <Quote size={24} />
              </div>
              <div className={styles.clientTestimonials__rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className={styles.clientTestimonials__text}>{testimonial.text}</p>
              <div className={styles.clientTestimonials__author}>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.title}, {testimonial.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;