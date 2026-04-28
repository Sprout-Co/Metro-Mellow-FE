"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
  Gift,
  ShieldCheck,
  Percent,
  Truck,
  Check,
  Minus
} from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { Routes } from "@/constants/routes";
import styles from "./plus.module.scss";

const faqs = [
  {
    question: "What is MetroEats Plus?",
    answer:
      "MetroEats Plus is our premium subscription service that gives you free delivery on eligible orders, exclusive discounts, priority access to deals, and faster checkout.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes! There are no long-term commitments. You can pause or cancel your subscription at any time directly from your dashboard.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, new members get a 14-day free trial to experience all the benefits of MetroEats Plus before being charged.",
  },
  {
    question: "Which restaurants are included?",
    answer:
      "MetroEats Plus benefits apply to all restaurants with the MetroEats Plus badge. This includes over 80% of our top-rated partners.",
  },
  {
    question: "When do my benefits apply?",
    answer:
      "Your benefits apply immediately after you subscribe. Free delivery and discounts will automatically be applied at checkout for eligible orders.",
  },
  {
    question: "How am I charged?",
    answer:
      "You will be billed automatically at the beginning of each billing cycle (monthly or yearly) to your default payment method.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faq__item}>
      <button
        className={styles.faq__question}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className={styles.faq__icon} size={20} />
        ) : (
          <ChevronDown className={styles.faq__icon} size={20} />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.faq__answer}>{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MetroEatsPlusPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.hero__badge}>
              <Star size={16} fill="currentColor" />
              <span>MetroEats Plus</span>
            </div>
            <h1 className={styles.hero__title}>
              Save more on every order with <span>MetroEats Plus</span>
            </h1>
            <p className={styles.hero__subtitle}>
              Get free delivery, exclusive member-only discounts, and priority access to deals. Join today and start saving.
            </p>
            <div className={styles.hero__actions}>
              <Button
                href={Routes.DASHBOARD_SUBSCRIPTIONS_NEW}
                variant="primary"
                size="lg"
                animation="scale"
              >
                Start Free Trial
              </Button>
              <Button
                href="#benefits"
                variant="secondary"
                size="lg"
                animation="scale"
              >
                See Benefits
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.hero__image}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Placeholder for hero image */}
          <div style={{ width: "100%", height: "100%", background: "#f1f1f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src="/images/metroeats/brand-logo/white-on-yellow.png"
              alt="MetroEats Plus"
              width={200}
              height={200}
              style={{ opacity: 0.1, objectFit: "contain" }}
            />
            <p style={{ position: "absolute", color: "#9f9f9f", fontWeight: "bold" }}>Food Delivery Imagery</p>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Why join MetroEats Plus?</h2>
          <p className={styles.section__subtitle}>
            Everything you need for a better food delivery experience.
          </p>
        </div>

        <div className={styles.benefits}>
          <div className={styles.benefits__card}>
            <div className={styles.benefits__icon}>
              <Truck size={24} />
            </div>
            <h3 className={styles.benefits__title}>Free Delivery</h3>
            <p className={styles.benefits__desc}>
              Enjoy $0 delivery fees on all eligible orders over ₦5,000 from participating restaurants.
            </p>
          </div>
          <div className={styles.benefits__card}>
            <div className={styles.benefits__icon}>
              <Percent size={24} />
            </div>
            <h3 className={styles.benefits__title}>Exclusive Discounts</h3>
            <p className={styles.benefits__desc}>
              Access special member-only pricing and save up to 20% on selected meals every day.
            </p>
          </div>
          <div className={styles.benefits__card}>
            <div className={styles.benefits__icon}>
              <Zap size={24} />
            </div>
            <h3 className={styles.benefits__title}>Faster Checkout</h3>
            <p className={styles.benefits__desc}>
              Breeze through checkout with saved preferences and priority order processing.
            </p>
          </div>
          <div className={styles.benefits__card}>
            <div className={styles.benefits__icon}>
              <Gift size={24} />
            </div>
            <h3 className={styles.benefits__title}>Special Rewards</h3>
            <p className={styles.benefits__desc}>
              Earn double points on every order and unlock exclusive rewards from your favorite spots.
            </p>
          </div>
          <div className={styles.benefits__card}>
            <div className={styles.benefits__icon}>
              <Clock size={24} />
            </div>
            <h3 className={styles.benefits__title}>Priority Access</h3>
            <p className={styles.benefits__desc}>
              Be the first to know about new restaurants, limited-time offers, and seasonal menus.
            </p>
          </div>
          <div className={styles.benefits__card}>
            <div className={styles.benefits__icon}>
              <ShieldCheck size={24} />
            </div>
            <h3 className={styles.benefits__title}>Monthly Savings</h3>
            <p className={styles.benefits__desc}>
              Our members save an average of ₦15,000 per month on delivery fees and exclusive deals.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section} style={{ background: "#fff", maxWidth: "100%" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>How it works</h2>
            <p className={styles.section__subtitle}>
              Start saving in three simple steps.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.steps__item}>
              <div className={styles.steps__number}>1</div>
              <h3 className={styles.steps__title}>Choose a plan</h3>
              <p className={styles.steps__desc}>
                Select the monthly or yearly plan that works best for you.
              </p>
            </div>
            <div className={styles.steps__item}>
              <div className={styles.steps__number}>2</div>
              <h3 className={styles.steps__title}>Order your favorites</h3>
              <p className={styles.steps__desc}>
                Look for the MetroEats Plus badge on participating restaurants.
              </p>
            </div>
            <div className={styles.steps__item}>
              <div className={styles.steps__number}>3</div>
              <h3 className={styles.steps__title}>Save automatically</h3>
              <p className={styles.steps__desc}>
                Discounts and free delivery are applied instantly at checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Comparison */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>See the difference</h2>
          <p className={styles.section__subtitle}>
            Compare regular ordering with MetroEats Plus.
          </p>
        </div>

        <div className={styles.comparison}>
          <table className={styles.comparison__table}>
            <thead>
              <tr>
                <th>Benefits</th>
                <th>Regular</th>
                <th className={styles.comparison__table_highlight}>MetroEats Plus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Delivery Fees</td>
                <td>Standard rates apply</td>
                <td className={styles.comparison__table_highlight}>
                  <strong>₦0</strong> on eligible orders
                </td>
              </tr>
              <tr>
                <td>Exclusive Discounts</td>
                <td>
                  <span className={styles.comparison__icon_x}><Minus size={20} /></span>
                </td>
                <td className={styles.comparison__table_highlight}>
                  <span className={styles.comparison__icon_check}><Check size={20} /></span>
                </td>
              </tr>
              <tr>
                <td>Priority Support</td>
                <td>
                  <span className={styles.comparison__icon_x}><Minus size={20} /></span>
                </td>
                <td className={styles.comparison__table_highlight}>
                  <span className={styles.comparison__icon_check}><Check size={20} /></span>
                </td>
              </tr>
              <tr>
                <td>Special Partner Perks</td>
                <td>
                  <span className={styles.comparison__icon_x}><Minus size={20} /></span>
                </td>
                <td className={styles.comparison__table_highlight}>
                  <span className={styles.comparison__icon_check}><Check size={20} /></span>
                </td>
              </tr>
              <tr>
                <td>Average Monthly Savings</td>
                <td>₦0</td>
                <td className={styles.comparison__table_highlight}>
                  <strong>₦15,000+</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Simple, transparent pricing</h2>
          <p className={styles.section__subtitle}>
            Choose the plan that fits your lifestyle. Cancel anytime.
          </p>
        </div>

        <div className={styles.pricing}>
          <div className={styles.pricing__card}>
            <h3 className={styles.pricing__name}>Monthly</h3>
            <div className={styles.pricing__price}>
              ₦3,500<span>/month</span>
            </div>
            <ul className={styles.pricing__features}>
              <li><CheckCircle2 size={20} /> Free delivery on eligible orders</li>
              <li><CheckCircle2 size={20} /> Exclusive member discounts</li>
              <li><CheckCircle2 size={20} /> Priority customer support</li>
              <li><CheckCircle2 size={20} /> Cancel anytime</li>
            </ul>
            <div className={styles.pricing__cta}>
              <Button
                href={Routes.DASHBOARD_SUBSCRIPTIONS_NEW}
                variant="secondary"
                size="lg"
                fullWidth
              >
                Start 14-Day Free Trial
              </Button>
            </div>
          </div>

          <div className={`${styles.pricing__card} ${styles["pricing__card--popular"]}`}>
            <div className={styles.pricing__badge}>Best Value</div>
            <h3 className={styles.pricing__name}>Yearly</h3>
            <div className={styles.pricing__price}>
              ₦35,000<span>/year</span>
            </div>
            <ul className={styles.pricing__features}>
              <li><CheckCircle2 size={20} /> <strong>Save ₦7,000 annually</strong></li>
              <li><CheckCircle2 size={20} /> Free delivery on eligible orders</li>
              <li><CheckCircle2 size={20} /> Exclusive member discounts</li>
              <li><CheckCircle2 size={20} /> Priority customer support</li>
              <li><CheckCircle2 size={20} /> Special anniversary reward</li>
            </ul>
            <div className={styles.pricing__cta}>
              <Button
                href={Routes.DASHBOARD_SUBSCRIPTIONS_NEW}
                variant="primary"
                size="lg"
                fullWidth
              >
                Start 14-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section} style={{ background: "#fff", maxWidth: "100%" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Loved by our members</h2>
          </div>

          <div className={styles.testimonials}>
            <div className={styles.testimonials__card}>
              <div className={styles.testimonials__stars}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className={styles.testimonials__text}>
                "I order lunch almost every day at work. MetroEats Plus pays for itself in just the first week with the free delivery alone. Highly recommended!"
              </p>
              <div className={styles.testimonials__author}>
                <div className={styles.testimonials__avatar}></div>
                <div>
                  <div className={styles.testimonials__name}>Sarah T.</div>
                  <div className={styles.testimonials__role}>Member since 2023</div>
                </div>
              </div>
            </div>
            <div className={styles.testimonials__card}>
              <div className={styles.testimonials__stars}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className={styles.testimonials__text}>
                "The exclusive discounts are amazing. I get to try new restaurants I normally wouldn't, and the priority support is incredibly fast."
              </p>
              <div className={styles.testimonials__author}>
                <div className={styles.testimonials__avatar}></div>
                <div>
                  <div className={styles.testimonials__name}>David O.</div>
                  <div className={styles.testimonials__role}>Member since 2024</div>
                </div>
              </div>
            </div>
            <div className={styles.testimonials__card}>
              <div className={styles.testimonials__stars}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className={styles.testimonials__text}>
                "As a busy mom, this subscription is a lifesaver. We save so much on family dinners, and the checkout process is super fast."
              </p>
              <div className={styles.testimonials__author}>
                <div className={styles.testimonials__avatar}></div>
                <div>
                  <div className={styles.testimonials__name}>Amaka E.</div>
                  <div className={styles.testimonials__role}>Member since 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.faq}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.section}>
        <div className={styles.cta}>
          <h2 className={styles.cta__title}>Ready to start saving?</h2>
          <p className={styles.cta__desc}>
            Join thousands of members who are already enjoying free delivery and exclusive discounts with MetroEats Plus.
          </p>
          <Button
            href={Routes.DASHBOARD_SUBSCRIPTIONS_NEW}
            variant="secondary"
            size="lg"
            animation="scale"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
