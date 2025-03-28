"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./services.module.scss";
import Card from "@/app/(routes)/(app)/admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/admin/_components/UI/Button/Button";
import { motion } from "framer-motion";

export default function ServiceMasterPage() {
  const [activeTab, setActiveTab] = useState("categories");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock service categories
  const [serviceCategories, setServiceCategories] = useState([
    {
      id: 1,
      name: "Cleaning Services",
      description: "Comprehensive cleaning services for homes and offices",
      icon: "🧹",
      active: true,
      services: 8,
    },
    {
      id: 2,
      name: "Laundry Services",
      description: "Laundry and clothing care services",
      icon: "👕",
      active: true,
      services: 4,
    },
    {
      id: 3,
      name: "Cooking Services",
      description: "Meal preparation and cooking assistance",
      icon: "🍳",
      active: true,
      services: 3,
    },
    {
      id: 4,
      name: "Errands",
      description: "Shopping and errands assistance",
      icon: "🛒",
      active: true,
      services: 2,
    },
    {
      id: 5,
      name: "Pest Control",
      description: "Pest prevention and extermination services",
      icon: "🐜",
      active: true,
      services: 3,
    },
  ]);

  // Mock pricing tiers
  const [pricingTiers, setPricingTiers] = useState([
    {
      id: 1,
      name: "Standard",
      description: "Regular service at standard rates",
      multiplier: 1.0,
      default: true,
    },
    {
      id: 2,
      name: "Premium",
      description: "Enhanced service with premium quality",
      multiplier: 1.5,
      default: false,
    },
    {
      id: 3,
      name: "Express",
      description: "Expedited service with priority scheduling",
      multiplier: 1.75,
      default: false,
    },
    {
      id: 4,
      name: "Weekend",
      description: "Service provided on weekends",
      multiplier: 1.25,
      default: false,
    },
    {
      id: 5,
      name: "Holiday",
      description: "Service provided on holidays",
      multiplier: 2.0,
      default: false,
    },
  ]);

  // Mock service discount settings
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: "New Customer",
      description: "10% off first booking",
      type: "percentage",
      value: 10,
      active: true,
      applyTo: "First booking only",
      code: "WELCOME10",
    },
    {
      id: 2,
      name: "Senior Discount",
      description: "15% off for seniors",
      type: "percentage",
      value: 15,
      active: true,
      applyTo: "All bookings",
      code: "SENIOR15",
    },
    {
      id: 3,
      name: "Recurring Booking",
      description: "$20 off monthly subscriptions",
      type: "fixed",
      value: 20,
      active: true,
      applyTo: "Subscription bookings",
      code: "MONTHLY20",
    },
    {
      id: 4,
      name: "Summer Special",
      description: "25% off outdoor services",
      type: "percentage",
      value: 25,
      active: false,
      applyTo: "Selected services",
      code: "SUMMER25",
    },
  ]);

  // Mock service standards
  const serviceStandards = [
    {
      id: 1,
      name: "Standard Cleaning Protocol",
      description: "Basic cleaning procedures and quality standards",
      appliesTo: "All cleaning services",
      lastUpdated: "2024-04-10",
    },
    {
      id: 2,
      name: "Eco-Friendly Guidelines",
      description: "Procedures for environmentally friendly services",
      appliesTo: "All services",
      lastUpdated: "2024-03-22",
    },
    {
      id: 3,
      name: "Safety Protocols",
      description: "Safety standards for staff and customers",
      appliesTo: "All services",
      lastUpdated: "2024-05-01",
    },
    {
      id: 4,
      name: "Customer Interaction Guidelines",
      description: "Standards for staff-customer interactions",
      appliesTo: "All services",
      lastUpdated: "2024-02-15",
    },
    {
      id: 5,
      name: "Quality Assurance Checklist",
      description: "Verification steps to ensure service quality",
      appliesTo: "All services",
      lastUpdated: "2024-04-28",
    },
  ];

  // Filter categories based on search query
  const filteredCategories = serviceCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter pricing tiers based on search query
  const filteredPricingTiers = pricingTiers.filter(
    (tier) =>
      tier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tier.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter discounts based on search query
  const filteredDiscounts = discounts.filter(
    (discount) =>
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter standards based on search query
  const filteredStandards = serviceStandards.filter(
    (standard) =>
      standard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      standard.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      standard.appliesTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to toggle category active status
  const toggleCategoryStatus = (id: number) => {
    setServiceCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, active: !category.active }
          : category
      )
    );
  };

  // Function to toggle discount active status
  const toggleDiscountStatus = (id: number) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.id === id
          ? { ...discount, active: !discount.active }
          : discount
      )
    );
  };

  return (
    <SuperAdminDashboardLayout
      title="Service Master Data"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Service Master", path: "/super-admin/services" },
      ]}
    >
      <div className={styles.services_page}>
        <div className={styles.services_page__header}>
          <div>
            <h2 className={styles.services_page__title}>Service Master Data</h2>
            <p className={styles.services_page__description}>
              Manage service categories, pricing, and standards
            </p>
          </div>

          <div className={styles.services_page__actions}>
            <Button variant="primary" size="medium">
              {activeTab === "categories"
                ? "Add Category"
                : activeTab === "pricing"
                  ? "Add Pricing Tier"
                  : activeTab === "discounts"
                    ? "Add Discount"
                    : "Add Standard"}
            </Button>
          </div>
        </div>

        <div className={styles.services_page__tabs}>
          <button
            className={`${styles.services_page__tab} ${activeTab === "categories" ? styles["services_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            Service Categories
          </button>
          <button
            className={`${styles.services_page__tab} ${activeTab === "pricing" ? styles["services_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("pricing")}
          >
            Pricing Tiers
          </button>
          <button
            className={`${styles.services_page__tab} ${activeTab === "discounts" ? styles["services_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("discounts")}
          >
            Discounts
          </button>
          <button
            className={`${styles.services_page__tab} ${activeTab === "standards" ? styles["services_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("standards")}
          >
            Service Standards
          </button>
        </div>

        <div className={styles.services_page__search}>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.services_page__search_input}
          />
        </div>

        {activeTab === "categories" && (
          <div className={styles.services_page__grid}>
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.services_page__category_card}>
                  <div className={styles.services_page__category_header}>
                    <div className={styles.services_page__category_icon}>
                      {category.icon}
                    </div>
                    <div className={styles.services_page__category_status}>
                      <div className={styles.services_page__status_toggle}>
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={category.active}
                          onChange={() => toggleCategoryStatus(category.id)}
                          className={styles.services_page__toggle_input}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className={styles.services_page__toggle_label}
                        >
                          <span
                            className={styles.services_page__toggle_button}
                          ></span>
                        </label>
                      </div>
                      <span className={styles.services_page__status_text}>
                        {category.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.services_page__category_name}>
                    {category.name}
                  </h3>
                  <p className={styles.services_page__category_description}>
                    {category.description}
                  </p>

                  <div className={styles.services_page__category_meta}>
                    <span className={styles.services_page__services_count}>
                      {category.services} Services
                    </span>
                  </div>

                  <div className={styles.services_page__category_actions}>
                    <button className={styles.services_page__action_button}>
                      Edit
                    </button>
                    <button className={styles.services_page__action_button}>
                      Manage Services
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card
                className={`${styles.services_page__category_card} ${styles["services_page__category_card--new"]}`}
              >
                <div className={styles.services_page__new_category}>
                  <div className={styles.services_page__new_icon}>+</div>
                  <h3 className={styles.services_page__new_title}>
                    Add New Category
                  </h3>
                  <p className={styles.services_page__new_description}>
                    Create a new service category
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className={styles.services_page__pricing_container}>
            <Card className={styles.services_page__pricing_card}>
              <div className={styles.services_page__pricing_header}>
                <h3 className={styles.services_page__pricing_title}>
                  Pricing Tiers
                </h3>
                <p className={styles.services_page__pricing_description}>
                  Define different pricing levels for your services
                </p>
              </div>

              <div className={styles.services_page__pricing_list}>
                <div className={styles.services_page__pricing_header_row}>
                  <div className={styles.services_page__pricing_column}>
                    Tier Name
                  </div>
                  <div className={styles.services_page__pricing_column}>
                    Description
                  </div>
                  <div className={styles.services_page__pricing_column}>
                    Price Multiplier
                  </div>
                  <div className={styles.services_page__pricing_column}>
                    Default
                  </div>
                  <div className={styles.services_page__pricing_column}>
                    Actions
                  </div>
                </div>

                {filteredPricingTiers.map((tier) => (
                  <motion.div
                    key={tier.id}
                    className={styles.services_page__pricing_row}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.services_page__pricing_column}>
                      <span className={styles.services_page__pricing_name}>
                        {tier.name}
                      </span>
                    </div>
                    <div className={styles.services_page__pricing_column}>
                      <span className={styles.services_page__pricing_desc}>
                        {tier.description}
                      </span>
                    </div>
                    <div className={styles.services_page__pricing_column}>
                      <span className={styles.services_page__multiplier}>
                        x{tier.multiplier.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.services_page__pricing_column}>
                      <span className={styles.services_page__default_badge}>
                        {tier.default ? "Default" : "—"}
                      </span>
                    </div>
                    <div className={styles.services_page__pricing_column}>
                      <div className={styles.services_page__pricing_actions}>
                        <button
                          className={styles.services_page__pricing_action}
                        >
                          Edit
                        </button>
                        {!tier.default && (
                          <button
                            className={styles.services_page__pricing_action}
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={styles.services_page__pricing_footer}>
                <Button variant="secondary" size="small">
                  Add Pricing Tier
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "discounts" && (
          <div className={styles.services_page__grid}>
            {filteredDiscounts.map((discount) => (
              <motion.div
                key={discount.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.services_page__discount_card}>
                  <div className={styles.services_page__discount_header}>
                    <h3 className={styles.services_page__discount_name}>
                      {discount.name}
                    </h3>
                    <div className={styles.services_page__discount_status}>
                      <div className={styles.services_page__status_toggle}>
                        <input
                          type="checkbox"
                          id={`discount-${discount.id}`}
                          checked={discount.active}
                          onChange={() => toggleDiscountStatus(discount.id)}
                          className={styles.services_page__toggle_input}
                        />
                        <label
                          htmlFor={`discount-${discount.id}`}
                          className={styles.services_page__toggle_label}
                        >
                          <span
                            className={styles.services_page__toggle_button}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <p className={styles.services_page__discount_description}>
                    {discount.description}
                  </p>

                  <div className={styles.services_page__discount_details}>
                    <div className={styles.services_page__discount_detail}>
                      <span className={styles.services_page__detail_label}>
                        Value:
                      </span>
                      <span className={styles.services_page__detail_value}>
                        {discount.type === "percentage"
                          ? `${discount.value}%`
                          : `$${discount.value}`}
                      </span>
                    </div>

                    <div className={styles.services_page__discount_detail}>
                      <span className={styles.services_page__detail_label}>
                        Applies To:
                      </span>
                      <span className={styles.services_page__detail_value}>
                        {discount.applyTo}
                      </span>
                    </div>

                    <div className={styles.services_page__discount_detail}>
                      <span className={styles.services_page__detail_label}>
                        Code:
                      </span>
                      <span className={styles.services_page__discount_code}>
                        {discount.code}
                      </span>
                    </div>
                  </div>

                  <div className={styles.services_page__discount_actions}>
                    <button className={styles.services_page__action_button}>
                      Edit
                    </button>
                    <button className={styles.services_page__action_button}>
                      {discount.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card
                className={`${styles.services_page__discount_card} ${styles["services_page__discount_card--new"]}`}
              >
                <div className={styles.services_page__new_discount}>
                  <div className={styles.services_page__new_icon}>+</div>
                  <h3 className={styles.services_page__new_title}>
                    Add New Discount
                  </h3>
                  <p className={styles.services_page__new_description}>
                    Create a new discount or promotion
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "standards" && (
          <Card className={styles.services_page__standards_card}>
            <div className={styles.services_page__standards_header}>
              <h3 className={styles.services_page__standards_title}>
                Service Standards & Protocols
              </h3>
              <p className={styles.services_page__standards_description}>
                Define quality and operational standards for services
              </p>
            </div>

            <div className={styles.services_page__standards_list}>
              {filteredStandards.map((standard) => (
                <motion.div
                  key={standard.id}
                  className={styles.services_page__standard_item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.services_page__standard_content}>
                    <h4 className={styles.services_page__standard_name}>
                      {standard.name}
                    </h4>
                    <p className={styles.services_page__standard_description}>
                      {standard.description}
                    </p>
                  </div>

                  <div className={styles.services_page__standard_meta}>
                    <div className={styles.services_page__standard_applies}>
                      <span className={styles.services_page__meta_label}>
                        Applies To:
                      </span>
                      <span className={styles.services_page__meta_value}>
                        {standard.appliesTo}
                      </span>
                    </div>

                    <div className={styles.services_page__standard_date}>
                      <span className={styles.services_page__meta_label}>
                        Last Updated:
                      </span>
                      <span className={styles.services_page__meta_value}>
                        {standard.lastUpdated}
                      </span>
                    </div>

                    <div className={styles.services_page__standard_actions}>
                      <button className={styles.services_page__standard_button}>
                        View
                      </button>
                      <button className={styles.services_page__standard_button}>
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.services_page__standards_footer}>
              <Button variant="secondary" size="small">
                Add Service Standard
              </Button>
            </div>
          </Card>
        )}
      </div>
    </SuperAdminDashboardLayout>
  );
}
