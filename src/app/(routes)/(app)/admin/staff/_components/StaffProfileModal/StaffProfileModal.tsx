"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./StaffProfileModal.module.scss";
import { useStaffOperations } from "@/graphql/hooks/staff/useStaffOperations";

interface StaffProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffId: string | null;
  onSuccess: () => void;
}

const StaffProfileModal: React.FC<StaffProfileModalProps> = ({
  isOpen,
  onClose,
  staffId,
  onSuccess,
}) => {
  const { handleGetStaffProfiles } = useStaffOperations();
  const [staffProfile, setStaffProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && staffId) {
      fetchStaffProfile();
    }
  }, [isOpen, staffId]);

  const fetchStaffProfile = async () => {
    if (!staffId) return;
    
    try {
      setLoading(true);
      setError(null);
      // For now, we'll get all profiles and find the one we need
      // In a real implementation, you'd want a getStaffProfileById query
      const profiles = await handleGetStaffProfiles();
      const profile = profiles?.find((p: any) => p.id === staffId);
      setStaffProfile(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch staff profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatAvailability = (availability: any[]) => {
    if (!availability || availability.length === 0) return "No schedule set";
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return availability
      .filter(a => a.isAvailable)
      .map(a => `${days[a.dayOfWeek]}: ${a.startTime} - ${a.endTime}`)
      .join(", ");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modal_overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal_content}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal_header}>
            <h2 className={styles.modal_title}>
              {staffId ? "Staff Profile" : "Create New Staff Profile"}
            </h2>
            <button
              className={styles.modal_close}
              onClick={onClose}
              type="button"
            >
              ×
            </button>
          </div>

          <div className={styles.modal_body}>
            {loading ? (
              <div className={styles.modal_loading}>
                <div className={styles.loading_spinner}></div>
                <p>Loading staff profile...</p>
              </div>
            ) : error ? (
              <div className={styles.modal_error}>
                <p>{error}</p>
                <button 
                  className={styles.retry_btn}
                  onClick={fetchStaffProfile}
                >
                  Retry
                </button>
              </div>
            ) : staffProfile ? (
              <div className={styles.profile_content}>
                <div className={styles.profile_header}>
                  <div className={styles.profile_avatar}>
                    {staffProfile.user?.firstName?.[0] || "S"}
                    {staffProfile.user?.lastName?.[0] || "M"}
                  </div>
                  <div className={styles.profile_basic_info}>
                    <h3 className={styles.profile_name}>
                      {staffProfile.user?.firstName} {staffProfile.user?.lastName}
                    </h3>
                    <p className={styles.profile_email}>{staffProfile.user?.email}</p>
                    <span className={`${styles.profile_status} ${
                      staffProfile.status === "ACTIVE" 
                        ? styles.profile_status_active 
                        : styles.profile_status_inactive
                    }`}>
                      {staffProfile.status}
                    </span>
                  </div>
                </div>

                <div className={styles.profile_sections}>
                  <div className={styles.profile_section}>
                    <h4 className={styles.section_title}>Performance Metrics</h4>
                    <div className={styles.metrics_grid}>
                      <div className={styles.metric_item}>
                        <span className={styles.metric_value}>{staffProfile.totalJobs || 0}</span>
                        <span className={styles.metric_label}>Total Jobs</span>
                      </div>
                      <div className={styles.metric_item}>
                        <span className={styles.metric_value}>{staffProfile.completedJobs || 0}</span>
                        <span className={styles.metric_label}>Completed</span>
                      </div>
                      <div className={styles.metric_item}>
                        <span className={styles.metric_value}>{staffProfile.activeJobs || 0}</span>
                        <span className={styles.metric_label}>Active</span>
                      </div>
                      <div className={styles.metric_item}>
                        <span className={styles.metric_value}>
                          {staffProfile.rating ? staffProfile.rating.toFixed(1) : "N/A"}
                        </span>
                        <span className={styles.metric_label}>Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.profile_section}>
                    <h4 className={styles.section_title}>Service Categories</h4>
                    <div className={styles.service_categories}>
                      {staffProfile.serviceCategories?.map((category: string) => (
                        <span key={category} className={styles.service_tag}>
                          {category.replace("_", " ")}
                        </span>
                      )) || <span className={styles.no_data}>No services assigned</span>}
                    </div>
                  </div>

                  <div className={styles.profile_section}>
                    <h4 className={styles.section_title}>Availability</h4>
                    <p className={styles.availability_text}>
                      {formatAvailability(staffProfile.availability)}
                    </p>
                  </div>

                  <div className={styles.profile_section}>
                    <h4 className={styles.section_title}>Documents</h4>
                    <div className={styles.documents_list}>
                      {staffProfile.documents?.length > 0 ? (
                        staffProfile.documents.map((doc: any) => (
                          <div key={doc.id} className={styles.document_item}>
                            <span className={styles.document_type}>{doc.type}</span>
                            <span className={`${styles.document_status} ${
                              doc.verified 
                                ? styles.document_verified 
                                : styles.document_pending
                            }`}>
                              {doc.verified ? "Verified" : "Pending"}
                            </span>
                            <span className={styles.document_date}>
                              {formatDate(doc.uploadedAt)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className={styles.no_data}>No documents uploaded</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.profile_section}>
                    <h4 className={styles.section_title}>Profile Information</h4>
                    <div className={styles.profile_details}>
                      <div className={styles.detail_item}>
                        <span className={styles.detail_label}>Created:</span>
                        <span className={styles.detail_value}>
                          {formatDate(staffProfile.createdAt)}
                        </span>
                      </div>
                      <div className={styles.detail_item}>
                        <span className={styles.detail_label}>Last Updated:</span>
                        <span className={styles.detail_value}>
                          {formatDate(staffProfile.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.modal_empty}>
                <p>Staff profile not found</p>
              </div>
            )}
          </div>

          <div className={styles.modal_footer}>
            <button
              className={styles.modal_cancel_btn}
              onClick={onClose}
            >
              Close
            </button>
            {staffProfile && (
              <button
                className={styles.modal_action_btn}
                onClick={onSuccess}
              >
                Edit Profile
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StaffProfileModal;