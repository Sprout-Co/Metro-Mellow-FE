// app/contact/page.tsx
import { Metadata } from 'next';
import ContactHero from './_components/ContactHero/ContactHero';

export const metadata: Metadata = {
  title: 'Contact Metro Mellow | Get in Touch',
  description: 'Contact Metro Mellow for all your home service needs. Our friendly team is ready to help with cleaning, laundry, cooking, errands, and pest control.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
    </main>
  );
}