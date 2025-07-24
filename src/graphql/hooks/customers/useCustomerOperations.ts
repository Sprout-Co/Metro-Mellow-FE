/**
 * Custom hook for handling customer-related operations.
 * Provides functions for managing customers and user data.
 *
 * @returns Object containing all customer operation handlers
 */
import { useCallback } from "react";
import {
  useGetUsersQuery,
  useCreateCustomerMutation,
  CreateUserInput,
  UserRole,
} from "@/graphql/api";

export const useCustomerOperations = () => {
  const [createCustomerMutation] = useCreateCustomerMutation();
  const { refetch: getUsers } = useGetUsersQuery({
    skip: true,
  });

  /**
   * Creates a new customer
   * @param input - Customer creation input object
   * @returns Created customer auth payload
   * @throws Error if creation fails
   */
  const handleCreateCustomer = useCallback(
    async (input: CreateUserInput) => {
      try {
        const { data, errors } = await createCustomerMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createCustomer;
      } catch (error) {
        console.error("Customer creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createCustomerMutation]
  );

  /**
   * Fetches all customers (users with CUSTOMER role)
   * @returns Array of customer users
   * @throws Error if fetch fails
   */
  const handleGetCustomers = useCallback(async () => {
    try {
      const { data, errors } = await getUsers({ role: UserRole.Customer });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.users;
    } catch (error) {
      console.error("Customers fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getUsers]);

  /**
   * Fetches all users with optional role filter
   * @param role - Optional user role filter
   * @returns Array of users
   * @throws Error if fetch fails
   */
  const handleGetUsers = useCallback(
    async (role?: UserRole) => {
      try {
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
    [getUsers]
  );

  return {
    handleCreateCustomer,
    handleGetCustomers,
    handleGetUsers,
  };
};