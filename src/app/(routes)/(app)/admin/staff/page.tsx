"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./staff.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import { motion } from "framer-motion";
import { useStaffOperations } from "@/graphql/hooks/staff/useStaffOperations";
import { StaffStatus } from "@/graphql/api";
import StaffProfileModal from "./_components/StaffProfileModal/StaffProfileModal";

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");
  const [staffProfiles, setStaffProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  const { handleGetStaffProfiles, handleUpdateStaffStatus } = useStaffOperations();

  useEffect(() => {
    fetchStaffProfiles();
  }, []);

  const fetchStaffProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const profiles = await handleGetStaffProfiles();
      setStaffProfiles(profiles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch staff profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (staffId: string, newStatus: StaffStatus) => {
    try {
      await handleUpdateStaffStatus(staffId, newStatus);
      await fetchStaffProfiles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update staff status");
    }
  };

  const handleViewProfile = (staffId: string) => {
    setSelectedStaffId(staffId);
    setIsProfileModalOpen(true);
  };

  // Filter staff based on active tab
  const filteredStaff = staffProfiles.filter((staff) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return staff.status === "ACTIVE";
    if (activeTab === "inactive") return staff.status === "INACTIVE";
    return true;
  });

  // Staff statistics
  const staffStats = [
    { label: "Total Staff", value: staffProfiles.length },
    {
      label: "Active Staff",
      value: staffProfiles.filter((s) => s.status === "ACTIVE").length,
    },
    {
      label: "Completed Jobs",
      value: staffProfiles.reduce((total, s) => total + (s.completedJobs || 0), 0),
    },
    {
      label: "Avg Rating",
      value: staffProfiles.length > 0 
        ? (staffProfiles.reduce((total, s) => total + (s.rating || 0), 0) / staffProfiles.length).toFixed(1)
        : "0.0",
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
            <Button 
              variant="primary" 
              size="medium" 
              icon="+"
              onClick={() => setIsProfileModalOpen(true)}
            >
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

        {error && (
          <div className={styles.staff_page__error}>
            <p>{error}</p>
            <Button variant="outline" size="small" onClick={fetchStaffProfiles}>
              Retry
            </Button>
          </div>
        )}

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
          {loading ? (
            <div className={styles.staff_page__loading}>
              <div className={styles.loading_spinner}></div>
              <p>Loading staff members...</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className={styles.staff_page__empty}>
              <h3>No Staff Members Found</h3>
              <p>No staff members match the current filter criteria.</p>
            </div>
          ) : (
            filteredStaff.map((staffMember, index) => (
              <motion.div
                key={staffMember.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={styles.staff_page__staff_card}>
                  <div className={styles.staff_page__staff_header}>
                    <div className={styles.staff_page__staff_avatar}>
                      {staffMember.user?.firstName?.[0] || "S"}
                      {staffMember.user?.lastName?.[0] || "M"}
                    </div>

                    <div className={styles.staff_page__staff_info}>
                      <h3 className={styles.staff_page__staff_name}>
                        {staffMember.user?.firstName} {staffMember.user?.lastName}
                      </h3>
                      <p className={styles.staff_page__staff_role}>
                        {staffMember.serviceCategories?.join(", ") || "Service Provider"}
                      </p>
                    </div>

                    <div className={styles.staff_page__staff_status}>
                      <span
                        className={`${styles.staff_page__status_indicator} ${
                          staffMember.status === "ACTIVE" 
                            ? styles["staff_page__status_indicator--active"] 
                            : styles["staff_page__status_indicator--inactive"]
                        }`}
                      >
                        {staffMember.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.staff_page__staff_details}>
                    <div className={styles.staff_page__detail_item}>
                      <span className={styles.staff_page__detail_label}>
                        Email:
                      </span>
                      <span className={styles.staff_page__detail_value}>
                        {staffMember.user?.email || "N/A"}
                      </span>
                    </div>

                    <div className={styles.staff_page__detail_item}>
                      <span className={styles.staff_page__detail_label}>
                        Services:
                      </span>
                      <span className={styles.staff_page__detail_value}>
                        {staffMember.serviceCategories?.join(", ") || "None assigned"}
                      </span>
                    </div>

                    <div className={styles.staff_page__detail_item}>
                      <span className={styles.staff_page__detail_label}>
                        Documents:
                      </span>
                      <span className={styles.staff_page__detail_value}>
                        {staffMember.documents?.length || 0} uploaded
                      </span>
                    </div>
                  </div>

                  <div className={styles.staff_page__staff_metrics}>
                    <div className={styles.staff_page__metric}>
                      <span className={styles.staff_page__metric_value}>
                        {staffMember.completedJobs || 0}
                      </span>
                      <span className={styles.staff_page__metric_label}>
                        Jobs
                      </span>
                    </div>

                    <div className={styles.staff_page__metric}>
                      <span className={styles.staff_page__metric_value}>
                        {staffMember.rating ? staffMember.rating.toFixed(1) : "N/A"}
                      </span>
                      <span className={styles.staff_page__metric_label}>
                        Rating
                      </span>
                    </div>

                    <div className={styles.staff_page__metric}>
                      <span className={styles.staff_page__metric_value}>
                        {new Date(staffMember.createdAt).toLocaleDateString(
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
                    <Button 
                      variant="outline" 
                      size="small"
                      onClick={() => handleViewProfile(staffMember.id)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="tertiary" 
                      size="small"
                      onClick={() => handleStatusUpdate(
                        staffMember.id, 
                        staffMember.status === "ACTIVE" ? StaffStatus.Inactive : StaffStatus.Active
                      )}
                    >
                      {staffMember.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {isProfileModalOpen && (
          <StaffProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => {
              setIsProfileModalOpen(false);
              setSelectedStaffId(null);
            }}
            staffId={selectedStaffId}
            onSuccess={() => {
              setIsProfileModalOpen(false);
              setSelectedStaffId(null);
              fetchStaffProfiles();
            }}
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
}
