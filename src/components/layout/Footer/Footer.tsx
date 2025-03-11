import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Button from "@/components/ui/Button/Button";
interface QuickLink {
    text: string;
    link: string;
}

const footerQuickLinks: QuickLink[] = [
    { text: "Residential Home Cleaning", link: "/services/cleaning" },
    { text: "Commercial Cleaning", link: "" },
    { text: "Move In / Move Out Cleaning", link: "" },
    { text: "Deep Cleaning", link: "" },
    { text: "Laundry Services", link: "" },
];
const companyQuickLinks: QuickLink[] = [
    { text: "Home", link: "" },
    { text: "Services", link: "" },
    { text: "About us", link: "" },
    { text: "Plans", link: "" },
    { text: "Commercial", link: "" },
    { text: "Career", link: "" },
];


export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__main}>
                    <div className={styles.footer__brand}>
                        <h2 className={styles.footer__logo}>Urban Serve</h2>
                        <p className={styles.footer__tagline}>
                            Your Trusted Partner for Quality, Trust and Exceptional Services
                        </p>
                        <div className={styles.footer__cta}>
                            <Button variant="outline" size="sm" href="/services">
                                Get Started
                            </Button>
                        </div>
                    </div>

                    <div className={styles.footer__links}>
                        <div className={styles.footer__col}>
                            <h3 className={styles.footer__colTitle}>Contact</h3>
                            <ul className={styles.footer__list}>
                                <li className={styles.footer__listItem}>
                                    <a href="tel:+1234567890" className={styles.footer__link}>
                                        +1234567890
                                    </a>
                                </li>
                                <li className={styles.footer__listItem}>
                                    <a href="tel:+1234567890" className={styles.footer__link}>
                                        +1234567890
                                    </a>
                                </li>
                                <li className={styles.footer__listItem}>
                                    <a
                                        href="mailto:info@urbanserve.com"
                                        className={styles.footer__link}
                                    >
                                        info@urbanserve.com
                                    </a>
                                </li>
                                <li className={styles.footer__listItem}>
                                    <span className={styles.footer__text}>Address goes here</span>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.footer__col}>
                            <h3 className={styles.footer__colTitle}>Company</h3>
                            <ul className={styles.footer__list}>
                                {companyQuickLinks.map((i, index) => (

                                    <li className={styles.footer__listItem} key={index}>
                                        <Link href={i.link} className={styles.footer__link}>
                                            {i.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.footer__col}>
                            <h3 className={styles.footer__colTitle}>Quick Links</h3>
                            <ul className={styles.footer__list}>
                                {footerQuickLinks.map((i, index) => (

                                    <li className={styles.footer__listItem} key={index}>
                                        <Link href={i.link} className={styles.footer__link}>
                                            {i.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.footer__bottom}>
                    <div className={styles.footer__copyright}>
                        <Link href="/privacy" className={styles.footer__smallLink}>
                            Privacy policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
