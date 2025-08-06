'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './CookingTestimonials.module.scss';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  plan: string;
}

const CookingTestimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Jennifer K.",
      location: "Boston, MA",
      avatar: "/images/cooking/testimonial-1.webp",
      rating: 5,
      text: "As a busy professional with long hours, I never had time to cook healthy meals. This service has been life-changing! The food is delicious, portions are perfect, and I love the variety. I've actually lost weight without trying because I'm eating balanced meals regularly.",
      plan: "Premium Plan"
    },
    {
      id: 2,
      name: "Marcus L.",
      location: "Chicago, IL",
      avatar: "/images/cooking/testimonial-2.webp",
      rating: 5,
      text: "My wife and I started this subscription after our second child was born. It's been a game-changer for our family dinners. The kids love the meals, and we love that they're getting proper nutrition without us having to spend hours meal planning and cooking.",
      plan: "Family Plan"
    },
    {
      id: 3,
      name: "Sophia R.",
      location: "Seattle, WA",
      avatar: "/images/cooking/testimonial-3.webp",
      rating: 4,
      text: "I've tried several meal services, but this one stands out for the quality and flavor. As someone with celiac disease, finding tasty gluten-free options has been challenging. Their specialty diet options are amazing, and I never feel like I'm missing out!",
      plan: "Custom Diet Plan"
    },
    {
      id: 4,
      name: "Thomas W.",
      location: "Austin, TX",
      avatar: "/images/cooking/testimonial-4.webp",
      rating: 5,
      text: "The convenience factor alone is worth every penny. No more grocery shopping, meal planning, or food waste. But beyond that, I'm eating much healthier and trying dishes I would never have cooked myself. The international cuisine options are particularly excellent.",
      plan: "Basic Plan"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    setAutoplay(false);
    if (direction === 'prev') {
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    } else {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  return (
    <section id="testimonials" className={styles.testimonials} ref={sectionRef}>
      <div className={styles.testimonials__container}>
        <motion.div 
          className={styles.testimonials__heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut"
            }
          } : { opacity: 0, y: 20 }}
        >
          <span className={styles.testimonials__subheading}>Testimonials</span>
          <h2 className={styles.testimonials__title}>What Our Customers Say</h2>
          <p className={styles.testimonials__description}>
            Don't just take our word for it. Here's what some of our satisfied customers have to say about our meal delivery service.
          </p>
        </motion.div>

        <div className={styles.testimonials__slider}>
          <div className={styles.testimonials__track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                className={styles.testimonials__slide}
                initial={{ opacity: 0 }}
                animate={isInView ? { 
                  opacity: 1,
                  transition: { 
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.3
                  }
                } : { opacity: 0 }}
              >
                <div className={styles.testimonials__card}>
                  <div className={styles['testimonials__card-header']}>
                    <div className={styles['testimonials__card-avatar']}>
                      <Image 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className={styles['testimonials__card-image']}
                      />
                    </div>
                    <div className={styles['testimonials__card-info']}>
                      <h3 className={styles['testimonials__card-name']}>{testimonial.name}</h3>
                      <p className={styles['testimonials__card-location']}>{testimonial.location}</p>
                      <p className={styles['testimonials__card-plan']}>{testimonial.plan}</p>
                    </div>
                  </div>

                  <div className={styles['testimonials__card-rating']}>
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={i < testimonial.rating ? styles['testimonials__card-star--active'] : styles['testimonials__card-star']} 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 1L12.7553 6.52729L18.7764 7.45386L14.3882 11.7193L15.5107 17.7214L10 14.9L4.48934 17.7214L5.61183 11.7193L1.22364 7.45386L7.24472 6.52729L10 1Z" fill="currentColor" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className={styles['testimonials__card-text']}>
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            className={styles.testimonials__prev}
            onClick={() => handleArrowClick('prev')}
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            className={styles.testimonials__next}
            onClick={() => handleArrowClick('next')}
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.testimonials__dots}>
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`${styles.testimonials__dot} ${index === activeIndex ? styles['testimonials__dot--active'] : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CookingTestimonials;