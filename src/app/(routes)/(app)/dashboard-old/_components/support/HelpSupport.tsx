"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import styles from "./HelpSupport.module.scss";

// FAQ categories
const categories = [
  { id: "general", label: "General" },
  { id: "scheduling", label: "Scheduling & Booking" },
  { id: "services", label: "Our Services" },
  { id: "account", label: "Account & Billing" },
  { id: "providers", label: "Service Providers" },
];

// FAQ questions
const faqData = [
  {
    id: "faq1",
    question: "How do I schedule a service?",
    answer:
      'You can schedule a service through your dashboard by clicking on "Book New Service" or by navigating to the Services tab. Follow the guided process to select your desired service, choose a date and time, specify your location, and complete the booking.',
    category: "scheduling",
  },
  {
    id: "faq2",
    question: "Can I reschedule or cancel a service?",
    answer:
      "Yes, you can reschedule or cancel a service through your dashboard. Go to the Upcoming Appointments section, find the service you want to modify, and click on the appointment card. You will see options to reschedule or cancel. Please note that cancellations made less than 24 hours before the appointment may incur a fee.",
    category: "scheduling",
  },
  {
    id: "faq3",
    question: "How do I update my payment information?",
    answer:
      'You can update your payment information in the Account Settings section. Navigate to the Billing tab, click on Payment Methods, and then select "Add Payment Method" or edit an existing one. Your payment information is securely stored and processed.',
    category: "account",
  },
  {
    id: "faq4",
    question: "What services does Metromellow offer?",
    answer:
      "Metromellow offers a variety of home services including cleaning, laundry, cooking, errands, and pest control. Each service can be customized to meet your specific needs. For detailed information about each service, visit the Services section of your dashboard.",
    category: "services",
  },
  {
    id: "faq5",
    question: "How are service providers selected?",
    answer:
      "All Metromellow service providers undergo thorough background checks and training. We select professionals based on their experience, skills, and commitment to customer satisfaction. You can view the profiles of assigned providers in the Providers section of your dashboard.",
    category: "providers",
  },
  {
    id: "faq6",
    question: "What is the Metromellow rewards program?",
    answer:
      "Our rewards program allows you to earn points for each service you book. These points can be redeemed for discounts, free services, and other exclusive benefits. You can track your points and available rewards in the Rewards & Loyalty section of your dashboard.",
    category: "general",
  },
  {
    id: "faq7",
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team through multiple channels: use the chat feature in your dashboard, submit a support request through the Help & Support section, email us at support@metromellow.com, or call us at (555) 123-4567 during business hours (Monday to Friday, 9 AM to 6 PM).",
    category: "general",
  },
  {
    id: "faq8",
    question: "How are service fees calculated?",
    answer:
      "Service fees are calculated based on the type of service, duration, frequency (one-time vs. recurring), and any additional requests or customizations. You can see a detailed breakdown of costs before confirming any booking. Subscription plans offer discounted rates compared to one-time services.",
    category: "account",
  },
];

// Contact options
const contactOptions = [
  {
    id: "co1",
    icon: "message-square",
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    action: "Start Chat",
    availability: "Available now",
  },
  {
    id: "co2",
    icon: "mail",
    title: "Email Support",
    description: "Send us an email at support@metromellow.com",
    action: "Send Email",
    availability: "24/7 response within 24 hours",
  },
  {
    id: "co3",
    icon: "phone",
    title: "Phone Support",
    description: "Call us at (555) 123-4567",
    action: "Call Now",
    availability: "Mon-Fri, 9 AM - 6 PM",
  },
];

export default function HelpSupport() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
    category: "general",
    priority: "normal",
  });

  // Filter FAQs by selected category
  const filteredFaqs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  // Handle support form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to an API
    console.log("Form submitted:", supportForm);
    // Reset form
    setSupportForm({
      subject: "",
      message: "",
      category: "general",
      priority: "normal",
    });
    // Show success message
    alert(
      "Your support request has been submitted. We will get back to you soon!"
    );
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSupportForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle FAQ expansion
  const toggleFaq = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className={styles.support}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className={styles.support__header}>
        <div>
          <h1 className={styles.support__title}>Help & Support</h1>
          <p className={styles.support__subtitle}>
            Find answers to common questions or get in touch with our support
            team
          </p>
        </div>
      </header>

      <motion.section
        className={styles.support__section}
        variants={itemVariants}
      >
        <h2 className={styles.support__sectionTitle}>
          <Icon name="help-circle" />
          Frequently Asked Questions
        </h2>

        <div className={styles.support__categories}>
          <button
            className={`${styles.support__categoryBtn} ${activeCategory === "all" ? styles["support__categoryBtn--active"] : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.support__categoryBtn} ${activeCategory === category.id ? styles["support__categoryBtn--active"] : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.support__faqList}>
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className={styles.support__faqItem}>
              <button
                className={styles.support__faqQuestion}
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={expandedFaq === faq.id}
              >
                <span>{faq.question}</span>
                <Icon
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"}
                />
              </button>

              <AnimatePresence>
                {expandedFaq === faq.id && (
                  <motion.div
                    className={styles.support__faqAnswer}
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
        </div>
      </motion.section>

      <div className={styles.support__columns}>
        <motion.section
          className={styles.support__section}
          variants={itemVariants}
        >
          <h2 className={styles.support__sectionTitle}>
            <Icon name="message-square" />
            Contact Support
          </h2>

          <div className={styles.support__contactOptions}>
            {contactOptions.map((option) => (
              <div key={option.id} className={styles.support__contactOption}>
                <div className={styles.support__contactIcon}>
                  <Icon name={option.icon} />
                </div>
                <div className={styles.support__contactInfo}>
                  <h3 className={styles.support__contactTitle}>
                    {option.title}
                  </h3>
                  <p className={styles.support__contactDescription}>
                    {option.description}
                  </p>
                  <div className={styles.support__contactAvailability}>
                    <Icon name="clock" />
                    <span>{option.availability}</span>
                  </div>
                </div>
                <button className={styles.support__contactBtn}>
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.support__section}
          variants={itemVariants}
        >
          <h2 className={styles.support__sectionTitle}>
            <Icon name="file-text" />
            Submit a Support Request
          </h2>

          <form className={styles.support__form} onSubmit={handleSubmit}>
            <div className={styles.support__formGroup}>
              <label htmlFor="category" className={styles.support__formLabel}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={styles.support__formSelect}
                value={supportForm.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.support__formGroup}>
              <label htmlFor="priority" className={styles.support__formLabel}>
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className={styles.support__formSelect}
                value={supportForm.priority}
                onChange={handleInputChange}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className={styles.support__formGroup}>
              <label htmlFor="subject" className={styles.support__formLabel}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={styles.support__formInput}
                placeholder="Briefly describe your issue"
                value={supportForm.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.support__formGroup}>
              <label htmlFor="message" className={styles.support__formLabel}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.support__formTextarea}
                placeholder="Please provide details about your issue or question"
                rows={6}
                value={supportForm.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className={styles.support__formAttachment}>
              <button type="button" className={styles.support__attachBtn}>
                <Icon name="paperclip" />
                Attach Files
              </button>
              <span className={styles.support__attachNote}>
                Max file size: 10MB
              </span>
            </div>

            <button type="submit" className={styles.support__submitBtn}>
              Submit Request
            </button>
          </form>
        </motion.section>
      </div>
    </motion.div>
  );
}
