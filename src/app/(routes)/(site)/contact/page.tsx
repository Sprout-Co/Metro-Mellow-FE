// app/contact/page.tsx
import { Metadata } from "next";
import ContactHero from "./_components/ContactHero/ContactHero";
import ContactInfo from "./_components/ContactInfo/ContactInfo";
import ContactForm from "./_components/ContactForm/ContactForm";
import FAQSection from "@/components/ui/FAQSection/FAQSection";
import { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/utils/seoHelpers";
import { ContactDetails } from "@/constants/config";

export const metadata: Metadata = {
  title: "Contact Us | Customer Support & Service Requests | Metromellow Lagos",
  description:
    "Need help with home services in Lagos? Contact Metromellow for cleaning, laundry, cooking, errands or pest control. Our team responds within hours. Call or message us today!",
  keywords:
    "contact Metromellow, home services support Lagos, cleaning service contact, customer service Lagos, book home services",
  alternates: {
    canonical: "https://metromellow.com/contact",
  },
  openGraph: {
    title: "Contact Metromellow | Customer Support for Home Services",
    description:
      "Contact our team for home services throughout Lagos. Quick response guaranteed!",
    url: "https://metromellow.com/contact",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow - Professional Home Services Contact",
      },
    ],
  },
};

export default function ContactPage() {
  const contactFAQs: FAQItem[] = [
    {
      id: "1",
      question: "How quickly can I expect a response to my inquiry?",
      answer: `We typically respond to all inquiries within 2-4 hours during business hours (8 AM - 8 PM). For urgent matters, you can call us directly at ${ContactDetails.PHONE} for immediate assistance.`,
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

  // Prepare structured data objects
  const contactPageSchema = {
    "@type": "ContactPage",
    name: "Contact Metromellow",
    description:
      "Contact us for home services throughout Lagos including cleaning, laundry, and food delivery.",
    url: "https://metromellow.com/contact",
    isPartOf: {
      "@type": "WebSite",
      name: "Metromellow",
      url: "https://metromellow.com",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ContactDetails.PHONE,
      contactType: "customer service",
      areaServed: "Lagos",
      availableLanguage: ["en"],
    },
  };

  // Convert FAQs to the format needed for schema
  const faqSchemaData = contactFAQs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Contact Us", url: "https://metromellow.com/contact" },
  ];

  // Enhance business schema with contact-specific information
  const enhancedBusinessInfo = {
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ContactDetails.PHONE,
        contactType: "customer service",
        areaServed: "Lagos",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        telephone: ContactDetails.PHONE,
        contactType: "sales",
        areaServed: "Lagos",
        availableLanguage: ["en"],
      },
    ],
  };

  return (
    <>
      {/* Add structured data */}
      <StructuredData type="WebPage" data={contactPageSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(faqSchemaData)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema(enhancedBusinessInfo)}
      />

      <main>
        <section
          id="contact-hero-lagos"
          aria-label="Contact Metromellow in Lagos"
        >
          <ContactHero />
        </section>

        <section
          id="contact-information-details"
          aria-label="Contact Information"
        >
          <ContactInfo />
        </section>

        <section id="contact-form-request" aria-label="Send Service Request">
          <ContactForm />
        </section>

        <section
          id="contact-faq-support"
          aria-label="Frequently Asked Questions About Our Services"
        >
          <FAQSection faqs={contactFAQs} />
        </section>
      </main>
    </>
  );
}
