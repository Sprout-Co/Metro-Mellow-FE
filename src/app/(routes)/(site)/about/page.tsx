import { Metadata } from "next";
import StorySection from "./_components/StorySection/StorySection";
import VideoSection from "./_components/VideoSection/VideoSection";
import ImpactSection from "./_components/ImpactSection/ImpactSection";
import MagicHandsSection from "./_components/MagicHandsSection/MagicHandsSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import styles from "./About.module.scss";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/utils/seoHelpers";

const aboutFaqs: FAQItem[] = [
  {
    id: "q1",
    question: "Is my data safe?",
    answer:
      "Yes, your data security is our priority. We use industry-standard encryption and secure protocols to protect all your personal information. Our systems are regularly audited and we never share your data with third parties without your explicit consent.",
  },
  {
    id: "q2",
    question: "Is there a free trial available?",
    answer:
      "Absolutely! We offer a risk-free 7-day trial for new customers to experience our services. This gives you the opportunity to see the Metromellow difference before committing to a regular service schedule.",
  },
  {
    id: "q3",
    question: "Is moneyback guaranteed?",
    answer:
      "Yes, we offer a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll make it right or refund your money. Simply notify us within 24 hours of service completion and we'll address your concerns immediately.",
  },
  {
    id: "q4",
    question: "Can I order on behalf of someone?",
    answer:
      "Yes, you can order our services as a gift or on behalf of someone else. Just provide their contact information during booking, and we'll coordinate directly with them for scheduling while keeping you updated throughout the process.",
  },
  {
    id: "q5",
    question: "Is there a cancellation policy?",
    answer:
      "We understand plans change. You can cancel or reschedule your service up to 24 hours before the scheduled time with no penalty. Cancellations within 24 hours may incur a small fee to cover our scheduling and preparation costs.",
  },
  {
    id: "q6",
    question: "Is there a service guarantee?",
    answer:
      "Absolutely. We guarantee the quality of all our services. If any service doesn't meet your expectations, we'll return to fix any issues at no additional cost. Our professional staff are trained to deliver consistent, high-quality results every time.",
  },
];

export const metadata: Metadata = {
  title: "About Us | Our Story & Mission | Metromellow Lagos",
  description:
    "Discover Metromellow's journey to transform home services in Lagos through quality, reliability, and exceptional customer care. Learn about our mission and values.",
  keywords:
    "Metromellow, about us, home services Lagos, company mission, company values, Lagos service provider",
  alternates: {
    canonical: "https://metromellow.com/about",
  },
  openGraph: {
    title: "About Metromellow | Quality Home Services in Lagos",
    description:
      "Learn about our mission to transform home services in Lagos through quality, reliability & exceptional customer care.",
    url: "https://metromellow.com/about",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow - Professional Home Services",
      },
    ],
  },
};

export default function AboutPage() {
  // Prepare structured data objects
  const aboutPageSchema = {
    "@type": "WebPage",
    name: "About Metromellow",
    description:
      "Learn about Metromellow's mission to transform home services in Lagos.",
    url: "https://metromellow.com/about",
    isPartOf: {
      "@type": "WebSite",
      name: "Metromellow",
      url: "https://metromellow.com",
    },
  };

  // Convert FAQs to the format needed for schema
  const faqSchemaData = aboutFaqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "About Us", url: "https://metromellow.com/about" },
  ];

  return (
    <>
      {/* Add structured data */}
      <StructuredData type="WebPage" data={aboutPageSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(faqSchemaData)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metromellow is transforming home services in Lagos through quality, reliability, and exceptional customer care.",
        })}
      />

      <main className={styles.aboutPage}>
        <section id="about-our-story" aria-label="Our Story">
          <StorySection />
        </section>

        <section id="our-service-video" aria-label="See Our Services">
          <VideoSection />
        </section>

        <section id="our-impact-lagos" aria-label="Our Impact in Lagos">
          <ImpactSection />
        </section>

        <section id="our-team" aria-label="Our Professional Team">
          <MagicHandsSection />
        </section>

        <section id="about-faqs" aria-label="Frequently Asked Questions">
          <FAQSection faqs={aboutFaqs} />
        </section>
      </main>
    </>
  );
}
