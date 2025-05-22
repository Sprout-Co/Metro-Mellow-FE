import { Metadata } from "next";
import BillingSettings from "./BillingSettings";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Billing Settings | Metro Mellow",
  description: "Manage your Metro Mellow billing information and subscription.",
};

export default function BillingPage() {
  return (
    <>
      <DashboardHeader />
      <BillingSettings />
    </>
  );
}
