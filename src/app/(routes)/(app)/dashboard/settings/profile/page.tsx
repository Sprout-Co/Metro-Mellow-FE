import { Metadata } from "next";
import ProfileSettings from "./ProfileSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Profile Settings | Metro Mellow",
  description: "Manage your Metro Mellow profile and personal information.",
};

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader />
      <ProfileSettings />
    </>
  );
}
