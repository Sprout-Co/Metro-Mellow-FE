import { Metadata } from "next";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset Password | Metro Mellow",
  description: "Set your new Metro Mellow account password.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
