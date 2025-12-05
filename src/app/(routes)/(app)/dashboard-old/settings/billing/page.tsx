import { Metadata } from "next";
import BillingSettings from "./BillingSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Billing Settings | Metromellow",
  description: "Manage your Metromellow billing information and subscription.",
};

export default function BillingPage() {
  return (
    <>
      <DashboardHeader />
      <BillingSettings />
    </>
  );
}
