/**
 * Custom hook for handling all referral-related operations.
 * Provides functions for managing referral codes, commissions, and payouts.
 *
 * @returns Object containing all referral operation handlers
 */
import { useCallback } from "react";
import {
  useGenerateReferralCodeMutation,
  useApplyReferralCodeMutation,
  usePayoutCommissionMutation,
  usePayoutUserCommissionsMutation,
  useMyCommissionsQuery,
  useMyReferralInfoQuery,
  useMyReferralDiscountInfoQuery,
  useAllCommissionsQuery,
  useUserCommissionsQuery,
} from "@/graphql/api";

export const useReferralOperations = () => {
  // Mutations
  const [generateReferralCodeMutation, { loading: isGeneratingCode }] =
    useGenerateReferralCodeMutation();
  const [applyReferralCodeMutation, { loading: isApplyingCode }] =
    useApplyReferralCodeMutation();
  const [payoutCommissionMutation, { loading: isPayingOutCommission }] =
    usePayoutCommissionMutation();
  const [
    payoutUserCommissionsMutation,
    { loading: isPayingOutUserCommissions },
  ] = usePayoutUserCommissionsMutation();

  // Queries
  const { refetch: getMyCommissions, data: myCommissionsData } =
    useMyCommissionsQuery({ skip: true });
  const { refetch: getMyReferralInfo, data: myReferralInfoData } =
    useMyReferralInfoQuery({ skip: true });
  const {
    refetch: getMyReferralDiscountInfo,
    data: myReferralDiscountInfoData,
  } = useMyReferralDiscountInfoQuery({ skip: true });
  const { refetch: getAllCommissions, data: allCommissionsData } =
    useAllCommissionsQuery({ skip: true });
  const { refetch: getUserCommissions } = useUserCommissionsQuery({
    skip: true,
  });

  /**
   * Generates a referral code for the current user
   * @returns The generated referral code
   * @throws Error if generation fails
   */
  const handleGenerateReferralCode = useCallback(async () => {
    try {
      const { data, errors } = await generateReferralCodeMutation();

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (!data?.generateReferralCode) {
        throw new Error("Failed to generate referral code");
      }

      return data.generateReferralCode;
    } catch (error) {
      console.error("Generate referral code error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [generateReferralCodeMutation]);

  /**
   * Applies a referral code for the current user
   * @param code - The referral code to apply
   * @returns Boolean indicating success
   * @throws Error if application fails
   */
  const handleApplyReferralCode = useCallback(
    async (code: string) => {
      try {
        const { data, errors } = await applyReferralCodeMutation({
          variables: { code },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.applyReferralCode;
      } catch (error) {
        console.error("Apply referral code error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [applyReferralCodeMutation]
  );

  /**
   * Pays out a specific commission (admin only)
   * @param commissionId - ID of the commission to pay out
   * @returns Boolean indicating success
   * @throws Error if payout fails
   */
  const handlePayoutCommission = useCallback(
    async (commissionId: string) => {
      try {
        const { data, errors } = await payoutCommissionMutation({
          variables: { commissionId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.payoutCommission;
      } catch (error) {
        console.error("Payout commission error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [payoutCommissionMutation]
  );

  /**
   * Pays out all pending commissions for a user (admin only)
   * @param userId - ID of the user to pay out commissions for
   * @returns Boolean indicating success
   * @throws Error if payout fails
   */
  const handlePayoutUserCommissions = useCallback(
    async (userId: string) => {
      try {
        const { data, errors } = await payoutUserCommissionsMutation({
          variables: { userId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.payoutUserCommissions;
      } catch (error) {
        console.error("Payout user commissions error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [payoutUserCommissionsMutation]
  );

  /**
   * Fetches all commissions for the current user
   * @returns Array of commissions
   * @throws Error if fetch fails
   */
  const handleGetMyCommissions = useCallback(async () => {
    try {
      const { data, errors } = await getMyCommissions();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.myCommissions;
    } catch (error) {
      console.error("Get my commissions error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getMyCommissions]);

  /**
   * Fetches referral information for the current user
   * @returns Referral info including code, link, earnings, and stats
   * @throws Error if fetch fails
   */
  const handleGetMyReferralInfo = useCallback(async () => {
    try {
      const { data, errors } = await getMyReferralInfo();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.myReferralInfo;
    } catch (error) {
      console.error("Get my referral info error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getMyReferralInfo]);

  /**
   * Fetches referral discount information for the current user
   * @returns Discount eligibility, percentage, and remaining bookings
   * @throws Error if fetch fails
   */
  const handleGetMyReferralDiscountInfo = useCallback(async () => {
    try {
      const { data, errors } = await getMyReferralDiscountInfo();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.myReferralDiscountInfo;
    } catch (error) {
      console.error("Get my referral discount info error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getMyReferralDiscountInfo]);

  /**
   * Fetches all commissions in the system (admin only)
   * @returns Array of all commissions
   * @throws Error if fetch fails
   */
  const handleGetAllCommissions = useCallback(async () => {
    try {
      const { data, errors } = await getAllCommissions();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.allCommissions;
    } catch (error) {
      console.error("Get all commissions error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getAllCommissions]);

  /**
   * Fetches commissions for a specific user (admin only)
   * @param userId - ID of the user to fetch commissions for
   * @returns Array of user's commissions
   * @throws Error if fetch fails
   */
  const handleGetUserCommissions = useCallback(
    async (userId: string) => {
      try {
        const { data, errors } = await getUserCommissions({ userId });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.userCommissions;
      } catch (error) {
        console.error("Get user commissions error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getUserCommissions]
  );

  return {
    // Mutations
    handleGenerateReferralCode,
    handleApplyReferralCode,
    handlePayoutCommission,
    handlePayoutUserCommissions,
    // Queries
    handleGetMyCommissions,
    handleGetMyReferralInfo,
    handleGetMyReferralDiscountInfo,
    handleGetAllCommissions,
    handleGetUserCommissions,
    // Loading states
    isGeneratingCode,
    isApplyingCode,
    isPayingOutCommission,
    isPayingOutUserCommissions,
    // Query data
    myCommissionsData,
    myReferralInfoData,
    myReferralDiscountInfoData,
    allCommissionsData,
  };
};
