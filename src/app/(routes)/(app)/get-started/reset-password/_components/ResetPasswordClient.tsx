"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "../../_components/AuthLayout";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    router.push("/get-started");
    return null;
  }

  return (
    <AuthLayout
      title="You are just a few steps away from resetting your password 🔑"
      subtitle="Enter your new password below. Make sure it's at least 8 characters."
    >
      <ResetPasswordForm
        token={token}
        onBackToLogin={() => {
          router.push("/get-started");
        }}
      />
    </AuthLayout>
  );
}
