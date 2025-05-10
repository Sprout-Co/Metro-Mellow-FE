import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support | Metro Mellow",
  description: "Get help and support for your Metro Mellow account.",
};

export default function HelpPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Help & Support</h1>
      <p>Hello World - Help & Support Page</p>
    </div>
  );
}
