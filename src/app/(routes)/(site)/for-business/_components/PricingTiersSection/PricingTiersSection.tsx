"use client";

import React, { useRef, useEffect } from "react";
import styles from "./PricingTiersSection.module.scss";
import Button from "@/components/ui/Button/Button";

interface PricingFeature {
  id: string;
  text: string;
  included: boolean;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string | null;
  priceDetail: string;
  badge: string | null;
  features: PricingFeature[];
  buttonText: string;
  buttonHref: string;
  accentColor: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description:
      "Perfect for small businesses getting started with professional services",
    price: "499",
    priceDetail: "per month",
    badge: null,
    accentColor: "accent",
    features: [
      { id: "feature-1", text: "Basic service management", included: true },
      { id: "feature-2", text: "Up to 50 employee accounts", included: true },
      { id: "feature-3", text: "Standard support (24/7)", included: true },
      { id: "feature-4", text: "Monthly billing", included: true },
      { id: "feature-5", text: "Basic analytics", included: true },
      { id: "feature-6", text: "Priority support", included: false },
      { id: "feature-7", text: "Custom scheduling", included: false },
      { id: "feature-8", text: "White-label options", included: false },
    ],
    buttonText: "Get Started",
    buttonHref: "/contact?plan=starter",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses with expanding service needs",
    price: "999",
    priceDetail: "per month",
    badge: "Most Popular",
    accentColor: "secondary",
    features: [
      { id: "feature-1", text: "Advanced service management", included: true },
      { id: "feature-2", text: "Up to 200 employee accounts", included: true },
      { id: "feature-3", text: "Priority support (24/7)", included: true },
      { id: "feature-4", text: "Monthly/Annual billing", included: true },
      { id: "feature-5", text: "Analytics dashboard", included: true },
      { id: "feature-6", text: "Custom scheduling", included: true },
      { id: "feature-7", text: "API access", included: true },
      { id: "feature-8", text: "White-label options", included: false },
    ],
    buttonText: "Get Started",
    buttonHref: "/contact?plan=professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Comprehensive solution for large organizations with complex requirements",
    price: null,
    priceDetail: "Custom pricing",
    badge: null,
    accentColor: "primary",
    features: [
      { id: "feature-1", text: "Full service suite", included: true },
      { id: "feature-2", text: "Unlimited employee accounts", included: true },
      { id: "feature-3", text: "Dedicated support manager", included: true },
      { id: "feature-4", text: "Flexible billing options", included: true },
      { id: "feature-5", text: "Advanced analytics", included: true },
      { id: "feature-6", text: "Custom integrations", included: true },
      { id: "feature-7", text: "White-label options", included: true },
      { id: "feature-8", text: "SLA guarantees", included: true },
    ],
    buttonText: "Contact Sales",
    buttonHref: "/contact?plan=enterprise",
  },
];

export const PricingTiersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);

      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className={styles.pricingTiers} ref={sectionRef}>
      <div className={styles.pricingTiers__container}>
        <div
          ref={headerRef}
          className={`${styles.pricingTiers__header} ${styles.fadeIn}`}
        >
          <span className={styles.pricingTiers__badge}>Pricing Plans</span>
          <h2 className={styles.pricingTiers__title}>
            Transparent Pricing for Every Business Size
          </h2>
          <p className={styles.pricingTiers__subtitle}>
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className={styles.pricingTiers__grid}>
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`${styles.pricingTiers__card} ${
                tier.badge ? styles.pricingTiers__card__featured : ""
              } ${styles.fadeIn}`}
              style={{ transitionDelay: `${0.1 * index}s` }}
              data-accent={tier.accentColor}
            >
              {tier.badge && (
                <div className={styles.pricingTiers__cardBadge}>
                  {tier.badge}
                </div>
              )}

              <div className={styles.pricingTiers__cardHeader}>
                <h3 className={styles.pricingTiers__cardTitle}>{tier.name}</h3>
                <p className={styles.pricingTiers__cardDescription}>
                  {tier.description}
                </p>
              </div>

              <div className={styles.pricingTiers__cardPricing}>
                {tier.price ? (
                  <>
                    <span className={styles.pricingTiers__cardCurrency}>$</span>
                    <span className={styles.pricingTiers__cardPrice}>
                      {tier.price}
                    </span>
                  </>
                ) : (
                  <span className={styles.pricingTiers__cardCustomPrice}>
                    Custom
                  </span>
                )}
                <span className={styles.pricingTiers__cardPriceDetail}>
                  {tier.priceDetail}
                </span>
              </div>

              <ul className={styles.pricingTiers__cardFeatures}>
                {tier.features.map((feature) => (
                  <li
                    key={`${tier.id}-${feature.id}`}
                    className={`${styles.pricingTiers__cardFeatureItem} ${
                      feature.included
                        ? styles.pricingTiers__cardFeatureItem__included
                        : styles.pricingTiers__cardFeatureItem__excluded
                    }`}
                  >
                    <span className={styles.pricingTiers__cardFeatureIcon}>
                      {feature.included ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={styles.pricingTiers__cardFeatureIconSvg}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={styles.pricingTiers__cardFeatureIconSvg}
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <span className={styles.pricingTiers__cardFeatureText}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.pricingTiers__cardAction}>
                <Button
                  variant={tier.id === "professional" ? "primary" : "ghost"}
                  size="lg"
                  href={tier.buttonHref}
                  fullWidth
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className={`${styles.pricingTiers__cta} ${styles.fadeIn} ${styles.fadeIn__delay3}`}
        >
          <p className={styles.pricingTiers__ctaText}>
            Need a custom solution? We can tailor our services to your specific
            requirements.
          </p>
          <Button variant="primary" size="lg" href="/contact?source=pricing">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingTiersSection;
