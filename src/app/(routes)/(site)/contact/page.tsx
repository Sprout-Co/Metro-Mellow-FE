// app/contact/page.tsx
import { Metadata } from "next";
import ContactHero from "./_components/ContactHero/ContactHero";
import ContactInfo from "./_components/ContactInfo/ContactInfo";
import ContactForm from "./_components/ContactForm/ContactForm";
import FAQSection from "@/components/ui/FAQSection/FAQSection";
import { FAQItem } from "@/components/ui/FAQSection/FAQSection";

export const metadata: Metadata = {
  title: "Contact Metromellow | Get in Touch",
  description:
    "Contact Metromellow for all your home service needs. Our friendly team is ready to help with cleaning, laundry, cooking, errands, and pest control.",
};

export default function ContactPage() {
  const contactFAQs: FAQItem[] = [
    {
      id: "1",
      question: "How quickly can I expect a response to my inquiry?",
      answer:
        "We typically respond to all inquiries within 2-4 hours during business hours (8 AM - 8 PM). For urgent matters, you can call us directly at +2347096249201 for immediate assistance.",
    },
    {
      id: "2",
      question: "What areas do you currently serve in Lagos?",
      answer:
        "We currently serve major areas in Lagos including Ikeja, Victoria Island, Lekki, Surulere, and surrounding neighborhoods. Contact us to confirm if we cover your specific location.",
    },
    {
      id: "3",
      question: "Can I schedule services outside of regular business hours?",
      answer:
        "Yes! We offer 24/7 availability for emergency services and flexible scheduling. Our team can accommodate early morning, late evening, and weekend appointments based on your needs.",
    },
    {
      id: "4",
      question: "What payment methods do you accept?",
      answer:
        "We accept multiple payment methods including bank transfers, mobile money, and cash payments. We also offer secure online payment options for your convenience.",
    },
    {
      id: "5",
      question: "Do you provide free consultations or quotes?",
      answer:
        "Absolutely! We offer free consultations and detailed quotes for all our services. Our team will assess your needs and provide transparent pricing with no hidden fees.",
    },
    {
      id: "6",
      question: "How do I track my service request or booking?",
      answer:
        "Once you submit a request, you'll receive a confirmation email with a tracking number. You can also call our customer service line for real-time updates on your service status.",
    },
  ];

  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <FAQSection faqs={contactFAQs} />
    </main>
  );
}
