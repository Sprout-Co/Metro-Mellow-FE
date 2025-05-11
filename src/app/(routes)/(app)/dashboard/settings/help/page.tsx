import { Metadata } from "next";
import HelpCenter from "./HelpCenter";
import DashboardHeader from "../../_components/header/DashboardHeader";

export const metadata: Metadata = {
  title: "Help Center | Metro Mellow",
  description: "Get help and support for your Metro Mellow account.",
};

export default function HelpPage() {
  return (
    <>
      <DashboardHeader />
      <HelpCenter />
    </>
  );
}
