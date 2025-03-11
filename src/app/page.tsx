import React from 'react';
import Hero from './_components/Hero/Hero';
import Services from './_components/Services/Services';
import Testimonials from './_components/Testimonials/Testimonials';
import CTA from './_components/CTA/CTA';
import ServiceCards from './_components/Services/ServiceCards';
import HowItWorks from './_components/HowItWorks/HowItWorks';
import WhyChooseUs from './_components/WhyChooseUs/WhyChooseUs';
import Hero2 from './_components/Hero/Hero2';

export const metadata = {
  title: 'Home Services - Professional Cleaning, Laundry, Cooking & More',
  description: 'Professional home services including cleaning, laundry, cooking, errands, and pest control tailored to your needs. Book your service today!',
};

export default function Home() {
  return (
    <main>
      <Hero2
        title="Guaranteed Home Care Service We Make Life Easier"
        subtitle="Your one-shop-store for all - From cleaning and laundry to cooking, errands, mobile car washing, pest control, and more – we handle it all so you can focus on what matters most."
      />
      <Services />
      {/* <ServiceCards /> */}

      <HowItWorks />

      <WhyChooseUs />
    </main>
    // <main>
    //   <Hero
    //     title="Professional Home Services for Your Comfort"
    //     subtitle="We take care of the details, so you can focus on what matters most. Our comprehensive home services provide peace of mind and more time for you."
    //     ctaPrimary={{
    //       text: "Book a Service",
    //       href: "/booking"
    //     }}
    //     ctaSecondary={{
    //       text: "Explore Services",
    //       href: "/services"
    //     }}
    //     imageSrc="/images/hero-home.jpg"
    //     imageAlt="Professional home services"
    //     backgroundPattern="/images/patterns/dots.svg"
    //   />
    //   <Services />
    //   <Testimonials />
    //   <CTA />
    // </main>
  );
}