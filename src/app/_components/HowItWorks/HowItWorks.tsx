'use client';

import React, { useRef, useEffect } from 'react';
import styles from './HowItWorks.module.scss';

interface Step {
    id: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        id: 'book',
        title: 'Book Online',
        description: 'Choose your service, select a time slot, and book in just a few clicks.'
    },
    {
        id: 'dispatch',
        title: 'We Dispatch Experts',
        description: 'Our trained professionals arrive on time, fully equipped to serve you.'
    },
    {
        id: 'enjoy',
        title: 'Enjoy the Results',
        description: 'Relax as we transform your home into a clean, refreshed environment.'
    }
];

export const HowItWorks = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animate);

                        // Animate the connecting line when the section is visible
                        if (entry.target === sectionRef.current && lineRef.current) {
                            setTimeout(() => {
                                lineRef.current?.classList.add(styles['connectingLine--animate']);
                            }, 500);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        if (titleRef.current) observer.observe(titleRef.current);
        if (subtitleRef.current) observer.observe(subtitleRef.current);

        stepsRef.current.forEach(step => {
            if (step) observer.observe(step);
        });

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
            if (titleRef.current) observer.unobserve(titleRef.current);
            if (subtitleRef.current) observer.unobserve(subtitleRef.current);

            stepsRef.current.forEach(step => {
                if (step) observer.unobserve(step);
            });
        };
    }, []);

    return (
        <section className={styles.howItWorks} ref={sectionRef}>
            <div className={styles.howItWorks__container}>
                <div className={styles.howItWorks__header}>
                    <h2
                        ref={titleRef}
                        className={`${styles.howItWorks__title} ${styles.fadeIn}`}
                    >
                        How It Works
                    </h2>
                    <p
                        ref={subtitleRef}
                        className={`${styles.howItWorks__subtitle} ${styles.fadeIn} ${styles.fadeIn__delay1}`}
                    >
                        A step-by-step guide for potential clients
                    </p>
                </div>

                <div className={styles.howItWorks__steps}>
                    <div ref={lineRef} className={styles.connectingLine}></div>

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            ref={el => stepsRef.current[index] = el}
                            className={`${styles.howItWorks__step} ${styles.fadeIn}`}
                            style={{ transitionDelay: `${0.3 * index}s` }}
                        >
                            <div className={styles.howItWorks__stepIcon}>
                                <div className={styles.howItWorks__iconPlaceholder}></div>
                            </div>
                            <h3 className={styles.howItWorks__stepTitle}>{step.title}</h3>
                            <p className={styles.howItWorks__stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;