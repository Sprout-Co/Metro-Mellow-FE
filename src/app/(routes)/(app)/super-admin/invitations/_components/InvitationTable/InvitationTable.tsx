"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./InvitationTable.module.scss";

interface Invitation {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  invitedByName: string;
  expiresAt: string;
  createdAt: string;
  isUsed: boolean;
}

interface InvitationTableProps {
  invitations: Invitation[];
  loading: boolean;
  onResend: (invitationId: string) => void;
  onCancel: (invitationId: string) => void;
}

const InvitationTable: React.FC<InvitationTableProps> = ({
  invitations,
  loading,
  onResend,
  onCancel,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getStatusBadge = (invitation: Invitation) => {
    if (invitation.isUsed) {
      return <span className={`${styles.status_badge} ${styles.status_badge__used}`}>Used</span>;
    }
    if (isExpired(invitation.expiresAt)) {
      return <span className={`${styles.status_badge} ${styles.status_badge__expired}`}>Expired</span>;
    }
    return <span className={`${styles.status_badge} ${styles.status_badge__pending}`}>Pending</span>;
  };

  if (loading) {
    return (
      <div className={styles.table_loading}>
        <div className={styles.loading_spinner}></div>
        <p>Loading invitations...</p>
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className={styles.table_empty}>
        <h3>No Invitations Found</h3>
        <p>There are currently no pending admin invitations.</p>
      </div>
    );
  }

  return (
    <div className={styles.table_container}>
      <div className={styles.table_wrapper}>
        <table className={styles.invitation_table}>
          <thead>
            <tr>
              <th>Invitee</th>
              <th>Email</th>
              <th>Role</th>
              <th>Invited By</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((invitation, index) => (
              <motion.tr
                key={invitation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td>
                  <div className={styles.invitee_info}>
                    <div className={styles.invitee_avatar}>
                      {invitation.firstName[0]}{invitation.lastName[0]}
                    </div>
                    <div className={styles.invitee_name}>
                      {invitation.firstName} {invitation.lastName}
                    </div>
                  </div>
                </td>
                <td>{invitation.email}</td>
                <td>
                  <span className={styles.role_badge}>
                    {invitation.role.replace("_", " ")}
                  </span>
                </td>
                <td>{invitation.invitedByName}</td>
                <td>{formatDate(invitation.createdAt)}</td>
                <td className={isExpired(invitation.expiresAt) ? styles.expired_date : ""}>
                  {formatDate(invitation.expiresAt)}
                </td>
                <td>{getStatusBadge(invitation)}</td>
                <td>
                  <div className={styles.action_buttons}>
                    {!invitation.isUsed && !isExpired(invitation.expiresAt) && (
                      <>
                        <button
                          className={styles.action_btn_resend}
                          onClick={() => onResend(invitation.id)}
                          title="Resend invitation"
                        >
                          Resend
                        </button>
                        <button
                          className={styles.action_btn_cancel}
                          onClick={() => onCancel(invitation.id)}
                          title="Cancel invitation"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(invitation.isUsed || isExpired(invitation.expiresAt)) && (
                      <button
                        className={styles.action_btn_cancel}
                        onClick={() => onCancel(invitation.id)}
                        title="Remove invitation"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvitationTable;