"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "../_components/header/DashboardHeader";
import styles from "./Help.module.scss";

// Mock data for FAQs
const faqCategories = [
  {
    id: "general",
    name: "General",
  },
  {
    id: "account",
    name: "Account & Billing",
  },
  {
    id: "services",
    name: "Services",
  },
  {
    id: "bookings",
    name: "Bookings",
  },
  {
    id: "technical",
    name: "Technical",
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I schedule a cleaning service?",
    answer:
      "You can schedule a cleaning service from your dashboard by clicking on 'Book Service', selecting 'Cleaning', and following the prompts to choose your preferred date, time, and specific requirements.",
    category: "bookings",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. You can manage your payment methods in the Billing section of your account settings.",
    category: "account",
  },
  {
    id: 3,
    question: "How can I cancel or reschedule a booking?",
    answer:
      "To cancel or reschedule a booking, go to your Bookings page, locate the appointment you want to modify, and click on 'Reschedule' or 'Cancel'. Please note that cancellations must be made at least 24 hours in advance to avoid cancellation fees.",
    category: "bookings",
  },
  {
    id: 4,
    question: "What is included in the standard cleaning service?",
    answer:
      "Our standard cleaning service includes dusting of all accessible surfaces, vacuuming all floors, mopping hard floors, bathroom cleaning (toilet, sink, shower/tub), kitchen cleaning (counters, sink, outside of appliances), and emptying trash bins. For a detailed list, please check the service description when booking.",
    category: "services",
  },
  {
    id: 5,
    question: "How do I create a subscription for regular services?",
    answer:
      "You can create a subscription by booking any service and selecting the 'Make Recurring' option. You'll be able to choose your preferred frequency (weekly, bi-weekly, or monthly) and manage your subscription through your account dashboard.",
    category: "services",
  },
  {
    id: 6,
    question: "What happens if I'm not satisfied with a service?",
    answer:
      "Your satisfaction is our priority. If you're not completely satisfied with a service, please contact our support team within 24 hours of service completion. We offer a happiness guarantee and will arrange for a re-cleaning free of charge.",
    category: "general",
  },
  {
    id: 7,
    question: "Are your cleaning products eco-friendly?",
    answer:
      "Yes, we primarily use eco-friendly and non-toxic cleaning products. If you have specific preferences or allergies, you can note this in your booking requirements or update your profile preferences.",
    category: "services",
  },
  {
    id: 8,
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address, and we'll send you instructions to create a new password. If you're already logged in, you can change your password in Account Settings.",
    category: "account",
  },
  {
    id: 9,
    question: "Can I specify which cleaning products to use in my home?",
    answer:
      "Absolutely! You can specify your preferences in your booking details or add them to your profile settings. Our staff will follow your preferences for all future bookings.",
    category: "services",
  },
  {
    id: 10,
    question: "Do I need to be home during the service?",
    answer:
      "You don't need to be home during the service, but we do need a way to access your home. You can provide entry instructions during the booking process, including lockbox codes, doorman information, or other access methods.",
    category: "general",
  },
  {
    id: 11,
    question: "The app is not working on my phone. What can I do?",
    answer:
      "First, ensure your app is updated to the latest version. Try restarting your phone and the app. If issues persist, clear the app cache through your phone settings. Still having trouble? Contact our technical support team for assistance.",
    category: "technical",
  },
  {
    id: 12,
    question: "How can I update my address or contact information?",
    answer:
      "You can update your address and contact information by going to your Account Settings and clicking on 'Edit Profile'. Make your changes and save them. Your updated information will be used for all future bookings.",
    category: "account",
  },
];

