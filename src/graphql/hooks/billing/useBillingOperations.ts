/**
 * Custom hook for handling all billing-related operations.
 * Provides functions for managing subscription billings, billing statistics, and user billings.
 *
 * @returns Object containing all billing operation handlers
 */
import { useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  BillingStatus,
  useGetSubscriptionBillingsLazyQuery,
  useGetBillingStatsLazyQuery,
  useGetUserBillingsLazyQuery,
  GetSubscriptionBillingsQuery,
  GetBillingStatsQuery,
  GetUserBillingsQuery,
} from "@/graphql/api";

// TypeScript Types - using generated types from API
export type Billing = GetSubscriptionBillingsQuery["subscriptionBillings"][0];
export type BillingWithSubscription = GetUserBillingsQuery["userBillings"][0];
export type BillingStats = GetBillingStatsQuery["billingStats"];

export const useBillingOperations = () => {
  const [getSubscriptionBillings] = useGetSubscriptionBillingsLazyQuery();
  const [getBillingStats] = useGetBillingStatsLazyQuery();
  const [getUserBillings] = useGetUserBillingsLazyQuery();

  /**
   * Fetches all billings for a specific subscription
   * @param subscriptionId - The subscription ID
   * @returns Array of billing records for the subscription
   * @throws Error if fetch fails
   */
  const handleGetSubscriptionBillings = useCallback(
    async (subscriptionId: string): Promise<Billing[]> => {
      try {
        const { data, errors } = await getSubscriptionBillings({
          variables: { subscriptionId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.subscriptionBillings || [];
      } catch (error) {
        console.error("Subscription billings fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getSubscriptionBillings]
  );

  /**
   * Fetches billing statistics for a specific subscription
   * @param subscriptionId - The subscription ID
   * @returns Billing statistics object
   * @throws Error if fetch fails
   */
  const handleGetBillingStats = useCallback(
    async (subscriptionId: string): Promise<BillingStats> => {
      try {
        const { data, errors } = await getBillingStats({
          variables: { subscriptionId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        if (!data?.billingStats) {
          throw new Error("No billing stats data returned");
        }

        return data.billingStats;
      } catch (error) {
        console.error("Billing stats fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getBillingStats]
  );

  /**
   * Fetches all billings for the current user
   * @returns Array of user's billing records with subscription information
   * @throws Error if fetch fails
   */
  const handleGetUserBillings = useCallback(async (): Promise<
    BillingWithSubscription[]
  > => {
    try {
      const { data, errors } = await getUserBillings();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.userBillings || [];
    } catch (error) {
      console.error("User billings fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getUserBillings]);

  /**
   * Filters billings by status
   * @param billings - Array of billing records
   * @param status - Billing status to filter by
   * @returns Filtered array of billing records
   */
  const filterBillingsByStatus = useCallback(
    (billings: Billing[], status: BillingStatus): Billing[] => {
      return billings.filter((billing) => billing.status === status);
    },
    []
  );

  /**
   * Calculates total amount for a set of billings
   * @param billings - Array of billing records
   * @returns Total amount
   */
  const calculateTotalAmount = useCallback((billings: Billing[]): number => {
    return billings.reduce((total, billing) => total + billing.amount, 0);
  }, []);

  /**
   * Gets billings within a date range
   * @param billings - Array of billing records
   * @param startDate - Start date (ISO string)
   * @param endDate - End date (ISO string)
   * @returns Filtered array of billing records within the date range
   */
  const getBillingsInDateRange = useCallback(
    (billings: Billing[], startDate: string, endDate: string): Billing[] => {
      return billings.filter((billing) => {
        const billingDate = new Date(billing.billingDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return billingDate >= start && billingDate <= end;
      });
    },
    []
  );

  return {
    handleGetSubscriptionBillings,
    handleGetBillingStats,
    handleGetUserBillings,
    filterBillingsByStatus,
    calculateTotalAmount,
    getBillingsInDateRange,
  };
};
