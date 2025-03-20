'use client';
import { useState } from 'react';
import AdminDashboardLayout from './_components/AdminDashboardLayout/AdminDashboardLayout';
import styles from "./style.module.scss";
import MetricCard from './_components/UI/MetricCard/MetricCard';
import ServicePerformance from './_components/UI/ServicePerformance/ServicePerformance';
import RevenueMetrics from './_components/UI/RevenueMetrics/RevenueMetrics';
import RecentBookings from './_components/UI/RecentBookings/RecentBookings';

export default function AdminPage() {

    const metricsData = [
      {
        title: "Bookings Completed",
        value: "24/38",
        icon: "$",
        progress: {
          current: 24,
          total: 38,
          label: "Bookings Completed",
        },
        color: "primary",
      },
      {
        title: "Leads Converted",
        value: "32/45",
        icon: "↑",
        progress: {
          current: 32,
          total: 45,
          label: "Leads Converted",
        },
        color: "secondary",
      },
      {
        title: "Projects In Progress",
        value: "12/20",
        icon: "□",
        progress: {
          current: 12,
          total: 20,
          label: "Projects In Progress",
        },
        color: "success",
      },
      {
        title: "Customer Satisfaction",
        value: "72.4%",
        icon: "%",
        progress: {
          current: 72.4,
          total: 100,
          label: "Customer Satisfaction",
        },
        color: "info",
      },
    ];

    const serviceData = {
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
            15000, 22000, 18000, 22000, 28000, 18000, 38000, 18000, 32000,
            22000, 25000, 18000,
          ],
          color: "#606c38",
        },
        {
          label: "Trend",
          data: [
            12000, 18000, 15000, 20000, 25000, 17000, 30000, 17000, 28000,
            20000, 22000, 17000,
          ],
          color: "#db5226",
        },
      ],
    };

    const recentBookings = [
      {
        id: "1",
        service: {
          name: "House Cleaning",
          type: "cleaning",
        },
        customer: {
          name: "Sarah Johnson",
        },
        price: 120,
        scheduledAt: "Today, 2:30 PM",
        status: "active",
      },
      {
        id: "2",
        service: {
          name: "Laundry Service",
          type: "laundry",
        },
        customer: {
          name: "Michael Davis",
        },
        price: 85,
        scheduledAt: "Tomorrow, 10:00 AM",
        status: "pending",
      },
      {
        id: "3",
        service: {
          name: "Cooking Service",
          type: "cooking",
        },
        customer: {
          name: "Emily Wilson",
        },
        price: 175,
        scheduledAt: "Fri, May 19, 5:00 PM",
        status: "pending",
      },
    ];
  

    return (
      <AdminDashboardLayout
        title="Dashboard"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard" },
        ]}
      >
        <div className={styles.dashboard_page}>
          <div className={styles.dashboard_page__metrics}>
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

          <div className={styles.dashboard_page__main_content}>
            <div className={styles.dashboard_page__chart_container}>
              <ServicePerformance serviceData={serviceData} />
            </div>

            <div className={styles.dashboard_page__side_content}>
              <div className={styles.dashboard_page__revenue}>
                <RevenueMetrics revenue={32642} percentageIncrease={18} />
              </div>

              <div className={styles.dashboard_page__bookings}>
                <RecentBookings bookings={recentBookings} />
              </div>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    );
}