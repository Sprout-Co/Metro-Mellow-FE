import React from "react";
import DashboardLayout from "./_components/DashboardLayout/DashboardLayout";
import FnButton from "@/components/ui/Button/FnButton";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1>Dashboard Content</h1>
      <FnButton variant="primary">Click me</FnButton>
      {/* Dashboard content will go here */}
    </DashboardLayout>
  );
}
