// app/booking/page.tsx
import { Metadata } from 'next';
import BookingHero from './_components/BookingHero/BookingHero';
import SubscriptionModule from './_components/SubscriptionModule/SubscriptionModule';

export const metadata: Metadata = {
  title: 'Book Services | Metro Mellow',
  description: 'Book your home services with Metro Mellow. Choose from cleaning, laundry, cooking, errands, and pest control services.',
};

export default function BookingPage() {
  return (
    <main className="booking-page">
      <BookingHero />
      <SubscriptionModule />
    </main>
  );
}