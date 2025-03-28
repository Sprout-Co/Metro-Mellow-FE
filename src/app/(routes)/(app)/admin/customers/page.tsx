"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./customers.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import { motion } from "framer-motion";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock customer data
  const customers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown",
      joinDate: "Jan 15, 2024",
      totalSpent: 1250,
      lastService: "House Cleaning",
      status: "active",
    },
    {
      id: "2",
      name: "Michael Davis",
      email: "michael.davis@example.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Somewhere",
      joinDate: "Feb 3, 2024",
      totalSpent: 780,
      lastService: "Laundry Service",
      status: "active",
    },
    {
      id: "3",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      phone: "(555) 345-6789",
      address: "789 Pine St, Elsewhere",
      joinDate: "Mar 12, 2024",
      totalSpent: 1720,
      lastService: "Cooking Service",
      status: "active",
    },
    {
      id: "4",
      name: "David Thompson",
      email: "david.thompson@example.com",
      phone: "(555) 456-7890",
      address: "101 Cedar Rd, Nowhere",
      joinDate: "Dec 5, 2023",
      totalSpent: 350,
      lastService: "Grocery Shopping",
      status: "inactive",
    },
    {
      id: "5",
      name: "Jennifer Martinez",
      email: "jennifer.martinez@example.com",
      phone: "(555) 567-8901",
      address: "202 Birch Ln, Anywhere",
      joinDate: "Apr 22, 2024",
      totalSpent: 420,
      lastService: "Pest Control",
      status: "active",
    },
    {
      id: "6",
      name: "Robert Garcia",
      email: "robert.garcia@example.com",
      phone: "(555) 678-9012",
      address: "303 Elm Blvd, Someplace",
      joinDate: "Feb 18, 2024",
      totalSpent: 890,
      lastService: "House Cleaning",
      status: "inactive",
    },
  ];

  // Filter customers based on search and status filter
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesFilter =
      activeFilter === "all" || customer.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Table columns configuration
  const columns = [
    {
      key: "name",
      header: "Customer",
      width: "20%",
      render: (value: string, row: any) => (
        <div className={styles.customers_page__customer_cell}>
          <div className={styles.customers_page__customer_initial}>
            {value.charAt(0)}
          </div>
          <div className={styles.customers_page__customer_info}>
            <div className={styles.customers_page__customer_name}>{value}</div>
            <div className={styles.customers_page__customer_email}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone", width: "15%" },
    { key: "joinDate", header: "Customer Since", width: "15%" },
    {
      key: "totalSpent",
      header: "Total Spent",
      width: "10%",
      render: (value: number) => (
        <span className={styles.customers_page__total_spent}>
          ${value.toLocaleString()}
        </span>
      ),
    },
    { key: "lastService", header: "Last Service", width: "15%" },
    {
      key: "status",
      header: "Status",
      width: "10%",
      render: (value: string) => (
        <StatusBadge
          status={
            value as
              | "active"
              | "inactive"
              | "pending"
              | "completed"
              | "cancelled"
          }
          label={value === "active" ? "Active" : "Inactive"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "15%",
      render: () => (
        <div className={styles.customers_page__actions_cell}>
          <button className={styles.customers_page__action_button}>View</button>
          <button className={styles.customers_page__action_button}>Edit</button>
        </div>
      ),
    },
  ];

  // Customer statistics
  const customerStats = [
    { label: "Total Customers", value: customers.length },
    {
      label: "Active Customers",
      value: customers.filter((c) => c.status === "active").length,
    },
    {
      label: "Inactive Customers",
      value: customers.filter((c) => c.status === "inactive").length,
    },
    { label: "New This Month", value: 3 },
  ];

  return (
    <AdminDashboardLayout
      title="Customers"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Customers", path: "/admin/customers" },
      ]}
    >
      <div className={styles.customers_page}>
        <div className={styles.customers_page__header}>
          <div className={styles.customers_page__title_area}>
            <h2 className={styles.customers_page__title}>
              Customer Management
            </h2>
            <p className={styles.customers_page__subtitle}>
              View and manage your customers
            </p>
          </div>

          <div className={styles.customers_page__actions}>
            <Button variant="primary" size="medium" icon="+">
              Add Customer
            </Button>
          </div>
        </div>

        <div className={styles.customers_page__stats}>
          {customerStats.map((stat, index) => (
            <Card key={index} className={styles.customers_page__stat_card}>
              <h3 className={styles.customers_page__stat_label}>
                {stat.label}
              </h3>
              <p className={styles.customers_page__stat_value}>{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className={styles.customers_page__content}>
          <div className={styles.customers_page__filters}>
            <div className={styles.customers_page__search}>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.customers_page__search_input}
              />
            </div>

            <div className={styles.customers_page__filter_buttons}>
              <button
                className={`${styles.customers_page__filter_button} ${activeFilter === "all" ? styles["customers_page__filter_button--active"] : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
              <button
                className={`${styles.customers_page__filter_button} ${activeFilter === "active" ? styles["customers_page__filter_button--active"] : ""}`}
                onClick={() => setActiveFilter("active")}
              >
                Active
              </button>
              <button
                className={`${styles.customers_page__filter_button} ${activeFilter === "inactive" ? styles["customers_page__filter_button--active"] : ""}`}
                onClick={() => setActiveFilter("inactive")}
              >
                Inactive
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Table
              columns={columns}
              data={filteredCustomers}
              onRowClick={(customer) =>
                console.log("Customer selected:", customer)
              }
            />
          </motion.div>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
