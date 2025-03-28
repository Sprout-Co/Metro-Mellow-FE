"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./marketing.module.scss";
import Card from "@/app/(routes)/(app)/super-admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/super-admin/_components/UI/Button/Button";
import Chart from "@/app/(routes)/(app)/super-admin/_components/UI/Chart/Chart";
import { motion } from "framer-motion";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [timeframe, setTimeframe] = useState("30d");

  // Mock active campaigns
  const activeCampaigns = [
    {
      id: 1,
      title: "Spring Cleaning Special",
      status: "active",
      description:
        "Promotional campaign offering 15% off on all cleaning services for the spring season.",
      stats: {
        reach: "14,250",
        conversions: "342",
      },
      startDate: "2024-04-01",
      endDate: "2024-05-31",
    },
    {
      id: 2,
      title: "New Customer Discount",
      status: "active",
      description: "Offering 20% off on first booking for new customers.",
      stats: {
        reach: "8,750",
        conversions: "218",
      },
      startDate: "2024-03-15",
      endDate: "2024-06-15",
    },
    {
      id: 3,
      title: "Referral Program",
      status: "active",
      description:
        "Rewarding existing customers for referring new clients with $25 credit.",
      stats: {
        reach: "3,680",
        conversions: "156",
      },
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: 4,
      title: "Summer Promo",
      status: "scheduled",
      description:
        "Summer special offers on outdoor cleaning and pest control services.",
      stats: {
        reach: "0",
        conversions: "0",
      },
      startDate: "2024-06-01",
      endDate: "2024-08-31",
    },
    {
      id: 5,
      title: "Holiday Special",
      status: "draft",
      description:
        "End of year promotions for holiday season cleaning services.",
      stats: {
        reach: "0",
        conversions: "0",
      },
      startDate: "2024-11-15",
      endDate: "2024-12-31",
    },
  ];

  // Mock performance metrics
  const performanceMetrics = [
    {
      title: "Website Visitors",
      value: "32,456",
      comparison: "12.4%",
      isPositive: true,
      icon: "🌐",
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      comparison: "0.6%",
      isPositive: true,
      icon: "📈",
    },
    {
      title: "Cost Per Acquisition",
      value: "$28.50",
      comparison: "-3.2%",
      isPositive: true,
      icon: "💰",
    },
    {
      title: "Avg. Engagement",
      value: "2:34 min",
      comparison: "8.5%",
      isPositive: true,
      icon: "👁️",
    },
  ];

  // Mock chart data
  const conversionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Website Traffic",
        data: [8200, 8500, 9100, 9800],
        color: "#606c38",
      },
      {
        label: "Conversions",
        data: [380, 415, 462, 495],
        color: "#2c2e43",
      },
    ],
  };

  const campaignPerformanceData = {
    labels: [
      "Spring Cleaning",
      "New Customer",
      "Referral",
      "Email Campaign",
      "Social Media",
    ],
    datasets: [
      {
        label: "Conversion Rate",
        data: [5.2, 4.8, 6.5, 3.8, 4.2],
        color: "#606c38",
      },
    ],
  };

  // Mock traffic sources
  const trafficSources = [
    {
      name: "Organic Search",
      icon: "🔍",
      visitors: "14,256",
      percentage: "43.9%",
      conversion: "4.2%",
    },
    {
      name: "Direct",
      icon: "🔗",
      visitors: "8,392",
      percentage: "25.9%",
      conversion: "5.1%",
    },
    {
      name: "Social Media",
      icon: "👥",
      visitors: "5,218",
      percentage: "16.1%",
      conversion: "3.8%",
    },
    {
      name: "Email",
      icon: "✉️",
      visitors: "3,120",
      percentage: "9.6%",
      conversion: "7.2%",
    },
    {
      name: "Referral",
      icon: "👋",
      visitors: "1,470",
      percentage: "4.5%",
      conversion: "6.3%",
    },
  ];

  // Mock content library
  const contentLibrary = [
    {
      id: 1,
      type: "Blog Post",
      title: "Spring Cleaning Tips for a Fresh Home",
      description:
        "Comprehensive guide to effective spring cleaning strategies.",
      image: "🧹",
      date: "May 10, 2024",
      status: "Published",
    },
    {
      id: 2,
      type: "Social Media",
      title: "Before & After Cleaning Series",
      description:
        "Visual content showing transformation of spaces after cleaning.",
      image: "📷",
      date: "May 5, 2024",
      status: "Published",
    },
    {
      id: 3,
      type: "Email Template",
      title: "Monthly Newsletter",
      description: "Regular updates and tips for subscribers with promotions.",
      image: "📧",
      date: "May 1, 2024",
      status: "Published",
    },
    {
      id: 4,
      type: "Video",
      title: "How to Efficiently Clean Your Kitchen",
      description: "Step-by-step video guide for kitchen cleaning.",
      image: "🎬",
      date: "Apr 25, 2024",
      status: "Published",
    },
    {
      id: 5,
      type: "Infographic",
      title: "Cleaning Checklist",
      description: "Visual guide for comprehensive home cleaning.",
      image: "📊",
      date: "Apr 18, 2024",
      status: "Published",
    },
  ];

  // Mock email campaigns
  const emailCampaigns = [
    {
      id: 1,
      subject: "Spring Cleaning Special - 15% Off All Services",
      status: "sent",
      recipients: 2450,
      opens: 1842,
      clicks: 468,
      date: "May 5, 2024",
    },
    {
      id: 2,
      subject: "Metro Mellow Monthly Newsletter - May 2024",
      status: "sent",
      recipients: 3218,
      opens: 2105,
      clicks: 542,
      date: "May 1, 2024",
    },
    {
      id: 3,
      subject: "Exclusive Offer for Loyal Customers",
      status: "scheduled",
      recipients: 1850,
      opens: 0,
      clicks: 0,
      date: "May 20, 2024",
    },
    {
      id: 4,
      subject: "Summer Services Preview",
      status: "draft",
      recipients: 0,
      opens: 0,
      clicks: 0,
      date: "-",
    },
    {
      id: 5,
      subject: "Cleaning Tips & Tricks from Our Experts",
      status: "sent",
      recipients: 3150,
      opens: 1968,
      clicks: 412,
      date: "Apr 20, 2024",
    },
  ];

  // Mock email performance metrics
  const emailMetrics = {
    openRate: "65.2%",
    clickRate: "24.8%",
    conversionRate: "5.4%",
    unsubscribeRate: "0.8%",
  };

  return (
    <SuperAdminDashboardLayout
      title="Marketing"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Marketing", path: "/super-admin/marketing" },
      ]}
    >
      <div className={styles.marketing_page}>
        <div className={styles.marketing_page__header}>
          <div>
            <h2 className={styles.marketing_page__title}>
              Marketing Management
            </h2>
            <p className={styles.marketing_page__description}>
              Campaigns, content, and marketing performance
            </p>
          </div>

          <div className={styles.marketing_page__actions}>
            <Button variant="primary" size="medium">
              Create Campaign
            </Button>
          </div>
        </div>

        <div className={styles.marketing_page__tabs}>
          <button
            className={`${styles.marketing_page__tab} ${activeTab === "campaigns" ? styles["marketing_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("campaigns")}
          >
            Campaigns
          </button>
          <button
            className={`${styles.marketing_page__tab} ${activeTab === "performance" ? styles["marketing_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </button>
          <button
            className={`${styles.marketing_page__tab} ${activeTab === "content" ? styles["marketing_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Content Library
          </button>
          <button
            className={`${styles.marketing_page__tab} ${activeTab === "email" ? styles["marketing_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("email")}
          >
            Email Marketing
          </button>
        </div>

        {activeTab === "campaigns" && (
          <div className={styles.marketing_page__campaigns}>
            <Card className={styles.marketing_page__active_campaigns}>
              <div className={styles.marketing_page__campaigns_header}>
                <h3 className={styles.marketing_page__campaigns_title}>
                  Active & Upcoming Campaigns
                </h3>
              </div>

              <div className={styles.marketing_page__campaigns_grid}>
                {activeCampaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={styles.marketing_page__campaign_card}>
                      <div className={styles.marketing_page__campaign_header}>
                        <h4 className={styles.marketing_page__campaign_title}>
                          {campaign.title}
                        </h4>
                        <span
                          className={`${styles.marketing_page__campaign_badge} ${styles[`marketing_page__campaign_badge--${campaign.status}`]}`}
                        >
                          {campaign.status.charAt(0).toUpperCase() +
                            campaign.status.slice(1)}
                        </span>
                      </div>
                      <p
                        className={styles.marketing_page__campaign_description}
                      >
                        {campaign.description}
                      </p>
                      <div className={styles.marketing_page__campaign_stats}>
                        <div className={styles.marketing_page__stat}>
                          <p className={styles.marketing_page__stat_value}>
                            {campaign.stats.reach}
                          </p>
                          <p className={styles.marketing_page__stat_label}>
                            Reach
                          </p>
                        </div>
                        <div className={styles.marketing_page__stat}>
                          <p className={styles.marketing_page__stat_value}>
                            {campaign.stats.conversions}
                          </p>
                          <p className={styles.marketing_page__stat_label}>
                            Conversions
                          </p>
                        </div>
                      </div>
                      <div className={styles.marketing_page__campaign_time}>
                        <div>
                          <span className={styles.marketing_page__time_label}>
                            Start:
                          </span>{" "}
                          {campaign.startDate}
                        </div>
                        <div>
                          <span className={styles.marketing_page__time_label}>
                            End:
                          </span>{" "}
                          {campaign.endDate}
                        </div>
                      </div>
                      <div className={styles.marketing_page__campaign_actions}>
                        <Button
                          variant="secondary"
                          size="small"
                          className={styles.marketing_page__action}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="small"
                          className={styles.marketing_page__action}
                        >
                          Analyze
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={styles.marketing_page__new_campaign_card}
                >
                  <div className={styles.marketing_page__new_campaign_icon}>
                    +
                  </div>
                  <h4 className={styles.marketing_page__new_campaign_title}>
                    Create New Campaign
                  </h4>
                  <p className={styles.marketing_page__new_campaign_text}>
                    Set up a new marketing campaign
                  </p>
                </motion.div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "performance" && (
          <div className={styles.marketing_page__performance}>
            <div className={styles.marketing_page__performance_metrics}>
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={styles.marketing_page__metric_card}>
                    <div className={styles.marketing_page__metric_header}>
                      <h3 className={styles.marketing_page__metric_title}>
                        {metric.title}
                      </h3>
                      <div className={styles.marketing_page__metric_icon}>
                        {metric.icon}
                      </div>
                    </div>
                    <p className={styles.marketing_page__metric_value}>
                      {metric.value}
                    </p>
                    <div className={styles.marketing_page__metric_comparison}>
                      vs Previous Period:
                      <span
                        className={`${styles.marketing_page__comparison_value} ${
                          metric.isPositive
                            ? styles[
                                "marketing_page__comparison_value--positive"
                              ]
                            : styles[
                                "marketing_page__comparison_value--negative"
                              ]
                        }`}
                      >
                        {metric.isPositive ? "+" : ""}
                        {metric.comparison}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className={styles.marketing_page__performance_charts}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card className={styles.marketing_page__chart_card}>
                  <div className={styles.marketing_page__chart_header}>
                    <h3 className={styles.marketing_page__chart_title}>
                      Conversion Funnel
                    </h3>
                    <div className={styles.marketing_page__chart_time_selector}>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "7d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("7d")}
                      >
                        7d
                      </button>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "30d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("30d")}
                      >
                        30d
                      </button>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "90d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("90d")}
                      >
                        90d
                      </button>
                    </div>
                  </div>
                  <div className={styles.marketing_page__chart}>
                    <Chart data={conversionData} height={300} type="line" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Card className={styles.marketing_page__chart_card}>
                  <div className={styles.marketing_page__chart_header}>
                    <h3 className={styles.marketing_page__chart_title}>
                      Campaign Performance
                    </h3>
                    <div className={styles.marketing_page__chart_time_selector}>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "7d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("7d")}
                      >
                        7d
                      </button>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "30d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("30d")}
                      >
                        30d
                      </button>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "90d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("90d")}
                      >
                        90d
                      </button>
                    </div>
                  </div>
                  <div className={styles.marketing_page__chart}>
                    <Chart
                      data={campaignPerformanceData}
                      height={300}
                      type="bar"
                    />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Card className={styles.marketing_page__sources_card}>
                  <h3 className={styles.marketing_page__sources_title}>
                    Traffic Sources
                  </h3>
                  <div className={styles.marketing_page__sources_container}>
                    {trafficSources.map((source, index) => (
                      <div
                        key={index}
                        className={styles.marketing_page__source_item}
                      >
                        <div className={styles.marketing_page__source_header}>
                          <div className={styles.marketing_page__source_icon}>
                            {source.icon}
                          </div>
                          <div className={styles.marketing_page__source_name}>
                            {source.name}
                          </div>
                        </div>
                        <div className={styles.marketing_page__source_stats}>
                          <div className={styles.marketing_page__source_stat}>
                            <span
                              className={
                                styles.marketing_page__source_stat_label
                              }
                            >
                              Visitors:
                            </span>
                            <span
                              className={
                                styles.marketing_page__source_stat_value
                              }
                            >
                              {source.visitors}
                            </span>
                          </div>
                          <div className={styles.marketing_page__source_stat}>
                            <span
                              className={
                                styles.marketing_page__source_stat_label
                              }
                            >
                              Share:
                            </span>
                            <span
                              className={
                                styles.marketing_page__source_stat_value
                              }
                            >
                              {source.percentage}
                            </span>
                          </div>
                          <div className={styles.marketing_page__source_stat}>
                            <span
                              className={
                                styles.marketing_page__source_stat_label
                              }
                            >
                              Conversion:
                            </span>
                            <span
                              className={
                                styles.marketing_page__source_stat_value
                              }
                            >
                              {source.conversion}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={styles.marketing_page__content_library}>
              <div className={styles.marketing_page__content_header}>
                <h3 className={styles.marketing_page__campaigns_title}>
                  Content Library
                </h3>
                <div className={styles.marketing_page__content_actions}>
                  <div className={styles.marketing_page__content_search}>
                    <span className={styles.marketing_page__search_icon}>
                      🔍
                    </span>
                    <input
                      type="text"
                      placeholder="Search content..."
                      className={styles.marketing_page__search_input}
                    />
                  </div>
                  <select className={styles.marketing_page__content_filter}>
                    <option value="all">All Types</option>
                    <option value="blog">Blog Posts</option>
                    <option value="social">Social Media</option>
                    <option value="email">Email Templates</option>
                    <option value="video">Videos</option>
                    <option value="infographic">Infographics</option>
                  </select>
                  <Button variant="secondary" size="medium">
                    Create Content
                  </Button>
                </div>
              </div>

              <div className={styles.marketing_page__content_grid}>
                {contentLibrary.map((content) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={styles.marketing_page__content_card}>
                      <div className={styles.marketing_page__content_image}>
                        <span style={{ fontSize: "48px" }}>
                          {content.image}
                        </span>
                      </div>
                      <div className={styles.marketing_page__content_details}>
                        <p className={styles.marketing_page__content_type}>
                          {content.type}
                        </p>
                        <h4 className={styles.marketing_page__content_title}>
                          {content.title}
                        </h4>
                        <p
                          className={styles.marketing_page__content_description}
                        >
                          {content.description}
                        </p>
                        <div className={styles.marketing_page__content_meta}>
                          <span className={styles.marketing_page__content_date}>
                            {content.date}
                          </span>
                          <span>{content.status}</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className={styles.marketing_page__new_content_card}>
                    <div className={styles.marketing_page__new_content_icon}>
                      +
                    </div>
                    <h4 className={styles.marketing_page__new_content_title}>
                      Create New Content
                    </h4>
                    <p className={styles.marketing_page__new_content_text}>
                      Add blog post, social media content, or email template
                    </p>
                  </Card>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "email" && (
          <div className={styles.marketing_page__email}>
            <div className={styles.marketing_page__email_dashboard}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.marketing_page__email_stats}>
                  <div className={styles.marketing_page__email_stats_header}>
                    <h3 className={styles.marketing_page__email_stats_title}>
                      Email Performance Metrics
                    </h3>
                    <p
                      className={styles.marketing_page__email_stats_description}
                    >
                      Last 30 days email marketing performance
                    </p>
                  </div>
                  <div className={styles.marketing_page__email_metrics}>
                    <div className={styles.marketing_page__email_metric}>
                      <p className={styles.marketing_page__email_metric_value}>
                        {emailMetrics.openRate}
                      </p>
                      <p className={styles.marketing_page__email_metric_label}>
                        Open Rate
                      </p>
                    </div>
                    <div className={styles.marketing_page__email_metric}>
                      <p className={styles.marketing_page__email_metric_value}>
                        {emailMetrics.clickRate}
                      </p>
                      <p className={styles.marketing_page__email_metric_label}>
                        Click Rate
                      </p>
                    </div>
                    <div className={styles.marketing_page__email_metric}>
                      <p className={styles.marketing_page__email_metric_value}>
                        {emailMetrics.conversionRate}
                      </p>
                      <p className={styles.marketing_page__email_metric_label}>
                        Conversion Rate
                      </p>
                    </div>
                    <div className={styles.marketing_page__email_metric}>
                      <p className={styles.marketing_page__email_metric_value}>
                        {emailMetrics.unsubscribeRate}
                      </p>
                      <p className={styles.marketing_page__email_metric_label}>
                        Unsubscribe Rate
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className={styles.marketing_page__email_chart}>
                  <div className={styles.marketing_page__chart_header}>
                    <h3 className={styles.marketing_page__chart_title}>
                      Email Performance Trend
                    </h3>
                    <div className={styles.marketing_page__chart_time_selector}>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "7d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("7d")}
                      >
                        7d
                      </button>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "30d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("30d")}
                      >
                        30d
                      </button>
                      <button
                        className={`${styles.marketing_page__time_option} ${timeframe === "90d" ? styles["marketing_page__time_option--active"] : ""}`}
                        onClick={() => setTimeframe("90d")}
                      >
                        90d
                      </button>
                    </div>
                  </div>
                  <div className={styles.marketing_page__chart}>
                    {/* Placeholder for email performance chart */}
                    <Chart data={conversionData} height={300} type="line" />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className={styles.marketing_page__recent_emails}>
                  <div className={styles.marketing_page__recent_emails_header}>
                    <h3 className={styles.marketing_page__recent_emails_title}>
                      Email Campaigns
                    </h3>
                    <Button variant="primary" size="medium">
                      Create Email
                    </Button>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table className={styles.marketing_page__emails_table}>
                      <thead>
                        <tr>
                          <th className={styles.marketing_page__emails_header}>
                            Subject
                          </th>
                          <th className={styles.marketing_page__emails_header}>
                            Status
                          </th>
                          <th className={styles.marketing_page__emails_header}>
                            Recipients
                          </th>
                          <th className={styles.marketing_page__emails_header}>
                            Performance
                          </th>
                          <th className={styles.marketing_page__emails_header}>
                            Date
                          </th>
                          <th className={styles.marketing_page__emails_header}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailCampaigns.map((email) => (
                          <tr
                            key={email.id}
                            className={styles.marketing_page__emails_row}
                          >
                            <td className={styles.marketing_page__emails_cell}>
                              <span
                                className={styles.marketing_page__email_subject}
                              >
                                {email.subject}
                              </span>
                            </td>
                            <td className={styles.marketing_page__emails_cell}>
                              <span
                                className={`${styles.marketing_page__email_status} ${styles[`marketing_page__email_status--${email.status}`]}`}
                              >
                                {email.status.charAt(0).toUpperCase() +
                                  email.status.slice(1)}
                              </span>
                            </td>
                            <td className={styles.marketing_page__emails_cell}>
                              {email.recipients > 0
                                ? email.recipients.toLocaleString()
                                : "-"}
                            </td>
                            <td className={styles.marketing_page__emails_cell}>
                              {email.status === "sent" ? (
                                <div
                                  className={styles.marketing_page__email_stats}
                                >
                                  <span className="opens">
                                    {Math.round(
                                      (email.opens / email.recipients) * 100
                                    )}
                                    % opens
                                  </span>
                                  <span className="clicks">
                                    {Math.round(
                                      (email.clicks / email.recipients) * 100
                                    )}
                                    % clicks
                                  </span>
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className={styles.marketing_page__emails_cell}>
                              <span
                                className={styles.marketing_page__email_date}
                              >
                                {email.date}
                              </span>
                            </td>
                            <td className={styles.marketing_page__emails_cell}>
                              <div
                                className={styles.marketing_page__email_actions}
                              >
                                <button
                                  className={
                                    styles.marketing_page__email_action
                                  }
                                >
                                  View
                                </button>
                                {email.status !== "sent" && (
                                  <button
                                    className={
                                      styles.marketing_page__email_action
                                    }
                                  >
                                    Edit
                                  </button>
                                )}
                                {email.status === "sent" && (
                                  <button
                                    className={
                                      styles.marketing_page__email_action
                                    }
                                  >
                                    Report
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminDashboardLayout>
  );
}
