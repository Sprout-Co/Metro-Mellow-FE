"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./platform.module.scss";
import Card from "@/app/(routes)/(app)/super-admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/super-admin/_components/UI/Button/Button";
import Chart from "@/app/(routes)/(app)/super-admin/_components/UI/Chart/Chart";
import { motion } from "framer-motion";

export default function PlatformAdminPage() {
  const [activeTab, setActiveTab] = useState("environment");
  const [logsLevel, setLogsLevel] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  // Mock environment data
  const environments = [
    {
      id: 1,
      name: "Production",
      icon: "🌐",
      status: {
        uptime: "99.98%",
        lastDeployment: "2024-05-15 10:22:36",
        version: "2.4.1",
        serverLoad: "42%",
      },
    },
    {
      id: 2,
      name: "Staging",
      icon: "🧪",
      status: {
        uptime: "99.92%",
        lastDeployment: "2024-05-16 14:45:12",
        version: "2.4.2-beta",
        serverLoad: "28%",
      },
    },
    {
      id: 3,
      name: "Development",
      icon: "💻",
      status: {
        uptime: "99.75%",
        lastDeployment: "2024-05-16 16:30:05",
        version: "2.5.0-dev",
        serverLoad: "35%",
      },
    },
  ];

  // Mock system logs
  const systemLogs = [
    {
      timestamp: "2024-05-16 16:48:23",
      level: "info",
      message: "User authentication successful: john.smith@metromellow.com",
    },
    {
      timestamp: "2024-05-16 16:45:12",
      level: "info",
      message: "Deployment completed successfully on staging environment",
    },
    {
      timestamp: "2024-05-16 16:42:57",
      level: "warning",
      message: "High memory usage detected on app-server-03 (82%)",
    },
    {
      timestamp: "2024-05-16 16:38:15",
      level: "error",
      message: "Database connection timeout: db-replica-02",
    },
    {
      timestamp: "2024-05-16 16:36:42",
      level: "info",
      message: "Scheduled backup completed successfully",
    },
    {
      timestamp: "2024-05-16 16:30:05",
      level: "info",
      message: "Deployment started on development environment",
    },
    {
      timestamp: "2024-05-16 16:22:18",
      level: "info",
      message: "User logged out: emily.davis@metromellow.com",
    },
    {
      timestamp: "2024-05-16 16:18:37",
      level: "warning",
      message: "API rate limit reached for client: mobile-app-client",
    },
    {
      timestamp: "2024-05-16 16:15:22",
      level: "info",
      message: "Cache invalidation completed for content updates",
    },
    {
      timestamp: "2024-05-16 16:12:05",
      level: "error",
      message: "Payment gateway connection error: stripe-api",
    },
  ];

  // Filter logs based on selected level
  const filteredLogs =
    logsLevel === "all"
      ? systemLogs
      : systemLogs.filter((log) => log.level === logsLevel);

  // Mock domains data
  const domains = [
    {
      id: 1,
      domain: "metromellow.com",
      environment: "production",
      sslStatus: "valid",
      sslExpiry: "2024-12-15",
      lastChecked: "2024-05-16 12:00:00",
    },
    {
      id: 2,
      domain: "admin.metromellow.com",
      environment: "production",
      sslStatus: "valid",
      sslExpiry: "2024-12-15",
      lastChecked: "2024-05-16 12:00:00",
    },
    {
      id: 3,
      domain: "api.metromellow.com",
      environment: "production",
      sslStatus: "valid",
      sslExpiry: "2024-12-15",
      lastChecked: "2024-05-16 12:00:00",
    },
    {
      id: 4,
      domain: "staging.metromellow.com",
      environment: "staging",
      sslStatus: "valid",
      sslExpiry: "2024-12-15",
      lastChecked: "2024-05-16 12:00:00",
    },
    {
      id: 5,
      domain: "dev.metromellow.com",
      environment: "development",
      sslStatus: "expiring",
      sslExpiry: "2024-06-20",
      lastChecked: "2024-05-16 12:00:00",
    },
  ];

  // Mock performance data
  const performanceData = {
    responseTime: {
      labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"],
      datasets: [
        {
          label: "Response Time (ms)",
          data: [120, 135, 180, 220, 195, 145],
          color: "#606c38",
        },
      ],
    },
    serverLoad: {
      labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"],
      datasets: [
        {
          label: "CPU Usage (%)",
          data: [25, 22, 38, 52, 45, 33],
          color: "#2c2e43",
        },
        {
          label: "Memory Usage (%)",
          data: [35, 32, 48, 62, 55, 43],
          color: "#588157",
        },
      ],
    },
    requestStats: {
      totalRequests: "3.2M",
      averageResponseTime: "164ms",
      errorRate: "0.05%",
      cacheHitRate: "87.5%",
    },
  };

  return (
    <SuperAdminDashboardLayout
      title="Platform Administration"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Platform Admin", path: "/super-admin/platform" },
      ]}
    >
      <div className={styles.platform_page}>
        <div className={styles.platform_page__header}>
          <div>
            <h2 className={styles.platform_page__title}>
              Platform Administration
            </h2>
            <p className={styles.platform_page__description}>
              Monitor and manage system environments, domains, and performance
            </p>
          </div>

          <div className={styles.platform_page__actions}>
            <Button variant="primary" size="medium">
              System Status
            </Button>
          </div>
        </div>

        <div className={styles.platform_page__tabs}>
          <button
            className={`${styles.platform_page__tab} ${activeTab === "environment" ? styles["platform_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("environment")}
          >
            Environments
          </button>
          <button
            className={`${styles.platform_page__tab} ${activeTab === "logs" ? styles["platform_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("logs")}
          >
            System Logs
          </button>
          <button
            className={`${styles.platform_page__tab} ${activeTab === "domains" ? styles["platform_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("domains")}
          >
            Domains & SSL
          </button>
          <button
            className={`${styles.platform_page__tab} ${activeTab === "performance" ? styles["platform_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </button>
        </div>

        {activeTab === "environment" && (
          <div className={styles.platform_page__environment_grid}>
            {environments.map((env) => (
              <motion.div
                key={env.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.platform_page__env_card}>
                  <div className={styles.platform_page__env_header}>
                    <div className={styles.platform_page__env_icon}>
                      {env.icon}
                    </div>
                    <h3 className={styles.platform_page__env_title}>
                      {env.name} Environment
                    </h3>
                  </div>

                  <div className={styles.platform_page__env_content}>
                    <div className={styles.platform_page__env_status}>
                      <div className={styles.platform_page__status_item}>
                        <span className={styles.platform_page__status_label}>
                          Uptime:
                        </span>
                        <span className={styles.platform_page__status_value}>
                          {env.status.uptime}
                        </span>
                      </div>
                      <div className={styles.platform_page__status_item}>
                        <span className={styles.platform_page__status_label}>
                          Last Deployment:
                        </span>
                        <span className={styles.platform_page__status_value}>
                          {env.status.lastDeployment}
                        </span>
                      </div>
                      <div className={styles.platform_page__status_item}>
                        <span className={styles.platform_page__status_label}>
                          Version:
                        </span>
                        <span className={styles.platform_page__status_value}>
                          {env.status.version}
                        </span>
                      </div>
                      <div className={styles.platform_page__status_item}>
                        <span className={styles.platform_page__status_label}>
                          Server Load:
                        </span>
                        <span className={styles.platform_page__status_value}>
                          {env.status.serverLoad}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.platform_page__env_actions}>
                    <Button
                      variant="secondary"
                      size="small"
                      className={styles.platform_page__env_action}
                    >
                      Restart
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      className={styles.platform_page__env_action}
                    >
                      Deploy
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      className={styles.platform_page__env_action}
                    >
                      Settings
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "logs" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={styles.platform_page__logs_container}>
              <div className={styles.platform_page__logs_header}>
                <h3 className={styles.platform_page__logs_title}>
                  System Logs
                </h3>
                <div className={styles.platform_page__logs_filters}>
                  <div className={styles.platform_page__logs_filter}>
                    <select
                      className={styles.platform_page__filter_select}
                      value={logsLevel}
                      onChange={(e) => setLogsLevel(e.target.value)}
                    >
                      <option value="all">All Levels</option>
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  <div className={styles.platform_page__logs_filter}>
                    <select className={styles.platform_page__filter_select}>
                      <option value="all">All Services</option>
                      <option value="web">Web Server</option>
                      <option value="db">Database</option>
                      <option value="auth">Authentication</option>
                      <option value="api">API</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.platform_page__logs_content}>
                {filteredLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`${styles.platform_page__log_entry} ${styles[`platform_page__log_entry--${log.level}`]}`}
                  >
                    <span className={styles.platform_page__log_timestamp}>
                      {log.timestamp}
                    </span>
                    <span className={styles.platform_page__log_message}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.platform_page__logs_footer}>
                <div className={styles.platform_page__logs_pagination}>
                  <Button variant="secondary" size="small">
                    Previous
                  </Button>
                  <Button variant="secondary" size="small">
                    Next
                  </Button>
                </div>
                <div className={styles.platform_page__logs_actions}>
                  <Button variant="secondary" size="small">
                    Download Logs
                  </Button>
                  <Button variant="secondary" size="small">
                    Clear Logs
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "domains" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={styles.platform_page__domains_container}>
              <div className={styles.platform_page__domains_header}>
                <h3 className={styles.platform_page__domains_title}>
                  Domains & SSL Certificates
                </h3>
                <Button variant="secondary" size="small">
                  Add Domain
                </Button>
              </div>

              <table className={styles.platform_page__domains_table}>
                <thead>
                  <tr>
                    <th className={styles.platform_page__table_header}>
                      Domain
                    </th>
                    <th className={styles.platform_page__table_header}>
                      Environment
                    </th>
                    <th className={styles.platform_page__table_header}>
                      SSL Status
                    </th>
                    <th className={styles.platform_page__table_header}>
                      Expiry Date
                    </th>
                    <th className={styles.platform_page__table_header}>
                      Last Checked
                    </th>
                    <th className={styles.platform_page__table_header}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {domains.map((domain) => (
                    <tr
                      key={domain.id}
                      className={styles.platform_page__table_row}
                    >
                      <td className={styles.platform_page__table_cell}>
                        <span className={styles.platform_page__domain_name}>
                          {domain.domain}
                        </span>
                      </td>
                      <td className={styles.platform_page__table_cell}>
                        <span
                          className={`${styles.platform_page__domain_environment} ${styles[`platform_page__domain_environment--${domain.environment}`]}`}
                        >
                          {domain.environment.charAt(0).toUpperCase() +
                            domain.environment.slice(1)}
                        </span>
                      </td>
                      <td className={styles.platform_page__table_cell}>
                        <span
                          className={`${styles.platform_page__domain_ssl} ${styles[`platform_page__domain_ssl--${domain.sslStatus}`]}`}
                        >
                          {domain.sslStatus.charAt(0).toUpperCase() +
                            domain.sslStatus.slice(1)}
                        </span>
                      </td>
                      <td className={styles.platform_page__table_cell}>
                        {domain.sslExpiry}
                      </td>
                      <td className={styles.platform_page__table_cell}>
                        {domain.lastChecked}
                      </td>
                      <td className={styles.platform_page__table_cell}>
                        <div className={styles.platform_page__domain_actions}>
                          <button
                            className={styles.platform_page__domain_action}
                          >
                            Renew SSL
                          </button>
                          <button
                            className={styles.platform_page__domain_action}
                          >
                            Edit
                          </button>
                          <button
                            className={styles.platform_page__domain_action}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.platform_page__domains_footer}>
                <Button variant="secondary" size="small">
                  Check SSL Status
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "performance" && (
          <div className={styles.platform_page__performance_grid}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.platform_page__performance_chart_container}
            >
              <Card className={styles.platform_page__performance_card}>
                <div className={styles.platform_page__performance_header}>
                  <h3 className={styles.platform_page__performance_title}>
                    Response Time
                  </h3>
                  <div className={styles.platform_page__timeframe_selector}>
                    <button
                      className={`${styles.platform_page__timeframe_option} ${selectedTimeframe === "24h" ? styles["platform_page__timeframe_option--active"] : ""}`}
                      onClick={() => setSelectedTimeframe("24h")}
                    >
                      24h
                    </button>
                    <button
                      className={`${styles.platform_page__timeframe_option} ${selectedTimeframe === "7d" ? styles["platform_page__timeframe_option--active"] : ""}`}
                      onClick={() => setSelectedTimeframe("7d")}
                    >
                      7d
                    </button>
                    <button
                      className={`${styles.platform_page__timeframe_option} ${selectedTimeframe === "30d" ? styles["platform_page__timeframe_option--active"] : ""}`}
                      onClick={() => setSelectedTimeframe("30d")}
                    >
                      30d
                    </button>
                  </div>
                </div>
                <div className={styles.platform_page__performance_chart}>
                  <Chart
                    data={performanceData.responseTime}
                    height={250}
                    type="line"
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={styles.platform_page__performance_chart_container}
            >
              <Card className={styles.platform_page__performance_card}>
                <div className={styles.platform_page__performance_header}>
                  <h3 className={styles.platform_page__performance_title}>
                    Server Load
                  </h3>
                  <div className={styles.platform_page__timeframe_selector}>
                    <button
                      className={`${styles.platform_page__timeframe_option} ${selectedTimeframe === "24h" ? styles["platform_page__timeframe_option--active"] : ""}`}
                      onClick={() => setSelectedTimeframe("24h")}
                    >
                      24h
                    </button>
                    <button
                      className={`${styles.platform_page__timeframe_option} ${selectedTimeframe === "7d" ? styles["platform_page__timeframe_option--active"] : ""}`}
                      onClick={() => setSelectedTimeframe("7d")}
                    >
                      7d
                    </button>
                    <button
                      className={`${styles.platform_page__timeframe_option} ${selectedTimeframe === "30d" ? styles["platform_page__timeframe_option--active"] : ""}`}
                      onClick={() => setSelectedTimeframe("30d")}
                    >
                      30d
                    </button>
                  </div>
                </div>
                <div className={styles.platform_page__performance_chart}>
                  <Chart
                    data={performanceData.serverLoad}
                    height={250}
                    type="line"
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={styles.platform_page__stats_container}
            >
              <Card className={styles.platform_page__performance_card}>
                <h3 className={styles.platform_page__performance_title}>
                  Request Statistics (Last 24 Hours)
                </h3>
                <div className={styles.platform_page__stats_grid}>
                  <div className={styles.platform_page__stat_item}>
                    <p className={styles.platform_page__stat_value}>
                      {performanceData.requestStats.totalRequests}
                    </p>
                    <p className={styles.platform_page__stat_label}>
                      Total Requests
                    </p>
                  </div>
                  <div className={styles.platform_page__stat_item}>
                    <p className={styles.platform_page__stat_value}>
                      {performanceData.requestStats.averageResponseTime}
                    </p>
                    <p className={styles.platform_page__stat_label}>
                      Avg Response Time
                    </p>
                  </div>
                  <div className={styles.platform_page__stat_item}>
                    <p className={styles.platform_page__stat_value}>
                      {performanceData.requestStats.errorRate}
                    </p>
                    <p className={styles.platform_page__stat_label}>
                      Error Rate
                    </p>
                  </div>
                  <div className={styles.platform_page__stat_item}>
                    <p className={styles.platform_page__stat_value}>
                      {performanceData.requestStats.cacheHitRate}
                    </p>
                    <p className={styles.platform_page__stat_label}>
                      Cache Hit Rate
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </SuperAdminDashboardLayout>
  );
}
