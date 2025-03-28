"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./staff.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import { motion } from "framer-motion";

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Cleaning Specialist",
      email: "michael.rodriguez@metromellow.com",
      phone: "(555) 123-4567",
      hireDate: "Jan 15, 2023",
      services: ["House Cleaning", "Office Cleaning"],
      averageRating: 4.8,
      completedJobs: 156,
      status: "active",
      availability: "Full-time",
      image: "👨‍💼",
    },
    {
      id: 2,
      name: "Emma Davis",
      role: "Laundry & Household Specialist",
      email: "emma.davis@metromellow.com",
      phone: "(555) 234-5678",
      hireDate: "Mar 22, 2023",
      services: ["Laundry Service", "Grocery Shopping"],
      averageRating: 4.9,
      completedJobs: 143,
      status: "active",
      availability: "Part-time",
      image: "👩‍💼",
    },
    {
      id: 3,
      name: "James Garcia",
      role: "Chef & Cooking Expert",
      email: "james.garcia@metromellow.com",
      phone: "(555) 345-6789",
      hireDate: "Apr 10, 2023",
      services: ["Cooking Service", "Meal Preparation"],
      averageRating: 4.7,
      completedJobs: 98,
      status: "active",
      availability: "Full-time",
      image: "👨‍🍳",
    },
    {
      id: 4,
      name: "Sophia Martinez",
      role: "Pest Control Specialist",
      email: "sophia.martinez@metromellow.com",
      phone: "(555) 456-7890",
      hireDate: "Jun 5, 2023",
      services: ["Pest Control", "Preventative Treatment"],
      averageRating: 4.6,
      completedJobs: 87,
      status: "active",
      availability: "Full-time",
      image: "👩‍🔧",
    },
    {
      id: 5,
      name: "William Johnson",
      role: "Cleaning Specialist",
      email: "william.johnson@metromellow.com",
      phone: "(555) 567-8901",
      hireDate: "Aug 15, 2023",
      services: ["House Cleaning", "Deep Cleaning"],
      averageRating: 4.5,
      completedJobs: 76,
      status: "inactive",
      availability: "On Leave",
      image: "👨‍💼",
    },
    {
      id: 6,
      name: "Olivia Thompson",
      role: "Errands Specialist",
      email: "olivia.thompson@metromellow.com",
      phone: "(555) 678-9012",
      hireDate: "Oct 12, 2023",
      services: ["Grocery Shopping", "General Errands"],
      averageRating: 4.7,
      completedJobs: 65,
      status: "active",
      availability: "Part-time",
      image: "👩‍💼",
    },
  ];

  // Filter staff based on active tab
  const filteredStaff = staffMembers.filter((staff) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return staff.status === "active";
    if (activeTab === "inactive") return staff.status === "inactive";
    return true;
  });

  // Staff statistics
  const staffStats = [
    { label: "Total Staff", value: staffMembers.length },
    {
      label: "Active Staff",
      value: staffMembers.filter((s) => s.status === "active").length,
    },
    {
      label: "Full-time",
      value: staffMembers.filter((s) => s.availability === "Full-time").length,
    },
    {
      label: "Part-time",
      value: staffMembers.filter((s) => s.availability === "Part-time").length,
    },
  ];

  return (
    <AdminDashboardLayout
      title="Staff Management"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Staff", path: "/admin/staff" },
      ]}
    >
      <div className={styles.staff_page}>
        <div className={styles.staff_page__header}>
          <div className={styles.staff_page__title_area}>
            <h2 className={styles.staff_page__title}>Staff Management</h2>
            <p className={styles.staff_page__subtitle}>
              View and manage your service providers
            </p>
          </div>

          <div className={styles.staff_page__actions}>
            <Button variant="primary" size="medium" icon="+">
              Add Staff Member
            </Button>
          </div>
        </div>

        <div className={styles.staff_page__stats}>
          {staffStats.map((stat, index) => (
            <Card key={index} className={styles.staff_page__stat_card}>
              <h3 className={styles.staff_page__stat_label}>{stat.label}</h3>
              <p className={styles.staff_page__stat_value}>{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className={styles.staff_page__tabs}>
          <button
            className={`${styles.staff_page__tab} ${activeTab === "all" ? styles["staff_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Staff
          </button>
          <button
            className={`${styles.staff_page__tab} ${activeTab === "active" ? styles["staff_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active
          </button>
          <button
            className={`${styles.staff_page__tab} ${activeTab === "inactive" ? styles["staff_page__tab--active"] : ""}`}
            onClick={() => setActiveTab("inactive")}
          >
            Inactive
          </button>
        </div>

        <div className={styles.staff_page__grid}>
          {filteredStaff.map((staffMember) => (
            <motion.div
              key={staffMember.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={styles.staff_page__staff_card}>
                <div className={styles.staff_page__staff_header}>
                  <div className={styles.staff_page__staff_avatar}>
                    {staffMember.image}
                  </div>

                  <div className={styles.staff_page__staff_info}>
                    <h3 className={styles.staff_page__staff_name}>
                      {staffMember.name}
                    </h3>
                    <p className={styles.staff_page__staff_role}>
                      {staffMember.role}
                    </p>
                  </div>

                  <div className={styles.staff_page__staff_status}>
                    <span
                      className={`${styles.staff_page__status_indicator} ${staffMember.status === "active" ? styles["staff_page__status_indicator--active"] : styles["staff_page__status_indicator--inactive"]}`}
                    >
                      {staffMember.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className={styles.staff_page__staff_details}>
                  <div className={styles.staff_page__detail_item}>
                    <span className={styles.staff_page__detail_label}>
                      Email:
                    </span>
                    <span className={styles.staff_page__detail_value}>
                      {staffMember.email}
                    </span>
                  </div>

                  <div className={styles.staff_page__detail_item}>
                    <span className={styles.staff_page__detail_label}>
                      Phone:
                    </span>
                    <span className={styles.staff_page__detail_value}>
                      {staffMember.phone}
                    </span>
                  </div>

                  <div className={styles.staff_page__detail_item}>
                    <span className={styles.staff_page__detail_label}>
                      Services:
                    </span>
                    <span className={styles.staff_page__detail_value}>
                      {staffMember.services.join(", ")}
                    </span>
                  </div>

                  <div className={styles.staff_page__detail_item}>
                    <span className={styles.staff_page__detail_label}>
                      Availability:
                    </span>
                    <span className={styles.staff_page__detail_value}>
                      {staffMember.availability}
                    </span>
                  </div>
                </div>

                <div className={styles.staff_page__staff_metrics}>
                  <div className={styles.staff_page__metric}>
                    <span className={styles.staff_page__metric_value}>
                      {staffMember.completedJobs}
                    </span>
                    <span className={styles.staff_page__metric_label}>
                      Jobs
                    </span>
                  </div>

                  <div className={styles.staff_page__metric}>
                    <span className={styles.staff_page__metric_value}>
                      {staffMember.averageRating}
                    </span>
                    <span className={styles.staff_page__metric_label}>
                      Rating
                    </span>
                  </div>

                  <div className={styles.staff_page__metric}>
                    <span className={styles.staff_page__metric_value}>
                      {new Date(staffMember.hireDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short" }
                      )}
                    </span>
                    <span className={styles.staff_page__metric_label}>
                      Since
                    </span>
                  </div>
                </div>

                <div className={styles.staff_page__staff_actions}>
                  <Button variant="outline" size="small">
                    View Profile
                  </Button>
                  <Button variant="tertiary" size="small">
                    Schedule
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
