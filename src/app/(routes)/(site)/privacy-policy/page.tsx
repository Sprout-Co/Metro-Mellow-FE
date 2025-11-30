import { Metadata } from "next";
import styles from "./PrivacyPolicy.module.scss";
import privacyData from "@/data/legal/privacy-cookie-policy.json";
import StructuredData from "@/components/common/SEO/StructuredData";
import { createBreadcrumbSchema } from "@/utils/seoHelpers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | Metromellow Data Protection",
  description:
    "Read Metromellow's Privacy & Cookie Policy for registered users. Learn how we collect, use, protect, and manage your personal data on our home services platform.",
  keywords:
    "Metromellow privacy policy, cookie policy, data protection, user privacy, personal data, NDPA compliance, Nigeria data protection",
  alternates: {
    canonical: "https://metromellow.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy & Cookie Policy | Metromellow",
    description:
      "Learn how Metromellow protects and manages your personal data as a registered user.",
    url: "https://metromellow.com/privacy-policy",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow Privacy Policy",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Privacy Policy", url: "https://metromellow.com/privacy-policy" },
  ];

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />

      <main className={styles.privacyPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.hero__container}>
            <div className={styles.hero__content}>
              <div className={styles.hero__badge}>
                <span className={styles.hero__badgeIcon}>🔒</span>
                <span className={styles.hero__badgeText}>
                  {privacyData.subtitle}
                </span>
              </div>
              <h1 className={styles.hero__title}>{privacyData.title}</h1>
              <p className={styles.hero__description}>
                We are committed to protecting your privacy and ensuring the
                security of your personal information. This policy explains how
                we collect, use, and safeguard your data.
              </p>
              <p className={styles.hero__meta}>
                <span className={styles.hero__label}>Effective from:</span>{" "}
                {privacyData.effectiveDate}
              </p>
              <p className={styles.hero__meta}>
                <span className={styles.hero__label}>Version:</span>{" "}
                {privacyData.version}
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
              <Link
                href="/privacy-policy"
                className={`${styles.legalNav__link} ${styles.legalNav__link_active}`}
              >
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
            {/* Info Banner */}
            <div className={styles.infoBanner}>
              <div className={styles.infoBanner__icon}>ℹ️</div>
              <div className={styles.infoBanner__content}>
                <h3 className={styles.infoBanner__title}>
                  Important Information
                </h3>
                <p className={styles.infoBanner__text}>
                  This Privacy & Cookie Policy applies to registered users who
                  have created accounts on our platform. If you're a general
                  website visitor,{" "}
                  <Link href="/privacy-notice">view our Privacy Notice</Link>{" "}
                  instead.
                </p>
              </div>
            </div>

            {/* Main Sections */}
            <div className={styles.content__section}>
              {privacyData.sections.map((section) => (
                <div key={section.id} className={styles.section}>
                  <h3 className={styles.section__title}>{section.title}</h3>
                  <div className={styles.section__content}>
                    {section.content.map((paragraph, index) => (
                      <p key={index} className={styles.section__paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Data Rights Highlight */}
            <div className={styles.rightsHighlight}>
              <h3 className={styles.rightsHighlight__title}>
                Your Privacy Rights
              </h3>
              <div className={styles.rightsHighlight__grid}>
                <div className={styles.rightsHighlight__card}>
                  <div className={styles.rightsHighlight__cardIcon}>👁️</div>
                  <h4 className={styles.rightsHighlight__cardTitle}>
                    Access & Update
                  </h4>
                  <p className={styles.rightsHighlight__cardDesc}>
                    View and update your personal information anytime through
                    your account settings
                  </p>
                </div>
                <div className={styles.rightsHighlight__card}>
                  <div className={styles.rightsHighlight__cardIcon}>🗑️</div>
                  <h4 className={styles.rightsHighlight__cardTitle}>
                    Delete Data
                  </h4>
                  <p className={styles.rightsHighlight__cardDesc}>
                    Request deletion of your account and personal information at
                    any time
                  </p>
                </div>
                <div className={styles.rightsHighlight__card}>
                  <div className={styles.rightsHighlight__cardIcon}>📥</div>
                  <h4 className={styles.rightsHighlight__cardTitle}>
                    Data Portability
                  </h4>
                  <p className={styles.rightsHighlight__cardDesc}>
                    Request a copy of your data in a portable format
                  </p>
                </div>
                <div className={styles.rightsHighlight__card}>
                  <div className={styles.rightsHighlight__cardIcon}>🚫</div>
                  <h4 className={styles.rightsHighlight__cardTitle}>
                    Opt-Out
                  </h4>
                  <p className={styles.rightsHighlight__cardDesc}>
                    Withdraw consent for marketing and optional data processing
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
                  href="/privacy-notice"
                  className={styles.relatedDocs__card}
                >
                  <div className={styles.relatedDocs__icon}>🌐</div>
                  <h4 className={styles.relatedDocs__cardTitle}>
                    Privacy Notice
                  </h4>
                  <p className={styles.relatedDocs__cardDesc}>
                    Information for website visitors
                  </p>
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.contact}>
              <h3 className={styles.contact__title}>Privacy Questions?</h3>
              <p className={styles.contact__text}>
                If you have questions about this Privacy & Cookie Policy or how
                we handle your data, our Data Protection team is here to help.
              </p>
              <div className={styles.contact__info}>
                <p>
                  <strong>Email:</strong> privacy@metromellow.com
                </p>
                <p>
                  <strong>Phone:</strong> +234 [Insert number]
                </p>
                <p>
                  <strong>General Support:</strong>{" "}
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

