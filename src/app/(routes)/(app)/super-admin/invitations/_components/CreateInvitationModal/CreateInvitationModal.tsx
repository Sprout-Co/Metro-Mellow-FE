"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CreateInvitationModal.module.scss";
import { useAdminOperations } from "@/graphql/hooks/admin/useAdminOperations";
import { CreateAdminInvitationInput } from "@/graphql/api";

interface CreateInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateInvitationModal: React.FC<CreateInvitationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { handleCreateAdminInvitation } = useAdminOperations();
  
  const [formData, setFormData] = useState<CreateAdminInvitationInput>({
    email: "",
    firstName: "",
    lastName: "",
    role: "ADMIN",
    permissions: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await handleCreateAdminInvitation(formData);
      
      if (result?.success) {
        onSuccess();
      } else {
        setError(result?.message || "Failed to create invitation");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invitation");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      role: "ADMIN",
      permissions: []
    });
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modal_overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modal_content}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>Create Admin Invitation</h2>
              <button
                className={styles.modal_close}
                onClick={handleClose}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modal_form}>
              {error && (
                <div className={styles.modal_error}>
                  {error}
                </div>
              )}

              <div className={styles.form_row}>
                <div className={styles.form_group}>
                  <label className={styles.form_label} htmlFor="firstName">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.form_input}
                    required
                    disabled={loading}
                  />
                </div>

                <div className={styles.form_group}>
                  <label className={styles.form_label} htmlFor="lastName">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.form_input}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                <label className={styles.form_label} htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.form_input}
                  required
                  disabled={loading}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.form_label} htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={styles.form_select}
                  disabled={loading}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>

              <div className={styles.modal_footer}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.modal_cancel_btn}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.modal_submit_btn}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Invitation"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateInvitationModal;