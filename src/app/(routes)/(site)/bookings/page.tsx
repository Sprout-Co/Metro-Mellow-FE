// app/booking/page.tsx
import { Metadata } from 'next';
import BookingHero from './_components/BookingHero/BookingHero';
import ServiceSelection from './_components/ServiceSelection/ServiceSelection';
import PlanOptions from './_components/PlanOptions/PlanOptions';
import CustomizationPanel from './_components/CustomizationPanel/CustomizationPanel';
import ScheduleSelector from './_components/ScheduleSelector/ScheduleSelector';
import BookingSummary from './_components/BookingSummary/BookingSummary';

export const metadata: Metadata = {
  title: 'Book Services | Metro Mellow',
  description: 'Book your home services with Metro Mellow. Choose from cleaning, laundry, cooking, errands, and pest control services.',
};

export default function BookingPage() {
  return (
    <main className="booking-page">
      <BookingHero />
      <ServiceSelection />
      <PlanOptions />
      <CustomizationPanel />
      <ScheduleSelector />
      <BookingSummary />
    </main>
  );
}