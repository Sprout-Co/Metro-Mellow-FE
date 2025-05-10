import { Metadata } from "next";
import ProfileSettings from "./ProfileSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "My Profile | Metro Mellow",
  description: "Manage your Metro Mellow profile settings.",
};

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader />
      <ProfileSettings />
    </>
  );
}
