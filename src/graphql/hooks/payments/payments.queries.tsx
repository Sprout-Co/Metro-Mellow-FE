import { QueryHookOptions } from "@apollo/client";
import {
  GetPaymentsQuery,
  GetPaymentsQueryVariables,
  GetCustomerPaymentsQuery,
  GetCustomerPaymentsQueryVariables,
  GetPaymentMethodsQuery,
  GetPaymentMethodsQueryVariables,
  GetInvoiceByIdQuery,
  GetInvoiceByIdQueryVariables,
  GetCustomerInvoicesQuery,
  GetCustomerInvoicesQueryVariables,
  useGetPaymentsQuery,
  useGetCustomerPaymentsQuery,
  useGetPaymentMethodsQuery,
  useGetInvoiceByIdQuery,
  useGetCustomerInvoicesQuery,
} from "@/graphql/api";

type GetInvoiceByIdOptions = Omit<
  QueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>,
  "variables"
> & {
  variables: GetInvoiceByIdQueryVariables;
};

export const useGetPaymentsHook = (
  options?: QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>
) => {
  const { data, loading, error } = useGetPaymentsQuery(options);
  return { data, loading, error };
};

export const useGetCustomerPaymentsHook = (
  options?: QueryHookOptions<
    GetCustomerPaymentsQuery,
    GetCustomerPaymentsQueryVariables
  >
) => {
  const { data, loading, error } = useGetCustomerPaymentsQuery(options);
  return { data, loading, error };
};

export const useGetPaymentMethodsHook = (
  options?: QueryHookOptions<
    GetPaymentMethodsQuery,
    GetPaymentMethodsQueryVariables
  >
) => {
  const { data, loading, error } = useGetPaymentMethodsQuery(options);
  return { data, loading, error };
};

export const useGetInvoiceByIdHook = (options: GetInvoiceByIdOptions) => {
  const { data, loading, error } = useGetInvoiceByIdQuery(options);
  return { data, loading, error };
};

export const useGetCustomerInvoicesHook = (
  options?: QueryHookOptions<
    GetCustomerInvoicesQuery,
    GetCustomerInvoicesQueryVariables
  >
) => {
  const { data, loading, error } = useGetCustomerInvoicesQuery(options);
  return { data, loading, error };
};
