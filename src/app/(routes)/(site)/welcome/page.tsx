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
  title:
    "Coming Soon: Premium Home Services in Lagos | Cleaning, Laundry & Cooking | Metromellow",
  description:
    "Metromellow launches Q3 2025, bringing professional home services to Lagos. Join our waitlist for first access to cleaning, laundry, cooking, and pest control services. Transforming home care in Nigeria with trusted, tech-enabled solutions.",
  keywords:
    "Metromellow launch, home services Lagos, waitlist, premium cleaning Lagos, laundry services Nigeria, meal delivery Lagos, pest control services, domestic help Lagos, house cleaning Nigeria, Q3 2025 launch, tech-enabled home services",
  alternates: {
    canonical: "https://metromellow.com/welcome",
  },
  openGraph: {
    title: "Metromellow: Professional Home Services Coming to Lagos in 2025",
    description:
      "Join our exclusive waitlist to be the first to experience premium cleaning, laundry, cooking & pest control services delivered to your doorstep in Lagos. Launch: Q3 2025.",
    url: "https://metromellow.com/welcome",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow - Professional Home Services Coming Soon to Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metromellow: Home Services Coming to Lagos Q3 2025",
    description:
      "Join our waitlist for first access to cleaning, laundry & cooking services throughout Lagos.",
    images: ["/images/brand/brand-logo/solid-bg/green-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function WelcomePage() {
  // Prepare structured data objects
  const comingSoonPageSchema = {
    "@type": "WebPage",
    name: "Metromellow - Coming Soon",
    description: "Premium home services coming soon to Lagos",
    url: "https://metromellow.com/welcome",
    isPartOf: {
      "@type": "WebSite",
      name: "Metromellow",
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

  // Define organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Metromellow",
    url: "https://metromellow.com",
    logo: "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
    description:
      "Metromellow provides premium home services including cleaning, laundry, cooking, and pest control throughout Lagos, Nigeria.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "team@metromellow.com",
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://www.facebook.com/metromellowhq",
      "https://www.instagram.com/metromellowhq",
      "https://x.com/metromellowhq",
      "https://www.youtube.com/@metromellowhq",
    ],
    foundingDate: "2023",
    founders: [
      {
        "@type": "Person",
        name: "Metromellow Founder", // Replace with actual founder name if public
      },
    ],
  };

  // Define event schema for the launch
  const launchEventSchema = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: "Metromellow Launch: Premium Home Services in Lagos",
    description:
      "Official launch of Metromellow professional home services in Lagos, bringing cleaning, laundry, cooking, and pest control services to doorsteps throughout the city.",
    startDate: "2025-07-01T00:00:00+01:00", // Approximate date based on Q3 2025 mentioned in FAQ
    endDate: "2025-07-01T23:59:59+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
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
      name: "Metromellow",
      url: "https://metromellow.com",
    },
    offers: {
      "@type": "Offer",
      name: "Early Access to Metromellow Services",
      description:
        "Join the waitlist for priority access and special discounts",
      price: "0",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
      url: "https://metromellow.com/welcome",
      validFrom: "2023-01-01",
      validThrough: "2025-07-01",
    },
    image:
      "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
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
            "Metromellow is bringing premium home services to Lagos, including cleaning, laundry, cooking, and pest control services.",
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(launchEventSchema) }}
      />

      <main
        className={styles.welcomePage}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* SEO-optimized heading that's visually hidden but available to search engines */}
        <h1 className={styles["visually-hidden"]}>
          Metromellow: Professional Home Services Coming to Lagos in 2025 -
          Cleaning, Laundry, Cooking, and Pest Control
        </h1>

        <section
          id="welcome-hero-lagos"
          aria-label="Premium Home Services Coming to Lagos"
          itemProp="mainContentOfPage"
        >
          <HeroSection />
        </section>

        <section
          id="home-service-problems"
          aria-label="Home Service Challenges in Lagos"
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta
            itemProp="headline"
            content="Home Service Challenges in Lagos"
          />
          <meta
            itemProp="description"
            content="Common problems faced by Lagos residents with current home services options."
          />
          <div itemProp="articleBody">
            <ProblemStatement />
          </div>
        </section>

        <section
          id="metro-mellow-solution"
          aria-label="Our Home Service Solution"
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta
            itemProp="headline"
            content="Metromellow's Solution to Home Service Problems in Lagos"
          />
          <meta
            itemProp="description"
            content="How Metromellow is transforming home services in Lagos with professional, tech-enabled solutions."
          />
          <div itemProp="articleBody">
            <SolutionOverview />
          </div>
        </section>

        <section
          id="join-waitlist-lagos"
          aria-label="Join Our Lagos Waitlist"
          itemScope
          itemType="https://schema.org/SignupAction"
        >
          <meta itemProp="name" content="Join Metromellow Waitlist" />
          <meta
            itemProp="description"
            content="Sign up for early access to Metromellow's home services in Lagos."
          />
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
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <meta
            itemProp="name"
            content="Frequently Asked Questions About Metromellow's Launch"
          />
          <FAQSection faqs={welcomeFaqs} />
        </section>

        {/* Structured content with keywords for SEO */}
        <div className={styles["visually-hidden"]}>
          <h2>Professional Home Services in Lagos</h2>
          <p>
            Metromellow is launching in Q3 2025, bringing professional home
            services to Lagos. Our services include professional cleaning
            services, laundry and dry cleaning, meal preparation and delivery,
            and effective pest control throughout Lagos State including areas
            such as Ikeja, Victoria Island, Lekki, and Surulere.
          </p>
          <h3>Premium Home Services Available in Lagos</h3>
          <ul>
            <li>House Cleaning Services Lagos</li>
            <li>Office Cleaning Services Lagos</li>
            <li>Laundry Services Lagos</li>
            <li>Dry Cleaning Lagos</li>
            <li>Meal Preparation Lagos</li>
            <li>Food Delivery Services Lagos</li>
            <li>Pest Control Services Lagos</li>
            <li>Domestic Help Lagos</li>
          </ul>
          <p>
            Join our waitlist today to be the first to experience Metromellow's
            premium home services in Lagos, Nigeria. Our platform combines
            technology with professional service delivery for a seamless
            experience.
          </p>
        </div>
      </main>
    </>
  );
}
