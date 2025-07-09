import React from 'react';
import FoodHero from './_components/FoodHero/FoodHero';
import MealPromoSection from './_components/MealPromoSection/MealPromoSection';
import FruitBowlSection from './_components/FruitBowlSection/FruitBowlSection';
import FoodIllustrationSection from './_components/FoodIllustrationSection/FoodIllustrationSection';
import OrderStepsSection from './_components/OrderStepsSection/OrderStepsSection';
import FoodSliderSection from './_components/FoodSliderSection/FoodSliderSection';
import FAQSection, { FAQItem } from '@/components/ui/FAQSection/FAQSection';

const foodFaqs: FAQItem[] = [
  { id: 'f1', question: 'Are your meals freshly prepared?', answer: 'Yes! All our meals are cooked fresh daily by professional chefs and delivered hot to your door.' },
  { id: 'f2', question: 'Can I customize my order for dietary needs?', answer: 'Absolutely. You can specify allergies, preferences, or dietary restrictions during checkout.' },
  { id: 'f3', question: 'How do I track my food delivery?', answer: 'You'll receive real-time updates and can track your order status in your account dashboard.' },
  { id: 'f4', question: 'Is there a minimum order amount?', answer: 'No minimums! Order as much or as little as you like.' },
  { id: 'f5', question: 'What if my food arrives cold?', answer: 'Contact us within 30 minutes and we'll make it right with a replacement or refund.' },
];

export const metadata = {
    title: 'Food Delivery Services | MetroMellow',
    description: 'Delicious meals delivered to your doorstep. From comfort food to gourmet dishes, enjoy hassle-free eating with MetroMellow food delivery.',
}

export default function FoodPage() {
    return (
        <main>
           <FoodHero />
           <MealPromoSection />
           <FoodSliderSection />
           {/* <FruitBowlSection /> */}
           <FoodIllustrationSection />
           <OrderStepsSection />
           <FAQSection faqs={foodFaqs} />
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