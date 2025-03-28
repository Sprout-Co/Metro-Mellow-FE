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
  useGetPaymentsLazyQuery,
  useGetCustomerPaymentsQuery,
  useGetCustomerPaymentsLazyQuery,
  useGetPaymentMethodsQuery,
  useGetPaymentMethodsLazyQuery,
  useGetInvoiceByIdQuery,
  useGetInvoiceByIdLazyQuery,
  useGetCustomerInvoicesQuery,
  useGetCustomerInvoicesLazyQuery,
} from "@/graphql/api";

type GetInvoiceByIdOptions = Omit<
  QueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>,
  "variables"
> & {
  variables: GetInvoiceByIdQueryVariables;
};

type GetPaymentMethodsOptions = Omit<
  QueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>,
  "variables"
>;

export const useGetPaymentsHook = (
  options?: QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>
) => {
  const { data, loading, error } = useGetPaymentsQuery(options);
  return { data, loading, error };
};

export const useLazyGetPaymentsHook = (
  options?: QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>
) => {
  const [getPayments, { loading, data, error }] =
    useGetPaymentsLazyQuery(options);

  return {
    getPayments: () => {
      getPayments();
    },
    data,
    loading,
    error,
  };
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

export const useLazyGetCustomerPaymentsHook = (
  options?: QueryHookOptions<
    GetCustomerPaymentsQuery,
    GetCustomerPaymentsQueryVariables
  >
) => {
  const [getCustomerPayments, { loading, data, error }] =
    useGetCustomerPaymentsLazyQuery(options);

  return {
    getCustomerPayments: () => {
      getCustomerPayments();
    },
    data,
    loading,
    error,
  };
};

export const useGetPaymentMethodsHook = (options: GetPaymentMethodsOptions) => {
  const { data, loading, error } = useGetPaymentMethodsQuery(options);
  return { data, loading, error };
};

export const useLazyGetPaymentMethodsHook = (
  options: GetPaymentMethodsOptions
) => {
  const [getPaymentMethods, { loading, data, error }] =
    useGetPaymentMethodsLazyQuery(options);

  return {
    getPaymentMethods: () => {
      getPaymentMethods();
    },
    data,
    loading,
    error,
  };
};

export const useGetInvoiceByIdHook = (options: GetInvoiceByIdOptions) => {
  const { data, loading, error } = useGetInvoiceByIdQuery(options);
  return { data, loading, error };
};

export const useLazyGetInvoiceByIdHook = (options: GetInvoiceByIdOptions) => {
  const [getInvoiceById, { loading, data, error }] =
    useGetInvoiceByIdLazyQuery(options);

  return {
    getInvoiceById: () => {
      getInvoiceById();
    },
    data,
    loading,
    error,
  };
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

export const useLazyGetCustomerInvoicesHook = (
  options?: QueryHookOptions<
    GetCustomerInvoicesQuery,
    GetCustomerInvoicesQueryVariables
  >
) => {
  const [getCustomerInvoices, { loading, data, error }] =
    useGetCustomerInvoicesLazyQuery(options);

  return {
    getCustomerInvoices: () => {
      getCustomerInvoices();
    },
    data,
    loading,
    error,
  };
};
