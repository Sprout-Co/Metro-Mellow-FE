import { Metadata } from "next";
import SecuritySettings from "./SecuritySettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Security Settings | Metro Mellow",
  description:
    "Manage your Metro Mellow account security and login preferences.",
};

export default function SecurityPage() {
  return (
    <>
      <DashboardHeader />
      <SecuritySettings />
    </>
  );
}
