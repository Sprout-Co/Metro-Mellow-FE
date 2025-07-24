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
import FAQSection, { FAQItem } from '@/components/ui/FAQSection/FAQSection';

const cleaningFaqs: FAQItem[] = [
  { id: "c1", question: "Do you bring your own cleaning supplies?", answer: "Yes, our team arrives fully equipped with professional-grade, eco-friendly products." },
  { id: "c2", question: "Can I request green cleaning?", answer: "Absolutely! We offer green cleaning options for all services at no extra charge." },
  { id: "c3", question: "Are your cleaners background checked?", answer: "All staff undergo thorough background checks and training for your peace of mind." },
  { id: "c4", question: "What if I'm not satisfied with the cleaning?", answer: "Contact us within 24 hours and we'll re-clean the area at no extra cost." },
  { id: "c5", question: "How do I reschedule or cancel?", answer: "You can reschedule or cancel up to 24 hours in advance with no penalty." },
];

export const metadata = {
    title: 'Professional Cleaning Services | Urban Serve',
    description: 'Experience sparkling clean spaces with our professional cleaning services. Residential, commercial and deep cleaning options available.',
}

export default function CleaningPage() {
    return (
        <main>
            <CleaningHero />
            <CleaningServicesShowcase />
            <CleaningPromoSection />
            <CleaningVideoSection />
            <CleaningStepsSection />
            <FAQSection faqs={cleaningFaqs} />
        </main>
    );
}