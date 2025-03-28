// app/contact/page.tsx
import { Metadata } from 'next';
import styles from './Contact.module.scss';
import ContactHero from './_components/ContactHero/ContactHero';
import ContactForm from './_components/ContactForm/ContactForm';
import ContactInfo from './_components/ContactInfo/ContactInfo';
import MapSection from './_components/MapSection/MapSection';
import FAQ from './_components/FAQ/FAQ';

export const metadata: Metadata = {
  title: 'Contact Metro Mellow | Get in Touch',
  description: 'Contact Metro Mellow for all your home service needs. Our friendly team is ready to help with cleaning, laundry, cooking, errands, and pest control.',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <ContactHero />
      <div className={styles['contact-main']}>
        <ContactForm />
        <ContactInfo />
      </div>
      <MapSection />
      <FAQ />
    </main>
  );
}