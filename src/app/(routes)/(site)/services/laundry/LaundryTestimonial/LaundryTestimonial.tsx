'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './LaundryTestimonial.module.scss';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    avatar: string;
    rating: number;
    text: string;
}

const LaundryTestimonials = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "New York, NY",
            avatar: "/images/cleaning/testimonial-1.jpg",
            rating: 5,
            text: "I've been using this laundry service for over a year and couldn't be happier. The convenience of pickup and delivery fits perfectly with my busy schedule, and my clothes come back perfectly clean and neatly folded every time."
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "San Francisco, CA",
            avatar: "/images/cleaning/testimonial-2.jpg",
            rating: 5,
            text: "As someone who hates doing laundry, this service has been a game-changer. Their attention to detail is impressive - they've managed to remove stains I thought were permanent. The staff is always friendly and accommodating."
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            location: "Chicago, IL",
            avatar: "/images/cleaning/testimonial-3.jpg",
            rating: 4,
            text: "The subscription plan offers great value for my family of four. We generate a lot of laundry, and having it taken care of weekly has reduced so much stress in our household. The eco-friendly practices are also a big plus for us."
        },
        {
            id: 4,
            name: "David Wilson",
            location: "Boston, MA",
            avatar: "/images/cleaning/testimonial-e.jpg",
            rating: 5,
            text: "I was skeptical at first about outsourcing my laundry, especially for my dress shirts and work clothes. But their professional handling and pressing services have won me over. Everything comes back looking better than if I'd done it myself."
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
                        Don't just take our word for it. Here's what some of our satisfied customers have to say about our laundry services.
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
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button
                        className={styles.testimonials__next}
                        onClick={() => handleArrowClick('next')}
                        aria-label="Next testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

export default LaundryTestimonials;