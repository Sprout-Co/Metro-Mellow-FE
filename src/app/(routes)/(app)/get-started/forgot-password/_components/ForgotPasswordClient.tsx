"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "../../_components/AuthLayout";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";

export default function ForgotPasswordClient() {
  const router = useRouter();

  return (
    <AuthLayout
      title="You are just a few steps away from resetting your password 🔑"
      subtitle="Enter your email address and we'll send you instructions to reset your password"
    >
      <ForgotPasswordForm
        onBackToLogin={() => {
          router.push("/get-started");
        }}
      />
    </AuthLayout>
  );
}
