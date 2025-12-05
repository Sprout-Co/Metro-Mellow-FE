import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metromellow | Admin Dashboard",
  description: "Metromellow administrator dashboard and management system",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
