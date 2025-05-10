import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing & Payments | Metro Mellow",
  description: "Manage your Metro Mellow billing and payment settings.",
};

export default function BillingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Billing & Payments</h1>
      <p>Hello World - Billing & Payments Page</p>
    </div>
  );
} 