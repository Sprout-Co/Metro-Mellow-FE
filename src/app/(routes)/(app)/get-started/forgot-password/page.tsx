import { Metadata } from "next";
import ForgotPasswordClient from "./_components/ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password | Metromellow",
  description: "Reset your Metromellow account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
