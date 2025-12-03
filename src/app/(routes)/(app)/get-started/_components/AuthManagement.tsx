"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { REFERRAL_CODE_STORAGE_KEY } from "@/constants/config";

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

  // Capture referral code from URL and store in sessionStorage
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      // Store referral code in sessionStorage
      // This persists across page refreshes but clears when browser closes
      if (typeof window !== "undefined") {
        sessionStorage.setItem(REFERRAL_CODE_STORAGE_KEY, refCode);
        console.log("Referral code captured and stored:", refCode);
      }
    }
  }, [searchParams]);

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  const handleRegisterSuccess = () => {
    router.push("/dashboard?welcome=true");
  };

  const handleSwitchToLogin = () => {
    // Preserve existing query params (like ref) when switching views
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "login");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSwitchToRegister = () => {
    // Preserve existing query params (like ref) when switching views
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "register");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
