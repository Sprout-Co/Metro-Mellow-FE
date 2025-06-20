/**
 * Custom hook for handling all authentication and user-related operations.
 * Provides a comprehensive set of functions for user management including login,
 * registration, profile updates, password management, and role management.
 *
 * @returns Object containing all auth operation handlers
 */
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useLoginMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserRoleMutation,
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
  useAddAddressMutation,
  useSetDefaultAddressMutation,
  AddressInput,
} from "@/graphql/api";
import { useAuthStore } from "@/store/slices/auth";
import { UserRole } from "@/graphql/api";
import { Routes } from "@/constants/routes";

export const useAuthOperations = () => {
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [changePasswordMutation] = useChangePasswordMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();
  const [updateUserRoleMutation] = useUpdateUserRoleMutation();
  const { refetch: getCurrentUser } = useGetCurrentUserQuery({ skip: true });
  const { refetch: getUserById } = useGetUserByIdQuery({ skip: true });
  const { refetch: getUsers } = useGetUsersQuery({ skip: true });
  const [sendVerificationEmailMutation] = useSendVerificationEmailMutation();
  const [verifyEmailMutation] = useVerifyEmailMutation();
  const [addAddressMutation] = useAddAddressMutation();
  const {
    login,
    logout,
    token: currentToken,
    user: currentUser,
    setUser,
  } = useAuthStore();
  const t = useAuthStore((state) => state);

  /**
   * Handles user login with email and password
   * @param email - User's email address
   * @param password - User's password
   * @throws Error if login fails or user is unauthorized
   */
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        console.log("Attempting login with:", { email });
        const { data, errors } = await loginMutation({
          variables: { email, password },
        });

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

  /**
   * Handles user registration with required and optional fields
   * @param input - Registration input object containing user details
   * @throws Error if registration fails
   */
  const handleRegister = useCallback(
    async (input: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
      address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
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
          // if (typeof window !== "undefined") {
          //   window.location.href = Routes.DASHBOARD;
          // }
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

  /**
   * Updates user profile information
   * @param input - Profile update input object
   * @returns Updated user profile
   * @throws Error if update fails
   */
  const handleUpdateProfile = useCallback(
    async (input: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
    }) => {
      try {
        const { data, errors } = await updateProfileMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        if (data?.updateProfile) {
          // Update the user in the auth store while preserving the current token
          login(data.updateProfile as any, currentToken || "");
          return data.updateProfile;
        }
      } catch (error) {
        console.error("Profile update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateProfileMutation, login, currentToken]
  );

  /**
   * Changes user's password
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @returns Boolean indicating success
   * @throws Error if password change fails
   */
  const handleChangePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        const { data, errors } = await changePasswordMutation({
          variables: { currentPassword, newPassword },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.changePassword;
      } catch (error) {
        console.error("Password change error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [changePasswordMutation]
  );

  /**
   * Initiates password reset process
   * @param email - User's email address
   * @returns Boolean indicating success
   * @throws Error if process fails
   */
  const handleForgotPassword = useCallback(
    async (email: string) => {
      try {
        const { data, errors } = await forgotPasswordMutation({
          variables: { email },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.forgotPassword;
      } catch (error) {
        console.error("Forgot password error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [forgotPasswordMutation]
  );

  /**
   * Resets password using reset token
   * @param token - Reset token received via email
   * @param newPassword - New password
   * @returns Boolean indicating success
   * @throws Error if reset fails
   */
  const handleResetPassword = useCallback(
    async (token: string, newPassword: string) => {
      try {
        const { data, errors } = await resetPasswordMutation({
          variables: { token, newPassword },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.resetPassword;
      } catch (error) {
        console.error("Reset password error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [resetPasswordMutation]
  );

  /**
   * Updates user role (admin only)
   * @param userId - ID of user to update
   * @param role - New role to assign
   * @returns Updated user
   * @throws Error if update fails
   */
  const handleUpdateUserRole = useCallback(
    async (userId: string, role: UserRole) => {
      try {
        const { data, errors } = await updateUserRoleMutation({
          variables: { userId, role },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateUserRole;
      } catch (error) {
        console.error("Update user role error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateUserRoleMutation]
  );

  /**
   * Handles user logout
   * @throws Error if logout fails
   */
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

  /**
   * Fetches the current authenticated user and updates the auth store
   * @returns Current user data
   * @throws Error if fetch fails or user is not authenticated
   */
  const handleGetCurrentUser = useCallback(async () => {
    try {
      if (!currentToken) {
        throw new Error("Not authenticated");
      }

      const { data, errors } = await getCurrentUser();

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (data?.me) {
        // Update the auth store with the latest user data
        setUser(data.me);
      }

      return data?.me;
    } catch (error) {
      console.error("Current user fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [currentToken, setUser, getCurrentUser]);

  /**
   * Fetches a user by ID
   * @param id - User ID
   * @returns User data
   * @throws Error if fetch fails or user is not authenticated
   */
  const handleGetUserById = useCallback(
    async (id: string) => {
      try {
        if (!currentToken) {
          throw new Error("Not authenticated");
        }

        const { data, errors } = await getUserById({ id });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.user;
      } catch (error) {
        console.error("User fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [currentToken, getUserById]
  );

  /**
   * Fetches all users with optional role filter
   * @param role - Optional role filter
   * @returns Array of users
   * @throws Error if fetch fails or user is not authenticated
   */
  const handleGetUsers = useCallback(
    async (role?: UserRole) => {
      try {
        if (!currentToken) {
          throw new Error("Not authenticated");
        }

        // Only allow admins to fetch all users
        if (
          !currentUser ||
          (currentUser.role !== UserRole.Admin &&
            currentUser.role !== UserRole.SuperAdmin)
        ) {
          throw new Error("Unauthorized: Admin access required");
        }

        const { data, errors } = await getUsers({ role });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.users;
      } catch (error) {
        console.error("Users fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [currentToken, currentUser, getUsers]
  );

  /**
   * Sends a verification email to the user
   * @param email - User's email address
   * @returns Boolean indicating success
   * @throws Error if email sending fails
   */
  const handleSendVerificationEmail = useCallback(
    async (email: string) => {
      try {
        const { data, errors } = await sendVerificationEmailMutation({
          variables: { email },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.sendVerificationEmail;
      } catch (error) {
        console.error("Send verification email error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [sendVerificationEmailMutation]
  );

  /**
   * Verifies user's email using a verification token
   * @param token - Verification token received via email
   * @returns Boolean indicating success
   * @throws Error if verification fails
   */
  const handleVerifyEmail = useCallback(
    async (token: string) => {
      try {
        const { data, errors } = await verifyEmailMutation({
          variables: { token },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.verifyEmail;
      } catch (error) {
        console.error("Verify email error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [verifyEmailMutation]
  );

  /**
   * Adds a new address for the current user
   * @param input - Address input object
   * @returns Created address
   * @throws Error if creation fails
   */
  const handleAddAddress = useCallback(
    async (input: AddressInput) => {
      try {
        const { data, errors } = await addAddressMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.addAddress;
      } catch (error) {
        console.error("Address creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [addAddressMutation]
  );

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateProfile,
    handleChangePassword,
    handleForgotPassword,
    handleResetPassword,
    handleUpdateUserRole,
    handleGetCurrentUser,
    handleGetUserById,
    handleGetUsers,
    handleSendVerificationEmail,
    handleVerifyEmail,
    handleAddAddress,
  };
};
