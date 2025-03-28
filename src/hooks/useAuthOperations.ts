import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "@/graphql/api";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/graphql/api";
import { Routes } from "@/constants/routes";

export const useAuthOperations = () => {
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const { login, logout } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await loginMutation({
          variables: { email, password },
        });

        if (data?.login) {
          login(data.login.user as any, data.login.token);
          router.push(Routes.DASHBOARD);
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [loginMutation, login, router]
  );

  const handleRegister = useCallback(
    async (input: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      try {
        const { data } = await registerMutation({
          variables: {
            input: {
              ...input,
              role: UserRole.Customer,
            },
          },
        });

        if (data?.register) {
          login(data.register.user as any, data.register.token);
          router.push(Routes.DASHBOARD);
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    [registerMutation, login, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      logout();
      router.push(Routes.GET_STARTED);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, [logout, router]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
