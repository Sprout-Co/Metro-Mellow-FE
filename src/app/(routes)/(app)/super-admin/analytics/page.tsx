"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./analytics.module.scss";
import Card from "../_components/UI/Card/Card";
import Chart from "../_components/UI/Chart/Chart";
import MetricCard from "../_components/UI/MetricCard/MetricCard";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("monthly");

  // Mock analytics data
  const revenueData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          12500, 14200, 16800, 15600, 17500, 19200, 18500, 20100, 22300, 21500,
          23800, 26200,
        ],
        color: "#606c38",
      },
      {
        label: "Target",
        data: [
          15000, 15000, 15000, 18000, 18000, 18000, 20000, 20000, 20000, 22000,
          22000, 22000,
        ],
        color: "#db5226",
      },
    ],
  };

  const serviceData = {
    labels: ["House Cleaning", "Laundry", "Cooking", "Pest Control", "Errands"],
    datasets: [
      {
        label: "Bookings",
        data: [145, 98, 76, 54, 42],
        color: "#606c38",
      },
    ],
  };

  const customerData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Customers",
        data: [12, 18, 15, 22, 19, 24, 16, 20, 25, 22, 28, 32],
        color: "#606c38",
      },
      {
        label: "Returning Customers",
        data: [24, 28, 35, 32, 38, 42, 45, 48, 52, 55, 58, 62],
        color: "#588157",
      },
    ],
  };

  // Metric cards data
  const metricsData = [
    {
      title: "Total Revenue",
      value: "$215,500",
      icon: "$",
      progress: {
        current: 215500,
        total: 250000,
        label: "Annual Target",
      },
      color: "primary",
    },
    {
      title: "Customer Retention",
      value: "76.4%",
      icon: "↑",
      progress: {
        current: 76.4,
        total: 100,
        label: "Returning Customers",
      },
      color: "secondary",
    },
    {
      title: "Avg. Service Rating",
      value: "4.8/5",
      icon: "★",
      progress: {
        current: 4.8,
        total: 5,
        label: "Customer Satisfaction",
      },
      color: "success",
    },
    {
      title: "Service Efficiency",
      value: "92.3%",
      icon: "⏱️",
      progress: {
        current: 92.3,
        total: 100,
        label: "On-time Completion",
      },
      color: "info",
    },
  ];

  // Helper for the time period selection
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  return (
    <AdminDashboardLayout
      title="Analytics"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Analytics", path: "/admin/analytics" },
      ]}
    >
      <div className={styles.analytics_page}>
        <div className={styles.analytics_page__header}>
          <div className={styles.analytics_page__title_area}>
            <h2 className={styles.analytics_page__title}>Business Analytics</h2>
            <p className={styles.analytics_page__subtitle}>
              Track your business performance and growth
            </p>
          </div>

          <div className={styles.analytics_page__time_range}>
            <button
              className={`${styles.analytics_page__time_button} ${timeRange === "weekly" ? styles["analytics_page__time_button--active"] : ""}`}
              onClick={() => handleTimeRangeChange("weekly")}
            >
              Weekly
            </button>
            <button
              className={`${styles.analytics_page__time_button} ${timeRange === "monthly" ? styles["analytics_page__time_button--active"] : ""}`}
              onClick={() => handleTimeRangeChange("monthly")}
            >
              Monthly
            </button>
            <button
              className={`${styles.analytics_page__time_button} ${timeRange === "quarterly" ? styles["analytics_page__time_button--active"] : ""}`}
              onClick={() => handleTimeRangeChange("quarterly")}
            >
              Quarterly
            </button>
            <button
              className={`${styles.analytics_page__time_button} ${timeRange === "yearly" ? styles["analytics_page__time_button--active"] : ""}`}
              onClick={() => handleTimeRangeChange("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className={styles.analytics_page__metrics}>
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              progress={metric.progress}
              color={metric.color as any}
            />
          ))}
        </div>

        <div className={styles.analytics_page__charts}>
          <motion.div
            className={styles.analytics_page__chart_container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className={styles.analytics_page__chart_card}>
              <div className={styles.analytics_page__chart_header}>
                <h3 className={styles.analytics_page__chart_title}>
                  Revenue Analysis
                </h3>
                <p className={styles.analytics_page__chart_subtitle}>
                  Monthly revenue vs target
                </p>
              </div>
              <div className={styles.analytics_page__chart}>
                <Chart data={revenueData} height={300} type="line" />
              </div>
            </Card>
          </motion.div>

          <div className={styles.analytics_page__secondary_charts}>
            <motion.div
              className={styles.analytics_page__chart_container}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className={styles.analytics_page__chart_card}>
                <div className={styles.analytics_page__chart_header}>
                  <h3 className={styles.analytics_page__chart_title}>
                    Service Distribution
                  </h3>
                  <p className={styles.analytics_page__chart_subtitle}>
                    Bookings by service type
                  </p>
                </div>
                <div className={styles.analytics_page__chart}>
                  <Chart data={serviceData} height={250} type="bar" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              className={styles.analytics_page__chart_container}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className={styles.analytics_page__chart_card}>
                <div className={styles.analytics_page__chart_header}>
                  <h3 className={styles.analytics_page__chart_title}>
                    Customer Growth
                  </h3>
                  <p className={styles.analytics_page__chart_subtitle}>
                    New vs returning customers
                  </p>
                </div>
                <div className={styles.analytics_page__chart}>
                  <Chart data={customerData} height={250} type="line" />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          className={styles.analytics_page__insights}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className={styles.analytics_page__insights_card}>
            <h3 className={styles.analytics_page__insights_title}>
              Key Insights
            </h3>

            <div className={styles.analytics_page__insights_list}>
              <div className={styles.analytics_page__insight_item}>
                <div className={styles.analytics_page__insight_icon_positive}>
                  ↑
                </div>
                <div className={styles.analytics_page__insight_content}>
                  <h4 className={styles.analytics_page__insight_header}>
                    Revenue growth of 18% compared to last year
                  </h4>
                  <p className={styles.analytics_page__insight_text}>
                    Your business has shown consistent growth with the highest
                    revenue in December at $26,200.
                  </p>
                </div>
              </div>

              <div className={styles.analytics_page__insight_item}>
                <div className={styles.analytics_page__insight_icon_positive}>
                  ↑
                </div>
                <div className={styles.analytics_page__insight_content}>
                  <h4 className={styles.analytics_page__insight_header}>
                    House Cleaning remains your most popular service
                  </h4>
                  <p className={styles.analytics_page__insight_text}>
                    With 145 bookings, House Cleaning generates 35% of your
                    total bookings. Consider expanding this service.
                  </p>
                </div>
              </div>

              <div className={styles.analytics_page__insight_item}>
                <div className={styles.analytics_page__insight_icon_neutral}>
                  →
                </div>
                <div className={styles.analytics_page__insight_content}>
                  <h4 className={styles.analytics_page__insight_header}>
                    Customer retention is healthy but could improve
                  </h4>
                  <p className={styles.analytics_page__insight_text}>
                    At 76.4%, your retention rate is above industry average.
                    Consider loyalty programs to increase this further.
                  </p>
                </div>
              </div>

              <div className={styles.analytics_page__insight_item}>
                <div className={styles.analytics_page__insight_icon_negative}>
                  ↓
                </div>
                <div className={styles.analytics_page__insight_content}>
                  <h4 className={styles.analytics_page__insight_header}>
                    Errands service has the lowest bookings
                  </h4>
                  <p className={styles.analytics_page__insight_text}>
                    With only 42 bookings, you might want to review pricing or
                    marketing for this service.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AdminDashboardLayout>
  );
}
