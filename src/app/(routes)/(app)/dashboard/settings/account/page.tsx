import { Metadata } from "next";
import AccountSettings from "./AccountSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Account Settings | Metro Mellow",
  description: "Manage your Metro Mellow account settings and preferences.",
};

export default function AccountPage() {
  return (
    <>
      <DashboardHeader />
      <AccountSettings />
    </>
  );
}
