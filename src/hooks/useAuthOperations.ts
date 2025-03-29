import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "@/graphql/api";
import { useAuthStore } from "@/store/slices/auth";
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
        console.log("Attempting login with:", { email });
        const { data, errors } = await loginMutation({
          variables: { email, password },
        });

        console.log("Login response:", { data, errors });

        if (errors) {
          console.error("Login errors:", errors);
          throw new Error(errors[0].message);
        }

        if (!data?.login) {
          console.error("No login data received");
          throw new Error("Login failed: No response from server");
        }

        const { user, token } = data.login;

        if (!user || !token) {
          console.error("Invalid login response:", { user, token });
          throw new Error("Login failed: Invalid response from server");
        }

        console.log("Login successful:", { user, token });

        // Validate user role
        if (
          user.role !== UserRole.Customer &&
          user.role !== UserRole.Admin &&
          user.role !== UserRole.SuperAdmin
        ) {
          throw new Error("Unauthorized access");
        }

        // Store auth data
        console.log("Storing auth data...");
        login(user as any, token);

        // Use a direct browser redirect for client-side navigation
        console.log("Redirecting to dashboard...");
        if (typeof window !== "undefined") {
          window.location.href = Routes.DASHBOARD;
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [loginMutation, login]
  );

  const handleRegister = useCallback(
    async (input: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      try {
        const { data, errors } = await registerMutation({
          variables: {
            input: {
              ...input,
              role: UserRole.Customer,
            },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        if (data?.register) {
          const { user, token } = data.register;

          // Validate user role
          if (user.role !== UserRole.Customer) {
            throw new Error("Registration failed: Invalid role");
          }

          login(user as any, token);

          // Use a direct browser redirect
          if (typeof window !== "undefined") {
            window.location.href = Routes.DASHBOARD;
          }
        }
      } catch (error) {
        console.error("Registration error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [registerMutation, login]
  );

  const handleLogout = useCallback(async () => {
    try {
      logout();

      // Use a direct browser redirect
      if (typeof window !== "undefined") {
        window.location.href = Routes.GET_STARTED;
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Failed to logout");
    }
  }, [logout]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
