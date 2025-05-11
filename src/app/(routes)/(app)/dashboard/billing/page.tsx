import { Metadata } from "next";
import DashboardHeader from "../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Billing & Payments | Metro Mellow",
  description: "Manage your Metro Mellow billing and payment settings.",
};

export default function BillingPage() {
  return (
    <>
      <DashboardHeader />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Billing & Payments</h1>
        <p>Hello World - Billing & Payments Page</p>
      </div>
    </>
  );
} 