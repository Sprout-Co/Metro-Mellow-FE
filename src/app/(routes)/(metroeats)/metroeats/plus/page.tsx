"use client";

import React, { useState } from "react";
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
  Minus,
  Sparkles,
  Bike,
  Crown,
  Heart,
  Timer,
  BadgeCheck,
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

const benefits = [
  {
    icon: <Truck size={26} />,
    title: "Free Delivery",
    desc: "Enjoy ₦0 delivery fees on all eligible orders over ₦5,000 from participating restaurants.",
  },
  {
    icon: <Percent size={26} />,
    title: "Exclusive Discounts",
    desc: "Access member-only pricing and save up to 20% on selected meals every single day.",
  },
  {
    icon: <Zap size={26} />,
    title: "Faster Checkout",
    desc: "Breeze through checkout with saved preferences and priority order processing.",
  },
  {
    icon: <Gift size={26} />,
    title: "Special Rewards",
    desc: "Earn double points on every order and unlock exclusive rewards from your favourite spots.",
  },
  {
    icon: <Clock size={26} />,
    title: "Priority Access",
    desc: "Be first to know about new restaurants, limited-time offers, and seasonal menus.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Big Monthly Savings",
    desc: "Members save an average of ₦15,000 every month on delivery fees and exclusive deals.",
  },
];

const testimonials = [
  {
    initials: "ST",
    text: "I order lunch almost every day at work. MetroEats Plus pays for itself in just the first week with the free delivery alone. Highly recommended!",
    name: "Sarah T.",
    role: "Member since 2023",
  },
  {
    initials: "DO",
    text: "The exclusive discounts are amazing. I get to try new restaurants I normally wouldn't, and the priority support is incredibly fast.",
    name: "David O.",
    role: "Member since 2024",
  },
  {
    initials: "AE",
    text: "As a busy mom, this subscription is a lifesaver. We save so much on family dinners, and the checkout process is super fast.",
    name: "Amaka E.",
    role: "Member since 2023",
  },
];

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faq__item}>
      <button
        className={styles.faq__question}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className={styles.faq__icon}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
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
        <div className={styles.hero__inner}>
          <motion.div
            className={styles.hero__content}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.hero__title}>
              Free delivery, daily savings, <span>real flavours.</span>
            </h1>
            <p className={styles.hero__subtitle}>
              Join MetroEats Plus and unlock free delivery, member-only
              discounts, and priority access to your favourite local kitchens —
              all in one tap.
            </p>
            <div className={styles.hero__actions}>
              <Button
                href={Routes.DASHBOARD_SUBSCRIPTIONS_NEW}
                variant="primary"
                size="lg"
                animation="scale"
              >
                Start now
              </Button>
              <Button
                href="#benefits"
                variant="ghost"
                size="lg"
                animation="scale"
              >
                See Benefits
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className={styles.section}>
        <div className={styles.section__header}>
          <span className={styles.section__eyebrow}>Member benefits</span>
          <h2 className={styles.section__title}>
            Built for people who <span>love good food.</span>
          </h2>
          <p className={styles.section__subtitle}>
            Six powerful perks designed to save you time, money, and effort on
            every single order.
          </p>
        </div>

        <div className={styles.benefits}>
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              className={styles.benefits__card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className={styles.benefits__icon}>{benefit.icon}</div>
              <h3 className={styles.benefits__title}>{benefit.title}</h3>
              <p className={styles.benefits__desc}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.promo}>
          <div className={styles.promo__content}>
            <span className={styles.promo__tag}>Limited offer</span>
            <h3 className={styles.promo__title}>Try Plus free for 14 days</h3>
            <p className={styles.promo__desc}>
              Get the full premium experience on us. Cancel any time — no fees,
              no fuss.
            </p>
          </div>
          <div className={styles.promo__action}>
            <Button
              href={Routes.DASHBOARD_SUBSCRIPTIONS_NEW}
              variant="primary"
              size="lg"
              animation="scale"
            >
              Claim free trial
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`${styles.section} ${styles["section--white"]}`}>
        <div className={styles["section--inner"]} style={{ padding: "0 1rem" }}>
          <div className={styles.section__header}>
            <span className={styles.section__eyebrow}>How it works</span>
            <h2 className={styles.section__title}>
              Start saving in three simple steps.
            </h2>
            <p className={styles.section__subtitle}>
              From sign-up to first delivery — Plus works the moment you join.
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.steps__item}>
              <div className={styles.steps__number}>1</div>
              <h3 className={styles.steps__title}>Pick your plan</h3>
              <p className={styles.steps__desc}>
                Choose a monthly or yearly plan in seconds. Both come with a
                free trial.
              </p>
            </div>
            <div className={styles.steps__item}>
              <div className={styles.steps__number}>2</div>
              <h3 className={styles.steps__title}>Order your favourites</h3>
              <p className={styles.steps__desc}>
                Look out for the Plus badge on participating restaurants near
                you.
              </p>
            </div>
            <div className={styles.steps__item}>
              <div className={styles.steps__number}>3</div>
              <h3 className={styles.steps__title}>Save automatically</h3>
              <p className={styles.steps__desc}>
                Free delivery and member discounts apply instantly at checkout.
                That's it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.section__header}>
          <span className={styles.section__eyebrow}>FAQs</span>
          <h2 className={styles.section__title}>
            Got questions? We've got answers.
          </h2>
          <p className={styles.section__subtitle}>
            Everything you need to know about your Plus membership.
          </p>
        </div>

        <div className={styles.faq}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}
