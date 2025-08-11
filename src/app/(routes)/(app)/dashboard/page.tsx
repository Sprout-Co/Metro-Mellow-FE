import React from "react";
import DashboardLayout from "./_components/DashboardLayout/DashboardLayout";
import FnButton from "@/components/ui/Button/FnButton";
import DashboardOverview from "./_components/overview/DashboardOverview";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
