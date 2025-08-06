"use client";

import React from "react";
import AdminDashboardLayout from "../../admin/_components/AdminDashboardLayout/AdminDashboardLayout";
import InvitationManagement from "./_components/InvitationManagement/InvitationManagement";

export default function AdminInvitationsPage() {
  return (
    <AdminDashboardLayout
      title="Admin Invitations"
      breadcrumbs={[
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Invitations", path: "/admin/invitations" },
      ]}
    >
      <InvitationManagement />
    </AdminDashboardLayout>
  );
}
