"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./security.module.scss";
import Card from "@/app/(routes)/(app)/admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/admin/_components/UI/Button/Button";
import { motion } from "framer-motion";

export default function SecurityCenterPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock security overview data
  const securityOverview = {
    securityScore: 86,
    lastScan: "2024-05-15 14:32:45",
    criticalIssues: 0,
    moderateIssues: 2,
    lowIssues: 5,
    totalAlerts: 42,
    lastBreachAttempt: "2024-05-10 03:27:18",
  };

  // Mock recent security alerts
  const securityAlerts = [
    {
      id: "ALERT-5782",
      type: "login",
      severity: "moderate",
      description: "Multiple failed login attempts",
      ip: "203.87.164.92",
      location: "Shanghai, China",
      time: "2024-05-16 08:42:15",
      status: "active",
    },
    {
      id: "ALERT-5781",
      type: "permission",
      severity: "low",
      description: "Unusual permission change detected",
      ip: "192.168.1.105",
      location: "Internal Network",
      time: "2024-05-15 16:18:22",
      status: "resolved",
    },
    {
      id: "ALERT-5780",
      type: "api",
      severity: "moderate",
      description: "API rate limit reached",
      ip: "45.123.45.67",
      location: "New York, USA",
      time: "2024-05-15 14:37:01",
      status: "active",
    },
    {
      id: "ALERT-5779",
      type: "database",
      severity: "low",
      description: "Unusual database query pattern",
      ip: "192.168.1.100",
      location: "Internal Network",
      time: "2024-05-14 22:05:43",
      status: "resolved",
    },
  ];

  // Mock data privacy settings
  const privacySettings = {
    dataEncryption: true,
    dataPurgeSchedule: "180 days",
    customerDataAccess: ["Super Admin", "Data Compliance Officer"],
    gdprCompliance: true,
    ccpaCompliance: true,
    dataExportEnabled: true,
    sensitiveDataMasking: true,
  };

  // Mock password policy settings
  const passwordPolicy = {
    minimumLength: 10,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordExpiry: 90, // days
    preventReuseCount: 5,
    passwordHistorySize: 10,
  };

  // Mock backup settings
  const backupSettings = {
    backupFrequency: "daily",
    backupTime: "02:00 AM",
    retentionPeriod: 30, // days
    backupLocation: "AWS S3",
    lastBackup: "2024-05-16 02:00:00",
    backupStatus: "success",
    autoRestoreEnabled: true,
  };

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to get severity class
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "critical":
        return styles["security_page__severity--critical"];
      case "high":
        return styles["security_page__severity--high"];
      case "moderate":
        return styles["security_page__severity--moderate"];
      case "low":
        return styles["security_page__severity--low"];
      default:
        return "";
    }
  };

  return (
    <SuperAdminDashboardLayout
      title="Security Center"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Security Center", path: "/super-admin/security" },
      ]}
    >
      <div className={styles.security_page}>
        <div className={styles.security_page__header}>
          <div>
            <h2 className={styles.security_page__title}>Security Center</h2>
            <p className={styles.security_page__description}>
              Protect your system with advanced security tools
            </p>
          </div>

          <div className={styles.security_page__actions}>
            <Button variant="primary" size="medium">
              Run Security Scan
            </Button>
          </div>
        </div>

        <div className={styles.security_page__tabs}>
          <button
            className={`${styles.security_page__tab} ${activeTab === "overview" ? styles["security_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.security_page__tab} ${activeTab === "alerts" ? styles["security_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            Security Alerts
          </button>
          <button
            className={`${styles.security_page__tab} ${activeTab === "privacy" ? styles["security_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            Data Privacy
          </button>
          <button
            className={`${styles.security_page__tab} ${activeTab === "recovery" ? styles["security_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("recovery")}
          >
            Backup & Recovery
          </button>
        </div>

        {activeTab === "overview" && (
          <div className={styles.security_page__overview}>
            <div className={styles.security_page__score_card_container}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.security_page__score_card}>
                  <div className={styles.security_page__score_header}>
                    <h3 className={styles.security_page__score_title}>
                      Security Score
                    </h3>
                    <span className={styles.security_page__score_date}>
                      Last scan: {formatDateTime(securityOverview.lastScan)}
                    </span>
                  </div>

                  <div className={styles.security_page__score_content}>
                    <div className={styles.security_page__score_chart}>
                      <svg
                        viewBox="0 0 36 36"
                        className={styles.security_page__circular_chart}
                      >
                        <path
                          className={styles.security_page__circle_bg}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={styles.security_page__circle}
                          strokeDasharray={`${securityOverview.securityScore}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text
                          x="18"
                          y="20.35"
                          className={styles.security_page__percentage}
                        >
                          {securityOverview.securityScore}%
                        </text>
                      </svg>
                    </div>

                    <div className={styles.security_page__score_issues}>
                      <div className={styles.security_page__issue_group}>
                        <div className={styles.security_page__issue_label}>
                          Critical Issues
                        </div>
                        <div
                          className={`${styles.security_page__issue_count} ${styles["security_page__issue_count--critical"]}`}
                        >
                          {securityOverview.criticalIssues}
                        </div>
                      </div>

                      <div className={styles.security_page__issue_group}>
                        <div className={styles.security_page__issue_label}>
                          Moderate Issues
                        </div>
                        <div
                          className={`${styles.security_page__issue_count} ${styles["security_page__issue_count--moderate"]}`}
                        >
                          {securityOverview.moderateIssues}
                        </div>
                      </div>

                      <div className={styles.security_page__issue_group}>
                        <div className={styles.security_page__issue_label}>
                          Low Issues
                        </div>
                        <div
                          className={`${styles.security_page__issue_count} ${styles["security_page__issue_count--low"]}`}
                        >
                          {securityOverview.lowIssues}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.security_page__score_footer}>
                    <Button variant="secondary" size="small">
                      View Details
                    </Button>
                    <Button variant="tertiary" size="small">
                      Download Report
                    </Button>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className={styles.security_page__password_policy_card}>
                  <h3 className={styles.security_page__section_title}>
                    Password Policy
                  </h3>

                  <div className={styles.security_page__policy_settings}>
                    <div className={styles.security_page__policy_setting}>
                      <div className={styles.security_page__setting_label}>
                        Minimum Length
                      </div>
                      <div className={styles.security_page__setting_value}>
                        {passwordPolicy.minimumLength} characters
                      </div>
                    </div>

                    <div className={styles.security_page__policy_setting}>
                      <div className={styles.security_page__setting_label}>
                        Character Requirements
                      </div>
                      <div className={styles.security_page__setting_value}>
                        <div className={styles.security_page__requirement_list}>
                          <div
                            className={`${styles.security_page__requirement} ${passwordPolicy.requireUppercase ? styles["security_page__requirement--active"] : ""}`}
                          >
                            Uppercase
                          </div>
                          <div
                            className={`${styles.security_page__requirement} ${passwordPolicy.requireLowercase ? styles["security_page__requirement--active"] : ""}`}
                          >
                            Lowercase
                          </div>
                          <div
                            className={`${styles.security_page__requirement} ${passwordPolicy.requireNumbers ? styles["security_page__requirement--active"] : ""}`}
                          >
                            Numbers
                          </div>
                          <div
                            className={`${styles.security_page__requirement} ${passwordPolicy.requireSpecialChars ? styles["security_page__requirement--active"] : ""}`}
                          >
                            Special Characters
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.security_page__policy_setting}>
                      <div className={styles.security_page__setting_label}>
                        Password Expiry
                      </div>
                      <div className={styles.security_page__setting_value}>
                        {passwordPolicy.passwordExpiry} days
                      </div>
                    </div>

                    <div className={styles.security_page__policy_setting}>
                      <div className={styles.security_page__setting_label}>
                        Password History
                      </div>
                      <div className={styles.security_page__setting_value}>
                        Last {passwordPolicy.preventReuseCount} passwords
                      </div>
                    </div>
                  </div>

                  <div className={styles.security_page__policy_actions}>
                    <Button variant="secondary" size="small">
                      Edit Policy
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className={styles.security_page__recent_alerts_card}>
                <div className={styles.security_page__alerts_header}>
                  <h3 className={styles.security_page__section_title}>
                    Recent Alerts
                  </h3>
                  <span className={styles.security_page__alerts_count}>
                    {securityOverview.totalAlerts} total alerts
                  </span>
                </div>

                <div className={styles.security_page__alerts_list}>
                  {securityAlerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={styles.security_page__alert_item}
                    >
                      <div className={styles.security_page__alert_type}>
                        <div
                          className={`${styles.security_page__severity} ${getSeverityClass(alert.severity)}`}
                        >
                          {alert.severity.charAt(0).toUpperCase() +
                            alert.severity.slice(1)}
                        </div>
                        <div className={styles.security_page__alert_id}>
                          {alert.id}
                        </div>
                      </div>

                      <div className={styles.security_page__alert_details}>
                        <div
                          className={styles.security_page__alert_description}
                        >
                          {alert.description}
                        </div>
                        <div className={styles.security_page__alert_meta}>
                          <span>{alert.location}</span>
                          <span>•</span>
                          <span>{formatDateTime(alert.time)}</span>
                        </div>
                      </div>

                      <div className={styles.security_page__alert_status}>
                        <span
                          className={`${styles.security_page__status} ${styles[`security_page__status--${alert.status}`]}`}
                        >
                          {alert.status.charAt(0).toUpperCase() +
                            alert.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.security_page__alerts_footer}>
                  <Button variant="secondary" size="small">
                    View All Alerts
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className={styles.security_page__alerts_tab}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.security_page__alerts_card}>
                <div className={styles.security_page__alerts_filters}>
                  <div className={styles.security_page__alerts_search}>
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      className={styles.security_page__search_input}
                    />
                  </div>

                  <div className={styles.security_page__alert_filter_group}>
                    <select className={styles.security_page__filter_select}>
                      <option value="all">All Severities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="moderate">Moderate</option>
                      <option value="low">Low</option>
                    </select>

                    <select className={styles.security_page__filter_select}>
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <select className={styles.security_page__filter_select}>
                      <option value="all">All Types</option>
                      <option value="login">Login</option>
                      <option value="permission">Permission</option>
                      <option value="api">API</option>
                      <option value="database">Database</option>
                    </select>
                  </div>
                </div>

                <div className={styles.security_page__all_alerts_list}>
                  {securityAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={styles.security_page__alert_item}
                    >
                      <div className={styles.security_page__alert_type}>
                        <div
                          className={`${styles.security_page__severity} ${getSeverityClass(alert.severity)}`}
                        >
                          {alert.severity.charAt(0).toUpperCase() +
                            alert.severity.slice(1)}
                        </div>
                        <div className={styles.security_page__alert_id}>
                          {alert.id}
                        </div>
                      </div>

                      <div className={styles.security_page__alert_details}>
                        <div
                          className={styles.security_page__alert_description}
                        >
                          {alert.description}
                        </div>
                        <div className={styles.security_page__alert_meta}>
                          <span
                            className={styles.security_page__alert_location}
                          >
                            <span className={styles.security_page__meta_label}>
                              Location:
                            </span>{" "}
                            {alert.location}
                          </span>
                          <span className={styles.security_page__alert_ip}>
                            <span className={styles.security_page__meta_label}>
                              IP:
                            </span>{" "}
                            {alert.ip}
                          </span>
                          <span className={styles.security_page__alert_time}>
                            <span className={styles.security_page__meta_label}>
                              Time:
                            </span>{" "}
                            {formatDateTime(alert.time)}
                          </span>
                        </div>
                      </div>

                      <div className={styles.security_page__alert_actions}>
                        <span
                          className={`${styles.security_page__status} ${styles[`security_page__status--${alert.status}`]}`}
                        >
                          {alert.status.charAt(0).toUpperCase() +
                            alert.status.slice(1)}
                        </span>

                        <div className={styles.security_page__alert_buttons}>
                          <button
                            className={styles.security_page__alert_button}
                          >
                            {alert.status === "active" ? "Resolve" : "Reopen"}
                          </button>
                          <button
                            className={styles.security_page__alert_button}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.security_page__pagination}>
                  <button className={styles.security_page__pagination_button}>
                    Previous
                  </button>
                  <div className={styles.security_page__pagination_pages}>
                    <button
                      className={`${styles.security_page__pagination_page} ${styles["security_page__pagination_page--active"]}`}
                    >
                      1
                    </button>
                    <button className={styles.security_page__pagination_page}>
                      2
                    </button>
                    <button className={styles.security_page__pagination_page}>
                      3
                    </button>
                    <span>...</span>
                    <button className={styles.security_page__pagination_page}>
                      12
                    </button>
                  </div>
                  <button className={styles.security_page__pagination_button}>
                    Next
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className={styles.security_page__privacy_tab}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.security_page__privacy_card}>
                <h3 className={styles.security_page__section_title}>
                  Data Privacy Settings
                </h3>

                <div className={styles.security_page__privacy_settings}>
                  <div className={styles.security_page__privacy_setting}>
                    <div className={styles.security_page__setting_header}>
                      <h4 className={styles.security_page__setting_title}>
                        Data Encryption
                      </h4>
                      <div className={styles.security_page__toggle_switch}>
                        <input
                          type="checkbox"
                          id="dataEncryption"
                          className={styles.security_page__toggle_input}
                          checked={privacySettings.dataEncryption}
                          readOnly
                        />
                        <label
                          htmlFor="dataEncryption"
                          className={styles.security_page__toggle_label}
                        >
                          <span
                            className={styles.security_page__toggle_button}
                          ></span>
                        </label>
                      </div>
                    </div>
                    <p className={styles.security_page__setting_description}>
                      Encrypt all sensitive customer data and communication
                    </p>
                  </div>

                  <div className={styles.security_page__privacy_setting}>
                    <div className={styles.security_page__setting_header}>
                      <h4 className={styles.security_page__setting_title}>
                        Data Purge Schedule
                      </h4>
                      <select className={styles.security_page__setting_select}>
                        <option value="90">90 days</option>
                        <option value="180" selected>
                          180 days
                        </option>
                        <option value="365">365 days</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                    <p className={styles.security_page__setting_description}>
                      Automatically delete inactive customer data after the
                      specified period
                    </p>
                  </div>

                  <div className={styles.security_page__privacy_setting}>
                    <div className={styles.security_page__setting_header}>
                      <h4 className={styles.security_page__setting_title}>
                        Customer Data Access
                      </h4>
                    </div>
                    <div className={styles.security_page__access_roles}>
                      {privacySettings.customerDataAccess.map((role, index) => (
                        <div
                          key={index}
                          className={styles.security_page__access_role}
                        >
                          {role}
                        </div>
                      ))}
                      <button className={styles.security_page__add_role_button}>
                        + Add Role
                      </button>
                    </div>
                    <p className={styles.security_page__setting_description}>
                      Control which roles have access to customer personal data
                    </p>
                  </div>

                  <div className={styles.security_page__privacy_setting}>
                    <div className={styles.security_page__setting_header}>
                      <h4 className={styles.security_page__setting_title}>
                        Compliance Settings
                      </h4>
                    </div>
                    <div className={styles.security_page__compliance_options}>
                      <div className={styles.security_page__compliance_option}>
                        <input
                          type="checkbox"
                          id="gdprCompliance"
                          className={styles.security_page__checkbox}
                          checked={privacySettings.gdprCompliance}
                          readOnly
                        />
                        <label
                          htmlFor="gdprCompliance"
                          className={styles.security_page__checkbox_label}
                        >
                          GDPR Compliance (EU)
                        </label>
                      </div>

                      <div className={styles.security_page__compliance_option}>
                        <input
                          type="checkbox"
                          id="ccpaCompliance"
                          className={styles.security_page__checkbox}
                          checked={privacySettings.ccpaCompliance}
                          readOnly
                        />
                        <label
                          htmlFor="ccpaCompliance"
                          className={styles.security_page__checkbox_label}
                        >
                          CCPA Compliance (California)
                        </label>
                      </div>

                      <div className={styles.security_page__compliance_option}>
                        <input
                          type="checkbox"
                          id="dataExport"
                          className={styles.security_page__checkbox}
                          checked={privacySettings.dataExportEnabled}
                          readOnly
                        />
                        <label
                          htmlFor="dataExport"
                          className={styles.security_page__checkbox_label}
                        >
                          Enable customer data export requests
                        </label>
                      </div>

                      <div className={styles.security_page__compliance_option}>
                        <input
                          type="checkbox"
                          id="dataMasking"
                          className={styles.security_page__checkbox}
                          checked={privacySettings.sensitiveDataMasking}
                          readOnly
                        />
                        <label
                          htmlFor="dataMasking"
                          className={styles.security_page__checkbox_label}
                        >
                          Mask sensitive data in logs and reports
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.security_page__privacy_actions}>
                  <Button variant="primary" size="medium">
                    Save Privacy Settings
                  </Button>
                  <Button variant="secondary" size="medium">
                    Privacy Audit
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "recovery" && (
          <div className={styles.security_page__recovery_tab}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.security_page__backup_card}>
                <div className={styles.security_page__backup_header}>
                  <h3 className={styles.security_page__section_title}>
                    Backup & Recovery
                  </h3>
                  <div className={styles.security_page__backup_status}>
                    <span className={styles.security_page__backup_label}>
                      Last Backup:
                    </span>
                    <span className={styles.security_page__backup_time}>
                      {formatDateTime(backupSettings.lastBackup)}
                    </span>
                    <span
                      className={`${styles.security_page__backup_result} ${styles[`security_page__backup_result--${backupSettings.backupStatus}`]}`}
                    >
                      {backupSettings.backupStatus.charAt(0).toUpperCase() +
                        backupSettings.backupStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <div className={styles.security_page__backup_settings}>
                  <div className={styles.security_page__backup_setting}>
                    <div className={styles.security_page__setting_label}>
                      Backup Frequency
                    </div>
                    <select className={styles.security_page__setting_select}>
                      <option value="hourly">Hourly</option>
                      <option value="daily" selected>
                        Daily
                      </option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className={styles.security_page__backup_setting}>
                    <div className={styles.security_page__setting_label}>
                      Backup Time
                    </div>
                    <input
                      type="time"
                      value="02:00"
                      className={styles.security_page__setting_input}
                    />
                  </div>

                  <div className={styles.security_page__backup_setting}>
                    <div className={styles.security_page__setting_label}>
                      Retention Period
                    </div>
                    <select className={styles.security_page__setting_select}>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30" selected>
                        30 days
                      </option>
                      <option value="90">90 days</option>
                      <option value="365">365 days</option>
                    </select>
                  </div>

                  <div className={styles.security_page__backup_setting}>
                    <div className={styles.security_page__setting_label}>
                      Backup Location
                    </div>
                    <select className={styles.security_page__setting_select}>
                      <option value="local">Local Storage</option>
                      <option value="aws" selected>
                        AWS S3
                      </option>
                      <option value="gcp">Google Cloud Storage</option>
                      <option value="azure">Azure Blob Storage</option>
                    </select>
                  </div>

                  <div className={styles.security_page__backup_setting}>
                    <div className={styles.security_page__setting_header}>
                      <h4 className={styles.security_page__setting_title}>
                        Auto Restore on Failure
                      </h4>
                      <div className={styles.security_page__toggle_switch}>
                        <input
                          type="checkbox"
                          id="autoRestore"
                          className={styles.security_page__toggle_input}
                          checked={backupSettings.autoRestoreEnabled}
                          readOnly
                        />
                        <label
                          htmlFor="autoRestore"
                          className={styles.security_page__toggle_label}
                        >
                          <span
                            className={styles.security_page__toggle_button}
                          ></span>
                        </label>
                      </div>
                    </div>
                    <p className={styles.security_page__setting_description}>
                      Automatically restore from backup in case of system
                      failure
                    </p>
                  </div>
                </div>

                <div className={styles.security_page__backup_actions}>
                  <Button variant="primary" size="medium">
                    Save Backup Settings
                  </Button>
                  <Button variant="secondary" size="medium">
                    Backup Now
                  </Button>
                  <Button variant="tertiary" size="medium">
                    Restore from Backup
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className={styles.security_page__backup_history_card}>
                <h3 className={styles.security_page__section_title}>
                  Backup History
                </h3>

                <div className={styles.security_page__backup_history}>
                  <div className={styles.security_page__backup_history_header}>
                    <div className={styles.security_page__history_column}>
                      Date & Time
                    </div>
                    <div className={styles.security_page__history_column}>
                      Type
                    </div>
                    <div className={styles.security_page__history_column}>
                      Size
                    </div>
                    <div className={styles.security_page__history_column}>
                      Status
                    </div>
                    <div className={styles.security_page__history_column}>
                      Actions
                    </div>
                  </div>

                  <div className={styles.security_page__backup_history_row}>
                    <div className={styles.security_page__history_column}>
                      May 16, 2024 02:00 AM
                    </div>
                    <div className={styles.security_page__history_column}>
                      Scheduled
                    </div>
                    <div className={styles.security_page__history_column}>
                      2.4 GB
                    </div>
                    <div className={styles.security_page__history_column}>
                      <span
                        className={`${styles.security_page__backup_result} ${styles["security_page__backup_result--success"]}`}
                      >
                        Success
                      </span>
                    </div>
                    <div className={styles.security_page__history_column}>
                      <button className={styles.security_page__history_button}>
                        Restore
                      </button>
                      <button className={styles.security_page__history_button}>
                        Download
                      </button>
                    </div>
                  </div>

                  <div className={styles.security_page__backup_history_row}>
                    <div className={styles.security_page__history_column}>
                      May 15, 2024 02:00 AM
                    </div>
                    <div className={styles.security_page__history_column}>
                      Scheduled
                    </div>
                    <div className={styles.security_page__history_column}>
                      2.3 GB
                    </div>
                    <div className={styles.security_page__history_column}>
                      <span
                        className={`${styles.security_page__backup_result} ${styles["security_page__backup_result--success"]}`}
                      >
                        Success
                      </span>
                    </div>
                    <div className={styles.security_page__history_column}>
                      <button className={styles.security_page__history_button}>
                        Restore
                      </button>
                      <button className={styles.security_page__history_button}>
                        Download
                      </button>
                    </div>
                  </div>

                  <div className={styles.security_page__backup_history_row}>
                    <div className={styles.security_page__history_column}>
                      May 14, 2024 02:00 AM
                    </div>
                    <div className={styles.security_page__history_column}>
                      Scheduled
                    </div>
                    <div className={styles.security_page__history_column}>
                      2.3 GB
                    </div>
                    <div className={styles.security_page__history_column}>
                      <span
                        className={`${styles.security_page__backup_result} ${styles["security_page__backup_result--success"]}`}
                      >
                        Success
                      </span>
                    </div>
                    <div className={styles.security_page__history_column}>
                      <button className={styles.security_page__history_button}>
                        Restore
                      </button>
                      <button className={styles.security_page__history_button}>
                        Download
                      </button>
                    </div>
                  </div>

                  <div className={styles.security_page__backup_history_row}>
                    <div className={styles.security_page__history_column}>
                      May 13, 2024 02:00 AM
                    </div>
                    <div className={styles.security_page__history_column}>
                      Scheduled
                    </div>
                    <div className={styles.security_page__history_column}>
                      2.2 GB
                    </div>
                    <div className={styles.security_page__history_column}>
                      <span
                        className={`${styles.security_page__backup_result} ${styles["security_page__backup_result--success"]}`}
                      >
                        Success
                      </span>
                    </div>
                    <div className={styles.security_page__history_column}>
                      <button className={styles.security_page__history_button}>
                        Restore
                      </button>
                      <button className={styles.security_page__history_button}>
                        Download
                      </button>
                    </div>
                  </div>

                  <div className={styles.security_page__backup_history_row}>
                    <div className={styles.security_page__history_column}>
                      May 12, 2024 15:42 PM
                    </div>
                    <div className={styles.security_page__history_column}>
                      Manual
                    </div>
                    <div className={styles.security_page__history_column}>
                      2.2 GB
                    </div>
                    <div className={styles.security_page__history_column}>
                      <span
                        className={`${styles.security_page__backup_result} ${styles["security_page__backup_result--success"]}`}
                      >
                        Success
                      </span>
                    </div>
                    <div className={styles.security_page__history_column}>
                      <button className={styles.security_page__history_button}>
                        Restore
                      </button>
                      <button className={styles.security_page__history_button}>
                        Download
                      </button>
                    </div>
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
