"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthMode = "login" | "register";

export default function AuthManagement({
  showImage = true,
}: {
  showImage?: boolean;
}) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Redirect to dashboard or return URL
    router.push("/dashboard");
  };

  const handleRegisterSuccess = () => {
    // Redirect to dashboard with welcome message
    router.push("/dashboard?welcome=true");
  };

  const handleSwitchToLogin = () => {
    setAuthMode("login");
  };

  const handleSwitchToRegister = () => {
    setAuthMode("register");
  };

  return (
    <AuthLayout showImage={showImage}>
      {authMode === "login" && (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onRegisterClick={handleSwitchToRegister}
        />
      )}

      {authMode === "register" && (
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onLoginClick={handleSwitchToLogin}
        />
      )}
    </AuthLayout>
  );
}
