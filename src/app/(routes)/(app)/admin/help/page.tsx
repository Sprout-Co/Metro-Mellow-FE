"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./help.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import { motion } from "framer-motion";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock categories
  const categories = [
    { id: "all", name: "All Resources" },
    { id: "getting-started", name: "Getting Started" },
    { id: "bookings", name: "Bookings & Scheduling" },
    { id: "staff", name: "Staff Management" },
    { id: "customers", name: "Customer Management" },
    { id: "billing", name: "Billing & Payments" },
    { id: "reports", name: "Reports & Analytics" },
  ];

  // Mock help articles
  const helpArticles = [
    {
      id: 1,
      title: "Getting Started with Metro Mellow Admin",
      description:
        "Learn the basics of navigating and using your admin dashboard.",
      category: "getting-started",
      views: 2345,
      lastUpdated: "May 5, 2024",
    },
    {
      id: 2,
      title: "Creating and Managing Service Bookings",
      description:
        "How to create, edit, and manage booking appointments for your services.",
      category: "bookings",
      views: 1876,
      lastUpdated: "May 10, 2024",
    },
    {
      id: 3,
      title: "Staff Scheduling and Assignment",
      description:
        "Learn how to assign staff to bookings and manage their schedules effectively.",
      category: "staff",
      views: 1654,
      lastUpdated: "May 8, 2024",
    },
    {
      id: 4,
      title: "Customer Database Management",
      description:
        "How to manage your customer database, add notes, and track preferences.",
      category: "customers",
      views: 1432,
      lastUpdated: "May 12, 2024",
    },
    {
      id: 5,
      title: "Processing Payments and Refunds",
      description:
        "A guide to processing customer payments and managing refunds when needed.",
      category: "billing",
      views: 2145,
      lastUpdated: "May 7, 2024",
    },
    {
      id: 6,
      title: "Generating and Exporting Reports",
      description:
        "How to generate custom reports and export your data for analysis.",
      category: "reports",
      views: 1234,
      lastUpdated: "May 15, 2024",
    },
    {
      id: 7,
      title: "Setting Up Your Company Profile",
      description:
        "Configure your company information and services for your customers to see.",
      category: "getting-started",
      views: 1987,
      lastUpdated: "May 3, 2024",
    },
    {
      id: 8,
      title: "Managing Service Cancellations",
      description:
        "How to handle booking cancellations and manage your cancellation policies.",
      category: "bookings",
      views: 1456,
      lastUpdated: "May 9, 2024",
    },
  ];

  // Filter articles based on search query and active category
  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Mock frequently asked questions
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'To reset your password, click on the "Forgot Password" link on the login screen. You will receive an email with instructions to create a new password.',
    },
    {
      question: "Can I schedule recurring appointments?",
      answer:
        'Yes, you can create recurring appointments. When creating a new booking, select the "Recurring" option and choose the frequency (weekly, bi-weekly, monthly, etc.).',
    },
    {
      question: "How do I add a new staff member?",
      answer:
        'Go to the Staff Management section, click on "Add Staff Member", and fill out the required information. You can then assign services and set availability.',
    },
    {
      question: "How can I export my customer data?",
      answer:
        'Navigate to the Customers section, click on the "Export" button in the top right corner, and choose your preferred file format (CSV, Excel, etc.).',
    },
    {
      question: "Can I customize email notifications?",
      answer:
        "Yes, go to Settings > Notifications where you can customize email templates and notification preferences for different events.",
    },
  ];

  // Handle article click
  const handleArticleClick = (article: any) => {
    console.log("Article clicked:", article);
    // This would typically open the full article or redirect to a dedicated article page
  };

  return (
    <AdminDashboardLayout
      title="Help Center"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Help Center", path: "/admin/help" },
      ]}
    >
      <div className={styles.help_page}>
        <div className={styles.help_page__header}>
          <div className={styles.help_page__title_area}>
            <h2 className={styles.help_page__title}>Help Center</h2>
            <p className={styles.help_page__subtitle}>
              Find answers and learn how to use Metro Mellow
            </p>
          </div>

          <div className={styles.help_page__search}>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.help_page__search_input}
            />
          </div>
        </div>

        <div className={styles.help_page__container}>
          <div className={styles.help_page__sidebar}>
            <Card className={styles.help_page__categories}>
              <h3 className={styles.help_page__categories_title}>Topics</h3>
              <ul className={styles.help_page__category_list}>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`${styles.help_page__category_button} ${activeCategory === category.id ? styles["help_page__category_button--active"] : ""}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className={styles.help_page__contact}>
              <h3 className={styles.help_page__contact_title}>
                Need More Help?
              </h3>
              <p className={styles.help_page__contact_text}>
                Our support team is available to assist you with any questions
                or issues.
              </p>
              <Button variant="primary" size="medium">
                Contact Support
              </Button>
            </Card>
          </div>

          <div className={styles.help_page__content}>
            <Card className={styles.help_page__articles}>
              <h3 className={styles.help_page__section_title}>
                Help Articles
                {activeCategory !== "all" && (
                  <span className={styles.help_page__category_filter}>
                    :{" "}
                    {categories.find((cat) => cat.id === activeCategory)?.name}
                  </span>
                )}
              </h3>

              {filteredArticles.length > 0 ? (
                <div className={styles.help_page__article_list}>
                  {filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      className={styles.help_page__article_item}
                      onClick={() => handleArticleClick(article)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.help_page__article_content}>
                        <h4 className={styles.help_page__article_title}>
                          {article.title}
                        </h4>
                        <p className={styles.help_page__article_description}>
                          {article.description}
                        </p>
                      </div>
                      <div className={styles.help_page__article_meta}>
                        <span className={styles.help_page__article_views}>
                          {article.views} views
                        </span>
                        <span className={styles.help_page__article_date}>
                          Updated: {article.lastUpdated}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={styles.help_page__no_results}>
                  <p>
                    No articles found matching your search criteria. Try
                    broadening your search or selecting a different category.
                  </p>
                </div>
              )}
            </Card>

            <Card className={styles.help_page__faqs}>
              <h3 className={styles.help_page__section_title}>
                Frequently Asked Questions
              </h3>

              <div className={styles.help_page__faq_list}>
                {faqs.map((faq, index) => (
                  <details key={index} className={styles.help_page__faq_item}>
                    <summary className={styles.help_page__faq_question}>
                      {faq.question}
                    </summary>
                    <div className={styles.help_page__faq_answer}>
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
