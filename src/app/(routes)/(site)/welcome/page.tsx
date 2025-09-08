import { Metadata } from "next";
import HeroSection from "./_components/HeroSection/HeroSection";
import ProblemStatement from "./_components/ProblemStatement/ProblemStatement";
import SolutionOverview from "./_components/SolutionOverview/SolutionOverview";
import WaitlistSection from "./_components/WaitlistSection/WaitlistSection";
import SocialMediaSection from "./_components/SocialMediaSection/SocialMediaSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import styles from "./Welcome.module.scss";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/utils/seoHelpers";

const welcomeFaqs: FAQItem[] = [
  {
    id: "q1",
    question: "When will Metromellow launch?",
    answer:
      "We're targeting Q3 2025 for our official launch in Lagos and Abuja. Join our waitlist to be among the first to know when we go live!",
  },
  {
    id: "q2",
    question: "Which cities will you serve first?",
    answer:
      "We're starting with Lagos and Abuja, then expanding to other major Nigerian cities based on demand and operational capacity.",
  },
  {
    id: "q3",
    question: "How much will services cost?",
    answer:
      "We're designing competitive pricing that offers great value. Pricing will be transparent and clearly communicated before launch. Waitlist members will get early access to pricing information.",
  },
  {
    id: "q4",
    question: "What makes Metromellow different?",
    answer:
      "We're building a comprehensive platform that combines multiple home services with Nigerian-focused solutions, professional staff, and technology-driven convenience.",
  },
  {
    id: "q5",
    question: "How do I join the waitlist?",
    answer:
      "Simply enter your email address in the waitlist section above. You'll receive updates about our launch and early access opportunities.",
  },
  {
    id: "q6",
    question: "Will there be a mobile app?",
    answer:
      "Yes! We're developing both iOS and Android apps that will be available at launch. The apps will offer seamless booking, tracking, and management of all your home services.",
  },
];

export const metadata: Metadata = {
  title: "Coming Soon: Premium Home Services in Lagos | Metro Mellow",
  description:
    "Metro Mellow is bringing professional home services to Lagos. Join our waitlist to be the first to experience cleaning, laundry, cooking, and pest control services delivered to your doorstep.",
  keywords:
    "Metro Mellow launch, home services Lagos, waitlist, premium house services, cleaning services Nigeria, laundry services Lagos, coming soon",
  alternates: {
    canonical: "https://metromellow.com/welcome",
  },
  openGraph: {
    title: "Metro Mellow: Premium Home Services Coming to Lagos",
    description:
      "Join our waitlist to be the first to experience premium home services delivered to your doorstep in Lagos.",
    url: "https://metromellow.com/welcome",
    siteName: "Metro Mellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metro Mellow - Premium Home Services Coming Soon",
      },
    ],
  },
};

export default function WelcomePage() {
  // Prepare structured data objects
  const comingSoonPageSchema = {
    "@type": "WebPage",
    name: "Metro Mellow - Coming Soon",
    description: "Premium home services coming soon to Lagos",
    url: "https://metromellow.com/welcome",
    isPartOf: {
      "@type": "WebSite",
      name: "Metro Mellow",
      url: "https://metromellow.com",
    },
  };

  // Convert FAQs to the format needed for schema
  const faqSchemaData = welcomeFaqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Welcome", url: "https://metromellow.com/welcome" },
  ];

  // Define event schema for the launch
  const launchEventSchema = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: "Metro Mellow Launch",
    description: "Official launch of Metro Mellow home services in Lagos",
    startDate: "2025-07-01T00:00:00+01:00", // Approximate date based on Q3 2025 mentioned in FAQ
    location: {
      "@type": "Place",
      name: "Lagos, Nigeria",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressRegion: "Lagos State",
        addressCountry: "NG",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Metro Mellow",
      url: "https://metromellow.com",
    },
  };

  return (
    <>
      {/* Add structured data */}
      <StructuredData type="WebPage" data={comingSoonPageSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(faqSchemaData)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metro Mellow is bringing premium home services to Lagos, including cleaning, laundry, cooking, and pest control services.",
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(launchEventSchema) }}
      />

      <main className={styles.welcomePage}>
        <section
          id="welcome-hero-lagos"
          aria-label="Premium Home Services Coming to Lagos"
        >
          <HeroSection />
        </section>

        <section
          id="home-service-problems"
          aria-label="Home Service Challenges in Lagos"
        >
          <ProblemStatement />
        </section>

        <section
          id="metro-mellow-solution"
          aria-label="Our Home Service Solution"
        >
          <SolutionOverview />
        </section>

        <section id="join-waitlist-lagos" aria-label="Join Our Lagos Waitlist">
          <WaitlistSection />
        </section>

        <section
          id="follow-social-media"
          aria-label="Follow Our Launch Journey"
        >
          <SocialMediaSection />
        </section>

        <section
          id="launch-faq"
          aria-label="Frequently Asked Questions About Our Launch"
        >
          <FAQSection faqs={welcomeFaqs} />
        </section>
      </main>
    </>
  );
}
