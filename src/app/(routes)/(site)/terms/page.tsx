import { Metadata } from "next";
import styles from "./Terms.module.scss";
import termsData from "@/data/legal/terms-of-service.json";
import StructuredData from "@/components/common/SEO/StructuredData";
import { createBreadcrumbSchema } from "@/utils/seoHelpers";
import Link from "next/link";
import { ContactDetails } from "@/constants/config";

// Helper function to render text with bold formatting
const renderText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export const metadata: Metadata = {
  title: "Terms of Service | Metromellow Legal Terms & Conditions",
  description:
    "Read Metromellow's Terms of Service including user agreements, service conditions, booking policies, refunds, and legal disclaimers for our home services platform in Lagos.",
  keywords:
    "Metromellow terms of service, terms and conditions, user agreement, service terms Lagos, home services terms, legal terms",
  alternates: {
    canonical: "https://metromellow.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Metromellow",
    description:
      "Review Metromellow's Terms of Service and user agreements for our home services platform.",
    url: "https://metromellow.com/terms",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow Terms of Service",
      },
    ],
  },
};

export default function TermsOfServicePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Terms of Service", url: "https://metromellow.com/terms" },
  ];

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />

      <main className={styles.termsPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.hero__container}>
            <div className={styles.hero__content}>
              <h1 className={styles.hero__title}>
                <span className={styles.hero__titleAccent}>Metromellow</span>{" "}
                Terms and Conditions of Service
              </h1>
            </div>
          </div>
        </section>

        {/* Legal Navigation */}
        <section className={styles.legalNav}>
          <div className={styles.legalNav__container}>
            <nav className={styles.legalNav__links}>
              <Link
                href="/terms"
                className={`${styles.legalNav__link} ${styles.legalNav__link_active}`}
              >
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className={styles.legalNav__link}>
                Privacy & Cookie Policy
              </Link>
              <Link href="/privacy-notice" className={styles.legalNav__link}>
                Privacy Notice
              </Link>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.content}>
          <div className={styles.content__container}>
            {/* Main Terms Sections */}
            <div className={styles.content__section}>
              <h2 className={styles.content__sectionTitle}>
                General Terms and Conditions
              </h2>
              {termsData.sections.map((section) => (
                <div key={section.id} className={styles.section}>
                  <h3 className={styles.section__title}>{section.title}</h3>
                  <div className={styles.section__content}>
                    {section.content &&
                      section.content.map((paragraph, index) => (
                        <p key={index} className={styles.section__paragraph}>
                          {renderText(paragraph)}
                        </p>
                      ))}
                    {section.listItems && (
                      <ul className={styles.section__list}>
                        {section.listItems.map((item, index) => (
                          <li key={index} className={styles.section__listItem}>
                            {renderText(item)}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.contentAfterList &&
                      section.contentAfterList.map((paragraph, index) => (
                        <p key={index} className={styles.section__paragraph}>
                          {renderText(paragraph)}
                        </p>
                      ))}
                    {section.listItems2 && (
                      <ul className={styles.section__list}>
                        {section.listItems2.map((item, index) => (
                          <li key={index} className={styles.section__listItem}>
                            {renderText(item)}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.table && (
                      <div className={styles.section__tableWrapper}>
                        <table className={styles.section__table}>
                          <thead>
                            <tr>
                              {section.table.headers.map((header, index) => (
                                <th
                                  key={index}
                                  className={styles.section__tableHeader}
                                >
                                  {renderText(header)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rowIndex) => (
                              <tr
                                key={rowIndex}
                                className={styles.section__tableRow}
                              >
                                {row.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className={styles.section__tableCell}
                                  >
                                    {cell ? renderText(cell) : "\u00A0"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {section.contentAfterTable &&
                      section.contentAfterTable.map((paragraph, index) => (
                        <p key={index} className={styles.section__paragraph}>
                          {renderText(paragraph)}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Service-Specific Schedules */}
            {termsData.schedules && termsData.schedules.length > 0 && (
              <div className={styles.content__section}>
                <h2 className={styles.content__sectionTitle}>
                  Service-Specific Terms
                </h2>
                <p className={styles.content__intro}>
                  The following schedules contain specific terms applicable to
                  each service category. Please review the terms relevant to the
                  services you intend to use.
                </p>
                {termsData.schedules.map((schedule) => (
                  <div key={schedule.id} className={styles.schedule}>
                    <h3 className={styles.schedule__title}>{schedule.title}</h3>
                    {schedule.sections.map((section) => (
                      <div key={section.id} className={styles.section}>
                        <h4 className={styles.section__subtitle}>
                          {section.title}
                        </h4>
                        <div className={styles.section__content}>
                          {section.content.map((paragraph, index) => (
                            <p
                              key={index}
                              className={styles.section__paragraph}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Links */}
            <div className={styles.quickLinks}>
              <h3 className={styles.quickLinks__title}>Related Documents</h3>
              <div className={styles.quickLinks__grid}>
                <Link
                  href="/privacy-policy"
                  className={styles.quickLinks__card}
                >
                  <div className={styles.quickLinks__icon}>🔒</div>
                  <h4 className={styles.quickLinks__cardTitle}>
                    Privacy & Cookie Policy
                  </h4>
                  <p className={styles.quickLinks__cardDesc}>
                    Learn how we protect and use your data as a registered user
                  </p>
                </Link>
                <Link
                  href="/privacy-notice"
                  className={styles.quickLinks__card}
                >
                  <div className={styles.quickLinks__icon}>👁️</div>
                  <h4 className={styles.quickLinks__cardTitle}>
                    Privacy Notice
                  </h4>
                  <p className={styles.quickLinks__cardDesc}>
                    Information for website visitors about data collection
                  </p>
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.contact}>
              <h3 className={styles.contact__title}>Questions?</h3>
              <p className={styles.contact__text}>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className={styles.contact__info}>
                <p>
                  <strong>Email:</strong> {ContactDetails.EMAIL}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${ContactDetails.PHONE}`}>
                    {ContactDetails.PHONE}
                  </a>
                </p>
                <p>
                  <strong>Support:</strong>{" "}
                  <Link href="/contact">Visit our Contact Page</Link>
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className={styles.lastUpdated}>
              <p className={styles.lastUpdated__text}>
                <strong>Last updated:</strong> 31st October 2025
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
