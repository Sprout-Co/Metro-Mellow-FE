'use client'
import React, { useState } from 'react';
import styles from './Testimonials.module.scss';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    service: string;
    comment: string;
    rating: number;
    image?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        location: 'New York',
        service: 'House Cleaning',
        comment: 'The cleaning service was exceptional. The team was punctual, thorough, and very professional. My home has never looked better!',
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        location: 'San Francisco',
        service: 'Laundry & Ironing',
        comment: `I've been using their laundry service for months now.They're consistent, reliable, and take great care with all my clothes.`,
        rating: 5
    },
    {
        id: 3,
        name: 'Emily Wilson',
        location: 'Chicago',
        service: 'Cooking Service',
        comment: 'The chef prepared meals for our family gathering and everyone was impressed. Delicious food and excellent presentation!',
        rating: 5
    },
    {
        id: 4,
        name: 'David Martinez',
        location: 'Miami',
        service: 'Pest Control',
        comment: 'Fast response time and effective solutions. Havent seen a single pest since their visit.Highly recommended!',
        rating: 5
    }
];

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
    };

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={index < rating ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={index < rating ? styles.starFilled : styles.starEmpty}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ));
    };

    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>What Our Customers Say</h2>
                    <p className={styles.subtitle}>
                        Do not just take our word for it — hear from some of our satisfied customers
                    </p>
                </div>

                <div className={styles.carousel}>
                    <div className={styles.carouselInner} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className={styles.testimonialCard}>
                                <div className={styles.content}>
                                    <div className={styles.rating}>
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <p className={styles.comment}>{testimonial.comment}</p>
                                    <div className={styles.meta}>
                                        <div className={styles.avatar}>
                                            {testimonial.image ? (
                                                <img src={testimonial.image} alt={testimonial.name} />
                                            ) : (
                                                <div className={styles.placeholder}>
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.info}>
                                            <h4 className={styles.name}>{testimonial.name}</h4>
                                            <p className={styles.details}>
                                                {testimonial.service} • {testimonial.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={prevTestimonial}
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
                            <path d="M19 12H5"></path>
                            <path d="M12 19l-7-7 7-7"></path>
                        </svg>
                    </button>

                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={nextTestimonial}
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
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;