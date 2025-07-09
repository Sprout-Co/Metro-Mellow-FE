import { Metadata } from "next";
import HeroSection from "./_components/HeroSection/HeroSection";
import ProblemStatement from "./_components/ProblemStatement/ProblemStatement";
import SolutionOverview from "./_components/SolutionOverview/SolutionOverview";
import WaitlistSection from "./_components/WaitlistSection/WaitlistSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import styles from "./Welcome.module.scss";

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
  title: "Welcome to Metromellow | Coming Soon",
  description:
    "Metromellow is coming soon! Join our waitlist to be the first to experience premium home services delivered to your doorstep in Nigeria.",
};

export default function WelcomePage() {
  return (
    <main className={styles.welcomePage}>
      <HeroSection />
      <ProblemStatement />
      <SolutionOverview />
      <WaitlistSection />
      <FAQSection faqs={welcomeFaqs} />
    </main>
  );
}
