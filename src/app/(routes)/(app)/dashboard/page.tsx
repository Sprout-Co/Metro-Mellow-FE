"use client";

import React from "react";
import DashboardLayout from "./_components/DashboardLayout/DashboardLayout";
import DashboardOverview from "./_components/overview/DashboardOverview";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
