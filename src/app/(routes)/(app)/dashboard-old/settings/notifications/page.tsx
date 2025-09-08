import { Metadata } from "next";
import NotificationsSettings from "./NotificationsSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Notification Settings | Metromellow",
  description: "Manage your Metromellow notification preferences and alerts.",
};

export default function NotificationsPage() {
  return (
    <>
      <DashboardHeader />
      <NotificationsSettings />
    </>
  );
}
