import { ApolloError } from "@apollo/client";

/**
 * Common error handling for GraphQL operations
 */
export const handleGraphQLError = (error: unknown) => {
  if (error instanceof ApolloError) {
    // Handle network errors
    if (error.networkError) {
      console.error("Network error:", error.networkError);
      return "Network error occurred. Please check your connection.";
    }

    // Handle GraphQL errors
    if (error.graphQLErrors.length > 0) {
      const messages = error.graphQLErrors.map((err) => err.message);
      console.error("GraphQL errors:", messages);
      return messages.join(", ");
    }

    // Handle other Apollo errors
    console.error("Apollo error:", error.message);
    return error.message;
  }

  // Handle unknown errors
  console.error("Unknown error:", error);
  return "An unexpected error occurred.";
};

/**
 * Common validation for GraphQL inputs
 */
export const validateGraphQLInput = <T extends Record<string, unknown>>(
  input: T,
  requiredFields: (keyof T)[]
): string | null => {
  const missingFields = requiredFields.filter((field) => {
    const value = input[field];
    return value === undefined || value === null || value === "";
  });

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }

  return null;
};

/**
 * Common loading state handling
 */
export const getLoadingState = (loading: boolean) => {
  if (loading) {
    return {
      isLoading: true,
      isError: false,
      isSuccess: false,
    };
  }
  return {
    isLoading: false,
    isError: false,
    isSuccess: true,
  };
};

/**
 * Common error state handling
 */
export const getErrorState = (error: unknown) => {
  const errorMessage = handleGraphQLError(error);
  return {
    isLoading: false,
    isError: true,
    isSuccess: false,
    errorMessage,
  };
};

/**
 * Common success state handling
 */
export const getSuccessState = <T>(data: T) => {
  return {
    isLoading: false,
    isError: false,
    isSuccess: true,
    data,
  };
};
