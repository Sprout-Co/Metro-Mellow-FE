import {
  CreatePaymentMutationOptions,
  CreatePaymentMutationVariables,
  RefundPaymentMutationOptions,
  RefundPaymentMutationVariables,
  AddPaymentMethodMutationOptions,
  AddPaymentMethodMutationVariables,
  RemovePaymentMethodMutationOptions,
  RemovePaymentMethodMutationVariables,
  SetDefaultPaymentMethodMutationOptions,
  SetDefaultPaymentMethodMutationVariables,
  GenerateInvoiceMutationOptions,
  GenerateInvoiceMutationVariables,
  MarkInvoiceAsPaidMutationOptions,
  MarkInvoiceAsPaidMutationVariables,
  CancelInvoiceMutationOptions,
  CancelInvoiceMutationVariables,
  useCreatePaymentMutation,
  useRefundPaymentMutation,
  useAddPaymentMethodMutation,
  useRemovePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
  useGenerateInvoiceMutation,
  useMarkInvoiceAsPaidMutation,
  useCancelInvoiceMutation,
} from "@/graphql/api";

export const useCreatePaymentHook = (
  args: CreatePaymentMutationVariables,
  options?: CreatePaymentMutationOptions
) => {
  const [createPayment, { data, loading, error }] = useCreatePaymentMutation({
    variables: args,
    ...options,
  });
  return { createPayment, data, loading, error };
};

export const useRefundPaymentHook = (
  args: RefundPaymentMutationVariables,
  options?: RefundPaymentMutationOptions
) => {
  const [refundPayment, { data, loading, error }] = useRefundPaymentMutation({
    variables: args,
    ...options,
  });
  return { refundPayment, data, loading, error };
};

export const useAddPaymentMethodHook = (
  args: AddPaymentMethodMutationVariables,
  options?: AddPaymentMethodMutationOptions
) => {
  const [addPaymentMethod, { data, loading, error }] =
    useAddPaymentMethodMutation({
      variables: args,
      ...options,
    });
  return { addPaymentMethod, data, loading, error };
};

export const useRemovePaymentMethodHook = (
  args: RemovePaymentMethodMutationVariables,
  options?: RemovePaymentMethodMutationOptions
) => {
  const [removePaymentMethod, { data, loading, error }] =
    useRemovePaymentMethodMutation({
      variables: args,
      ...options,
    });
  return { removePaymentMethod, data, loading, error };
};

export const useSetDefaultPaymentMethodHook = (
  args: SetDefaultPaymentMethodMutationVariables,
  options?: SetDefaultPaymentMethodMutationOptions
) => {
  const [setDefaultPaymentMethod, { data, loading, error }] =
    useSetDefaultPaymentMethodMutation({
      variables: args,
      ...options,
    });
  return { setDefaultPaymentMethod, data, loading, error };
};

export const useGenerateInvoiceHook = (
  args: GenerateInvoiceMutationVariables,
  options?: GenerateInvoiceMutationOptions
) => {
  const [generateInvoice, { data, loading, error }] =
    useGenerateInvoiceMutation({
      variables: args,
      ...options,
    });
  return { generateInvoice, data, loading, error };
};

export const useMarkInvoiceAsPaidHook = (
  args: MarkInvoiceAsPaidMutationVariables,
  options?: MarkInvoiceAsPaidMutationOptions
) => {
  const [markInvoiceAsPaid, { data, loading, error }] =
    useMarkInvoiceAsPaidMutation({
      variables: args,
      ...options,
    });
  return { markInvoiceAsPaid, data, loading, error };
};

export const useCancelInvoiceHook = (
  args: CancelInvoiceMutationVariables,
  options?: CancelInvoiceMutationOptions
) => {
  const [cancelInvoice, { data, loading, error }] = useCancelInvoiceMutation({
    variables: args,
    ...options,
  });
  return { cancelInvoice, data, loading, error };
};
