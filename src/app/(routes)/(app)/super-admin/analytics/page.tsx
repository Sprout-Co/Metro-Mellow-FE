"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./analytics.module.scss";
import Card from "@/app/(routes)/(app)/super-admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/super-admin/_components/UI/Button/Button";
import Chart from "@/app/(routes)/(app)/super-admin/_components/UI/Chart/Chart";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeChartView, setActiveChartView] = useState("weekly");

  // Mock analytics data
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$145,680",
      change: 18.2,
      icon: "💰",
    },
    {
      title: "Total Bookings",
      value: "3,487",
      change: 12.6,
      icon: "📅",
    },
    {
      title: "Active Customers",
      value: "2,154",
      change: 8.4,
      icon: "👥",
    },
    {
      title: "Average Order Value",
      value: "$87.50",
      change: 4.2,
      icon: "📈",
    },
  ];

  // Mock revenue data for chart
  const revenueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Revenue",
        data: [24500, 28600, 31200, 35800, 38500, 42100],
        color: "#606c38",
      },
      {
        label: "Bookings",
        data: [542, 583, 615, 648, 692, 725],
        color: "#2c2e43",
      },
    ],
  };

  // Mock service data
  const serviceData = [
    {
      name: "Cleaning Services",
      revenue: 58450,
      percentage: 40.1,
      color: "#606c38",
    },
    {
      name: "Laundry Services",
      revenue: 34960,
      percentage: 24.0,
      color: "#2c2e43",
    },
    {
      name: "Cooking Services",
      revenue: 23310,
      percentage: 16.0,
      color: "#28c76f",
    },
    {
      name: "Pest Control",
      revenue: 20395,
      percentage: 14.0,
      color: "#00cfe8",
    },
    {
      name: "Errands",
      revenue: 8565,
      percentage: 5.9,
      color: "#ffab00",
    },
  ];

  // Mock customer segments
  const customerSegments = [
    { name: "Recurring", value: 45, color: "#606c38" },
    { name: "Regular", value: 30, color: "#588157" },
    { name: "Occasional", value: 18, color: "#00cfe8" },
    { name: "First-time", value: 7, color: "#ffab00" },
  ];

  // Mock service trend data
  const serviceTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Cleaning",
        data: [8200, 8500, 9100, 9800, 10200, 10800],
        color: "#606c38",
      },
      {
        label: "Laundry",
        data: [5100, 5400, 5800, 6200, 6500, 6900],
        color: "#2c2e43",
      },
      {
        label: "Cooking",
        data: [3200, 3500, 3700, 3900, 4100, 4400],
        color: "#28c76f",
      },
    ],
  };

  // Mock service metrics
  const serviceMetrics = {
    averageRating: 4.8,
    completionRate: "98.2%",
    repeatBookingRate: "72.5%",
    cancellationRate: "3.4%",
  };

  // Mock customer metrics
  const customerMetrics = {
    lifetime: {
      title: "Customer Lifetime Value",
      value: "$842",
      change: 5.8,
      icon: "📊",
    },
    acquisition: {
      title: "Acquisition Cost",
      value: "$48.20",
      change: -3.2,
      icon: "🔍",
    },
    retention: {
      title: "Retention Rate",
      value: "76.4%",
      change: 2.5,
      icon: "🔄",
    },
  };

  // Mock available reports
  const availableReports = [
    {
      name: "Monthly Financial Report",
      description: "Comprehensive financial performance analysis",
      icon: "📊",
      lastGenerated: "May 1, 2024",
      format: "PDF/Excel",
    },
    {
      name: "Service Performance Analysis",
      description: "Detailed analysis of service performance metrics",
      icon: "📈",
      lastGenerated: "May 5, 2024",
      format: "PDF/Excel",
    },
    {
      name: "Customer Segmentation Report",
      description: "Customer segments and behavior patterns",
      icon: "👥",
      lastGenerated: "Apr 30, 2024",
      format: "PDF",
    },
    {
      name: "Operational Efficiency Report",
      description: "Staff utilization and operational metrics",
      icon: "⚙️",
      lastGenerated: "Apr 28, 2024",
      format: "PDF/Excel",
    },
    {
      name: "Marketing Campaign Analysis",
      description: "Performance metrics for marketing campaigns",
      icon: "📢",
      lastGenerated: "Apr 25, 2024",
      format: "PDF",
    },
    {
      name: "Geographical Distribution Report",
      description: "Customer distribution and service coverage analysis",
      icon: "🗺️",
      lastGenerated: "Apr 20, 2024",
      format: "PDF/Excel",
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SuperAdminDashboardLayout
      title="Analytics"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Analytics", path: "/super-admin/analytics" },
      ]}
    >
      <div className={styles.analytics_page}>
        <div className={styles.analytics_page__header}>
          <div>
            <h2 className={styles.analytics_page__title}>Business Analytics</h2>
            <p className={styles.analytics_page__description}>
              Comprehensive analytics and reports
            </p>
          </div>

          <div className={styles.analytics_page__actions}>
            <button className={styles.analytics_page__date_range}>
              <span className={styles.analytics_page__date_icon}>📅</span>
              <span>Apr 17, 2024 - May 16, 2024</span>
            </button>
            <Button variant="secondary" size="medium">
              Export
            </Button>
          </div>
        </div>

        <div className={styles.analytics_page__tabs}>
          <button
            className={`${styles.analytics_page__tab} ${activeTab === "overview" ? styles["analytics_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.analytics_page__tab} ${activeTab === "services" ? styles["analytics_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button
            className={`${styles.analytics_page__tab} ${activeTab === "customers" ? styles["analytics_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            Customers
          </button>
          <button
            className={`${styles.analytics_page__tab} ${activeTab === "reports" ? styles["analytics_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </div>

        {activeTab === "overview" && (
          <div className={styles.analytics_page__overview}>
            <div className={styles.analytics_page__kpi_grid}>
              {kpiData.map((kpi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={styles.analytics_page__kpi_card}>
                    <div className={styles.analytics_page__kpi_header}>
                      <h3 className={styles.analytics_page__kpi_title}>
                        {kpi.title}
                      </h3>
                      <div className={styles.analytics_page__kpi_icon}>
                        {kpi.icon}
                      </div>
                    </div>
                    <p className={styles.analytics_page__kpi_value}>
                      {kpi.value}
                    </p>
                    <div
                      className={`${styles.analytics_page__kpi_change} ${kpi.change > 0 ? styles["analytics_page__kpi_change--positive"] : styles["analytics_page__kpi_change--negative"]}`}
                    >
                      <span className={styles.analytics_page__change_icon}>
                        {kpi.change > 0 ? "↑" : "↓"}
                      </span>
                      <span>{Math.abs(kpi.change)}%</span>
                      <span className={styles.analytics_page__change_period}>
                        vs last period
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className={styles.analytics_page__charts_row}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card className={styles.analytics_page__chart_card}>
                  <div className={styles.analytics_page__chart_header}>
                    <h3 className={styles.analytics_page__chart_title}>
                      Revenue & Bookings
                    </h3>
                    <div className={styles.analytics_page__chart_options}>
                      <button
                        className={`${styles.analytics_page__chart_option} ${activeChartView === "weekly" ? styles["analytics_page__chart_option--active"] : ""}`}
                        onClick={() => setActiveChartView("weekly")}
                      >
                        Weekly
                      </button>
                      <button
                        className={`${styles.analytics_page__chart_option} ${activeChartView === "monthly" ? styles["analytics_page__chart_option--active"] : ""}`}
                        onClick={() => setActiveChartView("monthly")}
                      >
                        Monthly
                      </button>
                      <button
                        className={`${styles.analytics_page__chart_option} ${activeChartView === "quarterly" ? styles["analytics_page__chart_option--active"] : ""}`}
                        onClick={() => setActiveChartView("quarterly")}
                      >
                        Quarterly
                      </button>
                    </div>
                  </div>
                  <div className={styles.analytics_page__chart}>
                    <Chart data={revenueData} height={350} type="line" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Card className={styles.analytics_page__segment_card}>
                  <h3 className={styles.analytics_page__chart_title}>
                    Revenue by Service
                  </h3>
                  <div className={styles.analytics_page__segment_donut}>
                    <svg width="200" height="200" viewBox="0 0 100 100">
                      {/* Simplified donut chart */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={serviceData[0].color}
                        strokeWidth="20"
                        strokeDasharray={`${serviceData[0].percentage} ${100 - serviceData[0].percentage}`}
                        strokeDashoffset="25"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={serviceData[1].color}
                        strokeWidth="20"
                        strokeDasharray={`${serviceData[1].percentage} ${100 - serviceData[1].percentage}`}
                        strokeDashoffset={`${75 - serviceData[0].percentage}`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={serviceData[2].color}
                        strokeWidth="20"
                        strokeDasharray={`${serviceData[2].percentage} ${100 - serviceData[2].percentage}`}
                        strokeDashoffset={`${75 - serviceData[0].percentage - serviceData[1].percentage}`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={serviceData[3].color}
                        strokeWidth="20"
                        strokeDasharray={`${serviceData[3].percentage} ${100 - serviceData[3].percentage}`}
                        strokeDashoffset={`${75 - serviceData[0].percentage - serviceData[1].percentage - serviceData[2].percentage}`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={serviceData[4].color}
                        strokeWidth="20"
                        strokeDasharray={`${serviceData[4].percentage} ${100 - serviceData[4].percentage}`}
                        strokeDashoffset={`${75 - serviceData[0].percentage - serviceData[1].percentage - serviceData[2].percentage - serviceData[3].percentage}`}
                      />
                    </svg>
                  </div>
                  <div className={styles.analytics_page__segment_legend}>
                    {serviceData.map((service, index) => (
                      <div
                        key={index}
                        className={styles.analytics_page__legend_item}
                      >
                        <div className={styles.analytics_page__legend_label}>
                          <div
                            className={styles.analytics_page__legend_color}
                            style={{ backgroundColor: service.color }}
                          ></div>
                          {service.name}
                        </div>
                        <div className={styles.analytics_page__legend_value}>
                          {formatCurrency(service.revenue)}
                          <span
                            className={styles.analytics_page__legend_percentage}
                          >
                            ({service.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Card className={styles.analytics_page__segment_card}>
                <div className={styles.analytics_page__chart_header}>
                  <h3 className={styles.analytics_page__chart_title}>
                    Customer Segments
                  </h3>
                </div>
                <div className={styles.analytics_page__segment_donut}>
                  <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={customerSegments[0].color}
                      strokeWidth="20"
                      strokeDasharray={`${customerSegments[0].value} ${100 - customerSegments[0].value}`}
                      strokeDashoffset="25"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={customerSegments[1].color}
                      strokeWidth="20"
                      strokeDasharray={`${customerSegments[1].value} ${100 - customerSegments[1].value}`}
                      strokeDashoffset={`${75 - customerSegments[0].value}`}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={customerSegments[2].color}
                      strokeWidth="20"
                      strokeDasharray={`${customerSegments[2].value} ${100 - customerSegments[2].value}`}
                      strokeDashoffset={`${75 - customerSegments[0].value - customerSegments[1].value}`}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={customerSegments[3].color}
                      strokeWidth="20"
                      strokeDasharray={`${customerSegments[3].value} ${100 - customerSegments[3].value}`}
                      strokeDashoffset={`${75 - customerSegments[0].value - customerSegments[1].value - customerSegments[2].value}`}
                    />
                  </svg>
                </div>
                <div className={styles.analytics_page__segment_legend}>
                  {customerSegments.map((segment, index) => (
                    <div
                      key={index}
                      className={styles.analytics_page__legend_item}
                    >
                      <div className={styles.analytics_page__legend_label}>
                        <div
                          className={styles.analytics_page__legend_color}
                          style={{ backgroundColor: segment.color }}
                        ></div>
                        {segment.name} Customers
                      </div>
                      <div className={styles.analytics_page__legend_value}>
                        {segment.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "services" && (
          <div className={styles.analytics_page__services}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.analytics_page__service_performance}>
                <div className={styles.analytics_page__chart_header}>
                  <h3 className={styles.analytics_page__chart_title}>
                    Service Performance
                  </h3>
                </div>

                {serviceData.map((service, index) => (
                  <div
                    key={index}
                    className={styles.analytics_page__service_bar}
                  >
                    <div className={styles.analytics_page__service_header}>
                      <span className={styles.analytics_page__service_name}>
                        {service.name}
                      </span>
                      <span className={styles.analytics_page__service_value}>
                        {formatCurrency(service.revenue)}
                      </span>
                    </div>
                    <div className={styles.analytics_page__progress_bar}>
                      <motion.div
                        className={`${styles.analytics_page__progress_fill} ${styles[`analytics_page__progress_fill--${index + 1}`]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${service.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>

            <div className={styles.analytics_page__services_grid}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className={styles.analytics_page__service_trend_chart}>
                  <div className={styles.analytics_page__chart_header}>
                    <h3 className={styles.analytics_page__chart_title}>
                      Service Trends
                    </h3>
                    <div className={styles.analytics_page__chart_options}>
                      <button
                        className={`${styles.analytics_page__chart_option} ${activeChartView === "weekly" ? styles["analytics_page__chart_option--active"] : ""}`}
                        onClick={() => setActiveChartView("weekly")}
                      >
                        Weekly
                      </button>
                      <button
                        className={`${styles.analytics_page__chart_option} ${activeChartView === "monthly" ? styles["analytics_page__chart_option--active"] : ""}`}
                        onClick={() => setActiveChartView("monthly")}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                  <div className={styles.analytics_page__chart}>
                    <Chart data={serviceTrendData} height={300} type="line" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className={styles.analytics_page__service_metrics}>
                  <div className={styles.analytics_page__metrics_header}>
                    <h3 className={styles.analytics_page__metrics_title}>
                      Service Quality Metrics
                    </h3>
                    <p className={styles.analytics_page__metrics_description}>
                      Performance indicators for service quality
                    </p>
                  </div>
                  <div className={styles.analytics_page__metrics_grid}>
                    <div className={styles.analytics_page__metric_item}>
                      <p className={styles.analytics_page__metric_value}>
                        {serviceMetrics.averageRating}
                      </p>
                      <p className={styles.analytics_page__metric_label}>
                        Avg. Rating
                      </p>
                    </div>
                    <div className={styles.analytics_page__metric_item}>
                      <p className={styles.analytics_page__metric_value}>
                        {serviceMetrics.completionRate}
                      </p>
                      <p className={styles.analytics_page__metric_label}>
                        Completion Rate
                      </p>
                    </div>
                    <div className={styles.analytics_page__metric_item}>
                      <p className={styles.analytics_page__metric_value}>
                        {serviceMetrics.repeatBookingRate}
                      </p>
                      <p className={styles.analytics_page__metric_label}>
                        Repeat Booking
                      </p>
                    </div>
                    <div className={styles.analytics_page__metric_item}>
                      <p className={styles.analytics_page__metric_value}>
                        {serviceMetrics.cancellationRate}
                      </p>
                      <p className={styles.analytics_page__metric_label}>
                        Cancellation
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className={styles.analytics_page__customers}>
            <div className={styles.analytics_page__customer_metrics}>
              {Object.values(customerMetrics).map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={styles.analytics_page__customer_card}>
                    <div className={styles.analytics_page__kpi_header}>
                      <h3 className={styles.analytics_page__kpi_title}>
                        {metric.title}
                      </h3>
                      <div className={styles.analytics_page__kpi_icon}>
                        {metric.icon}
                      </div>
                    </div>
                    <p className={styles.analytics_page__kpi_value}>
                      {metric.value}
                    </p>
                    <div
                      className={`${styles.analytics_page__kpi_change} ${metric.change > 0 ? styles["analytics_page__kpi_change--positive"] : styles["analytics_page__kpi_change--negative"]}`}
                    >
                      <span className={styles.analytics_page__change_icon}>
                        {metric.change > 0 ? "↑" : "↓"}
                      </span>
                      <span>{Math.abs(metric.change)}%</span>
                      <span className={styles.analytics_page__change_period}>
                        vs last period
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className={styles.analytics_page__customer_map_container}
              >
                <Card>
                  <div className={styles.analytics_page__map_header}>
                    <h3 className={styles.analytics_page__map_title}>
                      Customer Geographic Distribution
                    </h3>
                    <p className={styles.analytics_page__map_description}>
                      Regional distribution of customers and service coverage
                    </p>
                  </div>
                  <div className={styles.analytics_page__customer_map}>
                    <span className={styles.analytics_page__map_placeholder}>
                      [Interactive Map Placeholder]
                    </span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={styles.analytics_page__reports_container}>
              <div className={styles.analytics_page__reports_header}>
                <h3 className={styles.analytics_page__reports_title}>
                  Available Reports
                </h3>
                <Button variant="primary" size="medium">
                  Generate New Report
                </Button>
              </div>

              <div className={styles.analytics_page__report_list}>
                {availableReports.map((report, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className={styles.analytics_page__report_card}>
                      <div className={styles.analytics_page__report_icon}>
                        {report.icon}
                      </div>
                      <h4 className={styles.analytics_page__report_name}>
                        {report.name}
                      </h4>
                      <p className={styles.analytics_page__report_description}>
                        {report.description}
                      </p>
                      <div className={styles.analytics_page__report_meta}>
                        <span>Last Generated: {report.lastGenerated}</span>
                        <span className={styles.analytics_page__report_format}>
                          {report.format}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </SuperAdminDashboardLayout>
  );
}
