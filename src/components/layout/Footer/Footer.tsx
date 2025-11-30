"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Footer.module.scss";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/constants/routes";
import { Instagram } from "lucide-react";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className={styles.footerSection}>
      <SignaturePattern />
      <div className={styles.footerContent}>
        <div className={styles.leftCol}>
          <Link href="/" className={styles.footer__brand}>
            <div className={styles.footer__logo}>
              <Image
                src="/images/brand/brand-logo/transparent-bg/yellow.png"
                alt="Metromellow"
                width={140}
                height={40}
                className={styles.footer__logo}
              />
            </div>
          </Link>
          <p className={styles.contactPrompt}>Questions? Comments? Concerns?</p>
          <Button variant="white" size="md">
            Chat with us on WhatsApp
          </Button>
        </div>
        <nav className={styles.linksCol} aria-label="Footer Navigation">
          <div className={styles.colGroup}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul>
              <li>
                <Link href={Routes.ABOUT}>About</Link>
              </li>
              <li>
                <Link href="/subscriptions">Subscriptions</Link>
              </li>
              <li>
                <Link href={Routes.CONTACT}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className={styles.colGroup}>
            <h3 className={styles.colTitle}>Legal</h3>
            <ul>
              <li>
                <Link href={Routes.TERMS}>Terms of Service</Link>
              </li>
              <li>
                <Link href={Routes.PRIVACY}>Privacy & Cookie Policy</Link>
              </li>
              <li>
                <Link href={Routes.PRIVACY_NOTICE}>Privacy Notice</Link>
              </li>
            </ul>
          </div>
          <div className={styles.colGroup}>
            <h3 className={styles.colTitle}>Services</h3>
            <ul>
              <li>
                <Link href="/services/food">Cooking</Link>
              </li>
              <li>
                <Link href="/services/laundry">Laundry</Link>
              </li>
              <li>
                <Link href="/services/cleaning">Cleaning</Link>
              </li>
              <li>
                <Link href="/services/pest-control">Pests</Link>
              </li>
            </ul>
          </div>
          <div className={styles.colGroup}>
            <h3 className={styles.colTitle}>Community</h3>
            <ul className={styles.socialList}>
              <li>
                <a
                  href="https://x.com/metromellowhq"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/metromellowhq"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@metromellowhq"
                  aria-label="Youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
                  </svg>{" "}
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/metromellowhq/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/metromellow-ltd/"
                  aria-label="Linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="6"
                      width="4"
                      height="4"
                      rx="2"
                      fill="currentColor"
                    />
                  </svg>{" "}
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
}
