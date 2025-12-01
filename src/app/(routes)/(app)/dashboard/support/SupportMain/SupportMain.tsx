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
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Paperclip,
  FileText,
  Book,
  Users,
  Settings,
  CreditCard,
  Shield,
  Zap,
  Home,
  Calendar,
  Star,
  ThumbsUp,
  ThumbsDown,
  User,
  X,
} from "lucide-react";
import styles from "./SupportMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import DashboardHeader from "../../_components/DashboardHeader/DashboardHeader";

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
  lastUpdate: Date;
  messages: number;
}

const SupportMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const tabs = [
    { id: "help" as const, label: "Help Center", icon: HelpCircle },
    { id: "tickets" as const, label: "My Tickets", icon: MessageSquare },
    { id: "contact" as const, label: "Contact Us", icon: Phone },
  ];

  const categories = [
    { id: "all", label: "All Topics", icon: Book },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "account", label: "Account", icon: User },
    { id: "services", label: "Services", icon: Home },
    { id: "subscriptions", label: "Subscriptions", icon: Users },
  ];

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "How do I book a service?",
      answer:
        "To book a service, navigate to the 'Book Service' section in your dashboard. Select the service type you need, choose your preferred date and time, and complete the booking process. You'll receive a confirmation email once your booking is confirmed.",
      category: "bookings",
    },
    {
      id: "2",
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled service time. Go to 'My Bookings' in your dashboard, find the booking you want to modify, and click on 'Reschedule' or 'Cancel'. Please note that cancellations made less than 24 hours in advance may incur a fee.",
      category: "bookings",
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards (Visa, Mastercard, Verve), bank transfers, and mobile money. You can save your preferred payment method in your account settings for faster checkout.",
      category: "payments",
    },
    {
      id: "4",
      question: "How do subscriptions work?",
      answer:
        "Subscriptions allow you to schedule recurring services at discounted rates. Choose your service frequency (weekly, bi-weekly, or monthly), select your preferred days and times, and enjoy automatic scheduling. You can pause or cancel your subscription anytime from your dashboard.",
      category: "subscriptions",
    },
    {
      id: "5",
      question: "How do I add multiple addresses?",
      answer:
        "You can add multiple service addresses in your account settings. Go to Settings > Address Book and click 'Add New Address'. You can set a default address and choose different addresses when booking services.",
      category: "account",
    },
    {
      id: "6",
      question: "What areas do you serve?",
      answer:
        "We currently serve Lagos mainland and island areas including Victoria Island, Lekki, Ikoyi, Ajah, Surulere, Yaba, and surrounding areas. Check our service area map when booking to confirm coverage for your location.",
      category: "services",
    },
  ];

  const mockTickets: Ticket[] = [
    {
      id: "T-001",
      subject: "Issue with cleaning service quality",
      status: "in_progress",
      priority: "high",
      created: new Date(2024, 7, 15),
      lastUpdate: new Date(2024, 7, 17),
      messages: 3,
    },
    {
      id: "T-002",
      subject: "Payment not processed",
      status: "resolved",
      priority: "medium",
      created: new Date(2024, 7, 10),
      lastUpdate: new Date(2024, 7, 11),
      messages: 5,
    },
    {
      id: "T-003",
      subject: "Request for service provider change",
      status: "open",
      priority: "low",
      created: new Date(2024, 7, 18),
      lastUpdate: new Date(2024, 7, 18),
      messages: 1,
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: Ticket["status"]) => {
    const colors = {
      open: "#f2994a",
      in_progress: "#2293fb",
      resolved: "#059669",
      closed: "#6b7280",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    const colors = {
      low: "#059669",
      medium: "#f2994a",
      high: "#fb2222",
    };
    return colors[priority];
  };

  // Help Center Content
  const HelpCenterContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.support__helpCenter}
    >
      {/* Search Bar */}
      <div className={styles.support__searchSection}>
        <div className={styles.support__searchContainer}>
          <Search className={styles.support__searchIcon} />
          <input
            type="text"
            placeholder="Search for help..."
            className={styles.support__searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className={styles.support__quickLinks}>
        <h3 className={styles.support__sectionTitle}>Quick Help</h3>
        <div className={styles.support__quickLinksGrid}>
          {categories.slice(1).map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`${styles.support__quickLink} ${
                  selectedCategory === category.id
                    ? styles["support__quickLink--active"]
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={24} />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={styles.support__faqSection}>
        <h3 className={styles.support__sectionTitle}>
          Frequently Asked Questions
        </h3>
        <div className={styles.support__faqList}>
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              className={styles.support__faqItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                className={styles.support__faqQuestion}
                onClick={() =>
                  setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                }
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedFAQ === faq.id && (
                  <motion.div
                    className={styles.support__faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                    <div className={styles.support__faqFeedback}>
                      <span>Was this helpful?</span>
                      <div className={styles.support__faqFeedbackButtons}>
                        <button>
                          <ThumbsUp size={16} />
                        </button>
                        <button>
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className={styles.support__stillNeedHelp}>
        <h3>Still need help?</h3>
        <p>Our support team is here to assist you</p>
        <div className={styles.support__stillNeedHelpActions}>
          <FnButton variant="primary" onClick={() => setActiveTab("tickets")}>
            <MessageSquare size={18} />
            Submit a Ticket
          </FnButton>
          <FnButton variant="ghost" onClick={() => setActiveTab("contact")}>
            <Phone size={18} />
            Contact Support
          </FnButton>
        </div>
      </div>
    </motion.div>
  );

  // Tickets Content
  const TicketsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.support__tickets}
    >
      <div className={styles.support__ticketsHeader}>
        <h3 className={styles.support__sectionTitle}>Support Tickets</h3>
        <FnButton
          variant="primary"
          size="sm"
          onClick={() => setIsNewTicketModalOpen(true)}
        >
          <MessageSquare size={18} />
          New Ticket
        </FnButton>
      </div>

      <div className={styles.support__ticketsList}>
        {mockTickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            className={styles.support__ticketCard}
            onClick={() => setSelectedTicket(ticket)}
            whileHover={{ y: -2 }}
          >
            <div className={styles.support__ticketHeader}>
              <div className={styles.support__ticketInfo}>
                <h4 className={styles.support__ticketSubject}>
                  {ticket.subject}
                </h4>
                <p className={styles.support__ticketId}>Ticket #{ticket.id}</p>
              </div>
              <div className={styles.support__ticketMeta}>
                <span
                  className={styles.support__ticketStatus}
                  style={{
                    backgroundColor: `${getStatusColor(ticket.status)}15`,
                    color: getStatusColor(ticket.status),
                  }}
                >
                  {ticket.status.replace("_", " ")}
                </span>
                <span
                  className={styles.support__ticketPriority}
                  style={{ color: getPriorityColor(ticket.priority) }}
                >
                  {ticket.priority} priority
                </span>
              </div>
            </div>
            <div className={styles.support__ticketFooter}>
              <div className={styles.support__ticketDate}>
                <Clock size={14} />
                <span>Created {ticket.created.toLocaleDateString()}</span>
              </div>
              <div className={styles.support__ticketMessages}>
                <MessageSquare size={14} />
                <span>{ticket.messages} messages</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {mockTickets.length === 0 && (
        <div className={styles.support__emptyState}>
          <MessageSquare size={48} />
          <h4>No tickets yet</h4>
          <p>When you submit a support ticket, it will appear here</p>
          <FnButton
            variant="primary"
            onClick={() => setIsNewTicketModalOpen(true)}
          >
            Create Your First Ticket
          </FnButton>
        </div>
      )}
    </motion.div>
  );

  // Contact Content
  const ContactContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.support__contact}
    >
      <div className={styles.support__contactOptions}>
        <h3 className={styles.support__sectionTitle}>Get in Touch</h3>

        <div className={styles.support__contactCards}>
          <div className={styles.support__contactCard}>
            <div className={styles.support__contactCardIcon}>
              <Phone />
            </div>
            <h4>Phone Support</h4>
            <p>Available Mon-Fri, 8am-6pm</p>
            <a
              href="tel:+2347049452585"
              className={styles.support__contactCardLink}
            >
              +234 704 945 2585
            </a>
          </div>

          <div className={styles.support__contactCard}>
            <div className={styles.support__contactCardIcon}>
              <Mail />
            </div>
            <h4>Email Support</h4>
            <p>We'll respond within 24 hours</p>
            <a
              href="mailto:team@metromellow.com"
              className={styles.support__contactCardLink}
            >
              team@metromellow.com
            </a>
          </div>

          <div className={styles.support__contactCard}>
            <div className={styles.support__contactCardIcon}>
              <MessageSquare />
            </div>
            <h4>Live Chat</h4>
            <p>Chat with our support team</p>
            <button className={styles.support__contactCardButton}>
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className={styles.support__contactForm}>
        <h3 className={styles.support__sectionTitle}>Send us a Message</h3>

        <form className={styles.support__form}>
          <div className={styles.support__formRow}>
            <div className={styles.support__formGroup}>
              <label className={styles.support__label}>Name</label>
              <input
                type="text"
                className={styles.support__input}
                placeholder="Your name"
              />
            </div>
            <div className={styles.support__formGroup}>
              <label className={styles.support__label}>Email</label>
              <input
                type="email"
                className={styles.support__input}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className={styles.support__formGroup}>
            <label className={styles.support__label}>Subject</label>
            <input
              type="text"
              className={styles.support__input}
              placeholder="What can we help you with?"
            />
          </div>

          <div className={styles.support__formGroup}>
            <label className={styles.support__label}>Message</label>
            <textarea
              className={styles.support__textarea}
              rows={6}
              placeholder="Tell us more about your issue..."
            />
          </div>

          <div className={styles.support__formActions}>
            <FnButton variant="primary" size="md">
              <Send size={18} />
              Send Message
            </FnButton>
          </div>
        </form>
      </div>

      {/* Office Hours */}
      <div className={styles.support__officeHours}>
        <h3 className={styles.support__sectionTitle}>Office Hours</h3>
        <div className={styles.support__hoursGrid}>
          <div className={styles.support__hoursItem}>
            <span className={styles.support__hoursDay}>Monday - Friday</span>
            <span className={styles.support__hoursTime}>8:00 AM - 6:00 PM</span>
          </div>
          <div className={styles.support__hoursItem}>
            <span className={styles.support__hoursDay}>Saturday</span>
            <span className={styles.support__hoursTime}>9:00 AM - 4:00 PM</span>
          </div>
          <div className={styles.support__hoursItem}>
            <span className={styles.support__hoursDay}>Sunday</span>
            <span className={styles.support__hoursTime}>Closed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const contentMap = {
    help: <HelpCenterContent />,
    tickets: <TicketsContent />,
    contact: <ContactContent />,
  };

  return (
    <div className={styles.support}>
      <DashboardHeader
        title="Support Center"
        subtitle="We're here to help you with any questions or issues"
      />

      {/* Tab Navigation */}
      <div className={styles.support__tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.support__tab} ${
                activeTab === tab.id ? styles["support__tab--active"] : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className={styles.support__content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {contentMap[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SupportMain;
