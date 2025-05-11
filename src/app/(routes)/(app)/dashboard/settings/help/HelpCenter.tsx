"use client";

import { useState } from "react";
import Icon from "../../_components/common/Icon";
import styles from "./HelpCenter.module.scss";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password.",
    category: "Account",
  },
  {
    question: "How do I update my billing information?",
    answer:
      "You can update your billing information by going to the Billing Settings page and clicking on 'Edit Payment Method'.",
    category: "Billing",
  },
  {
    question: "How do I change my subscription plan?",
    answer:
      "To change your subscription plan, go to the Billing Settings page and click on 'Change Plan'. You can then select your desired plan and follow the prompts to complete the change.",
    category: "Billing",
  },
  {
    question: "How do I update my profile information?",
    answer:
      "You can update your profile information by going to the Profile Settings page and clicking on 'Edit Profile'. Make your changes and click 'Save Changes' to update your information.",
    category: "Account",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by clicking the 'Contact Support' button below or by sending an email to support@metromellow.com.",
    category: "Support",
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.helpCenter}>
      <div className={styles.helpCenter__header}>
        <h1 className={styles.helpCenter__title}>Help Center</h1>
        <p className={styles.helpCenter__subtitle}>
          Find answers to common questions and get support
        </p>
      </div>

      <div className={styles.helpCenter__content}>
        <div className={styles.helpCenter__search}>
          <div className={styles.helpCenter__searchInput}>
            <Icon name="search" className={styles.helpCenter__searchIcon} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.helpCenter__input}
            />
          </div>
        </div>

        <div className={styles.helpCenter__categories}>
          <button
            className={`${styles.helpCenter__categoryBtn} ${
              !selectedCategory ? styles.helpCenter__categoryBtnActive : ""
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.helpCenter__categoryBtn} ${
                selectedCategory === category
                  ? styles.helpCenter__categoryBtnActive
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.helpCenter__faqs}>
          {filteredFaqs.map((faq, index) => (
            <div key={index} className={styles.helpCenter__faq}>
              <h3 className={styles.helpCenter__question}>{faq.question}</h3>
              <p className={styles.helpCenter__answer}>{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className={styles.helpCenter__contact}>
          <h2 className={styles.helpCenter__contactTitle}>Still need help?</h2>
          <p className={styles.helpCenter__contactText}>
            Our support team is here to help you with any questions or issues
            you may have.
          </p>
          <button className={styles.helpCenter__contactBtn}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
