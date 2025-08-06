'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Contact.module.scss';
import Button from '@/components/ui/Button/Button';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    service: string;
}

const contactInfo = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
        label: 'Phone',
        value: '+1234567890',
        link: 'tel:+1234567890'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        ),
        label: 'Email',
        value: 'urbanserve@gmail.com',
        link: 'mailto:urbanserve@gmail.com'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        ),
        label: 'Location',
        value: '23, white street, indiana',
        link: 'https://maps.google.com/?q=23+white+street+indiana'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
        ),
        label: 'Hours',
        value: 'Mon - Sat: 8am - 6pm',
        subvalue: 'Sun: Closed'
    }
];

const serviceOptions = [
    'Home Cleaning',
    'Office Cleaning',
    'Deep Cleaning',
    'Post-Construction Cleaning',
    'Move In/Out Cleaning',
    'Other Services'
];

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset form after showing success message
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    service: ''
                });
            }, 3000);
        }, 1500);
    };

    return (
        <section className={styles.contact} ref={ref}>
            <div className={styles.contact__container}>
                <motion.div
                    className={styles.contact__header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.contact__badge}>CONTACT US</span>
                    <h2 className={styles.contact__title}>Get In Touch</h2>
                    <p className={styles.contact__subtitle}>
                        Have questions or ready to book? We're here to help you get started with our cleaning services.
                    </p>
                </motion.div>

                <div className={styles.contact__content}>
                    <motion.div
                        className={styles.contact__infoContainer}
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={styles.contact__infoHeader}>
                            <h3 className={styles.contact__infoTitle}>Contact Information</h3>
                            <p className={styles.contact__infoText}>
                                Reach out to us directly or fill out the form and we'll get back to you promptly.
                            </p>
                        </div>

                        <div className={styles.contact__infoItems}>
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.contact__infoItem}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                >
                                    <div className={styles.contact__infoIcon}>
                                        {item.icon}
                                    </div>
                                    <div className={styles.contact__infoContent}>
                                        <span className={styles.contact__infoLabel}>{item.label}</span>
                                        {item.link ? (
                                            <a href={item.link} className={styles.contact__infoValue}>
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className={styles.contact__infoValue}>{item.value}</span>
                                        )}
                                        {item.subvalue && (
                                            <span className={styles.contact__infoSubvalue}>{item.subvalue}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className={styles.contact__socials}>
                            <h4 className={styles.contact__socialsTitle}>Follow Us</h4>
                            <div className={styles.contact__socialIcons}>
                                <a href="#" className={styles.contact__socialIcon} aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a href="#" className={styles.contact__socialIcon} aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                </a>
                                <a href="#" className={styles.contact__socialIcon} aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.contact__formContainer}
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className={styles.contact__formTitle}>Send Us a Message</h3>

                        <form className={styles.contact__form} onSubmit={handleSubmit}>
                            <div className={styles.contact__formRow}>
                                <div className={styles.contact__formGroup}>
                                    <label htmlFor="name" className={styles.contact__formLabel}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.contact__formInput}
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                <div className={styles.contact__formGroup}>
                                    <label htmlFor="email" className={styles.contact__formLabel}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.contact__formInput}
                                        placeholder="Your email address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.contact__formRow}>
                                <div className={styles.contact__formGroup}>
                                    <label htmlFor="phone" className={styles.contact__formLabel}>Phone (optional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={styles.contact__formInput}
                                        placeholder="Your phone number"
                                    />
                                </div>

                                <div className={styles.contact__formGroup}>
                                    <label htmlFor="service" className={styles.contact__formLabel}>Service</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={styles.contact__formSelect}
                                        required
                                    >
                                        <option value="">Select service</option>
                                        {serviceOptions.map((service, index) => (
                                            <option key={index} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.contact__formGroup}>
                                <label htmlFor="message" className={styles.contact__formLabel}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={styles.contact__formTextarea}
                                    placeholder="Tell us about your cleaning needs..."
                                    rows={5}
                                    required
                                ></textarea>
                            </div>

                            <div className={styles.contact__formActions}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    className={styles.contact__formButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
                                </Button>

                                {isSuccess && (
                                    <div className={styles.contact__formSuccess}>
                                        <svg className={styles.contact__formSuccessIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        <span>Thank you! We'll be in touch soon.</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            <div className={styles.contact__shapesContainer}>
                <div className={styles.contact__shape1}></div>
                <div className={styles.contact__shape2}></div>
                <div className={styles.contact__shape3}></div>
            </div>
        </section>
    );
};

export default Contact;