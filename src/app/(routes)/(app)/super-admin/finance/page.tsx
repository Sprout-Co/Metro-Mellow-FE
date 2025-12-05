"use client";
import { useState } from "react";
import SuperAdminDashboardLayout from "../_components/SuperAdminDashboardLayout/SuperAdminDashboardLayout";
import styles from "./finance.module.scss";
import Card from "@/app/(routes)/(app)/admin/_components/UI/Card/Card";
import Button from "@/app/(routes)/(app)/admin/_components/UI/Button/Button";
import Chart from "@/app/(routes)/(app)/admin/_components/UI/Chart/Chart";
import { motion } from "framer-motion";

export default function FinancialAdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedQuarter, setSelectedQuarter] = useState("Q3");

  // Mock financial overview data
  const overviewData = {
    totalRevenue: 589420,
    netProfit: 256180,
    operatingExpenses: 254320,
    outstandingPayments: 32140,
    revenueGrowth: 18.6,
    profitMargin: 43.5,
  };

  // Mock revenue data for chart
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
          42500, 48300, 53600, 61200, 58700, 63100, 68400, 72300, 76500, 81200,
          84600, 88300,
        ],
        color: "#606c38",
      },
      {
        label: "Expenses",
        data: [
          18500, 19200, 22800, 25600, 24200, 26500, 28700, 31200, 32800, 34600,
          36100, 38200,
        ],
        color: "#db5226",
      },
    ],
  };

  // Mock service revenue breakdown
  const serviceRevenue = [
    {
      service: "Cleaning Services",
      revenue: 235768,
      percentage: 40,
      growth: 22.5,
    },
    {
      service: "Laundry Services",
      revenue: 141460,
      percentage: 24,
      growth: 15.3,
    },
    {
      service: "Cooking Services",
      revenue: 94307,
      percentage: 16,
      growth: 18.7,
    },
    { service: "Pest Control", revenue: 82518, percentage: 14, growth: 12.2 },
    { service: "Errands", revenue: 35365, percentage: 6, growth: 8.5 },
  ];

  // Mock payment transactions
  const recentTransactions = [
    {
      id: "T-38291",
      customer: "Sarah Johnson",
      amount: 249.99,
      service: "Cleaning Services",
      date: "2024-05-16",
      status: "completed",
    },
    {
      id: "T-38290",
      customer: "Michael Davis",
      amount: 185.5,
      service: "Laundry Services",
      date: "2024-05-15",
      status: "completed",
    },
    {
      id: "T-38289",
      customer: "Emily Wilson",
      amount: 320.0,
      service: "Cooking Services",
      date: "2024-05-15",
      status: "processing",
    },
    {
      id: "T-38288",
      customer: "David Thompson",
      amount: 195.75,
      service: "Pest Control",
      date: "2024-05-14",
      status: "completed",
    },
    {
      id: "T-38287",
      customer: "Jennifer Martinez",
      amount: 75.25,
      service: "Errands",
      date: "2024-05-14",
      status: "failed",
    },
    {
      id: "T-38286",
      customer: "Robert Garcia",
      amount: 249.99,
      service: "Cleaning Services",
      date: "2024-05-13",
      status: "completed",
    },
    {
      id: "T-38285",
      customer: "Jessica Brown",
      amount: 185.5,
      service: "Laundry Services",
      date: "2024-05-13",
      status: "completed",
    },
  ];

  // Mock tax settings
  const taxSettings = {
    salesTax: 8.25,
    includeTaxInPrices: false,
    taxExemptServices: ["Errands"],
    enableAutomaticTaxCalculation: true,
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  // Calculate total revenue
  const totalRevenue = serviceRevenue.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );

  return (
    <SuperAdminDashboardLayout
      title="Financial Administration"
      breadcrumbs={[
        { label: "Home", path: "/super-admin" },
        { label: "Financial Admin", path: "/super-admin/finance" },
      ]}
    >
      <div className={styles.finance_page}>
        <div className={styles.finance_page__header}>
          <div>
            <h2 className={styles.finance_page__title}>
              Financial Administration
            </h2>
            <p className={styles.finance_page__description}>
              System-wide financial management and reporting
            </p>
          </div>

          <div className={styles.finance_page__filters}>
            <div className={styles.finance_page__filter}>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={styles.finance_page__select}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            <div className={styles.finance_page__filter}>
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className={styles.finance_page__select}
              >
                <option value="Q1">Q1 (Jan-Mar)</option>
                <option value="Q3">Q3 (Apr-Jun)</option>
                <option value="Q3">Q3 (Jul-Sep)</option>
                <option value="Q4">Q4 (Oct-Dec)</option>
                <option value="YTD">Year to Date</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.finance_page__tabs}>
          <button
            className={`${styles.finance_page__tab} ${activeTab === "overview" ? styles["finance_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.finance_page__tab} ${activeTab === "revenue" ? styles["finance_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("revenue")}
          >
            Revenue Analysis
          </button>
          <button
            className={`${styles.finance_page__tab} ${activeTab === "transactions" ? styles["finance_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
          <button
            className={`${styles.finance_page__tab} ${activeTab === "settings" ? styles["finance_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Tax Settings
          </button>
        </div>

        {activeTab === "overview" && (
          <div className={styles.finance_page__overview}>
            <div className={styles.finance_page__metrics}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.finance_page__metric_card}>
                  <h3 className={styles.finance_page__metric_title}>
                    Total Revenue
                  </h3>
                  <p className={styles.finance_page__metric_value}>
                    {formatCurrency(overviewData.totalRevenue)}
                  </p>
                  <div className={styles.finance_page__metric_trend}>
                    <span className={styles.finance_page__trend_icon}>↑</span>
                    <span className={styles.finance_page__trend_value}>
                      {formatPercentage(overviewData.revenueGrowth)} vs last{" "}
                      {selectedQuarter}
                    </span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className={styles.finance_page__metric_card}>
                  <h3 className={styles.finance_page__metric_title}>
                    Net Profit
                  </h3>
                  <p className={styles.finance_page__metric_value}>
                    {formatCurrency(overviewData.netProfit)}
                  </p>
                  <div className={styles.finance_page__metric_trend}>
                    <span className={styles.finance_page__trend_value}>
                      Margin: {formatPercentage(overviewData.profitMargin)}
                    </span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className={styles.finance_page__metric_card}>
                  <h3 className={styles.finance_page__metric_title}>
                    Operating Expenses
                  </h3>
                  <p className={styles.finance_page__metric_value}>
                    {formatCurrency(overviewData.operatingExpenses)}
                  </p>
                  <div className={styles.finance_page__metric_trend}>
                    <span className={styles.finance_page__trend_value}>
                      {formatPercentage(100 - overviewData.profitMargin)} of
                      revenue
                    </span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className={styles.finance_page__metric_card}>
                  <h3 className={styles.finance_page__metric_title}>
                    Outstanding Payments
                  </h3>
                  <p className={styles.finance_page__metric_value}>
                    {formatCurrency(overviewData.outstandingPayments)}
                  </p>
                  <div className={styles.finance_page__metric_trend}>
                    <span className={styles.finance_page__trend_value}>
                      {formatPercentage(
                        (overviewData.outstandingPayments /
                          overviewData.totalRevenue) *
                          100
                      )}{" "}
                      of revenue
                    </span>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className={styles.finance_page__charts}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className={styles.finance_page__chart_container}
              >
                <Card className={styles.finance_page__chart_card}>
                  <h3 className={styles.finance_page__chart_title}>
                    Revenue vs Expenses
                  </h3>
                  <div className={styles.finance_page__chart}>
                    <Chart data={revenueData} height={350} type="line" />
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className={styles.finance_page__revenue_analysis}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.finance_page__revenue_card}>
                <h3 className={styles.finance_page__section_title}>
                  Revenue by Service
                </h3>

                <div className={styles.finance_page__revenue_table}>
                  <div className={styles.finance_page__revenue_header}>
                    <div className={styles.finance_page__revenue_cell}>
                      Service
                    </div>
                    <div className={styles.finance_page__revenue_cell}>
                      Revenue
                    </div>
                    <div className={styles.finance_page__revenue_cell}>
                      % of Total
                    </div>
                    <div className={styles.finance_page__revenue_cell}>
                      Growth
                    </div>
                  </div>

                  {serviceRevenue.map((service, index) => (
                    <div
                      key={index}
                      className={styles.finance_page__revenue_row}
                    >
                      <div className={styles.finance_page__revenue_cell}>
                        <span className={styles.finance_page__service_name}>
                          {service.service}
                        </span>
                      </div>
                      <div className={styles.finance_page__revenue_cell}>
                        <span className={styles.finance_page__revenue_amount}>
                          {formatCurrency(service.revenue)}
                        </span>
                      </div>
                      <div className={styles.finance_page__revenue_cell}>
                        <div
                          className={
                            styles.finance_page__percentage_bar_container
                          }
                        >
                          <div
                            className={styles.finance_page__percentage_bar}
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                          <span
                            className={styles.finance_page__percentage_value}
                          >
                            {service.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className={styles.finance_page__revenue_cell}>
                        <span
                          className={`${styles.finance_page__growth} ${service.growth >= 0 ? styles["finance_page__growth--positive"] : styles["finance_page__growth--negative"]}`}
                        >
                          {service.growth >= 0 ? "↑" : "↓"}{" "}
                          {Math.abs(service.growth)}%
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className={styles.finance_page__revenue_footer}>
                    <div className={styles.finance_page__revenue_cell}>
                      <span className={styles.finance_page__total_label}>
                        Total
                      </span>
                    </div>
                    <div className={styles.finance_page__revenue_cell}>
                      <span className={styles.finance_page__total_value}>
                        {formatCurrency(totalRevenue)}
                      </span>
                    </div>
                    <div className={styles.finance_page__revenue_cell}>
                      <span className={styles.finance_page__total_value}>
                        100%
                      </span>
                    </div>
                    <div className={styles.finance_page__revenue_cell}>
                      <span className={styles.finance_page__total_value}>
                        {formatPercentage(overviewData.revenueGrowth)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.finance_page__revenue_actions}>
                  <Button variant="secondary" size="small">
                    Export Data
                  </Button>
                  <Button variant="secondary" size="small">
                    Detailed Analysis
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className={styles.finance_page__transactions}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.finance_page__transactions_card}>
                <div className={styles.finance_page__transactions_header}>
                  <h3 className={styles.finance_page__section_title}>
                    Recent Transactions
                  </h3>

                  <div className={styles.finance_page__transactions_filter}>
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className={styles.finance_page__search_input}
                    />
                    <select className={styles.finance_page__status_filter}>
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="processing">Processing</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                <div className={styles.finance_page__transactions_table}>
                  <div
                    className={styles.finance_page__transactions_table_header}
                  >
                    <div className={styles.finance_page__transactions_cell}>
                      Transaction ID
                    </div>
                    <div className={styles.finance_page__transactions_cell}>
                      Customer
                    </div>
                    <div className={styles.finance_page__transactions_cell}>
                      Amount
                    </div>
                    <div className={styles.finance_page__transactions_cell}>
                      Service
                    </div>
                    <div className={styles.finance_page__transactions_cell}>
                      Date
                    </div>
                    <div className={styles.finance_page__transactions_cell}>
                      Status
                    </div>
                  </div>

                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className={styles.finance_page__transactions_table_row}
                    >
                      <div className={styles.finance_page__transactions_cell}>
                        <span className={styles.finance_page__transaction_id}>
                          {transaction.id}
                        </span>
                      </div>
                      <div className={styles.finance_page__transactions_cell}>
                        <span className={styles.finance_page__customer_name}>
                          {transaction.customer}
                        </span>
                      </div>
                      <div className={styles.finance_page__transactions_cell}>
                        <span
                          className={styles.finance_page__transaction_amount}
                        >
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                      <div className={styles.finance_page__transactions_cell}>
                        <span className={styles.finance_page__service_type}>
                          {transaction.service}
                        </span>
                      </div>
                      <div className={styles.finance_page__transactions_cell}>
                        <span className={styles.finance_page__transaction_date}>
                          {transaction.date}
                        </span>
                      </div>
                      <div className={styles.finance_page__transactions_cell}>
                        <span
                          className={`${styles.finance_page__transaction_status} ${styles[`finance_page__transaction_status--${transaction.status}`]}`}
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.finance_page__transactions_pagination}>
                  <button className={styles.finance_page__pagination_button}>
                    Previous
                  </button>
                  <div className={styles.finance_page__pagination_pages}>
                    <button
                      className={`${styles.finance_page__pagination_page} ${styles["finance_page__pagination_page--active"]}`}
                    >
                      1
                    </button>
                    <button className={styles.finance_page__pagination_page}>
                      2
                    </button>
                    <button className={styles.finance_page__pagination_page}>
                      3
                    </button>
                    <span>...</span>
                    <button className={styles.finance_page__pagination_page}>
                      10
                    </button>
                  </div>
                  <button className={styles.finance_page__pagination_button}>
                    Next
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.finance_page__settings}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.finance_page__settings_card}>
                <h3 className={styles.finance_page__section_title}>
                  Tax Settings
                </h3>

                <div className={styles.finance_page__settings_form}>
                  <div className={styles.finance_page__form_group}>
                    <label className={styles.finance_page__label}>
                      Sales Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={taxSettings.salesTax}
                      className={styles.finance_page__input}
                    />
                  </div>

                  <div className={styles.finance_page__form_group}>
                    <div className={styles.finance_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="includeTax"
                        checked={taxSettings.includeTaxInPrices}
                        className={styles.finance_page__checkbox}
                      />
                      <label
                        htmlFor="includeTax"
                        className={styles.finance_page__checkbox_label}
                      >
                        Include tax in displayed prices
                      </label>
                    </div>
                  </div>

                  <div className={styles.finance_page__form_group}>
                    <div className={styles.finance_page__checkbox_group}>
                      <input
                        type="checkbox"
                        id="automaticTax"
                        checked={taxSettings.enableAutomaticTaxCalculation}
                        className={styles.finance_page__checkbox}
                      />
                      <label
                        htmlFor="automaticTax"
                        className={styles.finance_page__checkbox_label}
                      >
                        Enable automatic tax calculation
                      </label>
                    </div>
                  </div>

                  <div className={styles.finance_page__form_group}>
                    <label className={styles.finance_page__label}>
                      Tax Exempt Services
                    </label>
                    <div className={styles.finance_page__tax_exempt_services}>
                      {[
                        "Cleaning Services",
                        "Laundry Services",
                        "Cooking Services",
                        "Pest Control",
                        "Errands",
                      ].map((service) => (
                        <div
                          key={service}
                          className={styles.finance_page__checkbox_group}
                        >
                          <input
                            type="checkbox"
                            id={`exempt-${service.replace(/\s+/g, "-").toLowerCase()}`}
                            checked={taxSettings.taxExemptServices.includes(
                              service
                            )}
                            className={styles.finance_page__checkbox}
                          />
                          <label
                            htmlFor={`exempt-${service.replace(/\s+/g, "-").toLowerCase()}`}
                            className={styles.finance_page__checkbox_label}
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.finance_page__payment_gateway_section}>
                    <h4 className={styles.finance_page__subsection_title}>
                      Payment Gateway Configuration
                    </h4>

                    <div className={styles.finance_page__gateway_buttons}>
                      <div className={styles.finance_page__gateway_button}>
                        <div className={styles.finance_page__gateway_icon}>
                          💳
                        </div>
                        <div className={styles.finance_page__gateway_content}>
                          <span className={styles.finance_page__gateway_name}>
                            Stripe
                          </span>
                          <span className={styles.finance_page__gateway_status}>
                            Connected
                          </span>
                        </div>
                      </div>

                      <div className={styles.finance_page__gateway_button}>
                        <div className={styles.finance_page__gateway_icon}>
                          💸
                        </div>
                        <div className={styles.finance_page__gateway_content}>
                          <span className={styles.finance_page__gateway_name}>
                            PayPal
                          </span>
                          <span className={styles.finance_page__gateway_status}>
                            Connected
                          </span>
                        </div>
                      </div>

                      <div className={styles.finance_page__gateway_button}>
                        <div className={styles.finance_page__gateway_icon}>
                          🏦
                        </div>
                        <div className={styles.finance_page__gateway_content}>
                          <span className={styles.finance_page__gateway_name}>
                            Bank Transfer
                          </span>
                          <span className={styles.finance_page__gateway_status}>
                            Configure
                          </span>
                        </div>
                      </div>

                      <div className={styles.finance_page__gateway_button}>
                        <div className={styles.finance_page__gateway_icon}>
                          ➕
                        </div>
                        <div className={styles.finance_page__gateway_content}>
                          <span className={styles.finance_page__gateway_name}>
                            Add Payment Method
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.finance_page__buttons}>
                    <Button variant="primary" size="medium">
                      Save Tax Settings
                    </Button>
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
