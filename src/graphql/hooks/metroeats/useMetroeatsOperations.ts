/**
 * Custom hook for MetroEats-specific GraphQL operations.
 * Provides meal discovery, order management, and checkout quote retrieval.
 */
import { useCallback } from "react";
import {
  CreateMealOrderInput,
  CreateMealOrderMutation,
  GetCheckoutQuoteQuery,
  GetMealOrdersQuery,
  GetMealsQuery,
  MealCategory,
  MealStyle,
  PaymentStatus,
  useCreateMealOrderMutation,
  useGetCheckoutQuoteLazyQuery,
  useGetMealOrderPaymentStatusLazyQuery,
  useGetMealOrdersLazyQuery,
  useGetMealsLazyQuery,
} from "@/graphql/api";

export interface MetroeatsCheckoutLineItemInput {
  mealId: string;
  quantity: number;
  style: MealStyle;
  extras?: { extraId: string; quantity: number }[];
}

export type CheckoutQuote = GetCheckoutQuoteQuery["getCheckoutQuote"];
export type MetroeatsMeal = GetMealsQuery["meals"][0];
export type MetroeatsMealOrder = GetMealOrdersQuery["mealOrders"][0];
export type CreatedMetroeatsMealOrder = CreateMealOrderMutation["createMealOrder"];

export const useMetroeatsOperations = () => {
  const [createMealOrderMutation, { loading: createMealOrderLoading }] =
    useCreateMealOrderMutation();
  const [getMeals, { data: mealsData, loading: mealsLoading, error: mealsError }] =
    useGetMealsLazyQuery();
  const [
    getMealOrders,
    { data: mealOrdersData, loading: mealOrdersLoading, error: mealOrdersError },
  ] = useGetMealOrdersLazyQuery();
  const [
    getMealOrderPaymentStatus,
    {
      data: mealOrderPaymentStatusData,
      loading: mealOrderPaymentStatusLoading,
      error: mealOrderPaymentStatusError,
    },
  ] = useGetMealOrderPaymentStatusLazyQuery();
  const [getCheckoutQuote, { data, loading, error, refetch }] =
    useGetCheckoutQuoteLazyQuery({
      fetchPolicy: "network-only",
    });

  const handleCreateMealOrder = useCallback(
    async (
      input: CreateMealOrderInput,
    ): Promise<CreatedMetroeatsMealOrder | undefined> => {
      try {
        const { data: createdOrderData, errors } = await createMealOrderMutation({
          variables: {
            input,
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return createdOrderData?.createMealOrder;
      } catch (createError) {
        console.error("Meal order creation error:", createError);
        if (createError instanceof Error) {
          throw new Error(createError.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createMealOrderMutation],
  );

  const handleGetMeals = useCallback(
    async (category?: MealCategory): Promise<MetroeatsMeal[]> => {
      try {
        const { data: fetchedMealsData, errors } = await getMeals({
          variables: { category },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return fetchedMealsData?.meals ?? [];
      } catch (fetchError) {
        console.error("Meals fetch error:", fetchError);
        if (fetchError instanceof Error) {
          throw new Error(fetchError.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getMeals],
  );

  const handleGetMealOrders = useCallback(async (): Promise<MetroeatsMealOrder[]> => {
    try {
      const { data: fetchedMealOrdersData, errors } = await getMealOrders();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return fetchedMealOrdersData?.mealOrders ?? [];
    } catch (fetchError) {
      console.error("Meal orders fetch error:", fetchError);
      if (fetchError instanceof Error) {
        throw new Error(fetchError.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getMealOrders]);

  const handleGetMealOrderPaymentStatus = useCallback(
    async (orderId: string): Promise<PaymentStatus | undefined> => {
      try {
        const { data: paymentStatusData, errors } = await getMealOrderPaymentStatus({
          variables: { orderId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return paymentStatusData?.mealOrderPaymentStatus;
      } catch (fetchError) {
        console.error("Meal order payment status fetch error:", fetchError);
        if (fetchError instanceof Error) {
          throw new Error(fetchError.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getMealOrderPaymentStatus],
  );

  const handleGetCheckoutQuote = useCallback(
    async (
      address: string,
      items: MetroeatsCheckoutLineItemInput[],
    ): Promise<CheckoutQuote | undefined> => {
      try {
        const { data: quoteData, errors } = await getCheckoutQuote({
          variables: {
            input: {
              address,
              items,
            },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return quoteData?.getCheckoutQuote;
      } catch (fetchError) {
        console.error("Checkout quote fetch error:", fetchError);
        if (fetchError instanceof Error) {
          throw new Error(fetchError.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getCheckoutQuote],
  );

  return {
    handleCreateMealOrder,
    handleGetMeals,
    handleGetMealOrders,
    handleGetMealOrderPaymentStatus,
    handleGetCheckoutQuote,
    meals: mealsData?.meals ?? [],
    mealsLoading,
    mealsError,
    mealOrders: mealOrdersData?.mealOrders ?? [],
    mealOrdersLoading,
    mealOrdersError,
    mealOrderPaymentStatus: mealOrderPaymentStatusData?.mealOrderPaymentStatus,
    mealOrderPaymentStatusLoading,
    mealOrderPaymentStatusError,
    checkoutQuote: data?.getCheckoutQuote,
    checkoutQuoteLoading: loading,
    checkoutQuoteError: error,
    refetchCheckoutQuote: refetch,
    createMealOrderLoading,
  };
};
