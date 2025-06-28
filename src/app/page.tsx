import React from "react";
import Hero from "./_components/Hero/Hero";
import ServicesGallery from "./_components/ServicesGallery/ServicesGallery";
import ServiceHero from "./_components/ServicesList/ServiceHero";
import Services from "./_components/Services/Services";
import Testimonials from "./_components/Testimonials/Testimonials";
import CTA from "./_components/CTA/CTA";
import ServiceCards from "./_components/Services/ServiceCards";
import HowItWorks from "./_components/HowItWorks/HowItWorks";
import WhyChooseUs from "./_components/WhyChooseUs/WhyChooseUs";
import Hero2 from "./_components/Hero/Hero2";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ExperienceSection from "./_components/ExperienceSection/ExperienceSection";
import ChoresSection from "./_components/ChoresSection/ChoresSection";

export const metadata = {
  title: "Home Services - Professional Cleaning, Laundry, Cooking & More",
  description:
    "Professional home services including cleaning, laundry, cooking, errands, and pest control tailored to your needs. Book your service today!",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGallery />
        <ServiceHero />
        <ExperienceSection />
        <ChoresSection />
        <Services />
        {/* <ServiceCards /> */}

        <HowItWorks />

        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
