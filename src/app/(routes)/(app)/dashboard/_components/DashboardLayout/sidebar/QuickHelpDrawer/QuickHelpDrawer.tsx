// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/QuickHelpDrawer/QuickHelpDrawer.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  BookOpen,
  Video,
  FileText,
  Clock,
  ChevronDown,
  Zap,
  Shield,
  CreditCard,
  Calendar,
  Users,
  Settings,
  ExternalLink,
} from "lucide-react";
import styles from "./QuickHelpDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";
import { ContactDetails } from "@/constants/config";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Help categories
  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Zap />,
      color: "#10b981",
      articles: [
        "How to create an account",
        "Setting up your profile",
        "Adding your first address",
        "Understanding our services",
      ],
    },
    {
      id: "bookings",
      title: "Bookings & Services",
      icon: <Calendar />,
      color: "#075056",
      articles: [
        "How to book a service",
        "Rescheduling appointments",
        "Cancellation policy",
        "Service areas covered",
      ],
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: <CreditCard />,
      color: "#6366f1",
      articles: [
        "Payment methods",
        "Understanding invoices",
        "Refund policy",
        "Subscription billing",
      ],
    },
    {
      id: "account",
      title: "Account & Settings",
      icon: <Settings />,
      color: "#fe5b04",
      articles: [
        "Managing your profile",
        "Password reset",
        "Notification preferences",
        "Privacy settings",
      ],
    },
  ];

  // FAQs
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How far in advance can I book a service?",
      answer:
        "You can book services up to 60 days in advance. For same-day bookings, please book at least 4 hours before your preferred time slot.",
      category: "bookings",
    },
    {
      id: "2",
      question: "What is your cancellation policy?",
      answer:
        "You can cancel or reschedule your service free of charge up to 24 hours before the scheduled time. Cancellations within 24 hours may incur a fee.",
      category: "bookings",
    },
    {
      id: "3",
      question: "Which payment methods do you accept?",
      answer:
        "We accept all major credit and debit cards, bank transfers, and mobile money payments. You can manage your payment methods in your account settings.",
      category: "payments",
    },
    {
      id: "4",
      question: "How does the subscription service work?",
      answer:
        "Subscriptions allow you to schedule recurring services at discounted rates. Choose your services, set your frequency, and enjoy automatic scheduling with up to 30% savings.",
      category: "subscriptions",
    },
    // {
    //   id: "5",
    //   question: "What if I'm not satisfied with the service?",
    //   answer:
    //     "Your satisfaction is our priority. If you're not happy with a service, contact us within 24 hours and we'll either re-do the service at no cost or provide a full refund.",
    //   category: "quality",
    // },
    {
      id: "5",
      question: "Are your service providers background checked?",
      answer:
        "Yes, all our service providers undergo thorough background checks, skill assessments, and regular training to ensure quality and safety.",
      category: "safety",
    },
  ];

  // Filter FAQs based on search
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const currentCategory = helpCategories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
      addContentPadding={false}
    >
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.header__top}>
            <button className={styles.header__closeBtn} onClick={onClose}>
              <ArrowLeft size={18} />
            </button>
          </div>
          <div className={styles.header__content}>
            <div className={styles.header__iconWrapper}>
              <HelpCircle size={28} />
            </div>
            <h2 className={styles.header__title}>How can we help?</h2>
            <p className={styles.header__subtitle}>
              Search our guides or browse topics below
            </p>
          </div>
        </div>

        {/* Search */}
        <div className={styles.drawer__search}>
          <Search className={styles.drawer__searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.drawer__searchInput}
          />
        </div>

        {/* Content */}
        <div className={styles.drawer__content}>
          {/* Category Articles View */}
          {selectedCategory && currentCategory && !searchQuery && (
            <div className={styles.drawer__section}>
              <button
                className={styles.drawer__backToCategories}
                onClick={handleBackToCategories}
              >
                <ArrowLeft size={16} />
                Back to topics
              </button>
              <div className={styles.drawer__categoryHeader}>
                <div
                  className={styles.drawer__categoryIconLarge}
                  style={{ backgroundColor: `${currentCategory.color}15` }}
                >
                  <span style={{ color: currentCategory.color }}>
                    {currentCategory.icon}
                  </span>
                </div>
                <h3 className={styles.drawer__categoryTitleLarge}>
                  {currentCategory.title}
                </h3>
              </div>
              <div className={styles.drawer__articles}>
                {currentCategory.articles.map((article, index) => (
                  <motion.button
                    key={index}
                    className={styles.drawer__articleItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FileText size={16} />
                    <span>{article}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Links */}
          {!searchQuery && !selectedCategory && (
            <div className={styles.drawer__section}>
              <h3 className={styles.drawer__sectionTitle}>Browse Topics</h3>
              <div className={styles.drawer__categories}>
                {helpCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    className={styles.drawer__categoryCard}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div
                      className={styles.drawer__categoryIcon}
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <span style={{ color: category.color }}>
                        {category.icon}
                      </span>
                    </div>
                    <div className={styles.drawer__categoryInfo}>
                      <h4 className={styles.drawer__categoryTitle}>
                        {category.title}
                      </h4>
                      <span className={styles.drawer__categoryCount}>
                        {category.articles.length} articles
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {!selectedCategory && (
            <div className={styles.drawer__section}>
              <h3 className={styles.drawer__sectionTitle}>
                Frequently Asked Questions
              </h3>
              <div className={styles.drawer__faqs}>
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className={styles.drawer__faqItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      className={styles.drawer__faqQuestion}
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <HelpCircle
                        size={18}
                        className={styles.drawer__faqIcon}
                      />
                      <span>{faq.question}</span>
                      <motion.div
                        className={styles.drawer__faqArrow}
                        animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          className={styles.drawer__faqAnswer}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Support */}
          <div className={styles.drawer__support}>
            <div className={styles.drawer__supportCard}>
              <div className={styles.drawer__supportHeader}>
                <MessageSquare className={styles.drawer__supportIcon} />
                <div>
                  <h3 className={styles.drawer__supportTitle}>
                    Need more help?
                  </h3>
                  <p className={styles.drawer__supportDesc}>
                    Our support team is available 24/7
                  </p>
                </div>
              </div>

              <div className={styles.drawer__supportOptions}>
                <button
                  className={styles.drawer__supportOption}
                  onClick={onContactSupport}
                >
                  <div className={styles.drawer__supportOptionIcon}>
                    <MessageSquare size={20} />
                  </div>
                  <div className={styles.drawer__supportOptionInfo}>
                    <span className={styles.drawer__supportOptionTitle}>
                      Live Chat (coming soon)
                    </span>
                    <span className={styles.drawer__supportOptionDesc}>
                      Chat with our team
                    </span>
                  </div>
                  <ExternalLink size={16} />
                </button>

                <button
                  className={styles.drawer__supportOption}
                  onClick={onContactSupport}
                >
                  <div className={styles.drawer__supportOptionIcon}>
                    <Phone size={20} />
                  </div>
                  <div className={styles.drawer__supportOptionInfo}>
                    <span className={styles.drawer__supportOptionTitle}>
                      Call Us
                    </span>
                    <span className={styles.drawer__supportOptionDesc}>
                      {ContactDetails.PHONE}
                    </span>
                  </div>
                  <ExternalLink size={16} />
                </button>

                <button
                  className={styles.drawer__supportOption}
                  onClick={onContactSupport}
                >
                  <div className={styles.drawer__supportOptionIcon}>
                    <Mail size={20} />
                  </div>
                  <div className={styles.drawer__supportOptionInfo}>
                    <span className={styles.drawer__supportOptionTitle}>
                      Email
                    </span>
                    <span className={styles.drawer__supportOptionDesc}>
                      {ContactDetails.EMAIL}
                    </span>
                  </div>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default QuickHelpDrawer;
