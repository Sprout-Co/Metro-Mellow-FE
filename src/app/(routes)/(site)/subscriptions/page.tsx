// app/booking/page.tsx
import { Metadata } from "next";
import BookingHero from "./_components/BookingHero/BookingHero";
import SubscriptionModule from "./_components/SubscriptionModule/SubscriptionModule";
import SubscriptionBuilder from "../../(app)/dashboard/subscriptions/add/_components/SubscriptionBuilder/SubscriptionBuilder";

export const metadata: Metadata = {
  title: "Book Services | Metromellow",
  description:
    "Book your home services with Metromellow. Choose from cleaning, laundry, cooking, errands, and pest control services.",
};

export default function BookingPage() {
  return (
    <main className="booking-page">
      <SubscriptionBuilder />
      {/* <BookingHero />
      <SubscriptionModule /> */}
    </main>
  );
}
