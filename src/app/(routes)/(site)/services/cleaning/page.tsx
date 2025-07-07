import React from 'react';
import CleaningHero from './_components/CleaningHero/CleaningHero';
import CleaningPromoSection from './_components/CleaningPromoSection/CleaningPromoSection';
import CleaningServicesShowcase from './_components/CleaningServicesShowcase/CleaningServicesShowcase';
import CleaningVideoSection from './_components/CleaningVideoSection/CleaningVideoSection';
import CleaningStepsSection from './_components/CleaningStepsSection/CleaningStepsSection';
import Hero from './_components/Hero/Hero';
import About from './_components/About/About';
import Services from './_components/Services/Services';
import WhyChooseUs from './_components/WhyChooseUs/WhyChooseUs';
import Testimonials from './_components/Testimonials/Testimonials';
import OurProcess from './_components/OurProcess/OurProcess';
import Contact from './_components/Contact/Contact';
import FAQ from './_components/FAQ/FAQ';
import CTA from './_components/CTA/CTA';

export const metadata = {
    title: 'Professional Cleaning Services | Urban Serve',
    description: 'Experience sparkling clean spaces with our professional cleaning services. Residential, commercial and deep cleaning options available.',
}

export default function CleaningPage() {
    return (
        <main>
            <CleaningHero />
            <CleaningPromoSection />
            <CleaningServicesShowcase />
            <CleaningVideoSection />
            <CleaningStepsSection />
            {/* <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <OurProcess />
            <Testimonials />
            <FAQ />
            <CTA />
            <Contact /> */}
        </main>
    );
}