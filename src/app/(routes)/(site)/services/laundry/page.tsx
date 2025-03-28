
import React from 'react';
import LaundryHero from './LaundryHero/LaundryHero';
import LaundryAbout from './LaundryAbout/LaundryAbout';
import LaundryServices from './LaundryServices/LaundryServices';
import LaundryProcess from './LaundryProcess/LaundryProcess';
import LaundryPricing from './LaundryPricing/LaundryPricing';
import LaundryBenefits from './LaundryBenefits/LaundryBenefits';
import LaundryEcoFriendly from './LaundryEcoFriendly/LaundryEcoFriendly';
import LaundryTestimonials from './LaundryTestimonial/LaundryTestimonial';
import LaundryFAQ from './LaundryFAQ/LaundryFAQ';
import LaundryCTA from './LaundryCTA/LaundryCTA';
import LaundryContact from './LaundryContact/LaundryContact';

export const metadata = {
    title: 'Professional Laundry Services | Urban Serve',
    description: 'Expert laundry, dry cleaning and garment care services. Free pickup and delivery, eco-friendly options, and customized care for your clothing.',
    keywords: 'laundry service, wash and fold, dry cleaning, ironing service, stain removal, eco-friendly laundry',
}

export default function LaundryPage() {
    return (
        <main>
            <LaundryHero />
            <LaundryAbout />
            <LaundryServices />
            <LaundryProcess />
            <LaundryPricing />
            <LaundryBenefits />
            <LaundryEcoFriendly />
            <LaundryTestimonials />
            <LaundryFAQ />
            <LaundryCTA />
            <LaundryContact />
        </main>
    );
}