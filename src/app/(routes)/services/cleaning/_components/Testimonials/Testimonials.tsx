// src/components/sections/cleaning/Testimonials/Testimonials.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.scss';

interface Testimonial {
    id: number;
    name: string;
    title: string;
    company: string;
    image: string;
    testimonial: string;
    rating: number;
}

const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah M',
        title: 'Founder',
        company: '@Blender',
        image: '/images/cleaning/testimonial-1.jpg',
        testimonial: '"Our office always looks professional thanks to the consistent cleaning provided by UrbanServe. They have truly become an extension of our team."',
        rating: 5
    },
    {
        id: 2,
        name: 'Sarah',
        title: 'Founder',
        company: '@Blender',
        image: '/images/cleaning/testimonial-2.jpg',
        testimonial: '"The attention to detail is impressive. From the kitchen to the bathrooms, every surface sparkles. I appreciate how they go the extra mile to make our space feel fresh."',
        rating: 5
    },
    {
        id: 3,
        name: 'Michael T',
        title: 'Office Manager',
        company: '@TechStart',
        image: '/images/cleaning/testimonial-3.jpg',
        testimonial: "We've tried several cleaning services, but UrbanServe consistently outperforms them all.Their team is reliable, thorough, and always leaves our office spotless.",
        rating: 5
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const setNextTestimonial = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const setPrevTestimonial = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const setTestimonial = (index: number) => {
        if (!isAnimating && index !== activeIndex) {
            setIsAnimating(true);
            setActiveIndex(index);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    // Autoplay functionality
    useEffect(() => {
        if (isInView) {
            autoplayRef.current = setInterval(() => {
                setNextTestimonial();
            }, 5000);
        }

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [isInView, activeIndex, isAnimating]);

    // Pause autoplay on hover
    const pauseAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    // Resume autoplay when not hovering
    const resumeAutoplay = () => {
        if (!autoplayRef.current) {
            autoplayRef.current = setInterval(() => {
                setNextTestimonial();
            }, 5000);
        }
    };

    return (
        <section
            className={styles.testimonials}
            ref={ref}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
        >
            <div className={styles.testimonials__container}>
                <motion.div
                    className={styles.testimonials__header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.testimonials__badge}>TESTIMONIALS</span>
                    <h2 className={styles.testimonials__title}>What Our Clients Say</h2>
                    <p className={styles.testimonials__subtitle}>
                        Don't just take our word for it. Here's what our satisfied customers have to say about our cleaning services.
                    </p>
                </motion.div>

                <div className={styles.testimonials__carousel}>
                    <div className={styles.testimonials__carouselInner}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className={styles.testimonials__slide}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.testimonials__testimonial}>
                                    <div className={styles.testimonials__quote}>
                                        <svg className={styles.testimonials__quoteIcon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V18C10 18.5304 9.78929 19.0391 9.41421 19.4142C9.03914 19.7893 8.53043 20 8 20H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className={styles.testimonials__quoteText}>
                                            {testimonialsData[activeIndex].testimonial}
                                        </p>
                                    </div>

                                    <div className={styles.testimonials__rating}>
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`${styles.testimonials__star} ${i < testimonialsData[activeIndex].rating ? styles['testimonials__star--filled'] : ''}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <div className={styles.testimonials__author}>
                                        <div className={styles.testimonials__avatar}>
                                            <Image
                                                src={testimonialsData[activeIndex].image}
                                                alt={testimonialsData[activeIndex].name}
                                                width={60}
                                                height={60}
                                                className={styles.testimonials__avatarImage}
                                            />
                                        </div>
                                        <div className={styles.testimonials__info}>
                                            <h3 className={styles.testimonials__name}>{testimonialsData[activeIndex].name}</h3>
                                            <p className={styles.testimonials__role}>
                                                {testimonialsData[activeIndex].title} {testimonialsData[activeIndex].company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className={styles.testimonials__controls}>
                        <button
                            className={styles.testimonials__arrow}
                            onClick={setPrevTestimonial}
                            aria-label="Previous testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        <div className={styles.testimonials__dots}>
                            {testimonialsData.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.testimonials__dot} ${index === activeIndex ? styles['testimonials__dot--active'] : ''}`}
                                    onClick={() => setTestimonial(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            className={styles.testimonials__arrow}
                            onClick={setNextTestimonial}
                            aria-label="Next testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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