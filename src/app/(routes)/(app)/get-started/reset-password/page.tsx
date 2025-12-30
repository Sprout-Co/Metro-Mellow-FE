import { Metadata } from "next";
import ResetPasswordClient from "./_components/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset Password | Metromellow",
  description: "Set your new Metromellow account password.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
