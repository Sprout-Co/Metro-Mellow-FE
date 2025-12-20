/**
 * Custom hook for handling all authentication and user-related operations.
 * Provides a comprehensive set of functions for user management including login,
 * registration, profile updates, password management, and role management.
 *
 * @returns Object containing all auth operation handlers
 */
import { useCallback } from "react";
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
  useVerifyEmailWithCodeMutation,
  useAddAddressMutation,
  AddressInput,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation,
  useRemoveAddressMutation,
  UpdateUserInput,
  AccountStatus,
  useUpdateAccountStatusMutation,
  CreateUserInput,
  useUpdateEmailMarketingPreferenceMutation,
} from "@/graphql/api";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  login as loginAction,
  logout as logoutAction,
  setUser,
  selectToken,
  selectUser,
} from "@/lib/redux";
import { UserRole } from "@/graphql/api";
import { Routes } from "@/constants/routes";
import Cookies from "js-cookie";

export const useAuthOperations = () => {
  const dispatch = useAppDispatch();
  const currentToken = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectUser);

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
  const [verifyEmailWithCodeMutation] = useVerifyEmailWithCodeMutation();
  const [addAddressMutation] = useAddAddressMutation();
  const [updateAddressMutation] = useUpdateAddressMutation();
  const [setDefaultAddressMutation] = useSetDefaultAddressMutation();
  const [removeAddressMutation] = useRemoveAddressMutation();
  const [updateAccountStatusMutation] = useUpdateAccountStatusMutation();
  const [updateEmailMarketingPreferenceMutation] =
    useUpdateEmailMarketingPreferenceMutation();
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
        dispatch(loginAction({ user: user as any, token }));

        // Ensure cookie is set synchronously before redirecting (critical for mobile devices)
        // Mobile browsers can have delays in cookie propagation, so we need to wait and verify
        // if (typeof window !== "undefined") {
        //   // Explicitly set cookie again to ensure it's set (redundant but ensures mobile compatibility)
        //   Cookies.set("auth-token", token, {
        //     path: "/",
        //     expires: 30,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "lax",
        //   });

        //   // Wait and verify cookie is set with more attempts and longer delays for mobile
        //   let cookieSet = false;
        //   const maxAttempts = 30; // Increased from 10 to 30 for mobile reliability
        //   const delayMs = 100; // Increased from 50ms to 100ms

        //   for (let i = 0; i < maxAttempts; i++) {
        //     await new Promise((resolve) => setTimeout(resolve, delayMs));
        //     const cookieValue = document.cookie
        //       .split("; ")
        //       .find((row) => row.startsWith("auth-token="));
        //     if (cookieValue) {
        //       cookieSet = true;
        //       console.log(`Cookie verified after ${i + 1} attempts`);
        //       break;
        //     }
        //   }

        //   if (!cookieSet) {
        //     console.error(
        //       "Cookie verification failed - attempting redirect anyway"
        //     );
        //   }

        //   // Use window.location.replace to avoid adding to history
        //   // Add a small delay before redirect to ensure cookie propagation on mobile
        //   await new Promise((resolve) => setTimeout(resolve, 150));
        //   console.log("Redirecting to dashboard...");
        //   window.location.replace(Routes.DASHBOARD);
        // }
      } catch (error) {
        console.error("Login error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [loginMutation, dispatch]
  );

  /**
   * Handles user registration with required and optional fields
   * @param input - Registration input object containing user details
   * @throws Error if registration fails
   */
  const handleRegister = useCallback(
    async (input: CreateUserInput) => {
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
          if (user?.role !== UserRole.Customer) {
            throw new Error("Registration failed: Invalid role");
          }

          // Don't login immediately - wait for email verification
          // The login will happen in handleVerifyEmailWithCode after verification
          // We can optionally store the token temporarily if needed, but don't set user/auth state yet
        }
      } catch (error) {
        console.error("Registration error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [registerMutation, dispatch]
  );

  /**
   * Updates user profile information
   * @param input - Profile update input object
   * @returns Updated user profile
   * @throws Error if update fails
   */
  const handleUpdateProfile = useCallback(
    async (input: UpdateUserInput) => {
      try {
        const { data, errors } = await updateProfileMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // if (data?.updateProfile && data.updateProfile.role === UserRole.Customer) {
        //   // Update the user in the auth store while preserving the current token
        //   dispatch(loginAction({ user: data.updateProfile as any, token: currentToken || "" }));
        //   return data.updateProfile;
        // }
      } catch (error) {
        console.error("Profile update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateProfileMutation, dispatch, currentToken]
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
      dispatch(logoutAction());

      // Use a direct browser redirect
      if (typeof window !== "undefined") {
        window.location.href = Routes.GET_STARTED;
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Failed to logout");
    }
  }, [dispatch]);

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
        console.log("Setting user in auth store:", data.me);
        dispatch(setUser(data.me as any));
      }

      return data?.me;
    } catch (error) {
      console.error("Current user fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [currentToken, dispatch, getCurrentUser]);

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
   * Verifies user's email using a verification code
   * @param email - User's email address
   * @param code - Verification code received via email
   * @returns Auth payload with token and user data
   * @throws Error if verification fails
   */
  const handleVerifyEmailWithCode = useCallback(
    async (email: string, code: string) => {
      try {
        const { data, errors } = await verifyEmailWithCodeMutation({
          variables: { email, code },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        if (!data?.verifyEmailWithCode) {
          throw new Error("Verification failed: No response from server");
        }

        const { user, token, success } = data.verifyEmailWithCode;

        if (user && token) {
          // Store auth data
          dispatch(loginAction({ user: user as any, token, welcome: true }));
        }

        return data.verifyEmailWithCode;
      } catch (error) {
        console.error("Verify email with code error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [verifyEmailWithCodeMutation, dispatch]
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

  /**
   * Updates an existing address for the current user
   * @param id - Address ID
   * @param input - Address input object
   * @returns Updated address
   * @throws Error if update fails
   */
  const handleUpdateAddress = useCallback(
    async (id: string, input: AddressInput) => {
      try {
        const { data, errors } = await updateAddressMutation({
          variables: { addressId: id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateAddress;
      } catch (error) {
        console.error("Address update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateAddressMutation]
  );

  /**
   * Sets an address as default for the current user
   * @param id - Address ID to set as default
   * @returns Updated address
   * @throws Error if update fails
   */
  const handleSetDefaultAddress = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await setDefaultAddressMutation({
          variables: { addressId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.setDefaultAddress;
      } catch (error) {
        console.error("Set default address error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [setDefaultAddressMutation]
  );

  /**
   * Removes an address for the current user
   * @param id - Address ID to remove
   * @returns Boolean indicating success
   * @throws Error if removal fails
   */
  const handleRemoveAddress = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await removeAddressMutation({
          variables: { addressId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.removeAddress;
      } catch (error) {
        console.error("Remove address error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [removeAddressMutation]
  );

  /**
   * Updates account status for a user
   * @param userId - User ID to update status for
   * @param status - New account status
   * @param reason - Optional reason for status change
   * @returns Boolean indicating success
   * @throws Error if update fails
   */
  const handleUpdateAccountStatus = useCallback(
    async (userId: string, status: AccountStatus, reason?: string) => {
      try {
        const { data, errors } = await updateAccountStatusMutation({
          variables: { userId, status, reason },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateAccountStatus;
      } catch (error) {
        console.error("Account status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateAccountStatusMutation]
  );

  /**
   * Updates user's email marketing preference
   * @param optIn - Whether to opt in to email marketing
   * @returns Boolean indicating success
   * @throws Error if update fails
   */
  const handleUpdateEmailMarketingPreference = useCallback(
    async (optIn: boolean) => {
      try {
        const { data, errors } = await updateEmailMarketingPreferenceMutation({
          variables: { optIn },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateEmailMarketingPreference;
      } catch (error) {
        console.error("Email marketing preference update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateEmailMarketingPreferenceMutation]
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
    handleVerifyEmailWithCode,
    handleAddAddress,
    handleUpdateAddress,
    handleSetDefaultAddress,
    handleRemoveAddress,
    handleUpdateAccountStatus,
    handleUpdateEmailMarketingPreference,
  };
};
