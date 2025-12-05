"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Search,
  ChevronDown,
  Clock,
  Send,
  Zap,
  Calendar,
  CreditCard,
  User,
  Home,
  ExternalLink,
  Plus,
  FileText,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";
import styles from "./SupportMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { ContactDetails } from "@/constants/config";

type TabType = "help" | "tickets" | "contact";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  created: Date;
  messages: number;
}

const SupportMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tabs = [
    { id: "help" as const, label: "Help Center", icon: HelpCircle },
    { id: "tickets" as const, label: "My Tickets", icon: MessageSquare },
    { id: "contact" as const, label: "Contact", icon: Phone },
  ];

  const categories = [
    { id: "all", label: "All", icon: HelpCircle },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "account", label: "Account", icon: User },
    { id: "services", label: "Services", icon: Home },
  ];

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "How do I book a service?",
      answer:
        "Navigate to 'Book Service' in your dashboard, select your service type, choose your preferred date and time, and complete the booking. You'll receive a confirmation email.",
      category: "bookings",
    },
    {
      id: "2",
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can modify bookings up to 24 hours before the scheduled time. Go to 'My Bookings', find your booking, and click 'Reschedule' or 'Cancel'.",
      category: "bookings",
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards (Visa, Mastercard, Verve), bank transfers, and mobile money. Save your preferred method in account settings.",
      category: "payments",
    },
    {
      id: "4",
      question: "How do subscriptions work?",
      answer:
        "Subscriptions let you schedule recurring services at discounted rates. Choose your frequency, set preferred times, and enjoy automatic scheduling with up to 30% savings.",
      category: "subscriptions",
    },
    {
      id: "5",
      question: "How do I add multiple addresses?",
      answer:
        "Go to Settings > Address Book and click 'Add New Address'. You can set a default and choose different addresses when booking.",
      category: "account",
    },
    {
      id: "6",
      question: "What areas do you serve?",
      answer:
        "We serve Lagos mainland and island areas including Victoria Island, Lekki, Ikoyi, Ajah, Surulere, Yaba, and surrounding areas.",
      category: "services",
    },
  ];

  const mockTickets: Ticket[] = [
    // {
    //   id: "T-001",
    //   subject: "Issue with cleaning service quality",
    //   status: "in_progress",
    //   priority: "high",
    //   created: new Date(2024, 7, 15),
    //   messages: 3,
    // },
    // {
    //   id: "T-002",
    //   subject: "Payment not processed",
    //   status: "resolved",
    //   priority: "medium",
    //   created: new Date(2024, 7, 10),
    //   messages: 5,
    // },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusInfo = (status: Ticket["status"]) => {
    const info = {
      open: { label: "Open", color: "#f59e0b" },
      in_progress: { label: "In Progress", color: "#3b82f6" },
      resolved: { label: "Resolved", color: "#10b981" },
      closed: { label: "Closed", color: "#6b7280" },
    };
    return info[status];
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.header__text}>
          <h1 className={styles.header__title}>Support</h1>
          <p className={styles.header__subtitle}>How can we help you today?</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tabs__item} ${activeTab === tab.id ? styles["tabs__item--active"] : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "help" && (
          <motion.div
            key="help"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles.content}
          >
            {/* Search */}
            <div className={styles.search}>
              <Search size={18} className={styles.search__icon} />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.search__input}
              />
              {searchQuery && (
                <button
                  className={styles.search__clear}
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className={styles.categories}>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`${styles.categories__item} ${selectedCategory === cat.id ? styles["categories__item--active"] : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <Icon size={16} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FAQ List */}
            <div className={styles.faq}>
              <h3 className={styles.faq__title}>Frequently Asked Questions</h3>
              <div className={styles.faq__list}>
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className={styles.faq__item}>
                    <button
                      className={styles.faq__question}
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                      }
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          className={styles.faq__answer}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <p>{faq.answer}</p>
                          <div className={styles.faq__feedback}>
                            <span>Helpful?</span>
                            <button>
                              <ThumbsUp size={14} />
                            </button>
                            <button>
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <p>Can't find what you're looking for?</p>
              <FnButton
                variant="primary"
                size="sm"
                onClick={() => setActiveTab("contact")}
              >
                <MessageSquare size={16} />
                Contact Us
              </FnButton>
            </div>
          </motion.div>
        )}

        {activeTab === "tickets" && (
          <motion.div
            key="tickets"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles.content}
          >
            <div className={styles.tickets__header}>
              <h3 className={styles.tickets__title}>Your Tickets</h3>
              <FnButton variant="primary" size="sm">
                <Plus size={16} />
                New Ticket
              </FnButton>
            </div>

            {mockTickets.length > 0 ? (
              <div className={styles.tickets__list}>
                {mockTickets.map((ticket) => {
                  const status = getStatusInfo(ticket.status);
                  return (
                    <div key={ticket.id} className={styles.ticket}>
                      <div className={styles.ticket__icon}>
                        <FileText size={20} />
                      </div>
                      <div className={styles.ticket__content}>
                        <div className={styles.ticket__header}>
                          <span className={styles.ticket__subject}>
                            {ticket.subject}
                          </span>
                          <span
                            className={styles.ticket__status}
                            style={{
                              backgroundColor: `${status.color}15`,
                              color: status.color,
                            }}
                          >
                            {status.label}
                          </span>
                        </div>
                        <div className={styles.ticket__meta}>
                          <span>#{ticket.id}</span>
                          <span>·</span>
                          <span>{ticket.created.toLocaleDateString()}</span>
                          <span>·</span>
                          <span>{ticket.messages} messages</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.empty}>
                <div className={styles.empty__icon}>
                  <MessageSquare size={32} />
                </div>
                <h3 className={styles.empty__title}>No tickets yet</h3>
                <p className={styles.empty__text}>
                  When you submit a ticket, it will appear here
                </p>
                <FnButton variant="primary" size="sm">
                  <Plus size={16} />
                  Create Ticket
                </FnButton>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles.content}
          >
            {/* Contact Cards */}
            <div className={styles.contact}>
              <a
                href={`tel:${ContactDetails.PHONE}`}
                className={styles.contact__card}
              >
                <div className={styles.contact__icon}>
                  <Phone size={20} />
                </div>
                <div className={styles.contact__info}>
                  <h4>Phone</h4>
                  <p>{ContactDetails.PHONE}</p>
                </div>
                <ExternalLink size={16} className={styles.contact__arrow} />
              </a>

              <a
                href={`mailto:${ContactDetails.EMAIL}`}
                className={styles.contact__card}
              >
                <div className={styles.contact__icon}>
                  <Mail size={20} />
                </div>
                <div className={styles.contact__info}>
                  <h4>Email</h4>
                  <p>{ContactDetails.EMAIL}</p>
                </div>
                <ExternalLink size={16} className={styles.contact__arrow} />
              </a>

              <div className={styles.contact__card}>
                <div className={styles.contact__icon}>
                  <MessageSquare size={20} />
                </div>
                <div className={styles.contact__info}>
                  <h4>Live Chat</h4>
                  <p>Coming soon</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className={styles.hours}>
              <h3 className={styles.hours__title}>
                <Clock size={18} />
                Support Hours
              </h3>
              <div className={styles.hours__list}>
                <div className={styles.hours__item}>
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className={styles.hours__item}>
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className={styles.hours__item}>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.form}>
              <h3 className={styles.form__title}>Send a Message</h3>
              <div className={styles.form__row}>
                <div className={styles.form__field}>
                  <label>Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div className={styles.form__field}>
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className={styles.form__field}>
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" />
              </div>
              <div className={styles.form__field}>
                <label>Message</label>
                <textarea rows={4} placeholder="Tell us more..." />
              </div>
              <FnButton variant="primary" size="md">
                <Send size={16} />
                Send Message
              </FnButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportMain;
