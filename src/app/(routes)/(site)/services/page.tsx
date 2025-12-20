import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./ServicesPage.module.scss";
import {
  StructuredData,
  createLocalBusinessSchema,
  createBreadcrumbSchema,
} from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Professional Home Services in Lagos | Cleaning, Food & More | Metromellow",
  description:
    "Explore Metromellow's professional home services including house cleaning, laundry, pest control, and fresh food delivery in Lagos. Book trusted professionals today.",
  keywords:
    "home services Lagos, cleaning services, laundry service, pest control Lagos, food delivery, house cleaning, professional cleaners, Metromellow services",
  alternates: {
    canonical: "https://metromellow.com/services",
  },
  openGraph: {
    title: "Professional Home Services in Lagos | Metromellow",
    description:
      "Explore Metromellow's professional home services including house cleaning, laundry, pest control, and fresh food delivery in Lagos.",
    url: "https://metromellow.com/services",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow Professional Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Home Services in Lagos | Metromellow",
    description:
      "Explore Metromellow's professional home services including house cleaning, laundry, pest control, and fresh food delivery in Lagos.",
    images: ["/images/brand/brand-logo/solid-bg/green-bg.png"],
  },
};

const services = [
  {
    title: "Professional Cleaning",
    description:
      "Expert house and office cleaning services. Deep cleaning, regular maintenance, and move-in/out cleaning available.",
    href: "/services/cleaning",
    image: "/images/cleaning/cleaning1.jpg",
  },
  {
    title: "Food Delivery",
    description:
      "Fresh, nutritious meals prepared by professional chefs and delivered straight to your door.",
    href: "/services/food",
    image: "/images/food/jollof-rice.png",
  },
  {
    title: "Laundry Service",
    description:
      "Professional laundry, dry cleaning, and ironing services with convenient pickup and delivery.",
    href: "/services/laundry",
    image: "/images/home/home1.jpg",
  },
  {
    title: "Pest Control",
    description:
      "Safe and effective pest elimination for residential and commercial properties using eco-friendly methods.",
    href: "/services/pest-control",
    image: "/images/pest-control/p1.jpeg",
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Services", url: "https://metromellow.com/services" },
  ];

  return (
    <>
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          name: "Metromellow Services",
          description:
            "Professional home services in Lagos including cleaning, laundry, food delivery, and pest control.",
          url: "https://metromellow.com/services",
        })}
      />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1>Our Services</h1>
          <p>
            Professional home services tailored to your needs. Fast, reliable,
            and trusted across Lagos.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{service.title}</h2>
                <p className={styles.description}>{service.description}</p>
                <span className={styles.linkText}>
                  Learn More <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
