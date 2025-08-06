'use client';

import React, { useRef, useEffect } from 'react';
import styles from './WhyChooseUs.module.scss';
import Button from '@/components/ui/Button/Button';

interface Reason {
    id: string;
    title: string;
    description: string;
}

const reasons: Reason[] = [
    {
        id: 'mission',
        title: 'Our Mission',
        description: 'We strive to provide reliable, affordable home services that make life easier for our busy customers.'
    },
    {
        id: 'team',
        title: 'Our Team',
        description: 'Our business relies on a diverse team of professional workers with dedication to customer satisfaction.'
    },
    {
        id: 'quality',
        title: 'Quality Service',
        description: 'We are committed to quality service, going the extra mile to ensure work is handled with the utmost professionalism.'
    },
    {
        id: 'pricing',
        title: 'Our Pricing',
        description: 'Our pricing structure is straightforward with no hidden fees. We believe in honesty and transparency, so you know exactly what to expect when you schedule our services.'
    }
];

export const WhyChooseUs = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const reasonRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRef = useRef<HTMLDivElement>(null);

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

        if (sectionRef.current) observer.observe(sectionRef.current);
        if (headerRef.current) observer.observe(headerRef.current);
        if (buttonRef.current) observer.observe(buttonRef.current);

        reasonRefs.current.forEach(reason => {
            if (reason) observer.observe(reason);
        });

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
            if (headerRef.current) observer.unobserve(headerRef.current);
            if (buttonRef.current) observer.unobserve(buttonRef.current);

            reasonRefs.current.forEach(reason => {
                if (reason) observer.unobserve(reason);
            });
        };
    }, []);

    return (
        <section className={styles.whyChooseUs} ref={sectionRef}>
            <div className={styles.whyChooseUs__container}>
                <div
                    ref={headerRef}
                    className={`${styles.whyChooseUs__header} ${styles.fadeIn}`}
                >
                    <span className={styles.whyChooseUs__badge}>Why Choose Us</span>
                    <h2 className={styles.whyChooseUs__title}>
                        Why <span className={styles.whyChooseUs__highlight}>Urban Serve</span> is The Right Choice for You
                    </h2>
                </div>

                <div className={styles.whyChooseUs__grid}>
                    {reasons.map((reason, index) => (
                        <div
                            key={reason.id}
                            ref={el => reasonRefs.current[index] = el}
                            className={`${styles.whyChooseUs__card} ${styles.fadeIn}`}
                            style={{ transitionDelay: `${0.1 * index}s` }}
                        >
                            <div className={styles.whyChooseUs__iconPlaceholder}></div>
                            <h3 className={styles.whyChooseUs__cardTitle}>{reason.title}</h3>
                            <p className={styles.whyChooseUs__cardDescription}>{reason.description}</p>
                        </div>
                    ))}
                </div>

                <div
                    ref={buttonRef}
                    className={`${styles.whyChooseUs__action} ${styles.fadeIn} ${styles.fadeIn__delay3}`}
                >
                    <Button variant="primary" size="lg" href="/booking">
                        Book A Service Now
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;