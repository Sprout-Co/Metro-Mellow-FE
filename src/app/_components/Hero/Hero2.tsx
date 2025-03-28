'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero2.module.scss';
import Button from '@/components/ui/Button/Button';
import ServiceForm from '../Services/ServiceForm';

interface HeroProps {
    title: string;
    subtitle: string;
}

export const Hero2 = ({ title, subtitle }: HeroProps) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animate);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        if (subtitleRef.current) observer.observe(subtitleRef.current);
        if (buttonRef.current) observer.observe(buttonRef.current);
        if (formRef.current) observer.observe(formRef.current);

        return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
            if (subtitleRef.current) observer.unobserve(subtitleRef.current);
            if (buttonRef.current) observer.unobserve(buttonRef.current);
            if (formRef.current) observer.unobserve(formRef.current);
        };
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background Image with Overlay */}

            <div className={styles.hero__container}>

                <div className={styles.hero__content}>
                    <h1 ref={titleRef} className={`${styles.hero__title} ${styles.fadeIn}`}>
                        {title}
                    </h1>
                    <p ref={subtitleRef} className={`${styles.hero__subtitle} ${styles.fadeIn} ${styles.fadeIn__delay1}`}>
                        {subtitle}
                    </p>
                    <div ref={buttonRef} className={`${styles.hero__cta} ${styles.fadeIn} ${styles.fadeIn__delay2}`}>
                        <Button variant="primary" size="md" href="/booking">
                            Get Started
                        </Button>
                    </div>
                </div>
                <div className={styles.hero__img}>
                    <Image
                        src="/images/home/hero-house.png"
                        alt=""
                        width={500}
                        height={500}
                        sizes="100vw"
                        quality={85}
                        layout='responsive'
                    />
                </div>

                {/* <div ref={formRef} className={`${styles.hero__form} ${styles.fadeIn} ${styles.fadeIn__delay3}`}>
                    <ServiceForm />
                </div> */}
            </div>
        </section>
    );
};

export default Hero2;