const supportChannels = [
  {
    id: "chat",
    name: "Live Chat",
    description: "Get immediate assistance from our support team",
    icon: "message-circle",
    availability: "Available Monday-Friday, 9am-6pm",
  },
  {
    id: "email",
    name: "Email Support",
    description: "Send us a detailed message about your issue",
    icon: "mail",
    availability: "Response within 24 hours",
  },
  {
    id: "phone",
    name: "Phone Support",
    description: "Speak directly with our customer service team",
    icon: "phone",
    availability: "Available Monday-Friday, 9am-5pm",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Message us on WhatsApp for quick responses",
    icon: "message-square",
    availability: "Available Monday-Saturday, 9am-8pm",
  },
];

const resourceCategories = [
  {
    id: "guides",
    name: "User Guides",
  },
  {
    id: "videos",
    name: "Tutorial Videos",
  },
  {
    id: "tips",
    name: "Cleaning Tips",
  },
];

const resources = [
  {
    id: 1,
    title: "Getting Started with Metro Mellow",
    description:
      "A complete guide to setting up your account and booking your first service",
    category: "guides",
    icon: "book-open",
    url: "#",
    isNew: true,
  },
  {
    id: 2,
    title: "Managing Your Subscriptions",
    description: "Learn how to set up, modify, and cancel recurring services",
    category: "guides",
    icon: "calendar",
    url: "#",
    isNew: false,
  },
  {
    id: 3,
    title: "Preparing Your Home for Cleaning",
    description: "Tips to maximize the effectiveness of your cleaning service",
    category: "tips",
    icon: "home",
    url: "#",
    isNew: false,
  },
  {
    id: 4,
    title: "How to Book a Service - Video Tutorial",
    description: "Step-by-step video guide to booking services on our platform",
    category: "videos",
    icon: "video",
    url: "#",
    isNew: true,
  },
  {
    id: 5,
    title: "Eco-Friendly Cleaning Products",
    description: "Guide to the environmentally friendly products we use",
    category: "tips",
    icon: "leaf",
    url: "#",
    isNew: false,
  },
  {
    id: 6,
    title: "Payment and Billing FAQ",
    description:
      "Comprehensive guide to understanding your invoices and payment options",
    category: "guides",
    icon: "credit-card",
    url: "#",
    isNew: false,
  },
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const faqVariants = {
  closed: { height: "auto" },
  open: { height: "auto" },
};

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [selectedResourceCategory, setSelectedResourceCategory] =
    useState("all");

  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Filter resources based on selected category
  const filteredResources = resources.filter((resource) => {
    return (
      selectedResourceCategory === "all" ||
      resource.category === selectedResourceCategory
    );
  });

  // Toggle FAQ open/closed state
  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className={styles.help}>
      <DashboardHeader />

      <div className={styles.help__container}>
        <motion.div
          className={styles.help__header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.help__title}>Help & Support</h1>
          <p className={styles.help__subtitle}>
            Find answers to common questions or contact our support team for
            assistance
          </p>
        </motion.div>

        <motion.div
          className={styles.help__searchSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.help__searchContainer}>
            <input
              type="text"
              placeholder="Search for help..."
              className={styles.help__searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className={styles.help__searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </motion.div>

        <div className={styles.help__sections}>
          <motion.section
            className={styles.help__faqSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.help__sectionHeader}>
              <h2 className={styles.help__sectionTitle}>
                Frequently Asked Questions
              </h2>
            </div>

            <div className={styles.help__categoryTabs}>
              <button
                className={`${styles.help__categoryTab} ${selectedCategory === "all" ? styles.help__categoryTabActive : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.help__categoryTab} ${selectedCategory === category.id ? styles.help__categoryTabActive : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <motion.div
              className={styles.help__faqList}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    className={`${styles.help__faqItem} ${openFaqId === faq.id ? styles.help__faqItemOpen : ""}`}
                    variants={itemVariants}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className={styles.help__faqQuestion}>
                      <h3>{faq.question}</h3>
                      <svg
                        className={styles.help__faqIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {openFaqId === faq.id ? (
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        ) : (
                          <>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </>
                        )}
                      </svg>
                    </div>
                    <AnimatePresence>
                      {openFaqId === faq.id && (
                        <motion.div
                          className={styles.help__faqAnswer}
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
                ))
              ) : (
                <motion.div
                  className={styles.help__noResults}
                  variants={itemVariants}
                >
                  <svg
                    className={styles.help__noResultsIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3>No results found</h3>
                  <p>
                    Try adjusting your search or browse through the categories
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.section>

          <motion.section
            className={styles.help__supportSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={styles.help__sectionHeader}>
              <h2 className={styles.help__sectionTitle}>Contact Support</h2>
            </div>

            <motion.div
              className={styles.help__supportChannels}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {supportChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  className={styles.help__supportChannel}
                  variants={itemVariants}
                >
                  <div className={styles.help__supportChannelIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {channel.icon === "message-circle" && (
                        <>
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </>
                      )}
                      {channel.icon === "mail" && (
                        <>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </>
                      )}
                      {channel.icon === "phone" && (
                        <>
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </>
                      )}
                      {channel.icon === "message-square" && (
                        <>
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </>
                      )}
                    </svg>
                  </div>
                  <div className={styles.help__supportChannelInfo}>
                    <h3 className={styles.help__supportChannelTitle}>
                      {channel.name}
                    </h3>
                    <p className={styles.help__supportChannelDescription}>
                      {channel.description}
                    </p>
                    <span className={styles.help__supportChannelAvailability}>
                      {channel.availability}
                    </span>
                  </div>
                  <button className={styles.help__supportChannelButton}>
                    Connect
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className={styles.help__resourcesSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className={styles.help__sectionHeader}>
              <h2 className={styles.help__sectionTitle}>Helpful Resources</h2>
            </div>

            <div className={styles.help__categoryTabs}>
              <button
                className={`${styles.help__categoryTab} ${selectedResourceCategory === "all" ? styles.help__categoryTabActive : ""}`}
                onClick={() => setSelectedResourceCategory("all")}
              >
                All Resources
              </button>
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.help__categoryTab} ${selectedResourceCategory === category.id ? styles.help__categoryTabActive : ""}`}
                  onClick={() => setSelectedResourceCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <motion.div
              className={styles.help__resourcesList}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredResources.map((resource) => (
                <motion.a
                  key={resource.id}
                  href={resource.url}
                  className={styles.help__resourceItem}
                  variants={itemVariants}
                >
                  <div className={styles.help__resourceIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {resource.icon === "book-open" && (
                        <>
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </>
                      )}
                      {resource.icon === "calendar" && (
                        <>
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </>
                      )}
                      {resource.icon === "home" && (
                        <>
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </>
                      )}
                      {resource.icon === "video" && (
                        <>
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="2.18"
                            ry="2.18"
                          ></rect>
                          <line x1="10" y1="8" x2="18" y2="14"></line>
                          <line x1="10" y1="14" x2="18" y2="8"></line>
                        </>
                      )}
                      {resource.icon === "leaf" && (
                        <>
                          <path d="M11 20c-1.667-2-3.333-6-3.333-10 0-3.667 2.667-6.667 6-6.667 3.333 0 6 3 6 6.667 0 4-1.667 8-3.333 10"></path>
                          <path d="M11 20c0-4.5 1.5-8.5 4-12"></path>
                        </>
                      )}
                      {resource.icon === "credit-card" && (
                        <>
                          <rect
                            x="1"
                            y="4"
                            width="22"
                            height="16"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </>
                      )}
                    </svg>
                  </div>
                  <div className={styles.help__resourceInfo}>
                    <div className={styles.help__resourceHeader}>
                      <h3 className={styles.help__resourceTitle}>
                        {resource.title}
                      </h3>
                      {resource.isNew && (
                        <span className={styles.help__resourceBadge}>New</span>
                      )}
                    </div>
                    <p className={styles.help__resourceDescription}>
                      {resource.description}
                    </p>
                  </div>
                  <svg
                    className={styles.help__resourceArrow}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
