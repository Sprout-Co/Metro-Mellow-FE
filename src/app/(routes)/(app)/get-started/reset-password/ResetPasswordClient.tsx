"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "../_components/AuthLayout";
import ResetPasswordForm from "../_components/ResetPasswordForm";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    router.push("/get-started");
    return null;
  }

  return (
    <AuthLayout>
      <ResetPasswordForm
        token={token}
        onBackToLogin={() => {
          router.push("/get-started");
        }}
      />
    </AuthLayout>
  );
} 