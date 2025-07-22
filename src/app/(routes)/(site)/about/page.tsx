import { Metadata } from "next";
import AboutHero from "./_components/AboutHero/AboutHero";
import OurStory from "./_components/OurStory/OurStory";
import OurValues from "./_components/OurValues/OurValues";
import TeamSection from "./_components/TeamSection/TeamSection";
import Statistics from "./_components/Statistics/Statistics";
import AboutCTA from "./_components/AboutCTA/AboutCTA";
import StorySection from "./_components/StorySection/StorySection";
import VideoSection from "./_components/VideoSection/VideoSection";
import ImpactSection from "./_components/ImpactSection/ImpactSection";
import MagicHandsSection from "./_components/MagicHandsSection/MagicHandsSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import styles from "./About.module.scss";

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
  title: "About Metromellow | Our Story and Values",
  description:
    "Learn about Metromellow's mission to transform home services with quality, reliability, and exceptional customer care.",
};

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <StorySection />
      {/* <VideoSection /> */}
      <ImpactSection />
      <MagicHandsSection />
      <FAQSection faqs={aboutFaqs} />
      {/* <AboutHero />
      <OurStory />
      <OurValues />
      <TeamSection />
      <Statistics />
      <AboutCTA /> */}
    </main>
  );
}
