"use client";

import { FC, useState } from 'react';
import styles from './ContactForm.module.scss';
import { Button } from '@/components/ui/Button';

interface FormData {
  fullname: string;
  service: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    service: '',
    email: '',
    phone: '',
    message: '',
  });

  const serviceOptions = [
    "Laundry Service",
    "Food Delivery",
    "House Cleaning",
    "Pest Control",
    "General Inquiry"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.contactForm__container}>
        <div className={styles.contactForm__content}>
          <div className={styles.contactForm__mapWrapper}>
            <div className={styles.contactForm__map}>
              {/* Map iframe or component would go here */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3377520050425!2d3.361695375092761!3d6.600463622403775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b922f0f0c432d%3A0x80d62b7c07424443!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1705349245151!5m2!1sen!2sng" 
                className={styles.contactForm__mapIframe}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          <div className={styles.contactForm__formWrapper}>
            <form onSubmit={handleSubmit} className={styles.contactForm__form}>
              <div className={styles.contactForm__formGroup}>
                <label htmlFor="fullname" className={styles.contactForm__label}>
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={styles.contactForm__input}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={styles.contactForm__formGroup}>
                <label htmlFor="service" className={styles.contactForm__label}>
                  Select Service
                </label>
                <div className={styles.contactForm__selectWrapper}>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={styles.contactForm__select}
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.contactForm__formGroup}>
                <label htmlFor="email" className={styles.contactForm__label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.contactForm__input}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className={styles.contactForm__formGroup}>
                <label htmlFor="phone" className={styles.contactForm__label}>
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.contactForm__input}
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>

              <div className={styles.contactForm__formGroup}>
                <label htmlFor="message" className={styles.contactForm__label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.contactForm__textarea}
                  placeholder="How can we help you today?"
                  rows={5}
                  required
                ></textarea>
              </div>

              <div className={styles.contactForm__formGroup}>
                <Button 
                  type="submit" 
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                >
                  SEND MESSAGE
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 