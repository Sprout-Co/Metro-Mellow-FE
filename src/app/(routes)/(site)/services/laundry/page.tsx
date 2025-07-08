import React from 'react';
import LaundryHero from './LaundryHero/LaundryHero';
import LaundryFeatures from './LaundryFeatures/LaundryFeatures';
import LaundrySuds from './LaundrySuds/LaundrySuds';
import LaundryPlan from './LaundryPlan/LaundryPlan';

export const metadata = {
    title: 'Professional Laundry Services | Urban Serve',
    description: 'Expert laundry, dry cleaning and garment care services. Free pickup and delivery, eco-friendly options, and customized care for your clothing.',
    keywords: 'laundry service, wash and fold, dry cleaning, ironing service, stain removal, eco-friendly laundry',
}

export default function LaundryPage() {
    return (
        <main>
            <LaundryHero />
            <LaundryFeatures />
            <LaundrySuds />
            <LaundryPlan />
        </main>
    );
}