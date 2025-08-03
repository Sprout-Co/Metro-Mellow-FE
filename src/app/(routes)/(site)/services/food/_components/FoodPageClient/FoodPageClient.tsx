"use client";

import React from 'react';
import FoodHero from '../FoodHero/FoodHero';
import MealPromoSection from '../MealPromoSection/MealPromoSection';
import FruitBowlSection from '../FruitBowlSection/FruitBowlSection';
import FoodIllustrationSection from '../FoodIllustrationSection/FoodIllustrationSection';
import OrderStepsSection from '../OrderStepsSection/OrderStepsSection';
import FoodMenuSection from '../FoodMenuSection/FoodMenuSection';
import FAQSection, { FAQItem } from '@/components/ui/FAQSection/FAQSection';
import {
  ServiceCategory,
  useGetServicesQuery,
  ServiceStatus,
} from "@/graphql/api";

const foodFaqs: FAQItem[] = [
  {
    id: "f1",
    question: "Are your meals freshly prepared?",
    answer: "Yes! All our meals are cooked fresh daily by professional chefs and delivered hot to your door.",
  },
  {
    id: "f2",
    question: "Can I customize my order for dietary needs?",
    answer: "Absolutely. You can specify allergies, preferences, or dietary restrictions during checkout.",
  },
  {
    id: "f3",
    question: "How do I track my food delivery?",
    answer: "You'll receive real-time updates and can track your order status in your account dashboard.",
  },
  {
    id: "f4",
    question: "Is there a minimum order amount?",
    answer: "No minimums! Order as much or as little as you like.",
  },
  {
    id: "f5",
    question: "What if my food arrives cold?",
    answer: "Contact us within 30 minutes and we'll make it right with a replacement or refund.",
  },
];

const FoodPageClient: React.FC = () => {
  const {
    data: servicesData,
    loading,
    error,
  } = useGetServicesQuery({
    variables: {
      category: ServiceCategory.Cooking,
      status: ServiceStatus.Active,
    },
  });

  console.log(servicesData);

  return (
    <>
      <FoodHero />
      <FoodMenuSection
        servicesData={servicesData?.services}
        loading={loading}
        error={error}
      />
      <MealPromoSection />
      <FoodIllustrationSection />
      <OrderStepsSection />
      <FAQSection faqs={foodFaqs} />
    </>
  );
};

export default FoodPageClient;