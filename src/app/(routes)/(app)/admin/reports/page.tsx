"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./reports.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState("bookings");

  const reportTypes = [
    { id: "bookings", label: "Bookings Report" },
    { id: "revenue", label: "Revenue Report" },
    { id: "services", label: "Services Report" },
    { id: "customer", label: "Customer Report" },
  ];

  const reportsData = [
    {
      id: "1",
      name: "Monthly Bookings Summary",
      type: "PDF",
      date: "May 15, 2024",
      downloads: 45,
    },
    {
      id: "2",
      name: "Revenue Analysis Q1",
      type: "XLSX",
      date: "Apr 02, 2024",
      downloads: 32,
    },
    {
      id: "3",
      name: "Customer Satisfaction Survey",
      type: "PDF",
      date: "Mar 28, 2024",
      downloads: 18,
    },
    {
      id: "4",
      name: "Service Performance Metrics",
      type: "PDF",
      date: "Mar 12, 2024",
      downloads: 27,
    },
    {
      id: "5",
      name: "Staff Productivity Report",
      type: "XLSX",
      date: "Feb 25, 2024",
      downloads: 14,
    },
  ];

  const columns = [
    { key: "name", header: "Report Name", width: "40%" },
    { key: "type", header: "Type", width: "15%" },
    { key: "date", header: "Generated Date", width: "25%" },
    { key: "downloads", header: "Downloads", width: "20%" },
  ];

  return (
    <AdminDashboardLayout
      title="Reports"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Reports", path: "/admin/reports" },
      ]}
    >
      <div className={styles.reports_page}>
        <div className={styles.reports_page__header}>
          <div className={styles.reports_page__tabs}>
            {reportTypes.map((report) => (
              <button
                key={report.id}
                className={`${styles.reports_page__tab} ${activeReport === report.id ? styles["reports_page__tab--active"] : ""}`}
                onClick={() => setActiveReport(report.id)}
              >
                {report.label}
              </button>
            ))}
          </div>

          <Button variant="primary" size="medium" icon="⬇️">
            Download Report
          </Button>
        </div>

        <Card className={styles.reports_page__content}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={styles.reports_page__section_title}>
              Recent Reports
            </h3>
            <Table
              columns={columns}
              data={reportsData}
              onRowClick={(item) => console.log("Report clicked:", item)}
            />
          </motion.div>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
