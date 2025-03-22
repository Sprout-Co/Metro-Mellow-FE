import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metro Mellow | Admin Dashboard",
  description: "Metro Mellow administrator dashboard and management system",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
