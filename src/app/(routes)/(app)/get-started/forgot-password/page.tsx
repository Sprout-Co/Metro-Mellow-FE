import { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password | Metro Mellow",
  description: "Reset your Metro Mellow account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
