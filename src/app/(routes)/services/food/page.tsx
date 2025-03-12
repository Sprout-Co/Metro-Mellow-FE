import React from 'react';
import CookingHero from './_components/CookingHero/CookingHero';
import CookingAbout from './_components/CookingAbout/CookingAbout';
import CookingPlans from './_components/CookingPlans/CookingPlans';
import CookingProcess from './_components/CookingProcess/CookingProcess';
import CookingMenu from './_components/CookingMenu/CookingMenu';
import CookingBenefits from './_components/CookingBenefits/CookingBenefits';
import CookingChefs from './_components/CookingChefs/CookingChefs';
import CookingTestimonials from './_components/CookingTestimonials/CookingTestimonials';
import CookingFAQ from './_components/CookingFAQ/CookingFAQ';
import CookingCTA from './_components/CookingCTA/CookingCTA';
import CookingContact from './_components/CookingContact/CookingContact';
// import CookingHero from './components/CookingHero';
// import CookingAbout from './components/CookingAbout';
// import CookingPlans from './components/CookingPlans';
// import CookingProcess from './components/CookingProcess';
// import CookingMenu from './components/CookingMenu';
// import CookingBenefits from './components/CookingBenefits';
// import CookingChefs from './components/CookingChefs';
// import CookingTestimonials from './components/CookingTestimonials';
// import CookingFAQ from './components/CookingFAQ';
// import CookingCTA from './components/CookingCTA';
// import CookingContact from './components/CookingContact';


export const metadata = {
    title: 'Professional Cleaning Services | Urban Serve',
    description: 'Experience sparkling clean spaces with our professional cleaning services. Residential, commercial and deep cleaning options available.',
}

export default function FoodPage() {
    return (
        <main>
           <CookingHero />
           <CookingAbout />
           <CookingPlans />
      <CookingProcess />
      <CookingMenu />
      <CookingBenefits />
      <CookingChefs />
      <CookingTestimonials />
      <CookingFAQ />
      <CookingCTA />
      <CookingContact />
        </main>
    );
}