"use client";

import { usePathname } from "next/navigation";

import MetroEatsFooter from "../MetroEatsFooter/MetroEatsFooter";
import MetroEatsNav from "../MetroEatsNav/MetroEatsNav";

interface MetroEatsLayoutShellProps {
  children: React.ReactNode;
}

export default function MetroEatsLayoutShell({
  children,
}: MetroEatsLayoutShellProps) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith("/metroeats/dashboard");

  return (
    <>
      {showNav && <MetroEatsNav />}
      {children}
      <MetroEatsFooter />
    </>
  );
}
