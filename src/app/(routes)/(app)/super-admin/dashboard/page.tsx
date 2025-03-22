"use client";
import { useState } from "react";
import styles from "./dashboard.module.scss";
import Card from "@/app/(routes)/(app)/admin/_components/UI/Card/Card";
import Chart from "@/app/(routes)/(app)/admin/_components/UI/Chart/Chart";
import { motion } from "framer-motion";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";

export default function SuperAdminDashboardPage() {
  // System stats data
  const systemStats = [
    {
      title: "Active Admins",
      value: "12",
      icon: "👤",
      change: "+2 this month",
      color: "primary",
    },
    {
      title: "System Health",
      value: "98.6%",
      icon: "📊",
      change: "0.2% higher than last week",
      color: "success",
    },
    {
      title: "Security Score",
      value: "94/100",
      icon: "🔒",
      change: "+3 points improvement",
      color: "secondary",
    },
    {
      title: "API Requests",
      value: "2.4M",
      icon: "🌐",
      change: "12% more than usual",
      color: "info",
    },
  ];

  // System activity data
  const activityData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        label: "API Requests",
        data: [250, 120, 310, 580, 460, 320],
        color: "#606c38",
      },
      {
        label: "Web Sessions",
        data: [180, 90, 240, 480, 380, 280],
        color: "#2c2e43",
      },
    ],
  };

  // Recent admin activities
  const adminActivities = [
    {
      admin: "John Smith",
      action: "Modified service pricing",
      target: "House Cleaning",
      time: "10 minutes ago",
      ip: "192.168.1.45",
    },
    {
      admin: "Emily Davis",
      action: "Added new admin user",
      target: "Robert Johnson",
      time: "2 hours ago",
      ip: "192.168.1.112",
    },
    {
      admin: "Michael Wilson",
      action: "Updated system settings",
      target: "Payment Gateway Configuration",
      time: "5 hours ago",
      ip: "192.168.1.78",
    },
    {
      admin: "Sarah Thompson",
      action: "Generated global report",
      target: "Q2 Financial Summary",
      time: "Yesterday, 16:42",
      ip: "192.168.1.23",
    },
    {
      admin: "David Martinez",
      action: "Modified permissions",
      target: "Staff Role Group",
      time: "Yesterday, 10:15",
      ip: "192.168.1.55",
    },
  ];

  // System alerts
  const systemAlerts = [
    {
      type: "warning",
      message: "Database storage approaching 80% capacity",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "System update available (v2.4.1)",
      time: "5 hours ago",
    },
    {
      type: "success",
      message: "Automated backup completed successfully",
      time: "Today, 03:00 AM",
    },
    {
      type: "error",
      message: "Failed login attempts detected from unusual IP",
      time: "Yesterday, 22:15 PM",
    },
  ];

  return (
    <SuperAdminDashboardLayout
      title="Super Admin Dashboard"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Dashboard", path: "/super-admin/dashboard" },
      ]}
    >
      <div className={styles.dashboard_page}>
        <div className={styles.dashboard_page__header}>
          <h2 className={styles.dashboard_page__welcome}>
            Welcome, Super Admin
          </h2>
          <p className={styles.dashboard_page__description}>
            System overview and administrative control center
          </p>
        </div>

        <div className={styles.dashboard_page__stats}>
          {systemStats.map((stat, index) => (
            <Card
              key={index}
              className={`${styles.dashboard_page__stat_card} ${styles[`dashboard_page__stat_card--${stat.color}`]}`}
            >
              <div className={styles.dashboard_page__stat_icon}>
                {stat.icon}
              </div>
              <div className={styles.dashboard_page__stat_content}>
                <h3 className={styles.dashboard_page__stat_title}>
                  {stat.title}
                </h3>
                <p className={styles.dashboard_page__stat_value}>
                  {stat.value}
                </p>
                <span className={styles.dashboard_page__stat_change}>
                  {stat.change}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.dashboard_page__main_grid}>
          <Card className={styles.dashboard_page__system_activity}>
            <h3 className={styles.dashboard_page__section_title}>
              System Activity
            </h3>
            <p className={styles.dashboard_page__section_description}>
              Today's system performance and usage metrics
            </p>
            <div className={styles.dashboard_page__chart}>
              <Chart data={activityData} height={250} type="line" />
            </div>
          </Card>

          <Card className={styles.dashboard_page__admin_activity}>
            <h3 className={styles.dashboard_page__section_title}>
              Recent Admin Activity
            </h3>
            <div className={styles.dashboard_page__activity_list}>
              {adminActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className={styles.dashboard_page__activity_item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className={styles.dashboard_page__activity_user}>
                    {activity.admin}
                  </div>
                  <div className={styles.dashboard_page__activity_details}>
                    <span className={styles.dashboard_page__activity_action}>
                      {activity.action}
                    </span>
                    <span className={styles.dashboard_page__activity_target}>
                      {activity.target}
                    </span>
                  </div>
                  <div className={styles.dashboard_page__activity_meta}>
                    <span className={styles.dashboard_page__activity_time}>
                      {activity.time}
                    </span>
                    <span className={styles.dashboard_page__activity_ip}>
                      {activity.ip}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className={styles.dashboard_page__system_alerts}>
            <h3 className={styles.dashboard_page__section_title}>
              System Alerts
            </h3>
            <div className={styles.dashboard_page__alerts_list}>
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`${styles.dashboard_page__alert_item} ${styles[`dashboard_page__alert_item--${alert.type}`]}`}
                >
                  <div className={styles.dashboard_page__alert_icon}>
                    {alert.type === "warning" && "⚠️"}
                    {alert.type === "info" && "ℹ️"}
                    {alert.type === "success" && "✅"}
                    {alert.type === "error" && "❌"}
                  </div>
                  <div className={styles.dashboard_page__alert_content}>
                    <p className={styles.dashboard_page__alert_message}>
                      {alert.message}
                    </p>
                    <span className={styles.dashboard_page__alert_time}>
                      {alert.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.dashboard_page__quick_actions}>
            <h3 className={styles.dashboard_page__section_title}>
              Quick Actions
            </h3>
            <div className={styles.dashboard_page__actions_grid}>
              <button className={styles.dashboard_page__action_button}>
                <span className={styles.dashboard_page__action_icon}>👥</span>
                <span className={styles.dashboard_page__action_label}>
                  Manage Users
                </span>
              </button>
              <button className={styles.dashboard_page__action_button}>
                <span className={styles.dashboard_page__action_icon}>🔄</span>
                <span className={styles.dashboard_page__action_label}>
                  System Backup
                </span>
              </button>
              <button className={styles.dashboard_page__action_button}>
                <span className={styles.dashboard_page__action_icon}>📊</span>
                <span className={styles.dashboard_page__action_label}>
                  View Reports
                </span>
              </button>
              <button className={styles.dashboard_page__action_button}>
                <span className={styles.dashboard_page__action_icon}>⚙️</span>
                <span className={styles.dashboard_page__action_label}>
                  System Config
                </span>
              </button>
              <button className={styles.dashboard_page__action_button}>
                <span className={styles.dashboard_page__action_icon}>🔒</span>
                <span className={styles.dashboard_page__action_label}>
                  Security Audit
                </span>
              </button>
              <button className={styles.dashboard_page__action_button}>
                <span className={styles.dashboard_page__action_icon}>📝</span>
                <span className={styles.dashboard_page__action_label}>
                  Activity Logs
                </span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </SuperAdminDashboardLayout>
  );
}
