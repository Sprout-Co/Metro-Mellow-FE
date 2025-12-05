import { Metadata } from "next";
import DashboardHeader from "../_components/header/DashboardHeader";
import SettingsOverview from "./SettingsOverview";

export const metadata: Metadata = {
  title: "Settings | Metromellow",
  description: "Manage your Metromellow account settings and preferences.",
};

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader />
      <SettingsOverview />
    </>
  );
}
