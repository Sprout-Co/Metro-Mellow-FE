import React from 'react';
import LaundryPageClient from './_components/LaundryPageClient/LaundryPageClient';


export const metadata = {
    title: 'Professional Laundry Services | Urban Serve',
    description: 'Expert laundry, dry cleaning and garment care services. Free pickup and delivery, eco-friendly options, and customized care for your clothing.',
};

export default function LaundryPage() {
    return (
        <main>
            <LaundryPageClient />
        </main>
    );
}