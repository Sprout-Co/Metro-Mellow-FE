"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthMode = "login" | "register";

export default function AuthManagement({
  showImage = true,
}: {
  showImage?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const authMode = (
    searchParams.get("view") === "register" ? "register" : "login"
  ) as AuthMode;

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  const handleRegisterSuccess = () => {
    router.push("/dashboard?welcome=true");
  };

  const handleSwitchToLogin = () => {
    router.replace(`${pathname}?view=login`, { scroll: false });
  };

  const handleSwitchToRegister = () => {
    router.replace(`${pathname}?view=register`, { scroll: false });
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
