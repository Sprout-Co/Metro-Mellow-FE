"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./services.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import { motion } from "framer-motion";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import ServiceModal from "./_components/ServiceModal/ServiceModal";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      name: "House Cleaning",
      description:
        "Complete house cleaning service including dusting, vacuuming, mopping, and bathroom sanitization.",
      price: 120,
      duration: "3 hours",
      icon: "🧹",
      type: "cleaning",
    },
    {
      id: 2,
      name: "Laundry Service",
      description:
        "Wash, dry, and fold clothes with premium detergents and fabric softeners.",
      price: 80,
      duration: "2 hours",
      icon: "👕",
      type: "laundry",
    },
    {
      id: 3,
      name: "Meal Preparation",
      description:
        "Professional chef prepares meals for the week according to dietary preferences.",
      price: 150,
      duration: "4 hours",
      icon: "🍳",
      type: "cooking",
    },
    {
      id: 4,
      name: "Pest Control",
      description:
        "Comprehensive pest control services using eco-friendly solutions.",
      price: 180,
      duration: "2 hours",
      icon: "🐜",
      type: "pest-control",
    },
    {
      id: 5,
      name: "Grocery Shopping",
      description:
        "Shopping for groceries based on your list and delivering to your home.",
      price: 60,
      duration: "2 hours",
      icon: "🛒",
      type: "errands",
    },
  ];

  const getServiceTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      cleaning: styles.services_page__service_card__badge_cleaning,
      laundry: styles.services_page__service_card__badge_laundry,
      cooking: styles.services_page__service_card__badge_cooking,
      "pest-control": styles.services_page__service_card__badge_pest,
      errands: styles.services_page__service_card__badge_errands,
    };

    return colorMap[type] || "";
  };

  return (
    <AdminDashboardLayout
      title="Services Management"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Services", path: "/admin/services" },
      ]}
    >
      <div className={styles.services_page}>
        <div className={styles.services_page__header}>
          <div>
            <h2 className={styles.services_page__title}>All Services</h2>
            <p className={styles.services_page__subtitle}>
              Manage your service offerings
            </p>
          </div>

          <Button variant="primary" size="medium" icon="+">
            Add New Service
          </Button>
        </div>

        <div className={styles.services_page__grid}>
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={styles.services_page__service_card}>
                <div className={styles.services_page__service_card__header}>
                  <div className={styles.services_page__service_card__icon}>
                    {service.icon}
                  </div>
                  <span
                    className={`${styles.services_page__service_card__badge} ${getServiceTypeColor(service.type)}`}
                  >
                    {service.type}
                  </span>
                </div>

                <h3 className={styles.services_page__service_card__title}>
                  {service.name}
                </h3>
                <p className={styles.services_page__service_card__description}>
                  {service.description}
                </p>

                <div className={styles.services_page__service_card__details}>
                  <div className={styles.services_page__service_card__price}>
                    <span
                      className={
                        styles.services_page__service_card__price_label
                      }
                    >
                      Price
                    </span>
                    <span
                      className={
                        styles.services_page__service_card__price_value
                      }
                    >
                      ${service.price}
                    </span>
                  </div>
                  <div className={styles.services_page__service_card__duration}>
                    <span
                      className={
                        styles.services_page__service_card__duration_label
                      }
                    >
                      Duration
                    </span>
                    <span
                      className={
                        styles.services_page__service_card__duration_value
                      }
                    >
                      {service.duration}
                    </span>
                  </div>
                </div>

                <div className={styles.services_page__service_card__actions}>
                  <Button variant="outline" size="small">
                    Edit
                  </Button>
                  <Button variant="tertiary" size="small">
                    Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
