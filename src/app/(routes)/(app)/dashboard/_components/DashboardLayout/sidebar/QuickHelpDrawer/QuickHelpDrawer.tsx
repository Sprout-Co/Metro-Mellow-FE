// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/QuickHelpDrawer/QuickHelpDrawer.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  CreditCard,
  Calendar,
  Users,
} from "lucide-react";
import styles from "./QuickHelpDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input";

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Tutorial {
  id: string;
  title: string;
  duration: string;
  type: "video" | "article";
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface QuickHelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onContactSupport?: () => void;
}

const QuickHelpDrawer: React.FC<QuickHelpDrawerProps> = ({
  isOpen,
  onClose,
  onContactSupport,
}) => {
  const [activeTab, setActiveTab] = useState<"topics" | "faqs" | "tutorials">(
    "topics"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Mock help topics
  const helpTopics: HelpTopic[] = [
    {
      id: "booking",
      title: "Booking Services",
      description: "How to book, reschedule, and cancel services",
      icon: <Calendar />,
      articles: 12,
    },
    {
      id: "subscriptions",
      title: "Subscriptions",
      description: "Managing your recurring service plans",
      icon: <Settings />,
      articles: 8,
    },
    {
      id: "payments",
      title: "Payments & Billing",
      description: "Payment methods, invoices, and refunds",
      icon: <CreditCard />,
      articles: 15,
    },
    {
      id: "providers",
      title: "Service Providers",
      description: "Working with our service professionals",
      icon: <Users />,
      articles: 6,
    },
  ];

  // Mock FAQs
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I book a service?",
      answer:
        "To book a service, navigate to the 'Book Service' section from your dashboard. Select your desired service type, choose a date and time, and complete the booking form. You'll receive a confirmation email once your booking is confirmed.",
      category: "booking",
    },
    {
      id: "2",
      question: "Can I reschedule my service?",
      answer:
        "Yes, you can reschedule your service up to 24 hours before the scheduled time. Go to 'My Bookings', select the service you want to reschedule, and click on 'Reschedule'. Choose a new date and time that works for you.",
      category: "booking",
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, bank transfers, and mobile money. You can manage your payment methods in the 'Payment Methods' section of your account settings.",
      category: "payments",
    },
    {
      id: "4",
      question: "How do subscriptions work?",
      answer:
        "Subscriptions allow you to schedule recurring services at discounted rates. Choose your services, set your preferred frequency (weekly, bi-weekly, or monthly), and enjoy automatic scheduling and billing. You can pause or cancel anytime.",
      category: "subscriptions",
    },
    {
      id: "5",
      question: "What if I'm not satisfied with the service?",
      answer:
        "Your satisfaction is our priority. If you're not happy with a service, please contact us within 24 hours. We'll either arrange a re-service at no extra cost or provide a refund according to our satisfaction guarantee policy.",
      category: "quality",
    },
  ];

  // Mock tutorials
  const tutorials: Tutorial[] = [
    {
      id: "1",
      title: "Getting Started with Metro Mellow",
      duration: "5 min",
      type: "video",
      difficulty: "beginner",
    },
    {
      id: "2",
      title: "How to Set Up a Subscription",
      duration: "3 min",
      type: "video",
      difficulty: "beginner",
    },
    {
      id: "3",
      title: "Managing Multiple Properties",
      duration: "10 min read",
      type: "article",
      difficulty: "intermediate",
    },
    {
      id: "4",
      title: "Advanced Scheduling Tips",
      duration: "7 min read",
      type: "article",
      difficulty: "advanced",
    },
  ];

  // Filter content based on search
  const filteredTopics = helpTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTutorials = tutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getDifficultyColor = (difficulty: Tutorial["difficulty"]) => {
    const colors = {
      beginner: "#10b981",
      intermediate: "#f59e0b",
      advanced: "#ef4444",
    };
    return colors[difficulty];
  };

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="md">
      <div className={styles.helpDrawer}>
        {/* Header */}
        <div className={styles.helpDrawer__header}>
          <h2 className={styles.helpDrawer__title}>Help Center</h2>
          <p className={styles.helpDrawer__subtitle}>
            Find answers and get support
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.helpDrawer__search}>
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Tabs */}
        <div className={styles.helpDrawer__tabs}>
          <button
            className={`${styles.helpDrawer__tab} ${
              activeTab === "topics" ? styles["helpDrawer__tab--active"] : ""
            }`}
            onClick={() => setActiveTab("topics")}
          >
            <BookOpen size={16} />
            Topics
          </button>
          <button
            className={`${styles.helpDrawer__tab} ${
              activeTab === "faqs" ? styles["helpDrawer__tab--active"] : ""
            }`}
            onClick={() => setActiveTab("faqs")}
          >
            <HelpCircle size={16} />
            FAQs
          </button>
          <button
            className={`${styles.helpDrawer__tab} ${
              activeTab === "tutorials" ? styles["helpDrawer__tab--active"] : ""
            }`}
            onClick={() => setActiveTab("tutorials")}
          >
            <Video size={16} />
            Tutorials
          </button>
        </div>

        {/* Content */}
        <div className={styles.helpDrawer__content}>
          <AnimatePresence mode="wait">
            {/* Help Topics */}
            {activeTab === "topics" && (
              <motion.div
                key="topics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.helpDrawer__topics}
              >
                {filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    className={styles.helpDrawer__topicCard}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.helpDrawer__topicIcon}>
                      {topic.icon}
                    </div>
                    <div className={styles.helpDrawer__topicInfo}>
                      <h3 className={styles.helpDrawer__topicTitle}>
                        {topic.title}
                      </h3>
                      <p className={styles.helpDrawer__topicDesc}>
                        {topic.description}
                      </p>
                      <span className={styles.helpDrawer__topicArticles}>
                        {topic.articles} articles
                      </span>
                    </div>
                    <ChevronRight className={styles.helpDrawer__topicArrow} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* FAQs */}
            {activeTab === "faqs" && (
              <motion.div
                key="faqs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.helpDrawer__faqs}
              >
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className={styles.helpDrawer__faqItem}>
                    <motion.button
                      className={styles.helpDrawer__faqQuestion}
                      onClick={() => toggleFAQ(faq.id)}
                      whileHover={{ x: 2 }}
                    >
                      <HelpCircle
                        size={18}
                        className={styles.helpDrawer__faqIcon}
                      />
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: expandedFAQ === faq.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          className={styles.helpDrawer__faqAnswer}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tutorials */}
            {activeTab === "tutorials" && (
              <motion.div
                key="tutorials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.helpDrawer__tutorials}
              >
                {filteredTutorials.map((tutorial) => (
                  <motion.div
                    key={tutorial.id}
                    className={styles.helpDrawer__tutorialCard}
                    whileHover={{ x: 4 }}
                  >
                    <div className={styles.helpDrawer__tutorialIcon}>
                      {tutorial.type === "video" ? (
                        <Video size={20} />
                      ) : (
                        <FileText size={20} />
                      )}
                    </div>
                    <div className={styles.helpDrawer__tutorialInfo}>
                      <h4 className={styles.helpDrawer__tutorialTitle}>
                        {tutorial.title}
                      </h4>
                      <div className={styles.helpDrawer__tutorialMeta}>
                        <span className={styles.helpDrawer__tutorialDuration}>
                          <Clock size={12} />
                          {tutorial.duration}
                        </span>
                        <span
                          className={styles.helpDrawer__tutorialDifficulty}
                          style={{
                            color: getDifficultyColor(tutorial.difficulty),
                          }}
                        >
                          {tutorial.difficulty}
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className={styles.helpDrawer__tutorialLink}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Support Section */}
        <div className={styles.helpDrawer__support}>
          <div className={styles.helpDrawer__supportCard}>
            <MessageSquare className={styles.helpDrawer__supportIcon} />
            <div className={styles.helpDrawer__supportInfo}>
              <h3 className={styles.helpDrawer__supportTitle}>
                Still need help?
              </h3>
              <p className={styles.helpDrawer__supportDesc}>
                Our support team is available 24/7 to assist you
              </p>
            </div>
          </div>
          <div className={styles.helpDrawer__supportActions}>
            <FnButton
              variant="secondary"
              size="sm"
              onClick={() => {
                if (onContactSupport) onContactSupport();
              }}
            >
              <Phone size={16} />
              Call Support
            </FnButton>
            <FnButton
              variant="primary"
              size="sm"
              onClick={() => {
                if (onContactSupport) onContactSupport();
              }}
            >
              <MessageSquare size={16} />
              Start Chat
            </FnButton>
          </div>
          <div className={styles.helpDrawer__supportContact}>
            <a href="mailto:support@metromellow.com">
              <Mail size={14} />
              support@metromellow.com
            </a>
            <span>•</span>
            <a href="tel:+2348012345678">
              <Phone size={14} />
              +234 801 234 5678
            </a>
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default QuickHelpDrawer;
