import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Metro Mellow",
  description: "Manage your Metro Mellow profile settings.",
};

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <p>Hello World - Profile Settings Page</p>
    </div>
  );
}
