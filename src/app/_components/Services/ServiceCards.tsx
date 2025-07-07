'use client';

import React, { useEffect, useRef } from 'react';
import styles from './ServiceCards.module.scss';
import Button from '@/components/ui/Button/Button';

interface ServiceCardData {
    id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
}

const services: ServiceCardData[] = [
    {
        id: 'cleaning',
        title: 'Home Cleaning & Sanitizing',
        description: 'We provide cleaning, organizing, and specialized commercial hygiene services.',
        icon: '/images/icons/cleaning-icon.svg',
        link: '/services/cleaning'
    },
    {
        id: 'laundry',
        title: 'Laundry',
        description: 'We handle washing, ironing, and folding so you can enjoy clean laundry daily.',
        icon: '/images/icons/laundry-icon.svg',
        link: '/services/laundry'
    },
    {
        id: 'cooking',
        title: 'Cooking',
        description: 'Enjoy healthy, homemade meals prepared by our skilled chefs.',
        icon: '/images/icons/cooking-icon.svg',
        link: '/services/cooking'
    },
    {
        id: 'pest-control',
        title: 'Pest Control',
        description: 'Effective and eco-friendly pest control to keep your home pest-free.',
        icon: '/images/icons/pest-icon.svg',
        link: '/services/pest-control'
    },
    {
        id: 'car-washing',
        title: 'Car Washing & Detailing',
        description: 'Keep your vehicle pristine with our on-demand mobile car wash service.',
        icon: '/images/icons/car-icon.svg',
        link: '/services/car-washing'
    }
];

export const ServiceCards = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animate);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        if (headingRef.current) observer.observe(headingRef.current);
        if (textRef.current) observer.observe(textRef.current);
        if (buttonRef.current) observer.observe(buttonRef.current);

        cardRefs.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => {
            if (headingRef.current) observer.unobserve(headingRef.current);
            if (textRef.current) observer.unobserve(textRef.current);
            if (buttonRef.current) observer.unobserve(buttonRef.current);

            cardRefs.current.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <section className={styles.serviceCards} ref={sectionRef}>
            <div className={styles.serviceCards__container}>
                <div className={styles.serviceCards__header}>
                    <h2
                        ref={headingRef}
                        className={`${styles.serviceCards__title} ${styles.fadeIn}`}
                    >
                        What we do?
                    </h2>
                    <p
                        ref={textRef}
                        className={`${styles.serviceCards__subtitle} ${styles.fadeIn} ${styles.fadeIn__delay1}`}
                    >
                        Guaranteed & Exceptional Home Care, Laundry, and Mobile Car Wash Services - Delivered with Excellence
                    </p>
                    <p className={`${styles.serviceCards__description} ${styles.fadeIn} ${styles.fadeIn__delay2}`}>
                        From cleaning and laundry to cooking, mobile car washing, pest control, and more - we handle it all so you can focus on what matters most.
                    </p>
                    <div
                        ref={buttonRef}
                        className={`${styles.serviceCards__action} ${styles.fadeIn} ${styles.fadeIn__delay3}`}
                    >
                        <Button variant="primary" size="md" href="/services">
                            Get Started
                        </Button>
                    </div>
                </div>

                <div className={styles.serviceCards__grid}>
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            ref={el => cardRefs.current[index] = el}
                            className={`${styles.serviceCards__card} ${styles.fadeIn}`}
                            style={{ animationDelay: `${0.1 * index}s` }}
                        >
                            <div className={styles.serviceCards__iconWrapper}>
                                <div className={styles.serviceCards__icon}>
                                    {/* In a real implementation, you would use actual SVG icons */}
                                    <div className={styles.serviceCards__placeholder}></div>
                                </div>
                            </div>
                            <div className={styles.serviceCards__content}>
                                <h3 className={styles.serviceCards__cardTitle}>{service.title}</h3>
                                <p className={styles.serviceCards__cardDescription}>{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCards;