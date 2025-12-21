import React from "react";
import Link from "next/link";
import styles from "./ServiceInternalLinks.module.scss";

interface ServiceLink {
  title: string;
  href: string;
  description: string;
}

interface ServiceInternalLinksProps {
  currentService: string;
  services: ServiceLink[];
}

/**
 * ServiceInternalLinks Component
 *
 * Enhances SEO by creating internal links between service pages.
 * Internal linking helps search engines understand site structure
 * and improves page authority distribution.
 */
export default function ServiceInternalLinks({
  currentService,
  services,
}: ServiceInternalLinksProps) {
  // Filter out the current service
  const otherServices = services.filter(
    (service) => service.href !== currentService
  );

  if (otherServices.length === 0) return null;

  return (
    <section
      className={styles.serviceInternalLinks}
      aria-label="Related Services"
    >
      <div className={styles.serviceInternalLinks__content}>
        <h2 className={styles.serviceInternalLinks__title}>
          Explore Our Other Services
        </h2>
        <p className={styles.serviceInternalLinks__description}>
          Discover more professional home services available throughout Lagos
        </p>
        <div className={styles.serviceInternalLinks__grid}>
          {otherServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={styles.serviceInternalLinks__card}
              aria-label={`Learn more about ${service.title}`}
            >
              <h3 className={styles.serviceInternalLinks__cardTitle}>
                {service.title}
              </h3>
              <p className={styles.serviceInternalLinks__cardDescription}>
                {service.description}
              </p>
              <span className={styles.serviceInternalLinks__linkText}>
                Learn More <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
