"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./InvitationManagement.module.scss";
import { useAdminOperations } from "@/graphql/hooks/admin/useAdminOperations";
import { useAuthStore } from "@/store/slices/auth";
import CreateInvitationModal from "../CreateInvitationModal/CreateInvitationModal";
import InvitationTable from "../InvitationTable/InvitationTable";

const InvitationManagement: React.FC = () => {
  const { user } = useAuthStore();
  const {
    handleGetPendingAdminInvitations,
    handleResendAdminInvitation,
    handleCancelAdminInvitation,
    handleCleanupExpiredInvitations,
    currentPendingInvitations
  } = useAdminOperations();

  const [invitations, setInvitations] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  useEffect(() => {
    if (isSuperAdmin) {
      fetchInvitations();
    }
  }, [isSuperAdmin]);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      setError(null);
      const invitationsData = await handleGetPendingAdminInvitations();
      setInvitations(invitationsData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch invitations");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvitation = () => {
    setIsCreateModalOpen(true);
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      await handleResendAdminInvitation(invitationId);
      await fetchInvitations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend invitation");
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      await handleCancelAdminInvitation(invitationId);
      await fetchInvitations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel invitation");
    }
  };

  const handleCleanupInvitations = async () => {
    try {
      await handleCleanupExpiredInvitations();
      await fetchInvitations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cleanup expired invitations");
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className={styles.access_denied}>
        <h2>Access Denied</h2>
        <p>Only Super Administrators can manage invitations.</p>
      </div>
    );
  }

  return (
    <div className={styles.invitation_management}>
      <motion.div
        className={styles.invitation_management__header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.invitation_management__title_section}>
          <h2 className={styles.invitation_management__title}>Admin Invitations</h2>
          <p className={styles.invitation_management__subtitle}>
            Manage administrator invitations and access control
          </p>
        </div>
        <div className={styles.invitation_management__actions}>
          <button
            className={styles.invitation_management__cleanup_btn}
            onClick={handleCleanupInvitations}
            disabled={loading}
          >
            Cleanup Expired
          </button>
          <button
            className={styles.invitation_management__create_btn}
            onClick={handleCreateInvitation}
            disabled={loading}
          >
            Create Invitation
          </button>
        </div>
      </motion.div>

      {error && (
        <motion.div
          className={styles.invitation_management__error}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div
        className={styles.invitation_management__content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <InvitationTable
          invitations={invitations}
          loading={loading}
          onResend={handleResendInvitation}
          onCancel={handleCancelInvitation}
        />
      </motion.div>

      {isCreateModalOpen && (
        <CreateInvitationModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchInvitations();
          }}
        />
      )}
    </div>
  );
};

export default InvitationManagement;