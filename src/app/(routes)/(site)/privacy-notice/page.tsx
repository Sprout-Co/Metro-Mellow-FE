import { Metadata } from "next";
import styles from "./PrivacyNotice.module.scss";
import privacyNoticeData from "@/data/legal/privacy-notice.json";
import StructuredData from "@/components/common/SEO/StructuredData";
import { createBreadcrumbSchema } from "@/utils/seoHelpers";
import Link from "next/link";

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
  title: "Privacy Notice | Metromellow Website Visitor Privacy",
  description:
    "Read Metromellow's Privacy Notice for website visitors. Learn how we collect and use data when you browse our site, including cookies and tracking technologies.",
  keywords:
    "Metromellow privacy notice, website privacy, visitor privacy, cookies, tracking, browsing data",
  alternates: {
    canonical: "https://metromellow.com/privacy-notice",
  },
  openGraph: {
    title: "Privacy Notice | Metromellow",
    description:
      "Learn how Metromellow handles data for general website visitors.",
    url: "https://metromellow.com/privacy-notice",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow Privacy Notice",
      },
    ],
  },
};

export default function PrivacyNoticePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Privacy Notice", url: "https://metromellow.com/privacy-notice" },
  ];

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />

      <main className={styles.noticePage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.hero__container}>
            <div className={styles.hero__content}>
              <div className={styles.hero__badge}>
                <span className={styles.hero__badgeIcon}>👁️</span>
                <span className={styles.hero__badgeText}>
                  {privacyNoticeData.subtitle}
                </span>
              </div>
              <h1 className={styles.hero__title}>
                <span className={styles.hero__titleAccent}>Metromellow</span>{" "}
                Privacy Notice
              </h1>
              <p className={styles.hero__description}>
                This notice explains how we collect and use information when you
                visit our website. We value your privacy and are transparent
                about our data practices.
              </p>
              <p className={styles.hero__meta}>
                <span className={styles.hero__label}>Effective from:</span>{" "}
                {privacyNoticeData.effectiveDate}
              </p>
              <p className={styles.hero__meta}>
                <span className={styles.hero__label}>Version:</span>{" "}
                {privacyNoticeData.version}
              </p>
            </div>
          </div>
        </section>

        {/* Legal Navigation */}
        <section className={styles.legalNav}>
          <div className={styles.legalNav__container}>
            <nav className={styles.legalNav__links}>
              <Link href="/terms" className={styles.legalNav__link}>
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className={styles.legalNav__link}>
                Privacy & Cookie Policy
              </Link>
              <Link
                href="/privacy-notice"
                className={`${styles.legalNav__link} ${styles.legalNav__link_active}`}
              >
                Privacy Notice
              </Link>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.content}>
          <div className={styles.content__container}>
            {/* Info Banner */}
            <div className={styles.infoBanner}>
              <div className={styles.infoBanner__icon}>🌐</div>
              <div className={styles.infoBanner__content}>
                <h3 className={styles.infoBanner__title}>
                  For Website Visitors
                </h3>
                <p className={styles.infoBanner__text}>
                  This notice applies to general visitors browsing our website.
                  If you have a registered account with us, please review our{" "}
                  <Link href="/privacy-policy">
                    Privacy & Cookie Policy for Users
                  </Link>{" "}
                  instead.
                </p>
              </div>
            </div>

            {/* Main Sections */}
            <div className={styles.content__section}>
              {privacyNoticeData.sections.map((section) => (
                <div key={section.id} className={styles.section}>
                  <h3 className={styles.section__title}>{section.title}</h3>
                  <div className={styles.section__content}>
                    {section.content && section.content.map((paragraph, index) => (
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
                  </div>
                </div>
              ))}
            </div>

            {/* Cookie Management Guide */}
            <div className={styles.cookieGuide}>
              <h3 className={styles.cookieGuide__title}>
                Managing Your Cookie Preferences
              </h3>
              <p className={styles.cookieGuide__intro}>
                You have control over the cookies placed on your device. Here's
                how to manage them in popular browsers:
              </p>
              <div className={styles.cookieGuide__grid}>
                <div className={styles.cookieGuide__card}>
                  <div className={styles.cookieGuide__cardIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="32"
                      height="32"
                    >
                      <circle cx="12" cy="12" r="10" fill="#4285F4" />
                      <circle cx="12" cy="12" r="6" fill="#34A853" />
                      <circle cx="12" cy="12" r="3" fill="#FBBC05" />
                    </svg>
                  </div>
                  <h4 className={styles.cookieGuide__cardTitle}>
                    Google Chrome
                  </h4>
                  <p className={styles.cookieGuide__cardDesc}>
                    Settings → Privacy and Security → Cookies and other site
                    data
                  </p>
                </div>
                <div className={styles.cookieGuide__card}>
                  <div className={styles.cookieGuide__cardIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="32"
                      height="32"
                    >
                      <circle cx="12" cy="12" r="10" fill="#FF7139" />
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                        fill="#FF7139"
                      />
                    </svg>
                  </div>
                  <h4 className={styles.cookieGuide__cardTitle}>
                    Mozilla Firefox
                  </h4>
                  <p className={styles.cookieGuide__cardDesc}>
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div className={styles.cookieGuide__card}>
                  <div className={styles.cookieGuide__cardIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="32"
                      height="32"
                    >
                      <circle cx="12" cy="12" r="10" fill="#0078D4" />
                    </svg>
                  </div>
                  <h4 className={styles.cookieGuide__cardTitle}>
                    Microsoft Edge
                  </h4>
                  <p className={styles.cookieGuide__cardDesc}>
                    Settings → Cookies and site permissions → Manage and delete
                    cookies
                  </p>
                </div>
                <div className={styles.cookieGuide__card}>
                  <div className={styles.cookieGuide__cardIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="32"
                      height="32"
                    >
                      <circle cx="12" cy="12" r="10" fill="#006CFF" />
                    </svg>
                  </div>
                  <h4 className={styles.cookieGuide__cardTitle}>
                    Safari
                  </h4>
                  <p className={styles.cookieGuide__cardDesc}>
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
              </div>
            </div>

            {/* Related Documents */}
            <div className={styles.relatedDocs}>
              <h3 className={styles.relatedDocs__title}>Related Documents</h3>
              <div className={styles.relatedDocs__grid}>
                <Link href="/terms" className={styles.relatedDocs__card}>
                  <div className={styles.relatedDocs__icon}>📄</div>
                  <h4 className={styles.relatedDocs__cardTitle}>
                    Terms of Service
                  </h4>
                  <p className={styles.relatedDocs__cardDesc}>
                    Review our complete terms and conditions
                  </p>
                </Link>
                <Link
                  href="/privacy-policy"
                  className={styles.relatedDocs__card}
                >
                  <div className={styles.relatedDocs__icon}>🔒</div>
                  <h4 className={styles.relatedDocs__cardTitle}>
                    Privacy & Cookie Policy
                  </h4>
                  <p className={styles.relatedDocs__cardDesc}>
                    For registered users and app users
                  </p>
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.contact}>
              <h3 className={styles.contact__title}>Questions About Privacy?</h3>
              <p className={styles.contact__text}>
                If you have questions about this Privacy Notice or how we handle
                visitor data, we're here to help.
              </p>
              <div className={styles.contact__info}>
                <p>
                  <strong>Privacy Email:</strong> team@metromellow.com
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+2347049452585">+2347049452585</a>
                </p>
                <p>
                  <strong>General Inquiries:</strong>{" "}
                  <Link href="/contact">Contact Us</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

