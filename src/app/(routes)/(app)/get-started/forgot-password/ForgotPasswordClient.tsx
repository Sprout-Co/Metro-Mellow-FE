"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "../_components/AuthLayout";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export default function ForgotPasswordClient() {
  const router = useRouter();

  return (
    <AuthLayout>
      <ForgotPasswordForm
        onBackToLogin={() => {
          router.push("/get-started");
        }}
      />
    </AuthLayout>
  );
}
