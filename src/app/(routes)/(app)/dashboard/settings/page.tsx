import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | Metro Mellow",
  description: "Manage your Metro Mellow account settings.",
};

export default function AccountSettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <p>Hello World - Account Settings Page</p>
    </div>
  );
}
