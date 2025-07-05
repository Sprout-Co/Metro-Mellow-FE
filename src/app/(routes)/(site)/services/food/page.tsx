import React from 'react';
import FoodHero from './_components/FoodHero/FoodHero';
import MealPromoSection from './_components/MealPromoSection/MealPromoSection';

export const metadata = {
    title: 'Food Delivery Services | MetroMellow',
    description: 'Delicious meals delivered to your doorstep. From comfort food to gourmet dishes, enjoy hassle-free eating with MetroMellow food delivery.',
}

export default function FoodPage() {
    return (
        <main>
           <FoodHero />
           <MealPromoSection />
           {/* <CookingAbout />
           <CookingPlans />
           <CookingProcess />
           <CookingMenu />
           <CookingBenefits />
           <CookingChefs />
           <CookingTestimonials />
           <CookingFAQ />
           <CookingCTA />
           <CookingContact /> */}
        </main>
    );
}