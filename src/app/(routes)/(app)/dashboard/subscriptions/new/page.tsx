import React from "react";
import DashboardLayout from "../../_components/DashboardLayout/DashboardLayout";
import SingleServiceSubscriptionWizard from "./_components/SingleServiceSubscriptionWizard/SingleServiceSubscriptionWizard";

const NewSubscriptionPage = () => {
  return (
    <DashboardLayout>
      <SingleServiceSubscriptionWizard />
    </DashboardLayout>
  );
};

export default NewSubscriptionPage;

