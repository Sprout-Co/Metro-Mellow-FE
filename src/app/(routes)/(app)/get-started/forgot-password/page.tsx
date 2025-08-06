import { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password | Metromellow",
  description: "Reset your Metromellow account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
