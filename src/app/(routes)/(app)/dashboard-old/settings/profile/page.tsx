import { Metadata } from "next";
import ProfileSettings from "./ProfileSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Profile Settings | Metromellow",
  description: "Manage your Metromellow profile and personal information.",
};

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader />
      <ProfileSettings />
    </>
  );
}
