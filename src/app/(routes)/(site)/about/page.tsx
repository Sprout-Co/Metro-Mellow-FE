import { Metadata } from "next";
import StorySection from "./_components/StorySection/StorySection";
import VideoSection from "./_components/VideoSection/VideoSection";
import ImpactSection from "./_components/ImpactSection/ImpactSection";
import MagicHandsSection from "./_components/MagicHandsSection/MagicHandsSection";
// import TeamCards from "./_components/TeamCards/TeamCards";
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
    question: "How do you ensure the safety of my family and home in Lagos?",
    answer:
      "Every professional undergoes comprehensive background checks, reference verification, and identity verification. We also provide insurance coverage and maintain detailed records of all service providers. Our professionals are trained in safety protocols and we conduct regular quality assessments to ensure your family's security.",
  },
  {
    id: "q2",
    question: "Do you serve all areas of Lagos including mainland and island?",
    answer:
      "Yes! We currently serve 25+ neighborhoods across Lagos including Victoria Island, Ikoyi, Lekki, Surulere, Yaba, Gbagada, and mainland areas. Our coverage is expanding monthly. Check our service area map or contact us to confirm availability in your specific location.",
  },
  {
    id: "q3",
    question: "Can I book services for my elderly parents who live in Lagos?",
    answer:
      "Absolutely! Many of our customers book services for their parents. We understand the cultural importance of caring for elderly family members. Our professionals are trained to work respectfully with elderly clients, and we can coordinate directly with your parents while keeping you updated on service delivery.",
  },
  {
    id: "q4",
    question: "How do you handle traditional Nigerian meals and cooking preferences?",
    answer:
      "Our chefs are trained in both traditional Nigerian cuisine and international dishes. We can prepare jollof rice, egusi soup, pounded yam, and other local favorites just like your grandmother would make. We also accommodate dietary restrictions and cultural preferences for halal, vegetarian, or other specific requirements.",
  },
  {
    id: "q5",
    question: "What happens during Lagos traffic or power outages?",
    answer:
      "We factor Lagos traffic into our scheduling and provide real-time updates if there are delays. For power outages, our professionals come equipped with backup solutions and can work around electricity challenges. We also offer flexible rescheduling if weather or infrastructure issues affect service delivery.",
  },
  {
    id: "q6",
    question: "How do you ensure quality service that meets Lagos standards?",
    answer:
      "We understand Lagos residents have high standards for home services. Our professionals undergo rigorous training, quality assessments, and customer feedback reviews. We maintain a 4.8+ star rating and offer satisfaction guarantees. If any service doesn't meet your expectations, we'll return to fix it at no additional cost.",
  },
];

export const metadata: Metadata = {
  title: "About Metromellow | Trusted Home Services Company in Lagos | Our Story",
  description:
    "Learn about Metromellow's mission to transform home services in Lagos. Meet our professional team, discover our story, and see how we're helping 1,000+ Lagos families reclaim their time.",
  keywords:
    "about Metromellow, home services company Lagos, professional cleaning team Lagos, trusted domestic help Lagos, Lagos service professionals, Metromellow team, company story Lagos",
  alternates: {
    canonical: "https://metromellow.com/about",
  },
  openGraph: {
    title: "About Metromellow | Trusted Home Services Company in Lagos",
    description:
      "Discover our story, meet our professional team, and learn how we're transforming home services for 1,000+ Lagos families with quality, reliability & exceptional care.",
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

        {/* <section id="our-team" aria-label="Our Professional Team">
          <MagicHandsSection />
        </section> */}

        {/* <section id="leadership-team" aria-label="Meet Our Leadership Team">
          <TeamCards />
        </section> */}

        <section id="about-faqs" aria-label="Frequently Asked Questions">
          <FAQSection faqs={aboutFaqs} />
        </section>
      </main>
    </>
  );
}
