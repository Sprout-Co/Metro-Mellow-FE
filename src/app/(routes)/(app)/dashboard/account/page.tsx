// src/app/(routes)/(app)/dashboard/account/page.tsx
import React from "react";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import PersonalInfoMain from "./_components/PersonalInfoMain/PersonalInfoMain";

const AccountPage = () => {
  return (
    <DashboardLayout>
      <PersonalInfoMain />
    </DashboardLayout>
  );
};

export default AccountPage;